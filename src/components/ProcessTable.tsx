
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Process } from '@/types/scheduling';
import { Trash2, Play, RotateCcw } from 'lucide-react';

interface ProcessTableProps {
  processes: Process[];
  onRemoveProcess: (id: number) => void;
  onClearProcesses: () => void;
  onRunSimulation: () => void;
}

export const ProcessTable = ({ processes, onRemoveProcess, onClearProcesses, onRunSimulation }: ProcessTableProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Lista de Procesos</h2>
      
      {processes.length > 0 ? (
        <>
          <div className="overflow-hidden rounded-lg border border-white/20 mb-4">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 hover:bg-white/5">
                  <TableHead className="text-gray-300">Proceso</TableHead>
                  <TableHead className="text-gray-300">Llegada</TableHead>
                  <TableHead className="text-gray-300">Ráfaga</TableHead>
                  <TableHead className="text-gray-300">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processes.map((process) => (
                  <TableRow key={process.id} className="border-white/20 hover:bg-white/5">
                    <TableCell className="text-white font-medium">
                      {process.name || `P${process.id}`}
                    </TableCell>
                    <TableCell className="text-gray-300">{process.arrivalTime}</TableCell>
                    <TableCell className="text-gray-300">{process.burstTime}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRemoveProcess(process.id)}
                        className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={onRunSimulation}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
            >
              <Play className="w-4 h-4 mr-2" />
              Ejecutar Simulación
            </Button>
            <Button 
              onClick={onClearProcesses}
              variant="outline"
              className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <p>No hay procesos agregados</p>
          <p className="text-sm">Agrega algunos procesos para comenzar</p>
        </div>
      )}
    </div>
  );
};
