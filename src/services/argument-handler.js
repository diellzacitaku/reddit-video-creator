import { Command } from "commander";

export default class ArgumentHandler {
    constructor() {
        this.options = new Command()
            // Get API options
            .option("--clientId <type>", "Reddit client ID")
            .option("--clientSecret <type>", "Reddit client secret")
            .option("--username <type>", "Reddit username")
            .option("--password <type>", "Reddit password")

            // Get Reddit content options
            .option("--subReddit <type>", "Subreddit name", "AskReddit")
            .option("--redditType <type>", "Reddit kind of topic to fetch", "top")
            .option("--redditNumber <type>", "Reddit number of posts to fetch", "1")
            .option("--redditCommentsNumber <type>", "Reddit number of comments to show per post", "3")

            .parse(process.argv)
            .opts();
    }
}
