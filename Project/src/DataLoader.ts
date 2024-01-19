import * as fs from "fs/promises";
import { Doodle } from "./types/Doodle";

export async function LoadDataset(name: string, size: number) {
  const data = await fs.readFile(
    `data/full_simplified_${name}.ndjson`,
    "utf-8"
  );

  console.log("Loading data from file, total: ", data.length, ", size: ", size);

  const parsed: Doodle[] = data
    .split("\n")
    .filter((i) => i !== "")
    .slice(0, size)
    .map((j) => JSON.parse(j));
  const recognized = parsed.filter((i) => i.recognized);
  console.log(
    `Dataset "${name}" loaded: Total: ${parsed.length}, recognized: ${
      recognized.length
    }, Percent: ${Math.round((recognized.length / parsed.length) * 100)}%`
  );
  return recognized;
}
