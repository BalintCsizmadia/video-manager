# Video Manager demo project

## Description:

### This is a small demo application with Spring Boot and React.

### Functionality:
- Add videos (name, url, duration, description) to a list (Available videos)
- Add videos to another list (Playlist) from Available videos
- Remove videos from playlist
- Play videos (by clicking their names)

# 

## Main parts:
- Backend: Java Spring Boot application
- Frontend: React web applcation

# 

## Running:

### 1. **On local machine:**
1. **Database**: 
* Create a **PostgreSQL** database:
* name: **videomanager**
* host: **localhost**
* port: **5433**
* username: **postgres**
* password: **admin**

### 

*(You can modify these properties in **backend/src/main/resources/application.properties**)*

---

Navigate to the root (backend/frontend) of the project via command line and execute the command above:

2. **Backend**:
- **mvn spring-boot:run**

3. **Frontend**:
- Before first running (install dependencies): **npm install**
- **npm start**

Application is running on http://localhost:3000/

#
### 2. **With Docker:**

Navigate to the root (backend/frontend) of the project via command line and execute the command above:

0. **Database**:
- Change the **spring.datasource.url** in **backend/src/main/resources/application.properties** from Local to Docker
* * **local:** jdbc:postgresql://localhost:5433/videomanager
* * **docker:** jdbc:postgresql://futurevending-postgres:5432/videomanager

1. **Backend**:
- **mvn clean package**
- **docker build -t="videomanagerbackdev:9.11.28" .**

2. **Frontend**:
- **docker build -t="videomanagerfrontdev:9.11.28" .**

3. **Root** folder:
- **docker-compose up**

Application is running on http://localhost:3001/
