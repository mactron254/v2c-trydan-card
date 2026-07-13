//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: ee, getOwnPropertySymbols: te, getPrototypeOf: ne } = Object, f = globalThis, re = f.trustedTypes, ie = re ? re.emptyScript : "", ae = f.reactiveElementPolyfillSupport, p = (e, t) => e, m = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ie : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, h = (e, t) => !l(e, t), oe = {
	attribute: !0,
	type: String,
	converter: m,
	reflect: !1,
	useDefault: !1,
	hasChanged: h
};
Symbol.metadata ??= Symbol("metadata"), f.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var g = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = oe) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? oe;
	}
	static _$Ei() {
		if (this.hasOwnProperty(p("elementProperties"))) return;
		let e = ne(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(p("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(p("properties"))) {
			let e = this.properties, t = [...ee(e), ...te(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(Infinity).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? m : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? m : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? h)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
g.elementStyles = [], g.shadowRootOptions = { mode: "open" }, g[p("elementProperties")] = /* @__PURE__ */ new Map(), g[p("finalized")] = /* @__PURE__ */ new Map(), ae?.({ ReactiveElement: g }), (f.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js
var _ = globalThis, se = (e) => e, v = _.trustedTypes, ce = v ? v.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, le = "$lit$", y = `lit$${Math.random().toFixed(9).slice(2)}$`, ue = "?" + y, de = `<${ue}>`, b = document, x = () => b.createComment(""), S = (e) => e === null || typeof e != "object" && typeof e != "function", C = Array.isArray, fe = (e) => C(e) || typeof e?.[Symbol.iterator] == "function", w = "[ 	\n\f\r]", T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pe = /-->/g, me = />/g, E = RegExp(`>|${w}(?:([^\\s"'>=/]+)(${w}*=${w}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), he = /'/g, ge = /"/g, _e = /^(?:script|style|textarea|title)$/i, D = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), O = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), ve = /* @__PURE__ */ new WeakMap(), A = b.createTreeWalker(b, 129);
function ye(e, t) {
	if (!C(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ce === void 0 ? t : ce.createHTML(t);
}
var be = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = T;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === T ? c[1] === "!--" ? o = pe : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = E) : (_e.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = E) : o = me : o === E ? c[0] === ">" ? (o = i ?? T, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? E : c[3] === "\"" ? ge : he) : o === ge || o === he ? o = E : o === pe || o === me ? o = T : (o = E, i = void 0);
		let d = o === E && e[t + 1].startsWith("/>") ? " " : "";
		a += o === T ? n + de : l >= 0 ? (r.push(s), n.slice(0, l) + le + n.slice(l) + y + d) : n + y + (l === -2 ? t : d);
	}
	return [ye(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, j = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = be(t, n);
		if (this.el = e.createElement(l, r), A.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = A.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(le)) {
					let t = u[o++], n = i.getAttribute(e).split(y), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Se : r[1] === "?" ? Ce : r[1] === "@" ? we : P
					}), i.removeAttribute(e);
				} else e.startsWith(y) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (_e.test(i.tagName)) {
					let e = i.textContent.split(y), t = e.length - 1;
					if (t > 0) {
						i.textContent = v ? v.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], x()), A.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], x());
					}
				}
			} else if (i.nodeType === 8) if (i.data === ue) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(y, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += y.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = b.createElement("template");
		return n.innerHTML = e, n;
	}
};
function M(e, t, n = e, r) {
	if (t === O) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = S(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = M(e, i._$AS(e, t.values), i, r)), t;
}
var xe = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? b).importNode(t, !0);
		A.currentNode = r;
		let i = A.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new N(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Te(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = A.nextNode(), a++);
		}
		return A.currentNode = b, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, N = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = M(this, e, t), S(e) ? e === k || e == null || e === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : e !== this._$AH && e !== O && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? fe(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== k && S(this._$AH) ? this._$AA.nextSibling.data = e : this.T(b.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = j.createElement(ye(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new xe(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = ve.get(e.strings);
		return t === void 0 && ve.set(e.strings, t = new j(e)), t;
	}
	k(t) {
		C(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(x()), this.O(x()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = se(e).nextSibling;
			se(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, P = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = k, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = k;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = M(this, e, t, 0), a = !S(e) || e !== this._$AH && e !== O, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = M(this, r[n + o], t, o), s === O && (s = this._$AH[o]), a ||= !S(s) || s !== this._$AH[o], s === k ? e = k : e !== k && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Se = class extends P {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === k ? void 0 : e;
	}
}, Ce = class extends P {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== k);
	}
}, we = class extends P {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = M(this, e, t, 0) ?? k) === O) return;
		let n = this._$AH, r = e === k && n !== k || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== k && (n === k || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Te = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		M(this, e);
	}
}, Ee = _.litHtmlPolyfillSupport;
Ee?.(j, N), (_.litHtmlVersions ??= []).push("3.3.3");
var De = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new N(t.insertBefore(x(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, F = globalThis, I = class extends g {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = De(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return O;
	}
};
I._$litElement$ = !0, I.finalized = !0, F.litElementHydrateSupport?.({ LitElement: I });
var Oe = F.litElementPolyfillSupport;
Oe?.({ LitElement: I }), (F.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js
var ke = {
	attribute: !0,
	type: String,
	converter: m,
	reflect: !1,
	hasChanged: h
}, Ae = (e = ke, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function L(e) {
	return (t, n) => typeof n == "object" ? Ae(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js
function R(e) {
	return L({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/directive.js
var je = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Me = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Ne = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, z = class extends Ne {
	constructor(e) {
		if (super(e), this.it = k, e.type !== je.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
	}
	render(e) {
		if (e === k || e == null) return this._t = void 0, this.it = e;
		if (e === O) return e;
		if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
		if (e === this.it) return this._t;
		this.it = e;
		let t = [e];
		return t.raw = t, this._t = {
			_$litType$: this.constructor.resultType,
			strings: t,
			values: []
		};
	}
};
z.directiveName = "unsafeHTML", z.resultType = 1;
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/directives/unsafe-svg.js
var B = class extends z {};
B.directiveName = "unsafeSVG", B.resultType = 2;
var Pe = Me(B), Fe = {
	disconnected: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 500\" role=\"img\" aria-label=\"V2C Trydan: Sin vehiculo\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#f4f6f8\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">CARGADOR LISTO</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">SIN VEHICULO</text>\n</g>\n</svg>",
	charging: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 500\" role=\"img\" aria-label=\"V2C Trydan: Cargando\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"blink-current\" transform=\"translate(107 104) scale(.92)\" fill=\"#123cc9\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">CARGANDO 3.9kW</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">17A   233V</text>\n</g>\n</svg>",
	complete: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 500\" role=\"img\" aria-label=\"V2C Trydan: Carga completa\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#3fce6b\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">CARGA COMPLETA</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">12.46 kWh</text>\n</g>\n</svg>",
	timer: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 500\" role=\"img\" aria-label=\"V2C Trydan: Temporizador\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#43dbe7\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">TEMPORIZADOR</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">CARGA PROGRAMADA</text>\n</g>\n</svg>",
	updating: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 500\" role=\"img\" aria-label=\"V2C Trydan: Actualizando\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#f050bd\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">ACTUALIZANDO</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">NO DESCONECTAR</text>\n</g>\n</svg>",
	control_pilot: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 500\" role=\"img\" aria-label=\"V2C Trydan: Control Pilot\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#ffd43b\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">ERROR CONTROL</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">PILOT / POTENCIA</text>\n</g>\n</svg>",
	load_balancing: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 500\" role=\"img\" aria-label=\"V2C Trydan: Error balanceo\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#ff9dd8\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">ERROR LOCAL</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">LOAD BALANCING</text>\n</g>\n</svg>",
	error: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 500\" role=\"img\" aria-label=\"V2C Trydan: Error\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#ef3340\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">ERROR 23 006</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">FALLO CONEXION</text>\n</g>\n</svg>",
	waiting_power: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 500\" role=\"img\" aria-label=\"V2C Trydan: Esperando potencia\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#f28c28\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">ESPERANDO</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">POTENCIA</text>\n</g>\n</svg>",
	wifi_connected: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 500\" role=\"img\" aria-label=\"V2C Trydan: WiFi conectado\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"blink-once\" transform=\"translate(107 104) scale(.92)\" fill=\"#3fce6b\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">WIFI CONECTADO</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">RED OK</text>\n</g>\n</svg>",
	wifi_connecting: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 360 500\" role=\"img\" aria-label=\"V2C Trydan: Conectando WiFi\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"blink-slow\" transform=\"translate(107 104) scale(.92)\" fill=\"#f4f6f8\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">CONECTANDO WIFI</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">ESPERE...</text>\n</g>\n</svg>"
}, Ie = [
	6,
	10,
	13,
	16,
	20,
	25,
	32
];
function Le(e) {
	if (!e || typeof e != "object") throw Error("V2C Trydan Card: configuración no válida");
	if (!e.entity || typeof e.entity != "string") throw Error("V2C Trydan Card: debes indicar una entidad V2C principal");
	let t = [...new Set(e.current_presets ?? Ie)].map(Number).filter((e) => Number.isFinite(e) && e > 0).sort((e, t) => e - t);
	return {
		...e,
		type: "custom:v2c-trydan-card",
		theme: e.theme ?? "auto",
		display_mode: e.display_mode ?? "standard",
		show_energy_flow: e.show_energy_flow ?? !0,
		show_controls: e.show_controls ?? !0,
		show_advanced: e.show_advanced ?? !0,
		show_charger: e.show_charger ?? !0,
		confirm_lock: e.confirm_lock ?? !0,
		flow_threshold_w: Math.max(0, e.flow_threshold_w ?? 50),
		current_presets: t,
		entities: { ...e.entities ?? {} }
	};
}
function Re(e) {
	let t = Object.values(e?.entities ?? {}).find((e) => e.platform === "v2c" && e.translation_key === "connected"), n = Object.keys(e?.states ?? {}).find((e) => e.startsWith("binary_sensor.") && e.toLowerCase().includes("v2c"));
	return {
		type: "custom:v2c-trydan-card",
		theme: "auto",
		display_mode: "standard",
		entity: t?.entity_id ?? n ?? "binary_sensor.v2c_connected"
	};
}
//#endregion
//#region src/localization/en.ts
var ze = {
	states: {
		disconnected: "No vehicle",
		unavailable: "Unavailable",
		charging: "Charging",
		complete: "Charge complete",
		timer: "Scheduled charge",
		updating: "Updating",
		control_pilot: "Control Pilot error",
		load_balancing: "Load Balancing error",
		error: "Charger error",
		waiting_power: "Vehicle connected",
		wifi_connected: "Wi-Fi connected",
		wifi_connecting: "Connecting Wi-Fi"
	},
	details: {
		disconnected: "Trydan ready",
		unavailable: "Check the main entity",
		charging: "Energy flowing to the vehicle",
		complete: "You can disconnect the vehicle",
		timer: "The timer is active",
		updating: "Do not disconnect the charger",
		control_pilot: "Check vehicle communication",
		load_balancing: "Check local load balancing",
		error: "Review diagnostics",
		waiting_power: "Waiting to start or for power",
		wifi_connected: "Connection restored",
		wifi_connecting: "Trying to connect"
	},
	badges: {
		paused: "Paused",
		locked: "Locked",
		timer: "Timer",
		waiting_power: "Waiting for power"
	},
	labels: {
		brand: "V2C · TRYDAN",
		now: "now",
		session: "Session",
		power: "Power",
		energy: "Energy",
		time: "Time",
		intensity: "Charging current",
		advanced: "Trydan settings",
		chargingControls: "Charging",
		energyControls: "Dynamic energy",
		lightControls: "Lighting",
		unavailableEntity: "Entity unavailable",
		actionPending: "Applying change",
		actionDone: "Change confirmed",
		actionFailed: "Could not apply change",
		additionalStatus: "Additional status",
		energyFlow: "Energy flow",
		voltage: "Voltage",
		diagnostics: "Diagnostics",
		configuration: "Configuration"
	},
	actions: {
		pause: "Pause",
		resume: "Resume",
		lock: "Lock EVSE",
		unlock: "Unlock EVSE",
		timer: "Timer",
		dynamic: "Dynamic modulation",
		pauseDynamic: "Pause dynamic control",
		logoLed: "Logo LED",
		lightLed: "Charger light",
		chargeMode: "Charge mode",
		confirmLock: "Lock the V2C charger?"
	},
	flows: {
		solar: "Solar",
		grid: "Grid",
		home: "Home",
		battery: "Battery",
		charger: "Car",
		import: "Importing",
		export: "Exporting",
		charge: "Charging",
		discharge: "Discharging",
		consume: "Consuming",
		produce: "Producing",
		idle: "Idle",
		unknown: "No data",
		activeFlow: "Energy flowing",
		noFlow: "No energy flow",
		partialData: "Partial energy data",
		noData: "No energy data"
	},
	editor: {
		title: "V2C Trydan Card",
		entity: "Main V2C entity",
		name: "Name",
		location: "Location",
		statusEntity: "Optional visual status",
		gridPower: "Grid power",
		solarPower: "Solar power",
		batteryPower: "Battery power",
		voltage: "Voltage",
		language: "Language",
		theme: "Theme",
		displayMode: "Card size",
		themeAuto: "System / Home Assistant",
		themeLight: "Light",
		themeDark: "Dark",
		modeStandard: "Standard",
		modeCompact: "Compact",
		modeUltra: "Ultra compact",
		showEnergyFlow: "Energy flow",
		showControls: "Charging controls",
		showAdvanced: "Advanced controls",
		showCharger: "Trydan artwork"
	}
};
//#endregion
//#region src/localization/catalog.ts
function V(e) {
	return Object.fromEntries(Object.entries(ze).map(([t, n]) => [t, {
		...n,
		...e[t] ?? {}
	}]));
}
var Be = V({
	states: {
		disconnected: "Nessun veicolo",
		unavailable: "Non disponibile",
		charging: "In carica",
		complete: "Ricarica completata",
		timer: "Ricarica programmata",
		updating: "Aggiornamento",
		control_pilot: "Errore Control Pilot",
		load_balancing: "Errore Load Balancing",
		error: "Errore del caricatore",
		waiting_power: "Veicolo collegato",
		wifi_connected: "Wi-Fi connesso",
		wifi_connecting: "Connessione Wi-Fi"
	},
	details: {
		disconnected: "Trydan pronto",
		unavailable: "Controlla l'entità principale",
		charging: "Energia verso il veicolo",
		complete: "Puoi scollegare il veicolo",
		timer: "Il timer è attivo",
		updating: "Non scollegare il caricatore",
		control_pilot: "Controlla la comunicazione con il veicolo",
		load_balancing: "Controlla il bilanciamento locale",
		error: "Controlla la diagnostica",
		waiting_power: "In attesa dell'avvio o della potenza",
		wifi_connected: "Connessione ripristinata",
		wifi_connecting: "Tentativo di connessione"
	},
	badges: {
		paused: "In pausa",
		locked: "Bloccato",
		timer: "Timer",
		waiting_power: "In attesa di potenza"
	},
	labels: {
		now: "ora",
		session: "Sessione",
		energy: "Energia",
		time: "Tempo",
		intensity: "Corrente di ricarica",
		advanced: "Impostazioni Trydan",
		chargingControls: "Ricarica",
		energyControls: "Energia dinamica",
		lightControls: "Illuminazione",
		unavailableEntity: "Entità non disponibile",
		actionPending: "Modifica in corso",
		actionDone: "Modifica confermata",
		actionFailed: "Impossibile applicare la modifica",
		additionalStatus: "Stato aggiuntivo",
		power: "Potenza",
		energyFlow: "Flusso energetico",
		voltage: "Tensione",
		diagnostics: "Diagnostica",
		configuration: "Configurazione"
	},
	actions: {
		pause: "Pausa",
		resume: "Riprendi",
		lock: "Blocca EVSE",
		unlock: "Sblocca EVSE",
		timer: "Timer",
		dynamic: "Modulazione dinamica",
		pauseDynamic: "Pausa controllo dinamico",
		logoLed: "LED logo",
		lightLed: "Luce caricatore",
		chargeMode: "Modalità di ricarica",
		confirmLock: "Bloccare il caricatore V2C?"
	},
	flows: {
		solar: "Solare",
		grid: "Rete",
		home: "Casa",
		battery: "Batteria",
		charger: "Auto",
		import: "Importazione",
		export: "Esportazione",
		charge: "Ricarica",
		discharge: "Scarica",
		consume: "Consumo",
		produce: "Produzione",
		idle: "Inattivo",
		unknown: "Nessun dato",
		activeFlow: "Flusso energetico attivo",
		noFlow: "Nessun flusso energetico",
		partialData: "Dati energetici parziali",
		noData: "Nessun dato energetico"
	},
	editor: {
		entity: "Entità V2C principale",
		name: "Nome",
		location: "Posizione",
		language: "Lingua",
		theme: "Tema",
		displayMode: "Dimensione scheda",
		themeAuto: "Sistema / Home Assistant",
		themeLight: "Chiaro",
		themeDark: "Scuro",
		modeStandard: "Standard",
		modeCompact: "Compatto",
		modeUltra: "Ultra compatto",
		showEnergyFlow: "Flusso di energia",
		showControls: "Controlli di ricarica",
		showAdvanced: "Controlli avanzati",
		showCharger: "Illustrazione Trydan"
	}
}), Ve = V({
	states: {
		disconnected: "Kein Fahrzeug",
		unavailable: "Nicht verfügbar",
		charging: "Laden",
		complete: "Ladevorgang abgeschlossen",
		timer: "Geplantes Laden",
		updating: "Aktualisierung",
		control_pilot: "Control-Pilot-Fehler",
		load_balancing: "Lastverteilungsfehler",
		error: "Ladegerätfehler",
		waiting_power: "Fahrzeug verbunden",
		wifi_connected: "WLAN verbunden",
		wifi_connecting: "WLAN wird verbunden"
	},
	details: {
		disconnected: "Trydan bereit",
		unavailable: "Hauptentität prüfen",
		charging: "Energie fließt zum Fahrzeug",
		complete: "Fahrzeug kann getrennt werden",
		timer: "Timer ist aktiv",
		updating: "Ladegerät nicht trennen",
		control_pilot: "Fahrzeugkommunikation prüfen",
		load_balancing: "Lokale Lastverteilung prüfen",
		error: "Diagnose prüfen",
		waiting_power: "Warten auf Start oder Leistung",
		wifi_connected: "Verbindung wiederhergestellt",
		wifi_connecting: "Verbindungsversuch läuft"
	},
	badges: {
		paused: "Pausiert",
		locked: "Gesperrt",
		timer: "Timer",
		waiting_power: "Wartet auf Leistung"
	},
	labels: {
		now: "jetzt",
		session: "Sitzung",
		energy: "Energie",
		time: "Zeit",
		intensity: "Ladestrom",
		advanced: "Trydan-Einstellungen",
		chargingControls: "Laden",
		energyControls: "Dynamische Energie",
		lightControls: "Beleuchtung",
		unavailableEntity: "Entität nicht verfügbar",
		actionPending: "Änderung wird angewendet",
		actionDone: "Änderung bestätigt",
		actionFailed: "Änderung konnte nicht angewendet werden",
		additionalStatus: "Zusätzlicher Status",
		power: "Leistung",
		energyFlow: "Energiefluss",
		voltage: "Spannung",
		diagnostics: "Diagnose",
		configuration: "Konfiguration"
	},
	actions: {
		pause: "Pausieren",
		resume: "Fortsetzen",
		lock: "EVSE sperren",
		unlock: "EVSE entsperren",
		timer: "Timer",
		dynamic: "Dynamische Regelung",
		pauseDynamic: "Dynamische Regelung pausieren",
		logoLed: "Logo-LED",
		lightLed: "Ladegerätlicht",
		chargeMode: "Lademodus",
		confirmLock: "V2C-Ladegerät sperren?"
	},
	flows: {
		solar: "Solar",
		grid: "Netz",
		home: "Haus",
		battery: "Batterie",
		charger: "Auto",
		import: "Bezug",
		export: "Einspeisung",
		charge: "Lädt",
		discharge: "Entlädt",
		consume: "Verbrauch",
		produce: "Erzeugung",
		idle: "Leerlauf",
		unknown: "Keine Daten",
		activeFlow: "Aktiver Energiefluss",
		noFlow: "Kein Energiefluss",
		partialData: "Teilweise Energiedaten",
		noData: "Keine Energiedaten"
	},
	editor: {
		entity: "Haupt-V2C-Entität",
		name: "Name",
		location: "Standort",
		language: "Sprache",
		theme: "Design",
		displayMode: "Kartengröße",
		themeAuto: "System / Home Assistant",
		themeLight: "Hell",
		themeDark: "Dunkel",
		modeStandard: "Standard",
		modeCompact: "Kompakt",
		modeUltra: "Ultrakompakt",
		showEnergyFlow: "Energiefluss",
		showControls: "Ladesteuerung",
		showAdvanced: "Erweiterte Steuerung",
		showCharger: "Trydan-Abbildung"
	}
}), He = V({
	states: {
		disconnected: "Aucun véhicule",
		unavailable: "Indisponible",
		charging: "En charge",
		complete: "Charge terminée",
		timer: "Charge programmée",
		updating: "Mise à jour",
		control_pilot: "Erreur Control Pilot",
		load_balancing: "Erreur d'équilibrage de charge",
		error: "Erreur du chargeur",
		waiting_power: "Véhicule connecté",
		wifi_connected: "Wi-Fi connecté",
		wifi_connecting: "Connexion Wi-Fi"
	},
	details: {
		disconnected: "Trydan prêt",
		unavailable: "Vérifiez l'entité principale",
		charging: "Énergie vers le véhicule",
		complete: "Vous pouvez débrancher le véhicule",
		timer: "Le minuteur est actif",
		updating: "Ne débranchez pas le chargeur",
		control_pilot: "Vérifiez la communication avec le véhicule",
		load_balancing: "Vérifiez l'équilibrage local",
		error: "Vérifiez le diagnostic",
		waiting_power: "En attente du démarrage ou de puissance",
		wifi_connected: "Connexion rétablie",
		wifi_connecting: "Tentative de connexion"
	},
	badges: {
		paused: "En pause",
		locked: "Verrouillé",
		timer: "Minuteur",
		waiting_power: "En attente de puissance"
	},
	labels: {
		now: "maintenant",
		session: "Session",
		energy: "Énergie",
		time: "Temps",
		intensity: "Courant de charge",
		advanced: "Réglages Trydan",
		chargingControls: "Charge",
		energyControls: "Énergie dynamique",
		lightControls: "Éclairage",
		unavailableEntity: "Entité indisponible",
		actionPending: "Modification en cours",
		actionDone: "Modification confirmée",
		actionFailed: "Impossible d'appliquer la modification",
		additionalStatus: "État supplémentaire",
		power: "Puissance",
		energyFlow: "Flux d'énergie",
		voltage: "Tension",
		diagnostics: "Diagnostic",
		configuration: "Configuration"
	},
	actions: {
		pause: "Mettre en pause",
		resume: "Reprendre",
		lock: "Verrouiller l'EVSE",
		unlock: "Déverrouiller l'EVSE",
		timer: "Minuteur",
		dynamic: "Modulation dynamique",
		pauseDynamic: "Suspendre le contrôle dynamique",
		logoLed: "LED du logo",
		lightLed: "Éclairage du chargeur",
		chargeMode: "Mode de charge",
		confirmLock: "Verrouiller le chargeur V2C ?"
	},
	flows: {
		solar: "Solaire",
		grid: "Réseau",
		home: "Maison",
		battery: "Batterie",
		charger: "Voiture",
		import: "Importation",
		export: "Exportation",
		charge: "Charge",
		discharge: "Décharge",
		consume: "Consommation",
		produce: "Production",
		idle: "Au repos",
		unknown: "Aucune donnée",
		activeFlow: "Flux d'énergie actif",
		noFlow: "Aucun flux d'énergie",
		partialData: "Données énergétiques partielles",
		noData: "Aucune donnée énergétique"
	},
	editor: {
		entity: "Entité V2C principale",
		name: "Nom",
		location: "Emplacement",
		language: "Langue",
		theme: "Thème",
		displayMode: "Taille de la carte",
		themeAuto: "Système / Home Assistant",
		themeLight: "Clair",
		themeDark: "Sombre",
		modeStandard: "Standard",
		modeCompact: "Compact",
		modeUltra: "Ultra compact",
		showEnergyFlow: "Flux d'énergie",
		showControls: "Commandes de charge",
		showAdvanced: "Commandes avancées",
		showCharger: "Illustration Trydan"
	}
}), Ue = V({
	states: {
		disconnected: "Geen voertuig",
		unavailable: "Niet beschikbaar",
		charging: "Bezig met laden",
		complete: "Laden voltooid",
		timer: "Gepland laden",
		updating: "Bijwerken",
		control_pilot: "Control Pilot-fout",
		load_balancing: "Load Balancing-fout",
		error: "Laderfout",
		waiting_power: "Voertuig verbonden",
		wifi_connected: "Wi-Fi verbonden",
		wifi_connecting: "Wi-Fi verbinden"
	},
	details: {
		disconnected: "Trydan gereed",
		unavailable: "Controleer de hoofdentiteit",
		charging: "Energie naar het voertuig",
		complete: "Je kunt het voertuig loskoppelen",
		timer: "De timer is actief",
		updating: "Koppel de lader niet los",
		control_pilot: "Controleer de voertuigcommunicatie",
		load_balancing: "Controleer lokale load balancing",
		error: "Controleer de diagnose",
		waiting_power: "Wachten op start of vermogen",
		wifi_connected: "Verbinding hersteld",
		wifi_connecting: "Verbinding wordt geprobeerd"
	},
	badges: {
		paused: "Gepauzeerd",
		locked: "Vergrendeld",
		timer: "Timer",
		waiting_power: "Wacht op vermogen"
	},
	labels: {
		now: "nu",
		session: "Sessie",
		energy: "Energie",
		time: "Tijd",
		intensity: "Laadstroom",
		advanced: "Trydan-instellingen",
		chargingControls: "Laden",
		energyControls: "Dynamische energie",
		lightControls: "Verlichting",
		unavailableEntity: "Entiteit niet beschikbaar",
		actionPending: "Wijziging toepassen",
		actionDone: "Wijziging bevestigd",
		actionFailed: "Wijziging kon niet worden toegepast",
		additionalStatus: "Aanvullende status",
		power: "Vermogen",
		energyFlow: "Energiestroom",
		voltage: "Spanning",
		diagnostics: "Diagnostiek",
		configuration: "Configuratie"
	},
	actions: {
		pause: "Pauzeren",
		resume: "Hervatten",
		lock: "EVSE vergrendelen",
		unlock: "EVSE ontgrendelen",
		timer: "Timer",
		dynamic: "Dynamische modulatie",
		pauseDynamic: "Dynamische regeling pauzeren",
		logoLed: "Logo-led",
		lightLed: "Laderverlichting",
		chargeMode: "Laadmodus",
		confirmLock: "V2C-lader vergrendelen?"
	},
	flows: {
		solar: "Zon",
		grid: "Net",
		home: "Huis",
		battery: "Batterij",
		charger: "Auto",
		import: "Import",
		export: "Export",
		charge: "Laden",
		discharge: "Ontladen",
		consume: "Verbruik",
		produce: "Productie",
		idle: "In rust",
		unknown: "Geen gegevens",
		activeFlow: "Actieve energiestroom",
		noFlow: "Geen energiestroom",
		partialData: "Gedeeltelijke energiegegevens",
		noData: "Geen energiegegevens"
	},
	editor: {
		entity: "Hoofd-V2C-entiteit",
		name: "Naam",
		location: "Locatie",
		language: "Taal",
		theme: "Thema",
		displayMode: "Kaartgrootte",
		themeAuto: "Systeem / Home Assistant",
		themeLight: "Licht",
		themeDark: "Donker",
		modeStandard: "Standaard",
		modeCompact: "Compact",
		modeUltra: "Ultracompact",
		showEnergyFlow: "Energiestroom",
		showControls: "Laadbediening",
		showAdvanced: "Geavanceerde bediening",
		showCharger: "Trydan-afbeelding"
	}
}), We = V({
	states: {
		disconnected: "Inget fordon",
		unavailable: "Inte tillgänglig",
		charging: "Laddar",
		complete: "Laddning klar",
		timer: "Schemalagd laddning",
		updating: "Uppdaterar",
		control_pilot: "Control Pilot-fel",
		load_balancing: "Lastbalanseringsfel",
		error: "Laddarfel",
		waiting_power: "Fordon anslutet",
		wifi_connected: "Wi-Fi anslutet",
		wifi_connecting: "Ansluter Wi-Fi"
	},
	details: {
		disconnected: "Trydan redo",
		unavailable: "Kontrollera huvudenheten",
		charging: "Energi till fordonet",
		complete: "Du kan koppla från fordonet",
		timer: "Timern är aktiv",
		updating: "Koppla inte från laddaren",
		control_pilot: "Kontrollera fordonskommunikationen",
		load_balancing: "Kontrollera lokal lastbalansering",
		error: "Kontrollera diagnostiken",
		waiting_power: "Väntar på start eller effekt",
		wifi_connected: "Anslutning återställd",
		wifi_connecting: "Försöker ansluta"
	},
	badges: {
		paused: "Pausad",
		locked: "Låst",
		timer: "Timer",
		waiting_power: "Väntar på effekt"
	},
	labels: {
		now: "nu",
		session: "Session",
		energy: "Energi",
		time: "Tid",
		intensity: "Laddström",
		advanced: "Trydan-inställningar",
		chargingControls: "Laddning",
		energyControls: "Dynamisk energi",
		lightControls: "Belysning",
		unavailableEntity: "Entiteten är inte tillgänglig",
		actionPending: "Tillämpar ändring",
		actionDone: "Ändring bekräftad",
		actionFailed: "Ändringen kunde inte tillämpas",
		additionalStatus: "Ytterligare status",
		power: "Effekt",
		energyFlow: "Energiflöde",
		voltage: "Spänning",
		diagnostics: "Diagnostik",
		configuration: "Konfiguration"
	},
	actions: {
		pause: "Pausa",
		resume: "Fortsätt",
		lock: "Lås EVSE",
		unlock: "Lås upp EVSE",
		timer: "Timer",
		dynamic: "Dynamisk modulering",
		pauseDynamic: "Pausa dynamisk styrning",
		logoLed: "Logotyp-LED",
		lightLed: "Laddarbelysning",
		chargeMode: "Laddningsläge",
		confirmLock: "Låsa V2C-laddaren?"
	},
	flows: {
		solar: "Sol",
		grid: "Elnät",
		home: "Hem",
		battery: "Batteri",
		charger: "Bil",
		import: "Import",
		export: "Export",
		charge: "Laddar",
		discharge: "Urladdning",
		consume: "Förbrukning",
		produce: "Produktion",
		idle: "Viloläge",
		unknown: "Ingen data",
		activeFlow: "Aktivt energiflöde",
		noFlow: "Inget energiflöde",
		partialData: "Delvisa energidata",
		noData: "Inga energidata"
	},
	editor: {
		entity: "Primär V2C-entitet",
		name: "Namn",
		location: "Plats",
		language: "Språk",
		theme: "Tema",
		displayMode: "Kortstorlek",
		themeAuto: "System / Home Assistant",
		themeLight: "Ljust",
		themeDark: "Mörkt",
		modeStandard: "Standard",
		modeCompact: "Kompakt",
		modeUltra: "Ultrakompakt",
		showEnergyFlow: "Energiflöde",
		showControls: "Laddningskontroller",
		showAdvanced: "Avancerade kontroller",
		showCharger: "Trydan-illustration"
	}
}), Ge = V({
	states: {
		disconnected: "Intet køretøj",
		unavailable: "Ikke tilgængelig",
		charging: "Oplader",
		complete: "Opladning fuldført",
		timer: "Planlagt opladning",
		updating: "Opdaterer",
		control_pilot: "Control Pilot-fejl",
		load_balancing: "Belastningsbalanceringsfejl",
		error: "Opladerfejl",
		waiting_power: "Køretøj tilsluttet",
		wifi_connected: "Wi-Fi tilsluttet",
		wifi_connecting: "Tilslutter Wi-Fi"
	},
	details: {
		disconnected: "Trydan klar",
		unavailable: "Kontrollér hovedenheden",
		charging: "Energi til køretøjet",
		complete: "Du kan frakoble køretøjet",
		timer: "Timeren er aktiv",
		updating: "Frakobl ikke opladeren",
		control_pilot: "Kontrollér kommunikationen med køretøjet",
		load_balancing: "Kontrollér lokal belastningsbalancering",
		error: "Kontrollér diagnosticeringen",
		waiting_power: "Venter på start eller effekt",
		wifi_connected: "Forbindelse genoprettet",
		wifi_connecting: "Forsøger at oprette forbindelse"
	},
	badges: {
		paused: "Sat på pause",
		locked: "Låst",
		timer: "Timer",
		waiting_power: "Venter på effekt"
	},
	labels: {
		now: "nu",
		session: "Session",
		energy: "Energi",
		time: "Tid",
		intensity: "Ladestrøm",
		advanced: "Trydan-indstillinger",
		chargingControls: "Opladning",
		energyControls: "Dynamisk energi",
		lightControls: "Belysning",
		unavailableEntity: "Enheden er ikke tilgængelig",
		actionPending: "Anvender ændring",
		actionDone: "Ændring bekræftet",
		actionFailed: "Ændringen kunne ikke anvendes",
		additionalStatus: "Ekstra status",
		power: "Effekt",
		energyFlow: "Energiflow",
		voltage: "Spænding",
		diagnostics: "Diagnostik",
		configuration: "Konfiguration"
	},
	actions: {
		pause: "Pause",
		resume: "Fortsæt",
		lock: "Lås EVSE",
		unlock: "Lås EVSE op",
		timer: "Timer",
		dynamic: "Dynamisk modulering",
		pauseDynamic: "Sæt dynamisk styring på pause",
		logoLed: "Logo-LED",
		lightLed: "Opladerlys",
		chargeMode: "Opladningstilstand",
		confirmLock: "Lås V2C-opladeren?"
	},
	flows: {
		solar: "Sol",
		grid: "Elnet",
		home: "Hjem",
		battery: "Batteri",
		charger: "Bil",
		import: "Import",
		export: "Eksport",
		charge: "Oplader",
		discharge: "Aflader",
		consume: "Forbrug",
		produce: "Produktion",
		idle: "Inaktiv",
		unknown: "Ingen data",
		activeFlow: "Aktivt energiflow",
		noFlow: "Intet energiflow",
		partialData: "Delvise energidata",
		noData: "Ingen energidata"
	},
	editor: {
		entity: "Primær V2C-enhed",
		name: "Navn",
		location: "Placering",
		language: "Sprog",
		theme: "Tema",
		displayMode: "Kortstørrelse",
		themeAuto: "System / Home Assistant",
		themeLight: "Lys",
		themeDark: "Mørk",
		modeStandard: "Standard",
		modeCompact: "Kompakt",
		modeUltra: "Ultrakompakt",
		showEnergyFlow: "Energiflow",
		showControls: "Opladningskontroller",
		showAdvanced: "Avancerede kontroller",
		showCharger: "Trydan-illustration"
	}
}), Ke = V({
	states: {
		disconnected: "Ingen bil",
		unavailable: "Ikke tilgjengelig",
		charging: "Lader",
		complete: "Lading fullført",
		timer: "Planlagt lading",
		updating: "Oppdaterer",
		control_pilot: "Control Pilot-feil",
		load_balancing: "Lastbalanseringsfeil",
		error: "Laderfeil",
		waiting_power: "Bil tilkoblet",
		wifi_connected: "Wi-Fi tilkoblet",
		wifi_connecting: "Kobler til Wi-Fi"
	},
	details: {
		disconnected: "Trydan klar",
		unavailable: "Kontroller hovedenheten",
		charging: "Energi til bilen",
		complete: "Du kan koble fra bilen",
		timer: "Timeren er aktiv",
		updating: "Ikke koble fra laderen",
		control_pilot: "Kontroller kommunikasjonen med bilen",
		load_balancing: "Kontroller lokal lastbalansering",
		error: "Kontroller diagnostikken",
		waiting_power: "Venter på start eller effekt",
		wifi_connected: "Tilkobling gjenopprettet",
		wifi_connecting: "Prøver å koble til"
	},
	badges: {
		paused: "Pauset",
		locked: "Låst",
		timer: "Timer",
		waiting_power: "Venter på effekt"
	},
	labels: {
		now: "nå",
		session: "Økt",
		energy: "Energi",
		time: "Tid",
		intensity: "Ladestrøm",
		advanced: "Trydan-innstillinger",
		chargingControls: "Lading",
		energyControls: "Dynamisk energi",
		lightControls: "Belysning",
		unavailableEntity: "Enheten er ikke tilgjengelig",
		actionPending: "Bruker endring",
		actionDone: "Endring bekreftet",
		actionFailed: "Kunne ikke bruke endringen",
		additionalStatus: "Ekstra status",
		power: "Effekt",
		energyFlow: "Energiflyt",
		voltage: "Spenning",
		diagnostics: "Diagnostikk",
		configuration: "Konfigurasjon"
	},
	actions: {
		pause: "Pause",
		resume: "Fortsett",
		lock: "Lås EVSE",
		unlock: "Lås opp EVSE",
		timer: "Timer",
		dynamic: "Dynamisk modulering",
		pauseDynamic: "Sett dynamisk styring på pause",
		logoLed: "Logo-LED",
		lightLed: "Laderlys",
		chargeMode: "Lademodus",
		confirmLock: "Låse V2C-laderen?"
	},
	flows: {
		solar: "Sol",
		grid: "Strømnett",
		home: "Hjem",
		battery: "Batteri",
		charger: "Bil",
		import: "Import",
		export: "Eksport",
		charge: "Lader",
		discharge: "Lader ut",
		consume: "Forbruk",
		produce: "Produksjon",
		idle: "Inaktiv",
		unknown: "Ingen data",
		activeFlow: "Aktiv energiflyt",
		noFlow: "Ingen energiflyt",
		partialData: "Delvise energidata",
		noData: "Ingen energidata"
	},
	editor: {
		entity: "Primær V2C-enhet",
		name: "Navn",
		location: "Plassering",
		language: "Språk",
		theme: "Tema",
		displayMode: "Kortstørrelse",
		themeAuto: "System / Home Assistant",
		themeLight: "Lys",
		themeDark: "Mørk",
		modeStandard: "Standard",
		modeCompact: "Kompakt",
		modeUltra: "Ultrakompakt",
		showEnergyFlow: "Energiflyt",
		showControls: "Ladekontroller",
		showAdvanced: "Avanserte kontroller",
		showCharger: "Trydan-illustrasjon"
	}
}), qe = V({
	states: {
		disconnected: "Niciun vehicul",
		unavailable: "Indisponibil",
		charging: "Se încarcă",
		complete: "Încărcare finalizată",
		timer: "Încărcare programată",
		updating: "Se actualizează",
		control_pilot: "Eroare Control Pilot",
		load_balancing: "Eroare de echilibrare a sarcinii",
		error: "Eroare încărcător",
		waiting_power: "Vehicul conectat",
		wifi_connected: "Wi-Fi conectat",
		wifi_connecting: "Conectare Wi-Fi"
	},
	details: {
		disconnected: "Trydan pregătit",
		unavailable: "Verifică entitatea principală",
		charging: "Energie către vehicul",
		complete: "Poți deconecta vehiculul",
		timer: "Temporizatorul este activ",
		updating: "Nu deconecta încărcătorul",
		control_pilot: "Verifică comunicarea cu vehiculul",
		load_balancing: "Verifică echilibrarea locală",
		error: "Verifică diagnosticul",
		waiting_power: "Se așteaptă pornirea sau puterea",
		wifi_connected: "Conexiune restabilită",
		wifi_connecting: "Se încearcă conectarea"
	},
	badges: {
		paused: "În pauză",
		locked: "Blocat",
		timer: "Temporizator",
		waiting_power: "Așteaptă putere"
	},
	labels: {
		now: "acum",
		session: "Sesiune",
		energy: "Energie",
		time: "Timp",
		intensity: "Curent de încărcare",
		advanced: "Setări Trydan",
		chargingControls: "Încărcare",
		energyControls: "Energie dinamică",
		lightControls: "Iluminare",
		unavailableEntity: "Entitate indisponibilă",
		actionPending: "Se aplică modificarea",
		actionDone: "Modificare confirmată",
		actionFailed: "Modificarea nu a putut fi aplicată",
		additionalStatus: "Stare suplimentară",
		power: "Putere",
		energyFlow: "Flux de energie",
		voltage: "Tensiune",
		diagnostics: "Diagnostic",
		configuration: "Configurare"
	},
	actions: {
		pause: "Pauză",
		resume: "Continuă",
		lock: "Blochează EVSE",
		unlock: "Deblochează EVSE",
		timer: "Temporizator",
		dynamic: "Modulare dinamică",
		pauseDynamic: "Întrerupe controlul dinamic",
		logoLed: "LED siglă",
		lightLed: "Lumină încărcător",
		chargeMode: "Mod de încărcare",
		confirmLock: "Blochezi încărcătorul V2C?"
	},
	flows: {
		solar: "Solar",
		grid: "Rețea",
		home: "Casă",
		battery: "Baterie",
		charger: "Mașină",
		import: "Import",
		export: "Export",
		charge: "Încărcare",
		discharge: "Descărcare",
		consume: "Consum",
		produce: "Producție",
		idle: "Repaus",
		unknown: "Fără date",
		activeFlow: "Flux de energie activ",
		noFlow: "Fără flux de energie",
		partialData: "Date energetice parțiale",
		noData: "Fără date energetice"
	},
	editor: {
		entity: "Entitate V2C principală",
		name: "Nume",
		location: "Locație",
		language: "Limbă",
		theme: "Temă",
		displayMode: "Dimensiunea cardului",
		themeAuto: "Sistem / Home Assistant",
		themeLight: "Luminos",
		themeDark: "Întunecat",
		modeStandard: "Standard",
		modeCompact: "Compact",
		modeUltra: "Ultracompact",
		showEnergyFlow: "Flux de energie",
		showControls: "Comenzi de încărcare",
		showAdvanced: "Comenzi avansate",
		showCharger: "Ilustrație Trydan"
	}
}), Je = {
	states: {
		disconnected: "Sin vehículo",
		unavailable: "No disponible",
		charging: "Cargando",
		complete: "Carga completa",
		timer: "Carga programada",
		updating: "Actualizando",
		control_pilot: "Error Control Pilot",
		load_balancing: "Error Load Balancing",
		error: "Error del cargador",
		waiting_power: "Vehículo conectado",
		wifi_connected: "Wi-Fi conectado",
		wifi_connecting: "Conectando Wi-Fi"
	},
	details: {
		disconnected: "Trydan preparado",
		unavailable: "Revisa la entidad principal",
		charging: "Energía hacia el vehículo",
		complete: "Puedes desconectar el vehículo",
		timer: "El temporizador está activo",
		updating: "No desconectes el cargador",
		control_pilot: "Revisa la comunicación con el vehículo",
		load_balancing: "Revisa el balanceo local",
		error: "Revisa el diagnóstico",
		waiting_power: "Esperando inicio o potencia",
		wifi_connected: "Conexión restablecida",
		wifi_connecting: "Intentando conectar"
	},
	badges: {
		paused: "Pausada",
		locked: "Bloqueado",
		timer: "Temporizador",
		waiting_power: "Esperando potencia"
	},
	labels: {
		brand: "V2C · TRYDAN",
		now: "ahora",
		session: "Sesión",
		power: "Potencia",
		energy: "Energía",
		time: "Tiempo",
		intensity: "Intensidad de carga",
		advanced: "Ajustes Trydan",
		chargingControls: "Carga",
		energyControls: "Energía dinámica",
		lightControls: "Iluminación",
		unavailableEntity: "Entidad no disponible",
		actionPending: "Aplicando cambio",
		actionDone: "Cambio confirmado",
		actionFailed: "No se pudo aplicar el cambio",
		additionalStatus: "Estado adicional",
		energyFlow: "Flujo energético",
		voltage: "Voltaje",
		diagnostics: "Diagnóstico",
		configuration: "Configuración"
	},
	actions: {
		pause: "Pausar",
		resume: "Reanudar",
		lock: "Bloquear EVSE",
		unlock: "Desbloquear EVSE",
		timer: "Temporizador",
		dynamic: "Modulación dinámica",
		pauseDynamic: "Pausar control dinámico",
		logoLed: "Logo LED",
		lightLed: "Luz del cargador",
		chargeMode: "Modo de carga",
		confirmLock: "¿Bloquear el cargador V2C?"
	},
	flows: {
		solar: "Solar",
		grid: "Red",
		home: "Casa",
		battery: "Batería",
		charger: "Coche",
		import: "Importa",
		export: "Exporta",
		charge: "Carga",
		discharge: "Descarga",
		consume: "Consume",
		produce: "Produce",
		idle: "En reposo",
		unknown: "Sin datos",
		activeFlow: "Flujo energético activo",
		noFlow: "Sin flujo energético",
		partialData: "Datos energéticos parciales",
		noData: "Sin datos energéticos"
	},
	editor: {
		title: "V2C Trydan Card",
		entity: "Entidad V2C principal",
		name: "Nombre",
		location: "Ubicación",
		statusEntity: "Estado visual opcional",
		gridPower: "Potencia de red",
		solarPower: "Potencia solar",
		batteryPower: "Potencia de batería",
		voltage: "Voltaje",
		language: "Idioma",
		theme: "Tema",
		displayMode: "Tamaño de tarjeta",
		themeAuto: "Sistema / Home Assistant",
		themeLight: "Claro",
		themeDark: "Oscuro",
		modeStandard: "Estándar",
		modeCompact: "Compacto",
		modeUltra: "Ultracompacto",
		showEnergyFlow: "Flujo de energía",
		showControls: "Controles de carga",
		showAdvanced: "Controles avanzados",
		showCharger: "Ilustración Trydan"
	}
}, Ye = [
	"en",
	"it",
	"de",
	"fr",
	"nl",
	"sv",
	"da",
	"no",
	"ro",
	"es"
], Xe = {
	en: ze,
	it: Be,
	de: Ve,
	fr: He,
	nl: Ue,
	sv: We,
	da: Ge,
	no: Ke,
	ro: qe,
	es: Je
};
function H(e) {
	let t = e?.toLowerCase().split(/[-_]/)[0] ?? "en", n = t === "nb" || t === "nn" ? "no" : t;
	return Ye.includes(n) ? n : "en";
}
function U(e) {
	return Xe[H(e)];
}
function W(e, t) {
	let n = t.split(".").reduce((e, t) => {
		if (!(typeof e != "object" || !e)) return e[t];
	}, e);
	return typeof n == "string" ? n : t;
}
//#endregion
//#region src/services/actions.ts
async function Ze(e, t, n) {
	return e.callService("number", "set_value", {
		entity_id: t,
		value: n
	});
}
async function Qe(e, t, n) {
	return e.callService("switch", n ? "turn_on" : "turn_off", { entity_id: t });
}
async function $e(e, t, n) {
	return e.callService("select", "select_option", {
		entity_id: t,
		option: n
	});
}
async function et(e, t, n, r) {
	let i = { entity_id: t };
	return n && r !== void 0 && (i.brightness = r), e.callService("light", n ? "turn_on" : "turn_off", i);
}
//#endregion
//#region src/models/types.ts
var tt = [
	"connected",
	"charging",
	"ready",
	"charge_power",
	"charge_energy",
	"charge_time",
	"house_power",
	"fv_power",
	"battery_power",
	"grid_power",
	"voltage",
	"intensity",
	"min_intensity",
	"max_intensity",
	"meter_error",
	"paused",
	"locked",
	"timer",
	"dynamic",
	"pause_dynamic",
	"logo_led",
	"light_led",
	"charge_mode"
], nt = [
	"disconnected",
	"charging",
	"complete",
	"timer",
	"updating",
	"control_pilot",
	"load_balancing",
	"error",
	"waiting_power",
	"wifi_connected",
	"wifi_connecting"
], rt = {
	connected: "connected",
	charging: "charging",
	ready: "ready",
	charge_power: "charge_power",
	charge_energy: "charge_energy",
	charge_time: "charge_time",
	house_power: "house_power",
	fv_power: "fv_power",
	battery_power: "battery_power",
	voltage_installation: "voltage",
	intensity: "intensity",
	min_intensity: "min_intensity",
	max_intensity: "max_intensity",
	meter_error: "meter_error",
	paused: "paused",
	locked: "locked",
	timer: "timer",
	dynamic: "dynamic",
	pause_dynamic: "pause_dynamic",
	logo_led: "logo_led",
	light_led: "light_led",
	charge_mode: "charge_mode"
}, it = {
	connected: ["_connected", "_conectado"],
	charging: ["_charging", "_cargando"],
	ready: ["_ready", "_listo"],
	charge_power: ["_charge_power", "_potencia_de_carga"],
	charge_energy: ["_charge_energy", "_energia_de_carga"],
	charge_time: ["_charge_time", "_tiempo_de_carga"],
	house_power: ["_house_power", "_energia_de_la_casa"],
	fv_power: [
		"_fv_power",
		"_energia_fotovoltaica",
		"_sun_power"
	],
	battery_power: ["_battery_power", "_energia_de_la_bateria"],
	grid_power: ["_grid_power", "_potencia_de_red"],
	voltage: ["_voltage", "_tension_de_instalacion"],
	intensity: ["_intensity", "_intensidad"],
	min_intensity: ["_min_intensity", "_intensidad_minima"],
	max_intensity: ["_max_intensity", "_intensidad_maxima"],
	meter_error: ["_meter_error", "_error_del_medidor"],
	paused: ["_paused", "_pausar_sesion"],
	locked: ["_locked", "_bloquear_evse"],
	timer: ["_timer", "_temporizador_de_punto_de_recarga"],
	dynamic: ["_dynamic", "_modulacion_de_intensidad_dinamica"],
	pause_dynamic: ["_pause_dynamic", "_pausar_la_modulacion_de_control_dinamico"],
	logo_led: ["_logo_led"],
	light_led: ["_light_led", "_luz_led"],
	charge_mode: ["_charge_mode", "_modo_de_carga"]
};
function at(e, t) {
	return it[t]?.some((t) => e.endsWith(t)) ?? !1;
}
function ot(e, t) {
	if (t.length === 1) return t[0];
	if (e === "voltage") {
		let e = t.filter((e) => e.startsWith("sensor."));
		if (e.length === 1) return e[0];
	}
}
function st(e, t, n = {}) {
	let r = { ...n }, i = {}, a = e.find((e) => e.entity_id === t), o = a?.device_id ?? void 0, s = o ? e.filter((e) => e.device_id === o && e.disabled_by == null) : e.filter((e) => e.disabled_by == null);
	for (let e of tt) {
		if (r[e]) continue;
		let t = s.filter((t) => rt[t.translation_key ?? ""] === e).map((e) => e.entity_id), n = ot(e, t);
		if (n) {
			r[e] = n;
			continue;
		}
		if (t.length > 1) {
			i[e] = t;
			continue;
		}
		let a = s.filter((t) => at(t.entity_id, e)).map((e) => e.entity_id), o = ot(e, a);
		o ? r[e] = o : a.length > 1 && (i[e] = a);
	}
	if (a?.translation_key) {
		let e = rt[a.translation_key];
		e && !r[e] && (r[e] = t);
	}
	return {
		entities: r,
		ambiguities: i,
		missing: tt.filter((e) => !r[e]),
		deviceId: o
	};
}
var ct = class {
	#e = 0;
	#t = /* @__PURE__ */ new Map();
	invalidate() {
		this.#e += 1, this.#t.clear();
	}
	async discover(e, t, n = {}) {
		let r = ++this.#e, i = this.#t.get(t);
		return i || (i = Object.values(e.entities ?? {}), i.length === 0 && e.callWS && (i = await e.callWS({ type: "config/entity_registry/list" })), this.#t.set(t, i)), r === this.#e ? st(i, t, n) : null;
	}
};
//#endregion
//#region src/services/energy.ts
function lt(e) {
	if (!e || e.state === "unknown" || e.state === "unavailable") return null;
	let t = Number(e.state);
	if (!Number.isFinite(t)) return null;
	let n = e.attributes.unit_of_measurement?.toLowerCase();
	return n === "kw" ? t * 1e3 : n === "mw" ? t * 1e6 : t;
}
function ut(e, t, n) {
	return Math.abs(t) < n ? "idle" : e === "grid" ? t > 0 ? "import" : "export" : e === "battery" ? t > 0 ? "discharge" : "charge" : e === "solar" ? t > 0 ? "produce" : "unknown" : t > 0 ? "consume" : "export";
}
function dt(e, t, n = {}) {
	let r = lt(t);
	if (r === null) return {
		role: e,
		watts: null,
		direction: "unknown",
		available: !1
	};
	let i = n.invert ? -r : r;
	return {
		role: e,
		watts: i,
		direction: ut(e, i, n.thresholdW ?? 50),
		available: !0
	};
}
//#endregion
//#region src/services/format.ts
function ft(e, t = "es") {
	if (e === null || !Number.isFinite(e)) return "—";
	let n = t === "en" ? "en-GB" : "es-ES", r = Math.abs(e);
	return r >= 1e3 ? `${new Intl.NumberFormat(n, { maximumFractionDigits: 1 }).format(r / 1e3)} kW` : `${new Intl.NumberFormat(n, { maximumFractionDigits: 0 }).format(r)} W`;
}
function pt(e, t = "es") {
	let n = Number(e);
	return Number.isFinite(n) ? `${new Intl.NumberFormat(t === "en" ? "en-GB" : "es-ES", { maximumFractionDigits: 2 }).format(n)} kWh` : "—";
}
function mt(e) {
	let t = Number(e);
	if (!Number.isFinite(t) || t < 0) return "—";
	let n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60);
	return `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
//#endregion
//#region src/services/state.ts
var ht = {
	sin_vehiculo: "disconnected",
	desconectado: "disconnected",
	cargando: "charging",
	carga_completa: "complete",
	completa: "complete",
	temporizador: "timer",
	carga_programada: "timer",
	actualizando: "updating",
	control_pilot: "control_pilot",
	error_control_pilot: "control_pilot",
	load_balancing: "load_balancing",
	error_load_balancing: "load_balancing",
	error: "error",
	esperando_potencia: "waiting_power",
	wifi_conectado: "wifi_connected",
	conectando_wifi: "wifi_connecting"
}, gt = {
	disconnected: "neutral",
	charging: "info",
	complete: "success",
	timer: "info",
	updating: "warning",
	control_pilot: "warning",
	load_balancing: "error",
	error: "error",
	waiting_power: "warning",
	wifi_connected: "success",
	wifi_connecting: "info"
};
function _t(e) {
	return e.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function vt(e) {
	if (!e) return;
	let t = _t(e);
	return nt.includes(t) ? t : ht[t];
}
function yt(e) {
	let t = vt(e.externalStatus), n = (e.connected === void 0 || e.connected === "unknown") && (e.charging === void 0 || e.charging === "unknown") ? e.ready === void 0 || e.ready === "unknown" : !1, r;
	r = e.charging === !0 ? "charging" : e.ready === !0 ? "complete" : e.connected === !0 ? "connected" : n || e.seedAvailable === !1 ? "unavailable" : "disconnected";
	let i = [];
	e.paused === !0 && i.push("paused"), e.locked === !0 && i.push("locked"), e.timer === !0 && i.push("timer");
	let a = "normal", o = "none", s = "normal";
	t === "wifi_connecting" && (a = "wifi_connecting"), t === "wifi_connected" && (a = "wifi_connected"), t === "updating" && (s = "updating"), t === "control_pilot" && (o = "control_pilot"), t === "load_balancing" && (o = "load_balancing"), t === "error" && (o = "generic");
	let c = e.meterError?.trim().toLowerCase(), l = !!(c && c !== "no_error");
	return e.dynamic === !0 && l && (c === "waiting_wifi" ? a = "wifi_connecting" : o = "meter"), {
		phase: r,
		inhibitors: i,
		connectivity: a,
		fault: o,
		maintenance: s,
		externalStatus: t,
		diagnostic: l ? c : void 0
	};
}
function G(e, t, n = !1) {
	return {
		key: e,
		labelKey: n ? "states.unavailable" : `states.${e}`,
		detailKey: n ? "details.unavailable" : `details.${e}`,
		severity: gt[e],
		badges: t.inhibitors,
		diagnostic: t.diagnostic,
		unavailable: n
	};
}
function bt(e) {
	return e.externalStatus ? G(e.externalStatus, e) : e.fault === "control_pilot" ? G("control_pilot", e) : e.fault === "load_balancing" ? G("load_balancing", e) : e.fault === "meter" || e.fault === "generic" ? G("error", e) : e.maintenance === "updating" ? G("updating", e) : e.phase === "charging" ? G("charging", e) : e.phase === "complete" ? G("complete", e) : e.inhibitors.includes("timer") ? G("timer", e) : e.connectivity === "wifi_connecting" ? G("wifi_connecting", e) : e.connectivity === "wifi_connected" ? G("wifi_connected", e) : e.phase === "connected" || e.inhibitors.includes("paused") ? G("waiting_power", e) : G("disconnected", e, e.phase === "unavailable");
}
function K(e) {
	return e === "on" || e === "true" ? !0 : e === "off" || e === "false" ? !1 : "unknown";
}
//#endregion
//#region src/card/advanced-controls.ts
var xt = [
	{
		role: "locked",
		label: "actions.lock"
	},
	{
		role: "timer",
		label: "actions.timer"
	},
	{
		role: "dynamic",
		label: "actions.dynamic"
	},
	{
		role: "pause_dynamic",
		label: "actions.pauseDynamic"
	}
];
function q(e) {
	return !!(e && e.state !== "unknown" && e.state !== "unavailable");
}
function J(e, t, n) {
	let r = e.entities[t];
	if (!r) return k;
	let i = e.hass.states[r], a = i?.state === "on";
	return D`
    <div class="toggle-row">
      <span>${t === "locked" && a ? W(e.dictionary, "actions.unlock") : W(e.dictionary, n)}</span>
      <button
        data-role=${t}
        role="switch"
        aria-checked=${String(a)}
        aria-pressed=${String(a)}
        aria-busy=${String(e.pending.includes(t))}
        ?disabled=${!q(i) || e.pending.includes(t)}
        @click=${() => e.onToggle(t)}
      >${a ? "ON" : "OFF"}</button>
    </div>
  `;
}
function St(e) {
	let t = xt.map(({ role: t, label: n }) => J(e, t, n)), n = e.entities.charge_mode, r = n ? e.hass.states[n] : void 0, i = e.entities.logo_led, a = i ? e.hass.states[i] : void 0, o = e.entities.light_led, s = !!(e.voltage || e.diagnostic || e.ambiguityRoles?.length);
	return !t.some((e) => e !== k) && !n && !i && !o && !s ? k : D`
    <details>
      <summary>${W(e.dictionary, "labels.advanced")}</summary>
      <div class="advanced-grid">
        ${t.slice(0, 2).some((e) => e !== k) || n ? D`
              <section class="control-group">
                <h3>${W(e.dictionary, "labels.chargingControls")}</h3>
                ${t.slice(0, 2)}
                ${n ? D`
                      <label class="select-row">
                        <span>${W(e.dictionary, "actions.chargeMode")}</span>
                        <select
                          data-role="charge_mode"
                          .value=${r?.state ?? ""}
                          ?disabled=${!q(r) || e.pending.includes("charge_mode")}
                          @change=${(t) => e.onSelect(t.target.value)}
                        >
                          ${(r?.attributes.options ?? []).map((e) => D`<option .value=${String(e)}>${String(e)}</option>`)}
                        </select>
                      </label>
                    ` : k}
              </section>
            ` : k}
        ${t.slice(2).some((e) => e !== k) ? D`
              <section class="control-group">
                <h3>${W(e.dictionary, "labels.energyControls")}</h3>
                ${t.slice(2)}
              </section>
            ` : k}
        ${i || o ? D`
              <section class="control-group">
                <h3>${W(e.dictionary, "labels.lightControls")}</h3>
                ${J(e, "logo_led", "actions.logoLed")}
                ${i && q(a) ? D`
                      <label class="range-head" for="v2c-logo-brightness">
                        <span>${W(e.dictionary, "actions.logoLed")}</span>
                        <output>${Math.round((Number(a?.attributes.brightness ?? 0) || 0) / 255 * 100)}%</output>
                      </label>
                      <input
                        id="v2c-logo-brightness"
                        type="range"
                        min="1"
                        max="255"
                        .value=${String(a?.attributes.brightness ?? 128)}
                        @change=${(t) => e.onBrightness(Number(t.target.value))}
                      />
                    ` : k}
                ${J(e, "light_led", "actions.lightLed")}
              </section>
            ` : k}
        ${s ? D`
              <section class="control-group">
                <h3>${W(e.dictionary, "labels.diagnostics")}</h3>
                <dl class="technical-list">
                  ${e.voltage ? D`
                        <div class="technical-row">
                          <dt>${W(e.dictionary, "labels.voltage")}</dt>
                          <dd>${e.voltage.state} ${e.voltage.attributes.unit_of_measurement ?? "V"}</dd>
                        </div>
                      ` : k}
                  ${e.diagnostic ? D`
                        <div class="technical-row" data-severity="error">
                          <dt>${W(e.dictionary, "labels.diagnostics")}</dt>
                          <dd>${e.diagnostic}</dd>
                        </div>
                      ` : k}
                  ${e.ambiguityRoles?.length ? D`
                        <div class="technical-row">
                          <dt>${W(e.dictionary, "labels.configuration")}</dt>
                          <dd>YAML · ${e.ambiguityRoles.join(", ")}</dd>
                        </div>
                      ` : k}
                </dl>
              </section>
            ` : k}
      </div>
    </details>
  `;
}
//#endregion
//#region src/card/energy-flow.ts
var Ct = {
	solar: "mdi:solar-power",
	grid: "mdi:transmission-tower",
	home: "mdi:home-lightning-bolt",
	battery: "mdi:home-battery",
	charger: "mdi:ev-station"
};
function wt(e, t, n) {
	if (e.length === 0) return k;
	let r = e.filter((e) => e.available), i = e.length - r.length, a = r.filter((e) => !["idle", "unknown"].includes(e.direction)), o = a.length > 0 ? "active" : r.length === 0 ? "unavailable" : i > 0 ? "partial" : "idle", s = `${W(t, o === "active" ? "flows.activeFlow" : o === "partial" ? "flows.partialData" : o === "unavailable" ? "flows.noData" : "flows.noFlow")}${o === "idle" ? " · 0 W" : ""}`;
	return D`
    <section class="energy-section" aria-label=${W(t, "labels.energyFlow")}>
      <div class="energy-summary" data-kind=${o}>
        <p class="energy-summary-title">
          <ha-icon icon="mdi:lightning-bolt-outline" aria-hidden="true"></ha-icon>
          <span>${s}</span>
        </p>
        ${a.length ? D`
              <div class="energy-nodes">
                ${a.map((e) => {
		let r = W(t, `flows.${e.role}`), i = W(t, `flows.${e.direction}`), a = ft(e.watts, n);
		return D`
                    <div class="flow-node" aria-label=${`${r}: ${a}, ${i}`}>
                      <span class="flow-name" aria-hidden="true"><ha-icon icon=${Ct[e.role]}></ha-icon></span>
                      <span class="flow-name-text">${r}</span>
                      <strong class="flow-value">${a}</strong>
                      <span class="flow-direction">${i}</span>
                    </div>
                  `;
	})}
              </div>
            ` : k}
        ${a.length && i ? D`<p class="energy-note">${W(t, "flows.partialData")}</p>` : k}
      </div>
    </section>
  `;
}
//#endregion
//#region src/card/session-controls.ts
function Y(e) {
	return !!(e && e.state !== "unknown" && e.state !== "unavailable");
}
function Tt(e) {
	let t = e.entities.intensity, n = e.entities.paused, r = t ? e.hass.states[t] : void 0, i = n ? e.hass.states[n] : void 0;
	if (!t && !n) return k;
	let a = Number(r?.attributes.min ?? 6), o = Number(r?.attributes.max ?? 32), s = Number(r?.attributes.step ?? 1), c = Number(r?.state), l = e.sliderValue ?? (Number.isFinite(c) ? c : a), u = e.presets.filter((e) => e >= a && e <= o), d = i?.state === "on";
	return D`
    <section class="session-controls" aria-label=${W(e.dictionary, "labels.chargingControls")}>
      ${t ? D`
            <div class="range-control">
              <label class="range-head" for="v2c-intensity">
                <span>${W(e.dictionary, "labels.intensity")}</span>
                <output>${Math.round(l)} A</output>
              </label>
              <input
                id="v2c-intensity"
                data-role="intensity"
                type="range"
                .min=${String(a)}
                .max=${String(o)}
                .step=${String(s)}
                .value=${String(l)}
                ?disabled=${!Y(r) || e.pending.includes("intensity")}
                aria-busy=${String(e.pending.includes("intensity"))}
                @input=${(t) => e.onSliderInput(Number(t.target.value))}
                @change=${(t) => e.onIntensity(Number(t.target.value))}
              />
              <div class="presets" aria-label=${W(e.dictionary, "labels.intensity")}>
                ${u.map((t) => D`
                    <button
                      class="preset"
                      aria-pressed=${String(Math.round(l) === t)}
                      ?disabled=${!Y(r) || e.pending.includes("intensity")}
                      @click=${() => e.onIntensity(t)}
                    >${t} A</button>
                  `)}
              </div>
            </div>
          ` : k}
      ${n ? D`
            <button
              class="primary-action"
              data-role="paused"
              aria-busy=${String(e.pending.includes("paused"))}
              ?disabled=${!Y(i) || e.pending.includes("paused")}
              title=${Y(i) ? "" : W(e.dictionary, "labels.unavailableEntity")}
              @click=${e.onPause}
            >
              ${W(e.dictionary, d ? "actions.resume" : "actions.pause")}
            </button>
          ` : k}
    </section>
  `;
}
//#endregion
//#region src/card/styles.ts
var Et = o`
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
    border-radius: var(--ha-card-border-radius, 20px);
  }

  .shell { padding: clamp(16px, 3cqw, 24px); }

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
    gap: 24px;
    align-items: center;
    margin-top: 12px;
  }

  .device-column {
    display: flex;
    min-width: 0;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .charger-stage {
    display: grid;
    width: clamp(180px, 55cqw, 230px);
    aspect-ratio: 360 / 500;
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
    margin-top: 10px;
    overflow-wrap: anywhere;
    color: var(--v2c-text);
    font-size: clamp(1.45rem, 6cqw, 2rem);
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

  .overview { min-width: 0; }

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
    .shell { padding: 14px; }
    .card-heading { align-items: flex-start; flex-direction: column; gap: 2px; }
    .location::before { content: ""; }
    .primary-metrics { gap: 6px; }
    .metric { padding: 9px 7px; }
    .session-controls { grid-template-columns: 1fr; align-items: stretch; }
    .primary-action { width: 100%; }
    .advanced-grid { grid-template-columns: 1fr; }
  }

  @container (min-width: 520px) {
    ha-card[data-mode="standard"] .hero {
      grid-template-columns: minmax(180px, 0.44fr) minmax(0, 0.56fr);
      gap: clamp(24px, 5cqw, 40px);
    }

    ha-card[data-mode="standard"] .charger-stage { width: clamp(190px, 34cqw, 250px); }
    ha-card[data-mode="standard"] .session-controls {
      grid-template-columns: minmax(0, 1fr) minmax(132px, auto);
      align-items: end;
    }
    ha-card[data-mode="standard"] .primary-action { width: auto; min-width: 132px; }
    .advanced-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  ha-card[data-mode="compact"] .shell { padding: 14px; }
  ha-card[data-mode="compact"] .hero { gap: 16px; margin-top: 8px; }
  ha-card[data-mode="compact"] .charger-stage { width: clamp(140px, 44cqw, 180px); }
  ha-card[data-mode="compact"] .charger-status { margin-top: 6px; font-size: clamp(1.25rem, 5cqw, 1.55rem); }
  ha-card[data-mode="compact"] .metric { padding: 9px; }
  ha-card[data-mode="compact"] .session-controls,
  ha-card[data-mode="compact"] .energy-section { margin-top: 10px; padding-top: 10px; }
  ha-card[data-mode="compact"] details { margin-top: 10px; }

  ha-card[data-mode="ultra_compact"] .shell { padding: 10px 12px; }
  ha-card[data-mode="ultra_compact"] .location { display: none; }
  ha-card[data-mode="ultra_compact"] h2 { font-size: 0.86rem; }
  ha-card[data-mode="ultra_compact"] .hero {
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
    margin-top: 8px;
    align-items: center;
  }
  ha-card[data-mode="ultra_compact"] .charger-stage { width: clamp(112px, 38cqw, 140px); }
  ha-card[data-mode="ultra_compact"] .charger-status { margin-top: 4px; font-size: clamp(1rem, 4.5cqw, 1.2rem); }
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
//#endregion
//#region \0@oxc-project+runtime@0.139.0/helpers/esm/decorate.js
function X(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/card/v2c-trydan-card.ts
var Z = class extends I {
	constructor(...e) {
		super(...e), this.resolvedEntities = {}, this.ambiguities = {}, this.pendingRoles = [], this.actionMessage = "", this.#e = new ct(), this.#t = /* @__PURE__ */ new Map(), this.#n = "";
	}
	static {
		this.styles = Et;
	}
	#e;
	#t;
	#n;
	static getConfigElement() {
		return document.createElement("v2c-trydan-card-editor");
	}
	static getStubConfig(e) {
		return Re(e);
	}
	setConfig(e) {
		let t = this.config?.entity;
		this.config = Le(e), this.resolvedEntities = { ...this.config.entities ?? {} }, this.sliderValue = void 0, this.#n = "", t && t !== this.config.entity && this.#e.invalidate();
	}
	getCardSize() {
		return this.config?.display_mode === "ultra_compact" ? 3 : this.config?.display_mode === "compact" ? this.config.show_advanced === !1 ? 4 : 5 : this.config?.show_advanced === !1 ? 5 : 7;
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		for (let e of this.#t.values()) e.timer && clearTimeout(e.timer);
		this.#t.clear();
	}
	updated(e) {
		(e.has("hass") || this.#n === "") && (this.#r(), this.#c());
	}
	async #r() {
		if (!this.hass || !this.config) return;
		let e = Object.keys(this.hass.entities ?? {}).length, t = `${this.config.entity}|${JSON.stringify(this.config.entities ?? {})}|${e}`;
		if (t === this.#n) return;
		this.#n = t;
		let n = await this.#e.discover(this.hass, this.config.entity, this.config.entities);
		!n || !this.isConnected || t !== this.#n || (this.resolvedEntities = n.entities, this.ambiguities = n.ambiguities);
	}
	#i(e) {
		let t = this.resolvedEntities[e];
		return t && this.hass ? this.hass.states[t] : void 0;
	}
	#a() {
		return H(this.config?.language ?? this.hass?.locale?.language ?? this.hass?.language);
	}
	#o(e, t) {
		this.#t.set(e, t), this.pendingRoles = [...this.#t.keys()];
	}
	#s(e, t) {
		let n = this.#t.get(e);
		n?.timer && clearTimeout(n.timer), this.#t.delete(e), this.pendingRoles = [...this.#t.keys()];
		let r = U(this.#a());
		this.actionMessage = W(r, t ? "labels.actionDone" : "labels.actionFailed");
	}
	#c() {
		if (this.hass) for (let [e, t] of this.#t) t.matches(this.hass.states[t.entityId]) && this.#s(e, !0);
	}
	async #l(e, t, n, r) {
		if (this.#t.has(e)) return;
		let i = U(this.#a());
		this.actionMessage = W(i, "labels.actionPending");
		let a = {
			entityId: t,
			matches: n
		};
		this.#o(e, a);
		try {
			if (await r(), n(this.hass?.states[t])) {
				this.#s(e, !0);
				return;
			}
			a.timer = setTimeout(() => this.#s(e, !1), 6e3);
		} catch {
			this.#s(e, !1);
		}
	}
	#u(e) {
		let t = this.resolvedEntities.intensity, n = t ? this.hass?.states[t] : void 0;
		if (!this.hass || !t || !n) return;
		let r = Number(n.attributes.min ?? 6), i = Number(n.attributes.max ?? 32), a = Number(n.attributes.step ?? 1), o = Math.min(i, Math.max(r, Math.round(e / a) * a));
		this.sliderValue = o, this.#l("intensity", t, (e) => Number(e?.state) === o, () => Ze(this.hass, t, o));
	}
	#d(e) {
		let t = this.resolvedEntities[e], n = t ? this.hass?.states[t] : void 0;
		if (!this.hass || !t || !n) return;
		let r = n.state !== "on";
		e === "locked" && r && this.config?.confirm_lock !== !1 && !window.confirm(W(U(this.#a()), "actions.confirmLock")) || this.#l(e, t, (e) => e?.state === (r ? "on" : "off"), () => Qe(this.hass, t, r));
	}
	#f(e) {
		let t = this.resolvedEntities.charge_mode;
		!this.hass || !t || this.#l("charge_mode", t, (t) => t?.state === e, () => $e(this.hass, t, e));
	}
	#p(e) {
		let t = this.resolvedEntities[e], n = t ? this.hass?.states[t] : void 0;
		if (!this.hass || !t || !n) return;
		let r = n.state !== "on";
		this.#l(e, t, (e) => e?.state === (r ? "on" : "off"), () => et(this.hass, t, r));
	}
	#m(e) {
		let t = this.resolvedEntities.logo_led;
		!this.hass || !t || this.#l("logo_led", t, (t) => Number(t?.attributes.brightness) === e, () => et(this.hass, t, !0, e));
	}
	render() {
		if (!this.config || !this.hass) return D`<ha-card><div class="empty">V2C Trydan Card · configuración pendiente</div></ha-card>`;
		let e = this.#a(), t = U(e), n = this.hass.states[this.config.entity], r = dt("charger", this.#i("charge_power"), { thresholdW: this.config.flow_threshold_w }), i = bt(yt({
			seedAvailable: !!(n && n.state !== "unknown" && n.state !== "unavailable"),
			connected: K(this.#i("connected")?.state),
			charging: K(this.#i("charging")?.state),
			ready: K(this.#i("ready")?.state),
			paused: K(this.#i("paused")?.state),
			locked: K(this.#i("locked")?.state),
			timer: K(this.#i("timer")?.state),
			dynamic: K(this.#i("dynamic")?.state),
			meterError: this.#i("meter_error")?.state,
			externalStatus: this.config.status_entity ? this.hass.states[this.config.status_entity]?.state : void 0,
			chargePowerW: r.watts
		})), a = this.config.name ?? "V2C Trydan", o = this.#i("charge_energy"), s = this.#i("charge_time"), c = [
			[
				"solar",
				"fv_power",
				this.config.invert_solar_power
			],
			[
				"grid",
				"grid_power",
				this.config.invert_grid_power
			],
			[
				"home",
				"house_power",
				!1
			],
			[
				"battery",
				"battery_power",
				this.config.invert_battery_power
			],
			[
				"charger",
				"charge_power",
				!1
			]
		].filter(([, e]) => !!this.resolvedEntities[e]).map(([e, t, n]) => dt(e, this.#i(t), {
			invert: n,
			thresholdW: this.config?.flow_threshold_w
		})), l = Object.keys(this.ambiguities), u = i.diagnostic && i.diagnostic !== "no_error" ? i.diagnostic.replaceAll("_", " ") : void 0;
		return D`
      <ha-card data-theme=${this.config.theme ?? "auto"} data-mode=${this.config.display_mode ?? "standard"}>
        <div class="shell">
          <header class="card-heading">
            <h2>${a}</h2>
            ${this.config.location ? D`<span class="location">${this.config.location}</span>` : k}
          </header>

          <section class="hero">
            <div class="device-column">
              ${this.config.show_charger ? D`
                    <div class="charger-stage">
                      <div class="charger-art" aria-hidden="true">${Pe(Fe[i.key])}</div>
                    </div>
                  ` : k}
              <div class="charger-status" data-severity=${i.severity} role="status">
                ${W(t, i.labelKey)}
              </div>
              ${i.badges.length ? D`
                    <div class="badges" aria-label=${W(t, "labels.additionalStatus")}>
                      ${i.badges.map((e) => D`<span class="badge">${W(t, `badges.${e}`)}</span>`)}
                    </div>
                  ` : k}
            </div>

            <div class="overview">
              <div class="primary-metrics">
                <div class="metric metric-power">
                  <span class="metric-label">${W(t, "labels.power")}</span>
                  <strong class="metric-value">${ft(r.watts, e)}</strong>
                </div>
                <div class="metric">
                  <span class="metric-label">${W(t, "labels.energy")}</span>
                  <strong class="metric-value">${pt(o?.state ?? null, e)}</strong>
                </div>
                <div class="metric">
                  <span class="metric-label">${W(t, "labels.time")}</span>
                  <strong class="metric-value">${mt(s?.state ?? null)}</strong>
                </div>
              </div>

              ${this.config.show_controls ? Tt({
			hass: this.hass,
			entities: this.resolvedEntities,
			dictionary: t,
			presets: this.config.current_presets ?? [],
			pending: this.pendingRoles,
			sliderValue: this.sliderValue,
			onSliderInput: (e) => this.sliderValue = e,
			onIntensity: (e) => this.#u(e),
			onPause: () => this.#d("paused")
		}) : k}
            </div>
          </section>

          ${this.config.show_energy_flow ? wt(c, t, e) : k}
          ${this.config.show_advanced ? St({
			hass: this.hass,
			entities: this.resolvedEntities,
			dictionary: t,
			pending: this.pendingRoles,
			voltage: this.#i("voltage"),
			diagnostic: u,
			ambiguityRoles: l,
			onToggle: (e) => e === "logo_led" || e === "light_led" ? this.#p(e) : this.#d(e),
			onSelect: (e) => this.#f(e),
			onBrightness: (e) => this.#m(e)
		}) : k}
          <p class="live-region" aria-live="polite">${this.actionMessage}</p>
        </div>
      </ha-card>
    `;
	}
};
X([L({ attribute: !1 })], Z.prototype, "hass", void 0), X([R()], Z.prototype, "config", void 0), X([R()], Z.prototype, "resolvedEntities", void 0), X([R()], Z.prototype, "ambiguities", void 0), X([R()], Z.prototype, "sliderValue", void 0), X([R()], Z.prototype, "pendingRoles", void 0), X([R()], Z.prototype, "actionMessage", void 0);
//#endregion
//#region src/editor/v2c-trydan-card-editor.ts
var Dt = {
	en: "English",
	it: "Italiano",
	de: "Deutsch",
	fr: "Français",
	nl: "Nederlands",
	sv: "Svenska",
	da: "Dansk",
	no: "Norsk",
	ro: "Română",
	es: "Español"
}, Ot = [
	["show_energy_flow", "editor.showEnergyFlow"],
	["show_controls", "editor.showControls"],
	["show_advanced", "editor.showAdvanced"],
	["show_charger", "editor.showCharger"]
], Q = class extends I {
	static {
		this.styles = o`
    :host { display: block; color: var(--primary-text-color); }
    .editor { display: grid; gap: 14px; padding: 8px 0; }
    h3 { margin: 0; font-size: 1rem; }
    label { display: grid; gap: 5px; color: var(--secondary-text-color); font-size: 0.8rem; }
    input, select {
      width: 100%; min-height: 40px; padding: 8px 10px; box-sizing: border-box;
      border: 1px solid var(--divider-color, #7775); border-radius: 8px;
      color: var(--primary-text-color); background: var(--card-background-color);
    }
    input:focus-visible, select:focus-visible { outline: 3px solid var(--primary-color, #0067d9); outline-offset: 2px; }
    .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .checks { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px 12px; }
    .checks label { display: flex; align-items: center; gap: 7px; min-height: 32px; }
    .checks input { width: auto; min-height: auto; accent-color: var(--primary-text-color, #202326); }
    .yaml-note {
      margin: 0; padding: 9px 11px; border-left: 3px solid var(--primary-text-color, #202326);
      color: var(--secondary-text-color); background: var(--secondary-background-color, #f4f5f6);
      font-size: 0.73rem; line-height: 1.4;
    }
    @media (max-width: 500px) { .grid, .checks { grid-template-columns: 1fr; } }
  `;
	}
	setConfig(e) {
		this.config = {
			...e,
			entities: { ...e.entities ?? {} }
		};
	}
	#e(e) {
		this.config = e, this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: e },
			bubbles: !0,
			composed: !0
		}));
	}
	#t(e, t) {
		if (!this.config) return;
		let n = { ...this.config };
		typeof t == "string" && t.trim() === "" && e !== "entity" ? delete n[e] : Object.assign(n, { [e]: t }), this.#e(n);
	}
	render() {
		if (!this.config) return k;
		let e = H(this.config.language ?? this.hass?.locale?.language ?? this.hass?.language), t = U(e), n = Object.keys(this.hass?.states ?? {});
		return D`
      <div class="editor">
        <h3>${W(t, "editor.title")}</h3>
        <label>
          <span>${W(t, "editor.entity")}</span>
          <input
            data-field="entity"
            list="v2c-entities"
            .value=${this.config.entity}
            @change=${(e) => this.#t("entity", e.target.value)}
          />
        </label>
        <div class="grid">
          ${["name", "location"].map((e) => D`
              <label>
                <span>${W(t, `editor.${e}`)}</span>
                <input
                  data-field=${e}
                  .value=${this.config?.[e] ?? ""}
                  @change=${(t) => this.#t(e, t.target.value)}
                />
              </label>
            `)}
          <label>
            <span>${W(t, "editor.language")}</span>
            <select
              data-field="language"
              .value=${this.config.language ?? e}
              @change=${(e) => this.#t("language", e.target.value)}
            >
              ${Ye.map((e) => D`<option .value=${e}>${Dt[e]}</option>`)}
            </select>
          </label>
          <label>
            <span>${W(t, "editor.theme")}</span>
            <select
              data-field="theme"
              .value=${this.config.theme ?? "auto"}
              @change=${(e) => this.#t("theme", e.target.value)}
            >
              <option value="auto">${W(t, "editor.themeAuto")}</option>
              <option value="light">${W(t, "editor.themeLight")}</option>
              <option value="dark">${W(t, "editor.themeDark")}</option>
            </select>
          </label>
          <label>
            <span>${W(t, "editor.displayMode")}</span>
            <select
              data-field="display_mode"
              .value=${this.config.display_mode ?? "standard"}
              @change=${(e) => this.#t("display_mode", e.target.value)}
            >
              <option value="standard">${W(t, "editor.modeStandard")}</option>
              <option value="compact">${W(t, "editor.modeCompact")}</option>
              <option value="ultra_compact">${W(t, "editor.modeUltra")}</option>
            </select>
          </label>
        </div>
        <div class="checks">
          ${Ot.map(([e, n]) => D`
              <label>
                <input
                  data-field=${e}
                  type="checkbox"
                  .checked=${this.config?.[e] !== !1}
                  @change=${(t) => this.#t(e, t.target.checked)}
                />
                ${W(t, n)}
              </label>
            `)}
        </div>
        <p class="yaml-note"><code>YAML | status_entity | entities | invert_*_power | current_presets | flow_threshold_w</code></p>
        <datalist id="v2c-entities">${n.map((e) => D`<option value=${e}></option>`)}</datalist>
      </div>
    `;
	}
};
X([L({ attribute: !1 })], Q.prototype, "hass", void 0), X([R()], Q.prototype, "config", void 0);
//#endregion
//#region src/index.ts
var $ = "v2c-trydan-card", kt = "v2c-trydan-card-editor";
customElements.get($) || customElements.define($, Z), customElements.get(kt) || customElements.define(kt, Q), window.customCards = window.customCards ?? [], window.customCards.some((e) => e.type === $) || window.customCards.push({
	type: $,
	name: "V2C Trydan Card",
	description: "Quiet Hardware V2C Trydan charger control and smart energy summary.",
	preview: !0
});
//#endregion
export { Z as V2cTrydanCard, Q as V2cTrydanCardEditor };
