// TODO write some example // seognil LC 2019/06/17

// async function* agf() {
//     await 1;
//     yield 2;
// }

// async function f() {
//     for await (let x of y) {
//         g(x);
//     }
// }

async function* genAnswers() {
  var stream = [Promise.resolve(4), Promise.resolve(9), Promise.resolve(12)];
  var total = 0;
  for await (let val of stream) {
    total += await val;
    yield total;
  }
}

function forEach(ai, fn) {
  return ai.next().then(function(r) {
    if (!r.done) {
      fn(r);
      return forEach(ai, fn);
    }
  });
}

var output = 0;
forEach(genAnswers(), function(val) {
  output += val.value;
}).then(function() {
  console.log('##', 'ASYNC', output);
});
