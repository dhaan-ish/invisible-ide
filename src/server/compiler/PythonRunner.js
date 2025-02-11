const { spawn } = require('child_process');
const Runner = require('./Runner');

// The JSON data
const jsonData = {
  "1": [
      "AZ",
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "M ",
      "NNNNN",
      "PQRST",
      "ZZZZ",
      "AA",
      "A",
      "TALOS",
      "CITCHENNAI",
      "CODING",
      "INVISIBLE",
      "IDE",
      "TATAKAE",
      "AI"
  ],
  "2": [
      "110",
      "2",
      "3",
      "5",
      "1100",
      "15",
      "20",
      "25",
      "30",
      "50",
      "100",
      "200",
      "500",
      "1000",
      "10000"
  ],
  "3": [
      "1 10",
      "2 10",
      "5 15",
      "11 19",
      "5 20",
      "5 6",
      "17 60",
      "400 420",
      "50 80",
      "90 100",
      "110 115",
      "2 2",
      "1000 1001",
      "8 9",
      "14 15"
  ],
  "4": [
      "education",
      "hola",
      "app",
      "universe",
      "programming",
      "example",
      "testcase",
      "computer",
      "algorithm",
      "science",
      "data",
      "input",
      "output",
      "string",
      "python"
  ],
  "5": [
      "talos",
      "applepie",
      "hahaha",
      "aabbcc",
      "abc",
      "abracadabra",
      "hello",
      "zzzzzzzzzz",
      "xyyx",
      "abababab",
      "cccccccc",
      "qwertyuiopasdfghjklzxcvbnm",
      "aaabbbccc",
      "tttttttt",
      "zazazaza"
  ],
  "6": [
      "aabbcddeffg",
      "aabbcc",
      "xxyyz",
      "a",
      "aaaaa",
      "abc",
      "abacabad",
      "zzyyxxwwvvuu",
      "abcdefghijklmnopqrstuvwxyza",
      "ababababababac",
      "eeffgghhiijjkkllm",
      "azbycxdwevfugthsirjqlkmnop",
      "aaaaaabbbbbcccccdddddde",
      "aabbccddeeffgghhiijjkl",
      "mmmmnnnnopopqqqqrsttuu"
  ],
  "7": [
      "4",
      "23",
      "57",
      "82",
      "345",
      "6789",
      "13579",
      "10234",
      "999999999",
      "9081726354",
      "76543216",
      "8473629154",
      "9876543211",
      "250817364",
      "1357924687"
  ],
  "8": [
      "3",
      "1 2 3",
      "4",
      "3 4 -1 1",
      "5",
      "1 2 0 -3 5  ",
      "3",
      "7 8 9",
      "6",
      "1 2 3 4 5 6 ",
      "5",
      "-1 -2 -3 -4 1 ",
      "7",
      "10 9 8 7 6 5 4",
      "5",
      "1 3 4 6 8",
      "8",
      "4 3 2 7 8 2 3 1",
      "10",
      "1 2 3 4 5 6 7 8 9 10 ",
      "10",
      "-10 -20 -30 100 200 1 3 2 4 6 ",
      "6",
      "3 4 -1 1 -2 6 ",
      "7",
      "1000 2000 3000 4000 5000 6000 7000",
      "10",
      "-5 -1 -3 7 6 5 4 3 2 1  ",
      "15",
      "10 9 8 7 6 5 4 3 2 1 11 13 12 14 15"
  ],
  "9": [
      "aabbbccddddd",
      "abcde",
      "aaaaa",
      "aabbccddeeffgg",
      "abbcccddddeeeee",
      "b",
      "bbbbbbb",
      "abababababab",
      "aabbaaabbbaaa",
      "cccccccccabc",
      "xyyyxxxyxxxx",
      "xyzxyzxyzxyz",
      "pppppqppppp",
      "lllllllllllllllm",
      "aaaaabbbbccccdddddeee"
  ],
  "10": [
      "ab ",
      "ba ",
      "abc ",
      "cba",
      "aaa",
      "zz",
      "aa",
      "az",
      "za",
      "zzzzzzzzzz",
      "hello ",
      "world",
      "python",
      "java",
      "swift"
  ]
};

class PythonRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = 'Hello.py';
  }

  run(file, directory, filename, extension, qn, callback) {
    if (extension.toLowerCase() !== '.py') {
      console.log(`${file} is not a Python file.`);
      return;
    }
    this.execute(file, directory, qn, callback);
  }

  execute(file, directory, qn, callback) {
    const options = { cwd: directory };

    // Get the input data based on qn (either "1" or "2")
    const testCaseData = jsonData[qn];
    if (!testCaseData) {
      console.log(`Invalid test case number: ${qn}`);
      return;
    }

    // Collect output data
    let allOutput = [];
    let processedCount = 0;

    // Loop through the test case data and pass each value to the Python script
    testCaseData.forEach(input => {
      this.runPythonScript(directory, file, input, (status, output) => {
        console.log(output);
        allOutput.push(output);  // Append the output

        // Check if all test cases are processed
        processedCount++;
        if (processedCount === testCaseData.length) {
          callback('0', allOutput.join('\n'));  // Once all cases are processed, return the combined output
        }
      });
    });
  }

  runPythonScript(directory, filename, input, callback) {
    const options = { cwd: directory };
    const argsRun = [filename]; // Use filename as the argument for the Python script

    console.log(`options: ${JSON.stringify(options)}`);
    console.log(`argsRun: ${argsRun}`);

    const executor = spawn('python', argsRun, options);

    // Send input data to the Python script
    if (input) {
      console.log(`Sending input to Python script: ${input}`);
      executor.stdin.write(input + '\n');
      executor.stdin.end(); // Close stdin after writing
    }

    // Handle the stdout data (output from Python script)
    executor.stdout.on('data', (output) => {
      console.log(String(output));  // Log the output
      callback('0', String(output)); // 0, no error
    });

    // Handle the stderr data (error output from Python script)
    executor.stderr.on('data', (output) => {
      console.log(`stderr: ${String(output)}`);  // Log error output
      callback('2', String(output)); // 2, execution failure
    });

    // Handle process exit
    executor.on('close', (output) => {
      console.log(`Process exited with code: ${output}`);
    });
  }

  log(message) {
    console.log(message);
  }
}

module.exports = PythonRunner;
