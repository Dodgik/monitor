import React, { Component } from 'react';

class Device extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputName: null,
      showEditForm: false,
      timer: null
    }
  }

  handleFocusDevice(item, e) {
    console.warn('-->Device.handleFocusDevice: ', item);
    e.stopPropagation();
    e.preventDefault();
    this.props.setFocusDevice(this.props.device);
  }

  handleOpenEditForm(e) {
    e.preventDefault();
    this.setState({ showEditForm: !this.state.showEditForm });
  }

  handleEditDevice(e) {
    e.stopPropagation();
    e.preventDefault();
    var name = this.refs.deviceName.value;
    this.setState({ showEditForm: false });
    console.warn('-->Device.handleEditDevice: ', name);
    this.props.setItem({ name: name, id: this.props.device.id });
  }

  handleRemoveItem(id, e) {
    console.warn('-->Device.handleRemoveItem: ', id);
    e.stopPropagation();
    e.preventDefault();
    this.props.removeItem(id);
  }

  handleSetCurrent(e) {
    console.warn('-->Device.handleSetCurrent: ', this.props.device);
    e.stopPropagation();
    e.preventDefault();
    this.props.setCurrentDevice(this.props.device);
  }

  onNameChange(e) {
    var name = this.refs.deviceName.value;
    console.warn('-->Device.onNameChange: ', name);
    this.setState({ inputName: name });
  }

  render() {
    console.warn('-->Device.render:', this.props);
    const { device } = this.props;
    const { id, name } = device;
    const { currentDeviceId, focusDeviceId } = this.props.devices;

    let className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center list-group-item-primary';
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
              <div className="device-actions dropdown">
                <button type="button" className="navbar-toggler-icon mr-3" onClick={this.handleOpenEditForm.bind(this)}></button>
                <button type="button" className="badge badge-warning" onClick={this.handleFocusDevice.bind(this, device)}>-></button>
              </div>
            </div>
          )}
      </li>
    );
  }
}

export default Device;
