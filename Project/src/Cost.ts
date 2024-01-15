export class Cost {
  NodeCost(output: number, expected: number) {
    const error = output - expected;
    return error * error;
  }

  CostFunction(predicted: number[], expected: number[]) {
    var cost = 0;
    for (var nodeOut = 0; nodeOut < predicted.length; nodeOut++) {
      cost += this.NodeCost(predicted[nodeOut], expected[nodeOut]);
    }
    return cost;
  }

  CostDerivative(predicted: number, expected: number) {
    return predicted - expected;
  }
}
