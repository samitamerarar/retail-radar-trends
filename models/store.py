from db import db


class StoreModel(db.Model):
    __tablename__ = "stores"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # One to many mapping
    # dynamic: dont prefetch from DB; dont resolve to a list of ItemModel objects.
    items = db.relationship("ItemModel", back_populates="store", lazy="dynamic")
    tags = db.relationship("TagModel", back_populates="store", lazy="dynamic")
