import {
  FETCH_INVOICES,
  LIST_INVOICES,
  UPDATE_INVOICE,
  CREATE_INVOICE,
  APPROVE_REQUEST,
  APPROVE_SUCCESS,
} from "./types";
import { API_URL } from "../config/env";

export function listInvoicesSuccess(payload) {
  return {
    type: LIST_INVOICES,
    payload,
  };
}

export function updateInvoice(invoiceIds = []) {
  return async function (dispatch) {
    try {
      dispatch({
        type: APPROVE_REQUEST,
      });
      await Promise.all(
        invoiceIds.map(async (id) => {
          await (
            await fetch(`${API_URL}/api/invoice/${id}`, {
              method: "PATCH",
              body: JSON.stringify({
                status: "Approved",
              }),
              headers: {
                "Content-Type": "application/json",
              },
            })
          ).json();
        })
      );
      dispatch({
        type: APPROVE_SUCCESS,
      });
    } catch (error) {
      console.log("error", error.message);
    }
  };
}

export function getInvoices() {
  return async function (dispatch) {
    try {
      // TODO actions error handler
      dispatch({
        type: FETCH_INVOICES,
      });
      const response = await (await fetch(`${API_URL}/api/invoice`)).json();
      if (response.success) {
        dispatch(listInvoicesSuccess(response.data));
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };
}

export function createInvoiceSuccess(payload) {
  return {
    type: CREATE_INVOICE,
    payload,
  };
}

export function updateInvoiceSuccess(payload) {
  return {
    type: UPDATE_INVOICE,
    payload,
  };
}
