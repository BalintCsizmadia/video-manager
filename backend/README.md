# Endpoints:

prefix: http://localhost:8080

## **GET**

### All videos
- /videos

### Video by ID
- /videos/`<video_id>`

### All videos from playlist *( is_available = true )*
- /videos/playlist

#

## **POST**

### Add video
- /videos/add 
  - { name, url, duration, description, isAvailable}

### Remove from playlist *( is_available = false )*
- /videos/playlist/`<video_id>`

#

## **PUT**

### Update video
- /videos/`<video_id>`
  - {name, url, duration, description, isAvailable}


### Update playlist
- /videos/playlist
  - List`<{name, url, duration, description, isAvailable}>`
