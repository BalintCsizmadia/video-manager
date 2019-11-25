import React, { useEffect, useState } from "react";
import "./Main.css";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Videos from "../videos/Videos";
import { Video } from "../utils/Interface";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AlertDialog from "../utils/AlertDialog";

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
  // alert dialog indicator
  const [isNewVideoAvailable, setNewVideoAvailable] = useState(false);

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
  const handleAddToPlaylistClick = async (videoList: Video[]) => {
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
          // add videos to playlist
          const tmpPlaylist: Video[] = [];
          allVideos.map((v: Video) => {
            if (v.available) {
              tmpPlaylist.push(v);
            }
          });
          // add videos to playlist
          setPlaylistVideos(tmpPlaylist);
        })
        .catch((err: any) => {
          setMessage(err.message);
        });
      // TODO extra
      // get all videos in every seconds
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
  };

  // remove one video from playlist
  const removeVideoFromPlaylist = (videoId: number) => {
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
    removeVideoFromPlaylist
    // removeVideosFromPlaylist,
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
                    // add the previously selected items (from in memory) to the playlist
                    handleAddToPlaylistClick(inMemoryVideos);
                  }}
                >
                  Add to playlist
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* Redirect to 'Add new video' page */}
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
