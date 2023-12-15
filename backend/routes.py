from flask import jsonify, request, session
from .models import catalog, users, User, ShoppingCart, carts, Order, Review, reviews


def configure_routes(app):

    @app.route('/catalog', methods=['GET'])
    def get_catalog():
        return jsonify([{'id': item.id, 'name': item.name,
                         'description': item.description, 'price': item.price,
                         'inventory_count': item.inventory_count,
                         'category': item.category}
                        for item in catalog])

    @app.route('/catalog/<int:item_id>', methods=['GET'])
    def get_catalog_by_id(item_id):
        item = next((i for i in catalog if i.id == item_id), None)
        if item is None:
            return jsonify({'success': False, 'error': 'Invalid item ID'})
        return jsonify({'id': item.id, 'name': item.name,
                        'description': item.description, 'price': item.price,
                        'inventory_count': item.inventory_count,
                        'category': item.category})

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
        user = next((u for u in users if u.id == user_id), None)
        if user is None:
            return jsonify({'success': False, 'error': 'Invalid user ID'})

        # Retrieve the shopping cart items and quantities
        cart_items = carts[user_id].items
        cart_items_details = []

        for item_id, quantity in cart_items.items():
            item = next((item for item in catalog if item.id == item_id), None)
            if item:
                cart_items_details.append(
                    {'id': item.id, 'name': item.name, 'quantity': quantity})

        return jsonify({'success': True, 'cart_items': cart_items_details})

    @app.route('/user/order/place', methods=['POST'])
    def place_order():
        # TODO: Add logic to place an order with the items in the cart
        pass

    @app.route('/cart/add', methods=['POST'])
    def add_to_cart():
        data = request.json
        user_id = data.get('user_id')
        item_id = data.get('item_id')
        quantity = 1  # Default quantity

        carts[user_id].add_item(item_id, quantity)
        return jsonify({'success': True})

    @app.route('/cart/remove', methods=['POST'])
    def remove_from_cart():
        data = request.json
        user_id = data.get('user_id')
        item_id = data.get('item_id')
        quantity = 1  # Default quantity

        carts[user_id].remove_item(item_id, quantity)
        return jsonify({'success': True})

    @app.route('/inventory/update', methods=['POST'])
    def update_inventory():
        data = request.json
        item_id = data.get('item_id')
        item_description = data.get('item_description')
        item_price = data.get('item_price')
        item_inventory_count = data.get('item_inventory_count')
        item_category = data.get('item_category')

        # Update the data
        if not item_id or not item_description or not item_price or not item_inventory_count or not item_category:
            return jsonify({'success': False, 'error': 'Missing required fields'})
        item = next((i for i in catalog if i.id == item_id), None)
        if item is None:
            return jsonify({'success': False, 'error': 'Invalid item ID'})
        item.description = item_description
        item.price = item_price
        item.inventory_count = item_inventory_count
        item.category = item_category

        return jsonify({'success': True, 'item_id': item_id})

    @app.route('/reviews/add', methods=['POST'])
    def add_review():
        data = request.json
        user_id = data.get('user_id')
        item_id = data.get('item_id')
        rating = data.get('rating')
        comment = data.get('comment')

        # Add the review to reviews
        new_review_id = len(reviews) + 1
        new_review = Review(new_review_id, user_id, item_id, rating, comment)
        reviews.append(new_review)
        return jsonify({'success': True, 'review_id': new_review_id})

    @app.route('/reviews/<int:item_id>', methods=['GET'])
    def get_reviews(item_id):
        # Retrieve the reviews from reviews using item_id
        reviews_for_the_item = [review for review in reviews if review.item_id == item_id]
        # Return all the reviews associated with the item
        return jsonify({'success': True, 'reviews': reviews_for_the_item})

    @app.route('/search', methods=['GET'])
    def search_products():
        # TODO: Add logic for product search and filtering by category
        query = request.args.get('query', '')
        category = request.args.get('category', '')
        pass

    @app.route('/order/history/<int:user_id>', methods=['GET'])
    def view_order_history(user_id):
        user = next((u for u in users if u.id == user_id), None)
        if user is None:
            return jsonify({'success': False, 'error': 'Invalid user ID'})
        return jsonify({'success': True, 'orders': user.orders})

    @app.route('/discount/apply', methods=['POST'])
    def apply_discount():
        # TODO: Add logic to apply discount
        pass