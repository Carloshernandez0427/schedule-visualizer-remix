
export interface Process {
  id: number;
  arrivalTime: number;
  burstTime: number;
  name?: string;
}

export interface ProcessExecution {
  processId: number;
  startTime: number;
  endTime: number;
  name?: string;
}

export interface ProcessResult {
  process: Process;
  completionTime: number;
  turnaroundTime: number;
  waitingTime: number;
  responseTime: number;
}

export interface SchedulingResult {
  processes: ProcessResult[];
  ganttChart: ProcessExecution[];
  averageWaitingTime: number;
  averageTurnaroundTime: number;
  averageResponseTime: number;
  totalTime: number;
}
