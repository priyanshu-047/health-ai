def boost_prediction(symptoms, predictions):

    # safety check (VERY IMPORTANT)
    if not predictions or isinstance(predictions[0], float):
        return []

    keyword_map = {
        "fever": "viral_fever",
        "chest pain": "heart_issue",
        "headache": "migraine"
    }

    symptoms = symptoms.lower()

    for key, disease in keyword_map.items():
        if key in symptoms:
            for p in predictions:
                if p["disease"] == disease:
                    p["probability"] = min(1.0, p["probability"] + 0.2)

    return sorted(predictions, key=lambda x: x["probability"], reverse=True)