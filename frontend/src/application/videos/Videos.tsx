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
  Button
} from "@material-ui/core";
import { DeleteForeverSharp } from '@material-ui/icons';
import { Video } from "../utils/Interface";
import { getVideoTumbnail } from "../utils/GeneralVideoFunction";
import RemoveContentDialog from "../utils/RemoveContentDialog";


interface Props {
  videos: Video[];
  addVideosToInMemory?(tempVideosToAdd: Video[]): void;
  removeVideosFromPlaylist?(videosToRemove: Video[]): void;
  removeOneFromPlaylist?(videoId: number): void;
}

const Videos: React.FC<Props> = (props: Props) => {
  const [checked, setChecked] = useState<Video[]>([]);
  const [allVideos, setAllvideos] = useState<Video[]>([]);
  const [isUserWantToDelete, setUserWantToDelete] = useState(false);
  const [videoIdToDelete, setVideoIdToDelete] = useState(0);
  // const allVideos: Video[] = props.videos;

  useEffect(() => {
    setAllvideos(props.videos);
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
    } else {
      if (props.removeVideosFromPlaylist) {
        console.log("Remove");
        console.log(newChecked);
        props.removeVideosFromPlaylist(newChecked);
      }
    }
  };

  const removeOne = (id: number) => {
    if (props.removeOneFromPlaylist) {
      props.removeOneFromPlaylist(id);
    }
  };

  const RemoveDialogComponent = RemoveContentDialog({
    name: "video",
    itemIdToDelete: videoIdToDelete,
    delete: removeOne,
    setStateBack: () => {
      setUserWantToDelete(false);
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
        {allVideos.length > 0 ? (
          <List>
            {allVideos.map((video: any) => {
              const videoId = video.id;
              return (
                <ListItem key={videoId} button>
                  <img
                    id="tumbnail-img"
                    src={getVideoTumbnail(video.url)}
                    alt="cover"
                  />
                  <ListItemText id={videoId} primary={video.name} secondary={video.description} />
                  <ListItemSecondaryAction>
                    {!props.removeOneFromPlaylist ? (
                      <Checkbox
                        edge="end"
                        onChange={handleToggle(video)}
                        checked={checked.indexOf(video) !== -1}
                        inputProps={{ "aria-labelledby": videoId }}
                        color="primary"
                      />
                    ) : (
                      props.removeOneFromPlaylist && (
                        <Button
                          onClick={() => {
                            setVideoIdToDelete(video.id);
                            setUserWantToDelete(true);
                          }}
                        >
                          <DeleteForeverSharp color="error" />
                        </Button>
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
      {/* REMOVE POP UP */}
      {isUserWantToDelete && RemoveDialogComponent}

    </React.Fragment>
  );
};

export default Videos;
