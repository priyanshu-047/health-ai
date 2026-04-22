from app.utils.disease_mapper import get_home_remedies as get_home_remedies_unified


def get_home_remedies(disease_name: str, confidence: float = 0.0):
    """
    Return home remedy recommendations for a given disease.
    Uses unified fetcher from disease_mapper which tries MEDICAL_KB first,
    then falls back to HOME_REMEDY_DB if KB returns empty list.
    
    If confidence > 0.3, ensures at least 2 remedies are returned.
    Returns a list of remedy strings. Empty list if none found.
    """
    min_count = 2 if confidence > 0.3 else 0
    return get_home_remedies_unified(disease_name, min_count=min_count)