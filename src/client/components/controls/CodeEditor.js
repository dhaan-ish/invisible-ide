import React from "react";
import PropTypes from "prop-types";

// Import Brace and the AceEditor Component
import AceEditor from "react-ace";

const editorStyle = {
  border: "1px solid lightgray",
};

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    this.props.onChange(newValue);
  }

  render() {
    return (
      <AceEditor
  style={{ width: "100%", height: "200px", caretColor: "black" }} // Ensure cursor is visible
  readOnly={false}
  onChange={this.onChange}
  mode="java"
  theme="github"
  name="aceCodeEditor"
  fontSize={14}
  showPrintMargin
  showGutter
  highlightActiveLine
  value={this.props.code}
  editorProps={{
    $blockScrolling: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
  }}
  setOptions={{
    showLineNumbers: true,
    tabSize: 2,
  }}
  // onLoad={(editor) => {
  //   // Apply styles using JavaScript (Ace Editor modifies DOM after load)
  //   const styleSheet = document.createElement("style");
  //   styleSheet.type = "text/css";
  //   styleSheet.innerText = `
  //     .ace_content {
  //       color: transparent !important; /* Hide text */
  //       text-shadow: none !important; /* Prevent text from showing */
  //     }
  //     .ace_cursor {
  //       color: black !important; /* Ensure cursor is visible */
  //     }
  //     .ace_selection {
  //       background: transparent !important; /* Prevent text selection highlight */
  //     }
  //   `;
  //   document.head.appendChild(styleSheet);
  // }}
/>

    );
  }
}

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CodeEditor;
