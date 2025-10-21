import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import ComponentCard from '@/components/common/ComponentCard';
import BasicTableOne from '@/components/tables/BasicTables/BasicTableOne';
import PaginationFixed from '@/components/ui/pagination';
import { useEffect, useState } from 'react';
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from '@/components/ui/pagination/const';
import { useColumns } from './tableColumnConfig';
import { defaultPagination, defaultSearchValue } from './constant';
import { useLazyGetWaitingTimeListQuery } from 'src/src/api-request/WattingTime.api';
import ModalDetailWaitingTime from './ModalDetailWaitingTime';
import { SearchFormType, WaitingTimeDataType } from './types';
import SearchForm from './SearchForm';
import dayjs from 'dayjs';
import { PaginationType } from 'src/src/components/ui/pagination/type';
import { Loading } from 'src/src/components/ui/loading';

export default function UserManagementPage() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pagination, setPagination] = useState<PaginationType>(defaultPagination);
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [waitingTimeDetailData, setWaitingTimeData] = useState<WaitingTimeDataType>();
  const [getWaittingTimeList, { data, isLoading }] = useLazyGetWaitingTimeListQuery({
    pollingInterval: 10000,
  });

  const [searchedForm, setSeachedForm] = useState<SearchFormType>(defaultSearchValue);
  const imageUrl = import.meta.env.VITE_IMAGE_URL;
  const dataTable = (data?.data || []).map((item, index) => {
    return {
      ...item,
      id: index + 1,
      customerProfileUrl: `${imageUrl}${item.customerProfileUrl}`,
    };
  });

  // console.log('dataTable', dataTable);

  useEffect(() => {
    setPagination({ ...pagination, total: data?.pagination?.total });
  }, [data?.pagination]);
  useEffect(() => {
    getWaittingTimeList({
      ...defaultSearchValue,
      from: dayjs(defaultSearchValue.from).format('YYYY-MM-DD'),
      to: dayjs(defaultSearchValue.to).format('YYYY-MM-DD'),
      page: 1,
      size: 10,
    });
  }, []);
  const handlePageChange = (e: any, pageNumber: number, size: number) => {
    const parrams = {
      ...searchedForm,
      from: dayjs(searchedForm.from).format('YYYY-MM-DD'),
      to: dayjs(searchedForm.to).format('YYYY-MM-DD'),
      page: pageNumber,
      size,
    };
    setPageNumber(pageNumber);
    setPagination({ ...pagination, rowsPerPage: size, page: pageNumber });
    getWaittingTimeList(parrams);
  };
  const detailWaitingTime = (data: WaitingTimeDataType) => {
    setWaitingTimeData(data);
    setIsModalOpen(true);
  };

  // console.log('waitingTimeDetailData', waitingTimeDetailData);
  const handleCloseModal = () => setIsModalOpen(false);
  const { columns } = useColumns({ detailWaitingTime });

  const handleSearch = async (formValues: SearchFormType) => {
    setOnSearch(true);
    setSeachedForm(formValues);
    const parrams = {
      ...formValues,
      from: dayjs(formValues.from).format('YYYY-MM-DD'),
      to: dayjs(formValues.to).format('YYYY-MM-DD'),
      page: 1,
      size: 10,
    };
    // console.log('parrams', parrams);

    await getWaittingTimeList(parrams);
    setOnSearch(false);
  };
  return (
    <>
      {/* <PageMeta
        title='React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template'
        description='This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template'
      /> */}
      <Loading isOpen={isLoading || onSearch} />
      <PageBreadcrumb pageTitle='Waiting Time Page' />
      <div className='space-y-6'>
        <ComponentCard title='Filter Waiting Time'>
          <SearchForm handleSearch={handleSearch} />
        </ComponentCard>
        <ComponentCard title='Waiting Time List'>
          <BasicTableOne pagination={false} tableData={dataTable || []} column={{ columns }} />
          {dataTable.length && (
            <PaginationFixed
              onSearch={onSearch}
              pagination={pagination}
              pageNumber={pageNumber}
              handlePageChange={handlePageChange}
            />
          )}
          <ModalDetailWaitingTime data={waitingTimeDetailData} isOpen={isModalOpen} onClose={handleCloseModal} />
        </ComponentCard>
      </div>
    </>
  );
}
