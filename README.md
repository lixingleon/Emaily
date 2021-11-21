# Emaily
email bulk sender

# special function: Google OAuth 2.0 Authorization
1. third-party application directs the user to Google Login Page, where Google would ask for user permission
2. Once User gives the permission, the user would be redirect to a callback route defined by third-party application, with an access code attached to the end of URL
3. third-party application receives the access code and communicate with Google Server to get access Token
4. Once third-party application get the access Token, it can request user information from Google Server using this Token

# What is the use of Passport.JS?
1. as a middleware, handle all the OAuth Authorization work flow.
2. also as a middleware, use serializeUser and deserialiseUser function to take advantage of Cookie.
