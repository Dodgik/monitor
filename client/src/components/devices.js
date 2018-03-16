import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { previewItem, viewItem, addItem, removeItem, requestAddDevice, requestRemoveDevice } from '../actions/devices_actions';
//import ItemView from '../components/list_item_view';

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddForm: false
    }
  }

  handleShowItem(item, e) {
    console.warn('-->Devices.handleShowItem: ', item);
    e.preventDefault();
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

  handleRemoveItem(id, e) {
    console.warn('-->Devices.handleRemoveItem: ', id);
    e.stopPropagation();
    e.preventDefault();
    this.props.removeItem(id);
  }

  render() {
    console.warn('-->Devices.render:', this.props);
    const { list } = this.props.devices;

    return (
      <div className="devices">
        <ul className="list-group list-group-item-action">
          {
            list.map((device) => {
              let className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center list-group-item-primary';
              return (
                <li key={device.id} className={className} onClick={this.handleShowItem.bind(this, device)} style={{ cursor: 'pointer' }}>
                  {device.name}
                  <div className="device-actions">
                    <span className="badge badge-info badge-pill mr-3">i</span>
                    <span className="badge badge-danger" onClick={this.handleRemoveItem.bind(this, device.id)}>x</span>
                  </div>
                </li>
              );
            })
          }
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
              <li onClick={this.handleOpenAddForm.bind(this)} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center list-group-item-dark show" style={{ cursor: 'pointer' }}>
              Add new device
            </li>
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
  viewItem: (name) => {
    dispatch(viewItem(name));
  },
  addItem: (device) => {
    dispatch(requestAddDevice(device));
  },
  removeItem: (id) => {
    dispatch(requestRemoveDevice(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
//export default Devices;
