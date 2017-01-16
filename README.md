# labs-console

A web interface to drive push button infrastructure. Built with [patternfly](https://github.com/patternfly/patternfly) and [react-static-boilerplate](https://github.com/kriasoft/react-static-boilerplate).

### Directory Layout

```shell
.
├── /app/                       # Node.js backend
│   ├── /common/                # Common helpers
│   ├── /controllers/           # Controllers and route handlers
│   ├── /models/                # Mongoose data models
├── /components/                # Shared or generic UI components
│   ├── /CardView/              # CardView component
│   ├── /Layout/                # Website layout component
│   ├── /Link  /                # Link component to be used insted of <a>
│   └── /...                    # etc.
├── /core/                      # Core framework
│   ├── /history.js             # Handles client-side navigation
│   ├── /router.js              # Handles routing and data fetching
│   └── /store.js               # Application state manager (Redux)
├── /data/                      # Front end api client data models
├── /node_modules/              # 3rd-party libraries and utilities
├── /pages/                     # React components for web pages
│   ├── /app/                   # App page
│   ├── /error/                 # Error page
│   ├── /home/                  # Home page
│   └── /...                    # etc.
├── /public/                    # Static files such as favicon.ico etc.
│   ├── /dist/                  # The folder for compiled output
│   ├── favicon.ico             # Application icon to be displayed in bookmarks
│   ├── robots.txt              # Instructions for search engine crawlers
│   └── /...                    # etc.
├── /test/                      # Unit and integration tests
├── /utils/                     # Utility and helper classes
│── main.js                     # React application entry point
│── package.json                # The list of project dependencies and NPM scripts
│── routes.json                 # This list of application routes
│── run.js                      # Build automation script, e.g. `node run build`
│── server.js                   # Node.js Express server
└── webpack.config.js           # Bundling and optimization settings for Webpack
```


### Getting Started

**Step 1**. Clone this repository:

```shell
$ git clone -o upstream -b master --single-branch \
      https://github.com/rht-labs/labs-console.git labs-console
$ cd labs-console
$ npm install                   # Install project dependencies listed in package.json
```

**Step 2**. Launch Mongodb locally. You can do this with Docker via:
 ```
 docker run --rm --detach -p 27017:27017 -P -e MONGODB_USER=mongo -e MONGODB_PASSWORD=mongo -e MONGODB_DATABASE=mongo -e MONGODB_ADMIN_PASSWORD=mongo openshift/mongodb-24-centos7
 export MONGO_URL=mongodb://mongo:mongo@localhost:27017/mongo
 npm start
 ```

**Step 3**. Launch the node.js backend (ensure you have an instance of Mongo running first, guide for Mac OSX [here](http://treehouse.github.io/installation-guides/mac/mongo-mac.html)):
```shell
$ node server.js
```

**Step 4**. Compile and launch the UI:

```shell
$ node run
```

You can also test your app in release (production) mode by running `node run start --release` or
with HMR and React Hot Loader disabled by running `node run start --no-hmr`. The app should become
available at [http://localhost:3000/](http://localhost:3000/).


### How to Test

The unit tests are powered by [jest](https://facebook.github.io/jest/).

```shell
$ npm run lint                  # Check JavaScript and CSS code for potential issues
$ npm run test                  # Run unit tests. Or, `npm run test:watch` or `npm run test:cov`
```

### How to Deploy

To build for production, run:

```shell
$ node run build                # Or, `node run build --release` for production build
```