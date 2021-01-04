import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import CodeMirror from './CodeMirror';

// Styles
import classes from './styles/styles';

const Editor = ({
  onChange,
  value,
  ...otherProps
}) => {
  const [code, setCode] = useState();

  const showHint = useRef(debounce((editor) => {
    editor.showHint({
      completeSingle: false,
    });
  }, 250, {
    leading: false,
    trailing: true,
  }));

  const handleOnChange = useCallback(debounce((value) => {
    onChange(value);
  }, 250, {
    leading: false,
    trailing: true,
  }), [onChange]);

  useEffect(() => {
    setCode(value);
  }, [value]);

  return (
    <div css={classes.root}>
      <CodeMirror
        editorDidMount={(editor) => {
          editor.current = editor;
        }}
        onKeyUp={(editor, event) => {
          if (event.key.match(/^[\d\w]$/i)) {
            showHint.current(editor);
          } else {
            showHint.current.cancel();
          }
        }}
        onBeforeChange={(editor, data, newValue) => {
          setCode(newValue);
          handleOnChange(newValue);
        }}
        style={{
          height: '100%',
        }}
        value={code}
        {...otherProps}
      />
    </div>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

Editor.defaultProps = {
  onChange: () => {},
  value: '',
};

export default Editor;
