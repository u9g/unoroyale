export interface Env {
  MATCH: DurableObjectNamespace
  DB: D1Database
  /** Secret: `wrangler secret put SESSION_SECRET` */
  SESSION_SECRET?: string
  /** Overridable so tests do not wait out the AI's thinking time */
  AI_DELAY_MS?: string
}
