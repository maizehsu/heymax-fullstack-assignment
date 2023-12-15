"""
Item class represents a catalog item.
"""
class Item:
    def __init__(self, id, name, description, price, inventory_count, category):
        self.id = id
        self.name = name
        self.description = description
        self.price = price
        self.inventory_count = inventory_count
        self.category = category

    def apply_discount(self, discount):
        # TODO: Add logic to apply discount to the price
        pass

"""
User class represents a user.
"""
class User:
    def __init__(self, id, username, email):
        self.id = id
        self.username = username
        self.email = email
        self.shopping_cart = ShoppingCart()
        self.order_history = []

    def add_order(self, order):
        # TODO: Add logic to add an order to order history
        pass

"""
ShoppingCart class represents a shopping cart.
"""
class ShoppingCart:
    def __init__(self):
        self.items = {}  # Key: Item ID, Value: (Item, Quantity)

    def add_item(self, item_id, quantity):
        if item_id in self.items:
            self.items[item_id] += quantity
        else:
            self.items[item_id] = quantity

    def remove_item(self, item_id, quantity):
        if item_id in self.items:
            self.items[item_id] -= quantity
            if self.items[item_id] <= 0:
                del self.items[item_id]

    def calculate_total(self):
        # TODO: Add logic to calculate the total cost of items in the cart
        pass

    def apply_discounts(self):
        # TODO: Add logic to apply discounts to items in the cart
        pass

"""
Order class represents an order.
"""
class Order:
    def __init__(self, id, user_id, items, total, date):
        self.id = id
        self.user_id = user_id
        self.items = items
        self.total = total
        self.date = date

"""
Review class represents a product review.
"""
class Review:
    def __init__(self, id, user_id, item_id, rating, comment):
        self.id = id
        self.user_id = user_id
        self.item_id = item_id
        self.rating = rating
        self.comment = comment

# Mock database
catalog = [
    Item(1, "Item 1", "Description 1", 10.99, 10, "Category 1"),
    Item(2, "Item 2", "Description 2", 12.99, 10, "Category 1"),
]
users = [
    User(1, "user1", "user1@example.com"),
    User(2, "user2", "user2@example.com"),
]
carts = {user.id: ShoppingCart() for user in users}
