import React, { useEffect, useState } from "react";
import "./Main.css";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Videos from "../videos/Videos";
import { Video } from "../utils/Interface";
import { Typography, Button } from "@material-ui/core";

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
  // videos to playlist before adding
  const [inMemoryVideos, setInMemoryVideos] = useState<Video[]>([]);
  // videos to playlist before removing
  const [inMemoryVideosToRemove, setInMemoryVideosToRemove] = useState<Video[]>(
    []
  );
  // informative messages
  const [message, setMessage] = useState<string>("");

  // API call function
  const getVideos = async () => {
    const { data } = await axiosInst.get("/videos");
    return data;
  };

  const getPlaylistVideos = async () => {
    const { data } = await axiosInst.get("videos/playlist");
    return data;
  };

  // finalize the item addition to playlist
  const handleUpdatePlaylistClick = async (videoList: Video[]) => {
    await axiosInst.put("/videos/playlist/", videoList).then(() => {
      updatePlaylist();
    });
  };

  const removeFromPlaylist = async (videoId: number) => {
    await axiosInst.post(`/videos/playlist/${videoId}`);
  };

  useEffect(
    () => {
      // get all videos from db
      getVideos()
        .then((allVideos: Video[]) => {
          setVideos(allVideos);
        })
        .catch((err: any) => {
          setMessage(err.message);
        });
    },
    [
      // variable changes here indicates function re-call
    ]
  );

  // add one video to the playlist
  const addToPlaylist = (videoToAdd: Video) => {
    // check if item already in the list or not
    if (
      !(playlistVideos.filter((v: Video) => v.id === videoToAdd.id).length > 0)
    ) {
      setPlaylistVideos([...playlistVideos, videoToAdd]);
    }
  };

  // use in VideosComponent when select videos
  const addVideosToInMemory = (videosToInMemory: Video[]) => {
    videosToInMemory.map(v => {
      v.available = true;
    });
    setInMemoryVideos(videosToInMemory);
    // console.log(videosToInMemory);
  };

  const removeOneFromPlaylist = (videoId: number) => {
    removeFromPlaylist(videoId).then(() => {
      updatePlaylist();
    });
  };

  const updatePlaylist = () => {
    getPlaylistVideos().then((playlistVideos: Video[]) => {
      setPlaylistVideos(playlistVideos);
    });
  };

  // FIXME remove multiple videos
  const removeVideosFromPlaylist = (vids: Video[]) => {
    vids.map(v => {
      v.available = false;
    });
    setInMemoryVideosToRemove(vids);
  };

  // UPDATE - with this approach, the whole list loads again
  // and the checkboxes will be empty
  // getVideos()
  //   .then((allVideos: Video[]) => {
  //     setVideos(allVideos);
  //     // store videos for playlist
  //     let tempPlaylist: Video[] = [];
  //     allVideos.map((v: Video) => {
  //       if (v.available) {
  //         tempPlaylist.push(v);
  //       }
  //     });
  //     setPlaylistVideos(tempPlaylist);
  //   })

  const PlaylistComponent = Videos({
    videos: playlistVideos,
    // removeVideosFromPlaylist,
    removeOneFromPlaylist
  });
  const VideosComponent = Videos({ videos, addVideosToInMemory });

  return (
    <div id="main-container">
      {message ? (
        <Typography>{message}</Typography>
      ) : (
        <div id="video-lists">
          <Grid container>
            <Grid item xs={12} sm={6}>
              <div className="video-list">{PlaylistComponent}</div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="video-list">{VideosComponent}</div>
            </Grid>
          </Grid>
          <div id="operation-buttons">
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // add the previously selected items to the playlist
                    handleUpdatePlaylistClick(inMemoryVideos);
                  }}
                >
                  Add to playlist
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // TODO now I remove one item at a time so it is not working, maybe I should remove it
                    handleUpdatePlaylistClick(inMemoryVideosToRemove);
                  }}
                >
                  Add new video
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
