import * as React from 'react';
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridColumnGroupingModel,
  GridColumnVisibilityModel,
  GridRowClassNameParams,
  GridRowHeightParams,
  GridRowHeightReturnValue,
  GridRowModesModel,
  GridRowParams,
  GridRowSelectionModel,
  GridRowsProp,
} from '@mui/x-data-grid';
import { Avatar, AvatarGroup, Chip, Box, Typography, TableProps, SxProps, Theme } from '@mui/material';

type DataGridTableProps = Omit<DataGridProps, 'columns' | 'pagination' | 'rowSelection'> & {
  id?: string;
  tableData: GridRowsProp;
  processRowUpdate?: (newRow: any, oldRow?: any) => Promise<any> | any;
  onProcessRowUpdateError?: (error: any) => void;
  handleRowDisableSelect?: ((row: GridRowParams) => boolean) | null;
  borderTable?: string;
  rowHeight?: number;
  tableHeight?: string;
  maxHeight?: string;
  autoHeight?: boolean;
  onSearch?: boolean;
  isCellClick?: boolean;
  isCellDoubleClick?: boolean;
  onPagination?: boolean;
  checkboxSelection?: boolean;
  disableCheckBoxAll?: boolean;
  isMultipleSelection?: boolean;
  hasScrollInBody?: boolean;
  disableRowSelectionOnClick?: boolean;
  autoHeightScroller?: boolean;
  handleClassNameRow?: ((row: GridRowClassNameParams) => string) | null;
  classNameOfCell?: SxProps<Theme>;
  column: {
    columns: readonly GridColDef[];
    columnGroupingModel?: GridColumnGroupingModel;
    columnVisibilityModel?: GridColumnVisibilityModel;
  };
  rowSelection?: {
    rowModesModel?: GridRowModesModel;
    setRowModesModel?: (rowModesModel: GridRowModesModel) => void;
    rowSelectionModel?: GridRowSelectionModel;
    setRowSelectionModel?: (rowSelectionModel: GridRowSelectionModel) => void;
  };
  fullHeightNoRowsOverlay?: boolean;
  cssCell?: React.CSSProperties;
  cssHeader?: React.CSSProperties;
  rowId?: string;
  freezeToColumnField?: string;
  getRowHeight?: (params: GridRowHeightParams) => GridRowHeightReturnValue;
  noDataMessage?: string;
  pagination?: boolean;
};

export default function OrdersDataGrid({
  id,
  onSearch,
  tableData,
  processRowUpdate,
  onProcessRowUpdateError = () => {},
  handleRowDisableSelect = null,
  borderTable = 'none',
  rowHeight = 35,
  columnHeaderHeight = 50,
  tableHeight = 'auto',
  maxHeight,
  autoHeight = false,
  isCellClick = true,
  isCellDoubleClick = false,
  onPagination = true,
  checkboxSelection = true,
  disableCheckBoxAll = true,
  isMultipleSelection = false,
  disableRowSelectionOnClick = true,
  handleClassNameRow = null,
  classNameOfCell,
  column: { columns, columnGroupingModel, columnVisibilityModel },
  rowSelection,
  hasScrollInBody = false,
  fullHeightNoRowsOverlay = false,
  cssCell,
  cssHeader,
  rowId = 'SELECT_ROW',
  freezeToColumnField,
  getRowHeight = () => (autoHeight ? 'auto' : null),
  noDataMessage,
  pagination,
  ...props
}: DataGridTableProps) {
  return (
    <div className='overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-gray-900'>
      <div className='h-[500px] w-full'>
        <DataGrid
          sx={{
            '& .MuiDataGrid-cell': {
              display: 'flex',
              alignItems: 'center', // vertical
            },
            '& .MuiDataGrid-columnHeaders': {
              display: 'flex',
              alignItems: 'center', // header vertical align
            },

            '& .MuiDataGrid-footerContainer .MuiTablePagination-root': {
              display: 'none',
            },
          }}
          rows={tableData}
          columns={columns}
          rowHeight={200}
          // autoHeight // grid takes only the height of visible rows (not mandatory)

          {...props}
          disableRowSelectionOnClick
          hideFooterSelectedRowCount
          {...(pagination ? { pagination: true } : {})}
          className='[&_.MuiDataGrid-columnHeaders]:!bg-gray-50 [&_.MuiDataGrid-columnHeaders]:dark:!bg-gray-800'
        />
      </div>
    </div>
  );
}
