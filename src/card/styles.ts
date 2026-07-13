import { css } from "lit";

export const cardStyles = css`
  :host {
    --v2c-surface: var(--ha-card-background, var(--card-background-color, light-dark(#ffffff, #181b1e)));
    --v2c-surface-soft: var(--secondary-background-color, light-dark(#f4f5f6, #202428));
    --v2c-text: var(--primary-text-color, light-dark(#17191b, #f4f5f6));
    --v2c-muted: var(--secondary-text-color, light-dark(#5d636a, #a7adb4));
    --v2c-border: var(--divider-color, light-dark(#d9dce0, #34393f));
    --v2c-control: light-dark(#202326, #f4f5f6);
    --v2c-on-control: light-dark(#ffffff, #17191b);
    --v2c-control-border: light-dark(#747a80, #8c939b);
    --v2c-focus: light-dark(#0067d9, #7eb8ff);
    --v2c-danger: var(--error-color, light-dark(#b42335, #ff8794));
    --v2c-danger-soft: light-dark(#fff0f2, #351c21);
    display: block;
    container-type: inline-size;
    color-scheme: light dark;
    font-family: var(--paper-font-body1_-_font-family, var(--mdc-typography-font-family, system-ui, sans-serif));
  }

  * { box-sizing: border-box; }

  ha-card {
    overflow: hidden;
    color: var(--v2c-text);
    background: var(--v2c-surface);
    border: 1px solid var(--v2c-border);
    border-radius: var(--v2c-radius, var(--ha-card-border-radius, 20px));
  }

  .shell { padding: clamp(20px, 4cqw, 30px); }

  .card-heading {
    display: flex;
    align-items: baseline;
    gap: 8px;
    min-width: 0;
  }

  h2 {
    min-width: 0;
    margin: 0;
    overflow-wrap: anywhere;
    color: var(--v2c-text);
    font-size: 0.94rem;
    font-weight: 650;
    line-height: 1.3;
  }

  .location {
    min-width: 0;
    overflow: hidden;
    color: var(--v2c-muted);
    font-size: 0.75rem;
    line-height: 1.35;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .location::before { content: "· "; }

  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    align-items: center;
    justify-items: center;
    margin-top: 18px;
  }

  .hero-copy {
    display: flex;
    min-width: 0;
    max-width: 100%;
    margin-top: -18px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .hero.without-charger .hero-copy { margin-top: 0; }

  .charger-stage {
    display: grid;
    width: min(100%, clamp(260px, 66cqw, 340px));
    aspect-ratio: 312 / 480;
    place-items: center;
  }
  .charger-art {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 18px 14px rgb(0 0 0 / 16%));
  }

  .charger-art svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .charger-status {
    max-width: 100%;
    margin-top: 0;
    overflow-wrap: anywhere;
    color: var(--v2c-text);
    font-size: clamp(2rem, 7cqw, 2.5rem);
    font-weight: 650;
    letter-spacing: -0.035em;
    line-height: 1.05;
  }

  .charger-status[data-severity="error"] { color: var(--v2c-danger); }

  .badges {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
    margin-top: 10px;
  }

  .badge {
    padding: 4px 8px;
    border: 1px solid var(--v2c-border);
    border-radius: 999px;
    color: var(--v2c-muted);
    background: var(--v2c-surface-soft);
    font-size: 0.68rem;
    font-weight: 650;
    line-height: 1.2;
  }

  .overview {
    width: 100%;
    min-width: 0;
    max-width: 760px;
    justify-self: center;
  }

  .primary-metrics {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  .metric {
    min-width: 0;
    padding: 12px;
    border: 1px solid var(--v2c-border);
    border-radius: 12px;
    background: var(--v2c-surface-soft);
  }

  .metric-label {
    display: block;
    margin-bottom: 6px;
    overflow: hidden;
    color: var(--v2c-muted);
    font-size: 0.7rem;
    font-weight: 550;
    line-height: 1.25;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .metric-value {
    display: block;
    overflow: hidden;
    color: var(--v2c-text);
    font-size: clamp(1rem, 4.4cqw, 1.5rem);
    font-variant-numeric: tabular-nums;
    font-weight: 650;
    letter-spacing: -0.035em;
    line-height: 1.1;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .metric-power .metric-value { font-size: clamp(1.25rem, 5.5cqw, 2rem); }

  .session-controls {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
    align-items: stretch;
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid var(--v2c-border);
  }

  button,
  select,
  input { font: inherit; }

  button {
    min-height: 44px;
    border: 1px solid var(--v2c-control-border);
    border-radius: 10px;
    color: var(--v2c-text);
    background: transparent;
    cursor: pointer;
  }

  button:hover:not(:disabled) { background: var(--v2c-surface-soft); }

  button:focus-visible,
  select:focus-visible,
  input:focus-visible,
  summary:focus-visible {
    outline: 3px solid var(--v2c-focus);
    outline-offset: 2px;
  }

  button:disabled,
  input:disabled,
  select:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .primary-action {
    width: 100%;
    min-width: 0;
    padding: 0 16px;
    color: var(--v2c-on-control);
    background: var(--v2c-control);
    border-color: var(--v2c-control);
    font-weight: 700;
  }

  .primary-action:hover:not(:disabled) { opacity: 0.88; background: var(--v2c-control); }
  .primary-action[aria-busy="true"] { opacity: 0.62; }

  .range-head {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 8px;
    color: var(--v2c-muted);
    font-size: 0.72rem;
    font-weight: 550;
  }

  .range-head output {
    color: var(--v2c-text);
    font-variant-numeric: tabular-nums;
    font-weight: 650;
  }

  .range-control { min-width: 0; }

  input[type="range"] {
    width: 100%;
    min-width: 0;
    min-height: 28px;
    accent-color: var(--v2c-control);
  }

  .presets {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }

  .preset {
    min-width: 44px;
    min-height: 32px;
    padding: 4px 8px;
    border-color: var(--v2c-border);
    border-radius: 8px;
    font-size: 0.68rem;
    font-variant-numeric: tabular-nums;
  }

  .preset[aria-pressed="true"] {
    color: var(--v2c-on-control);
    background: var(--v2c-control);
    border-color: var(--v2c-control);
  }

  .energy-section {
    margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid var(--v2c-border);
  }

  .energy-summary {
    min-width: 0;
    padding: 12px;
    border: 1px solid var(--v2c-border);
    border-radius: 12px;
    background: var(--v2c-surface-soft);
  }

  .energy-summary-title {
    display: flex;
    align-items: center;
    gap: 7px;
    margin: 0;
    color: var(--v2c-muted);
    font-size: 0.75rem;
    font-weight: 650;
    line-height: 1.3;
  }

  .energy-summary-title ha-icon { --mdc-icon-size: 17px; color: var(--v2c-text); }

  .energy-nodes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }

  .flow-node {
    display: grid;
    min-width: 104px;
    flex: 1 1 104px;
    grid-template-columns: auto 1fr;
    column-gap: 6px;
    padding: 8px;
    border: 1px solid var(--v2c-border);
    border-radius: 9px;
    background: var(--v2c-surface);
  }

  .flow-name {
    display: flex;
    grid-row: 1 / 3;
    align-items: center;
    color: var(--v2c-muted);
  }

  .flow-name ha-icon { --mdc-icon-size: 18px; }

  .flow-name-text,
  .flow-direction { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .flow-name-text { color: var(--v2c-muted); font-size: 0.68rem; font-weight: 600; }

  .flow-value {
    overflow: hidden;
    color: var(--v2c-text);
    font-size: 0.82rem;
    font-variant-numeric: tabular-nums;
    font-weight: 650;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .flow-direction { color: var(--v2c-muted); font-size: 0.62rem; }

  .energy-note {
    margin: 9px 0 0;
    color: var(--v2c-muted);
    font-size: 0.68rem;
  }

  details {
    margin-top: 14px;
    border-top: 1px solid var(--v2c-border);
  }

  summary {
    min-height: 44px;
    padding: 14px 2px 6px;
    color: var(--v2c-text);
    font-size: 0.78rem;
    font-weight: 650;
    cursor: pointer;
  }

  .advanced-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin-top: 10px;
  }

  .control-group {
    min-width: 0;
    padding: 12px;
    border: 1px solid var(--v2c-border);
    border-radius: 10px;
    background: var(--v2c-surface-soft);
  }

  .control-group h3 {
    margin: 0 0 8px;
    color: var(--v2c-muted);
    font-size: 0.68rem;
    font-weight: 650;
    line-height: 1.3;
  }

  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-height: 44px;
    color: var(--v2c-text);
    font-size: 0.74rem;
  }

  .toggle-row button {
    min-width: 56px;
    min-height: 36px;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 0.66rem;
  }

  .toggle-row button[aria-pressed="true"] {
    color: var(--v2c-on-control);
    background: var(--v2c-control);
    border-color: var(--v2c-control);
  }

  .select-row { display: grid; gap: 6px; color: var(--v2c-muted); font-size: 0.7rem; }

  select {
    min-width: 0;
    min-height: 44px;
    padding: 7px;
    border: 1px solid var(--v2c-control-border);
    border-radius: 8px;
    color: var(--v2c-text);
    background: var(--v2c-surface);
  }

  .technical-list { display: grid; gap: 8px; margin: 0; }
  .technical-row { display: grid; gap: 2px; }
  .technical-row dt { color: var(--v2c-muted); font-size: 0.66rem; }
  .technical-row dd { margin: 0; overflow-wrap: anywhere; color: var(--v2c-text); font-size: 0.75rem; }
  .technical-row[data-severity="error"] dd { color: var(--v2c-danger); }

  .live-region {
    min-height: 1em;
    margin: 8px 2px 0;
    color: var(--v2c-muted);
    font-size: 0.68rem;
  }

  .empty { padding: 18px; color: var(--v2c-danger); }

  ha-card[data-theme="light"] {
    --v2c-surface: #ffffff;
    --v2c-surface-soft: #f4f5f6;
    --v2c-text: #17191b;
    --v2c-muted: #5d636a;
    --v2c-border: #d9dce0;
    --v2c-control: #202326;
    --v2c-on-control: #ffffff;
    --v2c-control-border: #747a80;
    --v2c-focus: #0067d9;
    --v2c-danger: #b42335;
    --v2c-danger-soft: #fff0f2;
    color-scheme: light;
  }

  ha-card[data-theme="dark"] {
    --v2c-surface: #181b1e;
    --v2c-surface-soft: #202428;
    --v2c-text: #f4f5f6;
    --v2c-muted: #a7adb4;
    --v2c-border: #34393f;
    --v2c-control: #f4f5f6;
    --v2c-on-control: #17191b;
    --v2c-control-border: #8c939b;
    --v2c-focus: #7eb8ff;
    --v2c-danger: #ff8794;
    --v2c-danger-soft: #351c21;
    color-scheme: dark;
  }

  @container (max-width: 359px) {
    .shell { padding: 16px; }
    .card-heading { align-items: flex-start; flex-direction: column; gap: 2px; }
    .location::before { content: ""; }
    .primary-metrics { gap: 6px; }
    .metric { padding: 9px 7px; }
    .session-controls { grid-template-columns: 1fr; align-items: stretch; }
    .primary-action { width: 100%; }
    .advanced-grid { grid-template-columns: 1fr; }
  }

  @container (min-width: 520px) {
    ha-card[data-mode="standard"] .session-controls {
      grid-template-columns: minmax(0, 1fr) minmax(132px, auto);
      align-items: end;
    }
    ha-card[data-mode="standard"] .primary-action { width: auto; min-width: 132px; }
    .advanced-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  ha-card[data-mode="compact"] .shell { padding: 18px; }
  ha-card[data-mode="compact"] .hero { gap: 0; margin-top: 12px; }
  ha-card[data-mode="compact"] .hero-copy { margin-top: -14px; }
  ha-card[data-mode="compact"] .charger-stage { width: min(100%, clamp(210px, 62cqw, 280px)); }
  ha-card[data-mode="compact"] .charger-status { margin-top: 0; font-size: clamp(1.65rem, 6cqw, 2rem); }
  ha-card[data-mode="compact"] .metric { padding: 9px; }
  ha-card[data-mode="compact"] .session-controls,
  ha-card[data-mode="compact"] .energy-section { margin-top: 10px; padding-top: 10px; }
  ha-card[data-mode="compact"] details { margin-top: 10px; }

  ha-card[data-mode="ultra_compact"] .shell { padding: 14px; }
  ha-card[data-mode="ultra_compact"] .location { display: none; }
  ha-card[data-mode="ultra_compact"] h2 { font-size: 0.86rem; }
  ha-card[data-mode="ultra_compact"] .hero {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    margin-top: 10px;
    align-items: center;
  }
  ha-card[data-mode="ultra_compact"] .charger-stage { width: min(100%, clamp(170px, 56cqw, 220px)); }
  ha-card[data-mode="ultra_compact"] .hero-copy { margin-top: -10px; }
  ha-card[data-mode="ultra_compact"] .charger-status { margin-top: 0; font-size: clamp(1.35rem, 5.5cqw, 1.65rem); }
  ha-card[data-mode="ultra_compact"] .badges { margin-top: 6px; }
  ha-card[data-mode="ultra_compact"] .badge { padding: 3px 6px; font-size: 0.62rem; }
  ha-card[data-mode="ultra_compact"] .primary-metrics { grid-template-columns: 1fr; }
  ha-card[data-mode="ultra_compact"] .metric { display: none; padding: 9px; }
  ha-card[data-mode="ultra_compact"] .metric-power { display: block; }
  ha-card[data-mode="ultra_compact"] .metric-power .metric-value { font-size: clamp(1.2rem, 7cqw, 1.75rem); }
  ha-card[data-mode="ultra_compact"] .session-controls {
    grid-template-columns: 1fr;
    gap: 8px;
    margin-top: 8px;
    padding-top: 8px;
  }
  ha-card[data-mode="ultra_compact"] .presets { display: none; }
  ha-card[data-mode="ultra_compact"] .primary-action { width: 100%; min-width: 0; }
  ha-card[data-mode="ultra_compact"] .energy-section { margin-top: 10px; padding-top: 8px; }
  ha-card[data-mode="ultra_compact"] .energy-summary { padding: 9px; }
  ha-card[data-mode="ultra_compact"] .energy-nodes,
  ha-card[data-mode="ultra_compact"] .energy-note { display: none; }
  ha-card[data-mode="ultra_compact"] details { margin-top: 9px; }
  ha-card[data-mode="ultra_compact"] summary { padding-top: 9px; }

  ha-card[data-show-header="false"] .card-heading { display: none; }
  ha-card[data-surface="transparent"] { background: transparent; }
  ha-card[data-surface="tinted"] { background: color-mix(in srgb, var(--v2c-control) 8%, var(--v2c-surface)); }
  .charger-stage { transform: scale(var(--v2c-hero-scale, 1)); transform-origin: center bottom; }

  ha-card[data-mode="xxl"] .shell { padding: clamp(26px, 5cqw, 36px); }
  ha-card[data-mode="xxl"] .hero { margin-top: 24px; }
  ha-card[data-mode="xxl"] .charger-stage { width: min(100%, clamp(320px, 84cqw, 430px)); }
  ha-card[data-mode="xxl"] .hero-copy { margin-top: -22px; }
  ha-card[data-mode="xxl"] .charger-status { font-size: clamp(2.35rem, 8cqw, 3rem); }
  ha-card[data-mode="xxl"] .metric { padding: 16px; }
  ha-card[data-mode="xxl"] .metric-value { font-size: clamp(1.2rem, 4.8cqw, 1.7rem); }
  ha-card[data-mode="xxl"] .metric-power .metric-value { font-size: clamp(1.5rem, 6cqw, 2.25rem); }
  ha-card[data-mode="xxl"] .session-controls { margin-top: 18px; padding-top: 18px; }

  @container (min-width: 400px) {
    ha-card[data-layout="split"] .hero { grid-template-columns: minmax(150px, .9fr) minmax(0, 1.1fr); gap: clamp(16px, 4cqw, 30px); justify-items: stretch; }
    ha-card[data-layout="split"] .charger-stage { width: min(100%, 280px); justify-self: end; }
    ha-card[data-layout="split"] .hero-copy { margin-top: 0; align-items: flex-start; text-align: left; }
    ha-card[data-layout="split"] .badges { justify-content: flex-start; }
    ha-card[data-layout="inline"] .hero { grid-template-columns: auto minmax(0, 1fr); gap: 14px; justify-items: stretch; }
    ha-card[data-layout="inline"] .charger-stage { width: min(132px, 28cqw); }
    ha-card[data-layout="inline"] .hero-copy { margin-top: 0; align-items: flex-start; text-align: left; }
    ha-card[data-layout="inline"] .charger-status { font-size: clamp(1.1rem, 4cqw, 1.6rem); }
    ha-card[data-layout="inline"] .badges { justify-content: flex-start; }
  }
  @container (min-width: 520px) {
    ha-card[data-layout="auto"] .hero { grid-template-columns: minmax(180px, .9fr) minmax(0, 1.1fr); gap: clamp(18px, 4cqw, 32px); justify-items: stretch; }
    ha-card[data-layout="auto"] .charger-stage { width: min(100%, 300px); justify-self: end; }
    ha-card[data-layout="auto"] .hero-copy { margin-top: 0; align-items: flex-start; text-align: left; }
    ha-card[data-layout="auto"] .badges { justify-content: flex-start; }
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
