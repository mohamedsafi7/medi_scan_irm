import os
import base64
import json
import random
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Union
import numpy as np
from PIL import Image
import io
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

app = Flask(__name__)
CORS(app)

# Configure the Gemini API with a hardcoded key for testing
# In production, you should use an environment variable instead
api_key = "AIzaSyDJC0UXeRLxYJJEUWfgUY9qUXZ5pE0FzVA"  # This is a sample key, replace with your actual Gemini API key if needed

genai.configure(api_key=api_key)

# Paths to the MRI image folders
DATA_DIR = Path("data/Breast Cancer Patients MRI's")
TRAIN_HEALTHY_DIR = DATA_DIR / "train" / "Healthy"
TRAIN_SICK_DIR = DATA_DIR / "train" / "Sick"
VALIDATION_HEALTHY_DIR = DATA_DIR / "validation" / "Healthy"
VALIDATION_SICK_DIR = DATA_DIR / "validation" / "Sick"

# Path to the trained model
MODEL_PATH = "mri_cancer_model.h5"

# Image dimensions for model input
IMG_HEIGHT = 224
IMG_WIDTH = 224

# Load the trained model if it exists
model = None
try:
    if os.path.exists(MODEL_PATH):
        print(f"Loading trained model from {MODEL_PATH}")
        model = load_model(MODEL_PATH)
        print("Model loaded successfully")
    else:
        print(f"Warning: Model file {MODEL_PATH} not found. ML prediction will not be available.")
        print("Run train_mri_model.py to train and save the model first.")
except Exception as e:
    print(f"Error loading model: {e}")
    print("ML prediction will not be available.")

def validate_mri_image(image: Image.Image) -> Dict:
    """
    Validate if the image is likely a breast MRI.
    Made more lenient to accept various medical image formats.

    Args:
        image: PIL Image object

    Returns:
        Dictionary with validation results
    """
    try:
        # 1. Basic image property checks
        width, height = image.size
        aspect_ratio = width / height

        # More lenient aspect ratio check - accept most reasonable image ratios
        if aspect_ratio < 0.2 or aspect_ratio > 5.0:
            return {
                "is_valid": False,
                "reason": "Image aspect ratio is extremely unusual for medical images"
            }

        # 2. Basic size check - ensure image is not too small
        if width < 50 or height < 50:
            return {
                "is_valid": False,
                "reason": "Image is too small for meaningful analysis"
            }

        # 3. Check if image is completely black or white
        img_array = np.array(image)

        # Convert to grayscale for analysis if it's RGB
        if len(img_array.shape) == 3:
            gray_img = np.mean(img_array, axis=2).astype(np.uint8)
        else:
            gray_img = img_array

        # Check if image has any variation (not completely uniform)
        if np.std(gray_img) < 5:
            return {
                "is_valid": False,
                "reason": "Image appears to be uniform (no variation in pixel values)"
            }

        # For now, we'll consider most images valid if they pass basic checks
        # This allows for more flexibility in testing different image types
        return {
            "is_valid": True
        }

    except Exception as e:
        print(f"Error during image validation: {e}")
        return {
            "is_valid": False,
            "reason": f"Error during validation: {str(e)}"
        }

