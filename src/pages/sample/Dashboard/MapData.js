import React, { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup,
} from 'react-simple-maps'
import ReactTooltip from 'react-tooltip'
const MapData = () => {
  const [content, setContent] = useState('')
  const geoUrl =
    'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'

  const markers = [
    { markerOffset: -15, name: 'Sau Paulo', coordinates: [-58.3815, -34.6037] },
  ]
  return (
    <>
      <ReactTooltip>{content}</ReactTooltip>
      <ComposableMap data-tip=''>
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { name } = geo.properties

                    setContent(`${name}`)
                  }}
                  onClick={() => {
                    const { name } = geo.properties

                    setContent(`${name}`)
                  }}
                  onMouseLeave={() => {
                    setContent('')
                  }}
                  style={{
                    hover: {
                      fill: '#F53',
                      outline: 'none',
                    },
                  }}
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={10} fill='#F00' stroke='#fff' strokeWidth={2} />
              <text>{name}</text>
            </Marker>
          ))}
          <Annotation
            subject={[2.3522, 48.8566]}
            dx={-90}
            dy={-30}
            connectorProps={{
              stroke: '#FF5933',
              strokeWidth: 3,
              strokeLinecap: 'round',
            }}
          >
            <text>Paris</text>
          </Annotation>
        </ZoomableGroup>
      </ComposableMap>
    </>
  )
}

export default MapData
