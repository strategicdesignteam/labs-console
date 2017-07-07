# labs-console

A web interface to drive openshift-ansible-contrib via Ansible Tower. Built with [patternfly](https://github.com/patternfly/patternfly) and [react-static-boilerplate](https://github.com/kriasoft/react-static-boilerplate).

![Console](https://github.com/strategicdesignteam/labs-console/blob/master/docs/diagrams/console.png)


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
│   ├── /constants.js           # Front end and Backend shared constants
│   ├── /history.js             # Handles client-side navigation
│   ├── /router.js              # Handles routing and data fetching
│   └── /store.js               # Application state manager (Redux)
├── /data/                      # Front end api client data models
├── /node_modules/              # 3rd-party libraries and utilities
├── /pages/                     # React components for web pages
│   ├── /app/                   # App page
│   ├── /error/                 # Error page
│   ├── /welcome/               # Welcome page
│   └── /...                    # etc.
├── /public/                    # Static files such as favicon.ico etc.
│   ├── /dist/                  # The folder for compiled output
│   ├── /img/                   # Application images
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

### Overview

![Overview Diagram](https://github.com/strategicdesignteam/labs-console/blob/master/docs/diagrams/Overview_diagram.png)


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
 ```
Alternatively, you can use Homebrew to install Mongo DB on Mac OSX. Guide [here](http://treehouse.github.io/installation-guides/mac/mongo-mac.html)

If running labs-console locally, you'll need to export the variables below before starting the front and back end services. For more information on what they mean and how you need to change them look at the variables section below.

```shell
cat << EOF > ~/labs-console-setvars.rc
export ADMIN_USER=admin
export ADMIN_PASS=password
export TOWER_URL=https://username:password@tower.domain.com/
export TOWER_HOSTNAME=tower.domain.com
export ADD_INFRA_WORKFLOW_ID=89
export DESTROY_INFRA_WORKFLOW_ID=171
export ADD_PROJECT_WORKFLOW_ID=325
export REMEDIATE_INSIGHTS_WORKFLOW_ID=0
export INSIGHTS_URL=https://access.redhat.com/r/insights/v3/
export INSIGHTS_AUTH="Basic cmhuLWVuZ2l=="
export NODE_TLS_REJECT_UNAUTHORIZED=0
EOF
```

To get INSIGHTS_AUTH value you will need to run your RH customer portal username and password through base64 encoding like so:

``` $ echo -n 'username:password' | base64 ```

Then source the file and ensure your environment variables are set

```shell
$ . ~/labs-console-setvars.rc
$ env |grep TOWER
 .... Should return the environment variable ....
```

**Step 3**. Build the front end UI
```shell
$ node run build
```

**Step 4**. Launch the node.js backend (ensure you have an instance of Mongo running first):
```shell
$ node server.js
```
You can now view the application running at [http://0.0.0.0:8080/](http://0.0.0.0:8080/)

If you'd like to debug the UI with [BrowserSync](https://browsersync.io/) / HMR, run the UI in a new terminal:

```shell
$ node run.js
```
The app should become available at [http://localhost:3000/](http://localhost:3000/).

You can also test your app in release (production) mode by running `node run start --release` or
with HMR and React Hot Loader disabled by running `node run start --no-hmr`. 

### Environment Variables
The following environment variables should be set in [OCP](https://www.openshift.com/container-platform/):

**Build Variables**

| Key | Value | Description |
| --- | --- | --- |
| BUILD_ENV | production | Ensures `node_modules` are pruned after build step |

**Deployment Variables**

| Key | Value | Description |
| --- | --- | --- |
| OPENSHIFT_MONGODB_DB_URL | mongodb://`[user]`:`[pw]`@mongodb.`[project]`.svc.cluster.local/`[db]` | Mongo CN |
| ADMIN_USER | admin | Default admin login |
| ADMIN_PASS | password | Default admin password |
| TOWER_URL | https://`[user]`:`[password]`@`[tower.yourdomain.io]`/ | Ansible Tower instance |
| TOWER_HOSTNAME | tower.yourdomain.io | Ansible Tower Hostname |
| ADD_INFRA_WORKFLOW_ID | 0 | Tower Add Infra Workflow ID |
| DESTROY_INFRA_WORKFLOW_ID | 0 | Tower Delete Infra Workflow ID |
| ADD_PROJECT_WORKFLOW_ID | 0 | Tower Add Project Workflow ID |
| REMEDIATE_INSIGHTS_WORKFLOW_ID | 0 | Tower Remediate Red Hat Insights Workflow ID |
| INSIGHTS_URL | https://access.redhat.com/r/insights/v3/ | Red Hat Insights API URL |
| INSIGHTS_AUTH | Basic cmhuLWVuZ2l== | Red Hat Insights Auth Header |
| NODE_TLS_REJECT_UNAUTHORIZED | 0 | Ignore self signed cert errors with Tower |



### How to Test

The unit tests are powered by [jest](https://facebook.github.io/jest/).

```shell
$ npm run lint                  # Check JavaScript and CSS code for potential issues
$ npm run test                  # Run unit tests. Or, `npm run test:watch` or `npm run test:cov`
```

### How to Build Production Assets

To build productions assets in `public`, run:

```shell
$ node run build --release
```
