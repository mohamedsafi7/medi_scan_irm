# MediScan AI: Cancer Detection Analysis

<div align="center">
  <img src="https://i.imgur.com/8JlzXAF.png" alt="MediScan AI Logo" width="200"/>
  <br>
  <h3>Advanced Medical Image Analysis with AI</h3>
  <p>Leveraging Google's Gemini AI and Vector Database Technology for Enhanced Cancer Detection</p>
  
  ![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)
  ![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
  ![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.0-orange.svg)
  ![Chroma DB](https://img.shields.io/badge/Chroma_DB-2.4.3-purple.svg)
  ![License](https://img.shields.io/badge/License-MIT-green.svg)
</div>

## 🔍 Overview

MediScan AI is an educational tool designed to demonstrate how artificial intelligence can assist in the analysis of medical images for potential cancer indicators. The application combines Google's powerful Gemini AI technology with a vector database (Chroma) to provide contextually relevant analysis based on historical cancer data.

> **⚠️ Important Disclaimer**: MediScan AI is designed for educational purposes only and should not replace professional medical diagnosis. All results should be reviewed by qualified healthcare professionals.

## ✨ Key Features

### 🧠 AI-Powered Analysis
- Utilizes Google's Gemini AI to analyze medical images for potential cancer indicators
- Provides confidence scores, detailed analysis, and recommendations
- Enhanced with vector database technology for more accurate results

### 📊 Advanced Visualizations
- **Key Metrics Comparison**: Compares detected metrics with benign and malignant thresholds
- **Case Comparison**: Directly compares current case with similar cases from the dataset
- **Risk Assessment Gauge**: Visual representation of overall risk level
- **Tumor Metrics Radar**: Compares multiple metrics against typical profiles
- **Temporal Analysis**: Projection of how metrics might change over time

### 📋 Comprehensive Reporting
- Generate detailed PDF reports with all visualizations
- Includes patient information, analysis results, and recommendations
- Professional layout suitable for educational purposes

### 🔄 Vector Database Integration
- Stores and retrieves similar cancer cases from historical data
- Enhances AI analysis with contextually relevant examples
- Provides reference points for comparison

## 🖼️ Screenshots

<div align="center">
  <img src="https://i.imgur.com/JKLzXYZ.png" alt="Analysis Screen" width="45%"/>
  &nbsp;&nbsp;
  <img src="https://i.imgur.com/mNOP123.png" alt="Results Screen" width="45%"/>
</div>

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.18.0 or higher)
- npm (v9.0.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mohamedsafi7/medi_scan.git
cd medi_scan
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Gemini API key:
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. (Optional) Start the Chroma server for vector database functionality:
```bash
npm run start-chroma
```

## 📋 Usage Guide

### Analyzing Medical Images

1. Navigate to the Analysis page
2. Fill in the patient information form
3. Upload a medical image (supported formats: JPEG, PNG, WebP)
4. Click "Analyze" to process the image
5. View the detailed results with visualizations
6. Download the enhanced report with diagrams

### Recommended Image Types

- Mammograms
- MRI scans
- CT scans
- Histopathology images
- X-rays

## 📊 Visualization Components

### Key Metrics Comparison
Compares the current case's key metrics with established thresholds for benign and malignant tumors from the Cancer_Data.csv dataset.

### Case Comparison Chart
Directly compares the current case with similar cases from the dataset, focusing on the two most important metrics for cancer detection.

### Risk Assessment Gauge
Provides an intuitive visualization of the overall risk level based on the AI analysis.

### Tumor Metrics Radar Chart
Shows how the current case's metrics compare to typical benign and malignant profiles across multiple dimensions.

### Temporal Analysis Projection
Displays a hypothetical projection of how the confidence score might change over time with treatment or monitoring.

## 🧩 Technical Architecture

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- React Router for navigation

### AI Integration
- Google's Gemini AI API for image analysis
- Prompt engineering for structured analysis results

### Vector Database
- Chroma DB for storing and querying cancer data
- Vector embeddings for similarity search

### Data Processing
- CSV parsing for cancer reference data
- Image processing for AI analysis

## 🔧 Development

### Project Structure
```
medi_scan/
├── src/
│   ├── components/      # UI components
│   │   ├── analysis/    # Analysis-related components
│   │   ├── results/     # Visualization components
│   │   └── ui/          # Reusable UI components
│   ├── pages/           # Application pages
│   ├── services/        # API and data services
│   └── types/           # TypeScript type definitions
├── data/                # Reference data
└── public/              # Static assets
```

### Key Files
- `src/services/geminiService.ts`: Handles interaction with Gemini AI
- `src/services/chromaService.ts`: Manages vector database operations
- `src/components/results/*.tsx`: Visualization components
- `src/pages/Results.tsx`: Main results display page

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Google Gemini AI for providing the image analysis capabilities
- Chroma Vector Database for similarity search functionality
- React and TypeScript communities for excellent development tools
- Medical professionals who provided guidance on cancer detection metrics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📬 Contact

Mohamed Safi - [@mohamedsafi7](https://github.com/mohamedsafi7)

Project Link: [https://github.com/mohamedsafi7/medi_scan](https://github.com/mohamedsafi7/medi_scan)
