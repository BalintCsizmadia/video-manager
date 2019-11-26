import React, { useState, ChangeEvent } from "react";
import "./Videos.css";
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { Redirect } from "react-router";
import axios from "axios";
import AlertDialog from "../utils/AlertDialog";
import { HttpStatus } from "../utils/HttpStatus";

const axiosInst = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL
});

const AddVideoForm: React.FC = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  // for display specific error messages
  const [isNameError, setNameError] = useState(false);
  const [isUrlError, setUrlError] = useState(false);
  const [isDurationError, setDurationError] = useState(false);
  const [isDescriptionError, setDescriptionError] = useState(false);
  // for special message(s)
  const [message, setMessage] = useState("");
  // alert dialog indicator
  const [
    isUserAlertedAboutReqestStatus,
    setUserAlertAboutRequestStatus
  ] = useState(false);
  // isSuccessfulRequest flag
  const [isSuccessfulRequest, setSuccessfulRequest] = useState(false);

  // API call
  const addNewVideo = async (video: any) => {
    return await axiosInst.post("/videos/add", video);
  };

  const onSubmit = () => {
    if (
      isValidName(name) &&
      isValidUrl(url) &&
      isValidDuration(duration) &&
      isValidDescription(description)
    ) {
      const newVideo = {
        name: name.trimEnd(),
        url,
        duration,
        description: description.trimEnd()
      };
      // api call with valid parameters
      addNewVideo(newVideo)
        .then((res: any) => {
          // success
          if (res.status === HttpStatus.OK) {
            // open alert dialog and display message about successful video addition
            setUserAlertAboutRequestStatus(true);
          } else {
            console.error(res);
          }
        })
        .catch((err: any) => {
          if (
            err.response.status === HttpStatus.UNAUTHORIZED &&
            err.response.data
          ) {
            setMessage(err.response.data.message);
          }
        });
    } else {
      setNameError(!isValidName(name) ? true : false);
      setUrlError(!isValidUrl(url) ? true : false);
      setDurationError(!isValidDuration(duration) ? true : false);
      setDescriptionError(!isValidDescription(description) ? true : false);
    }
  };

  const isValidName = (name: string) => {
    return typeof name === "string" && name.length >= 3 ? true : false;
  };

  const isValidUrl = (url: string) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(url);
  };

  const isValidDuration = (duration: string) => {
    // regex for finding separator characters
    const regex = /[ _+\-;':"|,.:/?]/g;
    if (typeof duration === "string" && duration.split(regex).length > 1) {
      // split string by separators
      const nums = duration.split(regex);
      let isOk = true;
      nums.forEach(num => {
        // try to parse string to number and validate it
        if (isNaN(+num)) {
          isOk = false;
        }
      });
      if (isOk) {
        return true;
      }
      return false;
    }
    return false;
  };

  const isValidDescription = (description: string) => {
    return description ? true : false;
  };

  return (
    <React.Fragment>
      <div id="video-form-container">
        <Typography>Add new video</Typography>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              // required={true}
              margin="normal"
              variant="outlined"
              value={name}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setName(evt.target.value.trimStart());
              }}
              error={isNameError}
              helperText={
                isNameError && "Name must be at least 3 characters long"
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Url"
              margin="normal"
              variant="outlined"
              value={url}
              placeholder="https://youtu.be/C0DPdy98e4h"
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setUrl(evt.target.value.trim());
              }}
              error={isUrlError}
              helperText={isUrlError && "Invalid URL format"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Duration"
              margin="normal"
              variant="outlined"
              value={duration}
              placeholder="2:30:47"
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setDuration(evt.target.value.trim());
              }}
              error={isDurationError}
              helperText={isDurationError && "Invalid format"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              margin="normal"
              variant="outlined"
              multiline
              rows="3"
              value={description}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setDescription(evt.target.value.trimStart());
              }}
              error={isDescriptionError}
              helperText={
                isDescriptionError && "Please add a short description"
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography color="error">{message}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </Grid>
          {/* GO BACK */}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={() => {
                setSuccessfulRequest(true);
              }}
              style={{ width: "88px", marginTop: "20px" }}
            >
              Back
            </Button>
          </Grid>
        </Grid>
        {isUserAlertedAboutReqestStatus && (
          <AlertDialog
            title="Completed"
            message="New video has been added"
            setState={() => {
              setSuccessfulRequest(true);
            }}
          />
        )}
        {isSuccessfulRequest && <Redirect to="/" />}
      </div>
    </React.Fragment>
  );
};

export default AddVideoForm;
