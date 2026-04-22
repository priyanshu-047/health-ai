🏥 Health-AI: Symptom to Home Remedy Recommendation Model
📌 Module Name
symptom-remedy-model-service
🧠 Module Overview
This module is part of the Health-AI system. It predicts possible diseases or conditions based on user symptoms and recommends home remedies with confidence scores.
🔄 Pipeline Flow
User Symptoms
      ↓
Symptom Prediction Model
      ↓
Triage Engine (severity check)
      ↓
Risk Engine (risk scoring)
      ↓
Rule Booster (medical knowledge enhancement)
      ↓
Decision Engine (final output selection)
      ↓
Medicine + Home Remedy Services
      ↓
Final Recommendation Output
📦 Project Structure
app/
│
├── models/
│   └── symptom/
│       └── model.py          # ML model for symptom prediction
│
├── core/
│   ├── triage_engine.py      # severity classification
│   ├── risk_engine.py        # risk scoring system
│   ├── rule_booster.py       # rule-based medical boosting
│   └── decision_engine.py    # final decision logic
│
├── services/
│   ├── medicine_service.py   # medicine suggestions
│   └── home_remedy_service.py# home remedies mapping
│
└── main.py                   # API entry point
⚙️ Prerequisites
🧾 System Requirements
Python ≥ 3.9
pip ≥ 22+
Virtual environment (recommended)
📚 Dependencies
Install required packages:
pip install -r requirements.txt
Core Dependencies:
fastapi
uvicorn
numpy
pandas
scikit-learn
joblib
pydantic
Optional (if using deep learning):
tensorflow / torch
🚀 How to Start the Server
1️⃣ Activate Virtual Environment
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows
2️⃣ Run API Server
uvicorn app.main:app --reload
Server will start at:
http://127.0.0.1:8000
🧪 API Testing
🔹 Endpoint: Predict Remedies
POST /predict
Request Body:
{
  "symptoms": ["fever", "headache", "fatigue"]
}
Response:
{
  "possible_disease": "viral_fever",
  "confidence": 0.87,
  "risk_level": "moderate",
  "home_remedies": [
    {
      "name": "Ginger Tea",
      "confidence": 0.78
    },
    {
      "name": "Steam Inhalation",
      "confidence": 0.72
    }
  ]
}
🏋️ Model Training
📂 Training Script
python train.py
📊 Training Steps
Load symptom-disease dataset
Preprocess symptom vectors
Train classification model (e.g., RandomForest / Logistic Regression)
Save trained model
🧠 Example Training Code
from sklearn.ensemble import RandomForestClassifier
import joblib

model = RandomForestClassifier()

model.fit(X_train, y_train)

joblib.dump(model, "symptom_model.pkl")
🧪 Test Training Pipeline
Run full pipeline test:
python test_pipeline.py
This validates:
Symptom prediction
Triage engine
Risk scoring
Remedy mapping
Final decision output
🧩 Core Modules Explanation
1. Symptom Model
Converts symptoms → disease probability
Uses ML classification
2. Triage Engine
Classifies severity:
Low
Moderate
High (urgent)
3. Risk Engine
Computes health risk score (0–1)
Uses symptom weightage system
4. Rule Booster
Enhances ML output using medical rules:
Fever + body pain → viral likelihood ↑
Chest pain → risk override ↑
5. Decision Engine
Combines:
ML output
risk score
rules
Produces final prediction
6. Home Remedy Service
Maps disease → remedies:
Example:
viral_fever → ginger tea, hydration, rest
cold → steam inhalation, honey water
📊 Logging & Debugging
Enable logs:
export LOG_LEVEL=DEBUG
Logs include:
Prediction steps
Risk score calculation
Rule triggers
🔐 Environment Variables
Create .env file:
MODEL_PATH=./models/symptom_model.pkl
DEBUG=True
API_VERSION=v1
🧪 Example cURL Request
curl -X POST "http://127.0.0.1:8000/predict" \
-H "Content-Type: application/json" \
-d '{"symptoms":["fever","cough"]}'
📈 Future Improvements
Deep Learning symptom encoder (BERT-based)
Multilingual symptom input
Doctor escalation system
Voice symptom input (speech-to-text)
Integration with wearable health devices
👨‍💻 Author Notes
This module is designed for:
Hackathons (SIH-level projects)
Health-tech startups
AI-based diagnostic assistants






🚀 Step 1: Activate your virtual environment (IMPORTANT)
Run this inside your project folder:
source venv/bin/activate
After this, your terminal should look like:
(venv) priyanshu@...
🚀 Step 2: Run uvicorn correctly (from venv)
Now try:
uvicorn app.main:app --reload
❗ If still “command not found”
Then install uvicorn inside venv:
pip install uvicorn
Then run again:
uvicorn app.main:app --reload
🧠 Alternative SAFE met