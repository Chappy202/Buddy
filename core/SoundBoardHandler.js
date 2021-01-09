const sounds = require('../assets/soundboard/sounds.json');

module.exports = {
    getFile: () => {
        console.log(sounds);
    },
    getNSFW: () => {
        let output = [];
        for (let i = 0; i < sounds.length; i++){
            if (sounds[i].nsfw) {
                output.push(sounds[i]);
            }
        }
        return output;
    },
    getVolumeWarning: () => {
        let output = [];
        for (let i = 0; i < sounds.length; i++){
            if (sounds[i].volumeWarning) {
                output.push(sounds[i]);
            }
        }
        return output;
    },
    getNormal: () => {
        let output = [];
        for (let i = 0; i < sounds.length; i++){
            if (!sounds[i].volumeWarning && !sounds[i].nsfw) {
                output.push(sounds[i]);
            }
        }
        return output;
    },
    getSFW: () => {
        let output = [];
        for (let i = 0; i < sounds.length; i++){
            if (!sounds[i].nsfw) {
                output.push(sounds[i]);
            }
        }
        return output;
    },
    getSFWVolumeWarning: () => {
        let input = this.getSFW();
        let output = [];
        for (let i = 0; i < sounds.length; i++){
            if (sounds[i].volumeWarning && !sounds[i].nsfw) {
                output.push(sounds[i]);
            }
        }
        return output;
    },
    getAll: () => {
        let output = [];
        for (let i = 0; i < sounds.length; i++){
            output.push(sounds[i]);
        }
        return output;
    }
}