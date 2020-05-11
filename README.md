Backend URL: 
https://demo-profile-app.herokuapp.com/

Authenticate:
https://demo-profile-app.herokuapp.com/authenticate

Expects:
  application/json 
  {key :  ABC123}
Will return a Bearer token that will give you access to post. Expires in 1 hour

Post Profile Endpoint:
https://demo-profile-app.herokuapp.com/profile

Expects Form-data:
    fullName String
    bio : String
    userName : String
    profilePicture : File (jpg or png)
