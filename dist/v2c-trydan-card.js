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
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: ee } = Object, m = globalThis, h = m.trustedTypes, g = h ? h.emptyScript : "", te = m.reactiveElementPolyfillSupport, _ = (e, t) => e, v = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? g : null;
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
}, y = (e, t) => !l(e, t), ne = {
	attribute: !0,
	type: String,
	converter: v,
	reflect: !1,
	useDefault: !1,
	hasChanged: y
};
Symbol.metadata ??= Symbol("metadata"), m.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var b = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ne) {
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
		return this.elementProperties.get(e) ?? ne;
	}
	static _$Ei() {
		if (this.hasOwnProperty(_("elementProperties"))) return;
		let e = ee(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(_("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_("properties"))) {
			let e = this.properties, t = [...f(e), ...p(e)];
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
			let i = (n.converter?.toAttribute === void 0 ? v : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? v : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? y)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[_("elementProperties")] = /* @__PURE__ */ new Map(), b[_("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: b }), (m.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js
var x = globalThis, re = (e) => e, S = x.trustedTypes, ie = S ? S.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ae = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, oe = "?" + C, se = `<${oe}>`, w = document, T = () => w.createComment(""), E = (e) => e === null || typeof e != "object" && typeof e != "function", ce = Array.isArray, le = (e) => ce(e) || typeof e?.[Symbol.iterator] == "function", ue = "[ 	\n\f\r]", D = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, de = /-->/g, fe = />/g, O = RegExp(`>|${ue}(?:([^\\s"'>=/]+)(${ue}*=${ue}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), pe = /'/g, me = /"/g, he = /^(?:script|style|textarea|title)$/i, k = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), A = Symbol.for("lit-noChange"), j = Symbol.for("lit-nothing"), ge = /* @__PURE__ */ new WeakMap(), M = w.createTreeWalker(w, 129);
function _e(e, t) {
	if (!ce(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ie === void 0 ? t : ie.createHTML(t);
}
var ve = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = D;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === D ? c[1] === "!--" ? o = de : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = O) : (he.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = O) : o = fe : o === O ? c[0] === ">" ? (o = i ?? D, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? O : c[3] === "\"" ? me : pe) : o === me || o === pe ? o = O : o === de || o === fe ? o = D : (o = O, i = void 0);
		let d = o === O && e[t + 1].startsWith("/>") ? " " : "";
		a += o === D ? n + se : l >= 0 ? (r.push(s), n.slice(0, l) + ae + n.slice(l) + C + d) : n + C + (l === -2 ? t : d);
	}
	return [_e(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, ye = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = ve(t, n);
		if (this.el = e.createElement(l, r), M.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = M.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ae)) {
					let t = u[o++], n = i.getAttribute(e).split(C), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Se : r[1] === "?" ? Ce : r[1] === "@" ? we : P
					}), i.removeAttribute(e);
				} else e.startsWith(C) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (he.test(i.tagName)) {
					let e = i.textContent.split(C), t = e.length - 1;
					if (t > 0) {
						i.textContent = S ? S.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], T()), M.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], T());
					}
				}
			} else if (i.nodeType === 8) if (i.data === oe) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(C, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += C.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = w.createElement("template");
		return n.innerHTML = e, n;
	}
};
function N(e, t, n = e, r) {
	if (t === A) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = E(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = N(e, i._$AS(e, t.values), i, r)), t;
}
var be = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? w).importNode(t, !0);
		M.currentNode = r;
		let i = M.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new xe(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Te(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = M.nextNode(), a++);
		}
		return M.currentNode = w, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, xe = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = j, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = N(this, e, t), E(e) ? e === j || e == null || e === "" ? (this._$AH !== j && this._$AR(), this._$AH = j) : e !== this._$AH && e !== A && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? le(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== j && E(this._$AH) ? this._$AA.nextSibling.data = e : this.T(w.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ye.createElement(_e(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new be(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = ge.get(e.strings);
		return t === void 0 && ge.set(e.strings, t = new ye(e)), t;
	}
	k(t) {
		ce(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(T()), this.O(T()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = re(e).nextSibling;
			re(e).remove(), e = t;
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
		this.type = 1, this._$AH = j, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = j;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = N(this, e, t, 0), a = !E(e) || e !== this._$AH && e !== A, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = N(this, r[n + o], t, o), s === A && (s = this._$AH[o]), a ||= !E(s) || s !== this._$AH[o], s === j ? e = j : e !== j && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === j ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Se = class extends P {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === j ? void 0 : e;
	}
}, Ce = class extends P {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== j);
	}
}, we = class extends P {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = N(this, e, t, 0) ?? j) === A) return;
		let n = this._$AH, r = e === j && n !== j || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== j && (n === j || r);
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
		N(this, e);
	}
}, Ee = x.litHtmlPolyfillSupport;
Ee?.(ye, xe), (x.litHtmlVersions ??= []).push("3.3.3");
var De = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new xe(t.insertBefore(T(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, F = globalThis, I = class extends b {
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
		return A;
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
	converter: v,
	reflect: !1,
	hasChanged: y
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
}, Pe = class extends Ne {
	constructor(e) {
		if (super(e), this.it = j, e.type !== je.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
	}
	render(e) {
		if (e === j || e == null) return this._t = void 0, this.it = e;
		if (e === A) return e;
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
Pe.directiveName = "unsafeHTML", Pe.resultType = 1;
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/directives/unsafe-svg.js
var Fe = class extends Pe {};
Fe.directiveName = "unsafeSVG", Fe.resultType = 2;
var Ie = Me(Fe), Le = {
	disconnected: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#f4f6f8\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n</g>\n</svg>",
	charging: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"blink-current\" transform=\"translate(107 104) scale(.92)\" fill=\"#123cc9\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n</g>\n</svg>",
	complete: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#3fce6b\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n</g>\n</svg>",
	timer: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#43dbe7\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n</g>\n</svg>",
	updating: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#f050bd\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n</g>\n</svg>",
	control_pilot: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#ffd43b\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n</g>\n</svg>",
	load_balancing: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#ff9dd8\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n</g>\n</svg>",
	error: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#ef3340\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n</g>\n</svg>",
	waiting_power: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#f28c28\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n</g>\n</svg>",
	wifi_connected: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"blink-once\" transform=\"translate(107 104) scale(.92)\" fill=\"#3fce6b\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n</g>\n</svg>",
	wifi_connecting: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"blink-slow\" transform=\"translate(107 104) scale(.92)\" fill=\"#f4f6f8\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n</g>\n</svg>"
}, z = [
	6,
	10,
	13,
	16,
	20,
	25,
	32
], Re = [
	"xxl",
	"standard",
	"compact",
	"ultra_compact"
], ze = [
	"auto",
	"centered",
	"split",
	"inline"
], Be = [
	"power",
	"energy",
	"time"
], Ve = [
	"solar",
	"grid",
	"home",
	"battery",
	"charger"
], He = [
	"hero",
	"metrics",
	"controls",
	"energy",
	"advanced"
];
function B(e, t, n) {
	return typeof e == "string" && t.includes(e) ? e : n;
}
function Ue(e, t) {
	return [...new Set(Array.isArray(e) ? e.filter((e) => typeof e == "string" && t.includes(e)) : t)];
}
function We(e, t) {
	let n = Ue(e, t);
	return [...n, ...t.filter((e) => !n.includes(e))];
}
function Ge(e) {
	if (!e || typeof e != "object") throw Error("V2C Trydan Card: configuración no válida");
	if (!e.entity || typeof e.entity != "string") throw Error("V2C Trydan Card: debes indicar una entidad V2C principal");
	let t = Array.isArray(e.current_presets) ? e.current_presets : z, n = [...new Set(t)].map(Number).filter((e) => Number.isFinite(e) && e > 0).sort((e, t) => e - t), r = B(e.display_mode, Re, "standard"), i = typeof e.accent_color == "string" && /^#[0-9a-fA-F]{6}$/.test(e.accent_color) ? e.accent_color.toUpperCase() : void 0;
	return {
		...e,
		type: "custom:v2c-trydan-card",
		theme: B(e.theme, [
			"auto",
			"light",
			"dark"
		], "auto"),
		display_mode: r,
		language: e.language ?? "auto",
		layout: B(e.layout, ze, "auto"),
		color_scheme: e.color_scheme === "custom" && !i ? "monochrome" : B(e.color_scheme, [
			"monochrome",
			"v2c_blue",
			"teal",
			"green",
			"violet",
			"custom"
		], "monochrome"),
		accent_color: i,
		surface_style: B(e.surface_style, [
			"solid",
			"tinted",
			"transparent"
		], "solid"),
		hero_scale: Math.min(1.25, Math.max(.75, Number(e.hero_scale) || 1)),
		card_radius: Number.isFinite(e.card_radius) ? Math.min(40, Math.max(0, Number(e.card_radius))) : void 0,
		metrics: Ue(e.metrics, Be),
		energy_sources: Ue(e.energy_sources, Ve),
		intensity_control: B(e.intensity_control, [
			"slider",
			"presets",
			"both"
		], "both"),
		section_order: We(e.section_order, He),
		show_header: e.show_header ?? !0,
		show_badges: e.show_badges ?? !0,
		show_presets: e.show_presets ?? r !== "ultra_compact",
		advanced_open: e.advanced_open ?? !1,
		show_energy_flow: e.show_energy_flow ?? !1,
		show_controls: e.show_controls ?? !0,
		show_advanced: e.show_advanced ?? !0,
		show_charger: e.show_charger ?? !0,
		confirm_lock: e.confirm_lock ?? !0,
		flow_threshold_w: Number.isFinite(e.flow_threshold_w) ? Math.max(0, Number(e.flow_threshold_w)) : 50,
		current_presets: n,
		entities: e.entities && typeof e.entities == "object" && !Array.isArray(e.entities) ? { ...e.entities } : {}
	};
}
function Ke(e) {
	let t = Object.values(e?.entities ?? {}).find((e) => e.platform === "v2c" && e.translation_key === "connected"), n = Object.keys(e?.states ?? {}).find((e) => e.startsWith("binary_sensor.") && e.toLowerCase().includes("v2c"));
	return {
		type: "custom:v2c-trydan-card",
		theme: "auto",
		display_mode: "standard",
		entity: t?.entity_id ?? n ?? "binary_sensor.v2c_connected"
	};
}
//#endregion
//#region src/localization/da.ts
var qe = {
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
		brand: "V2C · TRYDAN",
		now: "nu",
		session: "Session",
		power: "Effekt",
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
		title: "V2C Trydan Card",
		entity: "Primær V2C-enhed",
		name: "Navn",
		location: "Placering",
		statusEntity: "Optional visual status",
		gridPower: "Grid power",
		solarPower: "Solar power",
		batteryPower: "Battery power",
		voltage: "Voltage",
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
}, Je = {
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
		brand: "V2C · TRYDAN",
		now: "jetzt",
		session: "Sitzung",
		power: "Leistung",
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
		title: "V2C Trydan Card",
		entity: "Haupt-V2C-Entität",
		name: "Name",
		location: "Standort",
		statusEntity: "Optional visual status",
		gridPower: "Grid power",
		solarPower: "Solar power",
		batteryPower: "Battery power",
		voltage: "Voltage",
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
}, Ye = {
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
		brand: "V2C · TRYDAN",
		now: "maintenant",
		session: "Session",
		power: "Puissance",
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
		title: "V2C Trydan Card",
		entity: "Entité V2C principale",
		name: "Nom",
		location: "Emplacement",
		statusEntity: "Optional visual status",
		gridPower: "Grid power",
		solarPower: "Solar power",
		batteryPower: "Battery power",
		voltage: "Voltage",
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
}, Xe = {
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
		brand: "V2C · TRYDAN",
		now: "ora",
		session: "Sessione",
		power: "Potenza",
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
		title: "V2C Trydan Card",
		entity: "Entità V2C principale",
		name: "Nome",
		location: "Posizione",
		statusEntity: "Optional visual status",
		gridPower: "Grid power",
		solarPower: "Solar power",
		batteryPower: "Battery power",
		voltage: "Voltage",
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
}, Ze = {
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
		brand: "V2C · TRYDAN",
		now: "nu",
		session: "Sessie",
		power: "Vermogen",
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
		title: "V2C Trydan Card",
		entity: "Hoofd-V2C-entiteit",
		name: "Naam",
		location: "Locatie",
		statusEntity: "Optional visual status",
		gridPower: "Grid power",
		solarPower: "Solar power",
		batteryPower: "Battery power",
		voltage: "Voltage",
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
}, Qe = {
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
		brand: "V2C · TRYDAN",
		now: "nå",
		session: "Økt",
		power: "Effekt",
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
		title: "V2C Trydan Card",
		entity: "Primær V2C-enhet",
		name: "Navn",
		location: "Plassering",
		statusEntity: "Optional visual status",
		gridPower: "Grid power",
		solarPower: "Solar power",
		batteryPower: "Battery power",
		voltage: "Voltage",
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
}, $e = {
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
		brand: "V2C · TRYDAN",
		now: "acum",
		session: "Sesiune",
		power: "Putere",
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
		title: "V2C Trydan Card",
		entity: "Entitate V2C principală",
		name: "Nume",
		location: "Locație",
		statusEntity: "Optional visual status",
		gridPower: "Grid power",
		solarPower: "Solar power",
		batteryPower: "Battery power",
		voltage: "Voltage",
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
}, et = {
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
		brand: "V2C · TRYDAN",
		now: "nu",
		session: "Session",
		power: "Effekt",
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
		title: "V2C Trydan Card",
		entity: "Primär V2C-entitet",
		name: "Namn",
		location: "Plats",
		statusEntity: "Optional visual status",
		gridPower: "Grid power",
		solarPower: "Solar power",
		batteryPower: "Battery power",
		voltage: "Voltage",
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
}, tt = {
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
}, nt = {
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
}, rt = [
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
], it = {
	en: tt,
	it: Xe,
	de: Je,
	fr: Ye,
	nl: Ze,
	sv: et,
	da: qe,
	no: Qe,
	ro: $e,
	es: nt
};
function at(e, t) {
	let n = (e === "auto" ? t : e)?.toLowerCase().split(/[-_]/)[0] ?? "en", r = n === "nb" || n === "nn" ? "no" : n;
	return rt.includes(r) ? r : "en";
}
function V(e) {
	return it[at(e)];
}
function H(e, t) {
	let n = t.split(".").reduce((e, t) => {
		if (!(typeof e != "object" || !e)) return e[t];
	}, e);
	return typeof n == "string" ? n : t;
}
//#endregion
//#region src/localization/lcd-copy.ts
function ot(e, t, n = {}) {
	let r = V(e), i = t === "disconnected" ? {
		primary: H(r, "details.disconnected"),
		secondary: H(r, "states.disconnected")
	} : {
		primary: H(r, `states.${t}`),
		secondary: H(r, `details.${t}`)
	};
	return t === "charging" ? {
		primary: n.power && n.power !== "—" ? `${i.primary} ${n.power}` : i.primary,
		secondary: [n.current, n.voltage].filter(Boolean).join(" · ") || i.secondary
	} : t === "complete" && n.energy && n.energy !== "—" ? {
		...i,
		secondary: n.energy
	} : i;
}
//#endregion
//#region src/services/actions.ts
async function st(e, t, n) {
	return e.callService("number", "set_value", {
		entity_id: t,
		value: n
	});
}
async function ct(e, t, n) {
	return e.callService("switch", n ? "turn_on" : "turn_off", { entity_id: t });
}
async function lt(e, t, n) {
	return e.callService("select", "select_option", {
		entity_id: t,
		option: n
	});
}
async function ut(e, t, n, r) {
	let i = { entity_id: t };
	return n && r !== void 0 && (i.brightness = r), e.callService("light", n ? "turn_on" : "turn_off", i);
}
//#endregion
//#region src/services/discovery.ts
var U = {
	connected: {
		translationKeys: ["connected"],
		domains: ["binary_sensor"],
		legacySuffixes: ["_connected", "_conectado"]
	},
	charging: {
		translationKeys: ["charging"],
		domains: ["binary_sensor"],
		legacySuffixes: ["_charging", "_cargando"]
	},
	ready: {
		translationKeys: ["ready"],
		domains: ["binary_sensor"],
		legacySuffixes: ["_ready", "_listo"]
	},
	charge_power: {
		translationKeys: ["charge_power"],
		domains: ["sensor"],
		legacySuffixes: ["_charge_power", "_potencia_de_carga"]
	},
	charge_energy: {
		translationKeys: ["charge_energy"],
		domains: ["sensor"],
		legacySuffixes: ["_charge_energy", "_energia_de_carga"]
	},
	charge_time: {
		translationKeys: ["charge_time"],
		domains: ["sensor"],
		legacySuffixes: ["_charge_time", "_tiempo_de_carga"]
	},
	house_power: {
		translationKeys: ["house_power"],
		domains: ["sensor"],
		legacySuffixes: ["_house_power", "_energia_de_la_casa"],
		allowExternal: !0
	},
	fv_power: {
		translationKeys: ["fv_power"],
		domains: ["sensor"],
		legacySuffixes: [
			"_fv_power",
			"_energia_fotovoltaica",
			"_sun_power"
		],
		allowExternal: !0
	},
	battery_power: {
		translationKeys: ["battery_power"],
		domains: ["sensor"],
		legacySuffixes: ["_battery_power", "_energia_de_la_bateria"],
		allowExternal: !0
	},
	grid_power: {
		translationKeys: [],
		domains: ["sensor"],
		legacySuffixes: ["_grid_power", "_potencia_de_red"],
		allowExternal: !0
	},
	voltage: {
		translationKeys: ["voltage_installation"],
		domains: ["number", "sensor"],
		preferredDomains: ["number", "sensor"],
		legacySuffixes: ["_voltage", "_tension_de_instalacion"]
	},
	intensity: {
		translationKeys: ["intensity"],
		domains: ["number"],
		legacySuffixes: ["_intensity", "_intensidad"],
		writable: !0
	},
	min_intensity: {
		translationKeys: ["min_intensity"],
		domains: ["number"],
		legacySuffixes: ["_min_intensity", "_intensidad_minima"]
	},
	max_intensity: {
		translationKeys: ["max_intensity"],
		domains: ["number"],
		legacySuffixes: ["_max_intensity", "_intensidad_maxima"]
	},
	meter_error: {
		translationKeys: ["meter_error"],
		domains: ["sensor", "binary_sensor"],
		legacySuffixes: ["_meter_error", "_error_del_medidor"]
	},
	ssid: {
		translationKeys: ["ssid"],
		domains: ["sensor"],
		legacySuffixes: ["_ssid"]
	},
	ip_address: {
		translationKeys: ["ip_address"],
		domains: ["sensor"],
		legacySuffixes: ["_ip_address", "_ip"]
	},
	signal_status: {
		translationKeys: ["signal_status"],
		domains: ["sensor"],
		legacySuffixes: ["_signal_status", "_signal"]
	},
	paused: {
		translationKeys: ["paused"],
		domains: ["switch"],
		legacySuffixes: ["_paused", "_pausar_sesion"],
		writable: !0
	},
	locked: {
		translationKeys: ["locked"],
		domains: ["switch"],
		legacySuffixes: ["_locked", "_bloquear_evse"],
		writable: !0
	},
	timer: {
		translationKeys: ["timer"],
		domains: ["switch"],
		legacySuffixes: ["_timer", "_temporizador_de_punto_de_recarga"],
		writable: !0
	},
	dynamic: {
		translationKeys: ["dynamic"],
		domains: ["switch"],
		legacySuffixes: ["_dynamic", "_modulacion_de_intensidad_dinamica"],
		writable: !0
	},
	pause_dynamic: {
		translationKeys: ["pause_dynamic"],
		domains: ["switch"],
		legacySuffixes: ["_pause_dynamic", "_pausar_la_modulacion_de_control_dinamico"],
		writable: !0
	},
	logo_led: {
		translationKeys: ["logo_led"],
		domains: ["light"],
		legacySuffixes: ["_logo_led"],
		writable: !0
	},
	light_led: {
		translationKeys: ["light_led"],
		domains: ["light"],
		legacySuffixes: ["_light_led", "_luz_led"],
		writable: !0
	},
	charge_mode: {
		translationKeys: ["charge_mode"],
		domains: ["select"],
		legacySuffixes: ["_charge_mode", "_modo_de_carga"],
		writable: !0
	}
}, dt = (e) => U[e].writable === !0;
function ft(e) {
	return e.split(".", 1)[0] ?? "";
}
function pt(e) {
	return Array.isArray(e) ? e : Object.values(e);
}
function mt(e, t) {
	return !e || e[t] !== void 0;
}
function W(e, t) {
	return U[e].domains.includes(ft(t));
}
function ht(e, t) {
	if (ft(e) !== "sensor") return !1;
	let n = t?.[e];
	if (!n) return !1;
	if (n.state === "unknown" || n.state === "unavailable") return !0;
	if (!Number.isFinite(Number(n.state))) return !1;
	let r = n.attributes.unit_of_measurement?.toLowerCase(), i = n.attributes.device_class;
	return (!r || [
		"w",
		"kw",
		"mw"
	].includes(r)) && (!i || i === "power");
}
function gt(e, t) {
	if (t.length === 0) return;
	let n = U[e].preferredDomains ?? U[e].domains;
	for (let e of n) {
		let n = t.filter((t) => ft(t.entity_id) === e);
		if (n.length === 1) return n[0].entity_id;
		if (n.length > 1) return;
	}
	return t.length === 1 ? t[0].entity_id : void 0;
}
function _t(e, t, n = {}, r) {
	let i = pt(e), a = new Map(i.map((e) => [e.entity_id, e])), o = a.get(t), s = i.length === 0 ? "loading" : o ? o.platform === "v2c" ? o.device_id ? void 0 : "seed_missing_device" : "seed_not_v2c" : "seed_not_found", c = s ? void 0 : o?.device_id, l = c ? i.filter((e) => e.device_id === c && e.platform === "v2c" && mt(r, e.entity_id)) : [], u = {}, d = {}, f = {}, p = [];
	for (let e of Object.keys(U)) {
		let t = n[e];
		if (!t) continue;
		let o = a.get(t), s = U[e].allowExternal && ht(t, r), l = !!(c && o && o.device_id === c && o.platform === "v2c" && W(e, t) && mt(r, t)), f = i.length === 0 && mt(r, t) && W(e, t);
		s || l || f ? (u[e] = t, d[e] = "manual") : d[e] = "invalid";
	}
	for (let e of Object.keys(U)) {
		if (u[e] || !c) continue;
		let t = U[e], n = l.filter((n) => !!(n.translation_key && t.translationKeys.includes(n.translation_key)) && W(e, n.entity_id)), r = gt(e, n);
		if (r) {
			u[e] = r, d[e] = "automatic";
			continue;
		}
		if (n.length > 1) {
			f[e] = n.map((e) => e.entity_id), d[e] = "ambiguous";
			continue;
		}
		let i = l.filter((n) => W(e, n.entity_id) && (t.legacySuffixes ?? []).some((e) => n.entity_id.endsWith(e))), a = gt(e, i);
		a ? (u[e] = a, d[e] = "automatic", p.push(e)) : i.length > 1 && (f[e] = i.map((e) => e.entity_id), d[e] = "ambiguous");
	}
	return {
		entities: u,
		ambiguities: f,
		missing: Object.keys(U).filter((e) => !u[e]),
		deviceId: c,
		statuses: Object.fromEntries(Object.keys(U).map((e) => [e, d[e] ?? "missing"])),
		diagnostic: s,
		legacyRoles: p
	};
}
function vt(e, t, n, r) {
	let i = e.entities?.[n], a = e.states[n];
	return !!(r && dt(t) && i?.device_id === r && i.platform === "v2c" && W(t, n) && a && a.state !== "unknown" && a.state !== "unavailable");
}
//#endregion
//#region src/services/energy.ts
function yt(e) {
	if (!e || e.state === "unknown" || e.state === "unavailable") return null;
	let t = Number(e.state);
	if (!Number.isFinite(t)) return null;
	let n = e.attributes.unit_of_measurement?.toLowerCase();
	return n === "kw" ? t * 1e3 : n === "mw" ? t * 1e6 : t;
}
function bt(e, t, n) {
	return Math.abs(t) < n ? "idle" : e === "grid" ? t > 0 ? "import" : "export" : e === "battery" ? t > 0 ? "discharge" : "charge" : e === "solar" ? t > 0 ? "produce" : "unknown" : t > 0 ? "consume" : "export";
}
function xt(e, t, n = {}) {
	let r = yt(t);
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
		direction: bt(e, i, n.thresholdW ?? 50),
		available: !0
	};
}
//#endregion
//#region src/services/format.ts
var St = {
	en: "en-US",
	it: "it-IT",
	de: "de-DE",
	fr: "fr-FR",
	nl: "nl-NL",
	sv: "sv-SE",
	da: "da-DK",
	no: "no-NO",
	ro: "ro-RO",
	es: "es-ES"
};
function G(e) {
	return St[e ?? "es"] ?? "en-US";
}
function Ct(e, t = "es") {
	if (e === null || !Number.isFinite(e)) return "—";
	let n = Math.abs(e);
	return n >= 1e3 ? `${new Intl.NumberFormat(G(t), { maximumFractionDigits: 1 }).format(n / 1e3)} kW` : `${new Intl.NumberFormat(G(t), { maximumFractionDigits: 0 }).format(n)} W`;
}
function wt(e, t = "es") {
	if (e === null || e === "") return "—";
	let n = Number(e);
	return Number.isFinite(n) ? `${new Intl.NumberFormat(G(t), { maximumFractionDigits: 2 }).format(n)} kWh` : "—";
}
function Tt(e) {
	if (e === null || e === "") return "—";
	let t = Number(e);
	if (!Number.isFinite(t) || t < 0) return "—";
	let n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60);
	return `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function Et(e, t, n = "es") {
	if (e === null || e === "") return;
	let r = Number(e);
	if (Number.isFinite(r)) return `${new Intl.NumberFormat(G(n), { maximumFractionDigits: 1 }).format(r)} ${t}`;
}
//#endregion
//#region src/models/types.ts
var Dt = /* @__PURE__ */ "connected.charging.ready.charge_power.charge_energy.charge_time.house_power.fv_power.battery_power.grid_power.voltage.intensity.min_intensity.max_intensity.meter_error.ssid.ip_address.signal_status.paused.locked.timer.dynamic.pause_dynamic.logo_led.light_led.charge_mode".split("."), Ot = [
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
], kt = {
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
}, At = {
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
function jt(e) {
	return e.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function Mt(e) {
	if (!e) return;
	let t = jt(e);
	return Ot.includes(t) ? t : kt[t];
}
function Nt(e) {
	let t = Mt(e.externalStatus), n = (e.connected === void 0 || e.connected === "unknown") && (e.charging === void 0 || e.charging === "unknown") ? e.ready === void 0 || e.ready === "unknown" : !1, r;
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
function K(e, t, n = !1) {
	return {
		key: e,
		labelKey: n ? "states.unavailable" : `states.${e}`,
		detailKey: n ? "details.unavailable" : `details.${e}`,
		severity: At[e],
		badges: t.inhibitors,
		diagnostic: t.diagnostic,
		unavailable: n
	};
}
function Pt(e) {
	return e.externalStatus ? K(e.externalStatus, e) : e.fault === "control_pilot" ? K("control_pilot", e) : e.fault === "load_balancing" ? K("load_balancing", e) : e.fault === "meter" || e.fault === "generic" ? K("error", e) : e.maintenance === "updating" ? K("updating", e) : e.phase === "charging" ? K("charging", e) : e.phase === "complete" ? K("complete", e) : e.inhibitors.includes("timer") ? K("timer", e) : e.connectivity === "wifi_connecting" ? K("wifi_connecting", e) : e.connectivity === "wifi_connected" ? K("wifi_connected", e) : e.phase === "connected" || e.inhibitors.includes("paused") ? K("waiting_power", e) : K("disconnected", e, e.phase === "unavailable");
}
function q(e) {
	return e === "on" || e === "true" ? !0 : e === "off" || e === "false" ? !1 : "unknown";
}
//#endregion
//#region src/card/advanced-controls.ts
var Ft = [
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
function It(e) {
	return !!(e && e.state !== "unknown" && e.state !== "unavailable");
}
function Lt(e, t, n) {
	let r = e.entities[t];
	if (!r) return j;
	let i = e.hass.states[r], a = i?.state === "on";
	return k`
    <div class="toggle-row">
      <span>${t === "locked" && a ? H(e.dictionary, "actions.unlock") : H(e.dictionary, n)}</span>
      <button
        data-role=${t}
        role="switch"
        aria-checked=${String(a)}
        aria-pressed=${String(a)}
        aria-busy=${String(e.pending.includes(t))}
        ?disabled=${!It(i) || e.pending.includes(t)}
        @click=${() => e.onToggle(t)}
      >${a ? "ON" : "OFF"}</button>
    </div>
  `;
}
function Rt(e) {
	let t = Ft.map(({ role: t, label: n }) => Lt(e, t, n)), n = e.entities.charge_mode, r = n ? e.hass.states[n] : void 0, i = e.entities.logo_led, a = i ? e.hass.states[i] : void 0, o = e.entities.light_led, s = !!(e.voltage || e.diagnostic || e.ambiguityRoles?.length);
	return !t.some((e) => e !== j) && !n && !i && !o && !s ? j : k`
    <details ?open=${e.advancedOpen === !0}>
      <summary>${H(e.dictionary, "labels.advanced")}</summary>
      <div class="advanced-grid">
        ${t.slice(0, 2).some((e) => e !== j) || n ? k`
              <section class="control-group">
                <h3>${H(e.dictionary, "labels.chargingControls")}</h3>
                ${t.slice(0, 2)}
                ${n ? k`
                      <label class="select-row">
                        <span>${H(e.dictionary, "actions.chargeMode")}</span>
                        <select
                          data-role="charge_mode"
                          .value=${r?.state ?? ""}
                          ?disabled=${!It(r) || e.pending.includes("charge_mode")}
                          @change=${(t) => e.onSelect(t.target.value)}
                        >
                          ${(r?.attributes.options ?? []).map((e) => k`<option .value=${String(e)}>${String(e)}</option>`)}
                        </select>
                      </label>
                    ` : j}
              </section>
            ` : j}
        ${t.slice(2).some((e) => e !== j) ? k`
              <section class="control-group">
                <h3>${H(e.dictionary, "labels.energyControls")}</h3>
                ${t.slice(2)}
              </section>
            ` : j}
        ${i || o ? k`
              <section class="control-group">
                <h3>${H(e.dictionary, "labels.lightControls")}</h3>
                ${Lt(e, "logo_led", "actions.logoLed")}
                ${i && It(a) ? k`
                      <label class="range-head" for="v2c-logo-brightness">
                        <span>${H(e.dictionary, "actions.logoLed")}</span>
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
                    ` : j}
                ${Lt(e, "light_led", "actions.lightLed")}
              </section>
            ` : j}
        ${s ? k`
              <section class="control-group">
                <h3>${H(e.dictionary, "labels.diagnostics")}</h3>
                <dl class="technical-list">
                  ${e.voltage ? k`
                        <div class="technical-row">
                          <dt>${H(e.dictionary, "labels.voltage")}</dt>
                          <dd>${e.voltage.state} ${e.voltage.attributes.unit_of_measurement ?? "V"}</dd>
                        </div>
                      ` : j}
                  ${e.diagnostic ? k`
                        <div class="technical-row" data-severity="error">
                          <dt>${H(e.dictionary, "labels.diagnostics")}</dt>
                          <dd>${e.diagnostic}</dd>
                        </div>
                      ` : j}
                  ${e.ambiguityRoles?.length ? k`
                        <div class="technical-row">
                          <dt>${H(e.dictionary, "labels.configuration")}</dt>
                          <dd>YAML · ${e.ambiguityRoles.join(", ")}</dd>
                        </div>
                      ` : j}
                </dl>
              </section>
            ` : j}
      </div>
    </details>
  `;
}
//#endregion
//#region src/card/energy-flow.ts
var zt = {
	solar: "mdi:solar-power",
	grid: "mdi:transmission-tower",
	home: "mdi:home-lightning-bolt",
	battery: "mdi:home-battery",
	charger: "mdi:ev-station"
};
function Bt(e, t, n) {
	if (e.length === 0) return j;
	let r = e.filter((e) => e.available), i = e.length - r.length, a = r.filter((e) => !["idle", "unknown"].includes(e.direction)), o = a.length > 0 ? "active" : r.length === 0 ? "unavailable" : i > 0 ? "partial" : "idle", s = `${H(t, o === "active" ? "flows.activeFlow" : o === "partial" ? "flows.partialData" : o === "unavailable" ? "flows.noData" : "flows.noFlow")}${o === "idle" ? " · 0 W" : ""}`;
	return k`
    <section class="energy-section" aria-label=${H(t, "labels.energyFlow")}>
      <div class="energy-summary" data-kind=${o}>
        <p class="energy-summary-title">
          <ha-icon icon="mdi:lightning-bolt-outline" aria-hidden="true"></ha-icon>
          <span>${s}</span>
        </p>
        ${a.length ? k`
              <div class="energy-nodes">
                ${a.map((e) => {
		let r = H(t, `flows.${e.role}`), i = H(t, `flows.${e.direction}`), a = Ct(e.watts, n);
		return k`
                    <div class="flow-node" aria-label=${`${r}: ${a}, ${i}`}>
                      <span class="flow-name" aria-hidden="true"><ha-icon icon=${zt[e.role]}></ha-icon></span>
                      <span class="flow-name-text">${r}</span>
                      <strong class="flow-value">${a}</strong>
                      <span class="flow-direction">${i}</span>
                    </div>
                  `;
	})}
              </div>
            ` : j}
        ${a.length && i ? k`<p class="energy-note">${H(t, "flows.partialData")}</p>` : j}
      </div>
    </section>
  `;
}
//#endregion
//#region src/card/session-controls.ts
function J(e) {
	return !!(e && e.state !== "unknown" && e.state !== "unavailable");
}
function Vt(e) {
	let t = e.entities.intensity, n = e.entities.paused, r = t ? e.hass.states[t] : void 0, i = n ? e.hass.states[n] : void 0;
	if (!t && !n) return j;
	let a = Number(r?.attributes.min ?? 6), o = Number(r?.attributes.max ?? 32), s = Number(r?.attributes.step ?? 1), c = Number(r?.state), l = e.sliderValue ?? (Number.isFinite(c) ? c : a), u = e.presets.filter((e) => e >= a && e <= o), d = i?.state === "on", f = e.intensityControl !== "presets", p = e.showPresets !== !1 && e.intensityControl !== "slider";
	return k`
    <section class="session-controls" aria-label=${H(e.dictionary, "labels.chargingControls")}>
      ${t ? k`<div class="range-control">
        ${f ? k`<label class="range-head" for="v2c-intensity"><span>${H(e.dictionary, "labels.intensity")}</span><output>${Math.round(l)} A</output></label>
        <input id="v2c-intensity" data-role="intensity" type="range" .min=${String(a)} .max=${String(o)} .step=${String(s)} .value=${String(l)} ?disabled=${!J(r) || e.pending.includes("intensity")} aria-busy=${String(e.pending.includes("intensity"))} @input=${(t) => e.onSliderInput(Number(t.target.value))} @change=${(t) => e.onIntensity(Number(t.target.value))} />` : j}
        ${p ? k`<div class="presets" aria-label=${H(e.dictionary, "labels.intensity")}>${u.map((t) => k`<button class="preset" aria-pressed=${String(Math.round(l) === t)} ?disabled=${!J(r) || e.pending.includes("intensity")} @click=${() => e.onIntensity(t)}>${t} A</button>`)}</div>` : j}
      </div>` : j}
      ${n ? k`<button class="primary-action" data-role="paused" aria-busy=${String(e.pending.includes("paused"))} ?disabled=${!J(i) || e.pending.includes("paused")} title=${J(i) ? "" : H(e.dictionary, "labels.unavailableEntity")} @click=${e.onPause}>${H(e.dictionary, d ? "actions.resume" : "actions.pause")}</button>` : j}
    </section>
  `;
}
//#endregion
//#region src/card/styles.ts
var Ht = o`
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
    border-radius: var(--v2c-radius, var(--ha-card-border-radius, 20px));
  }

  .shell { padding: clamp(20px, 4cqw, 30px); }

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
    gap: 0;
    align-items: center;
    justify-items: center;
    margin-top: 18px;
  }

  .hero-copy {
    display: flex;
    min-width: 0;
    max-width: 100%;
    margin-top: clamp(-36px, -7cqw, -26px);
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .hero.without-charger .hero-copy { margin-top: 0; }

  .charger-stage {
    display: grid;
    width: min(100%, clamp(260px, 66cqw, 340px));
    aspect-ratio: 312 / 480;
    place-items: center;
  }
  .charger-art {
    position: relative;
    container-type: inline-size;
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 18px 14px rgb(0 0 0 / 16%));
  }

  .charger-art svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .charger-lcd {
    position: absolute;
    top: 40.6%;
    left: 34.9%;
    display: grid;
    width: 30.1%;
    height: 4.4%;
    grid-template-rows: 1fr 1fr;
    place-items: center;
    color: #cde6ef;
    font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
    font-size: 2.05cqi;
    font-weight: 700;
    letter-spacing: .04em;
    line-height: 1;
    pointer-events: none;
  }

  .charger-lcd span { display: block; max-width: 100%; overflow: hidden; text-overflow: clip; white-space: nowrap; }
  .charger-lcd span + span { color: #9dc0cd; font-size: .92em; }
  .charger-lcd.is-long { font-size: 1.72cqi; }
  .charger-lcd.is-very-long { font-size: 1.48cqi; }

  .charger-status {
    max-width: 100%;
    margin-top: 0;
    overflow-wrap: anywhere;
    color: var(--v2c-text);
    font-size: clamp(2rem, 7cqw, 2.5rem);
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

  .overview {
    width: 100%;
    min-width: 0;
    max-width: 760px;
    justify-self: center;
  }

  .metrics-section { margin-top: 16px; }

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
    .shell { padding: 16px; }
    .card-heading { align-items: flex-start; flex-direction: column; gap: 2px; }
    .location::before { content: ""; }
    .primary-metrics { gap: 6px; }
    .metric { padding: 9px 7px; }
    .session-controls { grid-template-columns: 1fr; align-items: stretch; }
    .primary-action { width: 100%; }
    .advanced-grid { grid-template-columns: 1fr; }
  }

  @container (min-width: 520px) {
    ha-card[data-mode="standard"] .session-controls {
      grid-template-columns: minmax(0, 1fr) minmax(132px, auto);
      align-items: end;
    }
    ha-card[data-mode="standard"] .primary-action { width: auto; min-width: 132px; }
    .advanced-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  ha-card[data-mode="compact"] .shell { padding: 18px; }
  ha-card[data-mode="compact"] .hero { gap: 0; margin-top: 12px; }
  ha-card[data-mode="compact"] .hero-copy { margin-top: clamp(-26px, -6cqw, -18px); }
  ha-card[data-mode="compact"] .charger-stage { width: min(100%, clamp(210px, 62cqw, 280px)); }
  ha-card[data-mode="compact"] .charger-status { margin-top: 0; font-size: clamp(1.65rem, 6cqw, 2rem); }
  ha-card[data-mode="compact"] .metrics-section { margin-top: 12px; }
  ha-card[data-mode="compact"] .metric { padding: 9px; }
  ha-card[data-mode="compact"] .session-controls,
  ha-card[data-mode="compact"] .energy-section { margin-top: 10px; padding-top: 10px; }
  ha-card[data-mode="compact"] details { margin-top: 10px; }

  ha-card[data-mode="ultra_compact"] .shell { padding: 14px; }
  ha-card[data-mode="ultra_compact"] .location { display: none; }
  ha-card[data-mode="ultra_compact"] h2 { font-size: 0.86rem; }
  ha-card[data-mode="ultra_compact"] .hero {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    margin-top: 10px;
    align-items: center;
  }
  ha-card[data-mode="ultra_compact"] .hero-copy { margin-top: 0; }
  ha-card[data-mode="ultra_compact"] .charger-status { margin-top: 0; font-size: clamp(1.35rem, 5.5cqw, 1.65rem); }
  ha-card[data-mode="ultra_compact"] .badges { margin-top: 6px; }
  ha-card[data-mode="ultra_compact"] .badge { padding: 3px 6px; font-size: 0.62rem; }
  ha-card[data-mode="ultra_compact"] .metrics-section { margin-top: 12px; }
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

  ha-card[data-show-header="false"] .card-heading { display: none; }
  ha-card[data-surface="transparent"] { background: transparent; }
  ha-card[data-surface="tinted"] { background: color-mix(in srgb, var(--v2c-control) 8%, var(--v2c-surface)); }
  .charger-stage { transform: scale(var(--v2c-hero-scale, 1)); transform-origin: center bottom; }

  ha-card[data-mode="xxl"] .shell { padding: clamp(26px, 5cqw, 36px); }
  ha-card[data-mode="xxl"] .hero { margin-top: 24px; }
  ha-card[data-mode="xxl"] .charger-stage { width: min(100%, clamp(320px, 84cqw, 430px)); }
  ha-card[data-mode="xxl"] .hero-copy { margin-top: clamp(-44px, -8cqw, -31px); }
  ha-card[data-mode="xxl"] .charger-status { font-size: clamp(2.35rem, 8cqw, 3rem); }
  ha-card[data-mode="xxl"] .metric { padding: 16px; }
  ha-card[data-mode="xxl"] .metric-value { font-size: clamp(1.2rem, 4.8cqw, 1.7rem); }
  ha-card[data-mode="xxl"] .metric-power .metric-value { font-size: clamp(1.5rem, 6cqw, 2.25rem); }
  ha-card[data-mode="xxl"] .session-controls { margin-top: 18px; padding-top: 18px; }

  @container (min-width: 400px) {
    ha-card[data-layout="split"] .hero { grid-template-columns: minmax(150px, .9fr) minmax(0, 1.1fr); gap: clamp(16px, 4cqw, 30px); justify-items: stretch; }
    ha-card[data-layout="split"] .charger-stage { width: min(100%, 280px); justify-self: end; }
    ha-card[data-layout="split"] .hero-copy { margin-top: 0; align-items: flex-start; text-align: left; }
    ha-card[data-layout="split"] .badges { justify-content: flex-start; }
    ha-card[data-layout="inline"] .hero { grid-template-columns: auto minmax(0, 1fr); gap: 14px; justify-items: stretch; }
    ha-card[data-layout="inline"] .charger-stage { width: min(132px, 28cqw); }
    ha-card[data-layout="inline"] .hero-copy { margin-top: 0; align-items: flex-start; text-align: left; }
    ha-card[data-layout="inline"] .charger-status { font-size: clamp(1.1rem, 4cqw, 1.6rem); }
    ha-card[data-layout="inline"] .badges { justify-content: flex-start; }
  }
  @container (min-width: 520px) {
    ha-card[data-layout="auto"] .hero { grid-template-columns: minmax(180px, .9fr) minmax(0, 1.1fr); gap: clamp(18px, 4cqw, 32px); justify-items: stretch; }
    ha-card[data-layout="auto"] .charger-stage { width: min(100%, 300px); justify-self: end; }
    ha-card[data-layout="auto"] .hero-copy { margin-top: 0; align-items: flex-start; text-align: left; }
    ha-card[data-layout="auto"] .badges { justify-content: flex-start; }
  }
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
function Y(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/card/v2c-trydan-card.ts
var X = class extends I {
	constructor(...e) {
		super(...e), this.resolvedEntities = {}, this.ambiguities = {}, this.pendingRoles = [], this.actionMessage = "", this.#e = /* @__PURE__ */ new Map();
	}
	static {
		this.styles = Ht;
	}
	#e;
	#t;
	static getConfigElement() {
		return document.createElement("v2c-trydan-card-editor");
	}
	static getStubConfig(e) {
		return Ke(e);
	}
	setConfig(e) {
		this.config = Ge(e), this.#n(), this.sliderValue = void 0;
	}
	getCardSize() {
		return this.config?.display_mode === "ultra_compact" ? 3 : this.config?.display_mode === "compact" ? 4 : this.config?.display_mode === "standard" ? 6 : 8;
	}
	getGridOptions() {
		return {
			columns: "full",
			min_columns: 6
		};
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		for (let e of this.#e.values()) e.timer && clearTimeout(e.timer);
		this.#e.clear();
	}
	shouldUpdate(e) {
		if (!e.has("hass") || e.size > 1) return !0;
		let t = e.get("hass");
		return !t || !this.hass || t.entities !== this.hass.entities || t.language !== this.hass.language || t.locale?.language !== this.hass.locale?.language || [...this.#r()].some((e) => t.states[e] !== this.hass.states[e]);
	}
	willUpdate(e) {
		(e.has("config") || e.has("hass") && e.get("hass")?.entities !== this.hass?.entities) && this.#n();
	}
	updated(e) {
		e.has("hass") && this.#l();
	}
	#n() {
		if (!this.hass || !this.config) {
			this.resolvedEntities = {}, this.ambiguities = {}, this.#t = void 0;
			return;
		}
		let e = _t(this.hass.entities ?? {}, this.config.entity, this.config.entities, this.hass.states);
		this.resolvedEntities = e.entities, this.ambiguities = e.ambiguities, this.#t = e.deviceId, this.discoveryDiagnostic = e.diagnostic;
	}
	#r() {
		return new Set([
			this.config?.entity,
			this.config?.status_entity,
			...Object.values(this.resolvedEntities)
		].filter((e) => !!e));
	}
	#i(e) {
		let t = this.resolvedEntities[e];
		return t && this.hass ? this.hass.states[t] : void 0;
	}
	#a() {
		let e = this.config?.color_scheme === "custom" ? this.config.accent_color : {
			v2c_blue: "#0067D9",
			teal: "#007F86",
			green: "#2E7D32",
			violet: "#6750A4"
		}[this.config?.color_scheme ?? ""], t = e && parseInt(e.slice(1, 3), 16) * .299 + parseInt(e.slice(3, 5), 16) * .587 + parseInt(e.slice(5, 7), 16) * .114 > 150 ? "#000" : "#fff";
		return (e ? `--v2c-control:${e};--v2c-on-control:${t};` : "") + (this.config?.card_radius === void 0 ? "" : `--v2c-radius:${this.config.card_radius}px;`) + `--v2c-hero-scale:${this.config?.hero_scale ?? 1};`;
	}
	#o() {
		return at(this.config?.language, this.hass?.locale?.language ?? this.hass?.language);
	}
	#s(e, t) {
		this.#e.set(e, t), this.pendingRoles = [...this.#e.keys()];
	}
	#c(e, t) {
		let n = this.#e.get(e);
		n?.timer && clearTimeout(n.timer), this.#e.delete(e), this.pendingRoles = [...this.#e.keys()];
		let r = V(this.#o());
		this.actionMessage = H(r, t ? "labels.actionDone" : "labels.actionFailed");
	}
	#l() {
		if (this.hass) for (let [e, t] of this.#e) t.matches(this.hass.states[t.entityId]) && this.#c(e, !0);
	}
	async #u(e, t, n, r) {
		if (!this.hass || !vt(this.hass, e, t, this.#t)) {
			this.actionMessage = H(V(this.#o()), "labels.actionFailed");
			return;
		}
		if (this.#e.has(e)) return;
		let i = V(this.#o());
		this.actionMessage = H(i, "labels.actionPending");
		let a = {
			entityId: t,
			matches: n
		};
		this.#s(e, a);
		try {
			if (await r(), n(this.hass?.states[t])) {
				this.#c(e, !0);
				return;
			}
			a.timer = setTimeout(() => this.#c(e, !1), 6e3);
		} catch {
			this.#c(e, !1);
		}
	}
	#d(e) {
		let t = this.resolvedEntities.intensity, n = t ? this.hass?.states[t] : void 0;
		if (!this.hass || !t || !n) return;
		let r = Number(n.attributes.min ?? 6), i = Number(n.attributes.max ?? 32), a = Number(n.attributes.step ?? 1), o = Number.isFinite(a) && a > 0 ? a : 1, s = Math.min(i, Math.max(r, Math.round((e - r) / o) * o + r));
		this.sliderValue = s, this.#u("intensity", t, (e) => Number(e?.state) === s, () => st(this.hass, t, s));
	}
	#f(e) {
		let t = this.resolvedEntities[e], n = t ? this.hass?.states[t] : void 0;
		if (!this.hass || !t || !n) return;
		let r = n.state !== "on";
		e === "locked" && r && this.config?.confirm_lock !== !1 && !window.confirm(H(V(this.#o()), "actions.confirmLock")) || this.#u(e, t, (e) => e?.state === (r ? "on" : "off"), () => ct(this.hass, t, r));
	}
	#p(e) {
		let t = this.resolvedEntities.charge_mode, n = t ? this.hass?.states[t] : void 0;
		!this.hass || !t || !n || !n.attributes.options?.includes(e) || this.#u("charge_mode", t, (t) => t?.state === e, () => lt(this.hass, t, e));
	}
	#m(e) {
		let t = this.resolvedEntities[e], n = t ? this.hass?.states[t] : void 0;
		if (!this.hass || !t || !n) return;
		let r = n.state !== "on";
		this.#u(e, t, (e) => e?.state === (r ? "on" : "off"), () => ut(this.hass, t, r));
	}
	#h(e) {
		let t = this.resolvedEntities.logo_led, n = t ? this.hass?.states[t] : void 0;
		!this.hass || !t || !n || !Number.isFinite(e) || e < 0 || e > 255 || this.#u("logo_led", t, (t) => Number(t?.attributes.brightness) === e, () => ut(this.hass, t, !0, e));
	}
	render() {
		if (!this.config || !this.hass) return k`<ha-card><div class="empty">V2C Trydan Card Ã‚Â· configuraciÃƒÂ³n pendiente</div></ha-card>`;
		let e = this.#o(), t = V(e), n = this.hass.states[this.config.entity], r = xt("charger", this.#i("charge_power"), { thresholdW: this.config.flow_threshold_w }), i = Pt(Nt({
			seedAvailable: !!(n && n.state !== "unknown" && n.state !== "unavailable"),
			connected: q(this.#i("connected")?.state),
			charging: q(this.#i("charging")?.state),
			ready: q(this.#i("ready")?.state),
			paused: q(this.#i("paused")?.state),
			locked: q(this.#i("locked")?.state),
			timer: q(this.#i("timer")?.state),
			dynamic: q(this.#i("dynamic")?.state),
			meterError: this.#i("meter_error")?.state,
			externalStatus: this.config.status_entity ? this.hass.states[this.config.status_entity]?.state : void 0,
			chargePowerW: r.watts
		})), a = this.config.name ?? "V2C Trydan", o = this.#i("charge_energy"), s = this.#i("charge_time"), c = this.#i("intensity"), l = this.#i("voltage"), u = [
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
		], d = this.config.energy_sources ?? [], f = u.filter(([e, t]) => d.includes(e) && !!this.resolvedEntities[t]).map(([e, t, n]) => xt(e, this.#i(t), {
			invert: n,
			thresholdW: this.config?.flow_threshold_w
		})), p = (this.config.metrics ?? []).map((n) => n === "power" ? k`<div class="metric metric-power"><span class="metric-label">${H(t, "labels.power")}</span><strong class="metric-value">${Ct(r.watts, e)}</strong></div>` : n === "energy" ? k`<div class="metric"><span class="metric-label">${H(t, "labels.energy")}</span><strong class="metric-value">${wt(o?.state ?? null, e)}</strong></div>` : k`<div class="metric"><span class="metric-label">${H(t, "labels.time")}</span><strong class="metric-value">${Tt(s?.state ?? null)}</strong></div>`), ee = Object.keys(this.ambiguities), m = i.diagnostic && i.diagnostic !== "no_error" ? i.diagnostic.replaceAll("_", " ") : void 0, h = this.config.show_charger !== !1 && this.config.display_mode !== "ultra_compact", g = ot(e, i.key, {
			power: Ct(r.watts, e),
			current: Et(c?.state ?? null, "A", e),
			voltage: Et(l?.state ?? null, "V", e),
			energy: wt(o?.state ?? null, e)
		}), te = Math.max(g.primary.length, g.secondary.length), _ = k`
      <section class="hero ${h ? "has-charger" : "without-charger"}" data-section="hero">
        ${h ? k`<div class="charger-stage"><div class="charger-art" aria-hidden="true">${Ie(Le[i.key])}<div class="charger-lcd ${te > 24 ? "is-very-long" : te > 18 ? "is-long" : ""}"><span>${g.primary}</span><span>${g.secondary}</span></div></div></div>` : j}
        <div class="hero-copy">
          <div class="charger-status" data-severity=${i.severity} role="status">${H(t, i.labelKey)}</div>
          ${this.config.show_badges !== !1 && i.badges.length ? k`<div class="badges" aria-label=${H(t, "labels.additionalStatus")}>${i.badges.map((e) => k`<span class="badge">${H(t, `badges.${e}`)}</span>`)}</div>` : j}
        </div>
      </section>`, v = p.length ? k`<section class="metrics-section" data-section="metrics"><div class="primary-metrics">${p}</div></section>` : j, y = this.config.show_controls ? k`<div data-section="controls">${Vt({
			hass: this.hass,
			entities: this.resolvedEntities,
			dictionary: t,
			presets: this.config.current_presets ?? [],
			intensityControl: this.config.intensity_control,
			showPresets: this.config.show_presets,
			pending: this.pendingRoles,
			sliderValue: this.sliderValue,
			onSliderInput: (e) => this.sliderValue = e,
			onIntensity: (e) => this.#d(e),
			onPause: () => this.#f("paused")
		})}</div>` : j, ne = this.config.show_energy_flow ? k`<div data-section="energy">${Bt(f, t, e)}</div>` : j, b = this.config.show_advanced ? k`<div data-section="advanced">${Rt({
			hass: this.hass,
			entities: this.resolvedEntities,
			dictionary: t,
			pending: this.pendingRoles,
			voltage: this.#i("voltage"),
			diagnostic: m,
			ambiguityRoles: ee,
			advancedOpen: this.config.advanced_open,
			onToggle: (e) => e === "logo_led" || e === "light_led" ? this.#m(e) : this.#f(e),
			onSelect: (e) => this.#p(e),
			onBrightness: (e) => this.#h(e)
		})}</div>` : j, x = (e) => {
			switch (e) {
				case "hero": return _;
				case "metrics": return v;
				case "controls": return y;
				case "energy": return ne;
				default: return b;
			}
		}, re = this.config.section_order ?? [
			"hero",
			"metrics",
			"controls",
			"energy",
			"advanced"
		], S = this.discoveryDiagnostic ? k`<p class="live-region" data-diagnostic=${this.discoveryDiagnostic} role="status">${this.discoveryDiagnostic.replaceAll("_", " ")}</p>` : j;
		return k`
      <ha-card data-theme=${this.config.theme ?? "auto"} data-mode=${this.config.display_mode ?? "standard"} data-layout=${this.config.layout ?? "auto"} data-surface=${this.config.surface_style ?? "solid"} data-show-header=${String(this.config.show_header !== !1)} style=${this.#a()}>
        <div class="shell">
          ${this.config.show_header === !1 ? j : k`<header class="card-heading"><h2>${a}</h2>${this.config.location ? k`<span class="location">${this.config.location}</span>` : j}</header>`}
          <div class="content-sections">${re.map(x)}</div>
          ${S}
          <p class="live-region" aria-live="polite">${this.actionMessage}</p>
        </div>
      </ha-card>`;
	}
};
Y([L({ attribute: !1 })], X.prototype, "hass", void 0), Y([R()], X.prototype, "config", void 0), Y([R()], X.prototype, "resolvedEntities", void 0), Y([R()], X.prototype, "ambiguities", void 0), Y([R()], X.prototype, "discoveryDiagnostic", void 0), Y([R()], X.prototype, "sliderValue", void 0), Y([R()], X.prototype, "pendingRoles", void 0), Y([R()], X.prototype, "actionMessage", void 0);
//#endregion
//#region src/localization/editor-copy.ts
var Ut = {
	en: {
		general: "General",
		appearance: "Appearance",
		contentOrder: "Content and order",
		advanced: "Advanced",
		entities: "Entities",
		automatic: "Automatic",
		modeXxl: "XXL showcase",
		layout: "Layout",
		centered: "Centered",
		split: "Split",
		inline: "Inline",
		colorScheme: "Color scheme",
		monochrome: "Monochrome",
		v2cBlue: "V2C blue",
		teal: "Teal",
		green: "Green",
		violet: "Violet",
		custom: "Custom",
		accentColor: "Custom accent",
		accentHelp: "Choose a color or enter a six-digit HEX value.",
		invalidHex: "Use format #RRGGBB.",
		surface: "Surface",
		solid: "Solid",
		tinted: "Tinted",
		transparent: "Transparent",
		heroScale: "Charger scale",
		cardRadius: "Card corner radius",
		metrics: "Metrics",
		energySources: "Energy sources",
		sectionOrder: "Section order",
		moveUp: "Move up",
		moveDown: "Move down",
		resetOrder: "Restore default order",
		header: "Header",
		badges: "Status badges",
		presets: "Current presets",
		intensityControl: "Current control",
		slider: "Slider",
		both: "Slider and presets",
		flowThreshold: "Idle threshold (W)",
		currentPresets: "Preset amperages",
		addPreset: "Add amperage",
		removePreset: "Remove",
		amps: "amps",
		openAdvanced: "Open Trydan settings",
		confirmLock: "Confirm before locking",
		invertGrid: "Invert grid power",
		invertBattery: "Invert battery power",
		invertSolar: "Invert solar power",
		entityOverrides: "Manual entity overrides",
		statusAutomatic: "Automatic",
		statusManual: "Manual",
		statusAmbiguous: "Ambiguous",
		statusInvalid: "Invalid",
		statusMissing: "Not found"
	},
	es: {
		general: "General",
		appearance: "Apariencia",
		contentOrder: "Contenido y orden",
		advanced: "Avanzado",
		entities: "Entidades",
		automatic: "Automático",
		modeXxl: "XXL escaparate",
		layout: "Distribución",
		centered: "Centrada",
		split: "Dividida",
		inline: "En línea",
		colorScheme: "Paleta de color",
		monochrome: "Monocromo",
		v2cBlue: "Azul V2C",
		teal: "Turquesa",
		green: "Verde",
		violet: "Violeta",
		custom: "Personalizado",
		accentColor: "Color personalizado",
		accentHelp: "Elige un color o escribe un valor HEX de seis dígitos.",
		invalidHex: "Usa el formato #RRGGBB.",
		surface: "Superficie",
		solid: "Sólida",
		tinted: "Tintada",
		transparent: "Transparente",
		heroScale: "Escala del cargador",
		cardRadius: "Radio de las esquinas",
		metrics: "Métricas",
		energySources: "Fuentes de energía",
		sectionOrder: "Orden de secciones",
		moveUp: "Subir",
		moveDown: "Bajar",
		resetOrder: "Restaurar orden",
		header: "Cabecera",
		badges: "Insignias de estado",
		presets: "Presets de intensidad",
		intensityControl: "Control de intensidad",
		slider: "Deslizador",
		both: "Deslizador y presets",
		flowThreshold: "Umbral de reposo (W)",
		currentPresets: "Intensidades rápidas",
		addPreset: "Añadir amperaje",
		removePreset: "Eliminar",
		amps: "amperios",
		openAdvanced: "Abrir ajustes Trydan",
		confirmLock: "Confirmar antes de bloquear",
		invertGrid: "Invertir potencia de red",
		invertBattery: "Invertir potencia de batería",
		invertSolar: "Invertir potencia solar",
		entityOverrides: "Entidades manuales",
		statusAutomatic: "Automática",
		statusManual: "Manual",
		statusAmbiguous: "Ambigua",
		statusInvalid: "Inválida",
		statusMissing: "No encontrada"
	},
	it: {
		general: "Generale",
		appearance: "Aspetto",
		contentOrder: "Contenuto e ordine",
		advanced: "Avanzate",
		entities: "Entità",
		automatic: "Automatico",
		modeXxl: "Vetrina XXL",
		layout: "Layout",
		centered: "Centrato",
		split: "Diviso",
		inline: "In linea",
		colorScheme: "Schema colori",
		monochrome: "Monocromatico",
		v2cBlue: "Blu V2C",
		teal: "Turchese",
		green: "Verde",
		violet: "Viola",
		custom: "Personalizzato",
		accentColor: "Colore personalizzato",
		accentHelp: "Scegli un colore o inserisci un valore HEX di sei cifre.",
		invalidHex: "Usa il formato #RRGGBB.",
		surface: "Superficie",
		solid: "Solida",
		tinted: "Colorata",
		transparent: "Trasparente",
		heroScale: "Scala caricatore",
		cardRadius: "Raggio angoli",
		metrics: "Metriche",
		energySources: "Fonti energetiche",
		sectionOrder: "Ordine sezioni",
		moveUp: "Sposta su",
		moveDown: "Sposta giù",
		resetOrder: "Ripristina ordine",
		header: "Intestazione",
		badges: "Badge di stato",
		presets: "Preset di corrente",
		intensityControl: "Controllo corrente",
		slider: "Cursore",
		both: "Cursore e preset",
		flowThreshold: "Soglia inattività (W)",
		currentPresets: "Amperaggi rapidi",
		addPreset: "Aggiungi amperaggio",
		removePreset: "Rimuovi",
		amps: "ampere",
		openAdvanced: "Apri impostazioni Trydan",
		confirmLock: "Conferma prima del blocco",
		invertGrid: "Inverti potenza rete",
		invertBattery: "Inverti potenza batteria",
		invertSolar: "Inverti potenza solare",
		entityOverrides: "Entità manuali",
		statusAutomatic: "Automatica",
		statusManual: "Manuale",
		statusAmbiguous: "Ambigua",
		statusInvalid: "Non valida",
		statusMissing: "Non trovata"
	},
	de: {
		general: "Allgemein",
		appearance: "Darstellung",
		contentOrder: "Inhalt und Reihenfolge",
		advanced: "Erweitert",
		entities: "Entitäten",
		automatic: "Automatisch",
		modeXxl: "XXL-Präsentation",
		layout: "Layout",
		centered: "Zentriert",
		split: "Geteilt",
		inline: "In einer Reihe",
		colorScheme: "Farbschema",
		monochrome: "Monochrom",
		v2cBlue: "V2C-Blau",
		teal: "Türkis",
		green: "Grün",
		violet: "Violett",
		custom: "Benutzerdefiniert",
		accentColor: "Eigene Akzentfarbe",
		accentHelp: "Farbe wählen oder sechsstelligen HEX-Wert eingeben.",
		invalidHex: "Format #RRGGBB verwenden.",
		surface: "Oberfläche",
		solid: "Einfarbig",
		tinted: "Getönt",
		transparent: "Transparent",
		heroScale: "Lader-Skalierung",
		cardRadius: "Eckenradius",
		metrics: "Messwerte",
		energySources: "Energiequellen",
		sectionOrder: "Abschnittsreihenfolge",
		moveUp: "Nach oben",
		moveDown: "Nach unten",
		resetOrder: "Reihenfolge zurücksetzen",
		header: "Kopfzeile",
		badges: "Statusmarken",
		presets: "Stromvorgaben",
		intensityControl: "Stromsteuerung",
		slider: "Regler",
		both: "Regler und Vorgaben",
		flowThreshold: "Leerlaufschwelle (W)",
		currentPresets: "Schnelle Stromwerte",
		addPreset: "Stromwert hinzufügen",
		removePreset: "Entfernen",
		amps: "Ampere",
		openAdvanced: "Trydan-Einstellungen öffnen",
		confirmLock: "Vor Sperren bestätigen",
		invertGrid: "Netzleistung umkehren",
		invertBattery: "Batterieleistung umkehren",
		invertSolar: "Solarleistung umkehren",
		entityOverrides: "Manuelle Entitäten",
		statusAutomatic: "Automatisch",
		statusManual: "Manuell",
		statusAmbiguous: "Mehrdeutig",
		statusInvalid: "Ungültig",
		statusMissing: "Nicht gefunden"
	},
	fr: {
		general: "Général",
		appearance: "Apparence",
		contentOrder: "Contenu et ordre",
		advanced: "Avancé",
		entities: "Entités",
		automatic: "Automatique",
		modeXxl: "Vitrine XXL",
		layout: "Disposition",
		centered: "Centrée",
		split: "Divisée",
		inline: "En ligne",
		colorScheme: "Palette de couleurs",
		monochrome: "Monochrome",
		v2cBlue: "Bleu V2C",
		teal: "Turquoise",
		green: "Vert",
		violet: "Violet",
		custom: "Personnalisé",
		accentColor: "Couleur personnalisée",
		accentHelp: "Choisissez une couleur ou saisissez une valeur HEX à six chiffres.",
		invalidHex: "Utilisez le format #RRGGBB.",
		surface: "Surface",
		solid: "Solide",
		tinted: "Teintée",
		transparent: "Transparente",
		heroScale: "Échelle du chargeur",
		cardRadius: "Rayon des angles",
		metrics: "Mesures",
		energySources: "Sources d'énergie",
		sectionOrder: "Ordre des sections",
		moveUp: "Monter",
		moveDown: "Descendre",
		resetOrder: "Rétablir l'ordre",
		header: "En-tête",
		badges: "Badges d'état",
		presets: "Préréglages de courant",
		intensityControl: "Contrôle du courant",
		slider: "Curseur",
		both: "Curseur et préréglages",
		flowThreshold: "Seuil de repos (W)",
		currentPresets: "Intensités rapides",
		addPreset: "Ajouter une intensité",
		removePreset: "Supprimer",
		amps: "ampères",
		openAdvanced: "Ouvrir les réglages Trydan",
		confirmLock: "Confirmer avant verrouillage",
		invertGrid: "Inverser puissance réseau",
		invertBattery: "Inverser puissance batterie",
		invertSolar: "Inverser puissance solaire",
		entityOverrides: "Entités manuelles",
		statusAutomatic: "Automatique",
		statusManual: "Manuelle",
		statusAmbiguous: "Ambiguë",
		statusInvalid: "Invalide",
		statusMissing: "Introuvable"
	},
	nl: {
		general: "Algemeen",
		appearance: "Uiterlijk",
		contentOrder: "Inhoud en volgorde",
		advanced: "Geavanceerd",
		entities: "Entiteiten",
		automatic: "Automatisch",
		modeXxl: "XXL-weergave",
		layout: "Indeling",
		centered: "Gecentreerd",
		split: "Gesplitst",
		inline: "Naast elkaar",
		colorScheme: "Kleurenschema",
		monochrome: "Monochroom",
		v2cBlue: "V2C-blauw",
		teal: "Turkoois",
		green: "Groen",
		violet: "Violet",
		custom: "Aangepast",
		accentColor: "Aangepaste accentkleur",
		accentHelp: "Kies een kleur of voer een zescijferige HEX-waarde in.",
		invalidHex: "Gebruik formaat #RRGGBB.",
		surface: "Oppervlak",
		solid: "Effen",
		tinted: "Getint",
		transparent: "Transparant",
		heroScale: "Schaal van lader",
		cardRadius: "Hoekradius",
		metrics: "Meetwaarden",
		energySources: "Energiebronnen",
		sectionOrder: "Volgorde secties",
		moveUp: "Omhoog",
		moveDown: "Omlaag",
		resetOrder: "Standaardvolgorde",
		header: "Koptekst",
		badges: "Statusbadges",
		presets: "Stroompresets",
		intensityControl: "Stroomregeling",
		slider: "Schuifregelaar",
		both: "Schuifregelaar en presets",
		flowThreshold: "Rustdrempel (W)",
		currentPresets: "Snelle stroomwaarden",
		addPreset: "Stroomwaarde toevoegen",
		removePreset: "Verwijderen",
		amps: "ampère",
		openAdvanced: "Trydan-instellingen openen",
		confirmLock: "Bevestigen voor vergrendelen",
		invertGrid: "Netvermogen omkeren",
		invertBattery: "Batterijvermogen omkeren",
		invertSolar: "Zonnevermogen omkeren",
		entityOverrides: "Handmatige entiteiten",
		statusAutomatic: "Automatisch",
		statusManual: "Handmatig",
		statusAmbiguous: "Dubbelzinnig",
		statusInvalid: "Ongeldig",
		statusMissing: "Niet gevonden"
	},
	sv: {
		general: "Allmänt",
		appearance: "Utseende",
		contentOrder: "Innehåll och ordning",
		advanced: "Avancerat",
		entities: "Entiteter",
		automatic: "Automatiskt",
		modeXxl: "XXL-visning",
		layout: "Layout",
		centered: "Centrerad",
		split: "Delad",
		inline: "I rad",
		colorScheme: "Färgschema",
		monochrome: "Monokrom",
		v2cBlue: "V2C-blå",
		teal: "Turkos",
		green: "Grön",
		violet: "Violett",
		custom: "Anpassad",
		accentColor: "Egen accentfärg",
		accentHelp: "Välj en färg eller ange ett sexsiffrigt HEX-värde.",
		invalidHex: "Använd formatet #RRGGBB.",
		surface: "Yta",
		solid: "Enfärgad",
		tinted: "Tonad",
		transparent: "Genomskinlig",
		heroScale: "Laddarens skala",
		cardRadius: "Hörnradie",
		metrics: "Mätvärden",
		energySources: "Energikällor",
		sectionOrder: "Sektionsordning",
		moveUp: "Flytta upp",
		moveDown: "Flytta ned",
		resetOrder: "Återställ ordning",
		header: "Rubrik",
		badges: "Statusmärken",
		presets: "Strömförval",
		intensityControl: "Strömstyrning",
		slider: "Reglage",
		both: "Reglage och förval",
		flowThreshold: "Vilotröskel (W)",
		currentPresets: "Snabba strömvärden",
		addPreset: "Lägg till strömvärde",
		removePreset: "Ta bort",
		amps: "ampere",
		openAdvanced: "Öppna Trydan-inställningar",
		confirmLock: "Bekräfta före låsning",
		invertGrid: "Invertera nätkraft",
		invertBattery: "Invertera batterikraft",
		invertSolar: "Invertera solkraft",
		entityOverrides: "Manuella entiteter",
		statusAutomatic: "Automatisk",
		statusManual: "Manuell",
		statusAmbiguous: "Tvetydig",
		statusInvalid: "Ogiltig",
		statusMissing: "Hittades inte"
	},
	da: {
		general: "Generelt",
		appearance: "Udseende",
		contentOrder: "Indhold og rækkefølge",
		advanced: "Avanceret",
		entities: "Entiteter",
		automatic: "Automatisk",
		modeXxl: "XXL-visning",
		layout: "Layout",
		centered: "Centreret",
		split: "Delt",
		inline: "På linje",
		colorScheme: "Farveskema",
		monochrome: "Monokrom",
		v2cBlue: "V2C-blå",
		teal: "Turkis",
		green: "Grøn",
		violet: "Violet",
		custom: "Brugerdefineret",
		accentColor: "Egen accentfarve",
		accentHelp: "Vælg en farve eller indtast en sekscifret HEX-værdi.",
		invalidHex: "Brug formatet #RRGGBB.",
		surface: "Overflade",
		solid: "Ensfarvet",
		tinted: "Tonet",
		transparent: "Gennemsigtig",
		heroScale: "Laderens skala",
		cardRadius: "Hjørneradius",
		metrics: "Målinger",
		energySources: "Energikilder",
		sectionOrder: "Sektionsrækkefølge",
		moveUp: "Flyt op",
		moveDown: "Flyt ned",
		resetOrder: "Gendan rækkefølge",
		header: "Overskrift",
		badges: "Statusmærker",
		presets: "Strømforvalg",
		intensityControl: "Strømstyring",
		slider: "Skyder",
		both: "Skyder og forvalg",
		flowThreshold: "Hviletærskel (W)",
		currentPresets: "Hurtige strømværdier",
		addPreset: "Tilføj strømværdi",
		removePreset: "Fjern",
		amps: "ampere",
		openAdvanced: "Åbn Trydan-indstillinger",
		confirmLock: "Bekræft før låsning",
		invertGrid: "Vend neteffekt",
		invertBattery: "Vend batterieffekt",
		invertSolar: "Vend solenergi",
		entityOverrides: "Manuelle entiteter",
		statusAutomatic: "Automatisk",
		statusManual: "Manuel",
		statusAmbiguous: "Tvetydig",
		statusInvalid: "Ugyldig",
		statusMissing: "Ikke fundet"
	},
	no: {
		general: "Generelt",
		appearance: "Utseende",
		contentOrder: "Innhold og rekkefølge",
		advanced: "Avansert",
		entities: "Entiteter",
		automatic: "Automatisk",
		modeXxl: "XXL-visning",
		layout: "Layout",
		centered: "Sentrert",
		split: "Delt",
		inline: "På linje",
		colorScheme: "Fargeskjema",
		monochrome: "Monokrom",
		v2cBlue: "V2C-blå",
		teal: "Turkis",
		green: "Grønn",
		violet: "Fiolett",
		custom: "Egendefinert",
		accentColor: "Egen aksentfarge",
		accentHelp: "Velg en farge eller skriv inn en sekssifret HEX-verdi.",
		invalidHex: "Bruk formatet #RRGGBB.",
		surface: "Overflate",
		solid: "Ensfarget",
		tinted: "Tonet",
		transparent: "Gjennomsiktig",
		heroScale: "Laderens skala",
		cardRadius: "Hjørneradius",
		metrics: "Målinger",
		energySources: "Energikilder",
		sectionOrder: "Seksjonsrekkefølge",
		moveUp: "Flytt opp",
		moveDown: "Flytt ned",
		resetOrder: "Gjenopprett rekkefølge",
		header: "Topptekst",
		badges: "Statusmerker",
		presets: "Strømforvalg",
		intensityControl: "Strømstyring",
		slider: "Glidebryter",
		both: "Glidebryter og forvalg",
		flowThreshold: "Hvileterskel (W)",
		currentPresets: "Raske strømverdier",
		addPreset: "Legg til strømverdi",
		removePreset: "Fjern",
		amps: "ampere",
		openAdvanced: "Åpne Trydan-innstillinger",
		confirmLock: "Bekreft før låsing",
		invertGrid: "Snu netteffekt",
		invertBattery: "Snu batterieffekt",
		invertSolar: "Snu solkraft",
		entityOverrides: "Manuelle entiteter",
		statusAutomatic: "Automatisk",
		statusManual: "Manuell",
		statusAmbiguous: "Tvetydig",
		statusInvalid: "Ugyldig",
		statusMissing: "Ikke funnet"
	},
	ro: {
		general: "General",
		appearance: "Aspect",
		contentOrder: "Conținut și ordine",
		advanced: "Avansat",
		entities: "Entități",
		automatic: "Automat",
		modeXxl: "Prezentare XXL",
		layout: "Dispunere",
		centered: "Centrat",
		split: "Împărțit",
		inline: "În linie",
		colorScheme: "Schemă de culori",
		monochrome: "Monocrom",
		v2cBlue: "Albastru V2C",
		teal: "Turcoaz",
		green: "Verde",
		violet: "Violet",
		custom: "Personalizat",
		accentColor: "Culoare personalizată",
		accentHelp: "Alege o culoare sau introdu o valoare HEX de șase cifre.",
		invalidHex: "Folosește formatul #RRGGBB.",
		surface: "Suprafață",
		solid: "Solidă",
		tinted: "Nuanțată",
		transparent: "Transparentă",
		heroScale: "Scara încărcătorului",
		cardRadius: "Raza colțurilor",
		metrics: "Indicatori",
		energySources: "Surse de energie",
		sectionOrder: "Ordinea secțiunilor",
		moveUp: "Mută sus",
		moveDown: "Mută jos",
		resetOrder: "Restabilește ordinea",
		header: "Antet",
		badges: "Insigne de stare",
		presets: "Presetări de curent",
		intensityControl: "Controlul curentului",
		slider: "Glisor",
		both: "Glisor și presetări",
		flowThreshold: "Prag de repaus (W)",
		currentPresets: "Intensități rapide",
		addPreset: "Adaugă intensitate",
		removePreset: "Elimină",
		amps: "amperi",
		openAdvanced: "Deschide setările Trydan",
		confirmLock: "Confirmă înainte de blocare",
		invertGrid: "Inversează puterea rețelei",
		invertBattery: "Inversează puterea bateriei",
		invertSolar: "Inversează puterea solară",
		entityOverrides: "Entități manuale",
		statusAutomatic: "Automată",
		statusManual: "Manuală",
		statusAmbiguous: "Ambiguă",
		statusInvalid: "Invalidă",
		statusMissing: "Negăsită"
	}
}, Wt = {
	en: {
		connected: "Vehicle connected",
		charging: "Charging",
		ready: "Ready",
		charge_power: "Charge power",
		charge_energy: "Charge energy",
		charge_time: "Charge time",
		house_power: "Home power",
		fv_power: "Solar power",
		battery_power: "Battery power",
		grid_power: "Grid power",
		voltage: "Voltage",
		intensity: "Charging current",
		min_intensity: "Minimum current",
		max_intensity: "Maximum current",
		meter_error: "Meter error",
		ssid: "Wi-Fi network",
		ip_address: "IP address",
		signal_status: "Signal status",
		paused: "Pause",
		locked: "EVSE lock",
		timer: "Timer",
		dynamic: "Dynamic modulation",
		pause_dynamic: "Pause dynamic control",
		logo_led: "Logo LED",
		light_led: "Charger light",
		charge_mode: "Charge mode"
	},
	es: {
		connected: "Vehículo conectado",
		charging: "Cargando",
		ready: "Preparado",
		charge_power: "Potencia de carga",
		charge_energy: "Energía de carga",
		charge_time: "Tiempo de carga",
		house_power: "Potencia de casa",
		fv_power: "Potencia solar",
		battery_power: "Potencia de batería",
		grid_power: "Potencia de red",
		voltage: "Voltaje",
		intensity: "Intensidad de carga",
		min_intensity: "Intensidad mínima",
		max_intensity: "Intensidad máxima",
		meter_error: "Error del medidor",
		ssid: "Red Wi-Fi",
		ip_address: "Dirección IP",
		signal_status: "Estado de señal",
		paused: "Pausa",
		locked: "Bloqueo EVSE",
		timer: "Temporizador",
		dynamic: "Modulación dinámica",
		pause_dynamic: "Pausa de control dinámico",
		logo_led: "LED del logo",
		light_led: "Luz del cargador",
		charge_mode: "Modo de carga"
	},
	it: {
		connected: "Veicolo collegato",
		charging: "Ricarica",
		ready: "Pronto",
		charge_power: "Potenza di ricarica",
		charge_energy: "Energia di ricarica",
		charge_time: "Tempo di ricarica",
		house_power: "Potenza casa",
		fv_power: "Potenza solare",
		battery_power: "Potenza batteria",
		grid_power: "Potenza rete",
		voltage: "Tensione",
		intensity: "Corrente di ricarica",
		min_intensity: "Corrente minima",
		max_intensity: "Corrente massima",
		meter_error: "Errore contatore",
		ssid: "Rete Wi-Fi",
		ip_address: "Indirizzo IP",
		signal_status: "Stato segnale",
		paused: "Pausa",
		locked: "Blocco EVSE",
		timer: "Timer",
		dynamic: "Modulazione dinamica",
		pause_dynamic: "Pausa controllo dinamico",
		logo_led: "LED logo",
		light_led: "Luce caricatore",
		charge_mode: "Modalità di ricarica"
	},
	de: {
		connected: "Fahrzeug verbunden",
		charging: "Ladevorgang",
		ready: "Bereit",
		charge_power: "Ladeleistung",
		charge_energy: "Ladeenergie",
		charge_time: "Ladezeit",
		house_power: "Hausleistung",
		fv_power: "Solarleistung",
		battery_power: "Batterieleistung",
		grid_power: "Netzleistung",
		voltage: "Spannung",
		intensity: "Ladestrom",
		min_intensity: "Mindeststrom",
		max_intensity: "Höchststrom",
		meter_error: "Zählerfehler",
		ssid: "WLAN-Netz",
		ip_address: "IP-Adresse",
		signal_status: "Signalstatus",
		paused: "Pause",
		locked: "EVSE-Sperre",
		timer: "Timer",
		dynamic: "Dynamische Modulation",
		pause_dynamic: "Dynamische Steuerung pausieren",
		logo_led: "Logo-LED",
		light_led: "Laderlicht",
		charge_mode: "Lademodus"
	},
	fr: {
		connected: "Véhicule connecté",
		charging: "Recharge",
		ready: "Prêt",
		charge_power: "Puissance de charge",
		charge_energy: "Énergie de charge",
		charge_time: "Temps de charge",
		house_power: "Puissance maison",
		fv_power: "Puissance solaire",
		battery_power: "Puissance batterie",
		grid_power: "Puissance réseau",
		voltage: "Tension",
		intensity: "Courant de charge",
		min_intensity: "Courant minimal",
		max_intensity: "Courant maximal",
		meter_error: "Erreur compteur",
		ssid: "Réseau Wi-Fi",
		ip_address: "Adresse IP",
		signal_status: "État du signal",
		paused: "Pause",
		locked: "Verrou EVSE",
		timer: "Minuterie",
		dynamic: "Modulation dynamique",
		pause_dynamic: "Pause du contrôle dynamique",
		logo_led: "LED du logo",
		light_led: "Éclairage du chargeur",
		charge_mode: "Mode de charge"
	},
	nl: {
		connected: "Voertuig verbonden",
		charging: "Laden",
		ready: "Gereed",
		charge_power: "Laadvermogen",
		charge_energy: "Laadenergie",
		charge_time: "Laadtijd",
		house_power: "Huisvermogen",
		fv_power: "Zonnevermogen",
		battery_power: "Batterijvermogen",
		grid_power: "Netvermogen",
		voltage: "Spanning",
		intensity: "Laadstroom",
		min_intensity: "Minimale stroom",
		max_intensity: "Maximale stroom",
		meter_error: "Meterfout",
		ssid: "Wi-Fi-netwerk",
		ip_address: "IP-adres",
		signal_status: "Signaalstatus",
		paused: "Pauze",
		locked: "EVSE-vergrendeling",
		timer: "Timer",
		dynamic: "Dynamische modulatie",
		pause_dynamic: "Dynamische regeling pauzeren",
		logo_led: "Logo-LED",
		light_led: "Laderlicht",
		charge_mode: "Laadmodus"
	},
	sv: {
		connected: "Fordon anslutet",
		charging: "Laddning",
		ready: "Redo",
		charge_power: "Laddeffekt",
		charge_energy: "Laddenergi",
		charge_time: "Laddtid",
		house_power: "Huseffekt",
		fv_power: "Soleffekt",
		battery_power: "Batterieffekt",
		grid_power: "Näteffekt",
		voltage: "Spänning",
		intensity: "Laddström",
		min_intensity: "Minsta ström",
		max_intensity: "Högsta ström",
		meter_error: "Mätarfel",
		ssid: "Wi-Fi-nätverk",
		ip_address: "IP-adress",
		signal_status: "Signalstatus",
		paused: "Paus",
		locked: "EVSE-lås",
		timer: "Timer",
		dynamic: "Dynamisk modulering",
		pause_dynamic: "Pausa dynamisk styrning",
		logo_led: "Logo-LED",
		light_led: "Laddarljus",
		charge_mode: "Laddläge"
	},
	da: {
		connected: "Køretøj tilsluttet",
		charging: "Opladning",
		ready: "Klar",
		charge_power: "Ladeeffekt",
		charge_energy: "Ladeenergi",
		charge_time: "Ladetid",
		house_power: "Huseffekt",
		fv_power: "Soleffekt",
		battery_power: "Batterieffekt",
		grid_power: "Neteffekt",
		voltage: "Spænding",
		intensity: "Ladestrøm",
		min_intensity: "Minimumstrøm",
		max_intensity: "Maksimumstrøm",
		meter_error: "Målerfejl",
		ssid: "Wi-Fi-netværk",
		ip_address: "IP-adresse",
		signal_status: "Signalstatus",
		paused: "Pause",
		locked: "EVSE-lås",
		timer: "Timer",
		dynamic: "Dynamisk modulering",
		pause_dynamic: "Pause dynamisk styring",
		logo_led: "Logo-LED",
		light_led: "Laderlys",
		charge_mode: "Ladetilstand"
	},
	no: {
		connected: "Kjøretøy tilkoblet",
		charging: "Lading",
		ready: "Klar",
		charge_power: "Ladeeffekt",
		charge_energy: "Ladeenergi",
		charge_time: "Ladetid",
		house_power: "Huseffekt",
		fv_power: "Soleffekt",
		battery_power: "Batterieffekt",
		grid_power: "Netteffekt",
		voltage: "Spenning",
		intensity: "Ladestrøm",
		min_intensity: "Minimumsstrøm",
		max_intensity: "Maksimumsstrøm",
		meter_error: "Målerfeil",
		ssid: "Wi-Fi-nettverk",
		ip_address: "IP-adresse",
		signal_status: "Signalstatus",
		paused: "Pause",
		locked: "EVSE-lås",
		timer: "Tidsur",
		dynamic: "Dynamisk modulering",
		pause_dynamic: "Pause dynamisk styring",
		logo_led: "Logo-LED",
		light_led: "Laderlys",
		charge_mode: "Lademodus"
	},
	ro: {
		connected: "Vehicul conectat",
		charging: "Încărcare",
		ready: "Pregătit",
		charge_power: "Putere de încărcare",
		charge_energy: "Energie de încărcare",
		charge_time: "Timp de încărcare",
		house_power: "Puterea casei",
		fv_power: "Putere solară",
		battery_power: "Puterea bateriei",
		grid_power: "Puterea rețelei",
		voltage: "Tensiune",
		intensity: "Curent de încărcare",
		min_intensity: "Curent minim",
		max_intensity: "Curent maxim",
		meter_error: "Eroare contor",
		ssid: "Rețea Wi-Fi",
		ip_address: "Adresă IP",
		signal_status: "Starea semnalului",
		paused: "Pauză",
		locked: "Blocare EVSE",
		timer: "Temporizator",
		dynamic: "Modulare dinamică",
		pause_dynamic: "Pauză control dinamic",
		logo_led: "LED logo",
		light_led: "Lumina încărcătorului",
		charge_mode: "Mod de încărcare"
	}
};
function Gt(e) {
	return Ut[e];
}
function Kt(e, t) {
	return Wt[e][t];
}
function qt(e, t) {
	return e[`status${t[0].toUpperCase()}${t.slice(1)}`];
}
//#endregion
//#region src/editor/v2c-trydan-card-editor.ts
var Jt = {
	en: "English",
	it: "Italiano",
	de: "Deutsch",
	fr: "FranÃƒÂ§ais",
	nl: "Nederlands",
	sv: "Svenska",
	da: "Dansk",
	no: "Norsk",
	ro: "RomÃƒÂ¢nÃ„Æ’",
	es: "EspaÃƒÂ±ol"
}, Yt = {
	en: "Ultra compact mode always hides the charger artwork. Your setting is preserved for other sizes.",
	es: "El modo ultracompacto siempre oculta el cargador. Tu ajuste se conserva para otros tamaÃƒÂ±os.",
	it: "La modalitÃƒÂ\xA0 ultra compatta nasconde sempre il caricatore. L'impostazione resta per le altre dimensioni.",
	de: "Ultrakompakt blendet den Lader immer aus. Die Einstellung bleibt fÃƒÂ¼r andere GrÃƒÂ¶ÃƒÅ¸en erhalten.",
	fr: "Le mode ultra compact masque toujours le chargeur. Le rÃƒÂ©glage reste conservÃƒÂ© pour les autres tailles.",
	nl: "Ultracompact verbergt de lader altijd. De instelling blijft bewaard voor andere formaten.",
	sv: "Ultrakompakt dÃƒÂ¶ljer alltid laddaren. InstÃƒÂ¤llningen sparas fÃƒÂ¶r andra storlekar.",
	da: "Ultrakompakt skjuler altid laderen. Indstillingen bevares til andre stÃƒÂ¸rrelser.",
	no: "Ultrakompakt skjuler alltid laderen. Innstillingen beholdes for andre stÃƒÂ¸rrelser.",
	ro: "Modul ultra compact ascunde mereu ÃƒÂ®ncÃ„Æ’rcÃ„Æ’torul. Setarea rÃ„Æ’mÃƒÂ¢ne salvatÃ„Æ’ pentru alte dimensiuni."
}, Xt = [
	"power",
	"energy",
	"time"
], Z = [
	"solar",
	"grid",
	"home",
	"battery",
	"charger"
], Zt = [
	"hero",
	"metrics",
	"controls",
	"energy",
	"advanced"
], Qt = [
	["show_energy_flow", "editor.showEnergyFlow"],
	["show_controls", "editor.showControls"],
	["show_advanced", "editor.showAdvanced"],
	["show_charger", "editor.showCharger"]
], Q = class extends I {
	constructor(...e) {
		super(...e), this.accentDraft = "#0067D9", this.presetDraft = "";
	}
	static {
		this.styles = o`
    :host { display:block; color:var(--primary-text-color); }
    * { box-sizing:border-box; }
    .editor { display:grid; gap:12px; padding:8px 0; }
    .group { border:1px solid var(--divider-color,#7775); border-radius:14px; background:var(--card-background-color); overflow:hidden; }
    .group > summary { display:flex; min-height:48px; padding:12px 14px; align-items:center; gap:8px; cursor:pointer; color:var(--primary-text-color); font-size:.92rem; font-weight:700; list-style:none; }
    .group > summary::-webkit-details-marker { display:none; }
    .group > summary::after { content:"+"; margin-left:auto; color:var(--secondary-text-color); font-size:1.15rem; }
    .group[open] > summary::after { content:"Ã¢Ë†â€™"; }
    .group-body { display:grid; gap:14px; padding:0 14px 16px; }
    .grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
    label,.field { display:grid; gap:6px; color:var(--secondary-text-color); font-size:.78rem; }
    .field-title { color:var(--primary-text-color); font-weight:650; }
    input,select,button { font:inherit; }
    input:not([type="checkbox"]):not([type="color"]),select { width:100%; min-height:42px; padding:8px 10px; border:1px solid var(--divider-color,#7775); border-radius:9px; color:var(--primary-text-color); background:var(--card-background-color); }
    input:focus-visible,select:focus-visible,button:focus-visible,summary:focus-visible { outline:3px solid var(--primary-color,#0067d9); outline-offset:2px; }
    .choices { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:7px; }
    .choice { display:grid; min-height:66px; padding:8px 5px; place-items:center; gap:5px; border:1px solid var(--divider-color,#7775); border-radius:10px; color:var(--secondary-text-color); background:transparent; cursor:pointer; font-size:.68rem; text-align:center; }
    .choice[aria-pressed="true"] { border-color:var(--primary-color,#0067d9); color:var(--primary-text-color); background:color-mix(in srgb,var(--primary-color,#0067d9) 10%,transparent); box-shadow:inset 0 0 0 1px var(--primary-color,#0067d9); }
    .layout-icon { display:grid; width:34px; height:22px; padding:3px; border:1px solid currentColor; border-radius:4px; gap:2px; opacity:.9; }
    .layout-icon::before,.layout-icon::after { content:""; display:block; border-radius:2px; background:currentColor; opacity:.7; }
    .layout-icon[data-kind="split"],.layout-icon[data-kind="inline"] { grid-template-columns:1fr 1fr; }
    .layout-icon[data-kind="centered"]::before { width:55%; justify-self:center; }
    .layout-icon[data-kind="auto"]::after { width:70%; justify-self:center; }
    .chips { display:flex; flex-wrap:wrap; gap:7px; }
    .chip { min-height:36px; padding:6px 11px; border:1px solid var(--divider-color,#7775); border-radius:999px; color:var(--secondary-text-color); background:transparent; cursor:pointer; }
    .chip[aria-pressed="true"] { color:var(--primary-text-color); border-color:var(--primary-color,#0067d9); background:color-mix(in srgb,var(--primary-color,#0067d9) 12%,transparent); }
    .swatches { display:grid; grid-template-columns:repeat(6,minmax(38px,1fr)); gap:7px; }
    .swatch { min-height:44px; padding:4px; border:1px solid var(--divider-color,#7775); border-radius:9px; color:var(--primary-text-color); background:transparent; cursor:pointer; }
    .swatch::before { content:""; display:block; width:22px; height:22px; margin:auto; border:1px solid #7777; border-radius:50%; background:var(--swatch); }
    .swatch[aria-pressed="true"] { border-color:var(--primary-color,#0067d9); box-shadow:inset 0 0 0 1px var(--primary-color,#0067d9); }
    .color-row { display:grid; grid-template-columns:52px minmax(0,1fr); gap:9px; align-items:end; }
    input[type="color"] { width:52px; height:42px; padding:3px; border:1px solid var(--divider-color,#7775); border-radius:9px; background:transparent; cursor:pointer; }
    .help,.error { margin:0; font-size:.7rem; line-height:1.4; }
    .help { color:var(--secondary-text-color); } .error { color:var(--error-color,#b42335); }
    .range-row { display:grid; grid-template-columns:minmax(0,1fr) 64px; gap:10px; align-items:center; }
    input[type="range"] { width:100%; accent-color:var(--primary-color,#0067d9); }
    output { color:var(--primary-text-color); font-variant-numeric:tabular-nums; font-weight:700; text-align:right; }
    .order-list { display:grid; gap:6px; margin:0; padding:0; list-style:none; }
    .order-item { display:grid; grid-template-columns:28px minmax(0,1fr) 34px 34px; min-height:42px; align-items:center; gap:5px; padding:5px 6px; border:1px solid var(--divider-color,#7775); border-radius:9px; }
    .order-index { display:grid; width:24px; height:24px; place-items:center; border-radius:50%; color:var(--secondary-text-color); background:var(--secondary-background-color,#7772); font-size:.7rem; }
    .icon-button { min-width:32px; min-height:32px; border:1px solid var(--divider-color,#7775); border-radius:8px; color:var(--primary-text-color); background:transparent; cursor:pointer; }
    .icon-button:disabled { opacity:.35; cursor:not-allowed; }
    .reset { justify-self:start; min-height:36px; padding:6px 10px; border:1px solid var(--divider-color,#7775); border-radius:8px; color:var(--primary-text-color); background:transparent; cursor:pointer; }
    .checks { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:7px 12px; }
    .checks label { display:flex; min-height:34px; align-items:center; gap:8px; }
    .checks input { width:auto; accent-color:var(--primary-color,#0067d9); }
    .checks input:disabled + span,.checks label:has(input:disabled) { opacity:.6; }
    .preset-editor { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:8px; }
    .preset-editor button { min-height:42px; padding:8px 12px; border:0; border-radius:9px; color:var(--text-primary-color,#fff); background:var(--primary-color,#0067d9); cursor:pointer; font-weight:700; }
    .preset-list { display:flex; flex-wrap:wrap; gap:6px; }
    .preset-token { display:flex; align-items:center; gap:5px; padding:5px 6px 5px 10px; border:1px solid var(--divider-color,#7775); border-radius:999px; color:var(--primary-text-color); font-size:.75rem; }
    .preset-token button { width:25px; height:25px; padding:0; border:0; border-radius:50%; color:inherit; background:var(--secondary-background-color,#7773); cursor:pointer; }
    .entity-status { font-size:.7rem; font-weight:650; }
    .entity-status[data-status="automatic"] { color:var(--success-color,#2e7d32); }
    .entity-status[data-status="manual"] { color:var(--primary-color,#0067d9); }
    .entity-status[data-status="invalid"],.entity-status[data-status="ambiguous"] { color:var(--error-color,#b42335); }
    @media (max-width:500px) { .grid,.checks { grid-template-columns:1fr; } .choices { grid-template-columns:repeat(2,minmax(0,1fr)); } .swatches { grid-template-columns:repeat(3,1fr); } }
  `;
	}
	setConfig(e) {
		this.config = {
			...e,
			entities: { ...e.entities ?? {} }
		}, this.accentDraft = /^#[0-9a-f]{6}$/i.test(e.accent_color ?? "") ? e.accent_color.toUpperCase() : "#0067D9";
	}
	shouldUpdate(e) {
		if (!e.has("hass") || e.size > 1) return !0;
		let t = e.get("hass");
		return !t || !this.hass || t.entities !== this.hass.entities || t.language !== this.hass.language || t.locale?.language !== this.hass.locale?.language;
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
	#n(e) {
		return this.config ? e === "show_energy_flow" ? this.config.show_energy_flow === !0 : this.config[e] !== !1 : !1;
	}
	#r(e, t) {
		if (!this.config) return;
		let n = Number(t);
		Number.isFinite(n) && this.#e({
			...this.config,
			[e]: n
		});
	}
	#i(e) {
		if (!this.config) return;
		let t = this.config.metrics ?? [...Xt], n = t.includes(e) ? t.filter((t) => t !== e) : [...t, e];
		this.#e({
			...this.config,
			metrics: n
		});
	}
	#a(e) {
		if (!this.config) return;
		let t = this.config.energy_sources ?? [...Z], n = t.includes(e) ? t.filter((t) => t !== e) : [...t, e];
		this.#e({
			...this.config,
			energy_sources: n
		});
	}
	#o() {
		let e = (this.config?.section_order ?? []).filter((e) => Zt.includes(e));
		return [.../* @__PURE__ */ new Set([...e, ...Zt])];
	}
	#s(e, t) {
		if (!this.config) return;
		let n = this.#o(), r = e + t;
		r < 0 || r >= n.length || ([n[e], n[r]] = [n[r], n[e]], this.#e({
			...this.config,
			section_order: n
		}));
	}
	#c() {
		if (!this.config) return;
		let e = { ...this.config };
		delete e.section_order, this.#e(e);
	}
	#l(e) {
		if (!this.config) return;
		let t = e === "custom" ? this.config.accent_color ?? "#0067D9" : this.config.accent_color;
		e === "custom" && (this.accentDraft = t), this.#e({
			...this.config,
			color_scheme: e,
			accent_color: t
		});
	}
	#u(e) {
		this.accentDraft = e.toUpperCase(), !(!this.config || !/^#[0-9A-F]{6}$/.test(this.accentDraft)) && this.#e({
			...this.config,
			color_scheme: "custom",
			accent_color: this.accentDraft
		});
	}
	#d() {
		if (!this.config) return;
		let e = Number(this.presetDraft);
		if (!Number.isInteger(e) || e <= 0 || e > 80) return;
		let t = [.../* @__PURE__ */ new Set([...this.config.current_presets ?? z, e])].sort((e, t) => e - t);
		this.presetDraft = "", this.#e({
			...this.config,
			current_presets: t
		});
	}
	#f(e) {
		this.config && this.#e({
			...this.config,
			current_presets: (this.config.current_presets ?? z).filter((t) => t !== e)
		});
	}
	#p(e, t) {
		if (!this.config) return;
		let n = { ...this.config.entities ?? {} };
		t.trim() ? n[e] = t : delete n[e], this.#e({
			...this.config,
			entities: n
		});
	}
	render() {
		if (!this.config) return j;
		let e = at(this.config.language ?? this.hass?.locale?.language ?? this.hass?.language), t = V(e), n = Gt(e), r = Object.keys(this.hass?.entities ?? {}), i = this.hass ? _t(Object.values(this.hass.entities ?? {}), this.config.entity, this.config.entities, this.hass.states) : void 0, a = this.#o(), o = this.config.metrics ?? [...Xt], s = this.config.energy_sources ?? [...Z], c = this.config.current_presets ?? z, l = this.accentDraft !== "" && !/^#[0-9A-F]{6}$/.test(this.accentDraft), u = (this.config.display_mode ?? "standard") === "ultra_compact", d = {
			hero: H(t, "editor.showCharger"),
			metrics: n.metrics,
			controls: H(t, "editor.showControls"),
			energy: H(t, "editor.showEnergyFlow"),
			advanced: H(t, "editor.showAdvanced")
		}, f = {
			power: H(t, "labels.power"),
			energy: H(t, "labels.energy"),
			time: H(t, "labels.time")
		}, p = {
			solar: H(t, "flows.solar"),
			grid: H(t, "flows.grid"),
			home: H(t, "flows.home"),
			battery: H(t, "flows.battery"),
			charger: H(t, "flows.charger")
		};
		return k`
      <div class="editor">
        <details class="group" open>
          <summary>${n.general}</summary><div class="group-body">
            <label><span>${H(t, "editor.entity")}</span><input data-field="entity" list="v2c-entities" .value=${this.config.entity} @change=${(e) => this.#t("entity", e.target.value)} /></label>
            <div class="grid">
              <label><span>${H(t, "editor.name")}</span><input data-field="name" .value=${this.config.name ?? ""} @change=${(e) => this.#t("name", e.target.value)} /></label>
              <label><span>${H(t, "editor.location")}</span><input data-field="location" .value=${this.config.location ?? ""} @change=${(e) => this.#t("location", e.target.value)} /></label>
              <label><span>${H(t, "editor.language")}</span><select data-field="language" .value=${this.config.language ?? "auto"} @change=${(e) => this.#t("language", e.target.value)}><option value="auto">${n.automatic}</option>${rt.map((e) => k`<option .value=${e}>${Jt[e]}</option>`)}</select></label>
              <label><span>${H(t, "editor.theme")}</span><select data-field="theme" .value=${this.config.theme ?? "auto"} @change=${(e) => this.#t("theme", e.target.value)}><option value="auto">${H(t, "editor.themeAuto")}</option><option value="light">${H(t, "editor.themeLight")}</option><option value="dark">${H(t, "editor.themeDark")}</option></select></label>
            </div>
            <div class="field"><span class="field-title">${H(t, "editor.displayMode")}</span><div class="choices">${[
			["xxl", n.modeXxl],
			["standard", H(t, "editor.modeStandard")],
			["compact", H(t, "editor.modeCompact")],
			["ultra_compact", H(t, "editor.modeUltra")]
		].map(([e, t]) => k`<button type="button" class="choice" data-field="display_mode" data-value=${e} aria-pressed=${String((this.config?.display_mode ?? "standard") === e)} @click=${() => this.#t("display_mode", e)}><span class="layout-icon" data-kind="centered"></span>${t}</button>`)}</div></div>
          </div>
        </details>

        <details class="group" open>
          <summary>${n.appearance}</summary><div class="group-body">
            <div class="field"><span class="field-title">${n.layout}</span><div class="choices">${[
			["auto", n.automatic],
			["centered", n.centered],
			["split", n.split],
			["inline", n.inline]
		].map(([e, t]) => k`<button type="button" class="choice" data-field="layout" data-value=${e} aria-pressed=${String((this.config?.layout ?? "auto") === e)} @click=${() => this.#t("layout", e)}><span class="layout-icon" data-kind=${e}></span>${t}</button>`)}</div></div>
            <div class="field"><span class="field-title">${n.colorScheme}</span><div class="swatches">${[
			[
				"monochrome",
				n.monochrome,
				"#808080"
			],
			[
				"v2c_blue",
				n.v2cBlue,
				"#0067D9"
			],
			[
				"teal",
				n.teal,
				"#00897B"
			],
			[
				"green",
				n.green,
				"#2E7D32"
			],
			[
				"violet",
				n.violet,
				"#6A4BBC"
			],
			[
				"custom",
				n.custom,
				this.config.accent_color ?? "#0067D9"
			]
		].map(([e, t, n]) => k`<button type="button" class="swatch" style=${`--swatch:${n}`} title=${t} aria-label=${t} aria-pressed=${String((this.config?.color_scheme ?? "monochrome") === e)} @click=${() => this.#l(e)}></button>`)}</div></div>
            ${this.config.color_scheme === "custom" ? k`<div class="field"><span class="field-title">${n.accentColor}</span><div class="color-row"><input data-field="accent_picker" type="color" .value=${/^#[0-9A-F]{6}$/.test(this.accentDraft) ? this.accentDraft : "#0067D9"} @input=${(e) => this.#u(e.target.value)} /><input data-field="accent_color" inputmode="text" .value=${this.accentDraft} @input=${(e) => this.#u(e.target.value)} /></div><p class="help">${n.accentHelp}</p>${l ? k`<p class="error" role="alert">${n.invalidHex}</p>` : j}</div>` : j}
            <div class="field"><span class="field-title">${n.surface}</span><div class="chips">${[
			["solid", n.solid],
			["tinted", n.tinted],
			["transparent", n.transparent]
		].map(([e, t]) => k`<button type="button" class="chip" aria-pressed=${String((this.config?.surface_style ?? "solid") === e)} @click=${() => this.#t("surface_style", e)}>${t}</button>`)}</div></div>
            <div class="grid">
              <label><span class="field-title">${n.heroScale}</span><div class="range-row"><input data-field="hero_scale" type="range" min="0.75" max="1.25" step="0.05" .value=${String(this.config.hero_scale ?? 1)} @input=${(e) => this.#r("hero_scale", e.target.value)} /><output>${Math.round((this.config.hero_scale ?? 1) * 100)}%</output></div></label>
              <label><span class="field-title">${n.cardRadius}</span><div class="range-row"><input data-field="card_radius" type="range" min="0" max="40" step="1" .value=${String(this.config.card_radius ?? 20)} @input=${(e) => this.#r("card_radius", e.target.value)} /><output>${this.config.card_radius ?? 20}px</output></div></label>
            </div>
          </div>
        </details>

        <details class="group" open>
          <summary>${n.contentOrder}</summary><div class="group-body">
            <div class="field"><span class="field-title">${n.metrics}</span><div class="chips">${Xt.map((e) => k`<button type="button" class="chip" data-metric=${e} aria-pressed=${String(o.includes(e))} @click=${() => this.#i(e)}>${f[e]}</button>`)}</div></div>
            <div class="field"><span class="field-title">${n.energySources}</span><div class="chips">${Z.map((e) => k`<button type="button" class="chip" data-source=${e} aria-pressed=${String(s.includes(e))} @click=${() => this.#a(e)}>${p[e]}</button>`)}</div></div>
            <div class="field"><span class="field-title">${n.sectionOrder}</span><ol class="order-list">${a.map((e, t) => k`<li class="order-item" data-order=${e}><span class="order-index">${t + 1}</span><span>${d[e]}</span><button type="button" class="icon-button" aria-label=${`${n.moveUp}: ${d[e]}`} ?disabled=${t === 0} @click=${() => this.#s(t, -1)}>Ã¢â€ â€˜</button><button type="button" class="icon-button" aria-label=${`${n.moveDown}: ${d[e]}`} ?disabled=${t === a.length - 1} @click=${() => this.#s(t, 1)}>Ã¢â€ â€œ</button></li>`)}</ol><button type="button" class="reset" @click=${() => this.#c()}>${n.resetOrder}</button></div>
            <div class="checks">${Qt.map(([e, n]) => k`<label><input data-field=${e} type="checkbox" .checked=${this.#n(e)} ?disabled=${e === "show_charger" && u} @change=${(t) => this.#t(e, t.target.checked)} /><span>${H(t, n)}</span></label>`)}<label><input data-field="show_header" type="checkbox" .checked=${this.config.show_header !== !1} @change=${(e) => this.#t("show_header", e.target.checked)} />${n.header}</label><label><input data-field="show_badges" type="checkbox" .checked=${this.config.show_badges !== !1} @change=${(e) => this.#t("show_badges", e.target.checked)} />${n.badges}</label><label><input data-field="show_presets" type="checkbox" .checked=${this.config.show_presets !== !1} @change=${(e) => this.#t("show_presets", e.target.checked)} />${n.presets}</label></div>
            ${u ? k`<p class="help" data-help="ultra-artwork">${Yt[e]}</p>` : j}
          </div>
        </details>

        <details class="group">
          <summary>${n.advanced}</summary><div class="group-body">
            <div class="field"><span class="field-title">${n.intensityControl}</span><div class="chips">${[
			["slider", n.slider],
			["presets", n.presets],
			["both", n.both]
		].map(([e, t]) => k`<button type="button" class="chip" aria-pressed=${String((this.config?.intensity_control ?? "both") === e)} @click=${() => this.#t("intensity_control", e)}>${t}</button>`)}</div></div>
            <label><span class="field-title">${n.flowThreshold}</span><input data-field="flow_threshold_w" type="number" min="0" .value=${String(this.config.flow_threshold_w ?? 50)} @input=${(e) => this.#r("flow_threshold_w", e.target.value)} /></label>
            <div class="field"><span class="field-title">${n.currentPresets}</span><div class="preset-list">${c.map((e) => k`<span class="preset-token">${e} A<button type="button" aria-label=${`${n.removePreset} ${e} A`} @click=${() => this.#f(e)}>Ãƒâ€”</button></span>`)}</div><div class="preset-editor"><input data-field="preset_draft" type="number" min="1" max="80" step="1" placeholder=${n.amps} .value=${this.presetDraft} @input=${(e) => this.presetDraft = e.target.value} @keydown=${(e) => {
			e.key === "Enter" && (e.preventDefault(), this.#d());
		}} /><button type="button" data-action="add-preset" @click=${() => this.#d()}>${n.addPreset}</button></div></div>
            <div class="checks"><label><input data-field="advanced_open" type="checkbox" .checked=${this.config.advanced_open === !0} @change=${(e) => this.#t("advanced_open", e.target.checked)} />${n.openAdvanced}</label><label><input data-field="confirm_lock" type="checkbox" .checked=${this.config.confirm_lock !== !1} @change=${(e) => this.#t("confirm_lock", e.target.checked)} />${n.confirmLock}</label><label><input data-field="invert_grid_power" type="checkbox" .checked=${this.config.invert_grid_power === !0} @change=${(e) => this.#t("invert_grid_power", e.target.checked)} />${n.invertGrid}</label><label><input data-field="invert_battery_power" type="checkbox" .checked=${this.config.invert_battery_power === !0} @change=${(e) => this.#t("invert_battery_power", e.target.checked)} />${n.invertBattery}</label><label><input data-field="invert_solar_power" type="checkbox" .checked=${this.config.invert_solar_power === !0} @change=${(e) => this.#t("invert_solar_power", e.target.checked)} />${n.invertSolar}</label></div>
          </div>
        </details>

        <details class="group">
          <summary>${n.entities}</summary><div class="group-body"><p class="help">${n.entityOverrides}</p>${i?.diagnostic ? k`<p class="help" data-diagnostic=${i.diagnostic}>${i.diagnostic.replaceAll("_", " ")}</p>` : j}${i?.legacyRoles.length ? k`<p class="help" data-diagnostic="legacy">legacy: ${i.legacyRoles.join(", ")}</p>` : j}<div class="grid">${Dt.map((t) => {
			let r = i?.statuses[t] ?? "missing";
			return k`<label><span>${Kt(e, t)}</span><input data-role=${t} list="v2c-entities" .value=${this.config?.entities?.[t] ?? ""} @change=${(e) => this.#p(t, e.target.value)} /><small class="entity-status" data-status=${r}>${qt(n, r)}</small></label>`;
		})}</div></div>
        </details>
        <datalist id="v2c-entities">${r.map((e) => k`<option value=${e}></option>`)}</datalist>
      </div>`;
	}
};
Y([L({ attribute: !1 })], Q.prototype, "hass", void 0), Y([R()], Q.prototype, "config", void 0), Y([R()], Q.prototype, "accentDraft", void 0), Y([R()], Q.prototype, "presetDraft", void 0);
//#endregion
//#region src/index.ts
var $ = "v2c-trydan-card", $t = "v2c-trydan-card-editor";
customElements.get($) || customElements.define($, X), customElements.get($t) || customElements.define($t, Q), window.customCards = window.customCards ?? [], window.customCards.some((e) => e.type === $) || window.customCards.push({
	type: $,
	name: "V2C Trydan Card",
	description: "Home Assistant V2C Trydan EV charger card with visual editor, controls and energy monitoring.",
	documentationURL: "https://github.com/mactron254/v2c-trydan-card#readme",
	preview: !0,
	getEntitySuggestion: (e, t) => {
		let n = e.entities?.[t];
		return n?.platform === "v2c" && n.device_id ? { config: {
			type: "custom:v2c-trydan-card",
			entity: t
		} } : null;
	}
});
//#endregion
export { X as V2cTrydanCard, Q as V2cTrydanCardEditor };
