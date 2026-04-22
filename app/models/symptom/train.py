from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer(
    ngram_range=(1,2),
    min_df=1,
    max_df=0.85,
    sublinear_tf=True
)