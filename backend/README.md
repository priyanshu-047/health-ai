# Health-AI Assistant Backend

A production-ready Spring Boot backend that connects to a locally running AI model using Ollama and stores data in MongoDB Atlas.

## Features

- **REST APIs** for health analysis with AI-generated suggestions
- **Ollama Integration** for local AI model inference (llama3, mistral, etc.)
- **MongoDB Atlas** for persistent storage of health records
- **Reactive Programming** using Spring WebFlux
- **Caching** for repeated AI prompts (Caffeine)
- **Comprehensive Logging** with SLF4J
- **Global Exception Handling** with structured error responses
- **Unit Tests** for service and controller layers
- **Docker Support** for containerized deployment
- **OpenAPI Documentation** via Swagger UI

## Tech Stack

- Java 17+
- Spring Boot 3.2.5
- Spring WebFlux (Reactive)
- Spring Data MongoDB Reactive
- MongoDB Atlas (or local MongoDB)
- Lombok
- Maven
- Caffeine Cache
- Swagger/OpenAPI 3

## Prerequisites

1. **Java 17+** installed
2. **Maven** installed
3. **MongoDB Atlas** account or local MongoDB instance
4. **Ollama** installed and running locally (default: http://localhost:11434)

## Configuration

Edit `src/main/resources/application.yml` or set environment variables:

```yaml
spring:
  data:
    mongodb:
      uri: ${MONGODB_ATLAS_URI:mongodb://localhost:27017/health_ai}

ollama:
  base-url: ${OLLAMA_BASE_URL:http://localhost:11434}
  model: ${OLLAMA_MODEL:llama3}
```

Environment variables:
- `MONGODB_ATLAS_URI`: MongoDB connection string
- `OLLAMA_BASE_URL`: Ollama API base URL
- `OLLAMA_MODEL`: Model name (llama3, mistral, etc.)

## Running the Application

### 1. Using Maven

```bash
cd backend
mvn spring-boot:run
```

### 2. Using Docker

Build the Docker image:

```bash
docker build -t health-ai-backend .
```

Run the container:

```bash
docker run -p 8080:8080 \
  -e MONGODB_ATLAS_URI=<your_mongo_uri> \
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 \
  health-ai-backend
```

### 3. Direct JAR execution

```bash
mvn clean package
java -jar target/health-ai-backend-1.0.0.jar
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/health/analyze` | Analyze health symptoms and get AI-generated suggestions |
| GET    | `/api/health/history` | Retrieve all previous health analysis records |
| POST   | `/api/health/save`    | Manually save a health analysis record |

### Example Request

```json
POST /api/health/analyze
{
  "symptoms": "fever, headache",
  "age": 25,
  "gender": "male",
  "lifestyle": "sedentary"
}
```

### Example Response

```json
{
  "possibleConditions": ["Common cold", "Flu"],
  "homeRemedies": ["Rest", "Hydration"],
  "dietPlan": ["Soup", "Fruits"],
  "exercise": ["Light walking"],
  "precautions": ["Avoid cold", "Take rest"],
  "disclaimer": "This is not medical advice. Consult a healthcare professional for accurate diagnosis."
}
```

## API Documentation

Once the application is running, access Swagger UI at:

```
http://localhost:8080/api/swagger-ui.html
```

OpenAPI spec available at:

```
http://localhost:8080/api/v3/api-docs
```

## Project Structure

```
src/main/java/com/healthai/backend/
├── config/           # Configuration classes
├── controller/       # REST controllers
├── service/          # Business logic services
├── repository/       # MongoDB repositories
├── model/            # Entity classes
├── dto/              # Data transfer objects
└── exception/        # Exception handling
```

## Testing

Run unit tests:

```bash
mvn test
```

## Logging

Logs are configured in `application.yml`. Default level is `DEBUG` for the application package.

## Caching

AI responses are cached for identical prompts (key: symptoms+age+gender+lifestyle) with a TTL of 10 minutes.

## Error Handling

The application provides structured error responses for:

- Validation errors (HTTP 400)
- Ollama service unavailable (HTTP 503)
- Internal server errors (HTTP 500)

Example error response:

```json
{
  "status": 400,
  "error": "Validation failed",
  "message": "Age must be positive",
  "timestamp": "2026-04-27T14:30:00"
}
```

## Integration with Frontend

The existing React frontend can be configured to use this backend by setting the environment variable:

```
VITE_API_URL=http://localhost:8080
```

Update the frontend API calls to match the new endpoints.

## License

MIT