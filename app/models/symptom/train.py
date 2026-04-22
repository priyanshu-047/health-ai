import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import os

def main():
    # Load data
    data_path = os.path.join(os.path.dirname(__file__), 'data.csv')
    df = pd.read_csv(data_path)
    
    # Ensure columns exist
    if 'symptoms' not in df.columns or 'label' not in df.columns:
        raise ValueError("CSV must have 'symptoms' and 'label' columns")
    
    X = df['symptoms'].astype(str).tolist()
    y = df['label'].astype(str).tolist()
    
    print(f"Loaded {len(X)} samples with {len(set(y))} unique labels")
    print("Labels:", sorted(set(y)))
    
    # Vectorizer (same parameters as before)
    vectorizer = TfidfVectorizer(
        ngram_range=(1, 2),
        min_df=1,
        max_df=0.85,
        sublinear_tf=True
    )
    
    X_vec = vectorizer.fit_transform(X)
    print(f"Vectorized features: {X_vec.shape}")
    
    # Split for evaluation (optional)
    X_train, X_test, y_train, y_test = train_test_split(
        X_vec, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Train classifier
    clf = LogisticRegression(
        max_iter=1000,
        random_state=42,
        class_weight='balanced'  # handle slight imbalance
    )
    clf.fit(X_train, y_train)
    
    # Evaluate
    y_pred = clf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\nTest Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, target_names=sorted(set(y))))
    
    # Retrain on full dataset for production
    clf_full = LogisticRegression(
        max_iter=1000,
        random_state=42,
        class_weight='balanced'
    )
    clf_full.fit(X_vec, y)
    
    # Save model and vectorizer
    model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
    vectorizer_path = os.path.join(os.path.dirname(__file__), 'vectorizer.pkl')
    
    with open(model_path, 'wb') as f:
        pickle.dump(clf_full, f)
    with open(vectorizer_path, 'wb') as f:
        pickle.dump(vectorizer, f)
    
    print(f"\nModel saved to {model_path}")
    print(f"Vectorizer saved to {vectorizer_path}")
    
    # Quick sanity check
    sample = "fever cough headache"
    sample_vec = vectorizer.transform([sample])
    proba = clf_full.predict_proba(sample_vec)[0]
    classes = clf_full.classes_
    top_idx = proba.argmax()
    print(f"\nSanity check for '{sample}':")
    print(f"  Predicted: {classes[top_idx]} with probability {proba[top_idx]:.4f}")

if __name__ == "__main__":
    main()