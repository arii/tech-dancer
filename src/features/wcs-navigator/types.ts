export interface SubTask {
  id: string;
  label: string;
  status: 'completed' | 'in_progress' | 'pending';
  detail?: string;
}

export interface BufferStep {
  label: string;
  time: string;
  duration?: string;
  type: 'staging' | 'warmup' | 'hotel' | 'transit' | 'flight';
  description?: string;
}

export interface FlightBuffer {
  earliestStagingTime: string;
  warmupMinutes: number;
  hotelSettleMinutes: number;
  transitMinutes: number;
  latestFlightArrivalDeadline: string;
  steps: BufferStep[];
  formulaSummary: string;
}

export interface AuditSession {
  id: string;
  title: string;
  time: string;
  location: string;
  status: 'included' | 'filtered';
  decisionBadge: string;
  justification: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: 'footwear' | 'attire' | 'toiletries' | 'tech' | 'essentials';
  rationale: string;
  quantity?: number;
}

export interface AgentDecisionTrace {
  subTasks: SubTask[];
  bufferTimeline: FlightBuffer;
  sessions: AuditSession[];
  packingManifest: PackingItem[];
  icsContent: string;
}
