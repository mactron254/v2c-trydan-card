import charging from "./charging.svg?raw";
import complete from "./complete.svg?raw";
import controlPilot from "./control-pilot.svg?raw";
import disconnected from "./disconnected.svg?raw";
import error from "./error.svg?raw";
import loadBalancing from "./load-balancing.svg?raw";
import timer from "./timer.svg?raw";
import updating from "./updating.svg?raw";
import waitingPower from "./waiting-power.svg?raw";
import wifiConnected from "./wifi-connected.svg?raw";
import wifiConnecting from "./wifi-connecting.svg?raw";
import type { VisualStateKey } from "../../models/types";

export const TRYDAN_ASSETS: Record<VisualStateKey, string> = {
  disconnected,
  charging,
  complete,
  timer,
  updating,
  control_pilot: controlPilot,
  load_balancing: loadBalancing,
  error,
  waiting_power: waitingPower,
  wifi_connected: wifiConnected,
  wifi_connecting: wifiConnecting,
};
