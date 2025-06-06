
import { useState } from 'react';
import { ProcessForm } from '@/components/ProcessForm';
import { AlgorithmSelector } from '@/components/AlgorithmSelector';
import { ProcessTable } from '@/components/ProcessTable';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { GanttChart } from '@/components/GanttChart';
import { Process, SchedulingResult } from '@/types/scheduling';
import { runFIFO, runRoundRobin, runSJF } from '@/utils/schedulingAlgorithms';
import { Cpu, Sparkles, Play, Settings, Users, BarChart3 } from 'lucide-react';

const Index = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [algorithm, setAlgorithm] = useState<'FIFO' | 'RR' | 'SJF'>('FIFO');
  const [quantum, setQuantum] = useState(2);
  const [results, setResults] = useState<SchedulingResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

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

  const runSimulation = async () => {
    if (processes.length === 0) return;

    setIsSimulating(true);
    
    // Simulate loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

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
        setIsSimulating(false);
        return;
    }
    
    setResults(result);
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75"></div>
              <div className="relative p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <Cpu className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Process Scheduler
              </h1>
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Simula y analiza algoritmos de planificación de procesos con una interfaz moderna e intuitiva
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>FIFO</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Round Robin</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>SJF</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Enhanced Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-8">
            {/* Algorithm Configuration */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-xl">
                    <Settings className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Configuración</h2>
                </div>
                <AlgorithmSelector 
                  algorithm={algorithm} 
                  setAlgorithm={setAlgorithm}
                  quantum={quantum}
                  setQuantum={setQuantum}
                />
              </div>
            </div>

            {/* Process Form */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500/20 rounded-xl">
                    <Users className="w-6 h-6 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Nuevo Proceso</h2>
                </div>
                <ProcessForm onAddProcess={addProcess} />
              </div>
            </div>

            {/* Process Management */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
                <ProcessTable 
                  processes={processes} 
                  onRemoveProcess={removeProcess}
                  onClearProcesses={clearProcesses}
                  onRunSimulation={runSimulation}
                  isSimulating={isSimulating}
                />
              </div>
            </div>
          </div>

          {/* Enhanced Right Panel - Results */}
          <div className="lg:col-span-3 space-y-8">
            {results && (
              <>
                {/* Gantt Chart */}
                <div className="group">
                  <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                        <BarChart3 className="w-7 h-7 text-purple-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Diagrama de Gantt</h2>
                        <p className="text-gray-400">Visualización temporal de la ejecución</p>
                      </div>
                    </div>
                    <GanttChart ganttChart={results.ganttChart} />
                  </div>
                </div>

                {/* Results Display */}
                <div className="group">
                  <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
                    <ResultsDisplay results={results} algorithm={algorithm} />
                  </div>
                </div>
              </>
            )}

            {!results && !isSimulating && (
              <div className="group">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-16 border border-white/10 text-center hover:border-white/20 transition-all duration-300">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-12 h-12 text-gray-400 group-hover:text-gray-300 transition-colors" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-300 mb-4">¡Comienza tu simulación!</h3>
                  <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                    Agrega procesos, selecciona un algoritmo y ejecuta la simulación para ver resultados detallados
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Paso 1: Configurar algoritmo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Paso 2: Agregar procesos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Paso 3: Ejecutar</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isSimulating && (
              <div className="group">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-16 border border-white/20 text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <Play className="w-12 h-12 text-blue-400 animate-spin" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Ejecutando simulación...</h3>
                  <p className="text-gray-400 text-lg">
                    Procesando algoritmo {algorithm === 'FIFO' ? 'First In First Out' : algorithm === 'RR' ? 'Round Robin' : 'Shortest Job First'}
                  </p>
                  <div className="mt-8 flex justify-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
