import { RenderMultipleVectors, RenderVector } from "./src/RenderDoodle";
import { LoadDataset } from "./src/DataLoader";
import { DoodleVectors } from "./src/DoodleVector";

const run = async () => {
  const args = process.argv.slice(2);
  const datasetname = args[0];
  const processSize = parseInt(args[1]);
  const renderSize = parseInt(args[2]);

  console.log("- - - Load start - - -");
  console.log("Dataset name: ", datasetname);
  console.log("Process size: ", processSize);
  console.log("Render size: ", renderSize);
  console.log("- - - Loading starting - - -");

  const doodles = await LoadDataset(datasetname, processSize);

  console.log("Doodles generated and scaled");
  const vectors = await DoodleVectors(doodles, true);
  console.log("Vectors loaded");

  await RenderMultipleVectors(vectors.slice(0, renderSize));
};

run();
