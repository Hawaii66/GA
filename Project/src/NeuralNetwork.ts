import { Cost } from "./Cost";
import { Layer } from "./Layer";
import { NetworkVector, Vector } from "./types/Doodle";

export class NeuralNetwork {
  layers: Layer[];
  cost = new Cost();

  constructor(sizes: number[]) {
    const layers: Layer[] = [];
    sizes.forEach((size, idx) => {
      if (idx < sizes.length - 1) {
        layers[idx] = new Layer(size, sizes[idx + 1]);
      }
    });

    this.layers = layers;
  }

  CalculateOutputs(inputs: number[]) {
    var values = inputs;
    for (var i = 0; i < this.layers.length; i++) {
      values = this.layers[i].CalculateOutputs(values);
    }

    return values;
  }

  Classify(inputs: number[]): { output: number; activation: number[] } {
    const outputs = this.CalculateOutputs(inputs);
    return {
      output: IndexOfMaxValue(outputs),
      activation: outputs,
    };
  }

  Loss(vector: NetworkVector) {
    const outputs = this.CalculateOutputs(vector.vector);

    return this.cost.CostFunction(outputs, vector.expectedOutputs);
  }

  Cost(vectors: NetworkVector[]) {
    var totalCost = 0;
    for (var i = 0; i < vectors.length; i++) {
      totalCost += this.Loss(vectors[i]);
    }

    return totalCost / vectors.length;
  }

  Learn(trainingData: NetworkVector[], learnRate: number) {
    const learnData = Array.from({ length: trainingData.length }).map(() =>
      Array.from({ length: this.layers.length }).map(
        (_, idx) => new LayerLearnData(this.layers[idx])
      )
    );

    for (var i = 0; i < trainingData.length; i++) {
      this.UpdateAllGradients(trainingData[i], learnData[i]);
    }
    for (var i = 0; i < this.layers.length; i++) {
      this.layers[i].ApplyGradients(learnRate / trainingData.length);
      this.layers[i].ClearGradients();
    }
  }

  UpdateAllGradients(vector: NetworkVector, learnData: LayerLearnData[]) {
    var inputsToNextLayer = vector.vector;
    for (var i = 0; i < this.layers.length; i++) {
      inputsToNextLayer = this.layers[i].CalculateOutputsLearnData(
        inputsToNextLayer,
        learnData[i]
      );
    }
    //up works with image

    const outputLayerIndex = this.layers.length - 1;
    const outputLayer = this.layers[outputLayerIndex];
    const outputLearnData = learnData[outputLayerIndex];

    outputLayer.CalculateOutputLayerNodeValues(
      outputLearnData,
      vector.expectedOutputs
    );
    outputLayer.UpdateGradients(outputLearnData);

    for (var i = outputLayerIndex - 1; i >= 0; i -= 1) {
      const layerLearnData = learnData[i];
      const hiddenLayer = this.layers[i];

      hiddenLayer.CalculateHiddenLayerNodeValues(
        layerLearnData,
        this.layers[i + 1],
        learnData[i + 1].nodeValues
      );
      hiddenLayer.UpdateGradients(layerLearnData);
    }
  }
}

function IndexOfMaxValue(outputs: number[]) {
  var max = Number.NEGATIVE_INFINITY;
  var index = -1;
  for (var i = 0; i < outputs.length; i++) {
    if (outputs[i] > max) {
      max = outputs[i];
      index = i;
    }
  }

  return index;
}

export class LayerLearnData {
  inputs: number[] = [];
  weightedInputs: number[] = [];
  activations: number[] = [];
  nodeValues: number[] = [];

  constructor(layer: Layer) {
    this.weightedInputs = Array.from({ length: layer.numberOfNodesOut }).map(
      (_) => 0
    );
    this.activations = Array.from({ length: layer.numberOfNodesOut }).map(
      (_) => 0
    );
    this.nodeValues = Array.from({ length: layer.numberOfNodesOut }).map(
      (_) => 0
    );
  }
}
