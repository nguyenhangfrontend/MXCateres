import ComponentCard from '@/components/common/ComponentCard';
import { ImageList, ImageListItem } from '@mui/material';
import { envidenceType } from 'src/src/pages/WaitingTime/types';

type EnvidentFrameDetailProps = {
  envidenceData: envidenceType | undefined;
};

export default function EnvidentFrameDetail({ envidenceData }: EnvidentFrameDetailProps) {
  console.log('envidenceData', envidenceData);
  return (
    <>
      <div className='space-y-6'>
        <div className='envident_image relative'>
          <img className='w-[100%]' src={envidenceData?.imageUrl} />
          <div className='envident-frame-list'>
            {(envidenceData?.frames || []).map((item) => {
              return (
                <div
                  style={{ top: `${item.y}px`, left: `${item.x}px`, width: `${item.w}px`, height: `${item.h}px` }}
                  className={`envident-frame-point absolute border-[3px] border-blue-400`}
                >
                  a
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
