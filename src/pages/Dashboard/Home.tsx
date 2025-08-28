import EcommerceMetrics from '@/pages/Dashboard/ecommerce/EcommerceMetrics';
import StatisticsChart from '@/pages/Dashboard/ecommerce/StatisticsChart';
import PageMeta from '@/components/common/PageMeta';
import ComponentCard from '@/components/common/ComponentCard';
import SearchForm from './SearchForm';
import { SearchFormType } from './types';
import { mockEcommerceData } from './constant';
import OrderStatusCircle from '@/pages/Dashboard/ecommerce/OrderStatusCircle';
import CustomerChart from '@/pages/Dashboard/ecommerce/CustomerChart';

export default function Home() {
  const handleSearch = (formValues: SearchFormType) => {
    // handle search later
  };

  return (
    <>
      <PageMeta
        title='React.js Ecommerce Dashboard | TailAdmin'
        description='React.js Ecommerce Dashboard page for TailAdmin'
      />

      <ComponentCard className='mb-[20px]' title='Ecommerce Analysis Filter'>
        <SearchForm handleSearch={handleSearch} />
      </ComponentCard>

      <div className='grid grid-cols-12 gap-4 md:gap-6'>
        <div className='col-span-12 space-y-6 xl:col-span-8'>
          <EcommerceMetrics data={mockEcommerceData} />
          <CustomerChart data={mockEcommerceData.customerChart} />
        </div>

        <div className='col-span-12 xl:col-span-4'>
          <OrderStatusCircle data={mockEcommerceData.orderStatusChart} />
        </div>

        <div className='col-span-12'>
          <StatisticsChart data={mockEcommerceData.waitingTimeChart} />
        </div>
      </div>
    </>
  );
}
