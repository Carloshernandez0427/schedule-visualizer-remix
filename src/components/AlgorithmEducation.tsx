
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ChevronDown, ChevronUp, Clock, Users, Zap, Target, AlertCircle, CheckCircle } from 'lucide-react';

const algorithmInfo = {
  FIFO: {
    name: "First In, First Out (FCFS)",
    description: "El algoritmo más simple donde los procesos se ejecutan en el orden de llegada.",
    icon: Clock,
    color: "from-green-500 to-emerald-600",
    advantages: [
      "Implementación muy simple",
      "No hay inanición (starvation)",
      "Justo en términos de orden de llegada",
      "Predecible y determinístico"
    ],
    disadvantages: [
      "Tiempo de espera promedio alto",
      "Efecto convoy (procesos cortos esperan a largos)",
      "No es óptimo para sistemas interactivos",
      "No considera la prioridad de procesos"
    ],
    bestUse: "Sistemas batch donde el orden de llegada es importante y no hay requisitos de tiempo real.",
    complexity: "O(n) - Lineal"
  },
  RR: {
    name: "Round Robin",
    description: "Asigna un quantum de tiempo fijo a cada proceso de manera circular.",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
    advantages: [
      "Excelente para sistemas interactivos",
      "Tiempo de respuesta bajo",
      "No hay inanición",
      "Distribución justa del tiempo de CPU"
    ],
    disadvantages: [
      "Overhead por cambios de contexto",
      "Difícil elegir el quantum óptimo",
      "Tiempo de retorno puede ser alto",
      "No diferencia entre tipos de procesos"
    ],
    bestUse: "Sistemas de tiempo compartido y aplicaciones interactivas donde la respuesta rápida es crucial.",
    complexity: "O(n) - Lineal"
  },
  SJF: {
    name: "Shortest Job First",
    description: "Ejecuta primero el proceso con menor tiempo de ráfaga.",
    icon: Zap,
    color: "from-purple-500 to-pink-600",
    advantages: [
      "Tiempo de espera promedio mínimo",
      "Óptimo para minimizar tiempo total",
      "Eficiente para procesos conocidos",
      "Reduce el tiempo de retorno promedio"
    ],
    disadvantages: [
      "Requiere conocer el tiempo de ráfaga",
      "Puede causar inanición en procesos largos",
      "Difícil de implementar en la realidad",
      "No es justo para procesos largos"
    ],
    bestUse: "Sistemas donde se conocen los tiempos de ejecución y se busca optimizar el rendimiento global.",
    complexity: "O(n log n) - Logarítmico"
  }
};

export const AlgorithmEducation = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<keyof typeof algorithmInfo | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
            <BookOpen className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-2xl text-white">Guía de Algoritmos</CardTitle>
            <p className="text-gray-400">Aprende sobre cada algoritmo de planificación</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(algorithmInfo).map(([key, info]) => {
            const IconComponent = info.icon;
            const isExpanded = expandedCard === key;
            
            return (
              <div 
                key={key} 
                className="group cursor-pointer"
                onClick={() => setExpandedCard(isExpanded ? null : key)}
              >
                <div className={`bg-gradient-to-br ${info.color} bg-opacity-10 rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-[1.02] ${isExpanded ? 'ring-2 ring-blue-400/50' : ''}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-gradient-to-r ${info.color} bg-opacity-20 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm md:text-base">{key}</h3>
                        <p className="text-xs text-gray-400 hidden sm:block">
                          {info.complexity}
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {info.description}
                  </p>

                  {isExpanded && (
                    <div className="space-y-4 animate-accordion-down">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <h4 className="font-semibold text-green-400 text-sm">Ventajas</h4>
                        </div>
                        <ul className="space-y-1">
                          {info.advantages.map((advantage, index) => (
                            <li key={index} className="text-xs text-gray-300 flex items-start gap-2">
                              <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              {advantage}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-red-400" />
                          <h4 className="font-semibold text-red-400 text-sm">Desventajas</h4>
                        </div>
                        <ul className="space-y-1">
                          {info.disadvantages.map((disadvantage, index) => (
                            <li key={index} className="text-xs text-gray-300 flex items-start gap-2">
                              <div className="w-1 h-1 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                              {disadvantage}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-blue-400" />
                          <h4 className="font-semibold text-blue-400 text-sm">Mejor uso</h4>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {info.bestUse}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
