from app.models.symptom.model import predict
from app.core.triage_engine import triage
from app.core.risk_engine import calculate_risk
from app.core.rule_booster import rule_engine   # ✅ FIXED
from app.core.decision_engine import decide_action
from app.services.medicine_service import get_medicines
from app.services.home_remedy_service import get_home_remedies
from app.core.doctor_engine import doctor_engine

def analyze_symptoms(data):

    symptoms = data.get("symptoms", "")

    if isinstance(symptoms, list):
        symptoms_str = " ".join(str(s) for s in symptoms)
    else:
        symptoms_str = str(symptoms)

    # ---------------- 1. RULE ENGINE ----------------
    rule_result = rule_engine(symptoms_str)

    if rule_result.get("override", False):
        top = rule_result["diseases"][0]

        triage_level = "HIGH"
        risk_score = compute_rule_risk(rule_result, triage_level)
        recommendation = decide_action(risk_score, triage_level)

        rule_predictions = [
            {"disease": d[0], "probability": d[1]}
            for d in rule_result["diseases"]
        ]

        doctor_result = doctor_engine(rule_predictions)

        return {
            "input": symptoms_str,
            "prediction": {
                "all_predictions": rule_predictions,
                "top_disease": top[0],
                "confidence": top[1]
            },
            "triage": "RULE_BASED",
            "risk_score": risk_score,
            "recommendation": recommendation,
            "medicines": doctor_result["medicines"],
            "home_remedies": doctor_result["home_remedies"],
            "warnings": doctor_result["warnings"]
        }

    # ---------------- 2. ML MODEL ----------------
    ml = predict(symptoms_str)

    predictions = [
        p for p in ml.get("all_predictions", [])
        if isinstance(p, dict) and "probability" in p
    ]

    if predictions:
        top = max(predictions, key=lambda x: x["probability"])
        ml["top_disease"] = top["disease"]
        ml["confidence"] = top["probability"]

    # ---------------- 3. TRIAGE ----------------
    triage_level = triage(symptoms_str)

    # ---------------- 4. RISK ----------------
    probs = [d["probability"] for d in predictions] if predictions else [0.1]
    risk_score = calculate_risk(symptoms_str, probs, triage_level)

    # ---------------- 5. DECISION ----------------
    recommendation = decide_action(risk_score, triage_level)

    # ---------------- 6. CRITICAL SAFETY ----------------
    if "CRITICAL" in triage_level.upper() or risk_score >= 85:
        return {
            "input": symptoms_str,
            "prediction": ml,
            "triage": "CRITICAL_RISK",
            "risk_score": risk_score,
            "recommendation": "CALL_EMERGENCY_SERVICES_IMMEDIATELY",
            "medicines": [],
            "home_remedies": [],
            "warnings": ["Emergency condition detected"]
        }

    # ---------------- 7. DOCTOR ENGINE ----------------
    doctor_result = doctor_engine(predictions)

    return {
        "input": symptoms_str,
        "prediction": ml,
        "triage": triage_level,
        "risk_score": risk_score,
        "recommendation": recommendation,
        "medicines": doctor_result["medicines"],
        "home_remedies": doctor_result["home_remedies"],
        "warnings": doctor_result["warnings"]
    }
def process_symptoms(data):
    return analyze_symptoms(data)

def compute_rule_risk(rule_result, triage_level):
    base = rule_result.get("severity", 0.5)

    triage_weight = {
        "LOW": 40,
        "MID": 60,
        "HIGH": 80,
        "CRITICAL": 95
    }

    triage_score = triage_weight.get(triage_level.upper(), 50)

    return int((base * 100 * 0.6) + (triage_score * 0.4))