// Test environment: every required variable set, an in-memory blob store.
import { resetEnvCache } from "@/lib/env";
import { setBlobStore } from "@/lib/store";
import { memoryBlobStore } from "@/lib/store/memory";

export function testEnv(overrides: Record<string, string> = {}): void {
  Object.assign(process.env, {
    OPENDOTS_COOKIE_SECRET: "c".repeat(40),
    OPENDOTS_OWNER_SECRET: "o".repeat(24),
    OPENDOTS_AGENT_SECRET: "a".repeat(40),
    OPENDOTS_INSTALLATION_ID: "test",
    OPENDOTS_APP_ORIGIN: "https://opendots.test",
    OPENCOMPUTER_PROJECT_ID: "prj_test",
    OPENDOTS_COORDINATOR_AGENT: "c",
    OPENDOTS_WORKER_AGENT: "w",
    OPENCOMPUTER_API_KEY: "k",
    OPENDOTS_STATE_STORE: "memory",
    ...overrides,
  });
  resetEnvCache();
  setBlobStore(memoryBlobStore());
}
