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
          <InfoWindow onCloseClick={this.handleCloseInfoClick} zIndex={zIndex}>
            <div style={infoStyle}>{name}</div>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}


const GMap = compose(
  withProps({

    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} id="map" />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)((props) =>
  <GoogleMap {...props.mapProps}>
    {props.list.map((device) => {
      if (device.latitude) {
        return <DeviceMarker key={device.id} {...device} currentDeviceId={props.currentDeviceId} focusDeviceId={props.focusDeviceId}/>
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
  
  getCenter(props) {
    let center = null;
    let { list, currentDeviceId, focusDeviceId, currentPosition } = props
    list.map(device => {
      const { id, latitude, longitude } = device;
      if (latitude) {
        if (!center && id == currentDeviceId) {
          center = { lat: latitude, lng: longitude }
        } else if (id == focusDeviceId) {
          center = { lat: latitude, lng: longitude }
        }
      }
    })

    if (!center && currentPosition && currentPosition.latitude) {
      center = { lat: currentPosition.latitude, lng: currentPosition.longitude }
    }
    console.log('---getCenter:', center)
    return center
  }

  getDefaultCenter(props) {
    let center = this.getCenter(props);
    if (!center && props.list.length) {
      center = {
        lat: props.list[0].latitude,
        lng: props.list[0].longitude
      }
    }
    console.log('---getDefaultCunter:', center)
    return center
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
  }

  googleMapURL(key) {
    return `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`;
  }

  render() {
    console.warn('---Map: render->props: ', this.props);
    console.warn('---Map: render->state: ', this.state);
    const googleMapURL = this.googleMapURL(this.props.maps_api_key)
    console.warn('---Map: render->googleMapURL: ', googleMapURL);
    return (
      <GMap
        googleMapURL={googleMapURL}
        mapProps={this.state.mapProps}
        list={this.props.list}
        currentDeviceId={this.props.currentDeviceId}
        focusDeviceId={this.props.focusDeviceId}
      />
    )
  }
}

const mapStateToProps = state => ({
  maps_api_key: state.api.maps_api_key,
  currentPosition: state.currentPosition,
  list: state.devices.list,
  currentDeviceId: state.devices.currentDeviceId,
  focusDeviceId: state.devices.focusDeviceId,
});

export default connect(mapStateToProps)(Map);
