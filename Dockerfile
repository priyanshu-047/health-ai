FROM python:3.10-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# system dependencies
RUN apt-get update && apt-get install -y build-essential \
    && rm -rf /var/lib/apt/lists/*

# install python dependencies directly
RUN pip install --upgrade pip && pip install \
    fastapi \
    uvicorn[standard] \
    pydantic \
    python-dotenv \
    requests \
    httpx \
    numpy \
    pandas \
    scikit-learn \
    loguru \
    joblib \
    aiofiles \
    nltk \
    scipy

# copy app code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]