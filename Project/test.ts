const run = async () => {
  var lightPos = 0;
  var mirrorPos = 200_000;

  const time = Date.now();

  while (lightPos < mirrorPos) {
    lightPos += 1;
  }
  while (lightPos > 0) {
    lightPos -= 1;
  }

  const diff = Date.now() - time;
  console.log(diff);

  var carSpeed = 0.5;

  var time2 = Date.now();
  while (lightPos < mirrorPos) {
    lightPos += carSpeed + 1;
  }
  while (lightPos > 0) {
    lightPos += carSpeed - 1;
  }

  var diff2 = Date.now() - time2;
  console.log(diff2);
};

run();
