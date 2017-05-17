import React from 'react';
import cx from 'classnames';
import s from './style.css';

class TableView extends React.Component {
  static propTypes = {
    filterColumn: React.PropTypes.string,
    filterText: React.PropTypes.string,
    observeRowCount: React.PropTypes.func
  };

  componentWillMount() {
    this.previousRowCount = 0;
  }

  componentDidUpdate() {
    if (this.props.observeRowCount) {
      if (this.previousRowCount !== this.rowCount) {
        this.previousRowCount = this.rowCount; // prevents us from endless rendering loop
        this.props.observeRowCount(this.rowCount);
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  handleSort = (event, col) => {
    // should we load datatables and do sorting/filtering/paging, or just pre-sort using js?
  };

  handleRowClick = (event, item, i) => {
    this.props.handleRowClick(event, item, i);
  };

  passesFilter(item) {
    // simplified filter functionality for now
    const { filterColumn, filterText } = this.props;

    if (filterColumn && filterText) {
      if (filterColumn === '*') {
        // search filter searches all columns
        for (const property in item) {
          if (`${item[property] || ''}`.indexOf(filterText) > -1) {
            this.rowCount++;
            return true;
          }
        }
        return false;
      }

      const result = `${item[filterColumn] || ''}`.indexOf(filterText) > -1;
      if (result) this.rowCount++;
      return result;
    }
    return true;
  }

  render() {
    // set rowCount to zero at start of render
    this.rowCount = 0;

    if (this.props.data.length && this.props.columns.length) {
      return (
        <div className="table-responsive">
          <table className={cx(
              s.table_view_bg,
              'table table-striped table-bordered table-hover'
            )}>
            <thead>
              <tr>
                {this.props.columns.map((column, i) => (
                  <th key={i} onClick={e => this.handleSort(e, column)}>
                    {column.displayName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.props.data.map((item, i) => {
                if (this.passesFilter(item)) {
                  return (
                    <tr key={i}>
                      {this.props.columns.map((col, j) => (
                        <td key={j}
                          onClick={e => this.handleRowClick(e, item, i)}>
                          {item[col.field]}
                        </td>
                      ))}
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      );
    }

    // Todo: show loading
    return <div/>;
  }
}

export default TableView;
