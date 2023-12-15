from flask import jsonify, request, session
from .models import catalog, users, User, ShoppingCart, carts, Order, Review


def configure_routes(app):

    """
    Routes: /catalog,
    Methods: GET,
    Description: Get all products in the catalog
    """
    @app.route('/catalog', methods=['GET'])
    def get_catalog():
        return jsonify([{'id': item.id, 'name': item.name,
                         'description': item.description, 'price': item.price,
                         'inventory_count': item.inventory_count,
                         'category': item.category}
                        for item in catalog])

    @app.route('/user/create', methods=['POST'])
    def create_user():
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password') # TODO: Add encryption

        # Validate the data
        if not username or not email or not password:
            return jsonify({'success': False, 'error': 'Missing required fields'})
        if any(user.email == email for user in users):
            return jsonify({'success': False, 'error': 'Email already used'})
        if any(user.username == username for user in users):
            return jsonify({'success': False, 'error': 'Username already used'})
        if len(password) < 8:
            return jsonify({'success': False, 'error': 'Password must be at least 8 characters'})

        # Create and add the new user to the users list
        new_user_id = len(users) + 1
        new_user = User(new_user_id, username, email)
        users.append(new_user)
        carts[new_user_id] = ShoppingCart()

        return jsonify({'success': True, 'user_id': new_user_id})

    @app.route('/user/login', methods=['POST'])
    def login_user():
        # TODO: Add logic to authenticate the user
        data = request.json
        username = data.get('username')
        password = data.get('password') # TODO: Add encryption

        # Validate the data
        user = next((u for u in users if
                     u.username == username and u.password == password), None)
        if user is None:
            return jsonify({'success': False, 'error': 'Invalid credentials'})

        # Set the user ID in session
        session['user_id'] = user.id
        return jsonify({'success': True, 'user_id': user.id})

    @app.route('/user/logout', methods=['POST'])
    def logout_user():
        session.pop('user_id', None)  # Remove 'user_id' from session
        return jsonify({'success': True, 'message': 'Logged out successfully'})

    @app.route('/user/update', methods=['POST'])
    def update_user():
        data = request.json
        user_id = data.get('user_id')
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Update the data
        if not username or not email or not password:
            return jsonify({'success': False, 'error': 'Missing required fields'})
        user = next((u for u in users if u.id == user_id), None)
        if user is None:
            return jsonify({'success': False, 'error': 'Invalid user ID'})
        user.username = username
        user.email = email
        user.password = password

        return jsonify({'success': True, 'user_id': user_id})

    @app.route('/user/cart/<int:user_id>', methods=['GET'])
    def view_cart(user_id):
        # TODO: Add logic to display the user's cart
        pass

    @app.route('/user/order/place', methods=['POST'])
    def place_order():
        # TODO: Add logic to place an order with the items in the cart
        pass

    @app.route('/cart/add', methods=['POST'])
    def add_to_cart():
        # TODO: Get user_id and item_id from request
        user_id = 1
        item_id = 1
        quantity = 1  # Default quantity

        carts[user_id].add_item(item_id, quantity)
        return jsonify({'success': True})

    @app.route('/cart/remove', methods=['POST'])
    def remove_from_cart():
        # TODO: Get user_id and item_id from request
        user_id = 1
        item_id = 1
        quantity = 1  # Default quantity

        carts[user_id].remove_item(item_id, quantity)
        return jsonify({'success': True})

    @app.route('/discount/apply', methods=['POST'])
    def apply_discount():
        # TODO: Add logic to apply discount
        pass

    @app.route('/inventory/update', methods=['POST'])
    def update_inventory():
        # TODO: Add logic to update inventory
        pass

    @app.route('/reviews/add', methods=['POST'])
    def add_review():
        # TODO: Add logic to add a product review
        pass

    @app.route('/reviews/<int:item_id>', methods=['GET'])
    def get_reviews(item_id):
        # TODO: Add logic to get reviews for a specific item
        pass

    @app.route('/search', methods=['GET'])
    def search_products():
        # TODO: Add logic for product search and filtering by category
        query = request.args.get('query', '')
        category = request.args.get('category', '')
        pass

    @app.route('/order/history/<int:user_id>', methods=['GET'])
    def view_order_history(user_id):
        # TODO: Add logic to view a user's order history
        pass
