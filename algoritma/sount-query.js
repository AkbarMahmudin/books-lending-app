const countOccuranceQuery = (input, query) => {
  const counts = {};

  for (const word of input) {
    counts[word] = (counts[word] || 0) + 1;
  }

  const result = [];

  for (const word of query) {
    result.push(counts[word] || 0);
  }

  return result;
};

const input = ['xc', 'dz', 'bbb', 'dz'];
const query = ['bbb', 'ac', 'dz'];
const output = countOccuranceQuery(input, query);
console.log(output);
