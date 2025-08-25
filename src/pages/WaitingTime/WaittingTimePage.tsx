import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import ComponentCard from '@/components/common/ComponentCard';
import BasicTableOne from '@/components/tables/BasicTables/BasicTableOne';
import PaginationFixed from '@/components/ui/pagination';
import { useEffect, useState } from 'react';
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from '@/components/ui/pagination/const';
import { useColumns } from './tableColumnConfig';
import { defaultSearchValue, tableData } from './constant';
import { useLazyGetWaitingTimeListQuery } from 'src/src/api-request/Watting-time.api';
import ModalDetailWaitingTime from './ModalDetailWaitingTime';
import { SearchFormPropsType, SearchFormType, WaitingTimeDataType } from './types';
import SearchForm from './SearchForm';
import moment from 'moment';
import dayjs from 'dayjs';

export default function UserManagementPage() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pagination, setPagination] = useState({
    total: 0,
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    pageNumber: DEFAULT_PAGE,
  });
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [waitingTimeDetailData, setWaitingTimeData] = useState<WaitingTimeDataType>();
  const [getWaittingTimeList, data] = useLazyGetWaitingTimeListQuery();
  useEffect(() => {
    getWaittingTimeList({
      ...defaultSearchValue,
      from: dayjs(defaultSearchValue.from).format('YYYY-MM-DD'),
      to: dayjs(defaultSearchValue.to).format('YYYY-MM-DD'),
    });
  }, []);
  const handlePageChange = () => {};
  const detailWaitingTime = (data: WaitingTimeDataType) => {
    setWaitingTimeData(data);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const { columns } = useColumns({ detailWaitingTime });

  const handleSearch = (formValues: SearchFormType) => {
    const parrams = {
      ...formValues,
      from: dayjs(formValues.from).format('YYYY-MM-DD'),
      to: dayjs(formValues.to).format('YYYY-MM-DD'),
    };
    console.log('parrams', parrams);

    getWaittingTimeList(parrams);
  };

  return (
    <>
      {/* <PageMeta
        title='React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template'
        description='This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template'
      /> */}
      <PageBreadcrumb pageTitle='Waiting Time Page' />
      <div className='space-y-6'>
        <ComponentCard title='Filter Waiting Time'>
          <SearchForm handleSearch={handleSearch} />
        </ComponentCard>
        <ComponentCard title='Waiting Time List'>
          <BasicTableOne tableData={tableData} column={{ columns }} />
          <PaginationFixed
            onSearch={onSearch}
            pagination={pagination}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
          />
          <ModalDetailWaitingTime data={waitingTimeDetailData} isOpen={isModalOpen} onClose={handleCloseModal} />
        </ComponentCard>
      </div>
    </>
  );
}
function setIsModalOpen(arg0: boolean) {
  throw new Error('Function not implemented.');
}
