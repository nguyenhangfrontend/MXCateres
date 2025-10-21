import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import ComponentCard from '@/components/common/ComponentCard';
import BasicTableOne from '@/components/tables/BasicTables/BasicTableOne';
import PaginationFixed from '@/components/ui/pagination';
import { useEffect, useState } from 'react';
import { useColumns } from './tableColumnConfig';
import { defaultPagination, defaultSearchValue } from './constant';
import ModalDetailCustomer from './ModalDetailCustomer';
import { SearchFormType, UserType } from './types';
import SearchForm from './SearchForm';
import dayjs from 'dayjs';
import { useLazyGetUserListQuery } from 'src/src/api-request/Users.api';
import { size } from 'lodash';
import { PaginationType } from 'src/src/components/ui/pagination/type';
import { Loading } from 'src/src/components/ui/loading';

export default function UserManagementPage() {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [onSearch, setOnSearch] = useState<boolean>(false);
  const [userData, setDataCustomer] = useState<UserType>({
    lastSeenAt: '',
    customerId: '',
    evidenceThumbnail: '',
    id: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [getUserList, { data, isLoading }] = useLazyGetUserListQuery({ pollingInterval: 10000 });
  const [pagination, setPagination] = useState<PaginationType>(defaultPagination);
  const [searchedForm, setSeachedForm] = useState<SearchFormType>(defaultSearchValue);
  const imageUrl = import.meta.env.VITE_IMAGE_URL;
  const dataTable = (data?.records || []).map((item, index) => {
    return {
      ...item,
      evidenceThumbnail: `${imageUrl}${item.evidenceThumbnail}`,
    };
  });

  useEffect(() => {
    setPagination({ ...pagination, total: data?.pagination?.total });
  }, [data?.pagination]);
  useEffect(() => {
    getUserList({
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
      size: size,
    };
    setPageNumber(pageNumber);
    setPagination({ ...pagination, rowsPerPage: size, page: pageNumber });
    getUserList(parrams);
  };
  const detailCustomer = (data: UserType) => {
    setDataCustomer(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const { columns } = useColumns({ detailCustomer });

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

    await getUserList(parrams);
    setOnSearch(false);
  };

  return (
    <>
      {/* <PageMeta
        title='React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template'
        description='This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template'
      /> */}
      <Loading isOpen={isLoading || onSearch} />
      <PageBreadcrumb pageTitle='Customer Management Page' />
      <div className='space-y-6'>
        <ComponentCard title='Filter Customer'>
          <SearchForm handleSearch={handleSearch} />
        </ComponentCard>
        <ComponentCard title='Customer List'>
          <BasicTableOne pagination={false} tableData={dataTable || []} column={{ columns }} />

          <ModalDetailCustomer data={userData} isOpen={isModalOpen} onClose={handleCloseModal} />
        </ComponentCard>
        {dataTable.length && (
          <PaginationFixed
            onSearch={onSearch}
            pagination={pagination}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}
