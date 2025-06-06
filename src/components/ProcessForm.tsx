
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, User } from 'lucide-react';
import { Process } from '@/types/scheduling';

interface ProcessFormProps {
  onAddProcess: (process: Omit<Process, 'id'>) => void;
}

export const ProcessForm = ({ onAddProcess }: ProcessFormProps) => {
  const [name, setName] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [burstTime, setBurstTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!arrivalTime || !burstTime) return;

    const arrival = parseInt(arrivalTime);
    const burst = parseInt(burstTime);

    if (arrival < 0 || burst <= 0) return;

    onAddProcess({
      name: name || `P${Date.now()}`,
      arrivalTime: arrival,
      burstTime: burst
    });

    setName('');
    setArrivalTime('');
    setBurstTime('');
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <User className="w-5 h-5 text-green-400" />
        <h2 className="text-xl font-semibold text-white">Agregar Proceso</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-gray-300">Nombre del Proceso</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="P1, Proceso A, etc."
            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
        
        <div>
          <Label htmlFor="arrivalTime" className="text-gray-300">Tiempo de Llegada</Label>
          <Input
            id="arrivalTime"
            type="number"
            min="0"
            value={arrivalTime}
            onChange={(e) => setArrivalTime(e.target.value)}
            placeholder="0"
            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="burstTime" className="text-gray-300">Tiempo de Ráfaga</Label>
          <Input
            id="burstTime"
            type="number"
            min="1"
            value={burstTime}
            onChange={(e) => setBurstTime(e.target.value)}
            placeholder="1"
            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Proceso
        </Button>
      </form>
    </div>
  );
};
