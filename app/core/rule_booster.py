def rule_engine(symptoms: str):
    text = symptoms.lower()

    if ("pain during urination" in text and ("pink" in text or "blood" in text or "brown" in text)):

        severity = 0.75  # base severity

        # increase severity if blood is present strongly
        if "blood" in text:
            severity = 0.9
        elif "brown" in text:
            severity = 0.85

        return {
            "diseases": [
                ("urinary_tract_infection", 0.95),
                ("kidney_stone", 0.9),
                ("bladder_infection", 0.85)
            ],
            "override": True,
            "severity": severity   # ✅ NEW
        }

    return {"override": False}