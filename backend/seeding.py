from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import Item

def seed_items(db: Session):
    # Predefined items
    items = [
        {"title": "American Crow", "photo_url": "/static/american_crow.jpg"},
        {"title": "American Goldfinch", "photo_url": "/static/american_goldfinch.jpg"},
        {"title": "California Ground Squirrel", "photo_url": "/static/california_ground_squirrel.webp"},
        {"title": "Cheeto Cat", "photo_url": "/static/cheeto_cat.jpg"},
        {"title": "Green Sunfish", "photo_url": "/static/green_sunfish.jpeg"},
        {"title": "Marina Madrone", "photo_url": "/static/marina_madrone.jpg"},
        {"title": "Purple Bottlebrush", "photo_url": "/static/purple_bottlebrush.jpg"},
        {"title": "Santa Barbara Daisy", "photo_url": "/static/santa_barbara_daisy.jpg"},
        {"title": "Turkey Vulture", "photo_url": "/static/turkey_vulture.jpeg"},
        {"title": "Valley Garter Snake", "photo_url": "/static/valley_garter_snake.jpeg"},
        {"title": "Western Scrub Jay", "photo_url": "/static/western_scrub_jay.jpg"},
        {"title": "Wild Turkey (Meleagris gallopavo)", "photo_url": "/static/wild_turkey(meleagris_gallopavo).webp"},
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
