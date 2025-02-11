const { spawn } = require('child_process');
const Runner = require('./Runner');
const path = require('path');

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

class CppRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = 'Hello.cpp';
  }

  run(file, directory, filename, extension, qn, callback) {
    if (extension.toLowerCase() !== '.cpp') {
      console.log(`${file} is not a cpp file.`);
      return;
    }
    this.compile(file, directory, filename, qn, callback);
  }

  // compile a cpp file
  compile(file, directory, filename, qn, callback) {
    const options = { cwd: directory };

    const argsCompile = [file, '-o', path.join(directory, `${filename}.out`)];
    console.log(`argsCompile: ${argsCompile}`);

    const compiler = spawn('g++', argsCompile);
    compiler.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    compiler.stderr.on('data', (data) => {
      console.log(`compile-stderr: ${String(data)}`);
      callback('1', String(data)); // 1, compile error
    });
    compiler.on('close', (data) => {
      if (data === 0) {
        this.execute(directory, filename, options, qn, callback); // Execute if compiled successfully
      }
    });
  }

  // execute the compiled cpp file
  execute(directory, filename, options, qn, callback) {
    const cmdRun = path.join(directory, `${filename}.out`);
    console.log(`Executing: ${cmdRun}`);

    // Get the input data based on qn (either "1" or "2")
    const testCaseData = jsonData[qn];
    if (!testCaseData) {
      console.log(`Invalid test case number: ${qn}`);
      return;
    }

    let allOutput = [];
    let processedCount = 0;

    // Loop through the test case data and pass each value to the C++ executable
    testCaseData.forEach(input => {
      this.runCppExecutable(directory, cmdRun, input, options, (status, output) => {
        allOutput.push(output);  // Append the output for each test case

        processedCount++;
        if (processedCount === testCaseData.length) {
          callback('0', allOutput.join('\n'));  // Return all outputs after all test cases are processed
        }
      });
    });
  }

  // Run the C++ executable with input and collect output
  runCppExecutable(directory, cmdRun, input, options, callback) {
    const executor = spawn(cmdRun, [], options);

    // Send input data to the executable
    if (input) {
      console.log(`Sending input to C++ executable: ${input}`);
      executor.stdin.write(input + '\n');
      executor.stdin.end(); // Close stdin after writing
    }

    executor.stdout.on('data', (output) => {
      console.log(String(output));  // Log the output from the executable
      callback('0', String(output)); // 0, no error
    });

    executor.stderr.on('data', (output) => {
      console.log(`stderr: ${String(output)}`);  // Log any error output
      callback('2', String(output)); // 2, execution failure
    });

    executor.on('close', (output) => {
      console.log(`Process exited with code: ${output}`);
    });
  }

  log(message) {
    console.log(message);
  }
}

module.exports = CppRunner;
