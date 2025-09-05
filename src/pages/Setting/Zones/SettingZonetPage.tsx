import React, { useRef } from 'react';
import { MapContainer, ImageOverlay, FeatureGroup } from 'react-leaflet';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

type Props = {
  imageUrl: string; // path to your wrapper image
  width: number; // image width in px
  height: number; // image height in px
  onPolygonSaved?: (polygon: { x: number; y: number }[]) => void;
};

const SetingZone: React.FC = () => {
  const imageUrl =
    'https://img.apmcdn.org/165f5c766fb1906b75cbc3ea32874b890fc032f3/widescreen/d172a5-20250430-people-wait-in-line-at-a-starbucks-webp2000.webp';
  const width = 2000;
  const height = 1124;
  const featureGroupRef = useRef<L.FeatureGroup>(null);

  const handleCreated = (e: any) => {
    // eslint-disable-next-line no-debugger
    debugger;

    const layer = e.layer;
    const geojson = layer.toGeoJSON();

    // coordinates: [[x1, y1], [x2, y2], ...]
    const coords = geojson.geometry.coordinates[0];

    // Absolute pixel positions
    const pixelPositions = coords.map(([x, y]: [number, number]) => ({
      x,
      y,
    }));

    // Normalized positions (0–1 range)
    const normalizedPositions = coords.map(([x, y]: [number, number]) => ({
      x: x / width,
      y: y / height,
    }));

    console.log('Pixel positions:', pixelPositions);
    console.log('Normalized positions:', normalizedPositions);

    // Send to backend
    fetch('/api/zones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        polygon: pixelPositions,
        imageSize: { width, height },
      }),
    });

    // Callback for parent
    // if (onPolygonSaved) {
    //   onPolygonSaved(pixelPositions);
    // }
  };

  const bounds: [[number, number], [number, number]] = [
    [0, 0],
    [height, width],
  ];

  return (
    <MapContainer
      crs={L.CRS.Simple}
      center={[height / 2, width / 2]}
      zoom={-1}
      minZoom={-4}
      maxZoom={2}
      style={{ height: '100vh', width: '100%' }}
    >
      {/* Wrapper image */}
      <ImageOverlay url={imageUrl} bounds={bounds} />

      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position='topright'
          onCreated={handleCreated}
          draw={{
            polyline: false,
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polygon: true,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default SetingZone;
