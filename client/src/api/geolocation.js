

export const getCurrentPosition = () => {
  console.log('---api run getCurrentPosition')
  return new Promise(function (resolve, reject) {
    try {
      navigator.geolocation.getCurrentPosition((function (position) {
        console.log('---api getCurrentPosition: ', position)
        resolve(position)
      }).bind(this), function (geo_error) {
        reject(geo_error)
        console.error('---api getCurrentPosition error: ', geo_error)
      });
    } catch (e) {
        reject(e)
        console.error('---api getCurrentPosition error: ', geo_error)
    }
  })
}

var watchID = null;
export const subscribeWatchPosition = (callback) => {
  console.log('---api subscribeWatchPosition')
  if (navigator.geolocation) {
    var watchOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 30000
    };
    navigator.geolocation.clearWatch(watchID);
    watchID = navigator.geolocation.watchPosition(function (position) {
      console.log('---api watchPosition:', position.coords)
      let coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      callback(coords);
    }, function (err) {
      console.warn('---api watchPosition error:', err)
    }, watchOptions);
  }
}
