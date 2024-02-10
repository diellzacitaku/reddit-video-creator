import Snoowrap from "snoowrap";
import Fetcher from "./services/fetcher.js";
import ArgumentHandler from "./services/argument-handler.js";


function main() {
    const options = new ArgumentHandler().options;

    const wrapper = new Snoowrap({
        userAgent: "Reddit/1.0.0",
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        username: options.username,
        password: options.password,
    });

    const fetcher = new Fetcher(options);
    fetcher.fetch(wrapper).then((fetchedPosts) => {
        fetchedPosts.forEach((post) => {
            post.comments.forEach((comment) => {
                console.log(comment);
            })
        })
    });
}

main();