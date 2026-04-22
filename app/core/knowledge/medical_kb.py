medical_kb = {

    # ---------------- GENERAL ----------------
    "viral_fever": {
        "medicines": ["Paracetamol"],
        "home_remedies": ["Rest", "Hydration", "Warm fluids"],
        "risk": "LOW"
    },
    "common_cold": {
        "medicines": ["Paracetamol", "Antihistamine"],
        "home_remedies": ["Steam inhalation", "Warm water"],
        "risk": "LOW"
    },
    "influenza": {
        "medicines": ["Oseltamivir (doctor prescribed)"],
        "home_remedies": ["Rest", "Steam", "Fluids"],
        "risk": "MID"
    },

    # ---------------- FEVER TYPES ----------------
    "dengue": {
        "medicines": ["Paracetamol"],
        "home_remedies": ["Papaya leaf extract", "Fluids"],
        "risk": "HIGH"
    },
    "dengue_hemorrhagic": {
        "medicines": ["Hospital care required"],
        "home_remedies": ["Fluids"],
        "risk": "HIGH"
    },
    "malaria": {
        "medicines": ["Antimalarial drugs (doctor)"],
        "home_remedies": ["Rest", "Fluids"],
        "risk": "HIGH"
    },
    "typhoid": {
        "medicines": ["Antibiotics (doctor prescribed)"],
        "home_remedies": ["Boiled water", "Soft diet"],
        "risk": "HIGH"
    },

    # ---------------- RESPIRATORY ----------------
    "asthma": {
        "medicines": ["Inhaler (Salbutamol)"],
        "home_remedies": ["Avoid triggers", "Steam"],
        "risk": "MID"
    },
    "bronchitis": {
        "medicines": ["Cough syrup", "Bronchodilator"],
        "home_remedies": ["Steam", "Warm fluids"],
        "risk": "MID"
    },
    "pneumonia": {
        "medicines": ["Antibiotics"],
        "home_remedies": ["Rest"],
        "risk": "HIGH"
    },

    # ---------------- DIGESTIVE ----------------
    "gastritis": {
        "medicines": ["Antacids"],
        "home_remedies": ["Avoid spicy food"],
        "risk": "LOW"
    },
    "acid_reflux": {
        "medicines": ["Omeprazole"],
        "home_remedies": ["Eat small meals"],
        "risk": "LOW"
    },
    "food_poisoning": {
        "medicines": ["ORS", "Antibiotics (if severe)"],
        "home_remedies": ["Hydration"],
        "risk": "MID"
    },
    "gastroenteritis": {
        "medicines": ["ORS", "Probiotics"],
        "home_remedies": ["Fluids"],
        "risk": "MID"
    },

    # ---------------- URINARY ----------------
    "urinary_tract_infection": {
        "medicines": ["Antibiotics"],
        "home_remedies": ["Drink water"],
        "risk": "MID"
    },
    "kidney_stone": {
        "medicines": ["Painkillers"],
        "home_remedies": ["Hydration"],
        "risk": "MID"
    },
    "kidney_infection": {
        "medicines": ["Antibiotics"],
        "home_remedies": ["Fluids"],
        "risk": "HIGH"
    },

    # ---------------- HEART ----------------
    "heart_attack": {
        "medicines": ["Emergency care"],
        "home_remedies": [],
        "risk": "CRITICAL"
    },
    "hypertension": {
        "medicines": ["Amlodipine"],
        "home_remedies": ["Low salt diet"],
        "risk": "MID"
    },

    # ---------------- NEURO ----------------
    "migraine": {
        "medicines": ["Pain relievers"],
        "home_remedies": ["Dark room rest"],
        "risk": "LOW"
    },
    "meningitis": {
        "medicines": ["Hospital antibiotics"],
        "home_remedies": [],
        "risk": "CRITICAL"
    },

    # ---------------- SKIN ----------------
    "fungal_infection": {
        "medicines": ["Antifungal cream"],
        "home_remedies": ["Keep dry"],
        "risk": "LOW"
    },
    "eczema": {
        "medicines": ["Steroid cream"],
        "home_remedies": ["Moisturize"],
        "risk": "LOW"
    },

    # ---------------- ENDOCRINE ----------------
    "diabetes": {
        "medicines": ["Metformin"],
        "home_remedies": ["Diet control"],
        "risk": "MID"
    },
    "hypothyroidism": {
        "medicines": ["Thyroxine"],
        "home_remedies": [],
        "risk": "LOW"
    },

    # ---------------- LIVER ----------------
    "hepatitis": {
        "medicines": ["Antiviral"],
        "home_remedies": ["Rest"],
        "risk": "HIGH"
    },
    "fatty_liver": {
        "medicines": [],
        "home_remedies": ["Weight loss"],
        "risk": "MID"
    },

    # ---------------- BONE ----------------
    "arthritis": {
        "medicines": ["Pain relievers"],
        "home_remedies": ["Exercise"],
        "risk": "LOW"
    },

    # ---------------- EMERGENCY ----------------
    "stroke": {
        "medicines": ["Emergency care"],
        "home_remedies": [],
        "risk": "CRITICAL"
    },

    # ---------------- COVID ----------------
    "covid19": {
        "medicines": ["Paracetamol"],
        "home_remedies": ["Isolation", "Fluids"],
        "risk": "MID"
    }
}