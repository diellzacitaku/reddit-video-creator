export default class Fetcher {
    constructor(options) {
        this.subReddit = options.subReddit;
        this.redditType = options.redditType;
        this.redditNumber = Number(options.redditNumber);
        this.redditCommentsNumber = Number(options.redditCommentsNumber);
    }

    async fetch(wrapper) {
        console.log("to be implemeted");
    }
}