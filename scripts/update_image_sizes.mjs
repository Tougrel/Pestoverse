import yaml from "js-yaml";
import fs from "node:fs";
import path from "node:path";
import request from "sync-request";
import sizeOf from "buffer-image-size";

const galleryPath = path.join("content", "thank-you");
const files = fs.readdirSync(galleryPath);

let baseUrl = "https://cdn.pestoverse.world/thank-you";
if (process.argv.length > 2) {
    baseUrl = process.argv[2];
}

files.forEach((file) => {
    const filePath = path.join(galleryPath, file);
    const data = yaml.load(fs.readFileSync(filePath, "utf-8"));
    const images = data.images;
    let newImages = [];
    console.log("\nProcessing file", filePath);
    images.forEach((image) => {
        let imageFile;
        let imageData = {};
        if (typeof image === "string") {
            imageFile = image;
        } else if (typeof image === "object" && "url" in image) {
            imageFile = image.url;
            imageData = image;
        }

        const imageUrl = `${baseUrl}/full/${imageFile}`;

        const res = request("GET", imageUrl);
        const imageBuffer = Buffer.from(res.getBody(), "utf-8");
        const { height, width } = sizeOf(imageBuffer);

        console.log(imageFile, `width=${width}, height=${height}`);
        const newImageData = {
            ...imageData,
            url: imageFile,
            width,
            height
        }
        newImages.push(newImageData);
    });
    data.images = newImages;
    const outputYaml = yaml.dump(data, { lineWidth: -1 });
    fs.writeFileSync(filePath, outputYaml);
});

