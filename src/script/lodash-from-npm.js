import { chunk } from 'lodash';

const result = chunk(['a', 'b', 'c', 'd'], 2);
console.log('##', `lodash.chunk(['a', 'b', 'c', 'd'], 2) => `, result);
