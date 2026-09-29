// Test environment: every required variable set, an in-memory blob store.
import { resetEnvCache } from "@/lib/env";
import { setBlobStore } from "@/lib/store";
import { memoryBlobStore } from "@/lib/store/memory";

export function testEnv(overrides: Record<string, string> = {}): void {
  Object.assign(process.env, {
    OPENDOT_COOKIE_SECRET: "c".repeat(40),
    OPENDOT_OWNER_SECRET: "o".repeat(24),
    OPENDOT_AGENT_SECRET: "a".repeat(40),
    OPENDOT_INSTALLATION_ID: "test",
    OPENDOT_APP_ORIGIN: "https://opendot.test",
    OPENCOMPUTER_PROJECT_ID: "prj_test",
    OPENDOT_COORDINATOR_AGENT: "c",
    OPENDOT_WORKER_AGENT: "w",
    OPENCOMPUTER_API_KEY: "k",
    OPENDOT_STATE_STORE: "memory",
    ...overrides,
  });
  resetEnvCache();
  setBlobStore(memoryBlobStore());
}
