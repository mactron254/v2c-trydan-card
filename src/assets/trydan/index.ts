import trydan from "./trydan.svg?raw";

/**
 * One artwork for every visual state.
 *
 * The illuminated V2C wordmark inside the file is `fill="currentColor"`, so the card
 * stylesheet drives its colour and blink from `.charger-art[data-state]`. Switching state
 * therefore recolours the wordmark in place instead of swapping the whole document, which
 * is what makes a transition between states expressible at all.
 */
export const TRYDAN_ARTWORK: string = trydan;
