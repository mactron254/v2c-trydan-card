export const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

export function pngDimensions(buffer) {
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error("Invalid PNG file");
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];

export function findContentBottom(rgb, width, height, options = {}) {
  if (rgb.length !== width * height * 3) throw new Error("Unexpected RGB buffer length");
  const threshold = options.threshold ?? 12;
  const minimumPixels = options.minimumPixels ?? Math.max(8, Math.floor(width * 0.02));
  const sample = (x, y, channel) => rgb[((y * width + x) * 3) + channel];

  for (let y = height - 1; y >= 0; y -= 1) {
    const edgeSamples = [0, Math.min(1, width - 1), Math.max(0, width - 2), width - 1];
    const background = [0, 1, 2].map((channel) => median(edgeSamples.map((x) => sample(x, y, channel))));
    let active = 0;
    for (let x = 0; x < width; x += 1) {
      const offset = ((y * width + x) * 3);
      if (Math.max(
        Math.abs(rgb[offset] - background[0]),
        Math.abs(rgb[offset + 1] - background[1]),
        Math.abs(rgb[offset + 2] - background[2]),
      ) > threshold && ++active >= minimumPixels) return y;
    }
  }
  return 0;
}

export function trimHeight(contentBottom, height, paddingBottom = 16) {
  return Math.min(height, contentBottom + 1 + paddingBottom);
}