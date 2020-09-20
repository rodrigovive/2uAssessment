import {
  LIST_INVOICES,
  APPROVE_REQUEST,
  APPROVE_SUCCESS,
  CREATE_INVOICE_ERROR,
  CREATE_INVOICE,
  UPDATE_INVOICE,
  FETCH_INVOICES,
} from "../actions/types";

const initialState = {
  data: [],
  isLoading: false,
  isError: null,
  isLoadingApprove: false,
};

const filterApproved = (data = []) =>
  data.filter((invoice) => invoice?.status?.toLowerCase() !== "approved");

const invoiceReducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case APPROVE_REQUEST: {
      return {
        ...state,
        isLoadingApprove: true,
      };
    }
    case APPROVE_SUCCESS: {
      return {
        ...state,
        isLoadingApprove: true,
      };
    }
    case CREATE_INVOICE:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case UPDATE_INVOICE:
      const updatedInvoice = action.payload;
      let newInvoice = true;
      const invoicesCurrent = [
        ...state.data?.map((invoice) => {
          if (invoice.id === updatedInvoice?.id) {
            newInvoice = false;
            return updatedInvoice;
          }
          return invoice;
        }),
      ];
      if (newInvoice) {
        invoicesCurrent.push(updatedInvoice);
      }
      const invoiceInPending = filterApproved(invoicesCurrent);
      return {
        ...state,
        data: invoiceInPending,
      };
    case CREATE_INVOICE_ERROR: {
      return {
        ...state,
        isError: action.payload,
      };
    }
    case LIST_INVOICES: {
      const invoiceInPending = filterApproved(action.payload);
      return {
        ...state,
        isLoading: false,
        data: invoiceInPending,
      };
    }
    case FETCH_INVOICES: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return initialState;
  }
};
export default invoiceReducer;
