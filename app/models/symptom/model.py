import joblib

model = joblib.load("app/models/symptom/model.pkl")
vectorizer = joblib.load("app/models/symptom/vectorizer.pkl")

def predict(symptoms_text):
    X = vectorizer.transform([symptoms_text])
    
    probs = model.predict_proba(X)[0]
    classes = model.classes_

    all_predictions = [
        {"disease": classes[i], "probability": float(probs[i])}
        for i in range(len(classes))
    ]

    all_predictions.sort(key=lambda x: x["probability"], reverse=True)

    return {
        "all_predictions": all_predictions,
        "top_disease": all_predictions[0]["disease"],
        "confidence": all_predictions[0]["probability"]
    }