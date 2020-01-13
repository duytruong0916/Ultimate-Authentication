# Ultimate-Authentication-
Node.js/Express.js React.js


--List of NPM packages to install
We have to install few npm packages to start building our project. Copy the following  code so that you can simply paste it in your terminal.

--npm i body-parser cors dotenv express-jwt express-validator google-auth-library jsonwebtoken mongoose morgan @sendgrid/mail

#Client-side login with Google instruction:

-Visit this url 'console.cloud.google.com'.

-On top blue menu bar click to create a new project

-On left sidebar menu > API & Services > Credentials

-Create credentials > OAuth client id

-What if the options are greyed out?

-Click on Configure consent screen > blue button on top right

-Go on with forms... domain name ... type anything ... works!

-In Create OAuth client id page

-just enter javascript origins > http://localhost:3000.

-Copy the client-id and paste it in the .env file 

-run 'npm i react-google-login' and flowing the instruction at 'https://www.npmjs.com/package/react-google-login'

