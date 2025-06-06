
import { SchedulingResult } from '@/types/scheduling';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, BarChart3, Target, Zap } from 'lucide-react';

interface MetricsComparisonProps {
  results: SchedulingResult[];
  algorithmNames: string[];
}

export const MetricsComparison = ({ results, algorithmNames }: MetricsComparisonProps) => {
  if (results.length < 2) return null;

  const getMetricColor = (value: number, values: number[], isLowerBetter = true) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    if (isLowerBetter) {
      return value === min ? 'text-green-400' : value === max ? 'text-red-400' : 'text-yellow-400';
    } else {
      return value === max ? 'text-green-400' : value === min ? 'text-red-400' : 'text-yellow-400';
    }
  };

  const getIcon = (value: number, values: number[], isLowerBetter = true) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    if (isLowerBetter) {
      if (value === min) return <TrendingDown className="w-4 h-4 text-green-400" />;
      if (value === max) return <TrendingUp className="w-4 h-4 text-red-400" />;
      return <Minus className="w-4 h-4 text-yellow-400" />;
    } else {
      if (value === max) return <TrendingUp className="w-4 h-4 text-green-400" />;
      if (value === min) return <TrendingDown className="w-4 h-4 text-red-400" />;
      return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  const waitingTimes = results.map(r => r.averageWaitingTime);
  const turnaroundTimes = results.map(r => r.averageTurnaroundTime);
  const responseTimes = results.map(r => r.averageResponseTime);
  const cpuUtilizations = results.map(r => 
    (r.processes.reduce((sum, p) => sum + p.process.burstTime, 0) / r.totalTime) * 100
  );

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
            <BarChart3 className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <CardTitle className="text-2xl text-white">Comparación de Algoritmos</CardTitle>
            <p className="text-gray-400">Análisis comparativo de rendimiento</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {results.map((result, index) => (
            <div 
              key={index} 
              className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                <h3 className="text-xl font-bold text-white">{algorithmNames[index]}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Tiempo de Espera</span>
                  <div className="flex items-center gap-2">
                    {getIcon(result.averageWaitingTime, waitingTimes, true)}
                    <span className={`font-bold ${getMetricColor(result.averageWaitingTime, waitingTimes, true)}`}>
                      {result.averageWaitingTime.toFixed(2)}ms
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Tiempo de Retorno</span>
                  <div className="flex items-center gap-2">
                    {getIcon(result.averageTurnaroundTime, turnaroundTimes, true)}
                    <span className={`font-bold ${getMetricColor(result.averageTurnaroundTime, turnaroundTimes, true)}`}>
                      {result.averageTurnaroundTime.toFixed(2)}ms
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Tiempo de Respuesta</span>
                  <div className="flex items-center gap-2">
                    {getIcon(result.averageResponseTime, responseTimes, true)}
                    <span className={`font-bold ${getMetricColor(result.averageResponseTime, responseTimes, true)}`}>
                      {result.averageResponseTime.toFixed(2)}ms
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Utilización CPU</span>
                  <div className="flex items-center gap-2">
                    {getIcon(cpuUtilizations[index], cpuUtilizations, false)}
                    <span className={`font-bold ${getMetricColor(cpuUtilizations[index], cpuUtilizations, false)}`}>
                      {cpuUtilizations[index].toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-6 border border-green-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-green-400" />
            <h4 className="text-lg font-bold text-white">Recomendación</h4>
          </div>
          <div className="text-gray-300">
            {(() => {
              const bestWaiting = Math.min(...waitingTimes);
              const bestWaitingIndex = waitingTimes.indexOf(bestWaiting);
              return (
                <p>
                  <span className="text-green-400 font-semibold">{algorithmNames[bestWaitingIndex]}</span> 
                  {' '}ofrece el mejor tiempo de espera promedio, lo que es ideal para minimizar la latencia del sistema.
                </p>
              );
            })()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
