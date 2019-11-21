package com.futurevending.videomanager.service;

import com.futurevending.videomanager.exception.VideoAlreadyExistsException;
import com.futurevending.videomanager.model.Video;
import com.futurevending.videomanager.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class VideoService {

    @Autowired
    private VideoRepository videoRepository;

    public Video add(Video video) throws VideoAlreadyExistsException {
        return videoRepository.save(video);
    }

    public List<Video> getAll() {
        return videoRepository.findAll();
    }

    public Video getOne(Integer id) {
        return videoRepository.getOne(id);
    }

}
