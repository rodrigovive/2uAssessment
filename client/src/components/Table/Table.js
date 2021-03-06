import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableMaterial from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "../TableRow";
import Paper from "@material-ui/core/Paper";
import EnhancedTableHead from "../TableHead";
import EnhancedTableToolbar from "../TableToolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
}));

const Table = ({
  headCells = [],
  rows = [],
  handleClickIcon,
  selectedIds = [],
}) => {
  const classes = useStyles();
  const [selected, setSelected] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  useEffect(() => {
    const selectedIdsObject = selectedIds.reduce((acc, { id }) => {
      acc[id] = true;
      return acc;
    }, {});
    setSelected(selectedIdsObject);
  }, [selectedIds]);
  const handleClickRow = (id) => {
    setSelected((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClickSelectAll = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.reduce((acc, row) => {
        acc[row.id] = true;
        return acc;
      }, {});
      setSelected(newSelecteds);
      return;
    }
    setSelected({});
  };
  const countSelected = Object.values(selected).filter(Boolean);
  const handleClickIconRow = (id) => (e) => {
    setSelected({ [id]: true });
    e.stopPropagation();
    handleClickIcon([id]);
  };
  const handleClickIconHead = () => {
    handleClickIcon(Object.keys(selected));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          title="List invoices"
          itemNumSelected={countSelected.length}
          handleClickIcon={handleClickIconHead}
        />
        <TableContainer>
          <TableMaterial
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              handleClickSelectAll={handleClickSelectAll}
              numSelected={countSelected.length}
              rowCount={rows.length}
              cells={headCells}
            />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    isItemSelected={selected[row.id] || false}
                    handleClickRow={handleClickRow}
                    id={row.id}
                    invoiceDate={row.invoiceDate}
                    invoiceNumber={row.invoiceNumber}
                    invoiceTotal={row.invoiceTotal}
                    vendorName={row.vendorName}
                    vendorAddress={row.vendorAddress}
                    dueDate={row.dueDate}
                    handleClickIcon={handleClickIconRow(row.id)}
                    key={row.id}
                  />
                ))}
            </TableBody>
          </TableMaterial>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Table;
