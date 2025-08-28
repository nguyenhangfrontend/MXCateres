import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

type StatisticsChartProps = {
  data: { period: string; value: number }[];
};

export default function StatisticsChart({ data }: StatisticsChartProps) {
  if (!data.length) return null;

  const series = [
    {
      name: 'Waiting Time',
      data: data.map((d) => d.value),
    },
  ];

  const options: ApexOptions = {
    chart: { type: 'line' },
    yaxis: {
      forceNiceScale: true,
    },
    xaxis: {
      categories: data.map((d) => d.period),
    },
  };

  return (
    <div className='rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6'>
      <div className='flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between'>
        <div className='w-full'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-white/90'>Waiting Time Average</h3>
          <p className='mt-1 text-gray-500 text-theme-sm dark:text-gray-400'>
            {/* Waiting Time you’ve set {isSingleDay ? 'per hour' : 'per day'} */}
          </p>
        </div>
      </div>

      <div className='max-w-full overflow-x-auto custom-scrollbar'>
        <div className='min-w-[1000px] xl:min-w-full'>
          <Chart options={options} series={series} type='area' height={310} />
        </div>
      </div>
    </div>
  );
}
