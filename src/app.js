import Snoowrap from "snoowrap";
import Fetcher from "./services/fetcher.js";
import ArgumentHandler from "./services/argument-handler.js";
import TTSAudioGenerator from "./services/audio/text-to-speech.js"
import ImageGenerator from "./services/image/image-generator.js";

function main() {
    const defaultProfilePicture = "https://styles.redditmedia.com/t5_50qpes/styles/profileIcon_snoo78944d19-7998-4dd1-8b34-df9a8b6ba99c-headshot.png";
    const options = new ArgumentHandler().options;

    const wrapper = new Snoowrap({
        userAgent: "Reddit/1.0.0",
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        username: options.username,
        password: options.password,
    });

    const ttsAudioGenerator = new TTSAudioGenerator();
    const imageGenerator = new ImageGenerator("data/", ttsAudioGenerator); // TODO: change the name because this is generating audio and images

    const fetcher = new Fetcher(options);
    fetcher.fetch(wrapper).then((fetchedPosts) => {
        fetchedPosts.forEach((post) => {
            post.comments.forEach((comment) => {
                const folderName = comment.text
                    .substr(0, 20)
                    .toLowerCase()
                    .trim()
                    .replace(/[\W_]+/g, "_");

                imageGenerator.generateComment(
                    folderName,
                    comment.text,
                    comment.author,
                    "15m",
                    comment.ups.toString(),
                    defaultProfilePicture
                );
            })
        })
    });
    

    // TODO: implement video generator here
}

main();