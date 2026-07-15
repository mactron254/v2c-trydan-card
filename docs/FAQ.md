# V2C Trydan Card FAQ

## Does this replace the official V2C integration?

No. The card is an independent dashboard interface that uses entities exposed by the [official Home Assistant V2C integration](https://www.home-assistant.io/integrations/v2c/). It neither replaces nor modifies that integration.

## Which entity should I configure?

Use any entity belonging to the V2C Trydan device. A connected binary sensor is a good seed. The card discovers remaining roles through Home Assistant device-registry metadata.

## Why is energy flow not visible?

It is disabled by default since v0.4.2. Enable it explicitly:

~~~yaml
show_energy_flow: true
~~~

Then select sources in the visual editor and map missing entities if discovery cannot resolve them.

## Why is there no charger image in ultra compact mode?

That is intentional. Ultra compact prioritizes state, power and essential controls. <code>show_charger</code> remains stored and takes effect again in compact, standard or XXL.

## Why does the LCD language change?

LCD copy follows <code>language</code>. With <code>auto</code>, resolution order is card configuration, Home Assistant locale/language, browser and English fallback. The LCD is localized; the SVG artwork itself contains no embedded text.

## Are the LCD power values examples?

No. Charging uses the resolved power, current and voltage entities. Charge complete uses session energy. Readings appear only when valid entities provide them; missing values use translated fallback text.

## Why are controls missing?

Discovery only enables a control when a valid entity with the expected domain is resolved. Add an override under <code>entities</code> and check the status shown by the Entities editor section.

## Why is an entity marked ambiguous?

Multiple candidates matched the same role. The card refuses to guess because a wrong match could call the wrong service. Select the intended entity manually.

## Why is an energy arrow reversed?

Use the matching <code>invert_grid_power</code>, <code>invert_battery_power</code> or <code>invert_solar_power</code> option. See power conventions in the configuration guide.

## The card does not appear after updating

Reload the browser, clear the frontend cache and confirm the resource URL is a JavaScript module. HACS users can use Redownload, then reload Home Assistant.

## What Home Assistant version is supported?

The HACS manifest declares Home Assistant 2024.1.0 or newer. Current releases are tested through the local demo and automated card contracts.

## Where should I send feedback?

Use [GitHub Discussions](https://github.com/mactron254/v2c-trydan-card/discussions) for ideas, questions, polls and dashboard examples. Open an [Issue](https://github.com/mactron254/v2c-trydan-card/issues/new?template=bug_report.yml) for a reproducible bug. Report vulnerabilities privately through [GitHub Security Advisories](https://github.com/mactron254/v2c-trydan-card/security/advisories/new).

Remove entity IDs, locations, SSIDs, private IP addresses, tokens and other personal data before posting.

## What responsibility does the project assume?

V2C Trydan Card is independent community software released under the [MIT license](../LICENSE) and provided without warranties. You use it at your own risk. Review entity mappings and test every charger control safely before relying on it. To the extent permitted by law, the authors and contributors are not liable for damage, loss, interruption or unexpected behaviour.
