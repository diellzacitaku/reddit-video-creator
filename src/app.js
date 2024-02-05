import Snoowrap from "snoowrap";
import Fetcher from "./services/fetcher.js";

function main() {
    const options = {
        userAgent: "Reddit/1.0.0",
        clientId: "client-id",
        clientSecret: "client-secret",
        username: "username",
        password: "password",
    };

    const wrapper = new Snoowrap(options);
    const fetcher = new Fetcher(options);
    fetcher.fetch(wrapper);
}

main();