import React, { useEffect, useState } from "react";
import "./Videos.css";
import { Video } from "../utils/Interface";
import { getYouTubeVideoId } from "../utils/GeneralVideoFunction";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

interface Props {
  video: Video | null;
  /**
   * @description function which runs when dialog is closing
   */
  setStateBack(): void;
}

const VideoPlayer: React.FC<Props> = (props: Props) => {
  const [isOpen, setOpen] = useState(true);
  const [videoToPlay, setVideoToPlay] = useState<Video | null>(null);

  useEffect(() => {
    setVideoToPlay(props.video);
    setOpen(true);
  }, [props]);

  const handleClose = () => {
    setOpen(false);
    props.setStateBack();
  };

  return (
    <React.Fragment>
      {videoToPlay && (
        <Dialog
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{videoToPlay.name}</DialogTitle>
          <DialogContent>
            <iframe
              title={videoToPlay.name}
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                videoToPlay.url
              )}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              width="500px"
              height="360px"
            />
            <DialogContentText id="alert-dialog-description">
              {videoToPlay.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Back
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default VideoPlayer;

// // class based component
// import React from "react";
// import "./Videos.css";
// import { Video } from "../utils/Interface";
// import { getYouTubeVideoId } from "../utils/GeneralVideoFunction";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button
// } from "@material-ui/core";

// interface Props {
//   video: Video | null;
//   setStateBack(): void;
// }

// interface State {
//   open: boolean;
// }

// class VideoPlayer extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);

//     this.state = {
//       open: true
//     };
//   }

//   handleClose = () => {
//     this.setState({ open: false });
//     this.props.setStateBack();
//   };

//   render() {
//     if (this.props.video) {
//       return (
//         <React.Fragment>
//           <Dialog
//             open={this.state.open}
//             onClose={this.handleClose}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description"
//           >
//             <DialogTitle id="alert-dialog-title">
//               {this.props.video.name}
//             </DialogTitle>
//             <DialogContent>
//               <iframe
//                 title={this.props.video.name}
//                 src={`https://www.youtube.com/embed/${getYouTubeVideoId(
//                   this.props.video.url
//                 )}`}
//                 frameBorder="0"
//                 allow="autoplay; encrypted-media"
//                 width="500px"
//                 height="360px"
//                 allowFullScreen
//               />
//               <DialogContentText id="alert-dialog-description">
//                 {this.props.video.description}
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={this.handleClose} color="primary">
//                 Back
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </React.Fragment>
//       );
//     }
//   }
// }

// export default VideoPlayer;
