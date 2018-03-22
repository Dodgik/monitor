import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as devicesActions from '../actions/devices_actions';

class Device extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputName: null,
      isCurrent: props.currentDeviceId == props.id,
      showMenu: false,
      showEditForm: false,
      showSetCurrentForm: false,
      showRemoveForm: false,
      timer: null
    }
  }

  componentWillReceiveProps(nextProps) {
    let state = null;
    if (this.state.isCurrent != (nextProps.currentDeviceId == this.props.currentDeviceId)) {
      console.log('---Device.componentWillReceiveProps:', nextProps)
      this.setState({ isCurrent: !this.state.isCurrent });
    }
  }

  handleFocusDevice(item, e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.setFocusDevice({ id: this.props.id });
  }

  handleRemoveItem(id, e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.removeItem(id);
  }

  handleOpenMenu(e) {
    e.preventDefault();
    this.setState({ showMenu: !this.state.showMenu });
  }

  handleOpenEditForm(e) {
    e.preventDefault();
    this.setState({
      showMenu: false,
      showEditForm: !this.state.showEditForm
    });
  }

  onNameChange(e) {
    var name = this.refs.deviceName.value;
    console.warn('-->Device.onNameChange: ', name);
    this.setState({ inputName: name });
  }

  handleEditDevice(e) {
    e.stopPropagation();
    e.preventDefault();
    var name = this.refs.deviceName.value;
    this.setState({ showEditForm: false });
    this.props.setItem({ name: name, id: this.props.id });
  }

  handleOpenSetCurrentForm(e) {
    e.preventDefault();
    this.setState({
      showMenu: false,
      showSetCurrentForm: !this.state.showSetCurrentForm
    });
  }

  handleSetCurrent(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.setCurrentDevice({ id: this.props.id });
    this.setState({ showSetCurrentForm: false });
  }

  render() {
    console.warn('-->Device.render:', this.props);
    const { id, name, currentDeviceId, focusDeviceId } = this.props;

    let className = 'list-group-item list-group-item-action list-group-item-primary';
    if (id == focusDeviceId) {
      className += ' list-group-item-warning'
    }
    return (
      <li key={id} className={className}>
        {this.state.showEditForm ? (
          <div className="edit-device-form w-100 clearfix">
            <div className="mb-2">
              <input className="form-control" type="text" placeholder="Device Name" ref="deviceName" value={this.state.inputName || name} onChange={this.onNameChange.bind(this)} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleEditDevice.bind(this)}>Save</button>
            <button type="button" className="btn btn-secondary float-right" onClick={this.handleOpenEditForm.bind(this)}>Close</button>
            <button type="button" className="btn btn-danger btn-block mt-1" onClick={this.handleRemoveItem.bind(this, id)}>Remove</button>
            <button type="button" className="btn btn-info btn-block mt-1" onClick={this.handleSetCurrent.bind(this)}>Set As Current</button>
          </div>
        ) : (
          <div className="device-item d-flex justify-content-between align-items-center w-100">
            {currentDeviceId == id ? (<span className="font-weight-bold">{name}</span>) : (<span>{name}</span>)}
            <div className="device-actions position-relative">
              <button type="button" className="navbar-toggler-icon mr-3" onClick={this.handleOpenMenu.bind(this)}></button>

              <button type="button" className="badge badge-warning" onClick={this.handleFocusDevice.bind(this, {id})}>-></button>
            </div>
          </div>
        )}
        {this.state.showMenu && (
          <div className="collapse show card card-body mt-2 bg-info text-white">
            <button type="button" className="dropdown-item" onClick={this.handleOpenEditForm.bind(this)}>Edit</button>
            {currentDeviceId == id ? (
              <button type="button" className="dropdown-item font-weight-bold" onClick={this.handleOpenSetCurrentForm.bind(this)}>Set As Current &#x2714;</button>
            ) : (
              <button type="button" className="dropdown-item" onClick={this.handleOpenSetCurrentForm.bind(this)}>Set As Current</button>
            )}
            <div className="dropdown-divider"></div>
            <button type="button" className="dropdown-item" onClick={this.handleRemoveItem.bind(this, id)}>Remove</button>
          </div>
        )}
        {this.state.showSetCurrentForm && (
          <div className="edit-device-form rounded p-3 mt-3 w-100 bg-white clearfix">
            <div className="mb-2 text-center">
              {currentDeviceId == id ? ('Unset') : ('Set')} as current device?
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleSetCurrent.bind(this)}>{this.state.isCurrent? ('Unset') : ('Set')}</button>
            <button type="button" className="btn btn-secondary float-right" onClick={this.handleOpenSetCurrentForm.bind(this)}>Close</button>
          </div>
        )}
      </li>
    );
  }
}


const mapStateToProps = state => ({
  currentDeviceId: state.devices.currentDeviceId,
  focusDeviceId: state.devices.focusDeviceId,
});

const mapDispatchToProps = dispatch => ({
  viewItem: (name) => {
    dispatch(devicesActions.viewItem(name));
  },
  setItem: (device) => {
    dispatch(devicesActions.requestSetDevice(device));
  },
  removeItem: (id) => {
    dispatch(devicesActions.requestRemoveDevice(id));
  },
  setCurrentDevice: (device) => {
    dispatch(devicesActions.setCurrentDevice(device));
  },
  setFocusDevice: (device) => {
    dispatch(devicesActions.setFocusDevice(device));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Device);
//export default Device;
