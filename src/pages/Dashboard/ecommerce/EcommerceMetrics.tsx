import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from '@/icons';
import Badge from '@components/ui/badge/Badge';

type EcommerceData = {
  totalCustomer: number;
  totalOrders: number;
  leaveCustomers: number;
  waitingTimeAverage: number;
};

interface EcommerceMetricsProps {
  data: EcommerceData;
}

export default function EcommerceMetrics({ data }: EcommerceMetricsProps) {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6'>
      {/* Total Customers */}
      <div className='rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
          <GroupIcon className='text-gray-800 size-6 dark:text-white/90' />
        </div>

        <div className='text-sm text-gray-500 dark:text-gray-400 mt-5'>Total Customers</div>
        <div className='flex items-end justify-between '>
          <div>
            <h4 className='mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90'>
              {data.totalCustomer.toLocaleString()}
            </h4>
          </div>
          <Badge color='success'>
            <ArrowUpIcon />
            11.01%
          </Badge>
        </div>
      </div>

      {/* Total Orders */}
      <div className='rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
          <BoxIconLine className='text-gray-800 size-6 dark:text-white/90' />
        </div>
        <div className='text-sm text-gray-500 dark:text-gray-400 mt-5'>Total Orders</div>
        <div className='flex items-end justify-between '>
          <div>
            <h4 className='mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90'>
              {data.totalOrders.toLocaleString()}
            </h4>
          </div>

          <Badge color='error'>
            <ArrowDownIcon />
            9.05%
          </Badge>
        </div>
      </div>

      {/* Leave Customers */}
      <div className='rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
          <BoxIconLine className='text-gray-800 size-6 dark:text-white/90' />
        </div>
        <div className='text-sm text-gray-500 dark:text-gray-400 mt-5'>Leave Customers</div>
        <div className='flex items-end justify-between'>
          <div>
            <h4 className='mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90'>
              {data.leaveCustomers.toLocaleString()}
            </h4>
          </div>

          <Badge color='error'>
            <ArrowDownIcon />
            9.05%
          </Badge>
        </div>
      </div>

      {/* Waiting Time Average */}
      <div className='rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6'>
        <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>
          <BoxIconLine className='text-gray-800 size-6 dark:text-white/90' />
        </div>
        <div className='text-sm text-gray-500 dark:text-gray-400 mt-5'>Waiting time average</div>
        <div className='flex items-end justify-between'>
          <div>
            <h4 className='mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90'>
              {data.waitingTimeAverage}m
            </h4>
          </div>

          <Badge color='error'>
            <ArrowDownIcon />
            9.05%
          </Badge>
        </div>
      </div>
    </div>
  );
}
