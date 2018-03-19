# Monitor

	npm install

	npm run dev
Now you can access your react application on http://localhost:8080


	npm run build
This will create create two files: `index.js` in `server/public/js` and `server.js` in `server/bin`.
`server.js` will be used for serving the application on port 3000 and `index.js` is the actual react app itself.

To get a distributable tarball of your application, run this command:

    npm pack

Remember that you have to run `npm run build` before doing this. This will create a tar.gz file in your root folder. The contents in this file is deployable. All you need to do is copy the contents inside package folder inside this tar.gz file to your server and run the app with something like [pm2].



#build scripts:
#npx webpack --config webpack.config.js

npm i cross-env ejs express prop-types react react-dom react-hot-loader react-redux react-router react-router-dom redux
npm i --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-1 css-loader eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react extract-text-webpack-plugin file-loader html-webpack-plugin node-sass sass-loader style-loader uglifyjs-webpack-plugin webpack webpack-dev-server webpack-node-externals


npm i --save express-session body-parser tedious sequelize passport passport-local bcrypt-nodejs
npm i --save-dev axios
npm i --save-dev babel-polyfill

npm i --save redux-saga isomorphic-fetch
npm i --save react-cookies

npx run server\db\build.js
