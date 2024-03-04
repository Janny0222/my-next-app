import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Revenue } from '@/app/lib/definitions';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart({
  revenue,
}: {
  revenue: Revenue[];
}) {
  const chartHeight = 250;
  // NOTE: comment in this code when you get to this point in the course

  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  const maxRevenue = Math.max(...revenue.map((month) => month.revenue));
  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="p-4 rounded-xl bg-gray-50">
        <div className="grid items-end grid-cols-12 gap-2 p-4 mt-0 bg-white rounded-md sm:grid-cols-13 md:gap-4">
          
        {/* <div
            className="flex-col justify-between hidden mb-6 text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <div key={label} className="flex flex-col items-center gap-1">
              <p key={label}>{label}</p>
              </div>
            ))}
          </div> */}
          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              
              <div
                className="w-full bg-blue-300 rounded-md"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}
              ></div>
              <p className="text-sm text-gray-400">
                {month.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pt-6 pb-2">
          <CalendarIcon className="w-5 h-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
