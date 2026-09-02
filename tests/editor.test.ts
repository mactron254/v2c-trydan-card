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

  it("renders charger_art choices and show_connector toggle with the default values reflected", async () => {
    const editor = document.createElement("v2c-trydan-card-editor") as V2cTrydanCardEditor;
    editor.hass = { states: {}, callService: async () => undefined };
    editor.setConfig({ type: "custom:v2c-trydan-card", entity: "binary_sensor.seed" });
    document.body.append(editor);
    await editor.updateComplete;
    const choices = editor.shadowRoot?.querySelectorAll<HTMLButtonElement>('button[data-field="charger_art"]');
    expect(choices).toHaveLength(3);
    expect(choices?.[0]?.getAttribute("data-value")).toBe("focus");
    expect(choices?.[0]?.getAttribute("aria-pressed")).toBe("true");
    expect(choices?.[1]?.getAttribute("aria-pressed")).toBe("false");
    expect(choices?.[2]?.getAttribute("aria-pressed")).toBe("false");
    const connector = editor.shadowRoot?.querySelector<HTMLInputElement>('input[data-field="show_connector"]');
    expect(connector?.checked).toBe(false);
  });

  it("emits config-changed when a charger_art choice is clicked", async () => {
    const editor = document.createElement("v2c-trydan-card-editor") as V2cTrydanCardEditor;
    editor.hass = { states: {}, callService: async () => undefined };
    editor.setConfig({ type: "custom:v2c-trydan-card", entity: "binary_sensor.seed" });
    document.body.append(editor);
    await editor.updateComplete;
    const eventPromise = new Promise<CustomEvent>((resolve) =>
      editor.addEventListener("config-changed", (event) => resolve(event as CustomEvent), { once: true }),
    );
    const full = editor.shadowRoot?.querySelector<HTMLButtonElement>('button[data-field="charger_art"][data-value="full"]');
    if (!full) throw new Error("charger_art full choice missing");
    full.click();
    const event = await eventPromise;
    expect(event.detail.config.charger_art).toBe("full");
    await editor.updateComplete;
    expect(full.getAttribute("aria-pressed")).toBe("true");
  });

  it("emits config-changed when show_connector is toggled", async () => {
    const editor = document.createElement("v2c-trydan-card-editor") as V2cTrydanCardEditor;
    editor.hass = { states: {}, callService: async () => undefined };
    editor.setConfig({ type: "custom:v2c-trydan-card", entity: "binary_sensor.seed" });
    document.body.append(editor);
    await editor.updateComplete;
    const eventPromise = new Promise<CustomEvent>((resolve) =>
      editor.addEventListener("config-changed", (event) => resolve(event as CustomEvent), { once: true }),
    );
    const connector = editor.shadowRoot?.querySelector<HTMLInputElement>('input[data-field="show_connector"]');
    if (!connector) throw new Error("show_connector field missing");
    connector.checked = true;
    connector.dispatchEvent(new Event("change", { bubbles: true }));
    const event = await eventPromise;
    expect(event.detail.config.show_connector).toBe(true);
  });
});
