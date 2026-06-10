import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";

import worldAtlas from "world-atlas/countries-110m.json";

const geoUrl = worldAtlas;

const markers = [
  { markerOffset: -15, name: "San Francisco", coordinates: [-122.4194, 37.7749] },
  { markerOffset: -15, name: "New York", coordinates: [-74.0059, 40.7128] },
  { markerOffset: 25, name: "London", coordinates: [-0.1278, 51.5074] },
  { markerOffset: 25, name: "Tokyo", coordinates: [139.6917, 35.6895] },
  { markerOffset: 25, name: "Singapore", coordinates: [103.8198, 1.3521] },
];

export function WorldMapSVG() {
  return (
    <div className="w-full max-w-[600px] mx-auto opacity-80 pointer-events-none">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [0, 30]
        }}
        width={800}
        height={400}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#ffffff"
                fillOpacity={0.02}
                stroke="#22d3ee"
                strokeWidth={1}
                strokeOpacity={0.8}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates as [number, number]}>
            <circle r={2.5} fill="#22d3ee" className="animate-pulse" />
            <circle r={6} fill="#22d3ee" opacity={0.3} className="animate-ping" />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
