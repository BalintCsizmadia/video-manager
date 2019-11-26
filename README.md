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

## Easy run:
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
- **npm run**
