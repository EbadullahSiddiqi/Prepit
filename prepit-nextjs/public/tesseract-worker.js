/*! For license information please see worker.min.js.LICENSE.txt */
(() => {
  var t = {
      919: (t, e) => {
        "use strict";
        (e.byteLength = function (t) {
          var e = u(t),
            r = e[0],
            n = e[1];
          return (3 * (r + n)) / 4 - n;
        }),
          (e.toByteArray = function (t) {
            var e,
              r,
              o = u(t),
              a = o[0],
              s = o[1],
              c = new i(
                (function (t, e, r) {
                  return (3 * (e + r)) / 4 - r;
                })(0, a, s)
              ),
              f = 0,
              h = s > 0 ? a - 4 : a;
            for (r = 0; r < h; r += 4)
              (e =
                (n[t.charCodeAt(r)] << 18) |
                (n[t.charCodeAt(r + 1)] << 12) |
                (n[t.charCodeAt(r + 2)] << 6) |
                n[t.charCodeAt(r + 3)]),
                (c[f++] = (e >> 16) & 255),
                (c[f++] = (e >> 8) & 255),
                (c[f++] = 255 & e);
            return (
              2 === s &&
                ((e =
                  (n[t.charCodeAt(r)] << 2) | (n[t.charCodeAt(r + 1)] >> 4)),
                (c[f++] = 255 & e)),
              1 === s &&
                ((e =
                  (n[t.charCodeAt(r)] << 10) |
                  (n[t.charCodeAt(r + 1)] << 4) |
                  (n[t.charCodeAt(r + 2)] >> 2)),
                (c[f++] = (e >> 8) & 255),
                (c[f++] = 255 & e)),
              c
            );
          }),
          (e.fromByteArray = function (t) {
            for (
              var e,
                n = t.length,
                i = n % 3,
                o = [],
                a = 16383,
                s = 0,
                u = n - i;
              s < u;
              s += a
            )
              o.push(c(t, s, s + a > u ? u : s + a));
            return (
              1 === i
                ? ((e = t[n - 1]), o.push(r[e >> 2] + r[(e << 4) & 63] + "=="))
                : 2 === i &&
                  ((e = (t[n - 2] << 8) + t[n - 1]),
                  o.push(
                    r[e >> 10] + r[(e >> 4) & 63] + r[(e << 2) & 63] + "="
                  )),
              o.join("")
            );
          });
        for (
          var r = [],
            n = [],
            i = "undefined" != typeof Uint8Array ? Uint8Array : Array,
            o =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            a = 0,
            s = o.length;
          a < s;
          ++a
        )
          (r[a] = o[a]), (n[o.charCodeAt(a)] = a);
        function u(t) {
          var e = t.length;
          if (e % 4 > 0)
            throw new Error("Invalid string. Length must be a multiple of 4");
          var r = t.indexOf("=");
          return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)];
        }
        function c(t, e, n) {
          for (var i, o, a = [], s = e; s < n; s += 3)
            (i =
              ((t[s] << 16) & 16711680) +
              ((t[s + 1] << 8) & 65280) +
              (255 & t[s + 2])),
              a.push(
                r[((o = i) >> 18) & 63] +
                  r[(o >> 12) & 63] +
                  r[(o >> 6) & 63] +
                  r[63 & o]
              );
          return a.join("");
        }
        (n["-".charCodeAt(0)] = 62), (n["_".charCodeAt(0)] = 63);
      },
      86: (t, e, r) => {
        var n = r(752),
          i = r(773);
        t.exports = { encode: n, decode: i };
      },
      773: (t, e, r) => {
        var n = r(33).lW;
        function i(t, e) {
          if (
            ((this.pos = 0),
            (this.buffer = t),
            (this.is_with_alpha = !!e),
            (this.bottom_up = !0),
            (this.flag = this.buffer.toString("utf-8", 0, (this.pos += 2))),
            "BM" != this.flag)
          )
            throw new Error("Invalid BMP File");
          this.parseHeader(), this.parseRGBA();
        }
        (i.prototype.parseHeader = function () {
          if (
            ((this.fileSize = this.buffer.readUInt32LE(this.pos)),
            (this.pos += 4),
            (this.reserved = this.buffer.readUInt32LE(this.pos)),
            (this.pos += 4),
            (this.offset = this.buffer.readUInt32LE(this.pos)),
            (this.pos += 4),
            (this.headerSize = this.buffer.readUInt32LE(this.pos)),
            (this.pos += 4),
            (this.width = this.buffer.readUInt32LE(this.pos)),
            (this.pos += 4),
            (this.height = this.buffer.readInt32LE(this.pos)),
            (this.pos += 4),
            (this.planes = this.buffer.readUInt16LE(this.pos)),
            (this.pos += 2),
            (this.bitPP = this.buffer.readUInt16LE(this.pos)),
            (this.pos += 2),
            (this.compress = this.buffer.readUInt32LE(this.pos)),
            (this.pos += 4),
            (this.rawSize = this.buffer.readUInt32LE(this.pos)),
            (this.pos += 4),
            (this.hr = this.buffer.readUInt32LE(this.pos)),
            (this.pos += 4),
            (this.vr = this.buffer.readUInt32LE(this.pos)),
            (this.pos += 4),
            (this.colors = this.buffer.readUInt32LE(this.pos)),
            (this.pos += 4),
            (this.importantColors = this.buffer.readUInt32LE(this.pos)),
            (this.pos += 4),
            16 === this.bitPP && this.is_with_alpha && (this.bitPP = 15),
            this.bitPP < 15)
          ) {
            var t = 0 === this.colors ? 1 << this.bitPP : this.colors;
            this.palette = new Array(t);
            for (var e = 0; e < t; e++) {
              var r = this.buffer.readUInt8(this.pos++),
                n = this.buffer.readUInt8(this.pos++),
                i = this.buffer.readUInt8(this.pos++),
                o = this.buffer.readUInt8(this.pos++);
              this.palette[e] = { red: i, green: n, blue: r, quad: o };
            }
          }
          this.height < 0 && ((this.height *= -1), (this.bottom_up = !1));
        }),
          (i.prototype.parseRGBA = function () {
            var t = "bit" + this.bitPP,
              e = this.width * this.height * 4;
            (this.data = new n(e)), this[t]();
          }),
          (i.prototype.bit1 = function () {
            var t = Math.ceil(this.width / 8),
              e = t % 4,
              r = this.height >= 0 ? this.height - 1 : -this.height;
            for (r = this.height - 1; r >= 0; r--) {
              for (
                var n = this.bottom_up ? r : this.height - 1 - r, i = 0;
                i < t;
                i++
              )
                for (
                  var o = this.buffer.readUInt8(this.pos++),
                    a = n * this.width * 4 + 8 * i * 4,
                    s = 0;
                  s < 8 && 8 * i + s < this.width;
                  s++
                ) {
                  var u = this.palette[(o >> (7 - s)) & 1];
                  (this.data[a + 4 * s] = 0),
                    (this.data[a + 4 * s + 1] = u.blue),
                    (this.data[a + 4 * s + 2] = u.green),
                    (this.data[a + 4 * s + 3] = u.red);
                }
              0 != e && (this.pos += 4 - e);
            }
          }),
          (i.prototype.bit4 = function () {
            if (2 == this.compress) {
              var t = function (t) {
                var r = this.palette[t];
                (this.data[e] = 0),
                  (this.data[e + 1] = r.blue),
                  (this.data[e + 2] = r.green),
                  (this.data[e + 3] = r.red),
                  (e += 4);
              };
              this.data.fill(255);
              for (
                var e = 0, r = this.bottom_up ? this.height - 1 : 0, n = !1;
                e < this.data.length;

              ) {
                var i = this.buffer.readUInt8(this.pos++),
                  o = this.buffer.readUInt8(this.pos++);
                if (0 == i) {
                  if (0 == o) {
                    this.bottom_up ? r-- : r++,
                      (e = r * this.width * 4),
                      (n = !1);
                    continue;
                  }
                  if (1 == o) break;
                  if (2 == o) {
                    var a = this.buffer.readUInt8(this.pos++),
                      s = this.buffer.readUInt8(this.pos++);
                    this.bottom_up ? (r -= s) : (r += s),
                      (e += s * this.width * 4 + 4 * a);
                  } else {
                    for (
                      var u = this.buffer.readUInt8(this.pos++), c = 0;
                      c < o;
                      c++
                    )
                      t.call(this, n ? 15 & u : (240 & u) >> 4),
                        1 & c &&
                          c + 1 < o &&
                          (u = this.buffer.readUInt8(this.pos++)),
                        (n = !n);
                    1 == (((o + 1) >> 1) & 1) && this.pos++;
                  }
                } else
                  for (c = 0; c < i; c++)
                    t.call(this, n ? 15 & o : (240 & o) >> 4), (n = !n);
              }
            } else {
              var f = Math.ceil(this.width / 2),
                h = f % 4;
              for (s = this.height - 1; s >= 0; s--) {
                var l = this.bottom_up ? s : this.height - 1 - s;
                for (a = 0; a < f; a++) {
                  (o = this.buffer.readUInt8(this.pos++)),
                    (e = l * this.width * 4 + 2 * a * 4);
                  var p = o >> 4,
                    d = 15 & o,
                    y = this.palette[p];
                  if (
                    ((this.data[e] = 0),
                    (this.data[e + 1] = y.blue),
                    (this.data[e + 2] = y.green),
                    (this.data[e + 3] = y.red),
                    2 * a + 1 >= this.width)
                  )
                    break;
                  (y = this.palette[d]),
                    (this.data[e + 4] = 0),
                    (this.data[e + 4 + 1] = y.blue),
                    (this.data[e + 4 + 2] = y.green),
                    (this.data[e + 4 + 3] = y.red);
                }
                0 != h && (this.pos += 4 - h);
              }
            }
          }),
          (i.prototype.bit8 = function () {
            if (1 == this.compress) {
              var t = function (t) {
                var r = this.palette[t];
                (this.data[e] = 0),
                  (this.data[e + 1] = r.blue),
                  (this.data[e + 2] = r.green),
                  (this.data[e + 3] = r.red),
                  (e += 4);
              };
              this.data.fill(255);
              for (
                var e = 0, r = this.bottom_up ? this.height - 1 : 0;
                e < this.data.length;

              ) {
                var n = this.buffer.readUInt8(this.pos++),
                  i = this.buffer.readUInt8(this.pos++);
                if (0 == n) {
                  if (0 == i) {
                    this.bottom_up ? r-- : r++, (e = r * this.width * 4);
                    continue;
                  }
                  if (1 == i) break;
                  if (2 == i) {
                    var o = this.buffer.readUInt8(this.pos++),
                      a = this.buffer.readUInt8(this.pos++);
                    this.bottom_up ? (r -= a) : (r += a),
                      (e += a * this.width * 4 + 4 * o);
                  } else {
                    for (var s = 0; s < i; s++) {
                      var u = this.buffer.readUInt8(this.pos++);
                      t.call(this, u);
                    }
                    !0 & i && this.pos++;
                  }
                } else for (s = 0; s < n; s++) t.call(this, i);
              }
            } else {
              var c = this.width % 4;
              for (a = this.height - 1; a >= 0; a--) {
                var f = this.bottom_up ? a : this.height - 1 - a;
                for (o = 0; o < this.width; o++)
                  if (
                    ((i = this.buffer.readUInt8(this.pos++)),
                    (e = f * this.width * 4 + 4 * o),
                    i < this.palette.length)
                  ) {
                    var h = this.palette[i];
                    (this.data[e] = 0),
                      (this.data[e + 1] = h.blue),
                      (this.data[e + 2] = h.green),
                      (this.data[e + 3] = h.red);
                  } else
                    (this.data[e] = 0),
                      (this.data[e + 1] = 255),
                      (this.data[e + 2] = 255),
                      (this.data[e + 3] = 255);
                0 != c && (this.pos += 4 - c);
              }
            }
          }),
          (i.prototype.bit15 = function () {
            for (
              var t = this.width % 3,
                e = parseInt("11111", 2),
                r = this.height - 1;
              r >= 0;
              r--
            ) {
              for (
                var n = this.bottom_up ? r : this.height - 1 - r, i = 0;
                i < this.width;
                i++
              ) {
                var o = this.buffer.readUInt16LE(this.pos);
                this.pos += 2;
                var a = (((o & e) / e) * 255) | 0,
                  s = ((((o >> 5) & e) / e) * 255) | 0,
                  u = ((((o >> 10) & e) / e) * 255) | 0,
                  c = o >> 15 ? 255 : 0,
                  f = n * this.width * 4 + 4 * i;
                (this.data[f] = c),
                  (this.data[f + 1] = a),
                  (this.data[f + 2] = s),
                  (this.data[f + 3] = u);
              }
              this.pos += t;
            }
          }),
          (i.prototype.bit16 = function () {
            var t = (this.width % 2) * 2;
            (this.maskRed = 31744),
              (this.maskGreen = 992),
              (this.maskBlue = 31),
              (this.mask0 = 0),
              3 == this.compress &&
                ((this.maskRed = this.buffer.readUInt32LE(this.pos)),
                (this.pos += 4),
                (this.maskGreen = this.buffer.readUInt32LE(this.pos)),
                (this.pos += 4),
                (this.maskBlue = this.buffer.readUInt32LE(this.pos)),
                (this.pos += 4),
                (this.mask0 = this.buffer.readUInt32LE(this.pos)),
                (this.pos += 4));
            for (var e = [0, 0, 0], r = 0; r < 16; r++)
              (this.maskRed >> r) & 1 && e[0]++,
                (this.maskGreen >> r) & 1 && e[1]++,
                (this.maskBlue >> r) & 1 && e[2]++;
            (e[1] += e[0]),
              (e[2] += e[1]),
              (e[0] = 8 - e[0]),
              (e[1] -= 8),
              (e[2] -= 8);
            for (var n = this.height - 1; n >= 0; n--) {
              for (
                var i = this.bottom_up ? n : this.height - 1 - n, o = 0;
                o < this.width;
                o++
              ) {
                var a = this.buffer.readUInt16LE(this.pos);
                this.pos += 2;
                var s = (a & this.maskBlue) << e[0],
                  u = (a & this.maskGreen) >> e[1],
                  c = (a & this.maskRed) >> e[2],
                  f = i * this.width * 4 + 4 * o;
                (this.data[f] = 0),
                  (this.data[f + 1] = s),
                  (this.data[f + 2] = u),
                  (this.data[f + 3] = c);
              }
              this.pos += t;
            }
          }),
          (i.prototype.bit24 = function () {
            for (var t = this.height - 1; t >= 0; t--) {
              for (
                var e = this.bottom_up ? t : this.height - 1 - t, r = 0;
                r < this.width;
                r++
              ) {
                var n = this.buffer.readUInt8(this.pos++),
                  i = this.buffer.readUInt8(this.pos++),
                  o = this.buffer.readUInt8(this.pos++),
                  a = e * this.width * 4 + 4 * r;
                (this.data[a] = 0),
                  (this.data[a + 1] = n),
                  (this.data[a + 2] = i),
                  (this.data[a + 3] = o);
              }
              this.pos += this.width % 4;
            }
          }),
          (i.prototype.bit32 = function () {
            if (3 == this.compress) {
              (this.maskRed = this.buffer.readUInt32LE(this.pos)),
                (this.pos += 4),
                (this.maskGreen = this.buffer.readUInt32LE(this.pos)),
                (this.pos += 4),
                (this.maskBlue = this.buffer.readUInt32LE(this.pos)),
                (this.pos += 4),
                (this.mask0 = this.buffer.readUInt32LE(this.pos)),
                (this.pos += 4);
              for (var t = this.height - 1; t >= 0; t--)
                for (
                  var e = this.bottom_up ? t : this.height - 1 - t, r = 0;
                  r < this.width;
                  r++
                ) {
                  var n = this.buffer.readUInt8(this.pos++),
                    i = this.buffer.readUInt8(this.pos++),
                    o = this.buffer.readUInt8(this.pos++),
                    a = this.buffer.readUInt8(this.pos++),
                    s = e * this.width * 4 + 4 * r;
                  (this.data[s] = n),
                    (this.data[s + 1] = i),
                    (this.data[s + 2] = o),
                    (this.data[s + 3] = a);
                }
            } else
              for (t = this.height - 1; t >= 0; t--)
                for (
                  e = this.bottom_up ? t : this.height - 1 - t, r = 0;
                  r < this.width;
                  r++
                )
                  (i = this.buffer.readUInt8(this.pos++)),
                    (o = this.buffer.readUInt8(this.pos++)),
                    (a = this.buffer.readUInt8(this.pos++)),
                    (n = this.buffer.readUInt8(this.pos++)),
                    (s = e * this.width * 4 + 4 * r),
                    (this.data[s] = n),
                    (this.data[s + 1] = i),
                    (this.data[s + 2] = o),
                    (this.data[s + 3] = a);
          }),
          (i.prototype.getData = function () {
            return this.data;
          }),
          (t.exports = function (t) {
            return new i(t);
          });
      },
      752: (t, e, r) => {
        var n = r(33).lW;
        function i(t) {
          (this.buffer = t.data),
            (this.width = t.width),
            (this.height = t.height),
            (this.extraBytes = this.width % 4),
            (this.rgbSize = this.height * (3 * this.width + this.extraBytes)),
            (this.headerInfoSize = 40),
            (this.data = []),
            (this.flag = "BM"),
            (this.reserved = 0),
            (this.offset = 54),
            (this.fileSize = this.rgbSize + this.offset),
            (this.planes = 1),
            (this.bitPP = 24),
            (this.compress = 0),
            (this.hr = 0),
            (this.vr = 0),
            (this.colors = 0),
            (this.importantColors = 0);
        }
        (i.prototype.encode = function () {
          var t = new n(this.offset + this.rgbSize);
          (this.pos = 0),
            t.write(this.flag, this.pos, 2),
            (this.pos += 2),
            t.writeUInt32LE(this.fileSize, this.pos),
            (this.pos += 4),
            t.writeUInt32LE(this.reserved, this.pos),
            (this.pos += 4),
            t.writeUInt32LE(this.offset, this.pos),
            (this.pos += 4),
            t.writeUInt32LE(this.headerInfoSize, this.pos),
            (this.pos += 4),
            t.writeUInt32LE(this.width, this.pos),
            (this.pos += 4),
            t.writeInt32LE(-this.height, this.pos),
            (this.pos += 4),
            t.writeUInt16LE(this.planes, this.pos),
            (this.pos += 2),
            t.writeUInt16LE(this.bitPP, this.pos),
            (this.pos += 2),
            t.writeUInt32LE(this.compress, this.pos),
            (this.pos += 4),
            t.writeUInt32LE(this.rgbSize, this.pos),
            (this.pos += 4),
            t.writeUInt32LE(this.hr, this.pos),
            (this.pos += 4),
            t.writeUInt32LE(this.vr, this.pos),
            (this.pos += 4),
            t.writeUInt32LE(this.colors, this.pos),
            (this.pos += 4),
            t.writeUInt32LE(this.importantColors, this.pos),
            (this.pos += 4);
          for (
            var e = 0, r = 3 * this.width + this.extraBytes, i = 0;
            i < this.height;
            i++
          ) {
            for (var o = 0; o < this.width; o++) {
              var a = this.pos + i * r + 3 * o;
              e++,
                (t[a] = this.buffer[e++]),
                (t[a + 1] = this.buffer[e++]),
                (t[a + 2] = this.buffer[e++]);
            }
            if (this.extraBytes > 0) {
              var s = this.pos + i * r + 3 * this.width;
              t.fill(0, s, s + this.extraBytes);
            }
          }
          return t;
        }),
          (t.exports = function (t, e) {
            return (
              void 0 === e && (e = 100),
              { data: new i(t).encode(), width: t.width, height: t.height }
            );
          });
      },
      33: (t, e, r) => {
        "use strict";
        function n(t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(
                t,
                (void 0,
                (i = (function (t, e) {
                  if ("object" !== s(t) || null === t) return t;
                  var r = t[Symbol.toPrimitive];
                  if (void 0 !== r) {
                    var n = r.call(t, "string");
                    if ("object" !== s(n)) return n;
                    throw new TypeError(
                      "@@toPrimitive must return a primitive value."
                    );
                  }
                  return String(t);
                })(n.key)),
                "symbol" === s(i) ? i : String(i)),
                n
              );
          }
          var i;
        }
        function i(t, e) {
          return (
            (i = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (t, e) {
                  return (t.__proto__ = e), t;
                }),
            i(t, e)
          );
        }
        function o(t) {
          if (void 0 === t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return t;
        }
        function a(t) {
          return (
            (a = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t);
                }),
            a(t)
          );
        }
        function s(t) {
          return (
            (s =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            s(t)
          );
        }
        var u = r(919),
          c = r(226),
          f =
            "function" == typeof Symbol && "function" == typeof Symbol.for
              ? Symbol.for("nodejs.util.inspect.custom")
              : null;
        (e.lW = p), (e.h2 = 50);
        var h = 2147483647;
        function l(t) {
          if (t > h)
            throw new RangeError(
              'The value "' + t + '" is invalid for option "size"'
            );
          var e = new Uint8Array(t);
          return Object.setPrototypeOf(e, p.prototype), e;
        }
        function p(t, e, r) {
          if ("number" == typeof t) {
            if ("string" == typeof e)
              throw new TypeError(
                'The "string" argument must be of type string. Received type number'
              );
            return g(t);
          }
          return d(t, e, r);
        }
        function d(t, e, r) {
          if ("string" == typeof t)
            return (function (t, e) {
              if (
                (("string" == typeof e && "" !== e) || (e = "utf8"),
                !p.isEncoding(e))
              )
                throw new TypeError("Unknown encoding: " + e);
              var r = 0 | m(t, e),
                n = l(r),
                i = n.write(t, e);
              return i !== r && (n = n.slice(0, i)), n;
            })(t, e);
          if (ArrayBuffer.isView(t))
            return (function (t) {
              if (tt(t, Uint8Array)) {
                var e = new Uint8Array(t);
                return b(e.buffer, e.byteOffset, e.byteLength);
              }
              return v(t);
            })(t);
          if (null == t)
            throw new TypeError(
              "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                s(t)
            );
          if (tt(t, ArrayBuffer) || (t && tt(t.buffer, ArrayBuffer)))
            return b(t, e, r);
          if (
            "undefined" != typeof SharedArrayBuffer &&
            (tt(t, SharedArrayBuffer) || (t && tt(t.buffer, SharedArrayBuffer)))
          )
            return b(t, e, r);
          if ("number" == typeof t)
            throw new TypeError(
              'The "value" argument must not be of type number. Received type number'
            );
          var n = t.valueOf && t.valueOf();
          if (null != n && n !== t) return p.from(n, e, r);
          var i = (function (t) {
            if (p.isBuffer(t)) {
              var e = 0 | w(t.length),
                r = l(e);
              return 0 === r.length || t.copy(r, 0, 0, e), r;
            }
            return void 0 !== t.length
              ? "number" != typeof t.length || et(t.length)
                ? l(0)
                : v(t)
              : "Buffer" === t.type && Array.isArray(t.data)
              ? v(t.data)
              : void 0;
          })(t);
          if (i) return i;
          if (
            "undefined" != typeof Symbol &&
            null != Symbol.toPrimitive &&
            "function" == typeof t[Symbol.toPrimitive]
          )
            return p.from(t[Symbol.toPrimitive]("string"), e, r);
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
              s(t)
          );
        }
        function y(t) {
          if ("number" != typeof t)
            throw new TypeError('"size" argument must be of type number');
          if (t < 0)
            throw new RangeError(
              'The value "' + t + '" is invalid for option "size"'
            );
        }
        function g(t) {
          return y(t), l(t < 0 ? 0 : 0 | w(t));
        }
        function v(t) {
          for (
            var e = t.length < 0 ? 0 : 0 | w(t.length), r = l(e), n = 0;
            n < e;
            n += 1
          )
            r[n] = 255 & t[n];
          return r;
        }
        function b(t, e, r) {
          if (e < 0 || t.byteLength < e)
            throw new RangeError('"offset" is outside of buffer bounds');
          if (t.byteLength < e + (r || 0))
            throw new RangeError('"length" is outside of buffer bounds');
          var n;
          return (
            (n =
              void 0 === e && void 0 === r
                ? new Uint8Array(t)
                : void 0 === r
                ? new Uint8Array(t, e)
                : new Uint8Array(t, e, r)),
            Object.setPrototypeOf(n, p.prototype),
            n
          );
        }
        function w(t) {
          if (t >= h)
            throw new RangeError(
              "Attempt to allocate Buffer larger than maximum size: 0x" +
                h.toString(16) +
                " bytes"
            );
          return 0 | t;
        }
        function m(t, e) {
          if (p.isBuffer(t)) return t.length;
          if (ArrayBuffer.isView(t) || tt(t, ArrayBuffer)) return t.byteLength;
          if ("string" != typeof t)
            throw new TypeError(
              'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                s(t)
            );
          var r = t.length,
            n = arguments.length > 2 && !0 === arguments[2];
          if (!n && 0 === r) return 0;
          for (var i = !1; ; )
            switch (e) {
              case "ascii":
              case "latin1":
              case "binary":
                return r;
              case "utf8":
              case "utf-8":
                return $(t).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * r;
              case "hex":
                return r >>> 1;
              case "base64":
                return Q(t).length;
              default:
                if (i) return n ? -1 : $(t).length;
                (e = ("" + e).toLowerCase()), (i = !0);
            }
        }
        function E(t, e, r) {
          var n = !1;
          if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return "";
          if (((void 0 === r || r > this.length) && (r = this.length), r <= 0))
            return "";
          if ((r >>>= 0) <= (e >>>= 0)) return "";
          for (t || (t = "utf8"); ; )
            switch (t) {
              case "hex":
                return R(this, e, r);
              case "utf8":
              case "utf-8":
                return j(this, e, r);
              case "ascii":
                return T(this, e, r);
              case "latin1":
              case "binary":
                return P(this, e, r);
              case "base64":
                return U(this, e, r);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return C(this, e, r);
              default:
                if (n) throw new TypeError("Unknown encoding: " + t);
                (t = (t + "").toLowerCase()), (n = !0);
            }
        }
        function x(t, e, r) {
          var n = t[e];
          (t[e] = t[r]), (t[r] = n);
        }
        function A(t, e, r, n, i) {
          if (0 === t.length) return -1;
          if (
            ("string" == typeof r
              ? ((n = r), (r = 0))
              : r > 2147483647
              ? (r = 2147483647)
              : r < -2147483648 && (r = -2147483648),
            et((r = +r)) && (r = i ? 0 : t.length - 1),
            r < 0 && (r = t.length + r),
            r >= t.length)
          ) {
            if (i) return -1;
            r = t.length - 1;
          } else if (r < 0) {
            if (!i) return -1;
            r = 0;
          }
          if (("string" == typeof e && (e = p.from(e, n)), p.isBuffer(e)))
            return 0 === e.length ? -1 : k(t, e, r, n, i);
          if ("number" == typeof e)
            return (
              (e &= 255),
              "function" == typeof Uint8Array.prototype.indexOf
                ? i
                  ? Uint8Array.prototype.indexOf.call(t, e, r)
                  : Uint8Array.prototype.lastIndexOf.call(t, e, r)
                : k(t, [e], r, n, i)
            );
          throw new TypeError("val must be string, number or Buffer");
        }
        function k(t, e, r, n, i) {
          var o,
            a = 1,
            s = t.length,
            u = e.length;
          if (
            void 0 !== n &&
            ("ucs2" === (n = String(n).toLowerCase()) ||
              "ucs-2" === n ||
              "utf16le" === n ||
              "utf-16le" === n)
          ) {
            if (t.length < 2 || e.length < 2) return -1;
            (a = 2), (s /= 2), (u /= 2), (r /= 2);
          }
          function c(t, e) {
            return 1 === a ? t[e] : t.readUInt16BE(e * a);
          }
          if (i) {
            var f = -1;
            for (o = r; o < s; o++)
              if (c(t, o) === c(e, -1 === f ? 0 : o - f)) {
                if ((-1 === f && (f = o), o - f + 1 === u)) return f * a;
              } else -1 !== f && (o -= o - f), (f = -1);
          } else
            for (r + u > s && (r = s - u), o = r; o >= 0; o--) {
              for (var h = !0, l = 0; l < u; l++)
                if (c(t, o + l) !== c(e, l)) {
                  h = !1;
                  break;
                }
              if (h) return o;
            }
          return -1;
        }
        function _(t, e, r, n) {
          r = Number(r) || 0;
          var i = t.length - r;
          n ? (n = Number(n)) > i && (n = i) : (n = i);
          var o,
            a = e.length;
          for (n > a / 2 && (n = a / 2), o = 0; o < n; ++o) {
            var s = parseInt(e.substr(2 * o, 2), 16);
            if (et(s)) return o;
            t[r + o] = s;
          }
          return o;
        }
        function O(t, e, r, n) {
          return Z($(e, t.length - r), t, r, n);
        }
        function I(t, e, r, n) {
          return Z(
            (function (t) {
              for (var e = [], r = 0; r < t.length; ++r)
                e.push(255 & t.charCodeAt(r));
              return e;
            })(e),
            t,
            r,
            n
          );
        }
        function S(t, e, r, n) {
          return Z(Q(e), t, r, n);
        }
        function L(t, e, r, n) {
          return Z(
            (function (t, e) {
              for (
                var r, n, i, o = [], a = 0;
                a < t.length && !((e -= 2) < 0);
                ++a
              )
                (n = (r = t.charCodeAt(a)) >> 8),
                  (i = r % 256),
                  o.push(i),
                  o.push(n);
              return o;
            })(e, t.length - r),
            t,
            r,
            n
          );
        }
        function U(t, e, r) {
          return 0 === e && r === t.length
            ? u.fromByteArray(t)
            : u.fromByteArray(t.slice(e, r));
        }
        function j(t, e, r) {
          r = Math.min(t.length, r);
          for (var n = [], i = e; i < r; ) {
            var o = t[i],
              a = null,
              s = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
            if (i + s <= r) {
              var u = void 0,
                c = void 0,
                f = void 0,
                h = void 0;
              switch (s) {
                case 1:
                  o < 128 && (a = o);
                  break;
                case 2:
                  128 == (192 & (u = t[i + 1])) &&
                    (h = ((31 & o) << 6) | (63 & u)) > 127 &&
                    (a = h);
                  break;
                case 3:
                  (u = t[i + 1]),
                    (c = t[i + 2]),
                    128 == (192 & u) &&
                      128 == (192 & c) &&
                      (h = ((15 & o) << 12) | ((63 & u) << 6) | (63 & c)) >
                        2047 &&
                      (h < 55296 || h > 57343) &&
                      (a = h);
                  break;
                case 4:
                  (u = t[i + 1]),
                    (c = t[i + 2]),
                    (f = t[i + 3]),
                    128 == (192 & u) &&
                      128 == (192 & c) &&
                      128 == (192 & f) &&
                      (h =
                        ((15 & o) << 18) |
                        ((63 & u) << 12) |
                        ((63 & c) << 6) |
                        (63 & f)) > 65535 &&
                      h < 1114112 &&
                      (a = h);
              }
            }
            null === a
              ? ((a = 65533), (s = 1))
              : a > 65535 &&
                ((a -= 65536),
                n.push(((a >>> 10) & 1023) | 55296),
                (a = 56320 | (1023 & a))),
              n.push(a),
              (i += s);
          }
          return (function (t) {
            var e = t.length;
            if (e <= B) return String.fromCharCode.apply(String, t);
            for (var r = "", n = 0; n < e; )
              r += String.fromCharCode.apply(String, t.slice(n, (n += B)));
            return r;
          })(n);
        }
        (p.TYPED_ARRAY_SUPPORT = (function () {
          try {
            var t = new Uint8Array(1),
              e = {
                foo: function () {
                  return 42;
                },
              };
            return (
              Object.setPrototypeOf(e, Uint8Array.prototype),
              Object.setPrototypeOf(t, e),
              42 === t.foo()
            );
          } catch (t) {
            return !1;
          }
        })()),
          p.TYPED_ARRAY_SUPPORT ||
            "undefined" == typeof console ||
            "function" != typeof console.error ||
            console.error(
              "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
            ),
          Object.defineProperty(p.prototype, "parent", {
            enumerable: !0,
            get: function () {
              if (p.isBuffer(this)) return this.buffer;
            },
          }),
          Object.defineProperty(p.prototype, "offset", {
            enumerable: !0,
            get: function () {
              if (p.isBuffer(this)) return this.byteOffset;
            },
          }),
          (p.poolSize = 8192),
          (p.from = function (t, e, r) {
            return d(t, e, r);
          }),
          Object.setPrototypeOf(p.prototype, Uint8Array.prototype),
          Object.setPrototypeOf(p, Uint8Array),
          (p.alloc = function (t, e, r) {
            return (function (t, e, r) {
              return (
                y(t),
                t <= 0
                  ? l(t)
                  : void 0 !== e
                  ? "string" == typeof r
                    ? l(t).fill(e, r)
                    : l(t).fill(e)
                  : l(t)
              );
            })(t, e, r);
          }),
          (p.allocUnsafe = function (t) {
            return g(t);
          }),
          (p.allocUnsafeSlow = function (t) {
            return g(t);
          }),
          (p.isBuffer = function (t) {
            return null != t && !0 === t._isBuffer && t !== p.prototype;
          }),
          (p.compare = function (t, e) {
            if (
              (tt(t, Uint8Array) && (t = p.from(t, t.offset, t.byteLength)),
              tt(e, Uint8Array) && (e = p.from(e, e.offset, e.byteLength)),
              !p.isBuffer(t) || !p.isBuffer(e))
            )
              throw new TypeError(
                'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
              );
            if (t === e) return 0;
            for (
              var r = t.length, n = e.length, i = 0, o = Math.min(r, n);
              i < o;
              ++i
            )
              if (t[i] !== e[i]) {
                (r = t[i]), (n = e[i]);
                break;
              }
            return r < n ? -1 : n < r ? 1 : 0;
          }),
          (p.isEncoding = function (t) {
            switch (String(t).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return !0;
              default:
                return !1;
            }
          }),
          (p.concat = function (t, e) {
            if (!Array.isArray(t))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            if (0 === t.length) return p.alloc(0);
            var r;
            if (void 0 === e)
              for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
            var n = p.allocUnsafe(e),
              i = 0;
            for (r = 0; r < t.length; ++r) {
              var o = t[r];
              if (tt(o, Uint8Array))
                i + o.length > n.length
                  ? (p.isBuffer(o) || (o = p.from(o)), o.copy(n, i))
                  : Uint8Array.prototype.set.call(n, o, i);
              else {
                if (!p.isBuffer(o))
                  throw new TypeError(
                    '"list" argument must be an Array of Buffers'
                  );
                o.copy(n, i);
              }
              i += o.length;
            }
            return n;
          }),
          (p.byteLength = m),
          (p.prototype._isBuffer = !0),
          (p.prototype.swap16 = function () {
            var t = this.length;
            if (t % 2 != 0)
              throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var e = 0; e < t; e += 2) x(this, e, e + 1);
            return this;
          }),
          (p.prototype.swap32 = function () {
            var t = this.length;
            if (t % 4 != 0)
              throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var e = 0; e < t; e += 4)
              x(this, e, e + 3), x(this, e + 1, e + 2);
            return this;
          }),
          (p.prototype.swap64 = function () {
            var t = this.length;
            if (t % 8 != 0)
              throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var e = 0; e < t; e += 8)
              x(this, e, e + 7),
                x(this, e + 1, e + 6),
                x(this, e + 2, e + 5),
                x(this, e + 3, e + 4);
            return this;
          }),
          (p.prototype.toString = function () {
            var t = this.length;
            return 0 === t
              ? ""
              : 0 === arguments.length
              ? j(this, 0, t)
              : E.apply(this, arguments);
          }),
          (p.prototype.toLocaleString = p.prototype.toString),
          (p.prototype.equals = function (t) {
            if (!p.isBuffer(t))
              throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === p.compare(this, t);
          }),
          (p.prototype.inspect = function () {
            var t = "",
              r = e.h2;
            return (
              (t = this.toString("hex", 0, r)
                .replace(/(.{2})/g, "$1 ")
                .trim()),
              this.length > r && (t += " ... "),
              "<Buffer " + t + ">"
            );
          }),
          f && (p.prototype[f] = p.prototype.inspect),
          (p.prototype.compare = function (t, e, r, n, i) {
            if (
              (tt(t, Uint8Array) && (t = p.from(t, t.offset, t.byteLength)),
              !p.isBuffer(t))
            )
              throw new TypeError(
                'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                  s(t)
              );
            if (
              (void 0 === e && (e = 0),
              void 0 === r && (r = t ? t.length : 0),
              void 0 === n && (n = 0),
              void 0 === i && (i = this.length),
              e < 0 || r > t.length || n < 0 || i > this.length)
            )
              throw new RangeError("out of range index");
            if (n >= i && e >= r) return 0;
            if (n >= i) return -1;
            if (e >= r) return 1;
            if (this === t) return 0;
            for (
              var o = (i >>>= 0) - (n >>>= 0),
                a = (r >>>= 0) - (e >>>= 0),
                u = Math.min(o, a),
                c = this.slice(n, i),
                f = t.slice(e, r),
                h = 0;
              h < u;
              ++h
            )
              if (c[h] !== f[h]) {
                (o = c[h]), (a = f[h]);
                break;
              }
            return o < a ? -1 : a < o ? 1 : 0;
          }),
          (p.prototype.includes = function (t, e, r) {
            return -1 !== this.indexOf(t, e, r);
          }),
          (p.prototype.indexOf = function (t, e, r) {
            return A(this, t, e, r, !0);
          }),
          (p.prototype.lastIndexOf = function (t, e, r) {
            return A(this, t, e, r, !1);
          }),
          (p.prototype.write = function (t, e, r, n) {
            if (void 0 === e) (n = "utf8"), (r = this.length), (e = 0);
            else if (void 0 === r && "string" == typeof e)
              (n = e), (r = this.length), (e = 0);
            else {
              if (!isFinite(e))
                throw new Error(
                  "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                );
              (e >>>= 0),
                isFinite(r)
                  ? ((r >>>= 0), void 0 === n && (n = "utf8"))
                  : ((n = r), (r = void 0));
            }
            var i = this.length - e;
            if (
              ((void 0 === r || r > i) && (r = i),
              (t.length > 0 && (r < 0 || e < 0)) || e > this.length)
            )
              throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");
            for (var o = !1; ; )
              switch (n) {
                case "hex":
                  return _(this, t, e, r);
                case "utf8":
                case "utf-8":
                  return O(this, t, e, r);
                case "ascii":
                case "latin1":
                case "binary":
                  return I(this, t, e, r);
                case "base64":
                  return S(this, t, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return L(this, t, e, r);
                default:
                  if (o) throw new TypeError("Unknown encoding: " + n);
                  (n = ("" + n).toLowerCase()), (o = !0);
              }
          }),
          (p.prototype.toJSON = function () {
            return {
              type: "Buffer",
              data: Array.prototype.slice.call(this._arr || this, 0),
            };
          });
        var B = 4096;
        function T(t, e, r) {
          var n = "";
          r = Math.min(t.length, r);
          for (var i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);
          return n;
        }
        function P(t, e, r) {
          var n = "";
          r = Math.min(t.length, r);
          for (var i = e; i < r; ++i) n += String.fromCharCode(t[i]);
          return n;
        }
        function R(t, e, r) {
          var n = t.length;
          (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
          for (var i = "", o = e; o < r; ++o) i += rt[t[o]];
          return i;
        }
        function C(t, e, r) {
          for (var n = t.slice(e, r), i = "", o = 0; o < n.length - 1; o += 2)
            i += String.fromCharCode(n[o] + 256 * n[o + 1]);
          return i;
        }
        function N(t, e, r) {
          if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
          if (t + e > r)
            throw new RangeError("Trying to access beyond buffer length");
        }
        function M(t, e, r, n, i, o) {
          if (!p.isBuffer(t))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (e > i || e < o)
            throw new RangeError('"value" argument is out of bounds');
          if (r + n > t.length) throw new RangeError("Index out of range");
        }
        function F(t, e, r, n, i) {
          H(e, n, i, t, r, 7);
          var o = Number(e & BigInt(4294967295));
          (t[r++] = o),
            (o >>= 8),
            (t[r++] = o),
            (o >>= 8),
            (t[r++] = o),
            (o >>= 8),
            (t[r++] = o);
          var a = Number((e >> BigInt(32)) & BigInt(4294967295));
          return (
            (t[r++] = a),
            (a >>= 8),
            (t[r++] = a),
            (a >>= 8),
            (t[r++] = a),
            (a >>= 8),
            (t[r++] = a),
            r
          );
        }
        function G(t, e, r, n, i) {
          H(e, n, i, t, r, 7);
          var o = Number(e & BigInt(4294967295));
          (t[r + 7] = o),
            (o >>= 8),
            (t[r + 6] = o),
            (o >>= 8),
            (t[r + 5] = o),
            (o >>= 8),
            (t[r + 4] = o);
          var a = Number((e >> BigInt(32)) & BigInt(4294967295));
          return (
            (t[r + 3] = a),
            (a >>= 8),
            (t[r + 2] = a),
            (a >>= 8),
            (t[r + 1] = a),
            (a >>= 8),
            (t[r] = a),
            r + 8
          );
        }
        function z(t, e, r, n, i, o) {
          if (r + n > t.length) throw new RangeError("Index out of range");
          if (r < 0) throw new RangeError("Index out of range");
        }
        function D(t, e, r, n, i) {
          return (
            (e = +e),
            (r >>>= 0),
            i || z(t, 0, r, 4),
            c.write(t, e, r, n, 23, 4),
            r + 4
          );
        }
        function W(t, e, r, n, i) {
          return (
            (e = +e),
            (r >>>= 0),
            i || z(t, 0, r, 8),
            c.write(t, e, r, n, 52, 8),
            r + 8
          );
        }
        (p.prototype.slice = function (t, e) {
          var r = this.length;
          (t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
            (e = void 0 === e ? r : ~~e) < 0
              ? (e += r) < 0 && (e = 0)
              : e > r && (e = r),
            e < t && (e = t);
          var n = this.subarray(t, e);
          return Object.setPrototypeOf(n, p.prototype), n;
        }),
          (p.prototype.readUintLE = p.prototype.readUIntLE =
            function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || N(t, e, this.length);
              for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
                n += this[t + o] * i;
              return n;
            }),
          (p.prototype.readUintBE = p.prototype.readUIntBE =
            function (t, e, r) {
              (t >>>= 0), (e >>>= 0), r || N(t, e, this.length);
              for (var n = this[t + --e], i = 1; e > 0 && (i *= 256); )
                n += this[t + --e] * i;
              return n;
            }),
          (p.prototype.readUint8 = p.prototype.readUInt8 =
            function (t, e) {
              return (t >>>= 0), e || N(t, 1, this.length), this[t];
            }),
          (p.prototype.readUint16LE = p.prototype.readUInt16LE =
            function (t, e) {
              return (
                (t >>>= 0),
                e || N(t, 2, this.length),
                this[t] | (this[t + 1] << 8)
              );
            }),
          (p.prototype.readUint16BE = p.prototype.readUInt16BE =
            function (t, e) {
              return (
                (t >>>= 0),
                e || N(t, 2, this.length),
                (this[t] << 8) | this[t + 1]
              );
            }),
          (p.prototype.readUint32LE = p.prototype.readUInt32LE =
            function (t, e) {
              return (
                (t >>>= 0),
                e || N(t, 4, this.length),
                (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                  16777216 * this[t + 3]
              );
            }),
          (p.prototype.readUint32BE = p.prototype.readUInt32BE =
            function (t, e) {
              return (
                (t >>>= 0),
                e || N(t, 4, this.length),
                16777216 * this[t] +
                  ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
              );
            }),
          (p.prototype.readBigUInt64LE = nt(function (t) {
            K((t >>>= 0), "offset");
            var e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || J(t, this.length - 8);
            var n =
                e +
                this[++t] * Math.pow(2, 8) +
                this[++t] * Math.pow(2, 16) +
                this[++t] * Math.pow(2, 24),
              i =
                this[++t] +
                this[++t] * Math.pow(2, 8) +
                this[++t] * Math.pow(2, 16) +
                r * Math.pow(2, 24);
            return BigInt(n) + (BigInt(i) << BigInt(32));
          })),
          (p.prototype.readBigUInt64BE = nt(function (t) {
            K((t >>>= 0), "offset");
            var e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || J(t, this.length - 8);
            var n =
                e * Math.pow(2, 24) +
                this[++t] * Math.pow(2, 16) +
                this[++t] * Math.pow(2, 8) +
                this[++t],
              i =
                this[++t] * Math.pow(2, 24) +
                this[++t] * Math.pow(2, 16) +
                this[++t] * Math.pow(2, 8) +
                r;
            return (BigInt(n) << BigInt(32)) + BigInt(i);
          })),
          (p.prototype.readIntLE = function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || N(t, e, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256); )
              n += this[t + o] * i;
            return n >= (i *= 128) && (n -= Math.pow(2, 8 * e)), n;
          }),
          (p.prototype.readIntBE = function (t, e, r) {
            (t >>>= 0), (e >>>= 0), r || N(t, e, this.length);
            for (var n = e, i = 1, o = this[t + --n]; n > 0 && (i *= 256); )
              o += this[t + --n] * i;
            return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o;
          }),
          (p.prototype.readInt8 = function (t, e) {
            return (
              (t >>>= 0),
              e || N(t, 1, this.length),
              128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
            );
          }),
          (p.prototype.readInt16LE = function (t, e) {
            (t >>>= 0), e || N(t, 2, this.length);
            var r = this[t] | (this[t + 1] << 8);
            return 32768 & r ? 4294901760 | r : r;
          }),
          (p.prototype.readInt16BE = function (t, e) {
            (t >>>= 0), e || N(t, 2, this.length);
            var r = this[t + 1] | (this[t] << 8);
            return 32768 & r ? 4294901760 | r : r;
          }),
          (p.prototype.readInt32LE = function (t, e) {
            return (
              (t >>>= 0),
              e || N(t, 4, this.length),
              this[t] |
                (this[t + 1] << 8) |
                (this[t + 2] << 16) |
                (this[t + 3] << 24)
            );
          }),
          (p.prototype.readInt32BE = function (t, e) {
            return (
              (t >>>= 0),
              e || N(t, 4, this.length),
              (this[t] << 24) |
                (this[t + 1] << 16) |
                (this[t + 2] << 8) |
                this[t + 3]
            );
          }),
          (p.prototype.readBigInt64LE = nt(function (t) {
            K((t >>>= 0), "offset");
            var e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || J(t, this.length - 8);
            var n =
              this[t + 4] +
              this[t + 5] * Math.pow(2, 8) +
              this[t + 6] * Math.pow(2, 16) +
              (r << 24);
            return (
              (BigInt(n) << BigInt(32)) +
              BigInt(
                e +
                  this[++t] * Math.pow(2, 8) +
                  this[++t] * Math.pow(2, 16) +
                  this[++t] * Math.pow(2, 24)
              )
            );
          })),
          (p.prototype.readBigInt64BE = nt(function (t) {
            K((t >>>= 0), "offset");
            var e = this[t],
              r = this[t + 7];
            (void 0 !== e && void 0 !== r) || J(t, this.length - 8);
            var n =
              (e << 24) +
              this[++t] * Math.pow(2, 16) +
              this[++t] * Math.pow(2, 8) +
              this[++t];
            return (
              (BigInt(n) << BigInt(32)) +
              BigInt(
                this[++t] * Math.pow(2, 24) +
                  this[++t] * Math.pow(2, 16) +
                  this[++t] * Math.pow(2, 8) +
                  r
              )
            );
          })),
          (p.prototype.readFloatLE = function (t, e) {
            return (
              (t >>>= 0), e || N(t, 4, this.length), c.read(this, t, !0, 23, 4)
            );
          }),
          (p.prototype.readFloatBE = function (t, e) {
            return (
              (t >>>= 0), e || N(t, 4, this.length), c.read(this, t, !1, 23, 4)
            );
          }),
          (p.prototype.readDoubleLE = function (t, e) {
            return (
              (t >>>= 0), e || N(t, 8, this.length), c.read(this, t, !0, 52, 8)
            );
          }),
          (p.prototype.readDoubleBE = function (t, e) {
            return (
              (t >>>= 0), e || N(t, 8, this.length), c.read(this, t, !1, 52, 8)
            );
          }),
          (p.prototype.writeUintLE = p.prototype.writeUIntLE =
            function (t, e, r, n) {
              (t = +t),
                (e >>>= 0),
                (r >>>= 0),
                n || M(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
              var i = 1,
                o = 0;
              for (this[e] = 255 & t; ++o < r && (i *= 256); )
                this[e + o] = (t / i) & 255;
              return e + r;
            }),
          (p.prototype.writeUintBE = p.prototype.writeUIntBE =
            function (t, e, r, n) {
              (t = +t),
                (e >>>= 0),
                (r >>>= 0),
                n || M(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
              var i = r - 1,
                o = 1;
              for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); )
                this[e + i] = (t / o) & 255;
              return e + r;
            }),
          (p.prototype.writeUint8 = p.prototype.writeUInt8 =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || M(this, t, e, 1, 255, 0),
                (this[e] = 255 & t),
                e + 1
              );
            }),
          (p.prototype.writeUint16LE = p.prototype.writeUInt16LE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || M(this, t, e, 2, 65535, 0),
                (this[e] = 255 & t),
                (this[e + 1] = t >>> 8),
                e + 2
              );
            }),
          (p.prototype.writeUint16BE = p.prototype.writeUInt16BE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || M(this, t, e, 2, 65535, 0),
                (this[e] = t >>> 8),
                (this[e + 1] = 255 & t),
                e + 2
              );
            }),
          (p.prototype.writeUint32LE = p.prototype.writeUInt32LE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || M(this, t, e, 4, 4294967295, 0),
                (this[e + 3] = t >>> 24),
                (this[e + 2] = t >>> 16),
                (this[e + 1] = t >>> 8),
                (this[e] = 255 & t),
                e + 4
              );
            }),
          (p.prototype.writeUint32BE = p.prototype.writeUInt32BE =
            function (t, e, r) {
              return (
                (t = +t),
                (e >>>= 0),
                r || M(this, t, e, 4, 4294967295, 0),
                (this[e] = t >>> 24),
                (this[e + 1] = t >>> 16),
                (this[e + 2] = t >>> 8),
                (this[e + 3] = 255 & t),
                e + 4
              );
            }),
          (p.prototype.writeBigUInt64LE = nt(function (t) {
            return F(
              this,
              t,
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
              BigInt(0),
              BigInt("0xffffffffffffffff")
            );
          })),
          (p.prototype.writeBigUInt64BE = nt(function (t) {
            return G(
              this,
              t,
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
              BigInt(0),
              BigInt("0xffffffffffffffff")
            );
          })),
          (p.prototype.writeIntLE = function (t, e, r, n) {
            if (((t = +t), (e >>>= 0), !n)) {
              var i = Math.pow(2, 8 * r - 1);
              M(this, t, e, r, i - 1, -i);
            }
            var o = 0,
              a = 1,
              s = 0;
            for (this[e] = 255 & t; ++o < r && (a *= 256); )
              t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1),
                (this[e + o] = (((t / a) >> 0) - s) & 255);
            return e + r;
          }),
          (p.prototype.writeIntBE = function (t, e, r, n) {
            if (((t = +t), (e >>>= 0), !n)) {
              var i = Math.pow(2, 8 * r - 1);
              M(this, t, e, r, i - 1, -i);
            }
            var o = r - 1,
              a = 1,
              s = 0;
            for (this[e + o] = 255 & t; --o >= 0 && (a *= 256); )
              t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1),
                (this[e + o] = (((t / a) >> 0) - s) & 255);
            return e + r;
          }),
          (p.prototype.writeInt8 = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || M(this, t, e, 1, 127, -128),
              t < 0 && (t = 255 + t + 1),
              (this[e] = 255 & t),
              e + 1
            );
          }),
          (p.prototype.writeInt16LE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || M(this, t, e, 2, 32767, -32768),
              (this[e] = 255 & t),
              (this[e + 1] = t >>> 8),
              e + 2
            );
          }),
          (p.prototype.writeInt16BE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || M(this, t, e, 2, 32767, -32768),
              (this[e] = t >>> 8),
              (this[e + 1] = 255 & t),
              e + 2
            );
          }),
          (p.prototype.writeInt32LE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || M(this, t, e, 4, 2147483647, -2147483648),
              (this[e] = 255 & t),
              (this[e + 1] = t >>> 8),
              (this[e + 2] = t >>> 16),
              (this[e + 3] = t >>> 24),
              e + 4
            );
          }),
          (p.prototype.writeInt32BE = function (t, e, r) {
            return (
              (t = +t),
              (e >>>= 0),
              r || M(this, t, e, 4, 2147483647, -2147483648),
              t < 0 && (t = 4294967295 + t + 1),
              (this[e] = t >>> 24),
              (this[e + 1] = t >>> 16),
              (this[e + 2] = t >>> 8),
              (this[e + 3] = 255 & t),
              e + 4
            );
          }),
          (p.prototype.writeBigInt64LE = nt(function (t) {
            return F(
              this,
              t,
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
              -BigInt("0x8000000000000000"),
              BigInt("0x7fffffffffffffff")
            );
          })),
          (p.prototype.writeBigInt64BE = nt(function (t) {
            return G(
              this,
              t,
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
              -BigInt("0x8000000000000000"),
              BigInt("0x7fffffffffffffff")
            );
          })),
          (p.prototype.writeFloatLE = function (t, e, r) {
            return D(this, t, e, !0, r);
          }),
          (p.prototype.writeFloatBE = function (t, e, r) {
            return D(this, t, e, !1, r);
          }),
          (p.prototype.writeDoubleLE = function (t, e, r) {
            return W(this, t, e, !0, r);
          }),
          (p.prototype.writeDoubleBE = function (t, e, r) {
            return W(this, t, e, !1, r);
          }),
          (p.prototype.copy = function (t, e, r, n) {
            if (!p.isBuffer(t))
              throw new TypeError("argument should be a Buffer");
            if (
              (r || (r = 0),
              n || 0 === n || (n = this.length),
              e >= t.length && (e = t.length),
              e || (e = 0),
              n > 0 && n < r && (n = r),
              n === r)
            )
              return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (e < 0) throw new RangeError("targetStart out of bounds");
            if (r < 0 || r >= this.length)
              throw new RangeError("Index out of range");
            if (n < 0) throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length),
              t.length - e < n - r && (n = t.length - e + r);
            var i = n - r;
            return (
              this === t && "function" == typeof Uint8Array.prototype.copyWithin
                ? this.copyWithin(e, r, n)
                : Uint8Array.prototype.set.call(t, this.subarray(r, n), e),
              i
            );
          }),
          (p.prototype.fill = function (t, e, r, n) {
            if ("string" == typeof t) {
              if (
                ("string" == typeof e
                  ? ((n = e), (e = 0), (r = this.length))
                  : "string" == typeof r && ((n = r), (r = this.length)),
                void 0 !== n && "string" != typeof n)
              )
                throw new TypeError("encoding must be a string");
              if ("string" == typeof n && !p.isEncoding(n))
                throw new TypeError("Unknown encoding: " + n);
              if (1 === t.length) {
                var i = t.charCodeAt(0);
                (("utf8" === n && i < 128) || "latin1" === n) && (t = i);
              }
            } else
              "number" == typeof t
                ? (t &= 255)
                : "boolean" == typeof t && (t = Number(t));
            if (e < 0 || this.length < e || this.length < r)
              throw new RangeError("Out of range index");
            if (r <= e) return this;
            var o;
            if (
              ((e >>>= 0),
              (r = void 0 === r ? this.length : r >>> 0),
              t || (t = 0),
              "number" == typeof t)
            )
              for (o = e; o < r; ++o) this[o] = t;
            else {
              var a = p.isBuffer(t) ? t : p.from(t, n),
                s = a.length;
              if (0 === s)
                throw new TypeError(
                  'The value "' + t + '" is invalid for argument "value"'
                );
              for (o = 0; o < r - e; ++o) this[o + e] = a[o % s];
            }
            return this;
          });
        var Y = {};
        function V(t, e, r) {
          Y[t] = (function (r) {
            !(function (t, e) {
              if ("function" != typeof e && null !== e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (t.prototype = Object.create(e && e.prototype, {
                constructor: { value: t, writable: !0, configurable: !0 },
              })),
                Object.defineProperty(t, "prototype", { writable: !1 }),
                e && i(t, e);
            })(p, r);
            var u,
              c,
              f,
              h,
              l =
                ((f = p),
                (h = (function () {
                  if ("undefined" == typeof Reflect || !Reflect.construct)
                    return !1;
                  if (Reflect.construct.sham) return !1;
                  if ("function" == typeof Proxy) return !0;
                  try {
                    return (
                      Boolean.prototype.valueOf.call(
                        Reflect.construct(Boolean, [], function () {})
                      ),
                      !0
                    );
                  } catch (t) {
                    return !1;
                  }
                })()),
                function () {
                  var t,
                    e = a(f);
                  if (h) {
                    var r = a(this).constructor;
                    t = Reflect.construct(e, arguments, r);
                  } else t = e.apply(this, arguments);
                  return (function (t, e) {
                    if (e && ("object" === s(e) || "function" == typeof e))
                      return e;
                    if (void 0 !== e)
                      throw new TypeError(
                        "Derived constructors may only return object or undefined"
                      );
                    return o(t);
                  })(this, t);
                });
            function p() {
              var r;
              return (
                (function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError("Cannot call a class as a function");
                })(this, p),
                (r = l.call(this)),
                Object.defineProperty(o(r), "message", {
                  value: e.apply(o(r), arguments),
                  writable: !0,
                  configurable: !0,
                }),
                (r.name = "".concat(r.name, " [").concat(t, "]")),
                r.stack,
                delete r.name,
                r
              );
            }
            return (
              (u = p),
              (c = [
                {
                  key: "code",
                  get: function () {
                    return t;
                  },
                  set: function (t) {
                    Object.defineProperty(this, "code", {
                      configurable: !0,
                      enumerable: !0,
                      value: t,
                      writable: !0,
                    });
                  },
                },
                {
                  key: "toString",
                  value: function () {
                    return ""
                      .concat(this.name, " [")
                      .concat(t, "]: ")
                      .concat(this.message);
                  },
                },
              ]) && n(u.prototype, c),
              Object.defineProperty(u, "prototype", { writable: !1 }),
              p
            );
          })(r);
        }
        function q(t) {
          for (
            var e = "", r = t.length, n = "-" === t[0] ? 1 : 0;
            r >= n + 4;
            r -= 3
          )
            e = "_".concat(t.slice(r - 3, r)).concat(e);
          return "".concat(t.slice(0, r)).concat(e);
        }
        function H(t, e, r, n, i, o) {
          if (t > r || t < e) {
            var a,
              s = "bigint" == typeof e ? "n" : "";
            throw (
              ((a =
                o > 3
                  ? 0 === e || e === BigInt(0)
                    ? ">= 0"
                        .concat(s, " and < 2")
                        .concat(s, " ** ")
                        .concat(8 * (o + 1))
                        .concat(s)
                    : ">= -(2"
                        .concat(s, " ** ")
                        .concat(8 * (o + 1) - 1)
                        .concat(s, ") and < 2 ** ") +
                      "".concat(8 * (o + 1) - 1).concat(s)
                  : ">= ".concat(e).concat(s, " and <= ").concat(r).concat(s)),
              new Y.ERR_OUT_OF_RANGE("value", a, t))
            );
          }
          !(function (t, e, r) {
            K(e, "offset"),
              (void 0 !== t[e] && void 0 !== t[e + r]) ||
                J(e, t.length - (r + 1));
          })(n, i, o);
        }
        function K(t, e) {
          if ("number" != typeof t)
            throw new Y.ERR_INVALID_ARG_TYPE(e, "number", t);
        }
        function J(t, e, r) {
          if (Math.floor(t) !== t)
            throw (
              (K(t, r), new Y.ERR_OUT_OF_RANGE(r || "offset", "an integer", t))
            );
          if (e < 0) throw new Y.ERR_BUFFER_OUT_OF_BOUNDS();
          throw new Y.ERR_OUT_OF_RANGE(
            r || "offset",
            ">= ".concat(r ? 1 : 0, " and <= ").concat(e),
            t
          );
        }
        V(
          "ERR_BUFFER_OUT_OF_BOUNDS",
          function (t) {
            return t
              ? "".concat(t, " is outside of buffer bounds")
              : "Attempt to access memory outside buffer bounds";
          },
          RangeError
        ),
          V(
            "ERR_INVALID_ARG_TYPE",
            function (t, e) {
              return 'The "'
                .concat(t, '" argument must be of type number. Received type ')
                .concat(s(e));
            },
            TypeError
          ),
          V(
            "ERR_OUT_OF_RANGE",
            function (t, e, r) {
              var n = 'The value of "'.concat(t, '" is out of range.'),
                i = r;
              return (
                Number.isInteger(r) && Math.abs(r) > Math.pow(2, 32)
                  ? (i = q(String(r)))
                  : "bigint" == typeof r &&
                    ((i = String(r)),
                    (r > Math.pow(BigInt(2), BigInt(32)) ||
                      r < -Math.pow(BigInt(2), BigInt(32))) &&
                      (i = q(i)),
                    (i += "n")),
                n + " It must be ".concat(e, ". Received ").concat(i)
              );
            },
            RangeError
          );
        var X = /[^+/0-9A-Za-z-_]/g;
        function $(t, e) {
          var r;
          e = e || 1 / 0;
          for (var n = t.length, i = null, o = [], a = 0; a < n; ++a) {
            if ((r = t.charCodeAt(a)) > 55295 && r < 57344) {
              if (!i) {
                if (r > 56319) {
                  (e -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                if (a + 1 === n) {
                  (e -= 3) > -1 && o.push(239, 191, 189);
                  continue;
                }
                i = r;
                continue;
              }
              if (r < 56320) {
                (e -= 3) > -1 && o.push(239, 191, 189), (i = r);
                continue;
              }
              r = 65536 + (((i - 55296) << 10) | (r - 56320));
            } else i && (e -= 3) > -1 && o.push(239, 191, 189);
            if (((i = null), r < 128)) {
              if ((e -= 1) < 0) break;
              o.push(r);
            } else if (r < 2048) {
              if ((e -= 2) < 0) break;
              o.push((r >> 6) | 192, (63 & r) | 128);
            } else if (r < 65536) {
              if ((e -= 3) < 0) break;
              o.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
            } else {
              if (!(r < 1114112)) throw new Error("Invalid code point");
              if ((e -= 4) < 0) break;
              o.push(
                (r >> 18) | 240,
                ((r >> 12) & 63) | 128,
                ((r >> 6) & 63) | 128,
                (63 & r) | 128
              );
            }
          }
          return o;
        }
        function Q(t) {
          return u.toByteArray(
            (function (t) {
              if ((t = (t = t.split("=")[0]).trim().replace(X, "")).length < 2)
                return "";
              for (; t.length % 4 != 0; ) t += "=";
              return t;
            })(t)
          );
        }
        function Z(t, e, r, n) {
          var i;
          for (i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i)
            e[i + r] = t[i];
          return i;
        }
        function tt(t, e) {
          return (
            t instanceof e ||
            (null != t &&
              null != t.constructor &&
              null != t.constructor.name &&
              t.constructor.name === e.name)
          );
        }
        function et(t) {
          return t != t;
        }
        var rt = (function () {
          for (
            var t = "0123456789abcdef", e = new Array(256), r = 0;
            r < 16;
            ++r
          )
            for (var n = 16 * r, i = 0; i < 16; ++i) e[n + i] = t[r] + t[i];
          return e;
        })();
        function nt(t) {
          return "undefined" == typeof BigInt ? it : t;
        }
        function it() {
          throw new Error("BigInt not supported");
        }
      },
      226: (t, e) => {
        (e.read = function (t, e, r, n, i) {
          var o,
            a,
            s = 8 * i - n - 1,
            u = (1 << s) - 1,
            c = u >> 1,
            f = -7,
            h = r ? i - 1 : 0,
            l = r ? -1 : 1,
            p = t[e + h];
          for (
            h += l, o = p & ((1 << -f) - 1), p >>= -f, f += s;
            f > 0;
            o = 256 * o + t[e + h], h += l, f -= 8
          );
          for (
            a = o & ((1 << -f) - 1), o >>= -f, f += n;
            f > 0;
            a = 256 * a + t[e + h], h += l, f -= 8
          );
          if (0 === o) o = 1 - c;
          else {
            if (o === u) return a ? NaN : (1 / 0) * (p ? -1 : 1);
            (a += Math.pow(2, n)), (o -= c);
          }
          return (p ? -1 : 1) * a * Math.pow(2, o - n);
        }),
          (e.write = function (t, e, r, n, i, o) {
            var a,
              s,
              u,
              c = 8 * o - i - 1,
              f = (1 << c) - 1,
              h = f >> 1,
              l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              p = n ? 0 : o - 1,
              d = n ? 1 : -1,
              y = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
            for (
              e = Math.abs(e),
                isNaN(e) || e === 1 / 0
                  ? ((s = isNaN(e) ? 1 : 0), (a = f))
                  : ((a = Math.floor(Math.log(e) / Math.LN2)),
                    e * (u = Math.pow(2, -a)) < 1 && (a--, (u *= 2)),
                    (e += a + h >= 1 ? l / u : l * Math.pow(2, 1 - h)) * u >=
                      2 && (a++, (u /= 2)),
                    a + h >= f
                      ? ((s = 0), (a = f))
                      : a + h >= 1
                      ? ((s = (e * u - 1) * Math.pow(2, i)), (a += h))
                      : ((s = e * Math.pow(2, h - 1) * Math.pow(2, i)),
                        (a = 0)));
              i >= 8;
              t[r + p] = 255 & s, p += d, s /= 256, i -= 8
            );
            for (
              a = (a << i) | s, c += i;
              c > 0;
              t[r + p] = 255 & a, p += d, a /= 256, c -= 8
            );
            t[r + p - d] |= 128 * y;
          });
      },
      670: (t) => {
        function e(t) {
          return (
            (e =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            e(t)
          );
        }
        t.exports = function () {
          return (
            ("undefined" != typeof window &&
              "object" === e(window.process) &&
              "renderer" === window.process.type) ||
            !(
              "undefined" == typeof process ||
              "object" !== e(process.versions) ||
              !process.versions.electron
            ) ||
            ("object" ===
              ("undefined" == typeof navigator ? "undefined" : e(navigator)) &&
              "string" == typeof navigator.userAgent &&
              navigator.userAgent.indexOf("Electron") >= 0)
          );
        };
      },
      975: (t) => {
        t.exports = function (t) {
          if ("string" != typeof t) return !1;
          var i = t.match(e);
          if (!i) return !1;
          var o = i[1];
          return !!o && !(!r.test(o) && !n.test(o));
        };
        var e = /^(?:\w+:)?\/\/(\S+)$/,
          r = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/,
          n = /^[^\s\.]+\.\S{2,}$/;
      },
      760: (t, e, r) => {
        function n(t) {
          return (
            (n =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            n(t)
          );
        }
        var i = (function (t) {
          "use strict";
          var e,
            r = Object.prototype,
            i = r.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (t, e, r) {
                t[e] = r.value;
              },
            a = "function" == typeof Symbol ? Symbol : {},
            s = a.iterator || "@@iterator",
            u = a.asyncIterator || "@@asyncIterator",
            c = a.toStringTag || "@@toStringTag";
          function f(t, e, r) {
            return (
              Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            f({}, "");
          } catch (t) {
            f = function (t, e, r) {
              return (t[e] = r);
            };
          }
          function h(t, e, r, n) {
            var i = e && e.prototype instanceof b ? e : b,
              a = Object.create(i.prototype),
              s = new j(n || []);
            return o(a, "_invoke", { value: I(t, r, s) }), a;
          }
          function l(t, e, r) {
            try {
              return { type: "normal", arg: t.call(e, r) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          t.wrap = h;
          var p = "suspendedStart",
            d = "suspendedYield",
            y = "executing",
            g = "completed",
            v = {};
          function b() {}
          function w() {}
          function m() {}
          var E = {};
          f(E, s, function () {
            return this;
          });
          var x = Object.getPrototypeOf,
            A = x && x(x(B([])));
          A && A !== r && i.call(A, s) && (E = A);
          var k = (m.prototype = b.prototype = Object.create(E));
          function _(t) {
            ["next", "throw", "return"].forEach(function (e) {
              f(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function O(t, e) {
            function r(o, a, s, u) {
              var c = l(t[o], t, a);
              if ("throw" !== c.type) {
                var f = c.arg,
                  h = f.value;
                return h && "object" === n(h) && i.call(h, "__await")
                  ? e.resolve(h.__await).then(
                      function (t) {
                        r("next", t, s, u);
                      },
                      function (t) {
                        r("throw", t, s, u);
                      }
                    )
                  : e.resolve(h).then(
                      function (t) {
                        (f.value = t), s(f);
                      },
                      function (t) {
                        return r("throw", t, s, u);
                      }
                    );
              }
              u(c.arg);
            }
            var a;
            o(this, "_invoke", {
              value: function (t, n) {
                function i() {
                  return new e(function (e, i) {
                    r(t, n, e, i);
                  });
                }
                return (a = a ? a.then(i, i) : i());
              },
            });
          }
          function I(t, e, r) {
            var n = p;
            return function (i, o) {
              if (n === y) throw new Error("Generator is already running");
              if (n === g) {
                if ("throw" === i) throw o;
                return T();
              }
              for (r.method = i, r.arg = o; ; ) {
                var a = r.delegate;
                if (a) {
                  var s = S(a, r);
                  if (s) {
                    if (s === v) continue;
                    return s;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if (n === p) throw ((n = g), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = y;
                var u = l(t, e, r);
                if ("normal" === u.type) {
                  if (((n = r.done ? g : d), u.arg === v)) continue;
                  return { value: u.arg, done: r.done };
                }
                "throw" === u.type &&
                  ((n = g), (r.method = "throw"), (r.arg = u.arg));
              }
            };
          }
          function S(t, r) {
            var n = r.method,
              i = t.iterator[n];
            if (i === e)
              return (
                (r.delegate = null),
                ("throw" === n &&
                  t.iterator.return &&
                  ((r.method = "return"),
                  (r.arg = e),
                  S(t, r),
                  "throw" === r.method)) ||
                  ("return" !== n &&
                    ((r.method = "throw"),
                    (r.arg = new TypeError(
                      "The iterator does not provide a '" + n + "' method"
                    )))),
                v
              );
            var o = l(i, t.iterator, r.arg);
            if ("throw" === o.type)
              return (
                (r.method = "throw"), (r.arg = o.arg), (r.delegate = null), v
              );
            var a = o.arg;
            return a
              ? a.done
                ? ((r[t.resultName] = a.value),
                  (r.next = t.nextLoc),
                  "return" !== r.method && ((r.method = "next"), (r.arg = e)),
                  (r.delegate = null),
                  v)
                : a
              : ((r.method = "throw"),
                (r.arg = new TypeError("iterator result is not an object")),
                (r.delegate = null),
                v);
          }
          function L(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function U(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function j(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(L, this),
              this.reset(!0);
          }
          function B(t) {
            if (t) {
              var r = t[s];
              if (r) return r.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var n = -1,
                  o = function r() {
                    for (; ++n < t.length; )
                      if (i.call(t, n))
                        return (r.value = t[n]), (r.done = !1), r;
                    return (r.value = e), (r.done = !0), r;
                  };
                return (o.next = o);
              }
            }
            return { next: T };
          }
          function T() {
            return { value: e, done: !0 };
          }
          return (
            (w.prototype = m),
            o(k, "constructor", { value: m, configurable: !0 }),
            o(m, "constructor", { value: w, configurable: !0 }),
            (w.displayName = f(m, c, "GeneratorFunction")),
            (t.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === w || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (t.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, m)
                  : ((t.__proto__ = m), f(t, c, "GeneratorFunction")),
                (t.prototype = Object.create(k)),
                t
              );
            }),
            (t.awrap = function (t) {
              return { __await: t };
            }),
            _(O.prototype),
            f(O.prototype, u, function () {
              return this;
            }),
            (t.AsyncIterator = O),
            (t.async = function (e, r, n, i, o) {
              void 0 === o && (o = Promise);
              var a = new O(h(e, r, n, i), o);
              return t.isGeneratorFunction(r)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            _(k),
            f(k, c, "Generator"),
            f(k, s, function () {
              return this;
            }),
            f(k, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (t) {
              var e = Object(t),
                r = [];
              for (var n in e) r.push(n);
              return (
                r.reverse(),
                function t() {
                  for (; r.length; ) {
                    var n = r.pop();
                    if (n in e) return (t.value = n), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (t.values = B),
            (j.prototype = {
              constructor: j,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = e),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = e),
                  this.tryEntries.forEach(U),
                  !t)
                )
                  for (var r in this)
                    "t" === r.charAt(0) &&
                      i.call(this, r) &&
                      !isNaN(+r.slice(1)) &&
                      (this[r] = e);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var r = this;
                function n(n, i) {
                  return (
                    (s.type = "throw"),
                    (s.arg = t),
                    (r.next = n),
                    i && ((r.method = "next"), (r.arg = e)),
                    !!i
                  );
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                  var a = this.tryEntries[o],
                    s = a.completion;
                  if ("root" === a.tryLoc) return n("end");
                  if (a.tryLoc <= this.prev) {
                    var u = i.call(a, "catchLoc"),
                      c = i.call(a, "finallyLoc");
                    if (u && c) {
                      if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                      if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                    } else if (u) {
                      if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                    } else {
                      if (!c)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var n = this.tryEntries[r];
                  if (
                    n.tryLoc <= this.prev &&
                    i.call(n, "finallyLoc") &&
                    this.prev < n.finallyLoc
                  ) {
                    var o = n;
                    break;
                  }
                }
                o &&
                  ("break" === t || "continue" === t) &&
                  o.tryLoc <= e &&
                  e <= o.finallyLoc &&
                  (o = null);
                var a = o ? o.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  o
                    ? ((this.method = "next"), (this.next = o.finallyLoc), v)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  v
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.finallyLoc === t)
                    return this.complete(r.completion, r.afterLoc), U(r), v;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.tryLoc === t) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var i = n.arg;
                      U(r);
                    }
                    return i;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, r, n) {
                return (
                  (this.delegate = {
                    iterator: B(t),
                    resultName: r,
                    nextLoc: n,
                  }),
                  "next" === this.method && (this.arg = e),
                  v
                );
              },
            }),
            t
          );
        })("object" === n((t = r.nmd(t))) ? t.exports : {});
        try {
          regeneratorRuntime = i;
        } catch (t) {
          "object" ===
          ("undefined" == typeof globalThis ? "undefined" : n(globalThis))
            ? (globalThis.regeneratorRuntime = i)
            : Function("r", "regeneratorRuntime = r")(i);
        }
      },
      506: (t, e, r) => {
        "use strict";
        function n(t) {
          return (
            (n =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            n(t)
          );
        }
        function i() {
          i = function () {
            return t;
          };
          var t = {},
            e = Object.prototype,
            r = e.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (t, e, r) {
                t[e] = r.value;
              },
            a = "function" == typeof Symbol ? Symbol : {},
            s = a.iterator || "@@iterator",
            u = a.asyncIterator || "@@asyncIterator",
            c = a.toStringTag || "@@toStringTag";
          function f(t, e, r) {
            return (
              Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            f({}, "");
          } catch (t) {
            f = function (t, e, r) {
              return (t[e] = r);
            };
          }
          function h(t, e, r, n) {
            var i = e && e.prototype instanceof d ? e : d,
              a = Object.create(i.prototype),
              s = new I(n || []);
            return o(a, "_invoke", { value: A(t, r, s) }), a;
          }
          function l(t, e, r) {
            try {
              return { type: "normal", arg: t.call(e, r) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          t.wrap = h;
          var p = {};
          function d() {}
          function y() {}
          function g() {}
          var v = {};
          f(v, s, function () {
            return this;
          });
          var b = Object.getPrototypeOf,
            w = b && b(b(S([])));
          w && w !== e && r.call(w, s) && (v = w);
          var m = (g.prototype = d.prototype = Object.create(v));
          function E(t) {
            ["next", "throw", "return"].forEach(function (e) {
              f(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function x(t, e) {
            function i(o, a, s, u) {
              var c = l(t[o], t, a);
              if ("throw" !== c.type) {
                var f = c.arg,
                  h = f.value;
                return h && "object" == n(h) && r.call(h, "__await")
                  ? e.resolve(h.__await).then(
                      function (t) {
                        i("next", t, s, u);
                      },
                      function (t) {
                        i("throw", t, s, u);
                      }
                    )
                  : e.resolve(h).then(
                      function (t) {
                        (f.value = t), s(f);
                      },
                      function (t) {
                        return i("throw", t, s, u);
                      }
                    );
              }
              u(c.arg);
            }
            var a;
            o(this, "_invoke", {
              value: function (t, r) {
                function n() {
                  return new e(function (e, n) {
                    i(t, r, e, n);
                  });
                }
                return (a = a ? a.then(n, n) : n());
              },
            });
          }
          function A(t, e, r) {
            var n = "suspendedStart";
            return function (i, o) {
              if ("executing" === n)
                throw new Error("Generator is already running");
              if ("completed" === n) {
                if ("throw" === i) throw o;
                return { value: void 0, done: !0 };
              }
              for (r.method = i, r.arg = o; ; ) {
                var a = r.delegate;
                if (a) {
                  var s = k(a, r);
                  if (s) {
                    if (s === p) continue;
                    return s;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = "executing";
                var u = l(t, e, r);
                if ("normal" === u.type) {
                  if (
                    ((n = r.done ? "completed" : "suspendedYield"), u.arg === p)
                  )
                    continue;
                  return { value: u.arg, done: r.done };
                }
                "throw" === u.type &&
                  ((n = "completed"), (r.method = "throw"), (r.arg = u.arg));
              }
            };
          }
          function k(t, e) {
            var r = e.method,
              n = t.iterator[r];
            if (void 0 === n)
              return (
                (e.delegate = null),
                ("throw" === r &&
                  t.iterator.return &&
                  ((e.method = "return"),
                  (e.arg = void 0),
                  k(t, e),
                  "throw" === e.method)) ||
                  ("return" !== r &&
                    ((e.method = "throw"),
                    (e.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                p
              );
            var i = l(n, t.iterator, e.arg);
            if ("throw" === i.type)
              return (
                (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), p
              );
            var o = i.arg;
            return o
              ? o.done
                ? ((e[t.resultName] = o.value),
                  (e.next = t.nextLoc),
                  "return" !== e.method &&
                    ((e.method = "next"), (e.arg = void 0)),
                  (e.delegate = null),
                  p)
                : o
              : ((e.method = "throw"),
                (e.arg = new TypeError("iterator result is not an object")),
                (e.delegate = null),
                p);
          }
          function _(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function O(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function I(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(_, this),
              this.reset(!0);
          }
          function S(t) {
            if (t) {
              var e = t[s];
              if (e) return e.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var n = -1,
                  i = function e() {
                    for (; ++n < t.length; )
                      if (r.call(t, n))
                        return (e.value = t[n]), (e.done = !1), e;
                    return (e.value = void 0), (e.done = !0), e;
                  };
                return (i.next = i);
              }
            }
            return { next: L };
          }
          function L() {
            return { value: void 0, done: !0 };
          }
          return (
            (y.prototype = g),
            o(m, "constructor", { value: g, configurable: !0 }),
            o(g, "constructor", { value: y, configurable: !0 }),
            (y.displayName = f(g, c, "GeneratorFunction")),
            (t.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === y || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (t.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, g)
                  : ((t.__proto__ = g), f(t, c, "GeneratorFunction")),
                (t.prototype = Object.create(m)),
                t
              );
            }),
            (t.awrap = function (t) {
              return { __await: t };
            }),
            E(x.prototype),
            f(x.prototype, u, function () {
              return this;
            }),
            (t.AsyncIterator = x),
            (t.async = function (e, r, n, i, o) {
              void 0 === o && (o = Promise);
              var a = new x(h(e, r, n, i), o);
              return t.isGeneratorFunction(r)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            E(m),
            f(m, c, "Generator"),
            f(m, s, function () {
              return this;
            }),
            f(m, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (t) {
              var e = Object(t),
                r = [];
              for (var n in e) r.push(n);
              return (
                r.reverse(),
                function t() {
                  for (; r.length; ) {
                    var n = r.pop();
                    if (n in e) return (t.value = n), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (t.values = S),
            (I.prototype = {
              constructor: I,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = void 0),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = void 0),
                  this.tryEntries.forEach(O),
                  !t)
                )
                  for (var e in this)
                    "t" === e.charAt(0) &&
                      r.call(this, e) &&
                      !isNaN(+e.slice(1)) &&
                      (this[e] = void 0);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var e = this;
                function n(r, n) {
                  return (
                    (a.type = "throw"),
                    (a.arg = t),
                    (e.next = r),
                    n && ((e.method = "next"), (e.arg = void 0)),
                    !!n
                  );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var o = this.tryEntries[i],
                    a = o.completion;
                  if ("root" === o.tryLoc) return n("end");
                  if (o.tryLoc <= this.prev) {
                    var s = r.call(o, "catchLoc"),
                      u = r.call(o, "finallyLoc");
                    if (s && u) {
                      if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                    } else if (s) {
                      if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                    } else {
                      if (!u)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var i = this.tryEntries[n];
                  if (
                    i.tryLoc <= this.prev &&
                    r.call(i, "finallyLoc") &&
                    this.prev < i.finallyLoc
                  ) {
                    var o = i;
                    break;
                  }
                }
                o &&
                  ("break" === t || "continue" === t) &&
                  o.tryLoc <= e &&
                  e <= o.finallyLoc &&
                  (o = null);
                var a = o ? o.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  o
                    ? ((this.method = "next"), (this.next = o.finallyLoc), p)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  p
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.finallyLoc === t)
                    return this.complete(r.completion, r.afterLoc), O(r), p;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.tryLoc === t) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var i = n.arg;
                      O(r);
                    }
                    return i;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, e, r) {
                return (
                  (this.delegate = {
                    iterator: S(t),
                    resultName: e,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = void 0),
                  p
                );
              },
            }),
            t
          );
        }
        function o(t, e, r, n, i, o, a) {
          try {
            var s = t[o](a),
              u = s.value;
          } catch (t) {
            return void r(t);
          }
          s.done ? e(u) : Promise.resolve(u).then(n, i);
        }
        function a(t) {
          return function () {
            var e = this,
              r = arguments;
            return new Promise(function (n, i) {
              var a = t.apply(e, r);
              function s(t) {
                o(a, n, i, s, u, "next", t);
              }
              function u(t) {
                o(a, n, i, s, u, "throw", t);
              }
              s(void 0);
            });
          };
        }
        r.r(e),
          r.d(e, {
            bigInt: () => s,
            bulkMemory: () => u,
            exceptions: () => c,
            multiValue: () => f,
            mutableGlobals: () => h,
            referenceTypes: () => l,
            saturatedFloatToInt: () => p,
            signExtensions: () => d,
            simd: () => y,
            tailCall: () => g,
            threads: () => v,
          });
        var s = function () {
            return ((t = a(
              i().mark(function t(e) {
                return i().wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.prev = 0),
                            (t.next = 3),
                            WebAssembly.instantiate(e)
                          );
                        case 3:
                          return (
                            (t.t0 = t.sent.instance.exports.b(BigInt(0))),
                            (t.t1 = BigInt(0)),
                            t.abrupt("return", t.t0 === t.t1)
                          );
                        case 8:
                          return (
                            (t.prev = 8),
                            (t.t2 = t.catch(0)),
                            t.abrupt("return", !1)
                          );
                        case 11:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[0, 8]]
                );
              })
            )),
            function (e) {
              return t.apply(this, arguments);
            })(
              new Uint8Array([
                0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 1, 126, 1, 126, 3, 2,
                1, 0, 7, 5, 1, 1, 98, 0, 0, 10, 6, 1, 4, 0, 32, 0, 11,
              ])
            );
            var t;
          },
          u = (function () {
            var t = a(
              i().mark(function t() {
                return i().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return t.abrupt(
                          "return",
                          WebAssembly.validate(
                            new Uint8Array([
                              0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3,
                              2, 1, 0, 5, 3, 1, 0, 1, 10, 14, 1, 12, 0, 65, 0,
                              65, 0, 65, 0, 252, 10, 0, 0, 11,
                            ])
                          )
                        );
                      case 1:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function () {
              return t.apply(this, arguments);
            };
          })(),
          c = (function () {
            var t = a(
              i().mark(function t() {
                return i().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return t.abrupt(
                          "return",
                          WebAssembly.validate(
                            new Uint8Array([
                              0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3,
                              2, 1, 0, 10, 8, 1, 6, 0, 6, 64, 25, 11, 11,
                            ])
                          )
                        );
                      case 1:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function () {
              return t.apply(this, arguments);
            };
          })(),
          f = (function () {
            var t = a(
              i().mark(function t() {
                return i().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return t.abrupt(
                          "return",
                          WebAssembly.validate(
                            new Uint8Array([
                              0, 97, 115, 109, 1, 0, 0, 0, 1, 6, 1, 96, 0, 2,
                              127, 127, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 65,
                              0, 11,
                            ])
                          )
                        );
                      case 1:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function () {
              return t.apply(this, arguments);
            };
          })(),
          h = (function () {
            var t = a(
              i().mark(function t() {
                return i().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return t.abrupt(
                          "return",
                          WebAssembly.validate(
                            new Uint8Array([
                              0, 97, 115, 109, 1, 0, 0, 0, 2, 8, 1, 1, 97, 1,
                              98, 3, 127, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 5,
                              1, 1, 97, 3, 1,
                            ])
                          )
                        );
                      case 1:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function () {
              return t.apply(this, arguments);
            };
          })(),
          l = (function () {
            var t = a(
              i().mark(function t() {
                return i().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return t.abrupt(
                          "return",
                          WebAssembly.validate(
                            new Uint8Array([
                              0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3,
                              2, 1, 0, 10, 7, 1, 5, 0, 208, 112, 26, 11,
                            ])
                          )
                        );
                      case 1:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function () {
              return t.apply(this, arguments);
            };
          })(),
          p = (function () {
            var t = a(
              i().mark(function t() {
                return i().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return t.abrupt(
                          "return",
                          WebAssembly.validate(
                            new Uint8Array([
                              0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3,
                              2, 1, 0, 10, 12, 1, 10, 0, 67, 0, 0, 0, 0, 252, 0,
                              26, 11,
                            ])
                          )
                        );
                      case 1:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function () {
              return t.apply(this, arguments);
            };
          })(),
          d = (function () {
            var t = a(
              i().mark(function t() {
                return i().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return t.abrupt(
                          "return",
                          WebAssembly.validate(
                            new Uint8Array([
                              0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3,
                              2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 192, 26, 11,
                            ])
                          )
                        );
                      case 1:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function () {
              return t.apply(this, arguments);
            };
          })(),
          y = (function () {
            var t = a(
              i().mark(function t() {
                return i().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return t.abrupt(
                          "return",
                          WebAssembly.validate(
                            new Uint8Array([
                              0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1,
                              123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15,
                              253, 98, 11,
                            ])
                          )
                        );
                      case 1:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function () {
              return t.apply(this, arguments);
            };
          })(),
          g = (function () {
            var t = a(
              i().mark(function t() {
                return i().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return t.abrupt(
                          "return",
                          WebAssembly.validate(
                            new Uint8Array([
                              0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3,
                              2, 1, 0, 10, 6, 1, 4, 0, 18, 0, 11,
                            ])
                          )
                        );
                      case 1:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function () {
              return t.apply(this, arguments);
            };
          })(),
          v = function () {
            return ((t = a(
              i().mark(function t(e) {
                return i().wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.prev = 0),
                            t.abrupt(
                              "return",
                              ("undefined" != typeof MessageChannel &&
                                new MessageChannel().port1.postMessage(
                                  new SharedArrayBuffer(1)
                                ),
                              WebAssembly.validate(e))
                            )
                          );
                        case 4:
                          return (
                            (t.prev = 4),
                            (t.t0 = t.catch(0)),
                            t.abrupt("return", !1)
                          );
                        case 7:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[0, 4]]
                );
              })
            )),
            function (e) {
              return t.apply(this, arguments);
            })(
              new Uint8Array([
                0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5,
                4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11,
              ])
            );
            var t;
          };
      },
      645: function (t, e, r) {
        var n = r(33).lW;
        (function () {
          "use strict";
          function t(t) {
            throw t;
          }
          var r = void 0,
            i = !0,
            o =
              "undefined" != typeof Uint8Array &&
              "undefined" != typeof Uint16Array &&
              "undefined" != typeof Uint32Array &&
              "undefined" != typeof DataView;
          function a(e, r) {
            (this.index = "number" == typeof r ? r : 0),
              (this.m = 0),
              (this.buffer =
                e instanceof (o ? Uint8Array : Array)
                  ? e
                  : new (o ? Uint8Array : Array)(32768)),
              2 * this.buffer.length <= this.index && t(Error("invalid index")),
              this.buffer.length <= this.index && this.f();
          }
          (a.prototype.f = function () {
            var t,
              e = this.buffer,
              r = e.length,
              n = new (o ? Uint8Array : Array)(r << 1);
            if (o) n.set(e);
            else for (t = 0; t < r; ++t) n[t] = e[t];
            return (this.buffer = n);
          }),
            (a.prototype.d = function (t, e, r) {
              var n,
                i = this.buffer,
                o = this.index,
                a = this.m,
                s = i[o];
              if (
                (r &&
                  1 < e &&
                  (t =
                    8 < e
                      ? ((l[255 & t] << 24) |
                          (l[(t >>> 8) & 255] << 16) |
                          (l[(t >>> 16) & 255] << 8) |
                          l[(t >>> 24) & 255]) >>
                        (32 - e)
                      : l[t] >> (8 - e)),
                8 > e + a)
              )
                (s = (s << e) | t), (a += e);
              else
                for (n = 0; n < e; ++n)
                  (s = (s << 1) | ((t >> (e - n - 1)) & 1)),
                    8 == ++a &&
                      ((a = 0),
                      (i[o++] = l[s]),
                      (s = 0),
                      o === i.length && (i = this.f()));
              (i[o] = s), (this.buffer = i), (this.m = a), (this.index = o);
            }),
            (a.prototype.finish = function () {
              var t,
                e = this.buffer,
                r = this.index;
              return (
                0 < this.m && ((e[r] <<= 8 - this.m), (e[r] = l[e[r]]), r++),
                o ? (t = e.subarray(0, r)) : ((e.length = r), (t = e)),
                t
              );
            });
          var s,
            u = new (o ? Uint8Array : Array)(256);
          for (s = 0; 256 > s; ++s) {
            for (var c = (h = s), f = 7, h = h >>> 1; h; h >>>= 1)
              (c <<= 1), (c |= 1 & h), --f;
            u[s] = ((c << f) & 255) >>> 0;
          }
          var l = u;
          function p(t, e, r) {
            var n,
              i = "number" == typeof e ? e : (e = 0),
              o = "number" == typeof r ? r : t.length;
            for (n = -1, i = 7 & o; i--; ++e)
              n = (n >>> 8) ^ y[255 & (n ^ t[e])];
            for (i = o >> 3; i--; e += 8)
              n =
                ((n =
                  ((n =
                    ((n =
                      ((n =
                        ((n =
                          ((n =
                            ((n = (n >>> 8) ^ y[255 & (n ^ t[e])]) >>> 8) ^
                            y[255 & (n ^ t[e + 1])]) >>>
                            8) ^
                          y[255 & (n ^ t[e + 2])]) >>>
                          8) ^
                        y[255 & (n ^ t[e + 3])]) >>>
                        8) ^
                      y[255 & (n ^ t[e + 4])]) >>>
                      8) ^
                    y[255 & (n ^ t[e + 5])]) >>>
                    8) ^
                  y[255 & (n ^ t[e + 6])]) >>>
                  8) ^
                y[255 & (n ^ t[e + 7])];
            return (4294967295 ^ n) >>> 0;
          }
          var d = [
              0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615,
              3915621685, 2657392035, 249268274, 2044508324, 3772115230,
              2547177864, 162941995, 2125561021, 3887607047, 2428444049,
              498536548, 1789927666, 4089016648, 2227061214, 450548861,
              1843258603, 4107580753, 2211677639, 325883990, 1684777152,
              4251122042, 2321926636, 335633487, 1661365465, 4195302755,
              2366115317, 997073096, 1281953886, 3579855332, 2724688242,
              1006888145, 1258607687, 3524101629, 2768942443, 901097722,
              1119000684, 3686517206, 2898065728, 853044451, 1172266101,
              3705015759, 2882616665, 651767980, 1373503546, 3369554304,
              3218104598, 565507253, 1454621731, 3485111705, 3099436303,
              671266974, 1594198024, 3322730930, 2970347812, 795835527,
              1483230225, 3244367275, 3060149565, 1994146192, 31158534,
              2563907772, 4023717930, 1907459465, 112637215, 2680153253,
              3904427059, 2013776290, 251722036, 2517215374, 3775830040,
              2137656763, 141376813, 2439277719, 3865271297, 1802195444,
              476864866, 2238001368, 4066508878, 1812370925, 453092731,
              2181625025, 4111451223, 1706088902, 314042704, 2344532202,
              4240017532, 1658658271, 366619977, 2362670323, 4224994405,
              1303535960, 984961486, 2747007092, 3569037538, 1256170817,
              1037604311, 2765210733, 3554079995, 1131014506, 879679996,
              2909243462, 3663771856, 1141124467, 855842277, 2852801631,
              3708648649, 1342533948, 654459306, 3188396048, 3373015174,
              1466479909, 544179635, 3110523913, 3462522015, 1591671054,
              702138776, 2966460450, 3352799412, 1504918807, 783551873,
              3082640443, 3233442989, 3988292384, 2596254646, 62317068,
              1957810842, 3939845945, 2647816111, 81470997, 1943803523,
              3814918930, 2489596804, 225274430, 2053790376, 3826175755,
              2466906013, 167816743, 2097651377, 4027552580, 2265490386,
              503444072, 1762050814, 4150417245, 2154129355, 426522225,
              1852507879, 4275313526, 2312317920, 282753626, 1742555852,
              4189708143, 2394877945, 397917763, 1622183637, 3604390888,
              2714866558, 953729732, 1340076626, 3518719985, 2797360999,
              1068828381, 1219638859, 3624741850, 2936675148, 906185462,
              1090812512, 3747672003, 2825379669, 829329135, 1181335161,
              3412177804, 3160834842, 628085408, 1382605366, 3423369109,
              3138078467, 570562233, 1426400815, 3317316542, 2998733608,
              733239954, 1555261956, 3268935591, 3050360625, 752459403,
              1541320221, 2607071920, 3965973030, 1969922972, 40735498,
              2617837225, 3943577151, 1913087877, 83908371, 2512341634,
              3803740692, 2075208622, 213261112, 2463272603, 3855990285,
              2094854071, 198958881, 2262029012, 4057260610, 1759359992,
              534414190, 2176718541, 4139329115, 1873836001, 414664567,
              2282248934, 4279200368, 1711684554, 285281116, 2405801727,
              4167216745, 1634467795, 376229701, 2685067896, 3608007406,
              1308918612, 956543938, 2808555105, 3495958263, 1231636301,
              1047427035, 2932959818, 3654703836, 1088359270, 936918e3,
              2847714899, 3736837829, 1202900863, 817233897, 3183342108,
              3401237130, 1404277552, 615818150, 3134207493, 3453421203,
              1423857449, 601450431, 3009837614, 3294710456, 1567103746,
              711928724, 3020668471, 3272380065, 1510334235, 755167117,
            ],
            y = o ? new Uint32Array(d) : d;
          function g() {}
          function v(t) {
            (this.buffer = new (o ? Uint16Array : Array)(2 * t)),
              (this.length = 0);
          }
          function b(t) {
            var e,
              r,
              n,
              i,
              a,
              s,
              u,
              c,
              f,
              h,
              l = t.length,
              p = 0,
              d = Number.POSITIVE_INFINITY;
            for (c = 0; c < l; ++c)
              t[c] > p && (p = t[c]), t[c] < d && (d = t[c]);
            for (
              e = 1 << p,
                r = new (o ? Uint32Array : Array)(e),
                n = 1,
                i = 0,
                a = 2;
              n <= p;

            ) {
              for (c = 0; c < l; ++c)
                if (t[c] === n) {
                  for (s = 0, u = i, f = 0; f < n; ++f)
                    (s = (s << 1) | (1 & u)), (u >>= 1);
                  for (h = (n << 16) | c, f = s; f < e; f += a) r[f] = h;
                  ++i;
                }
              ++n, (i <<= 1), (a <<= 1);
            }
            return [r, p, d];
          }
          function w(t, e) {
            (this.k = E),
              (this.F = 0),
              (this.input = o && t instanceof Array ? new Uint8Array(t) : t),
              (this.b = 0),
              e &&
                (e.lazy && (this.F = e.lazy),
                "number" == typeof e.compressionType &&
                  (this.k = e.compressionType),
                e.outputBuffer &&
                  (this.a =
                    o && e.outputBuffer instanceof Array
                      ? new Uint8Array(e.outputBuffer)
                      : e.outputBuffer),
                "number" == typeof e.outputIndex && (this.b = e.outputIndex)),
              this.a || (this.a = new (o ? Uint8Array : Array)(32768));
          }
          (v.prototype.getParent = function (t) {
            return 2 * (((t - 2) / 4) | 0);
          }),
            (v.prototype.push = function (t, e) {
              var r,
                n,
                i,
                o = this.buffer;
              for (
                r = this.length, o[this.length++] = e, o[this.length++] = t;
                0 < r && ((n = this.getParent(r)), o[r] > o[n]);

              )
                (i = o[r]),
                  (o[r] = o[n]),
                  (o[n] = i),
                  (i = o[r + 1]),
                  (o[r + 1] = o[n + 1]),
                  (o[n + 1] = i),
                  (r = n);
              return this.length;
            }),
            (v.prototype.pop = function () {
              var t,
                e,
                r,
                n,
                i,
                o = this.buffer;
              for (
                e = o[0],
                  t = o[1],
                  this.length -= 2,
                  o[0] = o[this.length],
                  o[1] = o[this.length + 1],
                  i = 0;
                !((n = 2 * i + 2) >= this.length) &&
                (n + 2 < this.length && o[n + 2] > o[n] && (n += 2),
                o[n] > o[i]);

              )
                (r = o[i]),
                  (o[i] = o[n]),
                  (o[n] = r),
                  (r = o[i + 1]),
                  (o[i + 1] = o[n + 1]),
                  (o[n + 1] = r),
                  (i = n);
              return { index: t, value: e, length: this.length };
            });
          var m,
            E = 2,
            x = { NONE: 0, L: 1, t: E, X: 3 },
            A = [];
          for (m = 0; 288 > m; m++)
            switch (i) {
              case 143 >= m:
                A.push([m + 48, 8]);
                break;
              case 255 >= m:
                A.push([m - 144 + 400, 9]);
                break;
              case 279 >= m:
                A.push([m - 256 + 0, 7]);
                break;
              case 287 >= m:
                A.push([m - 280 + 192, 8]);
                break;
              default:
                t("invalid literal: " + m);
            }
          function k(t, e) {
            (this.length = t), (this.N = e);
          }
          w.prototype.h = function () {
            var e,
              n,
              s,
              u,
              c = this.input;
            switch (this.k) {
              case 0:
                for (s = 0, u = c.length; s < u; ) {
                  var f,
                    h,
                    l,
                    p = (n = o
                      ? c.subarray(s, s + 65535)
                      : c.slice(s, s + 65535)),
                    d = (s += n.length) === u,
                    y = r,
                    g = r,
                    v = this.a,
                    b = this.b;
                  if (o) {
                    for (
                      v = new Uint8Array(this.a.buffer);
                      v.length <= b + p.length + 5;

                    )
                      v = new Uint8Array(v.length << 1);
                    v.set(this.a);
                  }
                  if (
                    ((f = d ? 1 : 0),
                    (v[b++] = 0 | f),
                    (l = (65536 + ~(h = p.length)) & 65535),
                    (v[b++] = 255 & h),
                    (v[b++] = (h >>> 8) & 255),
                    (v[b++] = 255 & l),
                    (v[b++] = (l >>> 8) & 255),
                    o)
                  )
                    v.set(p, b), (b += p.length), (v = v.subarray(0, b));
                  else {
                    for (y = 0, g = p.length; y < g; ++y) v[b++] = p[y];
                    v.length = b;
                  }
                  (this.b = b), (this.a = v);
                }
                break;
              case 1:
                var w = new a(
                  o ? new Uint8Array(this.a.buffer) : this.a,
                  this.b
                );
                w.d(1, 1, i), w.d(1, 2, i);
                var m,
                  x,
                  k,
                  _ = I(this, c);
                for (m = 0, x = _.length; m < x; m++)
                  if (((k = _[m]), a.prototype.d.apply(w, A[k]), 256 < k))
                    w.d(_[++m], _[++m], i),
                      w.d(_[++m], 5),
                      w.d(_[++m], _[++m], i);
                  else if (256 === k) break;
                (this.a = w.finish()), (this.b = this.a.length);
                break;
              case E:
                var O,
                  S,
                  j,
                  B,
                  T,
                  P,
                  R,
                  C,
                  N,
                  M,
                  F,
                  G,
                  z,
                  D,
                  W,
                  Y = new a(o ? new Uint8Array(this.a.buffer) : this.a, this.b),
                  V = [
                    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14,
                    1, 15,
                  ],
                  q = Array(19);
                for (
                  O = E,
                    Y.d(1, 1, i),
                    Y.d(O, 2, i),
                    S = I(this, c),
                    R = U((P = L(this.U, 15))),
                    N = U((C = L(this.T, 7))),
                    j = 286;
                  257 < j && 0 === P[j - 1];
                  j--
                );
                for (B = 30; 1 < B && 0 === C[B - 1]; B--);
                var H,
                  K,
                  J,
                  X,
                  $,
                  Q,
                  Z = j,
                  tt = B,
                  et = new (o ? Uint32Array : Array)(Z + tt),
                  rt = new (o ? Uint32Array : Array)(316),
                  nt = new (o ? Uint8Array : Array)(19);
                for (H = K = 0; H < Z; H++) et[K++] = P[H];
                for (H = 0; H < tt; H++) et[K++] = C[H];
                if (!o) for (H = 0, X = nt.length; H < X; ++H) nt[H] = 0;
                for (H = $ = 0, X = et.length; H < X; H += K) {
                  for (K = 1; H + K < X && et[H + K] === et[H]; ++K);
                  if (((J = K), 0 === et[H]))
                    if (3 > J) for (; 0 < J--; ) (rt[$++] = 0), nt[0]++;
                    else
                      for (; 0 < J; )
                        (Q = 138 > J ? J : 138) > J - 3 && Q < J && (Q = J - 3),
                          10 >= Q
                            ? ((rt[$++] = 17), (rt[$++] = Q - 3), nt[17]++)
                            : ((rt[$++] = 18), (rt[$++] = Q - 11), nt[18]++),
                          (J -= Q);
                  else if (((rt[$++] = et[H]), nt[et[H]]++, 3 > --J))
                    for (; 0 < J--; ) (rt[$++] = et[H]), nt[et[H]]++;
                  else
                    for (; 0 < J; )
                      (Q = 6 > J ? J : 6) > J - 3 && Q < J && (Q = J - 3),
                        (rt[$++] = 16),
                        (rt[$++] = Q - 3),
                        nt[16]++,
                        (J -= Q);
                }
                for (
                  e = o ? rt.subarray(0, $) : rt.slice(0, $),
                    M = L(nt, 7),
                    D = 0;
                  19 > D;
                  D++
                )
                  q[D] = M[V[D]];
                for (T = 19; 4 < T && 0 === q[T - 1]; T--);
                for (
                  F = U(M),
                    Y.d(j - 257, 5, i),
                    Y.d(B - 1, 5, i),
                    Y.d(T - 4, 4, i),
                    D = 0;
                  D < T;
                  D++
                )
                  Y.d(q[D], 3, i);
                for (D = 0, W = e.length; D < W; D++)
                  if (((G = e[D]), Y.d(F[G], M[G], i), 16 <= G)) {
                    switch ((D++, G)) {
                      case 16:
                        z = 2;
                        break;
                      case 17:
                        z = 3;
                        break;
                      case 18:
                        z = 7;
                        break;
                      default:
                        t("invalid code: " + G);
                    }
                    Y.d(e[D], z, i);
                  }
                var it,
                  ot,
                  at,
                  st,
                  ut,
                  ct,
                  ft,
                  ht,
                  lt = [R, P],
                  pt = [N, C];
                for (
                  ut = lt[0],
                    ct = lt[1],
                    ft = pt[0],
                    ht = pt[1],
                    it = 0,
                    ot = S.length;
                  it < ot;
                  ++it
                )
                  if (((at = S[it]), Y.d(ut[at], ct[at], i), 256 < at))
                    Y.d(S[++it], S[++it], i),
                      (st = S[++it]),
                      Y.d(ft[st], ht[st], i),
                      Y.d(S[++it], S[++it], i);
                  else if (256 === at) break;
                (this.a = Y.finish()), (this.b = this.a.length);
                break;
              default:
                t("invalid compression type");
            }
            return this.a;
          };
          var _ = (function () {
              function e(e) {
                switch (i) {
                  case 3 === e:
                    return [257, e - 3, 0];
                  case 4 === e:
                    return [258, e - 4, 0];
                  case 5 === e:
                    return [259, e - 5, 0];
                  case 6 === e:
                    return [260, e - 6, 0];
                  case 7 === e:
                    return [261, e - 7, 0];
                  case 8 === e:
                    return [262, e - 8, 0];
                  case 9 === e:
                    return [263, e - 9, 0];
                  case 10 === e:
                    return [264, e - 10, 0];
                  case 12 >= e:
                    return [265, e - 11, 1];
                  case 14 >= e:
                    return [266, e - 13, 1];
                  case 16 >= e:
                    return [267, e - 15, 1];
                  case 18 >= e:
                    return [268, e - 17, 1];
                  case 22 >= e:
                    return [269, e - 19, 2];
                  case 26 >= e:
                    return [270, e - 23, 2];
                  case 30 >= e:
                    return [271, e - 27, 2];
                  case 34 >= e:
                    return [272, e - 31, 2];
                  case 42 >= e:
                    return [273, e - 35, 3];
                  case 50 >= e:
                    return [274, e - 43, 3];
                  case 58 >= e:
                    return [275, e - 51, 3];
                  case 66 >= e:
                    return [276, e - 59, 3];
                  case 82 >= e:
                    return [277, e - 67, 4];
                  case 98 >= e:
                    return [278, e - 83, 4];
                  case 114 >= e:
                    return [279, e - 99, 4];
                  case 130 >= e:
                    return [280, e - 115, 4];
                  case 162 >= e:
                    return [281, e - 131, 5];
                  case 194 >= e:
                    return [282, e - 163, 5];
                  case 226 >= e:
                    return [283, e - 195, 5];
                  case 257 >= e:
                    return [284, e - 227, 5];
                  case 258 === e:
                    return [285, e - 258, 0];
                  default:
                    t("invalid length: " + e);
                }
              }
              var r,
                n,
                o = [];
              for (r = 3; 258 >= r; r++)
                (n = e(r)), (o[r] = (n[2] << 24) | (n[1] << 16) | n[0]);
              return o;
            })(),
            O = o ? new Uint32Array(_) : _;
          function I(e, n) {
            function a(e, r) {
              var n,
                o,
                a,
                s,
                u = e.N,
                c = [],
                f = 0;
              switch (
                ((n = O[e.length]),
                (c[f++] = 65535 & n),
                (c[f++] = (n >> 16) & 255),
                (c[f++] = n >> 24),
                i)
              ) {
                case 1 === u:
                  o = [0, u - 1, 0];
                  break;
                case 2 === u:
                  o = [1, u - 2, 0];
                  break;
                case 3 === u:
                  o = [2, u - 3, 0];
                  break;
                case 4 === u:
                  o = [3, u - 4, 0];
                  break;
                case 6 >= u:
                  o = [4, u - 5, 1];
                  break;
                case 8 >= u:
                  o = [5, u - 7, 1];
                  break;
                case 12 >= u:
                  o = [6, u - 9, 2];
                  break;
                case 16 >= u:
                  o = [7, u - 13, 2];
                  break;
                case 24 >= u:
                  o = [8, u - 17, 3];
                  break;
                case 32 >= u:
                  o = [9, u - 25, 3];
                  break;
                case 48 >= u:
                  o = [10, u - 33, 4];
                  break;
                case 64 >= u:
                  o = [11, u - 49, 4];
                  break;
                case 96 >= u:
                  o = [12, u - 65, 5];
                  break;
                case 128 >= u:
                  o = [13, u - 97, 5];
                  break;
                case 192 >= u:
                  o = [14, u - 129, 6];
                  break;
                case 256 >= u:
                  o = [15, u - 193, 6];
                  break;
                case 384 >= u:
                  o = [16, u - 257, 7];
                  break;
                case 512 >= u:
                  o = [17, u - 385, 7];
                  break;
                case 768 >= u:
                  o = [18, u - 513, 8];
                  break;
                case 1024 >= u:
                  o = [19, u - 769, 8];
                  break;
                case 1536 >= u:
                  o = [20, u - 1025, 9];
                  break;
                case 2048 >= u:
                  o = [21, u - 1537, 9];
                  break;
                case 3072 >= u:
                  o = [22, u - 2049, 10];
                  break;
                case 4096 >= u:
                  o = [23, u - 3073, 10];
                  break;
                case 6144 >= u:
                  o = [24, u - 4097, 11];
                  break;
                case 8192 >= u:
                  o = [25, u - 6145, 11];
                  break;
                case 12288 >= u:
                  o = [26, u - 8193, 12];
                  break;
                case 16384 >= u:
                  o = [27, u - 12289, 12];
                  break;
                case 24576 >= u:
                  o = [28, u - 16385, 13];
                  break;
                case 32768 >= u:
                  o = [29, u - 24577, 13];
                  break;
                default:
                  t("invalid distance");
              }
              for (
                n = o,
                  c[f++] = n[0],
                  c[f++] = n[1],
                  c[f++] = n[2],
                  a = 0,
                  s = c.length;
                a < s;
                ++a
              )
                v[b++] = c[a];
              m[c[0]]++, E[c[3]]++, (w = e.length + r - 1), (d = null);
            }
            var s,
              u,
              c,
              f,
              h,
              l,
              p,
              d,
              y,
              g = {},
              v = o ? new Uint16Array(2 * n.length) : [],
              b = 0,
              w = 0,
              m = new (o ? Uint32Array : Array)(286),
              E = new (o ? Uint32Array : Array)(30),
              x = e.F;
            if (!o) {
              for (c = 0; 285 >= c; ) m[c++] = 0;
              for (c = 0; 29 >= c; ) E[c++] = 0;
            }
            for (m[256] = 1, s = 0, u = n.length; s < u; ++s) {
              for (c = h = 0, f = 3; c < f && s + c !== u; ++c)
                h = (h << 8) | n[s + c];
              if ((g[h] === r && (g[h] = []), (l = g[h]), !(0 < w--))) {
                for (; 0 < l.length && 32768 < s - l[0]; ) l.shift();
                if (s + 3 >= u) {
                  for (d && a(d, -1), c = 0, f = u - s; c < f; ++c)
                    (y = n[s + c]), (v[b++] = y), ++m[y];
                  break;
                }
                0 < l.length
                  ? ((p = S(n, s, l)),
                    d
                      ? d.length < p.length
                        ? ((y = n[s - 1]), (v[b++] = y), ++m[y], a(p, 0))
                        : a(d, -1)
                      : p.length < x
                      ? (d = p)
                      : a(p, 0))
                  : d
                  ? a(d, -1)
                  : ((y = n[s]), (v[b++] = y), ++m[y]);
              }
              l.push(s);
            }
            return (
              (v[b++] = 256),
              m[256]++,
              (e.U = m),
              (e.T = E),
              o ? v.subarray(0, b) : v
            );
          }
          function S(t, e, r) {
            var n,
              i,
              o,
              a,
              s,
              u,
              c = 0,
              f = t.length;
            (a = 0), (u = r.length);
            t: for (; a < u; a++) {
              if (((n = r[u - a - 1]), (o = 3), 3 < c)) {
                for (s = c; 3 < s; s--)
                  if (t[n + s - 1] !== t[e + s - 1]) continue t;
                o = c;
              }
              for (; 258 > o && e + o < f && t[n + o] === t[e + o]; ) ++o;
              if ((o > c && ((i = n), (c = o)), 258 === o)) break;
            }
            return new k(c, e - i);
          }
          function L(t, e) {
            var r,
              n,
              i,
              a,
              s,
              u = t.length,
              c = new v(572),
              f = new (o ? Uint8Array : Array)(u);
            if (!o) for (a = 0; a < u; a++) f[a] = 0;
            for (a = 0; a < u; ++a) 0 < t[a] && c.push(a, t[a]);
            if (
              ((r = Array(c.length / 2)),
              (n = new (o ? Uint32Array : Array)(c.length / 2)),
              1 === r.length)
            )
              return (f[c.pop().index] = 1), f;
            for (a = 0, s = c.length / 2; a < s; ++a)
              (r[a] = c.pop()), (n[a] = r[a].value);
            for (
              i = (function (t, e, r) {
                function n(t) {
                  var r = d[t][y[t]];
                  r === e ? (n(t + 1), n(t + 1)) : --l[r], ++y[t];
                }
                var i,
                  a,
                  s,
                  u,
                  c,
                  f = new (o ? Uint16Array : Array)(r),
                  h = new (o ? Uint8Array : Array)(r),
                  l = new (o ? Uint8Array : Array)(e),
                  p = Array(r),
                  d = Array(r),
                  y = Array(r),
                  g = (1 << r) - e,
                  v = 1 << (r - 1);
                for (f[r - 1] = e, a = 0; a < r; ++a)
                  g < v ? (h[a] = 0) : ((h[a] = 1), (g -= v)),
                    (g <<= 1),
                    (f[r - 2 - a] = ((f[r - 1 - a] / 2) | 0) + e);
                for (
                  f[0] = h[0], p[0] = Array(f[0]), d[0] = Array(f[0]), a = 1;
                  a < r;
                  ++a
                )
                  f[a] > 2 * f[a - 1] + h[a] && (f[a] = 2 * f[a - 1] + h[a]),
                    (p[a] = Array(f[a])),
                    (d[a] = Array(f[a]));
                for (i = 0; i < e; ++i) l[i] = r;
                for (s = 0; s < f[r - 1]; ++s)
                  (p[r - 1][s] = t[s]), (d[r - 1][s] = s);
                for (i = 0; i < r; ++i) y[i] = 0;
                for (
                  1 === h[r - 1] && (--l[0], ++y[r - 1]), a = r - 2;
                  0 <= a;
                  --a
                ) {
                  for (u = i = 0, c = y[a + 1], s = 0; s < f[a]; s++)
                    (u = p[a + 1][c] + p[a + 1][c + 1]) > t[i]
                      ? ((p[a][s] = u), (d[a][s] = e), (c += 2))
                      : ((p[a][s] = t[i]), (d[a][s] = i), ++i);
                  (y[a] = 0), 1 === h[a] && n(a);
                }
                return l;
              })(n, n.length, e),
                a = 0,
                s = r.length;
              a < s;
              ++a
            )
              f[r[a].index] = i[a];
            return f;
          }
          function U(t) {
            var e,
              r,
              n,
              i,
              a = new (o ? Uint16Array : Array)(t.length),
              s = [],
              u = [],
              c = 0;
            for (e = 0, r = t.length; e < r; e++) s[t[e]] = 1 + (0 | s[t[e]]);
            for (e = 1, r = 16; e <= r; e++)
              (u[e] = c), (c += 0 | s[e]), (c <<= 1);
            for (e = 0, r = t.length; e < r; e++)
              for (
                c = u[t[e]], u[t[e]] += 1, n = a[e] = 0, i = t[e];
                n < i;
                n++
              )
                (a[e] = (a[e] << 1) | (1 & c)), (c >>>= 1);
            return a;
          }
          function j(t, e) {
            (this.input = t),
              (this.b = this.c = 0),
              (this.g = {}),
              e &&
                (e.flags && (this.g = e.flags),
                "string" == typeof e.filename && (this.filename = e.filename),
                "string" == typeof e.comment && (this.w = e.comment),
                e.deflateOptions && (this.l = e.deflateOptions)),
              this.l || (this.l = {});
          }
          j.prototype.h = function () {
            var t,
              e,
              n,
              i,
              a,
              s,
              u,
              c,
              f = new (o ? Uint8Array : Array)(32768),
              h = 0,
              l = this.input,
              d = this.c,
              y = this.filename,
              g = this.w;
            if (
              ((f[h++] = 31),
              (f[h++] = 139),
              (f[h++] = 8),
              (t = 0),
              this.g.fname && (t |= P),
              this.g.fcomment && (t |= R),
              this.g.fhcrc && (t |= T),
              (f[h++] = t),
              (e = ((Date.now ? Date.now() : +new Date()) / 1e3) | 0),
              (f[h++] = 255 & e),
              (f[h++] = (e >>> 8) & 255),
              (f[h++] = (e >>> 16) & 255),
              (f[h++] = (e >>> 24) & 255),
              (f[h++] = 0),
              (f[h++] = B),
              this.g.fname !== r)
            ) {
              for (u = 0, c = y.length; u < c; ++u)
                255 < (s = y.charCodeAt(u)) && (f[h++] = (s >>> 8) & 255),
                  (f[h++] = 255 & s);
              f[h++] = 0;
            }
            if (this.g.comment) {
              for (u = 0, c = g.length; u < c; ++u)
                255 < (s = g.charCodeAt(u)) && (f[h++] = (s >>> 8) & 255),
                  (f[h++] = 255 & s);
              f[h++] = 0;
            }
            return (
              this.g.fhcrc &&
                ((n = 65535 & p(f, 0, h)),
                (f[h++] = 255 & n),
                (f[h++] = (n >>> 8) & 255)),
              (this.l.outputBuffer = f),
              (this.l.outputIndex = h),
              (f = (a = new w(l, this.l)).h()),
              (h = a.b),
              o &&
                (h + 8 > f.buffer.byteLength
                  ? ((this.a = new Uint8Array(h + 8)),
                    this.a.set(new Uint8Array(f.buffer)),
                    (f = this.a))
                  : (f = new Uint8Array(f.buffer))),
              (i = p(l, r, r)),
              (f[h++] = 255 & i),
              (f[h++] = (i >>> 8) & 255),
              (f[h++] = (i >>> 16) & 255),
              (f[h++] = (i >>> 24) & 255),
              (c = l.length),
              (f[h++] = 255 & c),
              (f[h++] = (c >>> 8) & 255),
              (f[h++] = (c >>> 16) & 255),
              (f[h++] = (c >>> 24) & 255),
              (this.c = d),
              o && h < f.length && (this.a = f = f.subarray(0, h)),
              f
            );
          };
          var B = 255,
            T = 2,
            P = 8,
            R = 16;
          function C(e, r) {
            switch (
              ((this.o = []),
              (this.p = 32768),
              (this.e = this.j = this.c = this.s = 0),
              (this.input = o ? new Uint8Array(e) : e),
              (this.u = !1),
              (this.q = M),
              (this.K = !1),
              (!r && (r = {})) ||
                (r.index && (this.c = r.index),
                r.bufferSize && (this.p = r.bufferSize),
                r.bufferType && (this.q = r.bufferType),
                r.resize && (this.K = r.resize)),
              this.q)
            ) {
              case N:
                (this.b = 32768),
                  (this.a = new (o ? Uint8Array : Array)(32768 + this.p + 258));
                break;
              case M:
                (this.b = 0),
                  (this.a = new (o ? Uint8Array : Array)(this.p)),
                  (this.f = this.S),
                  (this.z = this.O),
                  (this.r = this.Q);
                break;
              default:
                t(Error("invalid inflate mode"));
            }
          }
          var N = 0,
            M = 1;
          C.prototype.i = function () {
            for (; !this.u; ) {
              var e = nt(this, 3);
              switch ((1 & e && (this.u = i), (e >>>= 1))) {
                case 0:
                  var n = this.input,
                    a = this.c,
                    s = this.a,
                    u = this.b,
                    c = n.length,
                    f = r,
                    h = s.length,
                    l = r;
                  switch (
                    ((this.e = this.j = 0),
                    a + 1 >= c &&
                      t(Error("invalid uncompressed block header: LEN")),
                    (f = n[a++] | (n[a++] << 8)),
                    a + 1 >= c &&
                      t(Error("invalid uncompressed block header: NLEN")),
                    f === ~(n[a++] | (n[a++] << 8)) &&
                      t(
                        Error(
                          "invalid uncompressed block header: length verify"
                        )
                      ),
                    a + f > n.length && t(Error("input buffer is broken")),
                    this.q)
                  ) {
                    case N:
                      for (; u + f > s.length; ) {
                        if (((f -= l = h - u), o))
                          s.set(n.subarray(a, a + l), u), (u += l), (a += l);
                        else for (; l--; ) s[u++] = n[a++];
                        (this.b = u), (s = this.f()), (u = this.b);
                      }
                      break;
                    case M:
                      for (; u + f > s.length; ) s = this.f({ B: 2 });
                      break;
                    default:
                      t(Error("invalid inflate mode"));
                  }
                  if (o) s.set(n.subarray(a, a + f), u), (u += f), (a += f);
                  else for (; f--; ) s[u++] = n[a++];
                  (this.c = a), (this.b = u), (this.a = s);
                  break;
                case 1:
                  this.r(tt, rt);
                  break;
                case 2:
                  var p,
                    d,
                    y,
                    g,
                    v = nt(this, 5) + 257,
                    w = nt(this, 5) + 1,
                    m = nt(this, 4) + 4,
                    E = new (o ? Uint8Array : Array)(D.length),
                    x = r,
                    A = r,
                    k = r,
                    _ = r,
                    O = r;
                  for (O = 0; O < m; ++O) E[D[O]] = nt(this, 3);
                  if (!o) for (O = m, m = E.length; O < m; ++O) E[D[O]] = 0;
                  for (
                    p = b(E),
                      x = new (o ? Uint8Array : Array)(v + w),
                      O = 0,
                      g = v + w;
                    O < g;

                  )
                    switch (((A = it(this, p)), A)) {
                      case 16:
                        for (_ = 3 + nt(this, 2); _--; ) x[O++] = k;
                        break;
                      case 17:
                        for (_ = 3 + nt(this, 3); _--; ) x[O++] = 0;
                        k = 0;
                        break;
                      case 18:
                        for (_ = 11 + nt(this, 7); _--; ) x[O++] = 0;
                        k = 0;
                        break;
                      default:
                        k = x[O++] = A;
                    }
                  (d = b(o ? x.subarray(0, v) : x.slice(0, v))),
                    (y = b(o ? x.subarray(v) : x.slice(v))),
                    this.r(d, y);
                  break;
                default:
                  t(Error("unknown BTYPE: " + e));
              }
            }
            return this.z();
          };
          var F,
            G,
            z = [
              16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
            ],
            D = o ? new Uint16Array(z) : z,
            W = [
              3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43,
              51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 258, 258,
            ],
            Y = o ? new Uint16Array(W) : W,
            V = [
              0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4,
              4, 4, 5, 5, 5, 5, 0, 0, 0,
            ],
            q = o ? new Uint8Array(V) : V,
            H = [
              1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257,
              385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289,
              16385, 24577,
            ],
            K = o ? new Uint16Array(H) : H,
            J = [
              0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9,
              10, 10, 11, 11, 12, 12, 13, 13,
            ],
            X = o ? new Uint8Array(J) : J,
            $ = new (o ? Uint8Array : Array)(288);
          for (F = 0, G = $.length; F < G; ++F)
            $[F] = 143 >= F ? 8 : 255 >= F ? 9 : 279 >= F ? 7 : 8;
          var Q,
            Z,
            tt = b($),
            et = new (o ? Uint8Array : Array)(30);
          for (Q = 0, Z = et.length; Q < Z; ++Q) et[Q] = 5;
          var rt = b(et);
          function nt(e, r) {
            for (
              var n, i = e.j, o = e.e, a = e.input, s = e.c, u = a.length;
              o < r;

            )
              s >= u && t(Error("input buffer is broken")),
                (i |= a[s++] << o),
                (o += 8);
            return (
              (n = i & ((1 << r) - 1)),
              (e.j = i >>> r),
              (e.e = o - r),
              (e.c = s),
              n
            );
          }
          function it(e, r) {
            for (
              var n,
                i,
                o = e.j,
                a = e.e,
                s = e.input,
                u = e.c,
                c = s.length,
                f = r[0],
                h = r[1];
              a < h && !(u >= c);

            )
              (o |= s[u++] << a), (a += 8);
            return (
              (i = (n = f[o & ((1 << h) - 1)]) >>> 16) > a &&
                t(Error("invalid code length: " + i)),
              (e.j = o >> i),
              (e.e = a - i),
              (e.c = u),
              65535 & n
            );
          }
          function ot(t) {
            (this.input = t), (this.c = 0), (this.G = []), (this.R = !1);
          }
          function at(t) {
            if ("string" == typeof t) {
              var e,
                r,
                n = t.split("");
              for (e = 0, r = n.length; e < r; e++)
                n[e] = (255 & n[e].charCodeAt(0)) >>> 0;
              t = n;
            }
            for (var i, o = 1, a = 0, s = t.length, u = 0; 0 < s; ) {
              s -= i = 1024 < s ? 1024 : s;
              do {
                a += o += t[u++];
              } while (--i);
              (o %= 65521), (a %= 65521);
            }
            return ((a << 16) | o) >>> 0;
          }
          function st(e, r) {
            var n, i;
            (this.input = e),
              (this.c = 0),
              (!r && (r = {})) ||
                (r.index && (this.c = r.index),
                r.verify && (this.V = r.verify)),
              (n = e[this.c++]),
              (i = e[this.c++]),
              (15 & n) === ut
                ? (this.method = ut)
                : t(Error("unsupported compression method")),
              0 != ((n << 8) + i) % 31 &&
                t(Error("invalid fcheck flag:" + (((n << 8) + i) % 31))),
              32 & i && t(Error("fdict flag is not supported")),
              (this.J = new C(e, {
                index: this.c,
                bufferSize: r.bufferSize,
                bufferType: r.bufferType,
                resize: r.resize,
              }));
          }
          (C.prototype.r = function (t, e) {
            var r = this.a,
              n = this.b;
            this.A = t;
            for (
              var i, o, a, s, u = r.length - 258;
              256 !== (i = it(this, t));

            )
              if (256 > i)
                n >= u && ((this.b = n), (r = this.f()), (n = this.b)),
                  (r[n++] = i);
              else
                for (
                  s = Y[(o = i - 257)],
                    0 < q[o] && (s += nt(this, q[o])),
                    i = it(this, e),
                    a = K[i],
                    0 < X[i] && (a += nt(this, X[i])),
                    n >= u && ((this.b = n), (r = this.f()), (n = this.b));
                  s--;

                )
                  r[n] = r[n++ - a];
            for (; 8 <= this.e; ) (this.e -= 8), this.c--;
            this.b = n;
          }),
            (C.prototype.Q = function (t, e) {
              var r = this.a,
                n = this.b;
              this.A = t;
              for (var i, o, a, s, u = r.length; 256 !== (i = it(this, t)); )
                if (256 > i)
                  n >= u && (u = (r = this.f()).length), (r[n++] = i);
                else
                  for (
                    s = Y[(o = i - 257)],
                      0 < q[o] && (s += nt(this, q[o])),
                      i = it(this, e),
                      a = K[i],
                      0 < X[i] && (a += nt(this, X[i])),
                      n + s > u && (u = (r = this.f()).length);
                    s--;

                  )
                    r[n] = r[n++ - a];
              for (; 8 <= this.e; ) (this.e -= 8), this.c--;
              this.b = n;
            }),
            (C.prototype.f = function () {
              var t,
                e,
                r = new (o ? Uint8Array : Array)(this.b - 32768),
                n = this.b - 32768,
                i = this.a;
              if (o) r.set(i.subarray(32768, r.length));
              else for (t = 0, e = r.length; t < e; ++t) r[t] = i[t + 32768];
              if ((this.o.push(r), (this.s += r.length), o))
                i.set(i.subarray(n, n + 32768));
              else for (t = 0; 32768 > t; ++t) i[t] = i[n + t];
              return (this.b = 32768), i;
            }),
            (C.prototype.S = function (t) {
              var e,
                r,
                n,
                i = (this.input.length / this.c + 1) | 0,
                a = this.input,
                s = this.a;
              return (
                t &&
                  ("number" == typeof t.B && (i = t.B),
                  "number" == typeof t.M && (i += t.M)),
                (r =
                  2 > i
                    ? (n = (((a.length - this.c) / this.A[2] / 2) * 258) | 0) <
                      s.length
                      ? s.length + n
                      : s.length << 1
                    : s.length * i),
                o ? (e = new Uint8Array(r)).set(s) : (e = s),
                (this.a = e)
              );
            }),
            (C.prototype.z = function () {
              var t,
                e,
                r,
                n,
                i,
                a = 0,
                s = this.a,
                u = this.o,
                c = new (o ? Uint8Array : Array)(this.s + (this.b - 32768));
              if (0 === u.length)
                return o
                  ? this.a.subarray(32768, this.b)
                  : this.a.slice(32768, this.b);
              for (e = 0, r = u.length; e < r; ++e)
                for (n = 0, i = (t = u[e]).length; n < i; ++n) c[a++] = t[n];
              for (e = 32768, r = this.b; e < r; ++e) c[a++] = s[e];
              return (this.o = []), (this.buffer = c);
            }),
            (C.prototype.O = function () {
              var t,
                e = this.b;
              return (
                o
                  ? this.K
                    ? (t = new Uint8Array(e)).set(this.a.subarray(0, e))
                    : (t = this.a.subarray(0, e))
                  : (this.a.length > e && (this.a.length = e), (t = this.a)),
                (this.buffer = t)
              );
            }),
            (ot.prototype.i = function () {
              for (var e = this.input.length; this.c < e; ) {
                var n,
                  a,
                  s = new g(),
                  u = r,
                  c = r,
                  f = r,
                  h = r,
                  l = r,
                  d = r,
                  y = r,
                  v = this.input,
                  b = this.c;
                if (
                  ((s.C = v[b++]),
                  (s.D = v[b++]),
                  (31 !== s.C || 139 !== s.D) &&
                    t(Error("invalid file signature:" + s.C + "," + s.D)),
                  (s.v = v[b++]),
                  8 === s.v || t(Error("unknown compression method: " + s.v)),
                  (s.n = v[b++]),
                  (a =
                    v[b++] | (v[b++] << 8) | (v[b++] << 16) | (v[b++] << 24)),
                  (s.$ = new Date(1e3 * a)),
                  (s.ba = v[b++]),
                  (s.aa = v[b++]),
                  0 < (4 & s.n) && ((s.W = v[b++] | (v[b++] << 8)), (b += s.W)),
                  0 < (s.n & P))
                ) {
                  for (d = [], l = 0; 0 < (h = v[b++]); )
                    d[l++] = String.fromCharCode(h);
                  s.name = d.join("");
                }
                if (0 < (s.n & R)) {
                  for (d = [], l = 0; 0 < (h = v[b++]); )
                    d[l++] = String.fromCharCode(h);
                  s.w = d.join("");
                }
                0 < (s.n & T) &&
                  ((s.P = 65535 & p(v, 0, b)),
                  s.P !== (v[b++] | (v[b++] << 8)) &&
                    t(Error("invalid header crc16"))),
                  (u =
                    v[v.length - 4] |
                    (v[v.length - 3] << 8) |
                    (v[v.length - 2] << 16) |
                    (v[v.length - 1] << 24)),
                  v.length - b - 4 - 4 < 512 * u && (f = u),
                  (c = new C(v, { index: b, bufferSize: f })),
                  (s.data = n = c.i()),
                  (b = c.c),
                  (s.Y = y =
                    (v[b++] |
                      (v[b++] << 8) |
                      (v[b++] << 16) |
                      (v[b++] << 24)) >>>
                    0),
                  p(n, r, r) !== y &&
                    t(
                      Error(
                        "invalid CRC-32 checksum: 0x" +
                          p(n, r, r).toString(16) +
                          " / 0x" +
                          y.toString(16)
                      )
                    ),
                  (s.Z = u =
                    (v[b++] |
                      (v[b++] << 8) |
                      (v[b++] << 16) |
                      (v[b++] << 24)) >>>
                    0),
                  (4294967295 & n.length) !== u &&
                    t(
                      Error(
                        "invalid input size: " +
                          (4294967295 & n.length) +
                          " / " +
                          u
                      )
                    ),
                  this.G.push(s),
                  (this.c = b);
              }
              this.R = i;
              var w,
                m,
                E,
                x = this.G,
                A = 0,
                k = 0;
              for (w = 0, m = x.length; w < m; ++w) k += x[w].data.length;
              if (o)
                for (E = new Uint8Array(k), w = 0; w < m; ++w)
                  E.set(x[w].data, A), (A += x[w].data.length);
              else {
                for (E = [], w = 0; w < m; ++w) E[w] = x[w].data;
                E = Array.prototype.concat.apply([], E);
              }
              return E;
            }),
            (st.prototype.i = function () {
              var e,
                r = this.input;
              return (
                (e = this.J.i()),
                (this.c = this.J.c),
                this.V &&
                  ((r[this.c++] << 24) |
                    (r[this.c++] << 16) |
                    (r[this.c++] << 8) |
                    r[this.c++]) >>>
                    0 !==
                    at(e) &&
                  t(Error("invalid adler-32 checksum")),
                e
              );
            });
          var ut = 8;
          function ct(t, e) {
            (this.input = t),
              (this.a = new (o ? Uint8Array : Array)(32768)),
              (this.k = ft.t);
            var r,
              n = {};
            for (r in ((!e && (e = {})) ||
              "number" != typeof e.compressionType ||
              (this.k = e.compressionType),
            e))
              n[r] = e[r];
            (n.outputBuffer = this.a), (this.I = new w(this.input, n));
          }
          var ft = x;
          function ht(t, e) {
            var r;
            return (r = new ct(t).h()), e || (e = {}), e.H ? r : yt(r);
          }
          function lt(t, e) {
            var r;
            return (
              (t.subarray = t.slice),
              (r = new st(t).i()),
              e || (e = {}),
              e.noBuffer ? r : yt(r)
            );
          }
          function pt(t, e) {
            var r;
            return (
              (t.subarray = t.slice),
              (r = new j(t).h()),
              e || (e = {}),
              e.H ? r : yt(r)
            );
          }
          function dt(t, e) {
            var r;
            return (
              (t.subarray = t.slice),
              (r = new ot(t).i()),
              e || (e = {}),
              e.H ? r : yt(r)
            );
          }
          function yt(t) {
            var e,
              r,
              i = new n(t.length);
            for (e = 0, r = t.length; e < r; ++e) i[e] = t[e];
            return i;
          }
          (ct.prototype.h = function () {
            var e,
              r,
              n,
              i,
              a,
              s,
              u,
              c = 0;
            if (
              ((u = this.a),
              (e = ut) === ut
                ? (r = Math.LOG2E * Math.log(32768) - 8)
                : t(Error("invalid compression method")),
              (n = (r << 4) | e),
              (u[c++] = n),
              e === ut)
            )
              switch (this.k) {
                case ft.NONE:
                  a = 0;
                  break;
                case ft.L:
                  a = 1;
                  break;
                case ft.t:
                  a = 2;
                  break;
                default:
                  t(Error("unsupported compression type"));
              }
            else t(Error("invalid compression method"));
            return (
              (i = (a << 6) | 0),
              (u[c++] = i | (31 - ((256 * n + i) % 31))),
              (s = at(this.input)),
              (this.I.b = c),
              (c = (u = this.I.h()).length),
              o &&
                ((u = new Uint8Array(u.buffer)).length <= c + 4 &&
                  ((this.a = new Uint8Array(u.length + 4)),
                  this.a.set(u),
                  (u = this.a)),
                (u = u.subarray(0, c + 4))),
              (u[c++] = (s >> 24) & 255),
              (u[c++] = (s >> 16) & 255),
              (u[c++] = (s >> 8) & 255),
              (u[c++] = 255 & s),
              u
            );
          }),
            (e.deflate = function (t, e, r) {
              process.nextTick(function () {
                var n, i;
                try {
                  i = ht(t, r);
                } catch (t) {
                  n = t;
                }
                e(n, i);
              });
            }),
            (e.deflateSync = ht),
            (e.inflate = function (t, e, r) {
              process.nextTick(function () {
                var n, i;
                try {
                  i = lt(t, r);
                } catch (t) {
                  n = t;
                }
                e(n, i);
              });
            }),
            (e.inflateSync = lt),
            (e.gzip = function (t, e, r) {
              process.nextTick(function () {
                var n, i;
                try {
                  i = pt(t, r);
                } catch (t) {
                  n = t;
                }
                e(n, i);
              });
            }),
            (e.gzipSync = pt),
            (e.gunzip = function (t, e, r) {
              process.nextTick(function () {
                var n, i;
                try {
                  i = dt(t, r);
                } catch (t) {
                  n = t;
                }
                e(n, i);
              });
            }),
            (e.gunzipSync = dt);
        }).call(this);
      },
      711: (t) => {
        t.exports = {
          OSD_ONLY: "0",
          AUTO_OSD: "1",
          AUTO_ONLY: "2",
          AUTO: "3",
          SINGLE_COLUMN: "4",
          SINGLE_BLOCK_VERT_TEXT: "5",
          SINGLE_BLOCK: "6",
          SINGLE_LINE: "7",
          SINGLE_WORD: "8",
          CIRCLE_WORD: "9",
          SINGLE_CHAR: "10",
          SPARSE_TEXT: "11",
          SPARSE_TEXT_OSD: "12",
          RAW_LINE: "13",
        };
      },
      862: (t) => {
        t.exports = { COLOR: 0, GREY: 1, BINARY: 2 };
      },
      129: (t, e, r) => {
        function n(t) {
          return (
            (n =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            n(t)
          );
        }
        var i = r(670);
        t.exports = function (t) {
          var e = {};
          return (
            "undefined" != typeof WorkerGlobalScope
              ? (e.type = "webworker")
              : i()
              ? (e.type = "electron")
              : "object" ===
                ("undefined" == typeof document ? "undefined" : n(document))
              ? (e.type = "browser")
              : "object" ===
                  ("undefined" == typeof process ? "undefined" : n(process)) &&
                (e.type = "node"),
            void 0 === t ? e : e[t]
          );
        };
      },
      185: function (t, e) {
        var r = this,
          n = !1;
        (e.logging = n),
          (e.setLogging = function (t) {
            n = t;
          }),
          (e.log = function () {
            for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
              e[i] = arguments[i];
            return n ? console.log.apply(r, e) : null;
          });
      },
      779: (t, e, r) => {
        var n = r(160),
          i = n.set,
          o = n.get,
          a = n.del;
        t.exports = {
          readCache: o,
          writeCache: i,
          deleteCache: a,
          checkCache: function (t) {
            return o(t).then(function (t) {
              return void 0 !== t;
            });
          },
        };
      },
      485: (t, e, r) => {
        function n() {
          "use strict";
          n = function () {
            return t;
          };
          var t = {},
            e = Object.prototype,
            r = e.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (t, e, r) {
                t[e] = r.value;
              },
            a = "function" == typeof Symbol ? Symbol : {},
            s = a.iterator || "@@iterator",
            u = a.asyncIterator || "@@asyncIterator",
            c = a.toStringTag || "@@toStringTag";
          function f(t, e, r) {
            return (
              Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            f({}, "");
          } catch (t) {
            f = function (t, e, r) {
              return (t[e] = r);
            };
          }
          function h(t, e, r, n) {
            var i = e && e.prototype instanceof d ? e : d,
              a = Object.create(i.prototype),
              s = new I(n || []);
            return o(a, "_invoke", { value: A(t, r, s) }), a;
          }
          function l(t, e, r) {
            try {
              return { type: "normal", arg: t.call(e, r) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          t.wrap = h;
          var p = {};
          function d() {}
          function y() {}
          function g() {}
          var v = {};
          f(v, s, function () {
            return this;
          });
          var b = Object.getPrototypeOf,
            w = b && b(b(S([])));
          w && w !== e && r.call(w, s) && (v = w);
          var m = (g.prototype = d.prototype = Object.create(v));
          function E(t) {
            ["next", "throw", "return"].forEach(function (e) {
              f(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function x(t, e) {
            function n(o, a, s, u) {
              var c = l(t[o], t, a);
              if ("throw" !== c.type) {
                var f = c.arg,
                  h = f.value;
                return h && "object" == i(h) && r.call(h, "__await")
                  ? e.resolve(h.__await).then(
                      function (t) {
                        n("next", t, s, u);
                      },
                      function (t) {
                        n("throw", t, s, u);
                      }
                    )
                  : e.resolve(h).then(
                      function (t) {
                        (f.value = t), s(f);
                      },
                      function (t) {
                        return n("throw", t, s, u);
                      }
                    );
              }
              u(c.arg);
            }
            var a;
            o(this, "_invoke", {
              value: function (t, r) {
                function i() {
                  return new e(function (e, i) {
                    n(t, r, e, i);
                  });
                }
                return (a = a ? a.then(i, i) : i());
              },
            });
          }
          function A(t, e, r) {
            var n = "suspendedStart";
            return function (i, o) {
              if ("executing" === n)
                throw new Error("Generator is already running");
              if ("completed" === n) {
                if ("throw" === i) throw o;
                return { value: void 0, done: !0 };
              }
              for (r.method = i, r.arg = o; ; ) {
                var a = r.delegate;
                if (a) {
                  var s = k(a, r);
                  if (s) {
                    if (s === p) continue;
                    return s;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = "executing";
                var u = l(t, e, r);
                if ("normal" === u.type) {
                  if (
                    ((n = r.done ? "completed" : "suspendedYield"), u.arg === p)
                  )
                    continue;
                  return { value: u.arg, done: r.done };
                }
                "throw" === u.type &&
                  ((n = "completed"), (r.method = "throw"), (r.arg = u.arg));
              }
            };
          }
          function k(t, e) {
            var r = e.method,
              n = t.iterator[r];
            if (void 0 === n)
              return (
                (e.delegate = null),
                ("throw" === r &&
                  t.iterator.return &&
                  ((e.method = "return"),
                  (e.arg = void 0),
                  k(t, e),
                  "throw" === e.method)) ||
                  ("return" !== r &&
                    ((e.method = "throw"),
                    (e.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                p
              );
            var i = l(n, t.iterator, e.arg);
            if ("throw" === i.type)
              return (
                (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), p
              );
            var o = i.arg;
            return o
              ? o.done
                ? ((e[t.resultName] = o.value),
                  (e.next = t.nextLoc),
                  "return" !== e.method &&
                    ((e.method = "next"), (e.arg = void 0)),
                  (e.delegate = null),
                  p)
                : o
              : ((e.method = "throw"),
                (e.arg = new TypeError("iterator result is not an object")),
                (e.delegate = null),
                p);
          }
          function _(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function O(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function I(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(_, this),
              this.reset(!0);
          }
          function S(t) {
            if (t) {
              var e = t[s];
              if (e) return e.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var n = -1,
                  i = function e() {
                    for (; ++n < t.length; )
                      if (r.call(t, n))
                        return (e.value = t[n]), (e.done = !1), e;
                    return (e.value = void 0), (e.done = !0), e;
                  };
                return (i.next = i);
              }
            }
            return { next: L };
          }
          function L() {
            return { value: void 0, done: !0 };
          }
          return (
            (y.prototype = g),
            o(m, "constructor", { value: g, configurable: !0 }),
            o(g, "constructor", { value: y, configurable: !0 }),
            (y.displayName = f(g, c, "GeneratorFunction")),
            (t.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === y || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (t.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, g)
                  : ((t.__proto__ = g), f(t, c, "GeneratorFunction")),
                (t.prototype = Object.create(m)),
                t
              );
            }),
            (t.awrap = function (t) {
              return { __await: t };
            }),
            E(x.prototype),
            f(x.prototype, u, function () {
              return this;
            }),
            (t.AsyncIterator = x),
            (t.async = function (e, r, n, i, o) {
              void 0 === o && (o = Promise);
              var a = new x(h(e, r, n, i), o);
              return t.isGeneratorFunction(r)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            E(m),
            f(m, c, "Generator"),
            f(m, s, function () {
              return this;
            }),
            f(m, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (t) {
              var e = Object(t),
                r = [];
              for (var n in e) r.push(n);
              return (
                r.reverse(),
                function t() {
                  for (; r.length; ) {
                    var n = r.pop();
                    if (n in e) return (t.value = n), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (t.values = S),
            (I.prototype = {
              constructor: I,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = void 0),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = void 0),
                  this.tryEntries.forEach(O),
                  !t)
                )
                  for (var e in this)
                    "t" === e.charAt(0) &&
                      r.call(this, e) &&
                      !isNaN(+e.slice(1)) &&
                      (this[e] = void 0);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var e = this;
                function n(r, n) {
                  return (
                    (a.type = "throw"),
                    (a.arg = t),
                    (e.next = r),
                    n && ((e.method = "next"), (e.arg = void 0)),
                    !!n
                  );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var o = this.tryEntries[i],
                    a = o.completion;
                  if ("root" === o.tryLoc) return n("end");
                  if (o.tryLoc <= this.prev) {
                    var s = r.call(o, "catchLoc"),
                      u = r.call(o, "finallyLoc");
                    if (s && u) {
                      if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                    } else if (s) {
                      if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                    } else {
                      if (!u)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var i = this.tryEntries[n];
                  if (
                    i.tryLoc <= this.prev &&
                    r.call(i, "finallyLoc") &&
                    this.prev < i.finallyLoc
                  ) {
                    var o = i;
                    break;
                  }
                }
                o &&
                  ("break" === t || "continue" === t) &&
                  o.tryLoc <= e &&
                  e <= o.finallyLoc &&
                  (o = null);
                var a = o ? o.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  o
                    ? ((this.method = "next"), (this.next = o.finallyLoc), p)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  p
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.finallyLoc === t)
                    return this.complete(r.completion, r.afterLoc), O(r), p;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.tryLoc === t) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var i = n.arg;
                      O(r);
                    }
                    return i;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, e, r) {
                return (
                  (this.delegate = {
                    iterator: S(t),
                    resultName: e,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = void 0),
                  p
                );
              },
            }),
            t
          );
        }
        function i(t) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            i(t)
          );
        }
        function o(t, e, r, n, i, o, a) {
          try {
            var s = t[o](a),
              u = s.value;
          } catch (t) {
            return void r(t);
          }
          s.done ? e(u) : Promise.resolve(u).then(n, i);
        }
        var a = r(506).simd,
          s = r(147).HO._X;
        t.exports = (function () {
          var t,
            e =
              ((t = n().mark(function t(e, o, u) {
                var c, f, h, l;
                return n().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        if (void 0 !== r.g.TesseractCore) {
                          t.next = 20;
                          break;
                        }
                        if (
                          ((c = "loading tesseract core"),
                          u.progress({ status: c, progress: 0 }),
                          "js" !==
                            (f =
                              o ||
                              "https://cdn.jsdelivr.net/npm/tesseract.js-core@v".concat(
                                s.substring(1)
                              )).slice(-2))
                        ) {
                          t.next = 8;
                          break;
                        }
                        (h = f), (t.next = 12);
                        break;
                      case 8:
                        return (t.next = 10), a();
                      case 10:
                        (l = t.sent),
                          (h = "".concat(
                            f.replace(/\/$/, ""),
                            l
                              ? e
                                ? "/tesseract-core-simd-lstm.wasm.js"
                                : "/tesseract-core-simd.wasm.js"
                              : e
                              ? "/tesseract-core-lstm.wasm.js"
                              : "/tesseract-core.wasm.js"
                          ));
                      case 12:
                        if (
                          (r.g.importScripts(h),
                          void 0 !== r.g.TesseractCore ||
                            void 0 === r.g.TesseractCoreWASM ||
                            "object" !==
                              ("undefined" == typeof WebAssembly
                                ? "undefined"
                                : i(WebAssembly)))
                        ) {
                          t.next = 17;
                          break;
                        }
                        (r.g.TesseractCore = r.g.TesseractCoreWASM),
                          (t.next = 19);
                        break;
                      case 17:
                        if (void 0 !== r.g.TesseractCore) {
                          t.next = 19;
                          break;
                        }
                        throw Error("Failed to load TesseractCore");
                      case 19:
                        u.progress({ status: c, progress: 1 });
                      case 20:
                        return t.abrupt("return", r.g.TesseractCore);
                      case 21:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })),
              function () {
                var e = this,
                  r = arguments;
                return new Promise(function (n, i) {
                  var a = t.apply(e, r);
                  function s(t) {
                    o(a, n, i, s, u, "next", t);
                  }
                  function u(t) {
                    o(a, n, i, s, u, "throw", t);
                  }
                  s(void 0);
                });
              });
          return function (t, r, n) {
            return e.apply(this, arguments);
          };
        })();
      },
      687: (t, e, r) => {
        t.exports = r(645).gunzipSync;
      },
      730: (t) => {
        t.exports = {
          text: !0,
          blocks: !0,
          layoutBlocks: !1,
          hocr: !0,
          tsv: !0,
          box: !1,
          unlv: !1,
          osd: !1,
          pdf: !1,
          imageColor: !1,
          imageGrey: !1,
          imageBinary: !1,
          debug: !1,
        };
      },
      688: (t, e, r) => {
        var n = r(711);
        t.exports = {
          tessedit_pageseg_mode: n.SINGLE_BLOCK,
          tessedit_char_whitelist: "",
          tessjs_create_hocr: "1",
          tessjs_create_tsv: "1",
          tessjs_create_box: "0",
          tessjs_create_unlv: "0",
          tessjs_create_osd: "0",
        };
      },
      217: function (t, e, r) {
        var n = this;
        function i(t) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            i(t)
          );
        }
        function o(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function a(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? o(Object(r), !0).forEach(function (e) {
                  s(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
              : o(Object(r)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(r, e)
                  );
                });
          }
          return t;
        }
        function s(t, e, r) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" !== i(t) || null === t) return t;
                var r = t[Symbol.toPrimitive];
                if (void 0 !== r) {
                  var n = r.call(t, "string");
                  if ("object" !== i(n)) return n;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return String(t);
              })(t);
              return "symbol" === i(e) ? e : String(e);
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        function u(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function c() {
          "use strict";
          c = function () {
            return t;
          };
          var t = {},
            e = Object.prototype,
            r = e.hasOwnProperty,
            n =
              Object.defineProperty ||
              function (t, e, r) {
                t[e] = r.value;
              },
            o = "function" == typeof Symbol ? Symbol : {},
            a = o.iterator || "@@iterator",
            s = o.asyncIterator || "@@asyncIterator",
            u = o.toStringTag || "@@toStringTag";
          function f(t, e, r) {
            return (
              Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            f({}, "");
          } catch (t) {
            f = function (t, e, r) {
              return (t[e] = r);
            };
          }
          function h(t, e, r, i) {
            var o = e && e.prototype instanceof d ? e : d,
              a = Object.create(o.prototype),
              s = new I(i || []);
            return n(a, "_invoke", { value: A(t, r, s) }), a;
          }
          function l(t, e, r) {
            try {
              return { type: "normal", arg: t.call(e, r) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          t.wrap = h;
          var p = {};
          function d() {}
          function y() {}
          function g() {}
          var v = {};
          f(v, a, function () {
            return this;
          });
          var b = Object.getPrototypeOf,
            w = b && b(b(S([])));
          w && w !== e && r.call(w, a) && (v = w);
          var m = (g.prototype = d.prototype = Object.create(v));
          function E(t) {
            ["next", "throw", "return"].forEach(function (e) {
              f(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function x(t, e) {
            function o(n, a, s, u) {
              var c = l(t[n], t, a);
              if ("throw" !== c.type) {
                var f = c.arg,
                  h = f.value;
                return h && "object" == i(h) && r.call(h, "__await")
                  ? e.resolve(h.__await).then(
                      function (t) {
                        o("next", t, s, u);
                      },
                      function (t) {
                        o("throw", t, s, u);
                      }
                    )
                  : e.resolve(h).then(
                      function (t) {
                        (f.value = t), s(f);
                      },
                      function (t) {
                        return o("throw", t, s, u);
                      }
                    );
              }
              u(c.arg);
            }
            var a;
            n(this, "_invoke", {
              value: function (t, r) {
                function n() {
                  return new e(function (e, n) {
                    o(t, r, e, n);
                  });
                }
                return (a = a ? a.then(n, n) : n());
              },
            });
          }
          function A(t, e, r) {
            var n = "suspendedStart";
            return function (i, o) {
              if ("executing" === n)
                throw new Error("Generator is already running");
              if ("completed" === n) {
                if ("throw" === i) throw o;
                return { value: void 0, done: !0 };
              }
              for (r.method = i, r.arg = o; ; ) {
                var a = r.delegate;
                if (a) {
                  var s = k(a, r);
                  if (s) {
                    if (s === p) continue;
                    return s;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = "executing";
                var u = l(t, e, r);
                if ("normal" === u.type) {
                  if (
                    ((n = r.done ? "completed" : "suspendedYield"), u.arg === p)
                  )
                    continue;
                  return { value: u.arg, done: r.done };
                }
                "throw" === u.type &&
                  ((n = "completed"), (r.method = "throw"), (r.arg = u.arg));
              }
            };
          }
          function k(t, e) {
            var r = e.method,
              n = t.iterator[r];
            if (void 0 === n)
              return (
                (e.delegate = null),
                ("throw" === r &&
                  t.iterator.return &&
                  ((e.method = "return"),
                  (e.arg = void 0),
                  k(t, e),
                  "throw" === e.method)) ||
                  ("return" !== r &&
                    ((e.method = "throw"),
                    (e.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                p
              );
            var i = l(n, t.iterator, e.arg);
            if ("throw" === i.type)
              return (
                (e.method = "throw"), (e.arg = i.arg), (e.delegate = null), p
              );
            var o = i.arg;
            return o
              ? o.done
                ? ((e[t.resultName] = o.value),
                  (e.next = t.nextLoc),
                  "return" !== e.method &&
                    ((e.method = "next"), (e.arg = void 0)),
                  (e.delegate = null),
                  p)
                : o
              : ((e.method = "throw"),
                (e.arg = new TypeError("iterator result is not an object")),
                (e.delegate = null),
                p);
          }
          function _(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function O(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function I(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(_, this),
              this.reset(!0);
          }
          function S(t) {
            if (t) {
              var e = t[a];
              if (e) return e.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var n = -1,
                  i = function e() {
                    for (; ++n < t.length; )
                      if (r.call(t, n))
                        return (e.value = t[n]), (e.done = !1), e;
                    return (e.value = void 0), (e.done = !0), e;
                  };
                return (i.next = i);
              }
            }
            return { next: L };
          }
          function L() {
            return { value: void 0, done: !0 };
          }
          return (
            (y.prototype = g),
            n(m, "constructor", { value: g, configurable: !0 }),
            n(g, "constructor", { value: y, configurable: !0 }),
            (y.displayName = f(g, u, "GeneratorFunction")),
            (t.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === y || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (t.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, g)
                  : ((t.__proto__ = g), f(t, u, "GeneratorFunction")),
                (t.prototype = Object.create(m)),
                t
              );
            }),
            (t.awrap = function (t) {
              return { __await: t };
            }),
            E(x.prototype),
            f(x.prototype, s, function () {
              return this;
            }),
            (t.AsyncIterator = x),
            (t.async = function (e, r, n, i, o) {
              void 0 === o && (o = Promise);
              var a = new x(h(e, r, n, i), o);
              return t.isGeneratorFunction(r)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            E(m),
            f(m, u, "Generator"),
            f(m, a, function () {
              return this;
            }),
            f(m, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (t) {
              var e = Object(t),
                r = [];
              for (var n in e) r.push(n);
              return (
                r.reverse(),
                function t() {
                  for (; r.length; ) {
                    var n = r.pop();
                    if (n in e) return (t.value = n), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (t.values = S),
            (I.prototype = {
              constructor: I,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = void 0),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = void 0),
                  this.tryEntries.forEach(O),
                  !t)
                )
                  for (var e in this)
                    "t" === e.charAt(0) &&
                      r.call(this, e) &&
                      !isNaN(+e.slice(1)) &&
                      (this[e] = void 0);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var e = this;
                function n(r, n) {
                  return (
                    (a.type = "throw"),
                    (a.arg = t),
                    (e.next = r),
                    n && ((e.method = "next"), (e.arg = void 0)),
                    !!n
                  );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var o = this.tryEntries[i],
                    a = o.completion;
                  if ("root" === o.tryLoc) return n("end");
                  if (o.tryLoc <= this.prev) {
                    var s = r.call(o, "catchLoc"),
                      u = r.call(o, "finallyLoc");
                    if (s && u) {
                      if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                    } else if (s) {
                      if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                    } else {
                      if (!u)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var i = this.tryEntries[n];
                  if (
                    i.tryLoc <= this.prev &&
                    r.call(i, "finallyLoc") &&
                    this.prev < i.finallyLoc
                  ) {
                    var o = i;
                    break;
                  }
                }
                o &&
                  ("break" === t || "continue" === t) &&
                  o.tryLoc <= e &&
                  e <= o.finallyLoc &&
                  (o = null);
                var a = o ? o.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  o
                    ? ((this.method = "next"), (this.next = o.finallyLoc), p)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  p
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.finallyLoc === t)
                    return this.complete(r.completion, r.afterLoc), O(r), p;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e];
                  if (r.tryLoc === t) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var i = n.arg;
                      O(r);
                    }
                    return i;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, e, r) {
                return (
                  (this.delegate = {
                    iterator: S(t),
                    resultName: e,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = void 0),
                  p
                );
              },
            }),
            t
          );
        }
        function f(t, e, r, n, i, o, a) {
          try {
            var s = t[o](a),
              u = s.value;
          } catch (t) {
            return void r(t);
          }
          s.done ? e(u) : Promise.resolve(u).then(n, i);
        }
        function h(t) {
          return function () {
            var e = this,
              r = arguments;
            return new Promise(function (n, i) {
              var o = t.apply(e, r);
              function a(t) {
                f(o, n, i, a, s, "next", t);
              }
              function s(t) {
                f(o, n, i, a, s, "throw", t);
              }
              a(void 0);
            });
          };
        }
        r(760);
        var l,
          p,
          d,
          y,
          g = r(975),
          v = r(333),
          b = r(129)("type"),
          w = r(472),
          m = r(688),
          E = r(730),
          x = r(185),
          A = x.log,
          k = x.setLogging,
          _ = r(711),
          O = null,
          I = {},
          S = m,
          L = !1,
          U = (function () {
            var t = h(
              c().mark(function t(e, r) {
                var n, i, o, a, s, u, f, h;
                return c().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        if (
                          ((n = e.workerId),
                          (i = e.jobId),
                          (o = e.payload.options),
                          (a = o.lstmOnly),
                          (s = o.corePath),
                          (u = o.logging),
                          k(u),
                          (f = "initializing tesseract"),
                          l)
                        ) {
                          t.next = 11;
                          break;
                        }
                        return (t.next = 6), I.getCore(a, s, r);
                      case 6:
                        (h = t.sent),
                          r.progress({ workerId: n, status: f, progress: 0 }),
                          h({
                            TesseractProgress: function (t) {
                              p.progress({
                                workerId: n,
                                jobId: i,
                                status: "recognizing text",
                                progress: Math.max(0, (t - 30) / 70),
                              });
                            },
                          }).then(function (t) {
                            (l = t),
                              r.progress({
                                workerId: n,
                                status: f,
                                progress: 1,
                              }),
                              r.resolve({ loaded: !0 });
                          }),
                          (t.next = 12);
                        break;
                      case 11:
                        r.resolve({ loaded: !0 });
                      case 12:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function (e, r) {
              return t.apply(this, arguments);
            };
          })(),
          j = (function () {
            var t = h(
              c().mark(function t(e, r) {
                var n, i, o, a, s;
                return c().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        (i = e.workerId),
                          (o = e.payload),
                          (a = o.method),
                          (s = o.args),
                          A("[".concat(i, "]: FS.").concat(a)),
                          r.resolve(
                            (n = l.FS)[a].apply(
                              n,
                              (function (t) {
                                if (Array.isArray(t)) return u(t);
                              })((c = s)) ||
                                (function (t) {
                                  if (
                                    ("undefined" != typeof Symbol &&
                                      null != t[Symbol.iterator]) ||
                                    null != t["@@iterator"]
                                  )
                                    return Array.from(t);
                                })(c) ||
                                (function (t, e) {
                                  if (t) {
                                    if ("string" == typeof t) return u(t, e);
                                    var r = Object.prototype.toString
                                      .call(t)
                                      .slice(8, -1);
                                    return (
                                      "Object" === r &&
                                        t.constructor &&
                                        (r = t.constructor.name),
                                      "Map" === r || "Set" === r
                                        ? Array.from(t)
                                        : "Arguments" === r ||
                                          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                            r
                                          )
                                        ? u(t, e)
                                        : void 0
                                    );
                                  }
                                })(c) ||
                                (function () {
                                  throw new TypeError(
                                    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                                  );
                                })()
                            )
                          );
                      case 3:
                      case "end":
                        return t.stop();
                    }
                  var c;
                }, t);
              })
            );
            return function (e, r) {
              return t.apply(this, arguments);
            };
          })(),
          B = (function () {
            var t = h(
              c().mark(function t(e, r) {
                var n, i, o, a, s, u, f, p, v, w, m, E, x, k, _;
                return c().wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (n = e.workerId),
                            (i = e.payload),
                            (o = i.langs),
                            (a = i.options),
                            (s = a.langPath),
                            (u = a.dataPath),
                            (f = a.cachePath),
                            (p = a.cacheMethod),
                            (v = a.gzip),
                            (w = void 0 === v || v),
                            (m = a.lstmOnly),
                            (d = o),
                            (y = {
                              langPath: s,
                              dataPath: u,
                              cachePath: f,
                              cacheMethod: p,
                              gzip: w,
                              lstmOnly: m,
                            }),
                            (E = "loading language traineddata"),
                            (x = "string" == typeof o ? o.split("+") : o),
                            (k = 0),
                            (_ = (function () {
                              var t = h(
                                c().mark(function t(e) {
                                  var i, o, a, h, d, y, v, _, O;
                                  return c().wrap(
                                    function (t) {
                                      for (;;)
                                        switch ((t.prev = t.next)) {
                                          case 0:
                                            return (
                                              (i =
                                                "string" == typeof e
                                                  ? e
                                                  : e.code),
                                              (o = ["refresh", "none"].includes(
                                                p
                                              )
                                                ? function () {
                                                    return Promise.resolve();
                                                  }
                                                : I.readCache),
                                              (a = null),
                                              (h = !1),
                                              (t.prev = 4),
                                              (t.next = 7),
                                              o(
                                                ""
                                                  .concat(f || ".", "/")
                                                  .concat(i, ".traineddata")
                                              )
                                            );
                                          case 7:
                                            if (void 0 === (d = t.sent)) {
                                              t.next = 14;
                                              break;
                                            }
                                            A(
                                              "["
                                                .concat(n, "]: Load ")
                                                .concat(
                                                  i,
                                                  ".traineddata from cache"
                                                )
                                            ),
                                              (a = d),
                                              (L = !0),
                                              (t.next = 15);
                                            break;
                                          case 14:
                                            throw Error("Not found in cache");
                                          case 15:
                                            t.next = 45;
                                            break;
                                          case 17:
                                            if (
                                              ((t.prev = 17),
                                              (t.t0 = t.catch(4)),
                                              (h = !0),
                                              A(
                                                "["
                                                  .concat(n, "]: Load ")
                                                  .concat(
                                                    i,
                                                    ".traineddata from "
                                                  )
                                                  .concat(s)
                                              ),
                                              "string" != typeof e)
                                            ) {
                                              t.next = 44;
                                              break;
                                            }
                                            if (
                                              ((y = null),
                                              (v =
                                                s ||
                                                "https://cdn.jsdelivr.net/npm/@tesseract.js-data/".concat(
                                                  i,
                                                  m
                                                    ? "/4.0.0_best_int"
                                                    : "/4.0.0"
                                                )),
                                              ("node" !== b ||
                                                g(v) ||
                                                v.startsWith(
                                                  "moz-extension://"
                                                ) ||
                                                v.startsWith(
                                                  "chrome-extension://"
                                                ) ||
                                                v.startsWith("file://")) &&
                                                (y = v.replace(/\/$/, "")),
                                              null === y)
                                            ) {
                                              t.next = 39;
                                              break;
                                            }
                                            return (
                                              (_ = ""
                                                .concat(y, "/")
                                                .concat(i, ".traineddata")
                                                .concat(w ? ".gz" : "")),
                                              (t.next = 29),
                                              ("webworker" === b
                                                ? fetch
                                                : I.fetch)(_)
                                            );
                                          case 29:
                                            if ((O = t.sent).ok) {
                                              t.next = 32;
                                              break;
                                            }
                                            throw Error(
                                              "Network error while fetching "
                                                .concat(_, ". Response code: ")
                                                .concat(O.status)
                                            );
                                          case 32:
                                            return (
                                              (t.t1 = Uint8Array),
                                              (t.next = 35),
                                              O.arrayBuffer()
                                            );
                                          case 35:
                                            (t.t2 = t.sent),
                                              (a = new t.t1(t.t2)),
                                              (t.next = 42);
                                            break;
                                          case 39:
                                            return (
                                              (t.next = 41),
                                              I.readCache(
                                                ""
                                                  .concat(v, "/")
                                                  .concat(i, ".traineddata")
                                                  .concat(w ? ".gz" : "")
                                              )
                                            );
                                          case 41:
                                            a = t.sent;
                                          case 42:
                                            t.next = 45;
                                            break;
                                          case 44:
                                            a = e.data;
                                          case 45:
                                            if (
                                              ((k += 0.5 / x.length),
                                              r &&
                                                r.progress({
                                                  workerId: n,
                                                  status: E,
                                                  progress: k,
                                                }),
                                              ((31 === a[0] && 139 === a[1]) ||
                                                (31 === a[1] &&
                                                  139 === a[0])) &&
                                                (a = I.gunzip(a)),
                                              l)
                                            ) {
                                              if (u)
                                                try {
                                                  l.FS.mkdir(u);
                                                } catch (t) {
                                                  r && r.reject(t.toString());
                                                }
                                              l.FS.writeFile(
                                                ""
                                                  .concat(u || ".", "/")
                                                  .concat(i, ".traineddata"),
                                                a
                                              );
                                            }
                                            if (
                                              !h ||
                                              ![
                                                "write",
                                                "refresh",
                                                void 0,
                                              ].includes(p)
                                            ) {
                                              t.next = 60;
                                              break;
                                            }
                                            return (
                                              (t.prev = 51),
                                              (t.next = 54),
                                              I.writeCache(
                                                ""
                                                  .concat(f || ".", "/")
                                                  .concat(i, ".traineddata"),
                                                a
                                              )
                                            );
                                          case 54:
                                            t.next = 60;
                                            break;
                                          case 56:
                                            (t.prev = 56),
                                              (t.t3 = t.catch(51)),
                                              A(
                                                "["
                                                  .concat(
                                                    n,
                                                    "]: Failed to write "
                                                  )
                                                  .concat(
                                                    i,
                                                    ".traineddata to cache due to error:"
                                                  )
                                              ),
                                              A(t.t3.toString());
                                          case 60:
                                            (k += 0.5 / x.length),
                                              100 === Math.round(100 * k) &&
                                                (k = 1),
                                              r &&
                                                r.progress({
                                                  workerId: n,
                                                  status: E,
                                                  progress: k,
                                                });
                                          case 63:
                                          case "end":
                                            return t.stop();
                                        }
                                    },
                                    t,
                                    null,
                                    [
                                      [4, 17],
                                      [51, 56],
                                    ]
                                  );
                                })
                              );
                              return function (e) {
                                return t.apply(this, arguments);
                              };
                            })()),
                            r &&
                              r.progress({
                                workerId: n,
                                status: E,
                                progress: 0,
                              }),
                            (t.prev = 8),
                            (t.next = 11),
                            Promise.all(x.map(_))
                          );
                        case 11:
                          r && r.resolve(o), (t.next = 17);
                          break;
                        case 14:
                          (t.prev = 14),
                            (t.t0 = t.catch(8)),
                            r && r.reject(t.t0.toString());
                        case 17:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[8, 14]]
                );
              })
            );
            return function (e, r) {
              return t.apply(this, arguments);
            };
          })(),
          T = (function () {
            var t = h(
              c().mark(function t(e, r) {
                var n, i, o;
                return c().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        (n = e.payload.params),
                          (i = [
                            "ambigs_debug_level",
                            "user_words_suffix",
                            "user_patterns_suffix",
                            "user_patterns_suffix",
                            "load_system_dawg",
                            "load_freq_dawg",
                            "load_unambig_dawg",
                            "load_punc_dawg",
                            "load_number_dawg",
                            "load_bigram_dawg",
                            "tessedit_ocr_engine_mode",
                            "tessedit_init_config_only",
                            "language_model_ngram_on",
                            "language_model_use_sigmoidal_certainty",
                          ]),
                          (o = Object.keys(n)
                            .filter(function (t) {
                              return i.includes(t);
                            })
                            .join(", ")).length > 0 &&
                            console.log(
                              "Attempted to set parameters that can only be set during initialization: ".concat(
                                o
                              )
                            ),
                          Object.keys(n)
                            .filter(function (t) {
                              return !t.startsWith("tessjs_");
                            })
                            .forEach(function (t) {
                              O.SetVariable(t, n[t]);
                            }),
                          (S = a(a({}, S), n)),
                          void 0 !== r && r.resolve(S);
                      case 7:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function (e, r) {
              return t.apply(this, arguments);
            };
          })(),
          P = (function () {
            var t = h(
              c().mark(function t(e, r) {
                var n, o, a, s, u, f, h, p, g, v, b, w, E, x;
                return c().wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (
                            ((n = e.workerId),
                            (o = e.payload),
                            (a = o.langs),
                            (s = o.oem),
                            (u = o.config),
                            (f =
                              "string" == typeof a
                                ? a
                                : a
                                    .map(function (t) {
                                      return "string" == typeof t ? t : t.data;
                                    })
                                    .join("+")),
                            (h = "initializing api"),
                            (t.prev = 3),
                            r.progress({ workerId: n, status: h, progress: 0 }),
                            null !== O && O.End(),
                            u && "object" === i(u) && Object.keys(u).length > 0
                              ? (g = JSON.stringify(u)
                                  .replace(/,/g, "\n")
                                  .replace(/:/g, " ")
                                  .replace(/["'{}]/g, ""))
                              : u && "string" == typeof u && (g = u),
                            "string" == typeof g &&
                              ((p = "/config"), l.FS.writeFile(p, g)),
                            (O = new l.TessBaseAPI()),
                            -1 !== (v = O.Init(null, f, s, p)))
                          ) {
                            t.next = 30;
                            break;
                          }
                          if (
                            !["write", "refresh", void 0].includes(
                              y.cacheMethod
                            )
                          ) {
                            t.next = 30;
                            break;
                          }
                          return (
                            (b = f.split("+")),
                            (w = b.map(function (t) {
                              return I.deleteCache(
                                ""
                                  .concat(y.cachePath || ".", "/")
                                  .concat(t, ".traineddata")
                              );
                            })),
                            (t.next = 16),
                            Promise.all(w)
                          );
                        case 16:
                          if (
                            ((E = l.FS.readFile("/debugDev.txt", {
                              encoding: "utf8",
                              flags: "a+",
                            })),
                            !L || !/components are not present/.test(E))
                          ) {
                            t.next = 30;
                            break;
                          }
                          return (
                            A(
                              "Data from cache missing requested OEM model. Attempting to refresh cache with new language data."
                            ),
                            (t.next = 21),
                            B({
                              workerId: n,
                              payload: { langs: d, options: y },
                            })
                          );
                        case 21:
                          if (-1 !== (v = O.Init(null, f, s, p))) {
                            t.next = 29;
                            break;
                          }
                          return (
                            A("Language data refresh failed."),
                            (x = b.map(function (t) {
                              return I.deleteCache(
                                ""
                                  .concat(y.cachePath || ".", "/")
                                  .concat(t, ".traineddata")
                              );
                            })),
                            (t.next = 27),
                            Promise.all(x)
                          );
                        case 27:
                          t.next = 30;
                          break;
                        case 29:
                          A("Language data refresh successful.");
                        case 30:
                          return (
                            -1 === v && r.reject("initialization failed"),
                            (S = m),
                            (t.next = 34),
                            T({ payload: { params: S } })
                          );
                        case 34:
                          r.progress({ workerId: n, status: h, progress: 1 }),
                            r.resolve(),
                            (t.next = 41);
                          break;
                        case 38:
                          (t.prev = 38),
                            (t.t0 = t.catch(3)),
                            r.reject(t.t0.toString());
                        case 41:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[3, 38]]
                );
              })
            );
            return function (e, r) {
              return t.apply(this, arguments);
            };
          })(),
          R = function (t, e) {
            var r = new l.TessPDFRenderer("tesseract-ocr", "/", e);
            return (
              r.BeginDocument(t),
              r.AddImage(O),
              r.EndDocument(),
              l._free(r),
              l.FS.readFile("/tesseract-ocr.pdf")
            );
          },
          C = (function () {
            var t = h(
              c().mark(function t(e, r) {
                var n, i, o;
                return c().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        (n = e.payload),
                          (i = n.title),
                          (o = n.textonly),
                          r.resolve(R(i, o));
                      case 2:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function (e, r) {
              return t.apply(this, arguments);
            };
          })(),
          N = function (t) {
            var e = JSON.parse(JSON.stringify(E));
            "1" === S.tessjs_create_box && (e.box = !0),
              "1" === S.tessjs_create_hocr && (e.hocr = !0),
              "1" === S.tessjs_create_osd && (e.osd = !0),
              "1" === S.tessjs_create_tsv && (e.tsv = !0),
              "1" === S.tessjs_create_unlv && (e.unlv = !0);
            for (
              var r = [
                  "imageColor",
                  "imageGrey",
                  "imageBinary",
                  "layoutBlocks",
                  "debug",
                ],
                n = 0,
                i = 0,
                o = Object.keys(t);
              i < o.length;
              i++
            ) {
              var a = o[i];
              e[a] = t[a];
            }
            for (var s = 0, u = Object.keys(e); s < u.length; s++) {
              var c = u[s];
              e[c] && (r.includes(c) || (n += 1));
            }
            return { workingOutput: e, skipRecognition: 0 === n };
          },
          M = [
            "rectangle",
            "pdfTitle",
            "pdfTextOnly",
            "rotateAuto",
            "rotateRadians",
          ],
          F = (function () {
            var t = h(
              c().mark(function t(e, r) {
                var n,
                  o,
                  a,
                  s,
                  u,
                  f,
                  h,
                  p,
                  d,
                  y,
                  g,
                  b,
                  m,
                  E,
                  x,
                  k,
                  I,
                  S,
                  L,
                  U,
                  j,
                  B;
                return c().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        (n = e.payload),
                          (o = n.image),
                          (a = n.options),
                          (s = n.output);
                        try {
                          if (
                            ((u = {}),
                            "object" === i(a) && Object.keys(a).length > 0)
                          )
                            for (f = 0, h = Object.keys(a); f < h.length; f++)
                              (p = h[f]).startsWith("tessjs_") ||
                                M.includes(p) ||
                                (u[p] = a[p]);
                          if (
                            (s.debug &&
                              ((u.debug_file = "/debugInternal.txt"),
                              l.FS.writeFile("/debugInternal.txt", "")),
                            Object.keys(u).length > 0)
                          )
                            for (
                              O.SaveParameters(), d = 0, y = Object.keys(u);
                              d < y.length;
                              d++
                            )
                              (g = y[d]), O.SetVariable(g, u[g]);
                          (b = N(s)),
                            (m = b.workingOutput),
                            (E = b.skipRecognition),
                            a.rotateAuto
                              ? ((k = O.GetPageSegMode()),
                                (I = !1),
                                [_.AUTO, _.AUTO_ONLY, _.OSD].includes(
                                  String(k)
                                ) ||
                                  ((I = !0),
                                  O.SetVariable(
                                    "tessedit_pageseg_mode",
                                    String(_.AUTO)
                                  )),
                                w(l, O, o),
                                O.FindLines(),
                                (S = O.GetGradient
                                  ? O.GetGradient()
                                  : O.GetAngle()),
                                I &&
                                  O.SetVariable(
                                    "tessedit_pageseg_mode",
                                    String(k)
                                  ),
                                Math.abs(S) >= 0.005
                                  ? w(l, O, o, (x = S))
                                  : (I && w(l, O, o), (x = 0)))
                              : ((x = a.rotateRadians || 0), w(l, O, o, x)),
                            "object" === i((L = a.rectangle)) &&
                              O.SetRectangle(L.left, L.top, L.width, L.height),
                            E
                              ? (s.layoutBlocks && O.AnalyseLayout(),
                                A(
                                  "Skipping recognition: all output options requiring recognition are disabled."
                                ))
                              : O.Recognize(null),
                            (U = a.pdfTitle),
                            (j = a.pdfTextOnly),
                            ((B = v(l, O, m, {
                              pdfTitle: U,
                              pdfTextOnly: j,
                              skipRecognition: E,
                            })).rotateRadians = x),
                            s.debug && l.FS.unlink("/debugInternal.txt"),
                            Object.keys(u).length > 0 && O.RestoreParameters(),
                            r.resolve(B);
                        } catch (t) {
                          r.reject(t.toString());
                        }
                      case 2:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function (e, r) {
              return t.apply(this, arguments);
            };
          })(),
          G = (function () {
            var t = h(
              c().mark(function t(e, r) {
                var n, i, o, a, s;
                return c().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        n = e.payload.image;
                        try {
                          w(l, O, n),
                            (i = new l.OSResults()),
                            O.DetectOS(i)
                              ? ((o = i.best_result),
                                (a = o.orientation_id),
                                (s = o.script_id),
                                r.resolve({
                                  tesseract_script_id: s,
                                  script:
                                    i.unicharset.get_script_from_script_id(s),
                                  script_confidence: o.sconfidence,
                                  orientation_degrees: [0, 270, 180, 90][a],
                                  orientation_confidence: o.oconfidence,
                                }))
                              : r.resolve({
                                  tesseract_script_id: null,
                                  script: null,
                                  script_confidence: null,
                                  orientation_degrees: null,
                                  orientation_confidence: null,
                                });
                        } catch (t) {
                          r.reject(t.toString());
                        }
                      case 2:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function (e, r) {
              return t.apply(this, arguments);
            };
          })(),
          z = (function () {
            var t = h(
              c().mark(function t(e, r) {
                return c().wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        try {
                          null !== O && O.End(), r.resolve({ terminated: !0 });
                        } catch (t) {
                          r.reject(t.toString());
                        }
                      case 1:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function (e, r) {
              return t.apply(this, arguments);
            };
          })();
        (e.dispatchHandlers = function (t, e) {
          var r = function (r, n) {
            var i = { jobId: t.jobId, workerId: t.workerId, action: t.action };
            e(a(a({}, i), {}, { status: r, data: n }));
          };
          (r.resolve = r.bind(n, "resolve")),
            (r.reject = r.bind(n, "reject")),
            (r.progress = r.bind(n, "progress")),
            (p = r),
            {
              load: U,
              FS: j,
              loadLanguage: B,
              initialize: P,
              setParameters: T,
              recognize: F,
              getPDF: C,
              detect: G,
              terminate: z,
            }
              [t.action](t, r)
              .catch(function (t) {
                return r.reject(t.toString());
              });
        }),
          (e.setAdapter = function (t) {
            I = t;
          });
      },
      629: (t) => {
        t.exports = function (t) {
          for (
            var e,
              r = "",
              n =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              i = new Uint8Array(t),
              o = i.byteLength,
              a = o % 3,
              s = o - a,
              u = 0;
            u < s;
            u += 3
          )
            r +=
              n[
                (16515072 & (e = (i[u] << 16) | (i[u + 1] << 8) | i[u + 2])) >>
                  18
              ] +
              n[(258048 & e) >> 12] +
              n[(4032 & e) >> 6] +
              n[63 & e];
          return (
            1 === a
              ? ((e = i[s]),
                (r += "".concat(n[(252 & e) >> 2] + n[(3 & e) << 4], "==")))
              : 2 === a &&
                ((e = (i[s] << 8) | i[s + 1]),
                (r += "".concat(
                  n[(64512 & e) >> 10] + n[(1008 & e) >> 4] + n[(15 & e) << 2],
                  "="
                ))),
            r
          );
        };
      },
      333: (t, e, r) => {
        var n = r(629),
          i = r(862),
          o = function (t) {
            var e = t.split("\n");
            if ("  " === e[0].substring(0, 2))
              for (var r = 0; r < e.length; r += 1)
                "  " === e[r].substring(0, 2) && (e[r] = e[r].slice(2));
            return e.join("\n");
          };
        t.exports = function (t, e, r, a) {
          var s,
            u,
            c,
            f,
            h,
            l,
            p,
            d,
            y,
            g,
            v = e.GetIterator(),
            b = t.RIL_BLOCK,
            w = t.RIL_PARA,
            m = t.RIL_TEXTLINE,
            E = t.RIL_WORD,
            x = t.RIL_SYMBOL,
            A = [],
            k = function (e, r) {
              return Object.keys(t)
                .filter(function (n) {
                  return n.startsWith("".concat(r, "_")) && t[n] === e;
                })
                .map(function (t) {
                  return t.slice(r.length + 1);
                })[0];
            },
            _ = function (r) {
              e.WriteImage(r, "/image.png");
              var i = t.FS.readFile("/image.png"),
                o = "data:image/png;base64,".concat(n(i.buffer));
              return t.FS.unlink("/image.png"), o;
            };
          if (r.blocks || r.layoutBlocks) {
            v.Begin();
            do {
              if (v.IsAtBeginningOf(b)) {
                var O = v.BlockPolygon(),
                  I = null;
                if (t.getPointer(O) > 0) {
                  var S = O.get_n(),
                    L = O.get_x(),
                    U = O.get_y();
                  I = [];
                  for (var j = 0; j < S; j += 1)
                    I.push([L.getValue(j), U.getValue(j)]);
                }
                (c = {
                  paragraphs: [],
                  text: a.skipRecognition ? null : v.GetUTF8Text(b),
                  confidence: a.skipRecognition ? null : v.Confidence(b),
                  baseline: v.getBaseline(b),
                  bbox: v.getBoundingBox(b),
                  blocktype: k(v.BlockType(), "PT"),
                  polygon: I,
                }),
                  A.push(c);
              }
              if (
                (v.IsAtBeginningOf(w) &&
                  ((f = {
                    lines: [],
                    text: a.skipRecognition ? null : v.GetUTF8Text(w),
                    confidence: a.skipRecognition ? null : v.Confidence(w),
                    baseline: v.getBaseline(w),
                    bbox: v.getBoundingBox(w),
                    is_ltr: !!v.ParagraphIsLtr(),
                  }),
                  c.paragraphs.push(f)),
                v.IsAtBeginningOf(m) &&
                  ((h = {
                    words: [],
                    text: a.skipRecognition ? null : v.GetUTF8Text(m),
                    confidence: a.skipRecognition ? null : v.Confidence(m),
                    baseline: v.getBaseline(m),
                    bbox: v.getBoundingBox(m),
                  }),
                  f.lines.push(h)),
                v.IsAtBeginningOf(E))
              ) {
                var B = v.getWordFontAttributes(),
                  T = v.WordDirection();
                l = {
                  symbols: [],
                  choices: [],
                  text: a.skipRecognition ? null : v.GetUTF8Text(E),
                  confidence: a.skipRecognition ? null : v.Confidence(E),
                  baseline: v.getBaseline(E),
                  bbox: v.getBoundingBox(E),
                  is_numeric: !!v.WordIsNumeric(),
                  in_dictionary: !!v.WordIsFromDictionary(),
                  direction: k(T, "DIR"),
                  language: v.WordRecognitionLanguage(),
                  is_bold: B.is_bold,
                  is_italic: B.is_italic,
                  is_underlined: B.is_underlined,
                  is_monospace: B.is_monospace,
                  is_serif: B.is_serif,
                  is_smallcaps: B.is_smallcaps,
                  font_size: B.pointsize,
                  font_id: B.font_id,
                  font_name: B.font_name,
                };
                var P = new t.WordChoiceIterator(v);
                do {
                  l.choices.push({
                    text: a.skipRecognition ? null : P.GetUTF8Text(),
                    confidence: a.skipRecognition ? null : P.Confidence(),
                  });
                } while (P.Next());
                t.destroy(P), h.words.push(l);
              }
              if (v.IsAtBeginningOf(x)) {
                (p = {
                  choices: [],
                  image: null,
                  text: a.skipRecognition ? null : v.GetUTF8Text(x),
                  confidence: a.skipRecognition ? null : v.Confidence(x),
                  baseline: v.getBaseline(x),
                  bbox: v.getBoundingBox(x),
                  is_superscript: !!v.SymbolIsSuperscript(),
                  is_subscript: !!v.SymbolIsSubscript(),
                  is_dropcap: !!v.SymbolIsDropcap(),
                }),
                  l.symbols.push(p);
                var R = new t.ChoiceIterator(v);
                do {
                  p.choices.push({
                    text: a.skipRecognition ? null : R.GetUTF8Text(),
                    confidence: a.skipRecognition ? null : R.Confidence(),
                  });
                } while (R.Next());
              }
            } while (v.Next(x));
            t.destroy(v);
          }
          return {
            text: r.text ? e.GetUTF8Text() : null,
            hocr: r.hocr ? o(e.GetHOCRText()) : null,
            tsv: r.tsv ? e.GetTSVText() : null,
            box: r.box ? e.GetBoxText() : null,
            unlv: r.unlv ? e.GetUNLVText() : null,
            osd: r.osd ? e.GetOsdText() : null,
            pdf: r.pdf
              ? ((d =
                  null !== (s = a.pdfTitle) && void 0 !== s
                    ? s
                    : "Tesseract OCR Result"),
                (y = null !== (u = a.pdfTextOnly) && void 0 !== u && u),
                (g = new t.TessPDFRenderer("tesseract-ocr", "/", y)),
                g.BeginDocument(d),
                g.AddImage(e),
                g.EndDocument(),
                t._free(g),
                t.FS.readFile("/tesseract-ocr.pdf"))
              : null,
            imageColor: r.imageColor ? _(i.COLOR) : null,
            imageGrey: r.imageGrey ? _(i.GREY) : null,
            imageBinary: r.imageBinary ? _(i.BINARY) : null,
            confidence: a.skipRecognition ? null : e.MeanTextConf(),
            blocks: r.blocks && !a.skipRecognition ? A : null,
            layoutBlocks: r.layoutBlocks && a.skipRecognition ? A : null,
            psm: k(e.GetPageSegMode(), "PSM"),
            oem: k(e.oem(), "OEM"),
            version: e.Version(),
            debug: r.debug
              ? t.FS.readFile("/debugInternal.txt", {
                  encoding: "utf8",
                  flags: "a+",
                })
              : null,
          };
        };
      },
      472: (t, e, r) => {
        var n = r(33).lW;
        function i(t) {
          return (
            (i =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            i(t)
          );
        }
        function o(t, e) {
          var r = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function a(t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? o(Object(r), !0).forEach(function (e) {
                  s(t, e, r[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
              : o(Object(r)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(r, e)
                  );
                });
          }
          return t;
        }
        function s(t, e, r) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" !== i(t) || null === t) return t;
                var r = t[Symbol.toPrimitive];
                if (void 0 !== r) {
                  var n = r.call(t, "string");
                  if ("object" !== i(n)) return n;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return String(t);
              })(t);
              return "symbol" === i(e) ? e : String(e);
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = r),
            t
          );
        }
        var u = r(86);
        t.exports = function (t, e, r) {
          var i,
            o =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : 0,
            s = (66 === r[0] && 77 === r[1]) || (66 === r[1] && 77 === r[0]),
            c =
              parseInt(
                null ===
                  (i = r
                    .slice(0, 500)
                    .join(" ")
                    .match(/1 18 0 3 0 0 0 1 0 (\d)/)) || void 0 === i
                  ? void 0
                  : i[1],
                10
              ) || 1;
          if (s) {
            var f = n.from(
                Array.from(a(a({}, r), {}, { length: Object.keys(r).length }))
              ),
              h = u.decode(f);
            t.FS.writeFile("/input", u.encode(h).data);
          } else t.FS.writeFile("/input", r);
          if (1 === e.SetImageFile(c, o))
            throw Error("Error attempting to read image.");
        };
      },
      160: (t, e, r) => {
        "use strict";
        function n(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
          return n;
        }
        function i(t) {
          return new Promise(function (e, r) {
            (t.oncomplete = t.onsuccess =
              function () {
                return e(t.result);
              }),
              (t.onabort = t.onerror =
                function () {
                  return r(t.error);
                });
          });
        }
        function o(t, e) {
          var r = indexedDB.open(t);
          r.onupgradeneeded = function () {
            return r.result.createObjectStore(e);
          };
          var n = i(r);
          return function (t, r) {
            return n.then(function (n) {
              return r(n.transaction(e, t).objectStore(e));
            });
          };
        }
        var a;
        function s() {
          return a || (a = o("keyval-store", "keyval")), a;
        }
        function u(t) {
          return (
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s()
          )("readonly", function (e) {
            return i(e.get(t));
          });
        }
        function c(t, e) {
          return (
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : s()
          )("readwrite", function (r) {
            return r.put(e, t), i(r.transaction);
          });
        }
        function f(t) {
          return (
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s()
          )("readwrite", function (e) {
            return (
              t.forEach(function (t) {
                return e.put(t[1], t[0]);
              }),
              i(e.transaction)
            );
          });
        }
        function h(t) {
          return (
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s()
          )("readonly", function (e) {
            return Promise.all(
              t.map(function (t) {
                return i(e.get(t));
              })
            );
          });
        }
        function l(t, e) {
          return (
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : s()
          )("readwrite", function (r) {
            return new Promise(function (n, o) {
              r.get(t).onsuccess = function () {
                try {
                  r.put(e(this.result), t), n(i(r.transaction));
                } catch (t) {
                  o(t);
                }
              };
            });
          });
        }
        function p(t) {
          return (
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s()
          )("readwrite", function (e) {
            return e.delete(t), i(e.transaction);
          });
        }
        function d(t) {
          return (
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s()
          )("readwrite", function (e) {
            return (
              t.forEach(function (t) {
                return e.delete(t);
              }),
              i(e.transaction)
            );
          });
        }
        function y() {
          return (
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s()
          )("readwrite", function (t) {
            return t.clear(), i(t.transaction);
          });
        }
        function g(t, e) {
          return (
            (t.openCursor().onsuccess = function () {
              this.result && (e(this.result), this.result.continue());
            }),
            i(t.transaction)
          );
        }
        function v() {
          return (
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s()
          )("readonly", function (t) {
            if (t.getAllKeys) return i(t.getAllKeys());
            var e = [];
            return g(t, function (t) {
              return e.push(t.key);
            }).then(function () {
              return e;
            });
          });
        }
        function b() {
          return (
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s()
          )("readonly", function (t) {
            if (t.getAll) return i(t.getAll());
            var e = [];
            return g(t, function (t) {
              return e.push(t.value);
            }).then(function () {
              return e;
            });
          });
        }
        function w() {
          var t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : s();
          return t("readonly", function (e) {
            if (e.getAll && e.getAllKeys)
              return Promise.all([i(e.getAllKeys()), i(e.getAll())]).then(
                function (t) {
                  var e,
                    r,
                    i =
                      ((r = 2),
                      (function (t) {
                        if (Array.isArray(t)) return t;
                      })((e = t)) ||
                        (function (t, e) {
                          var r =
                            null == t
                              ? null
                              : ("undefined" != typeof Symbol &&
                                  t[Symbol.iterator]) ||
                                t["@@iterator"];
                          if (null != r) {
                            var n,
                              i,
                              o,
                              a,
                              s = [],
                              u = !0,
                              c = !1;
                            try {
                              if (((o = (r = r.call(t)).next), 0 === e)) {
                                if (Object(r) !== r) return;
                                u = !1;
                              } else
                                for (
                                  ;
                                  !(u = (n = o.call(r)).done) &&
                                  (s.push(n.value), s.length !== e);
                                  u = !0
                                );
                            } catch (t) {
                              (c = !0), (i = t);
                            } finally {
                              try {
                                if (
                                  !u &&
                                  null != r.return &&
                                  ((a = r.return()), Object(a) !== a)
                                )
                                  return;
                              } finally {
                                if (c) throw i;
                              }
                            }
                            return s;
                          }
                        })(e, r) ||
                        (function (t, e) {
                          if (t) {
                            if ("string" == typeof t) return n(t, e);
                            var r = Object.prototype.toString
                              .call(t)
                              .slice(8, -1);
                            return (
                              "Object" === r &&
                                t.constructor &&
                                (r = t.constructor.name),
                              "Map" === r || "Set" === r
                                ? Array.from(t)
                                : "Arguments" === r ||
                                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(
                                    r
                                  )
                                ? n(t, e)
                                : void 0
                            );
                          }
                        })(e, r) ||
                        (function () {
                          throw new TypeError(
                            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                          );
                        })()),
                    o = i[0],
                    a = i[1];
                  return o.map(function (t, e) {
                    return [t, a[e]];
                  });
                }
              );
            var r = [];
            return t("readonly", function (t) {
              return g(t, function (t) {
                return r.push([t.key, t.value]);
              }).then(function () {
                return r;
              });
            });
          });
        }
        r.r(e),
          r.d(e, {
            clear: () => y,
            createStore: () => o,
            del: () => p,
            delMany: () => d,
            entries: () => w,
            get: () => u,
            getMany: () => h,
            keys: () => v,
            promisifyRequest: () => i,
            set: () => c,
            setMany: () => f,
            update: () => l,
            values: () => b,
          });
      },
      147: (t) => {
        "use strict";
        t.exports = JSON.parse('{"HO":{"_X":"^5.0.0"}}');
      },
    },
    e = {};
  function r(n) {
    var i = e[n];
    if (void 0 !== i) return i.exports;
    var o = (e[n] = { id: n, loaded: !1, exports: {} });
    return t[n].call(o.exports, o, o.exports, r), (o.loaded = !0), o.exports;
  }
  (r.d = (t, e) => {
    for (var n in e)
      r.o(e, n) &&
        !r.o(t, n) &&
        Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
  }),
    (r.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (t) {
        if ("object" == typeof window) return window;
      }
    })()),
    (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (r.r = (t) => {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (r.nmd = (t) => ((t.paths = []), t.children || (t.children = []), t)),
    (() => {
      function t(e) {
        return (
          (t =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          t(e)
        );
      }
      function e(t, e) {
        var r = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(t);
          e &&
            (n = n.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function n(e, r, n) {
        return (
          (r = (function (e) {
            var r = (function (e, r) {
              if ("object" !== t(e) || null === e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var i = n.call(e, "string");
                if ("object" !== t(i)) return i;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return String(e);
            })(e);
            return "symbol" === t(r) ? r : String(r);
          })(r)) in e
            ? Object.defineProperty(e, r, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[r] = n),
          e
        );
      }
      var i = r(217),
        o = r(485),
        a = r(687),
        s = r(779);
      r.g.addEventListener("message", function (t) {
        var e = t.data;
        i.dispatchHandlers(e, function (t) {
          return postMessage(t);
        });
      }),
        i.setAdapter(
          (function (t) {
            for (var r = 1; r < arguments.length; r++) {
              var i = null != arguments[r] ? arguments[r] : {};
              r % 2
                ? e(Object(i), !0).forEach(function (e) {
                    n(t, e, i[e]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    t,
                    Object.getOwnPropertyDescriptors(i)
                  )
                : e(Object(i)).forEach(function (e) {
                    Object.defineProperty(
                      t,
                      e,
                      Object.getOwnPropertyDescriptor(i, e)
                    );
                  });
            }
            return t;
          })({ getCore: o, gunzip: a, fetch: function () {} }, s)
        );
    })();
})();
//# sourceMappingURL=worker.min.js.map
