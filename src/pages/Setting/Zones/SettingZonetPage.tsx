import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, ImageOverlay, FeatureGroup, Polygon, useMap } from 'react-leaflet';
import { useCreateZoneMutation } from '@/api-request/Setting.api';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import { dataZone } from './constant.ts';

type Point = { x: number; y: number };

const SetingZone: React.FC = () => {
  const imageUrl = dataZone.frame_base64;
  const featureGroupRef = useRef<L.FeatureGroup>(null);

  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const [createZone] = useCreateZoneMutation();

  // 🔹 Load natural image size
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [imageUrl]);

  if (!imageSize) return <div>Loading image...</div>;

  const { width, height } = imageSize;

  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

  const pixelsToNormalized = (pts: [number, number][]) =>
    pts.map(([x, y]) => ({
      x: clamp(x, 0, width) / width,
      y: clamp(height - y, 0, height) / height, // flip Y here ✅
    }));

  const normalizedToLatLngs = (zone: Point[]) => zone.map((p) => [p.y * height, p.x * width]) as [number, number][];

  const existingZone: Point[] = pixelsToNormalized(dataZone.points as [number, number][]);

  // 🔹 Reusable save logic
  const savePolygon = (layers: any) => {
    layers.eachLayer((layer: any) => {
      const geojson = layer.toGeoJSON();
      const coords = geojson.geometry.coordinates[0] as [number, number][];
      console.log(`coords:`, coords);
      const data = {
        camera_id: '1',
        zone_name: 'order',
        points: coords,
      };
      createZone(data);
    });
  };

  // 🔹 Wrap created layer
  const handleCreated = (e: any) => {
    const fakeGroup = new L.FeatureGroup();
    fakeGroup.addLayer(e.layer);
    savePolygon(fakeGroup);
  };

  // 🔹 Directly use edited group
  const handleEdited = (e: any) => {
    savePolygon(e.layers);
  };

  // ===============================
  // 🔹 Map setup
  // ===============================
  const bounds: [[number, number], [number, number]] = [
    [0, 0],
    [height, width],
  ];

  function FitImageBounds() {
    const map = useMap();
    useEffect(() => {
      map.fitBounds(bounds);
    }, [map]);
    return null;
  }

  return (
    <div style={{ width: '100%', height: '100vh', background: '#888' }}>
      <MapContainer
        crs={L.CRS.Simple}
        bounds={bounds}
        style={{ width: '100%', height: '100%' }}
        zoom={0}
        scrollWheelZoom={true}
        attributionControl={false}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
      >
        <ImageOverlay url={imageUrl} bounds={bounds} />
        <FitImageBounds />

        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position='topright'
            onCreated={handleCreated}
            onEdited={handleEdited}
            draw={{
              polyline: false,
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polygon: true,
            }}
          />

          {/* Existing polygon (from backend, converted to leaflet coords) */}
          <Polygon
            positions={normalizedToLatLngs(existingZone)}
            pathOptions={{ color: 'red' }} // show as blue ✅
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default SetingZone;
