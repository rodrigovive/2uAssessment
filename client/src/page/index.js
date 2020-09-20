import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button } from "@material-ui/core";
import Table from "../components/Table";
import DialogConfirm from "../components/DialogConfirm";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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

const getInvoicesSelected = (invoices, invoicesId) => {
  return invoicesId.map((id) => {
    const [invoice = {}] = invoices.filter((invoice) => invoice.id === id);
    return invoice;
  });
};

const Home = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [invoicesSelected, setInvocesSelected] = useState([]);
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

  const isLoadingApprove = useSelector((state) => {
    return state.invoice.isLoadingApprove;
  });

  const handleConfirmDialog = () => {
    dispatch(updateInvoice(invoicesSelected.map(({ id }) => id))).then(() => {
      setIsOpenDialog(false);
      setInvocesSelected([]);
    });
  };
  const handleClickIcon = (ids = []) => {
    setInvocesSelected(getInvoicesSelected(invoices, ids));
    setIsOpenDialog(true);
  };
  return (
    <Container fixed>
      <Box mt={3} mb={2}>
        <Typography variant="h3">Invoices</Typography>
      </Box>
      <Table
        selectedIds={invoicesSelected}
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
        isLoading={isLoadingApprove}
        title={`Do you approve the invoices?`}
        description={invoicesSelected.map(({ id, invoice_number }) => (
          <ListItem key={id}>
            <ListItemText primary={`# ${invoice_number}`} />
          </ListItem>
        ))}
        handleConfirm={handleConfirmDialog}
        isOpen={isOpenDialog}
        handleClose={() => setIsOpenDialog(false)}
      />
    </Container>
  );
};

export default Home;
