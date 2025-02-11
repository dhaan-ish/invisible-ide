const { spawn } = require('child_process');
const Runner = require('./Runner');

// The JSON data
const jsonData = {
  "1": [
    "AZ", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "M ", "NNNNN", "PQRST", "ZZZZ", "AA", "A", "TALOS", 
    "CITCHENNAI", "CODING", "INVISIBLE", "IDE", "TATAKAE", "AI"
  ],
  "2": [
    "110", "2", "3", "5", "1100", "15", "20", "25", "30", "50", "100", "200", "500", "1000", "10000"
  ]
};

class JavaScriptRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = 'Hello.js';
  }

  run(file, directory, filename, extension, qn, callback) {
    if (extension.toLowerCase() !== '.js') {
      console.log(`${file} is not a javascript file.`);
      return;
    }
    this.execute(directory, filename, qn, callback);
  }

  execute(directory, filename, qn, callback) {
    const options = { cwd: directory };
    const cmdRun = filename; // The JavaScript file to execute
    console.log(`Executing: node ${cmdRun}`);

    // Get the input data based on qn (either "1" or "2")
    const testCaseData = jsonData[qn];
    if (!testCaseData) {
      console.log(`Invalid test case number: ${qn}`);
      return;
    }

    let allOutput = [];
    let processedCount = 0;

    // Loop through the test case data and pass each value to the JS file
    testCaseData.forEach(input => {
      this.runJavaScriptExecutable(directory, cmdRun, input, options, (status, output) => {
        allOutput.push(output);  // Append the output for each test case

        processedCount++;
        if (processedCount === testCaseData.length) {
          callback('0', allOutput.join('\n'));  // Return all outputs after all test cases are processed
        }
      });
    });
  }

  // Run the JavaScript file with input and collect output
  runJavaScriptExecutable(directory, cmdRun, input, options, callback) {
    const executor = spawn('node', [cmdRun], options);

    // Send input data to the JavaScript process if needed
    if (input) {
      console.log(`Sending input to JavaScript executable: ${input}`);
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

module.exports = JavaScriptRunner;
