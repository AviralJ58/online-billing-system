# Online Billing System - Submission for Backend Internship at Plotline

Welcome to the Online Billing System repository! This project provides an online billing system where users can browse items, add them to their cart, and place orders.

## Table of Contents
- [Getting Started](#getting-started)
  - [Running the Server Locally](#running-the-server-locally)
  - [Deployment](#deployment)
- [API Documentation](#api-documentation)
  - [User Collection](#user-collection)
  - [Items Collection](#items-collection)
  - [Cart Collection](#cart-collection)
  - [Order Collection](#order-collection)

## Getting Started

### Running the Server Locally

To run the server locally on your machine, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory using the command line.
3. Install the required dependencies by running:

   ```
   npm install
   ```

4. Set up your environment variables:
   - Create a `.env` file in the project root directory.
   - Define the necessary environment variables such as database connection details, JWT secret, etc.

5. Run the server:

   ```
   npm run start:dev
   ```

6. The server should now be running locally at `http://localhost:3000`.

### Deployment

The server is additionally deployed on `https://online-billing-system-5iua.onrender.com/`.

## API Documentation

The API documentation is organized into separate Postman collections for each module: User, Items, Cart, and Order. Below are the links to the documentation for each collection:

### User Collection
[User API Documentation](https://documenter.getpostman.com/view/20624505/2s9Y5Wx3wE)

### Items Collection
[Items API Documentation](https://documenter.getpostman.com/view/20624505/2s9Y5Wx3wC)

### Cart Collection
[Cart API Documentation](https://documenter.getpostman.com/view/20624505/2s9Y5Wx3wB)

### Order Collection
[Order API Documentation](https://documenter.getpostman.com/view/20624505/2s9Y5Wx3wD)

Please refer to the respective documentation for detailed information on the available endpoints, request formats, and response formats for each module.

## Requirements Satisfied

Endpoints to enable the following functionalities for users:

### User Collection

#### Create an Account
- Endpoint: `https://online-billing-system-5iua.onrender.com/user/signup`
- Method: POST
- Description: Create an account.

### Items Collection

#### Fetch Products and Services Information
- Endpoint: `https://online-billing-system-5iua.onrender.com/items`
- Method: GET
- Description: Fetch all products and services information with their prices.

### Cart Collection

#### Add Product or Service to Cart
- Endpoint (Product): `https://online-billing-system-5iua.onrender.com/cart/product`
- Endpoint (Service): `https://online-billing-system-5iua.onrender.com/cart/service`
- Method: POST
- Description: Add a product or service to the cart.

#### Remove Product or Service from Cart
- Endpoint (Product): `https://online-billing-system-5iua.onrender.com/cart/product/:id`
- Endpoint (Service): `https://online-billing-system-5iua.onrender.com/cart/service/:id`
- Method: DELETE
- Description: Remove a product or service from the cart.

#### Clear Cart
- Endpoint: `https://online-billing-system-5iua.onrender.com/cart`
- Method: DELETE
- Description: Clear the cart.

### Order Collection

#### View Total Bill
- Endpoint: `https://online-billing-system-5iua.onrender.com/order/total`
- Method: GET
- Description: View total bill (includes price, quantity, and tax on each item as well as total value of selected items).

#### Confirm Order
- Endpoint: `https://online-billing-system-5iua.onrender.com/order`
- Method: POST
- Description: Confirm the order.

### Admin Collection

#### View All Orders (Admin)
- Endpoint: `https://online-billing-system-5iua.onrender.com/orders`
- Method: GET
- Description: Additional API for admin to see all the orders.

### Test Cases

#### Practical Scenario Test Cases
- Documentation: `https://documenter.getpostman.com/view/20624505/2s9Y5Wx41Z`
- Method: GET
- Description: Appropriate test cases to simulate practical scenarios for testing the system.


## Submission Details

| Name  | Aviral Jain               |
|---------------|---------------------------|
| Institution   | Vellore Institute of Technology, Vellore |
| Student ID    | 20BIT0101                 |
| Email         | aviraljain58@gmail.com   |
| Role Applied  | Backend Internship |

---