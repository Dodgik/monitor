import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as devicesActions from '../actions/devices_actions';

//import ItemView from '../components/list_item_view';

class Device extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputName: null,
      showEditForm: false,
      timer: null
    }
  }
  
  handleShowDevice(item, e) {
    console.warn('-->Device.handleShowDevice: ', item);
    e.preventDefault();
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

  onNameChange(e) {
    var name = this.refs.deviceName.value;
    console.warn('-->Device.onNameChange: ', name);
    this.setState({ inputName: name });
  }

  render() {
    console.warn('-->Device.render:', this.props);
    const { device } = this.props;
    const { id, name } = device;

    let className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center list-group-item-primary';
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
          </div>
        ) : (
          <div className="device-item d-flex justify-content-between align-items-center w-100">
            {name}
            <div className="device-actions dropdown">
              <button type="button" className="navbar-toggler-icon mr-3" onClick={this.handleOpenEditForm.bind(this)}></button>
              <button type="button" className="badge badge-warning" onClick={this.handleShowDevice.bind(this, device)}>-></button>
            </div>
          </div>
        )}
      </li>
    );
  }
}

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddForm: false,
      timer: null
    }
    this.startTimer();
  }

  startTimer() {
    clearInterval(this.state.timer);
    this.state.timer = setInterval(() => this.props.requestDevices(), 120000);
  }

  stopTimer() {
    clearInterval(this.state.timer);
  }
  
  handleOpenAddForm(e) {
    e.preventDefault();
    this.setState({ showAddForm: !this.state.showAddForm });
  }

  handleAddNewItem(e) {
    e.preventDefault();
    var name = this.refs.newDeviceName.value;
    this.setState({ showAddForm: false });
    console.warn('-->Devices.handleAddNewItem: ', name);
    this.props.addItem({ name: name });
  }
  
  render() {
    console.warn('-->Devices.render:', this.props);
    const { list } = this.props.devices;

    return (
      <div className="devices">
        <ul className="list-group list-group-item-action">
          {list.map(device => <Device key={device.id} {...this.props} device={device} />)}

          { this.state.showAddForm ? (
            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-dark">
              <div className="add-device-form w-100 clearfix">
                <div className="mb-2">
                  <input className="name form-control" name="name" type="text" placeholder="Device Name" ref="newDeviceName" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handleAddNewItem.bind(this)}>Add</button>
                <button type="button" className="btn btn-secondary float-right" onClick={this.handleOpenAddForm.bind(this)}>Close</button>
              </div>
            </li>
          ) : (
            <li onClick={this.handleOpenAddForm.bind(this)} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center list-group-item-dark show" style={{ cursor: 'pointer' }}>Add new device</li>
          )}
        </ul>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  devices: state.devices
});

const mapDispatchToProps = dispatch => ({
  requestDevices: () => {
    dispatch(devicesActions.requestDevices());
  },
  viewItem: (name) => {
    dispatch(devicesActions.viewItem(name));
  },
  addItem: (device) => {
    dispatch(devicesActions.requestAddDevice(device));
  },
  setItem: (device) => {
    dispatch(devicesActions.requestSetDevice(device));
  },
  removeItem: (id) => {
    dispatch(devicesActions.requestRemoveDevice(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
//export default Devices;
