import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import './styles.css'

import axios from 'axios'

export default function GoogleMapComp({
  GetCoordinate,
  getGoogleAdress,
  currentCoord,
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_API_KEY',
  })
  if (!isLoaded) return 'loading...'
  return (
    <>
      {currentCoord.lng ? (
        <Map
          GetCoordinate={GetCoordinate}
          getGoogleAdress={getGoogleAdress}
          currentCoord={currentCoord}
        />
      ) : (
        'Google Map Loading....'
      )}
    </>
  )
}

function Map({ GetCoordinate, getGoogleAdress, currentCoord }) {
  const googleMapsApiKey = 'YOUR_GOOGLE_API_KEY'

  const [markerProps, setMarkerProps] = useState([
    {
      lat: 37.77,
      lng: -122.42,
    },
  ])

  const onMarkerDragEnd = (coord) => {
    let lat = coord.latLng.lat()
    let lng = coord.latLng.lng()
    let address
    let city
    let country
    let state
    setMarkerProps(() => ({
      ...markerProps,
      lat: lat,
      lng: lng,
    }))
    ///// get address from lat and lng

    axios
      .get(
        `https://maps.google.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}`
      )

      .then((response) => {
        address = response.data.results[0].address_components

        getGoogleAdress(address)
        city = address[2]
        state = address[3]
        country = address[4]

        GetCoordinate(
          coord.latLng.lat(),
          coord.latLng.lng(),
          city,
          state,
          country
        )
      })
  }
  return (
    <>
      {currentCoord && (
        <GoogleMap
          zoom={10}
          center={currentCoord}
          mapContainerClassName='map-container'
        >
          <Marker
            position={currentCoord}
            draggable={true}
            onDragEnd={(coord) => onMarkerDragEnd(coord)}
          ></Marker>
        </GoogleMap>
      )}
    </>
  )
}
