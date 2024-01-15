import * as fs from "fs/promises";
import { Vector } from "./src/types/Doodle";
import { NetworkRunner } from "./src/NetworkStarter";

const run = async () => {
  const bedFile = await fs.readFile(
    `src/generated/vectors/bed/0.json`,
    "utf-8"
  );
  const bedInfo: Vector[] = JSON.parse(bedFile);
  const pizzaFile = await fs.readFile(
    `src/generated/vectors/pizza/0.json`,
    "utf-8"
  );
  const pizzaInfo: Vector[] = JSON.parse(pizzaFile);

  console.log("Loaded info");
  console.log(pizzaInfo.length, bedInfo.length);
  NetworkRunner(pizzaInfo, bedInfo);
  console.log("Network learn run done");
};

run();
