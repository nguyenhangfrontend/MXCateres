import ComponentCard from '@/components/common/ComponentCard';
import { EvidenceFrameType } from './types';
import { useRef } from 'react';

export default function UserFrame(envidence: EvidenceFrameType) {
  const imageRef = useRef(null);
  return (
    <>
      <div className='space-y-6'>
        <ComponentCard title='Customer information'>
          <div className='list-user-image'>
            <img
              srcSet={`${envidence.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${envidence.imageUrl}?w=164&h=164&fit=crop&auto=format`}
              loading='lazy'
              ref={imageRef}
            />
            <div className='frames'>
              <div className='frame-item'>
                <div className='frame-item-line'>b</div>
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
