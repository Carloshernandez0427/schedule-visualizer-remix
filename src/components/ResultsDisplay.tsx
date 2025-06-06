
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SchedulingResult } from '@/types/scheduling';
import { TrendingUp, Clock, Timer, Zap } from 'lucide-react';

interface ResultsDisplayProps {
  results: SchedulingResult;
  algorithm: string;
}

export const ResultsDisplay = ({ results, algorithm }: ResultsDisplayProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">
        Resultados - {algorithm === 'FIFO' ? 'First In First Out' : algorithm === 'RR' ? 'Round Robin' : 'Shortest Job First'}
      </h2>
      
      {/* Average Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Tiempo de Espera Promedio</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {results.averageWaitingTime.toFixed(2)}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-green-300 font-medium">Tiempo de Retorno Promedio</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {results.averageTurnaroundTime.toFixed(2)}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">Tiempo de Respuesta Promedio</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {results.averageResponseTime.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Detailed Process Results */}
      <div className="overflow-hidden rounded-lg border border-white/20">
        <Table>
          <TableHeader>
            <TableRow className="border-white/20 hover:bg-white/5">
              <TableHead className="text-gray-300">Proceso</TableHead>
              <TableHead className="text-gray-300">Llegada</TableHead>
              <TableHead className="text-gray-300">Ráfaga</TableHead>
              <TableHead className="text-gray-300">Finalización</TableHead>
              <TableHead className="text-gray-300">Retorno</TableHead>
              <TableHead className="text-gray-300">Espera</TableHead>
              <TableHead className="text-gray-300">Respuesta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.processes.map((result) => (
              <TableRow key={result.process.id} className="border-white/20 hover:bg-white/5">
                <TableCell className="text-white font-medium">
                  {result.process.name || `P${result.process.id}`}
                </TableCell>
                <TableCell className="text-gray-300">{result.process.arrivalTime}</TableCell>
                <TableCell className="text-gray-300">{result.process.burstTime}</TableCell>
                <TableCell className="text-gray-300">{result.completionTime}</TableCell>
                <TableCell className="text-blue-400">{result.turnaroundTime}</TableCell>
                <TableCell className="text-green-400">{result.waitingTime}</TableCell>
                <TableCell className="text-purple-400">{result.responseTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
