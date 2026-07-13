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
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: ee } = Object, m = globalThis, h = m.trustedTypes, te = h ? h.emptyScript : "", ne = m.reactiveElementPolyfillSupport, g = (e, t) => e, _ = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? te : null;
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
}, re = (e, t) => !l(e, t), ie = {
	attribute: !0,
	type: String,
	converter: _,
	reflect: !1,
	useDefault: !1,
	hasChanged: re
};
Symbol.metadata ??= Symbol("metadata"), m.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var v = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ie) {
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
		return this.elementProperties.get(e) ?? ie;
	}
	static _$Ei() {
		if (this.hasOwnProperty(g("elementProperties"))) return;
		let e = ee(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(g("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(g("properties"))) {
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
			let i = (n.converter?.toAttribute === void 0 ? _ : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? _ : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? re)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
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
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[g("elementProperties")] = /* @__PURE__ */ new Map(), v[g("finalized")] = /* @__PURE__ */ new Map(), ne?.({ ReactiveElement: v }), (m.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js
var ae = globalThis, oe = (e) => e, y = ae.trustedTypes, se = y ? y.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ce = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, le = "?" + b, ue = `<${le}>`, x = document, S = () => x.createComment(""), C = (e) => e === null || typeof e != "object" && typeof e != "function", de = Array.isArray, fe = (e) => de(e) || typeof e?.[Symbol.iterator] == "function", pe = "[ 	\n\f\r]", w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, me = /-->/g, he = />/g, T = RegExp(`>|${pe}(?:([^\\s"'>=/]+)(${pe}*=${pe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), ge = /'/g, _e = /"/g, ve = /^(?:script|style|textarea|title)$/i, E = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), D = Symbol.for("lit-noChange"), O = Symbol.for("lit-nothing"), ye = /* @__PURE__ */ new WeakMap(), k = x.createTreeWalker(x, 129);
function be(e, t) {
	if (!de(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return se === void 0 ? t : se.createHTML(t);
}
var xe = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = w;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === w ? c[1] === "!--" ? o = me : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = T) : (ve.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = T) : o = he : o === T ? c[0] === ">" ? (o = i ?? w, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? T : c[3] === "\"" ? _e : ge) : o === _e || o === ge ? o = T : o === me || o === he ? o = w : (o = T, i = void 0);
		let d = o === T && e[t + 1].startsWith("/>") ? " " : "";
		a += o === w ? n + ue : l >= 0 ? (r.push(s), n.slice(0, l) + ce + n.slice(l) + b + d) : n + b + (l === -2 ? t : d);
	}
	return [be(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, A = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = xe(t, n);
		if (this.el = e.createElement(l, r), k.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = k.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ce)) {
					let t = u[o++], n = i.getAttribute(e).split(b), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? Ce : r[1] === "?" ? we : r[1] === "@" ? Te : N
					}), i.removeAttribute(e);
				} else e.startsWith(b) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (ve.test(i.tagName)) {
					let e = i.textContent.split(b), t = e.length - 1;
					if (t > 0) {
						i.textContent = y ? y.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], S()), k.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], S());
					}
				}
			} else if (i.nodeType === 8) if (i.data === le) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(b, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += b.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = x.createElement("template");
		return n.innerHTML = e, n;
	}
};
function j(e, t, n = e, r) {
	if (t === D) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = C(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = j(e, i._$AS(e, t.values), i, r)), t;
}
var Se = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? x).importNode(t, !0);
		k.currentNode = r;
		let i = k.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new M(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ee(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = k.nextNode(), a++);
		}
		return k.currentNode = x, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, M = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = O, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = j(this, e, t), C(e) ? e === O || e == null || e === "" ? (this._$AH !== O && this._$AR(), this._$AH = O) : e !== this._$AH && e !== D && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? fe(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== O && C(this._$AH) ? this._$AA.nextSibling.data = e : this.T(x.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = A.createElement(be(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new Se(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = ye.get(e.strings);
		return t === void 0 && ye.set(e.strings, t = new A(e)), t;
	}
	k(t) {
		de(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(S()), this.O(S()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = oe(e).nextSibling;
			oe(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, N = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = O, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = O;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = j(this, e, t, 0), a = !C(e) || e !== this._$AH && e !== D, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = j(this, r[n + o], t, o), s === D && (s = this._$AH[o]), a ||= !C(s) || s !== this._$AH[o], s === O ? e = O : e !== O && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === O ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, Ce = class extends N {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === O ? void 0 : e;
	}
}, we = class extends N {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== O);
	}
}, Te = class extends N {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = j(this, e, t, 0) ?? O) === D) return;
		let n = this._$AH, r = e === O && n !== O || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== O && (n === O || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, Ee = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		j(this, e);
	}
}, De = ae.litHtmlPolyfillSupport;
De?.(A, M), (ae.litHtmlVersions ??= []).push("3.3.3");
var Oe = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new M(t.insertBefore(S(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, P = globalThis, F = class extends v {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Oe(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return D;
	}
};
F._$litElement$ = !0, F.finalized = !0, P.litElementHydrateSupport?.({ LitElement: F });
var ke = P.litElementPolyfillSupport;
ke?.({ LitElement: F }), (P.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js
var Ae = {
	attribute: !0,
	type: String,
	converter: _,
	reflect: !1,
	hasChanged: re
}, je = (e = Ae, t, n) => {
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
function I(e) {
	return (t, n) => typeof n == "object" ? je(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js
function L(e) {
	return I({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/directive.js
var Me = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, Ne = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Pe = class {
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
}, R = class extends Pe {
	constructor(e) {
		if (super(e), this.it = O, e.type !== Me.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
	}
	render(e) {
		if (e === O || e == null) return this._t = void 0, this.it = e;
		if (e === D) return e;
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
R.directiveName = "unsafeHTML", R.resultType = 1;
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/directives/unsafe-svg.js
var z = class extends R {};
z.directiveName = "unsafeSVG", z.resultType = 2;
var Fe = Ne(z), Ie = {
	disconnected: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\" role=\"img\" aria-label=\"V2C Trydan: Sin vehiculo\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#f4f6f8\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">CARGADOR LISTO</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">SIN VEHICULO</text>\n</g>\n</svg>",
	charging: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\" role=\"img\" aria-label=\"V2C Trydan: Cargando\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"blink-current\" transform=\"translate(107 104) scale(.92)\" fill=\"#123cc9\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">CARGANDO 3.9kW</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">17A   233V</text>\n</g>\n</svg>",
	complete: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\" role=\"img\" aria-label=\"V2C Trydan: Carga completa\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#3fce6b\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">CARGA COMPLETA</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">12.46 kWh</text>\n</g>\n</svg>",
	timer: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\" role=\"img\" aria-label=\"V2C Trydan: Temporizador\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#43dbe7\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">TEMPORIZADOR</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">CARGA PROGRAMADA</text>\n</g>\n</svg>",
	updating: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\" role=\"img\" aria-label=\"V2C Trydan: Actualizando\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#f050bd\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">ACTUALIZANDO</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">NO DESCONECTAR</text>\n</g>\n</svg>",
	control_pilot: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\" role=\"img\" aria-label=\"V2C Trydan: Control Pilot\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#ffd43b\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">ERROR CONTROL</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">PILOT / POTENCIA</text>\n</g>\n</svg>",
	load_balancing: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\" role=\"img\" aria-label=\"V2C Trydan: Error balanceo\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#ff9dd8\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">ERROR LOCAL</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">LOAD BALANCING</text>\n</g>\n</svg>",
	error: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\" role=\"img\" aria-label=\"V2C Trydan: Error\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#ef3340\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">ERROR 23 006</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">FALLO CONEXION</text>\n</g>\n</svg>",
	waiting_power: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\" role=\"img\" aria-label=\"V2C Trydan: Esperando potencia\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"\" transform=\"translate(107 104) scale(.92)\" fill=\"#f28c28\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">ESPERANDO</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">POTENCIA</text>\n</g>\n</svg>",
	wifi_connected: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\" role=\"img\" aria-label=\"V2C Trydan: WiFi conectado\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"blink-once\" transform=\"translate(107 104) scale(.92)\" fill=\"#3fce6b\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">WIFI CONECTADO</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">RED OK</text>\n</g>\n</svg>",
	wifi_connecting: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"24 0 312 480\" role=\"img\" aria-label=\"V2C Trydan: Conectando WiFi\">\n<defs>\n  <linearGradient id=\"case\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#15171a\"/><stop offset=\".55\" stop-color=\"#070809\"/><stop offset=\"1\" stop-color=\"#020304\"/></linearGradient>\n  <linearGradient id=\"rim\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#f0f2f3\"/><stop offset=\".18\" stop-color=\"#70757a\"/><stop offset=\".7\" stop-color=\"#151719\"/><stop offset=\"1\" stop-color=\"#d4d7da\"/></linearGradient>\n  <linearGradient id=\"lcd\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#18314a\"/><stop offset=\"1\" stop-color=\"#050a0f\"/></linearGradient>\n  <filter id=\"shadow\" x=\"-30%\" y=\"-30%\" width=\"170%\" height=\"180%\"><feDropShadow dx=\"5\" dy=\"10\" stdDeviation=\"10\" flood-opacity=\".35\"/></filter>\n  <filter id=\"glow\" x=\"-70%\" y=\"-100%\" width=\"240%\" height=\"300%\"><feGaussianBlur stdDeviation=\"2.8\" result=\"b\"/><feMerge><feMergeNode in=\"b\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter>\n  <style>\n    @keyframes slow{0%,46%{opacity:1}50%,100%{opacity:.18}}\n    @keyframes current{0%,38%{opacity:1}45%,100%{opacity:.18}}\n    @keyframes once{0%,20%{opacity:.15}45%,72%{opacity:1}100%{opacity:.45}}\n    .blink-slow{animation:slow 1.35s steps(1,end) infinite}\n    .blink-current{animation:current .65s steps(1,end) infinite}\n    .blink-once{animation:once 1s ease-out 1}\n    .lcd{font-family:monospace;font-weight:700;letter-spacing:.4px}\n  </style>\n</defs>\n<g filter=\"url(#shadow)\">\n  <rect x=\"62\" y=\"24\" width=\"236\" height=\"410\" rx=\"29\" fill=\"url(#rim)\"/>\n  <rect x=\"66\" y=\"28\" width=\"228\" height=\"402\" rx=\"26\" fill=\"url(#case)\" stroke=\"#70757b\" stroke-width=\"1.2\"/>\n  <path d=\"M83 52 Q92 39 111 39 H250 Q276 40 286 61\" fill=\"none\" stroke=\"#34383d\" stroke-width=\"1.4\"/>\n  <path d=\"M77 397 Q90 419 115 422 H249 Q275 419 286 397\" fill=\"none\" stroke=\"#24272a\" stroke-width=\"1.3\"/>\n\n  <g class=\"blink-slow\" transform=\"translate(107 104) scale(.92)\" fill=\"#f4f6f8\" filter=\"url(#glow)\">\n    <!-- V -->\n    <path d=\"M0 0 H12 L28 39 L44 0 H56 L34 52 H22 Z\"/>\n    <!-- 2 -->\n    <path d=\"M51 9 C59 2 68 0 78 0 C95 0 106 9 106 23 C106 34 99 41 88 49 L68 63 H109 L116 73 H51 V62 L81 41 C90 35 95 30 95 23 C95 15 88 11 78 11 C70 11 64 14 59 20 Z\"/>\n    <!-- C with seven physical cut-outs arranged 2-3-2 -->\n    <path fill-rule=\"evenodd\" d=\"M143 8 A35 35 0 1 0 143 66 L135 55 A22 22 0 1 1 135 19 Z\"/>\n    <!-- Seven illuminated dots inside the C: 2-3-2, like the physical V2C logo. -->\n    <g class=\"c-led-dots\" opacity=\"0.78\">\n      <circle cx=\"124\" cy=\"23\" r=\"3.4\"/><circle cx=\"136\" cy=\"23\" r=\"3.4\"/>\n      <circle cx=\"118\" cy=\"36\" r=\"3.4\"/><circle cx=\"130\" cy=\"36\" r=\"3.4\"/><circle cx=\"142\" cy=\"36\" r=\"3.4\"/>\n      <circle cx=\"124\" cy=\"49\" r=\"3.4\"/><circle cx=\"136\" cy=\"49\" r=\"3.4\"/>\n    </g>\n  </g>\n\n  <rect x=\"130\" y=\"192\" width=\"100\" height=\"27\" fill=\"#020303\" stroke=\"#d9dcde\" stroke-width=\"1\"/>\n  <rect x=\"133\" y=\"195\" width=\"94\" height=\"21\" fill=\"url(#lcd)\" opacity=\".9\"/>\n  <text x=\"180\" y=\"204\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.6\" fill=\"#cde6ef\">CONECTANDO WIFI</text>\n  <text x=\"180\" y=\"212\" text-anchor=\"middle\" class=\"lcd\" font-size=\"6.3\" fill=\"#9dc0cd\">ESPERE...</text>\n</g>\n</svg>"
}, Le = [
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
function V(e, t) {
	return [...new Set(Array.isArray(e) ? e.filter((e) => typeof e == "string" && t.includes(e)) : t)];
}
function Ue(e, t) {
	let n = V(e, t);
	return [...n, ...t.filter((e) => !n.includes(e))];
}
function We(e) {
	if (!e || typeof e != "object") throw Error("V2C Trydan Card: configuración no válida");
	if (!e.entity || typeof e.entity != "string") throw Error("V2C Trydan Card: debes indicar una entidad V2C principal");
	let t = [...new Set(e.current_presets ?? Le)].map(Number).filter((e) => Number.isFinite(e) && e > 0).sort((e, t) => e - t), n = B(e.display_mode, Re, "standard"), r = typeof e.accent_color == "string" && /^#[0-9a-fA-F]{6}$/.test(e.accent_color) ? e.accent_color.toUpperCase() : void 0;
	return {
		...e,
		type: "custom:v2c-trydan-card",
		theme: e.theme ?? "auto",
		display_mode: n,
		language: e.language ?? "auto",
		layout: B(e.layout, ze, "auto"),
		color_scheme: e.color_scheme === "custom" && !r ? "monochrome" : B(e.color_scheme, [
			"monochrome",
			"v2c_blue",
			"teal",
			"green",
			"violet",
			"custom"
		], "monochrome"),
		accent_color: r,
		surface_style: B(e.surface_style, [
			"solid",
			"tinted",
			"transparent"
		], "solid"),
		hero_scale: Math.min(1.25, Math.max(.75, Number(e.hero_scale) || 1)),
		card_radius: Number.isFinite(e.card_radius) ? Math.min(40, Math.max(0, Number(e.card_radius))) : void 0,
		metrics: V(e.metrics, Be),
		energy_sources: V(e.energy_sources, Ve),
		intensity_control: B(e.intensity_control, [
			"slider",
			"presets",
			"both"
		], "both"),
		section_order: Ue(e.section_order, He),
		show_header: e.show_header ?? !0,
		show_badges: e.show_badges ?? !0,
		show_presets: e.show_presets ?? n !== "ultra_compact",
		advanced_open: e.advanced_open ?? !1,
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
function Ge(e) {
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
var Ke = {
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
}, qe = {
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
}, Je = {
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
}, Ye = {
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
}, Xe = {
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
}, Ze = {
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
}, Qe = {
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
}, $e = {
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
}, et = {
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
}, tt = {
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
}, nt = [
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
], rt = {
	en: et,
	it: Ye,
	de: qe,
	fr: Je,
	nl: Xe,
	sv: $e,
	da: Ke,
	no: Ze,
	ro: Qe,
	es: tt
};
function H(e, t) {
	let n = (e === "auto" ? t : e)?.toLowerCase().split(/[-_]/)[0] ?? "en", r = n === "nb" || n === "nn" ? "no" : n;
	return nt.includes(r) ? r : "en";
}
function U(e) {
	return rt[H(e)];
}
function W(e, t) {
	let n = t.split(".").reduce((e, t) => {
		if (!(typeof e != "object" || !e)) return e[t];
	}, e);
	return typeof n == "string" ? n : t;
}
//#endregion
//#region src/services/actions.ts
async function it(e, t, n) {
	return e.callService("number", "set_value", {
		entity_id: t,
		value: n
	});
}
async function at(e, t, n) {
	return e.callService("switch", n ? "turn_on" : "turn_off", { entity_id: t });
}
async function ot(e, t, n) {
	return e.callService("select", "select_option", {
		entity_id: t,
		option: n
	});
}
async function st(e, t, n, r) {
	let i = { entity_id: t };
	return n && r !== void 0 && (i.brightness = r), e.callService("light", n ? "turn_on" : "turn_off", i);
}
//#endregion
//#region src/models/types.ts
var G = /* @__PURE__ */ "connected.charging.ready.charge_power.charge_energy.charge_time.house_power.fv_power.battery_power.grid_power.voltage.intensity.min_intensity.max_intensity.meter_error.ssid.ip_address.signal_status.paused.locked.timer.dynamic.pause_dynamic.logo_led.light_led.charge_mode".split("."), ct = [
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
], lt = {
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
	ssid: "ssid",
	ip_address: "ip_address",
	signal_status: "signal_status",
	paused: "paused",
	locked: "locked",
	timer: "timer",
	dynamic: "dynamic",
	pause_dynamic: "pause_dynamic",
	logo_led: "logo_led",
	light_led: "light_led",
	charge_mode: "charge_mode"
}, ut = {
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
	ssid: ["_ssid"],
	ip_address: ["_ip_address", "_ip"],
	signal_status: ["_signal_status", "_signal"],
	paused: ["_paused", "_pausar_sesion"],
	locked: ["_locked", "_bloquear_evse"],
	timer: ["_timer", "_temporizador_de_punto_de_recarga"],
	dynamic: ["_dynamic", "_modulacion_de_intensidad_dinamica"],
	pause_dynamic: ["_pause_dynamic", "_pausar_la_modulacion_de_control_dinamico"],
	logo_led: ["_logo_led"],
	light_led: ["_light_led", "_luz_led"],
	charge_mode: ["_charge_mode", "_modo_de_carga"]
}, dt = {
	connected: ["binary_sensor"],
	charging: ["binary_sensor"],
	ready: ["binary_sensor"],
	charge_power: ["sensor"],
	charge_energy: ["sensor"],
	charge_time: ["sensor"],
	house_power: ["sensor"],
	fv_power: ["sensor"],
	battery_power: ["sensor"],
	grid_power: ["sensor"],
	voltage: ["sensor"],
	intensity: ["number"],
	min_intensity: ["number"],
	max_intensity: ["number"],
	meter_error: ["sensor", "binary_sensor"],
	ssid: ["sensor"],
	ip_address: ["sensor"],
	signal_status: ["sensor"],
	paused: ["switch"],
	locked: ["switch"],
	timer: ["switch"],
	dynamic: ["switch"],
	pause_dynamic: ["switch"],
	logo_led: ["light"],
	light_led: ["light"],
	charge_mode: ["select"]
};
function ft(e, t) {
	let n = t.split(".", 1)[0] ?? "";
	return dt[e]?.includes(n) ?? !0;
}
function pt(e, t) {
	return ut[t]?.some((t) => e.endsWith(t)) ?? !1;
}
function mt(e, t) {
	if (t.length === 1) return t[0];
	if (e === "voltage") {
		let e = t.filter((e) => e.startsWith("sensor."));
		if (e.length === 1) return e[0];
	}
}
function ht(e, t, n = {}) {
	let r = {}, i = {}, a = {}, o = e.find((e) => e.entity_id === t), s = o?.device_id ?? void 0, c = s ? e.filter((e) => e.device_id === s && e.disabled_by == null) : e.filter((e) => e.disabled_by == null);
	for (let t of G) {
		let a = n[t];
		a && (ft(t, a) && (!s || c.some((e) => e.entity_id === a) || !e.some((e) => e.entity_id === a)) ? (r[t] = a, i[t] = "manual") : i[t] = "invalid");
	}
	for (let e of G) {
		if (r[e]) continue;
		let t = c.filter((t) => lt[t.translation_key ?? ""] === e).map((e) => e.entity_id), n = mt(e, t);
		if (n) {
			r[e] = n, i[e] = "automatic";
			continue;
		}
		if (t.length > 1) {
			a[e] = t, i[e] = "ambiguous";
			continue;
		}
		let o = c.filter((t) => pt(t.entity_id, e)).map((e) => e.entity_id), s = mt(e, o);
		s ? (r[e] = s, i[e] = "automatic") : o.length > 1 && (a[e] = o, i[e] = "ambiguous");
	}
	if (o?.translation_key) {
		let e = lt[o.translation_key];
		e && !r[e] && (r[e] = t, i[e] = "automatic");
	}
	return {
		entities: r,
		ambiguities: a,
		missing: G.filter((e) => !r[e]),
		deviceId: s,
		statuses: Object.fromEntries(G.map((e) => [e, i[e] ?? "missing"]))
	};
}
var gt = class {
	#e = 0;
	#t = /* @__PURE__ */ new Map();
	invalidate() {
		this.#e += 1, this.#t.clear();
	}
	async discover(e, t, n = {}) {
		let r = ++this.#e, i = this.#t.get(t);
		return i || (i = Object.values(e.entities ?? {}), i.length === 0 && e.callWS && (i = await e.callWS({ type: "config/entity_registry/list" })), this.#t.set(t, i)), r === this.#e ? ht(i, t, n) : null;
	}
};
//#endregion
//#region src/services/energy.ts
function _t(e) {
	if (!e || e.state === "unknown" || e.state === "unavailable") return null;
	let t = Number(e.state);
	if (!Number.isFinite(t)) return null;
	let n = e.attributes.unit_of_measurement?.toLowerCase();
	return n === "kw" ? t * 1e3 : n === "mw" ? t * 1e6 : t;
}
function vt(e, t, n) {
	return Math.abs(t) < n ? "idle" : e === "grid" ? t > 0 ? "import" : "export" : e === "battery" ? t > 0 ? "discharge" : "charge" : e === "solar" ? t > 0 ? "produce" : "unknown" : t > 0 ? "consume" : "export";
}
function yt(e, t, n = {}) {
	let r = _t(t);
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
		direction: vt(e, i, n.thresholdW ?? 50),
		available: !0
	};
}
//#endregion
//#region src/services/format.ts
var bt = {
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
function xt(e) {
	return bt[e ?? "es"] ?? "en-US";
}
function St(e, t = "es") {
	if (e === null || !Number.isFinite(e)) return "—";
	let n = Math.abs(e);
	return n >= 1e3 ? `${new Intl.NumberFormat(xt(t), { maximumFractionDigits: 1 }).format(n / 1e3)} kW` : `${new Intl.NumberFormat(xt(t), { maximumFractionDigits: 0 }).format(n)} W`;
}
function Ct(e, t = "es") {
	let n = Number(e);
	return Number.isFinite(n) ? `${new Intl.NumberFormat(xt(t), { maximumFractionDigits: 2 }).format(n)} kWh` : "—";
}
function wt(e) {
	let t = Number(e);
	if (!Number.isFinite(t) || t < 0) return "—";
	let n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60);
	return `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
//#endregion
//#region src/services/state.ts
var Tt = {
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
}, Et = {
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
function Dt(e) {
	return e.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
}
function Ot(e) {
	if (!e) return;
	let t = Dt(e);
	return ct.includes(t) ? t : Tt[t];
}
function kt(e) {
	let t = Ot(e.externalStatus), n = (e.connected === void 0 || e.connected === "unknown") && (e.charging === void 0 || e.charging === "unknown") ? e.ready === void 0 || e.ready === "unknown" : !1, r;
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
		severity: Et[e],
		badges: t.inhibitors,
		diagnostic: t.diagnostic,
		unavailable: n
	};
}
function At(e) {
	return e.externalStatus ? K(e.externalStatus, e) : e.fault === "control_pilot" ? K("control_pilot", e) : e.fault === "load_balancing" ? K("load_balancing", e) : e.fault === "meter" || e.fault === "generic" ? K("error", e) : e.maintenance === "updating" ? K("updating", e) : e.phase === "charging" ? K("charging", e) : e.phase === "complete" ? K("complete", e) : e.inhibitors.includes("timer") ? K("timer", e) : e.connectivity === "wifi_connecting" ? K("wifi_connecting", e) : e.connectivity === "wifi_connected" ? K("wifi_connected", e) : e.phase === "connected" || e.inhibitors.includes("paused") ? K("waiting_power", e) : K("disconnected", e, e.phase === "unavailable");
}
function q(e) {
	return e === "on" || e === "true" ? !0 : e === "off" || e === "false" ? !1 : "unknown";
}
//#endregion
//#region src/card/advanced-controls.ts
var jt = [
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
function J(e) {
	return !!(e && e.state !== "unknown" && e.state !== "unavailable");
}
function Mt(e, t, n) {
	let r = e.entities[t];
	if (!r) return O;
	let i = e.hass.states[r], a = i?.state === "on";
	return E`
    <div class="toggle-row">
      <span>${t === "locked" && a ? W(e.dictionary, "actions.unlock") : W(e.dictionary, n)}</span>
      <button
        data-role=${t}
        role="switch"
        aria-checked=${String(a)}
        aria-pressed=${String(a)}
        aria-busy=${String(e.pending.includes(t))}
        ?disabled=${!J(i) || e.pending.includes(t)}
        @click=${() => e.onToggle(t)}
      >${a ? "ON" : "OFF"}</button>
    </div>
  `;
}
function Nt(e) {
	let t = jt.map(({ role: t, label: n }) => Mt(e, t, n)), n = e.entities.charge_mode, r = n ? e.hass.states[n] : void 0, i = e.entities.logo_led, a = i ? e.hass.states[i] : void 0, o = e.entities.light_led, s = !!(e.voltage || e.diagnostic || e.ambiguityRoles?.length);
	return !t.some((e) => e !== O) && !n && !i && !o && !s ? O : E`
    <details ?open=${e.advancedOpen === !0}>
      <summary>${W(e.dictionary, "labels.advanced")}</summary>
      <div class="advanced-grid">
        ${t.slice(0, 2).some((e) => e !== O) || n ? E`
              <section class="control-group">
                <h3>${W(e.dictionary, "labels.chargingControls")}</h3>
                ${t.slice(0, 2)}
                ${n ? E`
                      <label class="select-row">
                        <span>${W(e.dictionary, "actions.chargeMode")}</span>
                        <select
                          data-role="charge_mode"
                          .value=${r?.state ?? ""}
                          ?disabled=${!J(r) || e.pending.includes("charge_mode")}
                          @change=${(t) => e.onSelect(t.target.value)}
                        >
                          ${(r?.attributes.options ?? []).map((e) => E`<option .value=${String(e)}>${String(e)}</option>`)}
                        </select>
                      </label>
                    ` : O}
              </section>
            ` : O}
        ${t.slice(2).some((e) => e !== O) ? E`
              <section class="control-group">
                <h3>${W(e.dictionary, "labels.energyControls")}</h3>
                ${t.slice(2)}
              </section>
            ` : O}
        ${i || o ? E`
              <section class="control-group">
                <h3>${W(e.dictionary, "labels.lightControls")}</h3>
                ${Mt(e, "logo_led", "actions.logoLed")}
                ${i && J(a) ? E`
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
                    ` : O}
                ${Mt(e, "light_led", "actions.lightLed")}
              </section>
            ` : O}
        ${s ? E`
              <section class="control-group">
                <h3>${W(e.dictionary, "labels.diagnostics")}</h3>
                <dl class="technical-list">
                  ${e.voltage ? E`
                        <div class="technical-row">
                          <dt>${W(e.dictionary, "labels.voltage")}</dt>
                          <dd>${e.voltage.state} ${e.voltage.attributes.unit_of_measurement ?? "V"}</dd>
                        </div>
                      ` : O}
                  ${e.diagnostic ? E`
                        <div class="technical-row" data-severity="error">
                          <dt>${W(e.dictionary, "labels.diagnostics")}</dt>
                          <dd>${e.diagnostic}</dd>
                        </div>
                      ` : O}
                  ${e.ambiguityRoles?.length ? E`
                        <div class="technical-row">
                          <dt>${W(e.dictionary, "labels.configuration")}</dt>
                          <dd>YAML · ${e.ambiguityRoles.join(", ")}</dd>
                        </div>
                      ` : O}
                </dl>
              </section>
            ` : O}
      </div>
    </details>
  `;
}
//#endregion
//#region src/card/energy-flow.ts
var Pt = {
	solar: "mdi:solar-power",
	grid: "mdi:transmission-tower",
	home: "mdi:home-lightning-bolt",
	battery: "mdi:home-battery",
	charger: "mdi:ev-station"
};
function Ft(e, t, n) {
	if (e.length === 0) return O;
	let r = e.filter((e) => e.available), i = e.length - r.length, a = r.filter((e) => !["idle", "unknown"].includes(e.direction)), o = a.length > 0 ? "active" : r.length === 0 ? "unavailable" : i > 0 ? "partial" : "idle", s = `${W(t, o === "active" ? "flows.activeFlow" : o === "partial" ? "flows.partialData" : o === "unavailable" ? "flows.noData" : "flows.noFlow")}${o === "idle" ? " · 0 W" : ""}`;
	return E`
    <section class="energy-section" aria-label=${W(t, "labels.energyFlow")}>
      <div class="energy-summary" data-kind=${o}>
        <p class="energy-summary-title">
          <ha-icon icon="mdi:lightning-bolt-outline" aria-hidden="true"></ha-icon>
          <span>${s}</span>
        </p>
        ${a.length ? E`
              <div class="energy-nodes">
                ${a.map((e) => {
		let r = W(t, `flows.${e.role}`), i = W(t, `flows.${e.direction}`), a = St(e.watts, n);
		return E`
                    <div class="flow-node" aria-label=${`${r}: ${a}, ${i}`}>
                      <span class="flow-name" aria-hidden="true"><ha-icon icon=${Pt[e.role]}></ha-icon></span>
                      <span class="flow-name-text">${r}</span>
                      <strong class="flow-value">${a}</strong>
                      <span class="flow-direction">${i}</span>
                    </div>
                  `;
	})}
              </div>
            ` : O}
        ${a.length && i ? E`<p class="energy-note">${W(t, "flows.partialData")}</p>` : O}
      </div>
    </section>
  `;
}
//#endregion
//#region src/card/session-controls.ts
function Y(e) {
	return !!(e && e.state !== "unknown" && e.state !== "unavailable");
}
function It(e) {
	let t = e.entities.intensity, n = e.entities.paused, r = t ? e.hass.states[t] : void 0, i = n ? e.hass.states[n] : void 0;
	if (!t && !n) return O;
	let a = Number(r?.attributes.min ?? 6), o = Number(r?.attributes.max ?? 32), s = Number(r?.attributes.step ?? 1), c = Number(r?.state), l = e.sliderValue ?? (Number.isFinite(c) ? c : a), u = e.presets.filter((e) => e >= a && e <= o), d = i?.state === "on", f = e.intensityControl !== "presets", p = e.showPresets !== !1 && e.intensityControl !== "slider";
	return E`
    <section class="session-controls" aria-label=${W(e.dictionary, "labels.chargingControls")}>
      ${t ? E`<div class="range-control">
        ${f ? E`<label class="range-head" for="v2c-intensity"><span>${W(e.dictionary, "labels.intensity")}</span><output>${Math.round(l)} A</output></label>
        <input id="v2c-intensity" data-role="intensity" type="range" .min=${String(a)} .max=${String(o)} .step=${String(s)} .value=${String(l)} ?disabled=${!Y(r) || e.pending.includes("intensity")} aria-busy=${String(e.pending.includes("intensity"))} @input=${(t) => e.onSliderInput(Number(t.target.value))} @change=${(t) => e.onIntensity(Number(t.target.value))} />` : O}
        ${p ? E`<div class="presets" aria-label=${W(e.dictionary, "labels.intensity")}>${u.map((t) => E`<button class="preset" aria-pressed=${String(Math.round(l) === t)} ?disabled=${!Y(r) || e.pending.includes("intensity")} @click=${() => e.onIntensity(t)}>${t} A</button>`)}</div>` : O}
      </div>` : O}
      ${n ? E`<button class="primary-action" data-role="paused" aria-busy=${String(e.pending.includes("paused"))} ?disabled=${!Y(i) || e.pending.includes("paused")} title=${Y(i) ? "" : W(e.dictionary, "labels.unavailableEntity")} @click=${e.onPause}>${W(e.dictionary, d ? "actions.resume" : "actions.pause")}</button>` : O}
    </section>
  `;
}
//#endregion
//#region src/card/styles.ts
var Lt = o`
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
    gap: clamp(28px, 5cqw, 38px);
    align-items: center;
    margin-top: 18px;
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
    width: min(100%, clamp(260px, 68cqw, 360px));
    aspect-ratio: 312 / 480;
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
    margin-top: 14px;
    overflow-wrap: anywhere;
    color: var(--v2c-text);
    font-size: clamp(2rem, 7cqw, 2.5rem);
    font-weight: 650;
    letter-spacing: -0.035em;
    line-height: 1.05;
  }

  .device-column.without-charger .charger-status { margin-top: 0; }
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
  ha-card[data-mode="compact"] .hero { gap: 20px; margin-top: 12px; }
  ha-card[data-mode="compact"] .charger-stage { width: min(100%, clamp(210px, 62cqw, 280px)); }
  ha-card[data-mode="compact"] .charger-status { margin-top: 10px; font-size: clamp(1.65rem, 6cqw, 2rem); }
  ha-card[data-mode="compact"] .metric { padding: 9px; }
  ha-card[data-mode="compact"] .session-controls,
  ha-card[data-mode="compact"] .energy-section { margin-top: 10px; padding-top: 10px; }
  ha-card[data-mode="compact"] details { margin-top: 10px; }

  ha-card[data-mode="ultra_compact"] .shell { padding: 14px; }
  ha-card[data-mode="ultra_compact"] .location { display: none; }
  ha-card[data-mode="ultra_compact"] h2 { font-size: 0.86rem; }
  ha-card[data-mode="ultra_compact"] .hero {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
    margin-top: 10px;
    align-items: center;
  }
  ha-card[data-mode="ultra_compact"] .charger-stage { width: min(100%, clamp(170px, 56cqw, 220px)); }
  ha-card[data-mode="ultra_compact"] .charger-status { margin-top: 8px; font-size: clamp(1.35rem, 5.5cqw, 1.65rem); }
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

  ha-card[data-show-header="false"] .card-heading { display: none; }
  ha-card[data-surface="transparent"] { background: transparent; }
  ha-card[data-surface="tinted"] { background: color-mix(in srgb, var(--v2c-control) 8%, var(--v2c-surface)); }
  .charger-stage { transform: scale(var(--v2c-hero-scale, 1)); transform-origin: center; }
  ha-card[data-layout="inline"] .hero { grid-template-columns: auto minmax(0, 1fr); gap: 12px; }
  ha-card[data-layout="inline"] .charger-stage { width: min(112px, 26cqw); }
  ha-card[data-layout="inline"] .charger-status { font-size: clamp(1.1rem, 4cqw, 1.6rem); }
  @container (min-width: 520px) {
    ha-card[data-layout="split"] .hero, ha-card[data-layout="auto"][data-mode="standard"] .hero { grid-template-columns: minmax(180px, .8fr) minmax(0, 1.2fr); }
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
function X(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/card/v2c-trydan-card.ts
var Z = class extends F {
	constructor(...e) {
		super(...e), this.resolvedEntities = {}, this.ambiguities = {}, this.pendingRoles = [], this.actionMessage = "", this.#e = new gt(), this.#t = /* @__PURE__ */ new Map(), this.#n = "";
	}
	static {
		this.styles = Lt;
	}
	#e;
	#t;
	#n;
	static getConfigElement() {
		return document.createElement("v2c-trydan-card-editor");
	}
	static getStubConfig(e) {
		return Ge(e);
	}
	setConfig(e) {
		let t = this.config?.entity;
		this.config = We(e), this.resolvedEntities = ht(Object.values(this.hass?.entities ?? {}), this.config.entity, this.config.entities).entities, this.sliderValue = void 0, this.#n = "", t && t !== this.config.entity && this.#e.invalidate();
	}
	getCardSize() {
		return this.config?.display_mode === "ultra_compact" ? 3 : this.config?.display_mode === "compact" ? 4 : this.config?.display_mode === "standard" ? 6 : 8;
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		for (let e of this.#t.values()) e.timer && clearTimeout(e.timer);
		this.#t.clear();
	}
	updated(e) {
		(e.has("hass") || this.#n === "") && (this.#r(), this.#l());
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
		let e = this.config?.color_scheme === "custom" ? this.config.accent_color : {
			v2c_blue: "#0067D9",
			teal: "#007F86",
			green: "#2E7D32",
			violet: "#6750A4"
		}[this.config?.color_scheme ?? ""], t = e && parseInt(e.slice(1, 3), 16) * .299 + parseInt(e.slice(3, 5), 16) * .587 + parseInt(e.slice(5, 7), 16) * .114 > 150 ? "#000" : "#fff";
		return (e ? `--v2c-control:${e};--v2c-on-control:${t};` : "") + (this.config?.card_radius === void 0 ? "" : `--v2c-radius:${this.config.card_radius}px;`) + `--v2c-hero-scale:${this.config?.hero_scale ?? 1};`;
	}
	#o() {
		return H(this.config?.language, this.hass?.locale?.language ?? this.hass?.language);
	}
	#s(e, t) {
		this.#t.set(e, t), this.pendingRoles = [...this.#t.keys()];
	}
	#c(e, t) {
		let n = this.#t.get(e);
		n?.timer && clearTimeout(n.timer), this.#t.delete(e), this.pendingRoles = [...this.#t.keys()];
		let r = U(this.#o());
		this.actionMessage = W(r, t ? "labels.actionDone" : "labels.actionFailed");
	}
	#l() {
		if (this.hass) for (let [e, t] of this.#t) t.matches(this.hass.states[t.entityId]) && this.#c(e, !0);
	}
	async #u(e, t, n, r) {
		if (this.#t.has(e)) return;
		let i = U(this.#o());
		this.actionMessage = W(i, "labels.actionPending");
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
		let r = Number(n.attributes.min ?? 6), i = Number(n.attributes.max ?? 32), a = Number(n.attributes.step ?? 1), o = Math.min(i, Math.max(r, Math.round(e / a) * a));
		this.sliderValue = o, this.#u("intensity", t, (e) => Number(e?.state) === o, () => it(this.hass, t, o));
	}
	#f(e) {
		let t = this.resolvedEntities[e], n = t ? this.hass?.states[t] : void 0;
		if (!this.hass || !t || !n) return;
		let r = n.state !== "on";
		e === "locked" && r && this.config?.confirm_lock !== !1 && !window.confirm(W(U(this.#o()), "actions.confirmLock")) || this.#u(e, t, (e) => e?.state === (r ? "on" : "off"), () => at(this.hass, t, r));
	}
	#p(e) {
		let t = this.resolvedEntities.charge_mode;
		!this.hass || !t || this.#u("charge_mode", t, (t) => t?.state === e, () => ot(this.hass, t, e));
	}
	#m(e) {
		let t = this.resolvedEntities[e], n = t ? this.hass?.states[t] : void 0;
		if (!this.hass || !t || !n) return;
		let r = n.state !== "on";
		this.#u(e, t, (e) => e?.state === (r ? "on" : "off"), () => st(this.hass, t, r));
	}
	#h(e) {
		let t = this.resolvedEntities.logo_led;
		!this.hass || !t || this.#u("logo_led", t, (t) => Number(t?.attributes.brightness) === e, () => st(this.hass, t, !0, e));
	}
	render() {
		if (!this.config || !this.hass) return E`<ha-card><div class="empty">V2C Trydan Card · configuración pendiente</div></ha-card>`;
		let e = this.#o(), t = U(e), n = this.hass.states[this.config.entity], r = yt("charger", this.#i("charge_power"), { thresholdW: this.config.flow_threshold_w }), i = At(kt({
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
		], l = this.config.energy_sources ?? [], u = c.filter(([e, t]) => l.includes(e) && !!this.resolvedEntities[t]).map(([e, t, n]) => yt(e, this.#i(t), {
			invert: n,
			thresholdW: this.config?.flow_threshold_w
		})), d = (this.config.metrics ?? []).map((n) => n === "power" ? E`<div class="metric metric-power"><span class="metric-label">${W(t, "labels.power")}</span><strong class="metric-value">${St(r.watts, e)}</strong></div>` : n === "energy" ? E`<div class="metric"><span class="metric-label">${W(t, "labels.energy")}</span><strong class="metric-value">${Ct(o?.state ?? null, e)}</strong></div>` : E`<div class="metric"><span class="metric-label">${W(t, "labels.time")}</span><strong class="metric-value">${wt(s?.state ?? null)}</strong></div>`), f = Object.keys(this.ambiguities), p = i.diagnostic && i.diagnostic !== "no_error" ? i.diagnostic.replaceAll("_", " ") : void 0, ee = E`
      <section class="hero" data-section="hero">
        <div class="device-column ${this.config.show_charger ? "has-charger" : "without-charger"}">
          ${this.config.show_charger ? E`<div class="charger-stage"><div class="charger-art" aria-hidden="true">${Fe(Ie[i.key])}</div></div>` : O}
          <div class="charger-status" data-severity=${i.severity} role="status">${W(t, i.labelKey)}</div>
          ${this.config.show_badges !== !1 && i.badges.length ? E`<div class="badges" aria-label=${W(t, "labels.additionalStatus")}>${i.badges.map((e) => E`<span class="badge">${W(t, `badges.${e}`)}</span>`)}</div>` : O}
        </div>
      </section>`, m = d.length ? E`<section class="metrics-section" data-section="metrics"><div class="primary-metrics">${d}</div></section>` : O, h = this.config.show_controls ? E`<div data-section="controls">${It({
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
		})}</div>` : O, te = this.config.show_energy_flow ? E`<div data-section="energy">${Ft(u, t, e)}</div>` : O, ne = this.config.show_advanced ? E`<div data-section="advanced">${Nt({
			hass: this.hass,
			entities: this.resolvedEntities,
			dictionary: t,
			pending: this.pendingRoles,
			voltage: this.#i("voltage"),
			diagnostic: p,
			ambiguityRoles: f,
			advancedOpen: this.config.advanced_open,
			onToggle: (e) => e === "logo_led" || e === "light_led" ? this.#m(e) : this.#f(e),
			onSelect: (e) => this.#p(e),
			onBrightness: (e) => this.#h(e)
		})}</div>` : O, g = (e) => {
			switch (e) {
				case "hero": return ee;
				case "metrics": return m;
				case "controls": return h;
				case "energy": return te;
				default: return ne;
			}
		}, _ = this.config.section_order ?? [
			"hero",
			"metrics",
			"controls",
			"energy",
			"advanced"
		];
		return E`
      <ha-card data-theme=${this.config.theme ?? "auto"} data-mode=${this.config.display_mode ?? "standard"} data-layout=${this.config.layout ?? "auto"} data-surface=${this.config.surface_style ?? "solid"} data-show-header=${String(this.config.show_header !== !1)} style=${this.#a()}>
        <div class="shell">
          ${this.config.show_header === !1 ? O : E`<header class="card-heading"><h2>${a}</h2>${this.config.location ? E`<span class="location">${this.config.location}</span>` : O}</header>`}
          <div class="content-sections">${_.map(g)}</div>
          <p class="live-region" aria-live="polite">${this.actionMessage}</p>
        </div>
      </ha-card>`;
	}
};
X([I({ attribute: !1 })], Z.prototype, "hass", void 0), X([L()], Z.prototype, "config", void 0), X([L()], Z.prototype, "resolvedEntities", void 0), X([L()], Z.prototype, "ambiguities", void 0), X([L()], Z.prototype, "sliderValue", void 0), X([L()], Z.prototype, "pendingRoles", void 0), X([L()], Z.prototype, "actionMessage", void 0);
//#endregion
//#region src/editor/v2c-trydan-card-editor.ts
var Rt = {
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
}, zt = [
	["show_energy_flow", "editor.showEnergyFlow"],
	["show_controls", "editor.showControls"],
	["show_advanced", "editor.showAdvanced"],
	["show_charger", "editor.showCharger"],
	["show_header", "Header"],
	["show_badges", "Badges"],
	["show_presets", "Presets"]
], Q = class extends F {
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
    .entity-status { font-size: 0.72rem; text-transform: capitalize; color: var(--secondary-text-color); }
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
	#n(e, t) {
		if (!this.config) return;
		let n = t.split(",").map((e) => e.trim()).filter(Boolean), r = { ...this.config };
		e === "current_presets" ? r.current_presets = n.map(Number).filter(Number.isFinite) : Object.assign(r, { [e]: n }), this.#e(r);
	}
	#r(e, t) {
		if (!this.config) return;
		let n = Number(t), r = { ...this.config };
		Number.isFinite(n) ? Object.assign(r, { [e]: n }) : delete r[e], this.#e(r);
	}
	#i(e, t) {
		if (!this.config) return;
		let n = { ...this.config.entities ?? {} };
		t.trim() ? n[e] = t : delete n[e], this.#e({
			...this.config,
			entities: n
		});
	}
	render() {
		if (!this.config) return O;
		let e = U(H(this.config.language ?? this.hass?.locale?.language ?? this.hass?.language)), t = Object.keys(this.hass?.states ?? {}), n = this.hass ? ht(Object.values(this.hass.entities ?? {}), this.config.entity, this.config.entities) : void 0;
		return E`
      <div class="editor">
        <h3>${W(e, "editor.title")}</h3>
        <label>
          <span>${W(e, "editor.entity")}</span>
          <input
            data-field="entity"
            list="v2c-entities"
            .value=${this.config.entity}
            @change=${(e) => this.#t("entity", e.target.value)}
          />
        </label>
        <div class="grid">
          ${["name", "location"].map((t) => E`
              <label>
                <span>${W(e, `editor.${t}`)}</span>
                <input
                  data-field=${t}
                  .value=${this.config?.[t] ?? ""}
                  @change=${(e) => this.#t(t, e.target.value)}
                />
              </label>
            `)}
          <label>
            <span>${W(e, "editor.language")}</span>
            <select
              data-field="language"
              .value=${this.config.language ?? "auto"}
              @change=${(e) => this.#t("language", e.target.value)}
            >
              <option value="auto">Automatic</option>${nt.map((e) => E`<option .value=${e}>${Rt[e]}</option>`)}
            </select>
          </label>
          <label>
            <span>${W(e, "editor.theme")}</span>
            <select
              data-field="theme"
              .value=${this.config.theme ?? "auto"}
              @change=${(e) => this.#t("theme", e.target.value)}
            >
              <option value="auto">${W(e, "editor.themeAuto")}</option>
              <option value="light">${W(e, "editor.themeLight")}</option>
              <option value="dark">${W(e, "editor.themeDark")}</option>
            </select>
          </label>
          <label>
            <span>${W(e, "editor.displayMode")}</span>
            <select
              data-field="display_mode"
              .value=${this.config.display_mode ?? "standard"}
              @change=${(e) => this.#t("display_mode", e.target.value)}
            >
              <option value="xxl">XXL</option>
              <option value="standard">${W(e, "editor.modeStandard")}</option>
              <option value="compact">${W(e, "editor.modeCompact")}</option>
              <option value="ultra_compact">${W(e, "editor.modeUltra")}</option>
            </select>
          </label>
        </div>
        <h3>Appearance</h3>
        <div class="grid">
          <label><span>Layout</span><select data-field="layout" .value=${this.config.layout ?? "auto"} @change=${(e) => this.#t("layout", e.target.value)}><option value="auto">Auto</option><option value="centered">Centered</option><option value="split">Split</option><option value="inline">Inline</option></select></label>
          <label><span>Color scheme</span><select data-field="color_scheme" .value=${this.config.color_scheme ?? "monochrome"} @change=${(e) => this.#t("color_scheme", e.target.value)}><option value="monochrome">Monochrome</option><option value="v2c_blue">V2C blue</option><option value="teal">Teal</option><option value="green">Green</option><option value="violet">Violet</option><option value="custom">Custom</option></select></label>
          <label><span>Accent color</span><input data-field="accent_color" .value=${this.config.accent_color ?? ""} @change=${(e) => this.#t("accent_color", e.target.value)} /></label>
          <label><span>Surface</span><select data-field="surface_style" .value=${this.config.surface_style ?? "solid"} @change=${(e) => this.#t("surface_style", e.target.value)}><option value="solid">Solid</option><option value="tinted">Tinted</option><option value="transparent">Transparent</option></select></label>
        </div>
        <h3>Content and order</h3>
        <div class="grid">
          <label><span>Metrics</span><input data-field="metrics" .value=${(this.config.metrics ?? []).join(", ")} @change=${(e) => this.#n("metrics", e.target.value)} /></label>
          <label><span>Energy sources</span><input data-field="energy_sources" .value=${(this.config.energy_sources ?? []).join(", ")} @change=${(e) => this.#n("energy_sources", e.target.value)} /></label>
          <label><span>Section order</span><input data-field="section_order" .value=${(this.config.section_order ?? []).join(", ")} @change=${(e) => this.#n("section_order", e.target.value)} /></label>
          <label><span>Hero scale</span><input data-field="hero_scale" type="number" min="0.75" max="1.25" step="0.05" .value=${String(this.config.hero_scale ?? 1)} @change=${(e) => this.#r("hero_scale", e.target.value)} /></label>
          <label><span>Card radius</span><input data-field="card_radius" type="number" min="0" max="40" step="1" .value=${String(this.config.card_radius ?? "")} @change=${(e) => this.#r("card_radius", e.target.value)} /></label>
        </div>        <div class="checks">
          ${zt.map(([t, n]) => E`
              <label>
                <input
                  data-field=${t}
                  type="checkbox"
                  .checked=${this.config?.[t] !== !1}
                  @change=${(e) => this.#t(t, e.target.checked)}
                />
                ${n.includes(".") ? W(e, n) : n}
              </label>
            `)}
        </div>
        <h3>Advanced</h3>
        <div class="grid">
          <label><span>Intensity control</span><select data-field="intensity_control" .value=${this.config.intensity_control ?? "both"} @change=${(e) => this.#t("intensity_control", e.target.value)}><option value="slider">Slider</option><option value="presets">Presets</option><option value="both">Both</option></select></label>
          <label><span>Flow threshold (W)</span><input data-field="flow_threshold_w" type="number" min="0" .value=${String(this.config.flow_threshold_w ?? 50)} @change=${(e) => this.#r("flow_threshold_w", e.target.value)} /></label>
          <label><span>Current presets</span><input data-field="current_presets" .value=${(this.config.current_presets ?? []).join(", ")} @change=${(e) => this.#n("current_presets", e.target.value)} /></label>
        </div>
        <div class="checks">
          <label><input data-field="advanced_open" type="checkbox" .checked=${this.config.advanced_open === !0} @change=${(e) => this.#t("advanced_open", e.target.checked)} />Open advanced</label>
          <label><input data-field="confirm_lock" type="checkbox" .checked=${this.config.confirm_lock !== !1} @change=${(e) => this.#t("confirm_lock", e.target.checked)} />Confirm lock</label>
          <label><input data-field="invert_grid_power" type="checkbox" .checked=${this.config.invert_grid_power === !0} @change=${(e) => this.#t("invert_grid_power", e.target.checked)} />Invert grid power</label>
          <label><input data-field="invert_battery_power" type="checkbox" .checked=${this.config.invert_battery_power === !0} @change=${(e) => this.#t("invert_battery_power", e.target.checked)} />Invert battery power</label>
          <label><input data-field="invert_solar_power" type="checkbox" .checked=${this.config.invert_solar_power === !0} @change=${(e) => this.#t("invert_solar_power", e.target.checked)} />Invert solar power</label>
        </div>
        <h3>Entities</h3>
        <details><summary>Entities (manual overrides)</summary><div class="grid">${G.map((e) => E`<label><span>${e.replaceAll("_", " ")}</span><input data-role=${e} list="v2c-entities" .value=${this.config?.entities?.[e] ?? ""} @change=${(t) => this.#i(e, t.target.value)} /><small class="entity-status" data-status=${n?.statuses[e] ?? "missing"}>${n?.statuses[e] ?? "missing"}</small></label>`)}</div></details>        <p class="yaml-note"><code>YAML | status_entity | entities | invert_*_power | current_presets | flow_threshold_w</code></p>
        <datalist id="v2c-entities">${t.map((e) => E`<option value=${e}></option>`)}</datalist>
      </div>
    `;
	}
};
X([I({ attribute: !1 })], Q.prototype, "hass", void 0), X([L()], Q.prototype, "config", void 0);
//#endregion
//#region src/index.ts
var $ = "v2c-trydan-card", Bt = "v2c-trydan-card-editor";
customElements.get($) || customElements.define($, Z), customElements.get(Bt) || customElements.define(Bt, Q), window.customCards = window.customCards ?? [], window.customCards.some((e) => e.type === $) || window.customCards.push({
	type: $,
	name: "V2C Trydan Card",
	description: "Quiet Hardware V2C Trydan charger control and smart energy summary.",
	preview: !0
});
//#endregion
export { Z as V2cTrydanCard, Q as V2cTrydanCardEditor };
