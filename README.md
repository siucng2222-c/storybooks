# storybooks

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
- [Materialize](https://materializecss.com/) and [Fontawesome](https://fontawesome.com/) as default style
  - As alternative to official pages, search css and js cdn links through [cdnjs](https://cdnjs.com/)
  - Define express.static folder and put supplementary CSS file there
- [Passport](http://www.passportjs.org/) with [passport-google-oauth-20](http://www.passportjs.org/packages/passport-google-oauth20/) strategy for Google OAuth 2.0 login
  - Create Project, Enable OAuth API, Create Credential, obtain Client ID and Client Secret from [Google Cloud Console](https://console.cloud.google.com/)