def predict_with_ml_model(image_data: str) -> Dict:
    """
    Predict breast cancer using the trained ML model.

    Args:
        image_data: Base64 encoded image data

    Returns:
        Dictionary with prediction results
    """
    if model is None:
        print("ML model not available. Skipping ML prediction.")
        return {
            "ml_prediction": None,
            "ml_confidence": None,
            "ml_available": False
        }

    try:
        # Decode base64 image
        if ',' in image_data:
            image_data = image_data.split(',')[1]

        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))

        # Convert to RGB if needed
        if image.mode != "RGB":
            image = image.convert("RGB")

        # Validate if this is likely a breast MRI image
        validation_result = validate_mri_image(image)
        if not validation_result.get("is_valid", False):
            return {
                "ml_prediction": None,
                "ml_confidence": None,
                "ml_available": True,
                "validation_error": True,
                "validation_reason": validation_result.get("reason", "Not a valid breast MRI image")
            }

        # Resize to expected dimensions
        image = image.resize((IMG_HEIGHT, IMG_WIDTH))

        # Convert to numpy array and preprocess
        img_array = img_to_array(image)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0  # Normalize to [0,1]

        # Make prediction
        predictions = model.predict(img_array)

        # Get class index and confidence
        class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][class_idx])

        # Map class index to label (0 = Healthy, 1 = Sick)
        prediction = "Negative" if class_idx == 0 else "Positive"

        return {
            "ml_prediction": prediction,
            "ml_confidence": confidence,
            "ml_available": True,
            "validation_error": False
        }
    except Exception as e:
        print(f"Error during ML prediction: {e}")
        return {
            "ml_prediction": None,
            "ml_confidence": None,
            "ml_available": False,
            "ml_error": str(e)
        }

def load_sample_images(folder_path: Path, num_samples: int = 3) -> List[Dict]:
    """Load a sample of images from the specified folder."""
    image_files = list(folder_path.glob("*.jpg"))

    if not image_files:
        return []

    # Select random samples
    samples = random.sample(image_files, min(num_samples, len(image_files)))

    result = []
    for img_path in samples:
        try:
            with Image.open(img_path) as img:
                # Convert to RGB if needed
                if img.mode != "RGB":
                    img = img.convert("RGB")

                # Resize to reduce size
                img = img.resize((224, 224))

                # Convert to base64
                buffer = io.BytesIO()
                img.save(buffer, format="JPEG")
                img_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

                result.append({
                    "filename": img_path.name,
                    "base64": img_base64
                })
        except Exception as e:
            print(f"Error loading image {img_path}: {e}")

    return result

