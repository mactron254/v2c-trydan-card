import "../src/index";
import { VISUAL_STATE_KEYS, type HassEntity, type HomeAssistant, type V2cTrydanCardConfig } from "../src/models/types";
import type { V2cTrydanCard } from "../src/card/v2c-trydan-card";

const make = (entity_id: string, state: string, attributes: HassEntity["attributes"] = {}): HassEntity => ({
  entity_id,
  state,
  attributes,
});

const states: Record<string, HassEntity> = {
  "binary_sensor.trydan_connected": make("binary_sensor.trydan_connected", "on"),
  "binary_sensor.trydan_charging": make("binary_sensor.trydan_charging", "on"),
  "binary_sensor.trydan_ready": make("binary_sensor.trydan_ready", "off"),
  "sensor.trydan_visual": make("sensor.trydan_visual", "charging"),
  "sensor.trydan_charge_power": make("sensor.trydan_charge_power", "4200", { unit_of_measurement: "W" }),
  "sensor.trydan_charge_energy": make("sensor.trydan_charge_energy", "8.6", { unit_of_measurement: "kWh" }),
  "sensor.trydan_charge_time": make("sensor.trydan_charge_time", "5640", { unit_of_measurement: "s" }),
  "sensor.trydan_solar": make("sensor.trydan_solar", "2857", { unit_of_measurement: "W" }),
  "sensor.trydan_grid": make("sensor.trydan_grid", "386", { unit_of_measurement: "W" }),
  "sensor.trydan_home": make("sensor.trydan_home", "690", { unit_of_measurement: "W" }),
  "sensor.trydan_battery": make("sensor.trydan_battery", "-128", { unit_of_measurement: "W" }),
  "sensor.trydan_voltage": make("sensor.trydan_voltage", "236.7", { unit_of_measurement: "V" }),
  "number.trydan_intensity": make("number.trydan_intensity", "18", { unit_of_measurement: "A", min: 6, max: 32, step: 1 }),
  "switch.trydan_paused": make("switch.trydan_paused", "off"),
  "switch.trydan_locked": make("switch.trydan_locked", "off"),
  "switch.trydan_timer": make("switch.trydan_timer", "off"),
  "switch.trydan_dynamic": make("switch.trydan_dynamic", "on"),
  "switch.trydan_pause_dynamic": make("switch.trydan_pause_dynamic", "off"),
  "light.trydan_logo": make("light.trydan_logo", "on", { brightness: 128 }),
  "light.trydan_light": make("light.trydan_light", "off"),
  "select.trydan_mode": make("select.trydan_mode", "mixed", { options: ["mixed", "monophasic", "threephasic"] }),
};

const log = document.querySelector<HTMLDivElement>("#service-log")!;
const card = document.createElement("v2c-trydan-card") as V2cTrydanCard;
let config: V2cTrydanCardConfig = {
  type: "custom:v2c-trydan-card",
  entity: "binary_sensor.trydan_connected",
  name: "Trydan",
  location: "Garaje",
  status_entity: "sensor.trydan_visual",
  entities: {
    connected: "binary_sensor.trydan_connected",
    charging: "binary_sensor.trydan_charging",
    ready: "binary_sensor.trydan_ready",
    charge_power: "sensor.trydan_charge_power",
    charge_energy: "sensor.trydan_charge_energy",
    charge_time: "sensor.trydan_charge_time",
    fv_power: "sensor.trydan_solar",
    grid_power: "sensor.trydan_grid",
    house_power: "sensor.trydan_home",
    battery_power: "sensor.trydan_battery",
    voltage: "sensor.trydan_voltage",
    intensity: "number.trydan_intensity",
    paused: "switch.trydan_paused",
    locked: "switch.trydan_locked",
    timer: "switch.trydan_timer",
    dynamic: "switch.trydan_dynamic",
    pause_dynamic: "switch.trydan_pause_dynamic",
    logo_led: "light.trydan_logo",
    light_led: "light.trydan_light",
    charge_mode: "select.trydan_mode",
  },
};

