import factory
from app_real_estate.models import User, Profile, Property
from ..conftest import async_session_maker
from async_factory_boy.factory.sqlalchemy import AsyncSQLAlchemyFactory


class UserFactory(AsyncSQLAlchemyFactory):
    class Meta:
        model = User
        sqlalchemy_session = async_session_maker

    email = factory.Faker('first_name')
    password = "$2b$12$ApY3jQ1m3FyNmJ305FHcqufutbf0cVV5oOUWIXgp7TakmlY.d21bC"  # qwerty
    is_active = True
    profile = Profile
    properties = Property


