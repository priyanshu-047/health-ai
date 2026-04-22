def decide_action(risk_score, triage_level):

    t = triage_level.upper()

    if "CRITICAL" in t or risk_score >= 90:
        return "CALL_EMERGENCY_SERVICES_IMMEDIATELY"

    if "HIGH" in t or risk_score >= 75:
        return "CONSULT_DOCTOR_WITHIN_24_HOURS"

    if "MID" in t or risk_score >= 50:
        return "HOME_CARE_WITH_MONITORING"

    return "HOME_CARE_POSSIBLE"