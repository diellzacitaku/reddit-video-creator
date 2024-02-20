import { fabric } from "fabric";
import ImageDataURI from "image-data-uri";

export default class ImageGenerator {
    constructor(path, ttsAudioGenerator) {
        this.path = path;
        this.ttsAudioGenerator = ttsAudioGenerator;

        fabric.nodeCanvas.registerFont("./assets/fonts/OpenSans-Regular.ttf", properties.font);
    }

    generateComment(folderName, content, username, postTime, upvotes, profilePicture) {
        const canvas = new fabric.StaticCanvas("canvas", properties.canvas);

        // Content
        let txtContent = new fabric.Textbox(content, {
            ...properties.txtContent,
            width: canvas.width - 80,
            top: canvas.height * 0.5,
        });

        let crcAvatarBackground = new fabric.Circle({
            ...properties.crcAvatarBackground,
            left: txtContent.left - 10,
            top: txtContent.top - txtContent.height / 2 - 75,
        });

        // Username
        let txtUsername = new fabric.Textbox(username, {
            ...properties.txtUsername,
            top: crcAvatarBackground.top,
            left: crcAvatarBackground.left + crcAvatarBackground.width + 25,
        });

        let crcDevider = new fabric.Circle({
            ...properties.crcDivider,
            left: txtUsername.left + txtUsername.width + 20,
            top: txtUsername.top,
        });

        // Post time
        let txtPostTime = new fabric.Textbox(postTime, {
            ...properties.txtPostTime,
            left: crcDevider.left + crcDevider.width + 15,
            width: canvas.width - 60,
            top: crcDevider.top,
        });

        // Upvotes
        let txtUpvotes = new fabric.Textbox(upvotes, {
            ...properties.txtUpVotes,
            top: txtContent.top + txtContent.height / 2 + 50,
            left: txtContent.width - 120,
        });

        // Profile picture
        fabric.Image.fromURL(profilePicture, (img) => {
            img.set({
                originY: "bottom",
                originX: "center",
                top: crcAvatarBackground.top - 2 + crcAvatarBackground.height / 2,
                left: crcAvatarBackground.left + crcAvatarBackground.width / 2,
            });
            img.scaleToHeight(crcAvatarBackground.radius * 2.25);
            img.scaleToWidth(crcAvatarBackground.radius * 2.25);
            canvas.add(img);
        });

        let polDownArrow = new fabric.Polygon(properties.polArrowCoords, {
            ...properties.polArrow,
            scaleY: 1.25,
            top: txtUpvotes.top,
            left: txtUpvotes.left + txtUpvotes.width,
        });

        let polUpArrow = new fabric.Polygon(properties.polArrowCoords, {
            ...properties.polArrow,
            originX: "right",
            scaleY: -1.25,
            top: txtUpvotes.top,
            left: txtUpvotes.left - txtUpvotes.width,
        });

        txtContent.set({ originY: "top", top: canvas.height * 0.5 - txtContent.height * 0.5 });

        canvas.add(
            txtContent,
            txtUsername,
            txtPostTime,
            crcDevider,
            polDownArrow,
            polUpArrow,
            txtUpvotes,
            crcAvatarBackground
        );

        content.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g).reduce((acc, element, index) => {
            const newAcc = acc + element;

            const imageName = `image_${index}`;
            const soundName = `sound_${index}`;
            const exportPath = `${this.path}/${folderName}/`;

            txtContent.set("text", newAcc);
            DataURLtoPNG(canvas, exportPath.concat(imageName));

            // generate sound only for the part after dot (.)
            this.ttsAudioGenerator.generate(exportPath.concat(soundName), element);

            return newAcc;
        }, "");
    }

    generateTitle(content, subreddit, username, postTime, upvotes, comments) {
        // Create canvas
        const canvas = new fabric.StaticCanvas("canvas", properties.canvas);

        let txtContent = new fabric.Textbox(content, {
            ...properties.txtContent,
            originY: "center",
            width: canvas.width - 200,
            left: 175,
            top: canvas.height * 0.5,
            fontSize: 50,
        });

        let crcAvatarBackground = new fabric.Circle({
            ...properties.crcAvatarBackground,
            radius: 30,
            left: txtContent.left - 5,
            top: txtContent.top - txtContent.height / 2 - 75,
        });

        // SubReddit
        let txtSub = new fabric.Textbox(subreddit, {
            ...properties.txtUsername,
            fill: "white",
            top: crcAvatarBackground.top - 5 + crcAvatarBackground.radius * 0.5,
            left: crcAvatarBackground.left + crcAvatarBackground.width + 25,
        });

        let crcDeviderSU = new fabric.Circle({
            ...properties.crcDivider,
            left: txtSub.left + txtSub.width + 20,
            top: txtSub.top,
        });

        // Username
        let txtUsername = new fabric.Textbox(username, {
            ...properties.txtUsername,
            top: crcDeviderSU.top,
            left: crcDeviderSU.left + crcDeviderSU.width + 25,
        });

        let crcDeviderUT = new fabric.Circle({
            ...properties.crcDivider,
            left: txtUsername.left + txtUsername.width + 20,
            top: txtUsername.top,
        });

        // Post time
        let txtPostTime = new fabric.Textbox(postTime, {
            ...properties.txtPostTime,
            left: crcDeviderUT.left + crcDeviderUT.width + 15,
            width: canvas.width - 60,
            top: crcDeviderUT.top,
        });

        // Upvotes
        let txtUpvotes = new fabric.Textbox(upvotes, {
            ...properties.txtUpVotes,
            top: txtContent.top - 65,
            originY: "center",
            fill: "white",
            left: 90,
            fontSize: 35,
        });


        let polUpArrow = new fabric.Polygon(properties.polArrowCoords, {
            ...properties.polArrow,
            originX: "center",
            originY: "center",
            stroke: "#de5827",
            fill: "#de5827",
            scaleY: -1.5,
            scaleX: 1.5,
            top: txtUpvotes.top - 60,
            left: txtUpvotes.left,
        });

        let polDownArrow = new fabric.Polygon(properties.polArrowCoords, {
            ...properties.polArrow,
            scaleY: 1.50,
            scaleX: 1.5,
            top: txtUpvotes.top + 60,
            originX: "center",
            originY: "center",
            left: txtUpvotes.left,
        });


        // Upvotes
        let rectCommentIconBody = new fabric.Rect({
            fill: "#8e8e8e",
            strokeLineJoin: "round",
            strokeWidth: 2,
            stroke: "#8e8e8e",
            width: 35,
            height: 25,
            originY: "center",
            top: txtContent.top + txtContent.height,
            left: txtContent.left,
        });
        let rectCommentIconTail = new fabric.Rect({
            fill: "#8e8e8e",
            strokeLineJoin: "round",
            strokeWidth: 2,
            stroke: "#8e8e8e",
            angle: 45,
            width: 10,
            height: 10,
            originY: "center",
            originX: "center",
            top: rectCommentIconBody.top + rectCommentIconBody.height * 0.5,
            left: rectCommentIconBody.left + rectCommentIconBody.width * 0.5,
        });

        canvas.add(rectCommentIconBody, rectCommentIconTail);
        // Upvotes
        let txtComments = new fabric.Textbox(comments + " Comments", {
            ...properties.txtUpVotes,
            top: rectCommentIconBody.top,
            width: 400,
            originY: "center",
            originX: "left",
            left: rectCommentIconBody.left + rectCommentIconBody.width + 15,
            fontSize: 30,
        });

        canvas.add(txtContent, crcAvatarBackground, txtUsername, txtSub, crcDeviderUT, crcDeviderSU, txtPostTime, txtUpvotes, polUpArrow, polDownArrow, txtComments);
        DataURLtoPNG(canvas, "title");
    }
}

