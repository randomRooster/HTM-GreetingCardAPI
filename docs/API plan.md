# Version 0 (A.K.A. Proof of concept)
Note: this is very insecure and it's by design because we just want to show that it works.

## Load Profile
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
Comments:
 - The id is a random 16 character hex generated at profile creation 

 ---

## Write Profile
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

Comments: 
 - The id is a random 16 character hex generated at profile creation 