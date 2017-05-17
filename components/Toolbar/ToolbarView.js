import React from 'react';

class ToolbarView extends React.Component {
  state = {
    currentFilter: { displayName: '', field: '' },
    filterText: '',
    searchVisible: false,
    searchText: ''
  };

  handleFilterClick = (event, column) => {
    this.setState({ currentFilter: column });
    this.props.filterChanged(event, column, this.state.filterText);
  };

  handleFilterTextChange = (event) => {
    this.setState({ filterText: event.target.value });
    this.props.filterChanged(
      event,
      this.state.currentFilter,
      event.target.value
    );
  };

  handleSearchClick = (event) => {
    this.setState({ searchVisible: !this.state.searchVisible });
    // focus on click and handle escape press
    setTimeout(() => {
      if (this.state.searchVisible) {
        this.searchBox.focus();
        this.searchBox.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' || e.key === 'Esc') {
            this.handleSearchClose(event);
          }
        });
      }
    });
  };

  handleSearch = (event) => {
    this.setState({ searchText: event.target.value });
    if (this.props.handleSearch) {
      this.props.handleSearch(event, event.target.value);
    }
  };

  handleSearchClose = (event) => {
    this.setState({ searchVisible: false, searchText: '' });
    if (this.props.handleSearchClose) {
      this.props.handleSearchClose(event);
    }
  };

  render() {
    if (
      !this.state.currentFilter.displayName &&
      this.props.columns &&
      this.props.columns.length
    ) {
      this.state.currentFilter = this.props.columns[0];
    }

    return (
      <div className="row toolbar-pf table-view-pf-toolbar">
        <div className="col-sm-12">
          <form className="toolbar-pf-actions">
            <div className="form-group toolbar-pf-filter">
              <label className="sr-only" htmlFor="filter">
                {this.state.currentFilter.displayName}
              </label>
              <div className="input-group">
                <div className="input-group-btn">
                  <button type="button"
                    className="btn btn-default dropdown-toggle"
                    id="filter"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {this.state.currentFilter.displayName}
                    {' '}
                    <span className="caret"/>
                  </button>
                  <ul className="dropdown-menu">
                    {this.props.columns.map((column, i) => (
                      <li key={i}>
                        <a href="#"
                          onClick={(e) => {
                            this.handleFilterClick(e, column);
                          }}>
                          {column.displayName}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <input type="text"
                  className="form-control"
                  onChange={this.handleFilterTextChange}
                  placeholder={`Filter by ${this.state.currentFilter.displayName}`}
                  autoComplete="off"
                  id="filterInput"/>
              </div>
            </div>
            <div className="form-group">
              {this.props.defaultAction &&
                <button className="btn btn-default"
                  type="button"
                  onClick={this.props.defaultAction.action}>
                  {this.props.defaultAction.label}
                </button>}
              {this.props.primaryAction &&
                <button className="btn btn-default"
                  type="button"
                  onClick={this.props.primaryAction.action}>
                  {this.props.primaryAction.label}
                </button>}
              <div className="dropdown btn-group  dropdown-kebab-pf">
                <button className="btn btn-link dropdown-toggle"
                  type="button"
                  id="dropdownKebab"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false">
                  <span className="fa fa-ellipsis-v"/>
                </button>
                <ul className="dropdown-menu " aria-labelledby="dropdownKebab">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"/>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </div>
            </div>
            {this.props.handleSearch &&
              <div className="toolbar-pf-action-right">
                <div className="form-group toolbar-pf-find">
                  <button className="btn btn-link btn-find"
                    type="button"
                    onClick={this.handleSearchClick}>
                    <span className="fa fa-search"/>
                  </button>
                  {this.state.searchVisible &&
                    <div className="find-pf-dropdown-container"
                      style={{ display: 'block' }}>
                      <input ref={(s) => {
                        this.searchBox = s;
                      }}
                        type="text"
                        className="form-control"
                        placeholder="Find By Keyword..."
                        onChange={this.handleSearch}/>
                      <div className="find-pf-buttons">
                        {/*
                     <span className="find-pf-nums">1 of 3</span>
                     <button className="btn btn-link" type="button">
                     <span className="fa fa-angle-up"></span>
                     </button>
                     <button className="btn btn-link" type="button">
                     <span className="fa fa-angle-down"></span>
                     </button>
                     */}
                        <button className="btn btn-link btn-find-close"
                          type="button"
                          onClick={this.handleSearchClose}>
                          <span className="pficon pficon-close"/>
                        </button>
                      </div>
                    </div>}
                </div>
              </div>}
          </form>
          <div className="row toolbar-pf-results">
            <div className="col-sm-9">
              <div>
                {(this.state.filterText || this.state.searchText) &&
                  <h5>
                    {this.props.resultsCount +
                      (this.props.resultsCount !== 1 ? ' Results' : ' Result')}
                  </h5>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToolbarView;
