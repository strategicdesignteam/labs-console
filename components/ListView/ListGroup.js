import React from 'react';

class ListGroup extends React.Component {
  render() {
    return (
      <div className="list-group list-view-pf list-view-pf-view">
        {this.props.children}
      </div>
    );
  }
}

export default ListGroup;
