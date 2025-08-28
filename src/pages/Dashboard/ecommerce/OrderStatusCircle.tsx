import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface OrderStatusCircleProps {
  data: {
    fast: number;
    medium: number;
    slow: number;
  };
}

export default function OrderStatusCircle({ data }: OrderStatusCircleProps) {
  const series = [data.fast, data.medium, data.slow]; // use props

  const options: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'Outfit, sans-serif',
    },
    labels: ['Fast', 'Medium', 'Slow'],
    colors: ['#22c55e', '#facc15', '#ef4444'],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      labels: {
        colors: '#6B7280',
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Orders',
              fontSize: '16px',
              fontWeight: 600,
              color: '#374151',
              formatter: (w) => w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toString(),
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(0)}%`,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} orders`,
      },
    },
  };

  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]'>
      <h3 className='text-lg font-semibold text-gray-800 dark:text-white/90 mb-4'>Order Status (Speed)</h3>
      <Chart options={options} series={series} type='donut' height={330} />
    </div>
  );
}
