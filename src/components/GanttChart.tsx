
import { ProcessExecution } from '@/types/scheduling';

interface GanttChartProps {
  ganttChart: ProcessExecution[];
}

export const GanttChart = ({ ganttChart }: GanttChartProps) => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500'
  ];

  const totalTime = Math.max(...ganttChart.map(p => p.endTime));
  
  return (
    <div className="space-y-4">
      <div className="flex items-center border border-white/20 rounded-lg overflow-hidden">
        {ganttChart.map((execution, index) => {
          const width = ((execution.endTime - execution.startTime) / totalTime) * 100;
          const colorClass = colors[execution.processId % colors.length];
          
          return (
            <div
              key={index}
              className={`${colorClass} flex items-center justify-center text-white text-sm font-medium py-3 border-r border-white/20 last:border-r-0`}
              style={{ width: `${width}%` }}
            >
              {execution.name || `P${execution.processId}`}
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center text-sm text-gray-300">
        {ganttChart.map((execution, index) => {
          const width = ((execution.endTime - execution.startTime) / totalTime) * 100;
          
          return (
            <div
              key={index}
              className="text-center border-r border-white/20 last:border-r-0"
              style={{ width: `${width}%` }}
            >
              {execution.startTime}
            </div>
          );
        })}
        <div className="ml-2">{totalTime}</div>
      </div>
    </div>
  );
};
