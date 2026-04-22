from app.models.symptom.model import predict
from app.core.triage_engine import triage
from app.core.risk_engine import calculate_risk
from app.core.rule_booster import boost_prediction
from app.core.decision_engine import decide_action
from app.services.medicine_service import get_medicines
from app.services.home_remedy_service import get_home_remedies


def analyze_symptoms(data):

    symptoms = data.get("symptoms", "")
    
    # Convert list of symptoms to a single string
    if isinstance(symptoms, list):
        symptoms_str = " ".join(str(s) for s in symptoms)
    else:
        symptoms_str = str(symptoms)

    # 1. ML prediction
    ml = predict(symptoms_str)

    # 2. SAFE CLEANING of predictions
    raw_predictions = ml.get("all_predictions", [])
    predictions = [
        p for p in raw_predictions
        if isinstance(p, dict) and "probability" in p
    ]

    # 3. Boost predictions
    boosted = boost_prediction(symptoms_str, predictions)
    ml["all_predictions"] = boosted

    # 4. Top disease
    top = max(boosted, key=lambda x: x["probability"])
    ml["top_disease"] = top["disease"]
    ml["confidence"] = top["probability"]

    # 5. Triage
    triage_level = triage(symptoms_str)

    # 6. Risk calculation
    probs = [d["probability"] for d in boosted]
    risk_score = calculate_risk(symptoms_str, probs, triage_level)

    # 7. Decision engine
    recommendation = decide_action(risk_score, triage_level)

    # ---------------- MEDICAL SAFETY ENGINE ----------------

    medicines = []
    home_remedies = []

    t = triage_level.upper()

    # 🔴 CRITICAL OVERRIDE (NO EXCEPTIONS)
    if "CRITICAL" in t or risk_score >= 85:
        return {
            "input": symptoms,
            "prediction": ml,
            "triage": "CRITICAL_RISK",
            "risk_score": risk_score,
            "recommendation": "CALL_EMERGENCY_SERVICES_IMMEDIATELY",
            "medicines": [],
            "home_remedies": []
        }

    # 🟠 HIGH → doctor only
    if "HIGH" in t:
        medicines = get_medicines(ml["top_disease"], ml["confidence"])
        home_remedies = []

    # 🟡 MID → medicine only
    elif "MID" in t:
        medicines = get_medicines(ml["top_disease"], ml["confidence"])
        home_remedies = []

    # 🟢 LOW → full care
    else:
        medicines = get_medicines(ml["top_disease"], ml["confidence"])
        home_remedies = get_home_remedies(ml["top_disease"], ml["confidence"])

    return {
        "input": symptoms,
        "prediction": ml,
        "triage": triage_level,
        "risk_score": risk_score,
        "recommendation": recommendation,
        "medicines": medicines,
        "home_remedies": home_remedies
    }