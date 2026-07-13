import { css } from "lit";

export const cardStyles = css`
  :host {
    --v2c-orange: #ff8001;
    --v2c-orange-soft: #ffb35c;
    --v2c-carbon: #111315;
    --v2c-graphite: #1c1f22;
    --v2c-fog: #f3f5f6;
    --v2c-blue: #2478ff;
    --v2c-green: #2da866;
    --v2c-red: #e84a5f;
    --v2c-text: var(--primary-text-color, light-dark(#172027, #f3f5f6));
    --v2c-muted: var(--secondary-text-color, light-dark(#5f686f, #9ba1a6));
    --v2c-surface: var(--ha-card-background, var(--card-background-color, light-dark(#ffffff, #111315)));
    display: block;
    container-type: inline-size;
    color-scheme: light dark;
    font-family: var(--paper-font-body1_-_font-family, var(--mdc-typography-font-family, system-ui, sans-serif));
  }

  * {
    box-sizing: border-box;
  }

  ha-card {
    overflow: hidden;
    color: var(--v2c-text);
    background: var(--v2c-surface);
    border: 1px solid color-mix(in srgb, var(--v2c-text) 11%, transparent);
  }

  .shell {
    padding: 18px;
  }

  .topline {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .eyebrow {
    margin: 0 0 3px;
    color: var(--v2c-orange);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.16em;
  }

  h2 {
    margin: 0;
    color: var(--v2c-text);
    font-size: 1.08rem;
    font-weight: 720;
    line-height: 1.2;
  }

  .location {
    display: block;
    margin-top: 3px;
    color: var(--v2c-muted);
    font-size: 0.75rem;
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    max-width: 52%;
    padding: 6px 9px;
    border: 1px solid color-mix(in srgb, var(--v2c-text) 16%, transparent);
    border-radius: 999px;
    color: var(--v2c-text);
    font-size: 0.73rem;
    font-weight: 700;
    line-height: 1.1;
    text-align: right;
  }

  .status-dot {
    width: 7px;
    height: 7px;
    flex: 0 0 7px;
    border-radius: 50%;
    background: var(--v2c-muted);
  }

  .status[data-severity="info"] .status-dot { background: var(--v2c-blue); }
  .status[data-severity="success"] .status-dot { background: var(--v2c-green); }
  .status[data-severity="warning"] .status-dot { background: var(--v2c-orange); }
  .status[data-severity="error"] .status-dot { background: var(--v2c-red); }

  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(130px, 0.95fr);
    align-items: center;
    min-height: 240px;
    margin-top: 10px;
  }

  .hero-copy {
    z-index: 1;
    min-width: 0;
    padding: 12px 0 12px 2px;
  }

  .hero-value {
    margin: 0;
    color: var(--v2c-text);
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: clamp(2.3rem, 10cqw, 4rem);
    font-variant-numeric: tabular-nums;
    font-weight: 760;
    letter-spacing: -0.075em;
    line-height: 0.95;
  }

  .hero-value span {
    color: var(--v2c-orange);
  }

  .state-detail {
    max-width: 28ch;
    margin: 9px 0 0;
    color: var(--v2c-muted);
    font-size: 0.78rem;
    line-height: 1.35;
  }

  .session-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 20px;
  }

  .stat {
    min-width: 64px;
  }

  .stat-label {
    display: block;
    margin-bottom: 3px;
    color: var(--v2c-muted);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .stat-value {
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: 0.88rem;
    font-variant-numeric: tabular-nums;
    font-weight: 700;
  }

  .charger-stage {
    position: relative;
    align-self: stretch;
    min-width: 0;
    overflow: hidden;
    background: var(--v2c-carbon);
    border-radius: 18px 4px 18px 4px;
  }

  .charger-stage::after {
    content: "";
    position: absolute;
    right: -28%;
    bottom: 18%;
    width: 78%;
    height: 2px;
    background: var(--v2c-orange);
    box-shadow: 0 0 18px color-mix(in srgb, var(--v2c-orange) 75%, transparent);
  }

  .charger-art {
    position: absolute;
    inset: 3px 5% 2px;
    z-index: 1;
  }

  .charger-art svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;
  }

  .badge {
    color: var(--v2c-text);
    font-size: 0.65rem;
    font-weight: 700;
  }

  .badge::before {
    content: "·";
    margin-right: 5px;
    color: var(--v2c-orange);
  }

  .diagnostic,
  .config-warning {
    margin: 10px 0 0;
    padding: 8px 10px;
    border-left: 3px solid var(--v2c-orange);
    color: var(--v2c-muted);
    background: color-mix(in srgb, var(--v2c-orange) 9%, transparent);
    font-size: 0.72rem;
    line-height: 1.35;
  }

  .energy-section {
    padding: 14px 0 3px;
    border-top: 1px solid color-mix(in srgb, var(--v2c-text) 11%, transparent);
  }

  .energy-rail {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 8px;
    align-items: stretch;
  }

  .flow-node {
    position: relative;
    min-width: 0;
    padding: 8px 6px;
    border-top: 2px solid color-mix(in srgb, var(--v2c-text) 18%, transparent);
  }

  .flow-node[data-active="true"] {
    border-color: var(--v2c-orange);
  }

  .flow-node:not(:last-child)::after {
    content: "›";
    position: absolute;
    top: -13px;
    right: -8px;
    z-index: 1;
    color: var(--v2c-orange);
    font-size: 1.2rem;
    font-weight: 800;
  }

  .flow-name {
    display: flex;
    gap: 4px;
    align-items: center;
    overflow: hidden;
    color: var(--v2c-muted);
    font-size: 0.62rem;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .flow-name ha-icon {
    --mdc-icon-size: 14px;
    color: var(--v2c-orange);
  }

  .flow-value {
    display: block;
    margin-top: 4px;
    overflow: hidden;
    color: var(--v2c-text);
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: 0.78rem;
    font-weight: 750;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .flow-direction {
    display: block;
    margin-top: 2px;
    overflow: hidden;
    color: var(--v2c-muted);
    font-size: 0.58rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .flow-node[data-active="true"] .flow-direction {
    color: color-mix(in srgb, var(--v2c-orange) 74%, var(--v2c-text));
  }

  .session-controls {
    display: grid;
    grid-template-columns: minmax(120px, auto) minmax(0, 1fr);
    gap: 14px;
    align-items: end;
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid color-mix(in srgb, var(--v2c-text) 11%, transparent);
  }

  button,
  select,
  input {
    font: inherit;
  }

  button {
    min-height: 42px;
    border: 1px solid color-mix(in srgb, var(--v2c-text) 18%, transparent);
    border-radius: 10px;
    color: var(--v2c-text);
    background: color-mix(in srgb, var(--v2c-text) 5%, transparent);
    cursor: pointer;
  }

  button:hover:not(:disabled) {
    border-color: var(--v2c-orange);
  }

  button:focus-visible,
  select:focus-visible,
  input:focus-visible,
  summary:focus-visible {
    outline: 3px solid var(--v2c-orange-soft);
    outline-offset: 2px;
  }

  button:disabled,
  input:disabled,
  select:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .primary-action {
    padding: 0 16px;
    color: #151515;
    background: var(--v2c-orange);
    border-color: var(--v2c-orange);
    font-weight: 800;
  }

  .primary-action[aria-busy="true"] {
    background: var(--v2c-orange-soft);
  }

  .range-head {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 7px;
    color: var(--v2c-muted);
    font-size: 0.7rem;
    font-weight: 700;
  }

  .range-head output {
    color: var(--v2c-text);
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  }

  input[type="range"] {
    width: 100%;
    accent-color: var(--v2c-orange);
  }

  .presets {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 7px;
  }

  .preset {
    min-height: 28px;
    padding: 3px 8px;
    border-radius: 6px;
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: 0.67rem;
  }

  .preset[aria-pressed="true"] {
    color: #151515;
    background: var(--v2c-orange);
    border-color: var(--v2c-orange);
  }

  details {
    margin-top: 14px;
    border-top: 1px solid color-mix(in srgb, var(--v2c-text) 11%, transparent);
  }

  summary {
    padding: 14px 2px 4px;
    color: var(--v2c-text);
    font-size: 0.76rem;
    font-weight: 780;
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
    padding: 10px;
    border: 1px solid color-mix(in srgb, var(--v2c-text) 10%, transparent);
    border-radius: 10px;
  }

  .control-group h3 {
    margin: 0 0 8px;
    color: var(--v2c-muted);
    font-size: 0.64rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    min-height: 36px;
    color: var(--v2c-text);
    font-size: 0.72rem;
  }

  .toggle-row button {
    min-width: 44px;
    min-height: 30px;
    padding: 2px 9px;
    border-radius: 999px;
    font-size: 0.65rem;
  }

  .toggle-row button[aria-pressed="true"] {
    color: #151515;
    background: var(--v2c-orange);
    border-color: var(--v2c-orange);
  }

  .select-row {
    display: grid;
    gap: 5px;
    color: var(--v2c-muted);
    font-size: 0.67rem;
  }

  select {
    min-width: 0;
    min-height: 34px;
    padding: 4px 7px;
    border: 1px solid color-mix(in srgb, var(--v2c-text) 18%, transparent);
    border-radius: 7px;
    color: var(--v2c-text);
    background: var(--v2c-surface);
  }

  .live-region {
    min-height: 1.1em;
    margin: 9px 2px 0;
    color: var(--v2c-muted);
    font-size: 0.68rem;
  }

  .empty {
    padding: 18px;
    color: var(--error-color, var(--v2c-red));
  }

  @container (max-width: 430px) {
    .shell { padding: 15px; }
    .hero { grid-template-columns: minmax(0, 1fr) 118px; min-height: 206px; }
    .charger-stage { min-height: 190px; }
    .hero-value { font-size: clamp(2rem, 13cqw, 3rem); }
    .energy-rail { grid-template-columns: repeat(3, minmax(0, 1fr)); row-gap: 14px; }
    .flow-node:nth-child(3)::after { display: none; }
    .session-controls { grid-template-columns: 1fr; align-items: stretch; }
    .advanced-grid { grid-template-columns: 1fr; }
  }

  @container (max-width: 315px) {
    .topline { align-items: flex-start; }
    .status { max-width: 46%; padding: 5px 7px; font-size: 0.65rem; }
    .hero { grid-template-columns: 1fr 96px; min-height: 182px; }
    .charger-stage { min-height: 164px; }
    .session-stats { gap: 9px; }
    .energy-rail { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .flow-node:nth-child(2n)::after { display: none; }
  }

  ha-card[data-theme="light"] {
    --v2c-text: #172027;
    --v2c-muted: #5f686f;
    --v2c-surface: #ffffff;
    color-scheme: light;
  }

  ha-card[data-theme="dark"] {
    --v2c-text: #f3f5f6;
    --v2c-muted: #9ba1a6;
    --v2c-surface: #111315;
    color-scheme: dark;
  }

  @container (min-width: 650px) {
    .shell { padding: 22px; }
    .hero { grid-template-columns: minmax(0, 1fr) minmax(260px, 0.8fr); min-height: 270px; }
    .advanced-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  ha-card[data-mode="compact"] .shell { padding: 14px; }
  ha-card[data-mode="compact"] .hero { min-height: 170px; margin-top: 6px; }
  ha-card[data-mode="compact"] .hero-copy { padding: 7px 0; }
  ha-card[data-mode="compact"] .hero-value { font-size: clamp(2rem, 8cqw, 3rem); }
  ha-card[data-mode="compact"] .charger-stage { min-height: 160px; }
  ha-card[data-mode="compact"] .session-stats { margin-top: 12px; }
  ha-card[data-mode="compact"] .energy-section,
  ha-card[data-mode="compact"] .session-controls { padding-top: 10px; margin-top: 10px; }
  ha-card[data-mode="compact"] details { margin-top: 10px; }
  ha-card[data-mode="compact"] summary { padding-top: 10px; }

  ha-card[data-mode="ultra_compact"] .shell { padding: 10px 12px; }
  ha-card[data-mode="ultra_compact"] .topline { align-items: center; }
  ha-card[data-mode="ultra_compact"] .eyebrow,
  ha-card[data-mode="ultra_compact"] .location,
  ha-card[data-mode="ultra_compact"] .state-detail,
  ha-card[data-mode="ultra_compact"] .badges,
  ha-card[data-mode="ultra_compact"] .charger-stage,
  ha-card[data-mode="ultra_compact"] .energy-section,
  ha-card[data-mode="ultra_compact"] .session-stats,
  ha-card[data-mode="ultra_compact"] details { display: none; }
  ha-card[data-mode="ultra_compact"] h2 { font-size: 0.88rem; }
  ha-card[data-mode="ultra_compact"] .status { max-width: 58%; padding: 4px 7px; font-size: 0.64rem; }
  ha-card[data-mode="ultra_compact"] .hero { display: block; min-height: 0; margin-top: 7px; }
  ha-card[data-mode="ultra_compact"] .hero-copy { padding: 0; }
  ha-card[data-mode="ultra_compact"] .hero-value { font-size: clamp(1.65rem, 9cqw, 2.15rem); letter-spacing: -0.055em; }
  ha-card[data-mode="ultra_compact"] .session-controls {
    grid-template-columns: minmax(92px, auto) minmax(0, 1fr);
    gap: 10px;
    margin-top: 8px;
    padding-top: 8px;
  }
  ha-card[data-mode="ultra_compact"] .primary-action { min-height: 36px; padding-inline: 12px; }
  ha-card[data-mode="ultra_compact"] .range-head { margin-bottom: 3px; font-size: 0.64rem; }
  ha-card[data-mode="ultra_compact"] .presets { display: none; }
  ha-card[data-mode="ultra_compact"] .diagnostic,
  ha-card[data-mode="ultra_compact"] .config-warning { margin-top: 7px; padding-block: 5px; }
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
