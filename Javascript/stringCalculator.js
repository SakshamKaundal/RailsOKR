function add(numbers) {
  if (!numbers || numbers === "") return 0;

  let delimiter = ",";
  if (numbers.startsWith("//")) {
    const parts = numbers.split("\n");
    delimiter = parts[0].slice(2);
    numbers = parts[1];
  }

  const allDelimiters = [delimiter, "\n"];
  const nums = numbers.split(new RegExp(`[${allDelimiters.join("")}]`))
    .map(n => parseInt(n, 10))
    .filter(n => !isNaN(n));

  const negatives = nums.filter(n => n < 0);
  if (negatives.length > 0) {
    throw new Error(`Negatives not allowed: ${negatives.join(",")}`);
  }

  return nums.filter(n => n <= 1000).reduce((sum, n) => sum + n, 0);
}

module.exports = { add };
