from flask import jsonify
from .models import catalog, users, ShoppingCart, carts

def configure_routes(app):
    @app.route('/catalog', methods=['GET'])
    def get_catalog():
        return jsonify([{'id': item.id, 'name': item.name, 'description': item.description, 'price': item.price} for item in catalog])

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
