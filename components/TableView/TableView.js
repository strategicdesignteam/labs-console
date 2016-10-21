import React, { PropTypes } from 'react';
import cx from 'classnames';
import s from './style.css';

class TableView extends React.Component {

  handleSort = (event, col) => {
      //should we load datatables and do sorting/filtering/paging, or just pre-sort using js?
  };

  handleRowClick = (event, item) => {
    this.props.handleRowClick(event, item);
  };

  render() {
    if(this.props.data.length && this.props.columns.length) {
      return (
        <div className="table-responsive">
          <table className={cx(s.table_view_bg, 'table table-striped table-bordered table-hover')}>
            <thead>
            <tr>
              {this.props.columns.map((column,i) =>
              <th key={i} onClick={(e) => this.handleSort(e, column)}>{ column.displayName }</th>
              )}
            </tr>
            </thead>
            <tbody>
            {this.props.data.map((item,i) =>
            <tr key={i}>
              {this.props.columns.map((col,j) =>
              <td key={j} onClick={(e) => this.handleRowClick(e, item)} >{item[col.field]}</td>
              )}
            </tr>
            )}
            </tbody>
          </table>
        </div>
      );
    }
    else {
      //Todo: show loading
      return (
        <div></div>
      );
    }
  }
}

export default TableView;