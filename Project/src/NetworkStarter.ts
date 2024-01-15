import { NeuralNetwork } from "./NeuralNetwork";
import { NetworkVector, Vector } from "./types/Doodle";

export function NetworkRunner(pizzas: Vector[], beds: Vector[]) {
  const pizzaNetwork: NetworkVector[] = pizzas.map((i) => {
    return {
      expectedOutputs: [0, 1],
      label: 1,
      vector: i.vector,
    };
  });

  const bedNetwork: NetworkVector[] = beds.map((i) => {
    return {
      expectedOutputs: [1, 0],
      label: 0,
      vector: i.vector,
    };
  });

  const network = new NeuralNetwork([24 * 24, 20, 10, 2]);

  while (true) {
    network.Learn(
      [...pizzaNetwork.slice(0, 150), ...bedNetwork.slice(0, 150)],
      0.2
    );

    const pizzaResult = network.Classify(pizzaNetwork[50].vector);
    const bedResult = network.Classify(bedNetwork[50].vector);
    console.log(
      pizzaResult,
      pizzaNetwork[50].expectedOutputs[pizzaNetwork[50].label]
    );
    console.log(
      bedResult,
      bedNetwork[50].expectedOutputs[bedNetwork[50].label]
    );
    console.log("--");
  }
}
