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

export interface ThemeDressCode {
  id: string;
  day: string;
  themeTitle: string;
  category: 'social_theme' | 'showcase_formal' | 'competition_attire' | 'casual_sunday';
  description: string;
  recommendedAttire: string[];
  vibe: string;
}

export interface AgentDecisionTrace {
  subTasks: SubTask[];
  bufferTimeline: FlightBuffer;
  sessions: AuditSession[];
  themeDressCodes?: ThemeDressCode[];
  icsContent: string;
}

export interface GenerateResponse {
  decisionTrace: AgentDecisionTrace;
  icsContent: string;
  visualScheduleMarkdown?: string;
}
