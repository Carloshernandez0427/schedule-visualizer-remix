
import { Process, SchedulingResult } from '@/types/scheduling';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Activity, PieChart as PieChartIcon, BarChart3, TrendingUp } from 'lucide-react';

interface ProcessStatisticsProps {
  results: SchedulingResult;
}

export const ProcessStatistics = ({ results }: ProcessStatisticsProps) => {
  const chartData = results.processes.map(result => ({
    name: result.process.name || `P${result.process.id}`,
    waiting: result.waitingTime,
    turnaround: result.turnaroundTime,
    response: result.responseTime,
    burst: result.process.burstTime
  }));

  const pieData = results.processes.map((result, index) => ({
    name: result.process.name || `P${result.process.id}`,
    value: result.process.burstTime,
    color: `hsl(${(index * 137.5) % 360}, 70%, 60%)`
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <BarChart3 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-lg text-white">Tiempos por Proceso</CardTitle>
              <p className="text-gray-400 text-sm">Comparación de métricas temporales</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#9CA3AF" 
                  fontSize={12}
                  tick={{ fill: '#9CA3AF' }}
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  fontSize={12}
                  tick={{ fill: '#9CA3AF' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  labelStyle={{ color: '#F9FAFB' }}
                />
                <Bar dataKey="waiting" fill="#3B82F6" name="Espera" radius={[2, 2, 0, 0]} />
                <Bar dataKey="turnaround" fill="#10B981" name="Retorno" radius={[2, 2, 0, 0]} />
                <Bar dataKey="response" fill="#F59E0B" name="Respuesta" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <PieChartIcon className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-lg text-white">Distribución de Ráfagas</CardTitle>
              <p className="text-gray-400 text-sm">Proporción del tiempo de CPU por proceso</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  animationBegin={0}
                  animationDuration={800}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
