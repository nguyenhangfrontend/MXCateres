import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import ComponentCard from '@/components/common/ComponentCard';
import PageMeta from '@/components/common/PageMeta';
import BasicTableOne from '@/components/tables/BasicTables/BasicTableOne';
import PaginationFixed from '@/components/ui/pagination';
import { useState } from 'react';
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from '@/components/ui/pagination/const';
import { useColumns } from './tableColumnConfig';
import { tableData } from './constant';
import { useLazyGetWaitingTimeListQuery } from 'src/src/api-request/Watting-time.api';
import ModalDetailWaitingTime from './ModalDetailWaitingTime';
import { WaitingTimeDataType } from './types';

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
  const handlePageChange = () => {};
  const detailWaitingTime = (data: WaitingTimeDataType) => {
    console.log('data', data);
    setWaitingTimeData(data);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const { columns } = useColumns({ detailWaitingTime });

  return (
    <>
      {/* <PageMeta
        title='React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template'
        description='This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template'
      /> */}
      <PageBreadcrumb pageTitle='Waiting Time List' />
      <div className='space-y-6'>
        <ComponentCard title='Basic Table 1'>
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
