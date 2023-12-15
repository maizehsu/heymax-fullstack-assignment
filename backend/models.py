"""
Item class represents a catalog item.
"""
class Item:
    def __init__(self, id, name, description, price):
        self.id = id
        self.name = name
        self.description = description
        self.price = price

"""
User class represents a user.
"""
class User:
    def __init__(self, id, username, email):
        self.id = id
        self.username = username
        self.email = email

"""
ShoppingCart class represents a shopping cart.
"""
class ShoppingCart:
    def __init__(self):
        self.items = {}  # Key: Item ID, Value: Quantity

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

# Mock database
catalog = [
    Item(1, "Item 1", "Description 1", 10.99),
    Item(2, "Item 2", "Description 2", 12.99),
]
users = [
    User(1, "user1", "user1@example.com"),
    User(2, "user2", "user2@example.com"),
]
carts = {user.id: ShoppingCart() for user in users}


