import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudDoneIcon from "@material-ui/icons/CloudDone";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.info.dark,
  },
  title: {
    flex: "1 1 100%",
  },
}));

const TableToolbar = ({ title = "", itemNumSelected, handleClickIcon }) => {
  const classes = useToolbarStyles();
  const someItemSelected = itemNumSelected > 0;
  const titleSelectedToolbar = someItemSelected && (
    <Typography
      className={classes.title}
      color="inherit"
      variant="subtitle1"
      component="div"
    >
      {itemNumSelected} selected
    </Typography>
  );

  const titleToolbar = !someItemSelected && (
    <Typography
      className={classes.title}
      variant="h6"
      id="tableTitle"
      component="div"
    >
      {title}
    </Typography>
  );
  const updateIcon = someItemSelected && (
    <Tooltip title="Update">
      <IconButton onClick={handleClickIcon} aria-label="update">
        <CloudDoneIcon />
      </IconButton>
    </Tooltip>
  );

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: someItemSelected,
      })}
    >
      {titleSelectedToolbar}
      {titleToolbar}
      {updateIcon}
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  itemNumSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default TableToolbar;
