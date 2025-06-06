import { useState } from 'react';
import { ProcessForm } from '@/components/ProcessForm';
import { AlgorithmSelector } from '@/components/AlgorithmSelector';
import { ProcessTable } from '@/components/ProcessTable';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { GanttChart } from '@/components/GanttChart';
import { OnboardingGuide } from '@/components/OnboardingGuide';
import { MetricsComparison } from '@/components/MetricsComparison';
import { AlgorithmEducation } from '@/components/AlgorithmEducation';
import { ProcessStatistics } from '@/components/ProcessStatistics';
import { Process, SchedulingResult } from '@/types/scheduling';
import { runFIFO, runRoundRobin, runSJF } from '@/utils/schedulingAlgorithms';
import { Cpu, Sparkles, Play, Settings, Users, BarChart3, HelpCircle, GitCompare, BookOpen, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [algorithm, setAlgorithm] = useState<'FIFO' | 'RR' | 'SJF'>('FIFO');
  const [quantum, setQuantum] = useState(2);
  const [results, setResults] = useState<SchedulingResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<SchedulingResult[]>([]);

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
    setComparisonResults([]);
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

  const runComparison = async () => {
    if (processes.length === 0) return;

    setIsSimulating(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));

    const fifoResult = runFIFO(processes);
    const rrResult = runRoundRobin(processes, quantum);
    const sjfResult = runSJF(processes);
    
    setComparisonResults([fifoResult, rrResult, sjfResult]);
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-4 lg:py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8 lg:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-3 lg:p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400 animate-pulse" />
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Process Scheduler
              </h1>
              <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-300 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-6 px-4">
            Simula y analiza algoritmos de planificación de procesos con una interfaz moderna e intuitiva
          </p>
          
          {/* Help Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 mb-6">
            <Button
              onClick={() => setShowOnboarding(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <HelpCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
              ¿Cómo funciona?
            </Button>
            {processes.length > 0 && (
              <Button
                onClick={runComparison}
                disabled={isSimulating}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >
                <GitCompare className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Comparar Algoritmos
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-sm text-gray-400">
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

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Enhanced Left Panel - Controls */}
          <div className="xl:col-span-1 space-y-6 lg:space-y-8">
            {/* Algorithm Configuration */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-xl">
                    <Settings className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white">Configuración</h2>
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
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 transform hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500/20 rounded-xl">
                    <Users className="w-5 h-5 lg:w-6 lg:h-6 text-green-400" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white">Nuevo Proceso</h2>
                </div>
                <ProcessForm onAddProcess={addProcess} />
              </div>
            </div>

            {/* Process Management */}
            <div className="group">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-[1.02]">
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
          <div className="xl:col-span-3 space-y-6 lg:space-y-8">
            {/* Algorithm Education */}
            <AlgorithmEducation />

            {/* Comparison Results */}
            {comparisonResults.length > 0 && (
              <MetricsComparison 
                results={comparisonResults} 
                algorithmNames={['FIFO', 'Round Robin', 'SJF']} 
              />
            )}

            {results && (
              <Tabs defaultValue="gantt" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20 rounded-2xl p-1">
                  <TabsTrigger 
                    value="gantt" 
                    className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-gray-400 transition-all duration-300"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Gantt</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="results" 
                    className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-gray-400 transition-all duration-300"
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Resultados</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="statistics" 
                    className="rounded-xl data-[state=active]:bg-white/20 data-[state=active]:text-white text-gray-400 transition-all duration-300"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Estadísticas</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="gantt" className="mt-6">
                  <div className="group">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                          <BarChart3 className="w-6 h-6 lg:w-7 lg:h-7 text-purple-400" />
                        </div>
                        <div>
                          <h2 className="text-xl lg:text-2xl font-bold text-white">Diagrama de Gantt</h2>
                          <p className="text-gray-400">Visualización temporal de la ejecución</p>
                        </div>
                      </div>
                      <GanttChart ganttChart={results.ganttChart} />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="results" className="mt-6">
                  <div className="group">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10">
                      <ResultsDisplay results={results} algorithm={algorithm} />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="statistics" className="mt-6">
                  <ProcessStatistics results={results} />
                </TabsContent>
              </Tabs>
            )}

            {!results && !isSimulating && (
              <div className="group">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-12 lg:p-16 border border-white/10 text-center hover:border-white/20 transition-all duration-300">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-10 h-10 lg:w-12 lg:h-12 text-gray-400 group-hover:text-gray-300 transition-colors" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-300 mb-4">¡Comienza tu simulación!</h3>
                  <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                    Agrega procesos, selecciona un algoritmo y ejecuta la simulación para ver resultados detallados
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
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
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-12 lg:p-16 border border-white/20 text-center">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <Play className="w-10 h-10 lg:w-12 lg:h-12 text-blue-400 animate-spin" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Ejecutando simulación...</h3>
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

      {/* Onboarding Guide */}
      <OnboardingGuide 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
    </div>
  );
};

export default Index;
