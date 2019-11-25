package com.futurevending.videomanager.service;

import com.futurevending.videomanager.exception.VideoAlreadyExistsException;
import com.futurevending.videomanager.model.Video;
import com.futurevending.videomanager.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    public Video add(Video video) throws DataIntegrityViolationException, VideoAlreadyExistsException {
        try {
            return videoRepository.save(video);
        } catch (DataIntegrityViolationException ex) {
            throw new VideoAlreadyExistsException();
        }
    }

    public List<Video> getAll() {
        return videoRepository.findAllByOrderByIdAsc();
    }

    public Video getOne(Integer id) {
        return videoRepository.getOne(id);
    }

    public List<Video> getByIsAvailable(boolean available) {
        return videoRepository.findByIsAvailable(available);
    }

    public void updateAvailability(Integer id, Video updatedVideo) {
        Video video = videoRepository.getOne(id);
        video.setAvailable(updatedVideo.isAvailable());
        videoRepository.save(video);
    }

    public void removeFromPlaylist(Integer id) {
        Video video = videoRepository.getOne(id);
        video.setAvailable(false);
        videoRepository.save(video);
    }

}
