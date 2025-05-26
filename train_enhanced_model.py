import os
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models, applications
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint
from pathlib import Path
import matplotlib.pyplot as plt
import pickle
from sklearn.utils.class_weight import compute_class_weight

# Set paths to the MRI dataset
DATA_DIR = Path("data/Breast Cancer Patients MRI's")
TRAIN_DIR = DATA_DIR / "train"
VALIDATION_DIR = DATA_DIR / "validation"
MODEL_PATH = "enhanced_mri_cancer_model.h5"
HISTORY_PATH = "enhanced_training_history.pkl"

# Image parameters
IMG_HEIGHT = 224
IMG_WIDTH = 224
BATCH_SIZE = 32
NUM_CLASSES = 2  # Healthy or Sick

def create_enhanced_model():
    """Create an enhanced CNN model with better metrics tracking"""
    # Use EfficientNetB0 as base model (better than MobileNetV2)
    base_model = applications.EfficientNetB0(
        input_shape=(IMG_HEIGHT, IMG_WIDTH, 3),
        include_top=False,
        weights='imagenet'
    )
    
    # Freeze base model initially
    base_model.trainable = False
    
    # Create enhanced model architecture
    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.BatchNormalization(),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.3),
        layers.BatchNormalization(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(NUM_CLASSES, activation='softmax')
    ])
    
    # Learning rate schedule
    initial_learning_rate = 0.001
    lr_schedule = tf.keras.optimizers.schedules.ExponentialDecay(
        initial_learning_rate,
        decay_steps=100,
        decay_rate=0.96,
        staircase=True
    )
    
    # Compile with comprehensive metrics
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=lr_schedule),
        loss='categorical_crossentropy',
        metrics=[
            'accuracy',
            tf.keras.metrics.Precision(name='precision'),
            tf.keras.metrics.Recall(name='recall'),
            tf.keras.metrics.AUC(name='auc'),
            tf.keras.metrics.TruePositives(name='tp'),
            tf.keras.metrics.TrueNegatives(name='tn'),
            tf.keras.metrics.FalsePositives(name='fp'),
            tf.keras.metrics.FalseNegatives(name='fn')
        ]
    )
    
    return model

def prepare_enhanced_data_generators():
    """Prepare enhanced data generators with better augmentation"""
    # Enhanced data augmentation for training
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=25,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        vertical_flip=False,  # Medical images shouldn't be flipped vertically
        brightness_range=[0.8, 1.2],
        fill_mode='nearest'
    )
    
    # Only rescaling for validation
    validation_datagen = ImageDataGenerator(rescale=1./255)
    
    # Create generators
    train_generator = train_datagen.flow_from_directory(
        TRAIN_DIR,
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=True
    )
    
    validation_generator = validation_datagen.flow_from_directory(
        VALIDATION_DIR,
        target_size=(IMG_HEIGHT, IMG_WIDTH),
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=False
    )
    
    return train_generator, validation_generator

def calculate_class_weights(train_generator):
    """Calculate class weights to handle imbalanced dataset"""
    # Get class labels
    labels = train_generator.classes
    
    # Calculate class weights
    class_weights = compute_class_weight(
        'balanced',
        classes=np.unique(labels),
        y=labels
    )
    
    class_weight_dict = {i: class_weights[i] for i in range(len(class_weights))}
    
    print(f"Class weights: {class_weight_dict}")
    return class_weight_dict

def plot_enhanced_training_history(history):
    """Plot comprehensive training history"""
    metrics = ['accuracy', 'precision', 'recall', 'auc', 'loss']
    
    fig, axes = plt.subplots(2, 3, figsize=(18, 12))
    axes = axes.ravel()
    
    for i, metric in enumerate(metrics):
        if metric in history.history:
            axes[i].plot(history.history[metric], label=f'Training {metric.title()}')
            if f'val_{metric}' in history.history:
                axes[i].plot(history.history[f'val_{metric}'], label=f'Validation {metric.title()}')
            axes[i].set_title(f'{metric.title()} Over Epochs')
            axes[i].set_xlabel('Epoch')
            axes[i].set_ylabel(metric.title())
            axes[i].legend()
            axes[i].grid(True, alpha=0.3)
    
    # Calculate and plot F1 score if precision and recall are available
    if 'precision' in history.history and 'recall' in history.history:
        train_f1 = 2 * (np.array(history.history['precision']) * np.array(history.history['recall'])) / \
                   (np.array(history.history['precision']) + np.array(history.history['recall']))
        val_f1 = 2 * (np.array(history.history['val_precision']) * np.array(history.history['val_recall'])) / \
                  (np.array(history.history['val_precision']) + np.array(history.history['val_recall']))
        
        axes[5].plot(train_f1, label='Training F1')
        axes[5].plot(val_f1, label='Validation F1')
        axes[5].set_title('F1 Score Over Epochs')
        axes[5].set_xlabel('Epoch')
        axes[5].set_ylabel('F1 Score')
        axes[5].legend()
        axes[5].grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('enhanced_training_history.png', dpi=300, bbox_inches='tight')
    plt.close()

