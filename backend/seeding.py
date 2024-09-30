from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import Item

def seed_items(db: Session):
    # Predefined items
    items = [
        {"title": "American Crow", "photo_url": "/static/american_crow.jpg"},
        {"title": "American Goldfinch", "photo_url": "/static/american_goldfinch.jpg"},
        {"title": "Black Phoebe", "photo_url": "/static/black_phoebe.jpg"},
    ]

    for item_data in items:
        # Check if the item with the same title already exists
        existing_item = db.query(Item).filter_by(title=item_data["title"]).first()

        if existing_item:
            # Update the existing item's data
            existing_item.photo_url = item_data["photo_url"]
        else:
            # Add the item if it doesn't exist
            new_item = Item(**item_data)
            db.add(new_item)

    # Commit the changes to the database
    db.commit()


# FOR TESTING PURPOSES, DELETE IN PRODUCTION
def delete_existing_items(db: Session):
    # Delete all existing items in the database
    db.query(Item).delete()
    db.commit()

# This function is invoked when the app starts
def seed_data():
    db = SessionLocal()
    try:
        #DELETE delete_existing_items(db) FUNCTION AFTER TESTING
        delete_existing_items(db)  # Clear out the old data
        seed_items(db)  # Seed new data
    finally:
        db.close()
