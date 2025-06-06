
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Process } from '@/types/scheduling';
import { Trash2, Play, RotateCcw, Users, Sparkles, Zap } from 'lucide-react';

interface ProcessTableProps {
  processes: Process[];
  onRemoveProcess: (id: number) => void;
  onClearProcesses: () => void;
  onRunSimulation: () => void;
  isSimulating?: boolean;
}

export const ProcessTable = ({ 
  processes, 
  onRemoveProcess, 
  onClearProcesses, 
  onRunSimulation,
  isSimulating = false 
}: ProcessTableProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded-xl">
          <Users className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Procesos</h2>
          <p className="text-gray-400 text-sm">
            {processes.length} proceso{processes.length !== 1 ? 's' : ''} en cola
          </p>
        </div>
      </div>
      
      {processes.length > 0 ? (
        <>
          <div className="overflow-hidden rounded-2xl border border-white/20 mb-6 bg-white/5 backdrop-blur-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 hover:bg-white/5 bg-white/10">
                  <TableHead className="text-gray-200 font-semibold py-4">Proceso</TableHead>
                  <TableHead className="text-gray-200 font-semibold">Llegada</TableHead>
                  <TableHead className="text-gray-200 font-semibold">Ráfaga</TableHead>
                  <TableHead className="text-gray-200 font-semibold text-center">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processes.map((process, index) => (
                  <TableRow 
                    key={process.id} 
                    className="border-white/20 hover:bg-white/10 transition-colors group"
                  >
                    <TableCell className="text-white font-medium py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                        <span>{process.name || `P${process.id}`}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{process.arrivalTime}</span>
                        <span className="text-xs text-gray-500">ms</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{process.burstTime}</span>
                        <span className="text-xs text-gray-500">ms</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRemoveProcess(process.id)}
                        className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 hover:border-red-400 transition-all duration-200 group-hover:scale-105"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={onRunSimulation}
              disabled={isSimulating}
              className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white border-0 text-lg py-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSimulating ? (
                <>
                  <Zap className="w-5 h-5 mr-2 animate-spin" />
                  Simulando...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Ejecutar Simulación
                  <Sparkles className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
            <Button 
              onClick={onClearProcesses}
              variant="outline"
              className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 hover:border-red-400 px-6 py-6 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No hay procesos</h3>
          <p className="text-gray-400 mb-6">Agrega algunos procesos para comenzar la simulación</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Tiempo de llegada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Tiempo de ráfaga</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
