FROM openjdk:11-jre-slim

ARG JAR_FILE=build/libs/backend-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar

EXPOSE 8093
ENTRYPOINT ["java", "-jar", "app.jar"]