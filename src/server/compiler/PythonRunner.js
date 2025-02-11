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
