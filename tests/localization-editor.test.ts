import { beforeEach, describe, expect, it } from "vitest";
import "../src/index";
import { getDictionary, getLanguage, SUPPORTED_LANGUAGES } from "../src/localization";
import type { HomeAssistant } from "../src/models/types";
import type { V2cTrydanCardEditor } from "../src/editor/v2c-trydan-card-editor";

describe("multilingual GUI editor", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("supports the ten requested languages and Home Assistant locale variants", () => {
    expect(SUPPORTED_LANGUAGES).toEqual(["en", "it", "de", "fr", "nl", "sv", "da", "no", "ro", "es"]);
    expect(getLanguage("fr-FR")).toBe("fr");
    expect(getLanguage("nb-NO")).toBe("no");
    expect(getLanguage("pt-BR")).toBe("en");
    for (const language of SUPPORTED_LANGUAGES) {
      const dictionary = getDictionary(language);
      expect(dictionary.states.charging).not.toBe("");
      expect(dictionary.editor.theme).not.toBe("");
      expect(dictionary.editor.modeUltra).not.toBe("");
      expect(dictionary.labels.power).not.toBe("");
      expect(dictionary.labels.energyFlow).not.toBe("");
      expect(dictionary.flows.noFlow).not.toBe("");
      expect(dictionary.flows.partialData).not.toBe("");
      expect(dictionary.flows.noData).not.toBe("");
    }
  });

  it("exposes main options in GUI and leaves entity overrides to YAML", async () => {
    const editor = document.createElement("v2c-trydan-card-editor") as V2cTrydanCardEditor;
    editor.hass = {
      locale: { language: "it-IT" },
      states: {},
      callService: async () => undefined,
    } as HomeAssistant;
    editor.setConfig({ type: "custom:v2c-trydan-card", entity: "binary_sensor.trydan" });
    document.body.append(editor);
    await editor.updateComplete;

    expect(editor.shadowRoot?.querySelector('select[data-field="language"]')?.querySelectorAll("option")).toHaveLength(11);
    expect(editor.shadowRoot?.querySelector('select[data-field="theme"]')).toBeTruthy();
    expect(editor.shadowRoot?.querySelector('select[data-field="display_mode"]')).toBeTruthy();
    expect(editor.shadowRoot?.querySelectorAll('[data-role]')).toHaveLength(26);
    expect(editor.shadowRoot?.textContent).toContain("Dimensione scheda");
    expect(String((editor.constructor as typeof V2cTrydanCardEditor).styles)).not.toContain("#ff8001");
  });
  it("expone todos los grupos y estados de resolución de entidades", async () => {
    const editor = document.createElement("v2c-trydan-card-editor") as V2cTrydanCardEditor;
    editor.hass = {
      states: {}, callService: async () => undefined,
      entities: {
        "binary_sensor.trydan": { entity_id: "binary_sensor.trydan", device_id: "trydan", translation_key: "connected" },
        "sensor.manual_power": { entity_id: "sensor.manual_power", device_id: "trydan", translation_key: "charge_power" },
      },
    } as HomeAssistant;
    editor.setConfig({ type: "custom:v2c-trydan-card", entity: "binary_sensor.trydan", entities: { charge_power: "sensor.manual_power" } });
    document.body.append(editor);
    await editor.updateComplete;
    expect(editor.shadowRoot?.textContent).toContain("Appearance");
    expect(editor.shadowRoot?.textContent).toContain("Content and order");
    expect(editor.shadowRoot?.querySelector('[data-field="hero_scale"]')).toBeTruthy();
    expect(editor.shadowRoot?.querySelector('[data-field="section_order"]')).toBeTruthy();
    expect(editor.shadowRoot?.querySelector('[data-role="charge_power"] + [data-status="manual"]')).toBeTruthy();
  });
});
