
import { ProcessExecution } from '@/types/scheduling';
import { Clock, PlayCircle } from 'lucide-react';

interface GanttChartProps {
  ganttChart: ProcessExecution[];
}

export const GanttChart = ({ ganttChart }: GanttChartProps) => {
  const colors = [
    'from-red-500 to-red-600',
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-yellow-500 to-yellow-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600',
    'from-teal-500 to-teal-600',
    'from-orange-500 to-orange-600',
    'from-cyan-500 to-cyan-600'
  ];

  const totalTime = Math.max(...ganttChart.map(p => p.endTime));
  
  return (
    <div className="space-y-6">
      {/* Chart Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PlayCircle className="w-6 h-6 text-purple-400" />
          <span className="text-lg font-semibold text-white">Línea de tiempo de ejecución</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Tiempo total: {totalTime} ms</span>
        </div>
      </div>

      {/* Enhanced Gantt Chart */}
      <div className="space-y-4">
        <div className="flex items-stretch border border-white/30 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm shadow-lg">
          {ganttChart.map((execution, index) => {
            const width = ((execution.endTime - execution.startTime) / totalTime) * 100;
            const colorClass = colors[execution.processId % colors.length];
            
            return (
              <div
                key={index}
                className={`bg-gradient-to-b ${colorClass} flex flex-col items-center justify-center text-white text-sm font-semibold py-6 border-r border-white/30 last:border-r-0 relative group hover:shadow-lg transition-all duration-300 hover:scale-105 hover:z-10`}
                style={{ width: `${width}%`, minWidth: '60px' }}
              >
                <div className="text-center">
                  <div className="text-lg font-bold mb-1">
                    {execution.name || `P${execution.processId}`}
                  </div>
                  <div className="text-xs opacity-90">
                    {execution.endTime - execution.startTime}ms
                  </div>
                </div>
                
                {/* Tooltip */}
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 shadow-xl">
                  <div className="font-semibold">{execution.name || `Proceso ${execution.processId}`}</div>
                  <div>Inicio: {execution.startTime}ms</div>
                  <div>Fin: {execution.endTime}ms</div>
                  <div>Duración: {execution.endTime - execution.startTime}ms</div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Enhanced Time Scale */}
        <div className="relative">
          <div className="flex items-center bg-white/5 rounded-xl border border-white/20 overflow-hidden">
            {ganttChart.map((execution, index) => {
              const width = ((execution.endTime - execution.startTime) / totalTime) * 100;
              
              return (
                <div
                  key={index}
                  className="text-center py-3 border-r border-white/20 last:border-r-0 bg-white/5 hover:bg-white/10 transition-colors"
                  style={{ width: `${width}%`, minWidth: '60px' }}
                >
                  <div className="text-sm font-semibold text-gray-300">{execution.startTime}</div>
                  <div className="text-xs text-gray-500">ms</div>
                </div>
              );
            })}
          </div>
          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-white/10 rounded-lg px-3 py-2 border border-white/20">
            <div className="text-sm font-semibold text-gray-300">{totalTime}</div>
            <div className="text-xs text-gray-500">ms</div>
          </div>
        </div>

        {/* Process Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-6">
          {Array.from(new Set(ganttChart.map(e => e.processId))).map(processId => {
            const execution = ganttChart.find(e => e.processId === processId);
            const colorClass = colors[processId % colors.length];
            
            return (
              <div key={processId} className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/20 hover:border-white/30 transition-colors">
                <div className={`w-4 h-4 bg-gradient-to-b ${colorClass} rounded-sm shadow-sm`}></div>
                <span className="text-sm font-medium text-gray-300">
                  {execution?.name || `P${processId}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
