import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as devicesActions from '../../actions/devices_actions';

class Device extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDevice: null,
      inputName: null,
      showMenu: false,
      showEditForm: false,
      showSetCurrentForm: false,
      showRemoveForm: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.actionDevice && this.props.id == nextProps.actionDevice.id) {
      let state = { ...nextProps.actionDevice };

      if (this.state.sending && !state.sending && !state.error && this.state.showEditForm) {
          state.showEditForm = false;
      }
      //console.log('---Device.componentWillReceiveProps:', nextProps)
      //console.log('---Device.componentWillReceiveProps setState:', state)
      this.setState(state);
    }
  }
  
  handleFocusDevice(item, e) {
    e.preventDefault();
    this.props.setFocusDevice({ id: this.props.id });
  }

  toggleRemoveForm() {
    this.setState({ showMenu: false, showRemoveForm: !this.state.showRemoveForm });
  }

  handleRemove() {
    this.props.removeDevice({ id: this.props.id });
  }

  toggleMenu(e) {
    e.preventDefault();
    this.setState({
      showMenu: !this.state.showMenu,
      showEditForm: false,
      showSetCurrentForm: false,
      showRemoveForm: false,
      error: false,
    });
  }

  toggleEditForm(e) {
    e.preventDefault();
    this.setState({ showMenu: false, showEditForm: !this.state.showEditForm });
  }

  onNameChange(e) {
    var name = this.refs.deviceName.value;
    this.setState({ inputName: name });
  }

  handleEditDevice(e) {
    e.preventDefault();
    var name = this.refs.deviceName.value;
    this.props.setDevice({ name: name, id: this.props.id });
  }

  toggleSetCurrentForm() {
    this.setState({ showMenu: false, showSetCurrentForm: !this.state.showSetCurrentForm });
  }

  handleSetCurrent(e) {
    e.preventDefault();
    this.setState({ showSetCurrentForm: false });
    this.props.setCurrentDevice({ id: this.props.id });
  }

  render() {
    //console.warn('-->Device.render:', this.props);
    const { id, name, currentDeviceId, focusDeviceId } = this.props;

    let className = 'list-group-item list-group-item-action list-group-item-primary';
    if (id == focusDeviceId) {
      className += ' list-group-item-warning'
    }
    return (
      <li key={id} className={className}>
        <div className="device-item d-flex justify-content-between align-items-center w-100">
          {currentDeviceId == id ? (<span className="font-weight-bold">{name}</span>) : (<span>{name}</span>)}
          <div className="device-actions position-relative">
            <button type="button" className="navbar-toggler-icon mr-3" onClick={this.toggleMenu.bind(this)}></button>
            <button type="button" className="badge badge-warning" onClick={this.handleFocusDevice.bind(this, {id})}>-></button>
          </div>
        </div>

        {this.state.showMenu && (
          <div className="collapse show card card-body mt-2 bg-info text-white">
            <button type="button" className="dropdown-item" onClick={this.toggleEditForm.bind(this)}>Edit</button>
            {currentDeviceId == id ? (
              <button type="button" className="dropdown-item font-weight-bold" onClick={this.toggleSetCurrentForm.bind(this)}>Set As Current &#x2714;</button>
            ) : (
              <button type="button" className="dropdown-item" onClick={this.toggleSetCurrentForm.bind(this)}>Set As Current</button>
            )}
            <div className="dropdown-divider"></div>
            <button type="button" className="dropdown-item" onClick={this.toggleRemoveForm.bind(this)}>Remove</button>
          </div>
        )}

        {this.state.showEditForm && (
          <div className="rounded p-3 mt-3 w-100 bg-white clearfix">
              <div className="mb-2">
                <input className="form-control" type="text" placeholder="Device Name" ref="deviceName" value={this.state.inputName || name} onChange={this.onNameChange.bind(this)} />
              </div>
              {this.state.sending ? (<div className="mt-2 text-warning text-center">Sending...</div>) : (
                <div>
                  <button type="submit" className="btn btn-primary" onClick={this.handleEditDevice.bind(this)}>Save</button>
                  <button type="button" className="btn btn-secondary float-right" onClick={this.toggleEditForm.bind(this)}>Close</button>
                </div>
              )}
              {this.state.error && (<div className="mt-2 text-danger text-center">{this.state.error}</div>)}
          </div>
        )}

        {this.state.showSetCurrentForm && (
          <div className="rounded p-3 mt-3 w-100 bg-white clearfix">
            <div className="mb-2 text-center">
              {currentDeviceId == id ? ('Unset') : ('Set')} as current device?
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleSetCurrent.bind(this)}>{currentDeviceId == id ? ('Unset') : ('Set')}</button>
            <button type="button" className="btn btn-secondary float-right" onClick={this.toggleSetCurrentForm.bind(this)}>Close</button>
          </div>
        )}

        {this.state.showRemoveForm && (
          <div className="rounded p-3 mt-3 w-100 bg-white clearfix">
            <div className="mb-2 text-center">Remove this device?</div>
            {this.state.sending ? (<div className="mt-2 text-warning text-center">Removing...</div>) : (
              <div>
                <button type="submit" className="btn btn-danger" onClick={this.handleRemove.bind(this)}>Remove</button>
                <button type="button" className="btn btn-secondary float-right" onClick={this.toggleRemoveForm.bind(this)}>Close</button>
              </div>
            )}
            {this.state.error && (<div className="mt-2 text-danger text-center">{this.state.error}</div>)}
          </div>
        )}
      </li>
    );
  }
}


const mapStateToProps = state => ({
  currentDeviceId: state.devices.currentDeviceId,
  focusDeviceId: state.devices.focusDeviceId,
  actionDevice: state.devices.actionDevice,
});

const mapDispatchToProps = dispatch => ({
  viewItem: (name) => {
    dispatch(devicesActions.viewItem(name));
  },
  setDevice: (device) => {
    dispatch(devicesActions.setDevice(device));
  },
  removeDevice: (device) => {
    dispatch(devicesActions.removeDevice(device));
  },
  setCurrentDevice: (device) => {
    dispatch(devicesActions.setCurrentDevice(device));
  },
  setFocusDevice: (device) => {
    dispatch(devicesActions.setFocusDevice(device));
  },
  selectDevice: (device) => {
    dispatch(devicesActions.selectDevice(device));
  },
  unselectDevice: () => {
    dispatch(devicesActions.unselectDevice());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Device);
