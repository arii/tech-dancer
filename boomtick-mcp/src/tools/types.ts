export type JulesStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";

export interface JulesSession {
  id: string;
  status: JulesStatus;
  createdAt: string;
  pullRequestUrl?: string;
  recentMessage?: string;
}
