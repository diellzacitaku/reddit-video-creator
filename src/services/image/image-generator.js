export default class ImageGenerator {
    constructor(path, ttsAudioGenerator) {
        this.path = path;
        this.ttsAudioGenerator = ttsAudioGenerator;
    
        fabric.nodeCanvas.registerFont("./assets/fonts/OpenSans-Regular.ttf", properties.font);
      }

}