from flask import Flask, request, jsonify
import torch
import torch.nn as nn
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights
from torchvision import transforms
from PIL import Image
import numpy as np
import os
import io  # For handling in-memory file operations
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
app = Flask(__name__)

# Load the trained PyTorch model once when the app starts
model_path = os.path.join("models", "best_model_new.pth")

# Load the model architecture and weights
weights = EfficientNet_B0_Weights.DEFAULT
model = efficientnet_b0(weights=weights)

# Modify classifier to match the training setup
model.classifier = nn.Sequential(
    nn.Flatten(),
    nn.Dropout(0.5),
    nn.Linear(1280, 256),
    nn.ReLU(),
    nn.BatchNorm1d(256),
    nn.Dropout(0.3),
    nn.Linear(256, 128),
    nn.ReLU(),
    nn.BatchNorm1d(128),
    nn.Dropout(0.3),
    nn.Linear(128, 64),
    nn.ReLU(),
    nn.BatchNorm1d(64),
    nn.Dropout(0.3),
    nn.Linear(64, 32),
    nn.ReLU(),
    nn.BatchNorm1d(32),
    nn.Dropout(0.3),
    nn.Linear(32, 4)  # Match the number of classes
)

model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
model.eval()

# Define class labels (ensure correct order as per training)
labels = ['broken', 'discolored', 'pure', 'silkcut']

# Define transformations
data_transform = transforms.Compose([
    transforms.Resize((227, 227)),  # Match model's input size
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

def preprocess_image(image_bytes):
    """
    Preprocess the uploaded image to match model input shape and requirements.
    """
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = data_transform(img)
    img = img.unsqueeze(0)  # Add batch dimension
    return img

@app.route('/classify/', methods=['POST'], strict_slashes=False)
def classify_seed():
    try:
        # Confidence threshold for classification
        CONFIDENCE_THRESHOLD = 0.6

        # Check if files are provided
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400

        files = request.files.getlist('file')  # Retrieve all uploaded files
        if not files:
            return jsonify({"error": "No files uploaded"}), 400

        results = []  # To store results for all images
        final_prediction = {"label": None, "confidence": 0.0}  # Track highest confidence
        unknown_detected = False  # Flag to detect if any image is "unknown"

        for file in files:
            image = file.read()
            img = preprocess_image(image)

            # Perform prediction
            with torch.no_grad():
                outputs = model(img)
                confidence = torch.nn.functional.softmax(outputs, dim=1).numpy()
                label_index = np.argmax(confidence, axis=1)[0]
                confidence_score = float(confidence[0][label_index])  # Convert to Python float

                # Determine the label based on confidence threshold
                if confidence_score >= CONFIDENCE_THRESHOLD:
                    label = labels[label_index]
                else:
                    label = "unknown"
                    unknown_detected = True  # Mark that an unknown classification occurred

                # Log confidence scores to the console for each image
                logging.info(f"File: {file.filename}")
                logging.info(f"Confidence scores: {confidence[0]}")
                logging.info(f"Predicted label: {label}, Confidence: {confidence_score}")

                # Add results for each image
                results.append({
                    "file": file.filename,
                    "classification": label,
                    "confidence": confidence_score,  # Ensure Python float
                    "details": [float(val) for val in confidence[0]]  # Convert all confidence values to float
                })

                # Update final prediction if the current image has a higher confidence score
                if not unknown_detected and confidence_score > final_prediction["confidence"]:
                    final_prediction["label"] = label
                    final_prediction["confidence"] = confidence_score

        # If any image is "unknown," set the final prediction to "unknown"
        if unknown_detected:
            final_prediction = {"label": "unknown", "confidence": 0.0}

        # Include final prediction in the response
        return jsonify({
            "final_prediction": {
                "label": final_prediction["label"],
                "confidence": float(final_prediction["confidence"])  # Convert to Python float
            },
            "results": results  # Detailed results for all images
        })

    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5003)
