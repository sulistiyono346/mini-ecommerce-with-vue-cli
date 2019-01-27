


- ROUTES 

| Tables                    | HTTP    | Description                                                |
| --------------------------|:-------:| :---------------------------------------------------------:|
| /register                 | POST    | Register Up with new user                                  |
| /login                    | POST    | Login in get acces token                                   |
| /validate                 | GET     | validate user login                                        |
| /item                     | GET     | Get all item                                               |
| /item/:id                 | GET     | Get all item for detail                                    |
| /item /category:name      | GET     | Get all item with spesific category                        |
| /item /tags:name          | GET     | Get all item with spesific tag                             |
| /item                     | POST    | Create new item                                            |
| /item/:id                 | DELETE  | Delete item (authenticated user)                           |
| /item/:id                 | PUT     | Update item   (authenticated user)                         |


REGISTER NEW USER:

- URL

    /register

- Method:

    GET

- URL Params
    none

    Required:

    first_name=[STRING],

    last_name=[STRING],

    username=[STRING],

    email=[STRING],

    password=[STRING],

    role=[STRING]

- Success Response:

    Code: 201

    Content: 
    {
    "id": [INTEGER],
    "name": "[STRING]",
    "email": "[STRING]",
    "password": "[STRING]",
    "img":[STRING],
    "register_by": "[STRING]"
}
    


- Error Response:
    code :400

    Content :
   {
    "name": "SequelizeValidationError",
    "errors": [
        {
            "message": "Error:[message]",
            "type": "Validation error",
            "path": "[PATH]",
            "value": "[VALUE]",
            "origin": "FUNCTION",
            "instance": {
                 "id": [INTEGER],
                 "name": "[STRING]",
                 "email": "[STRING]",
                 "password": "[STRING]",
                 "img":[STRING],
                 "register_by": "[STRING]"
            },
            "validatorKey": "[KEY]",
            "validatorName": null,
            "validatorArgs": [],
            "__raw": {}
        }
    ]
}

LOGIN USER:

- URL

    /login

- Method:

    POST

- URL Params
    none

    Required:

    username=[STRING],

    password=[STRING],


- Success Response:

    Code: 200

    Content: 
    
   {
    "token": "[VALUE]"
}

- Error Response:
    code :400

    Content :
    
   {
    "msg": "wrong email/password"
    }





GET ITEM

- URL

    /item

- Method:

    GET

- URL Params
    none

    Required:

    param=[STRING],


- Success Response:

    Code: 200

    Content: 
    
   [ 
       _id: []
       title: []
       price:[]
       first_stock:
       stock:
       description:
       category: []
        img:[]
   ]

- Error Response:
    code :400

    Content :
    
   {
   err
    }

CREATED ITEM

- URL

    /item/

- Method:

    POST

- URL Params
    none

    Required:

    param=[STRING],


- Success Response:

    Code: 200

    Content: 
    
    { 
        message: 'successfully added to your database'
     }

- Error Response:
    code :400

    Content :
   {
    message: 'internal server error'
    }


UPDATED ITEM

- URL

    /item/:id

- Method:

    PUT

- URL Params
    none

    Required:

    param=[STRING],


- Success Response:

    Code: 200

    Content: 
    
    { 
     message: 'successfully updated to your database'
    }

- Error Response:
    code :400

    Content :
   {
    message: 'internal server error'
    }

DELETED ITEM

- URL

    /item/:id

- Method:

    DELETED

- URL Params
    none

    Required:

    body.id=[OBJECT_ID],


- Success Response:

    Code: 200

    Content: 
    
    {    
        message: 'successfully deleted from your database'
    }

- Error Response:
    code :400

    Content :
   {
   message: 'internal server error'
    }

