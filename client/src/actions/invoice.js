import {
  FETCH_INVOICES,
  LIST_INVOICES,
  CREATE_INVOICE_ERROR,
  CREATE_INVOICE,
} from "./types";
import { API_URL } from "../config/env";

export function listInvoicesSuccess(payload) {
  return {
    type: LIST_INVOICES,
    payload,
  };
}

export function getInvoices() {
  return async function (dispatch) {
    try {
      dispatch({
        type: FETCH_INVOICES,
      });
      const response = await (await fetch(`${API_URL}/api/invoice`)).json();
      console.log("response", response);
      if (response.success) {
        dispatch(listInvoicesSuccess(response.data));
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };
}
