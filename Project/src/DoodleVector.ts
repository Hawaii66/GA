import { CanvasDoodle } from "./RenderDoodle";
import { Doodle, Vector } from "./types/Doodle";
import * as fsPromise from "fs/promises";
import * as fs from "fs";

export function DoodleVector(doodle: Doodle): Vector {
  const canvas = CanvasDoodle(doodle);
  const allColors = Array.from(
    canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data
  );
  const alpha = allColors.filter((_, idx) => idx % 4 === 3);

  return {
    key_id: doodle.key_id,
    vector: alpha,
    word: doodle.word,
  };
}

export async function DoodleVectors(
  doodles: Doodle[],
  save: boolean
): Promise<Vector[]> {
  const vectors: Vector[] = [];
  for (var i = 0; i < doodles.length; i++) {
    vectors[i] = DoodleVector(doodles[i]);
    if (i % 50 === 0) {
      console.log(
        `${doodles.length}, ${i}, ${Math.round((i / doodles.length) * 100)}%`
      );
    }
  }

  if (save) {
    console.log("Saving vectors");
    SaveVectors(vectors, doodles[0].word);
    console.log("Saving vectors done");
  }

  return vectors;
}

async function SaveVectors(vectors: Vector[], name: string) {
  const promises: Promise<void>[] = [];
  const chunkSize = 1000;
  const dir = `src/generated/vectors/${name}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  } else {
    fs.rmSync(dir, {
      recursive: true,
      force: true,
    });
    fs.mkdirSync(dir, { recursive: true });
  }

  for (let i = 0; i < vectors.length; i += chunkSize) {
    const chunk = vectors.slice(i, i + chunkSize);
    promises.push(
      fsPromise.writeFile(`${dir}/${i}.json`, JSON.stringify(chunk))
    );
  }

  await Promise.all(promises);
}
