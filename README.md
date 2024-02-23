# Reddit Video Creator  &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
Reddit Video Creator is a NodeJS application in development that allows the generation of a narrated video from Reddit posts.

## Installation

Use the node package manager to install the application.

```
npm install
```

## Usage

In order to run the application, you need to run the following command:

```
npm start
```
or
```
node src/app.js
```

To get a description of available options, run the application with the `-h` flag, which will print:

```
Usage: app [options]

Options:
  --clientId <type>              Reddit client ID
  --clientSecret <type>          Reddit client secret
  --username <type>              Reddit username
  --password <type>              Reddit password
  --subReddit <type>             Subreddit name (default: "AskReddit")
  --redditType <type>            Reddit kind of topic to fetch (default: "top")
  --redditNumber <type>          Reddit number of posts to fetch (default: "1")
  --redditCommentsNumber <type>  Reddit number of comments to show per post (default: "1")
  -h, --help                     display help for command
```

## License
Reddit Video Creator is [MIT licensed](./LICENSE).
