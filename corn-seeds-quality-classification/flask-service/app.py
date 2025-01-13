from flask import Flask, request, jsonify
import torch
import torch.nn as nn
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights
from torchvision import transforms
from PIL import Image
import numpy as np
import os
import io  # For handling in-memory file operations

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
        # Check if files are provided
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        
        file = request.files['file']
        image = file.read()
        img = preprocess_image(image)

        # Perform prediction
        with torch.no_grad():
            outputs = model(img)
            confidence = torch.nn.functional.softmax(outputs, dim=1).numpy()
            label_index = np.argmax(confidence, axis=1)[0]
            confidence_score = confidence[0][label_index]
            label = labels[label_index]

        return jsonify({"classification": label, "confidence": float(confidence_score)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5003)
