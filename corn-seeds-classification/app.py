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
labels = [ "Broken soybeans", "Immature soybeans", "Skin-damaged soybeans","Spotted soybeans", "Pure soybeans"]

def preprocess_image(image_bytes):
    # Preprocess the uploaded image to match model input shape and requirements
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((227, 227))  # Resize to match model's expected input size
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

@app.route('/classify', methods=['POST'])
def classify_seed():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        
        file = request.files['file']
        image = file.read()
        img = preprocess_image(image)
        
        prediction = model.predict(img)
        confidence = np.max(prediction)  # Get the highest confidence score
        label_index = np.argmax(prediction, axis=1)[0]
        label = labels[label_index]
        
        return jsonify({"classification": label, "confidence": float(confidence)})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)
