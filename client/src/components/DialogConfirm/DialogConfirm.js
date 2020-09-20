import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  action: {
    justifyContent: "center",
    display: "flex",
  },
}));

const AlertDialogSlide = ({
  isOpen,
  isLoading,
  handleClose,
  description,
  title,
  handleConfirm,
}) => {
  const classes = useStyles();
  const dialogTitle = title && (
    <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
  );
  const dialogDescription = description && (
    <DialogContent className={classes.root}>{description}</DialogContent>
  );
  const buttonClose = !isLoading && (
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
  );
  const buttonConfirm = !isLoading && (
    <Button onClick={handleConfirm} color="primary">
      Confirm
    </Button>
  );
  const loading = isLoading && <CircularProgress />;
  return (
    <Dialog
      disableBackdropClick={isLoading}
      disableEscapeKeyDown={isLoading}
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {dialogTitle}
      {dialogDescription}
      <DialogActions
        classes={{
          root: classes.action,
        }}
      >
        {loading}
        {buttonClose}
        {buttonConfirm}
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialogSlide;
