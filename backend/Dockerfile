
# Start with a base image containing Java runtime
FROM openjdk:8-jdk-alpine

# Add Maintainer Info
# LABEL maintainer="a@b.com"

# Add a volume pointing to /tmp
VOLUME /tmp

# Make port 8080 available to the world outside this container
EXPOSE 8080

# The application's jar file
ARG JAR_FILE=target/video-manager-0.0.1-SNAPSHOT.jar

# Add the application's jar to the container
ADD ${JAR_FILE} video-manager.jar

# Run the jar file 
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/video-manager.jar"]


# 1st step ->  mvn clean package

# 2nd step -> docker build -t="videomanagerbackdev:9.11.28" .

