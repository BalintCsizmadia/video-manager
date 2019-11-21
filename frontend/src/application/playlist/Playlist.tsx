import React, { useEffect, useState } from "react";
import "./Playlist.css";
import {
  Typography,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  List,
  Paper
} from "@material-ui/core";
import { Video } from "../utils/Interface";

interface Props {
  playlistVideos: Video[];
}

const Playlist: React.FC<Props> = props => {
  const [checked, setChecked] = useState([0]);
  const allVideos: Video[] = props.playlistVideos;

  useEffect(() => {}, []);

  const handleToggle = (value: any) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <React.Fragment>
      <Typography id="title">Playlist</Typography>
      <Paper id="paper">
        {/* if playlist is not empty */}
        {props.playlistVideos.length > 0 ? (
          <List>
            {allVideos.map((video: any) => {
              const videoId = video.id;
              return (
                <ListItem
                  key={videoId}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(video)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(video) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": videoId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={videoId} primary={video.name} />
                  <ListItemSecondaryAction>
                    {/* SECONDARY ACTION COMES HERE */}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        ) : (
          // if playlist is empty
          <ListItem>
            <Typography>Playlist is still empty</Typography>
          </ListItem>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default Playlist;
