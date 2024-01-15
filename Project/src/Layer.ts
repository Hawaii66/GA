import { Cost } from "./Cost";
import { LayerLearnData } from "./NeuralNetwork";

export class Layer {
  numberOfNodesIn: number;
  numberOfNodesOut: number;

  weights: number[][];
  biases: number[];

  costGradientW: number[][];
  costGradientB: number[];
  cost = new Cost();

  constructor(nodesIn: number, nodesOut: number) {
    this.numberOfNodesIn = nodesIn;
    this.numberOfNodesOut = nodesOut;

    this.weights = Generate2DArray(nodesIn, nodesOut);
    this.biases = Generate1DArray(nodesOut);

    this.costGradientW = Generate2DArray(nodesIn, nodesOut);
    this.costGradientB = Generate1DArray(nodesOut);

    this.InitRandom();
  }

  InitRandom() {
    for (var nodeIn = 0; nodeIn < this.numberOfNodesIn; nodeIn += 1) {
      for (var nodeOut = 0; nodeOut < this.numberOfNodesOut; nodeOut += 1) {
        const random = Math.random() * 2 - 1;
        this.weights[nodeIn][nodeOut] =
          random / Math.sqrt(this.numberOfNodesIn);
      }
    }
  }

  CalculateOutputs(inputs: number[]) {
    const weightedOutputs: number[] = Array.from({
      length: this.numberOfNodesOut,
    }).map(() => 0);

    for (var nodeOut = 0; nodeOut < this.numberOfNodesOut; nodeOut++) {
      var weightedOutput = this.biases[nodeOut];

      for (var nodeIn = 0; nodeIn < this.numberOfNodesIn; nodeIn++) {
        weightedOutput += inputs[nodeIn] * this.weights[nodeIn][nodeOut];
      }

      weightedOutputs[nodeOut] = ActivationFunction(weightedOutput);
    }

    return weightedOutputs;
  }

  CalculateOutputsLearnData(inputs: number[], learnData: LayerLearnData) {
    learnData.inputs = inputs;

    for (var nodeOut = 0; nodeOut < this.numberOfNodesOut; nodeOut += 1) {
      var weightedInput = this.biases[nodeOut];
      for (var nodeIn = 0; nodeIn < this.numberOfNodesIn; nodeIn += 1) {
        weightedInput += inputs[nodeIn] * this.weights[nodeIn][nodeOut];
      }
      learnData.weightedInputs[nodeOut] = weightedInput;
    }

    for (var i = 0; i < learnData.activations.length; i++) {
      learnData.activations[i] = ActivationFunction(
        learnData.weightedInputs[i]
      );
    }

    return learnData.activations;
  }

  ApplyGradients(learnRate: number) {
    for (var nodeOut = 0; nodeOut < this.numberOfNodesOut; nodeOut += 1) {
      this.biases[nodeOut] -= this.costGradientB[nodeOut] * learnRate;

      for (var nodeIn = 0; nodeIn < this.numberOfNodesIn; nodeIn += 1) {
        this.weights[nodeIn][nodeOut] -=
          this.costGradientW[nodeIn][nodeOut] * learnRate;
      }
    }
  }

  CalculateOutputLayerNodeValues(
    learnData: LayerLearnData,
    expectedOutputs: number[]
  ) {
    for (var i = 0; i < learnData.nodeValues.length; i++) {
      const costDerivative = this.cost.CostDerivative(
        learnData.activations[i],
        expectedOutputs[i]
      );
      const activationDerivative = ActivationDerivativeFunction(
        learnData.weightedInputs[i]
      );
      learnData.nodeValues[i] = costDerivative * activationDerivative;
    }
  }

  UpdateGradients(learnData: LayerLearnData) {
    for (var nodeOut = 0; nodeOut < this.numberOfNodesOut; nodeOut += 1) {
      const nodeValue = learnData.nodeValues[nodeOut];
      for (var nodeIn = 0; nodeIn < this.numberOfNodesIn; nodeIn += 1) {
        const derivativeCostWrtWeight = learnData.inputs[nodeIn] * nodeValue;
        this.costGradientW[nodeIn][nodeOut] += derivativeCostWrtWeight;
      }

      const derivativeCostWrtBias = learnData.nodeValues[nodeOut];
      //must be zero, pga error
      this.costGradientB[nodeOut] += derivativeCostWrtBias;
    }
  }

  ClearGradients() {
    this.costGradientW = Generate2DArray(
      this.numberOfNodesIn,
      this.numberOfNodesOut
    );
    this.costGradientB = Generate1DArray(this.numberOfNodesOut);
  }

  CalculateHiddenLayerNodeValues(
    learnData: LayerLearnData,
    oldLayer: Layer,
    oldNodeValues: number[]
  ) {
    for (
      var newNodeIndex = 0;
      newNodeIndex < this.numberOfNodesOut;
      newNodeIndex += 1
    ) {
      var newNodeValue = 0;
      for (
        var oldNodeIndex = 0;
        oldNodeIndex < oldNodeValues.length;
        oldNodeIndex += 1
      ) {
        const weightedInputDerivative =
          oldLayer.weights[newNodeIndex][oldNodeIndex];
        //zero on top
        newNodeValue += weightedInputDerivative * oldNodeValues[oldNodeIndex];
      }

      newNodeValue *= ActivationDerivativeFunction(
        learnData.weightedInputs[newNodeIndex]
      );
      //zero
      learnData.nodeValues[newNodeIndex] = newNodeValue;
    }
  }
}

function ActivationFunction(number: number) {
  return 1 / (1 + Math.exp(-number));
}

function ActivationDerivativeFunction(number: number) {
  const a = ActivationFunction(number);
  return a * (1 - a);
}

const Generate2DArray = (x: number, y: number) =>
  new Array(x).fill(0).map(() => new Array(y).fill(0));
const Generate1DArray = (x: number) => new Array(x).fill(0);
