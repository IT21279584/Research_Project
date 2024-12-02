from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)

# Load the pre-trained model once when the app starts
model_path = os.path.join("models", "corn_model.keras")
model = tf.keras.models.load_model(model_path)

# Define your labels in the correct order based on the model's training data
labels = ['Silkcut', 'broken', 'discolored', 'pure']

def preprocess_image(image_bytes):
    """
    Preprocess the uploaded image to match the model input shape and requirements.
    Resizes the image to 224x224 (EfficientNetB0 input size) and scales pixel values.
    """
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))  # Resize to match EfficientNetB0 input size
    img = np.array(img) / 255.0  # Normalize pixel values to [0, 1]
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

@app.route('/classify/', methods=['POST'], strict_slashes=False)
def classify_seed():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        
        file = request.files['file']
        image = file.read()
        img = preprocess_image(image)
        
        # Make predictions using the loaded model
        prediction = model.predict(img)
        
        # Debugging: Print raw predictions
        print("Raw predictions:", prediction)
        
        confidence = np.max(prediction)
        label_index = np.argmax(prediction, axis=1)[0]
        label = labels[label_index]
        
        print("Predicted label:", label, "| Confidence:", confidence)
        
        return jsonify({"classification": label, "confidence": float(confidence)})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5003)
