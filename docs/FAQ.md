# V2C Trydan Card FAQ

## Does this replace the official V2C integration?

No. The card is a dashboard interface and expects V2C entities in Home Assistant. It is an independent project.

## Which entity should I configure?

Use any entity belonging to the V2C Trydan device. A connected binary sensor is a good seed. The card discovers remaining roles through device-registry metadata.

## Why is energy flow not visible?

It is disabled by default since v0.4.2. Enable it explicitly:

```yaml
show_energy_flow: true
```

Then select sources in the visual editor and map missing entities if discovery cannot resolve them.

## Why is there no charger image in ultra compact mode?

That is intentional. Ultra compact prioritizes state, power and essential controls. `show_charger` remains stored and takes effect again in compact, standard or XXL.

## Why does the LCD language change?

LCD copy follows `language`. With `auto`, resolution order is card configuration, Home Assistant locale/language, browser and English fallback.

## Are the LCD power values examples?

No. Charging uses the resolved power, current and voltage entities. Charge complete uses session energy. Missing readings show translated fallback text.

## Why are controls missing?

Discovery only enables a control when a valid entity with the expected domain is resolved. Add an override under `entities` and check the status shown by the Entities editor section.

## Why is an entity marked ambiguous?

Multiple candidates matched the same role. The card refuses to guess because a wrong match could call the wrong service. Select the intended entity manually.

## Why is an energy arrow reversed?

Use the matching `invert_grid_power`, `invert_battery_power` or `invert_solar_power` option. See power conventions in the configuration guide.

## The card does not appear after updating

Reload the browser, clear the frontend cache and confirm the resource URL is a JavaScript module. HACS users can use Redownload, then reload Home Assistant.

## What Home Assistant version is supported?

The HACS manifest declares Home Assistant 2024.1.0 or newer. Current releases are tested through the local demo and automated card contracts.

## How do I report a bug?

Open a GitHub issue with card version, Home Assistant version, browser, sanitized YAML, console error and a screenshot. Never include tokens, public URLs, SSID or private IP addresses.