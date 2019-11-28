import React, { useEffect, useState } from "react";
import "./Main.css";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Videos from "../videos/Videos";
import { Video } from "../utils/Interface";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AlertDialog from "../utils/AlertDialog";
import { HttpStatus } from "../utils/HttpStatus";

// set the base URL
const axiosInst = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL
});

const Main: React.FC = () => {
  // all videos
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  // videos in playlist
  const [playlistVideos, setPlaylistVideos] = useState<Video[]>([]);
  // videos in playlist before adding them to DB
  const [inMemoryVideos, setInMemoryVideos] = useState<Video[]>([]);
  // informative messages
  const [message, setMessage] = useState<string>("");
  // for handle video adding attempt without selected items
  const [isEmptyVideolist, setEmptyVideoslist] = useState(false);
  // TODO extra - alert dialog indicator
  const [isNewVideoAvailable, setNewVideoAvailable] = useState(false);

  // API call functions
  // get all videos from available videos list
  const getVideos = async () => {
    const { data } = await axiosInst.get("/videos");
    return data;
  };

  // get videos which are in the playlist
  const getPlaylistVideos = async () => {
    const { data } = await axiosInst.get("videos/playlist");
    return data;
  };

  // remove one video from playlist
  const removeVideoFromPlaylist = async (videoId: number) => {
    await axiosInst.post(`/videos/playlist/${videoId}`).then((res: any) => {
      if (res.status === HttpStatus.OK) {
        updatePlaylist();
      } else {
        console.log(res);
      }
    });
  };

  // use in VideosComponent when select videos
  const addVideosToInMemory = (videosToInMemory: Video[]) => {
    videosToInMemory.map(v => {
      v.available = true;
    });
    setInMemoryVideos(videosToInMemory);
  };

  // finalize the item addition to playlist
  const handleAddToPlaylistClick = async (videoList: Video[]) => {
    if (videoList.length > 0) {
      await axiosInst.put("/videos/playlist/", videoList).then((res: any) => {
        if (res.status === HttpStatus.OK) {
          updatePlaylist();
        } else {
          console.log(res);
        }
      });
    } else {
      // handle empty addition attempt
      setEmptyVideoslist(true);
    }
  };

  const updatePlaylist = () => {
    getPlaylistVideos().then((playlistVideos: Video[]) => {
      setPlaylistVideos(playlistVideos);
    });
  };

  useEffect(
    () => {
      // get all videos from db
      getVideos()
        .then((allVideos: Video[]) => {
          setAllVideos(allVideos);
          // add videos to playlist
          const tmpPlaylist: Video[] = [];
          allVideos.map((v: Video) => {
            if (v.available) {
              tmpPlaylist.push(v);
            }
          });
          setPlaylistVideos(tmpPlaylist);
        })
        .catch((err: any) => {
          setMessage(err.message);
        });
      // TODO extra
      // get all (available) videos in every seconds
      // setInterval(() => {
      //   getVideos()
      //   .then((allVideos: Video[]) => {
      //     if (videos.length < allVideos.length) {
      //       console.log('UPDATE');
      //       setVideos(allVideos);
      //       setNewVideoAvailable(true);
      //     }
      //   })
      // }, 60000);
    },
    [
      // variable changing here indicates function re-call
    ]
  );

  // function based components

  const PlaylistComponent = Videos({
    videos: playlistVideos,
    removeVideoFromPlaylist
  });

  const VideosComponent = Videos({
    videos: allVideos,
    addVideosToInMemory
  });

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
                    // add the previously selected items (from in memory) to the playlist
                    handleAddToPlaylistClick(inMemoryVideos);
                  }}
                  // another solution for handle empty adding attempt
                  // disabled={inMemoryVideos.length < 1}
                >
                  Add to playlist
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* redirect to 'Add new video' page */}
                <Link
                  to={{ pathname: "/add" }}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" color="primary">
                    Add new video
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      )}

      {isEmptyVideolist && (
        <AlertDialog
          title="Oops"
          message="Select video(s) from 'Available videos' then try again"
          setState={() => {
            setEmptyVideoslist(false);
          }}
        />
      )}

      {isNewVideoAvailable && (
        <AlertDialog
          title="New content"
          message="New video available"
          setState={() => {
            setNewVideoAvailable(false);
          }}
        />
      )}
    </div>
  );
};

export default Main;
