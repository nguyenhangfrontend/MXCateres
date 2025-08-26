import { PaginationType } from './type';
import { Pagination, PaginationItem } from '@mui/material';
import { isEmpty } from 'lodash';
import { ChangeEvent } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
import { CSSProperties, useRef } from 'react';
import { MenuDropDown } from './type';
import { DEFAULT_PAGE, ROWS_PER_PAGE_OPTIONS } from './const';

type PaginationFixedProps = {
  onSearch: boolean;
  pagination: PaginationType;
  pageNumber?: number;
  handlePageChange: (e: ChangeEvent<unknown>, page: number, pageSize: number) => void;
};

type DropDownProps = {
  value?: number;
  menu: MenuDropDown;
  id: GridRowId;
  disabled?: boolean;
  setValue?: (value: number) => void;
  className?: string;
  required?: boolean;
  styleLabel?: CSSProperties;
  styleSelect?: CSSProperties;
  placeholder?: string;
  defaultValue?: string;
  isShow?: boolean;
  autoFocus?: boolean;
  width?: string | number;
  hasBlankOption?: boolean;
};

const DropDown = ({
  value,
  menu,
  id,
  disabled = false,
  setValue = undefined,
  className,
  required = false,
  styleLabel,
  styleSelect,
  placeholder,
  defaultValue = '',
  isShow = true,
  autoFocus = false,
  width,
  hasBlankOption = false,
}: DropDownProps) => {
  const ref = useRef(null);

  const handleValueChange = (event: SelectChangeEvent<number>) => {
    const newValue = event.target.value as number;

    if (setValue) {
      setValue(newValue);
    }
  };

  return (
    isShow && (
      <div style={{ margin: '0', width, height: '32px' }}>
        <FormControl style={{ display: 'flex', alignItems: 'center' }}>
          <InputLabel
            id='test-select-label'
            shrink={false}
            size='small'
            variant='outlined'
            style={{
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              marginRight: '10px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              ...styleLabel,
            }}
          >
            {!menu ? placeholder : menu && !menu?.map((item) => item.key).includes(value as any) && placeholder}
          </InputLabel>
          <Select
            id={`${id}`}
            data-testid={id}
            ref={ref}
            sx={{
              minWidth: '100%',
              backgroundColor: 'white',
              '& .MuiInputBase-input': {
                padding: '8px 12px',
              },
              '&:focus': {
                border: '1px solid #000 !important',
              },
              color: 'black',
              fontSize: '13px',
            }}
            size='small'
            value={value}
            autoFocus={autoFocus}
            onChange={handleValueChange}
            disabled={disabled}
            className={className}
            required={required}
            style={{ height: '32px', ...styleSelect }}
            MenuProps={{
              style: {
                maxHeight: `${menu.length > 30 ? '60%' : '100%'}`,
              },
            }}
          >
            {!!hasBlankOption && (
              <MenuItem value={defaultValue}>
                <span className='text-black'>{placeholder}</span>
              </MenuItem>
            )}
            {menu &&
              menu.map((val, index) => (
                <MenuItem key={index} value={val.key}>
                  {val.value}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    )
  );
};

function PaginationFixed({ onSearch, pagination, pageNumber, handlePageChange }: PaginationFixedProps) {
  console.log('pagination', pagination.rowsPerPage);
  return (
    <>
      {onSearch && (
        <div
          className='fixed left-0 bottom-[20px] bg-[#c9c9c9] opacity-60 w-screen px-4 py-1 text-black'
          data-testid='pagination-bar'
        >
          <div className='text-lg font-bold flex justify-between items-center'>
            <div>Total record: {pagination?.total}</div>
            <div className='flex flex-row items-center justify-center'>
              <DropDown
                id='select_rowsPerPage'
                className='w-20'
                menu={ROWS_PER_PAGE_OPTIONS}
                styleSelect={{ margin: '0' }}
                value={pagination?.rowsPerPage}
                setValue={(pageSize) => handlePageChange(undefined as any, pageNumber ?? DEFAULT_PAGE, pageSize)}
              />
              <Pagination
                data-testid='paging-bar'
                className='flex '
                size='medium'
                count={isEmpty(pagination) ? 1 : Math.ceil((pagination?.total || 0) / (pagination?.rowsPerPage || 0))}
                page={pageNumber}
                onChange={(e, page) => handlePageChange?.(e, page, pagination.rowsPerPage)}
                showFirstButton
                showLastButton
                renderItem={(item) => (
                  <PaginationItem
                    role='button'
                    {...item}
                    sx={{
                      color: item.type === 'page' && item.page === pageNumber ? 'red' : 'black',
                      fontWeight: item.type === 'page' && item.page === pageNumber ? 'bold' : 'normal',
                      fontSize: '13px',
                      backgroundColor: item.type === 'page' && item.page === pageNumber ? 'transparent' : 'inherit',
                      '&:hover': {
                        backgroundColor: 'inherit',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'transparent !important',
                        outline: 'none',
                        boxShadow: 'none',
                      },
                      '&:focus': {
                        outline: 'none',
                        boxShadow: 'none',
                      },
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PaginationFixed;
