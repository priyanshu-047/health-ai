import pickle

# load ONCE only
model = pickle.load(open("app/models/symptom/model.pkl", "rb"))
vectorizer = pickle.load(open("app/models/symptom/vectorizer.pkl", "rb"))

def predict(symptoms):
    # If symptoms is a list, join into a single string
    if isinstance(symptoms, list):
        symptoms = " ".join(str(s) for s in symptoms)
    # Ensure symptoms is a string
    symptoms = str(symptoms)

    X = vectorizer.transform([symptoms])
    probs = model.predict_proba(X)[0]

    classes = model.classes_

    all_predictions = [
        {"disease": str(cls), "probability": float(prob)}
        for cls, prob in zip(classes, probs)
    ]

    all_predictions.sort(key=lambda x: x["probability"], reverse=True)

    return {
        "all_predictions": all_predictions
    }