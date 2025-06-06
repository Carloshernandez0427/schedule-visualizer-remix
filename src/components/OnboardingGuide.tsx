
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, X, Play, Settings, Users, BarChart3, CheckCircle, Sparkles } from 'lucide-react';

interface OnboardingGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    title: "¡Bienvenido al Simulador de Procesos!",
    description: "Te guiaremos paso a paso para que puedas simular algoritmos de planificación de procesos de manera fácil y efectiva.",
    icon: Sparkles,
    content: "Este simulador te permite visualizar cómo funcionan diferentes algoritmos de planificación como FIFO, Round Robin y SJF."
  },
  {
    title: "Paso 1: Configurar el Algoritmo",
    description: "Primero, selecciona el algoritmo de planificación que deseas simular.",
    icon: Settings,
    content: "Puedes elegir entre FIFO (First In First Out), Round Robin (con quantum configurable) o SJF (Shortest Job First). Cada algoritmo tiene características únicas."
  },
  {
    title: "Paso 2: Agregar Procesos",
    description: "Añade los procesos que quieres simular especificando sus tiempos.",
    icon: Users,
    content: "Para cada proceso necesitas definir: nombre (opcional), tiempo de llegada y tiempo de ráfaga. Puedes agregar tantos procesos como necesites."
  },
  {
    title: "Paso 3: Ejecutar la Simulación",
    description: "Una vez que tengas procesos configurados, ejecuta la simulación.",
    icon: Play,
    content: "Haz clic en 'Ejecutar Simulación' para ver cómo el algoritmo seleccionado procesa tus procesos en tiempo real."
  },
  {
    title: "Paso 4: Analizar Resultados",
    description: "Visualiza los resultados con el diagrama de Gantt y métricas detalladas.",
    icon: BarChart3,
    content: "Verás un diagrama de Gantt interactivo que muestra la línea de tiempo de ejecución, además de métricas como tiempo de espera y tiempo de retorno."
  },
  {
    title: "¡Hecho!",
    description: "Ahora ya sabes cómo usar el simulador. ¡Comienza a experimentar!",
    icon: CheckCircle,
    content: "Simulador desarrollado por Cristian David Arboleda. ¡Disfruta explorando los diferentes algoritmos de planificación de procesos!"
  }
];

export const OnboardingGuide = ({ isOpen, onClose }: OnboardingGuideProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    onClose();
    setCurrentStep(0);
  };

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border-white/20 text-white">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl ${currentStep === steps.length - 1 
              ? 'bg-green-500/20' 
              : 'bg-blue-500/20'
            }`}>
              <IconComponent className={`w-8 h-8 ${currentStep === steps.length - 1 
                ? 'text-green-400' 
                : 'text-blue-400'
              }`} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold">{currentStepData.title}</CardTitle>
              <p className="text-gray-300 mt-1">{currentStepData.description}</p>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex gap-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index <= currentStep 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <p className="text-lg leading-relaxed text-gray-200">
              {currentStepData.content}
            </p>
          </div>

          {currentStep === steps.length - 1 && (
            <div className="text-center bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/30">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-400 mb-2">¡Perfecto!</h3>
              <p className="text-gray-300 mb-4">
                Ya tienes todo lo necesario para usar el simulador de procesos
              </p>
              <div className="text-sm text-gray-400 italic">
                💻 Desarrollado por <span className="text-blue-400 font-semibold">Cristian David Arboleda</span>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <span className="text-sm text-gray-400">
              {currentStep + 1} de {steps.length}
            </span>

            {currentStep === steps.length - 1 ? (
              <Button
                onClick={handleFinish}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                ¡Empezar!
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Siguiente
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
