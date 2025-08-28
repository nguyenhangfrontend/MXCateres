import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
interface MonthlySalesChartProps {
  data: { period: string; value: number }[];
  title?: string;
}

export default function MonthlySalesChart({ data, title = 'Customers' }: MonthlySalesChartProps) {
  // x = category (period), y = value
  const series = [
    {
      name: 'Waiting Time',
      data: data.map((d) => d.value),
    },
  ];

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Outfit, sans-serif',
      height: 310,
      type: 'bar',
      toolbar: { show: false },
    },
    xaxis: {
      type: 'category',
      categories: data.map((d) => d.period),
      labels: {
        // rotate: -45,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      forceNiceScale: true,
    },
    tooltip: {
      x: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '39%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },
    grid: { yaxis: { lines: { show: true } } },
    dataLabels: { enabled: false },
    colors: ['#465FFF'],
  };

  return (
    <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-800 dark:text-white/90'>{title}</h3>
      </div>

      <div className='max-w-full overflow-x-auto custom-scrollbar'>
        <div className='-ml-5 min-w-[650px] xl:min-w-full pl-2'>
          <Chart options={options} series={series} type='bar' height={310} />
        </div>
      </div>
    </div>
  );
}
