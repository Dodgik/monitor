import React from 'react';
import { compose, withProps, lifecycle } from 'recompose'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';


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
    </GoogleMap>
);


class Map extends React.PureComponent {
    state = {
        zoom: 8,
        isMarkerShown: false,
        center: null,
        markers: [],
    }

    componentWillMount() {
    }

    componentDidMount() {
        console.log('---is componentDidMount:')
        this.delayedShowMarker()
        this.getCurrentPosition()

        console.log('---is componentDidMount2:')

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
                this.setState({ center: pos, markers: [{ position: pos }] })
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

    render() {
        return (
            <GMap
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
                center={this.state.center}
                markers={this.state.markers}
                zoom={this.state.zoom}
            />
        )
    }
}

export default Map;