import React from 'react';
import PropTypes from 'prop-types';

// Styles
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/lint/lint.css';
import './styles/monokai.css';
import './styles/styles.css';

let CodeMirrorEditor = null;
let editorOptions = {};
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  const CodeMirror = require('codemirror');
  CodeMirrorEditor = require('react-codemirror2').UnControlled;
  require('codemirror/mode/sql/sql');
  require('codemirror/addon/hint/show-hint');
  require('codemirror/addon/hint/sql-hint');
  require('codemirror/addon/lint/lint');
  require('codemirror/addon/hint/show-hint');

  editorOptions = {
    hint: CodeMirror.hint.sql,
    indentWithTabs: true,
    lineNumbers: true,
    matchClosing: true,
    mode: 'sql',
    scrollbarStyle: null,
    tabSize: 2,
    theme: 'monokai',
  };
}

const EditorComponent = (props) => {
  if (CodeMirrorEditor) {
    return (
      <CodeMirrorEditor
        options={{...editorOptions, ...props.options}}
        {...props}
      />
    );
  }

  return null;
};

EditorComponent.propTypes = {
  options: PropTypes.shape({}),
};

export default EditorComponent;
