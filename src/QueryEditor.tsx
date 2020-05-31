import React, { PureComponent } from 'react';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './DataSource';
import { MyDataSourceOptions, MyQuery } from './types';
import Editor from '@monaco-editor/react';

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  editorValue: any | undefined;
  onQueryChange = () => {
    this.props.onChange({
      ...this.props.query,
      query: this.editorValue(),
    });
  };

  onEditorDidMount = (editorValue: any) => {
    this.editorValue = editorValue;
  };

  render() {
    const { query } = this.props;
    return (
      <>
        <div onBlur={this.onQueryChange}>
          <Editor
            height={'200px'}
            language="lua"
            value={query.query}
            editorDidMount={this.onEditorDidMount}
            theme={'dark'}
          />
        </div>
      </>
    );
  }
}
