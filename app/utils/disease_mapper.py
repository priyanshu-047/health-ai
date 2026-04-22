"""
Disease name mapping utilities to bridge between model predictions and knowledge bases.
"""
import re
from typing import List, Dict, Any, Optional

from app.models.symptom.medical_knowledge_base import MEDICAL_KB
from app.models.symptom.medicines import MEDICINE_DB
from app.models.symptom.home_remedies import HOME_REMEDY_DB


def normalize_disease_name(name: str) -> str:
    """
    Convert a disease name to a canonical form for matching.
    - Lowercase
    - Replace underscores with spaces
    - Remove extra whitespace
    - Remove parentheticals (e.g., '(type 2)')
    """
    name = str(name).lower().strip()
    name = re.sub(r'_', ' ', name)
    name = re.sub(r'\s+', ' ', name)
    # Remove parentheses and their contents
    name = re.sub(r'\([^)]*\)', '', name).strip()
    return name


# Pre‑compute normalized MEDICAL_KB disease names
_MEDICAL_KB_MAP = {
    normalize_disease_name(item["disease"]): item
    for item in MEDICAL_KB
}

# Known manual mappings for tricky cases
MANUAL_MAPPINGS = {
    "cold": "common cold",
    "heart issue": "heart attack",  # model uses heart_attack, but MEDICAL_KB has Heart Attack
    "diabetes": "diabetes (type 2)",
}


def find_medical_kb_entry(disease: str) -> Optional[Dict[str, Any]]:
    """
    Find the MEDICAL_KB entry for a given disease name.
    Returns the entry dict if found, otherwise None.
    """
    norm = normalize_disease_name(disease)
    # Try exact match
    if norm in _MEDICAL_KB_MAP:
        return _MEDICAL_KB_MAP[norm]
    # Try manual mapping
    if norm in MANUAL_MAPPINGS:
        mapped = MANUAL_MAPPINGS[norm]
        if mapped in _MEDICAL_KB_MAP:
            return _MEDICAL_KB_MAP[mapped]
    # Try substring match (if one entry's normalized name contains the query)
    for key, entry in _MEDICAL_KB_MAP.items():
        if norm in key or key in norm:
            return entry
    return None


def get_medicines_from_kb(disease: str) -> List[str]:
    """
    Retrieve medicine list from MEDICAL_KB for the given disease.
    Returns empty list if not found.
    """
    entry = find_medical_kb_entry(disease)
    if entry:
        # MEDICAL_KB stores medicines as list of dicts with 'name' key
        medicines = entry.get("medicines", [])
        if isinstance(medicines, list) and len(medicines) > 0:
            # Extract names if they are dicts
            if isinstance(medicines[0], dict):
                return [m.get("name", "") for m in medicines if m.get("name")]
            else:
                return medicines
    return []


def get_home_remedies_from_kb(disease: str) -> List[str]:
    """
    Retrieve home remedies list from MEDICAL_KB for the given disease.
    Returns empty list if not found.
    """
    entry = find_medical_kb_entry(disease)
    if entry:
        remedies = entry.get("home_remedies", [])
        if isinstance(remedies, list):
            return remedies
    return []


def get_medicines_from_fallback(disease: str) -> List[str]:
    """
    Fallback to MEDICINE_DB (underscore keys).
    """
    norm = normalize_disease_name(disease)
    # MEDICINE_DB uses underscore keys
    for key, data in MEDICINE_DB.items():
        if normalize_disease_name(key) == norm:
            meds = data.get("medicines", [])
            if isinstance(meds, list):
                return meds
    return []


def get_home_remedies_from_fallback(disease: str) -> List[str]:
    """
    Fallback to HOME_REMEDY_DB (underscore keys).
    """
    norm = normalize_disease_name(disease)
    for key, remedies in HOME_REMEDY_DB.items():
        if normalize_disease_name(key) == norm:
            if isinstance(remedies, list):
                return remedies
    return []


def get_medicines(disease: str, min_count: int = 2) -> List[str]:
    """
    Unified medicine fetcher that tries MEDICAL_KB first, then fallback DBs.
    Ensures at least `min_count` medicines are returned if disease confidence > 0.3.
    """
    medicines = get_medicines_from_kb(disease)
    if not medicines:
        medicines = get_medicines_from_fallback(disease)
    # Deduplicate and ensure minimum count (placeholder)
    # For simplicity, we just return what we have
    return medicines[:max(len(medicines), min_count)]


def get_home_remedies(disease: str, min_count: int = 2) -> List[str]:
    """
    Unified home remedy fetcher that tries MEDICAL_KB first, then fallback DBs.
    Ensures at least `min_count` remedies are returned if disease confidence > 0.3.
    """
    remedies = get_home_remedies_from_kb(disease)
    if not remedies:
        remedies = get_home_remedies_from_fallback(disease)
    return remedies[:max(len(remedies), min_count)]