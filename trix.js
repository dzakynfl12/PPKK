! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Trix = e()
}(this, (function () {
    "use strict";
    var t = "2.0.0";
    const e = "[data-trix-attachment]",
        i = {
            preview: {
                presentation: "gallery",
                caption: {
                    name: !0,
                    size: !0
                }
            },
            file: {
                caption: {
                    size: !0
                }
            }
        },
        n = {
            default: {
                tagName: "div",
                parse: !1
            },
            quote: {
                tagName: "blockquote",
                nestable: !0
            },
            heading1: {
                tagName: "h1",
                terminal: !0,
                breakOnReturn: !0,
                group: !1
            },
            code: {
                tagName: "pre",
                terminal: !0,
                text: {
                    plaintext: !0
                }
            },
            bulletList: {
                tagName: "ul",
                parse: !1
            },
            bullet: {
                tagName: "li",
                listAttribute: "bulletList",
                group: !1,
                nestable: !0,
                test(t) {
                    return r(t.parentNode) === n[this.listAttribute].tagName
                }
            },
            numberList: {
                tagName: "ol",
                parse: !1
            },
            number: {
                tagName: "li",
                listAttribute: "numberList",
                group: !1,
                nestable: !0,
                test(t) {
                    return r(t.parentNode) === n[this.listAttribute].tagName
                }
            },
            attachmentGallery: {
                tagName: "div",
                exclusive: !0,
                terminal: !0,
                parse: !1,
                group: !1
            }
        },
        r = t => {
            var e;
            return null == t || null === (e = t.tagName) || void 0 === e ? void 0 : e.toLowerCase()
        };
    var o = {
            composesExistingText: /Android.*Chrome/.test(navigator.userAgent),
            forcesObjectResizing: /Trident.*rv:11/.test(navigator.userAgent),
            supportsInputEvents: function () {
                if ("undefined" == typeof InputEvent) return !1;
                for (const t of ["data", "getTargetRanges", "inputType"])
                    if (!(t in InputEvent.prototype)) return !1;
                return !0
            }()
        },
        s = {
            attachFiles: "Attach Files",
            bold: "Bold",
            bullets: "Bullets",
            byte: "Byte",
            bytes: "Bytes",
            captionPlaceholder: "Add a caption…",
            code: "Code",
            heading1: "Heading",
            indent: "Increase Level",
            italic: "Italic",
            link: "Link",
            numbers: "Numbers",
            outdent: "Decrease Level",
            quote: "Quote",
            redo: "Redo",
            remove: "Remove",
            strike: "Strikethrough",
            undo: "Undo",
            unlink: "Unlink",
            url: "URL",
            urlPlaceholder: "Enter a URL…",
            GB: "GB",
            KB: "KB",
            MB: "MB",
            PB: "PB",
            TB: "TB"
        };
    const a = [s.bytes, s.KB, s.MB, s.GB, s.TB, s.PB];
    var l = {
        prefix: "IEC",
        precision: 2,
        formatter(t) {
            switch (t) {
                case 0:
                    return "0 ".concat(s.bytes);
                case 1:
                    return "1 ".concat(s.byte);
                default:
                    let e;
                    "SI" === this.prefix ? e = 1e3 : "IEC" === this.prefix && (e = 1024);
                    const i = Math.floor(Math.log(t) / Math.log(e)),
                        n = (t / Math.pow(e, i)).toFixed(this.precision).replace(/0*$/, "").replace(/\.$/, "");
                    return "".concat(n, " ").concat(a[i])
            }
        }
    };
    const c = "\ufeff",
        u = " ",
        h = function (t) {
            for (const e in t) {
                const i = t[e];
                this[e] = i
            }
            return this
        },
        d = document.documentElement,
        g = d.matches,
        m = function (t) {
            let {
                onElement: e,
                matchingSelector: i,
                withCallback: n,
                inPhase: r,
                preventDefault: o,
                times: s
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const a = e || d,
                l = i,
                c = "capturing" === r,
                u = function (t) {
                    null != s && 0 == --s && u.destroy();
                    const e = b(t.target, {
                        matchingSelector: l
                    });
                    null != e && (null == n || n.call(e, t, e), o && t.preventDefault())
                };
            return u.destroy = () => a.removeEventListener(t, u, c), a.addEventListener(t, u, c), u
        },
        p = function (t) {
            let {
                onElement: e,
                bubbles: i,
                cancelable: n,
                attributes: r
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const o = null != e ? e : d;
            i = !1 !== i, n = !1 !== n;
            const s = document.createEvent("Events");
            return s.initEvent(t, i, n), null != r && h.call(s, r), o.dispatchEvent(s)
        },
        f = function (t, e) {
            if (1 === (null == t ? void 0 : t.nodeType)) return g.call(t, e)
        },
        b = function (t) {
            let {
                matchingSelector: e,
                untilNode: i
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            for (; t && t.nodeType !== Node.ELEMENT_NODE;) t = t.parentNode;
            if (null != t) {
                if (null == e) return t;
                if (t.closest && null == i) return t.closest(e);
                for (; t && t !== i;) {
                    if (f(t, e)) return t;
                    t = t.parentNode
                }
            }
        },
        v = t => document.activeElement !== t && A(t, document.activeElement),
        A = function (t, e) {
            if (t && e)
                for (; e;) {
                    if (e === t) return !0;
                    e = e.parentNode
                }
        },
        x = function (t) {
            var e;
            if (null === (e = t) || void 0 === e || !e.parentNode) return;
            let i = 0;
            for (t = t.previousSibling; t;) i++, t = t.previousSibling;
            return i
        },
        y = t => {
            var e;
            return null == t || null === (e = t.parentNode) || void 0 === e ? void 0 : e.removeChild(t)
        },
        C = function (t) {
            let {
                onlyNodesOfType: e,
                usingFilter: i,
                expandEntityReferences: n
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const r = (() => {
                switch (e) {
                    case "element":
                        return NodeFilter.SHOW_ELEMENT;
                    case "text":
                        return NodeFilter.SHOW_TEXT;
                    case "comment":
                        return NodeFilter.SHOW_COMMENT;
                    default:
                        return NodeFilter.SHOW_ALL
                }
            })();
            return document.createTreeWalker(t, r, null != i ? i : null, !0 === n)
        },
        R = t => {
            var e;
            return null == t || null === (e = t.tagName) || void 0 === e ? void 0 : e.toLowerCase()
        },
        S = function (t) {
            let e, i, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            "object" == typeof t ? (n = t, t = n.tagName) : n = {
                attributes: n
            };
            const r = document.createElement(t);
            if (null != n.editable && (null == n.attributes && (n.attributes = {}), n.attributes.contenteditable = n.editable), n.attributes)
                for (e in n.attributes) i = n.attributes[e], r.setAttribute(e, i);
            if (n.style)
                for (e in n.style) i = n.style[e], r.style[e] = i;
            if (n.data)
                for (e in n.data) i = n.data[e], r.dataset[e] = i;
            return n.className && n.className.split(" ").forEach((t => {
                r.classList.add(t)
            })), n.textContent && (r.textContent = n.textContent), n.childNodes && [].concat(n.childNodes).forEach((t => {
                r.appendChild(t)
            })), r
        };
    let E;
    const k = function () {
            if (null != E) return E;
            E = [];
            for (const t in n) {
                const e = n[t];
                e.tagName && E.push(e.tagName)
            }
            return E
        },
        L = t => T(null == t ? void 0 : t.firstChild),
        D = function (t) {
            return k().includes(R(t)) && !k().includes(R(t.firstChild))
        },
        w = function (t) {
            let {
                strict: e
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                strict: !0
            };
            return e ? T(t) : T(t) || !T(t.firstChild) && D(t)
        },
        T = t => F(t) && "block" === (null == t ? void 0 : t.data),
        F = t => (null == t ? void 0 : t.nodeType) === Node.COMMENT_NODE,
        B = function (t) {
            let {
                name: e
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (t) return N(t) ? t.data === c ? !e || t.parentNode.dataset.trixCursorTarget === e : void 0 : B(t.firstChild)
        },
        P = t => f(t, e),
        I = t => N(t) && "" === (null == t ? void 0 : t.data),
        N = t => (null == t ? void 0 : t.nodeType) === Node.TEXT_NODE,
        O = {
            level2Enabled: !0,
            getLevel() {
                return this.level2Enabled && o.supportsInputEvents ? 2 : 0
            },
            pickFiles(t) {
                const e = S("input", {
                    type: "file",
                    multiple: !0,
                    hidden: !0,
                    id: this.fileInputId
                });
                e.addEventListener("change", (() => {
                    t(e.files), y(e)
                })), y(document.getElementById(this.fileInputId)), document.body.appendChild(e), e.click()
            }
        };
    var M = {
            removeBlankTableCells: !1,
            tableCellSeparator: " | ",
            tableRowSeparator: "\n"
        },
        j = {
            bold: {
                tagName: "strong",
                inheritable: !0,
                parser(t) {
                    const e = window.getComputedStyle(t);
                    return "bold" === e.fontWeight || e.fontWeight >= 600
                }
            },
            italic: {
                tagName: "em",
                inheritable: !0,
                parser: t => "italic" === window.getComputedStyle(t).fontStyle
            },
            href: {
                groupTagName: "a",
                parser(t) {
                    const i = "a:not(".concat(e, ")"),
                        n = t.closest(i);
                    if (n) return n.getAttribute("href")
                }
            },
            strike: {
                tagName: "del",
                inheritable: !0
            },
            frozen: {
                style: {
                    backgroundColor: "highlight"
                }
            }
        },
        W = {
            getDefaultHTML: () => '<div class="trix-button-row">\n      <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">\n        <button type="button" class="trix-button trix-button--icon trix-button--icon-bold" data-trix-attribute="bold" data-trix-key="b" title="'.concat(s.bold, '" tabindex="-1">').concat(s.bold, '</button>\n        <button type="button" class="trix-button trix-button--icon trix-button--icon-italic" data-trix-attribute="italic" data-trix-key="i" title="').concat(s.italic, '" tabindex="-1">').concat(s.italic, '</button>\n        <button type="button" class="trix-button trix-button--icon trix-button--icon-strike" data-trix-attribute="strike" title="').concat(s.strike, '" tabindex="-1">').concat(s.strike, '</button>\n        <button type="button" class="trix-button trix-button--icon trix-button--icon-link" data-trix-attribute="href" data-trix-action="link" data-trix-key="k" title="').concat(s.link, '" tabindex="-1">').concat(s.link, '</button>\n      </span>\n\n      <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">\n        <button type="button" class="trix-button trix-button--icon trix-button--icon-heading-1" data-trix-attribute="heading1" title="').concat(s.heading1, '" tabindex="-1">').concat(s.heading1, '</button>\n        <button type="button" class="trix-button trix-button--icon trix-button--icon-quote" data-trix-attribute="quote" title="').concat(s.quote, '" tabindex="-1">').concat(s.quote, '</button>\n        <button type="button" class="trix-button trix-button--icon trix-button--icon-code" data-trix-attribute="code" title="').concat(s.code, '" tabindex="-1">').concat(s.code, '</button>\n        <button type="button" class="trix-button trix-button--icon trix-button--icon-bullet-list" data-trix-attribute="bullet" title="').concat(s.bullets, '" tabindex="-1">').concat(s.bullets, '</button>\n        <button type="button" class="trix-button trix-button--icon trix-button--icon-number-list" data-trix-attribute="number" title="').concat(s.numbers, '" tabindex="-1">').concat(s.numbers, '</button>\n        <button type="button" class="trix-button trix-button--icon trix-button--icon-decrease-nesting-level" data-trix-action="decreaseNestingLevel" title="').concat(s.outdent, '" tabindex="-1">').concat(s.outdent, '</button>\n        <button type="button" class="trix-button trix-button--icon trix-button--icon-increase-nesting-level" data-trix-action="increaseNestingLevel" title="').concat(s.indent, '" tabindex="-1">').concat(s.indent, '</button>\n      </span>\n\n      <span class="trix-button-group trix-button-group--file-tools" data-trix-button-group="file-tools">\n        <button type="button" class="trix-button trix-button--icon trix-button--icon-attach" data-trix-action="attachFiles" title="').concat(s.attachFiles, '" tabindex="-1">').concat(s.attachFiles, '</button>\n      </span>\n\n      <span class="trix-button-group-spacer"></span>\n\n      <span class="trix-button-group trix-button-group--history-tools" data-trix-button-group="history-tools">\n        <button type="button" class="trix-button trix-button--icon trix-button--icon-undo" data-trix-action="undo" data-trix-key="z" title="').concat(s.undo, '" tabindex="-1">').concat(s.undo, '</button>\n        <button type="button" class="trix-button trix-button--icon trix-button--icon-redo" data-trix-action="redo" data-trix-key="shift+z" title="').concat(s.redo, '" tabindex="-1">').concat(s.redo, '</button>\n      </span>\n    </div>\n\n    <div class="trix-dialogs" data-trix-dialogs>\n      <div class="trix-dialog trix-dialog--link" data-trix-dialog="href" data-trix-dialog-attribute="href">\n        <div class="trix-dialog__link-fields">\n          <input type="url" name="href" class="trix-input trix-input--dialog" placeholder="').concat(s.urlPlaceholder, '" aria-label="').concat(s.url, '" required data-trix-input>\n          <div class="trix-button-group">\n            <input type="button" class="trix-button trix-button--dialog" value="').concat(s.link, '" data-trix-method="setAttribute">\n            <input type="button" class="trix-button trix-button--dialog" value="').concat(s.unlink, '" data-trix-method="removeAttribute">\n          </div>\n        </div>\n      </div>\n    </div>')
        };
    const q = {
        interval: 5e3
    };
    var U = Object.freeze({
        __proto__: null,
        attachments: i,
        blockAttributes: n,
        browser: o,
        css: {
            attachment: "attachment",
            attachmentCaption: "attachment__caption",
            attachmentCaptionEditor: "attachment__caption-editor",
            attachmentMetadata: "attachment__metadata",
            attachmentMetadataContainer: "attachment__metadata-container",
            attachmentName: "attachment__name",
            attachmentProgress: "attachment__progress",
            attachmentSize: "attachment__size",
            attachmentToolbar: "attachment__toolbar",
            attachmentGallery: "attachment-gallery"
        },
        fileSize: l,
        input: O,
        keyNames: {
            8: "backspace",
            9: "tab",
            13: "return",
            27: "escape",
            37: "left",
            39: "right",
            46: "delete",
            68: "d",
            72: "h",
            79: "o"
        },
        lang: s,
        parser: M,
        textAttributes: j,
        toolbar: W,
        undo: q
    });
    class V {
        static proxyMethod(t) {
            const {
                name: e,
                toMethod: i,
                toProperty: n,
                optional: r
            } = z(t);
            this.prototype[e] = function () {
                let t, o;
                var s, a;
                i ? o = r ? null === (s = this[i]) || void 0 === s ? void 0 : s.call(this) : this[i]() : n && (o = this[n]);
                return r ? (t = null === (a = o) || void 0 === a ? void 0 : a[e], t ? _.call(t, o, arguments) : void 0) : (t = o[e], _.call(t, o, arguments))
            }
        }
    }
    const z = function (t) {
            const e = t.match(H);
            if (!e) throw new Error("can't parse @proxyMethod expression: ".concat(t));
            const i = {
                name: e[4]
            };
            return null != e[2] ? i.toMethod = e[1] : i.toProperty = e[1], null != e[3] && (i.optional = !0), i
        },
        {
            apply: _
        } = Function.prototype,
        H = new RegExp("^(.+?)(\\(\\))?(\\?)?\\.(.+?)$");
    var J, K, G;
    class $ extends V {
        static box() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            return t instanceof this ? t : this.fromUCS2String(null == t ? void 0 : t.toString())
        }
        static fromUCS2String(t) {
            return new this(t, Z(t))
        }
        static fromCodepoints(t) {
            return new this(tt(t), t)
        }
        constructor(t, e) {
            super(...arguments), this.ucs2String = t, this.codepoints = e, this.length = this.codepoints.length, this.ucs2Length = this.ucs2String.length
        }
        offsetToUCS2Offset(t) {
            return tt(this.codepoints.slice(0, Math.max(0, t))).length
        }
        offsetFromUCS2Offset(t) {
            return Z(this.ucs2String.slice(0, Math.max(0, t))).length
        }
        slice() {
            return this.constructor.fromCodepoints(this.codepoints.slice(...arguments))
        }
        charAt(t) {
            return this.slice(t, t + 1)
        }
        isEqualTo(t) {
            return this.constructor.box(t).ucs2String === this.ucs2String
        }
        toJSON() {
            return this.ucs2String
        }
        getCacheKey() {
            return this.ucs2String
        }
        toString() {
            return this.ucs2String
        }
    }
    const X = 1 === (null === (J = Array.from) || void 0 === J ? void 0 : J.call(Array, "👼").length),
        Y = null != (null === (K = " ".codePointAt) || void 0 === K ? void 0 : K.call(" ", 0)),
        Q = " 👼" === (null === (G = String.fromCodePoint) || void 0 === G ? void 0 : G.call(String, 32, 128124));
    let Z, tt;
    Z = X && Y ? t => Array.from(t).map((t => t.codePointAt(0))) : function (t) {
        const e = [];
        let i = 0;
        const {
            length: n
        } = t;
        for (; i < n;) {
            let r = t.charCodeAt(i++);
            if (55296 <= r && r <= 56319 && i < n) {
                const e = t.charCodeAt(i++);
                56320 == (64512 & e) ? r = ((1023 & r) << 10) + (1023 & e) + 65536 : i--
            }
            e.push(r)
        }
        return e
    }, tt = Q ? t => String.fromCodePoint(...Array.from(t || [])) : function (t) {
        return (() => {
            const e = [];
            return Array.from(t).forEach((t => {
                let i = "";
                t > 65535 && (t -= 65536, i += String.fromCharCode(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e.push(i + String.fromCharCode(t))
            })), e
        })().join("")
    };
    let et = 0;
    class it extends V {
        static fromJSONString(t) {
            return this.fromJSON(JSON.parse(t))
        }
        constructor() {
            super(...arguments), this.id = ++et
        }
        hasSameConstructorAs(t) {
            return this.constructor === (null == t ? void 0 : t.constructor)
        }
        isEqualTo(t) {
            return this === t
        }
        inspect() {
            const t = [],
                e = this.contentsForInspection() || {};
            for (const i in e) {
                const n = e[i];
                t.push("".concat(i, "=").concat(n))
            }
            return "#<".concat(this.constructor.name, ":").concat(this.id).concat(t.length ? " ".concat(t.join(", ")) : "", ">")
        }
        contentsForInspection() {}
        toJSONString() {
            return JSON.stringify(this)
        }
        toUTF16String() {
            return $.box(this)
        }
        getCacheKey() {
            return this.id.toString()
        }
    }
    const nt = function () {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if (t.length !== e.length) return !1;
            for (let i = 0; i < t.length; i++) {
                if (t[i] !== e[i]) return !1
            }
            return !0
        },
        rt = function (t) {
            const e = t.slice(0);
            for (var i = arguments.length, n = new Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++) n[r - 1] = arguments[r];
            return e.splice(...n), e
        },
        ot = /[\u05BE\u05C0\u05C3\u05D0-\u05EA\u05F0-\u05F4\u061B\u061F\u0621-\u063A\u0640-\u064A\u066D\u0671-\u06B7\u06BA-\u06BE\u06C0-\u06CE\u06D0-\u06D5\u06E5\u06E6\u200F\u202B\u202E\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE72\uFE74\uFE76-\uFEFC]/,
        st = function () {
            const t = S("input", {
                    dir: "auto",
                    name: "x",
                    dirName: "x.dir"
                }),
                e = S("form");
            e.appendChild(t);
            const i = function () {
                    try {
                        return new FormData(e).has(t.dirName)
                    } catch (t) {
                        return !1
                    }
                }(),
                n = function () {
                    try {
                        return t.matches(":dir(ltr),:dir(rtl)")
                    } catch (t) {
                        return !1
                    }
                }();
            return i ? function (i) {
                return t.value = i, new FormData(e).get(t.dirName)
            } : n ? function (e) {
                return t.value = e, t.matches(":dir(rtl)") ? "rtl" : "ltr"
            } : function (t) {
                const e = t.trim().charAt(0);
                return ot.test(e) ? "rtl" : "ltr"
            }
        }();
    let at = null,
        lt = null,
        ct = null,
        ut = null;
    const ht = () => (at || (at = pt().concat(gt())), at),
        dt = t => n[t],
        gt = () => (lt || (lt = Object.keys(n)), lt),
        mt = t => j[t],
        pt = () => (ct || (ct = Object.keys(j)), ct),
        ft = function (t, e) {
            bt(t).textContent = e.replace(/%t/g, t)
        },
        bt = function (t) {
            const e = document.createElement("style");
            e.setAttribute("type", "text/css"), e.setAttribute("data-tag-name", t.toLowerCase());
            const i = vt();
            return i && e.setAttribute("nonce", i), document.head.insertBefore(e, document.head.firstChild), e
        },
        vt = function () {
            const t = At("trix-csp-nonce") || At("csp-nonce");
            if (t) return t.getAttribute("content")
        },
        At = t => document.head.querySelector("meta[name=".concat(t, "]")),
        xt = {
            "application/x-trix-feature-detection": "test"
        },
        yt = function (t) {
            const e = t.getData("text/plain"),
                i = t.getData("text/html");
            if (!e || !i) return null == e ? void 0 : e.length; {
                const {
                    body: t
                } = (new DOMParser).parseFromString(i, "text/html");
                if (t.textContent === e) return !t.querySelector("*")
            }
        },
        Ct = /Mac|^iP/.test(navigator.platform) ? t => t.metaKey : t => t.ctrlKey,
        Rt = t => setTimeout(t, 1),
        St = function () {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            const e = {};
            for (const i in t) {
                const n = t[i];
                e[i] = n
            }
            return e
        },
        Et = function () {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (Object.keys(t).length !== Object.keys(e).length) return !1;
            for (const i in t) {
                if (t[i] !== e[i]) return !1
            }
            return !0
        },
        kt = function (t) {
            if (null != t) return Array.isArray(t) || (t = [t, t]), [wt(t[0]), wt(null != t[1] ? t[1] : t[0])]
        },
        Lt = function (t) {
            if (null == t) return;
            const [e, i] = kt(t);
            return Tt(e, i)
        },
        Dt = function (t, e) {
            if (null == t || null == e) return;
            const [i, n] = kt(t), [r, o] = kt(e);
            return Tt(i, r) && Tt(n, o)
        },
        wt = function (t) {
            return "number" == typeof t ? t : St(t)
        },
        Tt = function (t, e) {
            return "number" == typeof t ? t === e : Et(t, e)
        };
    class Ft extends V {
        constructor() {
            super(...arguments), this.update = this.update.bind(this), this.run = this.run.bind(this), this.selectionManagers = []
        }
        start() {
            if (!this.started) return this.started = !0, "onselectionchange" in document ? document.addEventListener("selectionchange", this.update, !0) : this.run()
        }
        stop() {
            if (this.started) return this.started = !1, document.removeEventListener("selectionchange", this.update, !0)
        }
        registerSelectionManager(t) {
            if (!this.selectionManagers.includes(t)) return this.selectionManagers.push(t), this.start()
        }
        unregisterSelectionManager(t) {
            if (this.selectionManagers = this.selectionManagers.filter((e => e !== t)), 0 === this.selectionManagers.length) return this.stop()
        }
        notifySelectionManagersOfSelectionChange() {
            return this.selectionManagers.map((t => t.selectionDidChange()))
        }
        update() {
            const t = Nt();
            if (!Bt(t, this.domRange)) return this.domRange = t, this.notifySelectionManagersOfSelectionChange()
        }
        reset() {
            return this.domRange = null, this.update()
        }
        run() {
            if (this.started) return this.update(), requestAnimationFrame(this.run)
        }
    }
    const Bt = (t, e) => (null == t ? void 0 : t.startContainer) === (null == e ? void 0 : e.startContainer) && (null == t ? void 0 : t.startOffset) === (null == e ? void 0 : e.startOffset) && (null == t ? void 0 : t.endContainer) === (null == e ? void 0 : e.endContainer) && (null == t ? void 0 : t.endOffset) === (null == e ? void 0 : e.endOffset),
        Pt = new Ft,
        It = function () {
            const t = window.getSelection();
            if (t.rangeCount > 0) return t
        },
        Nt = function () {
            var t;
            const e = null === (t = It()) || void 0 === t ? void 0 : t.getRangeAt(0);
            if (e && !Mt(e)) return e
        },
        Ot = function (t) {
            const e = window.getSelection();
            return e.removeAllRanges(), e.addRange(t), Pt.update()
        },
        Mt = t => jt(t.startContainer) || jt(t.endContainer),
        jt = t => !Object.getPrototypeOf(t),
        Wt = t => t.replace(new RegExp("".concat(c), "g"), "").replace(new RegExp("".concat(u), "g"), " "),
        qt = new RegExp("[^\\S".concat(u, "]")),
        Ut = t => t.replace(new RegExp("".concat(qt.source), "g"), " ").replace(/\ {2,}/g, " "),
        Vt = function (t, e) {
            if (t.isEqualTo(e)) return ["", ""];
            const i = zt(t, e),
                {
                    length: n
                } = i.utf16String;
            let r;
            if (n) {
                const {
                    offset: o
                } = i, s = t.codepoints.slice(0, o).concat(t.codepoints.slice(o + n));
                r = zt(e, $.fromCodepoints(s))
            } else r = zt(e, t);
            return [i.utf16String.toString(), r.utf16String.toString()]
        },
        zt = function (t, e) {
            let i = 0,
                n = t.length,
                r = e.length;
            for (; i < n && t.charAt(i).isEqualTo(e.charAt(i));) i++;
            for (; n > i + 1 && t.charAt(n - 1).isEqualTo(e.charAt(r - 1));) n--, r--;
            return {
                utf16String: t.slice(i, n),
                offset: i
            }
        };
    class _t extends it {
        static fromCommonAttributesOfObjects() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            if (!t.length) return new this;
            let e = Gt(t[0]),
                i = e.getKeys();
            return t.slice(1).forEach((t => {
                i = e.getKeysCommonToHash(Gt(t)), e = e.slice(i)
            })), e
        }
        static box(t) {
            return Gt(t)
        }
        constructor() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            super(...arguments), this.values = Kt(t)
        }
        add(t, e) {
            return this.merge(Ht(t, e))
        }
        remove(t) {
            return new _t(Kt(this.values, t))
        }
        get(t) {
            return this.values[t]
        }
        has(t) {
            return t in this.values
        }
        merge(t) {
            return new _t(Jt(this.values, $t(t)))
        }
        slice(t) {
            const e = {};
            return Array.from(t).forEach((t => {
                this.has(t) && (e[t] = this.values[t])
            })), new _t(e)
        }
        getKeys() {
            return Object.keys(this.values)
        }
        getKeysCommonToHash(t) {
            return t = Gt(t), this.getKeys().filter((e => this.values[e] === t.values[e]))
        }
        isEqualTo(t) {
            return nt(this.toArray(), Gt(t).toArray())
        }
        isEmpty() {
            return 0 === this.getKeys().length
        }
        toArray() {
            if (!this.array) {
                const t = [];
                for (const e in this.values) {
                    const i = this.values[e];
                    t.push(t.push(e, i))
                }
                this.array = t.slice(0)
            }
            return this.array
        }
        toObject() {
            return Kt(this.values)
        }
        toJSON() {
            return this.toObject()
        }
        contentsForInspection() {
            return {
                values: JSON.stringify(this.values)
            }
        }
    }
    const Ht = function (t, e) {
            const i = {};
            return i[t] = e, i
        },
        Jt = function (t, e) {
            const i = Kt(t);
            for (const t in e) {
                const n = e[t];
                i[t] = n
            }
            return i
        },
        Kt = function (t, e) {
            const i = {};
            return Object.keys(t).sort().forEach((n => {
                n !== e && (i[n] = t[n])
            })), i
        },
        Gt = function (t) {
            return t instanceof _t ? t : new _t(t)
        },
        $t = function (t) {
            return t instanceof _t ? t.values : t
        };
    class Xt {
        static groupObjects() {
            let t, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                {
                    depth: i,
                    asTree: n
                } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            n && null == i && (i = 0);
            const r = [];
            return Array.from(e).forEach((e => {
                var o;
                if (t) {
                    var s, a, l;
                    if (null !== (s = e.canBeGrouped) && void 0 !== s && s.call(e, i) && null !== (a = (l = t[t.length - 1]).canBeGroupedWith) && void 0 !== a && a.call(l, e, i)) return void t.push(e);
                    r.push(new this(t, {
                        depth: i,
                        asTree: n
                    })), t = null
                }
                null !== (o = e.canBeGrouped) && void 0 !== o && o.call(e, i) ? t = [e] : r.push(e)
            })), t && r.push(new this(t, {
                depth: i,
                asTree: n
            })), r
        }
        constructor() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                {
                    depth: e,
                    asTree: i
                } = arguments.length > 1 ? arguments[1] : void 0;
            this.objects = t, i && (this.depth = e, this.objects = this.constructor.groupObjects(this.objects, {
                asTree: i,
                depth: this.depth + 1
            }))
        }
        getObjects() {
            return this.objects
        }
        getDepth() {
            return this.depth
        }
        getCacheKey() {
            const t = ["objectGroup"];
            return Array.from(this.getObjects()).forEach((e => {
                t.push(e.getCacheKey())
            })), t.join("/")
        }
    }
    class Yt extends V {
        constructor() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            super(...arguments), this.objects = {}, Array.from(t).forEach((t => {
                const e = JSON.stringify(t);
                null == this.objects[e] && (this.objects[e] = t)
            }))
        }
        find(t) {
            const e = JSON.stringify(t);
            return this.objects[e]
        }
    }
    class Qt {
        constructor(t) {
            this.reset(t)
        }
        add(t) {
            const e = Zt(t);
            this.elements[e] = t
        }
        remove(t) {
            const e = Zt(t),
                i = this.elements[e];
            if (i) return delete this.elements[e], i
        }
        reset() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            return this.elements = {}, Array.from(t).forEach((t => {
                this.add(t)
            })), t
        }
    }
    const Zt = t => t.dataset.trixStoreKey;
    class te extends V {
        isPerforming() {
            return !0 === this.performing
        }
        hasPerformed() {
            return !0 === this.performed
        }
        hasSucceeded() {
            return this.performed && this.succeeded
        }
        hasFailed() {
            return this.performed && !this.succeeded
        }
        getPromise() {
            return this.promise || (this.promise = new Promise(((t, e) => (this.performing = !0, this.perform(((i, n) => {
                this.succeeded = i, this.performing = !1, this.performed = !0, this.succeeded ? t(n) : e(n)
            })))))), this.promise
        }
        perform(t) {
            return t(!1)
        }
        release() {
            var t, e;
            null === (t = this.promise) || void 0 === t || null === (e = t.cancel) || void 0 === e || e.call(t), this.promise = null, this.performing = null, this.performed = null, this.succeeded = null
        }
    }
    te.proxyMethod("getPromise().then"), te.proxyMethod("getPromise().catch");
    class ee extends V {
        constructor(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            super(...arguments), this.object = t, this.options = e, this.childViews = [], this.rootView = this
        }
        getNodes() {
            return this.nodes || (this.nodes = this.createNodes()), this.nodes.map((t => t.cloneNode(!0)))
        }
        invalidate() {
            var t;
            return this.nodes = null, this.childViews = [], null === (t = this.parentView) || void 0 === t ? void 0 : t.invalidate()
        }
        invalidateViewForObject(t) {
            var e;
            return null === (e = this.findViewForObject(t)) || void 0 === e ? void 0 : e.invalidate()
        }
        findOrCreateCachedChildView(t, e, i) {
            let n = this.getCachedViewForObject(e);
            return n ? this.recordChildView(n) : (n = this.createChildView(...arguments), this.cacheViewForObject(n, e)), n
        }
        createChildView(t, e) {
            let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            e instanceof Xt && (i.viewClass = t, t = ie);
            const n = new t(e, i);
            return this.recordChildView(n)
        }
        recordChildView(t) {
            return t.parentView = this, t.rootView = this.rootView, this.childViews.push(t), t
        }
        getAllChildViews() {
            let t = [];
            return this.childViews.forEach((e => {
                t.push(e), t = t.concat(e.getAllChildViews())
            })), t
        }
        findElement() {
            return this.findElementForObject(this.object)
        }
        findElementForObject(t) {
            const e = null == t ? void 0 : t.id;
            if (e) return this.rootView.element.querySelector("[data-trix-id='".concat(e, "']"))
        }
        findViewForObject(t) {
            for (const e of this.getAllChildViews())
                if (e.object === t) return e
        }
        getViewCache() {
            return this.rootView !== this ? this.rootView.getViewCache() : this.isViewCachingEnabled() ? (this.viewCache || (this.viewCache = {}), this.viewCache) : void 0
        }
        isViewCachingEnabled() {
            return !1 !== this.shouldCacheViews
        }
        enableViewCaching() {
            this.shouldCacheViews = !0
        }
        disableViewCaching() {
            this.shouldCacheViews = !1
        }
        getCachedViewForObject(t) {
            var e;
            return null === (e = this.getViewCache()) || void 0 === e ? void 0 : e[t.getCacheKey()]
        }
        cacheViewForObject(t, e) {
            const i = this.getViewCache();
            i && (i[e.getCacheKey()] = t)
        }
        garbageCollectCachedViews() {
            const t = this.getViewCache();
            if (t) {
                const e = this.getAllChildViews().concat(this).map((t => t.object.getCacheKey()));
                for (const i in t) e.includes(i) || delete t[i]
            }
        }
    }
    class ie extends ee {
        constructor() {
            super(...arguments), this.objectGroup = this.object, this.viewClass = this.options.viewClass, delete this.options.viewClass
        }
        getChildViews() {
            return this.childViews.length || Array.from(this.objectGroup.getObjects()).forEach((t => {
                this.findOrCreateCachedChildView(this.viewClass, t, this.options)
            })), this.childViews
        }
        createNodes() {
            const t = this.createContainerElement();
            return this.getChildViews().forEach((e => {
                Array.from(e.getNodes()).forEach((e => {
                    t.appendChild(e)
                }))
            })), [t]
        }
        createContainerElement() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.objectGroup.getDepth();
            return this.getChildViews()[0].createContainerElement(t)
        }
    }
    const {
        css: ne
    } = U;
    class re extends ee {
        constructor() {
            super(...arguments), this.attachment = this.object, this.attachment.uploadProgressDelegate = this, this.attachmentPiece = this.options.piece
        }
        createContentNodes() {
            return []
        }
        createNodes() {
            let t;
            const e = t = S({
                    tagName: "figure",
                    className: this.getClassName(),
                    data: this.getData(),
                    editable: !1
                }),
                i = this.getHref();
            return i && (t = S({
                tagName: "a",
                editable: !1,
                attributes: {
                    href: i,
                    tabindex: -1
                }
            }), e.appendChild(t)), this.attachment.hasContent() ? t.innerHTML = this.attachment.getContent() : this.createContentNodes().forEach((e => {
                t.appendChild(e)
            })), t.appendChild(this.createCaptionElement()), this.attachment.isPending() && (this.progressElement = S({
                tagName: "progress",
                attributes: {
                    class: ne.attachmentProgress,
                    value: this.attachment.getUploadProgress(),
                    max: 100
                },
                data: {
                    trixMutable: !0,
                    trixStoreKey: ["progressElement", this.attachment.id].join("/")
                }
            }), e.appendChild(this.progressElement)), [oe("left"), e, oe("right")]
        }
        createCaptionElement() {
            const t = S({
                    tagName: "figcaption",
                    className: ne.attachmentCaption
                }),
                e = this.attachmentPiece.getCaption();
            if (e) t.classList.add("".concat(ne.attachmentCaption, "--edited")), t.textContent = e;
            else {
                let e, i;
                const n = this.getCaptionConfig();
                if (n.name && (e = this.attachment.getFilename()), n.size && (i = this.attachment.getFormattedFilesize()), e) {
                    const i = S({
                        tagName: "span",
                        className: ne.attachmentName,
                        textContent: e
                    });
                    t.appendChild(i)
                }
                if (i) {
                    e && t.appendChild(document.createTextNode(" "));
                    const n = S({
                        tagName: "span",
                        className: ne.attachmentSize,
                        textContent: i
                    });
                    t.appendChild(n)
                }
            }
            return t
        }
        getClassName() {
            const t = [ne.attachment, "".concat(ne.attachment, "--").concat(this.attachment.getType())],
                e = this.attachment.getExtension();
            return e && t.push("".concat(ne.attachment, "--").concat(e)), t.join(" ")
        }
        getData() {
            const t = {
                    trixAttachment: JSON.stringify(this.attachment),
                    trixContentType: this.attachment.getContentType(),
                    trixId: this.attachment.id
                },
                {
                    attributes: e
                } = this.attachmentPiece;
            return e.isEmpty() || (t.trixAttributes = JSON.stringify(e)), this.attachment.isPending() && (t.trixSerialize = !1), t
        }
        getHref() {
            if (!se(this.attachment.getContent(), "a")) return this.attachment.getHref()
        }
        getCaptionConfig() {
            var t;
            const e = this.attachment.getType(),
                n = St(null === (t = i[e]) || void 0 === t ? void 0 : t.caption);
            return "file" === e && (n.name = !0), n
        }
        findProgressElement() {
            var t;
            return null === (t = this.findElement()) || void 0 === t ? void 0 : t.querySelector("progress")
        }
        attachmentDidChangeUploadProgress() {
            const t = this.attachment.getUploadProgress(),
                e = this.findProgressElement();
            e && (e.value = t)
        }
    }
    const oe = t => S({
            tagName: "span",
            textContent: c,
            data: {
                trixCursorTarget: t,
                trixSerialize: !1
            }
        }),
        se = function (t, e) {
            const i = S("div");
            return i.innerHTML = t || "", i.querySelector(e)
        };
    class ae extends re {
        constructor() {
            super(...arguments), this.attachment.previewDelegate = this
        }
        createContentNodes() {
            return this.image = S({
                tagName: "img",
                attributes: {
                    src: ""
                },
                data: {
                    trixMutable: !0
                }
            }), this.refresh(this.image), [this.image]
        }
        createCaptionElement() {
            const t = super.createCaptionElement(...arguments);
            return t.textContent || t.setAttribute("data-trix-placeholder", s.captionPlaceholder), t
        }
        refresh(t) {
            var e;
            t || (t = null === (e = this.findElement()) || void 0 === e ? void 0 : e.querySelector("img"));
            if (t) return this.updateAttributesForImage(t)
        }
        updateAttributesForImage(t) {
            const e = this.attachment.getURL(),
                i = this.attachment.getPreviewURL();
            if (t.src = i || e, i === e) t.removeAttribute("data-trix-serialized-attributes");
            else {
                const i = JSON.stringify({
                    src: e
                });
                t.setAttribute("data-trix-serialized-attributes", i)
            }
            const n = this.attachment.getWidth(),
                r = this.attachment.getHeight();
            null != n && (t.width = n), null != r && (t.height = r);
            const o = ["imageElement", this.attachment.id, t.src, t.width, t.height].join("/");
            t.dataset.trixStoreKey = o
        }
        attachmentDidChangeAttributes() {
            return this.refresh(this.image), this.refresh()
        }
    }
    class le extends ee {
        constructor() {
            super(...arguments), this.piece = this.object, this.attributes = this.piece.getAttributes(), this.textConfig = this.options.textConfig, this.context = this.options.context, this.piece.attachment ? this.attachment = this.piece.attachment : this.string = this.piece.toString()
        }
        createNodes() {
            let t = this.attachment ? this.createAttachmentNodes() : this.createStringNodes();
            const e = this.createElement();
            if (e) {
                const i = function (t) {
                    for (; null !== (e = t) && void 0 !== e && e.firstElementChild;) {
                        var e;
                        t = t.firstElementChild
                    }
                    return t
                }(e);
                Array.from(t).forEach((t => {
                    i.appendChild(t)
                })), t = [e]
            }
            return t
        }
        createAttachmentNodes() {
            const t = this.attachment.isPreviewable() ? ae : re;
            return this.createChildView(t, this.piece.attachment, {
                piece: this.piece
            }).getNodes()
        }
        createStringNodes() {
            var t;
            if (null !== (t = this.textConfig) && void 0 !== t && t.plaintext) return [document.createTextNode(this.string)]; {
                const t = [],
                    e = this.string.split("\n");
                for (let i = 0; i < e.length; i++) {
                    const n = e[i];
                    if (i > 0) {
                        const e = S("br");
                        t.push(e)
                    }
                    if (n.length) {
                        const e = document.createTextNode(this.preserveSpaces(n));
                        t.push(e)
                    }
                }
                return t
            }
        }
        createElement() {
            let t, e, i;
            const n = {};
            for (e in this.attributes) {
                i = this.attributes[e];
                const o = mt(e);
                if (o) {
                    if (o.tagName) {
                        var r;
                        const e = S(o.tagName);
                        r ? (r.appendChild(e), r = e) : t = r = e
                    }
                    if (o.styleProperty && (n[o.styleProperty] = i), o.style)
                        for (e in o.style) i = o.style[e], n[e] = i
                }
            }
            if (Object.keys(n).length)
                for (e in t || (t = S("span")), n) i = n[e], t.style[e] = i;
            return t
        }
        createContainerElement() {
            for (const t in this.attributes) {
                const e = this.attributes[t],
                    i = mt(t);
                if (i && i.groupTagName) {
                    const n = {};
                    return n[t] = e, S(i.groupTagName, n)
                }
            }
        }
        preserveSpaces(t) {
            return this.context.isLast && (t = t.replace(/\ $/, u)), t = t.replace(/(\S)\ {3}(\S)/g, "$1 ".concat(u, " $2")).replace(/\ {2}/g, "".concat(u, " ")).replace(/\ {2}/g, " ".concat(u)), (this.context.isFirst || this.context.followsWhitespace) && (t = t.replace(/^\ /, u)), t
        }
    }
    class ce extends ee {
        constructor() {
            super(...arguments), this.text = this.object, this.textConfig = this.options.textConfig
        }
        createNodes() {
            const t = [],
                e = Xt.groupObjects(this.getPieces()),
                i = e.length - 1;
            for (let r = 0; r < e.length; r++) {
                const o = e[r],
                    s = {};
                0 === r && (s.isFirst = !0), r === i && (s.isLast = !0), ue(n) && (s.followsWhitespace = !0);
                const a = this.findOrCreateCachedChildView(le, o, {
                    textConfig: this.textConfig,
                    context: s
                });
                t.push(...Array.from(a.getNodes() || []));
                var n = o
            }
            return t
        }
        getPieces() {
            return Array.from(this.text.getPieces()).filter((t => !t.hasAttribute("blockBreak")))
        }
    }
    const ue = t => /\s$/.test(null == t ? void 0 : t.toString()),
        {
            css: he
        } = U;
    class de extends ee {
        constructor() {
            super(...arguments), this.block = this.object, this.attributes = this.block.getAttributes()
        }
        createNodes() {
            const t = [document.createComment("block")];
            if (this.block.isEmpty()) t.push(S("br"));
            else {
                var e;
                const i = null === (e = dt(this.block.getLastAttribute())) || void 0 === e ? void 0 : e.text,
                    n = this.findOrCreateCachedChildView(ce, this.block.text, {
                        textConfig: i
                    });
                t.push(...Array.from(n.getNodes() || [])), this.shouldAddExtraNewlineElement() && t.push(S("br"))
            }
            if (this.attributes.length) return t; {
                let e;
                const {
                    tagName: i
                } = n.default;
                this.block.isRTL() && (e = {
                    dir: "rtl"
                });
                const r = S({
                    tagName: i,
                    attributes: e
                });
                return t.forEach((t => r.appendChild(t))), [r]
            }
        }
        createContainerElement(t) {
            let e, i;
            const n = this.attributes[t],
                {
                    tagName: r
                } = dt(n);
            if (0 === t && this.block.isRTL() && (e = {
                    dir: "rtl"
                }), "attachmentGallery" === n) {
                const t = this.block.getBlockBreakPosition();
                i = "".concat(he.attachmentGallery, " ").concat(he.attachmentGallery, "--").concat(t)
            }
            return S({
                tagName: r,
                className: i,
                attributes: e
            })
        }
        shouldAddExtraNewlineElement() {
            return /\n\n$/.test(this.block.toString())
        }
    }
    class ge extends ee {
        static render(t) {
            const e = S("div"),
                i = new this(t, {
                    element: e
                });
            return i.render(), i.sync(), e
        }
        constructor() {
            super(...arguments), this.element = this.options.element, this.elementStore = new Qt, this.setDocument(this.object)
        }
        setDocument(t) {
            t.isEqualTo(this.document) || (this.document = this.object = t)
        }
        render() {
            if (this.childViews = [], this.shadowElement = S("div"), !this.document.isEmpty()) {
                const t = Xt.groupObjects(this.document.getBlocks(), {
                    asTree: !0
                });
                Array.from(t).forEach((t => {
                    const e = this.findOrCreateCachedChildView(de, t);
                    Array.from(e.getNodes()).map((t => this.shadowElement.appendChild(t)))
                }))
            }
        }
        isSynced() {
            return pe(this.shadowElement, this.element)
        }
        sync() {
            const t = this.createDocumentFragmentForSync();
            for (; this.element.lastChild;) this.element.removeChild(this.element.lastChild);
            return this.element.appendChild(t), this.didSync()
        }
        didSync() {
            return this.elementStore.reset(me(this.element)), Rt((() => this.garbageCollectCachedViews()))
        }
        createDocumentFragmentForSync() {
            const t = document.createDocumentFragment();
            return Array.from(this.shadowElement.childNodes).forEach((e => {
                t.appendChild(e.cloneNode(!0))
            })), Array.from(me(t)).forEach((t => {
                const e = this.elementStore.remove(t);
                e && t.parentNode.replaceChild(e, t)
            })), t
        }
    }
    const me = t => t.querySelectorAll("[data-trix-store-key]"),
        pe = (t, e) => fe(t.innerHTML) === fe(e.innerHTML),
        fe = t => t.replace(/&nbsp;/g, " ");

    function be(t) {
        this.wrapped = t
    }

    function ve(t) {
        var e, i;

        function n(e, i) {
            try {
                var o = t[e](i),
                    s = o.value,
                    a = s instanceof be;
                Promise.resolve(a ? s.wrapped : s).then((function (t) {
                    a ? n("return" === e ? "return" : "next", t) : r(o.done ? "return" : "normal", t)
                }), (function (t) {
                    n("throw", t)
                }))
            } catch (t) {
                r("throw", t)
            }
        }

        function r(t, r) {
            switch (t) {
                case "return":
                    e.resolve({
                        value: r,
                        done: !0
                    });
                    break;
                case "throw":
                    e.reject(r);
                    break;
                default:
                    e.resolve({
                        value: r,
                        done: !1
                    })
            }(e = e.next) ? n(e.key, e.arg): i = null
        }
        this._invoke = function (t, r) {
            return new Promise((function (o, s) {
                var a = {
                    key: t,
                    arg: r,
                    resolve: o,
                    reject: s,
                    next: null
                };
                i ? i = i.next = a : (e = i = a, n(t, r))
            }))
        }, "function" != typeof t.return && (this.return = void 0)
    }

    function Ae(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i, t
    }
    ve.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function () {
        return this
    }, ve.prototype.next = function (t) {
        return this._invoke("next", t)
    }, ve.prototype.throw = function (t) {
        return this._invoke("throw", t)
    }, ve.prototype.return = function (t) {
        return this._invoke("return", t)
    };
    class xe extends it {
        static registerType(t, e) {
            e.type = t, this.types[t] = e
        }
        static fromJSON(t) {
            const e = this.types[t.type];
            if (e) return e.fromJSON(t)
        }
        constructor(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            super(...arguments), this.attributes = _t.box(e)
        }
        copyWithAttributes(t) {
            return new this.constructor(this.getValue(), t)
        }
        copyWithAdditionalAttributes(t) {
            return this.copyWithAttributes(this.attributes.merge(t))
        }
        copyWithoutAttribute(t) {
            return this.copyWithAttributes(this.attributes.remove(t))
        }
        copy() {
            return this.copyWithAttributes(this.attributes)
        }
        getAttribute(t) {
            return this.attributes.get(t)
        }
        getAttributesHash() {
            return this.attributes
        }
        getAttributes() {
            return this.attributes.toObject()
        }
        hasAttribute(t) {
            return this.attributes.has(t)
        }
        hasSameStringValueAsPiece(t) {
            return t && this.toString() === t.toString()
        }
        hasSameAttributesAsPiece(t) {
            return t && (this.attributes === t.attributes || this.attributes.isEqualTo(t.attributes))
        }
        isBlockBreak() {
            return !1
        }
        isEqualTo(t) {
            return super.isEqualTo(...arguments) || this.hasSameConstructorAs(t) && this.hasSameStringValueAsPiece(t) && this.hasSameAttributesAsPiece(t)
        }
        isEmpty() {
            return 0 === this.length
        }
        isSerializable() {
            return !0
        }
        toJSON() {
            return {
                type: this.constructor.type,
                attributes: this.getAttributes()
            }
        }
        contentsForInspection() {
            return {
                type: this.constructor.type,
                attributes: this.attributes.inspect()
            }
        }
        canBeGrouped() {
            return this.hasAttribute("href")
        }
        canBeGroupedWith(t) {
            return this.getAttribute("href") === t.getAttribute("href")
        }
        getLength() {
            return this.length
        }
        canBeConsolidatedWith(t) {
            return !1
        }
    }
    Ae(xe, "types", {});
    class ye extends te {
        constructor(t) {
            super(...arguments), this.url = t
        }
        perform(t) {
            const e = new Image;
            e.onload = () => (e.width = this.width = e.naturalWidth, e.height = this.height = e.naturalHeight, t(!0, e)), e.onerror = () => t(!1), e.src = this.url
        }
    }
    class Ce extends it {
        static attachmentForFile(t) {
            const e = new this(this.attributesForFile(t));
            return e.setFile(t), e
        }
        static attributesForFile(t) {
            return new _t({
                filename: t.name,
                filesize: t.size,
                contentType: t.type
            })
        }
        static fromJSON(t) {
            return new this(t)
        }
        constructor() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            super(t), this.releaseFile = this.releaseFile.bind(this), this.attributes = _t.box(t), this.didChangeAttributes()
        }
        getAttribute(t) {
            return this.attributes.get(t)
        }
        hasAttribute(t) {
            return this.attributes.has(t)
        }
        getAttributes() {
            return this.attributes.toObject()
        }
        setAttributes() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            const e = this.attributes.merge(t);
            var i, n, r, o;
            if (!this.attributes.isEqualTo(e)) return this.attributes = e, this.didChangeAttributes(), null === (i = this.previewDelegate) || void 0 === i || null === (n = i.attachmentDidChangeAttributes) || void 0 === n || n.call(i, this), null === (r = this.delegate) || void 0 === r || null === (o = r.attachmentDidChangeAttributes) || void 0 === o ? void 0 : o.call(r, this)
        }
        didChangeAttributes() {
            if (this.isPreviewable()) return this.preloadURL()
        }
        isPending() {
            return null != this.file && !(this.getURL() || this.getHref())
        }
        isPreviewable() {
            return this.attributes.has("previewable") ? this.attributes.get("previewable") : Ce.previewablePattern.test(this.getContentType())
        }
        getType() {
            return this.hasContent() ? "content" : this.isPreviewable() ? "preview" : "file"
        }
        getURL() {
            return this.attributes.get("url")
        }
        getHref() {
            return this.attributes.get("href")
        }
        getFilename() {
            return this.attributes.get("filename") || ""
        }
        getFilesize() {
            return this.attributes.get("filesize")
        }
        getFormattedFilesize() {
            const t = this.attributes.get("filesize");
            return "number" == typeof t ? l.formatter(t) : ""
        }
        getExtension() {
            var t;
            return null === (t = this.getFilename().match(/\.(\w+)$/)) || void 0 === t ? void 0 : t[1].toLowerCase()
        }
        getContentType() {
            return this.attributes.get("contentType")
        }
        hasContent() {
            return this.attributes.has("content")
        }
        getContent() {
            return this.attributes.get("content")
        }
        getWidth() {
            return this.attributes.get("width")
        }
        getHeight() {
            return this.attributes.get("height")
        }
        getFile() {
            return this.file
        }
        setFile(t) {
            if (this.file = t, this.isPreviewable()) return this.preloadFile()
        }
        releaseFile() {
            this.releasePreloadedFile(), this.file = null
        }
        getUploadProgress() {
            return null != this.uploadProgress ? this.uploadProgress : 0
        }
        setUploadProgress(t) {
            var e, i;
            if (this.uploadProgress !== t) return this.uploadProgress = t, null === (e = this.uploadProgressDelegate) || void 0 === e || null === (i = e.attachmentDidChangeUploadProgress) || void 0 === i ? void 0 : i.call(e, this)
        }
        toJSON() {
            return this.getAttributes()
        }
        getCacheKey() {
            return [super.getCacheKey(...arguments), this.attributes.getCacheKey(), this.getPreviewURL()].join("/")
        }
        getPreviewURL() {
            return this.previewURL || this.preloadingURL
        }
        setPreviewURL(t) {
            var e, i, n, r;
            if (t !== this.getPreviewURL()) return this.previewURL = t, null === (e = this.previewDelegate) || void 0 === e || null === (i = e.attachmentDidChangeAttributes) || void 0 === i || i.call(e, this), null === (n = this.delegate) || void 0 === n || null === (r = n.attachmentDidChangePreviewURL) || void 0 === r ? void 0 : r.call(n, this)
        }
        preloadURL() {
            return this.preload(this.getURL(), this.releaseFile)
        }
        preloadFile() {
            if (this.file) return this.fileObjectURL = URL.createObjectURL(this.file), this.preload(this.fileObjectURL)
        }
        releasePreloadedFile() {
            this.fileObjectURL && (URL.revokeObjectURL(this.fileObjectURL), this.fileObjectURL = null)
        }
        preload(t, e) {
            if (t && t !== this.getPreviewURL()) {
                this.preloadingURL = t;
                return new ye(t).then((i => {
                    let {
                        width: n,
                        height: r
                    } = i;
                    return this.getWidth() && this.getHeight() || this.setAttributes({
                        width: n,
                        height: r
                    }), this.preloadingURL = null, this.setPreviewURL(t), null == e ? void 0 : e()
                })).catch((() => (this.preloadingURL = null, null == e ? void 0 : e())))
            }
        }
    }
    Ae(Ce, "previewablePattern", /^image(\/(gif|png|jpe?g)|$)/);
    class Re extends xe {
        static fromJSON(t) {
            return new this(Ce.fromJSON(t.attachment), t.attributes)
        }
        constructor(t) {
            super(...arguments), this.attachment = t, this.length = 1, this.ensureAttachmentExclusivelyHasAttribute("href"), this.attachment.hasContent() || this.removeProhibitedAttributes()
        }
        ensureAttachmentExclusivelyHasAttribute(t) {
            this.hasAttribute(t) && (this.attachment.hasAttribute(t) || this.attachment.setAttributes(this.attributes.slice([t])), this.attributes = this.attributes.remove(t))
        }
        removeProhibitedAttributes() {
            const t = this.attributes.slice(Re.permittedAttributes);
            t.isEqualTo(this.attributes) || (this.attributes = t)
        }
        getValue() {
            return this.attachment
        }
        isSerializable() {
            return !this.attachment.isPending()
        }
        getCaption() {
            return this.attributes.get("caption") || ""
        }
        isEqualTo(t) {
            var e;
            return super.isEqualTo(t) && this.attachment.id === (null == t || null === (e = t.attachment) || void 0 === e ? void 0 : e.id)
        }
        toString() {
            return "￼"
        }
        toJSON() {
            const t = super.toJSON(...arguments);
            return t.attachment = this.attachment, t
        }
        getCacheKey() {
            return [super.getCacheKey(...arguments), this.attachment.getCacheKey()].join("/")
        }
        toConsole() {
            return JSON.stringify(this.toString())
        }
    }
    Ae(Re, "permittedAttributes", ["caption", "presentation"]), xe.registerType("attachment", Re);
    class Se extends xe {
        static fromJSON(t) {
            return new this(t.string, t.attributes)
        }
        constructor(t) {
            super(...arguments), this.string = (t => t.replace(/\r\n/g, "\n"))(t), this.length = this.string.length
        }
        getValue() {
            return this.string
        }
        toString() {
            return this.string.toString()
        }
        isBlockBreak() {
            return "\n" === this.toString() && !0 === this.getAttribute("blockBreak")
        }
        toJSON() {
            const t = super.toJSON(...arguments);
            return t.string = this.string, t
        }
        canBeConsolidatedWith(t) {
            return t && this.hasSameConstructorAs(t) && this.hasSameAttributesAsPiece(t)
        }
        consolidateWith(t) {
            return new this.constructor(this.toString() + t.toString(), this.attributes)
        }
        splitAtOffset(t) {
            let e, i;
            return 0 === t ? (e = null, i = this) : t === this.length ? (e = this, i = null) : (e = new this.constructor(this.string.slice(0, t), this.attributes), i = new this.constructor(this.string.slice(t), this.attributes)), [e, i]
        }
        toConsole() {
            let {
                string: t
            } = this;
            return t.length > 15 && (t = t.slice(0, 14) + "…"), JSON.stringify(t.toString())
        }
    }
    xe.registerType("string", Se);
    class Ee extends it {
        static box(t) {
            return t instanceof this ? t : new this(t)
        }
        constructor() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            super(...arguments), this.objects = t.slice(0), this.length = this.objects.length
        }
        indexOf(t) {
            return this.objects.indexOf(t)
        }
        splice() {
            for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
            return new this.constructor(rt(this.objects, ...e))
        }
        eachObject(t) {
            return this.objects.map(((e, i) => t(e, i)))
        }
        insertObjectAtIndex(t, e) {
            return this.splice(e, 0, t)
        }
        insertSplittableListAtIndex(t, e) {
            return this.splice(e, 0, ...t.objects)
        }
        insertSplittableListAtPosition(t, e) {
            const [i, n] = this.splitObjectAtPosition(e);
            return new this.constructor(i).insertSplittableListAtIndex(t, n)
        }
        editObjectAtIndex(t, e) {
            return this.replaceObjectAtIndex(e(this.objects[t]), t)
        }
        replaceObjectAtIndex(t, e) {
            return this.splice(e, 1, t)
        }
        removeObjectAtIndex(t) {
            return this.splice(t, 1)
        }
        getObjectAtIndex(t) {
            return this.objects[t]
        }
        getSplittableListInRange(t) {
            const [e, i, n] = this.splitObjectsAtRange(t);
            return new this.constructor(e.slice(i, n + 1))
        }
        selectSplittableList(t) {
            const e = this.objects.filter((e => t(e)));
            return new this.constructor(e)
        }
        removeObjectsInRange(t) {
            const [e, i, n] = this.splitObjectsAtRange(t);
            return new this.constructor(e).splice(i, n - i + 1)
        }
        transformObjectsInRange(t, e) {
            const [i, n, r] = this.splitObjectsAtRange(t), o = i.map(((t, i) => n <= i && i <= r ? e(t) : t));
            return new this.constructor(o)
        }
        splitObjectsAtRange(t) {
            let e, [i, n, r] = this.splitObjectAtPosition(Le(t));
            return [i, e] = new this.constructor(i).splitObjectAtPosition(De(t) + r), [i, n, e - 1]
        }
        getObjectAtPosition(t) {
            const {
                index: e
            } = this.findIndexAndOffsetAtPosition(t);
            return this.objects[e]
        }
        splitObjectAtPosition(t) {
            let e, i;
            const {
                index: n,
                offset: r
            } = this.findIndexAndOffsetAtPosition(t), o = this.objects.slice(0);
            if (null != n)
                if (0 === r) e = n, i = 0;
                else {
                    const t = this.getObjectAtIndex(n),
                        [s, a] = t.splitAtOffset(r);
                    o.splice(n, 1, s, a), e = n + 1, i = s.getLength() - r
                }
            else e = o.length, i = 0;
            return [o, e, i]
        }
        consolidate() {
            const t = [];
            let e = this.objects[0];
            return this.objects.slice(1).forEach((i => {
                var n, r;
                null !== (n = (r = e).canBeConsolidatedWith) && void 0 !== n && n.call(r, i) ? e = e.consolidateWith(i) : (t.push(e), e = i)
            })), e && t.push(e), new this.constructor(t)
        }
        consolidateFromIndexToIndex(t, e) {
            const i = this.objects.slice(0).slice(t, e + 1),
                n = new this.constructor(i).consolidate().toArray();
            return this.splice(t, i.length, ...n)
        }
        findIndexAndOffsetAtPosition(t) {
            let e, i = 0;
            for (e = 0; e < this.objects.length; e++) {
                const n = i + this.objects[e].getLength();
                if (i <= t && t < n) return {
                    index: e,
                    offset: t - i
                };
                i = n
            }
            return {
                index: null,
                offset: null
            }
        }
        findPositionAtIndexAndOffset(t, e) {
            let i = 0;
            for (let n = 0; n < this.objects.length; n++) {
                const r = this.objects[n];
                if (n < t) i += r.getLength();
                else if (n === t) {
                    i += e;
                    break
                }
            }
            return i
        }
        getEndPosition() {
            return null == this.endPosition && (this.endPosition = 0, this.objects.forEach((t => this.endPosition += t.getLength()))), this.endPosition
        }
        toString() {
            return this.objects.join("")
        }
        toArray() {
            return this.objects.slice(0)
        }
        toJSON() {
            return this.toArray()
        }
        isEqualTo(t) {
            return super.isEqualTo(...arguments) || ke(this.objects, null == t ? void 0 : t.objects)
        }
        contentsForInspection() {
            return {
                objects: "[".concat(this.objects.map((t => t.inspect())).join(", "), "]")
            }
        }
    }
    const ke = function (t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if (t.length !== e.length) return !1;
            let i = !0;
            for (let n = 0; n < t.length; n++) {
                const r = t[n];
                i && !r.isEqualTo(e[n]) && (i = !1)
            }
            return i
        },
        Le = t => t[0],
        De = t => t[1];
    class we extends it {
        static textForAttachmentWithAttributes(t, e) {
            return new this([new Re(t, e)])
        }
        static textForStringWithAttributes(t, e) {
            return new this([new Se(t, e)])
        }
        static fromJSON(t) {
            return new this(Array.from(t).map((t => xe.fromJSON(t))))
        }
        constructor() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            super(...arguments);
            const e = t.filter((t => !t.isEmpty()));
            this.pieceList = new Ee(e)
        }
        copy() {
            return this.copyWithPieceList(this.pieceList)
        }
        copyWithPieceList(t) {
            return new this.constructor(t.consolidate().toArray())
        }
        copyUsingObjectMap(t) {
            const e = this.getPieces().map((e => t.find(e) || e));
            return new this.constructor(e)
        }
        appendText(t) {
            return this.insertTextAtPosition(t, this.getLength())
        }
        insertTextAtPosition(t, e) {
            return this.copyWithPieceList(this.pieceList.insertSplittableListAtPosition(t.pieceList, e))
        }
        removeTextAtRange(t) {
            return this.copyWithPieceList(this.pieceList.removeObjectsInRange(t))
        }
        replaceTextAtRange(t, e) {
            return this.removeTextAtRange(e).insertTextAtPosition(t, e[0])
        }
        moveTextFromRangeToPosition(t, e) {
            if (t[0] <= e && e <= t[1]) return;
            const i = this.getTextAtRange(t),
                n = i.getLength();
            return t[0] < e && (e -= n), this.removeTextAtRange(t).insertTextAtPosition(i, e)
        }
        addAttributeAtRange(t, e, i) {
            const n = {};
            return n[t] = e, this.addAttributesAtRange(n, i)
        }
        addAttributesAtRange(t, e) {
            return this.copyWithPieceList(this.pieceList.transformObjectsInRange(e, (e => e.copyWithAdditionalAttributes(t))))
        }
        removeAttributeAtRange(t, e) {
            return this.copyWithPieceList(this.pieceList.transformObjectsInRange(e, (e => e.copyWithoutAttribute(t))))
        }
        setAttributesAtRange(t, e) {
            return this.copyWithPieceList(this.pieceList.transformObjectsInRange(e, (e => e.copyWithAttributes(t))))
        }
        getAttributesAtPosition(t) {
            var e;
            return (null === (e = this.pieceList.getObjectAtPosition(t)) || void 0 === e ? void 0 : e.getAttributes()) || {}
        }
        getCommonAttributes() {
            const t = Array.from(this.pieceList.toArray()).map((t => t.getAttributes()));
            return _t.fromCommonAttributesOfObjects(t).toObject()
        }
        getCommonAttributesAtRange(t) {
            return this.getTextAtRange(t).getCommonAttributes() || {}
        }
        getExpandedRangeForAttributeAtOffset(t, e) {
            let i, n = i = e;
            const r = this.getLength();
            for (; n > 0 && this.getCommonAttributesAtRange([n - 1, i])[t];) n--;
            for (; i < r && this.getCommonAttributesAtRange([e, i + 1])[t];) i++;
            return [n, i]
        }
        getTextAtRange(t) {
            return this.copyWithPieceList(this.pieceList.getSplittableListInRange(t))
        }
        getStringAtRange(t) {
            return this.pieceList.getSplittableListInRange(t).toString()
        }
        getStringAtPosition(t) {
            return this.getStringAtRange([t, t + 1])
        }
        startsWithString(t) {
            return this.getStringAtRange([0, t.length]) === t
        }
        endsWithString(t) {
            const e = this.getLength();
            return this.getStringAtRange([e - t.length, e]) === t
        }
        getAttachmentPieces() {
            return this.pieceList.toArray().filter((t => !!t.attachment))
        }
        getAttachments() {
            return this.getAttachmentPieces().map((t => t.attachment))
        }
        getAttachmentAndPositionById(t) {
            let e = 0;
            for (const n of this.pieceList.toArray()) {
                var i;
                if ((null === (i = n.attachment) || void 0 === i ? void 0 : i.id) === t) return {
                    attachment: n.attachment,
                    position: e
                };
                e += n.length
            }
            return {
                attachment: null,
                position: null
            }
        }
        getAttachmentById(t) {
            const {
                attachment: e
            } = this.getAttachmentAndPositionById(t);
            return e
        }
        getRangeOfAttachment(t) {
            const e = this.getAttachmentAndPositionById(t.id),
                i = e.position;
            if (t = e.attachment) return [i, i + 1]
        }
        updateAttributesForAttachment(t, e) {
            const i = this.getRangeOfAttachment(e);
            return i ? this.addAttributesAtRange(t, i) : this
        }
        getLength() {
            return this.pieceList.getEndPosition()
        }
        isEmpty() {
            return 0 === this.getLength()
        }
        isEqualTo(t) {
            var e;
            return super.isEqualTo(t) || (null == t || null === (e = t.pieceList) || void 0 === e ? void 0 : e.isEqualTo(this.pieceList))
        }
        isBlockBreak() {
            return 1 === this.getLength() && this.pieceList.getObjectAtIndex(0).isBlockBreak()
        }
        eachPiece(t) {
            return this.pieceList.eachObject(t)
        }
        getPieces() {
            return this.pieceList.toArray()
        }
        getPieceAtPosition(t) {
            return this.pieceList.getObjectAtPosition(t)
        }
        contentsForInspection() {
            return {
                pieceList: this.pieceList.inspect()
            }
        }
        toSerializableText() {
            const t = this.pieceList.selectSplittableList((t => t.isSerializable()));
            return this.copyWithPieceList(t)
        }
        toString() {
            return this.pieceList.toString()
        }
        toJSON() {
            return this.pieceList.toJSON()
        }
        toConsole() {
            return JSON.stringify(this.pieceList.toArray().map((t => JSON.parse(t.toConsole()))))
        }
        getDirection() {
            return st(this.toString())
        }
        isRTL() {
            return "rtl" === this.getDirection()
        }
    }
    class Te extends it {
        static fromJSON(t) {
            return new this(we.fromJSON(t.text), t.attributes)
        }
        constructor(t, e) {
            super(...arguments), this.text = Fe(t || new we), this.attributes = e || []
        }
        isEmpty() {
            return this.text.isBlockBreak()
        }
        isEqualTo(t) {
            return !!super.isEqualTo(t) || this.text.isEqualTo(null == t ? void 0 : t.text) && nt(this.attributes, null == t ? void 0 : t.attributes)
        }
        copyWithText(t) {
            return new Te(t, this.attributes)
        }
        copyWithoutText() {
            return this.copyWithText(null)
        }
        copyWithAttributes(t) {
            return new Te(this.text, t)
        }
        copyWithoutAttributes() {
            return this.copyWithAttributes(null)
        }
        copyUsingObjectMap(t) {
            const e = t.find(this.text);
            return e ? this.copyWithText(e) : this.copyWithText(this.text.copyUsingObjectMap(t))
        }
        addAttribute(t) {
            const e = this.attributes.concat(Me(t));
            return this.copyWithAttributes(e)
        }
        removeAttribute(t) {
            const {
                listAttribute: e
            } = dt(t), i = We(We(this.attributes, t), e);
            return this.copyWithAttributes(i)
        }
        removeLastAttribute() {
            return this.removeAttribute(this.getLastAttribute())
        }
        getLastAttribute() {
            return je(this.attributes)
        }
        getAttributes() {
            return this.attributes.slice(0)
        }
        getAttributeLevel() {
            return this.attributes.length
        }
        getAttributeAtLevel(t) {
            return this.attributes[t - 1]
        }
        hasAttribute(t) {
            return this.attributes.includes(t)
        }
        hasAttributes() {
            return this.getAttributeLevel() > 0
        }
        getLastNestableAttribute() {
            return je(this.getNestableAttributes())
        }
        getNestableAttributes() {
            return this.attributes.filter((t => dt(t).nestable))
        }
        getNestingLevel() {
            return this.getNestableAttributes().length
        }
        decreaseNestingLevel() {
            const t = this.getLastNestableAttribute();
            return t ? this.removeAttribute(t) : this
        }
        increaseNestingLevel() {
            const t = this.getLastNestableAttribute();
            if (t) {
                const e = this.attributes.lastIndexOf(t),
                    i = rt(this.attributes, e + 1, 0, ...Me(t));
                return this.copyWithAttributes(i)
            }
            return this
        }
        getListItemAttributes() {
            return this.attributes.filter((t => dt(t).listAttribute))
        }
        isListItem() {
            var t;
            return null === (t = dt(this.getLastAttribute())) || void 0 === t ? void 0 : t.listAttribute
        }
        isTerminalBlock() {
            var t;
            return null === (t = dt(this.getLastAttribute())) || void 0 === t ? void 0 : t.terminal
        }
        breaksOnReturn() {
            var t;
            return null === (t = dt(this.getLastAttribute())) || void 0 === t ? void 0 : t.breakOnReturn
        }
        findLineBreakInDirectionFromPosition(t, e) {
            const i = this.toString();
            let n;
            switch (t) {
                case "forward":
                    n = i.indexOf("\n", e);
                    break;
                case "backward":
                    n = i.slice(0, e).lastIndexOf("\n")
            }
            if (-1 !== n) return n
        }
        contentsForInspection() {
            return {
                text: this.text.inspect(),
                attributes: this.attributes
            }
        }
        toString() {
            return this.text.toString()
        }
        toJSON() {
            return {
                text: this.text,
                attributes: this.attributes
            }
        }
        getDirection() {
            return this.text.getDirection()
        }
        isRTL() {
            return this.text.isRTL()
        }
        getLength() {
            return this.text.getLength()
        }
        canBeConsolidatedWith(t) {
            return !this.hasAttributes() && !t.hasAttributes() && this.getDirection() === t.getDirection()
        }
        consolidateWith(t) {
            const e = we.textForStringWithAttributes("\n"),
                i = this.getTextWithoutBlockBreak().appendText(e);
            return this.copyWithText(i.appendText(t.text))
        }
        splitAtOffset(t) {
            let e, i;
            return 0 === t ? (e = null, i = this) : t === this.getLength() ? (e = this, i = null) : (e = this.copyWithText(this.text.getTextAtRange([0, t])), i = this.copyWithText(this.text.getTextAtRange([t, this.getLength()]))), [e, i]
        }
        getBlockBreakPosition() {
            return this.text.getLength() - 1
        }
        getTextWithoutBlockBreak() {
            return Ne(this.text) ? this.text.getTextAtRange([0, this.getBlockBreakPosition()]) : this.text.copy()
        }
        canBeGrouped(t) {
            return this.attributes[t]
        }
        canBeGroupedWith(t, e) {
            const i = t.getAttributes(),
                r = i[e],
                o = this.attributes[e];
            return o === r && !(!1 === dt(o).group && !(() => {
                if (!ut) {
                    ut = [];
                    for (const t in n) {
                        const {
                            listAttribute: e
                        } = n[t];
                        null != e && ut.push(e)
                    }
                }
                return ut
            })().includes(i[e + 1])) && (this.getDirection() === t.getDirection() || t.isEmpty())
        }
    }
    const Fe = function (t) {
            return t = Be(t), t = Ie(t)
        },
        Be = function (t) {
            let e = !1;
            const i = t.getPieces();
            let n = i.slice(0, i.length - 1);
            const r = i[i.length - 1];
            return r ? (n = n.map((t => t.isBlockBreak() ? (e = !0, Oe(t)) : t)), e ? new we([...n, r]) : t) : t
        },
        Pe = we.textForStringWithAttributes("\n", {
            blockBreak: !0
        }),
        Ie = function (t) {
            return Ne(t) ? t : t.appendText(Pe)
        },
        Ne = function (t) {
            const e = t.getLength();
            if (0 === e) return !1;
            return t.getTextAtRange([e - 1, e]).isBlockBreak()
        },
        Oe = t => t.copyWithoutAttribute("blockBreak"),
        Me = function (t) {
            const {
                listAttribute: e
            } = dt(t);
            return e ? [e, t] : [t]
        },
        je = t => t.slice(-1)[0],
        We = function (t, e) {
            const i = t.lastIndexOf(e);
            return -1 === i ? t : rt(t, i, 1)
        };
    class qe extends it {
        static fromJSON(t) {
            return new this(Array.from(t).map((t => Te.fromJSON(t))))
        }
        static fromString(t, e) {
            const i = we.textForStringWithAttributes(t, e);
            return new this([new Te(i)])
        }
        constructor() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            super(...arguments), 0 === t.length && (t = [new Te]), this.blockList = Ee.box(t)
        }
        isEmpty() {
            const t = this.getBlockAtIndex(0);
            return 1 === this.blockList.length && t.isEmpty() && !t.hasAttributes()
        }
        copy() {
            const t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).consolidateBlocks ? this.blockList.consolidate().toArray() : this.blockList.toArray();
            return new this.constructor(t)
        }
        copyUsingObjectsFromDocument(t) {
            const e = new Yt(t.getObjects());
            return this.copyUsingObjectMap(e)
        }
        copyUsingObjectMap(t) {
            const e = this.getBlocks().map((e => t.find(e) || e.copyUsingObjectMap(t)));
            return new this.constructor(e)
        }
        copyWithBaseBlockAttributes() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            const e = this.getBlocks().map((e => {
                const i = t.concat(e.getAttributes());
                return e.copyWithAttributes(i)
            }));
            return new this.constructor(e)
        }
        replaceBlock(t, e) {
            const i = this.blockList.indexOf(t);
            return -1 === i ? this : new this.constructor(this.blockList.replaceObjectAtIndex(e, i))
        }
        insertDocumentAtRange(t, e) {
            const {
                blockList: i
            } = t;
            e = kt(e);
            let [n] = e;
            const {
                index: r,
                offset: o
            } = this.locationFromPosition(n);
            let s = this;
            const a = this.getBlockAtPosition(n);
            return Lt(e) && a.isEmpty() && !a.hasAttributes() ? s = new this.constructor(s.blockList.removeObjectAtIndex(r)) : a.getBlockBreakPosition() === o && n++, s = s.removeTextAtRange(e), new this.constructor(s.blockList.insertSplittableListAtPosition(i, n))
        }
        mergeDocumentAtRange(t, e) {
            let i, n;
            e = kt(e);
            const [r] = e, o = this.locationFromPosition(r), s = this.getBlockAtIndex(o.index).getAttributes(), a = t.getBaseBlockAttributes(), l = s.slice(-a.length);
            if (nt(a, l)) {
                const e = s.slice(0, -a.length);
                i = t.copyWithBaseBlockAttributes(e)
            } else i = t.copy({
                consolidateBlocks: !0
            }).copyWithBaseBlockAttributes(s);
            const c = i.getBlockCount(),
                u = i.getBlockAtIndex(0);
            if (nt(s, u.getAttributes())) {
                const t = u.getTextWithoutBlockBreak();
                if (n = this.insertTextAtRange(t, e), c > 1) {
                    i = new this.constructor(i.getBlocks().slice(1));
                    const e = r + t.getLength();
                    n = n.insertDocumentAtRange(i, e)
                }
            } else n = this.insertDocumentAtRange(i, e);
            return n
        }
        insertTextAtRange(t, e) {
            e = kt(e);
            const [i] = e, {
                index: n,
                offset: r
            } = this.locationFromPosition(i), o = this.removeTextAtRange(e);
            return new this.constructor(o.blockList.editObjectAtIndex(n, (e => e.copyWithText(e.text.insertTextAtPosition(t, r)))))
        }
        removeTextAtRange(t) {
            let e;
            t = kt(t);
            const [i, n] = t;
            if (Lt(t)) return this;
            const [r, o] = Array.from(this.locationRangeFromRange(t)), s = r.index, a = r.offset, l = this.getBlockAtIndex(s), c = o.index, u = o.offset, h = this.getBlockAtIndex(c);
            if (n - i == 1 && l.getBlockBreakPosition() === a && h.getBlockBreakPosition() !== u && "\n" === h.text.getStringAtPosition(u)) e = this.blockList.editObjectAtIndex(c, (t => t.copyWithText(t.text.removeTextAtRange([u, u + 1]))));
            else {
                let t;
                const i = l.text.getTextAtRange([0, a]),
                    n = h.text.getTextAtRange([u, h.getLength()]),
                    r = i.appendText(n);
                t = s !== c && 0 === a && l.getAttributeLevel() >= h.getAttributeLevel() ? h.copyWithText(r) : l.copyWithText(r);
                const o = c + 1 - s;
                e = this.blockList.splice(s, o, t)
            }
            return new this.constructor(e)
        }
        moveTextFromRangeToPosition(t, e) {
            let i;
            t = kt(t);
            const [n, r] = t;
            if (n <= e && e <= r) return this;
            let o = this.getDocumentAtRange(t),
                s = this.removeTextAtRange(t);
            const a = n < e;
            a && (e -= o.getLength());
            const [l, ...c] = o.getBlocks();
            return 0 === c.length ? (i = l.getTextWithoutBlockBreak(), a && (e += 1)) : i = l.text, s = s.insertTextAtRange(i, e), 0 === c.length ? s : (o = new this.constructor(c), e += i.getLength(), s.insertDocumentAtRange(o, e))
        }
        addAttributeAtRange(t, e, i) {
            let {
                blockList: n
            } = this;
            return this.eachBlockAtRange(i, ((i, r, o) => n = n.editObjectAtIndex(o, (function () {
                return dt(t) ? i.addAttribute(t, e) : r[0] === r[1] ? i : i.copyWithText(i.text.addAttributeAtRange(t, e, r))
            })))), new this.constructor(n)
        }
        addAttribute(t, e) {
            let {
                blockList: i
            } = this;
            return this.eachBlock(((n, r) => i = i.editObjectAtIndex(r, (() => n.addAttribute(t, e))))), new this.constructor(i)
        }
        removeAttributeAtRange(t, e) {
            let {
                blockList: i
            } = this;
            return this.eachBlockAtRange(e, (function (e, n, r) {
                dt(t) ? i = i.editObjectAtIndex(r, (() => e.removeAttribute(t))) : n[0] !== n[1] && (i = i.editObjectAtIndex(r, (() => e.copyWithText(e.text.removeAttributeAtRange(t, n)))))
            })), new this.constructor(i)
        }
        updateAttributesForAttachment(t, e) {
            const i = this.getRangeOfAttachment(e),
                [n] = Array.from(i),
                {
                    index: r
                } = this.locationFromPosition(n),
                o = this.getTextAtIndex(r);
            return new this.constructor(this.blockList.editObjectAtIndex(r, (i => i.copyWithText(o.updateAttributesForAttachment(t, e)))))
        }
        removeAttributeForAttachment(t, e) {
            const i = this.getRangeOfAttachment(e);
            return this.removeAttributeAtRange(t, i)
        }
        insertBlockBreakAtRange(t) {
            let e;
            t = kt(t);
            const [i] = t, {
                offset: n
            } = this.locationFromPosition(i), r = this.removeTextAtRange(t);
            return 0 === n && (e = [new Te]), new this.constructor(r.blockList.insertSplittableListAtPosition(new Ee(e), i))
        }
        applyBlockAttributeAtRange(t, e, i) {
            const n = this.expandRangeToLineBreaksAndSplitBlocks(i);
            let r = n.document;
            i = n.range;
            const o = dt(t);
            if (o.listAttribute) {
                r = r.removeLastListAttributeAtRange(i, {
                    exceptAttributeName: t
                });
                const e = r.convertLineBreaksToBlockBreaksInRange(i);
                r = e.document, i = e.range
            } else r = o.exclusive ? r.removeBlockAttributesAtRange(i) : o.terminal ? r.removeLastTerminalAttributeAtRange(i) : r.consolidateBlocksAtRange(i);
            return r.addAttributeAtRange(t, e, i)
        }
        removeLastListAttributeAtRange(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                {
                    blockList: i
                } = this;
            return this.eachBlockAtRange(t, (function (t, n, r) {
                const o = t.getLastAttribute();
                o && dt(o).listAttribute && o !== e.exceptAttributeName && (i = i.editObjectAtIndex(r, (() => t.removeAttribute(o))))
            })), new this.constructor(i)
        }
        removeLastTerminalAttributeAtRange(t) {
            let {
                blockList: e
            } = this;
            return this.eachBlockAtRange(t, (function (t, i, n) {
                const r = t.getLastAttribute();
                r && dt(r).terminal && (e = e.editObjectAtIndex(n, (() => t.removeAttribute(r))))
            })), new this.constructor(e)
        }
        removeBlockAttributesAtRange(t) {
            let {
                blockList: e
            } = this;
            return this.eachBlockAtRange(t, (function (t, i, n) {
                t.hasAttributes() && (e = e.editObjectAtIndex(n, (() => t.copyWithoutAttributes())))
            })), new this.constructor(e)
        }
        expandRangeToLineBreaksAndSplitBlocks(t) {
            let e;
            t = kt(t);
            let [i, n] = t;
            const r = this.locationFromPosition(i),
                o = this.locationFromPosition(n);
            let s = this;
            const a = s.getBlockAtIndex(r.index);
            if (r.offset = a.findLineBreakInDirectionFromPosition("backward", r.offset), null != r.offset && (e = s.positionFromLocation(r), s = s.insertBlockBreakAtRange([e, e + 1]), o.index += 1, o.offset -= s.getBlockAtIndex(r.index).getLength(), r.index += 1), r.offset = 0, 0 === o.offset && o.index > r.index) o.index -= 1, o.offset = s.getBlockAtIndex(o.index).getBlockBreakPosition();
            else {
                const t = s.getBlockAtIndex(o.index);
                "\n" === t.text.getStringAtRange([o.offset - 1, o.offset]) ? o.offset -= 1 : o.offset = t.findLineBreakInDirectionFromPosition("forward", o.offset), o.offset !== t.getBlockBreakPosition() && (e = s.positionFromLocation(o), s = s.insertBlockBreakAtRange([e, e + 1]))
            }
            return i = s.positionFromLocation(r), n = s.positionFromLocation(o), {
                document: s,
                range: t = kt([i, n])
            }
        }
        convertLineBreaksToBlockBreaksInRange(t) {
            t = kt(t);
            let [e] = t;
            const i = this.getStringAtRange(t).slice(0, -1);
            let n = this;
            return i.replace(/.*?\n/g, (function (t) {
                e += t.length, n = n.insertBlockBreakAtRange([e - 1, e])
            })), {
                document: n,
                range: t
            }
        }
        consolidateBlocksAtRange(t) {
            t = kt(t);
            const [e, i] = t, n = this.locationFromPosition(e).index, r = this.locationFromPosition(i).index;
            return new this.constructor(this.blockList.consolidateFromIndexToIndex(n, r))
        }
        getDocumentAtRange(t) {
            t = kt(t);
            const e = this.blockList.getSplittableListInRange(t).toArray();
            return new this.constructor(e)
        }
        getStringAtRange(t) {
            let e;
            const i = t = kt(t);
            return i[i.length - 1] !== this.getLength() && (e = -1), this.getDocumentAtRange(t).toString().slice(0, e)
        }
        getBlockAtIndex(t) {
            return this.blockList.getObjectAtIndex(t)
        }
        getBlockAtPosition(t) {
            const {
                index: e
            } = this.locationFromPosition(t);
            return this.getBlockAtIndex(e)
        }
        getTextAtIndex(t) {
            var e;
            return null === (e = this.getBlockAtIndex(t)) || void 0 === e ? void 0 : e.text
        }
        getTextAtPosition(t) {
            const {
                index: e
            } = this.locationFromPosition(t);
            return this.getTextAtIndex(e)
        }
        getPieceAtPosition(t) {
            const {
                index: e,
                offset: i
            } = this.locationFromPosition(t);
            return this.getTextAtIndex(e).getPieceAtPosition(i)
        }
        getCharacterAtPosition(t) {
            const {
                index: e,
                offset: i
            } = this.locationFromPosition(t);
            return this.getTextAtIndex(e).getStringAtRange([i, i + 1])
        }
        getLength() {
            return this.blockList.getEndPosition()
        }
        getBlocks() {
            return this.blockList.toArray()
        }
        getBlockCount() {
            return this.blockList.length
        }
        getEditCount() {
            return this.editCount
        }
        eachBlock(t) {
            return this.blockList.eachObject(t)
        }
        eachBlockAtRange(t, e) {
            let i, n;
            t = kt(t);
            const [r, o] = t, s = this.locationFromPosition(r), a = this.locationFromPosition(o);
            if (s.index === a.index) return i = this.getBlockAtIndex(s.index), n = [s.offset, a.offset], e(i, n, s.index);
            for (let t = s.index; t <= a.index; t++)
                if (i = this.getBlockAtIndex(t), i) {
                    switch (t) {
                        case s.index:
                            n = [s.offset, i.text.getLength()];
                            break;
                        case a.index:
                            n = [0, a.offset];
                            break;
                        default:
                            n = [0, i.text.getLength()]
                    }
                    e(i, n, t)
                }
        }
        getCommonAttributesAtRange(t) {
            t = kt(t);
            const [e] = t;
            if (Lt(t)) return this.getCommonAttributesAtPosition(e); {
                const e = [],
                    i = [];
                return this.eachBlockAtRange(t, (function (t, n) {
                    if (n[0] !== n[1]) return e.push(t.text.getCommonAttributesAtRange(n)), i.push(Ue(t))
                })), _t.fromCommonAttributesOfObjects(e).merge(_t.fromCommonAttributesOfObjects(i)).toObject()
            }
        }
        getCommonAttributesAtPosition(t) {
            let e, i;
            const {
                index: n,
                offset: r
            } = this.locationFromPosition(t), o = this.getBlockAtIndex(n);
            if (!o) return {};
            const s = Ue(o),
                a = o.text.getAttributesAtPosition(r),
                l = o.text.getAttributesAtPosition(r - 1),
                c = Object.keys(j).filter((t => j[t].inheritable));
            for (e in l) i = l[e], (i === a[e] || c.includes(e)) && (s[e] = i);
            return s
        }
        getRangeOfCommonAttributeAtPosition(t, e) {
            const {
                index: i,
                offset: n
            } = this.locationFromPosition(e), r = this.getTextAtIndex(i), [o, s] = Array.from(r.getExpandedRangeForAttributeAtOffset(t, n)), a = this.positionFromLocation({
                index: i,
                offset: o
            }), l = this.positionFromLocation({
                index: i,
                offset: s
            });
            return kt([a, l])
        }
        getBaseBlockAttributes() {
            let t = this.getBlockAtIndex(0).getAttributes();
            for (let e = 1; e < this.getBlockCount(); e++) {
                const i = this.getBlockAtIndex(e).getAttributes(),
                    n = Math.min(t.length, i.length);
                t = (() => {
                    const e = [];
                    for (let r = 0; r < n && i[r] === t[r]; r++) e.push(i[r]);
                    return e
                })()
            }
            return t
        }
        getAttachmentById(t) {
            for (const e of this.getAttachments())
                if (e.id === t) return e
        }
        getAttachmentPieces() {
            let t = [];
            return this.blockList.eachObject((e => {
                let {
                    text: i
                } = e;
                return t = t.concat(i.getAttachmentPieces())
            })), t
        }
        getAttachments() {
            return this.getAttachmentPieces().map((t => t.attachment))
        }
        getRangeOfAttachment(t) {
            let e = 0;
            const i = this.blockList.toArray();
            for (let n = 0; n < i.length; n++) {
                const {
                    text: r
                } = i[n], o = r.getRangeOfAttachment(t);
                if (o) return kt([e + o[0], e + o[1]]);
                e += r.getLength()
            }
        }
        getLocationRangeOfAttachment(t) {
            const e = this.getRangeOfAttachment(t);
            return this.locationRangeFromRange(e)
        }
        getAttachmentPieceForAttachment(t) {
            for (const e of this.getAttachmentPieces())
                if (e.attachment === t) return e
        }
        findRangesForBlockAttribute(t) {
            let e = 0;
            const i = [];
            return this.getBlocks().forEach((n => {
                const r = n.getLength();
                n.hasAttribute(t) && i.push([e, e + r]), e += r
            })), i
        }
        findRangesForTextAttribute(t) {
            let {
                withValue: e
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = 0, n = [];
            const r = [];
            return this.getPieces().forEach((o => {
                const s = o.getLength();
                (function (i) {
                    return e ? i.getAttribute(t) === e : i.hasAttribute(t)
                })(o) && (n[1] === i ? n[1] = i + s : r.push(n = [i, i + s])), i += s
            })), r
        }
        locationFromPosition(t) {
            const e = this.blockList.findIndexAndOffsetAtPosition(Math.max(0, t));
            if (null != e.index) return e; {
                const t = this.getBlocks();
                return {
                    index: t.length - 1,
                    offset: t[t.length - 1].getLength()
                }
            }
        }
        positionFromLocation(t) {
            return this.blockList.findPositionAtIndexAndOffset(t.index, t.offset)
        }
        locationRangeFromPosition(t) {
            return kt(this.locationFromPosition(t))
        }
        locationRangeFromRange(t) {
            if (!(t = kt(t))) return;
            const [e, i] = Array.from(t), n = this.locationFromPosition(e), r = this.locationFromPosition(i);
            return kt([n, r])
        }
        rangeFromLocationRange(t) {
            let e;
            t = kt(t);
            const i = this.positionFromLocation(t[0]);
            return Lt(t) || (e = this.positionFromLocation(t[1])), kt([i, e])
        }
        isEqualTo(t) {
            return this.blockList.isEqualTo(null == t ? void 0 : t.blockList)
        }
        getTexts() {
            return this.getBlocks().map((t => t.text))
        }
        getPieces() {
            const t = [];
            return Array.from(this.getTexts()).forEach((e => {
                t.push(...Array.from(e.getPieces() || []))
            })), t
        }
        getObjects() {
            return this.getBlocks().concat(this.getTexts()).concat(this.getPieces())
        }
        toSerializableDocument() {
            const t = [];
            return this.blockList.eachObject((e => t.push(e.copyWithText(e.text.toSerializableText())))), new this.constructor(t)
        }
        toString() {
            return this.blockList.toString()
        }
        toJSON() {
            return this.blockList.toJSON()
        }
        toConsole() {
            return JSON.stringify(this.blockList.toArray()).map((t => JSON.parse(t.text.toConsole())))
        }
    }
    const Ue = function (t) {
            const e = {},
                i = t.getLastAttribute();
            return i && (e[i] = !0), e
        },
        Ve = "style href src width height class".split(" "),
        ze = "javascript:".split(" "),
        _e = "script iframe".split(" ");
    class He extends V {
        static sanitize(t, e) {
            const i = new this(t, e);
            return i.sanitize(), i
        }
        constructor(t) {
            let {
                allowedAttributes: e,
                forbiddenProtocols: i,
                forbiddenElements: n
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            super(...arguments), this.allowedAttributes = e || Ve, this.forbiddenProtocols = i || ze, this.forbiddenElements = n || _e, this.body = Je(t)
        }
        sanitize() {
            return this.sanitizeElements(), this.normalizeListElementNesting()
        }
        getHTML() {
            return this.body.innerHTML
        }
        getBody() {
            return this.body
        }
        sanitizeElements() {
            const t = C(this.body),
                e = [];
            for (; t.nextNode();) {
                const i = t.currentNode;
                switch (i.nodeType) {
                    case Node.ELEMENT_NODE:
                        this.elementIsRemovable(i) ? e.push(i) : this.sanitizeElement(i);
                        break;
                    case Node.COMMENT_NODE:
                        e.push(i)
                }
            }
            return e.forEach((t => y(t))), this.body
        }
        sanitizeElement(t) {
            return t.hasAttribute("href") && this.forbiddenProtocols.includes(t.protocol) && t.removeAttribute("href"), Array.from(t.attributes).forEach((e => {
                let {
                    name: i
                } = e;
                this.allowedAttributes.includes(i) || 0 === i.indexOf("data-trix") || t.removeAttribute(i)
            })), t
        }
        normalizeListElementNesting() {
            return Array.from(this.body.querySelectorAll("ul,ol")).forEach((t => {
                const e = t.previousElementSibling;
                e && "li" === R(e) && e.appendChild(t)
            })), this.body
        }
        elementIsRemovable(t) {
            if ((null == t ? void 0 : t.nodeType) === Node.ELEMENT_NODE) return this.elementIsForbidden(t) || this.elementIsntSerializable(t)
        }
        elementIsForbidden(t) {
            return this.forbiddenElements.includes(R(t))
        }
        elementIsntSerializable(t) {
            return "false" === t.getAttribute("data-trix-serialize") && !P(t)
        }
    }
    const Je = function () {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            t = t.replace(/<\/html[^>]*>[^]*$/i, "</html>");
            const e = document.implementation.createHTMLDocument("");
            return e.documentElement.innerHTML = t, Array.from(e.head.querySelectorAll("style")).forEach((t => {
                e.body.appendChild(t)
            })), e.body
        },
        Ke = function (t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const i = "string";
            return {
                string: t = Wt(t),
                attributes: e,
                type: i
            }
        },
        Ge = (t, e) => {
            try {
                return JSON.parse(t.getAttribute("data-trix-".concat(e)))
            } catch (t) {
                return {}
            }
        };
    class $e extends V {
        static parse(t, e) {
            const i = new this(t, e);
            return i.parse(), i
        }
        constructor(t) {
            let {
                referenceElement: e
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            super(...arguments), this.html = t, this.referenceElement = e, this.blocks = [], this.blockElements = [], this.processedElements = []
        }
        getDocument() {
            return qe.fromJSON(this.blocks)
        }
        parse() {
            try {
                this.createHiddenContainer();
                const t = He.sanitize(this.html).getHTML();
                this.containerElement.innerHTML = t;
                const e = C(this.containerElement, {
                    usingFilter: Ze
                });
                for (; e.nextNode();) this.processNode(e.currentNode);
                return this.translateBlockElementMarginsToNewlines()
            } finally {
                this.removeHiddenContainer()
            }
        }
        createHiddenContainer() {
            return this.referenceElement ? (this.containerElement = this.referenceElement.cloneNode(!1), this.containerElement.removeAttribute("id"), this.containerElement.setAttribute("data-trix-internal", ""), this.containerElement.style.display = "none", this.referenceElement.parentNode.insertBefore(this.containerElement, this.referenceElement.nextSibling)) : (this.containerElement = S({
                tagName: "div",
                style: {
                    display: "none"
                }
            }), document.body.appendChild(this.containerElement))
        }
        removeHiddenContainer() {
            return y(this.containerElement)
        }
        processNode(t) {
            switch (t.nodeType) {
                case Node.TEXT_NODE:
                    if (!this.isInsignificantTextNode(t)) return this.appendBlockForTextNode(t), this.processTextNode(t);
                    break;
                case Node.ELEMENT_NODE:
                    return this.appendBlockForElement(t), this.processElement(t)
            }
        }
        appendBlockForTextNode(t) {
            const e = t.parentNode;
            if (e === this.currentBlockElement && this.isBlockElement(t.previousSibling)) return this.appendStringWithAttributes("\n");
            if (e === this.containerElement || this.isBlockElement(e)) {
                var i;
                const t = this.getBlockAttributes(e);
                nt(t, null === (i = this.currentBlock) || void 0 === i ? void 0 : i.attributes) || (this.currentBlock = this.appendBlockForAttributesWithElement(t, e), this.currentBlockElement = e)
            }
        }
        appendBlockForElement(t) {
            const e = this.isBlockElement(t),
                i = A(this.currentBlockElement, t);
            if (e && !this.isBlockElement(t.firstChild)) {
                if (!this.isInsignificantTextNode(t.firstChild) || !this.isBlockElement(t.firstElementChild)) {
                    const e = this.getBlockAttributes(t);
                    if (t.firstChild) {
                        if (i && nt(e, this.currentBlock.attributes)) return this.appendStringWithAttributes("\n");
                        this.currentBlock = this.appendBlockForAttributesWithElement(e, t), this.currentBlockElement = t
                    }
                }
            } else if (this.currentBlockElement && !i && !e) {
                const e = this.findParentBlockElement(t);
                if (e) return this.appendBlockForElement(e);
                this.currentBlock = this.appendEmptyBlock(), this.currentBlockElement = null
            }
        }
        findParentBlockElement(t) {
            let {
                parentElement: e
            } = t;
            for (; e && e !== this.containerElement;) {
                if (this.isBlockElement(e) && this.blockElements.includes(e)) return e;
                e = e.parentElement
            }
            return null
        }
        processTextNode(t) {
            let e = t.data;
            var i;
            Xe(t.parentNode) || (e = Ut(e), ii(null === (i = t.previousSibling) || void 0 === i ? void 0 : i.textContent) && (e = ti(e)));
            return this.appendStringWithAttributes(e, this.getTextAttributes(t.parentNode))
        }
        processElement(t) {
            let e;
            if (P(t)) {
                if (e = Ge(t, "attachment"), Object.keys(e).length) {
                    const i = this.getTextAttributes(t);
                    this.appendAttachmentWithAttributes(e, i), t.innerHTML = ""
                }
                return this.processedElements.push(t)
            }
            switch (R(t)) {
                case "br":
                    return this.isExtraBR(t) || this.isBlockElement(t.nextSibling) || this.appendStringWithAttributes("\n", this.getTextAttributes(t)), this.processedElements.push(t);
                case "img":
                    e = {
                        url: t.getAttribute("src"),
                        contentType: "image"
                    };
                    const i = (t => {
                        const e = t.getAttribute("width"),
                            i = t.getAttribute("height"),
                            n = {};
                        return e && (n.width = parseInt(e, 10)), i && (n.height = parseInt(i, 10)), n
                    })(t);
                    for (const t in i) {
                        const n = i[t];
                        e[t] = n
                    }
                    return this.appendAttachmentWithAttributes(e, this.getTextAttributes(t)), this.processedElements.push(t);
                case "tr":
                    if (this.needsTableSeparator(t)) return this.appendStringWithAttributes(M.tableRowSeparator);
                    break;
                case "td":
                    if (this.needsTableSeparator(t)) return this.appendStringWithAttributes(M.tableCellSeparator)
            }
        }
        appendBlockForAttributesWithElement(t, e) {
            this.blockElements.push(e);
            const i = function () {
                return {
                    text: [],
                    attributes: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                }
            }(t);
            return this.blocks.push(i), i
        }
        appendEmptyBlock() {
            return this.appendBlockForAttributesWithElement([], null)
        }
        appendStringWithAttributes(t, e) {
            return this.appendPiece(Ke(t, e))
        }
        appendAttachmentWithAttributes(t, e) {
            return this.appendPiece(function (t) {
                return {
                    attachment: t,
                    attributes: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    type: "attachment"
                }
            }(t, e))
        }
        appendPiece(t) {
            return 0 === this.blocks.length && this.appendEmptyBlock(), this.blocks[this.blocks.length - 1].text.push(t)
        }
        appendStringToTextAtIndex(t, e) {
            const {
                text: i
            } = this.blocks[e], n = i[i.length - 1];
            if ("string" !== (null == n ? void 0 : n.type)) return i.push(Ke(t));
            n.string += t
        }
        prependStringToTextAtIndex(t, e) {
            const {
                text: i
            } = this.blocks[e], n = i[0];
            if ("string" !== (null == n ? void 0 : n.type)) return i.unshift(Ke(t));
            n.string = t + n.string
        }
        getTextAttributes(t) {
            let e;
            const i = {};
            for (const n in j) {
                const r = j[n];
                if (r.tagName && b(t, {
                        matchingSelector: r.tagName,
                        untilNode: this.containerElement
                    })) i[n] = !0;
                else if (r.parser) {
                    if (e = r.parser(t), e) {
                        let o = !1;
                        for (const i of this.findBlockElementAncestors(t))
                            if (r.parser(i) === e) {
                                o = !0;
                                break
                            } o || (i[n] = e)
                    }
                } else r.styleProperty && (e = t.style[r.styleProperty], e && (i[n] = e))
            }
            if (P(t)) {
                const n = Ge(t, "attributes");
                for (const t in n) e = n[t], i[t] = e
            }
            return i
        }
        getBlockAttributes(t) {
            const e = [];
            for (; t && t !== this.containerElement;) {
                for (const r in n) {
                    const o = n[r];
                    var i;
                    if (!1 !== o.parse)
                        if (R(t) === o.tagName)(null !== (i = o.test) && void 0 !== i && i.call(o, t) || !o.test) && (e.push(r), o.listAttribute && e.push(o.listAttribute))
                }
                t = t.parentNode
            }
            return e.reverse()
        }
        findBlockElementAncestors(t) {
            const e = [];
            for (; t && t !== this.containerElement;) {
                const i = R(t);
                k().includes(i) && e.push(t), t = t.parentNode
            }
            return e
        }
        isBlockElement(t) {
            if ((null == t ? void 0 : t.nodeType) === Node.ELEMENT_NODE && !P(t) && !b(t, {
                    matchingSelector: "td",
                    untilNode: this.containerElement
                })) return k().includes(R(t)) || "block" === window.getComputedStyle(t).display
        }
        isInsignificantTextNode(t) {
            if ((null == t ? void 0 : t.nodeType) !== Node.TEXT_NODE) return;
            if (!ei(t.data)) return;
            const {
                parentNode: e,
                previousSibling: i,
                nextSibling: n
            } = t;
            return Ye(e.previousSibling) && !this.isBlockElement(e.previousSibling) || Xe(e) ? void 0 : !i || this.isBlockElement(i) || !n || this.isBlockElement(n)
        }
        isExtraBR(t) {
            return "br" === R(t) && this.isBlockElement(t.parentNode) && t.parentNode.lastChild === t
        }
        needsTableSeparator(t) {
            if (M.removeBlankTableCells) {
                var e;
                const i = null === (e = t.previousSibling) || void 0 === e ? void 0 : e.textContent;
                return i && /\S/.test(i)
            }
            return t.previousSibling
        }
        translateBlockElementMarginsToNewlines() {
            const t = this.getMarginOfDefaultBlockElement();
            for (let e = 0; e < this.blocks.length; e++) {
                const i = this.getMarginOfBlockElementAtIndex(e);
                i && (i.top > 2 * t.top && this.prependStringToTextAtIndex("\n", e), i.bottom > 2 * t.bottom && this.appendStringToTextAtIndex("\n", e))
            }
        }
        getMarginOfBlockElementAtIndex(t) {
            const e = this.blockElements[t];
            if (e && e.textContent && !k().includes(R(e)) && !this.processedElements.includes(e)) return Qe(e)
        }
        getMarginOfDefaultBlockElement() {
            const t = S(n.default.tagName);
            return this.containerElement.appendChild(t), Qe(t)
        }
    }
    const Xe = function (t) {
            const {
                whiteSpace: e
            } = window.getComputedStyle(t);
            return ["pre", "pre-wrap", "pre-line"].includes(e)
        },
        Ye = t => t && !ii(t.textContent),
        Qe = function (t) {
            const e = window.getComputedStyle(t);
            if ("block" === e.display) return {
                top: parseInt(e.marginTop),
                bottom: parseInt(e.marginBottom)
            }
        },
        Ze = function (t) {
            return "style" === R(t) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
        },
        ti = t => t.replace(new RegExp("^".concat(qt.source, "+")), ""),
        ei = t => new RegExp("^".concat(qt.source, "*$")).test(t),
        ii = t => /\s$/.test(t),
        ni = ["contenteditable", "data-trix-id", "data-trix-store-key", "data-trix-mutable", "data-trix-placeholder", "tabindex"],
        ri = "data-trix-serialized-attributes",
        oi = "[".concat(ri, "]"),
        si = new RegExp("\x3c!--block--\x3e", "g"),
        ai = {
            "application/json": function (t) {
                let e;
                if (t instanceof qe) e = t;
                else {
                    if (!(t instanceof HTMLElement)) throw new Error("unserializable object");
                    e = $e.parse(t.innerHTML).getDocument()
                }
                return e.toSerializableDocument().toJSONString()
            },
            "text/html": function (t) {
                let e;
                if (t instanceof qe) e = ge.render(t);
                else {
                    if (!(t instanceof HTMLElement)) throw new Error("unserializable object");
                    e = t.cloneNode(!0)
                }
                return Array.from(e.querySelectorAll("[data-trix-serialize=false]")).forEach((t => {
                    y(t)
                })), ni.forEach((t => {
                    Array.from(e.querySelectorAll("[".concat(t, "]"))).forEach((e => {
                        e.removeAttribute(t)
                    }))
                })), Array.from(e.querySelectorAll(oi)).forEach((t => {
                    try {
                        const e = JSON.parse(t.getAttribute(ri));
                        t.removeAttribute(ri);
                        for (const i in e) {
                            const n = e[i];
                            t.setAttribute(i, n)
                        }
                    } catch (t) {}
                })), e.innerHTML.replace(si, "")
            }
        };
    var li = Object.freeze({
        __proto__: null
    });
    class ci extends V {
        constructor(t, e) {
            super(...arguments), this.attachmentManager = t, this.attachment = e, this.id = this.attachment.id, this.file = this.attachment.file
        }
        remove() {
            return this.attachmentManager.requestRemovalOfAttachment(this.attachment)
        }
    }
    ci.proxyMethod("attachment.getAttribute"), ci.proxyMethod("attachment.hasAttribute"), ci.proxyMethod("attachment.setAttribute"), ci.proxyMethod("attachment.getAttributes"), ci.proxyMethod("attachment.setAttributes"), ci.proxyMethod("attachment.isPending"), ci.proxyMethod("attachment.isPreviewable"), ci.proxyMethod("attachment.getURL"), ci.proxyMethod("attachment.getHref"), ci.proxyMethod("attachment.getFilename"), ci.proxyMethod("attachment.getFilesize"), ci.proxyMethod("attachment.getFormattedFilesize"), ci.proxyMethod("attachment.getExtension"), ci.proxyMethod("attachment.getContentType"), ci.proxyMethod("attachment.getFile"), ci.proxyMethod("attachment.setFile"), ci.proxyMethod("attachment.releaseFile"), ci.proxyMethod("attachment.getUploadProgress"), ci.proxyMethod("attachment.setUploadProgress");
    class ui extends V {
        constructor() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
            super(...arguments), this.managedAttachments = {}, Array.from(t).forEach((t => {
                this.manageAttachment(t)
            }))
        }
        getAttachments() {
            const t = [];
            for (const e in this.managedAttachments) {
                const i = this.managedAttachments[e];
                t.push(i)
            }
            return t
        }
        manageAttachment(t) {
            return this.managedAttachments[t.id] || (this.managedAttachments[t.id] = new ci(this, t)), this.managedAttachments[t.id]
        }
        attachmentIsManaged(t) {
            return t.id in this.managedAttachments
        }
        requestRemovalOfAttachment(t) {
            var e, i;
            if (this.attachmentIsManaged(t)) return null === (e = this.delegate) || void 0 === e || null === (i = e.attachmentManagerDidRequestRemovalOfAttachment) || void 0 === i ? void 0 : i.call(e, t)
        }
        unmanageAttachment(t) {
            const e = this.managedAttachments[t.id];
            return delete this.managedAttachments[t.id], e
        }
    }
    class hi {
        constructor(t) {
            this.composition = t, this.document = this.composition.document;
            const e = this.composition.getSelectedRange();
            this.startPosition = e[0], this.endPosition = e[1], this.startLocation = this.document.locationFromPosition(this.startPosition), this.endLocation = this.document.locationFromPosition(this.endPosition), this.block = this.document.getBlockAtIndex(this.endLocation.index), this.breaksOnReturn = this.block.breaksOnReturn(), this.previousCharacter = this.block.text.getStringAtPosition(this.endLocation.offset - 1), this.nextCharacter = this.block.text.getStringAtPosition(this.endLocation.offset)
        }
        shouldInsertBlockBreak() {
            return this.block.hasAttributes() && this.block.isListItem() && !this.block.isEmpty() ? 0 !== this.startLocation.offset : this.breaksOnReturn && "\n" !== this.nextCharacter
        }
        shouldBreakFormattedBlock() {
            return this.block.hasAttributes() && !this.block.isListItem() && (this.breaksOnReturn && "\n" === this.nextCharacter || "\n" === this.previousCharacter)
        }
        shouldDecreaseListLevel() {
            return this.block.hasAttributes() && this.block.isListItem() && this.block.isEmpty()
        }
        shouldPrependListItem() {
            return this.block.isListItem() && 0 === this.startLocation.offset && !this.block.isEmpty()
        }
        shouldRemoveLastBlockAttribute() {
            return this.block.hasAttributes() && !this.block.isListItem() && this.block.isEmpty()
        }
    }
    class di extends V {
        constructor() {
            super(...arguments), this.document = new qe, this.attachments = [], this.currentAttributes = {}, this.revision = 0
        }
        setDocument(t) {
            var e, i;
            if (!t.isEqualTo(this.document)) return this.document = t, this.refreshAttachments(), this.revision++, null === (e = this.delegate) || void 0 === e || null === (i = e.compositionDidChangeDocument) || void 0 === i ? void 0 : i.call(e, t)
        }
        getSnapshot() {
            return {
                document: this.document,
                selectedRange: this.getSelectedRange()
            }
        }
        loadSnapshot(t) {
            var e, i, n, r;
            let {
                document: o,
                selectedRange: s
            } = t;
            return null === (e = this.delegate) || void 0 === e || null === (i = e.compositionWillLoadSnapshot) || void 0 === i || i.call(e), this.setDocument(null != o ? o : new qe), this.setSelection(null != s ? s : [0, 0]), null === (n = this.delegate) || void 0 === n || null === (r = n.compositionDidLoadSnapshot) || void 0 === r ? void 0 : r.call(n)
        }
        insertText(t) {
            let {
                updatePosition: e
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                updatePosition: !0
            };
            const i = this.getSelectedRange();
            this.setDocument(this.document.insertTextAtRange(t, i));
            const n = i[0],
                r = n + t.getLength();
            return e && this.setSelection(r), this.notifyDelegateOfInsertionAtRange([n, r])
        }
        insertBlock() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Te;
            const e = new qe([t]);
            return this.insertDocument(e)
        }
        insertDocument() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new qe;
            const e = this.getSelectedRange();
            this.setDocument(this.document.insertDocumentAtRange(t, e));
            const i = e[0],
                n = i + t.getLength();
            return this.setSelection(n), this.notifyDelegateOfInsertionAtRange([i, n])
        }
        insertString(t, e) {
            const i = this.getCurrentTextAttributes(),
                n = we.textForStringWithAttributes(t, i);
            return this.insertText(n, e)
        }
        insertBlockBreak() {
            const t = this.getSelectedRange();
            this.setDocument(this.document.insertBlockBreakAtRange(t));
            const e = t[0],
                i = e + 1;
            return this.setSelection(i), this.notifyDelegateOfInsertionAtRange([e, i])
        }
        insertLineBreak() {
            const t = new hi(this);
            if (t.shouldDecreaseListLevel()) return this.decreaseListLevel(), this.setSelection(t.startPosition);
            if (t.shouldPrependListItem()) {
                const e = new qe([t.block.copyWithoutText()]);
                return this.insertDocument(e)
            }
            return t.shouldInsertBlockBreak() ? this.insertBlockBreak() : t.shouldRemoveLastBlockAttribute() ? this.removeLastBlockAttribute() : t.shouldBreakFormattedBlock() ? this.breakFormattedBlock(t) : this.insertString("\n")
        }
        insertHTML(t) {
            const e = $e.parse(t).getDocument(),
                i = this.getSelectedRange();
            this.setDocument(this.document.mergeDocumentAtRange(e, i));
            const n = i[0],
                r = n + e.getLength() - 1;
            return this.setSelection(r), this.notifyDelegateOfInsertionAtRange([n, r])
        }
        replaceHTML(t) {
            const e = $e.parse(t).getDocument().copyUsingObjectsFromDocument(this.document),
                i = this.getLocationRange({
                    strict: !1
                }),
                n = this.document.rangeFromLocationRange(i);
            return this.setDocument(e), this.setSelection(n)
        }
        insertFile(t) {
            return this.insertFiles([t])
        }
        insertFiles(t) {
            const e = [];
            return Array.from(t).forEach((t => {
                var i;
                if (null !== (i = this.delegate) && void 0 !== i && i.compositionShouldAcceptFile(t)) {
                    const i = Ce.attachmentForFile(t);
                    e.push(i)
                }
            })), this.insertAttachments(e)
        }
        insertAttachment(t) {
            return this.insertAttachments([t])
        }
        insertAttachments(t) {
            let e = new we;
            return Array.from(t).forEach((t => {
                var n;
                const r = t.getType(),
                    o = null === (n = i[r]) || void 0 === n ? void 0 : n.presentation,
                    s = this.getCurrentTextAttributes();
                o && (s.presentation = o);
                const a = we.textForAttachmentWithAttributes(t, s);
                e = e.appendText(a)
            })), this.insertText(e)
        }
        shouldManageDeletingInDirection(t) {
            const e = this.getLocationRange();
            if (Lt(e)) {
                if ("backward" === t && 0 === e[0].offset) return !0;
                if (this.shouldManageMovingCursorInDirection(t)) return !0
            } else if (e[0].index !== e[1].index) return !0;
            return !1
        }
        deleteInDirection(t) {
            let e, i, n, {
                length: r
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const o = this.getLocationRange();
            let s = this.getSelectedRange();
            const a = Lt(s);
            if (a ? i = "backward" === t && 0 === o[0].offset : n = o[0].index !== o[1].index, i && this.canDecreaseBlockAttributeLevel()) {
                const t = this.getBlock();
                if (t.isListItem() ? this.decreaseListLevel() : this.decreaseBlockAttributeLevel(), this.setSelection(s[0]), t.isEmpty()) return !1
            }
            return a && (s = this.getExpandedRangeInDirection(t, {
                length: r
            }), "backward" === t && (e = this.getAttachmentAtRange(s))), e ? (this.editAttachment(e), !1) : (this.setDocument(this.document.removeTextAtRange(s)), this.setSelection(s[0]), !i && !n && void 0)
        }
        moveTextFromRange(t) {
            const [e] = Array.from(this.getSelectedRange());
            return this.setDocument(this.document.moveTextFromRangeToPosition(t, e)), this.setSelection(e)
        }
        removeAttachment(t) {
            const e = this.document.getRangeOfAttachment(t);
            if (e) return this.stopEditingAttachment(), this.setDocument(this.document.removeTextAtRange(e)), this.setSelection(e[0])
        }
        removeLastBlockAttribute() {
            const [t, e] = Array.from(this.getSelectedRange()), i = this.document.getBlockAtPosition(e);
            return this.removeCurrentAttribute(i.getLastAttribute()), this.setSelection(t)
        }
        insertPlaceholder() {
            return this.placeholderPosition = this.getPosition(), this.insertString(" ")
        }
        selectPlaceholder() {
            if (null != this.placeholderPosition) return this.setSelectedRange([this.placeholderPosition, this.placeholderPosition + " ".length]), this.getSelectedRange()
        }
        forgetPlaceholder() {
            this.placeholderPosition = null
        }
        hasCurrentAttribute(t) {
            const e = this.currentAttributes[t];
            return null != e && !1 !== e
        }
        toggleCurrentAttribute(t) {
            const e = !this.currentAttributes[t];
            return e ? this.setCurrentAttribute(t, e) : this.removeCurrentAttribute(t)
        }
        canSetCurrentAttribute(t) {
            return dt(t) ? this.canSetCurrentBlockAttribute(t) : this.canSetCurrentTextAttribute(t)
        }
        canSetCurrentTextAttribute(t) {
            const e = this.getSelectedDocument();
            if (e) {
                for (const t of Array.from(e.getAttachments()))
                    if (!t.hasContent()) return !1;
                return !0
            }
        }
        canSetCurrentBlockAttribute(t) {
            const e = this.getBlock();
            if (e) return !e.isTerminalBlock()
        }
        setCurrentAttribute(t, e) {
            return dt(t) ? this.setBlockAttribute(t, e) : (this.setTextAttribute(t, e), this.currentAttributes[t] = e, this.notifyDelegateOfCurrentAttributesChange())
        }
        setTextAttribute(t, e) {
            const i = this.getSelectedRange();
            if (!i) return;
            const [n, r] = Array.from(i);
            if (n !== r) return this.setDocument(this.document.addAttributeAtRange(t, e, i));
            if ("href" === t) {
                const t = we.textForStringWithAttributes(e, {
                    href: e
                });
                return this.insertText(t)
            }
        }
        setBlockAttribute(t, e) {
            const i = this.getSelectedRange();
            if (this.canSetCurrentAttribute(t)) return this.setDocument(this.document.applyBlockAttributeAtRange(t, e, i)), this.setSelection(i)
        }
        removeCurrentAttribute(t) {
            return dt(t) ? (this.removeBlockAttribute(t), this.updateCurrentAttributes()) : (this.removeTextAttribute(t), delete this.currentAttributes[t], this.notifyDelegateOfCurrentAttributesChange())
        }
        removeTextAttribute(t) {
            const e = this.getSelectedRange();
            if (e) return this.setDocument(this.document.removeAttributeAtRange(t, e))
        }
        removeBlockAttribute(t) {
            const e = this.getSelectedRange();
            if (e) return this.setDocument(this.document.removeAttributeAtRange(t, e))
        }
        canDecreaseNestingLevel() {
            var t;
            return (null === (t = this.getBlock()) || void 0 === t ? void 0 : t.getNestingLevel()) > 0
        }
        canIncreaseNestingLevel() {
            var t;
            const e = this.getBlock();
            if (e) {
                if (null === (t = dt(e.getLastNestableAttribute())) || void 0 === t || !t.listAttribute) return e.getNestingLevel() > 0; {
                    const t = this.getPreviousBlock();
                    if (t) return function () {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                        return nt((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).slice(0, t.length), t)
                    }(t.getListItemAttributes(), e.getListItemAttributes())
                }
            }
        }
        decreaseNestingLevel() {
            const t = this.getBlock();
            if (t) return this.setDocument(this.document.replaceBlock(t, t.decreaseNestingLevel()))
        }
        increaseNestingLevel() {
            const t = this.getBlock();
            if (t) return this.setDocument(this.document.replaceBlock(t, t.increaseNestingLevel()))
        }
        canDecreaseBlockAttributeLevel() {
            var t;
            return (null === (t = this.getBlock()) || void 0 === t ? void 0 : t.getAttributeLevel()) > 0
        }
        decreaseBlockAttributeLevel() {
            var t;
            const e = null === (t = this.getBlock()) || void 0 === t ? void 0 : t.getLastAttribute();
            if (e) return this.removeCurrentAttribute(e)
        }
        decreaseListLevel() {
            let [t] = Array.from(this.getSelectedRange());
            const {
                index: e
            } = this.document.locationFromPosition(t);
            let i = e;
            const n = this.getBlock().getAttributeLevel();
            let r = this.document.getBlockAtIndex(i + 1);
            for (; r && r.isListItem() && !(r.getAttributeLevel() <= n);) i++, r = this.document.getBlockAtIndex(i + 1);
            t = this.document.positionFromLocation({
                index: e,
                offset: 0
            });
            const o = this.document.positionFromLocation({
                index: i,
                offset: 0
            });
            return this.setDocument(this.document.removeLastListAttributeAtRange([t, o]))
        }
        updateCurrentAttributes() {
            const t = this.getSelectedRange({
                ignoreLock: !0
            });
            if (t) {
                const e = this.document.getCommonAttributesAtRange(t);
                if (Array.from(ht()).forEach((t => {
                        e[t] || this.canSetCurrentAttribute(t) || (e[t] = !1)
                    })), !Et(e, this.currentAttributes)) return this.currentAttributes = e, this.notifyDelegateOfCurrentAttributesChange()
            }
        }
        getCurrentAttributes() {
            return h.call({}, this.currentAttributes)
        }
        getCurrentTextAttributes() {
            const t = {};
            for (const e in this.currentAttributes) {
                const i = this.currentAttributes[e];
                !1 !== i && mt(e) && (t[e] = i)
            }
            return t
        }
        freezeSelection() {
            return this.setCurrentAttribute("frozen", !0)
        }
        thawSelection() {
            return this.removeCurrentAttribute("frozen")
        }
        hasFrozenSelection() {
            return this.hasCurrentAttribute("frozen")
        }
        setSelection(t) {
            var e;
            const i = this.document.locationRangeFromRange(t);
            return null === (e = this.delegate) || void 0 === e ? void 0 : e.compositionDidRequestChangingSelectionToLocationRange(i)
        }
        getSelectedRange() {
            const t = this.getLocationRange();
            if (t) return this.document.rangeFromLocationRange(t)
        }
        setSelectedRange(t) {
            const e = this.document.locationRangeFromRange(t);
            return this.getSelectionManager().setLocationRange(e)
        }
        getPosition() {
            const t = this.getLocationRange();
            if (t) return this.document.positionFromLocation(t[0])
        }
        getLocationRange(t) {
            return this.targetLocationRange ? this.targetLocationRange : this.getSelectionManager().getLocationRange(t) || kt({
                index: 0,
                offset: 0
            })
        }
        withTargetLocationRange(t, e) {
            let i;
            this.targetLocationRange = t;
            try {
                i = e()
            } finally {
                this.targetLocationRange = null
            }
            return i
        }
        withTargetRange(t, e) {
            const i = this.document.locationRangeFromRange(t);
            return this.withTargetLocationRange(i, e)
        }
        withTargetDOMRange(t, e) {
            const i = this.createLocationRangeFromDOMRange(t, {
                strict: !1
            });
            return this.withTargetLocationRange(i, e)
        }
        getExpandedRangeInDirection(t) {
            let {
                length: e
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, [i, n] = Array.from(this.getSelectedRange());
            return "backward" === t ? e ? i -= e : i = this.translateUTF16PositionFromOffset(i, -1) : e ? n += e : n = this.translateUTF16PositionFromOffset(n, 1), kt([i, n])
        }
        shouldManageMovingCursorInDirection(t) {
            if (this.editingAttachment) return !0;
            const e = this.getExpandedRangeInDirection(t);
            return null != this.getAttachmentAtRange(e)
        }
        moveCursorInDirection(t) {
            let e, i;
            if (this.editingAttachment) i = this.document.getRangeOfAttachment(this.editingAttachment);
            else {
                const n = this.getSelectedRange();
                i = this.getExpandedRangeInDirection(t), e = !Dt(n, i)
            }
            if ("backward" === t ? this.setSelectedRange(i[0]) : this.setSelectedRange(i[1]), e) {
                const t = this.getAttachmentAtRange(i);
                if (t) return this.editAttachment(t)
            }
        }
        expandSelectionInDirection(t) {
            let {
                length: e
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const i = this.getExpandedRangeInDirection(t, {
                length: e
            });
            return this.setSelectedRange(i)
        }
        expandSelectionForEditing() {
            if (this.hasCurrentAttribute("href")) return this.expandSelectionAroundCommonAttribute("href")
        }
        expandSelectionAroundCommonAttribute(t) {
            const e = this.getPosition(),
                i = this.document.getRangeOfCommonAttributeAtPosition(t, e);
            return this.setSelectedRange(i)
        }
        selectionContainsAttachments() {
            var t;
            return (null === (t = this.getSelectedAttachments()) || void 0 === t ? void 0 : t.length) > 0
        }
        selectionIsInCursorTarget() {
            return this.editingAttachment || this.positionIsCursorTarget(this.getPosition())
        }
        positionIsCursorTarget(t) {
            const e = this.document.locationFromPosition(t);
            if (e) return this.locationIsCursorTarget(e)
        }
        positionIsBlockBreak(t) {
            var e;
            return null === (e = this.document.getPieceAtPosition(t)) || void 0 === e ? void 0 : e.isBlockBreak()
        }
        getSelectedDocument() {
            const t = this.getSelectedRange();
            if (t) return this.document.getDocumentAtRange(t)
        }
        getSelectedAttachments() {
            var t;
            return null === (t = this.getSelectedDocument()) || void 0 === t ? void 0 : t.getAttachments()
        }
        getAttachments() {
            return this.attachments.slice(0)
        }
        refreshAttachments() {
            const t = this.document.getAttachments(),
                {
                    added: e,
                    removed: i
                } = function () {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                    const i = [],
                        n = [],
                        r = new Set;
                    t.forEach((t => {
                        r.add(t)
                    }));
                    const o = new Set;
                    return e.forEach((t => {
                        o.add(t), r.has(t) || i.push(t)
                    })), t.forEach((t => {
                        o.has(t) || n.push(t)
                    })), {
                        added: i,
                        removed: n
                    }
                }(this.attachments, t);
            return this.attachments = t, Array.from(i).forEach((t => {
                var e, i;
                t.delegate = null, null === (e = this.delegate) || void 0 === e || null === (i = e.compositionDidRemoveAttachment) || void 0 === i || i.call(e, t)
            })), (() => {
                const t = [];
                return Array.from(e).forEach((e => {
                    var i, n;
                    e.delegate = this, t.push(null === (i = this.delegate) || void 0 === i || null === (n = i.compositionDidAddAttachment) || void 0 === n ? void 0 : n.call(i, e))
                })), t
            })()
        }
        attachmentDidChangeAttributes(t) {
            var e, i;
            return this.revision++, null === (e = this.delegate) || void 0 === e || null === (i = e.compositionDidEditAttachment) || void 0 === i ? void 0 : i.call(e, t)
        }
        attachmentDidChangePreviewURL(t) {
            var e, i;
            return this.revision++, null === (e = this.delegate) || void 0 === e || null === (i = e.compositionDidChangeAttachmentPreviewURL) || void 0 === i ? void 0 : i.call(e, t)
        }
        editAttachment(t, e) {
            var i, n;
            if (t !== this.editingAttachment) return this.stopEditingAttachment(), this.editingAttachment = t, null === (i = this.delegate) || void 0 === i || null === (n = i.compositionDidStartEditingAttachment) || void 0 === n ? void 0 : n.call(i, this.editingAttachment, e)
        }
        stopEditingAttachment() {
            var t, e;
            this.editingAttachment && (null === (t = this.delegate) || void 0 === t || null === (e = t.compositionDidStopEditingAttachment) || void 0 === e || e.call(t, this.editingAttachment), this.editingAttachment = null)
        }
        updateAttributesForAttachment(t, e) {
            return this.setDocument(this.document.updateAttributesForAttachment(t, e))
        }
        removeAttributeForAttachment(t, e) {
            return this.setDocument(this.document.removeAttributeForAttachment(t, e))
        }
        breakFormattedBlock(t) {
            let {
                document: e
            } = t;
            const {
                block: i
            } = t;
            let n = t.startPosition,
                r = [n - 1, n];
            i.getBlockBreakPosition() === t.startLocation.offset ? (i.breaksOnReturn() && "\n" === t.nextCharacter ? n += 1 : e = e.removeTextAtRange(r), r = [n, n]) : "\n" === t.nextCharacter ? "\n" === t.previousCharacter ? r = [n - 1, n + 1] : (r = [n, n + 1], n += 1) : t.startLocation.offset - 1 != 0 && (n += 1);
            const o = new qe([i.removeLastAttribute().copyWithoutText()]);
            return this.setDocument(e.insertDocumentAtRange(o, r)), this.setSelection(n)
        }
        getPreviousBlock() {
            const t = this.getLocationRange();
            if (t) {
                const {
                    index: e
                } = t[0];
                if (e > 0) return this.document.getBlockAtIndex(e - 1)
            }
        }
        getBlock() {
            const t = this.getLocationRange();
            if (t) return this.document.getBlockAtIndex(t[0].index)
        }
        getAttachmentAtRange(t) {
            const e = this.document.getDocumentAtRange(t);
            if (e.toString() === "".concat("￼", "\n")) return e.getAttachments()[0]
        }
        notifyDelegateOfCurrentAttributesChange() {
            var t, e;
            return null === (t = this.delegate) || void 0 === t || null === (e = t.compositionDidChangeCurrentAttributes) || void 0 === e ? void 0 : e.call(t, this.currentAttributes)
        }
        notifyDelegateOfInsertionAtRange(t) {
            var e, i;
            return null === (e = this.delegate) || void 0 === e || null === (i = e.compositionDidPerformInsertionAtRange) || void 0 === i ? void 0 : i.call(e, t)
        }
        translateUTF16PositionFromOffset(t, e) {
            const i = this.document.toUTF16String(),
                n = i.offsetFromUCS2Offset(t);
            return i.offsetToUCS2Offset(n + e)
        }
    }
    di.proxyMethod("getSelectionManager().getPointRange"), di.proxyMethod("getSelectionManager().setLocationRangeFromPointRange"), di.proxyMethod("getSelectionManager().createLocationRangeFromDOMRange"), di.proxyMethod("getSelectionManager().locationIsCursorTarget"), di.proxyMethod("getSelectionManager().selectionIsExpanded"), di.proxyMethod("delegate?.getSelectionManager");
    class gi extends V {
        constructor(t) {
            super(...arguments), this.composition = t, this.undoEntries = [], this.redoEntries = []
        }
        recordUndoEntry(t) {
            let {
                context: e,
                consolidatable: i
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const n = this.undoEntries.slice(-1)[0];
            if (!i || !mi(n, t, e)) {
                const i = this.createEntry({
                    description: t,
                    context: e
                });
                this.undoEntries.push(i), this.redoEntries = []
            }
        }
        undo() {
            const t = this.undoEntries.pop();
            if (t) {
                const e = this.createEntry(t);
                return this.redoEntries.push(e), this.composition.loadSnapshot(t.snapshot)
            }
        }
        redo() {
            const t = this.redoEntries.pop();
            if (t) {
                const e = this.createEntry(t);
                return this.undoEntries.push(e), this.composition.loadSnapshot(t.snapshot)
            }
        }
        canUndo() {
            return this.undoEntries.length > 0
        }
        canRedo() {
            return this.redoEntries.length > 0
        }
        createEntry() {
            let {
                description: t,
                context: e
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                description: null == t ? void 0 : t.toString(),
                context: JSON.stringify(e),
                snapshot: this.composition.getSnapshot()
            }
        }
    }
    const mi = (t, e, i) => (null == t ? void 0 : t.description) === (null == e ? void 0 : e.toString()) && (null == t ? void 0 : t.context) === JSON.stringify(i),
        pi = "attachmentGallery";
    class fi {
        constructor(t) {
            this.document = t.document, this.selectedRange = t.selectedRange
        }
        perform() {
            return this.removeBlockAttribute(), this.applyBlockAttribute()
        }
        getSnapshot() {
            return {
                document: this.document,
                selectedRange: this.selectedRange
            }
        }
        removeBlockAttribute() {
            return this.findRangesOfBlocks().map((t => this.document = this.document.removeAttributeAtRange(pi, t)))
        }
        applyBlockAttribute() {
            let t = 0;
            this.findRangesOfPieces().forEach((e => {
                e[1] - e[0] > 1 && (e[0] += t, e[1] += t, "\n" !== this.document.getCharacterAtPosition(e[1]) && (this.document = this.document.insertBlockBreakAtRange(e[1]), e[1] < this.selectedRange[1] && this.moveSelectedRangeForward(), e[1]++, t++), 0 !== e[0] && "\n" !== this.document.getCharacterAtPosition(e[0] - 1) && (this.document = this.document.insertBlockBreakAtRange(e[0]), e[0] < this.selectedRange[0] && this.moveSelectedRangeForward(), e[0]++, t++), this.document = this.document.applyBlockAttributeAtRange(pi, !0, e))
            }))
        }
        findRangesOfBlocks() {
            return this.document.findRangesForBlockAttribute(pi)
        }
        findRangesOfPieces() {
            return this.document.findRangesForTextAttribute("presentation", {
                withValue: "gallery"
            })
        }
        moveSelectedRangeForward() {
            this.selectedRange[0] += 1, this.selectedRange[1] += 1
        }
    }
    const bi = function (t) {
            const e = new fi(t);
            return e.perform(), e.getSnapshot()
        },
        vi = [bi];
    class Ai {
        constructor(t, e, i) {
            this.insertFiles = this.insertFiles.bind(this), this.composition = t, this.selectionManager = e, this.element = i, this.undoManager = new gi(this.composition), this.filters = vi.slice(0)
        }
        loadDocument(t) {
            return this.loadSnapshot({
                document: t,
                selectedRange: [0, 0]
            })
        }
        loadHTML() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            const e = $e.parse(t, {
                referenceElement: this.element
            }).getDocument();
            return this.loadDocument(e)
        }
        loadJSON(t) {
            let {
                document: e,
                selectedRange: i
            } = t;
            return e = qe.fromJSON(e), this.loadSnapshot({
                document: e,
                selectedRange: i
            })
        }
        loadSnapshot(t) {
            return this.undoManager = new gi(this.composition), this.composition.loadSnapshot(t)
        }
        getDocument() {
            return this.composition.document
        }
        getSelectedDocument() {
            return this.composition.getSelectedDocument()
        }
        getSnapshot() {
            return this.composition.getSnapshot()
        }
        toJSON() {
            return this.getSnapshot()
        }
        deleteInDirection(t) {
            return this.composition.deleteInDirection(t)
        }
        insertAttachment(t) {
            return this.composition.insertAttachment(t)
        }
        insertAttachments(t) {
            return this.composition.insertAttachments(t)
        }
        insertDocument(t) {
            return this.composition.insertDocument(t)
        }
        insertFile(t) {
            return this.composition.insertFile(t)
        }
        insertFiles(t) {
            return this.composition.insertFiles(t)
        }
        insertHTML(t) {
            return this.composition.insertHTML(t)
        }
        insertString(t) {
            return this.composition.insertString(t)
        }
        insertText(t) {
            return this.composition.insertText(t)
        }
        insertLineBreak() {
            return this.composition.insertLineBreak()
        }
        getSelectedRange() {
            return this.composition.getSelectedRange()
        }
        getPosition() {
            return this.composition.getPosition()
        }
        getClientRectAtPosition(t) {
            const e = this.getDocument().locationRangeFromRange([t, t + 1]);
            return this.selectionManager.getClientRectAtLocationRange(e)
        }
        expandSelectionInDirection(t) {
            return this.composition.expandSelectionInDirection(t)
        }
        moveCursorInDirection(t) {
            return this.composition.moveCursorInDirection(t)
        }
        setSelectedRange(t) {
            return this.composition.setSelectedRange(t)
        }
        activateAttribute(t) {
            let e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            return this.composition.setCurrentAttribute(t, e)
        }
        attributeIsActive(t) {
            return this.composition.hasCurrentAttribute(t)
        }
        canActivateAttribute(t) {
            return this.composition.canSetCurrentAttribute(t)
        }
        deactivateAttribute(t) {
            return this.composition.removeCurrentAttribute(t)
        }
        canDecreaseNestingLevel() {
            return this.composition.canDecreaseNestingLevel()
        }
        canIncreaseNestingLevel() {
            return this.composition.canIncreaseNestingLevel()
        }
        decreaseNestingLevel() {
            if (this.canDecreaseNestingLevel()) return this.composition.decreaseNestingLevel()
        }
        increaseNestingLevel() {
            if (this.canIncreaseNestingLevel()) return this.composition.increaseNestingLevel()
        }
        canRedo() {
            return this.undoManager.canRedo()
        }
        canUndo() {
            return this.undoManager.canUndo()
        }
        recordUndoEntry(t) {
            let {
                context: e,
                consolidatable: i
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return this.undoManager.recordUndoEntry(t, {
                context: e,
                consolidatable: i
            })
        }
        redo() {
            if (this.canRedo()) return this.undoManager.redo()
        }
        undo() {
            if (this.canUndo()) return this.undoManager.undo()
        }
    }
    class xi {
        constructor(t) {
            this.element = t
        }
        findLocationFromContainerAndOffset(t, e) {
            let {
                strict: i
            } = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
                strict: !0
            }, n = 0, r = !1;
            const o = {
                    index: 0,
                    offset: 0
                },
                s = this.findAttachmentElementParentForNode(t);
            s && (t = s.parentNode, e = x(s));
            const a = C(this.element, {
                usingFilter: Si
            });
            for (; a.nextNode();) {
                const s = a.currentNode;
                if (s === t && N(t)) {
                    B(s) || (o.offset += e);
                    break
                }
                if (s.parentNode === t) {
                    if (n++ === e) break
                } else if (!A(t, s) && n > 0) break;
                w(s, {
                    strict: i
                }) ? (r && o.index++, o.offset = 0, r = !0) : o.offset += yi(s)
            }
            return o
        }
        findContainerAndOffsetFromLocation(t) {
            let e, i;
            if (0 === t.index && 0 === t.offset) {
                for (e = this.element, i = 0; e.firstChild;)
                    if (e = e.firstChild, L(e)) {
                        i = 1;
                        break
                    } return [e, i]
            }
            let [n, r] = this.findNodeAndOffsetFromLocation(t);
            if (n) {
                if (N(n)) 0 === yi(n) ? (e = n.parentNode.parentNode, i = x(n.parentNode), B(n, {
                    name: "right"
                }) && i++) : (e = n, i = t.offset - r);
                else {
                    if (e = n.parentNode, !w(n.previousSibling) && !L(e))
                        for (; n === e.lastChild && (n = e, e = e.parentNode, !L(e)););
                    i = x(n), 0 !== t.offset && i++
                }
                return [e, i]
            }
        }
        findNodeAndOffsetFromLocation(t) {
            let e, i, n = 0;
            for (const r of this.getSignificantNodesForIndex(t.index)) {
                const o = yi(r);
                if (t.offset <= n + o)
                    if (N(r)) {
                        if (e = r, i = n, t.offset === i && B(e)) break
                    } else e || (e = r, i = n);
                if (n += o, n > t.offset) break
            }
            return [e, i]
        }
        findAttachmentElementParentForNode(t) {
            for (; t && t !== this.element;) {
                if (P(t)) return t;
                t = t.parentNode
            }
        }
        getSignificantNodesForIndex(t) {
            const e = [],
                i = C(this.element, {
                    usingFilter: Ci
                });
            let n = !1;
            for (; i.nextNode();) {
                const o = i.currentNode;
                var r;
                if (T(o)) {
                    if (null != r ? r++ : r = 0, r === t) n = !0;
                    else if (n) break
                } else n && e.push(o)
            }
            return e
        }
    }
    const yi = function (t) {
            if (t.nodeType === Node.TEXT_NODE) {
                if (B(t)) return 0;
                return t.textContent.length
            }
            return "br" === R(t) || P(t) ? 1 : 0
        },
        Ci = function (t) {
            return Ri(t) === NodeFilter.FILTER_ACCEPT ? Si(t) : NodeFilter.FILTER_REJECT
        },
        Ri = function (t) {
            return I(t) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
        },
        Si = function (t) {
            return P(t.parentNode) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
        };
    class Ei {
        createDOMRangeFromPoint(t) {
            let e, {
                x: i,
                y: n
            } = t;
            if (document.caretPositionFromPoint) {
                const {
                    offsetNode: t,
                    offset: r
                } = document.caretPositionFromPoint(i, n);
                return e = document.createRange(), e.setStart(t, r), e
            }
            if (document.caretRangeFromPoint) return document.caretRangeFromPoint(i, n);
            if (document.body.createTextRange) {
                const t = Nt();
                try {
                    const t = document.body.createTextRange();
                    t.moveToPoint(i, n), t.select()
                } catch (t) {}
                return e = Nt(), Ot(t), e
            }
        }
        getClientRectsForDOMRange(t) {
            const e = Array.from(t.getClientRects());
            return [e[0], e[e.length - 1]]
        }
    }
    class ki extends V {
        constructor(t) {
            super(...arguments), this.didMouseDown = this.didMouseDown.bind(this), this.selectionDidChange = this.selectionDidChange.bind(this), this.element = t, this.locationMapper = new xi(this.element), this.pointMapper = new Ei, this.lockCount = 0, m("mousedown", {
                onElement: this.element,
                withCallback: this.didMouseDown
            })
        }
        getLocationRange() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return !1 === t.strict ? this.createLocationRangeFromDOMRange(Nt()) : t.ignoreLock ? this.currentLocationRange : this.lockedLocationRange ? this.lockedLocationRange : this.currentLocationRange
        }
        setLocationRange(t) {
            if (this.lockedLocationRange) return;
            t = kt(t);
            const e = this.createDOMRangeFromLocationRange(t);
            e && (Ot(e), this.updateCurrentLocationRange(t))
        }
        setLocationRangeFromPointRange(t) {
            t = kt(t);
            const e = this.getLocationAtPoint(t[0]),
                i = this.getLocationAtPoint(t[1]);
            this.setLocationRange([e, i])
        }
        getClientRectAtLocationRange(t) {
            const e = this.createDOMRangeFromLocationRange(t);
            if (e) return this.getClientRectsForDOMRange(e)[1]
        }
        locationIsCursorTarget(t) {
            const e = Array.from(this.findNodeAndOffsetFromLocation(t))[0];
            return B(e)
        }
        lock() {
            0 == this.lockCount++ && (this.updateCurrentLocationRange(), this.lockedLocationRange = this.getLocationRange())
        }
        unlock() {
            if (0 == --this.lockCount) {
                const {
                    lockedLocationRange: t
                } = this;
                if (this.lockedLocationRange = null, null != t) return this.setLocationRange(t)
            }
        }
        clearSelection() {
            var t;
            return null === (t = It()) || void 0 === t ? void 0 : t.removeAllRanges()
        }
        selectionIsCollapsed() {
            var t;
            return !0 === (null === (t = Nt()) || void 0 === t ? void 0 : t.collapsed)
        }
        selectionIsExpanded() {
            return !this.selectionIsCollapsed()
        }
        createLocationRangeFromDOMRange(t, e) {
            if (null == t || !this.domRangeWithinElement(t)) return;
            const i = this.findLocationFromContainerAndOffset(t.startContainer, t.startOffset, e);
            if (!i) return;
            const n = t.collapsed ? void 0 : this.findLocationFromContainerAndOffset(t.endContainer, t.endOffset, e);
            return kt([i, n])
        }
        didMouseDown() {
            return this.pauseTemporarily()
        }
        pauseTemporarily() {
            let t;
            this.paused = !0;
            const e = () => {
                    if (this.paused = !1, clearTimeout(i), Array.from(t).forEach((t => {
                            t.destroy()
                        })), A(document, this.element)) return this.selectionDidChange()
                },
                i = setTimeout(e, 200);
            t = ["mousemove", "keydown"].map((t => m(t, {
                onElement: document,
                withCallback: e
            })))
        }
        selectionDidChange() {
            if (!this.paused && !v(this.element)) return this.updateCurrentLocationRange()
        }
        updateCurrentLocationRange(t) {
            var e, i;
            if ((null != t ? t : t = this.createLocationRangeFromDOMRange(Nt())) && !Dt(t, this.currentLocationRange)) return this.currentLocationRange = t, null === (e = this.delegate) || void 0 === e || null === (i = e.locationRangeDidChange) || void 0 === i ? void 0 : i.call(e, this.currentLocationRange.slice(0))
        }
        createDOMRangeFromLocationRange(t) {
            const e = this.findContainerAndOffsetFromLocation(t[0]),
                i = Lt(t) ? e : this.findContainerAndOffsetFromLocation(t[1]) || e;
            if (null != e && null != i) {
                const t = document.createRange();
                return t.setStart(...Array.from(e || [])), t.setEnd(...Array.from(i || [])), t
            }
        }
        getLocationAtPoint(t) {
            const e = this.createDOMRangeFromPoint(t);
            var i;
            if (e) return null === (i = this.createLocationRangeFromDOMRange(e)) || void 0 === i ? void 0 : i[0]
        }
        domRangeWithinElement(t) {
            return t.collapsed ? A(this.element, t.startContainer) : A(this.element, t.startContainer) && A(this.element, t.endContainer)
        }
    }
    ki.proxyMethod("locationMapper.findLocationFromContainerAndOffset"), ki.proxyMethod("locationMapper.findContainerAndOffsetFromLocation"), ki.proxyMethod("locationMapper.findNodeAndOffsetFromLocation"), ki.proxyMethod("pointMapper.createDOMRangeFromPoint"), ki.proxyMethod("pointMapper.getClientRectsForDOMRange");
    var Li = Object.freeze({
            __proto__: null,
            Attachment: Ce,
            AttachmentManager: ui,
            AttachmentPiece: Re,
            Block: Te,
            Composition: di,
            Document: qe,
            Editor: Ai,
            HTMLParser: $e,
            HTMLSanitizer: He,
            LineBreakInsertion: hi,
            LocationMapper: xi,
            ManagedAttachment: ci,
            Piece: xe,
            PointMapper: Ei,
            SelectionManager: ki,
            SplittableList: Ee,
            StringPiece: Se,
            Text: we,
            UndoManager: gi
        }),
        Di = Object.freeze({
            __proto__: null
        });
    const {
        lang: wi,
        css: Ti,
        keyNames: Fi
    } = U, Bi = function (t) {
        return function () {
            const e = t.apply(this, arguments);
            e.do(), this.undos || (this.undos = []), this.undos.push(e.undo)
        }
    };
    class Pi extends V {
        constructor(t, e, i) {
            let n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            super(...arguments), Ae(this, "makeElementMutable", Bi((() => ({
                do: () => {
                    this.element.dataset.trixMutable = !0
                },
                undo: () => delete this.element.dataset.trixMutable
            })))), Ae(this, "addToolbar", Bi((() => {
                const t = S({
                    tagName: "div",
                    className: Ti.attachmentToolbar,
                    data: {
                        trixMutable: !0
                    },
                    childNodes: S({
                        tagName: "div",
                        className: "trix-button-row",
                        childNodes: S({
                            tagName: "span",
                            className: "trix-button-group trix-button-group--actions",
                            childNodes: S({
                                tagName: "button",
                                className: "trix-button trix-button--remove",
                                textContent: wi.remove,
                                attributes: {
                                    title: wi.remove
                                },
                                data: {
                                    trixAction: "remove"
                                }
                            })
                        })
                    })
                });
                return this.attachment.isPreviewable() && t.appendChild(S({
                    tagName: "div",
                    className: Ti.attachmentMetadataContainer,
                    childNodes: S({
                        tagName: "span",
                        className: Ti.attachmentMetadata,
                        childNodes: [S({
                            tagName: "span",
                            className: Ti.attachmentName,
                            textContent: this.attachment.getFilename(),
                            attributes: {
                                title: this.attachment.getFilename()
                            }
                        }), S({
                            tagName: "span",
                            className: Ti.attachmentSize,
                            textContent: this.attachment.getFormattedFilesize()
                        })]
                    })
                })), m("click", {
                    onElement: t,
                    withCallback: this.didClickToolbar
                }), m("click", {
                    onElement: t,
                    matchingSelector: "[data-trix-action]",
                    withCallback: this.didClickActionButton
                }), p("trix-attachment-before-toolbar", {
                    onElement: this.element,
                    attributes: {
                        toolbar: t,
                        attachment: this.attachment
                    }
                }), {
                    do: () => this.element.appendChild(t),
                    undo: () => y(t)
                }
            }))), Ae(this, "installCaptionEditor", Bi((() => {
                const t = S({
                    tagName: "textarea",
                    className: Ti.attachmentCaptionEditor,
                    attributes: {
                        placeholder: wi.captionPlaceholder
                    },
                    data: {
                        trixMutable: !0
                    }
                });
                t.value = this.attachmentPiece.getCaption();
                const e = t.cloneNode();
                e.classList.add("trix-autoresize-clone"), e.tabIndex = -1;
                const i = function () {
                    e.value = t.value, t.style.height = e.scrollHeight + "px"
                };
                m("input", {
                    onElement: t,
                    withCallback: i
                }), m("input", {
                    onElement: t,
                    withCallback: this.didInputCaption
                }), m("keydown", {
                    onElement: t,
                    withCallback: this.didKeyDownCaption
                }), m("change", {
                    onElement: t,
                    withCallback: this.didChangeCaption
                }), m("blur", {
                    onElement: t,
                    withCallback: this.didBlurCaption
                });
                const n = this.element.querySelector("figcaption"),
                    r = n.cloneNode();
                return {
                    do: () => {
                        if (n.style.display = "none", r.appendChild(t), r.appendChild(e), r.classList.add("".concat(Ti.attachmentCaption, "--editing")), n.parentElement.insertBefore(r, n), i(), this.options.editCaption) return Rt((() => t.focus()))
                    },
                    undo() {
                        y(r), n.style.display = null
                    }
                }
            }))), this.didClickToolbar = this.didClickToolbar.bind(this), this.didClickActionButton = this.didClickActionButton.bind(this), this.didKeyDownCaption = this.didKeyDownCaption.bind(this), this.didInputCaption = this.didInputCaption.bind(this), this.didChangeCaption = this.didChangeCaption.bind(this), this.didBlurCaption = this.didBlurCaption.bind(this), this.attachmentPiece = t, this.element = e, this.container = i, this.options = n, this.attachment = this.attachmentPiece.attachment, "a" === R(this.element) && (this.element = this.element.firstChild), this.install()
        }
        install() {
            this.makeElementMutable(), this.addToolbar(), this.attachment.isPreviewable() && this.installCaptionEditor()
        }
        uninstall() {
            var t;
            let e = this.undos.pop();
            for (this.savePendingCaption(); e;) e(), e = this.undos.pop();
            null === (t = this.delegate) || void 0 === t || t.didUninstallAttachmentEditor(this)
        }
        savePendingCaption() {
            if (this.pendingCaption) {
                const r = this.pendingCaption;
                var t, e, i, n;
                if (this.pendingCaption = null, r) null === (t = this.delegate) || void 0 === t || null === (e = t.attachmentEditorDidRequestUpdatingAttributesForAttachment) || void 0 === e || e.call(t, {
                    caption: r
                }, this.attachment);
                else null === (i = this.delegate) || void 0 === i || null === (n = i.attachmentEditorDidRequestRemovingAttributeForAttachment) || void 0 === n || n.call(i, "caption", this.attachment)
            }
        }
        didClickToolbar(t) {
            return t.preventDefault(), t.stopPropagation()
        }
        didClickActionButton(t) {
            var e;
            if ("remove" === t.target.getAttribute("data-trix-action")) return null === (e = this.delegate) || void 0 === e ? void 0 : e.attachmentEditorDidRequestRemovalOfAttachment(this.attachment)
        }
        didKeyDownCaption(t) {
            var e, i;
            if ("return" === Fi[t.keyCode]) return t.preventDefault(), this.savePendingCaption(), null === (e = this.delegate) || void 0 === e || null === (i = e.attachmentEditorDidRequestDeselectingAttachment) || void 0 === i ? void 0 : i.call(e, this.attachment)
        }
        didInputCaption(t) {
            this.pendingCaption = t.target.value.replace(/\s/g, " ").trim()
        }
        didChangeCaption(t) {
            return this.savePendingCaption()
        }
        didBlurCaption(t) {
            return this.savePendingCaption()
        }
    }
    class Ii extends V {
        constructor(t, i) {
            super(...arguments), this.didFocus = this.didFocus.bind(this), this.didBlur = this.didBlur.bind(this), this.didClickAttachment = this.didClickAttachment.bind(this), this.element = t, this.composition = i, this.documentView = new ge(this.composition.document, {
                element: this.element
            }), m("focus", {
                onElement: this.element,
                withCallback: this.didFocus
            }), m("blur", {
                onElement: this.element,
                withCallback: this.didBlur
            }), m("click", {
                onElement: this.element,
                matchingSelector: "a[contenteditable=false]",
                preventDefault: !0
            }), m("mousedown", {
                onElement: this.element,
                matchingSelector: e,
                withCallback: this.didClickAttachment
            }), m("click", {
                onElement: this.element,
                matchingSelector: "a".concat(e),
                preventDefault: !0
            })
        }
        didFocus(t) {
            var e;
            const i = () => {
                var t, e;
                if (!this.focused) return this.focused = !0, null === (t = this.delegate) || void 0 === t || null === (e = t.compositionControllerDidFocus) || void 0 === e ? void 0 : e.call(t)
            };
            return (null === (e = this.blurPromise) || void 0 === e ? void 0 : e.then(i)) || i()
        }
        didBlur(t) {
            this.blurPromise = new Promise((t => Rt((() => {
                var e, i;
                v(this.element) || (this.focused = null, null === (e = this.delegate) || void 0 === e || null === (i = e.compositionControllerDidBlur) || void 0 === i || i.call(e));
                return this.blurPromise = null, t()
            }))))
        }
        didClickAttachment(t, e) {
            var i, n;
            const r = this.findAttachmentForElement(e),
                o = !!b(t.target, {
                    matchingSelector: "figcaption"
                });
            return null === (i = this.delegate) || void 0 === i || null === (n = i.compositionControllerDidSelectAttachment) || void 0 === n ? void 0 : n.call(i, r, {
                editCaption: o
            })
        }
        getSerializableElement() {
            return this.isEditingAttachment() ? this.documentView.shadowElement : this.element
        }
        render() {
            var t, e, i, n, r, o;
            (this.revision !== this.composition.revision && (this.documentView.setDocument(this.composition.document), this.documentView.render(), this.revision = this.composition.revision), this.canSyncDocumentView() && !this.documentView.isSynced()) && (null === (i = this.delegate) || void 0 === i || null === (n = i.compositionControllerWillSyncDocumentView) || void 0 === n || n.call(i), this.documentView.sync(), null === (r = this.delegate) || void 0 === r || null === (o = r.compositionControllerDidSyncDocumentView) || void 0 === o || o.call(r));
            return null === (t = this.delegate) || void 0 === t || null === (e = t.compositionControllerDidRender) || void 0 === e ? void 0 : e.call(t)
        }
        rerenderViewForObject(t) {
            return this.invalidateViewForObject(t), this.render()
        }
        invalidateViewForObject(t) {
            return this.documentView.invalidateViewForObject(t)
        }
        isViewCachingEnabled() {
            return this.documentView.isViewCachingEnabled()
        }
        enableViewCaching() {
            return this.documentView.enableViewCaching()
        }
        disableViewCaching() {
            return this.documentView.disableViewCaching()
        }
        refreshViewCache() {
            return this.documentView.garbageCollectCachedViews()
        }
        isEditingAttachment() {
            return !!this.attachmentEditor
        }
        installAttachmentEditorForAttachment(t, e) {
            var i;
            if ((null === (i = this.attachmentEditor) || void 0 === i ? void 0 : i.attachment) === t) return;
            const n = this.documentView.findElementForObject(t);
            if (!n) return;
            this.uninstallAttachmentEditor();
            const r = this.composition.document.getAttachmentPieceForAttachment(t);
            this.attachmentEditor = new Pi(r, n, this.element, e), this.attachmentEditor.delegate = this
        }
        uninstallAttachmentEditor() {
            var t;
            return null === (t = this.attachmentEditor) || void 0 === t ? void 0 : t.uninstall()
        }
        didUninstallAttachmentEditor() {
            return this.attachmentEditor = null, this.render()
        }
        attachmentEditorDidRequestUpdatingAttributesForAttachment(t, e) {
            var i, n;
            return null === (i = this.delegate) || void 0 === i || null === (n = i.compositionControllerWillUpdateAttachment) || void 0 === n || n.call(i, e), this.composition.updateAttributesForAttachment(t, e)
        }
        attachmentEditorDidRequestRemovingAttributeForAttachment(t, e) {
            var i, n;
            return null === (i = this.delegate) || void 0 === i || null === (n = i.compositionControllerWillUpdateAttachment) || void 0 === n || n.call(i, e), this.composition.removeAttributeForAttachment(t, e)
        }
        attachmentEditorDidRequestRemovalOfAttachment(t) {
            var e, i;
            return null === (e = this.delegate) || void 0 === e || null === (i = e.compositionControllerDidRequestRemovalOfAttachment) || void 0 === i ? void 0 : i.call(e, t)
        }
        attachmentEditorDidRequestDeselectingAttachment(t) {
            var e, i;
            return null === (e = this.delegate) || void 0 === e || null === (i = e.compositionControllerDidRequestDeselectingAttachment) || void 0 === i ? void 0 : i.call(e, t)
        }
        canSyncDocumentView() {
            return !this.isEditingAttachment()
        }
        findAttachmentForElement(t) {
            return this.composition.document.getAttachmentById(parseInt(t.dataset.trixId, 10))
        }
    }
    class Ni extends V {}
    const Oi = "data-trix-mutable",
        Mi = "[".concat(Oi, "]"),
        ji = {
            attributes: !0,
            childList: !0,
            characterData: !0,
            characterDataOldValue: !0,
            subtree: !0
        };
    class Wi extends V {
        constructor(t) {
            super(t), this.didMutate = this.didMutate.bind(this), this.element = t, this.observer = new window.MutationObserver(this.didMutate), this.start()
        }
        start() {
            return this.reset(), this.observer.observe(this.element, ji)
        }
        stop() {
            return this.observer.disconnect()
        }
        didMutate(t) {
            var e, i;
            if (this.mutations.push(...Array.from(this.findSignificantMutations(t) || [])), this.mutations.length) return null === (e = this.delegate) || void 0 === e || null === (i = e.elementDidMutate) || void 0 === i || i.call(e, this.getMutationSummary()), this.reset()
        }
        reset() {
            this.mutations = []
        }
        findSignificantMutations(t) {
            return t.filter((t => this.mutationIsSignificant(t)))
        }
        mutationIsSignificant(t) {
            if (this.nodeIsMutable(t.target)) return !1;
            for (const e of Array.from(this.nodesModifiedByMutation(t)))
                if (this.nodeIsSignificant(e)) return !0;
            return !1
        }
        nodeIsSignificant(t) {
            return t !== this.element && !this.nodeIsMutable(t) && !I(t)
        }
        nodeIsMutable(t) {
            return b(t, {
                matchingSelector: Mi
            })
        }
        nodesModifiedByMutation(t) {
            const e = [];
            switch (t.type) {
                case "attributes":
                    t.attributeName !== Oi && e.push(t.target);
                    break;
                case "characterData":
                    e.push(t.target.parentNode), e.push(t.target);
                    break;
                case "childList":
                    e.push(...Array.from(t.addedNodes || [])), e.push(...Array.from(t.removedNodes || []))
            }
            return e
        }
        getMutationSummary() {
            return this.getTextMutationSummary()
        }
        getTextMutationSummary() {
            const {
                additions: t,
                deletions: e
            } = this.getTextChangesFromCharacterData(), i = this.getTextChangesFromChildList();
            Array.from(i.additions).forEach((e => {
                Array.from(t).includes(e) || t.push(e)
            })), e.push(...Array.from(i.deletions || []));
            const n = {},
                r = t.join("");
            r && (n.textAdded = r);
            const o = e.join("");
            return o && (n.textDeleted = o), n
        }
        getMutationsByType(t) {
            return Array.from(this.mutations).filter((e => e.type === t))
        }
        getTextChangesFromChildList() {
            let t, e;
            const i = [],
                n = [];
            Array.from(this.getMutationsByType("childList")).forEach((t => {
                i.push(...Array.from(t.addedNodes || [])), n.push(...Array.from(t.removedNodes || []))
            }));
            0 === i.length && 1 === n.length && T(n[0]) ? (t = [], e = ["\n"]) : (t = qi(i), e = qi(n));
            return {
                additions: t.filter(((t, i) => t !== e[i])).map(Wt),
                deletions: e.filter(((e, i) => e !== t[i])).map(Wt)
            }
        }
        getTextChangesFromCharacterData() {
            let t, e;
            const i = this.getMutationsByType("characterData");
            if (i.length) {
                const n = i[0],
                    r = i[i.length - 1],
                    o = function (t, e) {
                        let i, n;
                        return t = $.box(t), (e = $.box(e)).length < t.length ? [n, i] = Vt(t, e) : [i, n] = Vt(e, t), {
                            added: i,
                            removed: n
                        }
                    }(Wt(n.oldValue), Wt(r.target.data));
                t = o.added, e = o.removed
            }
            return {
                additions: t ? [t] : [],
                deletions: e ? [e] : []
            }
        }
    }
    const qi = function () {
        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        const e = [];
        for (const i of Array.from(t)) switch (i.nodeType) {
            case Node.TEXT_NODE:
                e.push(i.data);
                break;
            case Node.ELEMENT_NODE:
                "br" === R(i) ? e.push("\n") : e.push(...Array.from(qi(i.childNodes) || []))
        }
        return e
    };
    class Ui extends te {
        constructor(t) {
            super(...arguments), this.file = t
        }
        perform(t) {
            const e = new FileReader;
            return e.onerror = () => t(!1), e.onload = () => {
                e.onerror = null;
                try {
                    e.abort()
                } catch (t) {}
                return t(!0, this.file)
            }, e.readAsArrayBuffer(this.file)
        }
    }
    class Vi extends V {
        constructor(t) {
            super(...arguments), this.element = t, this.mutationObserver = new Wi(this.element), this.mutationObserver.delegate = this;
            for (const t in this.constructor.events) m(t, {
                onElement: this.element,
                withCallback: this.handlerFor(t)
            })
        }
        elementDidMutate(t) {}
        editorWillSyncDocumentView() {
            return this.mutationObserver.stop()
        }
        editorDidSyncDocumentView() {
            return this.mutationObserver.start()
        }
        requestRender() {
            var t, e;
            return null === (t = this.delegate) || void 0 === t || null === (e = t.inputControllerDidRequestRender) || void 0 === e ? void 0 : e.call(t)
        }
        requestReparse() {
            var t, e;
            return null === (t = this.delegate) || void 0 === t || null === (e = t.inputControllerDidRequestReparse) || void 0 === e || e.call(t), this.requestRender()
        }
        attachFiles(t) {
            const e = Array.from(t).map((t => new Ui(t)));
            return Promise.all(e).then((t => {
                this.handleInput((function () {
                    var e, i;
                    return null === (e = this.delegate) || void 0 === e || e.inputControllerWillAttachFiles(), null === (i = this.responder) || void 0 === i || i.insertFiles(t), this.requestRender()
                }))
            }))
        }
        handlerFor(t) {
            return e => {
                e.defaultPrevented || this.handleInput((() => {
                    v(this.element) || (this.eventName = t, this.constructor.events[t].call(this, e))
                }))
            }
        }
        handleInput(t) {
            try {
                var e;
                null === (e = this.delegate) || void 0 === e || e.inputControllerWillHandleInput(), t.call(this)
            } finally {
                var i;
                null === (i = this.delegate) || void 0 === i || i.inputControllerDidHandleInput()
            }
        }
        createLinkHTML(t, e) {
            const i = document.createElement("a");
            return i.href = t, i.textContent = e || t, i.outerHTML
        }
    }
    var zi;
    Ae(Vi, "events", {});
    const {
        browser: _i,
        keyNames: Hi
    } = U;
    let Ji = 0;
    class Ki extends Vi {
        constructor() {
            super(...arguments), this.resetInputSummary()
        }
        setInputSummary() {
            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this.inputSummary.eventName = this.eventName;
            for (const e in t) {
                const i = t[e];
                this.inputSummary[e] = i
            }
            return this.inputSummary
        }
        resetInputSummary() {
            this.inputSummary = {}
        }
        reset() {
            return this.resetInputSummary(), Pt.reset()
        }
        elementDidMutate(t) {
            var e, i;
            return this.isComposing() ? null === (e = this.delegate) || void 0 === e || null === (i = e.inputControllerDidAllowUnhandledInput) || void 0 === i ? void 0 : i.call(e) : this.handleInput((function () {
                return this.mutationIsSignificant(t) && (this.mutationIsExpected(t) ? this.requestRender() : this.requestReparse()), this.reset()
            }))
        }
        mutationIsExpected(t) {
            let {
                textAdded: e,
                textDeleted: i
            } = t;
            if (this.inputSummary.preferDocument) return !0;
            const n = null != e ? e === this.inputSummary.textAdded : !this.inputSummary.textAdded,
                r = null != i ? this.inputSummary.didDelete : !this.inputSummary.didDelete,
                o = ["\n", " \n"].includes(e) && !n,
                s = "\n" === i && !r;
            if (o && !s || s && !o) {
                const t = this.getSelectedRange();
                if (t) {
                    var a;
                    const i = o ? e.replace(/\n$/, "").length || -1 : (null == e ? void 0 : e.length) || 1;
                    if (null !== (a = this.responder) && void 0 !== a && a.positionIsBlockBreak(t[1] + i)) return !0
                }
            }
            return n && r
        }
        mutationIsSignificant(t) {
            var e;
            const i = Object.keys(t).length > 0,
                n = "" === (null === (e = this.compositionInput) || void 0 === e ? void 0 : e.getEndData());
            return i || !n
        }
        getCompositionInput() {
            if (this.isComposing()) return this.compositionInput;
            this.compositionInput = new Qi(this)
        }
        isComposing() {
            return this.compositionInput && !this.compositionInput.isEnded()
        }
        deleteInDirection(t, e) {
            var i;
            return !1 !== (null === (i = this.responder) || void 0 === i ? void 0 : i.deleteInDirection(t)) ? this.setInputSummary({
                didDelete: !0
            }) : e ? (e.preventDefault(), this.requestRender()) : void 0
        }
        serializeSelectionToDataTransfer(t) {
            var e;
            if (! function (t) {
                    if (null == t || !t.setData) return !1;
                    for (const e in xt) {
                        const i = xt[e];
                        try {
                            if (t.setData(e, i), !t.getData(e) === i) return !1
                        } catch (t) {
                            return !1
                        }
                    }
                    return !0
                }(t)) return;
            const i = null === (e = this.responder) || void 0 === e ? void 0 : e.getSelectedDocument().toSerializableDocument();
            return t.setData("application/x-trix-document", JSON.stringify(i)), t.setData("text/html", ge.render(i).innerHTML), t.setData("text/plain", i.toString().replace(/\n$/, "")), !0
        }
        canAcceptDataTransfer(t) {
            const e = {};
            return Array.from((null == t ? void 0 : t.types) || []).forEach((t => {
                e[t] = !0
            })), e.Files || e["application/x-trix-document"] || e["text/html"] || e["text/plain"]
        }
        getPastedHTMLUsingHiddenElement(t) {
            const e = this.getSelectedRange(),
                i = {
                    position: "absolute",
                    left: "".concat(window.pageXOffset, "px"),
                    top: "".concat(window.pageYOffset, "px"),
                    opacity: 0
                },
                n = S({
                    style: i,
                    tagName: "div",
                    editable: !0
                });
            return document.body.appendChild(n), n.focus(), requestAnimationFrame((() => {
                const i = n.innerHTML;
                return y(n), this.setSelectedRange(e), t(i)
            }))
        }
    }
    Ae(Ki, "events", {
        keydown(t) {
            this.isComposing() || this.resetInputSummary(), this.inputSummary.didInput = !0;
            const e = Hi[t.keyCode];
            if (e) {
                var i;
                let n = this.keys;
                ["ctrl", "alt", "shift", "meta"].forEach((e => {
                    var i;
                    t["".concat(e, "Key")] && ("ctrl" === e && (e = "control"), n = null === (i = n) || void 0 === i ? void 0 : i[e])
                })), null != (null === (i = n) || void 0 === i ? void 0 : i[e]) && (this.setInputSummary({
                    keyName: e
                }), Pt.reset(), n[e].call(this, t))
            }
            if (Ct(t)) {
                const e = String.fromCharCode(t.keyCode).toLowerCase();
                if (e) {
                    var n;
                    const i = ["alt", "shift"].map((e => {
                        if (t["".concat(e, "Key")]) return e
                    })).filter((t => t));
                    i.push(e), null !== (n = this.delegate) && void 0 !== n && n.inputControllerDidReceiveKeyboardCommand(i) && t.preventDefault()
                }
            }
        },
        keypress(t) {
            if (null != this.inputSummary.eventName) return;
            if (t.metaKey) return;
            if (t.ctrlKey && !t.altKey) return;
            const e = Xi(t);
            var i, n;
            return e ? (null === (i = this.delegate) || void 0 === i || i.inputControllerWillPerformTyping(), null === (n = this.responder) || void 0 === n || n.insertString(e), this.setInputSummary({
                textAdded: e,
                didDelete: this.selectionIsExpanded()
            })) : void 0
        },
        textInput(t) {
            const {
                data: e
            } = t, {
                textAdded: i
            } = this.inputSummary;
            if (i && i !== e && i.toUpperCase() === e) {
                var n;
                const t = this.getSelectedRange();
                return this.setSelectedRange([t[0], t[1] + i.length]), null === (n = this.responder) || void 0 === n || n.insertString(e), this.setInputSummary({
                    textAdded: e
                }), this.setSelectedRange(t)
            }
        },
        dragenter(t) {
            t.preventDefault()
        },
        dragstart(t) {
            var e, i;
            return this.serializeSelectionToDataTransfer(t.dataTransfer), this.draggedRange = this.getSelectedRange(), null === (e = this.delegate) || void 0 === e || null === (i = e.inputControllerDidStartDrag) || void 0 === i ? void 0 : i.call(e)
        },
        dragover(t) {
            if (this.draggedRange || this.canAcceptDataTransfer(t.dataTransfer)) {
                t.preventDefault();
                const n = {
                    x: t.clientX,
                    y: t.clientY
                };
                var e, i;
                if (!Et(n, this.draggingPoint)) return this.draggingPoint = n, null === (e = this.delegate) || void 0 === e || null === (i = e.inputControllerDidReceiveDragOverPoint) || void 0 === i ? void 0 : i.call(e, this.draggingPoint)
            }
        },
        dragend(t) {
            var e, i;
            null === (e = this.delegate) || void 0 === e || null === (i = e.inputControllerDidCancelDrag) || void 0 === i || i.call(e), this.draggedRange = null, this.draggingPoint = null
        },
        drop(t) {
            var e, i;
            t.preventDefault();
            const n = null === (e = t.dataTransfer) || void 0 === e ? void 0 : e.files,
                r = t.dataTransfer.getData("application/x-trix-document"),
                o = {
                    x: t.clientX,
                    y: t.clientY
                };
            if (null === (i = this.responder) || void 0 === i || i.setLocationRangeFromPointRange(o), null != n && n.length) this.attachFiles(n);
            else if (this.draggedRange) {
                var s, a;
                null === (s = this.delegate) || void 0 === s || s.inputControllerWillMoveText(), null === (a = this.responder) || void 0 === a || a.moveTextFromRange(this.draggedRange), this.draggedRange = null, this.requestRender()
            } else if (r) {
                var l;
                const t = qe.fromJSONString(r);
                null === (l = this.responder) || void 0 === l || l.insertDocument(t), this.requestRender()
            }
            this.draggedRange = null, this.draggingPoint = null
        },
        cut(t) {
            var e, i;
            if (null !== (e = this.responder) && void 0 !== e && e.selectionIsExpanded() && (this.serializeSelectionToDataTransfer(t.clipboardData) && t.preventDefault(), null === (i = this.delegate) || void 0 === i || i.inputControllerWillCutText(), this.deleteInDirection("backward"), t.defaultPrevented)) return this.requestRender()
        },
        copy(t) {
            var e;
            null !== (e = this.responder) && void 0 !== e && e.selectionIsExpanded() && this.serializeSelectionToDataTransfer(t.clipboardData) && t.preventDefault()
        },
        paste(t) {
            const e = t.clipboardData || t.testClipboardData,
                i = {
                    clipboard: e
                };
            if (!e || Yi(t)) return void this.getPastedHTMLUsingHiddenElement((t => {
                var e, n, r;
                return i.type = "text/html", i.html = t, null === (e = this.delegate) || void 0 === e || e.inputControllerWillPaste(i), null === (n = this.responder) || void 0 === n || n.insertHTML(i.html), this.requestRender(), null === (r = this.delegate) || void 0 === r ? void 0 : r.inputControllerDidPaste(i)
            }));
            const n = e.getData("URL"),
                r = e.getData("text/html"),
                o = e.getData("public.url-name");
            if (n) {
                var s, a, l;
                let t;
                i.type = "text/html", t = o ? Ut(o).trim() : n, i.html = this.createLinkHTML(n, t), null === (s = this.delegate) || void 0 === s || s.inputControllerWillPaste(i), this.setInputSummary({
                    textAdded: t,
                    didDelete: this.selectionIsExpanded()
                }), null === (a = this.responder) || void 0 === a || a.insertHTML(i.html), this.requestRender(), null === (l = this.delegate) || void 0 === l || l.inputControllerDidPaste(i)
            } else if (yt(e)) {
                var c, u, h;
                i.type = "text/plain", i.string = e.getData("text/plain"), null === (c = this.delegate) || void 0 === c || c.inputControllerWillPaste(i), this.setInputSummary({
                    textAdded: i.string,
                    didDelete: this.selectionIsExpanded()
                }), null === (u = this.responder) || void 0 === u || u.insertString(i.string), this.requestRender(), null === (h = this.delegate) || void 0 === h || h.inputControllerDidPaste(i)
            } else if (r) {
                var d, g, m;
                i.type = "text/html", i.html = r, null === (d = this.delegate) || void 0 === d || d.inputControllerWillPaste(i), null === (g = this.responder) || void 0 === g || g.insertHTML(i.html), this.requestRender(), null === (m = this.delegate) || void 0 === m || m.inputControllerDidPaste(i)
            } else if (Array.from(e.types).includes("Files")) {
                var p, f, b;
                const t = null === (p = e.items) || void 0 === p || null === (f = p[0]) || void 0 === f || null === (b = f.getAsFile) || void 0 === b ? void 0 : b.call(f);
                if (t) {
                    var v, A, x;
                    const e = Gi(t);
                    !t.name && e && (t.name = "pasted-file-".concat(++Ji, ".").concat(e)), i.type = "File", i.file = t, null === (v = this.delegate) || void 0 === v || v.inputControllerWillAttachFiles(), null === (A = this.responder) || void 0 === A || A.insertFile(i.file), this.requestRender(), null === (x = this.delegate) || void 0 === x || x.inputControllerDidPaste(i)
                }
            }
            t.preventDefault()
        },
        compositionstart(t) {
            return this.getCompositionInput().start(t.data)
        },
        compositionupdate(t) {
            return this.getCompositionInput().update(t.data)
        },
        compositionend(t) {
            return this.getCompositionInput().end(t.data)
        },
        beforeinput(t) {
            this.inputSummary.didInput = !0
        },
        input(t) {
            return this.inputSummary.didInput = !0, t.stopPropagation()
        }
    }), Ae(Ki, "keys", {
        backspace(t) {
            var e;
            return null === (e = this.delegate) || void 0 === e || e.inputControllerWillPerformTyping(), this.deleteInDirection("backward", t)
        },
        delete(t) {
            var e;
            return null === (e = this.delegate) || void 0 === e || e.inputControllerWillPerformTyping(), this.deleteInDirection("forward", t)
        },
        return (t) {
            var e, i;
            return this.setInputSummary({
                preferDocument: !0
            }), null === (e = this.delegate) || void 0 === e || e.inputControllerWillPerformTyping(), null === (i = this.responder) || void 0 === i ? void 0 : i.insertLineBreak()
        },
        tab(t) {
            var e, i;
            null !== (e = this.responder) && void 0 !== e && e.canIncreaseNestingLevel() && (null === (i = this.responder) || void 0 === i || i.increaseNestingLevel(), this.requestRender(), t.preventDefault())
        },
        left(t) {
            var e;
            if (this.selectionIsInCursorTarget()) return t.preventDefault(), null === (e = this.responder) || void 0 === e ? void 0 : e.moveCursorInDirection("backward")
        },
        right(t) {
            var e;
            if (this.selectionIsInCursorTarget()) return t.preventDefault(), null === (e = this.responder) || void 0 === e ? void 0 : e.moveCursorInDirection("forward")
        },
        control: {
            d(t) {
                var e;
                return null === (e = this.delegate) || void 0 === e || e.inputControllerWillPerformTyping(), this.deleteInDirection("forward", t)
            },
            h(t) {
                var e;
                return null === (e = this.delegate) || void 0 === e || e.inputControllerWillPerformTyping(), this.deleteInDirection("backward", t)
            },
            o(t) {
                var e, i;
                return t.preventDefault(), null === (e = this.delegate) || void 0 === e || e.inputControllerWillPerformTyping(), null === (i = this.responder) || void 0 === i || i.insertString("\n", {
                    updatePosition: !1
                }), this.requestRender()
            }
        },
        shift: {
            return (t) {
                var e, i;
                null === (e = this.delegate) || void 0 === e || e.inputControllerWillPerformTyping(), null === (i = this.responder) || void 0 === i || i.insertString("\n"), this.requestRender(), t.preventDefault()
            },
            tab(t) {
                var e, i;
                null !== (e = this.responder) && void 0 !== e && e.canDecreaseNestingLevel() && (null === (i = this.responder) || void 0 === i || i.decreaseNestingLevel(), this.requestRender(), t.preventDefault())
            },
            left(t) {
                if (this.selectionIsInCursorTarget()) return t.preventDefault(), this.expandSelectionInDirection("backward")
            },
            right(t) {
                if (this.selectionIsInCursorTarget()) return t.preventDefault(), this.expandSelectionInDirection("forward")
            }
        },
        alt: {
            backspace(t) {
                var e;
                return this.setInputSummary({
                    preferDocument: !1
                }), null === (e = this.delegate) || void 0 === e ? void 0 : e.inputControllerWillPerformTyping()
            }
        },
        meta: {
            backspace(t) {
                var e;
                return this.setInputSummary({
                    preferDocument: !1
                }), null === (e = this.delegate) || void 0 === e ? void 0 : e.inputControllerWillPerformTyping()
            }
        }
    }), Ki.proxyMethod("responder?.getSelectedRange"), Ki.proxyMethod("responder?.setSelectedRange"), Ki.proxyMethod("responder?.expandSelectionInDirection"), Ki.proxyMethod("responder?.selectionIsInCursorTarget"), Ki.proxyMethod("responder?.selectionIsExpanded");
    const Gi = t => {
            var e, i;
            return null === (e = t.type) || void 0 === e || null === (i = e.match(/\/(\w+)$/)) || void 0 === i ? void 0 : i[1]
        },
        $i = !(null === (zi = " ".codePointAt) || void 0 === zi || !zi.call(" ", 0)),
        Xi = function (t) {
            if (t.key && $i && t.key.codePointAt(0) === t.keyCode) return t.key; {
                let e;
                if (null === t.which ? e = t.keyCode : 0 !== t.which && 0 !== t.charCode && (e = t.charCode), null != e && "escape" !== Hi[e]) return $.fromCodepoints([e]).toString()
            }
        },
        Yi = function (t) {
            const e = t.clipboardData;
            if (e) {
                if (e.types.includes("text/html")) {
                    for (const t of e.types) {
                        const i = /^CorePasteboardFlavorType/.test(t),
                            n = /^dyn\./.test(t) && e.getData(t);
                        if (i || n) return !0
                    }
                    return !1
                } {
                    const t = e.types.includes("com.apple.webarchive"),
                        i = e.types.includes("com.apple.flat-rtfd");
                    return t || i
                }
            }
        };
    class Qi extends V {
        constructor(t) {
            super(...arguments), this.inputController = t, this.responder = this.inputController.responder, this.delegate = this.inputController.delegate, this.inputSummary = this.inputController.inputSummary, this.data = {}
        }
        start(t) {
            if (this.data.start = t, this.isSignificant()) {
                var e, i;
                if ("keypress" === this.inputSummary.eventName && this.inputSummary.textAdded) null === (i = this.responder) || void 0 === i || i.deleteInDirection("left");
                this.selectionIsExpanded() || (this.insertPlaceholder(), this.requestRender()), this.range = null === (e = this.responder) || void 0 === e ? void 0 : e.getSelectedRange()
            }
        }
        update(t) {
            if (this.data.update = t, this.isSignificant()) {
                const t = this.selectPlaceholder();
                t && (this.forgetPlaceholder(), this.range = t)
            }
        }
        end(t) {
            return this.data.end = t, this.isSignificant() ? (this.forgetPlaceholder(), this.canApplyToDocument() ? (this.setInputSummary({
                preferDocument: !0,
                didInput: !1
            }), null === (e = this.delegate) || void 0 === e || e.inputControllerWillPerformTyping(), null === (i = this.responder) || void 0 === i || i.setSelectedRange(this.range), null === (n = this.responder) || void 0 === n || n.insertString(this.data.end), null === (r = this.responder) || void 0 === r ? void 0 : r.setSelectedRange(this.range[0] + this.data.end.length)) : null != this.data.start || null != this.data.update ? (this.requestReparse(), this.inputController.reset()) : void 0) : this.inputController.reset();
            var e, i, n, r
        }
        getEndData() {
            return this.data.end
        }
        isEnded() {
            return null != this.getEndData()
        }
        isSignificant() {
            return !_i.composesExistingText || this.inputSummary.didInput
        }
        canApplyToDocument() {
            var t, e;
            return 0 === (null === (t = this.data.start) || void 0 === t ? void 0 : t.length) && (null === (e = this.data.end) || void 0 === e ? void 0 : e.length) > 0 && this.range
        }
    }
    Qi.proxyMethod("inputController.setInputSummary"), Qi.proxyMethod("inputController.requestRender"), Qi.proxyMethod("inputController.requestReparse"), Qi.proxyMethod("responder?.selectionIsExpanded"), Qi.proxyMethod("responder?.insertPlaceholder"), Qi.proxyMethod("responder?.selectPlaceholder"), Qi.proxyMethod("responder?.forgetPlaceholder");
    class Zi extends Vi {
        constructor() {
            super(...arguments), this.render = this.render.bind(this)
        }
        elementDidMutate() {
            return this.scheduledRender ? this.composing ? null === (t = this.delegate) || void 0 === t || null === (e = t.inputControllerDidAllowUnhandledInput) || void 0 === e ? void 0 : e.call(t) : void 0 : this.reparse();
            var t, e
        }
        scheduleRender() {
            return this.scheduledRender ? this.scheduledRender : this.scheduledRender = requestAnimationFrame(this.render)
        }
        render() {
            var t, e;
            (cancelAnimationFrame(this.scheduledRender), this.scheduledRender = null, this.composing) || (null === (e = this.delegate) || void 0 === e || e.render());
            null === (t = this.afterRender) || void 0 === t || t.call(this), this.afterRender = null
        }
        reparse() {
            var t;
            return null === (t = this.delegate) || void 0 === t ? void 0 : t.reparse()
        }
        insertString() {
            var t;
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                i = arguments.length > 1 ? arguments[1] : void 0;
            return null === (t = this.delegate) || void 0 === t || t.inputControllerWillPerformTyping(), this.withTargetDOMRange((function () {
                var t;
                return null === (t = this.responder) || void 0 === t ? void 0 : t.insertString(e, i)
            }))
        }
        toggleAttributeIfSupported(t) {
            var e;
            if (ht().includes(t)) return null === (e = this.delegate) || void 0 === e || e.inputControllerWillPerformFormatting(t), this.withTargetDOMRange((function () {
                var e;
                return null === (e = this.responder) || void 0 === e ? void 0 : e.toggleCurrentAttribute(t)
            }))
        }
        activateAttributeIfSupported(t, e) {
            var i;
            if (ht().includes(t)) return null === (i = this.delegate) || void 0 === i || i.inputControllerWillPerformFormatting(t), this.withTargetDOMRange((function () {
                var i;
                return null === (i = this.responder) || void 0 === i ? void 0 : i.setCurrentAttribute(t, e)
            }))
        }
        deleteInDirection(t) {
            let {
                recordUndoEntry: e
            } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                recordUndoEntry: !0
            };
            var i;
            e && (null === (i = this.delegate) || void 0 === i || i.inputControllerWillPerformTyping());
            const n = () => {
                    var e;
                    return null === (e = this.responder) || void 0 === e ? void 0 : e.deleteInDirection(t)
                },
                r = this.getTargetDOMRange({
                    minLength: 2
                });
            return r ? this.withTargetDOMRange(r, n) : n()
        }
        withTargetDOMRange(t, e) {
            var i;
            return "function" == typeof t && (e = t, t = this.getTargetDOMRange()), t ? null === (i = this.responder) || void 0 === i ? void 0 : i.withTargetDOMRange(t, e.bind(this)) : (Pt.reset(), e.call(this))
        }
        getTargetDOMRange() {
            var t, e;
            let {
                minLength: i
            } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                minLength: 0
            };
            const n = null === (t = (e = this.event).getTargetRanges) || void 0 === t ? void 0 : t.call(e);
            if (n && n.length) {
                const t = tn(n[0]);
                if (0 === i || t.toString().length >= i) return t
            }
        }
        withEvent(t, e) {
            let i;
            this.event = t;
            try {
                i = e.call(this)
            } finally {
                this.event = null
            }
            return i
        }
    }
    Ae(Zi, "events", {
        keydown(t) {
            if (Ct(t)) {
                var e;
                const i = on(t);
                null !== (e = this.delegate) && void 0 !== e && e.inputControllerDidReceiveKeyboardCommand(i) && t.preventDefault()
            } else {
                let e = t.key;
                t.altKey && (e += "+Alt"), t.shiftKey && (e += "+Shift");
                const i = this.constructor.keys[e];
                if (i) return this.withEvent(t, i)
            }
        },
        paste(t) {
            var e;
            let i;
            const n = null === (e = t.clipboardData) || void 0 === e ? void 0 : e.getData("URL");
            return nn(t) ? (t.preventDefault(), this.attachFiles(t.clipboardData.files)) : rn(t) ? (t.preventDefault(), i = {
                type: "text/plain",
                string: t.clipboardData.getData("text/plain")
            }, null === (r = this.delegate) || void 0 === r || r.inputControllerWillPaste(i), null === (o = this.responder) || void 0 === o || o.insertString(i.string), this.render(), null === (s = this.delegate) || void 0 === s ? void 0 : s.inputControllerDidPaste(i)) : n ? (t.preventDefault(), i = {
                type: "text/html",
                html: this.createLinkHTML(n)
            }, null === (a = this.delegate) || void 0 === a || a.inputControllerWillPaste(i), null === (l = this.responder) || void 0 === l || l.insertHTML(i.html), this.render(), null === (c = this.delegate) || void 0 === c ? void 0 : c.inputControllerDidPaste(i)) : void 0;
            var r, o, s, a, l, c
        },
        beforeinput(t) {
            const e = this.constructor.inputTypes[t.inputType];
            if (e) return this.withEvent(t, e), this.scheduleRender()
        },
        input: t => Pt.reset(),
        dragstart(t) {
            var e, i;
            null !== (e = this.responder) && void 0 !== e && e.selectionContainsAttachments() && (t.dataTransfer.setData("application/x-trix-dragging", !0), this.dragging = {
                range: null === (i = this.responder) || void 0 === i ? void 0 : i.getSelectedRange(),
                point: sn(t)
            })
        },
        dragenter(t) {
            en(t) && t.preventDefault()
        },
        dragover(t) {
            if (this.dragging) {
                t.preventDefault();
                const i = sn(t);
                var e;
                if (!Et(i, this.dragging.point)) return this.dragging.point = i, null === (e = this.responder) || void 0 === e ? void 0 : e.setLocationRangeFromPointRange(i)
            } else en(t) && t.preventDefault()
        },
        drop(t) {
            var e, i;
            if (this.dragging) return t.preventDefault(), null === (e = this.delegate) || void 0 === e || e.inputControllerWillMoveText(), null === (i = this.responder) || void 0 === i || i.moveTextFromRange(this.dragging.range), this.dragging = null, this.scheduleRender();
            if (en(t)) {
                var n;
                t.preventDefault();
                const e = sn(t);
                return null === (n = this.responder) || void 0 === n || n.setLocationRangeFromPointRange(e), this.attachFiles(t.dataTransfer.files)
            }
        },
        dragend() {
            var t;
            this.dragging && (null === (t = this.responder) || void 0 === t || t.setSelectedRange(this.dragging.range), this.dragging = null)
        },
        compositionend(t) {
            if (this.composing) return this.composing = !1, this.scheduleRender()
        }
    }), Ae(Zi, "keys", {
        ArrowLeft() {
            var t, e;
            if (null !== (t = this.responder) && void 0 !== t && t.shouldManageMovingCursorInDirection("backward")) return this.event.preventDefault(), null === (e = this.responder) || void 0 === e ? void 0 : e.moveCursorInDirection("backward")
        },
        ArrowRight() {
            var t, e;
            if (null !== (t = this.responder) && void 0 !== t && t.shouldManageMovingCursorInDirection("forward")) return this.event.preventDefault(), null === (e = this.responder) || void 0 === e ? void 0 : e.moveCursorInDirection("forward")
        },
        Backspace() {
            var t, e, i;
            if (null !== (t = this.responder) && void 0 !== t && t.shouldManageDeletingInDirection("backward")) return this.event.preventDefault(), null === (e = this.delegate) || void 0 === e || e.inputControllerWillPerformTyping(), null === (i = this.responder) || void 0 === i || i.deleteInDirection("backward"), this.render()
        },
        Tab() {
            var t, e;
            if (null !== (t = this.responder) && void 0 !== t && t.canIncreaseNestingLevel()) return this.event.preventDefault(), null === (e = this.responder) || void 0 === e || e.increaseNestingLevel(), this.render()
        },
        "Tab+Shift"() {
            var t, e;
            if (null !== (t = this.responder) && void 0 !== t && t.canDecreaseNestingLevel()) return this.event.preventDefault(), null === (e = this.responder) || void 0 === e || e.decreaseNestingLevel(), this.render()
        }
    }), Ae(Zi, "inputTypes", {
        deleteByComposition() {
            return this.deleteInDirection("backward", {
                recordUndoEntry: !1
            })
        },
        deleteByCut() {
            return this.deleteInDirection("backward")
        },
        deleteByDrag() {
            return this.event.preventDefault(), this.withTargetDOMRange((function () {
                var t;
                this.deleteByDragRange = null === (t = this.responder) || void 0 === t ? void 0 : t.getSelectedRange()
            }))
        },
        deleteCompositionText() {
            return this.deleteInDirection("backward", {
                recordUndoEntry: !1
            })
        },
        deleteContent() {
            return this.deleteInDirection("backward")
        },
        deleteContentBackward() {
            return this.deleteInDirection("backward")
        },
        deleteContentForward() {
            return this.deleteInDirection("forward")
        },
        deleteEntireSoftLine() {
            return this.deleteInDirection("forward")
        },
        deleteHardLineBackward() {
            return this.deleteInDirection("backward")
        },
        deleteHardLineForward() {
            return this.deleteInDirection("forward")
        },
        deleteSoftLineBackward() {
            return this.deleteInDirection("backward")
        },
        deleteSoftLineForward() {
            return this.deleteInDirection("forward")
        },
        deleteWordBackward() {
            return this.deleteInDirection("backward")
        },
        deleteWordForward() {
            return this.deleteInDirection("forward")
        },
        formatBackColor() {
            return this.activateAttributeIfSupported("backgroundColor", this.event.data)
        },
        formatBold() {
            return this.toggleAttributeIfSupported("bold")
        },
        formatFontColor() {
            return this.activateAttributeIfSupported("color", this.event.data)
        },
        formatFontName() {
            return this.activateAttributeIfSupported("font", this.event.data)
        },
        formatIndent() {
            var t;
            if (null !== (t = this.responder) && void 0 !== t && t.canIncreaseNestingLevel()) return this.withTargetDOMRange((function () {
                var t;
                return null === (t = this.responder) || void 0 === t ? void 0 : t.increaseNestingLevel()
            }))
        },
        formatItalic() {
            return this.toggleAttributeIfSupported("italic")
        },
        formatJustifyCenter() {
            return this.toggleAttributeIfSupported("justifyCenter")
        },
        formatJustifyFull() {
            return this.toggleAttributeIfSupported("justifyFull")
        },
        formatJustifyLeft() {
            return this.toggleAttributeIfSupported("justifyLeft")
        },
        formatJustifyRight() {
            return this.toggleAttributeIfSupported("justifyRight")
        },
        formatOutdent() {
            var t;
            if (null !== (t = this.responder) && void 0 !== t && t.canDecreaseNestingLevel()) return this.withTargetDOMRange((function () {
                var t;
                return null === (t = this.responder) || void 0 === t ? void 0 : t.decreaseNestingLevel()
            }))
        },
        formatRemove() {
            this.withTargetDOMRange((function () {
                for (const i in null === (t = this.responder) || void 0 === t ? void 0 : t.getCurrentAttributes()) {
                    var t, e;
                    null === (e = this.responder) || void 0 === e || e.removeCurrentAttribute(i)
                }
            }))
        },
        formatSetBlockTextDirection() {
            return this.activateAttributeIfSupported("blockDir", this.event.data)
        },
        formatSetInlineTextDirection() {
            return this.activateAttributeIfSupported("textDir", this.event.data)
        },
        formatStrikeThrough() {
            return this.toggleAttributeIfSupported("strike")
        },
        formatSubscript() {
            return this.toggleAttributeIfSupported("sub")
        },
        formatSuperscript() {
            return this.toggleAttributeIfSupported("sup")
        },
        formatUnderline() {
            return this.toggleAttributeIfSupported("underline")
        },
        historyRedo() {
            var t;
            return null === (t = this.delegate) || void 0 === t ? void 0 : t.inputControllerWillPerformRedo()
        },
        historyUndo() {
            var t;
            return null === (t = this.delegate) || void 0 === t ? void 0 : t.inputControllerWillPerformUndo()
        },
        insertCompositionText() {
            return this.composing = !0, this.insertString(this.event.data)
        },
        insertFromComposition() {
            return this.composing = !1, this.insertString(this.event.data)
        },
        insertFromDrop() {
            const t = this.deleteByDragRange;
            var e;
            if (t) return this.deleteByDragRange = null, null === (e = this.delegate) || void 0 === e || e.inputControllerWillMoveText(), this.withTargetDOMRange((function () {
                var e;
                return null === (e = this.responder) || void 0 === e ? void 0 : e.moveTextFromRange(t)
            }))
        },
        insertFromPaste() {
            var t;
            const {
                dataTransfer: e
            } = this.event, i = {
                dataTransfer: e
            }, n = e.getData("URL"), r = e.getData("text/html");
            if (n) {
                var o;
                let t;
                this.event.preventDefault(), i.type = "text/html";
                const r = e.getData("public.url-name");
                t = r ? Ut(r).trim() : n, i.html = this.createLinkHTML(n, t), null === (o = this.delegate) || void 0 === o || o.inputControllerWillPaste(i), this.withTargetDOMRange((function () {
                    var t;
                    return null === (t = this.responder) || void 0 === t ? void 0 : t.insertHTML(i.html)
                })), this.afterRender = () => {
                    var t;
                    return null === (t = this.delegate) || void 0 === t ? void 0 : t.inputControllerDidPaste(i)
                }
            } else if (yt(e)) {
                var s;
                i.type = "text/plain", i.string = e.getData("text/plain"), null === (s = this.delegate) || void 0 === s || s.inputControllerWillPaste(i), this.withTargetDOMRange((function () {
                    var t;
                    return null === (t = this.responder) || void 0 === t ? void 0 : t.insertString(i.string)
                })), this.afterRender = () => {
                    var t;
                    return null === (t = this.delegate) || void 0 === t ? void 0 : t.inputControllerDidPaste(i)
                }
            } else if (r) {
                var a;
                this.event.preventDefault(), i.type = "text/html", i.html = r, null === (a = this.delegate) || void 0 === a || a.inputControllerWillPaste(i), this.withTargetDOMRange((function () {
                    var t;
                    return null === (t = this.responder) || void 0 === t ? void 0 : t.insertHTML(i.html)
                })), this.afterRender = () => {
                    var t;
                    return null === (t = this.delegate) || void 0 === t ? void 0 : t.inputControllerDidPaste(i)
                }
            } else if (null !== (t = e.files) && void 0 !== t && t.length) {
                var l;
                i.type = "File", i.file = e.files[0], null === (l = this.delegate) || void 0 === l || l.inputControllerWillPaste(i), this.withTargetDOMRange((function () {
                    var t;
                    return null === (t = this.responder) || void 0 === t ? void 0 : t.insertFile(i.file)
                })), this.afterRender = () => {
                    var t;
                    return null === (t = this.delegate) || void 0 === t ? void 0 : t.inputControllerDidPaste(i)
                }
            }
        },
        insertFromYank() {
            return this.insertString(this.event.data)
        },
        insertLineBreak() {
            return this.insertString("\n")
        },
        insertLink() {
            return this.activateAttributeIfSupported("href", this.event.data)
        },
        insertOrderedList() {
            return this.toggleAttributeIfSupported("number")
        },
        insertParagraph() {
            var t;
            return null === (t = this.delegate) || void 0 === t || t.inputControllerWillPerformTyping(), this.withTargetDOMRange((function () {
                var t;
                return null === (t = this.responder) || void 0 === t ? void 0 : t.insertLineBreak()
            }))
        },
        insertReplacementText() {
            return this.insertString(this.event.dataTransfer.getData("text/plain"), {
                updatePosition: !1
            })
        },
        insertText() {
            var t;
            return this.insertString(this.event.data || (null === (t = this.event.dataTransfer) || void 0 === t ? void 0 : t.getData("text/plain")))
        },
        insertTranspose() {
            return this.insertString(this.event.data)
        },
        insertUnorderedList() {
            return this.toggleAttributeIfSupported("bullet")
        }
    });
    const tn = function (t) {
            const e = document.createRange();
            return e.setStart(t.startContainer, t.startOffset), e.setEnd(t.endContainer, t.endOffset), e
        },
        en = t => {
            var e;
            return Array.from((null === (e = t.dataTransfer) || void 0 === e ? void 0 : e.types) || []).includes("Files")
        },
        nn = function (t) {
            const e = t.clipboardData;
            if (e) return e.types.includes("Files") && 1 === e.types.length && e.files.length >= 1
        },
        rn = function (t) {
            const e = t.clipboardData;
            if (e) return e.types.includes("text/plain") && 1 === e.types.length
        },
        on = function (t) {
            const e = [];
            return t.altKey && e.push("alt"), t.shiftKey && e.push("shift"), e.push(t.key), e
        },
        sn = t => ({
            x: t.clientX,
            y: t.clientY
        }),
        an = "[data-trix-attribute]",
        ln = "[data-trix-action]",
        cn = "".concat(an, ", ").concat(ln),
        un = "[data-trix-dialog]",
        hn = "".concat(un, "[data-trix-active]"),
        dn = "".concat(un, " [data-trix-method]"),
        gn = "".concat(un, " [data-trix-input]"),
        mn = (t, e) => (e || (e = fn(t)), t.querySelector("[data-trix-input][name='".concat(e, "']"))),
        pn = t => t.getAttribute("data-trix-action"),
        fn = t => t.getAttribute("data-trix-attribute") || t.getAttribute("data-trix-dialog-attribute");
    class bn extends V {
        constructor(t) {
            super(t), this.didClickActionButton = this.didClickActionButton.bind(this), this.didClickAttributeButton = this.didClickAttributeButton.bind(this), this.didClickDialogButton = this.didClickDialogButton.bind(this), this.didKeyDownDialogInput = this.didKeyDownDialogInput.bind(this), this.element = t, this.attributes = {}, this.actions = {}, this.resetDialogInputs(), m("mousedown", {
                onElement: this.element,
                matchingSelector: ln,
                withCallback: this.didClickActionButton
            }), m("mousedown", {
                onElement: this.element,
                matchingSelector: an,
                withCallback: this.didClickAttributeButton
            }), m("click", {
                onElement: this.element,
                matchingSelector: cn,
                preventDefault: !0
            }), m("click", {
                onElement: this.element,
                matchingSelector: dn,
                withCallback: this.didClickDialogButton
            }), m("keydown", {
                onElement: this.element,
                matchingSelector: gn,
                withCallback: this.didKeyDownDialogInput
            })
        }
        didClickActionButton(t, e) {
            var i;
            null === (i = this.delegate) || void 0 === i || i.toolbarDidClickButton(), t.preventDefault();
            const n = pn(e);
            return this.getDialog(n) ? this.toggleDialog(n) : null === (r = this.delegate) || void 0 === r ? void 0 : r.toolbarDidInvokeAction(n);
            var r
        }
        didClickAttributeButton(t, e) {
            var i;
            null === (i = this.delegate) || void 0 === i || i.toolbarDidClickButton(), t.preventDefault();
            const n = fn(e);
            var r;
            this.getDialog(n) ? this.toggleDialog(n) : null === (r = this.delegate) || void 0 === r || r.toolbarDidToggleAttribute(n);
            return this.refreshAttributeButtons()
        }
        didClickDialogButton(t, e) {
            const i = b(e, {
                matchingSelector: un
            });
            return this[e.getAttribute("data-trix-method")].call(this, i)
        }
        didKeyDownDialogInput(t, e) {
            if (13 === t.keyCode) {
                t.preventDefault();
                const i = e.getAttribute("name"),
                    n = this.getDialog(i);
                this.setAttribute(n)
            }
            if (27 === t.keyCode) return t.preventDefault(), this.hideDialog()
        }
        updateActions(t) {
            return this.actions = t, this.refreshActionButtons()
        }
        refreshActionButtons() {
            return this.eachActionButton(((t, e) => {
                t.disabled = !1 === this.actions[e]
            }))
        }
        eachActionButton(t) {
            return Array.from(this.element.querySelectorAll(ln)).map((e => t(e, pn(e))))
        }
        updateAttributes(t) {
            return this.attributes = t, this.refreshAttributeButtons()
        }
        refreshAttributeButtons() {
            return this.eachAttributeButton(((t, e) => (t.disabled = !1 === this.attributes[e], this.attributes[e] || this.dialogIsVisible(e) ? (t.setAttribute("data-trix-active", ""), t.classList.add("trix-active")) : (t.removeAttribute("data-trix-active"), t.classList.remove("trix-active")))))
        }
        eachAttributeButton(t) {
            return Array.from(this.element.querySelectorAll(an)).map((e => t(e, fn(e))))
        }
        applyKeyboardCommand(t) {
            const e = JSON.stringify(t.sort());
            for (const t of Array.from(this.element.querySelectorAll("[data-trix-key]"))) {
                const i = t.getAttribute("data-trix-key").split("+");
                if (JSON.stringify(i.sort()) === e) return p("mousedown", {
                    onElement: t
                }), !0
            }
            return !1
        }
        dialogIsVisible(t) {
            const e = this.getDialog(t);
            if (e) return e.hasAttribute("data-trix-active")
        }
        toggleDialog(t) {
            return this.dialogIsVisible(t) ? this.hideDialog() : this.showDialog(t)
        }
        showDialog(t) {
            var e, i;
            this.hideDialog(), null === (e = this.delegate) || void 0 === e || e.toolbarWillShowDialog();
            const n = this.getDialog(t);
            n.setAttribute("data-trix-active", ""), n.classList.add("trix-active"), Array.from(n.querySelectorAll("input[disabled]")).forEach((t => {
                t.removeAttribute("disabled")
            }));
            const r = fn(n);
            if (r) {
                const e = mn(n, t);
                e && (e.value = this.attributes[r] || "", e.select())
            }
            return null === (i = this.delegate) || void 0 === i ? void 0 : i.toolbarDidShowDialog(t)
        }
        setAttribute(t) {
            const e = fn(t),
                i = mn(t, e);
            return i.willValidate && !i.checkValidity() ? (i.setAttribute("data-trix-validate", ""), i.classList.add("trix-validate"), i.focus()) : (null === (n = this.delegate) || void 0 === n || n.toolbarDidUpdateAttribute(e, i.value), this.hideDialog());
            var n
        }
        removeAttribute(t) {
            var e;
            const i = fn(t);
            return null === (e = this.delegate) || void 0 === e || e.toolbarDidRemoveAttribute(i), this.hideDialog()
        }
        hideDialog() {
            const t = this.element.querySelector(hn);
            var e;
            if (t) return t.removeAttribute("data-trix-active"), t.classList.remove("trix-active"), this.resetDialogInputs(), null === (e = this.delegate) || void 0 === e ? void 0 : e.toolbarDidHideDialog((t => t.getAttribute("data-trix-dialog"))(t))
        }
        resetDialogInputs() {
            Array.from(this.element.querySelectorAll(gn)).forEach((t => {
                t.setAttribute("disabled", "disabled"), t.removeAttribute("data-trix-validate"), t.classList.remove("trix-validate")
            }))
        }
        getDialog(t) {
            return this.element.querySelector("[data-trix-dialog=".concat(t, "]"))
        }
    }
    class vn extends Ni {
        constructor(t) {
            let {
                editorElement: e,
                document: i,
                html: n
            } = t;
            super(...arguments), this.editorElement = e, this.selectionManager = new ki(this.editorElement), this.selectionManager.delegate = this, this.composition = new di, this.composition.delegate = this, this.attachmentManager = new ui(this.composition.getAttachments()), this.attachmentManager.delegate = this, this.inputController = 2 === O.getLevel() ? new Zi(this.editorElement) : new Ki(this.editorElement), this.inputController.delegate = this, this.inputController.responder = this.composition, this.compositionController = new Ii(this.editorElement, this.composition), this.compositionController.delegate = this, this.toolbarController = new bn(this.editorElement.toolbarElement), this.toolbarController.delegate = this, this.editor = new Ai(this.composition, this.selectionManager, this.editorElement), i ? this.editor.loadDocument(i) : this.editor.loadHTML(n)
        }
        registerSelectionManager() {
            return Pt.registerSelectionManager(this.selectionManager)
        }
        unregisterSelectionManager() {
            return Pt.unregisterSelectionManager(this.selectionManager)
        }
        render() {
            return this.compositionController.render()
        }
        reparse() {
            return this.composition.replaceHTML(this.editorElement.innerHTML)
        }
        compositionDidChangeDocument(t) {
            if (this.notifyEditorElement("document-change"), !this.handlingInput) return this.render()
        }
        compositionDidChangeCurrentAttributes(t) {
            return this.currentAttributes = t, this.toolbarController.updateAttributes(this.currentAttributes), this.updateCurrentActions(), this.notifyEditorElement("attributes-change", {
                attributes: this.currentAttributes
            })
        }
        compositionDidPerformInsertionAtRange(t) {
            this.pasting && (this.pastedRange = t)
        }
        compositionShouldAcceptFile(t) {
            return this.notifyEditorElement("file-accept", {
                file: t
            })
        }
        compositionDidAddAttachment(t) {
            const e = this.attachmentManager.manageAttachment(t);
            return this.notifyEditorElement("attachment-add", {
                attachment: e
            })
        }
        compositionDidEditAttachment(t) {
            this.compositionController.rerenderViewForObject(t);
            const e = this.attachmentManager.manageAttachment(t);
            return this.notifyEditorElement("attachment-edit", {
                attachment: e
            }), this.notifyEditorElement("change")
        }
        compositionDidChangeAttachmentPreviewURL(t) {
            return this.compositionController.invalidateViewForObject(t), this.notifyEditorElement("change")
        }
        compositionDidRemoveAttachment(t) {
            const e = this.attachmentManager.unmanageAttachment(t);
            return this.notifyEditorElement("attachment-remove", {
                attachment: e
            })
        }
        compositionDidStartEditingAttachment(t, e) {
            return this.attachmentLocationRange = this.composition.document.getLocationRangeOfAttachment(t), this.compositionController.installAttachmentEditorForAttachment(t, e), this.selectionManager.setLocationRange(this.attachmentLocationRange)
        }
        compositionDidStopEditingAttachment(t) {
            this.compositionController.uninstallAttachmentEditor(), this.attachmentLocationRange = null
        }
        compositionDidRequestChangingSelectionToLocationRange(t) {
            if (!this.loadingSnapshot || this.isFocused()) return this.requestedLocationRange = t, this.compositionRevisionWhenLocationRangeRequested = this.composition.revision, this.handlingInput ? void 0 : this.render()
        }
        compositionWillLoadSnapshot() {
            this.loadingSnapshot = !0
        }
        compositionDidLoadSnapshot() {
            this.compositionController.refreshViewCache(), this.render(), this.loadingSnapshot = !1
        }
        getSelectionManager() {
            return this.selectionManager
        }
        attachmentManagerDidRequestRemovalOfAttachment(t) {
            return this.removeAttachment(t)
        }
        compositionControllerWillSyncDocumentView() {
            return this.inputController.editorWillSyncDocumentView(), this.selectionManager.lock(), this.selectionManager.clearSelection()
        }
        compositionControllerDidSyncDocumentView() {
            return this.inputController.editorDidSyncDocumentView(), this.selectionManager.unlock(), this.updateCurrentActions(), this.notifyEditorElement("sync")
        }
        compositionControllerDidRender() {
            this.requestedLocationRange && (this.compositionRevisionWhenLocationRangeRequested === this.composition.revision && this.selectionManager.setLocationRange(this.requestedLocationRange), this.requestedLocationRange = null, this.compositionRevisionWhenLocationRangeRequested = null), this.renderedCompositionRevision !== this.composition.revision && (this.runEditorFilters(), this.composition.updateCurrentAttributes(), this.notifyEditorElement("render")), this.renderedCompositionRevision = this.composition.revision
        }
        compositionControllerDidFocus() {
            return this.isFocusedInvisibly() && this.setLocationRange({
                index: 0,
                offset: 0
            }), this.toolbarController.hideDialog(), this.notifyEditorElement("focus")
        }
        compositionControllerDidBlur() {
            return this.notifyEditorElement("blur")
        }
        compositionControllerDidSelectAttachment(t, e) {
            return this.toolbarController.hideDialog(), this.composition.editAttachment(t, e)
        }
        compositionControllerDidRequestDeselectingAttachment(t) {
            const e = this.attachmentLocationRange || this.composition.document.getLocationRangeOfAttachment(t);
            return this.selectionManager.setLocationRange(e[1])
        }
        compositionControllerWillUpdateAttachment(t) {
            return this.editor.recordUndoEntry("Edit Attachment", {
                context: t.id,
                consolidatable: !0
            })
        }
        compositionControllerDidRequestRemovalOfAttachment(t) {
            return this.removeAttachment(t)
        }
        inputControllerWillHandleInput() {
            this.handlingInput = !0, this.requestedRender = !1
        }
        inputControllerDidRequestRender() {
            this.requestedRender = !0
        }
        inputControllerDidHandleInput() {
            if (this.handlingInput = !1, this.requestedRender) return this.requestedRender = !1, this.render()
        }
        inputControllerDidAllowUnhandledInput() {
            return this.notifyEditorElement("change")
        }
        inputControllerDidRequestReparse() {
            return this.reparse()
        }
        inputControllerWillPerformTyping() {
            return this.recordTypingUndoEntry()
        }
        inputControllerWillPerformFormatting(t) {
            return this.recordFormattingUndoEntry(t)
        }
        inputControllerWillCutText() {
            return this.editor.recordUndoEntry("Cut")
        }
        inputControllerWillPaste(t) {
            return this.editor.recordUndoEntry("Paste"), this.pasting = !0, this.notifyEditorElement("before-paste", {
                paste: t
            })
        }
        inputControllerDidPaste(t) {
            return t.range = this.pastedRange, this.pastedRange = null, this.pasting = null, this.notifyEditorElement("paste", {
                paste: t
            })
        }
        inputControllerWillMoveText() {
            return this.editor.recordUndoEntry("Move")
        }
        inputControllerWillAttachFiles() {
            return this.editor.recordUndoEntry("Drop Files")
        }
        inputControllerWillPerformUndo() {
            return this.editor.undo()
        }
        inputControllerWillPerformRedo() {
            return this.editor.redo()
        }
        inputControllerDidReceiveKeyboardCommand(t) {
            return this.toolbarController.applyKeyboardCommand(t)
        }
        inputControllerDidStartDrag() {
            this.locationRangeBeforeDrag = this.selectionManager.getLocationRange()
        }
        inputControllerDidReceiveDragOverPoint(t) {
            return this.selectionManager.setLocationRangeFromPointRange(t)
        }
        inputControllerDidCancelDrag() {
            this.selectionManager.setLocationRange(this.locationRangeBeforeDrag), this.locationRangeBeforeDrag = null
        }
        locationRangeDidChange(t) {
            return this.composition.updateCurrentAttributes(), this.updateCurrentActions(), this.attachmentLocationRange && !Dt(this.attachmentLocationRange, t) && this.composition.stopEditingAttachment(), this.notifyEditorElement("selection-change")
        }
        toolbarDidClickButton() {
            if (!this.getLocationRange()) return this.setLocationRange({
                index: 0,
                offset: 0
            })
        }
        toolbarDidInvokeAction(t) {
            return this.invokeAction(t)
        }
        toolbarDidToggleAttribute(t) {
            if (this.recordFormattingUndoEntry(t), this.composition.toggleCurrentAttribute(t), this.render(), !this.selectionFrozen) return this.editorElement.focus()
        }
        toolbarDidUpdateAttribute(t, e) {
            if (this.recordFormattingUndoEntry(t), this.composition.setCurrentAttribute(t, e), this.render(), !this.selectionFrozen) return this.editorElement.focus()
        }
        toolbarDidRemoveAttribute(t) {
            if (this.recordFormattingUndoEntry(t), this.composition.removeCurrentAttribute(t), this.render(), !this.selectionFrozen) return this.editorElement.focus()
        }
        toolbarWillShowDialog(t) {
            return this.composition.expandSelectionForEditing(), this.freezeSelection()
        }
        toolbarDidShowDialog(t) {
            return this.notifyEditorElement("toolbar-dialog-show", {
                dialogName: t
            })
        }
        toolbarDidHideDialog(t) {
            return this.thawSelection(), this.editorElement.focus(), this.notifyEditorElement("toolbar-dialog-hide", {
                dialogName: t
            })
        }
        freezeSelection() {
            if (!this.selectionFrozen) return this.selectionManager.lock(), this.composition.freezeSelection(), this.selectionFrozen = !0, this.render()
        }
        thawSelection() {
            if (this.selectionFrozen) return this.composition.thawSelection(), this.selectionManager.unlock(), this.selectionFrozen = !1, this.render()
        }
        canInvokeAction(t) {
            return !!this.actionIsExternal(t) || !(null === (e = this.actions[t]) || void 0 === e || null === (i = e.test) || void 0 === i || !i.call(this));
            var e, i
        }
        invokeAction(t) {
            return this.actionIsExternal(t) ? this.notifyEditorElement("action-invoke", {
                actionName: t
            }) : null === (e = this.actions[t]) || void 0 === e || null === (i = e.perform) || void 0 === i ? void 0 : i.call(this);
            var e, i
        }
        actionIsExternal(t) {
            return /^x-./.test(t)
        }
        getCurrentActions() {
            const t = {};
            for (const e in this.actions) t[e] = this.canInvokeAction(e);
            return t
        }
        updateCurrentActions() {
            const t = this.getCurrentActions();
            if (!Et(t, this.currentActions)) return this.currentActions = t, this.toolbarController.updateActions(this.currentActions), this.notifyEditorElement("actions-change", {
                actions: this.currentActions
            })
        }
        runEditorFilters() {
            let t = this.composition.getSnapshot();
            if (Array.from(this.editor.filters).forEach((e => {
                    const {
                        document: i,
                        selectedRange: n
                    } = t;
                    t = e.call(this.editor, t) || {}, t.document || (t.document = i), t.selectedRange || (t.selectedRange = n)
                })), e = t, i = this.composition.getSnapshot(), !Dt(e.selectedRange, i.selectedRange) || !e.document.isEqualTo(i.document)) return this.composition.loadSnapshot(t);
            var e, i
        }
        updateInputElement() {
            const t = function (t, e) {
                const i = ai[e];
                if (i) return i(t);
                throw new Error("unknown content type: ".concat(e))
            }(this.compositionController.getSerializableElement(), "text/html");
            return this.editorElement.setInputElementValue(t)
        }
        notifyEditorElement(t, e) {
            switch (t) {
                case "document-change":
                    this.documentChangedSinceLastRender = !0;
                    break;
                case "render":
                    this.documentChangedSinceLastRender && (this.documentChangedSinceLastRender = !1, this.notifyEditorElement("change"));
                    break;
                case "change":
                case "attachment-add":
                case "attachment-edit":
                case "attachment-remove":
                    this.updateInputElement()
            }
            return this.editorElement.notify(t, e)
        }
        removeAttachment(t) {
            return this.editor.recordUndoEntry("Delete Attachment"), this.composition.removeAttachment(t), this.render()
        }
        recordFormattingUndoEntry(t) {
            const e = dt(t),
                i = this.selectionManager.getLocationRange();
            if (e || !Lt(i)) return this.editor.recordUndoEntry("Formatting", {
                context: this.getUndoContext(),
                consolidatable: !0
            })
        }
        recordTypingUndoEntry() {
            return this.editor.recordUndoEntry("Typing", {
                context: this.getUndoContext(this.currentAttributes),
                consolidatable: !0
            })
        }
        getUndoContext() {
            for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
            return [this.getLocationContext(), this.getTimeContext(), ...Array.from(e)]
        }
        getLocationContext() {
            const t = this.selectionManager.getLocationRange();
            return Lt(t) ? t[0].index : t
        }
        getTimeContext() {
            return q.interval > 0 ? Math.floor((new Date).getTime() / q.interval) : 0
        }
        isFocused() {
            var t;
            return this.editorElement === (null === (t = this.editorElement.ownerDocument) || void 0 === t ? void 0 : t.activeElement)
        }
        isFocusedInvisibly() {
            return this.isFocused() && !this.getLocationRange()
        }
        get actions() {
            return this.constructor.actions
        }
    }
    Ae(vn, "actions", {
        undo: {
            test() {
                return this.editor.canUndo()
            },
            perform() {
                return this.editor.undo()
            }
        },
        redo: {
            test() {
                return this.editor.canRedo()
            },
            perform() {
                return this.editor.redo()
            }
        },
        link: {
            test() {
                return this.editor.canActivateAttribute("href")
            }
        },
        increaseNestingLevel: {
            test() {
                return this.editor.canIncreaseNestingLevel()
            },
            perform() {
                return this.editor.increaseNestingLevel() && this.render()
            }
        },
        decreaseNestingLevel: {
            test() {
                return this.editor.canDecreaseNestingLevel()
            },
            perform() {
                return this.editor.decreaseNestingLevel() && this.render()
            }
        },
        attachFiles: {
            test: () => !0,
            perform() {
                return O.pickFiles(this.editor.insertFiles)
            }
        }
    }), vn.proxyMethod("getSelectionManager().setLocationRange"), vn.proxyMethod("getSelectionManager().getLocationRange");
    var An = Object.freeze({
            __proto__: null,
            AttachmentEditorController: Pi,
            CompositionController: Ii,
            Controller: Ni,
            EditorController: vn,
            InputController: Vi,
            Level0InputController: Ki,
            Level2InputController: Zi,
            ToolbarController: bn
        }),
        xn = Object.freeze({
            __proto__: null,
            MutationObserver: Wi,
            SelectionChangeObserver: Ft
        }),
        yn = Object.freeze({
            __proto__: null,
            FileVerificationOperation: Ui,
            ImagePreloadOperation: ye
        });
    ft("trix-toolbar", "%t {\n  display: block;\n}\n\n%t {\n  white-space: nowrap;\n}\n\n%t [data-trix-dialog] {\n  display: none;\n}\n\n%t [data-trix-dialog][data-trix-active] {\n  display: block;\n}\n\n%t [data-trix-dialog] [data-trix-validate]:invalid {\n  background-color: #ffdddd;\n}");
    class Cn extends HTMLElement {
        connectedCallback() {
            "" === this.innerHTML && (this.innerHTML = W.getDefaultHTML())
        }
    }
    let Rn = 0;
    const Sn = function (t) {
            if (!t.hasAttribute("contenteditable")) return t.setAttribute("contenteditable", ""),
                function (t) {
                    let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return e.times = 1, m(t, e)
                }("focus", {
                    onElement: t,
                    withCallback: () => En(t)
                })
        },
        En = function (t) {
            return kn(t), Ln(t)
        },
        kn = function (t) {
            var e, i;
            if (null !== (e = (i = document).queryCommandSupported) && void 0 !== e && e.call(i, "enableObjectResizing")) return document.execCommand("enableObjectResizing", !1, !1), m("mscontrolselect", {
                onElement: t,
                preventDefault: !0
            })
        },
        Ln = function (t) {
            var e, i;
            if (null !== (e = (i = document).queryCommandSupported) && void 0 !== e && e.call(i, "DefaultParagraphSeparator")) {
                const {
                    tagName: t
                } = n.default;
                if (["div", "p"].includes(t)) return document.execCommand("DefaultParagraphSeparator", !1, t)
            }
        },
        Dn = o.forcesObjectResizing ? {
            display: "inline",
            width: "auto"
        } : {
            display: "inline-block",
            width: "1px"
        };
    ft("trix-editor", "%t {\n    display: block;\n}\n\n%t:empty:not(:focus)::before {\n    content: attr(placeholder);\n    color: graytext;\n    cursor: text;\n    pointer-events: none;\n    white-space: pre-line;\n}\n\n%t a[contenteditable=false] {\n    cursor: text;\n}\n\n%t img {\n    max-width: 100%;\n    height: auto;\n}\n\n%t ".concat(e, " figcaption textarea {\n    resize: none;\n}\n\n%t ").concat(e, " figcaption textarea.trix-autoresize-clone {\n    position: absolute;\n    left: -9999px;\n    max-height: 0px;\n}\n\n%t ").concat(e, " figcaption[data-trix-placeholder]:empty::before {\n    content: attr(data-trix-placeholder);\n    color: graytext;\n}\n\n%t [data-trix-cursor-target] {\n    display: ").concat(Dn.display, " !important;\n    width: ").concat(Dn.width, " !important;\n    padding: 0 !important;\n    margin: 0 !important;\n    border: none !important;\n}\n\n%t [data-trix-cursor-target=left] {\n    vertical-align: top !important;\n    margin-left: -1px !important;\n}\n\n%t [data-trix-cursor-target=right] {\n    vertical-align: bottom !important;\n    margin-right: -1px !important;\n}"));
    class wn extends HTMLElement {
        get trixId() {
            return this.hasAttribute("trix-id") ? this.getAttribute("trix-id") : (this.setAttribute("trix-id", ++Rn), this.trixId)
        }
        get labels() {
            const t = [];
            this.id && this.ownerDocument && t.push(...Array.from(this.ownerDocument.querySelectorAll("label[for='".concat(this.id, "']")) || []));
            const e = b(this, {
                matchingSelector: "label"
            });
            return e && [this, null].includes(e.control) && t.push(e), t
        }
        get toolbarElement() {
            var t;
            if (this.hasAttribute("toolbar")) return null === (t = this.ownerDocument) || void 0 === t ? void 0 : t.getElementById(this.getAttribute("toolbar"));
            if (this.parentNode) {
                const t = "trix-toolbar-".concat(this.trixId);
                this.setAttribute("toolbar", t);
                const e = S("trix-toolbar", {
                    id: t
                });
                return this.parentNode.insertBefore(e, this), e
            }
        }
        get form() {
            var t;
            return null === (t = this.inputElement) || void 0 === t ? void 0 : t.form
        }
        get inputElement() {
            var t;
            if (this.hasAttribute("input")) return null === (t = this.ownerDocument) || void 0 === t ? void 0 : t.getElementById(this.getAttribute("input"));
            if (this.parentNode) {
                const t = "trix-input-".concat(this.trixId);
                this.setAttribute("input", t);
                const e = S("input", {
                    type: "hidden",
                    id: t
                });
                return this.parentNode.insertBefore(e, this.nextElementSibling), e
            }
        }
        get editor() {
            var t;
            return null === (t = this.editorController) || void 0 === t ? void 0 : t.editor
        }
        get name() {
            var t;
            return null === (t = this.inputElement) || void 0 === t ? void 0 : t.name
        }
        get value() {
            var t;
            return null === (t = this.inputElement) || void 0 === t ? void 0 : t.value
        }
        set value(t) {
            var e;
            this.defaultValue = t, null === (e = this.editor) || void 0 === e || e.loadHTML(this.defaultValue)
        }
        notify(t, e) {
            if (this.editorController) return p("trix-".concat(t), {
                onElement: this,
                attributes: e
            })
        }
        setInputElementValue(t) {
            this.inputElement && (this.inputElement.value = t)
        }
        connectedCallback() {
            this.hasAttribute("data-trix-internal") || (Sn(this), function (t) {
                if (!t.hasAttribute("role")) t.setAttribute("role", "textbox")
            }(this), function (t) {
                if (t.hasAttribute("aria-label") || t.hasAttribute("aria-labelledby")) return;
                const e = function () {
                    const e = Array.from(t.labels).map((e => {
                            if (!e.contains(t)) return e.textContent
                        })).filter((t => t)),
                        i = e.join(" ");
                    return i ? t.setAttribute("aria-label", i) : t.removeAttribute("aria-label")
                };
                e(), m("focus", {
                    onElement: t,
                    withCallback: e
                })
            }(this), this.editorController || (p("trix-before-initialize", {
                onElement: this
            }), this.editorController = new vn({
                editorElement: this,
                html: this.defaultValue = this.value
            }), requestAnimationFrame((() => p("trix-initialize", {
                onElement: this
            })))), this.editorController.registerSelectionManager(), this.registerResetListener(), this.registerClickListener(), function (t) {
                if (!document.querySelector(":focus") && t.hasAttribute("autofocus") && document.querySelector("[autofocus]") === t) t.focus()
            }(this))
        }
        disconnectedCallback() {
            var t;
            return null === (t = this.editorController) || void 0 === t || t.unregisterSelectionManager(), this.unregisterResetListener(), this.unregisterClickListener()
        }
        registerResetListener() {
            return this.resetListener = this.resetBubbled.bind(this), window.addEventListener("reset", this.resetListener, !1)
        }
        unregisterResetListener() {
            return window.removeEventListener("reset", this.resetListener, !1)
        }
        registerClickListener() {
            return this.clickListener = this.clickBubbled.bind(this), window.addEventListener("click", this.clickListener, !1)
        }
        unregisterClickListener() {
            return window.removeEventListener("click", this.clickListener, !1)
        }
        resetBubbled(t) {
            if (!t.defaultPrevented && t.target === this.form) return this.reset()
        }
        clickBubbled(t) {
            if (t.defaultPrevented) return;
            if (this.contains(t.target)) return;
            const e = b(t.target, {
                matchingSelector: "label"
            });
            return e && Array.from(this.labels).includes(e) ? this.focus() : void 0
        }
        reset() {
            this.value = this.defaultValue
        }
    }
    const Tn = {
        VERSION: t,
        config: U,
        core: li,
        models: Li,
        views: Di,
        controllers: An,
        observers: xn,
        operations: yn,
        elements: Object.freeze({
            __proto__: null,
            TrixEditorElement: wn,
            TrixToolbarElement: Cn
        }),
        filters: Object.freeze({
            __proto__: null,
            Filter: fi,
            attachmentGalleryFilter: bi
        })
    };
    return window.Trix = Tn, setTimeout((function () {
        customElements.get("trix-toolbar") || customElements.define("trix-toolbar", Cn), customElements.get("trix-editor") || customElements.define("trix-editor", wn)
    }), 0), Tn
}));
