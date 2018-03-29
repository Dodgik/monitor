import { put, call, } from 'redux-saga/effects'
import * as actions from '../actions/geolocation_actions'

export const getCurrentPosition = () => {
  console.log('---api run getCurrentPosition')
  return new Promise(function (resolve, reject) {
    try {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log('---api getCurrentPosition response: ', position)
        let coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        resolve(coords)
      }, function (geo_error) {
        reject(geo_error)
        console.error('---api getCurrentPosition error: ', geo_error)
      },{ timeout: 5000 });
    } catch (e) {
        reject(e)
        console.error('---api getCurrentPosition error: ', geo_error)
    }
  })
}

export const getPosition = () => {
  console.log('---api run getCurrentPosition')
  return getCurrentPosition()
    .then(coords => {
      return { response: coords }
    })
    .catch(error => {
      return { error: error }
    })
}

var watchOptions = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 30000
};

var watchID = null;
/*
export const subscribeWatchPosition = (callback) => {
  console.log('---api subscribeWatchPosition')
  if (navigator.geolocation) {
    navigator.geolocation.clearWatch(watchID);
    watchID = navigator.geolocation.watchPosition(function (position) {
      console.log('---api subscribeWatchPosition result:', position.coords)
      let coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }

      callback instanceof Function && callback(coords);
    }, function (err) {
      console.warn('---api subscribeWatchPosition error:', err)
      actions.receiveCurrentPositionFail(coords)
    }, watchOptions);
  }
  return watchID
}
export const unsubscribeWatchPosition = (watchID) => {
    navigator.geolocation.clearWatch(watchID);
}
*/
export const subscribeWatchPosition = (callback) => {
  console.log('---api subscribeWatchPosition')
  return setInterval(function (err) {
      let coords = {
        latitude: 10,
        longitude: 11
      }
      console.warn('---api subscribeWatchPosition result:', coords)
      //throw coords 
      callback(coords)
    }, 5000);
}
export const unsubscribeWatchPosition = (watchID) => {
    clearInterval(watchID);
}

export const watchPosition = () => {
  console.log('---api watchPosition')
  let deferred
  if (navigator.geolocation) {
    navigator.geolocation.clearWatch(watchID);
    watchID = navigator.geolocation.watchPosition(function (position) {
      console.log('---api watchPosition:', position.coords)
      let coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }

      if (deferred) {
        deferred.resolve(coords)
        deferred = null 
      }
    }, function (err) {
      console.warn('---api watchPosition error:', err)
      actions.receiveCurrentPositionFail(coords)
    }, watchOptions);
  }

  if (!deferred) {
    deferred = {}
    deferred.promise = new Promise(resolve => deferred.resolve = resolve)
  }
  return deferred.promise
}