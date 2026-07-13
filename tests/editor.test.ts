import { beforeEach, describe, expect, it } from "vitest";
import "../src/index";
import type { HomeAssistant } from "../src/models/types";
import { V2cTrydanCard } from "../src/card/v2c-trydan-card";
import type { V2cTrydanCardEditor } from "../src/editor/v2c-trydan-card-editor";

describe("V2C editor and registration", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("provides a V2C stub config", () => {
    const hass = {
      states: { "binary_sensor.my_v2c_connected": { entity_id: "binary_sensor.my_v2c_connected", state: "off", attributes: {} } },
      entities: {
        "binary_sensor.my_v2c_connected": {
          entity_id: "binary_sensor.my_v2c_connected",
          platform: "v2c",
          translation_key: "connected",
        },
      },
    } as unknown as HomeAssistant;
    expect(V2cTrydanCard.getStubConfig(hass).entity).toBe("binary_sensor.my_v2c_connected");
  });

  it("emits config-changed from visual fields", async () => {
    const editor = document.createElement("v2c-trydan-card-editor") as V2cTrydanCardEditor;
    editor.hass = { states: {}, callService: async () => undefined };
    editor.setConfig({ type: "custom:v2c-trydan-card", entity: "binary_sensor.seed" });
    document.body.append(editor);
    await editor.updateComplete;
    const eventPromise = new Promise<CustomEvent>((resolve) =>
      editor.addEventListener("config-changed", (event) => resolve(event as CustomEvent), { once: true }),
    );
    const input = editor.shadowRoot?.querySelector<HTMLInputElement>('input[data-field="name"]');
    if (!input) throw new Error("name field missing");
    input.value = "Trydan Garaje";
    input.dispatchEvent(new Event("change", { bubbles: true }));
    const event = await eventPromise;
    expect(event.detail.config.name).toBe("Trydan Garaje");
  });

  it("registers card and editor once", () => {
    expect(customElements.get("v2c-trydan-card")).toBeTruthy();
    expect(customElements.get("v2c-trydan-card-editor")).toBeTruthy();
    expect(window.customCards?.filter((card) => card.type === "v2c-trydan-card")).toHaveLength(1);
  });
});
