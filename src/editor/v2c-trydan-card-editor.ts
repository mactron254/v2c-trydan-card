import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { DEFAULT_PRESETS } from "../config";
import { getDictionary, getLanguage, SUPPORTED_LANGUAGES, translate, type Language } from "../localization";
import { getEditorCopy, getEntityRoleLabel, getResolutionLabel } from "../localization/editor-copy";
import { ENTITY_ROLES, type EntityRole, type HomeAssistant, type V2cTrydanCardConfig } from "../models/types";
import { resolveRegistryRoles } from "../services/discovery";

const LANGUAGE_NAMES: Record<(typeof SUPPORTED_LANGUAGES)[number], string> = {
  en: "English", it: "Italiano", de: "Deutsch", fr: "Français", nl: "Nederlands",
  sv: "Svenska", da: "Dansk", no: "Norsk", ro: "Română", es: "Español",
};

const ULTRA_ARTWORK_HELP: Record<Language, string> = {
  en:"Ultra compact mode always hides the charger artwork. Your setting is preserved for other sizes.",
  es:"El modo ultracompacto siempre oculta el cargador. Tu ajuste se conserva para otros tamaños.",
  it:"La modalità ultra compatta nasconde sempre il caricatore. L'impostazione resta per le altre dimensioni.",
  de:"Ultrakompakt blendet den Lader immer aus. Die Einstellung bleibt für andere Größen erhalten.",
  fr:"Le mode ultra compact masque toujours le chargeur. Le réglage reste conservé pour les autres tailles.",
  nl:"Ultracompact verbergt de lader altijd. De instelling blijft bewaard voor andere formaten.",
  sv:"Ultrakompakt döljer alltid laddaren. Inställningen sparas för andra storlekar.",
  da:"Ultrakompakt skjuler altid laderen. Indstillingen bevares til andre størrelser.",
  no:"Ultrakompakt skjuler alltid laderen. Innstillingen beholdes for andre størrelser.",
  ro:"Modul ultra compact ascunde mereu încărcătorul. Setarea rămâne salvată pentru alte dimensiuni.",
};
const METRICS = ["power", "energy", "time"] as const;
const SOURCES = ["solar", "grid", "home", "battery", "charger"] as const;
const SECTIONS = ["hero", "metrics", "controls", "energy", "advanced"] as const;
const VISIBILITY_FIELDS = [
  ["show_energy_flow", "editor.showEnergyFlow"], ["show_controls", "editor.showControls"],
  ["show_advanced", "editor.showAdvanced"], ["show_charger", "editor.showCharger"],
] as const;

