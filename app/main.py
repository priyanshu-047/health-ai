from fastapi import FastAPI
from app.api.router import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS to handle preflight requests properly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Allow both localhost variants
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.include_router(router, prefix="/api")