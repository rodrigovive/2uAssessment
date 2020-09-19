import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRowMaterial from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { fade } from "@material-ui/core/styles/colorManipulator";

const useStyles = makeStyles((theme) => ({
  rowSelected: {
    "&$selected:hover": {
      backgroundColor: fade(theme.palette.info.light, 0.5),
    },
    "&$selected": {
      backgroundColor: fade(theme.palette.info.light, 0.5),
    },
  },
  selected: {},
}));

const TableRow = ({
  isItemSelected,
  handleClickRow,
  id,
  invoiceDate,
  invoiceNumber,
  invoiceTotal,
  vendorName,
  vendorAddress,
  dueDate,
  handleClickIcon,
}) => {
  const classes = useStyles();
  const labelId = `enhanced-table-checkbox-${id}`;

  return (
    <TableRowMaterial
      hover
      onClick={(_) => handleClickRow(id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      selected={isItemSelected}
      classes={{
        root: classes.rowSelected,
        selected: classes.selected,
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{ "aria-labelledby": labelId }}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row">
        {invoiceNumber}
      </TableCell>
      <TableCell>{vendorName}</TableCell>
      <TableCell>{vendorAddress}</TableCell>
      <TableCell>{invoiceTotal}</TableCell>
      <TableCell>{invoiceDate}</TableCell>
      <TableCell>{dueDate}</TableCell>
      <TableCell>
        <Tooltip title="Update">
          <IconButton onClick={handleClickIcon} aria-label="selected">
            <CloudDoneIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRowMaterial>
  );
};
export default TableRow;
