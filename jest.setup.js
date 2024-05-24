// jest.setup.js
HTMLCanvasElement.prototype.getContext = jest.fn(() => {
  return {
    // Add methods used by your tests or the libraries
    fillRect: jest.fn(),
    clearRect: jest.fn(),
    getImageData: jest.fn(() => ({ data: [] })),
    putImageData: jest.fn(),
    createImageData: jest.fn(),
    setTransform: jest.fn(),
    drawImage: jest.fn(),
    save: jest.fn(),
    fillText: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    stroke: jest.fn(),
    strokeRect: jest.fn(),
    measureText: jest.fn(() => ({ width: 0 })),
    transform: jest.fn(),
    rotate: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    arc: jest.fn(),
    arcTo: jest.fn(),
    fill: jest.fn(),
    rect: jest.fn(),
    clip: jest.fn(),
  };
});
