import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import ComponentCard from '@/components/common/ComponentCard';
import PageMeta from '@/components/common/PageMeta';
import BasicTableOne from '@/components/tables/BasicTables/BasicTableOne';
import PaginationFixed from '@/components/ui/pagination';
import { useState } from 'react';
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from '@/components/ui/pagination/const';

export default function UserManagementPage() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pagination, setPagination] = useState({
    total: 0,
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    pageNumber: DEFAULT_PAGE,
  });
  const [onSearch, setOnSearch] = useState<boolean>(false);

  const handlePageChange = () => {};

  return (
    <>
      <PageMeta
        title='React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template'
        description='This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template'
      />
      <PageBreadcrumb pageTitle='Basic Tables' />
      <div className='space-y-6'>
        <ComponentCard title='Basic Table 1'>
          {/* <BasicTableOne /> */}
          <PaginationFixed
            onSearch={onSearch}
            pagination={pagination}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
          />
        </ComponentCard>
      </div>
    </>
  );
}
