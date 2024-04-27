const str = 'NEGIE1';

const reverseAlphabet = (str) => {
  const [letters, numbers = ''] = str.split(/(\d+)/).filter(Boolean);

  const reversedLetters = letters.split('').reverse().join('');

  return reversedLetters + numbers;
};

console.log(reverseAlphabet(str));
