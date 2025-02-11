import React from 'react';
import { Form, FormGroup, Col, Button, ControlLabel, FormControl } from 'react-bootstrap';
import LangSelector from './controls/LangSelector';
import CodeEditor from './controls/CodeEditor';
import AlertDismissable from './controls/AlertDismissable';
import OutputBox from './controls/OutputBox';
import StatusImage from './controls/StatusImage';
import CompilerApi from '../api/CompilerApi';

let languages = ['JavaScript', 'Python', 'Java', 'C', 'C++'];
const languagesProd = ['JavaScript', 'Python'];

class Editor extends React.Component {
  constructor(props) {
    super(props);

    console.log(`env: ${process.env.NODE_ENV}`);
    if (process.env.NODE_ENV === 'production') {
      languages = languagesProd;
    }

    this.state = {
      selectedLang: 0, // JavaScript
      task: {
        lang: 'javascript',
        code: '',
        qn: 1,  // Initial question number
      },
      response: {
        status: '0',
        message: '',
      },
    };

    this.handleRun = this.handleRun.bind(this);
    this.updateSolution = this.updateSolution.bind(this);
    this.handleLangChange = this.handleLangChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);  // New handler for question change
  }

  componentDidMount() {
    CompilerApi.getTask('javascript')
      .then((task) => {
        console.log(task);
        this.setState({ task });
      });
  }

  handleCodeChange(code) {
    const { task } = this.state;
    task.code = code;
    task.qn = 2;
    console.log(code);
    return this.setState({ task });
  }

  handleRun(event) {
    event.preventDefault();
    const { task } = this.state;
    console.log(task);
    CompilerApi.run(task)
      .then((res) => {
        this.setState({ response: res });
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        // this.handleError(error);
      });
  }

  updateSolution(event) {
    const field = event.target.name;
    const { task } = this.state;
    task[field] = event.target.value;
    return this.setState({ task });
  }

  handleLangChange(event) {
    const index = parseInt(event.target.value, 10);
    CompilerApi.getTask(languages[index]).then((task) => {
      console.log(task);
      this.setState({ task });
    });
    const response = { status: '0', message: '' };
    this.setState({ response });
    return this.setState({ selectedLang: index });
  }

  // New function to handle question number change
  handleQuestionChange(event) {
    const questionNumber = parseInt(event.target.value, 10);
    const { task } = this.state;
    task.qn = questionNumber;  // Update task.qn based on selected number
    this.setState({ task });
    console.log(task);
  }

  render() {
    return (
      <div className="container">
        <Form horizontal>
          <FormGroup controlId="code">
            <Col sm={12}>
              <LangSelector
                langs={languages}
                selectedIndex={this.state.selectedLang}
                onChange={this.handleLangChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="code">
            <Col sm={12}>
              <CodeEditor onChange={this.handleCodeChange} code={this.state.task.code} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2}>
              {/* Dropdown for selecting question number */}
              <ControlLabel>Question No.</ControlLabel>
              <FormControl
                componentClass="select"  // Set as a select element for dropdown
                value={this.state.task.qn}
                onChange={this.handleQuestionChange}
              >
                {[...Array(10).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </FormControl>
            </Col>
            <Col sm={2}>
              <Button bsStyle="primary" type="button" onClick={this.handleRun}>
                Run
              </Button>
              <StatusImage
                hasError={this.state.response.status !== '0'}
                message={this.state.response.message}
              />
            </Col>
            <Col sm={8} />
          </FormGroup>
          <FormGroup>
            <Col sm={12}>
              <AlertDismissable
                show={this.state.response.status !== '0'}
                message={this.state.response.message}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={12}>
              <OutputBox
                show={this.state.response.status === '0'}
                message={this.state.response.message}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Editor;
