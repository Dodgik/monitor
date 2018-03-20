import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as devicesActions from '../actions/devices_actions';
import Device from './device';


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
    console.warn('-->Devices.startTimer: ', name);

    clearInterval(this.state.timer);
    this.state.timer = setInterval(() => {
      console.warn('-->Devices.timer run');
      this.props.fetchDevices()
    }, 120000);
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
  fetchDevices: () => {
    dispatch(devicesActions.fetchDevices());
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
  setCurrentDevice: (device) => {
    dispatch(devicesActions.setCurrentDevice(device));
  },
  setFocusDevice: (device) => {
    dispatch(devicesActions.setFocusDevice(device));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
//export default Devices;
