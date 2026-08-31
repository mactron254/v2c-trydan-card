# Charger artwork: sources and provenance

The charger illustration is two transparent WebP layers cut from V2C's own product
photography, with the illuminated logo and the LCD drawn as SVG on top so they stay
recolourable and animatable.

## Source

`source-v2c-press-kit.jpg` is `TRYDAN e-Charger/TRYDAN MANGUERA LISA (2).jpg` from
**Trydan - Images.zip**, the download behind <https://v2charge.com/material-grafico>.
1500 x 1500, straight-on, pure white background. Its logo happens to be lit green rather
than white, which does not matter: the logo is erased from the bitmap and redrawn.

A byte-identical smaller version of the same shot circulates through resellers, which is
how it was found in the first place; `efimarket.com/.../Trydan6.jpg` is byte-identical to
V2C's own `store/.../Trydan6.jpg`, confirming resellers republish V2C's files verbatim.
The press-kit original is used here so the provenance runs straight to the manufacturer.

## Where the numbers come from

| Measurement | Value | Source |
| --- | --- | --- |
| Body | 240 x 334 mm, ratio 0.7186 | `ficha-tecnica-trydan.pdf`, dimensioned front elevation |
| Corner radius | 24 mm (10% of width) | least-squares fit of the drawing's rounded-rect inset profile |
| Display glass | 65 x 13.7 mm, centre at 41.0% of height | the drawing's display slot, measured at 600 dpi |
| Logo | 63.4 mm wide, centre at 23.5% of height | see below |
| LCD grid | 16 x 2 cells of 5 x 7 dots, 0.64 mm pitch | display captures embedded in the installation manual |
| LCD colours | background `#240FBE`, characters `~#DCE4FF` | photograph of a running unit |

Four independent sources agree on the body ratio and the display position to within 2%:
the spec drawing, the render in the installation manual, a reseller crop, and the press-kit
photograph, which measures the body at 760 x 1058 px (ratio 0.7183) with the display centred
at 41.49% of the height.

The logo is the one measurement that moves: 59.7 mm at 23.9% from the manual's render,
63.7 mm at 23.0% from the reseller crop, 63.3 mm at 23.75% from the press kit. All three
measure a *lit* logo whose glow inflates the box, so the model takes the middle of the
range. For the same reason the drawn logo and display are positioned from the millimetre
model rather than traced from the photograph: the photo's lit display area measures 68 mm
across a 65 mm glass, which cannot be right.

Two things the manual gets wrong about the display: its captures are **positive** (pale
backlight, dark characters) while real hardware is **negative** (deep blue backlight, light
characters), and its idealised screens do not match a running unit, which reads
`ESPERANT EV` over `T:0.1 FV:1.7`.

## The layers

Both share one 483 x 604 canvas, downscaled so the body is 360 px wide. The canvas is
taller than the charger because the connector's cable hook hangs below it.

| Layer | Size | Contents |
| --- | --- | --- |
| `body.webp` | 4.6 KB | body only; the lit logo and display are removed by multigrid Laplace diffusion |
| `plug.webp` | 6.9 KB | the connector hanging at the side, cut by hand by Pere |

11.5 KB together, 15 KB once base64-inlined. `scripts/smoke.mjs` caps the bundle at 307200
bytes; replacing the eleven per-state SVGs with this brings the build down from 193509 to
183321 bytes. A bitmap *per state* was never possible: eleven at 25 KB is 275 KB on its own.

The coiled cable was cut too and then dropped. It was 26 KB and made the card noisy; the
connector alone carries the same "this is a tethered Trydan" signal.

### Extraction notes

Cutting an object off a white background needs alpha matting **and**
un-premultiplication (`O = (P - 255(1-a)) / a`), otherwise a white fringe survives every
edge and reads as a halo on a dark dashboard. Near-zero alpha has to be clamped to zero as
well, or the WebP alpha channel triples in size encoding an invisible drop shadow.

**The connector is cut by hand.** `source-connector-cut.png` is Pere's cut on the
press-kit frame, and it is used as-is: the only processing applied is un-premultiplying
the white fringe off its soft edges.

That is not laziness, it is the better result. Two automatic attempts were made first and
both were worse. Behind the connector the studio backdrop is a grey falloff rather than
white, so a whiteness matte keeps it and it shows as a pale smear; cutting on darkness
instead fixes that but then the box sweeps up the cable strands crossing behind and beside
the connector, which on a dark card is indistinguishable from the connector itself.
Narrowing the box drops most of them and also drops the cable's hook. Deciding where the
connector ends and the coil begins is a judgement, and thresholding does not make
judgements.

An earlier hand cut, made on a reseller copy of the same shot, could not be carried over.
Scaling it by the ratio of the two body rectangles lands it 234 px to the left of where the
press-kit connector actually is: the connector is a loose object and hangs differently in
every exposure, so no similarity transform maps one frame onto the other. This is worth
knowing before anyone tries to reuse a mask across sources.

The body still needs a different cut from the connector. Behind the cable loops the studio
backdrop is a grey falloff rather than white, so a whiteness-based matte keeps it and it
appears as a pale smear; the connector is cut on darkness instead. Enclosed bright regions
are filled only when their mean luminance says they are specular highlights on the cable
rather than backdrop showing through a gap.

## Where the images come from

V2C publishes this photography themselves, on a page whose stated purpose is to have it
used:

> From V2C we provide you with a wide range of images, videos and graphic resources **in
> order to promote their use**.
> — <https://v2charge.com/material-grafico>

So the layers here are the manufacturer's own product photography, of the product this card
exists to control, taken from the page the manufacturer publishes it on.

Two things worth knowing rather than worrying about. V2C's `V2Charge/v2c-media-kit`
repository asks that the logo not be modified, though both its README and its LICENSE scope
that to the email templates and the visual identity rather than to product photos; the
traced wordmark in `src/assets/trydan/logo.ts` is the part that touches on it. And nothing
found governs third-party redistribution of the photography specifically, so there is no
explicit grant either. `info@v2charge.com` is the address that LICENSE nominates if anyone
wants it in writing.

If the source ever needs to change, the extraction is source-agnostic: point the pipeline at
a different photograph and the layers regenerate, so replacing it is a substitution rather
than a rewrite.
