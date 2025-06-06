
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface AlgorithmSelectorProps {
  algorithm: 'FIFO' | 'RR' | 'SJF';
  setAlgorithm: (algorithm: 'FIFO' | 'RR' | 'SJF') => void;
  quantum: number;
  setQuantum: (quantum: number) => void;
}

export const AlgorithmSelector = ({ algorithm, setAlgorithm, quantum, setQuantum }: AlgorithmSelectorProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-gray-300">Algoritmo de Planificación</Label>
        <Select value={algorithm} onValueChange={setAlgorithm}>
          <SelectTrigger className="bg-white/5 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-white/20">
            <SelectItem value="FIFO" className="text-white hover:bg-white/10">
              FIFO (First In, First Out)
            </SelectItem>
            <SelectItem value="RR" className="text-white hover:bg-white/10">
              Round Robin
            </SelectItem>
            <SelectItem value="SJF" className="text-white hover:bg-white/10">
              SJF (Shortest Job First)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {algorithm === 'RR' && (
        <div>
          <Label htmlFor="quantum" className="text-gray-300">Quantum de Tiempo</Label>
          <Input
            id="quantum"
            type="number"
            min="1"
            value={quantum}
            onChange={(e) => setQuantum(parseInt(e.target.value) || 1)}
            className="bg-white/5 border-white/20 text-white"
          />
        </div>
      )}
    </div>
  );
};
