<img width="1920" height="960" alt="Screenshot (135)" src="https://github.com/user-attachments/assets/2d5557ea-d0d6-47c0-b5fc-b2fcf10d5259" /># ai-risk-prediction-project
Flood Risk and disaster-related heatmap Predictor

A machine-learning powered web application that predicts Flood/Disaster Risk Levels (Low / Medium / High) from uploaded heatmap images.
Built with Flask + TensorFlow + OpenCV.

🚀 Features
✅ 1. Image-Based Risk Prediction

Upload any disaster-related heatmap (green/yellow/red) and the model predicts:

🟢 Low Risk

🟡 Medium Risk

🔴 High Risk

✅ 2. Interactive Web App

Clean UI

Real-time predictions

Works on any browser

Image preview before upload

✅ 3. Lightweight Custom CNN Model

Trained on a small curated dataset of heatmaps:

model/dataset/
 ├── low/ (green heatmaps)
 ├── medium/ (yellow heatmaps)
 └── high/ (red heatmaps)


 ✅ 4. Easy Deployment

Run locally with a single command:

python app.py

🧠 Machine Learning Model Overview

We use a simple Convolutional Neural Network (CNN):

2 convolution layers

2 pooling layers

Dense classifier

Softmax output over 3 classes

Training script is located at:

model/train_model.py


A custom trained model is saved as:

model/flood_model.h5


📂 Project Structure
natural_disaster_project/
│
├── app.py
│
├── model/
│     ├── train_model.py
│     ├── flood_model.h5
│     └── dataset/
│          ├── low/
│          ├── medium/
│          └── high/
│
├── static/
│     └── uploads/
│
└── templates/
      └── index.html


      🖼 Screenshots
<img width="1920" height="960" alt="Screenshot (135)" src="https://github.com/user-attachments/assets/ebd79a42-9f0a-4ba3-81f6-357ca478f549" />


▶️ How to Run

Install dependencies

pip install -r requirements.txt


Train model (optional, already provided)

python model/train_model.py


Run app

python app.py

Open browser

http://127.0.0.1:5000

📚 Technologies Used
Category	Tools
Backend	Flask
ML / DL	TensorFlow, Keras
Image Processing	OpenCV
Frontend	HTML, CSS, JavaScript
Version Control	Git, GitHub
👨‍💻 Developer

Diyorbek 22013140
Sejong University, 2025
Computer Science — Big Data & AI Project

⭐ Future Improvements

Upload live satellite images

Add real-time flood data API

Add map-based visualization using Leaflet.js or Mapbox

Improve accuracy by training on larger dataset

      


