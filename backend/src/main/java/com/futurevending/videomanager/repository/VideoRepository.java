package com.futurevending.videomanager.repository;

import com.futurevending.videomanager.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<Video, Integer> {

    List<Video> findAllByOrderByIdAsc();

    List<Video> findByIsAvailable(boolean available);

    @Override
    <S extends Video> S save(S s);
}
