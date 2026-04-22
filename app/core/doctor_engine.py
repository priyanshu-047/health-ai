from app.core.knowledge.medical_kb import medical_kb

def doctor_engine(predictions):

    medicines = []
    home_remedies = []
    warnings = []

    for item in predictions[:3]:
        disease = item["disease"]
        prob = item["probability"]

        if disease in medical_kb:
            kb = medical_kb[disease]

            # SAFETY RULE
            if kb["risk"] == "HIGH" or prob >= 0.7:
                warnings.append(f"{disease} → Consult doctor immediately")

            medicines.extend(kb.get("medicines", []))
            home_remedies.extend(kb.get("home_remedies", []))

    return {
        "medicines": list(set(medicines)),
        "home_remedies": list(set(home_remedies)),
        "warnings": list(set(warnings))
    }