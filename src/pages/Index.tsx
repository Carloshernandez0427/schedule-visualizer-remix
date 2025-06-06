
import { useState } from 'react';
import { ProcessForm } from '@/components/ProcessForm';
import { AlgorithmSelector } from '@/components/AlgorithmSelector';
import { ProcessTable } from '@/components/ProcessTable';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { GanttChart } from '@/components/GanttChart';
import { Process, SchedulingResult } from '@/types/scheduling';
import { runFIFO, runRoundRobin, runSJF } from '@/utils/schedulingAlgorithms';
import { Cpu, Clock, BarChart3 } from 'lucide-react';

const Index = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [algorithm, setAlgorithm] = useState<'FIFO' | 'RR' | 'SJF'>('FIFO');
  const [quantum, setQuantum] = useState(2);
  const [results, setResults] = useState<SchedulingResult | null>(null);

  const addProcess = (process: Omit<Process, 'id'>) => {
    const newProcess: Process = {
      id: processes.length + 1,
      ...process
    };
    setProcesses([...processes, newProcess]);
  };

  const removeProcess = (id: number) => {
    setProcesses(processes.filter(p => p.id !== id));
  };

  const clearProcesses = () => {
    setProcesses([]);
    setResults(null);
  };

  const runSimulation = () => {
    if (processes.length === 0) return;

    let result: SchedulingResult;
    switch (algorithm) {
      case 'FIFO':
        result = runFIFO(processes);
        break;
      case 'RR':
        result = runRoundRobin(processes, quantum);
        break;
      case 'SJF':
        result = runSJF(processes);
        break;
      default:
        return;
    }
    setResults(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Cpu className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Simulador de Algoritmos de Planificación
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Simula y compara diferentes algoritmos de planificación de procesos: FIFO, Round Robin y SJF
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Input Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Configuración</h2>
              </div>
              <AlgorithmSelector 
                algorithm={algorithm} 
                setAlgorithm={setAlgorithm}
                quantum={quantum}
                setQuantum={setQuantum}
              />
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <ProcessForm onAddProcess={addProcess} />
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <ProcessTable 
                processes={processes} 
                onRemoveProcess={removeProcess}
                onClearProcesses={clearProcesses}
                onRunSimulation={runSimulation}
              />
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2 space-y-6">
            {results && (
              <>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                    <h2 className="text-xl font-semibold text-white">Diagrama de Gantt</h2>
                  </div>
                  <GanttChart ganttChart={results.ganttChart} />
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <ResultsDisplay results={results} algorithm={algorithm} />
                </div>
              </>
            )}

            {!results && (
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Sin resultados</h3>
                <p className="text-gray-400">
                  Agrega procesos y ejecuta la simulación para ver los resultados
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
