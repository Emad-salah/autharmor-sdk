parcelRequire = (function(e, r, t, n) {
  var i,
    o = "function" == typeof parcelRequire && parcelRequire,
    u = "function" == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = "function" == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && "string" == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw ((c.code = "MODULE_NOT_FOUND"), c);
      }
      (p.resolve = function(r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function(e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function(r, t) {
      e[r] = [
        function(e, r) {
          r.exports = t;
        },
        {}
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = l)
      : "function" == typeof define && define.amd
      ? define(function() {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    Focm: [
      function(require, module, exports) {
        "use strict";
        function n(n, e) {
          if (!(n instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        function e(n, e) {
          for (var o = 0; o < e.length; o++) {
            var t = e[o];
            (t.enumerable = t.enumerable || !1),
              (t.configurable = !0),
              "value" in t && (t.writable = !0),
              Object.defineProperty(n, t.key, t);
          }
        }
        function o(n, o, t) {
          return o && e(n.prototype, o), t && e(n, t), n;
        }
        function t(n, e, o) {
          return (
            e in n
              ? Object.defineProperty(n, e, {
                  value: o,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
                })
              : (n[e] = o),
            n
          );
        }
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = void 0);
        var i = (function() {
          function e() {
            var o = this,
              i =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {};
            n(this, e),
              t(this, "setUserReferenceID", function(n) {
                o.userReferenceID = n;
              }),
              t(this, "authenticate", function() {
                o.popupWindow(
                  "/popup.html?clientID="
                    .concat(o.clientID, "&userReferenceID=")
                    .concat(o.userReferenceID),
                  "AuthArmor Login",
                  600,
                  400
                );
              }),
              (this.clientID = i.clientID),
              (this.userReferenceID = i.userReferenceID),
              (this.onAuthenticating = i.onAuthenticating),
              (this.onAuthenticated = i.onAuthenticated),
              (document.body.innerHTML +=
                '\n      <style>\n        .popup-overlay {\n          position: fixed;\n          top: 0;\n          left: 0;\n          width: 100%;\n          height: 100%;\n          display: flex;\n          flex-direction: column;\n          justify-content: center;\n          align-items: center;\n          background-color: rgba(53, 57, 64, 0.98);\n          z-index: 100;\n          opacity: 1;\n          visibility: visible;\n          transition: all .2s ease;\n        }\n        \n        .popup-overlay-content {\n          background-color: #303642;\n          border-radius: 15px;\n          overflow: hidden;\n          box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.15);\n        }\n        \n        .popup-overlay img {\n          height: 110px;\n          margin-bottom: 40px;\n          margin-top: 40px;\n        }\n        \n        .popup-overlay p {\n          margin: 0;\n          font-weight: bold;\n          color: white;\n          font-size: 18px;\n          padding: 14px 80px;\n          background-color: rgb(0, 128, 128);\n        }\n\n        .hidden {\n          opacity: 0;\n          visibility: hidden;\n        }\n      </style>\n      <div class="popup-overlay hidden">\n        <div class="popup-overlay-content">\n          <img src="" alt="AuthArmor Icon" />\n          <p>Authenticating with AuthArmor...</p>\n        </div>\n      </div>\n    '),
              (window.openedWindow = function() {
                o.onAuthenticating(),
                  document
                    .querySelector(".popup-overlay")
                    .classList.remove("hidden");
              }),
              (window.closedWindow = function() {
                document
                  .querySelector(".popup-overlay")
                  .classList.add("hidden");
              }),
              (window.openedWindow = function() {
                o.onAuthenticated(),
                  document
                    .querySelector(".popup-overlay")
                    .classList.remove("hidden");
              });
          }
          return (
            o(e, [
              {
                key: "popupWindow",
                value: function(n, e, o, t) {
                  var i = window.outerHeight / 2 + window.screenY - t / 2,
                    r = window.outerWidth / 2 + window.screenX - o / 2;
                  return window.open(
                    n,
                    e,
                    "toolbar=no, \n      location=no, \n      directories=no, \n      status=no, \n      menubar=no, \n      scrollbars=no, \n      resizable=no, \n      copyhistory=no, \n      width="
                      .concat(o, ", \n      height=")
                      .concat(t, ", \n      top=")
                      .concat(i, ", \n      left=")
                      .concat(r)
                  );
                }
              }
            ]),
            e
          );
        })();
        exports.default = i;
      },
      {}
    ]
  },
  {},
  ["Focm"],
  null
);
//# sourceMappingURL=/index.js.map
