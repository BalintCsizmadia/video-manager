import React, { useEffect, useState } from "react";
import "./Main.css";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Playlist from "../playlist/Playlist";
import Videos from "../videos/Videos";
import { Video } from "../utils/Interface";
import { Typography } from "@material-ui/core";

// set the base URL
const axiosInst = axios.create({
  baseURL: "http://localhost:8080"
});

const Main: React.FC = () => {
  // state, setState
  // all videos
  const [videos, setVideos] = useState<Video[]>([]);
  // videos in playlist
  const [playlistVideos, setPlaylistVideos] = useState<Video[]>([]);
  // informative messages
  const [message, setMessage] = useState<string>("");

  // API call function
  const getVideos = async () => {
    const { data } = await axiosInst.get("/videos");
    return data;
  };

  useEffect(() => {
    // get all videos from db
    getVideos()
      .then((allVideos: Video[]) => {
        setVideos(allVideos);
      })
      .catch((err: any) => {
        setMessage(err.message);
      });
  }, []);

  // add one video to the playlist
  const onAddVideoClick = (videoToAdd: Video) => {
    // check if item already in the list or not
    if (
      !(playlistVideos.filter((v: Video) => v.id === videoToAdd.id).length > 0)
    ) {
      setPlaylistVideos([...playlistVideos, videoToAdd]);
    }
  };

  const PlaylistComponent = Playlist({ playlistVideos });
  const VideosComponent = Videos({ videos, add: onAddVideoClick });

  return (
    <div id="main-container">
      {message ? (
        <Typography>{message}</Typography>
      ) : (
        <Grid container>
          <Grid item xs={12} sm={6}>
            <div className="video-list">{PlaylistComponent}</div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="video-list">{VideosComponent}</div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Main;
