import { V2cTrydanCard } from "./card/v2c-trydan-card";
import { V2cTrydanCardEditor } from "./editor/v2c-trydan-card-editor";

const CARD_TAG = "v2c-trydan-card";
const EDITOR_TAG = "v2c-trydan-card-editor";

if (!customElements.get(CARD_TAG)) customElements.define(CARD_TAG, V2cTrydanCard);
if (!customElements.get(EDITOR_TAG)) customElements.define(EDITOR_TAG, V2cTrydanCardEditor);

window.customCards = window.customCards ?? [];
if (!window.customCards.some((card) => card.type === CARD_TAG)) {
  window.customCards.push({
    type: CARD_TAG,
    name: "V2C Trydan Card",
    description: "Home Assistant V2C Trydan EV charger card with visual editor, controls and energy monitoring.",
    documentationURL: "https://github.com/mactron254/v2c-trydan-card#readme",
    preview: true,
  });
}

export { V2cTrydanCard, V2cTrydanCardEditor };
