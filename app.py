from flask import Flask, render_template, request, jsonify
import os, uuid
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array

app = Flask(__name__)
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
MODEL_PATH = 'model/risk_model.h5'   # <-- your trained model
model = load_model(MODEL_PATH)
IMG_SIZE = (128, 128)
CLASS_NAMES = ["Low Risk", "Medium Risk", "High Risk"]

def predict_image(path):
    img = load_img(path, target_size=IMG_SIZE)
    arr = img_to_array(img) / 255.0
    arr = np.expand_dims(arr, axis=0)
    preds = model.predict(arr)[0]         # softmax probabilities
    class_index = int(np.argmax(preds))
    confidence = float(preds[class_index])
    return CLASS_NAMES[class_index], confidence

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error':'no image'}), 400
    image = request.files['image']
    if image.filename == '':
        return jsonify({'error':'no filename'}), 400
    # save with unique name
    ext = os.path.splitext(image.filename)[1]
    fname = f"{uuid.uuid4().hex}{ext}"
    fpath = os.path.join(UPLOAD_FOLDER, fname)
    image.save(fpath)
    label, conf = predict_image(fpath)
    # optionally return path for preview
    return jsonify({'label': label, 'confidence': round(conf, 4), 'image_path': fpath})

if __name__ == '__main__':
    app.run(debug=True)