export class V2cTrydanCardEditor extends LitElement {
  static override styles = css`
    :host { display:block; color:var(--primary-text-color); }
    * { box-sizing:border-box; }
    .editor { display:grid; gap:12px; padding:8px 0; }
    .group { border:1px solid var(--divider-color,#7775); border-radius:14px; background:var(--card-background-color); overflow:hidden; }
    .group > summary { display:flex; min-height:48px; padding:12px 14px; align-items:center; gap:8px; cursor:pointer; color:var(--primary-text-color); font-size:.92rem; font-weight:700; list-style:none; }
    .group > summary::-webkit-details-marker { display:none; }
    .group > summary::after { content:"+"; margin-left:auto; color:var(--secondary-text-color); font-size:1.15rem; }
    .group[open] > summary::after { content:"−"; }
    .group-body { display:grid; gap:14px; padding:0 14px 16px; }
    .grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
    label,.field { display:grid; gap:6px; color:var(--secondary-text-color); font-size:.78rem; }
    .field-title { color:var(--primary-text-color); font-weight:650; }
    input,select,button { font:inherit; }
    input:not([type="checkbox"]):not([type="color"]),select { width:100%; min-height:42px; padding:8px 10px; border:1px solid var(--divider-color,#7775); border-radius:9px; color:var(--primary-text-color); background:var(--card-background-color); }
    input:focus-visible,select:focus-visible,button:focus-visible,summary:focus-visible { outline:3px solid var(--primary-color,#0067d9); outline-offset:2px; }
    .choices { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:7px; }
    .choice { display:grid; min-height:66px; padding:8px 5px; place-items:center; gap:5px; border:1px solid var(--divider-color,#7775); border-radius:10px; color:var(--secondary-text-color); background:transparent; cursor:pointer; font-size:.68rem; text-align:center; }
    .choice[aria-pressed="true"] { border-color:var(--primary-color,#0067d9); color:var(--primary-text-color); background:color-mix(in srgb,var(--primary-color,#0067d9) 10%,transparent); box-shadow:inset 0 0 0 1px var(--primary-color,#0067d9); }
    .layout-icon { display:grid; width:34px; height:22px; padding:3px; border:1px solid currentColor; border-radius:4px; gap:2px; opacity:.9; }
    .layout-icon::before,.layout-icon::after { content:""; display:block; border-radius:2px; background:currentColor; opacity:.7; }
    .layout-icon[data-kind="split"],.layout-icon[data-kind="inline"] { grid-template-columns:1fr 1fr; }
    .layout-icon[data-kind="centered"]::before { width:55%; justify-self:center; }
    .layout-icon[data-kind="auto"]::after { width:70%; justify-self:center; }
    .chips { display:flex; flex-wrap:wrap; gap:7px; }
    .chip { min-height:36px; padding:6px 11px; border:1px solid var(--divider-color,#7775); border-radius:999px; color:var(--secondary-text-color); background:transparent; cursor:pointer; }
    .chip[aria-pressed="true"] { color:var(--primary-text-color); border-color:var(--primary-color,#0067d9); background:color-mix(in srgb,var(--primary-color,#0067d9) 12%,transparent); }
    .swatches { display:grid; grid-template-columns:repeat(6,minmax(38px,1fr)); gap:7px; }
    .swatch { min-height:44px; padding:4px; border:1px solid var(--divider-color,#7775); border-radius:9px; color:var(--primary-text-color); background:transparent; cursor:pointer; }
    .swatch::before { content:""; display:block; width:22px; height:22px; margin:auto; border:1px solid #7777; border-radius:50%; background:var(--swatch); }
    .swatch[aria-pressed="true"] { border-color:var(--primary-color,#0067d9); box-shadow:inset 0 0 0 1px var(--primary-color,#0067d9); }
    .color-row { display:grid; grid-template-columns:52px minmax(0,1fr); gap:9px; align-items:end; }
    input[type="color"] { width:52px; height:42px; padding:3px; border:1px solid var(--divider-color,#7775); border-radius:9px; background:transparent; cursor:pointer; }
    .help,.error { margin:0; font-size:.7rem; line-height:1.4; }
    .help { color:var(--secondary-text-color); } .error { color:var(--error-color,#b42335); }
    .range-row { display:grid; grid-template-columns:minmax(0,1fr) 64px; gap:10px; align-items:center; }
    input[type="range"] { width:100%; accent-color:var(--primary-color,#0067d9); }
    output { color:var(--primary-text-color); font-variant-numeric:tabular-nums; font-weight:700; text-align:right; }
    .order-list { display:grid; gap:6px; margin:0; padding:0; list-style:none; }
    .order-item { display:grid; grid-template-columns:28px minmax(0,1fr) 34px 34px; min-height:42px; align-items:center; gap:5px; padding:5px 6px; border:1px solid var(--divider-color,#7775); border-radius:9px; }
    .order-index { display:grid; width:24px; height:24px; place-items:center; border-radius:50%; color:var(--secondary-text-color); background:var(--secondary-background-color,#7772); font-size:.7rem; }
    .icon-button { min-width:32px; min-height:32px; border:1px solid var(--divider-color,#7775); border-radius:8px; color:var(--primary-text-color); background:transparent; cursor:pointer; }
    .icon-button:disabled { opacity:.35; cursor:not-allowed; }
    .reset { justify-self:start; min-height:36px; padding:6px 10px; border:1px solid var(--divider-color,#7775); border-radius:8px; color:var(--primary-text-color); background:transparent; cursor:pointer; }
    .checks { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:7px 12px; }
    .checks label { display:flex; min-height:34px; align-items:center; gap:8px; }
    .checks input { width:auto; accent-color:var(--primary-color,#0067d9); }
    .checks input:disabled + span,.checks label:has(input:disabled) { opacity:.6; }
    .preset-editor { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:8px; }
    .preset-editor button { min-height:42px; padding:8px 12px; border:0; border-radius:9px; color:var(--text-primary-color,#fff); background:var(--primary-color,#0067d9); cursor:pointer; font-weight:700; }
    .preset-list { display:flex; flex-wrap:wrap; gap:6px; }
    .preset-token { display:flex; align-items:center; gap:5px; padding:5px 6px 5px 10px; border:1px solid var(--divider-color,#7775); border-radius:999px; color:var(--primary-text-color); font-size:.75rem; }
    .preset-token button { width:25px; height:25px; padding:0; border:0; border-radius:50%; color:inherit; background:var(--secondary-background-color,#7773); cursor:pointer; }
    .entity-status { font-size:.7rem; font-weight:650; }
    .entity-status[data-status="automatic"] { color:var(--success-color,#2e7d32); }
    .entity-status[data-status="manual"] { color:var(--primary-color,#0067d9); }
    .entity-status[data-status="invalid"],.entity-status[data-status="ambiguous"] { color:var(--error-color,#b42335); }
    @media (max-width:500px) { .grid,.checks { grid-template-columns:1fr; } .choices { grid-template-columns:repeat(2,minmax(0,1fr)); } .swatches { grid-template-columns:repeat(3,1fr); } }
  `;

