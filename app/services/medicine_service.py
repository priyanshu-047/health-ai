from app.utils.disease_mapper import get_medicines as get_medicines_unified


def get_medicines(disease_name: str, confidence: float = 0.0):
    """
    Return medicine recommendations for a given disease.
    Uses unified fetcher from disease_mapper which tries MEDICAL_KB first,
    then falls back to MEDICINE_DB if KB returns empty list.
    
    If confidence > 0.3, ensures at least 2 medicines are returned.
    Returns a list of medicine names (strings). Empty list if none found.
    """
    min_count = 2 if confidence > 0.3 else 0
    return get_medicines_unified(disease_name, min_count=min_count)