from app.models.symptom.model import predict

result = predict("fever cough headache")

print(result)