import json
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
import io
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes (allow all domains)
CORS(app)

# Load the trained model
model = load_model('egg_classification_model.h5')

# Load class labels from the saved JSON file
with open('class_labels.json', 'r') as f:
    class_labels = json.load(f)

# Mapping from label index to label name
label_names = {
    0: "Brown - cracked egg",
    1: "Brown - good egg",
    2: "Dirty egg",
    3: "White - cracked egg",
    4: "White - good egg"
}

@app.route('/predict', methods=['POST'])
def predict():
    if 'file1' not in request.files or 'file2' not in request.files:
        return jsonify({'error': 'No files part'}), 400

    file1 = request.files['file1']
    file2 = request.files['file2']
    
    if file1.filename == '' or file2.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    try:
        # Load and preprocess the first image
        img1 = Image.open(io.BytesIO(file1.read()))
        img1 = img1.resize((224, 224))
        img_array1 = np.array(img1) / 255.0
        img_array1 = np.expand_dims(img_array1, axis=0)  # Add batch dimension
        
        # Load and preprocess the second image
        img2 = Image.open(io.BytesIO(file2.read()))
        img2 = img2.resize((224, 224))
        img_array2 = np.array(img2) / 255.0
        img_array2 = np.expand_dims(img_array2, axis=0)  # Add batch dimension
        
        # Make the predictions for both images
        prediction1 = model.predict(img_array1)
        prediction2 = model.predict(img_array2)
        
        # Get the predicted class indices for both images
        predicted_class_idx1 = np.argmax(prediction1)
        predicted_class_idx2 = np.argmax(prediction2)
        
        # Return 0, 1, 2, 3, or 4 based on the prediction logic
        if predicted_class_idx1 == predicted_class_idx2:
            return jsonify({"Result": label_names[predicted_class_idx1]})
        
        # Specific logic to return based on pairs
        if (predicted_class_idx1 == 0 and predicted_class_idx2 == 1) or (predicted_class_idx1 == 1 and predicted_class_idx2 == 0):
            return jsonify({"Result": label_names[0]})
        elif (predicted_class_idx1 == 3 and predicted_class_idx2 == 4) or (predicted_class_idx1 == 4 and predicted_class_idx2 == 3):
            return jsonify({"Result": label_names[3]})
        elif predicted_class_idx1 == 0 and predicted_class_idx2 == 0:
            return jsonify({"Result": label_names[0]})
        elif predicted_class_idx1 == 1 and predicted_class_idx2 == 1:
            return jsonify({"Result": label_names[1]})
        elif predicted_class_idx1 == 3 and predicted_class_idx2 == 3:
            return jsonify({"Result": label_names[3]})
        elif predicted_class_idx1 == 4 and predicted_class_idx2 == 4:
            return jsonify({"Result": label_names[4]})
        elif predicted_class_idx1 == 2 or predicted_class_idx2 == 2:
            return jsonify({"Result": label_names[2]})
        else:
            return jsonify({"Result": "Invalid inputs"})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
