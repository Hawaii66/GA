import { RenderMultipleVectors, RenderVector } from "./src/RenderDoodle";
import { LoadDataset } from "./src/DataLoader";
import { DoodleVectors } from "./src/DoodleVector";

const run = async () => {
  const processSize = 200;

  const doodles = await LoadDataset("bed", processSize);

  console.log("Doodles generated and scaled");
  const vectors = await DoodleVectors(doodles, true);
  console.log("Vectors loaded");

  //await RenderMultipleVectors(vectors);
};

run();
