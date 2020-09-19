import React, { useContext, createContext, useEffect, useRef } from "react";
import { SOCKET_URL } from "../config/env";
import { createInvoiceSuccess, updateInvoiceSuccess } from "../actions/invoice";
import io from "socket.io-client";
import { useDispatch } from "react-redux";

const SocketContext = createContext(null);

const useStateSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("no socket");
  }
  return context;
};

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const socket = useRef(null);
  useEffect(() => {
    socket.current = io.connect(SOCKET_URL);
    socket.current.on("invoiceCreated", (invoice) => {
      console.log("msg", invoice);
      if (invoice) {
        dispatch(createInvoiceSuccess(invoice));
      }
    });
    socket.current.on("invoiceUpdated", (invoice) => {
      if (invoice) {
        console.log("msg", invoice);

        dispatch(updateInvoiceSuccess(invoice));
      }
    });
  }, [dispatch]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, useStateSocket };