  @property({ attribute:false }) hass?: HomeAssistant;
  @state() private config?: V2cTrydanCardConfig;
  @state() private accentDraft = "#0067D9";
  @state() private presetDraft = "";

  setConfig(config: V2cTrydanCardConfig): void {
    this.config = { ...config, entities:{ ...(config.entities ?? {}) } };
    this.accentDraft = /^#[0-9a-f]{6}$/i.test(config.accent_color ?? "") ? config.accent_color!.toUpperCase() : "#0067D9";
  }

  #emit(config: V2cTrydanCardConfig): void {
    this.config = config;
    this.dispatchEvent(new CustomEvent("config-changed", { detail:{ config }, bubbles:true, composed:true }));
  }

  #updateField(field: keyof V2cTrydanCardConfig, value: string | boolean): void {
    if (!this.config) return;
    const next = { ...this.config };
    if (typeof value === "string" && value.trim() === "" && field !== "entity") delete next[field];
    else Object.assign(next,{ [field]:value });
    this.#emit(next);
  }

  #visibilityChecked(field: (typeof VISIBILITY_FIELDS)[number][0]): boolean {
    if (!this.config) return false;
    return field === "show_energy_flow" ? this.config.show_energy_flow === true : this.config[field] !== false;
  }
  #updateNumber(field: "hero_scale" | "card_radius" | "flow_threshold_w", value: string): void {
    if (!this.config) return;
    const number = Number(value);
    if (!Number.isFinite(number)) return;
    this.#emit({ ...this.config, [field]:number });
  }

  #toggleMetric(value: (typeof METRICS)[number]): void {
    if (!this.config) return;
    const current = this.config.metrics ?? [...METRICS];
    const metrics = current.includes(value) ? current.filter((item) => item !== value) : [...current,value];
    this.#emit({ ...this.config, metrics });
  }

  #toggleSource(value: (typeof SOURCES)[number]): void {
    if (!this.config) return;
    const current = this.config.energy_sources ?? [...SOURCES];
    const energy_sources = current.includes(value) ? current.filter((item) => item !== value) : [...current,value];
    this.#emit({ ...this.config, energy_sources });
  }

  #sectionOrder(): Array<(typeof SECTIONS)[number]> {
    const selected = (this.config?.section_order ?? []).filter((item): item is (typeof SECTIONS)[number] => SECTIONS.includes(item));
    return [...new Set([...selected,...SECTIONS])];
  }

  #moveSection(index: number, direction: -1 | 1): void {
    if (!this.config) return;
    const section_order = this.#sectionOrder();
    const target = index + direction;
    if (target < 0 || target >= section_order.length) return;
    [section_order[index],section_order[target]] = [section_order[target]!,section_order[index]!];
    this.#emit({ ...this.config, section_order });
  }

  #resetOrder(): void {
    if (!this.config) return;
    const next = { ...this.config };
    delete next.section_order;
    this.#emit(next);
  }

  #selectScheme(color_scheme: NonNullable<V2cTrydanCardConfig["color_scheme"]>): void {
    if (!this.config) return;
    const accent_color = color_scheme === "custom" ? (this.config.accent_color ?? "#0067D9") : this.config.accent_color;
    if (color_scheme === "custom") this.accentDraft = accent_color!;
    this.#emit({ ...this.config, color_scheme, accent_color });
  }

  #setAccent(value: string): void {
    this.accentDraft = value.toUpperCase();
    if (!this.config || !/^#[0-9A-F]{6}$/.test(this.accentDraft)) return;
    this.#emit({ ...this.config, color_scheme:"custom", accent_color:this.accentDraft });
  }

  #addPreset(): void {
    if (!this.config) return;
    const value = Number(this.presetDraft);
    if (!Number.isInteger(value) || value <= 0 || value > 80) return;
    const current_presets = [...new Set([...(this.config.current_presets ?? DEFAULT_PRESETS),value])].sort((a,b) => a-b);
    this.presetDraft = "";
    this.#emit({ ...this.config, current_presets });
  }

  #removePreset(value: number): void {
    if (!this.config) return;
    this.#emit({ ...this.config, current_presets:(this.config.current_presets ?? DEFAULT_PRESETS).filter((item) => item !== value) });
  }

  #updateEntity(role: EntityRole, value: string): void {
    if (!this.config) return;
    const entities = { ...(this.config.entities ?? {}) };
    if (value.trim()) entities[role] = value; else delete entities[role];
    this.#emit({ ...this.config, entities });
  }

  protected override render() {
    if (!this.config) return nothing;
    const language = getLanguage(this.config.language ?? this.hass?.locale?.language ?? this.hass?.language);
    const dictionary = getDictionary(language);
    const copy = getEditorCopy(language);
    const entityIds = Object.keys(this.hass?.states ?? {});
    const discovery = this.hass ? resolveRegistryRoles(Object.values(this.hass.entities ?? {}),this.config.entity,this.config.entities) : undefined;
    const order = this.#sectionOrder();
    const selectedMetrics = this.config.metrics ?? [...METRICS];
    const selectedSources = this.config.energy_sources ?? [...SOURCES];
    const presets = this.config.current_presets ?? DEFAULT_PRESETS;
    const invalidAccent = this.accentDraft !== "" && !/^#[0-9A-F]{6}$/.test(this.accentDraft);
    const ultraArtworkHidden = (this.config.display_mode ?? "standard") === "ultra_compact";
    const sectionLabels: Record<(typeof SECTIONS)[number],string> = {
      hero:translate(dictionary,"editor.showCharger"), metrics:copy.metrics,
      controls:translate(dictionary,"editor.showControls"), energy:translate(dictionary,"editor.showEnergyFlow"),
      advanced:translate(dictionary,"editor.showAdvanced"),
    };
    const metricLabels = { power:translate(dictionary,"labels.power"), energy:translate(dictionary,"labels.energy"), time:translate(dictionary,"labels.time") };
    const sourceLabels = { solar:translate(dictionary,"flows.solar"), grid:translate(dictionary,"flows.grid"), home:translate(dictionary,"flows.home"), battery:translate(dictionary,"flows.battery"), charger:translate(dictionary,"flows.charger") };
    return html`
      <div class="editor">
        <details class="group" open>
          <summary>${copy.general}</summary><div class="group-body">
            <label><span>${translate(dictionary,"editor.entity")}</span><input data-field="entity" list="v2c-entities" .value=${this.config.entity} @change=${(e:Event) => this.#updateField("entity",(e.target as HTMLInputElement).value)} /></label>
            <div class="grid">
              <label><span>${translate(dictionary,"editor.name")}</span><input data-field="name" .value=${this.config.name ?? ""} @change=${(e:Event) => this.#updateField("name",(e.target as HTMLInputElement).value)} /></label>
              <label><span>${translate(dictionary,"editor.location")}</span><input data-field="location" .value=${this.config.location ?? ""} @change=${(e:Event) => this.#updateField("location",(e.target as HTMLInputElement).value)} /></label>
              <label><span>${translate(dictionary,"editor.language")}</span><select data-field="language" .value=${this.config.language ?? "auto"} @change=${(e:Event) => this.#updateField("language",(e.target as HTMLSelectElement).value)}><option value="auto">${copy.automatic}</option>${SUPPORTED_LANGUAGES.map((code) => html`<option .value=${code}>${LANGUAGE_NAMES[code]}</option>`)}</select></label>
              <label><span>${translate(dictionary,"editor.theme")}</span><select data-field="theme" .value=${this.config.theme ?? "auto"} @change=${(e:Event) => this.#updateField("theme",(e.target as HTMLSelectElement).value)}><option value="auto">${translate(dictionary,"editor.themeAuto")}</option><option value="light">${translate(dictionary,"editor.themeLight")}</option><option value="dark">${translate(dictionary,"editor.themeDark")}</option></select></label>
            </div>
            <div class="field"><span class="field-title">${translate(dictionary,"editor.displayMode")}</span><div class="choices">${([
              ["xxl",copy.modeXxl],["standard",translate(dictionary,"editor.modeStandard")],["compact",translate(dictionary,"editor.modeCompact")],["ultra_compact",translate(dictionary,"editor.modeUltra")],
            ] as const).map(([value,label]) => html`<button type="button" class="choice" data-field="display_mode" data-value=${value} aria-pressed=${String((this.config?.display_mode ?? "standard") === value)} @click=${() => this.#updateField("display_mode",value)}><span class="layout-icon" data-kind="centered"></span>${label}</button>`)}</div></div>
          </div>
        </details>

        <details class="group" open>
          <summary>${copy.appearance}</summary><div class="group-body">
            <div class="field"><span class="field-title">${copy.layout}</span><div class="choices">${([ ["auto",copy.automatic],["centered",copy.centered],["split",copy.split],["inline",copy.inline] ] as const).map(([value,label]) => html`<button type="button" class="choice" data-field="layout" data-value=${value} aria-pressed=${String((this.config?.layout ?? "auto") === value)} @click=${() => this.#updateField("layout",value)}><span class="layout-icon" data-kind=${value}></span>${label}</button>`)}</div></div>
            <div class="field"><span class="field-title">${copy.colorScheme}</span><div class="swatches">${([ ["monochrome",copy.monochrome,"#808080"],["v2c_blue",copy.v2cBlue,"#0067D9"],["teal",copy.teal,"#00897B"],["green",copy.green,"#2E7D32"],["violet",copy.violet,"#6A4BBC"],["custom",copy.custom,this.config.accent_color ?? "#0067D9"] ] as const).map(([value,label,color]) => html`<button type="button" class="swatch" style=${`--swatch:${color}`} title=${label} aria-label=${label} aria-pressed=${String((this.config?.color_scheme ?? "monochrome") === value)} @click=${() => this.#selectScheme(value)}></button>`)}</div></div>
            ${this.config.color_scheme === "custom" ? html`<div class="field"><span class="field-title">${copy.accentColor}</span><div class="color-row"><input data-field="accent_picker" type="color" .value=${/^#[0-9A-F]{6}$/.test(this.accentDraft) ? this.accentDraft : "#0067D9"} @input=${(e:Event) => this.#setAccent((e.target as HTMLInputElement).value)} /><input data-field="accent_color" inputmode="text" .value=${this.accentDraft} @input=${(e:Event) => this.#setAccent((e.target as HTMLInputElement).value)} /></div><p class="help">${copy.accentHelp}</p>${invalidAccent ? html`<p class="error" role="alert">${copy.invalidHex}</p>` : nothing}</div>` : nothing}
            <div class="field"><span class="field-title">${copy.surface}</span><div class="chips">${([ ["solid",copy.solid],["tinted",copy.tinted],["transparent",copy.transparent] ] as const).map(([value,label]) => html`<button type="button" class="chip" aria-pressed=${String((this.config?.surface_style ?? "solid") === value)} @click=${() => this.#updateField("surface_style",value)}>${label}</button>`)}</div></div>
            <div class="grid">
              <label><span class="field-title">${copy.heroScale}</span><div class="range-row"><input data-field="hero_scale" type="range" min="0.75" max="1.25" step="0.05" .value=${String(this.config.hero_scale ?? 1)} @input=${(e:Event) => this.#updateNumber("hero_scale",(e.target as HTMLInputElement).value)} /><output>${Math.round((this.config.hero_scale ?? 1)*100)}%</output></div></label>
              <label><span class="field-title">${copy.cardRadius}</span><div class="range-row"><input data-field="card_radius" type="range" min="0" max="40" step="1" .value=${String(this.config.card_radius ?? 20)} @input=${(e:Event) => this.#updateNumber("card_radius",(e.target as HTMLInputElement).value)} /><output>${this.config.card_radius ?? 20}px</output></div></label>
            </div>
          </div>
        </details>

        <details class="group" open>
          <summary>${copy.contentOrder}</summary><div class="group-body">
            <div class="field"><span class="field-title">${copy.metrics}</span><div class="chips">${METRICS.map((value) => html`<button type="button" class="chip" data-metric=${value} aria-pressed=${String(selectedMetrics.includes(value))} @click=${() => this.#toggleMetric(value)}>${metricLabels[value]}</button>`)}</div></div>
            <div class="field"><span class="field-title">${copy.energySources}</span><div class="chips">${SOURCES.map((value) => html`<button type="button" class="chip" data-source=${value} aria-pressed=${String(selectedSources.includes(value))} @click=${() => this.#toggleSource(value)}>${sourceLabels[value]}</button>`)}</div></div>
            <div class="field"><span class="field-title">${copy.sectionOrder}</span><ol class="order-list">${order.map((section,index) => html`<li class="order-item" data-order=${section}><span class="order-index">${index+1}</span><span>${sectionLabels[section]}</span><button type="button" class="icon-button" aria-label=${`${copy.moveUp}: ${sectionLabels[section]}`} ?disabled=${index===0} @click=${() => this.#moveSection(index,-1)}>↑</button><button type="button" class="icon-button" aria-label=${`${copy.moveDown}: ${sectionLabels[section]}`} ?disabled=${index===order.length-1} @click=${() => this.#moveSection(index,1)}>↓</button></li>`)}</ol><button type="button" class="reset" @click=${() => this.#resetOrder()}>${copy.resetOrder}</button></div>
            <div class="checks">${VISIBILITY_FIELDS.map(([field,key]) => html`<label><input data-field=${field} type="checkbox" .checked=${this.#visibilityChecked(field)} ?disabled=${field === "show_charger" && ultraArtworkHidden} @change=${(e:Event) => this.#updateField(field,(e.target as HTMLInputElement).checked)} /><span>${translate(dictionary,key)}</span></label>`)}<label><input data-field="show_header" type="checkbox" .checked=${this.config.show_header !== false} @change=${(e:Event) => this.#updateField("show_header",(e.target as HTMLInputElement).checked)} />${copy.header}</label><label><input data-field="show_badges" type="checkbox" .checked=${this.config.show_badges !== false} @change=${(e:Event) => this.#updateField("show_badges",(e.target as HTMLInputElement).checked)} />${copy.badges}</label><label><input data-field="show_presets" type="checkbox" .checked=${this.config.show_presets !== false} @change=${(e:Event) => this.#updateField("show_presets",(e.target as HTMLInputElement).checked)} />${copy.presets}</label></div>
            ${ultraArtworkHidden ? html`<p class="help" data-help="ultra-artwork">${ULTRA_ARTWORK_HELP[language]}</p>` : nothing}
          </div>
        </details>

        <details class="group">
          <summary>${copy.advanced}</summary><div class="group-body">
            <div class="field"><span class="field-title">${copy.intensityControl}</span><div class="chips">${([ ["slider",copy.slider],["presets",copy.presets],["both",copy.both] ] as const).map(([value,label]) => html`<button type="button" class="chip" aria-pressed=${String((this.config?.intensity_control ?? "both") === value)} @click=${() => this.#updateField("intensity_control",value)}>${label}</button>`)}</div></div>
            <label><span class="field-title">${copy.flowThreshold}</span><input data-field="flow_threshold_w" type="number" min="0" .value=${String(this.config.flow_threshold_w ?? 50)} @input=${(e:Event) => this.#updateNumber("flow_threshold_w",(e.target as HTMLInputElement).value)} /></label>
            <div class="field"><span class="field-title">${copy.currentPresets}</span><div class="preset-list">${presets.map((value) => html`<span class="preset-token">${value} A<button type="button" aria-label=${`${copy.removePreset} ${value} A`} @click=${() => this.#removePreset(value)}>×</button></span>`)}</div><div class="preset-editor"><input data-field="preset_draft" type="number" min="1" max="80" step="1" placeholder=${copy.amps} .value=${this.presetDraft} @input=${(e:Event) => this.presetDraft=(e.target as HTMLInputElement).value} @keydown=${(e:KeyboardEvent) => { if(e.key === "Enter"){ e.preventDefault(); this.#addPreset(); } }} /><button type="button" @click=${() => this.#addPreset()}>${copy.addPreset}</button></div></div>
            <div class="checks"><label><input data-field="advanced_open" type="checkbox" .checked=${this.config.advanced_open === true} @change=${(e:Event) => this.#updateField("advanced_open",(e.target as HTMLInputElement).checked)} />${copy.openAdvanced}</label><label><input data-field="confirm_lock" type="checkbox" .checked=${this.config.confirm_lock !== false} @change=${(e:Event) => this.#updateField("confirm_lock",(e.target as HTMLInputElement).checked)} />${copy.confirmLock}</label><label><input data-field="invert_grid_power" type="checkbox" .checked=${this.config.invert_grid_power === true} @change=${(e:Event) => this.#updateField("invert_grid_power",(e.target as HTMLInputElement).checked)} />${copy.invertGrid}</label><label><input data-field="invert_battery_power" type="checkbox" .checked=${this.config.invert_battery_power === true} @change=${(e:Event) => this.#updateField("invert_battery_power",(e.target as HTMLInputElement).checked)} />${copy.invertBattery}</label><label><input data-field="invert_solar_power" type="checkbox" .checked=${this.config.invert_solar_power === true} @change=${(e:Event) => this.#updateField("invert_solar_power",(e.target as HTMLInputElement).checked)} />${copy.invertSolar}</label></div>
          </div>
        </details>

        <details class="group">
          <summary>${copy.entities}</summary><div class="group-body"><p class="help">${copy.entityOverrides}</p><div class="grid">${ENTITY_ROLES.map((role) => { const status=discovery?.statuses[role] ?? "missing"; return html`<label><span>${getEntityRoleLabel(language,role)}</span><input data-role=${role} list="v2c-entities" .value=${this.config?.entities?.[role] ?? ""} @change=${(e:Event) => this.#updateEntity(role,(e.target as HTMLInputElement).value)} /><small class="entity-status" data-status=${status}>${getResolutionLabel(copy,status)}</small></label>`; })}</div></div>
        </details>
        <datalist id="v2c-entities">${entityIds.map((entity) => html`<option value=${entity}></option>`)}</datalist>
      </div>`;
  }
}