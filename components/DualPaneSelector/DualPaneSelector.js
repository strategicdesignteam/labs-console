import React, { PropTypes } from 'react';
import cx from 'classnames';

class DualPaneSelector extends React.Component {

  state = {selectedAvailableItems: [], selectedSelectedItems: []};

  static propTypes = {
    availableItems: React.PropTypes.array,
    selectedItems: React.PropTypes.array,
    selectItems: React.PropTypes.func,
    unselectItems: React.PropTypes.func,
    availableTitle: React.PropTypes.string,
    selectedTitle: React.PropTypes.string
  };

  isItemInList(item, list){
    //we can expose this function to the parent in the future...
    return list.findIndex((l) => { return l.id == item.id });
  }

  availableItemClick = (event, item) => {
    let i = this.isItemInList(item, this.state.selectedAvailableItems);
    if(i > -1){
      this.setState({
        selectedAvailableItems: this.state.selectedAvailableItems.filter((item, j) => { return j !== i})
      }); //remove item if already selected
    } else {
      this.setState({
        selectedAvailableItems: this.state.selectedAvailableItems.concat([item])
      }); //add item if not
    }
  };

  selectedItemClick = (event, item) => {
    let i = this.isItemInList(item, this.state.selectedSelectedItems);
    if(i > -1){
      this.setState({
        selectedSelectedItems: this.state.selectedSelectedItems.filter((item, j) => { return j !== i})
      }); //remove item if already selected
    } else {
      this.setState({
        selectedSelectedItems: this.state.selectedSelectedItems.concat([item])
      }); //add item if not
    }
  };

  isAvailableItemSelected(item){
    return this.isItemInList(item, this.state.selectedAvailableItems) > -1;
  }

  isSelectedItemSelected(item){
    return this.isItemInList(item, this.state.selectedSelectedItems) > -1;
  }

  selectItemsClick = (event) => {
    this.props.selectItems(event, this.state.selectedAvailableItems);
    this.state.selectedAvailableItems = []; //empty after select is applied
  };

  unselectItemsClick = (event) => {
    this.props.unselectItems(event, this.state.selectedSelectedItems);
    this.state.selectedSelectedItems = []; //empty after unselect is applied
  };

  labelText(items){
    if(items.length > 0){
      return items.length + (items.length == 1 ? ' item selected' : ' items selected');
    } else return '';
  }

  render() {

    return (
      <div className="dual-pane-selector">

        <div className="dual-pane-selector-list-container">
          <div className="dual-pane-selector-list dual-pane-selector-list-left">
            <label>{this.props.availableTitle}</label>
            <div className="dual-pane-selector-items-container">
              {this.props.availableItems.map((item, i) =>
              <div key={i} className={cx({
                  'dual-pane-selector-item' : true,
                  'selected': this.isAvailableItemSelected(item)
                })} onClick={(e) => {this.availableItemClick(e, item)}}>
                <div className="dual-pane-selector-info">
                    <span className="dual-pane-selector-item-container">{item.username}</span>
                    <span className="dual-pane-selector-item-select-indicator fa fa-check"></span>
                </div>
              </div>
              )}
            </div>
            <label className="dual-pane-selector-count-text">
              {this.labelText(this.state.selectedAvailableItems)}
            </label>
          </div>
        </div>

        <div className="dual-pane-selector-button-container">
          <div className="dual-pane-selector-select-button-container dual-pane-selector-select-button-container-top">
            <button className="dual-pane-selector-select-button btn btn-link fa fa-angle-right"
                    onClick={this.selectItemsClick}
                    disabled={this.state.selectedAvailableItems.length < 1}>
            </button>
          </div>
          <div className="dual-pane-selector-select-button-container dual-pane-selector-select-button-container-bottom">
            <button className="dual-pane-selector-unselect-button btn btn-link fa fa-angle-left"
                    onClick={this.unselectItemsClick}
                    disabled={this.state.selectedSelectedItems.length < 1}>
            </button>
          </div>
        </div>

        <div className="dual-pane-selector-list-container">
          <div className="dual-pane-selector-list dual-pane-selector-list-right">
            <label>{this.props.selectedTitle}</label>
            <div className="dual-pane-selector-items-container">
              {this.props.selectedItems.map((item, i) =>
              <div key={i} className={cx({
                  'dual-pane-selector-item' : true,
                  'selected': this.isSelectedItemSelected(item)
                })} onClick={(e) => {this.selectedItemClick(e, item)}}>
                <div className="dual-pane-selector-info">
                  <div className="dual-pane-selector-item-container">{item.username}</div>
                  <div className="dual-pane-selector-item-select-indicator fa fa-check"></div>
                </div>
              </div>
              )}
            </div>
            <label className="dual-pane-selector-count-text">
              {this.labelText(this.state.selectedSelectedItems)}
            </label>
          </div>
        </div>

      </div>
    )
  }
}

export default DualPaneSelector;