from app.models.symptom.medical_knowledge_base import MEDICAL_KB

def get_medicines(disease_name: str):

    for item in MEDICAL_KB:
        if item["disease"].lower() == disease_name.lower():
            return item.get("medicines", [])

    return []