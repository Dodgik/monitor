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
    console.log('---DeviceMarker.render:', this.props)
    let { id, latitude, longitude, name, currentDeviceId, focusDeviceId } = this.props;
    let zIndex = 1;
    let infoStyle = {}
    if (id == currentDeviceId) {
      infoStyle = { fontWeight: 'bold' }
      zIndex = 2;
    }
    if (id == focusDeviceId) {
      infoStyle = { ...infoStyle, backgroundColor: `yellow`, padding: '5px' }
      zIndex = 3;
    }
    return (
      <Marker key={id} position={{ lat: latitude, lng: longitude }} title={name} onClick={this.handleClick} zIndex={zIndex} >
        {this.state.showInfo && (
          <InfoWindow onCloseClick={this.handleCloseInfoClick}>
            <div style={infoStyle}>{name}</div>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}

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
  <GoogleMap {...props.mapProps}>
    {props.devices.map((device, index) => {
      if (device.latitude) {
        return (
          <DeviceMarker key={device.id} {...device} currentDeviceId={props.currentDeviceId} focusDeviceId={props.focusDeviceId}/>
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
      mapProps: {
        zoom: 8,
        center: this.getDefaultCenter(props),
      },
    }
  }

  setCenter(coords) {
    console.log('---setCenter:', coords)

    let center = {
      lat: coords.latitude,
      lng: coords.longitude
    }
    this.setState({
      mapProps: {
        ...this.state.mapProps,
        center: center
      }
    })
  }

  getCenter(props) {
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
    console.log('---getCenter:', center)
    return center
  }

  getDefaultCenter(props) {
    let center = this.getCenter(props);
    if (!center) {
      let { list } = props.devices
      if (list.length) {
        center = { lat: list[0].latitude, lng: list[0].longitude }
      }
    }
    console.log('---getDefaultCunter:', center)
    return center
  }

  componentWillMount() {
    console.log('---Map.componentWillMount:', this.props)
  }

  componentDidMount() {
    console.log('---Map.componentDidMount:', this.props)
    //this.updateCurrentPosition()

    /*
    this.getCurrentPosition().then(position => {
      console.log('---setDefaultCunter in getCurrentPosition:', position.coords)
      this.setCenter(position.coords)
      /*
      if (this.props.currentDeviceId) {
          let device = {
            id: this.props.currentDeviceId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          console.log('---updateCurrentPosition:', device)
          this.props.setDevicePosition(device)
      }
      */
    //})
    //this.subscribeWatchPosition();
  }

  componentWillReceiveProps(nextProps) {
    console.log('---Map.componentWillReceiveProps:', nextProps)
    let newCenter = this.getCenter(nextProps)
    if (newCenter) {
      let { center } = this.state.mapProps;
      if (!center || center.lat != newCenter.lat || center.lng != newCenter.lng) {
        this.setState({ mapProps: { ...this.state.mapProps, center: newCenter } })
      }
    }
    if (nextProps.currentDeviceId != this.props.currentDeviceId) {
      this.updateCurrentPosition();
    }
  }
  
  getCurrentPosition = () => {
    return new Promise(function (resolve, reject) {
      try {
        navigator.geolocation.getCurrentPosition((function (position) {
          console.log('---getCurrentPosition: ', position)
          resolve(position)
        }).bind(this), function (geo_error) {
          reject(geo_error)
          console.error('---getCurrentPosition error: ', geo_error)
        });
      } catch (e) {
          reject(e)
          console.error('---getCurrentPosition error: ', geo_error)
      }
    })
  }

  updateCurrentPosition = () => {
    if (this.props.currentDeviceId) {
      /*
      this.getCurrentPosition().then(pos => {
        let device = {
          id: this.props.currentDeviceId,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        console.log('---updateCurrentPosition:', device)
        this.props.setDevicePosition(device)
      })
      */
    }
  }

  subscribeWatchPosition = () => {
    if (navigator.geolocation) {
      var watchOptions = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 30000
      };
      //navigator.geolocation.clearWatch(watchID);
      var watchID = navigator.geolocation.watchPosition((function (position) {
        console.log('---watchPosition:', position.coords)
        if (this.props.currentDeviceId) {
          let device = {
            id: this.props.currentDeviceId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          this.props.setDevicePosition(device)
        }
      }).bind(this), function (err) {
        console.warn('---watchPosition error:', err)
      }, watchOptions);
    }
  }

  render() {
    console.warn('---Map: render->props: ', this.props);
    console.warn('---Map: render->state: ', this.state);
    return (
      <GMap
        mapProps={this.state.mapProps}
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
