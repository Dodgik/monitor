import React from 'react';
import {
    Marker,
    InfoWindow,
} from 'react-google-maps';

class DeviceMarker extends React.Component {
  
  state = {
    showInfo: true
  }

  handleClick = () => {
    this.setState({ showInfo: true })
  }
  handleCloseInfoClick = () => {
    this.setState({ showInfo: false })
  }

  render() {
    //console.log('---DeviceMarker.render:', this.props)
    let { id, latitude, longitude, name, currentDeviceId, focusDeviceId } = this.props
    let zIndex = 1
    let infoStyle = {}
    if (id == currentDeviceId) {
      infoStyle = { fontWeight: 'bold' }
      zIndex = 2
    }
    if (id == focusDeviceId) {
      infoStyle = { ...infoStyle, backgroundColor: 'yellow', padding: '5px' }
      zIndex = 3
    }
    return (
      <Marker key={id} position={{ lat: latitude, lng: longitude }} title={name} onClick={this.handleClick} zIndex={zIndex} >
        {this.state.showInfo && (
          <InfoWindow onCloseClick={this.handleCloseInfoClick} zIndex={zIndex}>
            <div style={infoStyle}>{name}</div>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}

export default DeviceMarker;