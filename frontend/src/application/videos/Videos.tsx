import React, { useEffect, useState } from "react";
import "./Videos.css";
import {
  Typography,
  ListItem,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  List,
  Paper,
  Button,
  Tooltip
} from "@material-ui/core";
import { DeleteForeverSharp } from "@material-ui/icons";
import { Video } from "../utils/Interface";
import { getVideoTumbnail } from "../utils/GeneralVideoFunction";
import RemoveContentDialog from "../utils/RemoveContentDialog";
import VideoPlayer from "./VideoPlayer";

interface Props {
  videos: Video[];
  /**
   *
   * @param tempVideosToAdd Video[] array
   * @description saves selected (by checkbox) videos into a temporary array
   */
  addVideosToInMemory?(tempVideosToAdd: Video[]): void;
  removeVideoFromPlaylist?(videoId: number): void;
}

const Videos: React.FC<Props> = (props: Props) => {
  const [checked, setChecked] = useState<Video[]>([]);
  // 'videos' comes as a property
  const [videos, setVideos] = useState<Video[]>([]);
  // delete a video
  const [isUserWantToDelete, setUserWantToDelete] = useState(false);
  const [videoIdToDelete, setVideoIdToDelete] = useState(0);
  // video player
  const [videoToPlay, setVideoToPlay] = useState<Video | null>(null);
  const [isPlayerOpen, setPlayerOpen] = useState(false);

  useEffect(() => {
    setVideos(props.videos);
  }, [props]);

  const handleToggle = (value: Video) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    if (props.addVideosToInMemory) {
      // save selected videos to a temporary array which is available in the parent function
      props.addVideosToInMemory(newChecked);
    }
  };

  const removeVideo = (id: number) => {
    if (props.removeVideoFromPlaylist) {
      props.removeVideoFromPlaylist(id);
    }
  };

  const openVideoPlayer = (video: Video) => {
    setVideoToPlay(video);
    setPlayerOpen(true);
  };

  const closeVideoPlayer = () => {
    setPlayerOpen(false);
  };

  // function based components

  const RemoveDialogComponent = RemoveContentDialog({
    name: "video",
    itemIdToDelete: videoIdToDelete,
    delete: removeVideo,
    setStateBack: () => {
      setUserWantToDelete(false);
    }
  });

  const VideoPlayerComponent = VideoPlayer({
    video: videoToPlay,
    setStateBack: () => {
      closeVideoPlayer();
    }
  });

  return (
    <React.Fragment>
      {props.addVideosToInMemory ? (
        <Typography id="title">Available videos</Typography>
      ) : (
        <Typography id="title">Playlist</Typography>
      )}
      <Paper id="paper">
        {videos.length > 0 ? (
          <List>
            {videos.map((video: any) => {
              const videoId = video.id;
              return (
                <ListItem key={videoId} button>
                  <img
                    id="tumbnail-img"
                    src={getVideoTumbnail(video.url)}
                    alt="cover"
                    onClick={() => {
                      openVideoPlayer(video);
                    }}
                  />
                  <ListItemText
                    id={videoId}
                    primary={video.name}
                    secondary={video.description}
                    onClick={() => {
                      openVideoPlayer(video);
                    }}
                  />
                  <ListItemSecondaryAction>
                    {/* if do not pass this function, checkboxes are will be here */}
                    {!props.removeVideoFromPlaylist ? (
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(video)}
                        checked={checked.indexOf(video) !== -1}
                        inputProps={{ "aria-labelledby": videoId }}
                        color="primary"
                      />
                    ) : (
                      // if pass this function, delete option will be available
                      props.removeVideoFromPlaylist && (
                        <Tooltip title="Delete" enterDelay={900}>
                        <Button
                          onClick={() => {
                            setVideoIdToDelete(video.id);
                            setUserWantToDelete(true);
                          }}
                          style={{ margin: "-10px" }}
                        >
                          <DeleteForeverSharp color="error" />
                        </Button>
                        </Tooltip>
                      )
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        ) : (
          // if playlist is empty
          <ListItem>
            <Typography>The list is still empty</Typography>
          </ListItem>
        )}
      </Paper>
      {/* OPEN REMOVE POPUP */}
      {isUserWantToDelete && RemoveDialogComponent}
      {/* OPEN VIDEO PLAYER */}
      {isPlayerOpen && VideoPlayerComponent}

      {/* class based solution
      {isPlayerOpen && (
        <VideoPlayer video={videoToPlay} setStateBack={closeVideoPlayer} />
      )} */}
    </React.Fragment>
  );
};

export default Videos;