const hass: HomeAssistant = {
  states,
  language: "es",
  async callService(domain, service, data = {}) {
    log.textContent = `${domain}.${service}\n${JSON.stringify(data, null, 2)}\n\n${log.textContent}`;
    const entityId = String(data.entity_id ?? "");
    const entity = states[entityId];
    if (entity) {
      if (domain === "switch" || domain === "light") entity.state = service === "turn_on" ? "on" : "off";
      if (domain === "number") entity.state = String(data.value);
      if (domain === "select") entity.state = String(data.option);
      if (domain === "light" && data.brightness !== undefined) entity.attributes.brightness = Number(data.brightness);
      card.hass = { ...hass, states: { ...states } };
    }
  },
};

card.setConfig(config);
card.hass = hass;
document.querySelector("#preview")!.append(card);

const stateSelect = document.querySelector<HTMLSelectElement>("#state")!;
for (const key of VISUAL_STATE_KEYS) stateSelect.add(new Option(key.replaceAll("_", " "), key));
stateSelect.value = "charging";
stateSelect.addEventListener("change", () => {
  states["sensor.trydan_visual"]!.state = stateSelect.value;
  states["binary_sensor.trydan_charging"]!.state = stateSelect.value === "charging" ? "on" : "off";
  card.hass = { ...hass, states: { ...states } };
});

const width = document.querySelector<HTMLInputElement>("#width")!;
const preview = document.querySelector<HTMLDivElement>("#preview")!;
const widthValue = document.querySelector<HTMLOutputElement>("#width-value")!;
width.addEventListener("input", () => {
  preview.style.width = `${width.value}px`;
  widthValue.value = `${width.value} px`;
});
function updateConfig(patch: Partial<V2cTrydanCardConfig>): void {
  config = { ...config, ...patch };
  card.setConfig(config);
  card.hass = { ...hass, states: { ...states } };
}

const themeSelect = document.querySelector<HTMLSelectElement>("#theme")!;
themeSelect.addEventListener("change", () => {
  const theme = themeSelect.value as NonNullable<V2cTrydanCardConfig["theme"]>;
  updateConfig({ theme });
  const systemLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  document.body.classList.toggle("light", theme === "light" || (theme === "auto" && systemLight));
});

document.querySelector<HTMLSelectElement>("#density")!.addEventListener("change", (event) => {
  updateConfig({
    display_mode: (event.target as HTMLSelectElement).value as NonNullable<V2cTrydanCardConfig["display_mode"]>,
  });
});

document.querySelector<HTMLSelectElement>("#language")!.addEventListener("change", (event) => {
  updateConfig({
    language: (event.target as HTMLSelectElement).value as NonNullable<V2cTrydanCardConfig["language"]>,
  });
});

const params = new URLSearchParams(window.location.search);
document.body.classList.toggle("capture", params.get("capture") === "1");
const applySelectParam = (id: string, key: string): void => {
  const value = params.get(key);
  const select = document.querySelector<HTMLSelectElement>(id);
  if (!value || !select || ![...select.options].some((option) => option.value === value)) return;
  select.value = value;
  select.dispatchEvent(new Event("change"));
};

const requestedWidth = Number(params.get("width"));
if (Number.isFinite(requestedWidth) && requestedWidth >= 280 && requestedWidth <= 800) {
  width.value = String(requestedWidth);
  width.dispatchEvent(new Event("input"));
}
applySelectParam("#state", "state");
applySelectParam("#theme", "theme");
applySelectParam("#density", "density");
applySelectParam("#language", "language");

if (params.get("debug") === "1") {
  window.setTimeout(() => {
    document.body.dataset.cardWidth = String(Math.round(card.getBoundingClientRect().width));
    document.body.dataset.cardScrollWidth = String(card.scrollWidth);
    document.body.dataset.cardHeight = String(Math.ceil(card.getBoundingClientRect().height));
    document.body.dataset.previewWidth = String(preview.clientWidth);
    document.body.dataset.documentWidth = String(document.documentElement.clientWidth);
    document.body.dataset.documentScrollWidth = String(document.documentElement.scrollWidth);
  }, 250);
}
