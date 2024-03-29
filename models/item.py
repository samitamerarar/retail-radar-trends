from db import db


class ItemModel(db.Model):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    price = db.Column(db.Float(precision=2), unique=False, nullable=False)

    # One to Many mapping
    store_id = db.Column(db.Integer, db.ForeignKey("stores.id", ondelete='CASCADE'), unique=False, nullable=False)
    store = db.relationship("StoreModel", back_populates="items")  # map the StoreModel to stores.id in store_id

    # Many to many
    tags = db.relationship("TagModel", back_populates="items", secondary="items_tags")
