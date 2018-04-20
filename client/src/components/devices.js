import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as devicesActions from '../actions/devices_actions';
import Device from './Device';


class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddForm: false,
      timer: null,
    }
    if (props.loggedIn) {
      this.startTimer();
    }
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
  componentWillUnmount() {
    this.stopTimer();
  }

  componentWillReceiveProps(nextProps) {
      console.log('---Devices.componentWillReceiveProps:', nextProps)
    if (nextProps.actionDevice && !nextProps.actionDevice.id) {
      let state = { ...nextProps.actionDevice };

      if (this.state.sending && !state.sending && !state.error && this.state.showAddForm) {
        state.showAddForm = false;
      }
      console.log('---Devices.componentWillReceiveProps setState:', state)
      this.setState(state);
    }
    if (nextProps.loggedIn != this.props.loggedIn) {
      this.props.fetchDevices();
    }
    if (nextProps.loggedIn) {
      this.startTimer();
    }
  }
  
  toggleAddForm() {
    this.setState({ showAddForm: !this.state.showAddForm });
  }

  handleAddDevice() {
    var name = this.refs.newDeviceName.value;
    this.props.addDevice({ name: name });
  }
  
  render() {
    console.log('-->Devices.render:', this.props);
    return (
      <div className="devices">
        <ul className="list-group list-group-item-action">
          {!this.props.loggedIn && (
            <li className="list-group-item list-group-item-dark text-center text-danger">You must sign up to access this functionality</li>
          )}
          {this.props.list.map(device => <Device key={device.id} {...device} />)}

          { this.state.showAddForm ? (
            <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-dark">
              <div className="add-device-form w-100 clearfix">
                <div className="mb-2">
                  <input className="name form-control" name="name" type="text" placeholder="Device Name" ref="newDeviceName" />
                </div>
                {this.state.sending ? (<div className="mt-2 text-warning text-center">Adding...</div>) : (
                  <div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleAddDevice.bind(this)}>Add</button>
                    <button type="button" className="btn btn-secondary float-right" onClick={this.toggleAddForm.bind(this)}>Close</button>
                  </div>
                )}
                {this.state.error && (<div className="mt-2 text-danger text-center">{this.state.error}</div>)}
              </div>
            </li>
          ) : (
            <li onClick={this.toggleAddForm.bind(this)} className="list-group-item list-group-item-action list-group-item-dark text-center" style={{ cursor: 'pointer' }}>Add new device</li>
          )}
        </ul>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  list: state.devices.list,
  actionDevice: state.devices.actionDevice,
});

const mapDispatchToProps = dispatch => ({
  fetchDevices: () => {
    dispatch(devicesActions.fetchDevices());
  },
  addDevice: (device) => {
    dispatch(devicesActions.addDevice(device));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
