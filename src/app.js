import Snoowrap from "snoowrap";
import Fetcher from "./services/fetcher.js";
import ArgumentHandler from "./services/argument-handler.js";
import TTSAudioGenerator from "./services/audio/text-to-speech.js"
import ImageGenerator from "./services/image/image-generator.js";

function main() {
    const options = new ArgumentHandler().options;

    const wrapper = new Snoowrap({
        userAgent: "Reddit/1.0.0",
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        username: options.username,
        password: options.password,
    });

    const ttsAudioGenerator = new TTSAudioGenerator();
    const imageGenerator = new ImageGenerator("data/", ttsAudioGenerator);

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