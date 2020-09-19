import {
  LIST_INVOICES,
  CREATE_INVOICE_ERROR,
  CREATE_INVOICE,
  FETCH_INVOICES,
} from "../actions/types";

const initialState = {
  data: [],
  isLoading: false,
  isError: null,
};

const invoiceReducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case CREATE_INVOICE:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case CREATE_INVOICE_ERROR: {
      return {
        ...state,
        isError: action.payload,
      };
    }
    case LIST_INVOICES: {
      console.log("ac", action.payload);
      return {
        ...state,
        isLoading: false,
        data: action.payload,
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
