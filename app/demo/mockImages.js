import images from './images.json';

const mockImages = item => Object.assign(item, { source: item.source || images[item.id] });

module.exports = mockImages;
