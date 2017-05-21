import React from 'react';

class ListGroupExpansionContainer extends React.Component {
  render() {
    return (
      <div className="list-group-item-container container-fluid hidden">
        <div className="close">
          <span className="pficon pficon-close"/>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default ListGroupExpansionContainer;
