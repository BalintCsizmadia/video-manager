import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
  name: string;
  // one item to delete
  itemIdToDelete?: number | string;
  // or multiple items to delete
  itemIdsToDelete?: number[];
  delete(id: number | string): void;
  /**
   *  @description
      In the parent class we need a boolean state variable (for example 'isUserWantToDelete')
      with default 'false' value.
      After value will be 'true' and this AlertDialog component is calling
      we have to create and add a 'setStateBack' function (in the parent class)
      which sets back our 'isUserWantToDelete' variable from 'true' to 'false'
    */
  setStateBack(): void;
}

const RemoveContentDialog: React.FC<Props> = (props: Props) => {
  const [isOpen, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
    if (props.itemIdToDelete && props.itemIdsToDelete) {
      console.warn(
        "You cannot use /itemIdToDelete/ and /itemIdsToDelete/ props at the same time."
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    props.setStateBack();
  };

  // remove one or multiple items
  const remove = () => {
    if (props.itemIdToDelete) {
      // remove one item
      props.delete(props.itemIdToDelete);
    } else if (props.itemIdsToDelete) {
      // remove multiple items
      props.itemIdsToDelete.map((id: number) => {
        props.delete(id);
      });
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete " + props.name}
        </DialogTitle>
        <DialogContent>
          {props.itemIdsToDelete ? (
            props.itemIdsToDelete.length > 0 ? (
              props.itemIdsToDelete.length === 1 ? (
                <DialogContentText id="alert-dialog-description">
                  Do you really want to remove this {props.name}?
                </DialogContentText>
              ) : (
                <DialogContentText id="alert-dialog-description">
                  Do you really want to remove these {props.name}?
                </DialogContentText>
              )
            ) : (
              <DialogContentText id="alert-dialog-description">
                No selected item(s)
              </DialogContentText>
            )
          ) : (
            <DialogContentText id="alert-dialog-description">
              Do you really want to remove this {props.name}?
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          {props.itemIdToDelete && !props.itemIdsToDelete && (
            <Button
              onClick={() => {
                remove();
                handleClose();
              }}
              color="secondary"
              autoFocus
            >
              Yes
            </Button>
          )}
          {!props.itemIdToDelete &&
            props.itemIdsToDelete &&
            props.itemIdsToDelete.length > 0 && (
              <Button
                onClick={() => {
                  remove();
                  handleClose();
                }}
                color="secondary"
                autoFocus
              >
                Yes
              </Button>
            )}
          <Button onClick={handleClose} color="primary">
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RemoveContentDialog;
