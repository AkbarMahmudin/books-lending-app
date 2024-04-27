const calculateDifference = (matrix) => {
  const n = matrix.length;
  let sumPrimaryDiagonal = 0;
  let sumSecondaryDiagonal = 0;

  for (let i = 0; i < n; i++) {
    sumPrimaryDiagonal += matrix[i][i];
    sumSecondaryDiagonal += matrix[n - i - 1][i];
  }

  return Math.abs(sumPrimaryDiagonal - sumSecondaryDiagonal);
};

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

const difference = calculateDifference(matrix);
console.log(difference);
