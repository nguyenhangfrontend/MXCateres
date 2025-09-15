import EcommerceMetrics from '@/pages/Dashboard/ecommerce/EcommerceMetrics';
import StatisticsChart from '@/pages/Dashboard/ecommerce/StatisticsChart';
import PageMeta from '@/components/common/PageMeta';
import { useEffect, useState } from 'react';
import ComponentCard from '@/components/common/ComponentCard';
import SearchForm from './SearchForm';
import { SearchFormType } from './types';
import { defaultSearchValue } from './constant';
import OrderStatusCircle from '@/pages/Dashboard/ecommerce/OrderStatusCircle';
import CustomerChart from '@/pages/Dashboard/ecommerce/CustomerChart';
import dayjs from 'dayjs';
import { useLazyGetDashboardDataQuery } from 'src/src/api-request/Dashboard.api';

export default function Home() {
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [searchedForm, setSeachedForm] = useState<SearchFormType>(defaultSearchValue);
  const [getDashboardData, { data }] = useLazyGetDashboardDataQuery();
  console.log('data', data);

  useEffect(() => {
    getDashboardData({
      ...defaultSearchValue,
      from: dayjs(defaultSearchValue.from).format('YYYY-MM-DD'),
      to: dayjs(defaultSearchValue.to).format('YYYY-MM-DD'),
    });
  }, []);

  const handleSearch = (formValues: SearchFormType) => {
    // handle search later
    setOnSearch(true);
    setSeachedForm(formValues);
    const params = {
      ...formValues,
      from: dayjs(formValues.from).format('YYYY-MM-DD'),
      to: dayjs(formValues.to).format('YYYY-MM-DD'),
    };
    console.log('params', params);

    getDashboardData(params);
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

      {data && (
        <>
          <div className='grid grid-cols-12 gap-4 md:gap-6'>
            <div className='col-span-12 space-y-6 xl:col-span-8'>
              <EcommerceMetrics data={data} />
              <CustomerChart data={data.customerChart} />
            </div>

            <div className='col-span-12 xl:col-span-4'>
              <OrderStatusCircle data={data.orderStatusChart} />
            </div>

            <div className='col-span-12'>
              <StatisticsChart data={data.waitingTimeChart} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
