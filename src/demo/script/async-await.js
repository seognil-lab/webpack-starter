(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const result = await fetch(url).then(res => res.json());
  console.log('##', 'ASYNC fetch todo', result);
})();

// * ----------------

async function* genAnswers() {
  const stream = [Promise.resolve(4), Promise.resolve(9), Promise.resolve(12)];
  let total = 0;
  for await (const val of stream) {
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

let output = 0;
forEach(genAnswers(), function(val) {
  output += val.value;
}).then(function() {
  console.log('##', 'ASYNC Generator', output);
});
