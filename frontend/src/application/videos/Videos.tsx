import React, { useEffect, useState } from "react";
import "./Videos.css";
import {
  Typography,
  ListItem,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  List,
  Paper
} from "@material-ui/core";
import { Video } from "../utils/Interface";

interface Props {
  videos: Video[];
  add(videoToAdd: Video): void;
}

const Videos: React.FC<Props> = (props: Props) => {
  const [checked, setChecked] = useState([0]);
  const allVideos: Video[] = props.videos;

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

  // get a cover image from the video
  const getVideoTumbnail = (url: string) => {
    const urlArray = url.split("/");
    const youTubeVideoId = urlArray[urlArray.length - 1];
    return `https://img.youtube.com/vi/${youTubeVideoId}/0.jpg`;
  };

  return (
    <React.Fragment>
      <Typography id="title">Available videos</Typography>
      <Paper id="paper">
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
                <ListItemText id={videoId} primary={video.name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(video)}
                    checked={checked.indexOf(video) !== -1}
                    inputProps={{ "aria-labelledby": videoId }}
                  />
                  {/* <button onClick={() => {props.add(video)}}>ADD</button> */}
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </React.Fragment>
  );
};

export default Videos;
