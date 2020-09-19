import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHeadMaterial from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

const headCells = [
  {
    id: "name",
    label: "Dessert (100g serving)",
  },
  { id: "calories", numeric: true, label: "Calories" },
  { id: "fat", numeric: true, label: "Fat (g)" },
  { id: "carbs", numeric: true, label: "Carbs (g)" },
  { id: "protein", numeric: true, label: "Protein (g)" },
];

const TableHead = ({ handleClickSelectAll, numSelected, rowCount, cells }) => {
  return (
    <TableHeadMaterial>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={handleClickSelectAll}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {cells.map((headCell) => (
          <TableCell key={headCell.id}>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHeadMaterial>
  );
};

TableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleClickSelectAll: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};
TableHead.defaultProps = {
  cells: headCells,
};

export default TableHead;
