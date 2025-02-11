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

class JavaRunner extends Runner {
  defaultFile() {
    return this.defaultfile;
  }

  constructor() {
    super();
    this.defaultfile = 'Hello.java';
  }

  run(file, directory, filename, extension, qn, callback) {
    if (extension.toLowerCase() !== '.java') {
      console.log(`${file} is not a java file.`);
      return;
    }
    this.compile(file, directory, filename, qn, callback);
  }

  // compile java source file
  compile(file, directory, filename, qn, callback) {
    const options = { cwd: directory };
    const argsCompile = [file];
    console.log(`argsCompile: ${argsCompile}`);

    const compiler = spawn('javac', argsCompile);
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

  // execute the compiled java class file
  execute(directory, filename, options, qn, callback) {
    const cmdRun = filename.split('.')[0]; // Remove the file extension to get the class name
    console.log(`Executing: java ${cmdRun}`);

    // Get the input data based on qn (either "1" or "2")
    const testCaseData = jsonData[qn];
    if (!testCaseData) {
      console.log(`Invalid test case number: ${qn}`);
      return;
    }

    let allOutput = [];
    let processedCount = 0;

    // Loop through the test case data and pass each value to the Java executable
    testCaseData.forEach(input => {
      this.runJavaExecutable(directory, cmdRun, input, options, (status, output) => {
        allOutput.push(output);  // Append the output for each test case

        processedCount++;
        if (processedCount === testCaseData.length) {
          callback('0', allOutput.join('\n'));  // Return all outputs after all test cases are processed
        }
      });
    });
  }

  // Run the Java executable with input and collect output
  runJavaExecutable(directory, cmdRun, input, options, callback) {
    const executor = spawn('java', ['-Xmx2G', cmdRun], options);  // Example to set heap size to 2 GB


    // Send input data to the Java process
    if (input) {
      console.log(`Sending input to Java executable: ${input}`);
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

module.exports = JavaRunner;
