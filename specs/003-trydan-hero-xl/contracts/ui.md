# UI Contract: Trydan Hero XL

- `.charger-art` appears before `.charger-status`, `.primary-metrics` and `.session-controls` in DOM order.
- `.charger-status` retains `role="status"` and remains visible when `show_charger` is false.
- Every Trydan SVG root uses `viewBox="24 0 312 480"`.
- Standard, compact and ultra stages use `width: min(100%, clamp(...))` with bounds 260–360, 210–280 and 170–220 px.
- No container query converts `.hero` into a side-by-side standard layout.
- Public card configuration and editor schema remain unchanged.
