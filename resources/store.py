from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from flask_jwt_extended import jwt_required, get_jwt_identity

from db import db
from models import StoreModel
from schemas import StoreSchema

blp = Blueprint("stores", __name__, description="Operations on stores")


@blp.route("/store/<int:store_id>")
class Store(MethodView):

    @jwt_required()
    @blp.response(200, StoreSchema)
    @blp.response(200, StoreSchema)
    def get(self, store_id):
        current_user_id = get_jwt_identity()
        store = StoreModel.query.filter_by(id=store_id, user_id=current_user_id).first_or_404()
        return store

    @jwt_required()
    def delete(self, store_id):
        current_user_id = get_jwt_identity()
        store = StoreModel.query.filter_by(id=store_id, user_id=current_user_id).first_or_404()
        db.session.delete(store)
        db.session.commit()
        return {"message": "Store deleted"}, 200


@blp.route("/store")
class StoreList(MethodView):

    @jwt_required()
    @blp.response(200, StoreSchema(many=True))
    def get(self):
        current_user_id = get_jwt_identity()
        return StoreModel.query.filter_by(user_id=current_user_id).all()

    @jwt_required()
    @blp.arguments(StoreSchema)
    @blp.response(201, StoreSchema)
    def post(self, store_data):
        # Validate store name length
        if len(store_data.get('name', '')) < 3 or len(store_data.get('name', '')) > 15:
            abort(400, message="Store name must be between 3 and 15 characters long.")

        current_user_id = get_jwt_identity()
        store_data['user_id'] = current_user_id
        store = StoreModel(**store_data)
        try:
            db.session.add(store)
            db.session.commit()
        except IntegrityError:
            abort(400, message="A store with that name already exists.")
        except SQLAlchemyError:
            abort(500, message="An error occurred creating the store.")

        return store
