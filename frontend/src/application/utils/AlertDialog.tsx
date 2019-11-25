import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


interface Props {
    title: string;
    message: string;
    /**
     * @description function which runs when dialog is closing
     */
    setState(): void;
  }
  
interface State {
    open: boolean;
}

class AlertDialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      open: true,
    };
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.setState();
  };

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-message"
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-message">
              { this.props.message }
            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={
                () => {this.handleClose();
                  this.props.setState(); } 
                }
                color="primary"
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default AlertDialog;