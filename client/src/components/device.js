import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as devicesActions from '../actions/devices_actions';

class Device extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDevice: null,
      inputName: null,
      isCurrent: props.currentDeviceId == props.id,
      showMenu: false,
      showEditForm: false,
      editing: false,
      editError: false,
      showSetCurrentForm: false,
      showRemoveForm: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    let state = null;
    if (this.state.isCurrent != (nextProps.currentDeviceId == this.props.currentDeviceId)) {
      state = { ...state, isCurrent: !this.state.isCurrent };
    }
    if (this.state.selectedDevice && !this.props.selectedDevice) {
      state = { ...state, showMenu: false, showEditForm: false, showSetCurrentForm: false, showRemoveForm: false };
    } else if (!this.state.selectedDevice && this.props.selectedDevice && this.props.selectedDevice.id == this.props.id) {
      state = { ...state, showMenu: true, selectedDevice: this.props.selectedDevice };
    }
    if (state) {
      console.log('---Device.componentWillReceiveProps:', nextProps)
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
    this.props.removeDevice(this.props.id);
  }

  toggleMenu(e) {
    e.preventDefault();
    this.setState({ showMenu: !this.state.showMenu, showEditForm: false, showSetCurrentForm: false, showRemoveForm: false });
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
    this.setState({ showEditForm: false });
    this.props.setDevice({ name: name, id: this.props.id });
  }

  toggleSetCurrentForm() {
    this.setState({ showMenu: false, showSetCurrentForm: !this.state.showSetCurrentForm });
  }

  handleSetCurrent(e) {
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
            {this.state.editing ? (
              <div className="mb-2 text-center">Editing</div>
            ) : (
              <div className="mb-2">
                <input className="form-control" type="text" placeholder="Device Name" ref="deviceName" value={this.state.inputName || name} onChange={this.onNameChange.bind(this)} />
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.handleEditDevice.bind(this)}>Save</button>
              <button type="button" className="btn btn-secondary float-right" onClick={this.toggleEditForm.bind(this)}>Close</button>
              {this.state.editError && this.state.editError.message && (
                <div className="mt-2 text-danger text-center">{this.state.editError.message}</div>
              )}
            )}
          </div>
        )}

        {this.state.showSetCurrentForm && (
          <div className="rounded p-3 mt-3 w-100 bg-white clearfix">
            <div className="mb-2 text-center">
              {currentDeviceId == id ? ('Unset') : ('Set')} as current device?
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.handleSetCurrent.bind(this)}>{this.state.isCurrent? ('Unset') : ('Set')}</button>
            <button type="button" className="btn btn-secondary float-right" onClick={this.toggleSetCurrentForm.bind(this)}>Close</button>
          </div>
        )}

        {this.state.showRemoveForm && (
          <div className="rounded p-3 mt-3 w-100 bg-white clearfix">
            <div className="mb-2 text-center">Remove this device?</div>
            <button type="submit" className="btn btn-danger" onClick={this.handleRemove.bind(this)}>Remove</button>
            <button type="button" className="btn btn-secondary float-right" onClick={this.toggleRemoveForm.bind(this)}>Close</button>
          </div>
        )}
      </li>
    );
  }
}


const mapStateToProps = state => ({
  editing: state.devices.editing,
  editError: state.devices.editError,

  currentDeviceId: state.devices.currentDeviceId,
  focusDeviceId: state.devices.focusDeviceId,
  selectedDevice: state.devices.selectedDevice,
});

const mapDispatchToProps = dispatch => ({
  viewItem: (name) => {
    dispatch(devicesActions.viewItem(name));
  },
  setDevice: (device) => {
    dispatch(devicesActions.setDevice(device));
  },
  removeDevice: (id) => {
    dispatch(devicesActions.removeDevice(id));
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
//export default Device;
