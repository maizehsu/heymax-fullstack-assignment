# Heymax Fullstack Assignment

The goal is to create a full-stack e-commerce application. The application should allow users to browse items, add items to a shopping cart, remove items from the shopping cart, calculate the total cost of items in the shopping cart, and checkout. Requirements:

- **Item Catalog:** Create a catalog of items that includes at least 10 different items, each with a unique name, description, and price. ✅
- **Shopping Cart:** Implement a shopping cart that allows users to add items from the item catalog. The shopping cart should keep track of the quantity of each item. ✅
- **Add/Remove Items:** Users should be able to add items to and remove items from the shopping cart. ✅
- **Checkout Process:** Implement a checkout process that includes user information, shipping address, and payment method (just mock the actual payment).
- **Admin:** Implement an admin system to manage the catalog, including adding/removing items, changing price etc.. 🚧
- **API:** Implement a RESTful API that allows users to interact with the shopping cart and checkout process. The API should support operations to add an item, remove an item, get the total cost, and checkout. ✅
- **Frontend:** Implement a user-friendly interface that allows users to interact with the shopping cart, item catalog, and checkout process. ✅
- **Unit Tests:** Write unit tests to verify the functionality of your application.

For extra credit, consider adding the following features:

- **User Accounts:** Allow users to create accounts and save their shopping carts between sessions. ✅
- **Discounts:** Implement a system for applying discounts to items or orders.
- **Inventory Management:** Keep track of inventory for each item and prevent users from adding more of an item to their cart than is available in inventory. 🚧
- **Product Reviews:** Allow users to leave reviews for products they've purchased. 🚧
- **Product Search and Categories:** Implement a search function and categorize products. 🚧
- **Order History:** Users should be able to view their past orders. 🚧

## Run

#### Backend (Flask):

1. Navigate to the "backend" directory:

bashCopy code

`cd backend`

2. Create a virtual environment (if you haven't already):

bashCopy code

`python3 -m venv venv`

3. Activate the virtual environment:

bashCopy code

`source venv/bin/activate`

4. Install the required Python packages:

bashCopy code

`pip install flask`

5. Make the `run` script executable:

bashCopy code

`chmod +x ../bin/run`

6. Run the Flask app using the provided script:

bashCopy code

`../bin/run`

The Flask backend should now be running at [http://localhost:5000](http://localhost:5000/).

#### Frontend (React):

1. Navigate to the "frontend" directory:

bashCopy code

`cd frontend`

2. Install the required Node.js packages:

bashCopy code

`npm install`

3. Start the frontend development server:

bashCopy code

`npm start`

The React frontend should now be running at [http://localhost:3000](http://localhost:3000/).

## File Structure

```
.
├── README
├── backend
│   ├── __init__.py
│   ├── models.py
│   └── routes.py
├── bin
│   └── run
├── frontend
│   ├── README.md
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── src
├── static
├── templates
└── venv
    ├── bin
    ├── lib
    └── pyvenv.cfg

```


## API Endpoints

### Catalog

- `GET /catalog`: Get the list of all products in the catalog.
- `GET /catalog/<int:item_id>`: Get details of a specific product by its ID.

### Users

- `POST /user/create`: Create a new user account.
- `POST /user/login`: Log in with an existing user account.
- `POST /user/logout`: Log out the currently logged-in user.
- `POST /user/update`: Update user account information.

### Shopping Cart

- `GET /user/cart/<int:user_id>`: View the contents of a user's shopping cart.
- `POST /cart/add`: Add items to the shopping cart.
- `POST /cart/remove`: Remove items from the shopping cart.

### Orders

- `POST /user/order/place`: Place an order with items in the shopping cart.
- `GET /order/history/<int:user_id>`: View the order history for a user.

### Reviews

- `POST /reviews/add`: Add a review for a product.
- `GET /reviews/<int:item_id>`: Get reviews for a specific product by its ID.
- `GET /reviews/<int:user_id>`: Get reviews written by a specific user.

### Search

- `GET /search`: Search for products based on a query string and optional category filter.

### Discounts

- `POST /discount/apply`: Apply discounts to the cart total.