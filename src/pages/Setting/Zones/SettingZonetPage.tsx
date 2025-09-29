import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, ImageOverlay, FeatureGroup, Polygon, useMap } from 'react-leaflet';
import { useCreateZoneMutation } from '@/api-request/Setting.api';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

import { dataFrameDefault } from './constant.ts';
import ComponentCard from 'src/src/components/common/ComponentCard.tsx';
import SearchForm from './SearchForm.tsx';
import { dataFrameFromCamera } from './types.ts';
import { Loading } from 'src/src/components/ui/loading/index.tsx';

type Point = { x: number; y: number };

const SetingZone: React.FC = () => {
  // const imageUrl = dataZone.frame_base64;
  const featureGroupRef = useRef<L.FeatureGroup>(null);

  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const [dataFrame, setDataFrameFromCamera] = useState<dataFrameFromCamera>(dataFrameDefault);
  const [status, setStatus] = useState<string>('');
  const [dataFormChange, setSearchForm] = useState<any>();
  const [createZone] = useCreateZoneMutation();

  // console.log(dataFrame, "dataFrame");

  // 🔹 Load natural image size
  useEffect(() => {
    if (dataFrame?.frame_base64) {
      const img = new Image();
      img.src = dataFrame?.frame_base64;
      img.onload = () => {
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
      };
    }
  }, [dataFrame, dataFrame?.frame_base64]);

  const width = imageSize?.width ?? 0;
  const height = imageSize?.height ?? 0;

  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

  const pixelsToNormalized = (pts: [number, number][]) =>
    pts.map(([x, y]) => ({
      x: clamp(x, 0, width) / width,
      y: clamp(height - y, 0, height) / height, // flip Y here ✅
    }));

  const normalizedToLatLngs = (zone: Point[]) => zone.map((p) => [p.y * height, p.x * width]) as [number, number][];

  const existingZone: Point[] = pixelsToNormalized(dataFrame.points as [number, number][]);

  // 🔹 Reusable save logic
  const savePolygon = (layers: any) => {
    console.log('dataFormChange', dataFormChange?.zone_name);
    // console.log('layers', layers);
    if (layers) {
      layers.eachLayer((layer: any) => {
        const geojson = layer.toGeoJSON();
        const coords = geojson.geometry.coordinates[0] as [number, number][];
        const points = coords.map(([x, y]) => {
          return [clamp(x, 0, width), clamp(height - y, 0, height)];
        });
        const data = {
          camera_id: dataFormChange?.camera_id,
          zone_name: dataFormChange?.zone_name,
          points: points,
        };
        createZone(data);
      });
    } else {
      const data = {
        camera_id: dataFormChange?.camera_id,
        zone_name: dataFormChange?.zone_name,
        points: [],
      };
      createZone(data);
    }
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
  const handleDeleted = () => {
    savePolygon(undefined);
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

  const getDataFrame = (data: any) => {
    setDataFrameFromCamera(data);
    setImageSize(null);
    // handle search later
  };

  const getStatus = (status: string) => {
    setStatus(status);
  };
  const getDataSearch = (data: any) => {
    setSearchForm(data);
    // handle search later
  };
  return (
    <>
      <Loading isOpen={status === 'pending'} />
      <ComponentCard className='mb-[20px]' title='Search'>
        <SearchForm getStatus={getStatus} getDataSearch={getDataSearch} getDataFrame={getDataFrame} />
      </ComponentCard>
      {imageSize && (
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
            <ImageOverlay url={dataFrame?.frame_base64} bounds={bounds} />
            <FitImageBounds />

            <FeatureGroup ref={featureGroupRef}>
              <EditControl
                position='topright'
                onCreated={handleCreated}
                onEdited={handleEdited}
                onDeleted={handleDeleted}
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
      )}
    </>
  );
};

export default SetingZone;
