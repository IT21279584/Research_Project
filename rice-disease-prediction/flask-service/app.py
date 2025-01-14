from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__)

# Load the pre-trained model once when the app starts
model_path = os.path.join("models", "rice_disease.keras")
model = tf.keras.models.load_model(model_path)

# Define your labels in the correct order based on the model's training data set
labels = ["Bacterial Leaf Blight", "Brown Spot", "Healthy", "Leaf Blast"]

# Define a threshold value
CONFIDENCE_THRESHOLD = 0.7  # Adjust this value as needed

def preprocess_image(image_bytes):
    # Preprocess the uploaded image to match model input shape and requirements
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))  # Resize to match model's expected input size
    img = np.expand_dims(img, axis=0)  # Adding batch dimension
    return img

@app.route('/rice_disease_prediction', methods=['POST'])
def prediction_rice():
    try:
        # Get the uploaded image file
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        
        file = request.files['file']
        # Read and preprocess the image
        image = file.read()
        img = preprocess_image(image)
        
        # Make predictions
        prediction = model.predict(img)
        print("Prediction Raw Output:", prediction)  # Debug line to check raw output
        
        # Get the highest confidence score and corresponding label
        confidence_scores = prediction[0]
        label_index = np.argmax(confidence_scores)
        label = labels[label_index]
        confidence_score = confidence_scores[label_index]
        
        # Check if the confidence score meets the threshold
        if confidence_score < CONFIDENCE_THRESHOLD:
            return jsonify({
                "prediction": "Uncertain",
                "confidence_score": float(confidence_score),
                "message": f"Confidence score below threshold ({CONFIDENCE_THRESHOLD})."
            }), 200
        
        # Return the prediction result with the confidence score
        return jsonify({
            "prediction": label,
            "confidence_score": float(confidence_score)
        }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5009)
