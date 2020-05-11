Backend URL: 
https://demo-profile-app.herokuapp.com/

Authenticate:
https://demo-profile-app.herokuapp.com/authenticate

Expects:
  application/json 
  {key :  ABC123}
Will return a Bearer token

Post Profile Endpoint:
https://demo-profile-app.herokuapp.com/profile

Expects Form-data:
    fullName String
    bio : String
    userName : String
    profilePicture : File (jpg or png)
