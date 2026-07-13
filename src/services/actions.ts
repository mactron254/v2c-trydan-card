import type { EntityRole, HomeAssistant } from "../models/types";

export async function setNumber(hass: HomeAssistant, entityId: string, value: number) {
  return hass.callService("number", "set_value", { entity_id: entityId, value });
}

export async function setSwitch(hass: HomeAssistant, entityId: string, enabled: boolean) {
  return hass.callService("switch", enabled ? "turn_on" : "turn_off", {
    entity_id: entityId,
  });
}

export async function setSelect(hass: HomeAssistant, entityId: string, option: string) {
  return hass.callService("select", "select_option", { entity_id: entityId, option });
}

export async function setLight(
  hass: HomeAssistant,
  entityId: string,
  enabled: boolean,
  brightness?: number,
) {
  const data: Record<string, unknown> = { entity_id: entityId };
  if (enabled && brightness !== undefined) data.brightness = brightness;
  return hass.callService("light", enabled ? "turn_on" : "turn_off", data);
}

export class PendingActionTracker {
  readonly #pending = new Set<EntityRole>();

  isPending(role: EntityRole): boolean {
    return this.#pending.has(role);
  }

  async run(role: EntityRole, action: () => Promise<unknown>): Promise<boolean> {
    if (this.#pending.has(role)) return false;
    this.#pending.add(role);
    try {
      await action();
      return true;
    } finally {
      this.#pending.delete(role);
    }
  }
}
