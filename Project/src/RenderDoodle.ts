import { createCanvas } from "canvas";
import { Doodle, Vector } from "./types/Doodle";
import fs = require("fs");

import canvas = require("canvas");
global.ImageData = canvas.ImageData as any;
//import ImageData = require("@canvas/image-data");
const doodleSize = 256;
const size = 24;

export function CanvasDoodle(doodle: Doodle) {
  const scale = size / doodleSize;

  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  ctx.strokeStyle = "rgba(0,0,0,0.5)";
  ctx.lineWidth = 1;
  ctx.beginPath();

  doodle.drawing.forEach((line) => {
    const xCoords = line[0];
    const yCoords = line[1];
    for (var i = 0; i < xCoords.length; i++) {
      ctx.lineTo(xCoords[i] * scale, yCoords[i] * scale);
    }
  });

  ctx.stroke();
  return canvas;
}

export function CanvasVector(vector: Vector) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  const data = new ImageData(
    new Uint8ClampedArray(vector.vector.map((i) => [0, 0, 0, i]).flat()),
    size,
    size
  );
  ctx.putImageData(data, 0, 0);

  return canvas;
}

export function RenderVector(vector: Vector): Promise<void> {
  return new Promise((res) => {
    const canvas = CanvasVector(vector);
    const dir = __dirname + `/generated/render/${vector.word}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const out = fs.createWriteStream(`${dir}/${vector.key_id}.png`);
    const stream = canvas.createPNGStream();

    stream.pipe(out);
    out.on("finish", res);
  });
}

export function RenderDoodle(doodle: Doodle): Promise<void> {
  return new Promise((res) => {
    const canvas = CanvasDoodle(doodle);
    const dir = __dirname + `/generated/images/${doodle.word}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const out = fs.createWriteStream(`${dir}/${doodle.key_id}.png`);
    const stream = canvas.createPNGStream({});

    stream.pipe(out);
    out.on("finish", res);
  });
}

export async function RenderMultipleImages(doodles: Doodle[]) {
  const promises: Promise<void>[] = [];
  doodles.forEach((d) => {
    promises.push(RenderDoodle(d));
  });

  await Promise.all(promises);
  console.log(
    `Rendered images: ${doodles.length} count, theme: "${doodles[0].word}"`
  );
}

export async function RenderMultipleVectors(vector: Vector[]) {
  const promises: Promise<void>[] = [];
  vector.forEach((v) => {
    promises.push(RenderVector(v));
  });

  await Promise.all(promises);
  console.log(
    `Rendered images: ${vector.length} count, theme: "${vector[0].word}"`
  );
}
