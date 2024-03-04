blog_validator = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["author", "content", "published"],
        "properties": {
            "author": {
                "bsonType": "objectId",
                "description": "must be an objectId and is required",
            },
            "content": {
                "bsonType": "string",
                "description": "must be a string and is required",
            },
            "photo": {"bsonType": "string", "description": "must be a string"},
            "published": {
                "bsonType": "string",
                "description": "must be a string and is required",
            },
            "category": {
                "bsonType": "array",
                "description": "must be a string",
                "items": {"bsonType": "string", "description": "must be an string"},
            },
            "comments": {
                "bsonType": "array",
                "description": "must be an array",
                "items": {
                    "bsonType": "object",
                    "properties": {
                        "_id": {
                            "bsonType": "objectId",
                            "description": "must be an objectId",
                        },
                        "published": {
                            "bsonType": "string",
                            "description": "must be a string and is required",
                        },
                        "content": {
                            "bsonType": "string",
                            "description": "must be a string and is required",
                        },
                        "tags": {
                            "bsonType": "array",
                            "description": "must be a string",
                            "items": {
                                "bsonType": "string",
                                "description": "must be an string",
                            },
                        },
                        "views": {
                            "bsonType": "int",
                            "description": "must be an integer",
                            "minimum": 0,
                        },
                        "likes": {
                            "bsonType": "int",
                            "description": "must be an integer",
                            "minimum": 0,
                        },
                    },
                },
            },
        },
    }
}

author_validator = {
    "$jsonSchema": {
        "bsonType": "object",
        "required": ["first_name", "last_name"],
        "properties": {
            "first_name": {
                "bsonType": "string",
                "description": "must be a string and is required",
            },
            "last_name": {
                "bsonType": "string",
                "description": "must be a string and is required",
            },
        },
    }
}
