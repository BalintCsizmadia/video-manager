package com.futurevending.videomanager.controller;

import com.futurevending.videomanager.exception.VideoAlreadyExistsException;
import com.futurevending.videomanager.model.Video;
import com.futurevending.videomanager.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class VideoController {

    @Autowired
    private VideoService videoService;

    @RequestMapping(path = "/videos",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Video> getAll() {
        return videoService.getAll();
    }

    @RequestMapping(path = "videos/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Video getOne(@PathVariable("id") Integer id) {
        return videoService.getOne(id);
    }

    @RequestMapping(path = "videos/{id}",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void update(@PathVariable("id") Integer id, @RequestBody Video video) {
        // update one video's "available" member
        videoService.updateAvailability(id, video);
    }

    // TODO implement
    @RequestMapping(path = "videos/add",
            method = RequestMethod.POST)
    public Video add(@RequestBody Video video) throws VideoAlreadyExistsException {
        try {
            return videoService.add(video);
        } catch (VideoAlreadyExistsException e) {
            e.printStackTrace();
            throw new VideoAlreadyExistsException();
        }
    }
    // available -> in the playlist
    @RequestMapping(path = "videos/playlist",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Video> getByIsAvailable() {
        return videoService.getByIsAvailable(true);
    }

    @RequestMapping(path = "videos/playlist",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void updatePlaylist(@RequestBody List<Video> videos) {
        // Update multiple videos' "available" member
        for (Video video : videos) {
            videoService.updateAvailability(video.getId(), video);
        }
    }

    @RequestMapping(path = "videos/playlist/{id}",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void removeFromPlaylist(@PathVariable Integer id) {
        videoService.removeFromPlaylist(id);
    }
}
