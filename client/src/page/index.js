import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button } from "@material-ui/core";
import Table from "../components/Table";
import DialogConfirm from "../components/DialogConfirm";
import { useSelector, useDispatch } from "react-redux";
import { getInvoices, updateInvoice } from "../actions/invoice";

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
  const [invoicesId, setInvoicedIds] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInvoices());
  }, [dispatch]);

  const invoices = useSelector((state) => {
    return state.invoice.data;
  });
  // TODO ui for loading or SSR
  const isLoading = useSelector((state) => {
    return state.invoice.isLoading;
  });

  const handleConfirmDialog = () => {
    dispatch(updateInvoice(invoicesId));
    setIsOpenDialog(false);
    setInvoicedIds([]);
  };
  const handleClickIcon = (ids = []) => {
    setInvoicedIds(ids);

    setIsOpenDialog(true);
  };
  return (
    <Container fixed>
      <Box mt={3} mb={2}>
        <Typography variant="h3">Invoices</Typography>
      </Box>
      <Box my={2}>
        <Button variant="contained" color="primary">
          Create invoice
        </Button>
      </Box>
      <Table
        selectedIds={invoicesId}
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
          {
            id: "icon",
            label: "",
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
