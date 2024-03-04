import random
from datetime import datetime

values_update_property = {
    "agent_id": 1,
    "category_id": random.randint(1, 2),
    "street": "string",
    "city": random.choice(
        ["Moscow", "Saint Petersburg", "Tula", "Kursk", "Omsk", "Tver", "Oryol"]
    ),
    "state": random.choice(["Moscow area", "Leningradskaya", "Tulskaya"]),
    "country": "string",
    "postal_code": 0,
    "price": random.randint(10000, 80000),
    "photo": [
        "/src/img/single-list-slider/2.jpg",
        "/src/img/single-list-slider/3.jpg",
        "/src/img/single-list-slider/4.jpg",
        "/src/img/single-list-slider/5.jpg",
        "/src/img/single-list-slider/3.jpg",
        "/src/img/single-list-slider/4.jpg",
    ],
    "photo_plan": [
        "/src/img/plan-sketch.jpg",
        "/src/img/plan-sketch.jpg",
        "/src/img/plan-sketch.jpg",
    ],
    "status": random.choice(["sale", "rent"]),
    "house_area": random.randint(50, 800),
    "bedrooms": random.randint(1, 6),
    "garages": 2,
    "bathrooms": 3,
    "time_published": f"{datetime.now()}",
    "age": random.randint(1, 16),
    "communicate": "string",
    "description": "string",
    "first_floor_area": 10,
    "second_floor_area": 10,
    "third_floor_area": 10,
    "video": "string",
    "map": "string",
}

values_profile = {
    "rating_count": 1,
    "nickname": "string",
    "deals_count": 0,
    "phone": "string",
    "avatar": "/src/img/author.jpg",
    "first_name": "string",
    "last_name": "string",
    "role": "string",
    "post": 1,
}
