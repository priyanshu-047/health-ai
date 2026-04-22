def calculate_risk(symptoms, probs, triage_level):

    base = max(probs) * 100

    # boost logic based on triage
    if "CRITICAL" in triage_level:
        return max(base, 90)

    elif "HIGH" in triage_level:
        return max(base, 70)

    elif "MID" in triage_level:
        return max(base, 50)

    else:
        return min(base, 30)