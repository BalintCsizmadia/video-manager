package com.futurevending.videomanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "This video is already in the playlist")
public class VideoAlreadyExistsException extends Exception {

    public VideoAlreadyExistsException() {
    }

    public VideoAlreadyExistsException(String message) {
        super(message);
    }
}
