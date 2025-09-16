import React, { useRef, useEffect, useState } from 'react';
import { dataFrameFromCamera } from './types.ts';
import { dataFrameDefault } from './constant.ts';
import ComponentCard from 'src/src/components/common/ComponentCard.tsx';
import { MapContainer, ImageOverlay, FeatureGroup, Polygon, useMap } from 'react-leaflet';
import L from 'leaflet';
import SearchForm from './SearchForm.tsx';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useLazyGetStreamingListQuery } from 'src/src/api-request/Streaaming.api.ts';

export default function MediaList() {
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const [dataFrame, setDataFrameFromCamera] = useState<dataFrameFromCamera>(dataFrameDefault);

  const [getStreamingList, { data, isFetching }] = useLazyGetStreamingListQuery();

  useEffect(() => {
    getStreamingList();
    console.log('isFetching', isFetching);

    console.log(data);
  }, [data]);

  const cameras = data; // <-- use API data

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

  const getDataFrame = (data: any) => {
    setDataFrameFromCamera(data);
    setImageSize(null);
    // handle search later
  };

  const width = imageSize?.width ?? 0;
  const height = imageSize?.height ?? 0;

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

  console.log(dataFrame, 'dataFrame');

  return (
    <>
      <ComponentCard className='mb-[20px]' title='Search'>
        <SearchForm getDataFrame={getDataFrame} />
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
          </MapContainer>
        </div>
      )}
    </>
  );
}
