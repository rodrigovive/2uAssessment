<h1 align="center">2ulaundry-invoice-server</h1>

> Api for invoices

### 🏠 [Homepage](https://github.com/rodrigovive/2uAssessment#user-story-1)

### ✨ [Demo](https://twoulaundry-invoices.herokuapp.com/api/invoice)

## API

### Error handling

* 200 - OK
* 400 - Bad Request
* 404 - Not Found
* 500 - Internal Server Error

### Headers
```
  {
      'Content-Type': 'application/json'
  }
```

### GET `/api/invoice`
Response bodu 
```JSON
{
  "data": [
   {
    "_id": "5f66d2d02a8bf60004e2775a",
    "id": "b830e186-32c4-4e13-b27d-e48d025e6996",
    "invoice_number": "43",
    "total": "199.99",
    "currency": "USD",
    "invoice_date": "2019-08-17",
    "due_date": "2019-09-17",
    "vendor_name": "Acme Cleaners Inc.",
    "remittance_address": "123 ABC St. Charlotte, NC 28209",
    "status": "pending",
    "createdAt": "2020-09-20T03:56:00.208Z",
    "updatedAt": "2020-09-20T03:56:00.208Z",
    "__v": 0
   },...
  ],
  "success": true
}

```

### POST `/api/invoice`

Request body
  ```JSON
  {
    "invoice_number": "12345",
    "total": "199.99",
    "currency": "USD",
    "invoice_date": "2019-08-17",
    "due_date": "2019-09-17",
    "vendor_name": "Acme Cleaners Inc.",
    "remittance_address": "123 ABC St. Charlotte, NC 28209"
  }
  ```

Response body
  ```JSON
  {
    "message": "invoice submitted successfully"
  }
  ```

### PATCH `/invoice/:id`

Response body
  ```JSON
  {
    "success": true,
    "data": {
        "_id": "5f66d2d02a8bf60004e2775a",
        "id": "b830e186-32c4-4e13-b27d-e48d025e6996",
        "invoice_number": "asdasd",
        "total": "12",
        "currency": "USD",
        "invoice_date": "2019-08-17",
        "due_date": "2019-08-17",
        "vendor_name": "test",
        "remittance_address": "as",
        "status": "pending",
        "createdAt": "2020-09-20T03:56:00.208Z",
        "updatedAt": "2020-09-20T04:00:13.634Z",
        "__v": 0
    }
  }
  ```

## Install

```sh
yarn install
```

## Run tests

```sh
yarn run test
```

## Author

👤 **Rodrigo Viveros**

* Website: https://rodrigoviveros.me/
* Github: [@rodrigovive](https://github.com/rodrigovive)