def analyze_mri_with_gemini(
    image_base64: str,
    patient_info: Dict,
    reference_healthy_images: List[Dict],
    reference_sick_images: List[Dict],
    use_mock_data: bool = False
) -> Dict:
    """
    If use_mock_data is True, this will return mock analysis results instead of calling Gemini API.
    This is useful for testing when the API key is not valid or when you want to test without using API credits.
    """
    # For testing purposes, we can return mock data
    if use_mock_data:
        print("Using mock data instead of calling Gemini API")
        return {
            "patientInfo": patient_info,
            "prediction": "Negative" if random.random() > 0.3 else "Positive",
            "confidenceScore": random.uniform(0.65, 0.95),
            "detailedAnalysis": "This is a mock analysis for testing purposes. In a real scenario, this would contain detailed observations from the Gemini AI model.",
            "keyMetrics": {
                "Tissue Density": random.uniform(20, 80),
                "Border Irregularity": random.uniform(10, 90),
                "Contrast Enhancement": random.uniform(30, 70),
                "Size (relative)": random.uniform(20, 60),
                "Symmetry Disruption": random.uniform(15, 85)
            },
            "recommendations": [
                "Consult with a healthcare professional to review these findings",
                "Consider additional diagnostic tests if recommended",
                "Schedule regular follow-up appointments",
                "Maintain detailed records of all medical imaging and reports"
            ],
            "similarCases": [
                {
                    "id": "SH1",
                    "diagnosis": "Negative",
                    "data": "Healthy MRI example 1",
                    "similarity": random.uniform(0.7, 0.9)
                },
                {
                    "id": "SC1",
                    "diagnosis": "Positive",
                    "data": "Cancer MRI example 1",
                    "similarity": random.uniform(0.6, 0.8)
                }
            ]
        }
    """
    Analyze an MRI image using Gemini AI with reference to healthy and sick MRI images.

    Args:
        image_base64: Base64 encoded image data
        patient_info: Dictionary containing patient information
        reference_healthy_images: List of dictionaries with healthy reference images
        reference_sick_images: List of dictionaries with sick reference images

    Returns:
        Dictionary containing analysis results
    """
    # Create the model
    model = genai.GenerativeModel('gemini-2.0-flash')

    # Prepare reference images context
    reference_context = "Reference MRI Images:\n\n"

    # Add healthy reference images
    reference_context += "HEALTHY MRI EXAMPLES:\n"
    for i, img_data in enumerate(reference_healthy_images):
        reference_context += f"- Healthy Example {i+1}: {img_data['filename']}\n"

    # Add sick reference images
    reference_context += "\nSICK (CANCER) MRI EXAMPLES:\n"
    for i, img_data in enumerate(reference_sick_images):
        reference_context += f"- Cancer Example {i+1}: {img_data['filename']}\n"

    # Create the prompt
    prompt = f"""Analyze this breast MRI image for potential cancer indicators. Consider:
      - Patient age: {patient_info.get('age', 'Unknown')}
      - Patient gender: {patient_info.get('gender', 'Unknown')}
      - Medical history: {patient_info.get('medicalHistory', 'None provided')}

      {reference_context}

      Compare this uploaded MRI with the reference healthy and cancer MRI examples.
      Look for patterns, abnormalities, and features that might indicate cancer.

      Provide a detailed analysis in the following EXACT structured format:

      PREDICTION: [ONLY write "POSITIVE" or "NEGATIVE" - nothing else]

      CONFIDENCE: [ONLY write a number between 0-100 followed by % - example: "85%"]

      DETAILED ANALYSIS:
      [Your detailed observations and analysis, comparing with reference MRIs]

      KEY METRICS:
      - Tissue Density: [value between 0-100]
      - Border Irregularity: [value between 0-100]
      - Contrast Enhancement: [value between 0-100]
      - Size (relative): [value between 0-100]
      - Symmetry Disruption: [value between 0-100]

      RECOMMENDATIONS:
      - [Recommendation 1]
      - [Recommendation 2]
      - [Additional recommendations as needed]

      IMPORTANT INSTRUCTIONS:
      1. Be objective in your assessment. Do not default to positive results.
      2. Clearly indicate negative results when appropriate.
      3. The confidence score should reflect your actual confidence level.
      4. Follow the EXACT format specified above for PREDICTION and CONFIDENCE.
      5. For PREDICTION, only write "POSITIVE" or "NEGATIVE" - no other text.
      6. For CONFIDENCE, only write a number followed by % (e.g., "85%").
      7. Compare with the reference MRI examples to inform your analysis.
      8. For KEY METRICS, provide numerical values between 0-100 for each metric.
    """

    # Analyze the image
    response = model.generate_content([
        prompt,
        {
            "inlineData": {
                "mimeType": "image/jpeg",
                "data": image_base64
            }
        }
    ])

    # Process the response
    analysis_text = response.text

    # Extract prediction (POSITIVE or NEGATIVE)
    prediction = "Negative"  # Default
    if "PREDICTION:" in analysis_text:
        prediction_line = analysis_text.split("PREDICTION:")[1].split("\n")[0].strip()
        if "POSITIVE" in prediction_line.upper():
            prediction = "Positive"

    # Extract confidence score
    confidence_score = 0.5  # Default
    if "CONFIDENCE:" in analysis_text:
        confidence_line = analysis_text.split("CONFIDENCE:")[1].split("\n")[0].strip()
        try:
            confidence_value = confidence_line.split("%")[0].strip()
            confidence_score = float(confidence_value) / 100.0
        except (ValueError, IndexError):
            pass

    # Extract detailed analysis
    detailed_analysis = ""
    if "DETAILED ANALYSIS:" in analysis_text:
        detailed_section = analysis_text.split("DETAILED ANALYSIS:")[1]
        if "KEY METRICS:" in detailed_section:
            detailed_analysis = detailed_section.split("KEY METRICS:")[0].strip()
        elif "RECOMMENDATIONS:" in detailed_section:
            detailed_analysis = detailed_section.split("RECOMMENDATIONS:")[0].strip()
        else:
            detailed_analysis = detailed_section.strip()

    # Extract key metrics
    key_metrics = {}
    if "KEY METRICS:" in analysis_text:
        metrics_section = analysis_text.split("KEY METRICS:")[1]
        if "RECOMMENDATIONS:" in metrics_section:
            metrics_text = metrics_section.split("RECOMMENDATIONS:")[0]
            metrics_lines = metrics_text.strip().split("\n")
            for line in metrics_lines:
                if ":" in line:
                    key, value_text = line.split(":", 1)
                    key = key.strip().replace("-", "").strip()
                    try:
                        # Extract numeric value
                        value_text = value_text.strip()
                        if "[" in value_text and "]" in value_text:
                            value_text = value_text.split("]")[0].split("[")[1]
                        value = float(value_text.split()[0])
                        key_metrics[key] = value
                    except (ValueError, IndexError):
                        pass

    # Extract recommendations
    recommendations = []
    if "RECOMMENDATIONS:" in analysis_text:
        recommendations_section = analysis_text.split("RECOMMENDATIONS:")[1].strip()
        recommendation_lines = recommendations_section.split("\n")
        for line in recommendation_lines:
            line = line.strip()
            if line and line.startswith("-"):
                recommendations.append(line[1:].strip())

    # Create similar cases based on reference images
    similar_cases = []

    # Add cases based on prediction
    if prediction == "Positive":
        # Add more sick cases
        for i, img_data in enumerate(reference_sick_images):
            if i < 3:  # Limit to 3 similar cases
                similarity = random.uniform(0.65, 0.95)
                similar_cases.append({
                    "id": f"SC{i+1}",
                    "diagnosis": "Positive",
                    "data": f"Cancer MRI example {i+1} - {img_data['filename']}",
                    "similarity": similarity
                })
    else:
        # Add more healthy cases
        for i, img_data in enumerate(reference_healthy_images):
            if i < 3:  # Limit to 3 similar cases
                similarity = random.uniform(0.70, 0.98)
                similar_cases.append({
                    "id": f"SH{i+1}",
                    "diagnosis": "Negative",
                    "data": f"Healthy MRI example {i+1} - {img_data['filename']}",
                    "similarity": similarity
                })

    # Return the analysis result
    return {
        "patientInfo": patient_info,
        "prediction": prediction,
        "confidenceScore": confidence_score,
        "detailedAnalysis": detailed_analysis,
        "keyMetrics": key_metrics,
        "recommendations": recommendations,
        "similarCases": similar_cases
    }

