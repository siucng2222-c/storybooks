# Storybooks

Node.js App From Scratch https://www.youtube.com/watch?v=SBvmnHTQIPY

## Learning Notes

- [Handlebars](https://handlebarsjs.com/) for simple page templating
  - Register as express view engine in app.js
  - integrate with express through [express-handlebar](https://github.com/ericf/express-handlebars)
  - Define all views and partial views within "views" folder
    - Default Layout asigned in app.js and Specific Layout used in route during render
    - Partial views for header or special button rendoring
  - Define helper functions in separate module js, register in app.js
- [Morgan](https://github.com/expressjs/morgan) as logger for express
- [Materialize](https://materializecss.com/) and [Fontawesome](https://fontawesome.com/) as default style, and components like Left nav bar and dropdown list
  - As alternative to official pages, search css and js cdn links through [cdnjs](https://cdnjs.com/)
  - Define express.static folder and put supplementary CSS file there
  - REMEMBER to initialize materialize navbar and selection list in javascript (in main layout)
- [CKEditor](https://ckeditor.com/) as wysiwyg TextArea editor
  - REMEMBER to initialize CKEditor and load plugin in individual form (story layouts) through javascript
- [Dotenv](https://www.npmjs.com/package/dotenv) to load \*.env file as Environment variable
  - Read config values by process.env.[ENV_VAR_NAME]
- [Mongoose](https://mongoosejs.com/) as ODM solution for persistence
  - Model schema definition in models folder
  - config/db.js define module for DB connection. Connect DB in app.js
- [Passport](http://www.passportjs.org/) with [passport-google-oauth-20](http://www.passportjs.org/packages/passport-google-oauth20/) strategy for Google OAuth 2.0 login
  - Create Project, Enable OAuth API, Create Credential, obtain Client ID and Client Secret from [Google Cloud Console](https://console.cloud.google.com/){:target="\_blank"}
  - In config/passport.js, define module to initialize Google Strategy
  - serializeUser and deserializeUser functions ensure user object in req.user. See [here](https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize) for explanation
  - Define auth route for authenticate, callback and logout URLs
- [express-session](https://github.com/expressjs/session#readme) as session middleware in express, and [connect-mongo](https://github.com/jdesboeufs/connect-mongo#readme) to store session object in MongoDB
- Use [method-override](https://github.com/expressjs/method-override/blob/master/README.md) to override POST method during Form submit
  - load urlencoded and json express middleware in app.js so that form attributes are submitted as req.body to route APIs as JSON object
