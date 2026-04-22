def decide_action(risk_score, triage_level):

    t = triage_level.upper()

    if "CRITICAL" in t:
        return "CALL_EMERGENCY_IMMEDIATELY"

    elif "HIGH" in t:
        return "URGENT_DOCTOR_VISIT"

    elif "MID" in t:
        return "DOCTOR_CONSULTATION"

    else:
        return "HOME_CARE_POSSIBLE"