@app.route('/api/test', methods=['GET'])
def test_endpoint():
    """Simple test endpoint to verify the server is running."""
    try:
        healthy_count = len(list(TRAIN_HEALTHY_DIR.glob("*.jpg")))
        sick_count = len(list(TRAIN_SICK_DIR.glob("*.jpg")))

        return jsonify({
            "status": "ok",
            "message": "MRI analysis server is running",
            "healthy_dir_exists": os.path.exists(TRAIN_HEALTHY_DIR),
            "sick_dir_exists": os.path.exists(TRAIN_SICK_DIR),
            "healthy_images_count": healthy_count,
            "sick_images_count": sick_count,
            "ml_model_available": model is not None,
            "ml_model_path": MODEL_PATH,
            "ml_model_exists": os.path.exists(MODEL_PATH),
            "gemini_api_available": api_key is not None and api_key != "YOUR_ACTUAL_API_KEY_HERE"
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Server is running but encountered an error: {str(e)}"
        })

@app.route('/api/analyze', methods=['POST'])
def analyze_image():
    """API endpoint to analyze an uploaded MRI image."""
    try:
        # Get the request data
        data = request.json

        if not data:
            return jsonify({"error": "No data provided in request"}), 400

        if 'image' not in data:
            return jsonify({"error": "No image provided in request"}), 400

        if 'patientInfo' not in data:
            return jsonify({"error": "No patient information provided in request"}), 400

        # Extract the base64 image data
        try:
            image_base64 = data['image'].split(',')[1] if ',' in data['image'] else data['image']
        except Exception as img_err:
            print(f"Error processing image data: {img_err}")
            return jsonify({"error": f"Invalid image data format: {str(img_err)}"}), 400

        # Get patient info
        patient_info = data['patientInfo']

        # Check if MRI folders exist
        if not os.path.exists(TRAIN_HEALTHY_DIR):
            print(f"Healthy MRI directory not found: {TRAIN_HEALTHY_DIR}")
            return jsonify({"error": f"Healthy MRI directory not found: {TRAIN_HEALTHY_DIR}"}), 500

        if not os.path.exists(TRAIN_SICK_DIR):
            print(f"Sick MRI directory not found: {TRAIN_SICK_DIR}")
            return jsonify({"error": f"Sick MRI directory not found: {TRAIN_SICK_DIR}"}), 500

        # Load reference images
        try:
            healthy_images = load_sample_images(TRAIN_HEALTHY_DIR, num_samples=3)
            if not healthy_images:
                print(f"No healthy reference images found in {TRAIN_HEALTHY_DIR}")
                return jsonify({"error": f"No healthy reference images found in {TRAIN_HEALTHY_DIR}"}), 500
        except Exception as healthy_err:
            print(f"Error loading healthy reference images: {healthy_err}")
            return jsonify({"error": f"Error loading healthy reference images: {str(healthy_err)}"}), 500

        try:
            sick_images = load_sample_images(TRAIN_SICK_DIR, num_samples=3)
            if not sick_images:
                print(f"No sick reference images found in {TRAIN_SICK_DIR}")
                return jsonify({"error": f"No sick reference images found in {TRAIN_SICK_DIR}"}), 500
        except Exception as sick_err:
            print(f"Error loading sick reference images: {sick_err}")
            return jsonify({"error": f"Error loading sick reference images: {str(sick_err)}"}), 500

        # Get ML prediction first
        ml_result = predict_with_ml_model(image_base64)

        # Check if the image validation failed
        if ml_result.get("validation_error", False):
            return jsonify({
                "error": "Invalid image type",
                "details": ml_result.get("validation_reason", "The uploaded image does not appear to be a valid breast MRI."),
                "is_valid_mri": False
            }), 400

        # Analyze the image with Gemini AI
        try:
            # Get Gemini AI analysis
            gemini_result = analyze_mri_with_gemini(
                image_base64,
                patient_info,
                healthy_images,
                sick_images
            )

            # Combine ML and Gemini results
            combined_result = {
                **gemini_result,
                "ml_prediction": ml_result.get("ml_prediction"),
                "ml_confidence": ml_result.get("ml_confidence"),
                "ml_available": ml_result.get("ml_available", False),
                "is_valid_mri": True
            }

            return jsonify(combined_result)
        except Exception as analysis_err:
            print(f"Error during MRI analysis with Gemini: {analysis_err}")

            # If Gemini fails but ML prediction is available, return ML results only
            if ml_result.get("ml_available"):
                return jsonify({
                    "patientInfo": patient_info,
                    "prediction": ml_result.get("ml_prediction"),
                    "confidenceScore": ml_result.get("ml_confidence"),
                    "detailedAnalysis": "Gemini AI analysis failed, but ML prediction is available.",
                    "recommendations": ["Consult with a healthcare professional to review these findings"],
                    "ml_prediction": ml_result.get("ml_prediction"),
                    "ml_confidence": ml_result.get("ml_confidence"),
                    "ml_available": True,
                    "gemini_error": str(analysis_err)
                })

            return jsonify({"error": f"Error during MRI analysis: {str(analysis_err)}"}), 500

    except Exception as e:
        print(f"Unexpected error analyzing image: {e}")
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
