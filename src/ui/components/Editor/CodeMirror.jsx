import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'codemirror';
import {Controlled as CodeMirrorEditor} from 'react-codemirror2';

// Styles
import 'codemirror/mode/sql/sql';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/lint/lint.css';
import './styles/monokai.css';
import './styles/styles.css';

const editorOptions = {
  hint: CodeMirror.hint.sql,
  indentWithTabs: true,
  lineNumbers: true,
  matchClosing: true,
  mode: 'sql',
  scrollbarStyle: null,
  tabSize: 2,
  theme: 'monokai',
};

const EditorComponent = (props) => {
  const [ready, setRedy] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRedy(true);
    }
  }, []);

  if (ready) {
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