def train_enhanced_model():
    """Train the enhanced model with comprehensive monitoring"""
    print("Preparing enhanced data generators...")
    train_generator, validation_generator = prepare_enhanced_data_generators()
    
    print("Calculating class weights...")
    class_weights = calculate_class_weights(train_generator)
    
    print("Creating enhanced model...")
    model = create_enhanced_model()
    
    # Print model summary
    print("\nModel Architecture:")
    model.summary()
    
    # Enhanced callbacks
    callbacks = [
        EarlyStopping(
            monitor='val_auc',
            patience=7,
            restore_best_weights=True,
            mode='max',
            verbose=1
        ),
        ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.2,
            patience=5,
            min_lr=1e-7,
            verbose=1
        ),
        ModelCheckpoint(
            MODEL_PATH,
            monitor='val_auc',
            save_best_only=True,
            mode='max',
            verbose=1
        )
    ]
    
    # Train the model
    print("Training enhanced model...")
    history = model.fit(
        train_generator,
        steps_per_epoch=train_generator.samples // BATCH_SIZE,
        epochs=30,
        validation_data=validation_generator,
        validation_steps=validation_generator.samples // BATCH_SIZE,
        callbacks=callbacks,
        class_weight=class_weights,
        verbose=1
    )
    
    # Fine-tuning phase
    print("\nStarting fine-tuning phase...")
    
    # Unfreeze some layers of the base model for fine-tuning
    model.layers[0].trainable = True
    
    # Freeze early layers, only fine-tune later layers
    for layer in model.layers[0].layers[:-20]:
        layer.trainable = False
    
    # Recompile with lower learning rate for fine-tuning
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001/10),
        loss='categorical_crossentropy',
        metrics=[
            'accuracy',
            tf.keras.metrics.Precision(name='precision'),
            tf.keras.metrics.Recall(name='recall'),
            tf.keras.metrics.AUC(name='auc'),
            tf.keras.metrics.TruePositives(name='tp'),
            tf.keras.metrics.TrueNegatives(name='tn'),
            tf.keras.metrics.FalsePositives(name='fp'),
            tf.keras.metrics.FalseNegatives(name='fn')
        ]
    )
    
    # Fine-tuning with fewer epochs
    fine_tune_history = model.fit(
        train_generator,
        steps_per_epoch=train_generator.samples // BATCH_SIZE,
        epochs=10,
        validation_data=validation_generator,
        validation_steps=validation_generator.samples // BATCH_SIZE,
        callbacks=callbacks,
        class_weight=class_weights,
        verbose=1
    )
    
    # Combine histories
    for key in history.history:
        if key in fine_tune_history.history:
            history.history[key].extend(fine_tune_history.history[key])
    
    # Save training history
    with open(HISTORY_PATH, 'wb') as f:
        pickle.dump(history.history, f)
    
    # Plot training history
    plot_enhanced_training_history(history)
    
    # Final evaluation
    print("Final evaluation...")
    evaluation = model.evaluate(validation_generator, verbose=1)
    
    print(f"\n{'='*60}")
    print("TRAINING COMPLETE!")
    print(f"{'='*60}")
    
    # Print all metrics
    metric_names = model.metrics_names
    for i, metric_name in enumerate(metric_names):
        print(f"{metric_name.title()}: {evaluation[i]:.4f}")
    
    # Calculate additional metrics
    if len(evaluation) >= 8:  # If we have TP, TN, FP, FN
        tp, tn, fp, fn = evaluation[4], evaluation[5], evaluation[6], evaluation[7]
        sensitivity = tp / (tp + fn) if (tp + fn) > 0 else 0
        specificity = tn / (tn + fp) if (tn + fp) > 0 else 0
        
        print(f"Sensitivity (Recall): {sensitivity:.4f}")
        print(f"Specificity: {specificity:.4f}")
    
    return model

if __name__ == "__main__":
    print("Starting enhanced MRI cancer detection model training...")
    
    # Check if dataset exists
    if not os.path.exists(TRAIN_DIR):
        print(f"Error: Training directory not found at {TRAIN_DIR}")
        exit(1)
    
    if not os.path.exists(VALIDATION_DIR):
        print(f"Error: Validation directory not found at {VALIDATION_DIR}")
        exit(1)
    
    # Train the enhanced model
    model = train_enhanced_model()
    
    print(f"\nModel training complete. Enhanced model saved to {MODEL_PATH}")
    print(f"Training history saved to {HISTORY_PATH}")
    print("Enhanced training history plot saved to enhanced_training_history.png")
    print("\nRun 'python evaluate_model_metrics.py' to get comprehensive evaluation metrics!")
