# Usa una imagen de Maven para construir tu proyecto
FROM maven:3.8.4-openjdk-17-slim AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu proyecto al contenedor
COPY . /app

# Construye tu aplicación
RUN mvn clean package

# Crea una imagen JRE (sin Maven) para ejecutar tu aplicación
FROM openjdk:17-slim

WORKDIR /app

# Copia el archivo JAR de la fase de construcción anterior
COPY --from=build /app/target/*.jar /app/api-market.jar

EXPOSE 8080
# Establece el comando de inicio de tu aplicación
CMD ["java", "-jar", "api-market.jar"]
