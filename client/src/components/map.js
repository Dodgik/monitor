import React from 'react';
import { compose, withProps, lifecycle } from 'recompose'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from 'react-google-maps';
import { connect } from 'react-redux';

import { requestSetDevicePosition } from '../actions/devices_actions';


const GMap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAWXZwnl9PDC6_pu6I6vfODtuJ3BipQibY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} id="map" />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)((props) =>
  <GoogleMap zoom={props.zoom} center={props.center}>
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} onClick={props.onMarkerClick} />
    )}
    {props.devices.map((device, index) => {
      if (device.latitude) {
        let infoStyle = {}
        if (device.id == props.currentDeviceId) {
          infoStyle = { fontWeight: 'bold' }
        }
        if (device.id == props.focusDeviceId) {
          infoStyle = { ...infoStyle, backgroundColor: `yellow`, padding: '5px' }
        }
        return (
          <Marker key={device.id} position={{ lat: device.latitude, lng: device.longitude }} onClick={props.onMarkerClick} title={device.name} >
            <InfoWindow>
              <div style={infoStyle}>{device.name}</div>
            </InfoWindow>
          </Marker>
        )
      }
    }
    )}
  </GoogleMap>
);


class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      zoom: 8,
      isMarkerShown: true,
      center: this.getCunter(props),
      markers: [],
    }
  }

  getCunter(props) {
    let center = null;
    let { list, currentDeviceId, focusDeviceId } = props.devices
    list.map(device => {
      if (device.latitude) {
        if (device.id == currentDeviceId) {
          center = { lat: device.latitude, lng: device.longitude }
        }
        if (device.id == focusDeviceId) {
          center = { lat: device.latitude, lng: device.longitude }
        }
      }
    })
    console.log('---getCunter:', center)
    return center
  }

  componentWillMount() {
    console.log('---Map.componentWillMount:', this.props)
  }

  componentDidMount() {
    console.log('---Map.componentDidMount:', this.props)
    this.delayedShowMarker()
    this.getCurrentPosition()
  }

  componentWillReceiveProps(nextProps) {
    console.log('---Map.componentWillReceiveProps:', nextProps)
    this.setState({
      center: this.getCunter(nextProps)
    });
    if (nextProps.currentDeviceId != this.props.currentDeviceId) {
      this.updateCurrentPosition();
    }
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    if (this.state.zoom < 18) {
      this.setState({ zoom: this.state.zoom + 1 })
    }
  }
  getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((function (position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        console.log('---position:', pos)
        //infoWindow.setPosition(pos);
        //infoWindow.setContent('Location found.');
        //map.setCenter(pos);
        //this.setState({ center: pos, markers: [{ position: pos }] })
        //this.setState({ center: pos, markers: [{ position: pos }] })
        if (this.props.currentDeviceId) {
          let device = {
            id: this.props.currentDeviceId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          this.props.setDevicePosition(device)
        }
      }).bind(this), function (err) {
        console.warn('---error:')
        console.warn(err)
        //handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      console.warn('---error: Browser does not support Geolocation')
      //handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  updateCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((function (position) {
        console.log('---updateCurrentPosition:', position.coords)
        if (this.props.currentDeviceId) {
          let device = {
            id: this.props.currentDeviceId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          this.props.setDevicePosition(device)
        }
      }).bind(this), function (err) {
        console.warn('---updateCurrentPosition error:', err)
      });
    }
  }

  render() {
    console.warn('---Map: render->props: ', this.props);
    console.warn('---Map: render->state: ', this.state);
    return (
      <GMap
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        center={this.state.center}
        markers={this.state.markers}
        zoom={this.state.zoom}
        devices={this.props.devices.list}
        currentDeviceId={this.props.devices.currentDeviceId}
        focusDeviceId={this.props.devices.focusDeviceId}
      />
    )
  }
}

const mapStateToProps = state => ({
  devices: state.devices,
  list: state.devices.list,
  currentDeviceId: state.devices.currentDeviceId,
  focusDeviceId: state.devices.focusDeviceId,
});


const mapDispatchToProps = dispatch => ({
  setDevicePosition: (device) => {
    dispatch(requestSetDevicePosition(device));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
//export default Map;
