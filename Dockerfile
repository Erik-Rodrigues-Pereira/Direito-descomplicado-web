# Estágio de Build (onde o Maven compila o JAR)
FROM openjdk:21-jdk-slim AS build

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o código e as ferramentas de build
COPY . /app

# Roda o Build do Maven (o mesmo comando que resultou em BUILD SUCCESS)
RUN ./mvnw -Pprod package -DskipTests

# --- Estágio de Execução (Runtime) ---
# Imagem base mais leve para execução
FROM openjdk:21-jdk-slim

# Define o perfil de produção
ENV SPRING_PROFILES_ACTIVE=prod

# Porta exposta
EXPOSE 8080

# Copia o JAR do estágio de build
COPY --from=build /app/target/*.jar app.jar

# Define o comando de inicialização
ENTRYPOINT ["java", "-jar", "/app.jar"]