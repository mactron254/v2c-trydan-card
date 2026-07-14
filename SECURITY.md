# Security policy

## Supported versions

The latest release in the `0.4.x` line receives security fixes.

## Reporting a vulnerability

Use GitHub private vulnerability reporting at:

https://github.com/mactron254/v2c-trydan-card/security/advisories/new

Do not open a public issue for credentials exposure, unsafe service calls or a vulnerability that could affect Home Assistant instances.

Include affected version, impact, reproduction steps and a minimal proof of concept. Remove tokens, URLs, SSIDs, private IPs and personal entity names.

## Scope

The card runs in the Home Assistant frontend and calls services only for resolved entities. The project never needs cloud credentials and does not send telemetry.