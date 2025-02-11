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

const output = {
  "1": [
      "00 19",
      "00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F 10 11 12 13 14 15 16 17 18 19",
      "0C",
      "0D 0D 0D 0D 0D",
      "0F 10 11 12 13",
      "19 19 19 19",
      "00 00",
      "00",
      "13 00 0B 0E 12",
      "02 08 13 02 07 04 0D 0D 00 08",
      "02 0E 03 08 0D 06",
      "08 0D 15 08 12 08 01 0B 04",
      "08 03 04",
      "13 00 13 00 0A 00 04",
      "00 08"
  ],
  "2": [
      "281",
      "1",
      "4",
      "8",
      "4561",
      "26",
      "33",
      "52",
      "57",
      "97",
      "251",
      "597",
      "1795",
      "4031",
      "52017"
  ],
  "3": [
      "210",
      "210",
      "5005",
      "46189",
      "1616615",
      "5",
      "239923088",
      "68719771",
      "880486769",
      "97",
      "113",
      "2",
      "-1",
      "-1",
      "-1"
  ],
  "4": [
      "fdvcbtjpn",
      "hplb",
      "bpp",
      "vnjvfrsf",
      "prpgrbmmjng",
      "fxbmplf",
      "tfstcbsf",
      "cpmpvtfr",
      "blgprjthm",
      "scjfncf",
      "dbtb",
      "jnpvt",
      "pvtpvt",
      "strjng",
      "pythpn"
  ],
  "5": [
      "a",
      "p",
      "a",
      "a",
      "a",
      "a",
      "l",
      "z",
      "x",
      "a",
      "c",
      "a",
      "a",
      "t",
      "a"
  ],
  "6": [
      "c",
      "-1",
      "z",
      "a",
      "-1",
      "a",
      "c",
      "-1",
      "b",
      "c",
      "m",
      "a",
      "e",
      "k",
      "r"
  ],
  "7": [
      "4",
      "5",
      "3",
      "1",
      "3",
      "3",
      "7",
      "1",
      "9",
      "9",
      "7",
      "4",
      "1",
      "9",
      "7"
  ],
  "8": [
      "4",
      "2",
      "3",
      "1",
      "7",
      "2",
      "1",
      "2",
      "5",
      "11",
      "5",
      "2",
      "1",
      "8",
      "16"
  ],
  "9": [
      "5",
      "1",
      "5",
      "2",
      "5",
      "1",
      "7",
      "1",
      "3",
      "9",
      "4",
      "1",
      "5",
      "15",
      "5"
  ],
  "10": [
      "1",
      "1",
      "2",
      "2",
      "0",
      "0",
      "0",
      "25",
      "25",
      "0",
      "13",
      "25",
      "34",
      "51",
      "35"
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
    const expectedOutput = output[qn];

    if (!testCaseData) {
      console.log(`Invalid test case number: ${qn}`);
      return;
    }

    let allTestResults = [];
    let processedCount = 0;

    // Loop through the test case data and pass each value to the Python script
    testCaseData.forEach((input, index) => {
      this.runPythonScript(directory, file, input, (status, scriptOutput) => {
        let testResult = this.checkTestCase(scriptOutput, expectedOutput[index]);
        allTestResults.push(testResult);

        // Check if all test cases are processed
        processedCount++;
        if (processedCount === testCaseData.length) {
          callback('0', allTestResults.join('\n')); // Return results for all test cases
        }
      });
    });
  }

  runPythonScript(directory, filename, input, callback) {
    const options = { cwd: directory };
    const argsRun = [filename]; // Use filename as the argument for the Python script

    const executor = spawn('python', argsRun, options);

    // Send input data to the Python script
    if (input) {
      executor.stdin.write(input + '\n');
      executor.stdin.end(); // Close stdin after writing
    }

    // Handle the stdout data (output from Python script)
    executor.stdout.on('data', (output) => {
      callback('0', String(output)); // 0, no error
    });

    // Handle the stderr data (error output from Python script)
    executor.stderr.on('data', (output) => {
      callback('2', String(output)); // 2, execution failure
    });

    // Handle process exit
    executor.on('close', (output) => {
      console.log(`Process exited with code: ${output}`);
    });
  }

  checkTestCase(actualOutput, expectedOutput) {
    // Simple comparison for output, trim spaces and handle newlines
    const formattedActual = actualOutput.trim();
    const formattedExpected = expectedOutput.trim();

    if (formattedActual === formattedExpected) {
      return 'PASSED';
    } else {
      return `FAILED (Expected: ${formattedExpected}, Got: ${formattedActual})`;
    }
  }

  log(message) {
    console.log(message);
  }
}

module.exports = PythonRunner;
