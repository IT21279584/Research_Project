from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)

# Load the pre-trained model once when the app starts
model_path = os.path.join("models", "efficientnet_soybean_final_model.keras")
model = tf.keras.models.load_model(model_path)

# Define your labels in the correct order based on the model's training data
labels = ["Broken soybeans", "Immature soybeans", "Skin-damaged soybeans", "Spotted soybeans", "Pure soybeans"]

def preprocess_image(image_bytes):
    """
    Preprocess the uploaded image to match the model input shape and requirements.
    """
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((227, 227))  # Resize to match the model's expected input size
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

@app.route('/soybean-classify/', methods=['POST'], strict_slashes=False)
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
            prediction = model.predict(img)
            confidence = np.max(prediction)  # Get the highest confidence score
            label_index = np.argmax(prediction, axis=1)[0]
            label = labels[label_index] if confidence >= CONFIDENCE_THRESHOLD else "unknown"

            # Update unknown flag if any image is "unknown"
            if label == "unknown":
                unknown_detected = True

            # Add results for each image
            results.append({
                "file": file.filename,
                "classification": label,
                "confidence": float(confidence),  # Convert to Python float
                "details": [float(val) for val in prediction[0]]  # Confidence scores for all classes
            })

            # Update final prediction if the current image has a higher confidence score
            if not unknown_detected and confidence > final_prediction["confidence"]:
                final_prediction["label"] = label
                final_prediction["confidence"] = confidence

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
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)
