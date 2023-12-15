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
        self.password = None
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
    Item(3, "Item 3", "Description 3", 14.99, 10, "Category 2"),
    Item(4, "Item 4", "Description 4", 16.99, 10, "Category 2"),
    Item(5, "Item 5", "Description 5", 18.99, 10, "Category 3"),
    Item(6, "Item 6", "Description 6", 20.99, 10, "Category 3"),
    Item(7, "Item 7", "Description 7", 22.99, 10, "Category 4"),
    Item(8, "Item 8", "Description 8", 24.99, 10, "Category 4"),
    Item(9, "Item 9", "Description 9", 26.99, 10, "Category 5"),
    Item(10, "Item 10", "Description 10", 28.99, 10, "Category 5"),
    Item(11, "Item 11", "Description 11", 30.99, 10, "Category 6"),
    Item(12, "Item 12", "Description 12", 32.99, 10, "Category 6"),
]

users = [
    User(1, "user1", "user1@example.com"),
    User(2, "user2", "user2@example.com"),
    User(3, "user3", "user3@example.com"),
]

carts = {user.id: ShoppingCart() for user in users}

reviews = [
    Review(1, 1, 1, 5, "Great product!"),
    Review(2, 1, 2, 4, "Good product!"),
    Review(3, 2, 1, 3, "Okay product!"),
    Review(4, 2, 2, 2, "Bad product!"),
    Review(5, 3, 1, 1, "Terrible product!"),
    Review(6, 3, 2, 5, "Great product!"),
    Review(7, 1, 3, 4, "Good product!"),
    Review(8, 1, 4, 3, "Okay product!"),
    Review(9, 2, 3, 2, "Bad product!"),
    Review(10, 2, 4, 1, "Terrible product!"),
    Review(11, 3, 3, 5, "Great product!"),
    Review(12, 3, 4, 4, "Good product!"),
]
