from db import db


class TagModel(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    store_id = db.Column(db.Integer, db.ForeignKey("stores.id"), nullable=False)

    # One to Many
    store = db.relationship("StoreModel", back_populates="tags")

    # Many to Many
    items = db.relationship("ItemModel", back_populates="tags", secondary="items_tags")
