import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import Table from "../components/Table";
import DialogConfirm from "../components/DialogConfirm";
import { useSelector, useDispatch } from "react-redux";
import { getInvoices } from "../actions/invoice";

const getRows = (data = []) =>
  data.map((item) => ({
    id: item.id,
    invoiceDate: item.invoice_date,
    invoiceNumber: item.invoice_number,
    invoiceTotal: item.total,
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
