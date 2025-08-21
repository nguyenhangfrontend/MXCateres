import ComponentCard from '@/components/common/ComponentCard';
import { ImageList, ImageListItem } from '@mui/material';
import { CustomerInfoType } from './type';

export default function UserManagementPage(dataCustomer: CustomerInfoType) {
  return (
    <>
      <div className='space-y-6'>
        <ComponentCard title='Customer information'>
          <div className='info'>
            <div>
              <span>Customer ID</span>
              <span>{dataCustomer.customerId}</span>
            </div>
          </div>

          <div className='list-user-image'>
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
              {dataCustomer?.imageList.map((item) => (
                <ImageListItem key={item.imageUrl}>
                  <img
                    srcSet={`${item.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.imageUrl}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    loading='lazy'
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
