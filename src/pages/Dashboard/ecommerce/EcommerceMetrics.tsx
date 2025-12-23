import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from '@/icons';
import Badge from '@components/ui/badge/Badge';
import { DashboardResponse } from '../types';

interface EcommerceMetricsProps {
  data: DashboardResponse;
}

export default function EcommerceMetrics({ data }: EcommerceMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 md:gap-2">
      {/* Total Customers */}
      <div className='rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-white/[0.03] md:p-4'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
          <GroupIcon className='text-gray-800 size-6 dark:text-white/90' />
        </div>

        <div className='text-sm text-gray-400 dark:text-gray-300 mt-5 font-bold'>Total Customers</div>
        <div className='flex items-end justify-between '>
          <div>
            <h4 className='mt-2 font-bold text-gray-800 text-title-xs dark:text-white/90'>
              {data.totalCustomer.toLocaleString()}
            </h4>
          </div>
          {/* <Badge color='success'>
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>
      </div>

      {/* Waiting Time */}
      <div className='rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-white/[0.03] md:p-4'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
          <BoxIconLine className='text-gray-800 size-6 dark:text-white/90' />
        </div>
        <div className='text-sm text-gray-400 dark:text-gray-300 mt-5 font-bold'>Waiting Time</div>
        <div className='flex items-end justify-between'>
          <div>
            <h4 className='mt-2 font-bold text-gray-800 text-title-xs dark:text-white/90'>
              {Math.round(data.waitingTimeAverage)} minutes
            </h4>
          </div>

          {/* <Badge color='error'>
            <ArrowDownIcon />
            9.05%
          </Badge> */}
        </div>
      </div>

      {/* Order Time */}
      <div className='rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-white/[0.03] md:p-4'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
          <BoxIconLine className='text-gray-800 size-6 dark:text-white/90' />
        </div>
        <div className='text-sm text-gray-400 dark:text-gray-300 mt-5'>Order Time</div>
        <div className='flex items-end justify-between '>
          <div>
            <h4 className='mt-2 font-bold text-gray-800 text-title-xs dark:text-white/90'>
              {Math.round(data.orderZoneWaitingTime)} minutes
            </h4>
          </div>

          {/* <Badge color='error'>
            <ArrowDownIcon />
            9.05%
          </Badge> */}
        </div>
      </div>

      {/* Processing Time */}
      <div className='rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-white/[0.03] md:p-4'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
          <BoxIconLine className='text-gray-800 size-6 dark:text-white/90' />
        </div>
        <div className='text-sm text-gray-400 dark:text-gray-300 mt-5'>Processing Time</div>
        <div className='flex items-end justify-between'>
          <div>
            <h4 className='mt-2 font-bold text-gray-800 text-title-xs dark:text-white/90'>{Math.round(data.processingZoneWaitingTime)} minutes</h4>
          </div>

          {/* <Badge color='error'>
            <ArrowDownIcon />
            9.05%
          </Badge> */}
        </div>
      </div>

      {/* Picking Time */}
      <div className='rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-white/[0.03] md:p-4'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
          <BoxIconLine className='text-gray-800 size-6 dark:text-white/90' />
        </div>
        <div className='text-sm text-gray-400 dark:text-gray-300 mt-5'>Picking Time</div>
        <div className='flex items-end justify-between'>
          <div>
            <h4 className='mt-2 font-bold text-gray-800 text-title-xs dark:text-white/90'>
              {Math.round(data.pickupZoneWaitingTime)} minutes
            </h4>
          </div>

          {/* <Badge color='error'>
            <ArrowDownIcon />
            9.05%
          </Badge> */}
        </div>
      </div>
    </div>
  );
}
