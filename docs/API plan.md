# Version 0 (A.K.A. Proof of concept)
Note: this is very insecure and it's by design because we just want to show that it works.

## Load Profile
Description: Returns the user's profile with their name, biography, and git(hub|lab) link

URL:  `GET /api/0/profile/:id`

URL Parameters:  
 - id: the unique identifier supplied for the users profile. Supplied by badge / QR code

Auth: None

Example request: `GET /api/0/profile/4a5579adb561d860`  
Return:
```JSON
{
    'name': "Lorem Ipsum",
    'bio' : "I am a teapot short and stout",
    'git': "https://www.github.com/LoremIpsum"
}
```
Error:  
 - Code: 404 / "profile not found"  
   Description: invalid 'id' parameter

Comments:
 - The id is a random 16 character hex generated at profile creation 

 ---

## Write Profile
Description: Overwrites the user's profile in it's entirity.

URL: `POST /api/0/profile/:id`

URL Parameters:  
 - id: the unique identifier supplied for the users profile. Supplied by badge / QR code

Auth: None

Example request:
```JSON
{
    'name': "Animi minus",
    'bio': "btw Muirhead is the best building on UoB Campus",
    'git': "https://www.github.com/Animagus"
}
```
Return: `200 OK`

Error:
 - Code: 404 / "profile not found"  
   Description: invalid 'id' parameter
 - Code: 401 / "invalid profile"  
   Description: malformed JSON in the request body (i.e. invalid syntax, missing/unnecessary properties)

Comments: 
 - The id is a random 16 character hex generated at profile creation 

---

 ## Provision new profile
 Description: Creates a new instance of a profile with dummy values to be over-written by a participant

 URL: `PUT /api/0/profile/:id`

 URL Parameters:
  - id: the unique identifier stored on the badge / QR code

Auth: A secret passed in the body of the request

Example request:
```JSON
{
    'auth': "3282c8027771f72b2def2520135daae5"
}
```
Return: 201 Created

Error:
 - Code: 403 / "authorisation failed"  
   Description: Invalid auth token provided
 - Code: 403 / "duplicate profile id"  
   Description: The 'id' parameter is already used by another profile

---

## Delete profile
Description: Deletes an instance of a profile

URL: `DELETE /api/0/profile/:id`

URL Parameters:
 - id: the unique identifier stored on the badge / QR code

Auth: A secret passed in the body of the request

Example request:
```JSON
{
    'auth': "3282c8027771f72b2def2520135daae5"
}
```

Return: 200 OK

Error:
 - Code: 403 / "authorisation failed"  
   Description: Invalid auth token provided
 - Code: 404 / "profile not found"  
   Description: invalid 'id' parameter
