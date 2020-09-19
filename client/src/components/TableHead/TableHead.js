import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHeadMaterial from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

const TableHead = ({ handleClickSelectAll, numSelected, rowCount, cells }) => {
  const isCheckedAll = rowCount > 0 && numSelected === rowCount;
  const isIndeterminate = numSelected > 0 && numSelected < rowCount;
  return (
    <TableHeadMaterial>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={isIndeterminate}
            checked={isCheckedAll}
            onChange={handleClickSelectAll}
            inputProps={{ "aria-label": "select all invoices" }}
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
  cells: [],
};

export default TableHead;
