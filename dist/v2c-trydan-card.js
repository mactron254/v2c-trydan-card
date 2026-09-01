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
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, ee = g ? g.emptyScript : "", te = h.reactiveElementPolyfillSupport, _ = (e, t) => e, v = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ee : null;
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
}, ne = (e, t) => !l(e, t), re = {
	attribute: !0,
	type: String,
	converter: v,
	reflect: !1,
	useDefault: !1,
	hasChanged: ne
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = re) {
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
		return this.elementProperties.get(e) ?? re;
	}
	static _$Ei() {
		if (this.hasOwnProperty(_("elementProperties"))) return;
		let e = m(this);
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
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? ne)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[_("elementProperties")] = /* @__PURE__ */ new Map(), y[_("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: y }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js
var ie = globalThis, ae = (e) => e, b = ie.trustedTypes, oe = b ? b.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, se = "$lit$", x = `lit$${Math.random().toFixed(9).slice(2)}$`, ce = "?" + x, le = `<${ce}>`, S = document, C = () => S.createComment(""), w = (e) => e === null || typeof e != "object" && typeof e != "function", ue = Array.isArray, de = (e) => ue(e) || typeof e?.[Symbol.iterator] == "function", fe = "[ 	\n\f\r]", T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pe = /-->/g, me = />/g, E = RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), he = /'/g, ge = /"/g, _e = /^(?:script|style|textarea|title)$/i, ve = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), D = ve(1), ye = ve(2), O = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), be = /* @__PURE__ */ new WeakMap(), A = S.createTreeWalker(S, 129);
function xe(e, t) {
	if (!ue(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return oe === void 0 ? t : oe.createHTML(t);
}
var Se = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = T;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === T ? c[1] === "!--" ? o = pe : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = E) : (_e.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = E) : o = me : o === E ? c[0] === ">" ? (o = i ?? T, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? E : c[3] === "\"" ? ge : he) : o === ge || o === he ? o = E : o === pe || o === me ? o = T : (o = E, i = void 0);
		let d = o === E && e[t + 1].startsWith("/>") ? " " : "";
		a += o === T ? n + le : l >= 0 ? (r.push(s), n.slice(0, l) + se + n.slice(l) + x + d) : n + x + (l === -2 ? t : d);
	}
	return [xe(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, Ce = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = Se(t, n);
		if (this.el = e.createElement(l, r), A.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = A.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(se)) {
					let t = u[o++], n = i.getAttribute(e).split(x), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? De : r[1] === "?" ? Oe : r[1] === "@" ? ke : Ee
					}), i.removeAttribute(e);
				} else e.startsWith(x) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (_e.test(i.tagName)) {
					let e = i.textContent.split(x), t = e.length - 1;
					if (t > 0) {
						i.textContent = b ? b.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], C()), A.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], C());
					}
				}
			} else if (i.nodeType === 8) if (i.data === ce) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(x, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += x.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = S.createElement("template");
		return n.innerHTML = e, n;
	}
};
function j(e, t, n = e, r) {
	if (t === O) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = w(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = j(e, i._$AS(e, t.values), i, r)), t;
}
var we = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? S).importNode(t, !0);
		A.currentNode = r;
		let i = A.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new Te(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ae(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = A.nextNode(), a++);
		}
		return A.currentNode = S, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, Te = class e {
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
		e = j(this, e, t), w(e) ? e === k || e == null || e === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : e !== this._$AH && e !== O && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? de(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== k && w(this._$AH) ? this._$AA.nextSibling.data = e : this.T(S.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Ce.createElement(xe(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new we(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = be.get(e.strings);
		return t === void 0 && be.set(e.strings, t = new Ce(e)), t;
	}
	k(t) {
		ue(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(C()), this.O(C()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = ae(e).nextSibling;
			ae(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, Ee = class {
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
		if (i === void 0) e = j(this, e, t, 0), a = !w(e) || e !== this._$AH && e !== O, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = j(this, r[n + o], t, o), s === O && (s = this._$AH[o]), a ||= !w(s) || s !== this._$AH[o], s === k ? e = k : e !== k && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, De = class extends Ee {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === k ? void 0 : e;
	}
}, Oe = class extends Ee {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== k);
	}
}, ke = class extends Ee {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = j(this, e, t, 0) ?? k) === O) return;
		let n = this._$AH, r = e === k && n !== k || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== k && (n === k || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ae = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		j(this, e);
	}
}, je = ie.litHtmlPolyfillSupport;
je?.(Ce, Te), (ie.litHtmlVersions ??= []).push("3.3.3");
var Me = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new Te(t.insertBefore(C(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, Ne = globalThis, M = class extends y {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Me(t, this.renderRoot, this.renderOptions);
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
M._$litElement$ = !0, M.finalized = !0, Ne.litElementHydrateSupport?.({ LitElement: M });
var Pe = Ne.litElementPolyfillSupport;
Pe?.({ LitElement: M }), (Ne.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js
var Fe = {
	attribute: !0,
	type: String,
	converter: v,
	reflect: !1,
	hasChanged: ne
}, Ie = (e = Fe, t, n) => {
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
function Le(e) {
	return (t, n) => typeof n == "object" ? Ie(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js
function N(e) {
	return Le({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region src/assets/trydan/body.webp
var Re = "data:image/webp;base64,UklGRvIRAABXRUJQVlA4WAoAAAAQAAAA4gEAWwIAQUxQSOIEAAARoMUAsOI2mlG9cqw0pLq0qsIpMzMzc3PMzMzMVHJyVGZmZmb2lVzmXpSUnK5ira2Zg/TzPc3hi4gJAON/QUX51DlELEVMEVG3EP5cxrIsq6ydKpwV4izL8iD8GbUKwEpKrdV1WG5u7rPDx8jmz58+nJubO7h1jh1fBrTaW6nxkNfz5+w4HgqFLoQjslly7XQoFDqydurwp3vWSPHoEpate/cXiw9fdVxiQSU3fGHP9Dd7pVs6hAl1H5t65FqU/0ylSgeVyn+OXN05sn+6V3cwoe5j00MOMzMRCysRM9ON3SP7p1ta40m/f2rIYWZioSVmurF7RLcU1BZMaPXFAYeFl5jp2upnq3s1Be37510lFmH3eF6nBC3x1n59t8NSTNcW3F0F9cNqnn/aZUG+vef1dNQNq/mYApbl2JE301EvvM3HFLA0R4+8mYE64Wn8cwGJE0ePvF5FIzDt8yvEAh3bd3+CPvifCBKLtLO4s1cXvD3XuSzU136sgXqANX68wWJ98gW/HvhfPEly5a7r6dUBT8c1Lgv2tUCWDlT88FcmwaL9Q+LU5+m0LsqiHc7PUl+lD39l2ab9Q+JU5+m0LipcfDM/W20I/nd/ZemmfQMtxdWb50oXceGHfkCFgTU4yPLtzq0HCkco914hk3QRHRxoKS17YgmLN/GVlxMAlQXYbgNJWHF+qso8Aw8ziRdzdF5tdSEkPH9RxGhrJwR1VRoeljDiU/d7FWYHHBk798g/xB5WWfrPDgs48cVn4wEVBdhsZUzGwt/aCuu5j2XcnZqtsv1MMjY9x/jP+M/4z/jP+M/4z/jP+M/4z/jP+M/4z/jP+M/4z/jP+M/4z/jP+M/4z/jP+M/4z/jP+M/4z/jP+M/4z/jP+M/4z/jP+M/4z/jP+M/4z/jP+M/4z/jP+M/4z/jP+M/4z/jP+O/vQh23Eou483O6shCqT49IGPGvbyYrzA44MnbuUS+oujQSsUf+7jJayh5WWbn3CiSM+cBAj7IAvPeGRCy2rBEovEz33Szhkck5gOqCevNc+SIu+tCvMAR7eFjCTj4YB+pGiH/sNJN0cWxtW1QYALZdRyzcxOFAKqDCEFIDYfk6/ZhPaQC+e4IkXBxZ0BRB8dXGFEvXuRdTQPW+e4MkW5EFTVF5UG1MWLbOvZgM6vfdEyTJiixoihqA2aOLBIuOPJkMOmh1WhmRq6LROagFkPL0MZIqd2UnC/QQc4ZfFapo8IkU0EWr+czbMnXxozTUBogfvLlEoq5NaISgj+h/YEtEnKhoSrs40En0P7A5Ik3XprbzgWb6H9h8mySJCqa0iwPt9A+ZcYXkyD3ybSsf6CfGNx9+LCJCxBze8mKWBVpq5Ty9sojEh5ijZyf0r4igqZjSeXSwmESHmGOFG9+o5wON9ebcM+aXYmImkSFmjhVu/rxbRQStRV+1e8YEw8TMTKVKCJXKzOwWbP68m22B/vqq3RNYdzrs8p1JOPmOFLl2eOFH3W0L9NiX2vaJ4fP2hAodx3Fcls5YieM4xZeObJ7yUW7DChboM8bb9brf+14gLy9v+tYDsrl/zdhAXt6Il4d0rOb3gk4jAABa5Wzbtmt07CWbPVtm2LZtJ3gQAAA1CgAQ7oziCXdEBB3HUkE8sVQw/jf+N/43/jf+N/43/jf+N/43/v/PU1ZQOCDqDAAA0HsAnQEq4wFcAj49HI1FIiEhkFhcjCADxLS3eRlcp/t84rSn+Kc9KzOfG2CGgSB3IvFn+E9l/oQ8wD9Tekf5gP1I/aD3oPQr6AH6fdYj6AH8R/t3//9cL9ofgm/br9wPgH/l39h/8vWAdS+rX/Pfifl6eUXEHMD/M+ZOmS/LfQg/qv/D9Qb/Z+5n3N/U3sFfy7+r/8nrmftL7C36oBiLomBQXpXKw3QhbFARWri3VF0BblnQDa20/ewqtJhzdmq6iMqakqcf+HYt0j+V4cNF7xJYod0nXBx91VMAsUuA1+1T7WNwQq7H/aZRTuGRzxGW44J5SsFlViicujwwKi/mFRpaaHTcjjE37982aENv41NqbU2ptTamvHyURbsV7WXN2m8HTUG9D1j/Xck0nXDpuTcmo4Vo+f6wsvdGqgGi0oDPifEy3h1gLAj2puTcAffbIrifE+J9TcT4nnVX0gqRL1Qze15O8zSM+J8T4nxPiefiLP4nxLjQrPdekN4Re6Trh03Jqv7Qk64NyKrJGnxPifE+J8T4mHTQOHTVmiqfE+J8T4nxPhJ2aTamvDEN2xrhF7pOuHTcm36rcsFSJercZ4dNybk3JuTckHGcaTrWtnibk3JuTcm5Nv1W5YKkS9S5cyM7qRL3SdcOm5NwOOcnXDhBWcB1w40hG2Je6TrgyJIs/ifExHTXCLzBuzLrfdSnLh01X0mx5J6W1Npk0vuk64dNybk3JqIkiFLsXpGUXujecS8bmeEXuk64dHoJRi5ngnR26jh03JuTcm5HoJRi5ngnR26jh03JuTcm5HoIxoGyqJuTVmiqfE+J8T4nxPhAyQzZ1i90mdvabk3JuTcm5NyQcn04nwlihJe6Trh03JuTURn+zk64b4qQsQbYZNqbU2ptTam0x/aEnXB48XXDpuTcm5Nyar+0JOuDx4uuHTcm5Nybk1X9oSdcHjxdcOm5Nybk3JqvrWzgJ18T4OMyxgt9hF7pOuHTcm5IN4hh01gLAOHMxhT+6kS90nXDpuTcDjnJ1w3yNa2tXdoSdcOm5Nybk2/X3/wv1HOQ9qbS+9WRCcp9Bj5mW3hF7pOuHTcmqBZyYuNRQbZw5vJvCG3Cy54oqHuAviazFQRIZSsRVlQbIxWU4F62kuawiedx7LmsVJQQlWdvdl6I8hyR6jh01aYLBHYfxt0e86i8XNZBd8tcLWXxSzsi7bmt7xzv7TOIFU5HDDqXfWUf8sn3hF7pOuHTcm5Nybk3JuTcm5Nybk3JuTcm5Nybk3JuTcm5Nybk3JuTcm5Nybk3JuTcm5Nybk3JuTcm5Nybk3JuTcm5Nybk3JuTcmoAAP7/ugZf3jRZNQ56v4Pj49oBZKRW/SGk1Na2UAHXWg/7fI1KXhrAIh2aEnYje9w84d2cltz5I9Y23jvsLkKMIONujQIc3m3g5NaVBAfUr7zBh8X25SJDdaoFe1iW4gXwuYtW51loc0/5/7oMVsqAOxFtMCIxbuZOYmy3TUBzMIiJz8MIdv0eR7ymkoqgL7BksbGF7S4g+Au/qOeDg8b7K+8+71ixRsuf2bOZq5rjVb+nfhkcS7f85p5qZ4qOMtdNHo/QY1feTj2Vv4pfxU9NiuBpvJfeg3wGsm/EqWxgP1Nc7SPD7DZ+mjL+tVysYT31vmjyb2H+pObiNCi3+Ez5ygxHOuGpf9Ufl/4P/nCbCEolqp/K//lVUfNkuj64PB07phyukKfZYOsMlAHbfdOwRHY7DrL343krUjDAK3pDASvNeDBMF0SgOZq8HXMYaKl9yaRBkYK2olw3Cwv/+R4HXbPNUxb8y9TcAHVIhn8u1KCfdGn0UUH6J3TxbRU4HWV3p7J3wNewKlpJuTCY8eJUBrRYbxIJKalvFyVRyb7TisohazZUn1fq9W8VvY7JYY5FlaTlX9pGy4lypr0rXa3LPC8eZJIfX5XLd/AWopPk6Fhcxv66Va8SDI3SLfIvFrc6AhsGJxyaKM0K0j6jFI/go0eBWQcLzzWM/Bpna7z6Lm4UvXX+t3mJG3qC7+HKlmzzVy4Ojt5dxzzZOA3Fmr+z+J45tV9epoZHFn/EhTGWpSgOwgMhoao4IuX/Hnpukex0RP/T14p3tdJZffHsB0DDMW7F5A1s/gyFkuaLGxnyIUcxAqg5DuEOQI1xoEd5Q1pkGbMxkHTGmfebfhbLcXgoA37t1YhUy93wX1uxeeo3DvkpplDMWuCjv1EggHwbXdPSdDM6FbRBR/2dl2svs+MVsOQL3anpPf1ZYkTqSeI++p/xMNkdj7YX/oifvApL7/bjOSJ8m78D0UlsKEW029yCJ+qzx+Xprei69v0qcKj49DSOqxguzhcYXBvZOyWcganlSVobZwoc7geenu1o+R+kQmxaPUq7K6QqxLkYZ0mIAJsAlL0Gs6IXGZOQKAJTCgSQJJC/GQf57JMx8FZHr/3+rPa2CN/5cjhoO8RrUTyutDm6K0euPOC7EtC9XKXisVZkjdaJr6Y8L5Dx1F4Gc/wpcGNVaF1clNMDxWKk9ljSq0HP9R+BDA0P+eIMKTDSjdTone56H+HutQUPOSqmx67e86nN1qpDNo+x9oQW8BKLpkXF6U8xJK9rN67R3oeB+6GiPv3KmVDXwCRi7pbBuGAnnP86KIdkmLMCjOGa8aM8mevIvlUaYlCQuBTEzqbMzBYZkubKvtUKWZBmsFl6MUFi9111/MO6bCyFFKleNuFh3m6fzt7tcf/XPiZBKMXRBTS1M+qVBCU1YjDbIauD8BP72XNGOxjvTI7tIv+YvIOCC3uX0XJhbe6bg4TxklCpL1Cq3GDrNw6CYvdjqCN9k8bSyTS+NC18v7NbOdILSNVTQatUddmtSJNmfWzhM0wKjVUQ7sXRn8499UhUv0HZY5+NMgu09r9Xf7+YIDOwuDFSwZ0lQHCK362gB7rt80WBl7r4CkaiWdCbBPPyB2Z01fSYYgfo3ABEOmtRSgdxarEEoWDYFyqdg+v/9aiCu3yJAcFq9KLfLMKBjADWOsgXIrIamaJ9IGotyS0gLWRgMPqm44SMNgksnouc+bb5alOBztD5sFNMFg0fRoJF457yGnqnj0XtJVEQUh0hrxqCiRoJsMIP6SkGlAxj/BGzUQE9Mv3zbKeOFssWEKFdZdNjt4YT+t1KoN81JeGdW85BIx06K5/FjzbrRXR7QbEvIGMiT5CQVhlQs7Noo+9M3L8SIHcPa/4Gi/7/w6pGrU05+8vjnx1NHiWvJVZAlX/gQtxm1Sd5CKLko4W7pWBCP3vJhFriOaXpRAGEAlzogDzTvVuC63SXHy1oIRvyQPMhlsOih/344juiCnd8U+ZyrA57/tHkD7PsR2LVVov9xBtsgQ9J/8v5H3Bw8yAGaQ6SZmcBOumbxEe1gTPkHt/W6ntsc5CpRkPn6mWlyMoICckicaW/jJm0rgSLMDndXgav3YB42+e3gJUWtzk5NUkD86OVBGzsDUS4bHZqd1ftBEh9n88nZ3r6K3O8Qez95XxRANqj2qCTXXNT6TkqNhsb1tn/7crSns2YKwP/uK1wRHhhsyh6YiVPblRI45XGf++8PkLL/G5ln8BxgFeEV9EsFqTrhRqHWfENSj8DsL9Y5AOddKkKix8cvLaw1YEwC8fsCbJL1cGsll/f6T1+Pn2Ci+lIN5ggpsc+STzZafVJ0Pn4t3EYrVbI3YxA1NsaPT9j8Q//+af/8s///q+Dc6Hc2M6kMb41Wh0Q3+ps9qGRJKgS4LqdWUawVpOX1IyKm3Erwv5vuhZkaBP8VxvzJO4taNlButwgxYd998d5lva2X2JzSgWb1ktefothqO1wnpn+EOdSrO6rt3wCtlQQvrqcvmzblt7WlIDivTvkAcKt6XponZDobl71kDE0MNgdktKmItycYd72z+L3lGeYRARQzyx4DU2Ta9jN30YNc8nRPh0USEizGMW7vShv5OmlPHA+XKESn76IRe69er2RTs3r6Q5anVr8iMFWtGtRGdjBCS5EBWKKQrxLZLyTuniS/rxjUT9kd42xXvJkQ63Yk/ZkFioSf83wbreupw94aa+bL/dxhiDP9mb4be59MTfexKdG75536ZqnS5rh1RPyHLpwsyrFlL9fc9CaMyDoIKBJEuO5y5VwIF3IaloHvZkLgN9xe/GkJJJC8Qwowx/QubiH5yM4rOK2GTPQ46GUwMoRsedYNCMDRCabZnT/eNQyY+kkrKb+Xy2X3tqLqarmfhSpm9dqoLWuXKus35VXVJr8AO3jc+CIVV3HN/tB1+CGuKvZzoWQcRPF9xO2Sb74ed502o4S77jG46XKPzOpOEwNmPfQB/7ALsHv6glQYCCK45pKGFbDONsJ8t7wXxpqURwQXuJQSBy4eM+yI1GroPrdMGKX5LL8mW4CDyXIE1/GrgAAAAAAAAAAAAAA", ze = "data:image/webp;base64,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358JOIlMnACLOknPcj37ZsMhxReHzVQtg6o8t7EBcBKROACLPlCqslzl5zegDqm+OGyhahmkJ4+sywBOIhEHyNKDJD3LVp5qg0PKL4LNVC2H6snuR8YD4uSKiROg6eFOkl5ZtrKvDQ6pvwg2KrUcUpXs3TQDgDiRURPnAKB1ywlSPUfR89j1cDBAEXyrQC2LVCVz7aumAIA4JxIkIs45jJz12IE8qZ6jqJ4918LBBMVh+Zf05ZHqSZ754OutDiNFxDnnRAQlpy155q9DJL1yNFW5/2o4WKGg9SBVyyPVK8l8z+uP3T6zAaGZKTcsefLlzixJeq8cVU99uQECO3QY/1vSa3kk1XuOvHj84I53XvjVr156p73jL0e+HOZITbxydFWZ/RogsEQHPPIFVUeDpKr3LF99ospR9+Sf2iACWxTBrHZSdVRGqqr3SVHvvaoqr6Aqc/8yDgJ7dMCyHtLrKMWsSu6+ERBYpAgmbh0iVStKPdm3XuAERumA+bsTUrViVMnB56cAArsUgdy+JyG9VoR68sJrcwAH2xRA7txXIFU1MlUlc1tnAyIwTwFwx/s5kqoajaqSPPZMKyACCxUBcP3GzzypXvXKqaqSzP1+VTMgAisVJ0DDnS/1kaR6VR01VfVKMt+5aTYAJzBVcQAmr3ylt0CSqt7rKHrlyLP7vn+zA8QJzFWcAJiw6Km3ei5y1C+f3v+LVTMAwAmMVpwAQEPr8qe2f3To72cGhvJDg4ODgxdy2f6+z9p/sn5BC0Y6EViuiBMUHX/V9Flz582dO/fGG9taZ05tbkBR5wQWLOKcCMoX50Rgy1I+/ldLAFZQOCCOCgAA8HEAnQEq4wFcAj5JJJBGIqIhoSEzKEBQCQlpbuF2sRk4lwp6EdtbdgG8PeTM5N3czMkYg9sjym0xP+of77mx/m3+19g3+Wf07/p9i/0Hv1ZBv3pjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqagJjELjALqag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", P = {
	canvasWidth: 483,
	canvasHeight: 604,
	body: {
		x: 11,
		y: 12,
		width: 360,
		height: 501
	},
	logo: {
		x: 142,
		y: 109,
		width: 96,
		height: 41
	},
	display: {
		x: 142,
		y: 207,
		width: 98,
		height: 21
	}
}, F = {
	top: 252,
	bottom: 600,
	right: 424
};
function Be(e, t) {
	let { body: n } = P, r = n.x + n.width / 2, i = Math.max(n.width / 2 + 6, t ? F.right + 6 - r : 0), a = r - i, o = n.y - 13, s = P.display.y + P.display.height, c = e === "focus" ? t ? Math.min(s + 22, F.top) : s + 82 : e === "mid" ? Math.round((F.top + F.bottom) / 2 + 62) : Math.min(F.bottom + 12, P.canvasHeight);
	return {
		x: a,
		y: o,
		width: i * 2,
		height: c - o
	};
}
//#endregion
//#region src/assets/trydan/logo.ts
var Ve = {
	width: 378,
	height: 163
}, I = "M301.5 0.2 288 3.2 287 4.2 285 4.2 275.5 8.2 260.5 18.2 248.2 30.5 240.2 42.5 236.2 51 233.2 60 230.8 75 231.2 93.5 235.2 109.5 242.2 124 250.2 135 263.5 147.2 274.5 154.2 289.5 160.2 298 162.2 302.5 162.2 304.5 163.2 320 163.2 321 162.2 326.5 162.2 335 160.2 346 156.2 353.5 152.2 365 144.2 375.2 134 378.2 129.5 360.5 112.2 352.8 122 344 129.2 337 133.2 326 137.2 315.5 138.8 304 138.2 295 136.2 284 131.2 275.5 125.2 268.2 118 263.2 111 258.2 100.5 255.2 88 255.2 75 259.2 60 265.2 49 275.5 37.8 281.5 33.2 289 29.2 301 25.2 315 24.2 323.5 25.2 335.5 29.2 343 33.2 349 37.8 359.5 49.2 360.5 49.2 377.2 32 372.8 26.5 363 17.2 347 7.2 336.5 3.2 328.5 1.2 325 1.2 323.5 0.2 301.5 0.2Z M165 1.2 149 4.2 135.5 10.2 129.5 14.2 120.8 22.5 115.2 31 128.5 43.2 132 46.2 133 46.2 141.5 35.2 152.5 28.2 158 26.2 166.5 24.8 174.5 24.8 182 26.2 189.5 30.2 193.2 34 196.2 39 197.8 45.5 197.2 54.5 196.2 58 189.2 72 174.2 90 156 107.2 116.2 140 116.2 159 259 159.2 247.5 149.8 235.5 135.8 159.8 136 160.5 134.2 184 114.2 203.2 94 212.2 81.5 218.2 70 222.2 55.5 222.2 40 221.2 38.5 220.2 32 215.2 22 206 12.2 200 8.2 188 3.2 176.5 1.2 165 1.2Z M0.5 3.2 0.2 5.5 1.2 6 8.2 25 14.2 38 17.2 47 30.2 77 35.2 91 39.2 99 44.2 113 48.2 121 48.2 122.5 63.2 159 86 159.2 89.2 153 94.2 139 100.2 126 100.2 124.5 127.2 58.5 109 41.2 108.2 41.5 83.2 103 83.2 104.5 82.2 105.5 82.2 107 81.2 108 81.2 109.5 80.2 110.5 80.2 112 79.2 113 79.2 114.5 78.2 115.5 78.2 117 77.2 118 77.2 119.5 76.2 120.5 76.2 122 75.5 122.2 27.8 4 27 3.2 0.5 3.2Z M296 46.8 294 47.2 292.2 49 291.2 52 293.5 55.8 297.5 56.8 301.2 54 301.8 51 299 47.2 296 46.8Z M328.5 46.8 325.2 48.5 324.2 53 326 55.8 330 56.8 333.2 55 334.2 50.5 332 47.2 328.5 46.8Z M273 70.2 268.2 75 268.2 82 272.5 86.2 279.5 86.2 284.2 81.5 284.2 75.5 282.2 72.5 279 70.2 273 70.2Z M310 70.2 305.2 74.5 304.2 78 305.2 82.5 309.5 86.2 316.5 86.2 320.2 83 321.2 80.5 321.2 76 319.2 72.5 317.5 71.2 315.5 70.2 310 70.2Z M347 70.2 343.2 73 341.2 77 342.2 82.5 346 86.2 353.5 86.2 357.8 81.5 357.8 75.5 356.2 73 352.5 70.2 347 70.2Z M293.5 104.2 289.2 108 288.2 110 288.2 114.5 290.2 118 293 120.2 300 120.2 304.2 116 305.2 113 304.2 108.5 299.5 104.2 293.5 104.2Z M326.5 104.2 324.5 105.2 321.2 109 321.2 115.5 325.5 120.2 333 120.2 337.2 116 337.2 109 334 105.2 332 104.2 326.5 104.2Z", He = {
	" ": [
		0,
		0,
		0,
		0,
		0
	],
	0: [
		62,
		81,
		73,
		69,
		62
	],
	1: [
		0,
		66,
		127,
		64,
		0
	],
	2: [
		66,
		97,
		81,
		73,
		70
	],
	3: [
		33,
		65,
		69,
		75,
		49
	],
	4: [
		24,
		20,
		18,
		127,
		16
	],
	5: [
		39,
		69,
		69,
		69,
		57
	],
	6: [
		60,
		74,
		73,
		73,
		48
	],
	7: [
		1,
		113,
		9,
		5,
		3
	],
	8: [
		54,
		73,
		73,
		73,
		54
	],
	9: [
		6,
		73,
		73,
		41,
		30
	],
	A: [
		126,
		17,
		17,
		17,
		126
	],
	B: [
		127,
		73,
		73,
		73,
		54
	],
	C: [
		62,
		65,
		65,
		65,
		34
	],
	D: [
		127,
		65,
		65,
		34,
		28
	],
	E: [
		127,
		73,
		73,
		73,
		65
	],
	F: [
		127,
		9,
		9,
		9,
		1
	],
	G: [
		62,
		65,
		73,
		73,
		122
	],
	H: [
		127,
		8,
		8,
		8,
		127
	],
	I: [
		0,
		65,
		127,
		65,
		0
	],
	J: [
		32,
		64,
		65,
		63,
		1
	],
	K: [
		127,
		8,
		20,
		34,
		65
	],
	L: [
		127,
		64,
		64,
		64,
		64
	],
	M: [
		127,
		2,
		12,
		2,
		127
	],
	N: [
		127,
		4,
		8,
		16,
		127
	],
	O: [
		62,
		65,
		65,
		65,
		62
	],
	P: [
		127,
		9,
		9,
		9,
		6
	],
	Q: [
		62,
		65,
		81,
		33,
		94
	],
	R: [
		127,
		9,
		25,
		41,
		70
	],
	S: [
		70,
		73,
		73,
		73,
		49
	],
	T: [
		1,
		1,
		127,
		1,
		1
	],
	U: [
		63,
		64,
		64,
		64,
		63
	],
	V: [
		31,
		32,
		64,
		32,
		31
	],
	W: [
		127,
		32,
		24,
		32,
		127
	],
	X: [
		99,
		20,
		8,
		20,
		99
	],
	Y: [
		3,
		4,
		120,
		4,
		3
	],
	Z: [
		97,
		81,
		73,
		69,
		67
	],
	".": [
		0,
		0,
		64,
		0,
		0
	],
	",": [
		0,
		0,
		96,
		0,
		0
	],
	":": [
		0,
		0,
		20,
		0,
		0
	],
	"-": [
		8,
		8,
		8,
		8,
		8
	],
	"/": [
		32,
		16,
		8,
		4,
		2
	],
	">": [
		0,
		65,
		34,
		20,
		8
	],
	"%": [
		99,
		19,
		8,
		100,
		99
	],
	"+": [
		8,
		8,
		62,
		8,
		8
	],
	"*": [
		20,
		8,
		62,
		8,
		20
	]
}, L = 6, R = 8, z = {
	authentic: {
		columns: 16,
		rows: 2
	},
	mid: {
		columns: 12,
		rows: 2
	},
	big: {
		columns: 7,
		rows: 1
	}
};
function Ue(e, t, n, r = {
	x: 3.6,
	y: 2.6
}) {
	let { columns: i, rows: a } = z[e], o = Math.min((t - r.x) / (i * L), (n - r.y) / (a * R)), s = i * L * o, c = a * R * o;
	return {
		pitch: o,
		dot: o * .78,
		offsetX: (t - s) / 2,
		offsetY: (n - c) / 2
	};
}
function We(e) {
	return e.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ñ/g, "n").replace(/Ñ/g, "N").replace(/ç/g, "c").replace(/Ç/g, "C").replace(/æ/g, "ae").replace(/Æ/g, "AE").replace(/ø/g, "oe").replace(/Ø/g, "OE").replace(/ș/g, "s").replace(/Ș/g, "S").replace(/ț/g, "t").replace(/Ț/g, "T").replace(/º|ª/g, "").toUpperCase();
}
function Ge(e, t, n, r) {
	let { columns: i, rows: a } = z[t], o = Ue(t, n, r), { pitch: s, dot: c } = o, l = (s - c) / 2, u = /* @__PURE__ */ new Set();
	for (let t = 0; t < Math.min(e.length, a); t += 1) {
		let n = We(String(e[t] ?? ""));
		for (let e = 0; e < i; e += 1) {
			let r = He[n[e] ?? " "] ?? He[" "];
			for (let n = 0; n < 5; n += 1) for (let i = 0; i < 7; i += 1) r[n] >> i & 1 && u.add(`${e * L + n},${t * R + i}`);
		}
	}
	let d = (e, t) => `M${(e * s + l).toFixed(2)} ${(t * s + l).toFixed(2)}h${c.toFixed(2)}v${c.toFixed(2)}h-${c.toFixed(2)}z`, f = [], p = [];
	for (let e = 0; e < i * L - 1; e += 1) for (let t = 0; t < a * R - 1; t += 1) (u.has(`${e},${t}`) ? f : p).push(d(e, t));
	return {
		...o,
		on: f.join(""),
		off: p.join("")
	};
}
//#endregion
//#region src/card/charger-art.ts
function Ke(e) {
	let t = e.map((e) => We(e)), n = t.filter((e) => e.length > 0), r = t.reduce((e, t) => Math.max(e, t.length), 0);
	return n.length <= 1 && r <= z.big.columns ? "big" : r <= z.mid.columns ? "mid" : "authentic";
}
function qe(e) {
	let { crop: t, showConnector: n, connectorHoldered: r, lcdLines: i, flashSeconds: a, logoOff: o, state: s, flash: c } = e, l = Be(t, n), { canvasWidth: u, canvasHeight: d, logo: f, display: p } = P, m = f.width / Ve.width, h = p.width / 65, g = Ge(i, Ke(i), 65, 13.7);
	return D`<div
    class="charger-art"
    style=${(a ? `--v2c-flash:${a.toFixed(2)}s` : void 0) ?? ""}
    data-crop=${t}
    data-state=${s}
    ?data-flash=${c}
    data-connector=${n ? r ? "in" : "out" : "hidden"}
    aria-hidden="true"
  >
    ${ye`<svg
      viewBox="${l.x} ${l.y} ${l.width} ${l.height}"
      preserveAspectRatio="xMidYMin meet"
    >
      <defs>
        <filter id="v2c-glow-wide" x="-260%" y="-420%" width="640%" height="960%">
          <feGaussianBlur stdDeviation="15" />
        </filter>
        <filter id="v2c-glow-mid" x="-220%" y="-360%" width="560%" height="820%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="v2c-glow-tight" x="-220%" y="-360%" width="560%" height="820%">
          <feGaussianBlur stdDeviation="1.9" />
        </filter>
        <radialGradient id="v2c-backlight" cx=".5" cy=".5" r=".78">
          <stop offset="0" stop-color="#4a56ff" stop-opacity=".5" />
          <stop offset="1" stop-color="#0d1180" stop-opacity=".32" />
        </radialGradient>
      </defs>
      <image href=${Re} x="0" y="0" width=${u} height=${d} />
      ${n ? ye`<image class="charger-connector" href=${ze} x="0" y="0"
            width=${u} height=${d} />` : ""}
      ${o ? "" : ye`<g class="charger-logo-glow">
            <g filter="url(#v2c-glow-wide)" opacity=".3">
              <g transform="translate(${f.x} ${f.y}) scale(${m})">
                <path d=${I} fill="currentColor" fill-rule="evenodd" />
              </g>
            </g>
            <g filter="url(#v2c-glow-mid)" opacity=".55">
              <g transform="translate(${f.x} ${f.y}) scale(${m})">
                <path d=${I} fill="currentColor" fill-rule="evenodd" />
              </g>
            </g>
            <g filter="url(#v2c-glow-tight)" opacity=".5">
              <g transform="translate(${f.x} ${f.y}) scale(${m})">
                <path d=${I} fill="currentColor" fill-rule="evenodd" />
              </g>
            </g>
          </g>
          <g class="charger-logo" transform="translate(${f.x} ${f.y}) scale(${m})">
            <path d=${I} fill="currentColor" fill-rule="evenodd" />
          </g>`}
      <g class="charger-display" data-lcd=${i.join("|")}
        transform="translate(${p.x} ${p.y}) scale(${h})">
        <rect x="-1" y="-1" width="67" height="15.7" rx="2.8" fill="#0a0c14" />
        <rect width="65" height="13.7" rx="2" fill="#1b22b4" />
        <rect width="65" height="13.7" rx="2" fill="url(#v2c-backlight)" />
        <g transform="translate(${g.offsetX} ${g.offsetY})">
          <path d=${g.off} fill="#000" opacity=".16" />
          <path d=${g.on} fill="#dce4ff" opacity=".95" />
        </g>
        <rect width="65" height="13.7" rx="2" fill="none" stroke="#000" stroke-opacity=".45"
          stroke-width=".5" />
      </g>
    </svg>`}
  </div>`;
}
function Je(e, t) {
	let n = Be(e, t);
	return n.width / n.height;
}
//#endregion
//#region src/config.ts
var B = [
	6,
	10,
	13,
	16,
	20,
	25,
	32
], Ye = [
	"xxl",
	"standard",
	"compact",
	"ultra_compact"
], Xe = [
	"auto",
	"centered",
	"split",
	"inline"
], Ze = [
	"power",
	"energy",
	"time"
], Qe = [
	"solar",
	"grid",
	"home",
	"battery",
	"charger"
], $e = [
	"hero",
	"metrics",
	"controls",
	"energy",
	"advanced"
], et = [
	"focus",
	"mid",
	"full"
];
function V(e, t, n) {
	return typeof e == "string" && t.includes(e) ? e : n;
}
function tt(e, t) {
	return [...new Set(Array.isArray(e) ? e.filter((e) => typeof e == "string" && t.includes(e)) : t)];
}
function nt(e, t) {
	let n = tt(e, t);
	return [...n, ...t.filter((e) => !n.includes(e))];
}
function rt(e) {
	if (!e || typeof e != "object") throw Error("V2C Trydan Card: configuración no válida");
	if (!e.entity || typeof e.entity != "string") throw Error("V2C Trydan Card: debes indicar una entidad V2C principal");
	let t = Array.isArray(e.current_presets) ? e.current_presets : B, n = [...new Set(t)].map(Number).filter((e) => Number.isFinite(e) && e > 0).sort((e, t) => e - t), r = V(e.display_mode, Ye, "standard"), i = typeof e.accent_color == "string" && /^#[0-9a-fA-F]{6}$/.test(e.accent_color) ? e.accent_color.toUpperCase() : void 0;
	return {
		...e,
		type: "custom:v2c-trydan-card",
		theme: V(e.theme, [
			"auto",
			"light",
			"dark"
		], "auto"),
		display_mode: r,
		language: e.language ?? "auto",
		layout: V(e.layout, Xe, "auto"),
		color_scheme: e.color_scheme === "custom" && !i ? "monochrome" : V(e.color_scheme, [
			"monochrome",
			"v2c_blue",
			"teal",
			"green",
			"violet",
			"custom"
		], "monochrome"),
		accent_color: i,
		surface_style: V(e.surface_style, [
			"solid",
			"tinted",
			"transparent"
		], "solid"),
		hero_scale: Math.min(1.25, Math.max(.75, Number(e.hero_scale) || 1)),
		card_radius: Number.isFinite(e.card_radius) ? Math.min(40, Math.max(0, Number(e.card_radius))) : void 0,
		metrics: tt(e.metrics, Ze),
		energy_sources: tt(e.energy_sources, Qe),
		intensity_control: V(e.intensity_control, [
			"slider",
			"presets",
			"both"
		], "both"),
		section_order: nt(e.section_order, $e),
		show_header: e.show_header ?? !0,
		show_badges: e.show_badges ?? !0,
		show_presets: e.show_presets ?? r !== "ultra_compact",
		advanced_open: e.advanced_open ?? !1,
		show_energy_flow: e.show_energy_flow ?? !1,
		show_controls: e.show_controls ?? !0,
		show_advanced: e.show_advanced ?? !0,
		show_charger: e.show_charger ?? !0,
		charger_art: V(e.charger_art, et, "focus"),
		show_connector: e.show_connector ?? !1,
		confirm_lock: e.confirm_lock ?? !0,
		flow_threshold_w: Number.isFinite(e.flow_threshold_w) ? Math.max(0, Number(e.flow_threshold_w)) : 50,
		current_presets: n,
		entities: e.entities && typeof e.entities == "object" && !Array.isArray(e.entities) ? { ...e.entities } : {}
	};
}
function it(e) {
	let t = Object.values(e?.entities ?? {}).find((e) => e.platform === "v2c" && e.translation_key === "connected"), n = Object.keys(e?.states ?? {}).find((e) => e.startsWith("binary_sensor.") && e.toLowerCase().includes("v2c"));
	return {
		type: "custom:v2c-trydan-card",
		theme: "auto",
		display_mode: "standard",
		entity: t?.entity_id ?? n ?? "binary_sensor.v2c_connected"
	};
}
//#endregion
//#region src/localization/ca.ts
var at = {
	states: {
		disconnected: "Sense vehicle",
		unavailable: "No disponible",
		charging: "Carregant",
		complete: "Càrrega completa",
		timer: "Càrrega programada",
		updating: "Actualitzant",
		control_pilot: "Error Control Pilot",
		load_balancing: "Error Load Balancing",
		error: "Error del carregador",
		waiting_power: "Vehicle connectat",
		wifi_connected: "Wi-Fi connectat",
		wifi_connecting: "Connectant Wi-Fi"
	},
	details: {
		disconnected: "Trydan preparat",
		unavailable: "Revisa la entitat principal",
		charging: "Energia cap al vehicle",
		complete: "Ja pots desconnectar el vehicle",
		timer: "El temporitzador és actiu",
		updating: "No desconnectis el carregador",
		control_pilot: "Revisa la comunicació amb el vehicle",
		load_balancing: "Revisa el balanceig local",
		error: "Revisa el diagnòstic",
		waiting_power: "Esperant inici o potència",
		wifi_connected: "Connexió restablerta",
		wifi_connecting: "Intentant connectar"
	},
	badges: {
		paused: "Pausada",
		locked: "Blocat",
		timer: "Temporitzador",
		waiting_power: "Esperant potència"
	},
	labels: {
		brand: "V2C · TRYDAN",
		now: "ara",
		session: "Sessió",
		power: "Potència",
		energy: "Energia",
		time: "Temps",
		intensity: "Intensitat de càrrega",
		advanced: "Ajustos Trydan",
		chargingControls: "Càrrega",
		energyControls: "Energia dinàmica",
		lightControls: "Il·luminació",
		unavailableEntity: "Entitat no disponible",
		actionPending: "Aplicant el canvi",
		actionDone: "Canvi confirmat",
		actionFailed: "No s'ha pogut aplicar el canvi",
		additionalStatus: "Estat addicional",
		energyFlow: "Flux energètic",
		voltage: "Voltatge",
		diagnostics: "Diagnòstic",
		configuration: "Configuració"
	},
	actions: {
		pause: "Pausa",
		resume: "Reprèn",
		lock: "Bloca l'EVSE",
		unlock: "Desbloca l'EVSE",
		timer: "Temporitzador",
		dynamic: "Modulació dinàmica",
		pauseDynamic: "Pausa el control dinàmic",
		logoLed: "LED del logo",
		lightLed: "Llum del carregador",
		chargeMode: "Mode de càrrega",
		confirmLock: "Vols blocar el carregador V2C?"
	},
	flows: {
		solar: "Solar",
		grid: "Xarxa",
		home: "Casa",
		battery: "Bateria",
		charger: "Cotxe",
		import: "Importa",
		export: "Exporta",
		charge: "Carrega",
		discharge: "Descarrega",
		consume: "Consumeix",
		produce: "Produeix",
		idle: "En repòs",
		unknown: "Sense dades",
		activeFlow: "Flux energètic actiu",
		noFlow: "Sense flux energètic",
		partialData: "Dades energètiques parcials",
		noData: "Sense dades energètiques"
	},
	editor: {
		title: "V2C Trydan Card",
		entity: "Entitat V2C principal",
		name: "Nom",
		location: "Ubicació",
		statusEntity: "Estat visual opcional",
		gridPower: "Potència de xarxa",
		solarPower: "Potència solar",
		batteryPower: "Potència de bateria",
		voltage: "Voltatge",
		language: "Idioma",
		theme: "Tema",
		displayMode: "Mida de la targeta",
		themeAuto: "Sistema / Home Assistant",
		themeLight: "Clar",
		themeDark: "Fosc",
		modeStandard: "Estàndard",
		modeCompact: "Compacte",
		modeUltra: "Ultracompacte",
		showEnergyFlow: "Flux d'energia",
		showControls: "Controls de càrrega",
		showAdvanced: "Controls avançats",
		showCharger: "Il·lustració Trydan"
	},
	lcd: {
		disconnected: "ESPERANT EV",
		unavailable: "Sense dades",
		charging: "VE CARREGANT",
		complete: "Completa",
		timer: "Programada",
		updating: "Actualitza",
		control_pilot: "Error",
		load_balancing: "Error",
		error: "Error",
		waiting_power: "VE CONECTAT",
		wifi_connected: "Wifi OK",
		wifi_connecting: "Connectant"
	}
}, ot = {
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
	},
	lcd: {
		disconnected: "VENTER EV",
		unavailable: "Offline",
		charging: "EV OPLADNING",
		complete: "Færdig",
		timer: "Timer",
		updating: "Opdaterer",
		control_pilot: "Fejl",
		load_balancing: "Fejl",
		error: "Fejl",
		waiting_power: "EV TILSLUTTET",
		wifi_connected: "Wifi OK",
		wifi_connecting: "Tilslutter"
	}
}, st = {
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
	},
	lcd: {
		disconnected: "WARTEN AUF EV",
		unavailable: "Offline",
		charging: "EV LAEDT",
		complete: "Fertig",
		timer: "Timer",
		updating: "Update",
		control_pilot: "Fehler",
		load_balancing: "Fehler",
		error: "Fehler",
		waiting_power: "VERBUNDENES EV",
		wifi_connected: "WLAN OK",
		wifi_connecting: "Verbinden"
	}
}, ct = {
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
	},
	lcd: {
		disconnected: "EN ATTENTE VE",
		unavailable: "Indispo",
		charging: "RECHARGER VE",
		complete: "Terminée",
		timer: "Minuteur",
		updating: "MAJ",
		control_pilot: "Erreur",
		load_balancing: "Erreur",
		error: "Erreur",
		waiting_power: "VE CONNECTE",
		wifi_connected: "Wifi OK",
		wifi_connecting: "Connexion"
	}
}, lt = {
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
	},
	lcd: {
		disconnected: "IN ATTESA DI EV",
		unavailable: "Non disp",
		charging: "RICARICA EV",
		complete: "Completa",
		timer: "Programma",
		updating: "Aggiorna",
		control_pilot: "Errore",
		load_balancing: "Errore",
		error: "Errore",
		waiting_power: "VE CONNESSO",
		wifi_connected: "Wifi OK",
		wifi_connecting: "Connessione"
	}
}, ut = {
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
	},
	lcd: {
		disconnected: "WACHTEN OP EV",
		unavailable: "Offline",
		charging: "EV OPLADEN",
		complete: "Klaar",
		timer: "Timer",
		updating: "Update",
		control_pilot: "Fout",
		load_balancing: "Fout",
		error: "Fout",
		waiting_power: "VERBONDEN MET EV",
		wifi_connected: "Wifi OK",
		wifi_connecting: "Verbinden"
	}
}, dt = {
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
	},
	lcd: {
		disconnected: "Ingen EV",
		unavailable: "Offline",
		charging: "Lader",
		complete: "Ferdig",
		timer: "Timer",
		updating: "Oppdaterer",
		control_pilot: "Feil",
		load_balancing: "Feil",
		error: "Feil",
		waiting_power: "Tilkoblet",
		wifi_connected: "Wifi OK",
		wifi_connecting: "Kobler til"
	}
}, ft = {
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
	},
	lcd: {
		disconnected: "ASTEPTAND EV",
		unavailable: "Indisponibil",
		charging: "VE INCARCARE",
		complete: "Gata",
		timer: "Program",
		updating: "Actualizează",
		control_pilot: "Eroare",
		load_balancing: "Eroare",
		error: "Eroare",
		waiting_power: "Conectat",
		wifi_connected: "Wifi OK",
		wifi_connecting: "Conectare"
	}
}, pt = {
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
	},
	lcd: {
		disconnected: "Inget EV",
		unavailable: "Offline",
		charging: "Laddar",
		complete: "Klar",
		timer: "Timer",
		updating: "Uppdatera",
		control_pilot: "Fel",
		load_balancing: "Fel",
		error: "Fel",
		waiting_power: "Anslutet",
		wifi_connected: "Wifi OK",
		wifi_connecting: "Ansluter"
	}
}, mt = {
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
	},
	lcd: {
		disconnected: "WAITING EV",
		unavailable: "Offline",
		charging: "CHARGING EV",
		complete: "Done",
		timer: "Timer",
		updating: "Updating",
		control_pilot: "Error",
		load_balancing: "Error",
		error: "Error",
		waiting_power: "CONNECTED EV",
		wifi_connected: "Wifi OK",
		wifi_connecting: "Wifi..."
	}
}, ht = {
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
	},
	lcd: {
		disconnected: "ESPERANDO VE",
		unavailable: "Sin datos",
		charging: "VE CARGANDO",
		complete: "Completa",
		timer: "Programa",
		updating: "Actualiza",
		control_pilot: "Error",
		load_balancing: "Error",
		error: "Error",
		waiting_power: "VE CONECTADO",
		wifi_connected: "Wifi OK",
		wifi_connecting: "Conectando"
	}
}, gt = [
	"en",
	"it",
	"de",
	"fr",
	"nl",
	"sv",
	"da",
	"no",
	"ro",
	"es",
	"ca"
], _t = {
	en: mt,
	it: lt,
	de: st,
	fr: ct,
	nl: ut,
	sv: pt,
	da: ot,
	no: dt,
	ro: ft,
	es: ht,
	ca: at
};
function vt(e, t) {
	let n = (e === "auto" ? t : e)?.toLowerCase().split(/[-_]/)[0] ?? "en", r = n === "nb" || n === "nn" ? "no" : n;
	return gt.includes(r) ? r : "en";
}
function H(e) {
	return _t[vt(e)];
}
function U(e, t) {
	let n = t.split(".").reduce((e, t) => {
		if (!(typeof e != "object" || !e)) return e[t];
	}, e);
	return typeof n == "string" ? n : t;
}
//#endregion
//#region src/localization/lcd-copy.ts
var yt = /* @__PURE__ */ new Set([
	"control_pilot",
	"load_balancing",
	"error"
]);
function bt(e) {
	if (!e) return;
	let t = e.replace(/\D/g, "");
	if (t.length === 5) return `${t.slice(0, 2)} ${t.slice(2)}`;
}
function xt(e, t, n = {}) {
	let r = U(H(e), `lcd.${t}`), i = [n.totalKw ? `T:${n.totalKw}` : void 0, n.solarKw ? `FV:${n.solarKw}` : void 0].filter((e) => !!e).join(" ");
	return yt.has(t) ? {
		primary: r,
		secondary: n.errorCode ?? ""
	} : t === "charging" ? {
		primary: n.evKw ? `EV:${n.evKw}` : r,
		secondary: i
	} : {
		primary: r,
		secondary: i
	};
}
//#endregion
//#region src/services/actions.ts
async function St(e, t, n) {
	return e.callService("number", "set_value", {
		entity_id: t,
		value: n
	});
}
async function Ct(e, t, n) {
	return e.callService("switch", n ? "turn_on" : "turn_off", { entity_id: t });
}
async function wt(e, t, n) {
	return e.callService("select", "select_option", {
		entity_id: t,
		option: n
	});
}
async function Tt(e, t, n, r) {
	let i = { entity_id: t };
	return n && r !== void 0 && (i.brightness = r), e.callService("light", n ? "turn_on" : "turn_off", i);
}
//#endregion
//#region src/services/discovery.ts
var W = {
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
		externalMeasurement: "power"
	},
	fv_power: {
		translationKeys: ["fv_power"],
		domains: ["sensor"],
		legacySuffixes: [
			"_fv_power",
			"_photovoltaic_power",
			"_energia_fotovoltaica",
			"_sun_power"
		],
		externalMeasurement: "power"
	},
	battery_power: {
		translationKeys: ["battery_power"],
		domains: ["sensor"],
		legacySuffixes: ["_battery_power", "_energia_de_la_bateria"],
		externalMeasurement: "power"
	},
	grid_power: {
		translationKeys: [],
		domains: ["sensor"],
		legacySuffixes: ["_grid_power", "_potencia_de_red"],
		externalMeasurement: "power"
	},
	voltage: {
		translationKeys: ["voltage_installation"],
		domains: ["number", "sensor"],
		preferredDomains: ["number", "sensor"],
		legacySuffixes: [
			"_voltage",
			"_voltage_installation",
			"_tension_de_instalacion"
		],
		externalMeasurement: "voltage"
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
		legacySuffixes: [
			"_paused",
			"_pause_session",
			"_pausar_sesion"
		],
		writable: !0
	},
	locked: {
		translationKeys: ["locked"],
		domains: ["switch"],
		legacySuffixes: [
			"_locked",
			"_lock_evse",
			"_bloquear_evse"
		],
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
		legacySuffixes: [
			"_dynamic",
			"_dynamic_intensity_modulation",
			"_modulacion_de_intensidad_dinamica"
		],
		writable: !0
	},
	pause_dynamic: {
		translationKeys: ["pause_dynamic"],
		domains: ["switch"],
		legacySuffixes: [
			"_pause_dynamic",
			"_pause_dynamic_control_modulation",
			"_pausar_la_modulacion_de_control_dinamico"
		],
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
}, Et = (e) => W[e].writable === !0;
function Dt(e) {
	return e.split(".", 1)[0] ?? "";
}
function Ot(e) {
	return Array.isArray(e) ? e : Object.values(e);
}
function kt(e, t) {
	return !e || e[t] !== void 0;
}
function G(e, t) {
	return W[e].domains.includes(Dt(t));
}
function At(e, t, n) {
	if (Dt(t) !== "sensor") return !1;
	let r = n?.[t];
	if (!r) return !1;
	let i = r.attributes.unit_of_measurement?.toLowerCase(), a = r.attributes.device_class;
	return (e === "power" ? (!i || [
		"w",
		"kw",
		"mw"
	].includes(i)) && (!a || a === "power") : (!i || i === "v") && (!a || a === "voltage")) ? r.state === "unknown" || r.state === "unavailable" || Number.isFinite(Number(r.state)) : !1;
}
function jt(e, t) {
	if (t.length === 0) return;
	let n = W[e].preferredDomains ?? W[e].domains;
	for (let e of n) {
		let n = t.filter((t) => Dt(t.entity_id) === e);
		if (n.length === 1) return n[0].entity_id;
		if (n.length > 1) return;
	}
	return t.length === 1 ? t[0].entity_id : void 0;
}
function Mt(e, t, n = {}, r) {
	let i = Ot(e), a = new Map(i.map((e) => [e.entity_id, e])), o = a.get(t), s = i.length === 0 ? "loading" : o ? o.platform === "v2c" ? o.device_id ? void 0 : "seed_missing_device" : "seed_not_v2c" : "seed_not_found", c = s ? void 0 : o?.device_id, l = c ? i.filter((e) => e.device_id === c && e.platform === "v2c" && kt(r, e.entity_id)) : [], u = {}, d = {}, f = {}, p = [];
	for (let e of Object.keys(W)) {
		let t = n[e];
		if (!t) continue;
		let o = a.get(t), s = W[e], l = !!(s.externalMeasurement && At(s.externalMeasurement, t, r)), f = !!(c && o && o.device_id === c && o.platform === "v2c" && G(e, t) && kt(r, t)), p = i.length === 0 && kt(r, t) && G(e, t);
		l || f || p ? (u[e] = t, d[e] = "manual") : d[e] = "invalid";
	}
	for (let e of Object.keys(W)) {
		if (u[e] || !c) continue;
		let t = W[e], n = l.filter((n) => !!(n.translation_key && t.translationKeys.includes(n.translation_key)) && G(e, n.entity_id)), r = jt(e, n);
		if (r) {
			u[e] = r, d[e] = "automatic";
			continue;
		}
		if (n.length > 1) {
			f[e] = n.map((e) => e.entity_id), d[e] = "ambiguous";
			continue;
		}
		let i = l.filter((n) => G(e, n.entity_id) && (t.legacySuffixes ?? []).some((e) => n.entity_id.endsWith(e))), a = jt(e, i);
		a ? (u[e] = a, d[e] = "automatic", p.push(e)) : i.length > 1 && (f[e] = i.map((e) => e.entity_id), d[e] = "ambiguous");
	}
	return {
		entities: u,
		ambiguities: f,
		missing: Object.keys(W).filter((e) => !u[e]),
		deviceId: c,
		statuses: Object.fromEntries(Object.keys(W).map((e) => [e, d[e] ?? "missing"])),
		diagnostic: s,
		legacyRoles: p
	};
}
function Nt(e, t, n, r) {
	let i = e.entities?.[n], a = e.states[n];
	return !!(r && Et(t) && i?.device_id === r && i.platform === "v2c" && G(t, n) && a && a.state !== "unknown" && a.state !== "unavailable");
}
//#endregion
//#region src/services/energy.ts
function Pt(e) {
	if (!e || e.state === "unknown" || e.state === "unavailable") return null;
	let t = Number(e.state);
	if (!Number.isFinite(t)) return null;
	let n = e.attributes.unit_of_measurement?.toLowerCase();
	return n === "kw" ? t * 1e3 : n === "mw" ? t * 1e6 : t;
}
function Ft(e, t, n) {
	return Math.abs(t) < n ? "idle" : e === "grid" ? t > 0 ? "import" : "export" : e === "battery" ? t > 0 ? "discharge" : "charge" : e === "solar" ? t > 0 ? "produce" : "unknown" : t > 0 ? "consume" : "export";
}
function K(e, t, n = {}) {
	let r = Pt(t);
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
		direction: Ft(e, i, n.thresholdW ?? 50),
		available: !0
	};
}
//#endregion
//#region src/services/format.ts
var It = {
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
function Lt(e) {
	return It[e ?? "es"] ?? "en-US";
}
function Rt(e, t = "es") {
	if (e === null || !Number.isFinite(e)) return "—";
	let n = Math.abs(e);
	return n >= 1e3 ? `${new Intl.NumberFormat(Lt(t), { maximumFractionDigits: 1 }).format(n / 1e3)} kW` : `${new Intl.NumberFormat(Lt(t), { maximumFractionDigits: 0 }).format(n)} W`;
}
function zt(e, t = "es") {
	if (e === null || e === "") return "—";
	let n = Number(e);
	return Number.isFinite(n) ? `${new Intl.NumberFormat(Lt(t), { maximumFractionDigits: 2 }).format(n)} kWh` : "—";
}
function Bt(e) {
	if (e === null || e === "") return "—";
	let t = Number(e);
	if (!Number.isFinite(t) || t < 0) return "—";
	let n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60);
	return `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function q(e) {
	if (!(e === null || !Number.isFinite(e))) return (Math.abs(e) / 1e3).toFixed(1);
}
//#endregion
//#region src/models/types.ts
var Vt = /* @__PURE__ */ "connected.charging.ready.charge_power.charge_energy.charge_time.house_power.fv_power.battery_power.grid_power.voltage.intensity.min_intensity.max_intensity.meter_error.ssid.ip_address.signal_status.paused.locked.timer.dynamic.pause_dynamic.logo_led.light_led.charge_mode".split("."), Ht = [
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
], Ut = {
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
}, Wt = {
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
function Gt(e) {
	return e.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function Kt(e) {
	if (!e) return;
	let t = Gt(e);
	return Ht.includes(t) ? t : Ut[t];
}
function qt(e) {
	let t = Kt(e.externalStatus), n = (e.connected === void 0 || e.connected === "unknown") && (e.charging === void 0 || e.charging === "unknown") ? e.ready === void 0 || e.ready === "unknown" : !1, r;
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
function J(e, t, n = !1) {
	return {
		key: e,
		labelKey: n ? "states.unavailable" : `states.${e}`,
		detailKey: n ? "details.unavailable" : `details.${e}`,
		severity: Wt[e],
		badges: t.inhibitors,
		diagnostic: t.diagnostic,
		unavailable: n
	};
}
function Jt(e) {
	return e.externalStatus ? J(e.externalStatus, e) : e.fault === "control_pilot" ? J("control_pilot", e) : e.fault === "load_balancing" ? J("load_balancing", e) : e.fault === "meter" || e.fault === "generic" ? J("error", e) : e.maintenance === "updating" ? J("updating", e) : e.phase === "charging" ? J("charging", e) : e.phase === "complete" ? J("complete", e) : e.inhibitors.includes("timer") ? J("timer", e) : e.connectivity === "wifi_connecting" ? J("wifi_connecting", e) : e.connectivity === "wifi_connected" ? J("wifi_connected", e) : e.phase === "connected" || e.inhibitors.includes("paused") ? J("waiting_power", e) : J("disconnected", e, e.phase === "unavailable");
}
function Y(e) {
	return e === "on" || e === "true" ? !0 : e === "off" || e === "false" ? !1 : "unknown";
}
//#endregion
//#region src/card/advanced-controls.ts
var Yt = [
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
function Xt(e) {
	return !!(e && e.state !== "unknown" && e.state !== "unavailable");
}
function Zt(e, t, n) {
	let r = e.entities[t];
	if (!r) return k;
	let i = e.hass.states[r], a = i?.state === "on";
	return D`
    <div class="toggle-row">
      <span>${t === "locked" && a ? U(e.dictionary, "actions.unlock") : U(e.dictionary, n)}</span>
      <button
        data-role=${t}
        role="switch"
        aria-checked=${String(a)}
        aria-pressed=${String(a)}
        aria-busy=${String(e.pending.includes(t))}
        ?disabled=${!Xt(i) || e.pending.includes(t)}
        @click=${() => e.onToggle(t)}
      >${a ? "ON" : "OFF"}</button>
    </div>
  `;
}
function Qt(e) {
	let t = Yt.map(({ role: t, label: n }) => Zt(e, t, n)), n = e.entities.charge_mode, r = n ? e.hass.states[n] : void 0, i = e.entities.logo_led, a = i ? e.hass.states[i] : void 0, o = e.entities.light_led, s = !!(e.voltage || e.diagnostic || e.ambiguityRoles?.length);
	return !t.some((e) => e !== k) && !n && !i && !o && !s ? k : D`
    <details ?open=${e.advancedOpen === !0}>
      <summary>${U(e.dictionary, "labels.advanced")}</summary>
      <div class="advanced-grid">
        ${t.slice(0, 2).some((e) => e !== k) || n ? D`
              <section class="control-group">
                <h3>${U(e.dictionary, "labels.chargingControls")}</h3>
                ${t.slice(0, 2)}
                ${n ? D`
                      <label class="select-row">
                        <span>${U(e.dictionary, "actions.chargeMode")}</span>
                        <select
                          data-role="charge_mode"
                          .value=${r?.state ?? ""}
                          ?disabled=${!Xt(r) || e.pending.includes("charge_mode")}
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
                <h3>${U(e.dictionary, "labels.energyControls")}</h3>
                ${t.slice(2)}
              </section>
            ` : k}
        ${i || o ? D`
              <section class="control-group">
                <h3>${U(e.dictionary, "labels.lightControls")}</h3>
                ${Zt(e, "logo_led", "actions.logoLed")}
                ${i && Xt(a) ? D`
                      <label class="range-head" for="v2c-logo-brightness">
                        <span>${U(e.dictionary, "actions.logoLed")}</span>
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
                ${Zt(e, "light_led", "actions.lightLed")}
              </section>
            ` : k}
        ${s ? D`
              <section class="control-group">
                <h3>${U(e.dictionary, "labels.diagnostics")}</h3>
                <dl class="technical-list">
                  ${e.voltage ? D`
                        <div class="technical-row">
                          <dt>${U(e.dictionary, "labels.voltage")}</dt>
                          <dd>${e.voltage.state} ${e.voltage.attributes.unit_of_measurement ?? "V"}</dd>
                        </div>
                      ` : k}
                  ${e.diagnostic ? D`
                        <div class="technical-row" data-severity="error">
                          <dt>${U(e.dictionary, "labels.diagnostics")}</dt>
                          <dd>${e.diagnostic}</dd>
                        </div>
                      ` : k}
                  ${e.ambiguityRoles?.length ? D`
                        <div class="technical-row">
                          <dt>${U(e.dictionary, "labels.configuration")}</dt>
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
var $t = {
	solar: "mdi:solar-power",
	grid: "mdi:transmission-tower",
	home: "mdi:home-lightning-bolt",
	battery: "mdi:home-battery",
	charger: "mdi:ev-station"
};
function en(e, t, n) {
	if (e.length === 0) return k;
	let r = e.filter((e) => e.available), i = e.length - r.length, a = r.filter((e) => !["idle", "unknown"].includes(e.direction)), o = a.length > 0 ? "active" : r.length === 0 ? "unavailable" : i > 0 ? "partial" : "idle", s = `${U(t, o === "active" ? "flows.activeFlow" : o === "partial" ? "flows.partialData" : o === "unavailable" ? "flows.noData" : "flows.noFlow")}${o === "idle" ? " · 0 W" : ""}`;
	return D`
    <section class="energy-section" aria-label=${U(t, "labels.energyFlow")}>
      <div class="energy-summary" data-kind=${o}>
        <p class="energy-summary-title">
          <ha-icon icon="mdi:lightning-bolt-outline" aria-hidden="true"></ha-icon>
          <span>${s}</span>
        </p>
        ${a.length ? D`
              <div class="energy-nodes">
                ${a.map((e) => {
		let r = U(t, `flows.${e.role}`), i = U(t, `flows.${e.direction}`), a = Rt(e.watts, n);
		return D`
                    <div class="flow-node" aria-label=${`${r}: ${a}, ${i}`}>
                      <span class="flow-name" aria-hidden="true"><ha-icon icon=${$t[e.role]}></ha-icon></span>
                      <span class="flow-name-text">${r}</span>
                      <strong class="flow-value">${a}</strong>
                      <span class="flow-direction">${i}</span>
                    </div>
                  `;
	})}
              </div>
            ` : k}
        ${a.length && i ? D`<p class="energy-note">${U(t, "flows.partialData")}</p>` : k}
      </div>
    </section>
  `;
}
//#endregion
//#region src/card/session-controls.ts
function X(e) {
	return !!(e && e.state !== "unknown" && e.state !== "unavailable");
}
function tn(e) {
	let t = e.entities.intensity, n = e.entities.paused, r = t ? e.hass.states[t] : void 0, i = n ? e.hass.states[n] : void 0;
	if (!t && !n) return k;
	let a = Number(r?.attributes.min ?? 6), o = Number(r?.attributes.max ?? 32), s = Number(r?.attributes.step ?? 1), c = Number(r?.state), l = e.sliderValue ?? (Number.isFinite(c) ? c : a), u = e.presets.filter((e) => e >= a && e <= o), d = i?.state === "on", f = e.intensityControl !== "presets", p = e.showPresets !== !1 && e.intensityControl !== "slider";
	return D`
    <section class="session-controls" aria-label=${U(e.dictionary, "labels.chargingControls")}>
      ${t ? D`<div class="range-control">
        ${f ? D`<label class="range-head" for="v2c-intensity"><span>${U(e.dictionary, "labels.intensity")}</span><output>${Math.round(l)} A</output></label>
        <input id="v2c-intensity" data-role="intensity" type="range" .min=${String(a)} .max=${String(o)} .step=${String(s)} .value=${String(l)} ?disabled=${!X(r) || e.pending.includes("intensity")} aria-busy=${String(e.pending.includes("intensity"))} @input=${(t) => e.onSliderInput(Number(t.target.value))} @change=${(t) => e.onIntensity(Number(t.target.value))} />` : k}
        ${p ? D`<div class="presets" aria-label=${U(e.dictionary, "labels.intensity")}>${u.map((t) => D`<button class="preset" aria-pressed=${String(Math.round(l) === t)} ?disabled=${!X(r) || e.pending.includes("intensity")} @click=${() => e.onIntensity(t)}>${t} A</button>`)}</div>` : k}
      </div>` : k}
      ${n ? D`<button class="primary-action" data-role="paused" aria-busy=${String(e.pending.includes("paused"))} ?disabled=${!X(i) || e.pending.includes("paused")} title=${X(i) ? "" : U(e.dictionary, "labels.unavailableEntity")} @click=${e.onPause}>${U(e.dictionary, d ? "actions.resume" : "actions.pause")}</button>` : k}
    </section>
  `;
}
//#endregion
//#region src/card/styles.ts
var nn = o`
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
    /*
     * No negative margin. The old illustration was a full-height charger with two thirds
     * of it empty below the display, so the status text was pulled up into that void.
     * The cropped artwork ends just past the display, and pulling up now lands the text
     * on top of the picture.
     */
    margin-top: 6px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .hero.without-charger .hero-copy { margin-top: 0; }

  .charger-stage {
    display: grid;
    width: min(100%, clamp(260px, 66cqw, 340px));
    place-items: center;
  }

  /*
   * The artwork is two bitmap layers with the lit parts drawn as vectors on top.
   * 'color' carries the LED state: it interpolates inside a shadow root, which a
   * registered custom property does not, and 'fill="currentColor"' follows it.
   */
  .charger-art {
    position: relative;
    width: 100%;
    color: var(--v2c-led, #f4f6f8);
    transition: color 700ms ease;
    filter: drop-shadow(0 14px 12px rgb(0 0 0 / 18%));
  }

  .charger-art svg { display: block; width: 100%; height: auto; }

  /*
   * Cropped frames dissolve along the bottom instead of stopping dead.
   *
   * A linear ramp is not enough: the shell's bright metallic rim runs down both sides and a
   * short fade leaves those two highlights ending in mid-air, which is what makes a crop
   * read as a broken image rather than as framing. This ramp is longer and eased, so the
   * rim thins out gradually. It starts below the display: the frame is sized to leave room
   * for the ramp precisely so the screen never gets dimmed by it.
   *
   * Fading to transparency rather than to a colour is what makes it work in both themes:
   * the card's own surface shows through, whatever that surface happens to be.
   */
  .charger-art[data-crop="focus"],
  .charger-art[data-crop="mid"] {
    --v2c-fade: linear-gradient(
      to bottom,
      #000 0 78%,
      rgb(0 0 0 / 96%) 84%,
      rgb(0 0 0 / 84%) 88%,
      rgb(0 0 0 / 62%) 92%,
      rgb(0 0 0 / 36%) 96%,
      rgb(0 0 0 / 14%) 98.5%,
      transparent 100%
    );
    -webkit-mask-image: var(--v2c-fade);
    mask-image: var(--v2c-fade);
  }
  .charger-art image { image-rendering: auto; }

  .charger-logo-glow {
    opacity: var(--v2c-glow, 0.5);
    transition: opacity 700ms ease;
  }

  .charger-connector { transition: opacity 550ms ease; }
  .charger-art[data-connector="out"] .charger-connector { opacity: 0; }

  /* Charging and wifi-reconnect are the only two states the hardware blinks. */
  .charger-art[data-flash] .charger-logo-glow {
    animation: v2c-flash-glow var(--v2c-flash, 900ms) steps(1, end) infinite;
  }
  .charger-art[data-flash] .charger-logo {
    animation: v2c-flash-core var(--v2c-flash, 900ms) steps(1, end) infinite;
  }

  @keyframes v2c-flash-glow {
    0%, 52% { opacity: var(--v2c-glow, 0.5); }
    53%, 100% { opacity: 0.06; }
  }

  @keyframes v2c-flash-core {
    0%, 52% { opacity: 1; }
    53%, 100% { opacity: 0.16; }
  }
  /*
   * LED colours, from V2C's own table at
   * v2charge.com/support/trydan/led-lighting-instructions. The hues are the documented
   * ones lifted a little towards white: the wordmark is a light source behind black
   * glass, and the flat brand colours read as dead paint at card size. Only 'fix' and
   * 'intermitent' are documented behaviours - the glow is our addition, not the
   * device's, which is why it is a separate variable that can go to zero.
   */
  .charger-art[data-state="disconnected"] { --v2c-led: #f4f6f8; --v2c-glow: .42; }
  .charger-art[data-state="wifi_connecting"] { --v2c-led: #f4f6f8; --v2c-glow: .42; }
  .charger-art[data-state="wifi_connected"] { --v2c-led: #4fe07e; --v2c-glow: .5; }
  .charger-art[data-state="charging"] { --v2c-led: #2e5bf0; --v2c-glow: .55; }
  .charger-art[data-state="complete"] { --v2c-led: #4fe07e; --v2c-glow: .4; }
  .charger-art[data-state="timer"] { --v2c-led: #58e6f0; --v2c-glow: .5; }
  .charger-art[data-state="waiting_power"] { --v2c-led: #ff9c3c; --v2c-glow: .5; }
  .charger-art[data-state="control_pilot"] { --v2c-led: #ffdc55; --v2c-glow: .5; }
  .charger-art[data-state="updating"] { --v2c-led: #ff6acc; --v2c-glow: .5; }
  .charger-art[data-state="load_balancing"] { --v2c-led: #ffb0e0; --v2c-glow: .5; }
  .charger-art[data-state="error"] { --v2c-led: #ff4d57; --v2c-glow: .55; }

  @media (prefers-reduced-motion: reduce) {
    .charger-art[data-flash] .charger-logo-glow,
    .charger-art[data-flash] .charger-logo { animation: none; }
  }


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
  ha-card[data-mode="compact"] .hero-copy { margin-top: 4px; }
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
  .charger-art { aspect-ratio: var(--v2c-art-ratio, 1.33); }

  ha-card[data-mode="xxl"] .shell { padding: clamp(26px, 5cqw, 36px); }
  ha-card[data-mode="xxl"] .hero { margin-top: 24px; }
  ha-card[data-mode="xxl"] .charger-stage { width: min(100%, clamp(320px, 84cqw, 430px)); }
  ha-card[data-mode="xxl"] .hero-copy { margin-top: 8px; }
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
function Z(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/card/v2c-trydan-card.ts
function rn(e) {
	let t = Number(e);
	return !Number.isFinite(t) || t <= 0 ? .9 : Math.min(1.45, Math.max(.5, 1.45 - Math.min(t, 32) / 32 * .95));
}
var Q = class extends M {
	constructor(...e) {
		super(...e), this.resolvedEntities = {}, this.ambiguities = {}, this.pendingRoles = [], this.actionMessage = "", this.#e = /* @__PURE__ */ new Map();
	}
	static {
		this.styles = nn;
	}
	#e;
	#t;
	static getConfigElement() {
		return document.createElement("v2c-trydan-card-editor");
	}
	static getStubConfig(e) {
		return it(e);
	}
	setConfig(e) {
		this.config = rt(e), this.#n(), this.sliderValue = void 0;
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
		let e = Mt(this.hass.entities ?? {}, this.config.entity, this.config.entities, this.hass.states);
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
		return vt(this.config?.language, this.hass?.locale?.language ?? this.hass?.language);
	}
	#s(e, t) {
		this.#e.set(e, t), this.pendingRoles = [...this.#e.keys()];
	}
	#c(e, t) {
		let n = this.#e.get(e);
		n?.timer && clearTimeout(n.timer), this.#e.delete(e), this.pendingRoles = [...this.#e.keys()];
		let r = H(this.#o());
		this.actionMessage = U(r, t ? "labels.actionDone" : "labels.actionFailed");
	}
	#l() {
		if (this.hass) for (let [e, t] of this.#e) t.matches(this.hass.states[t.entityId]) && this.#c(e, !0);
	}
	async #u(e, t, n, r) {
		if (!this.hass || !Nt(this.hass, e, t, this.#t)) {
			this.actionMessage = U(H(this.#o()), "labels.actionFailed");
			return;
		}
		if (this.#e.has(e)) return;
		let i = H(this.#o());
		this.actionMessage = U(i, "labels.actionPending");
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
		this.sliderValue = s, this.#u("intensity", t, (e) => Number(e?.state) === s, () => St(this.hass, t, s));
	}
	#f(e) {
		let t = this.resolvedEntities[e], n = t ? this.hass?.states[t] : void 0;
		if (!this.hass || !t || !n) return;
		let r = n.state !== "on";
		e === "locked" && r && this.config?.confirm_lock !== !1 && !window.confirm(U(H(this.#o()), "actions.confirmLock")) || this.#u(e, t, (e) => e?.state === (r ? "on" : "off"), () => Ct(this.hass, t, r));
	}
	#p(e) {
		let t = this.resolvedEntities.charge_mode, n = t ? this.hass?.states[t] : void 0;
		!this.hass || !t || !n || !n.attributes.options?.includes(e) || this.#u("charge_mode", t, (t) => t?.state === e, () => wt(this.hass, t, e));
	}
	#m(e) {
		let t = this.resolvedEntities[e], n = t ? this.hass?.states[t] : void 0;
		if (!this.hass || !t || !n) return;
		let r = n.state !== "on";
		this.#u(e, t, (e) => e?.state === (r ? "on" : "off"), () => Tt(this.hass, t, r));
	}
	#h(e) {
		let t = this.resolvedEntities.logo_led, n = t ? this.hass?.states[t] : void 0;
		!this.hass || !t || !n || !Number.isFinite(e) || e < 0 || e > 255 || this.#u("logo_led", t, (t) => Number(t?.attributes.brightness) === e, () => Tt(this.hass, t, !0, e));
	}
	render() {
		if (!this.config || !this.hass) return D`<ha-card><div class="empty">V2C Trydan Card - configuration pending</div></ha-card>`;
		let e = this.#o(), t = H(e), n = this.hass.states[this.config.entity], r = K("charger", this.#i("charge_power"), { thresholdW: this.config.flow_threshold_w }), i = qt({
			seedAvailable: !!(n && n.state !== "unknown" && n.state !== "unavailable"),
			connected: Y(this.#i("connected")?.state),
			charging: Y(this.#i("charging")?.state),
			ready: Y(this.#i("ready")?.state),
			paused: Y(this.#i("paused")?.state),
			locked: Y(this.#i("locked")?.state),
			timer: Y(this.#i("timer")?.state),
			dynamic: Y(this.#i("dynamic")?.state),
			meterError: this.#i("meter_error")?.state,
			externalStatus: this.config.status_entity ? this.hass.states[this.config.status_entity]?.state : void 0,
			chargePowerW: r.watts
		}), a = Jt(i), o = this.config.name ?? "V2C Trydan", s = this.#i("charge_energy"), c = this.#i("charge_time"), l = this.#i("intensity");
		this.#i("voltage");
		let u = [
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
		], d = this.config.energy_sources ?? [], f = u.filter(([e, t]) => d.includes(e) && !!this.resolvedEntities[t]).map(([e, t, n]) => K(e, this.#i(t), {
			invert: n,
			thresholdW: this.config?.flow_threshold_w
		})), p = (this.config.metrics ?? []).map((n) => n === "power" ? D`<div class="metric metric-power"><span class="metric-label">${U(t, "labels.power")}</span><strong class="metric-value">${Rt(r.watts, e)}</strong></div>` : n === "energy" ? D`<div class="metric"><span class="metric-label">${U(t, "labels.energy")}</span><strong class="metric-value">${zt(s?.state ?? null, e)}</strong></div>` : D`<div class="metric"><span class="metric-label">${U(t, "labels.time")}</span><strong class="metric-value">${Bt(c?.state ?? null)}</strong></div>`), m = Object.keys(this.ambiguities), h = a.diagnostic && a.diagnostic !== "no_error" ? a.diagnostic.replaceAll("_", " ") : void 0, g = this.config.show_charger !== !1 && this.config.display_mode !== "ultra_compact", ee = q(K("home", this.#i("house_power")).watts) ?? q(K("grid", this.#i("grid_power")).watts), te = q(K("solar", this.#i("fv_power")).watts), _ = xt(e, a.unavailable ? "unavailable" : a.key, {
			evKw: q(r.watts),
			totalKw: ee,
			solarKw: te,
			errorCode: bt(a.diagnostic)
		}), v = this.config.charger_art ?? "focus", ne = a.key === "disconnected" || a.unavailable || i.phase === "disconnected" || i.phase === "unavailable", re = this.config.show_connector === !0, y = Je(v, re), ie = qe({
			crop: v,
			showConnector: re,
			connectorHoldered: ne,
			lcdLines: [_.primary, _.secondary],
			flashSeconds: rn(l?.state),
			logoOff: this.#i("logo_led")?.state === "off",
			state: a.key,
			flash: a.key === "charging" || a.key === "wifi_connecting"
		}), ae = D`
      <section class="hero ${g ? "has-charger" : "without-charger"}" data-section="hero">
        ${g ? D`<div class="charger-stage" style=${`--v2c-art-ratio:${y.toFixed(3)}`}>${ie}</div>` : k}
        <div class="hero-copy">
          <div class="charger-status" data-severity=${a.severity} role="status">${U(t, a.labelKey)}</div>
          ${this.config.show_badges !== !1 && a.badges.length ? D`<div class="badges" aria-label=${U(t, "labels.additionalStatus")}>${a.badges.map((e) => D`<span class="badge">${U(t, `badges.${e}`)}</span>`)}</div>` : k}
        </div>
      </section>`, b = p.length ? D`<section class="metrics-section" data-section="metrics"><div class="primary-metrics">${p}</div></section>` : k, oe = this.config.show_controls ? D`<div data-section="controls">${tn({
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
		})}</div>` : k, se = this.config.show_energy_flow ? D`<div data-section="energy">${en(f, t, e)}</div>` : k, x = this.config.show_advanced ? D`<div data-section="advanced">${Qt({
			hass: this.hass,
			entities: this.resolvedEntities,
			dictionary: t,
			pending: this.pendingRoles,
			voltage: this.#i("voltage"),
			diagnostic: h,
			ambiguityRoles: m,
			advancedOpen: this.config.advanced_open,
			onToggle: (e) => e === "logo_led" || e === "light_led" ? this.#m(e) : this.#f(e),
			onSelect: (e) => this.#p(e),
			onBrightness: (e) => this.#h(e)
		})}</div>` : k, ce = (e) => {
			switch (e) {
				case "hero": return ae;
				case "metrics": return b;
				case "controls": return oe;
				case "energy": return se;
				default: return x;
			}
		}, le = this.config.section_order ?? [
			"hero",
			"metrics",
			"controls",
			"energy",
			"advanced"
		], S = this.discoveryDiagnostic ? D`<p class="live-region" data-diagnostic=${this.discoveryDiagnostic} role="status">${this.discoveryDiagnostic.replaceAll("_", " ")}</p>` : k;
		return D`
      <ha-card data-theme=${this.config.theme ?? "auto"} data-mode=${this.config.display_mode ?? "standard"} data-layout=${this.config.layout ?? "auto"} data-surface=${this.config.surface_style ?? "solid"} data-show-header=${String(this.config.show_header !== !1)} style=${this.#a()}>
        <div class="shell">
          ${this.config.show_header === !1 ? k : D`<header class="card-heading"><h2>${o}</h2>${this.config.location ? D`<span class="location">${this.config.location}</span>` : k}</header>`}
          <div class="content-sections">${le.map(ce)}</div>
          ${S}
          <p class="live-region" aria-live="polite">${this.actionMessage}</p>
        </div>
      </ha-card>`;
	}
};
Z([Le({ attribute: !1 })], Q.prototype, "hass", void 0), Z([N()], Q.prototype, "config", void 0), Z([N()], Q.prototype, "resolvedEntities", void 0), Z([N()], Q.prototype, "ambiguities", void 0), Z([N()], Q.prototype, "discoveryDiagnostic", void 0), Z([N()], Q.prototype, "sliderValue", void 0), Z([N()], Q.prototype, "pendingRoles", void 0), Z([N()], Q.prototype, "actionMessage", void 0);
//#endregion
//#region src/localization/editor-copy.ts
var an = {
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
		statusMissing: "Not found",
		chargerArt: "Charger artwork",
		chargerArtFocus: "Close-up",
		chargerArtMid: "Mid shot",
		chargerArtFull: "Full charger",
		showConnector: "Show connector"
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
		statusMissing: "No encontrada",
		chargerArt: "Ilustración del cargador",
		chargerArtFocus: "Primer plano",
		chargerArtMid: "Plano medio",
		chargerArtFull: "Cargador completo",
		showConnector: "Mostrar conector"
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
		statusMissing: "Non trovata",
		chargerArt: "Illustrazione caricatore",
		chargerArtFocus: "Primo piano",
		chargerArtMid: "Piano medio",
		chargerArtFull: "Caricatore completo",
		showConnector: "Mostra connettore"
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
		statusMissing: "Nicht gefunden",
		chargerArt: "Lader-Illustration",
		chargerArtFocus: "Nahaufnahme",
		chargerArtMid: "Mittlere Ansicht",
		chargerArtFull: "Ganzer Lader",
		showConnector: "Stecker anzeigen"
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
		statusMissing: "Introuvable",
		chargerArt: "Illustration du chargeur",
		chargerArtFocus: "Gros plan",
		chargerArtMid: "Plan moyen",
		chargerArtFull: "Chargeur complet",
		showConnector: "Afficher le connecteur"
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
		statusMissing: "Niet gevonden",
		chargerArt: "Laderillustratie",
		chargerArtFocus: "Close-up",
		chargerArtMid: "Middenbeeld",
		chargerArtFull: "Volledige lader",
		showConnector: "Connector tonen"
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
		statusMissing: "Hittades inte",
		chargerArt: "Laddarillustration",
		chargerArtFocus: "Närbild",
		chargerArtMid: "Halvbild",
		chargerArtFull: "Hela laddaren",
		showConnector: "Visa kontakten"
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
		statusMissing: "Ikke fundet",
		chargerArt: "Laderillustration",
		chargerArtFocus: "Nærbillede",
		chargerArtMid: "Halvbillede",
		chargerArtFull: "Hele laderen",
		showConnector: "Vis stikket"
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
		statusMissing: "Ikke funnet",
		chargerArt: "Laderillustrasjon",
		chargerArtFocus: "Nærbilde",
		chargerArtMid: "Halvbilde",
		chargerArtFull: "Hele laderen",
		showConnector: "Vis kontakten"
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
		statusMissing: "Negăsită",
		chargerArt: "Ilustrația încărcătorului",
		chargerArtFocus: "Prim-plan",
		chargerArtMid: "Plan mediu",
		chargerArtFull: "Încărcător complet",
		showConnector: "Arată conectorul"
	},
	ca: {
		general: "General",
		appearance: "Aparença",
		contentOrder: "Contingut i ordre",
		advanced: "Avançat",
		entities: "Entitats",
		automatic: "Automàtic",
		modeXxl: "XXL aparador",
		layout: "Disposició",
		centered: "Centrada",
		split: "Dividida",
		inline: "En línia",
		colorScheme: "Paleta de color",
		monochrome: "Monocrom",
		v2cBlue: "Blau V2C",
		teal: "Turquesa",
		green: "Verd",
		violet: "Violeta",
		custom: "Personalitzat",
		accentColor: "Color personalitzat",
		accentHelp: "Tria un color o escriu un valor HEX de sis dígits.",
		invalidHex: "Fes servir el format #RRGGBB.",
		surface: "Superfície",
		solid: "Sòlida",
		tinted: "Tenyida",
		transparent: "Transparent",
		heroScale: "Escala del carregador",
		cardRadius: "Radi de les cantonades",
		metrics: "Mètriques",
		energySources: "Fonts d'energia",
		sectionOrder: "Ordre de les seccions",
		moveUp: "Puja",
		moveDown: "Baixa",
		resetOrder: "Restaura l'ordre",
		header: "Capçalera",
		badges: "Insígnies d'estat",
		presets: "Presets d'intensitat",
		intensityControl: "Control d'intensitat",
		slider: "Control lliscant",
		both: "Control lliscant i presets",
		flowThreshold: "Llindar de repòs (W)",
		currentPresets: "Intensitats ràpides",
		addPreset: "Afegeix un amperatge",
		removePreset: "Elimina",
		amps: "ampers",
		openAdvanced: "Obre els ajustos Trydan",
		confirmLock: "Confirma abans de blocar",
		invertGrid: "Inverteix la potència de xarxa",
		invertBattery: "Inverteix la potència de bateria",
		invertSolar: "Inverteix la potència solar",
		entityOverrides: "Entitats manuals",
		statusAutomatic: "Automàtica",
		statusManual: "Manual",
		statusAmbiguous: "Ambigua",
		statusInvalid: "No vàlida",
		statusMissing: "No trobada",
		chargerArt: "Il·lustració del carregador",
		chargerArtFocus: "Primer pla",
		chargerArtMid: "Pla mig",
		chargerArtFull: "Carregador sencer",
		showConnector: "Mostra el connector"
	}
}, on = {
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
	},
	ca: {
		connected: "Vehicle connectat",
		charging: "Carregant",
		ready: "Preparat",
		charge_power: "Potència de càrrega",
		charge_energy: "Energia de càrrega",
		charge_time: "Temps de càrrega",
		house_power: "Potència de casa",
		fv_power: "Potència solar",
		battery_power: "Potència de bateria",
		grid_power: "Potència de xarxa",
		voltage: "Voltatge",
		intensity: "Intensitat de càrrega",
		min_intensity: "Intensitat mínima",
		max_intensity: "Intensitat màxima",
		meter_error: "Error del comptador",
		ssid: "Xarxa Wi-Fi",
		ip_address: "Adreça IP",
		signal_status: "Estat del senyal",
		paused: "Pausa",
		locked: "Bloqueig EVSE",
		timer: "Temporitzador",
		dynamic: "Modulació dinàmica",
		pause_dynamic: "Pausa del control dinàmic",
		logo_led: "LED del logo",
		light_led: "Llum del carregador",
		charge_mode: "Mode de càrrega"
	}
};
function sn(e) {
	return an[e];
}
function cn(e, t) {
	return on[e][t];
}
function ln(e, t) {
	return e[`status${t[0].toUpperCase()}${t.slice(1)}`];
}
//#endregion
//#region src/editor/v2c-trydan-card-editor.ts
var un = {
	en: "English",
	it: "Italiano",
	de: "Deutsch",
	fr: "Francais",
	nl: "Nederlands",
	sv: "Svenska",
	da: "Dansk",
	no: "Norsk",
	ro: "Romana",
	es: "Espanol",
	ca: "Catala"
}, dn = {
	en: "Ultra compact mode hides charger artwork. Setting remains for other sizes.",
	es: "Modo ultracompacto oculta cargador. Ajuste se conserva para otros tamanos.",
	it: "Modalita ultra compatta nasconde caricatore.",
	de: "Ultrakompakt blendet Lader aus.",
	fr: "Mode ultra compact masque chargeur.",
	nl: "Ultracompact verbergt lader.",
	sv: "Ultrakompakt doljer laddaren.",
	da: "Ultrakompakt skjuler laderen.",
	no: "Ultrakompakt skjuler laderen.",
	ro: "Modul ultra compact ascunde incarcatorul.",
	ca: "El mode ultracompacte amaga la il-lustracio. L ajust es queda per a les altres mides."
}, fn = [
	"power",
	"energy",
	"time"
], pn = [
	"solar",
	"grid",
	"home",
	"battery",
	"charger"
], mn = [
	"hero",
	"metrics",
	"controls",
	"energy",
	"advanced"
], hn = [
	["show_energy_flow", "editor.showEnergyFlow"],
	["show_controls", "editor.showControls"],
	["show_advanced", "editor.showAdvanced"],
	["show_charger", "editor.showCharger"]
], $ = class extends M {
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
    .group[open] > summary::after { content:"-"; }
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
    .crop-icon { position:relative; display:block; width:17px; height:24px; border:1px solid currentColor; border-radius:3px; opacity:.85; }
    .crop-icon::before { content:""; position:absolute; inset:1px 1px auto; border-radius:2px 2px 0 0; background:currentColor; opacity:.55; }
    .crop-icon[data-kind="focus"]::before { height:36%; }
    .crop-icon[data-kind="mid"]::before { height:64%; }
    .crop-icon[data-kind="full"]::before { height:calc(100% - 2px); border-radius:2px; }
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
		let t = this.config.metrics ?? [...fn], n = t.includes(e) ? t.filter((t) => t !== e) : [...t, e];
		this.#e({
			...this.config,
			metrics: n
		});
	}
	#a(e) {
		if (!this.config) return;
		let t = this.config.energy_sources ?? [...pn], n = t.includes(e) ? t.filter((t) => t !== e) : [...t, e];
		this.#e({
			...this.config,
			energy_sources: n
		});
	}
	#o() {
		let e = (this.config?.section_order ?? []).filter((e) => mn.includes(e));
		return [.../* @__PURE__ */ new Set([...e, ...mn])];
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
		let t = [.../* @__PURE__ */ new Set([...this.config.current_presets ?? B, e])].sort((e, t) => e - t);
		this.presetDraft = "", this.#e({
			...this.config,
			current_presets: t
		});
	}
	#f(e) {
		this.config && this.#e({
			...this.config,
			current_presets: (this.config.current_presets ?? B).filter((t) => t !== e)
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
		if (!this.config) return k;
		let e = vt(this.config.language ?? this.hass?.locale?.language ?? this.hass?.language), t = H(e), n = sn(e), r = Object.keys(this.hass?.entities ?? {}), i = this.hass ? Mt(Object.values(this.hass.entities ?? {}), this.config.entity, this.config.entities, this.hass.states) : void 0, a = this.#o(), o = this.config.metrics ?? [...fn], s = this.config.energy_sources ?? [...pn], c = this.config.current_presets ?? B, l = this.accentDraft !== "" && !/^#[0-9A-F]{6}$/.test(this.accentDraft), u = (this.config.display_mode ?? "standard") === "ultra_compact", d = {
			hero: U(t, "editor.showCharger"),
			metrics: n.metrics,
			controls: U(t, "editor.showControls"),
			energy: U(t, "editor.showEnergyFlow"),
			advanced: U(t, "editor.showAdvanced")
		}, f = {
			power: U(t, "labels.power"),
			energy: U(t, "labels.energy"),
			time: U(t, "labels.time")
		}, p = {
			solar: U(t, "flows.solar"),
			grid: U(t, "flows.grid"),
			home: U(t, "flows.home"),
			battery: U(t, "flows.battery"),
			charger: U(t, "flows.charger")
		};
		return D`
      <div class="editor">
        <details class="group" open>
          <summary>${n.general}</summary><div class="group-body">
            <label><span>${U(t, "editor.entity")}</span><input data-field="entity" list="v2c-entities" .value=${this.config.entity} @change=${(e) => this.#t("entity", e.target.value)} /></label>
            <div class="grid">
              <label><span>${U(t, "editor.name")}</span><input data-field="name" .value=${this.config.name ?? ""} @change=${(e) => this.#t("name", e.target.value)} /></label>
              <label><span>${U(t, "editor.location")}</span><input data-field="location" .value=${this.config.location ?? ""} @change=${(e) => this.#t("location", e.target.value)} /></label>
              <label><span>${U(t, "editor.language")}</span><select data-field="language" .value=${this.config.language ?? "auto"} @change=${(e) => this.#t("language", e.target.value)}><option value="auto">${n.automatic}</option>${gt.map((e) => D`<option .value=${e}>${un[e]}</option>`)}</select></label>
              <label><span>${U(t, "editor.theme")}</span><select data-field="theme" .value=${this.config.theme ?? "auto"} @change=${(e) => this.#t("theme", e.target.value)}><option value="auto">${U(t, "editor.themeAuto")}</option><option value="light">${U(t, "editor.themeLight")}</option><option value="dark">${U(t, "editor.themeDark")}</option></select></label>
            </div>
            <div class="field"><span class="field-title">${U(t, "editor.displayMode")}</span><div class="choices">${[
			["xxl", n.modeXxl],
			["standard", U(t, "editor.modeStandard")],
			["compact", U(t, "editor.modeCompact")],
			["ultra_compact", U(t, "editor.modeUltra")]
		].map(([e, t]) => D`<button type="button" class="choice" data-field="display_mode" data-value=${e} aria-pressed=${String((this.config?.display_mode ?? "standard") === e)} @click=${() => this.#t("display_mode", e)}><span class="layout-icon" data-kind="centered"></span>${t}</button>`)}</div></div>
          </div>
        </details>

        <details class="group" open>
          <summary>${n.appearance}</summary><div class="group-body">
            <div class="field"><span class="field-title">${n.layout}</span><div class="choices">${[
			["auto", n.automatic],
			["centered", n.centered],
			["split", n.split],
			["inline", n.inline]
		].map(([e, t]) => D`<button type="button" class="choice" data-field="layout" data-value=${e} aria-pressed=${String((this.config?.layout ?? "auto") === e)} @click=${() => this.#t("layout", e)}><span class="layout-icon" data-kind=${e}></span>${t}</button>`)}</div></div>
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
		].map(([e, t, n]) => D`<button type="button" class="swatch" style=${`--swatch:${n}`} title=${t} aria-label=${t} aria-pressed=${String((this.config?.color_scheme ?? "monochrome") === e)} @click=${() => this.#l(e)}></button>`)}</div></div>
            ${this.config.color_scheme === "custom" ? D`<div class="field"><span class="field-title">${n.accentColor}</span><div class="color-row"><input data-field="accent_picker" type="color" .value=${/^#[0-9A-F]{6}$/.test(this.accentDraft) ? this.accentDraft : "#0067D9"} @input=${(e) => this.#u(e.target.value)} /><input data-field="accent_color" inputmode="text" .value=${this.accentDraft} @input=${(e) => this.#u(e.target.value)} /></div><p class="help">${n.accentHelp}</p>${l ? D`<p class="error" role="alert">${n.invalidHex}</p>` : k}</div>` : k}
            <div class="field"><span class="field-title">${n.surface}</span><div class="chips">${[
			["solid", n.solid],
			["tinted", n.tinted],
			["transparent", n.transparent]
		].map(([e, t]) => D`<button type="button" class="chip" aria-pressed=${String((this.config?.surface_style ?? "solid") === e)} @click=${() => this.#t("surface_style", e)}>${t}</button>`)}</div></div>
            <div class="field"><span class="field-title">${n.chargerArt}</span><div class="choices">${[
			["focus", n.chargerArtFocus],
			["mid", n.chargerArtMid],
			["full", n.chargerArtFull]
		].map(([e, t]) => D`<button type="button" class="choice" data-field="charger_art" data-value=${e} aria-pressed=${String((this.config?.charger_art ?? "focus") === e)} @click=${() => this.#t("charger_art", e)}><span class="crop-icon" data-kind=${e}></span>${t}</button>`)}</div></div>
            <div class="checks"><label><input data-field="show_connector" type="checkbox" .checked=${this.config.show_connector === !0} @change=${(e) => this.#t("show_connector", e.target.checked)} />${n.showConnector}</label></div>
            <div class="grid">
              <label><span class="field-title">${n.heroScale}</span><div class="range-row"><input data-field="hero_scale" type="range" min="0.75" max="1.25" step="0.05" .value=${String(this.config.hero_scale ?? 1)} @input=${(e) => this.#r("hero_scale", e.target.value)} /><output>${Math.round((this.config.hero_scale ?? 1) * 100)}%</output></div></label>
              <label><span class="field-title">${n.cardRadius}</span><div class="range-row"><input data-field="card_radius" type="range" min="0" max="40" step="1" .value=${String(this.config.card_radius ?? 20)} @input=${(e) => this.#r("card_radius", e.target.value)} /><output>${this.config.card_radius ?? 20}px</output></div></label>
            </div>
          </div>
        </details>

        <details class="group" open>
          <summary>${n.contentOrder}</summary><div class="group-body">
            <div class="field"><span class="field-title">${n.metrics}</span><div class="chips">${fn.map((e) => D`<button type="button" class="chip" data-metric=${e} aria-pressed=${String(o.includes(e))} @click=${() => this.#i(e)}>${f[e]}</button>`)}</div></div>
            <div class="field"><span class="field-title">${n.energySources}</span><div class="chips">${pn.map((e) => D`<button type="button" class="chip" data-source=${e} aria-pressed=${String(s.includes(e))} @click=${() => this.#a(e)}>${p[e]}</button>`)}</div></div>
            <div class="field"><span class="field-title">${n.sectionOrder}</span><ol class="order-list">${a.map((e, t) => D`<li class="order-item" data-order=${e}><span class="order-index">${t + 1}</span><span>${d[e]}</span><button type="button" class="icon-button" aria-label=${`${n.moveUp}: ${d[e]}`} ?disabled=${t === 0} @click=${() => this.#s(t, -1)}>&#8593;</button><button type="button" class="icon-button" aria-label=${`${n.moveDown}: ${d[e]}`} ?disabled=${t === a.length - 1} @click=${() => this.#s(t, 1)}>&#8595;</button></li>`)}</ol><button type="button" class="reset" @click=${() => this.#c()}>${n.resetOrder}</button></div>
            <div class="checks">${hn.map(([e, n]) => D`<label><input data-field=${e} type="checkbox" .checked=${this.#n(e)} ?disabled=${e === "show_charger" && u} @change=${(t) => this.#t(e, t.target.checked)} /><span>${U(t, n)}</span></label>`)}<label><input data-field="show_header" type="checkbox" .checked=${this.config.show_header !== !1} @change=${(e) => this.#t("show_header", e.target.checked)} />${n.header}</label><label><input data-field="show_badges" type="checkbox" .checked=${this.config.show_badges !== !1} @change=${(e) => this.#t("show_badges", e.target.checked)} />${n.badges}</label><label><input data-field="show_presets" type="checkbox" .checked=${this.config.show_presets !== !1} @change=${(e) => this.#t("show_presets", e.target.checked)} />${n.presets}</label></div>
            ${u ? D`<p class="help" data-help="ultra-artwork">${dn[e]}</p>` : k}
          </div>
        </details>

        <details class="group">
          <summary>${n.advanced}</summary><div class="group-body">
            <div class="field"><span class="field-title">${n.intensityControl}</span><div class="chips">${[
			["slider", n.slider],
			["presets", n.presets],
			["both", n.both]
		].map(([e, t]) => D`<button type="button" class="chip" aria-pressed=${String((this.config?.intensity_control ?? "both") === e)} @click=${() => this.#t("intensity_control", e)}>${t}</button>`)}</div></div>
            <label><span class="field-title">${n.flowThreshold}</span><input data-field="flow_threshold_w" type="number" min="0" .value=${String(this.config.flow_threshold_w ?? 50)} @input=${(e) => this.#r("flow_threshold_w", e.target.value)} /></label>
            <div class="field"><span class="field-title">${n.currentPresets}</span><div class="preset-list">${c.map((e) => D`<span class="preset-token">${e} A<button type="button" aria-label=${`${n.removePreset} ${e} A`} @click=${() => this.#f(e)}>&times;</button></span>`)}</div><div class="preset-editor"><input data-field="preset_draft" type="number" min="1" max="80" step="1" placeholder=${n.amps} .value=${this.presetDraft} @input=${(e) => this.presetDraft = e.target.value} @keydown=${(e) => {
			e.key === "Enter" && (e.preventDefault(), this.#d());
		}} /><button type="button" data-action="add-preset" @click=${() => this.#d()}>${n.addPreset}</button></div></div>
            <div class="checks"><label><input data-field="advanced_open" type="checkbox" .checked=${this.config.advanced_open === !0} @change=${(e) => this.#t("advanced_open", e.target.checked)} />${n.openAdvanced}</label><label><input data-field="confirm_lock" type="checkbox" .checked=${this.config.confirm_lock !== !1} @change=${(e) => this.#t("confirm_lock", e.target.checked)} />${n.confirmLock}</label><label><input data-field="invert_grid_power" type="checkbox" .checked=${this.config.invert_grid_power === !0} @change=${(e) => this.#t("invert_grid_power", e.target.checked)} />${n.invertGrid}</label><label><input data-field="invert_battery_power" type="checkbox" .checked=${this.config.invert_battery_power === !0} @change=${(e) => this.#t("invert_battery_power", e.target.checked)} />${n.invertBattery}</label><label><input data-field="invert_solar_power" type="checkbox" .checked=${this.config.invert_solar_power === !0} @change=${(e) => this.#t("invert_solar_power", e.target.checked)} />${n.invertSolar}</label></div>
          </div>
        </details>

        <details class="group">
          <summary>${n.entities}</summary><div class="group-body"><p class="help">${n.entityOverrides}</p>${i?.diagnostic ? D`<p class="help" data-diagnostic=${i.diagnostic}>${i.diagnostic.replaceAll("_", " ")}</p>` : k}${i?.legacyRoles.length ? D`<p class="help" data-diagnostic="legacy">legacy: ${i.legacyRoles.join(", ")}</p>` : k}<div class="grid">${Vt.map((t) => {
			let r = i?.statuses[t] ?? "missing";
			return D`<label><span>${cn(e, t)}</span><input data-role=${t} list="v2c-entities" .value=${this.config?.entities?.[t] ?? ""} @change=${(e) => this.#p(t, e.target.value)} /><small class="entity-status" data-status=${r}>${ln(n, r)}</small></label>`;
		})}</div></div>
        </details>
        <datalist id="v2c-entities">${r.map((e) => D`<option value=${e}></option>`)}</datalist>
      </div>`;
	}
};
Z([Le({ attribute: !1 })], $.prototype, "hass", void 0), Z([N()], $.prototype, "config", void 0), Z([N()], $.prototype, "accentDraft", void 0), Z([N()], $.prototype, "presetDraft", void 0);
//#endregion
//#region src/index.ts
var gn = "v2c-trydan-card", _n = "v2c-trydan-card-editor";
customElements.get(gn) || customElements.define(gn, Q), customElements.get(_n) || customElements.define(_n, $), window.customCards = window.customCards ?? [], window.customCards.some((e) => e.type === gn) || window.customCards.push({
	type: gn,
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
export { Q as V2cTrydanCard, $ as V2cTrydanCardEditor };
