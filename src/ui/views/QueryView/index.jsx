import React, {useEffect} from 'react';
import {Resizable} from 're-resizable';

// Components
import Editor from '../../components/Editor';

import Result from './Result';
import ToolBar from './ToolBar';

// Styles
import classes from './styles';

const Queryview = () => {
  useEffect(() => {}, []);

  return (
    <section css={classes.root}>
      <Resizable
        css={classes.editorContainer}
        enable={{bottom: true}}
        defaultSize={{
          width: '100%',
          height: '300px',
        }}
        minHeight={100}
        maxHeight={600}
      >
        <Editor
          value='SELECT * FROM employees;'
        />
      </Resizable>
      <ToolBar />
      <Result />
    </section>
  );
};

export default Queryview;
