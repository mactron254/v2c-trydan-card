import { describe, expect, it, vi } from "vitest";
import type { HomeAssistant } from "../src/models/types";
import {
  PendingActionTracker,
  setLight,
  setNumber,
  setSelect,
  setSwitch,
} from "../src/services/actions";

const hass = () => ({ states: {}, callService: vi.fn().mockResolvedValue(undefined) }) as unknown as HomeAssistant;

describe("Home Assistant actions", () => {
  it("sends exact number payload", async () => {
    const instance = hass();
    await setNumber(instance, "number.trydan_intensity", 18);
    expect(instance.callService).toHaveBeenCalledWith("number", "set_value", {
      entity_id: "number.trydan_intensity",
      value: 18,
    });
  });

  it("uses standard switch, select and light services", async () => {
    const instance = hass();
    await setSwitch(instance, "switch.pause", true);
    await setSelect(instance, "select.mode", "mixed");
    await setLight(instance, "light.logo", true, 128);
    expect(instance.callService).toHaveBeenNthCalledWith(1, "switch", "turn_on", { entity_id: "switch.pause" });
    expect(instance.callService).toHaveBeenNthCalledWith(2, "select", "select_option", { entity_id: "select.mode", option: "mixed" });
    expect(instance.callService).toHaveBeenNthCalledWith(3, "light", "turn_on", { entity_id: "light.logo", brightness: 128 });
  });

  it("blocks duplicate work per role until it settles", async () => {
    let release: (() => void) | undefined;
    const tracker = new PendingActionTracker();
    const action = vi.fn(() => new Promise<void>((resolve) => (release = resolve)));
    const first = tracker.run("paused", action);
    await expect(tracker.run("paused", action)).resolves.toBe(false);
    expect(action).toHaveBeenCalledTimes(1);
    release?.();
    await expect(first).resolves.toBe(true);
    expect(tracker.isPending("paused")).toBe(false);
  });
});
