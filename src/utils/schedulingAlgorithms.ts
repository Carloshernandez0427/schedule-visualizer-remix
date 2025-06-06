
import { Process, SchedulingResult, ProcessResult, ProcessExecution } from '@/types/scheduling';

export const runFIFO = (processes: Process[]): SchedulingResult => {
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const results: ProcessResult[] = [];
  const ganttChart: ProcessExecution[] = [];
  
  let currentTime = 0;
  
  for (const process of sortedProcesses) {
    const startTime = Math.max(currentTime, process.arrivalTime);
    const completionTime = startTime + process.burstTime;
    
    ganttChart.push({
      processId: process.id,
      startTime,
      endTime: completionTime,
      name: process.name
    });
    
    const turnaroundTime = completionTime - process.arrivalTime;
    const waitingTime = turnaroundTime - process.burstTime;
    const responseTime = startTime - process.arrivalTime;
    
    results.push({
      process,
      completionTime,
      turnaroundTime,
      waitingTime,
      responseTime
    });
    
    currentTime = completionTime;
  }
  
  const averageWaitingTime = results.reduce((sum, r) => sum + r.waitingTime, 0) / results.length;
  const averageTurnaroundTime = results.reduce((sum, r) => sum + r.turnaroundTime, 0) / results.length;
  const averageResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
  
  return {
    processes: results,
    ganttChart,
    averageWaitingTime,
    averageTurnaroundTime,
    averageResponseTime,
    totalTime: currentTime
  };
};

export const runRoundRobin = (processes: Process[], quantum: number): SchedulingResult => {
  const processQueue = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const results: ProcessResult[] = [];
  const ganttChart: ProcessExecution[] = [];
  
  // Initialize remaining times and response times
  const remainingTimes = new Map<number, number>();
  const responseTimes = new Map<number, number>();
  const firstRun = new Set<number>();
  
  processes.forEach(p => {
    remainingTimes.set(p.id, p.burstTime);
    responseTimes.set(p.id, -1);
  });
  
  const readyQueue: Process[] = [];
  let currentTime = 0;
  let processIndex = 0;
  
  while (readyQueue.length > 0 || processIndex < processQueue.length) {
    // Add new arrivals to ready queue
    while (processIndex < processQueue.length && processQueue[processIndex].arrivalTime <= currentTime) {
      readyQueue.push(processQueue[processIndex]);
      processIndex++;
    }
    
    if (readyQueue.length === 0) {
      // No process ready, advance time to next arrival
      if (processIndex < processQueue.length) {
        currentTime = processQueue[processIndex].arrivalTime;
      }
      continue;
    }
    
    const currentProcess = readyQueue.shift()!;
    const remainingTime = remainingTimes.get(currentProcess.id)!;
    
    // Record response time on first execution
    if (!firstRun.has(currentProcess.id)) {
      responseTimes.set(currentProcess.id, currentTime - currentProcess.arrivalTime);
      firstRun.add(currentProcess.id);
    }
    
    const executionTime = Math.min(quantum, remainingTime);
    const startTime = currentTime;
    const endTime = currentTime + executionTime;
    
    ganttChart.push({
      processId: currentProcess.id,
      startTime,
      endTime,
      name: currentProcess.name
    });
    
    currentTime = endTime;
    const newRemainingTime = remainingTime - executionTime;
    remainingTimes.set(currentProcess.id, newRemainingTime);
    
    // Add new arrivals that came during execution
    while (processIndex < processQueue.length && processQueue[processIndex].arrivalTime <= currentTime) {
      readyQueue.push(processQueue[processIndex]);
      processIndex++;
    }
    
    if (newRemainingTime > 0) {
      // Process not finished, add back to queue
      readyQueue.push(currentProcess);
    } else {
      // Process finished
      const completionTime = currentTime;
      const turnaroundTime = completionTime - currentProcess.arrivalTime;
      const waitingTime = turnaroundTime - currentProcess.burstTime;
      const responseTime = responseTimes.get(currentProcess.id)!;
      
      results.push({
        process: currentProcess,
        completionTime,
        turnaroundTime,
        waitingTime,
        responseTime
      });
    }
  }
  
  // Sort results by process ID for consistent display
  results.sort((a, b) => a.process.id - b.process.id);
  
  const averageWaitingTime = results.reduce((sum, r) => sum + r.waitingTime, 0) / results.length;
  const averageTurnaroundTime = results.reduce((sum, r) => sum + r.turnaroundTime, 0) / results.length;
  const averageResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
  
  return {
    processes: results,
    ganttChart,
    averageWaitingTime,
    averageTurnaroundTime,
    averageResponseTime,
    totalTime: currentTime
  };
};

export const runSJF = (processes: Process[]): SchedulingResult => {
  const results: ProcessResult[] = [];
  const ganttChart: ProcessExecution[] = [];
  const remainingProcesses = [...processes];
  
  let currentTime = 0;
  
  while (remainingProcesses.length > 0) {
    // Find available processes (arrived by current time)
    const availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
    
    if (availableProcesses.length === 0) {
      // No process available, jump to next arrival time
      const nextArrival = Math.min(...remainingProcesses.map(p => p.arrivalTime));
      currentTime = nextArrival;
      continue;
    }
    
    // Select shortest job among available processes
    const shortestJob = availableProcesses.reduce((shortest, current) => 
      current.burstTime < shortest.burstTime ? current : shortest
    );
    
    const startTime = currentTime;
    const completionTime = startTime + shortestJob.burstTime;
    
    ganttChart.push({
      processId: shortestJob.id,
      startTime,
      endTime: completionTime,
      name: shortestJob.name
    });
    
    const turnaroundTime = completionTime - shortestJob.arrivalTime;
    const waitingTime = turnaroundTime - shortestJob.burstTime;
    const responseTime = startTime - shortestJob.arrivalTime;
    
    results.push({
      process: shortestJob,
      completionTime,
      turnaroundTime,
      waitingTime,
      responseTime
    });
    
    currentTime = completionTime;
    
    // Remove completed process
    const index = remainingProcesses.findIndex(p => p.id === shortestJob.id);
    remainingProcesses.splice(index, 1);
  }
  
  // Sort results by process ID for consistent display
  results.sort((a, b) => a.process.id - b.process.id);
  
  const averageWaitingTime = results.reduce((sum, r) => sum + r.waitingTime, 0) / results.length;
  const averageTurnaroundTime = results.reduce((sum, r) => sum + r.turnaroundTime, 0) / results.length;
  const averageResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
  
  return {
    processes: results,
    ganttChart,
    averageWaitingTime,
    averageTurnaroundTime,
    averageResponseTime,
    totalTime: currentTime
  };
};
