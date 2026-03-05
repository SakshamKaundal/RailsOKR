const { add } = require("./stringCalculator");

function assertEqual(actual, expected, testName) {
  if (actual === expected) {
    console.log(`✓ ${testName}`);
  } else {
    console.log(`✗ ${testName} - Expected: ${expected}, Got: ${actual}`);
    process.exit(1);
  }
}

function assertThrows(fn, testName) {
  try {
    fn();
    console.log(`✗ ${testName} - Expected to throw but didn't`);
    process.exit(1);
  } catch (e) {
    console.log(`✓ ${testName}`);
  }
}

console.log("Running String Calculator Kata Tests\n");

assertEqual(add(""), 0, "Empty string returns 0");
assertEqual(add("1"), 1, "Single number returns value");
assertEqual(add("1,2"), 3, "Two numbers returns sum");
assertEqual(add("1,2,3"), 6, "Multiple numbers returns sum");
assertEqual(add("1\n2,3"), 6, "Newlines between numbers work");
assertEqual(add("//;\n1;2"), 3, "Custom delimiter works");
assertEqual(add("1001,2"), 2, "Numbers > 1000 ignored");
assertThrows(() => add("1,-2,-3"), "Negative numbers throw exception");

console.log("\nAll tests passed!");
