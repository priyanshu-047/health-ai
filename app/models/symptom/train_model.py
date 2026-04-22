import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib
import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATA_PATH = os.path.join(BASE_DIR, "data.csv")

df = pd.read_csv(DATA_PATH)


# ---------------- INPUT FEATURES ----------------
X = df["symptoms"] + " " + df["keywords"]
y = df["disease"]

# ---------------- TRAIN TEST SPLIT ----------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ---------------- VECTORIZE ----------------
vectorizer = TfidfVectorizer()
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# ---------------- MODEL ----------------
model = LogisticRegression(max_iter=1000)
model.fit(X_train_vec, y_train)

# ---------------- SAVE MODEL ----------------
joblib.dump(model, "app/models/symptom/model.pkl")
joblib.dump(vectorizer, "app/models/symptom/vectorizer.pkl")

print("✅ Model trained successfully")