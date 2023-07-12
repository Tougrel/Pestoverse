import { MarkerProps } from "../../types/marker";

export default defineEventHandler(() => {
    return [
        {
            name: 'test',
            coords: [48.0367592, 7.576856],
            images: ['https://placekitten.com/g/450/300', 'https://placekitten.com/g/450/400', 'https://placekitten.com/g/450/250', 'https://placekitten.com/g/450/375']
        },
        {
            name: 'test2',
            coords: [28.883744, -28.621836],
            images: ['https://placekitten.com/g/450/300']
        }
    ] as MarkerProps[]
});
