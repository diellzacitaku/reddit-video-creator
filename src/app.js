import Snoowrap from "snoowrap";
import Fetcher from "./services/fetcher.js";
import ArgumentHandler from "./services/argument-handler.js";


function main() {
    const options = new ArgumentHandler().options;
    console.log(options.clientId);

    const wrapper = new Snoowrap(options);
    const fetcher = new Fetcher(options);
    fetcher.fetch(wrapper);
}

main();