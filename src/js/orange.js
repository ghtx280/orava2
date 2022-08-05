export const orange = {
    hash(d) {
        let e = d || 32,
            a = "";
        for (let b = 0; b < e; ++b) {
            let c = Math.floor(62 * Math.random());
            a += "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM".substring(c, c + 1)
        }
        return a
    },
    valid: (a, b) => "email" == a ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(b) : "login" == a ? /^[a-z0-9-_]+$/.test(b) : "pass" == a ? /^[A-Za-z0-9!@#$%^&*]{6,20}/.test(b) : void 0,
    time(a, q) {
        if (!q) return false
        let h = new Date(Number(q)),
            i = String(h.getMonth() + 1),
            j = String(h.getDate()),
            k = String(h.getMinutes()),
            l = String(h.getHours()),
            m = String(h.getSeconds()),
            b = h.getFullYear(),
            c = 1 == i.length ? "0" + i : i,
            d = 1 == j.length ? "0" + j : j,
            e = 1 == l.length ? "0" + l : l,
            f = 1 == k.length ? "0" + k : k,
            g = 1 == m.length ? "0" + m : m,
            n = ["\u0441\u0456\u0447", "\u043B\u044E\u0442", "\u0431\u0435\u0440", "\u043A\u0432\u0456\u0442", "\u0442\u0440\u0430\u0432", "\u0447\u0435\u0440", "\u043B\u0438\u043F", "\u0441\u0435\u0440", "\u0432\u0435\u0440", "\u0436\u043E\u0432", "\u043B\u0438\u0441\u0442", "\u0433\u0440\u0443\u0434"],
            o = ["\u044F\u043D\u0432", "\u0444\u0435\u0432", "\u043C\u0430\u0440\u0442", "\u0430\u043F\u0440", "\u043C\u0430\u0439", "\u0438\u044E\u043D", "\u0438\u044E\u043B", "\u0430\u0432\u0433", "\u0441\u0435\u043D", "\u043E\u043A\u0442", "\u043D\u043E\u044F\u0431", "\u0434\u0435\u043A"],
            p = ["jun", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        return "year" == a ? Number(b) : "month" == a ? Number(c) : "day" == a ? Number(d) : "hour" == a ? Number(e) : "min" == a ? Number(f) : "sec" == a ? Number(g) : "date(/)" == a ? `${d}/${c}/${b}` : "date(.)" == a ? `${d}.${c}.${b}` : "hm" == a ? `${e}:${f}` : "hms" == a ? `${e}:${f}:${g}` : "date(/) hm" == a ? `${d}/${c}/${b} ${e}:${f}` : "date(.) hm" == a ? `${d}.${c}.${b} ${e}:${f}` : "date(/) hms" == a ? `${d}/${c}/${b} ${e}:${f}:${g}` : "date(.) hms" == a ? `${d}.${c}.${b} ${e}:${f}:${g}` : "date(ua)" == a ? `${d} ${n[c - 1]} ${b}` : "date(ru)" == a ? `${d} ${o[c - 1]} ${b}` : "date(en)" == a ? `${d} ${p[c - 1]} ${b}` : "date(ua) hm" == a ? `${d} ${n[c - 1]} ${b} ${e}:${f}` : "date(ru) hm" == a ? `${d} ${o[c - 1]} ${b} ${e}:${f}` : "date(en) hm" == a ? `${d} ${p[c - 1]} ${b} ${e}:${f}` : "date(ua) hms" == a ? `${d} ${n[c - 1]} ${b} ${e}:${f}:${g}` : "date(ru) hms" == a ? `${d} ${o[c - 1]} ${b} ${e}:${f}:${g}` : "date(en) hms" == a ? `${d} ${p[c - 1]} ${b} ${e}:${f}:${g}` : void console.warn("invalid time format. check docs")
    },
    cipher(c) {
        if (!c) return false
        let a = "";
        for (let b = 0; c ? b < c.length + 1 : 0; ++b) {
            for (let d = 0; d < 5; ++d) a += "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"[Math.floor(62 * Math.random())];
            a += c[b] || ""
        }
        return a
    },
    decipher(b) {
        if (!b) return false
        let c = "";
        for (let a = 5; b ? a < b.length - 3 : 0; a += 6) c += b[a];
        return c
    },
    convertImg(f, p, ft, q) {
        return new Promise((resolve) => {
            const r = new FileReader()
            r.readAsDataURL(f[0])
            r.onload = function (event) {
                const i = document.createElement("img")
                i.src = event.target.result
                i.onload = function (e) {
                    const canvas = document.createElement("canvas")
                    const img = e.target
                    const iw = img.width
                    const ih = img.height
                    const size = 100 / p
                    canvas.width = iw / size
                    canvas.height = ih / size
                    const ctx = canvas.getContext("2d")
                    ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)
                    resolve(ctx.canvas.toDataURL("image/" + ft, q));
                }
            }
        })
    },
    ava(f, s, ft, q) {
        let nw, nh
        return new Promise((resolve) => {
            const r = new FileReader()
            r.readAsDataURL(f[0])
            r.onload = function (event) {
                const i = document.createElement("img")
                i.src = event.target.result
                i.onload = function (e) {
                    const canvas = document.createElement("canvas")
                    const imgg = e.target
                    const iww = imgg.width
                    const ihh = imgg.height
                    const sss = s
                    let x = 0
                    let y = 0
                    if (iww > ihh) {
                        nw = iww * sss / ihh
                        nh = sss
                        x = (sss - nw) / 2
                    }
                    else {
                        nw = sss
                        nh = ihh * sss / iww
                        y = (sss - nh) / 2
                    }
                    canvas.width = sss
                    canvas.height = sss
                    const ctx = canvas.getContext("2d")
                    ctx.drawImage(e.target, x, y, nw, nh);
                    resolve(ctx.canvas.toDataURL("image/" + ft, q));
                }
            }
        })
    },







}