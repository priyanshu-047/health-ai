def triage(symptoms: str, risk_score: float = None):

    symptoms = symptoms.lower()

    # 🚨 CRITICAL override (NEW KB BASED LOGIC)
    critical_keywords = [
        "chest pain", "heart attack", "breathing difficulty",
        "unconscious", "collapse"
    ]

    if any(word in symptoms for word in critical_keywords):
        return "CRITICAL_RISK"

    if risk_score is None:
        return "LOW_RISK"

    if risk_score >= 80:
        return "CRITICAL_RISK"

    elif risk_score >= 60:
        return "HIGH_RISK"

    elif risk_score >= 40:
        return "MID_RISK"

    else:
        return "LOW_RISK"