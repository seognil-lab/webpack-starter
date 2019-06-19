const sp = [1, 2, 3];
console.log('##', 'ES6', 'separator', '...[1, 2, 3]', ...sp);

let prom = new Promise(r => r());
console.log('##', 'ES6', 'promise', prom);

class CC {
  log(...args) {
    console.log('##', 'ES6', 'new class().log', ...args);
  }
}
new CC().log('param1', 'param1');

let arrInc = [1, 2, 3, 4].includes(1);
console.log('##', 'ES6', '[1, 2, 3, 4].includes(1)', arrInc);

let arrFrom = Array.from({ length: 9 }, (e, i) => i);
console.log('##', 'ES6', 'Array.from({ length: 9 }, (e, i) => i)', ...arrFrom);
