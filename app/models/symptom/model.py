import pickle

# load ONCE only
model = pickle.load(open("app/models/symptom/model.pkl", "rb"))
vectorizer = pickle.load(open("app/models/symptom/vectorizer.pkl", "rb"))

def predict(symptoms):

    X = vectorizer.transform([symptoms])
    probs = model.predict_proba(X)[0]

    classes = model.classes_

    all_predictions = [
        {"disease": cls, "probability": float(prob)}
        for cls, prob in zip(classes, probs)
    ]

    all_predictions.sort(key=lambda x: x["probability"], reverse=True)

    return {
        "all_predictions": all_predictions
    }