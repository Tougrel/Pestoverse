import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';
import request from 'sync-request';
import sizeOf from 'buffer-image-size';

const galleryPath = path.join('content', 'gallery')
const files = fs.readdirSync(galleryPath);

files.forEach(file => {
    const filePath = path.join(galleryPath, file);
    const data = yaml.load(fs.readFileSync(filePath, 'utf-8'));
    const images = data.images;
    let newImages = [];
    console.log("\nProcessing file", filePath);
    images.forEach((image) => {
        let imageUrl
        if (typeof image === 'string') {
            imageUrl = image;
        } else if (typeof image === 'object' && 'url' in image) {
            imageUrl = image.url;
        }
        const res = request('GET', imageUrl);
        const imageBuffer = Buffer.from(res.getBody(), 'utf-8');
        const { height, width } = sizeOf(imageBuffer);

        console.log(imageUrl, `width=${width}, height=${height}`);
        newImages.push({
            url: imageUrl,
            width,
            height
        });
    });
    data.images = newImages;
    const outputYaml = yaml.dump(data, { lineWidth: -1 });
    fs.writeFileSync(filePath, outputYaml);
});