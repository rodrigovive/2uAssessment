import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import Table from "../components/Table";
import DialogConfirm from "../components/DialogConfirm";
import { useSelector, useDispatch } from "react-redux";
import { getInvoices } from "../actions/invoice";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein, id: name };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

const getRows = (data) =>
  data.map((item) => ({
    id: item.id,
    invoiceDate: item.invoice_date,
    invoiceNumber: item.invoice_number,
    invoiceTotal: item.invoice_total,
    vendorName: item.vendor_name,
    vendorAddress: item.remittance_address,
    dueDate: item.due_date,
  }));

const Home = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInvoices());
  }, [dispatch]);

  const invoices = useSelector((state) => {
    return state.invoice.data;
  });
  const isLoading = useSelector((state) => {
    return state.invoice.isLoading;
  });
  console.log("invoices", invoices);
  console.log("isLoading", isLoading);

  const handleConfirmDialog = () => {
    setIsOpenDialog(true);
  };
  const handleClickIcon = () => {
    setIsOpenDialog(true);
  };
  return (
    <Container fixed>
      <Table
        handleClickIcon={handleClickIcon}
        headCells={[
          { id: "invoiceNumber", label: "Invoice Number" },
          {
            id: "venderName",
            label: "Vendor Name",
          },
          {
            id: "venderAddress",
            label: "Vendor Address",
          },
          {
            id: "invoiceTotal",
            label: "Invoice Total",
          },
          {
            id: "invoiceDate",
            label: "Invoice Date",
          },
          {
            id: "dueDate",
            label: "Due Date",
          },
        ]}
        rows={getRows(invoices)}
      />
      <DialogConfirm
        title="Approve invoices?"
        handleConfirm={handleConfirmDialog}
        isOpen={isOpenDialog}
        handleClose={() => setIsOpenDialog(false)}
      />
    </Container>
  );
};

export default Home;
