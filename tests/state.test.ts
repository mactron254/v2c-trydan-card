import { describe, expect, it } from "vitest";
import { resolveSnapshot, resolveVisualState } from "../src/services/state";
import { VISUAL_STATE_KEYS, type ChargerEvidence } from "../src/models/types";

const resolve = (evidence: ChargerEvidence) => resolveVisualState(resolveSnapshot(evidence));

describe("layered V2C state", () => {
  it("keeps positive charging evidence when connected or seed is unavailable", () => {
    const state = resolve({ seedAvailable: false, connected: false, charging: true });
    expect(state.key).toBe("charging");
    expect(state.unavailable).toBe(false);
  });

  it("lets charging outrank a contradictory ready signal", () => {
    expect(resolve({ connected: true, charging: true, ready: true }).key).toBe("charging");
  });

  it("keeps pause and timer as badges on a completed phase", () => {
    const state = resolve({ connected: true, ready: true, paused: true, timer: true });
    expect(state.key).toBe("complete");
    expect(state.badges).toEqual(expect.arrayContaining(["paused", "timer"]));
  });

  it("does not turn an ignored meter error into a global fault", () => {
    const state = resolve({ connected: true, dynamic: false, meterError: "crc_error" });
    expect(state.key).toBe("waiting_power");
    expect(state.diagnostic).toBe("crc_error");
  });

  it("maps Wi-Fi wait only while dynamic control is enabled", () => {
    expect(
      resolve({ connected: true, dynamic: true, meterError: "waiting_wifi" }).key,
    ).toBe("wifi_connecting");
  });

  it("maps actionable meter errors to generic error, never load balancing", () => {
    expect(resolve({ connected: true, dynamic: true, meterError: "crc_error" }).key).toBe(
      "error",
    );
  });

  it("normalizes all explicit 11 visual states", () => {
    for (const key of VISUAL_STATE_KEYS) {
      expect(resolve({ externalStatus: key }).key).toBe(key);
    }
  });

  it("accepts Spanish and separated external aliases", () => {
    expect(resolve({ externalStatus: "carga completa" }).key).toBe("complete");
    expect(resolve({ externalStatus: "control-pilot" }).key).toBe("control_pilot");
  });

  it("treats unknown core evidence as unavailable, not disconnected", () => {
    const state = resolve({ seedAvailable: false });
    expect(state.key).toBe("disconnected");
    expect(state.unavailable).toBe(true);
  });
});
