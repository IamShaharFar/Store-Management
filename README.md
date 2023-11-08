# Store Management Server

This server-side application provides the backend services for the Store Management System, handling data processing, API endpoints, and database interactions for a retail management platform.

## Features

- **RESTful API**: Offers a suite of API endpoints for managing store data.
- **Database Integration**: Connects with a database for persistent storage of inventory, orders, and customer data.
- **Authentication**: Manages user authentication and authorization for secure access to the management system.
- **Data Processing**: Handles business logic for inventory restocking, order fulfillment, and customer service operations.

## API Endpoints

Below are the API endpoints provided by the server, grouped by controller functionality:

### Authentication Endpoints (`authController.js`)
- **POST `/auth/register`**: Register a new user account.
- **POST `/auth/login`**: Login to an existing user account.

### Category Endpoints (`categoryController.js`)
- **POST `/categories/add`**: Add a new product category.
- **PUT `/categories/update/:category_id`**: Update an existing product category.
- **DELETE `/categories/delete/:category_id`**: Delete a product category.
- **GET `/categories/:category_id`**: Get details of a single product category.
- **GET `/categories/`**: Get a list of all product categories.

### Customer Endpoints (`customerController.js`)
- **POST `/customers/add`**: Add a new customer.
- **PUT `/customers/update/:customer_id`**: Update an existing customer.
- **DELETE `/customers/delete/:customer_id`**: Delete a customer.
- **GET `/customers/:customer_id`**: Get details of a single customer.
- **GET `/customers/`**: Get a list of all customers.

### Inventory Endpoints (`inventoryController.js`)
- **POST `/inventory/add`**: Add a new product to the inventory.
- **PUT `/inventory/update/:product_id`**: Update an existing product in the inventory.
- **DELETE `/inventory/delete/:product_id`**: Delete a product from the inventory.
- **GET `/inventory/:product_id`**: Get details of a single product.
- **GET `/inventory/`**: Get a list of all inventory items.

### Orders Endpoints (`ordersController.js`)
- **POST `/orders/add`**: Place a new order.
- **PUT `/orders/update/:order_id`**: Update an existing order.
- **DELETE `/orders/delete/:order_id`**: Cancel an order.
- **GET `/orders/:order_id`**: Get details of a single order.
- **GET `/orders/`**: Get a list of all orders.

All endpoints are protected and require an `Authorization` header with a valid JWT token.


## Related Repositories

- **Client Application**: For the frontend client application that interacts with this server, visit [Store Management Client](https://github.com/IamShaharFar/Store-Managment-Client).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following tools installed on your system:
- Node.js (v12.0 or higher)
- npm (v6.0 or higher)

### Installation

To set up the server locally, follow these steps:

```bash
git clone https://github.com/IamShaharFar/Store-Management.git
cd Store-Management
npm install
```

### Running the Server

To run the server in development mode, use:

```bash
npm run start
```

The server will start, and you will be able to make API calls to `http://localhost:3000`.

## Usage

Add instructions on how to use the server, including any setup required for different features, environment setup, and API endpoint documentation.

## Contributing

Contributions are welcome. To contribute, please fork the repository and create a new branch for your feature or fix, then submit a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Contact

For any questions or feedback, please contact the project maintainer at [shaharfar16@gmail.com](mailto:shaharfar16@gmail.com).

## Acknowledgments

- Thanks to all contributors and supporters.