async function DataURLtoPNG(canvas, name) {
    // Return DataURL from canvas
    const dataURL = canvas.toDataURL({
        ...properties.dataURL,
        width: canvas.width,
        height: canvas.height,
    });

    // Output
    ImageDataURI.outputFile(dataURL, name + ".png");
}

const properties = {
    canvas: {
      height: 1920,
      width: 1080,
      backgroundColor: "#141414",
    },
    font: {
      family: "OpenSans",
    },
    txtContent: {
      fill: "white",
      originY: "top",
      left: 35,
      fontSize: 38,
      lineHeight: 1.1,
      fontFamily: "OpenSans",
    },
    txtUsername: {
      fill: "#8e8e8e",
      originY: "center",
      fontSize: 34,
      fontFamily: "Arial",
      fontWeight: 600,
    },
    crcAvatarBackground: {
      fill: "#232323",
      radius: 44,
      originY: "center",
    },
    crcDivider: {
      fill: "#8e8e8e",
      radius: 4,
      originY: "center",
    },
    txtPostTime: {
      fill: "#8e8e8e",
      originY: "center",
      fontSize: 32,
      fontFamily: "Arial",
    },
    txtUpVotes: {
      fill: "#8e8e8e",
      originX: "center",
      fontSize: 32,
      fontFamily: "Arial",
      fontWeight: 600,
    },
    polArrowCoords: [
      { x: 8, y: 0 },
      { x: 8, y: 14 },
      { x: 0, y: 14 },
      { x: 14, y: 30 },
      { x: 28, y: 14 },
      { x: 20, y: 14 },
      { x: 20, y: 0 },
    ],
    polArrow: {
      strokeWidth: 2.5,
      stroke: "#8e8e8e",
      fill: "transparent",
      strokeLineJoin: "round",
      scaleX: 1.25,
    },
    // Comment Segment part
    segment: {
      txtContent: {
        fill: "white",
        originY: "top",
        left: 35,
        fontSize: 38,
        lineHeight: 1.1,
        fontFamily: "OpenSans",
      },
    },
    // Data URL part
    dataURL: {
      left: 0,
      top: 0,
      format: "png",
    },
  };
  
  export { properties };