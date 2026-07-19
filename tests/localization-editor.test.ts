import { beforeEach, describe, expect, it } from "vitest";
import "../src/index";
import { getDictionary, getLanguage, SUPPORTED_LANGUAGES } from "../src/localization";
import { getEditorCopy, getEntityRoleLabel } from "../src/localization/editor-copy";
import { ENTITY_ROLES, type HomeAssistant, type V2cTrydanCardConfig } from "../src/models/types";
import type { V2cTrydanCardEditor } from "../src/editor/v2c-trydan-card-editor";

function makeEditor(language: V2cTrydanCardConfig["language"] = "es"): V2cTrydanCardEditor {
  const editor = document.createElement("v2c-trydan-card-editor") as V2cTrydanCardEditor;
  editor.hass = { locale:{ language:`${language}-ES` }, states:{}, callService:async () => undefined } as HomeAssistant;
  editor.setConfig({ type:"custom:v2c-trydan-card", entity:"binary_sensor.trydan", language });
  document.body.append(editor);
  return editor;
}

describe("multilingual visual editor", () => {
  beforeEach(() => { document.body.innerHTML = ""; });

  it("keeps complete copy and entity role labels in all ten languages", () => {
    expect(SUPPORTED_LANGUAGES).toEqual(["en","it","de","fr","nl","sv","da","no","ro","es"]);
    expect(getLanguage("fr-FR")).toBe("fr");
    expect(getLanguage("nb-NO")).toBe("no");
    for (const language of SUPPORTED_LANGUAGES) {
      const dictionary = getDictionary(language);
      const copy = getEditorCopy(language);
      expect(Object.values(copy).every((value) => value.trim() !== "")).toBe(true);
      expect(ENTITY_ROLES.every((role) => getEntityRoleLabel(language,role).trim() !== "")).toBe(true);
      expect(dictionary.states.charging).not.toBe("");
      expect(dictionary.labels.energyFlow).not.toBe("");
    }
  });

  it("translates every personalization group and exposes visual controls", async () => {
    const editor = makeEditor("it");
    await editor.updateComplete;
    expect(editor.shadowRoot?.textContent).toContain("Aspetto");
    expect(editor.shadowRoot?.textContent).toContain("Contenuto e ordine");
    expect(editor.shadowRoot?.textContent).not.toContain("Appearance");
    expect(editor.shadowRoot?.querySelectorAll('button[data-field="display_mode"]')).toHaveLength(4);
    expect(editor.shadowRoot?.querySelectorAll('button[data-field="layout"]')).toHaveLength(4);
    expect(editor.shadowRoot?.querySelectorAll('[data-role]')).toHaveLength(26);
    expect(editor.shadowRoot?.querySelectorAll('[data-metric]')).toHaveLength(3);
    expect(editor.shadowRoot?.querySelectorAll('[data-source]')).toHaveLength(5);
  });

  it("emits visual metric, order, radius, custom color and preset changes", async () => {
    const editor = makeEditor("es");
    await editor.updateComplete;
    let latest: V2cTrydanCardConfig | undefined;
    editor.addEventListener("config-changed", (event) => { latest=(event as CustomEvent<{config:V2cTrydanCardConfig}>).detail.config; });

    (editor.shadowRoot?.querySelector('[data-metric="energy"]') as HTMLButtonElement).click();
    await editor.updateComplete;
    expect(latest?.metrics).toEqual(["power","time"]);

    const radius = editor.shadowRoot?.querySelector<HTMLInputElement>('[data-field="card_radius"]')!;
    radius.value="32"; radius.dispatchEvent(new Event("input",{ bubbles:true }));
    await editor.updateComplete;
    expect(latest?.card_radius).toBe(32);

    (editor.shadowRoot?.querySelector('.swatch[title="Personalizado"]') as HTMLButtonElement).click();
    await editor.updateComplete;
    const picker=editor.shadowRoot?.querySelector<HTMLInputElement>('[data-field="accent_picker"]')!;
    picker.value="#ff3366"; picker.dispatchEvent(new Event("input",{ bubbles:true }));
    await editor.updateComplete;
    expect(latest).toMatchObject({ color_scheme:"custom", accent_color:"#FF3366" });

    const draft=editor.shadowRoot?.querySelector<HTMLInputElement>('[data-field="preset_draft"]')!;
    draft.value="18"; draft.dispatchEvent(new Event("input",{ bubbles:true }));
    const add=editor.shadowRoot?.querySelector<HTMLButtonElement>("[data-action=\"add-preset\"]");
    add?.click(); await editor.updateComplete;
    expect(latest?.current_presets).toContain(18);
  });

  it("shows translated discovery resolution", async () => {
    const editor=makeEditor("es");
    editor.hass={ states:{ "binary_sensor.trydan":{ entity_id:"binary_sensor.trydan", state:"on", attributes:{} }, "sensor.manual_power":{ entity_id:"sensor.manual_power", state:"1200", attributes:{ unit_of_measurement:"W" } } }, callService:async()=>undefined, entities:{
      "binary_sensor.trydan":{ entity_id:"binary_sensor.trydan", device_id:"trydan", platform:"v2c", translation_key:"connected" },
      "sensor.manual_power":{ entity_id:"sensor.manual_power", device_id:"trydan", platform:"v2c", translation_key:"charge_power" },
    }} as HomeAssistant;
    editor.setConfig({ type:"custom:v2c-trydan-card", entity:"binary_sensor.trydan", language:"es", entities:{ charge_power:"sensor.manual_power" } });
    await editor.updateComplete;
    expect(editor.shadowRoot?.querySelector('[data-role="charge_power"] + [data-status="manual"]')?.textContent).toContain("Manual");
    expect(editor.shadowRoot?.textContent).toContain("Potencia de carga");
  });
});