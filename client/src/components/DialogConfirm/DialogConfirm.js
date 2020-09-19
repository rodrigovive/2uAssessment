import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = ({
  isOpen,
  handleClose,
  description,
  title,
  handleConfirm,
}) => {
  const dialogTitle = title && (
    <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
  );
  const dialogDescription = description && (
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        {description}
      </DialogContentText>
    </DialogContent>
  );
  const buttonClose = handleClose && (
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
  );
  const buttonConfirm = handleConfirm && (
    <Button onClick={handleConfirm} color="primary">
      Confirm
    </Button>
  );
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {dialogTitle}
      {dialogDescription}
      <DialogActions>
        {buttonClose}
        {buttonConfirm}
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialogSlide;
