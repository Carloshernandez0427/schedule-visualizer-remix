
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SchedulingResult } from '@/types/scheduling';
import { TrendingUp, Clock, Timer, Zap, Award, Target, Activity } from 'lucide-react';

interface ResultsDisplayProps {
  results: SchedulingResult;
  algorithm: string;
}

export const ResultsDisplay = ({ results, algorithm }: ResultsDisplayProps) => {
  const algorithmNames = {
    'FIFO': 'First In First Out',
    'RR': 'Round Robin',
    'SJF': 'Shortest Job First'
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl">
            <Award className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Resultados de Simulación</h2>
            <p className="text-gray-400 text-lg">
              Algoritmo: <span className="text-cyan-400 font-semibold">{algorithmNames[algorithm as keyof typeof algorithmNames]}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Enhanced Average Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <span className="text-blue-300 font-semibold text-lg">Tiempo de Espera</span>
                <p className="text-gray-400 text-sm">Promedio</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {results.averageWaitingTime.toFixed(2)}
              <span className="text-lg text-gray-400 ml-1">ms</span>
            </div>
            <div className="text-sm text-blue-300">
              Tiempo que los procesos esperan en cola
            </div>
          </div>
        </div>
        
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-2xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <span className="text-green-300 font-semibold text-lg">Tiempo de Retorno</span>
                <p className="text-gray-400 text-sm">Promedio</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {results.averageTurnaroundTime.toFixed(2)}
              <span className="text-lg text-gray-400 ml-1">ms</span>
            </div>
            <div className="text-sm text-green-300">
              Tiempo total desde llegada hasta finalización
            </div>
          </div>
        </div>
        
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <span className="text-purple-300 font-semibold text-lg">Tiempo de Respuesta</span>
                <p className="text-gray-400 text-sm">Promedio</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {results.averageResponseTime.toFixed(2)}
              <span className="text-lg text-gray-400 ml-1">ms</span>
            </div>
            <div className="text-sm text-purple-300">
              Tiempo hasta la primera ejecución
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Detailed Process Results */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-cyan-500/20 rounded-xl">
            <Activity className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Detalles por Proceso</h3>
            <p className="text-gray-400">Métricas individuales de cada proceso</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-white/20 hover:bg-white/5 bg-white/10">
                <TableHead className="text-gray-200 font-semibold py-4">Proceso</TableHead>
                <TableHead className="text-gray-200 font-semibold">Llegada</TableHead>
                <TableHead className="text-gray-200 font-semibold">Ráfaga</TableHead>
                <TableHead className="text-gray-200 font-semibold">Finalización</TableHead>
                <TableHead className="text-gray-200 font-semibold">Retorno</TableHead>
                <TableHead className="text-gray-200 font-semibold">Espera</TableHead>
                <TableHead className="text-gray-200 font-semibold">Respuesta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.processes.map((result, index) => (
                <TableRow key={result.process.id} className="border-white/20 hover:bg-white/10 transition-colors group">
                  <TableCell className="text-white font-semibold py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                      <span>{result.process.name || `P${result.process.id}`}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{result.process.arrivalTime}</span>
                      <span className="text-xs text-gray-500">ms</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{result.process.burstTime}</span>
                      <span className="text-xs text-gray-500">ms</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{result.completionTime}</span>
                      <span className="text-xs text-gray-500">ms</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-blue-400 font-semibold">{result.turnaroundTime}</span>
                      <span className="text-xs text-gray-500">ms</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-green-400 font-semibold">{result.waitingTime}</span>
                      <span className="text-xs text-gray-500">ms</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-purple-400 font-semibold">{result.responseTime}</span>
                      <span className="text-xs text-gray-500">ms</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-cyan-500/20 rounded-xl">
            <Target className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Resumen de Rendimiento</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-400 mb-1">
              {results.processes.length}
            </div>
            <div className="text-sm text-gray-400">Procesos Ejecutados</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-400 mb-1">
              {results.totalTime}ms
            </div>
            <div className="text-sm text-gray-400">Tiempo Total</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-400 mb-1">
              {((results.processes.reduce((sum, p) => sum + p.process.burstTime, 0) / results.totalTime) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-400">Utilización CPU</div>
          </div>
        </div>
      </div>
    </div>
  );
};
