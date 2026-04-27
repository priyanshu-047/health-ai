# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Environment variables (can be overridden)
ENV MONGODB_ATLAS_URI=mongodb://localhost:27017/health_ai
ENV OLLAMA_BASE_URL=http://localhost:11434
ENV OLLAMA_MODEL=llama3

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]