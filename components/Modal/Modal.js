import React, { PropTypes } from 'react';

class Modal extends React.Component {

  static propTypes = {
    handleClose: React.PropTypes.func
  };

  componentDidMount() {
    $('#' + this.props.id).modal({keyboard: true, backdrop:true, show: true});
  }

  componentWillUnmount(){
    $('#' + this.props.id).on('hidden.bs.modal', function () {
      $(this).data('bs.modal', null);
    });
  }

  handleClose = (event) => {
    this.props.handleClose(event);
  };

  render() {
    return (
      <div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.handleClose}>
                <span className="pficon pficon-close"></span>
              </button>
            </div>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }

}

export default Modal;
