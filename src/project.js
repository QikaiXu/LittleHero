window.__require = function e(t, a, n) {
    function i(o, s) {
        if (!a[o]) {
            if (!t[o]) {
                var l = o.split("/");
                if (l = l[l.length - 1], !t[l]) {
                    var c = "function" == typeof __require && __require;
                    if (!s && c) return c(l, !0);
                    if (r) return r(l, !0);
                    throw new Error("Cannot find module '" + o + "'");
                }
            }
            var u = a[o] = {
                exports: {}
            };
            t[o][0].call(u.exports, function(e) {
                return i(t[o][1][e] || e);
            }, u, u.exports, e, t, a, n);
        }
        return a[o].exports;
    }
    for (var r = "function" == typeof __require && __require, o = 0; o < n.length; o++) i(n[o]);
    return i;
}({
    BeingHit: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "10b655ImZ5LrbFhYUOR0mBX", "BeingHit");
        var n = cc.renderer.renderEngine.renderer, i = e("CustomMaterial"), r = {
            name: "BeingHit",
            params: [ {
                name: "time",
                type: n.PARAM_FLOAT,
                defaultValue: 0
            } ],
            start: function() {
                this._start = Date.now();
            },
            update: function(e, t) {
                var a = Date.now(), n = (a - this._start) / 200;
                n >= 1.5 && (n = 0, this._start = a), n > .75 && (n = 1.5 - n), t.setParamValue("time", n);
            },
            defines: [],
            vert: "\n        uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }",
            frag: "uniform sampler2D texture;\n        uniform vec4 color;\n        uniform float time;\n        varying vec2 uv0;\n        \n        void main()\n        {\n            vec4 src_color = color * texture2D(texture, uv0).rgba;\n            vec3 result = time + vec3( src_color.r, src_color.g, src_color.b);\n            gl_FragColor = vec4(result, src_color.a);\n        }"
        };
        i.addShader(r), cc._RF.pop();
    }, {
        CustomMaterial: "CustomMaterial"
    } ],
    CustomMaterial: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "7e83cNvIEFJGqSztRtceCSQ", "CustomMaterial");
        var n = cc.renderer.renderEngine, i = n.renderer, r = n.gfx, o = function(e) {
            function t(t, a, n) {
                e.call(this, !1);
                var o = new i.Pass(t);
                o.setDepth(!1, !1), o.setCullMode(r.CULL_NONE), o.setBlend(r.BLEND_FUNC_ADD, r.BLEND_SRC_ALPHA, r.BLEND_ONE_MINUS_SRC_ALPHA, r.BLEND_FUNC_ADD, r.BLEND_SRC_ALPHA, r.BLEND_ONE_MINUS_SRC_ALPHA);
                var s = [ {
                    name: "texture",
                    type: i.PARAM_TEXTURE_2D
                }, {
                    name: "color",
                    type: i.PARAM_COLOR4
                } ];
                a && (s = s.concat(a));
                var l = new i.Technique([ "transparent" ], s, [ o ]);
                this.name = t, this._effect = new i.Effect([ l ], {}, n), this._texture = null, 
                this._color = {
                    r: 1,
                    g: 1,
                    b: 1,
                    a: 1
                }, this._mainTech = l;
            }
            cc.js.extend(t, e);
            var a = {
                effect: {
                    configurable: !0
                },
                texture: {
                    configurable: !0
                },
                color: {
                    configurable: !0
                }
            };
            return a.effect.get = function() {
                return this._effect;
            }, a.texture.get = function() {
                return this._texture;
            }, a.texture.set = function(e) {
                this._texture !== e && (this._texture = e, this._effect.setProperty("texture", e.getImpl()), 
                this._texIds.texture = e.getId());
            }, a.color.get = function() {
                return this._color;
            }, a.color.set = function(e) {
                var t = this._color;
                t.r = e.r / 255, t.g = e.g / 255, t.b = e.b / 255, t.a = e.a / 255, this._effect.setProperty("color", t);
            }, t.prototype.clone = function() {
                var e = new t();
                return e.texture = this.texture, e.color = this.color, e.updateHash(), e;
            }, t.prototype.setParamValue = function(e, t) {
                this._effect.setProperty(e, t);
            }, t.prototype.getParamValue = function(e) {
                return this._effect.getProperty(e);
            }, t.prototype.setDefine = function(e, t) {
                this._effect.define(e, t);
            }, Object.defineProperties(t.prototype, a), t;
        }(n.Material), s = {};
        o.addShader = function(e) {
            s[e.name] ? console.log("addShader - shader already exist: ", e.name) : cc.renderer._forward ? (cc.renderer._forward._programLib.define(e.name, e.vert, e.frag, e.defines || []), 
            s[e.name] = e) : cc.game.once(cc.game.EVENT_ENGINE_INITED, function() {
                cc.renderer._forward._programLib.define(e.name, e.vert, e.frag, e.defines || []), 
                s[e.name] = e;
            });
        }, o.getShader = function(e) {
            return s[e];
        }, o.getShaderByIndex = function(e) {
            return Object.values(s)[e];
        }, o.getAllName = function() {
            return Object.keys(s).map(function(e, t) {
                return {
                    name: e,
                    value: t
                };
            });
        };
        var l = null;
        o.getShaderEnum = function() {
            if (l) return l;
            var e = {};
            return Object.keys(s).forEach(function(t, a) {
                return e[t] = a;
            }), l = cc.Enum(e);
        }, t.exports = o, cc._RF.pop();
    }, {} ],
    FluxaySuper: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "b230czwdKZEGq8EHfPLvRUQ", "FluxaySuper");
        var n = cc.renderer.renderEngine.renderer, i = e("CustomMaterial"), r = {
            name: "FluxaySuper",
            params: [ {
                name: "time",
                type: n.PARAM_FLOAT,
                defaultValue: 0
            } ],
            start: function() {
                this._start = Date.now();
            },
            update: function(e, t) {
                var a = (Date.now() - this._start) / 1e3;
                t.setParamValue("time", a);
            },
            defines: [],
            vert: "\n        uniform mat4 viewProj;\n        attribute vec3 a_position;\n        attribute vec2 a_uv0;\n        varying vec2 uv0;\n        void main () {\n            vec4 pos = viewProj * vec4(a_position, 1);\n            gl_Position = pos;\n            uv0 = a_uv0;\n        }",
            frag: "#define TAU 6.12\n        #define MAX_ITER 5\n        uniform sampler2D texture;\n        uniform vec4 color;\n        uniform float time;\n        varying vec2 uv0;\n        \n        void main()\n        {\n            float time = time * .5+5.;\n            // uv should be the 0-1 uv of texture...\n            vec2 uv = uv0.xy;//fragCoord.xy / iResolution.xy;\n            \n            vec2 p = mod(uv*TAU, TAU)-250.0;\n        \n            vec2 i = vec2(p);\n            float c = 1.0;\n            float inten = .0045;\n        \n            for (int n = 0; n < MAX_ITER; n++) \n            {\n                float t =  time * (1.0 - (3.5 / float(n+1)));\n                i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(1.5*t + i.x));\n                c += 1.0/length(vec2(p.x / (cos(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));\n            }\n            c /= float(MAX_ITER);\n            c = 1.17-pow(c, 1.4);\n            vec4 tex = texture2D(texture,uv);\n            vec3 colour = vec3(pow(abs(c), 20.0));\n            colour = clamp(colour + vec3(0.0, 0.0, .0), 0.0, tex.a);\n        \n            // 混合波光\n            float alpha = c*tex[3];  \n            tex[0] = tex[0] + colour[0]*alpha; \n            tex[1] = tex[1] + colour[1]*alpha; \n            tex[2] = tex[2] + colour[2]*alpha; \n            gl_FragColor = color * tex;\n        }"
        };
        i.addShader(r), cc._RF.pop();
    }, {
        CustomMaterial: "CustomMaterial"
    } ],
    ShaderHelper: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "709843sfttBuKuT6Fl9RqBp", "ShaderHelper");
        var n = e("CustomMaterial"), i = cc.Enum({}), r = cc.Class({
            extends: cc.Component,
            editor: !1,
            properties: {
                _shaderObject: null,
                program: {
                    type: i,
                    default: 0,
                    notify: function(e) {
                        this.program !== e && this.applyShader();
                    }
                },
                playOnload: !1
            },
            __preload: function() {
                var e = n.getAllName();
                r.ShaderEnum = n.getShaderEnum(), cc.Class.Attr.setClassAttr(r, "program", "enumList", e);
            },
            onLoad: function() {
                this.playOnload && this.init();
            },
            init: function() {
                this.sprite = this.getComponent(cc.Sprite), this.applyShader();
            },
            update: function(e) {
                this._shaderObject && this._shaderObject.update && this._shaderObject.update(this.sprite, this.material, e);
            },
            play: function() {
                this.init();
            },
            stop: function() {
                this.sprite.setState(0);
            },
            applyShader: function() {
                this._shaderObject = n.getShaderByIndex(this.program);
                var e = this.sprite, t = this._shaderObject.params, a = this._shaderObject.defines, i = e.getMaterial(this._shaderObject.name);
                i || (i = new n(this._shaderObject.name, t, a || []), e.setMaterial(this._shaderObject.name, i)), 
                this.material = i, e.activateMaterial(this._shaderObject.name), t && t.forEach(function(e) {
                    void 0 !== e.defaultValue && i.setParamValue(e.name, e.defaultValue);
                }), this._shaderObject.start && this._shaderObject.start(e, i);
            }
        });
        t.exports = r, cc._RF.pop();
    }, {
        CustomMaterial: "CustomMaterial"
    } ],
    ShaderHook: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "3bc68h6GStJ95xAZoCLunIh", "ShaderHook");
        var n = cc.renderer.renderEngine, i = n.SpriteMaterial, r = n.GraySpriteMaterial;
        cc.Sprite.prototype.getMaterial = function(e) {
            return this._materials ? this._materials[e] : void 0;
        }, cc.Sprite.prototype.setMaterial = function(e, t) {
            this._materials || (this._materials = {}), this._materials[e] = t;
        }, cc.Sprite.prototype.activateMaterial = function(e) {
            var t = this.getMaterial(e);
            t && t !== this._currMaterial && (t ? (this.node && (t.color = this.node.color), 
            this.spriteFrame && (t.texture = this.spriteFrame.getTexture()), this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR, 
            this._currMaterial = t, this._currMaterial.name = e, this._state = 101, this._activateMaterial()) : console.error("activateMaterial - unknwon material: ", e));
        }, cc.Sprite.prototype.getCurrMaterial = function() {
            if (101 === this._state) return this._currMaterial;
        }, cc.Sprite.prototype._activateMaterial = function() {
            var e = this._spriteFrame;
            if (cc.game.renderType !== cc.game.RENDER_TYPE_CANVAS) {
                var t = void 0;
                if (this._state === cc.Sprite.State.GRAY) this._graySpriteMaterial || (this._graySpriteMaterial = new r(), 
                this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR), t = this._graySpriteMaterial, 
                this._currMaterial = null; else if (101 === this._state) {
                    if (!this._currMaterial) return void console.error("_activateMaterial: _currMaterial undefined!");
                    t = this._currMaterial;
                } else this._spriteMaterial || (this._spriteMaterial = new i(), this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR), 
                t = this._spriteMaterial, this._currMaterial = null;
                if (e && e.textureLoaded()) {
                    var a = e.getTexture();
                    t.texture !== a ? (t.texture = a, this._updateMaterial(t)) : t !== this._material && this._updateMaterial(t), 
                    this._renderData && (this._renderData.material = t), this.markForUpdateRenderData(!0), 
                    this.markForRender(!0);
                } else this.disableRender();
            }
        }, cc._RF.pop();
    }, {} ],
    achievement_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "bc6dbt+M0RKt6/a6P/4pK2+", "achievement_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../network/achievement_network"), i = cc._decorator, r = i.ccclass, o = i.property, s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelDesc = null, t.labelProgress = null, t.barAchievementBar = null, t.labelBonusNum = null, 
                t.btnGetReward = null, t.curID = 0, t;
            }
            return __extends(t, e), t.prototype.onLoad = function() {
                this.btnGetReward.node.on("click", this.getReward, this);
            }, t.prototype.Init = function(e, t, a, n, i, r, o) {
                this.curID = e, this.labelDesc.string = t + "   (" + r + "Lv" + o + ")", this.labelProgress.string = a + " / " + n, 
                this.labelBonusNum.string = i.toString(), this.barAchievementBar.progress = a / n, 
                this.btnGetReward.interactable = a >= n;
            }, t.prototype.getReward = function() {
                this.btnGetReward.interactable = !1, n.default.instance.GetPlayerAchievementRewardRequest(this.curID);
            }, __decorate([ o(cc.Label) ], t.prototype, "labelDesc", void 0), __decorate([ o(cc.Label) ], t.prototype, "labelProgress", void 0), 
            __decorate([ o(cc.ProgressBar) ], t.prototype, "barAchievementBar", void 0), __decorate([ o(cc.Label) ], t.prototype, "labelBonusNum", void 0), 
            __decorate([ o(cc.Button) ], t.prototype, "btnGetReward", void 0), t = __decorate([ r ], t);
        }(cc.Component);
        a.default = s, cc._RF.pop();
    }, {
        "../../network/achievement_network": "achievement_network"
    } ],
    achievement_network: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "dbe4eDmz/9Jwp8hXSMuliQc", "achievement_network"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../common/emmiter"), i = e("../manager/network_manager"), r = e("../common/message"), o = e("../manager/achievenment_manager"), s = function() {
            function e() {}
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.init = function() {
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.UpdatePlayerAchievementResponse, r.MessageType.GamePlay), this.UpdatePlayerAchievementResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.GetPlayerAchievementRewardResponse, r.MessageType.GamePlay), this.GetPlayerAchievementRewardResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.UpdatePlayerCanUseTitleResponse, r.MessageType.GamePlay), this.UpdatePlayerCanUseTitleResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerUseTitleResponse, r.MessageType.GamePlay), this.PlayerUseTitleResponse, this);
            }, e.prototype.UpdatePlayerAchievementResponse = function(e, t) {
                t.Achievements && o.default.instance.updateAchievementDatas(t.Achievements);
            }, e.prototype.GetPlayerAchievementRewardRequest = function(e) {
                var t = {
                    ID: Number(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.GetPlayerAchievementRewardRequest, r.MessageType.GamePlay, t);
            }, e.prototype.GetPlayerAchievementRewardResponse = function(e, t) {
                console.log("----------\x3e GetPlayerAchievementRewardResponse:" + JSON.stringify(t)), 
                t.CurID && o.default.instance.getRewardByServer(t.IsOk, t.CurID);
            }, e.prototype.UpdatePlayerCanUseTitleResponse = function(e, t) {
                console.log("----------\x3e UpdatePlayerCanUseTitleResponse:" + JSON.stringify(t)), 
                t.Titles && o.default.instance.updatePlayerCanUseTitle(t.Titles);
            }, e.prototype.PlayerUseTitleRequest = function(e) {
                var t = {
                    TypeID: Number(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerUseTitleRequest, r.MessageType.GamePlay, t);
            }, e.prototype.PlayerUseTitleResponse = function(e, t) {
                console.log("----------\x3e PlayerUseTitleResponse:" + JSON.stringify(t)), t.IsOk && o.default.instance.playerUseTitle(t.TypeID);
            }, e._instance = null, e;
        }();
        a.default = s, cc._RF.pop();
    }, {
        "../common/emmiter": "emmiter",
        "../common/message": "message",
        "../manager/achievenment_manager": "achievenment_manager",
        "../manager/network_manager": "network_manager"
    } ],
    achievement_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "0dc804L94dC45REB8H05knW", "achievement_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../audio_manager"), i = e("../manager/pool_manager"), r = e("../manager/achievenment_manager"), o = e("../manager/data_manager"), s = e("./item/achievement_item"), l = e("../util"), c = e("./item/title_item"), u = cc._decorator, d = u.ccclass, p = u.property, m = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.maskNode = null, t.contentNode = null, t.nodeAchievementPart = null, 
                t.nodeTitleContent = null, t.nodeTitlePart = null, t.btnAchievement = null, t.btnTitle = null, 
                t.isShowingAchievement = !0, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideUI, this), this.btnAchievement.node.on("click", this.showAchievement, this), 
                this.btnTitle.node.on("click", this.showTitle, this), this.uiNode.active && (this.uiNode.active = !1);
            }, t.prototype.showUI = function() {
                n.default.instance.PlayUISelect(), this.uiNode.active = !0, this.refreshUI();
            }, t.prototype.isShow = function() {
                return this.uiNode.active;
            }, t.prototype.showAchievement = function() {
                n.default.instance.PlayUISelect(), this.isShowingAchievement = !0, this.refreshUI();
            }, t.prototype.showTitle = function() {
                n.default.instance.PlayUISelect(), this.isShowingAchievement = !1, this.refreshUI();
            }, t.prototype.setPreClick = function(e) {
                e.scale = .8, e.color = cc.Color.GRAY;
            }, t.prototype.setNormal = function(e) {
                e.scale = 1, e.color = cc.Color.WHITE;
            }, t.prototype.refreshUI = function() {
                if (this.isShowingAchievement) {
                    this.nodeAchievementPart.active = !0, this.nodeTitlePart.active = !1, this.setNormal(this.btnAchievement.node), 
                    this.setPreClick(this.btnTitle.node);
                    for (var e = (g = this.contentNode.children).length - 1; e >= 0; e--) i.default.instance.RemoveObjectByName("AchievementItem", g[e]);
                    var t = r.default.instance.curAchievement, a = [];
                    for (var n in t) null != t[n] && a.push(t[n]);
                    for (var u = 0, d = a = l.default.orderby(a, function(e) {
                        return e.sortValue;
                    }); u < d.length; u++) {
                        var p = d[u];
                        if (_ = o.default.instance.achievementData[p.curID]) {
                            var m = i.default.instance.CreateObjectByName("AchievementItem", this.contentNode), f = _.bonus["钻石"];
                            2 == _.type ? m.getComponent(s.default).Init(p.curID, _.desc, p.curProcess, _.compelete_param2, f, _.title, _.level) : m.getComponent(s.default).Init(p.curID, _.desc, p.curProcess, _.compelete_param1, f, _.title, _.level);
                        }
                    }
                } else {
                    this.nodeAchievementPart.active = !1, this.nodeTitlePart.active = !0, this.setNormal(this.btnTitle.node), 
                    this.setPreClick(this.btnAchievement.node);
                    var g;
                    for (e = (g = this.nodeTitleContent.children).length - 1; e >= 0; e--) i.default.instance.RemoveObjectByName("TitleItem", g[e]);
                    t = r.default.instance.curCanUseTitle;
                    for (var h in t) {
                        var _;
                        if (_ = o.default.instance.achievementData[t[h]]) {
                            m = i.default.instance.CreateObjectByName("TitleItem", this.nodeTitleContent);
                            var y = r.default.instance.getTitleAttrShow(Number(h)), v = _.level, b = _.title;
                            m.getComponent(c.default).Init(Number(h), b, y, v);
                        }
                    }
                }
            }, t.prototype.hideUI = function() {
                this.uiNode.active = !1;
            }, t.instance = null, __decorate([ p(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ p(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ p(cc.Node) ], t.prototype, "contentNode", void 0), 
            __decorate([ p(cc.Node) ], t.prototype, "nodeAchievementPart", void 0), __decorate([ p(cc.Node) ], t.prototype, "nodeTitleContent", void 0), 
            __decorate([ p(cc.Node) ], t.prototype, "nodeTitlePart", void 0), __decorate([ p(cc.Button) ], t.prototype, "btnAchievement", void 0), 
            __decorate([ p(cc.Button) ], t.prototype, "btnTitle", void 0), t = a = __decorate([ d ], t);
        }(cc.Component);
        a.default = m, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../manager/achievenment_manager": "achievenment_manager",
        "../manager/data_manager": "data_manager",
        "../manager/pool_manager": "pool_manager",
        "../util": "util",
        "./item/achievement_item": "achievement_item",
        "./item/title_item": "title_item"
    } ],
    achievenment_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "26cd0eMjQBNw7h0POoquDfD", "achievenment_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./data_manager"), i = e("../ui/achievement_ui_manager"), r = e("../ui/battle_ui_manager"), o = function() {
            function e() {}
            return e.prototype.isCompeleted = function() {
                var e = n.default.instance.achievementData[this.curID];
                return 2 == e.type ? e.compelete_param2 <= this.curProcess : e.compelete_param1 <= this.curProcess;
            }, Object.defineProperty(e.prototype, "sortValue", {
                get: function() {
                    var e = 0;
                    return this.isCompeleted() && (e += 1e6), -(e += this.curID);
                },
                enumerable: !0,
                configurable: !0
            }), e;
        }();
        a.AchievementData = o;
        var s = function() {
            function e() {
                this.curAchievement = {}, this.curCanUseTitle = {}, this.curTitleType = 0;
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.updateAchievementDatas = function(e) {
                var t = 0, a = 0;
                for (var o in e) this.updateAchievementData(Number(o), e[o]), t = Number(o), a = e[o];
                if (i.default.instance && i.default.instance.isShow() && i.default.instance.refreshUI(), 
                0 != t) {
                    var s = n.default.instance.achievementData[t];
                    s && (2 == s.type ? r.default.instance.updateAchievementInfo(s.desc, a, s.compelete_param2) : r.default.instance.updateAchievementInfo(s.desc, a, s.compelete_param1));
                }
            }, e.prototype.hasCompeletedAchievement = function() {
                for (var e in this.curAchievement) if (this.curAchievement[e].isCompeleted()) return !0;
                return !1;
            }, e.prototype.getTitleAttrShow = function(e) {
                if (this.curCanUseTitle[e]) {
                    var t = this.curCanUseTitle[e], a = n.default.instance.achievementData[t], i = "";
                    if (null != a) {
                        var r = {};
                        for (var o in a.buff_add) null == r[o] ? r[o] = a.buff_add[o] : r[o] += a.buff_add[o];
                        for (var o in r) r[o] > 0 ? i += o + ":+" + n.default.instance.getAttrValStr(o, r[o]) + "    " : i += o + ":" + n.default.instance.getAttrValStr(o, r[o]) + "    ";
                    }
                    return i;
                }
                return "";
            }, e.prototype.updatePlayerCanUseTitle = function(e) {
                for (var t in this.curCanUseTitle = [], e) this.curCanUseTitle[Number(t)] = e[t];
            }, e.prototype.updateAchievementData = function(e, t) {
                var a = new o();
                a.curID = e, a.curProcess = t, this.curAchievement[e] = a;
            }, e.prototype.getAchievementDataByTypeAndLv = function(e, t) {
                var a = n.default.instance.achievementData;
                for (var i in a) if (a[i].type == e && a[i].level == t) return a[i];
                return null;
            }, e.prototype.playerUseTitle = function(e) {
                this.curTitleType = e, i.default.instance.isShow() && i.default.instance.refreshUI(), 
                r.default.instance.updatePlayerName();
            }, e.prototype.getUserTitle = function() {
                if (0 != this.curTitleType && this.curCanUseTitle[this.curTitleType]) {
                    var e = this.curCanUseTitle[this.curTitleType];
                    return n.default.instance.achievementData[e].title;
                }
                return "";
            }, e.prototype.getOtherTitle = function(e) {
                var t = n.default.instance.achievementData;
                for (var a in t) if (t[a].id == e) return t[a].title;
                return "";
            }, e.prototype.getRewardByServer = function(e, t) {
                e && (n.default.instance.achievementData[t] && delete this.curAchievement[t], i.default.instance.isShow() && i.default.instance.refreshUI());
            }, e.prototype.getTitleAttr = function(e) {
                if (0 != this.curTitleType && this.curCanUseTitle[this.curTitleType]) {
                    var t = this.curCanUseTitle[this.curTitleType], a = n.default.instance.achievementData[t];
                    if (a.buff_add[e]) return a.buff_add[e];
                }
                return 0;
            }, e._instance = null, e;
        }();
        a.default = s, cc._RF.pop();
    }, {
        "../ui/achievement_ui_manager": "achievement_ui_manager",
        "../ui/battle_ui_manager": "battle_ui_manager",
        "./data_manager": "data_manager"
    } ],
    ad_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "01cda9mWHpN4q2vMrs4FJv0", "ad_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/wx_manager"), i = e("../../manager/dynamic_data_manager"), r = e("../../network/player_network"), o = e("../../manager/reward_effect_manager"), s = e("../../manager/ui_manager"), l = cc._decorator, c = l.ccclass, u = l.property, d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.curNode = null, t.checkAdTime = 120, t.curTime = 0, t;
            }
            var a;
            return __extends(t, e), a = t, Object.defineProperty(t, "instance", {
                get: function() {
                    return this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.start = function() {
                a._instance = this, this.curNode.active = !1, this.curNode.on("click", this.showAd, this), 
                n.default.instance.IsWechat() && n.default.instance.initVideoAd(a.instance.adcallback);
            }, t.prototype.setCloseShowTime = function() {
                this.curTime = 115;
            }, t.prototype.showAd = function() {
                s.default.instance.LoadMessageBox("广告 - 200钻石奖励", "确认跳转广告，取消则放弃此次奖励机会。（广告不影响在线挂机）", a.instance.jumpToAd);
            }, t.prototype.jumpToAd = function(e) {
                e && (n.default.instance.IsWechat() ? n.default.instance.showAd() : a.instance.adcallback(!0)), 
                a.instance.curNode.active = !1;
            }, t.prototype.close = function() {
                a.instance.node.active = !1;
            }, t.prototype.checkHasLeftAD = function() {
                return i.default.instance.playerLeftADShow > 0;
            }, t.prototype.update = function(e) {
                this.curTime += e, this.curTime > this.checkAdTime && (this.checkHasLeftAD() ? n.default.instance.IsWechat() ? n.default.instance.hasAd() && (this.curNode.active = !0) : this.curNode.active = !0 : this.node.active = !1, 
                this.curTime = 0);
            }, t.prototype.adcallback = function(e) {
                e ? (console.log("观看广告完毕"), r.default.instance.UpdatePlayerBaseData(), a.instance.curNode.active = !1, 
                o.default.instance.createDaimondEffect(10, "钻石", a.instance.curNode.parent.convertToWorldSpaceAR(a.instance.curNode.position)), 
                r.default.instance.PlayerShowAdRequest()) : s.default.instance.LoadTipsByStr("您的视频还没看完，请再次尝试");
            }, t._instance = null, __decorate([ u(cc.Node) ], t.prototype, "curNode", void 0), 
            t = a = __decorate([ c ], t);
        }(cc.Component);
        a.default = d, cc._RF.pop();
    }, {
        "../../manager/dynamic_data_manager": "dynamic_data_manager",
        "../../manager/reward_effect_manager": "reward_effect_manager",
        "../../manager/ui_manager": "ui_manager",
        "../../manager/wx_manager": "wx_manager",
        "../../network/player_network": "player_network"
    } ],
    add_exp_effect: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "7410bGx4wVIZIfqKE1cmkx3", "add_exp_effect"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/pool_manager"), i = cc._decorator, r = i.ccclass, o = i.property, s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelValue = null, t;
            }
            return __extends(t, e), t.prototype.Init = function(e) {
                this.node.opacity = 255, this.labelValue.string = "EXP+" + e.toString(), this.node.getComponent(cc.Animation).play(), 
                this.scheduleOnce(function() {
                    n.default.instance.RemoveObjectByName("AddEXPEffect", this.node);
                }, 2);
            }, __decorate([ o(cc.Label) ], t.prototype, "labelValue", void 0), t = __decorate([ r ], t);
        }(cc.Component);
        a.default = s, cc._RF.pop();
    }, {
        "../../manager/pool_manager": "pool_manager"
    } ],
    add_hole_select_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "a412dKBXMBEcIM37G0x0WpU", "add_hole_select_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/dynamic_data_manager"), i = e("../manager/pool_manager"), r = e("./item/bag_item"), o = e("../common/allenum"), s = e("../audio_manager"), l = cc._decorator, c = l.ccclass, u = l.property, d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.bagUINode = null, t.maskNode = null, t.bagContentViewNode = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideBagUI, this), this.bagUINode.active && (this.bagUINode.active = !1);
            }, t.prototype.showUI = function() {
                s.default.instance.PlayUISelect(), this.bagUINode.active = !0, this.refreshBagUI();
            }, t.prototype.refreshBagUI = function() {
                for (var e = this.bagContentViewNode.children, t = e.length - 1; t >= 0; t--) i.default.instance.RemoveBagItem(e[t]);
                if (null != n.default.instance.EquipItemAllDatas) for (var a in n.default.instance.EquipItemAllDatas) if (null != a) for (var s in n.default.instance.EquipItemAllDatas[a]) if (n.default.instance.EquipItemAllDatas[a][s].canAddHole()) {
                    var l = i.default.instance.CreateBagItem(this.bagContentViewNode).getComponent(r.default);
                    l.reinit(n.default.instance.EquipItemAllDatas[a][s], o.GridType.PreAddHoleItem), 
                    l.setEquipingTag(Number(a) + 1);
                }
                if (null != n.default.instance.BagItemDataMap) for (var c in n.default.instance.BagItemDataMap) {
                    if (n.default.instance.BagItemDataMap[c].canAddHole()) i.default.instance.CreateBagItem(this.bagContentViewNode).getComponent(r.default).reinit(n.default.instance.BagItemDataMap[c], o.GridType.PreAddHoleItem);
                }
            }, t.prototype.hideBagUI = function() {
                this.bagUINode.active = !1;
            }, t.instance = null, __decorate([ u(cc.Node) ], t.prototype, "bagUINode", void 0), 
            __decorate([ u(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ u(cc.Node) ], t.prototype, "bagContentViewNode", void 0), 
            t = a = __decorate([ c ], t);
        }(cc.Component);
        a.default = d, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../common/allenum": "allenum",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/pool_manager": "pool_manager",
        "./item/bag_item": "bag_item"
    } ],
    add_hp_effect: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "0d126yb6FJLAaQTod5uztO9", "add_hp_effect"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/pool_manager"), i = e("../../util"), r = cc._decorator, o = r.ccclass, s = r.property, l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelValue = null, t;
            }
            return __extends(t, e), t.prototype.Init = function(e) {
                this.node.opacity = 255, this.labelValue.string = "HP+" + i.default.GetLargeNumStr(e), 
                this.node.getComponent(cc.Animation).play(), this.scheduleOnce(function() {
                    n.default.instance.RemoveObjectByName("AddHPEffect", this.node);
                }, 2);
            }, __decorate([ s(cc.Label) ], t.prototype, "labelValue", void 0), t = __decorate([ o ], t);
        }(cc.Component);
        a.default = l, cc._RF.pop();
    }, {
        "../../manager/pool_manager": "pool_manager",
        "../../util": "util"
    } ],
    add_mp_effect: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "d17a8AaYa1AALQCjfSYAplU", "add_mp_effect"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/pool_manager"), i = e("../../util"), r = cc._decorator, o = r.ccclass, s = r.property, l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelValue = null, t;
            }
            return __extends(t, e), t.prototype.Init = function(e) {
                this.node.opacity = 255, this.labelValue.string = "MP+" + i.default.GetLargeNumStr(e), 
                this.node.getComponent(cc.Animation).play(), this.scheduleOnce(function() {
                    n.default.instance.RemoveObjectByName("AddMPEffect", this.node);
                }, 2);
            }, __decorate([ s(cc.Label) ], t.prototype, "labelValue", void 0), t = __decorate([ o ], t);
        }(cc.Component);
        a.default = l, cc._RF.pop();
    }, {
        "../../manager/pool_manager": "pool_manager",
        "../../util": "util"
    } ],
    add_resource_effect: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "0d217R7ciNDIbs7OcGHiQ1D", "add_resource_effect"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../ui/money_bar_ui_manager"), i = e("../../math/rand"), r = e("../../manager/pool_manager"), o = e("../../manager/resource_manager"), s = e("../../ui/menu_ui_manager"), l = e("../../audio_manager"), c = e("../../battle/battle_manager"), u = cc._decorator, d = u.ccclass, p = u.property, m = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.spriteIcon = null, t.spriteBg = null, t.isStart = !1, t.targetVec = null, 
                t.moveSpeed = 11, t.startSpeed = null, t.addSpeed = 1, t.isMoney = !0, t;
            }
            return __extends(t, e), t.prototype.onLoad = function() {}, t.prototype.Init = function(e, t, a) {
                "钻石" == e ? (this.isMoney = !0, this.spriteIcon.spriteFrame = o.default.instance.getCommonSprite("daimond"), 
                this.targetVec = n.default.instance.getDaimondWorldPos(), this.spriteBg.enabled = !1, 
                this.addSpeed = 1) : "金币" == e ? (this.isMoney = !0, this.spriteIcon.spriteFrame = o.default.instance.getCommonSprite("gold"), 
                this.targetVec = n.default.instance.getGoldWorldPos(), this.spriteBg.enabled = !1, 
                this.addSpeed = 1) : "假钻石" == e ? (this.isMoney = !0, this.spriteIcon.spriteFrame = o.default.instance.getCommonSprite("daimond"), 
                this.targetVec = c.default.instance.getMissleadingPos("钻石"), this.spriteBg.enabled = !1, 
                this.addSpeed = 1) : "假金币" == e ? (this.isMoney = !0, this.spriteIcon.spriteFrame = o.default.instance.getCommonSprite("gold"), 
                this.targetVec = c.default.instance.getMissleadingPos("金币"), this.spriteBg.enabled = !1, 
                this.addSpeed = 1) : "精灵" == e ? (this.spriteIcon.spriteFrame = o.default.instance.getSpriteSprite(a), 
                this.targetVec = s.default.instance.getSpriteIconWorldPos(), this.spriteBg.enabled = !0, 
                this.isMoney = !1, this.addSpeed = 0) : (this.spriteIcon.spriteFrame = o.default.instance.getEquipSprite(a), 
                this.targetVec = s.default.instance.getBagIconWorldPos(), this.spriteBg.enabled = !0, 
                this.isMoney = !1, this.addSpeed = 0), this.isStart = !0, this.node.position = t, 
                this.startSpeed = new cc.Vec2(i.default.getZeroToOne() - .5, i.default.getZeroToOne() - .5).normalizeSelf();
            }, t.prototype.update = function(e) {
                this.isStart && this.targetVec && (this.startSpeed = this.targetVec.sub(this.node.position).normalizeSelf().add(this.startSpeed.mul(4)).normalizeSelf(), 
                this.node.position = this.node.position.add(this.startSpeed.mul(this.moveSpeed * this.addSpeed)), 
                this.isMoney ? (this.targetVec.sub(this.node.position).mag() < 5 || this.targetVec.y < this.node.position.y) && (this.isStart = !1, 
                this.node.position = this.targetVec, l.default.instance.PlayCoin(), this.scheduleOnce(function() {
                    r.default.instance.RemoveObjectByName("MoneyItem", this.node);
                }, .5)) : (this.targetVec.sub(this.node.position).mag() < 5 || this.targetVec.y > this.node.position.y) && (this.isStart = !1, 
                this.node.position = this.targetVec, l.default.instance.PlayDaimond(), this.scheduleOnce(function() {
                    r.default.instance.RemoveObjectByName("MoneyItem", this.node);
                }, .5)), this.addSpeed += 3 * e);
            }, __decorate([ p(cc.Sprite) ], t.prototype, "spriteIcon", void 0), __decorate([ p(cc.Sprite) ], t.prototype, "spriteBg", void 0), 
            t = __decorate([ d ], t);
        }(cc.Component);
        a.default = m, cc._RF.pop();
    }, {
        "../../audio_manager": "audio_manager",
        "../../battle/battle_manager": "battle_manager",
        "../../manager/pool_manager": "pool_manager",
        "../../manager/resource_manager": "resource_manager",
        "../../math/rand": "rand",
        "../../ui/menu_ui_manager": "menu_ui_manager",
        "../../ui/money_bar_ui_manager": "money_bar_ui_manager"
    } ],
    add_to_my_program_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "1cca4WuKkNDb5jC16gjl2SS", "add_to_my_program_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, r = n.property, o = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.nodeSprite = null, t;
            }
            var a;
            return __extends(t, e), a = t, Object.defineProperty(t, "instance", {
                get: function() {
                    return this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.start = function() {
                a._instance = this;
            }, t.prototype.showInfo = function() {
                this.nodeSprite.active = !0, this.scheduleOnce(function() {
                    this.nodeSprite.active = !1;
                }, 8);
            }, t._instance = null, __decorate([ r(cc.Node) ], t.prototype, "nodeSprite", void 0), 
            t = a = __decorate([ i ], t);
        }(cc.Component);
        a.default = o, cc._RF.pop();
    }, {} ],
    allenum: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "aa547UXBW9JsZrgn6Y52Hlx", "allenum"), Object.defineProperty(a, "__esModule", {
            value: !0
        }), function(e) {
            e[e.BagItem = 1] = "BagItem", e[e.RefreshItem = 2] = "RefreshItem", e[e.StrengthenItem = 3] = "StrengthenItem", 
            e[e.DepotItem = 4] = "DepotItem", e[e.GemItem = 5] = "GemItem", e[e.PreGemEquipItem = 6] = "PreGemEquipItem", 
            e[e.PreAddHoleItem = 7] = "PreAddHoleItem";
        }(a.GridType || (a.GridType = {})), function(e) {
            e[e.GameBegin = 1] = "GameBegin", e[e.LoadResource = 2] = "LoadResource", e[e.Login = 3] = "Login", 
            e[e.GamePlaying = 4] = "GamePlaying", e[e.TryReconnect = 5] = "TryReconnect", e[e.BeingKickOffline = 6] = "BeingKickOffline";
        }(a.GameStatus || (a.GameStatus = {})), function(e) {
            e[e.BattleShow = 1] = "BattleShow", e[e.NormalBattling = 2] = "NormalBattling", 
            e[e.NormalIdle = 3] = "NormalIdle", e[e.TargetLevelBattling = 4] = "TargetLevelBattling";
        }(a.BattleStatus || (a.BattleStatus = {})), function(e) {
            e[e.Normal = 1] = "Normal", e[e.Reborning = 2] = "Reborning";
        }(a.PlayerStatus || (a.PlayerStatus = {})), function(e) {
            e[e.GameStart = 1] = "GameStart", e[e.RoleAlert = 2] = "RoleAlert", e[e.SpriteAlert = 3] = "SpriteAlert", 
            e[e.BagAlert = 4] = "BagAlert", e[e.EventAlert = 5] = "EventAlert", e[e.SignAlert = 6] = "SignAlert";
        }(a.AlertType || (a.AlertType = {})), function(e) {
            e[e.On = 1] = "On", e[e.Off = 2] = "Off";
        }(a.SettingStatus || (a.SettingStatus = {})), function(e) {
            e[e.Coin = 1] = "Coin", e[e.Daimod = 2] = "Daimod";
        }(a.MoneyType || (a.MoneyType = {})), function(e) {
            e[e.KillMonster = 101] = "KillMonster", e[e.AttackMonster = 102] = "AttackMonster", 
            e[e.EventBonus = 201] = "EventBonus", e[e.DailyReward = 301] = "DailyReward", e[e.SignReward = 401] = "SignReward", 
            e[e.SellEquip = 501] = "SellEquip", e[e.StreagthEquip = 502] = "StreagthEquip", 
            e[e.RefreshEquip = 503] = "RefreshEquip", e[e.AddHoleEquip = 504] = "AddHoleEquip", 
            e[e.BuyBlackMarket = 601] = "BuyBlackMarket", e[e.BuyAltar = 602] = "BuyAltar", 
            e[e.SkillLearn = 603] = "SkillLearn", e[e.SkillLVUp = 604] = "SkillLVUp", e[e.SpriteLVUp = 701] = "SpriteLVUp", 
            e[e.AchievementReward = 801] = "AchievementReward", e[e.GemCombine = 901] = "GemCombine", 
            e[e.InvitFriend = 1001] = "InvitFriend", e[e.ViewAd = 1002] = "ViewAd", e[e.CollectionBouns = 1003] = "CollectionBouns", 
            e[e.NewLiftReward = 1004] = "NewLiftReward";
        }(a.MoneyChangeType || (a.MoneyChangeType = {})), function(e) {
            e[e.Common = 1] = "Common", e[e.Equip = 2] = "Equip", e[e.Depot = 3] = "Depot";
        }(a.BagType || (a.BagType = {})), function(e) {
            e[e.KillMonster = 101] = "KillMonster", e[e.Sign = 102] = "Sign";
        }(a.ExpActionType || (a.ExpActionType = {})), function(e) {
            e[e.EventBonus = 101] = "EventBonus", e[e.DailyReward = 102] = "DailyReward", e[e.SignReward = 103] = "SignReward", 
            e[e.BuyBlackMarket = 104] = "BuyBlackMarket";
        }(a.SpriteActionType || (a.SpriteActionType = {})), function(e) {
            e[e.KillMonster = 101] = "KillMonster", e[e.EventBonus = 102] = "EventBonus", e[e.DailyReward = 103] = "DailyReward", 
            e[e.SignReward = 104] = "SignReward", e[e.BuyBlackMarket = 105] = "BuyBlackMarket";
        }(a.EquipActionType || (a.EquipActionType = {})), function(e) {
            e[e.TapMonster = 1] = "TapMonster", e[e.Sign = 2] = "Sign", e[e.OpenBag = 3] = "OpenBag", 
            e[e.OpenRole = 4] = "OpenRole", e[e.DailyReward = 5] = "DailyReward", e[e.EventSwich = 6] = "EventSwich", 
            e[e.EventCardBonus = 7] = "EventCardBonus", e[e.OpenSprite = 8] = "OpenSprite", 
            e[e.OpenAltar = 9] = "OpenAltar", e[e.OpenAchievement = 10] = "OpenAchievement", 
            e[e.OpenBlackmarket = 11] = "OpenBlackmarket", e[e.Relife = 12] = "Relife", e[e.EventSwichOpen = 13] = "EventSwichOpen", 
            e[e.ShowOfflineReward = 14] = "ShowOfflineReward";
        }(a.GuildEventType || (a.GuildEventType = {})), cc._RF.pop();
    }, {} ],
    attr_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "ec78aFZL7lO16/Wv13wwDzE", "attr_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, r = n.property, o = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.label = null, t.label2 = null, t.btnRefresh = null, t.curCallBack = null, 
                t.curID = 0, t;
            }
            return __extends(t, e), t.prototype.onLoad = function() {
                this.btnRefresh.node.on("click", this.onClick, this);
            }, t.prototype.init = function(e, t, a, n) {
                this.label.string = e, this.label2.string = t, this.curCallBack = n, this.curID = a, 
                0 == a ? (this.btnRefresh.node.active = !1, this.label.node.color = cc.Color.WHITE) : (this.btnRefresh.node.active = !0, 
                this.label.node.color = cc.Color.GREEN);
            }, t.prototype.onClick = function() {
                0 != this.curID ? this.curCallBack(this.curID) : console.error("error id");
            }, __decorate([ r(cc.Label) ], t.prototype, "label", void 0), __decorate([ r(cc.Label) ], t.prototype, "label2", void 0), 
            __decorate([ r(cc.Button) ], t.prototype, "btnRefresh", void 0), t = __decorate([ i ], t);
        }(cc.Component);
        a.default = o, cc._RF.pop();
    }, {} ],
    audio_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "4e793WCp/VG0qcSh9s3cjFN", "audio_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./math/rand"), i = cc._decorator, r = i.ccclass, o = i.property, s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.sound_BeingAttack = null, t.sound_SelectUI = null, t.sound_Warning = null, 
                t.sound_Coin = null, t.sound_Daimond = null, t.sound_Equip = null, t.sound_Block = null, 
                t.sound_So = null, t.sound_Fly = null, t.soundOpen = !0, t.bgmUrl = "https://mini-app.img.shouyouqianxian.com/littlehero/1.mp3", 
                t.bgmUrl2 = "https://mini-app.img.shouyouqianxian.com/littlehero/2.mp3", t.bgmUrl3 = "https://mini-app.img.shouyouqianxian.com/littlehero/3.mp3", 
                t.bgmUrl4 = "https://mini-app.img.shouyouqianxian.com/littlehero/4.mp3", t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this;
            }, t.prototype.SwitchSound = function() {
                this.soundOpen ? (this.soundOpen = !1, cc.audioEngine.stopMusic()) : (this.soundOpen = !0, 
                this.PlayBGM());
            }, t.prototype.PlayBGM = function() {
                var e = this.bgmUrl, t = n.default.getZeroToOne();
                t > .75 ? e = this.bgmUrl4 : t > .5 ? e = this.bgmUrl3 : t > .25 && (e = this.bgmUrl2), 
                cc.loader.load(e, function(e, t) {
                    cc.audioEngine.playMusic(t, !0);
                });
            }, t.prototype.PlayBeingAttack = function() {
                this.soundOpen && this.sound_BeingAttack.play();
            }, t.prototype.PlayUISelect = function() {
                this.soundOpen && this.sound_SelectUI.play();
            }, t.prototype.PlayWarning = function() {
                this.soundOpen && this.sound_Warning.play();
            }, t.prototype.PlayCoin = function() {
                this.soundOpen && this.sound_Coin.play();
            }, t.prototype.PlayDaimond = function() {
                this.soundOpen && this.sound_Daimond.play();
            }, t.prototype.PlayEquip = function() {
                this.soundOpen && this.sound_Equip.play();
            }, t.prototype.PlayBlock = function() {
                this.soundOpen && this.sound_Block.play();
            }, t.prototype.PlaySo = function() {
                this.soundOpen && this.sound_So.play();
            }, t.prototype.PlayFly = function() {
                this.soundOpen && this.sound_Fly.play();
            }, t.instance = null, __decorate([ o(cc.AudioSource) ], t.prototype, "sound_BeingAttack", void 0), 
            __decorate([ o(cc.AudioSource) ], t.prototype, "sound_SelectUI", void 0), __decorate([ o(cc.AudioSource) ], t.prototype, "sound_Warning", void 0), 
            __decorate([ o(cc.AudioSource) ], t.prototype, "sound_Coin", void 0), __decorate([ o(cc.AudioSource) ], t.prototype, "sound_Daimond", void 0), 
            __decorate([ o(cc.AudioSource) ], t.prototype, "sound_Equip", void 0), __decorate([ o(cc.AudioSource) ], t.prototype, "sound_Block", void 0), 
            __decorate([ o(cc.AudioSource) ], t.prototype, "sound_So", void 0), __decorate([ o(cc.AudioSource) ], t.prototype, "sound_Fly", void 0), 
            t = a = __decorate([ r ], t);
        }(cc.Component);
        a.default = s, cc._RF.pop();
    }, {
        "./math/rand": "rand"
    } ],
    bag_control_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "da264/Sgi1MLJTHTvDECpKm", "bag_control_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/data_manager"), i = e("./equipinfo_tip_manager"), r = e("../network/gem_network"), o = e("../manager/dynamic_data_manager"), s = e("../audio_manager"), l = e("./role_ui_manager"), c = e("./battle_ui_manager"), u = e("./bag_ui_manager"), d = e("../manager/ui_manager"), p = cc._decorator, m = p.ccclass, f = p.property, g = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.nodeGemEquipPart = null, t.btnEquipGemToEquip = null, t.nodeAddHolePart = null, 
                t.btnAddHole = null, t.curGemID = 0, t.nodeEquipingPart = null, t.btnTakeOff = null, 
                t.curEquipHeroItem = null, t.nodeDepotPart = null, t.btnPutInBag = null, t.nodeCommonBag = null, 
                t.btnEquipBody = null, t.btnSell = null, t.btnGoDepot = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.btnEquipGemToEquip.node.on("click", this.equipGemToEquipment, this), 
                this.btnAddHole.node.on("click", this.addHole, this), this.btnTakeOff.node.on("click", this.takeOffEquip, this), 
                this.btnPutInBag.node.on("click", this.putInBag, this), this.btnEquipBody.node.on("click", this.equipBody, this), 
                this.btnSell.node.on("click", this.sell, this), this.btnGoDepot.node.on("click", this.goDepot, this);
            }, t.prototype.showUI = function(e) {
                "gem_equip" == e ? this.showGemEquipPart() : "add_hole" == e ? this.showAddHolePart() : "equiping" == e ? this.showEquipingPart() : "depot" == e ? this.showDepotPart() : "common_bag" == e && this.showCommonBagPart();
            }, t.prototype.showGemEquipPart = function() {
                this.nodeGemEquipPart.active = !0;
            }, t.prototype.showAddHolePart = function() {
                this.nodeAddHolePart.active = !0;
            }, t.prototype.showEquipingPart = function() {
                this.nodeEquipingPart.active = !0;
            }, t.prototype.showDepotPart = function() {
                this.nodeDepotPart.active = !0;
            }, t.prototype.showCommonBagPart = function() {
                this.nodeCommonBag.active = !0;
            }, t.prototype.hideAll = function() {
                this.nodeGemEquipPart.active = !1, this.nodeAddHolePart.active = !1, this.nodeEquipingPart.active = !1, 
                this.nodeDepotPart.active = !1, this.nodeCommonBag.active = !1;
            }, t.prototype.setContolGemID = function(e) {
                this.curGemID = e;
            }, t.prototype.equipGemToEquipment = function() {
                var e = o.default.instance.GemItemDataMap[this.curGemID], t = n.default.instance.monsterGemData[this.curGemID];
                if (0 != e) {
                    if (t) {
                        var i = "是否将【" + t.name + "】镶嵌在此装备上？(剩余数量：" + e + ")";
                        d.default.instance.LoadMessageBox("魔晶镶嵌", i, a.instance.equipGemToEquipmentCallBack);
                    }
                } else d.default.instance.LoadTipsByStr("【" + t.name + "】已经用完");
            }, t.prototype.equipGemToEquipmentCallBack = function(e) {
                if (e) {
                    var t = i.default.instance.curBagItemData, n = o.default.instance.GetItemBagTypeByIndex(t.index);
                    r.default.instance.AddMonsterGemFromBagToEquipRequest(n, t.index, a.instance.curGemID);
                }
            }, t.prototype.addHole = function() {
                var e = i.default.instance.curBagItemData;
                if (e.canAddHole()) {
                    var t = "是否在【" + e.getName() + "】上打孔？";
                    0 == e.holeNum && (t += "(免费)"), d.default.instance.LoadMessageBox("魔晶镶嵌", t, a.instance.addHoleCallBack, e.getAddHoleCost());
                } else d.default.instance.LoadTipsByStr("已达到最大打孔数");
            }, t.prototype.addHoleCallBack = function(e) {
                if (e) {
                    var t = i.default.instance.curBagItemData, a = o.default.instance.GetItemBagTypeByIndex(t.index);
                    r.default.instance.AddEquipHoleRequest(a, t.index);
                }
            }, t.prototype.setEquipHeroItem = function(e) {
                this.curEquipHeroItem = e;
            }, t.prototype.takeOffEquip = function() {
                if (o.default.instance.isBagFull()) d.default.instance.LoadTipsByID("bag_count_limit"); else {
                    var e = i.default.instance.curBagItemData;
                    o.default.instance.TakeOffEquipItemNew(e), s.default.instance.PlayEquip(), i.default.instance.hideBagUI();
                }
            }, t.prototype.takeOffEquipByServer = function() {
                null != this.curEquipHeroItem && this.curEquipHeroItem.refreshItem(), l.default.instance && (l.default.instance.updateBaseAttr(), 
                l.default.instance.refreshAllEquipItem()), c.default.instance && c.default.instance.updatePlayerInfoUI();
            }, t.prototype.putInBag = function() {
                var e = i.default.instance.curBagItemData;
                o.default.instance.AddBagItemFromDepot(e), i.default.instance.hideBagUI();
            }, t.prototype.sell = function() {
                var e = i.default.instance.curBagItemData;
                0 == e.gemIDs.length ? (o.default.instance.SellItem(e), i.default.instance.hideBagUI()) : d.default.instance.LoadMessageBox("售卖装备", "此装备镶嵌有一个以上的魔晶，售卖时，魔晶将会自动脱落回魔晶背包。", a.instance.sellCallback);
            }, t.prototype.sellCallback = function(e) {
                if (e) {
                    var t = i.default.instance.curBagItemData;
                    o.default.instance.SellItem(t), u.default.instance.refreshBagUI(), i.default.instance.hideBagUI();
                }
            }, t.prototype.equipBody = function() {
                var e = i.default.instance.curBagItemData;
                if (o.default.instance.isBagFull()) d.default.instance.LoadTipsByID("bag_count_limit"); else {
                    var t = n.default.instance.equipmentData[e.baseId];
                    null != o.default.instance.EquipItemDataMap[t.type] && o.default.instance.TakeOffEquipItemNew(o.default.instance.EquipItemDataMap[t.type]), 
                    o.default.instance.EquipItem(e), i.default.instance.hideBagUI(), s.default.instance.PlayEquip();
                }
            }, t.prototype.equipBodyServerCallback = function() {
                u.default.instance.refreshBagUI(), u.default.instance.refreshBagUI(), c.default.instance.updatePlayerInfoUI();
            }, t.prototype.goDepot = function() {
                var e = i.default.instance.curBagItemData;
                o.default.instance.AddDepotItemFromBag(e), i.default.instance.hideBagUI();
            }, t.instance = null, __decorate([ f(cc.Node) ], t.prototype, "nodeGemEquipPart", void 0), 
            __decorate([ f(cc.Button) ], t.prototype, "btnEquipGemToEquip", void 0), __decorate([ f(cc.Node) ], t.prototype, "nodeAddHolePart", void 0), 
            __decorate([ f(cc.Button) ], t.prototype, "btnAddHole", void 0), __decorate([ f(cc.Node) ], t.prototype, "nodeEquipingPart", void 0), 
            __decorate([ f(cc.Button) ], t.prototype, "btnTakeOff", void 0), __decorate([ f(cc.Node) ], t.prototype, "nodeDepotPart", void 0), 
            __decorate([ f(cc.Button) ], t.prototype, "btnPutInBag", void 0), __decorate([ f(cc.Node) ], t.prototype, "nodeCommonBag", void 0), 
            __decorate([ f(cc.Button) ], t.prototype, "btnEquipBody", void 0), __decorate([ f(cc.Button) ], t.prototype, "btnSell", void 0), 
            __decorate([ f(cc.Button) ], t.prototype, "btnGoDepot", void 0), t = a = __decorate([ m ], t);
        }(cc.Component);
        a.default = g, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../manager/data_manager": "data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/ui_manager": "ui_manager",
        "../network/gem_network": "gem_network",
        "./bag_ui_manager": "bag_ui_manager",
        "./battle_ui_manager": "battle_ui_manager",
        "./equipinfo_tip_manager": "equipinfo_tip_manager",
        "./role_ui_manager": "role_ui_manager"
    } ],
    bag_item_data: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "6be74rTcqFJ0JVxA5wwx3my", "bag_item_data"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/data_manager"), i = e("../util"), r = function() {
            function e(e, t) {
                this.additionAttr = {}, this.holeNum = 0, this.baseId = e, this.num = t, this.lv = 0, 
                this.gemIDs = [];
            }
            return e.prototype.getName = function() {
                var e = n.default.instance.equipmentData[this.baseId].name;
                if (i.default.len(this.additionAttr) > 0) {
                    var t = "";
                    for (var a in this.additionAttr) {
                        t += n.default.instance.equipPrefixData[a].name;
                    }
                    e = t + e;
                }
                return this.lv > 0 ? e + " +" + this.lv.toString() : e;
            }, e.prototype.canAddHole = function() {
                return this.holeNum < 3;
            }, e.prototype.canEquipGem = function() {
                return this.holeNum > this.gemIDs.length;
            }, e.prototype.getEquipType = function() {
                return n.default.instance.equipmentData[this.baseId].type;
            }, e.prototype.getQuality = function() {
                return i.default.len(this.additionAttr);
            }, e.prototype.getNameColor = function() {
                var t = i.default.len(this.additionAttr);
                return 1 == t ? e.quality2Color : 2 == t ? e.quality3Color : 3 == t ? e.quality4Color : e.quality1Color;
            }, e.prototype.hasGem = function() {
                return this.gemIDs.length > 0;
            }, e.prototype.getQualitySpriteName = function() {
                var e = i.default.len(this.additionAttr);
                return 1 == e ? "equip2" : 2 == e ? "equip3" : 3 == e ? "equip4" : "equip1";
            }, e.prototype.getBaseAttr = function() {
                var e = {}, t = n.default.instance.equipmentData[this.baseId];
                for (var a in t.att) t.lv_attr[a] ? e[a] = t.att[a] + t.lv_attr[a] * this.lv : e[a] = t.att[a];
                return e;
            }, e.prototype.canStrength = function() {
                return this.lv < n.default.instance.equipmentData[this.baseId].max_lv;
            }, e.prototype.strength = function() {
                this.lv++;
            }, e.prototype.getStrengthenCost = function() {
                var e = n.default.instance.equipmentData[this.baseId], t = {};
                for (var a in e.lv_up_cost) t[a] = Math.floor(e.lv_up_cost[a] * (this.lv + 1) * (this.lv + 1) / 15);
                return t;
            }, e.prototype.getStrengthenCostByLV = function(e) {
                var t = n.default.instance.equipmentData[this.baseId], a = {};
                for (var i in t.lv_up_cost) a[i] = Math.floor(t.lv_up_cost[i] * (e + 1) * (e + 1) / 15);
                return a;
            }, e.prototype.getTotalStrengthenSpentCost = function() {
                for (var e = {}, t = 0; t < this.lv; t++) {
                    var a = this.getStrengthenCostByLV(t);
                    for (var n in a) e[n] ? e[n] = a[n] + e[n] : e[n] = a[n];
                }
                return e["金币"] ? e["金币"] : 0;
            }, e.prototype.addAttr = function(e, t) {
                this.additionAttr[e] = t;
            }, e.prototype.addGem = function(e) {
                return this.gemIDs.length < this.holeNum ? (this.gemIDs.push(e), !0) : (console.log("no enought gem hole "), 
                !1);
            }, e.prototype.removeGem = function(e) {
                return i.default.IsContain(this.gemIDs, e) ? (i.default.Remove(this.gemIDs, e), 
                !0) : (console.log("no enought gem hole "), !1);
            }, e.prototype.getAddHoleCost = function() {
                return 1 == this.holeNum ? n.default.instance.equipmentData[this.baseId].add_hole2_cost : 2 == this.holeNum ? n.default.instance.equipmentData[this.baseId].add_hole3_cost : null;
            }, e.prototype.getEquipPoint = function() {
                var e = n.default.instance.equipmentData[this.baseId], t = 0;
                if (i.default.len(this.additionAttr) > 0) for (var a in this.additionAttr) {
                    var r = n.default.instance.equipPrefixData[a], o = n.default.instance.attrValueData[r.attrtype].value;
                    t += this.additionAttr[a] * o;
                }
                return Math.floor(e.value + t);
            }, e.prototype.getSellPrice = function() {
                var e = n.default.instance.equipmentData[this.baseId];
                return Math.floor(e.value / 5 + .1 * this.getTotalStrengthenSpentCost());
            }, e.quality1Color = new cc.Color(172, 172, 172, 255), e.quality2Color = new cc.Color(102, 205, 255, 255), 
            e.quality3Color = new cc.Color(255, 229, 18, 255), e.quality4Color = new cc.Color(255, 180, .255), 
            e;
        }();
        a.default = r, cc._RF.pop();
    }, {
        "../manager/data_manager": "data_manager",
        "../util": "util"
    } ],
    bag_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "5a473G2el5FtbCz4F5JIMqZ", "bag_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/data_manager"), i = e("../../common/allenum"), r = e("../refresh_ui_manager"), o = e("../../manager/resource_manager"), s = e("../../manager/dynamic_data_manager"), l = e("../../manager/ui_manager"), c = cc._decorator, u = c.ccclass, d = c.property, p = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.spriteBG = null, t.button = null, t.spriteIcon = null, t.nodeBetterTag = null, 
                t.nodeEquipTag = null, t.curItemData = null, t.itemType = i.GridType.BagItem, t.labelNum = null, 
                t.labelTag = null, t.curGemID = 0, t.curGemNum = 0, t;
            }
            return __extends(t, e), t.prototype.onLoad = function() {
                this.button.node.on("click", this.showItemInfo, this);
            }, t.prototype.setEquipingTag = function(e) {
                this.nodeEquipTag.active = !0, this.labelTag.string = "E" + e, this.nodeBetterTag && (this.nodeBetterTag.active = !1);
            }, t.prototype.initGem = function(e, t, a) {
                if (void 0 === a && (a = i.GridType.GemItem), n.default.instance.monsterGemData[e]) {
                    this.nodeEquipTag.active = !1, this.nodeBetterTag.active = !1, this.itemType = a, 
                    this.labelNum.node.active = !0, this.labelNum.string = t.toString(), this.curGemID = e, 
                    this.curGemNum = t;
                    var r = n.default.instance.monsterGemData[e];
                    this.spriteBG.spriteFrame = o.default.instance.getCommonSprite(r.quality_icon), 
                    this.spriteIcon.spriteFrame = o.default.instance.getEquipSprite(r.icon_path);
                }
            }, t.prototype.reinit = function(e, t) {
                void 0 === t && (t = i.GridType.BagItem), this.labelNum.node.active = !1, this.nodeEquipTag.active && (this.nodeEquipTag.active = !1), 
                this.curItemData = e;
                var a = this.curItemData.getQualitySpriteName();
                this.spriteBG.spriteFrame = o.default.instance.getCommonSprite(a);
                var r = n.default.instance.equipmentData[this.curItemData.baseId].icon_path;
                this.spriteIcon.spriteFrame = o.default.instance.getEquipSprite(r), this.itemType = t, 
                s.default.instance.IsBetterThanEquip(e) ? this.nodeBetterTag.active = !0 : this.nodeBetterTag.active = !1;
            }, t.prototype.showItemInfo = function() {
                this.itemType == i.GridType.BagItem ? (l.default.instance.LoadEquipInfoTips(this.curItemData), 
                l.default.instance.LoadBagControlUI("common_bag")) : this.itemType == i.GridType.RefreshItem ? r.default.instance.showRefreshTip(this.curItemData) : this.itemType == i.GridType.StrengthenItem ? l.default.instance.LoadStrengthenTip(this.curItemData) : this.itemType == i.GridType.DepotItem ? (l.default.instance.LoadEquipInfoTips(this.curItemData), 
                l.default.instance.LoadBagControlUI("depot")) : this.itemType == i.GridType.GemItem ? l.default.instance.LoadGemTipUI(this.curGemID, this.curGemNum) : this.itemType == i.GridType.PreGemEquipItem ? (l.default.instance.LoadEquipInfoTips(this.curItemData), 
                l.default.instance.LoadBagControlUI("gem_equip")) : this.itemType == i.GridType.PreAddHoleItem && (l.default.instance.LoadEquipInfoTips(this.curItemData), 
                l.default.instance.LoadBagControlUI("add_hole"));
            }, __decorate([ d(cc.Sprite) ], t.prototype, "spriteBG", void 0), __decorate([ d(cc.Button) ], t.prototype, "button", void 0), 
            __decorate([ d(cc.Sprite) ], t.prototype, "spriteIcon", void 0), __decorate([ d(cc.Node) ], t.prototype, "nodeBetterTag", void 0), 
            __decorate([ d(cc.Node) ], t.prototype, "nodeEquipTag", void 0), __decorate([ d(cc.Label) ], t.prototype, "labelNum", void 0), 
            __decorate([ d(cc.Label) ], t.prototype, "labelTag", void 0), t = __decorate([ u ], t);
        }(cc.Component);
        a.default = p, cc._RF.pop();
    }, {
        "../../common/allenum": "allenum",
        "../../manager/data_manager": "data_manager",
        "../../manager/dynamic_data_manager": "dynamic_data_manager",
        "../../manager/resource_manager": "resource_manager",
        "../../manager/ui_manager": "ui_manager",
        "../refresh_ui_manager": "refresh_ui_manager"
    } ],
    bag_network: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "e7b2eaHtShIepABgXKJYCjC", "bag_network"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../common/emmiter"), i = e("../manager/network_manager"), r = e("../common/message"), o = e("../manager/dynamic_data_manager"), s = e("../common/allenum"), l = e("../manager/game_manager"), c = e("../ui/strengthen_tip_manager"), u = e("../ui/refresh_tip"), d = e("../ui/bag_ui_manager"), p = e("../ui/sign_ui_manager"), m = e("../manager/data_manager"), f = e("../ui/role_ui_manager"), g = e("../ui/blackmarket_ui_manager"), h = function() {
            function e() {}
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.init = function() {
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.GetBagResponse, r.MessageType.GamePlay), this.GetBagResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.GetDepotResponse, r.MessageType.GamePlay), this.GetDepotResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.GetEquipResponse, r.MessageType.GamePlay), this.GetEquipResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.AddItemToBagResponse, r.MessageType.GamePlay), this.AddItemToBagResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.AddItemFromBagToDepotResponse, r.MessageType.GamePlay), this.AddItemFromBagToDepotResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.AddItemFromDepotToBagResponse, r.MessageType.GamePlay), this.AddItemFromDepotToBagResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.AddItemFromBagToEquipResponse, r.MessageType.GamePlay), this.AddItemFromBagToEquipResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.AddItemFromEquipToBagResponse, r.MessageType.GamePlay), this.AddItemFromEquipToBagResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.RemoveItemFromBagResponse, r.MessageType.GamePlay), this.RemoveItemFromBagResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.StengthItemResponse, r.MessageType.GamePlay), this.StengthItemResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.RefreshItemResponse, r.MessageType.GamePlay), this.RefreshItemResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.FastRemoveItemFromBagResponse, r.MessageType.GamePlay), this.FastRemoveItemFromBagResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.ActiveEquipResponse, r.MessageType.GamePlay), this.ActiveEquipResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerSyncEquipResponse, r.MessageType.GamePlay), this.PlayerSyncEquipResponse, this);
            }, e.prototype.GetBagRequest = function() {
                i.NetworkManager.SendMessage(r.MessageNo.GetBagRequest, r.MessageType.GamePlay, {});
            }, e.prototype.GetBagResponse = function(e, t) {
                for (var a in t) t[a] && o.default.instance.AddBagItemByServer(Number(a), t[a].BaseID, t[a].Lv, t[a].AdditionAttr, t[a].HoleNum, t[a].MonsterGemID);
                n.Emitter.fire(s.AlertType.BagAlert.toString()), l.default.instance.CheckedOneInit();
            }, e.prototype.GetDepotRequest = function() {
                i.NetworkManager.SendMessage(r.MessageNo.GetDepotRequest, r.MessageType.GamePlay, {});
            }, e.prototype.GetDepotResponse = function(e, t) {
                for (var a in t) t[a] && o.default.instance.AddDepotItemByServer(Number(a), t[a].BaseID, t[a].Lv, t[a].AdditionAttr, t[a].HoleNum, t[a].MonsterGemID);
                l.default.instance.CheckedOneInit();
            }, e.prototype.GetEquipRequest = function() {
                i.NetworkManager.SendMessage(r.MessageNo.GetEquipRequest, r.MessageType.GamePlay, {});
            }, e.prototype.GetEquipResponse = function(e, t) {
                for (var a in t) t[a] && o.default.instance.DealAllEquipByServer(Number(a), t[a].BaseID, t[a].Lv, t[a].AdditionAttr, t[a].HoleNum, t[a].MonsterGemID, t[a].EquipIndex);
                o.default.instance.getMainPlayer().fullfill(), l.default.instance.CheckedOneInit();
            }, e.prototype.AddItemToBagRequest = function(e, t) {
                var a = {
                    BaseID: Number(e),
                    AdditionAttr: t
                };
                i.NetworkManager.SendMessage(r.MessageNo.AddItemToBagRequest, r.MessageType.GamePlay, a);
            }, e.prototype.AddItemToBagResponse = function(e, t) {
                o.default.instance.AddBagItemByServer(t.Index, t.BaseID, 0, t.AdditionAttr, t.HoleNum, t.MonsterGemID), 
                n.Emitter.fire(s.AlertType.BagAlert.toString()), p.default.instance && p.default.instance.playGetBonusAnim(m.default.instance.equipmentData[t.BaseID].icon_path);
            }, e.prototype.AddItemFromBagToDepotRequest = function(e) {
                var t = {
                    Index: Number(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.AddItemFromBagToDepotRequest, r.MessageType.GamePlay, t);
            }, e.prototype.AddItemFromBagToDepotResponse = function(e, t) {
                t.IsOk && t.Index && o.default.instance.AddDepotItemFromBagByServer(t.Index);
            }, e.prototype.AddItemFromDepotToBagRequest = function(e) {
                var t = {
                    Index: Number(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.AddItemFromDepotToBagRequest, r.MessageType.GamePlay, t);
            }, e.prototype.AddItemFromDepotToBagResponse = function(e, t) {
                t.IsOk && t.Index && o.default.instance.AddBagItemFromDepotByServer(t.Index);
            }, e.prototype.AddItemFromBagToEquipRequest = function(e) {
                var t = {
                    Index: Number(e),
                    EquipBagIndex: Number(o.default.instance.curUseEquipPlanIndex)
                };
                i.NetworkManager.SendMessage(r.MessageNo.AddItemFromBagToEquipRequest, r.MessageType.GamePlay, t);
            }, e.prototype.AddItemFromBagToEquipResponse = function(e, t) {
                t.IsOk && t.Index && o.default.instance.EquipItemSuccess(t.Index, t.EquipBagIndex);
            }, e.prototype.AddItemFromEquipToBagRequest = function(e) {
                var t = {
                    Index: Number(e),
                    EquipBagIndex: Number(f.default.curChangeIndex)
                };
                i.NetworkManager.SendMessage(r.MessageNo.AddItemFromEquipToBagRequest, r.MessageType.GamePlay, t);
            }, e.prototype.AddItemFromEquipToBagResponse = function(e, t) {
                t.IsOk && t.Index && o.default.instance.TakeOffEquipItemNewByServer(t.Index, t.EquipBagIndex);
            }, e.prototype.RemoveItemFromBagRequest = function(e) {
                var t = {
                    Index: Number(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.RemoveItemFromBagRequest, r.MessageType.GamePlay, t);
            }, e.prototype.RemoveItemFromBagResponse = function(e, t) {
                t.IsOk && t.Index && o.default.instance.SellItemSuccess(t.Index);
            }, e.prototype.FastRemoveItemFromBagRequest = function(e) {
                var t = {
                    IndexArray: e
                };
                i.NetworkManager.SendMessage(r.MessageNo.FastRemoveItemFromBagRequest, r.MessageType.GamePlay, t);
            }, e.prototype.FastRemoveItemFromBagResponse = function(e, t) {
                if (t.IsOk) {
                    for (var a = 0, n = t.IndexArray; a < n.length; a++) {
                        var i = n[a];
                        delete o.default.instance.BagItemDataMap[i];
                    }
                    d.default.instance.refreshBagUI();
                }
            }, e.prototype.StengthItemRequest = function(e, t) {
                var a = {
                    Index: Number(e),
                    Part: Number(t)
                };
                i.NetworkManager.SendMessage(r.MessageNo.StengthItemRequest, r.MessageType.GamePlay, a);
            }, e.prototype.StengthItemResponse = function(e, t) {
                1 == t.IsOk && c.default.instance.strengthenSuccess();
            }, e.prototype.RefreshItemRequest = function(e, t, a, n) {
                var o = {
                    Index: Number(e),
                    Part: Number(t),
                    Key: Number(a),
                    Val: Number(n)
                };
                i.NetworkManager.SendMessage(r.MessageNo.RefreshItemRequest, r.MessageType.GamePlay, o);
            }, e.prototype.RefreshItemResponse = function(e, t) {
                1 == t.IsOk && u.default.instance.refreshEquipSuccess(t.Index, t.Key, t.Val);
            }, e.prototype.ActiveEquipRequest = function(e) {
                i.NetworkManager.SendMessage(r.MessageNo.ActiveEquipRequest, r.MessageType.GamePlay, {
                    Index: Number(e)
                });
            }, e.prototype.ActiveEquipResponse = function(e, t) {
                t.IsOk && o.default.instance.ChangeEquipPlanSuccess(t.Index);
            }, e.prototype.PlayerSyncEquipResponse = function(e, t) {
                t.ActionType == s.EquipActionType.BuyBlackMarket && g.default.instance && g.default.instance.bugSpriteOrEquipSuccess(!1), 
                o.default.instance.AddBagItemByServer(t.Index, t.BaseID, t.Lv, t.AdditionAttr, t.HoleNum, t.MonsterGemID);
            }, e._instance = null, e;
        }();
        a.default = h, cc._RF.pop();
    }, {
        "../common/allenum": "allenum",
        "../common/emmiter": "emmiter",
        "../common/message": "message",
        "../manager/data_manager": "data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/game_manager": "game_manager",
        "../manager/network_manager": "network_manager",
        "../ui/bag_ui_manager": "bag_ui_manager",
        "../ui/blackmarket_ui_manager": "blackmarket_ui_manager",
        "../ui/refresh_tip": "refresh_tip",
        "../ui/role_ui_manager": "role_ui_manager",
        "../ui/sign_ui_manager": "sign_ui_manager",
        "../ui/strengthen_tip_manager": "strengthen_tip_manager"
    } ],
    bag_tip_gem_show_ui: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "fa0e7uoAlVF55avaYaldNTt", "bag_tip_gem_show_ui"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/gem_manager"), i = e("../manager/help_manager"), r = e("../network/gem_network"), o = e("../manager/dynamic_data_manager"), s = e("../manager/resource_manager"), l = cc._decorator, c = l.ccclass, u = l.property, d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelHole1Attr = null, t.spriteHole1 = null, t.btnDropHole1 = null, t.labelHole2Attr = null, 
                t.spriteHole2 = null, t.btnDropHole2 = null, t.labelHole3Attr = null, t.spriteHole3 = null, 
                t.btnDropHole3 = null, t.curBagItem = null, t;
            }
            return __extends(t, e), t.prototype.onLoad = function() {
                this.btnDropHole1.node.on("click", this.dropGem1, this), this.btnDropHole2.node.on("click", this.dropGem2, this), 
                this.btnDropHole3.node.on("click", this.dropGem3, this);
            }, t.prototype.initByItemData = function(e) {
                this.curBagItem = e, 0 == e.holeNum ? (this.labelHole1Attr.node.active = !1, this.labelHole2Attr.node.active = !1, 
                this.labelHole3Attr.node.active = !1) : 1 == e.holeNum ? (this.labelHole1Attr.node.active = !0, 
                this.labelHole2Attr.node.active = !1, this.labelHole3Attr.node.active = !1) : 2 == e.holeNum ? (this.labelHole1Attr.node.active = !0, 
                this.labelHole2Attr.node.active = !0, this.labelHole3Attr.node.active = !1) : 3 == e.holeNum && (this.labelHole1Attr.node.active = !0, 
                this.labelHole2Attr.node.active = !0, this.labelHole3Attr.node.active = !0), 0 == e.gemIDs.length ? (this.setHole1Empty(), 
                this.setHole2Empty(), this.setHole3Empty()) : 1 == e.gemIDs.length ? (this.refreshGem1(), 
                this.setHole2Empty(), this.setHole3Empty()) : 2 == e.gemIDs.length ? (this.refreshGem1(), 
                this.refreshGem2(), this.setHole3Empty()) : 3 == e.gemIDs.length && (this.refreshGem1(), 
                this.refreshGem2(), this.refreshGem3());
            }, t.prototype.refreshGem1 = function() {
                this.spriteHole1.node.active = !0, this.btnDropHole1.node.active = !0;
                var e = "", t = n.default.instance.getAttrByGemIDAndEquipType(this.curBagItem.gemIDs[0], this.curBagItem.getEquipType());
                for (var a in t) e += i.default.instance.getAttrShowStr(a, t[a]);
                this.labelHole1Attr.string = e, this.spriteHole1.spriteFrame = s.default.instance.getCommonSprite(n.default.instance.getGemSpriteName(this.curBagItem.gemIDs[0]));
            }, t.prototype.refreshGem2 = function() {
                this.spriteHole2.node.active = !0, this.btnDropHole2.node.active = !0;
                var e = "", t = n.default.instance.getAttrByGemIDAndEquipType(this.curBagItem.gemIDs[1], this.curBagItem.getEquipType());
                for (var a in t) e += i.default.instance.getAttrShowStr(a, t[a]);
                this.labelHole2Attr.string = e, this.spriteHole2.spriteFrame = s.default.instance.getCommonSprite(n.default.instance.getGemSpriteName(this.curBagItem.gemIDs[1]));
            }, t.prototype.refreshGem3 = function() {
                this.spriteHole3.node.active = !0, this.btnDropHole3.node.active = !0;
                var e = "", t = n.default.instance.getAttrByGemIDAndEquipType(this.curBagItem.gemIDs[2], this.curBagItem.getEquipType());
                for (var a in t) e += i.default.instance.getAttrShowStr(a, t[a]);
                this.labelHole3Attr.string = e, this.spriteHole3.spriteFrame = s.default.instance.getCommonSprite(n.default.instance.getGemSpriteName(this.curBagItem.gemIDs[2]));
            }, t.prototype.setHole1Empty = function() {
                this.labelHole1Attr.string = "(未镶嵌)", this.spriteHole1.node.active = !1, this.btnDropHole1.node.active = !1;
            }, t.prototype.setHole2Empty = function() {
                this.labelHole2Attr.string = "(未镶嵌)", this.spriteHole2.node.active = !1, this.btnDropHole2.node.active = !1;
            }, t.prototype.setHole3Empty = function() {
                this.labelHole3Attr.string = "(未镶嵌)", this.spriteHole3.node.active = !1, this.btnDropHole3.node.active = !1;
            }, t.prototype.dropGem1 = function() {
                var e = o.default.instance.GetItemBagTypeByIndex(this.curBagItem.index), t = this.curBagItem.gemIDs[0];
                t && r.default.instance.AddMonsterGemFromEquipToBagRequest(e, this.curBagItem.index, t);
            }, t.prototype.dropGem2 = function() {
                var e = o.default.instance.GetItemBagTypeByIndex(this.curBagItem.index), t = this.curBagItem.gemIDs[1];
                t && r.default.instance.AddMonsterGemFromEquipToBagRequest(e, this.curBagItem.index, t);
            }, t.prototype.dropGem3 = function() {
                var e = o.default.instance.GetItemBagTypeByIndex(this.curBagItem.index), t = this.curBagItem.gemIDs[2];
                t && r.default.instance.AddMonsterGemFromEquipToBagRequest(e, this.curBagItem.index, t);
            }, __decorate([ u(cc.Label) ], t.prototype, "labelHole1Attr", void 0), __decorate([ u(cc.Sprite) ], t.prototype, "spriteHole1", void 0), 
            __decorate([ u(cc.Button) ], t.prototype, "btnDropHole1", void 0), __decorate([ u(cc.Label) ], t.prototype, "labelHole2Attr", void 0), 
            __decorate([ u(cc.Sprite) ], t.prototype, "spriteHole2", void 0), __decorate([ u(cc.Button) ], t.prototype, "btnDropHole2", void 0), 
            __decorate([ u(cc.Label) ], t.prototype, "labelHole3Attr", void 0), __decorate([ u(cc.Sprite) ], t.prototype, "spriteHole3", void 0), 
            __decorate([ u(cc.Button) ], t.prototype, "btnDropHole3", void 0), t = __decorate([ c ], t);
        }(cc.Component);
        a.default = d, cc._RF.pop();
    }, {
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/gem_manager": "gem_manager",
        "../manager/help_manager": "help_manager",
        "../manager/resource_manager": "resource_manager",
        "../network/gem_network": "gem_network"
    } ],
    bag_tip_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "97f4exUIGZPm4ZI44BOgGvn", "bag_tip_manager"), cc._RF.pop();
    }, {} ],
    bag_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "20142TrzR1EA5KJeD6aVGQI", "bag_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/dynamic_data_manager"), i = e("../manager/pool_manager"), r = e("./item/bag_item"), o = e("../manager/help_manager"), s = e("../audio_manager"), l = e("../manager/resource_manager"), c = e("./menu_ui_manager"), u = e("../manager/data_manager"), d = e("../manager/ui_manager"), p = cc._decorator, m = p.ccclass, f = p.property, g = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.bagUINode = null, t.maskNode = null, t.bagContentViewNode = null, t.labelBagCount = null, 
                t.btnSellWhite = null, t.btnSellBlue = null, t.btnSellGold = null, t.spriteEquipBag = null, 
                t.spriteGemBag = null, t.isShowEquip = !0, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideBagUI, this), this.btnSellWhite.node.on("click", this.sellWhite, this), 
                this.btnSellBlue.node.on("click", this.sellBlue, this), this.btnSellGold.node.on("click", this.sellGold, this), 
                this.spriteEquipBag.node.on("click", this.equipBag, this), this.spriteGemBag.node.on("click", this.gemBag, this), 
                this.bagUINode.active && (this.bagUINode.active = !1);
            }, t.prototype.showUI = function() {
                s.default.instance.PlayUISelect(), this.bagUINode.active = !0, this.refreshBagUI();
            }, t.prototype.refreshBagUI = function() {
                for (var e = this.bagContentViewNode.children, t = e.length - 1; t >= 0; t--) i.default.instance.RemoveBagItem(e[t]);
                if (this.isShowEquip) {
                    var a = 0;
                    if (null != n.default.instance.BagItemDataMap) {
                        for (var o in n.default.instance.BagItemDataMap) {
                            i.default.instance.CreateBagItem(this.bagContentViewNode).getComponent(r.default).reinit(n.default.instance.BagItemDataMap[o]);
                        }
                        a = n.default.instance.bagGridCount;
                    }
                    this.labelBagCount.string = "( " + a.toString() + " / " + n.default.instance.playerBagCount.toString() + " )";
                } else {
                    if (null != n.default.instance.GemItemDataMap) for (var s in n.default.instance.GemItemDataMap) {
                        if (n.default.instance.GemItemDataMap[s] > 0 && u.default.instance.monsterGemData[s]) i.default.instance.CreateBagItem(this.bagContentViewNode).getComponent(r.default).initGem(Number(s), n.default.instance.GemItemDataMap[s]);
                    }
                    this.labelBagCount.string = "";
                }
                c.default.instance.checkBagAlert();
            }, t.prototype.hideBagUI = function() {
                this.bagUINode.active = !1;
            }, t.prototype.sellWhite = function() {
                var e = "";
                e = o.default.instance.GetQualityEquipIsHaveGems(0) ? "一键出售白色装备中包含镶嵌魔晶，出售将自动脱落到背包" : "是否确定一键售出所有白色装备？", 
                d.default.instance.LoadMessageBox("一键售出", e, this.sellWhiteReturn);
            }, t.prototype.sellBlue = function() {
                var e = "";
                e = o.default.instance.GetQualityEquipIsHaveGems(1) ? "一键出售蓝色装备中包含镶嵌魔晶，出售将自动脱落到背包" : "是否确定一键售出所有蓝色装备？", 
                d.default.instance.LoadMessageBox("一键售出", e, this.sellBlueReturn);
            }, t.prototype.sellGold = function() {
                var e = "";
                e = o.default.instance.GetQualityEquipIsHaveGems(2) ? "一键出售金色装备中包含镶嵌魔晶，出售将自动脱落到背包" : "是否确定一键售出所有金色装备？", 
                d.default.instance.LoadMessageBox("一键售出", e, this.sellGoldReturn);
            }, t.prototype.sellWhiteReturn = function(e) {
                e && (o.default.instance.sellAllEquipByQuality(0), a.instance.refreshBagUI());
            }, t.prototype.sellBlueReturn = function(e) {
                e && (o.default.instance.sellAllEquipByQuality(1), a.instance.refreshBagUI());
            }, t.prototype.sellGoldReturn = function(e) {
                e && (o.default.instance.sellAllEquipByQuality(2), a.instance.refreshBagUI());
            }, t.prototype.equipBag = function() {
                this.isShowEquip || (this.isShowEquip = !0, this.spriteEquipBag.spriteFrame = l.default.instance.getCommonSprite("jszb_13"), 
                this.spriteGemBag.spriteFrame = l.default.instance.getCommonSprite("jszb_14"), this.refreshBagUI());
            }, t.prototype.gemBag = function() {
                this.isShowEquip && (this.isShowEquip = !1, this.spriteEquipBag.spriteFrame = l.default.instance.getCommonSprite("jszb_14"), 
                this.spriteGemBag.spriteFrame = l.default.instance.getCommonSprite("jszb_13"), this.refreshBagUI());
            }, t.instance = null, __decorate([ f(cc.Node) ], t.prototype, "bagUINode", void 0), 
            __decorate([ f(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ f(cc.Node) ], t.prototype, "bagContentViewNode", void 0), 
            __decorate([ f(cc.Label) ], t.prototype, "labelBagCount", void 0), __decorate([ f(cc.Button) ], t.prototype, "btnSellWhite", void 0), 
            __decorate([ f(cc.Button) ], t.prototype, "btnSellBlue", void 0), __decorate([ f(cc.Button) ], t.prototype, "btnSellGold", void 0), 
            __decorate([ f(cc.Sprite) ], t.prototype, "spriteEquipBag", void 0), __decorate([ f(cc.Sprite) ], t.prototype, "spriteGemBag", void 0), 
            t = a = __decorate([ m ], t);
        }(cc.Component);
        a.default = g, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../manager/data_manager": "data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/help_manager": "help_manager",
        "../manager/pool_manager": "pool_manager",
        "../manager/resource_manager": "resource_manager",
        "../manager/ui_manager": "ui_manager",
        "./item/bag_item": "bag_item",
        "./menu_ui_manager": "menu_ui_manager"
    } ],
    battle_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "00140DxzalEQa1ZG9/NzNjO", "battle_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../role/hero"), i = e("../role/monster"), r = e("../math/damage"), o = e("../manager/pool_manager"), s = e("../math/rand"), l = e("../manager/data_manager"), c = e("../ui/battle_ui_manager"), u = e("../manager/dynamic_data_manager"), d = e("../manager/lost_manager"), p = e("../ui/bag_ui_manager"), m = e("../manager/sprite_manager"), f = e("../manager/skill_manager"), g = e("../manager/random_event_manager"), h = e("../manager/resource_manager"), _ = e("../common/allenum"), y = e("../manager/reward_manager"), v = e("../manager/reward_effect_manager"), b = e("../ui/bg_ui_manager"), D = e("../manager/dungeon_data_manager"), I = e("../ui/messagebox_ui_manager"), P = e("../audio_manager"), B = e("../network/player_network"), S = e("../manager/game_manager"), R = e("../manager/effect_manager"), k = e("../manager/ui_manager"), A = cc._decorator, M = A.ccclass, N = A.property, w = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.mainPlayer = null, t.mainMoster = null, t.effectNode = null, t.enemyDamageNode = null, 
                t.monsterNode = null, t._curLevel = 1, t.curBeatCount = 0, t.targetLevelBeatCount = 1, 
                t.targetLevelID = 0, t.lastCreateMonsterTime = 0, t.createMonsterInterval = 1, t.blackMartketRefreshTime = 300, 
                t.curBlackMartketRefreshTime = 0, t.isCreatingMonster = !1, t.playerDeadCount = 30, 
                t.sprite1 = null, t.sprite2 = null, t.sprite3 = null, t.sprite4 = null, t.sprite5 = null, 
                t._battleStatus = _.BattleStatus.BattleShow, t._playerStatus = _.PlayerStatus.Normal, 
                t;
            }
            var a;
            return __extends(t, e), a = t, Object.defineProperty(t.prototype, "curLevel", {
                get: function() {
                    return u.default.instance.curLevel;
                },
                set: function(e) {
                    u.default.instance.curLevel = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.onLoad = function() {
                a.instance = this, this.curBeatCount = 0;
            }, t.prototype.start = function() {}, t.prototype.InitGameShow = function() {
                u.default.instance.setMainPlayerEntity(this.mainPlayer), this.mainPlayer.initNewPlayerBaseAttr(), 
                this.getNewMainMonster();
            }, t.prototype.setNormalBattle = function() {
                this._battleStatus = _.BattleStatus.NormalBattling, 1 == u.default.instance.curDiff ? this.curLevel < u.default.instance.playerMaxLV && (this._battleStatus = _.BattleStatus.NormalIdle) : 2 == u.default.instance.curDiff ? this.curLevel < u.default.instance.playerMaxDiffLV && (this._battleStatus = _.BattleStatus.NormalIdle) : 3 == u.default.instance.curDiff && this.curLevel < u.default.instance.playerMaxHellLV && (this._battleStatus = _.BattleStatus.NormalIdle), 
                this.Init();
            }, t.prototype.Init = function() {
                this.updateSpriteShow(), this.changeBattleBg(), this.updateBatlleUIShow();
            }, t.prototype.getBlackMarketRefreshTime = function() {
                return this.blackMartketRefreshTime - this.curBlackMartketRefreshTime;
            }, t.prototype.hasMonster = function() {
                return null != this.mainMoster;
            }, t.prototype.PlayerUserSkill = function(e) {
                if (!this.mainPlayer.canAction()) return !1;
                var t = l.default.instance.skillData[e];
                if (t) {
                    var a = f.default.instance.getSkillInfoByBaseID(e);
                    if (a && this.mainPlayer.mp < a.getNeedMp()) return;
                    if (1 == t.type) if (a) {
                        this.mainPlayer.heroCostMp(a.getNeedMp());
                        var n = this.mainPlayer.buffData.addSkillBuff(this.mainPlayer, e, a.lv);
                        c.default.instance.addBuffShow(n);
                    } else {
                        n = this.mainPlayer.buffData.addSkillBuff(this.mainPlayer, e, 1);
                        c.default.instance.addBuffShow(n);
                    } else if (2 == t.type) {
                        if (null == this.mainMoster) return !1;
                        this.mainPlayer.heroCostMp(t.cost_mp), this.mainMoster.buffData.addSkillBuff(this.mainMoster, e, a.lv);
                    } else if (3 == t.type) {
                        if (null == this.mainMoster) return !1;
                        this.mainPlayer.heroCostMp(t.cost_mp), this.PlayerAttack(a);
                    }
                }
                return this.mainPlayer.say(t.name), !0;
            }, t.prototype.BattleShow_PlayerAttack = function() {
                if (!r.default.beingHit(this.mainPlayer, this.mainMoster)) return R.default.instance.PlayMissEffect(this.enemyDamageNode), 
                !0;
                if (r.default.isBlock(this.mainPlayer, this.mainMoster)) return R.default.instance.PlayBlockEffect(this.enemyDamageNode), 
                !0;
                var e = !1;
                s.default.getZeroToOne() < this.mainPlayer.criticalRate && (e = !0);
                var t = r.default.finalDamage(this.mainPlayer, this.mainMoster, e), a = "enemy_damage_effect";
                return e && (a = "enemy_doubledamage_effect"), R.default.instance.PlayDamageEffect(this.enemyDamageNode, t.total, t.light, t.blaze, t.fronzen, t.posion, a), 
                this.mainMoster.BeingAttack(t.total), this.mainMoster.isDead() && (this.mainMoster = null), 
                !0;
            }, t.prototype.PlayerAttack = function(e) {
                if (void 0 === e && (e = null), null == this.mainMoster) return !1;
                if (this._battleStatus == _.BattleStatus.BattleShow) return this.BattleShow_PlayerAttack();
                if (this.mainPlayer.buffData.getBuffValue("绝对命中") < .9 && !r.default.beingHit(this.mainPlayer, this.mainMoster, e)) return R.default.instance.PlayMissEffect(this.enemyDamageNode), 
                !0;
                if (r.default.isBlock(this.mainPlayer, this.mainMoster)) return R.default.instance.PlayBlockEffect(this.enemyDamageNode), 
                !0;
                var t = !1;
                s.default.getZeroToOne() < this.mainPlayer.criticalRate && (t = !0);
                var a = r.default.finalDamage(this.mainPlayer, this.mainMoster, t, e), n = "enemy_damage_effect";
                if (t && (n = "enemy_doubledamage_effect"), R.default.instance.PlayDamageEffect(this.enemyDamageNode, a.total, a.light, a.blaze, a.fronzen, a.posion, n), 
                this.mainMoster.BeingAttack(a.total), this.checkAttAddDaimond(), this.mainPlayer.BeingAttMonster(a.total), 
                this.mainMoster.isDead()) {
                    var i = this.mainMoster.baseID;
                    P.default.instance.PlayFly(), this.getLost(), this.mainMoster = null, this.mainPlayer.BeingKilledMonster(), 
                    this._battleStatus == _.BattleStatus.TargetLevelBattling ? B.default.instance.PlayerKillMonsterRequest(i, this.targetLevelID, u.default.instance.curDiff, this.targetLevelBeatCount) : B.default.instance.PlayerKillMonsterRequest(i, this.curLevel, u.default.instance.curDiff, this.curBeatCount), 
                    this.addLevelBeatCount(), B.default.instance.UpdatePlayerBaseData(!0);
                }
                return !0;
            }, t.prototype.checkAttAddDaimond = function() {
                this.mainPlayer.attAddDaimond > 0 && (this.mainPlayer.miss_DamaionNum.string = u.default.instance.changeMissleadingDaimon(this.mainPlayer.attAddDaimond), 
                this.setMissLeadingActive("钻石", !0), this.mainPlayer.addBuffValue(), v.default.instance.createDaimondEffect(1, "假钻石", this.mainMoster.node.parent.convertToWorldSpaceAR(this.mainMoster.node.position))), 
                this.mainPlayer.attAddGlod > 0 && (this.mainPlayer.miss_GoldNum.string = u.default.instance.changeMissleadingGold(this.mainPlayer.attAddGlod), 
                this.setMissLeadingActive("金币", !0), this.mainPlayer.addBuffValue(), v.default.instance.createDaimondEffect(2, "假金币", this.mainMoster.node.parent.convertToWorldSpaceAR(this.mainMoster.node.position)));
            }, t.prototype.getMissleadingPos = function(e) {
                return "金币" == e ? this.mainPlayer.node.parent.convertToWorldSpaceAR(this.mainPlayer.missLeadingGold.position) : "钻石" == e ? this.mainPlayer.node.parent.convertToWorldSpaceAR(this.mainPlayer.missLeadingdamaion.position) : void 0;
            }, t.prototype.setRewardEndEffect = function(e) {
                "金币" == e && v.default.instance.createDaimondEffect(20, "金币", this.mainPlayer.node.parent.convertToWorldSpaceAR(this.mainPlayer.missLeadingGold.position)), 
                "钻石" == e && v.default.instance.createDaimondEffect(20, "钻石", this.mainPlayer.node.parent.convertToWorldSpaceAR(this.mainPlayer.missLeadingdamaion.position));
            }, t.prototype.setMissLeadingActive = function(e, t) {
                "金币" == e && this.mainPlayer.missLeadingGold.active == !t && (this.mainPlayer.missLeadingGold.active = t, 
                this.mainPlayer.miss_GoldNum.node.active = t), "钻石" == e && this.mainPlayer.missLeadingdamaion.active == !t && (this.mainPlayer.missLeadingdamaion.active = t, 
                this.mainPlayer.miss_DamaionNum.node.active = t);
            }, t.prototype.getGoldByServer = function(e, t) {
                e == _.MoneyType.Coin ? v.default.instance.createDaimondEffect(2, "金币", this.effectNode.parent.convertToWorldSpaceAR(this.effectNode.position)) : e == _.MoneyType.Daimod && v.default.instance.createDaimondEffect(3, "钻石", this.effectNode.parent.convertToWorldSpaceAR(this.effectNode.position));
            }, t.prototype.getLost = function() {
                var e = 0, t = this.curLevel;
                this._battleStatus == _.BattleStatus.TargetLevelBattling && (t = this.targetLevelID), 
                this.checkIsBoss() ? 1 == u.default.instance.curDiff ? e = l.default.instance.levelData[t].boss_lost_id : 2 == u.default.instance.curDiff ? e = l.default.instance.levelData[t].diffboss_lost_id : 3 == u.default.instance.curDiff && (e = l.default.instance.levelData[t].diffboss_lost_id) : 1 == u.default.instance.curDiff ? e = l.default.instance.levelData[t].monster_lost_id : 2 == u.default.instance.curDiff ? e = l.default.instance.levelData[t].diff_lost_id : 3 == u.default.instance.curDiff && (e = l.default.instance.levelData[t].hell_lost_id);
                var a = D.default.instance.getBetterEquipAdd(t, u.default.instance.curDiff), n = this.mainPlayer.buffData.getBuffValue("掉落概率"), i = d.default.instance.getLostByID(e, this.mainPlayer.addGetBetterEquip + 1 + a, n);
                if (i) if (u.default.instance.isBagFull()) k.default.instance.LoadTipsByID("bag_count_limit"); else {
                    u.default.instance.AddBagItem(i), p.default.instance && p.default.instance.refreshBagUI();
                    var r = l.default.instance.equipmentData[i.baseId].icon_path;
                    v.default.instance.createDaimondEffect(1, "装备", this.mainMoster.node.parent.convertToWorldSpaceAR(this.mainMoster.node.position), r), 
                    k.default.instance.LoadTipsByStr("获得:" + l.default.instance.equipmentData[i.baseId].name);
                }
            }, t.prototype.GetGemByServer = function(e) {
                u.default.instance.AddGemItem(e);
                var t = l.default.instance.monsterGemData[e].icon_path;
                v.default.instance.createDaimondEffect(1, "魔晶", this.effectNode.parent.convertToWorldSpaceAR(this.effectNode.position), t);
            }, t.prototype.checkIsBoss = function() {
                return this._battleStatus == _.BattleStatus.TargetLevelBattling ? D.default.instance.checkIsBoss(this.targetLevelID, this.targetLevelBeatCount, this._battleStatus) : D.default.instance.checkIsBoss(this.curLevel, this.curBeatCount, this._battleStatus);
            }, t.prototype.BattleShow_MonsterAttack = function() {
                if (!r.default.beingHit(this.mainMoster, this.mainPlayer)) return R.default.instance.PlayMissEffect(this.mainPlayer.node), 
                !0;
                if (r.default.isBlock(this.mainPlayer, this.mainMoster)) return R.default.instance.PlayBlockEffect(this.mainPlayer.node), 
                !0;
                var e = !1;
                s.default.getZeroToOne() < this.mainMoster.criticalRate && (e = !0);
                var t = r.default.finalDamage(this.mainMoster, this.mainPlayer, e);
                R.default.instance.PlayDamageEffect(this.mainPlayer.node, t.total, t.light, t.blaze, t.fronzen, t.posion, "player_being_damage_effect");
            }, t.prototype.MonsterAttack = function() {
                if (null != this.mainMoster) if (this._battleStatus != _.BattleStatus.BattleShow) {
                    if (!r.default.beingHit(this.mainMoster, this.mainPlayer)) return R.default.instance.PlayMissEffect(this.mainPlayer.node), 
                    !0;
                    if (r.default.isBlock(this.mainMoster, this.mainPlayer)) return R.default.instance.PlayBlockEffect(this.mainPlayer.node), 
                    !0;
                    var e = !1;
                    s.default.getZeroToOne() < this.mainMoster.criticalRate && (e = !0);
                    var t = r.default.finalDamage(this.mainMoster, this.mainPlayer, e);
                    this.mainPlayer.BeingAttack(t.total), this.mainMoster.AttackOther(t.total), R.default.instance.PlayDamageEffect(this.mainPlayer.node, t.total, t.light, t.blaze, t.fronzen, t.posion, "player_being_damage_effect"), 
                    this.mainPlayer.isDead() && (this.mainPlayer.playDead(), this.killCurMonster(), 
                    this.playerDeadCount = 30, this.playerDeadProcess());
                } else this.BattleShow_MonsterAttack(); else console.error("this.mainMoster == null");
            }, t.prototype.playerDeadProcess = function() {
                this.mainPlayer.isDead() && a.instance._playerStatus != _.PlayerStatus.Reborning && (this.playerDeadCount -= 1, 
                this.playerDeadCount > 0 ? (k.default.instance.LoadMessageBox("你已经死亡", this.playerDeadCount + "秒后自动重生，重生后倒退10层。若是特殊副本则离开副本。点击确认立即重生。", this.playerDeadCallBack), 
                this.scheduleOnce(function() {
                    this.playerDeadProcess();
                }, 1)) : (I.default.instance.hideUI(), a.instance._playerStatus = _.PlayerStatus.Reborning, 
                a.instance.scheduleOnce(function() {
                    a.instance.rebornPlayer();
                }, 5)));
            }, t.prototype.playerDeadCallBack = function(e) {
                e && (a.instance._playerStatus = _.PlayerStatus.Reborning, a.instance.scheduleOnce(function() {
                    a.instance.rebornPlayer();
                }, 5));
            }, t.prototype.rebornPlayer = function() {
                this.mainPlayer.isDead() && (a.instance._playerStatus = _.PlayerStatus.Normal, this.mainPlayer.fullfill(), 
                this._battleStatus == _.BattleStatus.TargetLevelBattling ? this.exitTargetLevelStatus() : (this.curBeatCount -= 10, 
                this.curBeatCount < 0 && (this.curBeatCount = 0), this.isChallengeLevel(u.default.instance.curDiff, this.curLevel) ? this._battleStatus = _.BattleStatus.NormalBattling : this._battleStatus = _.BattleStatus.NormalIdle), 
                this.updateBatlleUIShow());
            }, t.prototype.updateBatlleUIShow = function() {
                if (c.default.instance.updatePlayerInfoUI(), this._battleStatus == _.BattleStatus.NormalBattling || this._battleStatus == _.BattleStatus.NormalIdle) {
                    var e = D.default.instance.getBossBattleCount(this.curLevel);
                    c.default.instance.updateLevelInfo(this.curLevel, this.curBeatCount, e, this._battleStatus);
                } else {
                    e = D.default.instance.getBossBattleCount(this.targetLevelID);
                    c.default.instance.updateLevelInfo(this.targetLevelID, this.targetLevelBeatCount, e, this._battleStatus);
                }
            }, t.prototype.getExp = function() {
                var e = 0;
                return e = this._battleStatus == _.BattleStatus.TargetLevelBattling ? D.default.instance.getLevelExpAdd(this.targetLevelID, u.default.instance.curDiff) : D.default.instance.getLevelExpAdd(this.curLevel, u.default.instance.curDiff), 
                Math.floor(this.mainMoster.maxhp / 10 * (1 + this.mainPlayer.getAddExpRate + e));
            }, t.prototype.getCurDungeonOffieceExpAnHour = function() {
                var e = 0;
                e = this._battleStatus == _.BattleStatus.TargetLevelBattling ? D.default.instance.getLevelExpAdd(this.targetLevelID, u.default.instance.curDiff) : D.default.instance.getLevelExpAdd(this.curLevel, u.default.instance.curDiff);
                var t = D.default.instance.getFirstMonsterHP(this.curLevel, u.default.instance.curDiff);
                return 3600 * Math.floor(t / 10 * (1 + .3 * (this.mainPlayer.getAddExpRateNoBuff + e) + this.mainPlayer.offlineAdd)) / D.default.instance.getOfflineCdByDiff(this.curLevel, u.default.instance.curDiff);
            }, t.prototype.getCurDungeonOffieceGoldAnHour = function() {
                var e = D.default.instance.getFirstMonsterLV(this.curLevel, u.default.instance.curDiff);
                return 3600 * Math.floor(e * (1 + .3 * (this.mainPlayer.addGetCoinNoBuff + D.default.instance.getLevelMoneyAdd(this.curLevel, u.default.instance.curDiff)) + this.mainPlayer.offlineAdd)) / D.default.instance.getOfflineCdByDiff(this.curLevel, u.default.instance.curDiff);
            }, t.prototype.getCurLevelMonster = function() {
                return this._battleStatus == _.BattleStatus.TargetLevelBattling ? D.default.instance.getMonsterID(this.targetLevelID, this.targetLevelBeatCount, this._battleStatus) : D.default.instance.getMonsterID(this.curLevel, this.curBeatCount, this._battleStatus);
            }, t.prototype.getBattleLevel = function() {
                return this._battleStatus == _.BattleStatus.TargetLevelBattling ? this.targetLevelID : this.curLevel;
            }, t.prototype.getNewMainMonster = function() {
                var e = this.getCurLevelMonster(), t = this.checkIsBoss(), a = o.default.instance.CreateMonster(this.monsterNode);
                this.mainMoster = a.getComponent(i.default);
                var n = !1;
                if (this._battleStatus == _.BattleStatus.TargetLevelBattling && D.default.instance.getNeedGenerateMonster(this.targetLevelID) && (n = !0), 
                n) this.mainMoster.initMonsterDataByEntity(this.mainPlayer, e); else {
                    var r = 1;
                    this.mainPlayer.buffData.getBuffValue("受击增伤") < -.1 && (r = .5), this.mainMoster.initMonsterData(e, t, r);
                }
                if (this._battleStatus != _.BattleStatus.TargetLevelBattling) {
                    var s = l.default.instance.levelData[this.curLevel];
                    2 == u.default.instance.curDiff ? (this.mainMoster.setDiffChange(s.diff_fix_value), 
                    t ? this.mainMoster.setDiffAttr(s.diff_boss_fix_attr) : this.mainMoster.setDiffAttr(s.diff_fix_attr)) : 3 == u.default.instance.curDiff && (this.mainMoster.setDiffChange(s.hell_fix_value), 
                    t ? this.mainMoster.setDiffAttr(s.hell_boss_fix_attr) : this.mainMoster.setDiffAttr(s.hell_fix_attr));
                }
                this.mainPlayer.monsterSlow > 0 && (this.mainMoster.attInterval = this.mainMoster.attInterval * this.mainPlayer.monsterSlow), 
                t && (this.mainMoster.LabelBossTag.node.active = !0, R.default.instance.PlayBossWarmEffect()), 
                this.isCreatingMonster = !1;
            }, t.prototype.isChallengeLevel = function(e, t) {
                return 1 == e && t == u.default.instance.playerMaxLV || (2 == e && t == u.default.instance.playerMaxDiffLV || (3 == e && t == u.default.instance.playerMaxHellLV || void 0));
            }, t.prototype.addLevelBeatCount = function() {
                if (this._battleStatus == _.BattleStatus.NormalBattling || this._battleStatus == _.BattleStatus.NormalIdle || this._battleStatus == _.BattleStatus.BattleShow) this.checkIsBoss() ? (this.curBeatCount++, 
                this.isChallengeLevel(u.default.instance.curDiff, this.curLevel) && D.default.instance.hasNextNormalLevel(this.curLevel) ? (this.curLevel++, 
                this.curBeatCount = 0, 1 == u.default.instance.curDiff ? u.default.instance.playerMaxLV = this.curLevel : 2 == u.default.instance.curDiff ? u.default.instance.playerMaxDiffLV = this.curLevel : 3 == u.default.instance.curDiff && (u.default.instance.playerMaxHellLV = this.curLevel), 
                this.changeBattleBg()) : this._battleStatus = _.BattleStatus.NormalIdle) : (this.curBeatCount++, 
                D.default.instance.isOverBoss(this.curLevel, this.curBeatCount) && (this._battleStatus = _.BattleStatus.NormalIdle)); else {
                    this.targetLevelBeatCount++;
                    var e = D.default.instance.getBossBattleCount(this.targetLevelID);
                    this.targetLevelBeatCount > e && (B.default.instance.PlayerOverComeDungeonRequest(this.targetLevelID), 
                    this.exitTargetLevelStatus());
                }
                this.updateBatlleUIShow();
            }, t.prototype.exitTargetLevelStatus = function() {
                this.isChallengeLevel(u.default.instance.curDiff, this.curLevel) ? this._battleStatus = _.BattleStatus.NormalBattling : this._battleStatus = _.BattleStatus.NormalIdle, 
                this.changeBattleBg();
            }, t.prototype.playerSelectLevel = function(e, t) {
                return this.killCurMonster(), 1 == e && t <= u.default.instance.playerMaxLV ? (this.curLevel = t, 
                this.curBeatCount = 0, t < u.default.instance.playerMaxLV ? this._battleStatus = _.BattleStatus.NormalIdle : this._battleStatus = _.BattleStatus.NormalBattling, 
                u.default.instance.curDiff = e, this.updateBatlleUIShow(), !0) : 2 == e && t <= u.default.instance.playerMaxDiffLV ? (this.curLevel = t, 
                this.curBeatCount = 0, t < u.default.instance.playerMaxDiffLV ? this._battleStatus = _.BattleStatus.NormalIdle : this._battleStatus = _.BattleStatus.NormalBattling, 
                u.default.instance.curDiff = e, this.updateBatlleUIShow(), !0) : 3 == e && t <= u.default.instance.playerMaxHellLV ? (this.curLevel = t, 
                this.curBeatCount = 0, t < u.default.instance.playerMaxHellLV ? this._battleStatus = _.BattleStatus.NormalIdle : this._battleStatus = _.BattleStatus.NormalBattling, 
                u.default.instance.curDiff = e, this.updateBatlleUIShow(), !0) : (k.default.instance.LoadTipsByStr("此关卡尚未解锁"), 
                !1);
            }, t.prototype.killCurMonster = function() {
                null != this.mainMoster && (this.mainMoster.KillThis(), this.mainMoster = null);
            }, t.prototype.update = function(e) {
                h.default.instance.Inited && (this._battleStatus == _.BattleStatus.BattleShow ? this.processBattleShowStatus(e) : (S.default.instance.gameStatus == _.GameStatus.GamePlaying && null == this.mainMoster && (null == this.mainPlayer || this.mainPlayer.isDead() || (this.mainPlayer.lastCreateMonsterTime = this.mainPlayer.lastCreateMonsterTime + e, 
                this.mainPlayer.lastCreateMonsterTime > this.mainPlayer.createMonsterInterval && (this.mainPlayer.lastCreateMonsterTime = 0, 
                0 == this.isCreatingMonster && (this.isCreatingMonster = !0, this.getNewMainMonster())))), 
                f.default.instance.updateUsingSkill(e), g.default.instance.updateEvent(e), y.default.instance.update(e)));
            }, t.prototype.changeToTargetLevel = function(e) {
                this.killCurMonster(), this._battleStatus = _.BattleStatus.TargetLevelBattling, 
                this.targetLevelBeatCount = 1, this.targetLevelID = e, this.changeBattleBg(), this.updateBatlleUIShow();
            }, t.prototype.changeBattleBg = function() {
                if (this._battleStatus == _.BattleStatus.TargetLevelBattling) {
                    var e = l.default.instance.levelData[this.targetLevelID].bg_name;
                    b.default.instance.changeBgByName(e);
                    var t = l.default.instance.levelData[this.targetLevelID].name;
                    c.default.instance.showLevelName(t);
                } else {
                    e = l.default.instance.levelData[this.curLevel].bg_name;
                    b.default.instance.changeBgByName(e);
                    t = l.default.instance.levelData[this.curLevel].name;
                    c.default.instance.showLevelName(t);
                }
            }, t.prototype.processBattleShowStatus = function(e) {
                null == this.mainMoster && null != this.mainPlayer && (this.mainPlayer.lastCreateMonsterTime = this.mainPlayer.lastCreateMonsterTime + e, 
                this.mainPlayer.lastCreateMonsterTime > this.mainPlayer.createMonsterInterval && (this.mainPlayer.lastCreateMonsterTime = 0, 
                0 == this.isCreatingMonster && (this.isCreatingMonster = !0, this.getNewMainMonster())));
            }, t.prototype.updateSpriteShow = function() {
                c.default.instance.updatePlayerInfoUI(), this.sprite1.node.active = !1, this.sprite2.node.active = !1, 
                this.sprite3.node.active = !1, this.sprite4.node.active = !1, this.sprite5.node.active = !1;
                var e = m.default.instance.spritesMap, t = 0;
                for (var a in e) if (e[a].isBattling()) {
                    var n = l.default.instance.spriteData[e[a].baseID];
                    0 == t ? (this.sprite1.node.active = !0, this.sprite1.spriteFrame = h.default.instance.getSpriteSprite(n.icon_path)) : 1 == t ? (this.sprite2.node.active = !0, 
                    this.sprite2.spriteFrame = h.default.instance.getSpriteSprite(n.icon_path)) : 2 == t ? (this.sprite3.node.active = !0, 
                    this.sprite3.spriteFrame = h.default.instance.getSpriteSprite(n.icon_path)) : 3 == t ? (this.sprite4.node.active = !0, 
                    this.sprite4.spriteFrame = h.default.instance.getSpriteSprite(n.icon_path)) : 4 == t && (this.sprite5.node.active = !0, 
                    this.sprite5.spriteFrame = h.default.instance.getSpriteSprite(n.icon_path)), t++;
                }
            }, t.instance = null, __decorate([ N(n.default) ], t.prototype, "mainPlayer", void 0), 
            __decorate([ N(i.default) ], t.prototype, "mainMoster", void 0), __decorate([ N(cc.Node) ], t.prototype, "effectNode", void 0), 
            __decorate([ N(cc.Node) ], t.prototype, "enemyDamageNode", void 0), __decorate([ N(cc.Node) ], t.prototype, "monsterNode", void 0), 
            __decorate([ N(cc.Sprite) ], t.prototype, "sprite1", void 0), __decorate([ N(cc.Sprite) ], t.prototype, "sprite2", void 0), 
            __decorate([ N(cc.Sprite) ], t.prototype, "sprite3", void 0), __decorate([ N(cc.Sprite) ], t.prototype, "sprite4", void 0), 
            __decorate([ N(cc.Sprite) ], t.prototype, "sprite5", void 0), t = a = __decorate([ M ], t);
        }(cc.Component);
        a.default = w, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../common/allenum": "allenum",
        "../manager/data_manager": "data_manager",
        "../manager/dungeon_data_manager": "dungeon_data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/effect_manager": "effect_manager",
        "../manager/game_manager": "game_manager",
        "../manager/lost_manager": "lost_manager",
        "../manager/pool_manager": "pool_manager",
        "../manager/random_event_manager": "random_event_manager",
        "../manager/resource_manager": "resource_manager",
        "../manager/reward_effect_manager": "reward_effect_manager",
        "../manager/reward_manager": "reward_manager",
        "../manager/skill_manager": "skill_manager",
        "../manager/sprite_manager": "sprite_manager",
        "../manager/ui_manager": "ui_manager",
        "../math/damage": "damage",
        "../math/rand": "rand",
        "../network/player_network": "player_network",
        "../role/hero": "hero",
        "../role/monster": "monster",
        "../ui/bag_ui_manager": "bag_ui_manager",
        "../ui/battle_ui_manager": "battle_ui_manager",
        "../ui/bg_ui_manager": "bg_ui_manager",
        "../ui/messagebox_ui_manager": "messagebox_ui_manager"
    } ],
    battle_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "2ea58N0WjJKaYX5cSORdWRd", "battle_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/data_manager"), i = e("../battle/battle_manager"), r = e("../manager/playerbuff_manager"), o = e("./random_event_ui_manager"), s = e("../manager/pool_manager"), l = e("./item/buff_item"), c = e("../common/allenum"), u = e("../manager/dungeon_data_manager"), d = e("../audio_manager"), p = e("../network/player_network"), m = e("../manager/dynamic_data_manager"), f = e("../common/emmiter"), g = e("../manager/achievenment_manager"), h = e("../util"), _ = e("../manager/ui_manager"), y = cc._decorator, v = y.ccclass, b = y.property, D = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.barExp = null, t.barHP = null, t.barMP = null, t.labelHPProcess = null, 
                t.labelMPProcess = null, t.labelPlayerLv = null, t.labelLevelName = null, t.labelLevelExp = null, 
                t.labelLevelCoin = null, t.labelPlayerName = null, t.btnCloseEvent = null, t.btnOpenEvent = null, 
                t.btnSign = null, t.nodeSignRed = null, t.btnAchievement = null, t.barAchievementStatus = null, 
                t.labelAchievementStatus = null, t.labelAchievementTitle = null, t.nodeAchievementRed = null, 
                t.barLevelStatus = null, t.nodeSmallMan = null, t.buffNode = null, t.btnChatNode = null, 
                t.labelCurChatText = null, t.labelLevelNum = null, t.labelLevelProcess = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.btnCloseEvent.node.on("click", this.closeEvent, this), this.btnOpenEvent.node.on("click", this.openEvent, this), 
                this.btnSign.node.on("click", this.openSign, this), this.btnAchievement.node.on("click", this.openAchievement, this), 
                this.btnChatNode.node.on("click", this.openChatUI, this);
                f.Emitter.register(c.AlertType.SignAlert.toString(), this.updateSignAlert, this);
            }, t.prototype.closeEvent = function() {
                o.default.instance.hideEvents(), this.battleInfoUp();
            }, t.prototype.openEvent = function() {
                o.default.instance.showEvents(), this.battleInfoDown();
            }, t.prototype.updateLvExp = function(e, t) {
                var a = n.default.instance.expData[e].exp;
                null != a ? (this.labelPlayerLv.string = "LV " + e.toString(), this.barExp.progress = t / a) : console.error("no this lv:%d", e), 
                m.default.instance.getMainPlayerLVParam() <= 50 ? this.btnChatNode.node.active = !1 : 0 == this.btnChatNode.node.active && (this.btnChatNode.node.active = !0);
            }, t.prototype.updateLevelInfo = function(e, t, a, n) {
                if (void 0 === n && (n = c.BattleStatus.NormalBattling), n == c.BattleStatus.NormalBattling || n == c.BattleStatus.NormalIdle) {
                    var i = "普通 ";
                    2 == m.default.instance.curDiff ? i = "噩梦 " : 3 == m.default.instance.curDiff && (i = "地狱 "), 
                    this.labelLevelNum.string = i + e.toString() + ":" + u.default.instance.getDungeonName(e);
                } else this.labelLevelNum.string = u.default.instance.getDungeonName(e);
                t > a ? (this.labelLevelProcess.string = "挂机修炼中...", this.barLevelStatus.progress = t / a, 
                this.nodeSmallMan.position = new cc.Vec2(250)) : (this.labelLevelProcess.string = t.toString() + " / " + a.toString(), 
                this.barLevelStatus.progress = t / a, this.nodeSmallMan.position = new cc.Vec2(250 * t / a)), 
                this.showOfflineInfo();
            }, t.prototype.updateOfflineInfo = function() {
                // 无限转生
                function infinite() {
                    var e = i.default.instance.mainPlayer.lv, t = n.default.instance.globalValueData.new_left_lv_limit.params;
                    if (t <= e) {
                        console.log('自动转生');
                        p.default.instance.PlayerNewLifeRequest(e);
                    }
                }
                // infinite();
                // 无限转生
                this.labelLevelCoin.string = "金币: " + h.default.GetLargeNumStr(i.default.instance.getCurDungeonOffieceGoldAnHour()) + "/H", 
                this.labelLevelExp.string = "经验: " + h.default.GetLargeNumStr(i.default.instance.getCurDungeonOffieceExpAnHour()) + "/H";
            }, t.prototype.hideOffineInfo = function() {
                this.labelLevelCoin.node.active = !1, this.labelLevelExp.node.active = !1;
            }, t.prototype.showOfflineInfo = function() {
                this.isClosingEvent() ? i.default.instance._battleStatus == c.BattleStatus.TargetLevelBattling ? this.hideOffineInfo() : (this.labelLevelCoin.node.active = !0, 
                this.labelLevelExp.node.active = !0, this.updateOfflineInfo()) : this.hideOffineInfo();
            }, t.prototype.updatePlayerInfoUI = function() {
                this.updatePlayerHP(i.default.instance.mainPlayer.hp, i.default.instance.mainPlayer.maxhp), 
                this.updatePlayerMP(i.default.instance.mainPlayer.mp, i.default.instance.mainPlayer.maxmp);
            }, t.prototype.updatePlayerHP = function(e, t) {
                this.labelHPProcess.string = e.toString() + "/" + t.toString(), this.barHP.progress = e / t;
            }, t.prototype.updatePlayerMP = function(e, t) {
                this.labelMPProcess.string = e.toString() + "/" + t.toString(), this.barMP.progress = e / t;
            }, t.prototype.newlift = function() {
                var e = i.default.instance.mainPlayer.lv, t = n.default.instance.globalValueData.new_left_lv_limit.params;
                if (t <= e) {
                    var a = Math.floor(e * (1 + r.default.instance.getBuffValue("转生收益")));
                    _.default.instance.LoadMessageBox("转生", "回归1级，奖励钻石:" + a.toString() + "  需要等级大于：" + t, this.newliftCallBack);
                } else _.default.instance.LoadTipsByID("level_limit");
            }, t.prototype.newliftCallBack = function(e) {
                if (e) {
                    var t = i.default.instance.mainPlayer.lv;
                    p.default.instance.PlayerNewLifeRequest(t);
                }
            }, t.prototype.battleInfoUp = function() {
                d.default.instance.PlayUISelect(), this.getComponent(cc.Animation).play("battleinfo_up"), 
                this.btnCloseEvent.node.active = !1, this.btnOpenEvent.node.active = !0, this.btnSign.node.active = !0, 
                this.btnAchievement.node.active = !1, this.showOfflineInfo();
            }, t.prototype.isClosingEvent = function() {
                return this.btnOpenEvent.node.active;
            }, t.prototype.battleInfoDown = function() {
                d.default.instance.PlayUISelect(), this.getComponent(cc.Animation).play("battleinfo_down"), 
                this.btnCloseEvent.node.active = !0, this.btnOpenEvent.node.active = !1, this.btnSign.node.active = !1, 
                this.btnAchievement.node.active = !0, this.hideOffineInfo();
            }, t.prototype.addBuffShow = function(e) {
                s.default.instance.CreateObjectByName("BuffItem", this.buffNode).getComponent(l.default).Init(e);
            }, t.prototype.showLevelName = function(e) {
                this.labelLevelName.string = e, this.getComponent(cc.Animation).play("levelname_show");
            }, t.prototype.updatePlayerName = function() {
                var e = m.default.instance.roleName, t = g.default.instance.getUserTitle();
                "" == e && (e = "小小勇者"), "" != t && (e = t + " " + e), this.labelPlayerName.string = e;
            }, t.prototype.openSign = function() {
                _.default.instance.LoadSignUI();
            }, t.prototype.updateSignAlert = function() {
                m.default.instance.canSign ? this.nodeSignRed.active = !0 : this.nodeSignRed.active = !1;
            }, t.prototype.updateAchievementInfo = function(e, t, a) {
                this.labelAchievementTitle.string = e, this.labelAchievementStatus.string = t + "/" + a, 
                this.barAchievementStatus.progress = t / a, g.default.instance.hasCompeletedAchievement() ? this.nodeAchievementRed.active = !0 : this.nodeAchievementRed.active = !1;
            }, t.prototype.openAchievement = function() {
                _.default.instance.LoadAchievementUI();
            }, t.prototype.openChatUI = function() {
                _.default.instance.LoadChatUiManager();
            }, t.prototype.setCurChatText = function(e) {
                e.length > 15 && (e = e.slice(0, 15) + "..."), this.labelCurChatText.string = e;
            }, t.instance = null, __decorate([ b(cc.ProgressBar) ], t.prototype, "barExp", void 0), 
            __decorate([ b(cc.ProgressBar) ], t.prototype, "barHP", void 0), __decorate([ b(cc.ProgressBar) ], t.prototype, "barMP", void 0), 
            __decorate([ b(cc.Label) ], t.prototype, "labelHPProcess", void 0), __decorate([ b(cc.Label) ], t.prototype, "labelMPProcess", void 0), 
            __decorate([ b(cc.Label) ], t.prototype, "labelPlayerLv", void 0), __decorate([ b(cc.Label) ], t.prototype, "labelLevelName", void 0), 
            __decorate([ b(cc.Label) ], t.prototype, "labelLevelExp", void 0), __decorate([ b(cc.Label) ], t.prototype, "labelLevelCoin", void 0), 
            __decorate([ b(cc.Label) ], t.prototype, "labelPlayerName", void 0), __decorate([ b(cc.Button) ], t.prototype, "btnCloseEvent", void 0), 
            __decorate([ b(cc.Button) ], t.prototype, "btnOpenEvent", void 0), __decorate([ b(cc.Button) ], t.prototype, "btnSign", void 0), 
            __decorate([ b(cc.Node) ], t.prototype, "nodeSignRed", void 0), __decorate([ b(cc.Button) ], t.prototype, "btnAchievement", void 0), 
            __decorate([ b(cc.ProgressBar) ], t.prototype, "barAchievementStatus", void 0), 
            __decorate([ b(cc.Label) ], t.prototype, "labelAchievementStatus", void 0), __decorate([ b(cc.Label) ], t.prototype, "labelAchievementTitle", void 0), 
            __decorate([ b(cc.Node) ], t.prototype, "nodeAchievementRed", void 0), __decorate([ b(cc.ProgressBar) ], t.prototype, "barLevelStatus", void 0), 
            __decorate([ b(cc.Node) ], t.prototype, "nodeSmallMan", void 0), __decorate([ b(cc.Node) ], t.prototype, "buffNode", void 0), 
            __decorate([ b(cc.Button) ], t.prototype, "btnChatNode", void 0), __decorate([ b(cc.Label) ], t.prototype, "labelCurChatText", void 0), 
            __decorate([ b(cc.Label) ], t.prototype, "labelLevelNum", void 0), __decorate([ b(cc.Label) ], t.prototype, "labelLevelProcess", void 0), 
            t = a = __decorate([ v ], t);
        }(cc.Component);
        a.default = D, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../battle/battle_manager": "battle_manager",
        "../common/allenum": "allenum",
        "../common/emmiter": "emmiter",
        "../manager/achievenment_manager": "achievenment_manager",
        "../manager/data_manager": "data_manager",
        "../manager/dungeon_data_manager": "dungeon_data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/playerbuff_manager": "playerbuff_manager",
        "../manager/pool_manager": "pool_manager",
        "../manager/ui_manager": "ui_manager",
        "../network/player_network": "player_network",
        "../util": "util",
        "./item/buff_item": "buff_item",
        "./random_event_ui_manager": "random_event_ui_manager"
    } ],
    bg_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "31e5eiPXGFFPKQcrr8c6w4N", "bg_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, r = n.property, o = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.forestBg = null, t.dungeonBg = null, t.curBgName = "dungeon", t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this;
                var e = cc.view.getFrameSize().height / cc.view.getFrameSize().width;
                this.node.scale = 2.165625 / e, console.log("背景缩放：" + this.node.scale);
            }, t.prototype.changeBgByName = function(e) {
                if (this.curBgName != e) switch (this.curBgName = e, e) {
                  case "dungeon":
                    this.dungeonBg.active = !0, this.forestBg.active = !1;
                    break;

                  case "forest":
                    this.forestBg.active = !0, this.dungeonBg.active = !1;
                }
            }, t.instance = null, __decorate([ r(cc.Node) ], t.prototype, "forestBg", void 0), 
            __decorate([ r(cc.Node) ], t.prototype, "dungeonBg", void 0), t = a = __decorate([ i ], t);
        }(cc.Component);
        a.default = o, cc._RF.pop();
    }, {} ],
    blackmarket_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "e6994BlQcROkLppxUADwEUH", "blackmarket_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./data_manager"), i = e("./lost_manager"), r = function() {
            function e() {
                this.curLostLevel = 1, this.sprite_count = 0;
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e(), this._instance.goods = [], 
                    this._instance.curPrice = {}), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.setDefault = function() {
                this.goods = [], this.curPrice = {}, this.curLostLevel = 1, this.sprite_cost = {}, 
                this.sprite_count = 1;
            }, e.prototype.getEquipmentByPlayerLVParam = function(e) {
                var t = this.getBlackMarketByPlayerLV(e);
                return i.default.instance.getRamdomBaseBagItem(t.droplv);
            }, e.prototype.updateBlackMarketGoods = function(e) {
                this.goods = [];
                var t = this.getBlackMarketByPlayerLV(e);
                if (null != t) {
                    var a = n.default.instance.getGlobalValue("blackmarket_fresh_equip_count");
                    this.curPrice = t.price, this.curLostLevel = t.droplv;
                    for (var r = 0; r < a; r++) {
                        var o = i.default.instance.getRamdomBaseBagItem(this.curLostLevel);
                        this.goods[r] = o;
                    }
                } else console.log("no black store data");
                this.sprite_count = n.default.instance.getGlobalValue("blackmarket_fresh_sprite_count"), 
                this.sprite_cost = n.default.instance.getGlobalValue("blackmarket_sprite_cost");
            }, e.prototype.removeItemOfGoods = function(e) {
                this.goods.splice(e, 1);
            }, e.prototype.getBlackMarketByPlayerLV = function(e) {
                var t, a = n.default.instance.blackMarketData;
                for (t in a) if (e >= a[t].minlv && e <= a[t].maxlv) return a[t];
                return a[t];
            }, e.prototype.removeOneSprite = function() {
                this.sprite_count > 0 ? this.sprite_count = this.sprite_count - 1 : console.error("已经没有精灵了，异常错误。");
            }, e._instance = null, e;
        }();
        a.default = r, cc._RF.pop();
    }, {
        "./data_manager": "data_manager",
        "./lost_manager": "lost_manager"
    } ],
    blackmarket_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "09accJOv55Ij4Qoj6uE9XAR", "blackmarket_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../util"), i = e("../manager/pool_manager"), r = e("./item/store_item"), o = e("../manager/cost_manager"), s = e("../manager/dynamic_data_manager"), l = e("../manager/blackmarket_manager"), c = e("../manager/sprite_manager"), u = e("../audio_manager"), d = e("../network/player_network"), p = e("../manager/ui_manager"), m = cc._decorator, f = m.ccclass, g = m.property, h = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.maskNode = null, t.contentNode = null, t.curMaketIndex = 0, 
                t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideUI, this), this.uiNode.active && (this.uiNode.active = !1);
            }, t.prototype.update = function() {}, t.prototype.showUI = function() {
                u.default.instance.PlayUISelect();
                var e = s.default.instance.getMainPlayerLVParam();
                l.default.instance.updateBlackMarketGoods(e), this.uiNode.active = !0, this.refreshUI();
            }, t.prototype.checkActiveAndRefresh = function() {
                this.uiNode.active && this.refreshUI();
            }, t.prototype.refreshUI = function() {
                for (var e = this.contentNode.children, t = e.length - 1; t >= 0; t--) i.default.instance.RemoveObjectByName("StoreItem", e[t]);
                var a, o = l.default.instance.goods;
                for (a in n.default.PrintObj(o), o) {
                    if (null != o[a]) i.default.instance.CreateObjectByName("StoreItem", this.contentNode).getComponent(r.default).initBlackMarketItem(a, this.itemCallBack);
                }
                var s = l.default.instance.sprite_count;
                for (t = 0; t < s; t++) {
                    i.default.instance.CreateObjectByName("StoreItem", this.contentNode).getComponent(r.default).initBlackMarketSpriteItem(a, this.itemSpriteCallBack);
                }
            }, t.prototype.hideUI = function() {
                this.uiNode.active = !1;
            }, t.prototype.itemSpriteCallBack = function(e) {
                if (c.default.instance.isFullSpriteBag()) p.default.instance.LoadTipsByID("sprite_count_limit"); else {
                    var t = l.default.instance.sprite_cost;
                    if (o.default.instance.cost(t)) {
                        var a = s.default.instance.getMainPlayerLVParam(), n = l.default.instance.getBlackMarketByPlayerLV(a).id, i = c.default.instance.getRandomSpriteByQuality(1);
                        d.default.instance.PlayerBuyBlackMarketRequest(n, !0, i);
                    }
                }
            }, t.prototype.itemCallBack = function(e) {
                if (console.log("item id:" + e.toString()), s.default.instance.isBagFull()) p.default.instance.LoadTipsByID("bag_count_limit"); else {
                    var t = l.default.instance.curPrice;
                    if (o.default.instance.cost(t)) {
                        var a = l.default.instance.goods[e], n = s.default.instance.getMainPlayerLVParam(), i = l.default.instance.getBlackMarketByPlayerLV(n).id;
                        d.default.instance.PlayerBuyBlackMarketRequest(i, !1, a.baseId), this.curMaketIndex = e;
                    }
                }
            }, t.prototype.bugSpriteOrEquipSuccess = function(e) {
                0 == e ? (l.default.instance.removeItemOfGoods(this.curMaketIndex), a.instance.refreshUI()) : (l.default.instance.removeOneSprite(), 
                a.instance.refreshUI());
            }, t.instance = null, __decorate([ g(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ g(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ g(cc.Node) ], t.prototype, "contentNode", void 0), 
            t = a = __decorate([ f ], t);
        }(cc.Component);
        a.default = h, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../manager/blackmarket_manager": "blackmarket_manager",
        "../manager/cost_manager": "cost_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/pool_manager": "pool_manager",
        "../manager/sprite_manager": "sprite_manager",
        "../manager/ui_manager": "ui_manager",
        "../network/player_network": "player_network",
        "../util": "util",
        "./item/store_item": "store_item"
    } ],
    block_effect: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "f221dMXu7lF9JrdH+/Uc53a", "block_effect"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, r = (n.property, function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this;
            }
            return __extends(t, e), t.prototype.Init = function() {
                this.node.opacity = 255;
            }, t = __decorate([ i ], t);
        }(cc.Component));
        a.default = r, cc._RF.pop();
    }, {} ],
    boss_come_effect_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "eca5cQDV4hJVpEkQ9p/LWwx", "boss_come_effect_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, r = n.property, o = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.curAnimation = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this;
            }, t.prototype.play = function() {
                this.curAnimation.play();
            }, t.instance = null, __decorate([ r(cc.Animation) ], t.prototype, "curAnimation", void 0), 
            t = a = __decorate([ i ], t);
        }(cc.Component);
        a.default = o, cc._RF.pop();
    }, {} ],
    buff_data: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "a6be0o1n1JOlbW4uj9mIFOC", "buff_data"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/data_manager"), i = e("../math/rand"), r = e("../network/player_network"), o = e("../common/allenum"), s = e("../battle/battle_manager"), l = function() {
            function e() {}
            return e.prototype.addAction = function() {
                this.getBuffValue("伤害追加") > 2 && (this.entity.node.scale = 1.3), this.getBuffValue("攻击获钻") > 0 && (this.effectValue = 0, 
                s.default.instance.setMissLeadingActive("钻石", !0)), this.getBuffValue("攻击获金") > 0 && (this.effectValue = 0, 
                s.default.instance.setMissLeadingActive("金币", !0));
            }, e.prototype.removeAction = function() {
                this.getBuffValue("伤害追加") > 2 && (this.entity.node.scale = 1), this.getBuffValue("攻击获钻") > 0 && (r.default.instance.PlayerAttackMonsterRequest(this.effectValue, o.MoneyType.Daimod), 
                s.default.instance.setRewardEndEffect("钻石"), s.default.instance.setMissLeadingActive("钻石", !1)), 
                this.getBuffValue("攻击获金") > 0 && (r.default.instance.PlayerAttackMonsterRequest(this.effectValue, o.MoneyType.Coin), 
                s.default.instance.setRewardEndEffect("金币"), s.default.instance.setMissLeadingActive("金币", !1)), 
                this.effect = null;
            }, e.prototype.AddBuffEffectValue = function() {
                this.getBuffValue("攻击获钻") > 0 && (this.effectValue += this.getBuffValue("攻击获钻")), 
                this.getBuffValue("攻击获金") > 0 && (this.effectValue += this.getBuffValue("攻击获金"));
            }, e.prototype.getBuffValue = function(e) {
                return this.effect[e] ? this.effect[e] : 0;
            }, e;
        }();
        a.Buff = l;
        var c = function() {
            function e() {
                this.Buffs = new Array();
            }
            return e.prototype.addSkillBuff = function(e, t, a) {
                var r = n.default.instance.skillData[t];
                if (r) {
                    var o = new l();
                    o.skillID = t, o.endTime = r.duration;
                    var s = {};
                    for (var c in r.effect) null == s[c] ? s[c] = r.effect[c] : s[c] += r.effect[c];
                    for (var c in r.effect_up) null == s[c] ? s[c] = r.effect_up[c] * (a - 1) : s[c] += r.effect_up[c] * (a - 1);
                    if (s["眩晕"]) {
                        if (this.getBuffValue("晕眩抗性") > .01 && i.default.getZeroToOne() < this.getBuffValue("晕眩抗性")) return;
                        o.endTime = Number(s["眩晕"]);
                    }
                    return o.effect = s, o.entity = e, o.addAction(), this.Buffs.push(o), o;
                }
                return null;
            }, e.prototype.getBuffValue = function(e) {
                for (var t = 0, a = 0; a < this.Buffs.length; a++) this.Buffs[a] && (t += this.Buffs[a].getBuffValue(e));
                return t;
            }, e.prototype.AddBuffEffectValue = function() {
                for (var e = 0; e < this.Buffs.length; e++) this.Buffs[e] && this.Buffs[e].AddBuffEffectValue();
            }, e.prototype.removeBuff = function(e) {
                this.Buffs.splice(e, 1);
            }, e.prototype.clearBuff = function() {
                this.Buffs.slice(0, this.Buffs.length);
            }, e.prototype.update = function(e) {
                for (var t = 0; t < this.Buffs.length; t++) if (this.Buffs[t] && (this.Buffs[t].endTime -= e, 
                this.Buffs[t].endTime <= 0)) {
                    this.Buffs[t].removeAction(), this.removeBuff(t);
                    break;
                }
            }, e;
        }();
        a.default = c, cc._RF.pop();
    }, {
        "../battle/battle_manager": "battle_manager",
        "../common/allenum": "allenum",
        "../manager/data_manager": "data_manager",
        "../math/rand": "rand",
        "../network/player_network": "player_network"
    } ],
    buff_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "3a2a5Dp+MZBUK9Wvn0GWK2+", "buff_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../util"), i = e("../../manager/data_manager"), r = e("../../manager/resource_manager"), o = e("../../manager/pool_manager"), s = cc._decorator, l = s.ccclass, c = s.property, u = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelTime = null, t.spriteIcon = null, t.curBuff = null, t.running = !1, 
                t;
            }
            return __extends(t, e), t.prototype.Init = function(e) {
                this.curBuff = e;
                var t = i.default.instance.skillData[e.skillID];
                this.spriteIcon.spriteFrame = r.default.instance.getSkillSprite(t.icon_path), this.running = !0, 
                this.labelTime.string = n.default.getTimeFormat(this.curBuff.endTime);
            }, t.prototype.update = function() {
                if (this.running) {
                    if (!this.curBuff) return this.running = !1, void o.default.instance.RemoveObjectByName("BuffItem", this.node);
                    if (this.labelTime.string = n.default.getTimeFormat(this.curBuff.endTime), this.curBuff.endTime <= 0) return this.running = !1, 
                    void o.default.instance.RemoveObjectByName("BuffItem", this.node);
                }
            }, __decorate([ c(cc.Label) ], t.prototype, "labelTime", void 0), __decorate([ c(cc.Sprite) ], t.prototype, "spriteIcon", void 0), 
            t = __decorate([ l ], t);
        }(cc.Component);
        a.default = u, cc._RF.pop();
    }, {
        "../../manager/data_manager": "data_manager",
        "../../manager/pool_manager": "pool_manager",
        "../../manager/resource_manager": "resource_manager",
        "../../util": "util"
    } ],
    buff_show_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "f6ca04VW6FJo5FhlEur0Gip", "buff_show_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, r = (n.property, function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this;
            }, t.instance = null, t = a = __decorate([ i ], t);
        }(cc.Component));
        a.default = r, cc._RF.pop();
    }, {} ],
    canvas_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "1e084j/AopBVp9/pzsAbY2y", "canvas_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, r = (n.property, function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this;
            }
            var a;
            return __extends(t, e), a = t, Object.defineProperty(t, "instance", {
                get: function() {
                    return this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.onLoad = function() {
                a._instance = this;
            }, t._instance = null, t = a = __decorate([ i ], t);
        }(cc.Component));
        a.default = r, cc._RF.pop();
    }, {} ],
    changname_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "ebfbefGgcZDyoohL36nPHD4", "changname_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../util"), i = e("../network/player_network"), r = e("../manager/ui_manager"), o = cc._decorator, s = o.ccclass, l = o.property, c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.btnConfrim = null, t.editboxAccount = null, t.uiNode = null, t.maskNode = null, 
                t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.hideUI = function() {
                this.uiNode.active = !1;
            }, t.prototype.showUI = function() {
                this.uiNode.active = !0;
            }, t.prototype.onLoad = function() {
                a.instance = this;
            }, t.prototype.start = function() {
                this.btnConfrim.node.on("click", this.changeName, this);
            }, t.prototype.changeName = function() {
                var e = this.editboxAccount.string;
                "" != e && 1 != /^\s+$/.test(e) ? n.default.strlen(e) > 18 ? r.default.instance.LoadTipsByStr("名字太长，不能多于18字符") : (console.log("newName:" + e), 
                i.default.instance.PlayerChangeName(e)) : r.default.instance.LoadTipsByStr("名字不能为空");
            }, t.instance = null, __decorate([ l(cc.Button) ], t.prototype, "btnConfrim", void 0), 
            __decorate([ l(cc.EditBox) ], t.prototype, "editboxAccount", void 0), __decorate([ l(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ l(cc.Node) ], t.prototype, "maskNode", void 0), t = a = __decorate([ s ], t);
        }(cc.Component);
        a.default = c, cc._RF.pop();
    }, {
        "../manager/ui_manager": "ui_manager",
        "../network/player_network": "player_network",
        "../util": "util"
    } ],
    chat_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "58771zWcu9I651kNx4wAda2", "chat_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/pool_manager"), i = e("./item/item_ask"), r = e("../network/player_network"), o = e("../manager/dynamic_data_manager"), s = e("../manager/achievenment_manager"), l = e("./item/item_btn_chat_room"), c = e("./battle_ui_manager"), u = e("../manager/ui_manager"), d = cc._decorator, p = d.ccclass, m = d.property, f = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.chatUINode = null, t.btn_sendAsk = null, t.btn_close = null, t.editBox = null, 
                t.askParent = null, t.scrollView = null, t.offsetHeight = 0, t.canSpeak = !0, t.canSpeakTime = 2, 
                t.curCanSpeakTime = 0, t.node_room = null, t.label_cur_room = null, t.btn_open_room = null, 
                t.btn_close_room = null, t.node_room_content = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.askCtrls = [], this.item_chat_rooms = [], this.btn_close.node.on("click", this.closeNode, this), 
                this.btn_sendAsk.node.on("click", this.playerAsk, this), this.btn_close_room.node.on("click", this.closeSelectRoom, this), 
                this.btn_open_room.node.on("click", this.openSelectRoom, this), this.chatUINode.active && this.closeNode(), 
                this.node_room.active && (this.node_room.active = !1);
            }, t.prototype.start = function() {}, t.prototype.playerAsk = function() {
                var e = this.editBox.string;
                o.default.instance.getMainPlayerLVParam() <= 50 ? u.default.instance.LoadTipsByStr("50级之后才可以发言") : "" != e && 1 != /^\s+$/.test(e) ? 0 != this.canSpeak ? (this.editBox.string = "", 
                r.default.instance.PlayerChatRoomSendRequest(e), this.canSpeak = !1) : u.default.instance.LoadTipsByID("talk_cd_tips") : u.default.instance.LoadTipsByStr("内容不能为空");
            }, t.prototype.otherAsk = function(e) {
                this.showOtherAsk(e);
            }, t.prototype.showOtherAsk = function(e) {
                if (1 == this.chatUINode.active) {
                    var t = n.default.instance.CreateObjectByName("AskItem", this.askParent).getComponent(i.default), a = s.default.instance.getOtherTitle(e.AchievementID);
                    null != a && (a = a);
                    var r = "";
                    r = e.PlayerName ? e.PlayerName : "小小勇者", e.Lv && (r += "  LV " + e.Lv);
                    var l = e.Content;
                    l || (l = ""), t.Init(a, r, l, o.default.instance.id == e.PlayerID), t.node.position = new cc.Vec2(t.node.position.x, -this.offsetHeight), 
                    this.offsetHeight += 110, this.askCtrls.push(t), this.updateParentContentHeight();
                }
            }, t.prototype.update = function(e) {
                0 == this.canSpeak && (this.curCanSpeakTime += e, this.curCanSpeakTime >= this.canSpeakTime && (this.canSpeak = !0, 
                this.curCanSpeakTime = 0));
            }, t.prototype.updateCurText = function(e) {
                e.length > 15 && (e = e.slice(0, 15) + "..."), c.default.instance.setCurChatText(e);
            }, t.prototype.showChatNode = function() {
                if (this.chatUINode.active = !0, this.askParent.height = 0, this.label_cur_room.string = "勇者酒馆 " + o.default.instance.chatRoomID, 
                null != o.default.instance.chatTemp) {
                    for (var e = 0, t = o.default.instance.chatTemp; e < t.length; e++) {
                        var a = t[e];
                        this.showOtherAsk(a);
                    }
                    this.talkToBottom();
                }
            }, t.prototype.updateParentContentHeight = function() {
                this.askParent.height = this.offsetHeight + 50, this.talkToBottom();
            }, t.prototype.talkToBottom = function() {
                this.askParent.height > this.scrollView.height && (this.askParent.position = new cc.Vec2(this.askParent.position.x, this.askParent.height - this.scrollView.height + this.scrollView.height / 2));
            }, t.prototype.closeNode = function() {
                this.chatUINode.active = !1, this.node_room.active = !1, this.removeChatMessage();
            }, t.prototype.removeChatMessage = function() {
                this.label_cur_room.string = "勇者酒馆 " + o.default.instance.chatRoomID;
                for (var e = 0, t = this.askCtrls; e < t.length; e++) {
                    var a = t[e];
                    n.default.instance.RemoveObjectByName("AskItem", a.node);
                }
                this.askCtrls = [], this.offsetHeight = 0, this.updateParentContentHeight();
            }, t.prototype.openSelectRoom = function() {
                r.default.instance.PlayerGetChatRoomListRequest();
            }, t.prototype.closeSelectRoom = function() {
                for (var e = 0, t = this.item_chat_rooms; e < t.length; e++) {
                    var a = t[e];
                    n.default.instance.RemoveObjectByName("ItemChatRoom", a.node);
                }
                this.node_room.active = !1;
            }, t.prototype.refreshSelectRoom = function(e) {
                for (var t in e) {
                    var a = n.default.instance.CreateObjectByName("ItemChatRoom", this.node_room_content).getComponent(l.default);
                    a.Init(Number(t), e[t]), this.item_chat_rooms.push(a);
                }
                this.node_room.active = !0;
            }, t.instance = null, __decorate([ m(cc.Node) ], t.prototype, "chatUINode", void 0), 
            __decorate([ m(cc.Button) ], t.prototype, "btn_sendAsk", void 0), __decorate([ m(cc.Button) ], t.prototype, "btn_close", void 0), 
            __decorate([ m(cc.EditBox) ], t.prototype, "editBox", void 0), __decorate([ m(cc.Node) ], t.prototype, "askParent", void 0), 
            __decorate([ m(cc.Node) ], t.prototype, "scrollView", void 0), __decorate([ m(cc.Node) ], t.prototype, "node_room", void 0), 
            __decorate([ m(cc.Label) ], t.prototype, "label_cur_room", void 0), __decorate([ m(cc.Button) ], t.prototype, "btn_open_room", void 0), 
            __decorate([ m(cc.Button) ], t.prototype, "btn_close_room", void 0), __decorate([ m(cc.Node) ], t.prototype, "node_room_content", void 0), 
            t = a = __decorate([ p ], t);
        }(cc.Component);
        a.default = f, cc._RF.pop();
    }, {
        "../manager/achievenment_manager": "achievenment_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/pool_manager": "pool_manager",
        "../manager/ui_manager": "ui_manager",
        "../network/player_network": "player_network",
        "./battle_ui_manager": "battle_ui_manager",
        "./item/item_ask": "item_ask",
        "./item/item_btn_chat_room": "item_btn_chat_room"
    } ],
    combat_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "83b1c/dA9JFxYHhgttc5zIw", "combat_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, r = n.property, o = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.combatLabel = null, t.content = null, t.caombatUp = null, t.animTimerLength = 1, 
                t.curAnumTime = 0, t.isAnim = !1, t.startValue = 0, t.endValue = 0, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.start = function() {
                a.instance = this, this.content.active = !1;
            }, t.prototype.PlayCombatEffectAnim = function(e, t) {
                e >= t || (this.startValue = e, this.endValue = t, this.combatLabel.string = this.endValue.toString(), 
                this.combatLabel.node.position = new cc.Vec2(this.combatLabel.node.width / 2, this.combatLabel.node.position.y), 
                this.caombatUp.position = new cc.Vec2((this.combatLabel.node.width + this.caombatUp.width) / 2, this.caombatUp.position.y), 
                this.combatLabel.string = this.startValue.toString(), this.content.active = !0, 
                this.curAnumTime = 0, this.isAnim = !0);
            }, t.prototype.update = function(e) {
                1 == this.isAnim && (this.curAnumTime += e, this.curAnumTime >= this.animTimerLength ? this.combatLabel.string = this.endValue.toString() : this.combatLabel.string = (this.startValue + Math.floor((this.endValue - this.startValue) * (this.curAnumTime / this.animTimerLength))).toString(), 
                this.curAnumTime >= this.animTimerLength + 1 && (this.curAnumTime = 0, this.isAnim = !1, 
                this.content.active = !1));
            }, t.instance = null, __decorate([ r(cc.Label) ], t.prototype, "combatLabel", void 0), 
            __decorate([ r(cc.Node) ], t.prototype, "content", void 0), __decorate([ r(cc.Node) ], t.prototype, "caombatUp", void 0), 
            t = a = __decorate([ i ], t);
        }(cc.Component);
        a.default = o, cc._RF.pop();
    }, {} ],
    config: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "0aba71jpRpBJZ29Q1pZo9d9", "config"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = (n.ccclass, n.property, function() {
            function e() {}
            return e.ServerIP = "wss://littlehero.wechat.dev.shouyouqianxian.com/ws", e.WechatChatLoginUrl = "https://littlehero.wechat.pre.shouyouqianxian.com/login", 
            e.AnnouncementUrl = "https://littlehero.wechat.pre.shouyouqianxian.com/announcement", 
            e.VersionCode = "0.97", e;
        }());
        a.Config = i, cc._RF.pop();
    }, {} ],
    cost_items: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "3507bn89D9IQopnjGpeiWhk", "cost_items"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/resource_manager"), i = e("../../util"), r = cc._decorator, o = r.ccclass, s = r.property, l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.spriteCost1 = null, t.labelCost1 = null, t.spriteCost2 = null, t.labelCost2 = null, 
                t;
            }
            return __extends(t, e), t.prototype.initByCostData = function(e) {
                this.spriteCost1.node.active = !1, this.labelCost1.node.active = !1, this.spriteCost2.node.active = !1, 
                this.labelCost2.node.active = !1;
                var t = 1;
                for (var a in e) 1 == t ? (this.spriteCost1.node.active = !0, this.labelCost1.node.active = !0, 
                this.labelCost1.string = i.default.GetLargeNumStr(e[a]), this.loadSpriteByName(a, this.spriteCost1)) : 2 == t && (this.spriteCost2.node.active = !0, 
                this.labelCost2.node.active = !0, this.labelCost2.string = i.default.GetLargeNumStr(e[a]), 
                this.loadSpriteByName(a, this.spriteCost2)), t++;
            }, t.prototype.loadSpriteByName = function(e, t) {
                var a = "";
                "金币" == e ? a = "gold" : "钻石" == e && (a = "daimond"), "" != a && (t.spriteFrame = n.default.instance.getCommonSprite(a));
            }, __decorate([ s(cc.Sprite) ], t.prototype, "spriteCost1", void 0), __decorate([ s(cc.Label) ], t.prototype, "labelCost1", void 0), 
            __decorate([ s(cc.Sprite) ], t.prototype, "spriteCost2", void 0), __decorate([ s(cc.Label) ], t.prototype, "labelCost2", void 0), 
            t = __decorate([ o ], t);
        }(cc.Component);
        a.default = l, cc._RF.pop();
    }, {
        "../../manager/resource_manager": "resource_manager",
        "../../util": "util"
    } ],
    cost_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "5019bj8MehI7r30rXNEJpj5", "cost_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./dynamic_data_manager"), i = e("./ui_manager"), r = function() {
            function e() {}
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.isEnough = function(e) {
                for (var t in e) if ("金币" == t) {
                    if (n.default.instance.goldNum < e[t]) return i.default.instance.LoadTipsByID("coin_limit"), 
                    !1;
                } else if ("钻石" == t && n.default.instance.daimondNum < e[t]) return i.default.instance.LoadTipsByID("daimond_limit"), 
                !1;
                return !0;
            }, e.prototype.cost = function(e) {
                for (var t in e) if ("金币" == t) {
                    if (n.default.instance.goldNum < e[t]) return i.default.instance.LoadTipsByID("coin_limit"), 
                    !1;
                } else if ("钻石" == t && n.default.instance.daimondNum < e[t]) return i.default.instance.LoadTipsByID("daimond_limit"), 
                !1;
                return !0;
            }, e._instance = null, e;
        }();
        a.default = r, cc._RF.pop();
    }, {
        "./dynamic_data_manager": "dynamic_data_manager",
        "./ui_manager": "ui_manager"
    } ],
    damage_effect: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "c81bfBxGjtGQJrJppW1SQTj", "damage_effect"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../util"), i = cc._decorator, r = i.ccclass, o = i.property, s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelLight = null, t.labelBlaze = null, t.labelFrozen = null, t.labelPosion = null, 
                t.labelTotal = null, t;
            }
            return __extends(t, e), t.prototype.Init = function(e, t, a, i, r) {
                this.node.opacity = 255, this.labelLight.node.active = !1, this.labelBlaze.node.active = !1, 
                this.labelFrozen.node.active = !1, this.labelPosion.node.active = !1, this.labelTotal.string = n.default.GetLargeNumStr(e), 
                t > .03 * e && (this.labelLight.string = n.default.GetLargeNumStr(t), this.labelLight.node.active = !0), 
                a > .03 * e && (this.labelBlaze.string = n.default.GetLargeNumStr(a), this.labelBlaze.node.active = !0), 
                i > .03 * e && (this.labelFrozen.string = n.default.GetLargeNumStr(i), this.labelFrozen.node.active = !0), 
                r > .03 * e && (this.labelPosion.string = n.default.GetLargeNumStr(r), this.labelPosion.node.active = !0);
            }, __decorate([ o(cc.Label) ], t.prototype, "labelLight", void 0), __decorate([ o(cc.Label) ], t.prototype, "labelBlaze", void 0), 
            __decorate([ o(cc.Label) ], t.prototype, "labelFrozen", void 0), __decorate([ o(cc.Label) ], t.prototype, "labelPosion", void 0), 
            __decorate([ o(cc.Label) ], t.prototype, "labelTotal", void 0), t = __decorate([ r ], t);
        }(cc.Component);
        a.default = s, cc._RF.pop();
    }, {
        "../../util": "util"
    } ],
    damage: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "6b35cNCS3NLGqikGG4MGJWc", "damage"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./rand"), i = cc._decorator, r = i.ccclass, o = (i.property, function() {
            return function() {};
        }()), s = function() {
            function e() {}
            var t;
            return t = e, e.baseDamage = function(e, t) {
                return e.minDamage + (e.maxDamage - e.minDamage) * n.default.getZeroToOne();
            }, e.weaponDamage = function(e, a) {
                return t.baseDamage(e, a) * (1 - a.physicsDefenceRate);
            }, e.totalDamage = function(e, a) {
                var n = new o();
                return n.total = t.weaponDamage(e, a), e.frozenDamage > 0 && (n.fronzen = e.frozenDamage * (1 - a.frozenDefence), 
                n.total += n.fronzen), e.blazeDamage > 0 && (n.blaze = e.blazeDamage * (1 - a.blazeDefence), 
                n.total += n.blaze), e.lightDamage > 0 && (n.light = e.lightDamage * (1 - a.lightDefence), 
                n.total += n.light), e.poisonDamage > 0 && (n.posion = e.poisonDamage * (1 - a.poisonDefence), 
                n.total += n.posion), n;
            }, e.finalDamage = function(e, a, i, r) {
                void 0 === r && (r = null);
                var o = t.totalDamage(e, a);
                o.total;
                var s = 1;
                return i && (s *= 2), s *= 1 + a.buffData.getBuffValue("受击增伤"), o.total = o.total * s + e.realDamage - a.realDefence, 
                o.blaze = Math.floor(o.blaze * s), o.fronzen = Math.floor(o.fronzen * s), o.light = Math.floor(o.light * s), 
                o.posion = Math.floor(o.posion * s), !a.isBoss && e.buffData.getBuffValue("致命概率") > .99 && (o.total = a.hp), 
                r && (r.getAttr("致命概率") > .01 && n.default.getZeroToOne() < r.getAttr("致命概率") && (o.total = a.hp), 
                r.getAttr("最终增伤") > .01 && (o.total = o.total * (1 + r.getAttr("最终增伤")))), o.total < 1 && (o.total = 1), 
                o.total = Math.floor(a.hp), o;
            }, e.beingHit = function(e, t, a) {
                void 0 === a && (a = null);
                var i = e.hitVal;
                a && (i *= 1 + a.getAttr("命中追加"));
                var r = i / (i + t.df) * (2 * e.lv / (e.lv + t.lv));
                return true;
            }, e.isBlock = function(e, t) {
                var a = 8e-4 * t.blockVal * t.lv / (e.lv * e.lv);
                return a < .05 ? a = 0 : a > .75 && (a = .75), n.default.getZeroToOne() <= a;
            }, e = t = __decorate([ r ], e);
        }();
        a.default = s, cc._RF.pop();
    }, {
        "./rand": "rand"
    } ],
    data_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "6db3axkGC1EWJD4JsBT2RXC", "data_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../math/rand"), i = e("../util"), r = cc._decorator, o = r.ccclass, s = r.property, l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.expJsonAsset = null, t.expData = null, t.levelJsonAsset = null, t.levelData = null, 
                t.monsterJsonAsset = null, t.monsterData = null, t.lostLevelJsonAsset = null, t.lostLevelData = null, 
                t.equipmentJsonAsset = null, t.equipmentData = null, t.equipPrefixJsonAsset = null, 
                t.equipPrefixData = null, t.attrValueJsonAsset = null, t.attrValueData = null, t.globalValueJsonAsset = null, 
                t.globalValueData = null, t.atlarAsset = null, t.atlarData = null, t.tipsAsset = null, 
                t.tipsData = null, t.helpAsset = null, t.helpData = null, t.blackMarketAsset = null, 
                t.blackMarketData = null, t.spriteAsset = null, t.spriteData = null, t.skillAsset = null, 
                t.skillData = null, t.randomEventAsset = null, t.randomEventData = null, t.onlineRewardAsset = null, 
                t.onlineRewardData = null, t.signAsset = null, t.signData = null, t.achievementAsset = null, 
                t.achievementData = null, t.monsterGemAsset = null, t.monsterGemData = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.expData = this.expJsonAsset.json, this.levelData = this.levelJsonAsset.json, 
                this.monsterData = this.monsterJsonAsset.json, this.lostLevelData = this.lostLevelJsonAsset.json, 
                this.equipmentData = this.equipmentJsonAsset.json, this.equipPrefixData = this.equipPrefixJsonAsset.json, 
                this.attrValueData = this.attrValueJsonAsset.json, this.globalValueData = this.globalValueJsonAsset.json, 
                this.atlarData = this.atlarAsset.json, this.tipsData = this.tipsAsset.json, this.blackMarketData = this.blackMarketAsset.json, 
                this.spriteData = this.spriteAsset.json, this.skillData = this.skillAsset.json, 
                this.randomEventData = this.randomEventAsset.json, this.helpData = this.helpAsset.json, 
                this.onlineRewardData = this.onlineRewardAsset.json, this.signData = this.signAsset.json, 
                this.achievementData = this.achievementAsset.json, this.monsterGemData = this.monsterGemAsset.json, 
                this.calEquipValue();
            }, t.prototype.calEquipValue = function() {
                for (var e in this.equipmentData) {
                    var t = 0;
                    for (var a in this.equipmentData[e].att) if ("攻击速度" == a) {
                        var n = 2 / this.equipmentData[e].att["攻击速度"] - 1;
                        n > 0 && (null != this.equipmentData[e].att["伤害"] && (t += n * this.equipmentData[e].att["伤害"] * this.attrValueData["伤害"].value), 
                        null != this.equipmentData[e].att["最小伤害"] && (t += n * this.equipmentData[e].att["最小伤害"] * this.attrValueData["最小伤害"].value), 
                        null != this.equipmentData[e].att["最大伤害"] && (t += n * this.equipmentData[e].att["最大伤害"] * this.attrValueData["最大伤害"].value));
                    } else t += this.equipmentData[e].att[a] * this.attrValueData[a].value;
                    this.equipmentData[e].value = Math.floor(t);
                }
            }, t.prototype.getEquipIDbyMinMaxValue = function(e, t) {
                var a, i = new Array();
                for (a in this.equipmentData) this.equipmentData[a].value >= e && this.equipmentData[a].value <= t && i.push(a);
                return i.length > 0 ? i[n.default.getRandomNum(0, i.length - 1)] : 0;
            }, t.prototype.getEquipIDbyMinMaxValueAndTypes = function(e, t, a) {
                var i, r = new Array();
                for (i in this.equipmentData) a.indexOf(this.equipmentData[i].type) >= 0 && this.equipmentData[i].value >= e && this.equipmentData[i].value <= t && r.push(i);
                return r.length > 0 ? r[n.default.getRandomNum(0, r.length - 1)] : 0;
            }, t.prototype.getEquipPrefixByLevel = function(e, t) {
                void 0 === t && (t = []);
                var a, r = new Array();
                for (a in this.equipPrefixData) i.default.IsContain(t, a) || this.equipPrefixData[a].level == e && r.push(a);
                return r.length > 0 ? r[n.default.getRandomNum(0, r.length - 1)] : 0;
            }, t.prototype.getEquipPrefixMinValById = function(e) {
                var t = this.equipPrefixData[e].attrtype, a = this.attrValueData[t].value;
                return this.attrValueData[t].type ? .01 * Math.ceil(100 * this.equipPrefixData[e].attr_value_min / a) : Math.ceil(this.equipPrefixData[e].attr_value_min / a);
            }, t.prototype.getEquipPrefixMaxValById = function(e) {
                var t = this.equipPrefixData[e].attrtype, a = this.attrValueData[t].value;
                return this.attrValueData[t].type ? .01 * Math.ceil(100 * this.equipPrefixData[e].attr_value_max / a) : Math.ceil(this.equipPrefixData[e].attr_value_max / a);
            }, t.prototype.getEquipPrefixValById = function(e) {
                var t = this.equipPrefixData[e].attrtype, a = this.attrValueData[t].value, i = 0;
                if (this.attrValueData[t].type) {
                    var r = Math.ceil(100 * this.equipPrefixData[e].attr_value_min / a), o = Math.ceil(100 * this.equipPrefixData[e].attr_value_max / a);
                    i = .01 * n.default.getRandomNum(r, o);
                } else {
                    r = Math.ceil(this.equipPrefixData[e].attr_value_min / a), o = Math.ceil(this.equipPrefixData[e].attr_value_max / a);
                    i = n.default.getRandomNum(r, o);
                }
                return i;
            }, t.prototype.getJsonLength = function(e) {
                var t = 0;
                for (var a in e) t++;
                return t;
            }, t.prototype.getAltarDataByMinLvType = function(e) {
                var t = {};
                for (var a in this.atlarData) null == t[this.atlarData[a].bufftype] ? t[this.atlarData[a].bufftype] = this.atlarData[a] : t[this.atlarData[a].bufftype].bufflv > this.atlarData[a].bufflv && (t[this.atlarData[a].bufftype] = this.atlarData[a]);
                for (var n in e) {
                    var i = this.atlarData[e[n]].id, r = this.atlarData[i].bufftype;
                    if (t[r] && t[r].bufflv <= this.atlarData[i].bufflv) {
                        var o = this.getAltarDataByTypeAndLv(r, this.atlarData[i].bufflv + 1);
                        o ? t[r] = o : delete t[r];
                    }
                }
                return t;
            }, t.prototype.getAltarDatasByID = function(e) {
                for (var t = {}, a = 0, n = e; a < n.length; a++) {
                    var i = n[a], r = this.atlarData[i];
                    (null == t[r.bufftype] || t[r.bufftype].bufflv < r.bufflv) && (t[r.bufftype] = r);
                }
                return t;
            }, t.prototype.getAltarDataByTypeAndLv = function(e, t) {
                for (var a in this.atlarData) if (this.atlarData[a].bufftype == e && this.atlarData[a].bufflv == t) return this.atlarData[a];
                return null;
            }, t.prototype.getGlobalValue = function(e) {
                return null != this.globalValueData[e] ? this.globalValueData[e].params : 0;
            }, t.prototype.getAttrValStr = function(e, t) {
                var n = a.instance.attrValueData[e], r = "";
                return null != n && (r = 1 == n.type ? i.default.GetPercentStr(t) : 2 == n.type ? t.toFixed(2) + "秒" : 0 == n.type ? Math.floor(t).toFixed(0) : t.toFixed(0)), 
                r;
            }, t.instance = null, __decorate([ s(cc.JsonAsset) ], t.prototype, "expJsonAsset", void 0), 
            __decorate([ s(cc.JsonAsset) ], t.prototype, "levelJsonAsset", void 0), __decorate([ s(cc.JsonAsset) ], t.prototype, "monsterJsonAsset", void 0), 
            __decorate([ s(cc.JsonAsset) ], t.prototype, "lostLevelJsonAsset", void 0), __decorate([ s(cc.JsonAsset) ], t.prototype, "equipmentJsonAsset", void 0), 
            __decorate([ s(cc.JsonAsset) ], t.prototype, "equipPrefixJsonAsset", void 0), __decorate([ s(cc.JsonAsset) ], t.prototype, "attrValueJsonAsset", void 0), 
            __decorate([ s(cc.JsonAsset) ], t.prototype, "globalValueJsonAsset", void 0), __decorate([ s(cc.JsonAsset) ], t.prototype, "atlarAsset", void 0), 
            __decorate([ s(cc.JsonAsset) ], t.prototype, "tipsAsset", void 0), __decorate([ s(cc.JsonAsset) ], t.prototype, "helpAsset", void 0), 
            __decorate([ s(cc.JsonAsset) ], t.prototype, "blackMarketAsset", void 0), __decorate([ s(cc.JsonAsset) ], t.prototype, "spriteAsset", void 0), 
            __decorate([ s(cc.JsonAsset) ], t.prototype, "skillAsset", void 0), __decorate([ s(cc.JsonAsset) ], t.prototype, "randomEventAsset", void 0), 
            __decorate([ s(cc.JsonAsset) ], t.prototype, "onlineRewardAsset", void 0), __decorate([ s(cc.JsonAsset) ], t.prototype, "signAsset", void 0), 
            __decorate([ s(cc.JsonAsset) ], t.prototype, "achievementAsset", void 0), __decorate([ s(cc.JsonAsset) ], t.prototype, "monsterGemAsset", void 0), 
            t = a = __decorate([ o ], t);
        }(cc.Component);
        a.default = l, cc._RF.pop();
    }, {
        "../math/rand": "rand",
        "../util": "util"
    } ],
    depot_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "2ad1aZbNQNLQ6igbfZTxHmf", "depot_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/dynamic_data_manager"), i = e("../manager/pool_manager"), r = e("./item/bag_item"), o = e("../common/allenum"), s = e("../audio_manager"), l = e("../util"), c = cc._decorator, u = c.ccclass, d = c.property, p = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.bagUINode = null, t.maskNode = null, t.bagContentViewNode = null, t.labelBagCount = null, 
                t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideBagUI, this), this.bagUINode.active && (this.bagUINode.active = !1);
            }, t.prototype.showUI = function() {
                s.default.instance.PlayUISelect(), this.bagUINode.active = !0, this.refreshBagUI();
            }, t.prototype.refreshBagUI = function() {
                for (var e = this.bagContentViewNode.children, t = e.length - 1; t >= 0; t--) i.default.instance.RemoveBagItem(e[t]);
                var a = 0;
                if (null != n.default.instance.DepotItemDataMap) {
                    for (var s in n.default.instance.DepotItemDataMap) {
                        i.default.instance.CreateBagItem(this.bagContentViewNode).getComponent(r.default).reinit(n.default.instance.DepotItemDataMap[s], o.GridType.DepotItem);
                    }
                    a = l.default.len(n.default.instance.DepotItemDataMap);
                }
                this.labelBagCount.string = "( " + a.toString() + " / " + n.default.instance.playerDeportCount + " )";
            }, t.prototype.hideBagUI = function() {
                this.bagUINode.active = !1;
            }, t.instance = null, __decorate([ d(cc.Node) ], t.prototype, "bagUINode", void 0), 
            __decorate([ d(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ d(cc.Node) ], t.prototype, "bagContentViewNode", void 0), 
            __decorate([ d(cc.Label) ], t.prototype, "labelBagCount", void 0), t = a = __decorate([ u ], t);
        }(cc.Component);
        a.default = p, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../common/allenum": "allenum",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/pool_manager": "pool_manager",
        "../util": "util",
        "./item/bag_item": "bag_item"
    } ],
    dungeon_data_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "68147eTfMxHoJe9vvrKddQ7", "dungeon_data_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./data_manager"), i = e("../math/rand"), r = e("./playerbuff_manager"), o = e("../common/allenum"), s = function() {
            function e() {}
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.hasNextNormalLevel = function(e) {
                var t = e + 1;
                return !(!n.default.instance.levelData[t] || 1 != n.default.instance.levelData[t].type);
            }, e.prototype.checkIsBoss = function(e, t, a) {
                return a != o.BattleStatus.NormalIdle && t == this.getBossBattleCount(e);
            }, e.prototype.isOverBoss = function(e, t) {
                return t > this.getBossBattleCount(e);
            }, e.prototype.getBossBattleCount = function(e) {
                var t = r.default.instance.getBuffValue("BOSS区距离拉近");
                return t > .5 && (t = .5), Math.ceil(n.default.instance.levelData[e].battle_count * (1 - t));
            }, e.prototype.getBattleLevelBossLostMoney = function(e) {
                return n.default.instance.levelData[e].boss_lost_money;
            }, e.prototype.getFirstMonsterHP = function(e, t) {
                var a = n.default.instance.levelData[e], i = a.monsters[0], r = n.default.instance.monsterData[i].hp;
                return 2 == t ? (r *= a.diff_fix_value - 1, a.diff_fix_attr["生命"] && (r += a.diff_fix_attr["生命"])) : 3 == t && (r *= a.hell_fix_value - 1, 
                a.diff_fix_attr["生命"] && (r += a.hell_fix_attr["生命"])), r;
            }, e.prototype.getFirstMonsterLV = function(e, t) {
                var a = n.default.instance.levelData[e], i = a.monsters[0], r = n.default.instance.monsterData[i].lv;
                return 2 == t ? a.diff_fix_attr["等级"] && (r += a.diff_fix_attr["等级"]) : 3 == t && a.diff_fix_attr["等级"] && (r += a.hell_fix_attr["等级"]), 
                r;
            }, e.prototype.getPlayerBattleLevelFixAttr = function(e, t, a) {
                var i = n.default.instance.levelData[e];
                if (1 == t) {
                    if (i.player_normal_fix && i.player_normal_fix[a]) return i.player_normal_fix[a];
                } else if (2 == t) {
                    if (i.player_diff_fix && i.player_diff_fix[a]) return i.player_diff_fix[a];
                } else if (3 == t && i.player_hell_fix && i.player_hell_fix[a]) return i.player_hell_fix[a];
                return 0;
            }, e.prototype.getMonsterID = function(e, t, a) {
                var r = 0;
                if (this.checkIsBoss(e, t, a)) r = n.default.instance.levelData[e].boss_id; else {
                    var o = n.default.instance.levelData[e].monsters.length, s = i.default.getRandomNum(0, o - 1);
                    r = n.default.instance.levelData[e].monsters[s];
                }
                return r;
            }, e.prototype.getDungeonName = function(e) {
                return n.default.instance.levelData[e].name;
            }, e.prototype.getLevelMoneyAdd = function(e, t) {
                return void 0 === t && (t = 1), n.default.instance.levelData[e].money_add;
            }, e.prototype.getLevelExpAdd = function(e, t) {
                return void 0 === t && (t = 1), n.default.instance.levelData[e].exp_add;
            }, e.prototype.getBetterEquipAdd = function(e, t) {
                return void 0 === t && (t = 1), n.default.instance.levelData[e].better_equip;
            }, e.prototype.getNeedGenerateMonster = function(e) {
                return n.default.instance.levelData[e].is_auto_attr;
            }, e.prototype.getOfflineCdByDiff = function(e, t) {
                var a = n.default.instance.levelData[e].normal_offline_cd;
                return 2 == t ? a = n.default.instance.levelData[e].diff_offline_cd : 3 == t && (a = n.default.instance.levelData[e].hell_offline_cd), 
                a;
            }, e._instance = null, e;
        }();
        a.default = s, cc._RF.pop();
    }, {
        "../common/allenum": "allenum",
        "../math/rand": "rand",
        "./data_manager": "data_manager",
        "./playerbuff_manager": "playerbuff_manager"
    } ],
    dynamic_data_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "de7cfniXgNLbbPf3uVOA0LQ", "dynamic_data_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../data/bag_item_data"), i = e("../ui/menu_ui_manager"), r = e("./data_manager"), o = e("../role/hero"), s = e("../util"), l = e("./playerbuff_manager"), c = e("../math/rand"), u = e("../common/emmiter"), d = e("../common/allenum"), p = e("../network/player_network"), m = e("../network/bag_network"), f = e("../battle/battle_manager"), g = e("./gem_manager"), h = e("../ui/bag_ui_manager"), _ = e("../ui/depot_ui_manager"), y = e("../ui/bag_control_ui_manager"), v = e("../ui/role_ui_manager"), b = e("./ui_manager"), D = e("../ui/chat_ui_manager"), I = e("../ui/battle_ui_manager"), P = function() {
            function e() {
                this.BagItemDataMap = {}, this.DepotItemDataMap = {}, this.EquipItemDataMap = {}, 
                this.GemItemDataMap = {}, this.curUseEquipPlanIndex = 0, this.EquipItemAllDatas = {}, 
                this.curDiff = 1, this.curLevel = 1, this.playerMaxLV = 1, this.playerMaxDiffLV = 1, 
                this.playerMaxHellLV = 1, this.roleName = "", this.serverUnix = 0, this.deltaUnix = 0, 
                this.id = "", this.playerLeftADShow = 0, this.signTotalCount = 0, this.canSign = !1, 
                this.missleadingGold = 0, this.missleadingDaimon = 0, this.isGetCollectionBonus = 0, 
                this.sceneID = 0, this.adID = 0, this.fromUserID = "", this.chatRoomID = 0, this.chatTemp = [], 
                this.referUserData = {}, this.virtualHero = null, this.virtualEquip = {}, this._goldNum = 0, 
                this._daimonNum = 0, this._mainPlayerEntity = null, this._playerBagCount = 1, this._playerDepotCount = 1, 
                this._newLiftCount = 0, this._curUseEquipPlanNum = 1;
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e(), this._instance.AltarBuffData = []), 
                    this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.UpdateServerTime = function(e) {
                this.serverUnix = e, this.deltaUnix = this.serverUnix - new Date().getTime() / 1e3;
            }, e.prototype.GetServerTime = function() {
                return new Date().getTime() / 1e3 + this.deltaUnix;
            }, e.prototype.AddGemItem = function(e) {
                this.GemItemDataMap[e] ? this.GemItemDataMap[e] = this.GemItemDataMap[e] + 1 : this.GemItemDataMap[e] = 1;
            }, e.prototype.ChangeGemItem = function(e, t) {
                this.GemItemDataMap[e] = this.GemItemDataMap[e] + t;
            }, e.prototype.AddGemItenByServer = function(e, t) {
                this.GemItemDataMap[e] = t;
            }, e.prototype.AddBagItem = function(e) {
                this.isBagFull() ? b.default.instance.LoadTipsByID("bag_count_limit") : m.default.instance.AddItemToBagRequest(e.baseId, e.additionAttr);
            }, e.prototype.AddBagItemByServer = function(e, t, a, i, r, o) {
                var s = new n.default(t, 1);
                s.index = e, s.lv = a, s.additionAttr = i, r && (s.holeNum = r), o && (s.gemIDs = o), 
                this.BagItemDataMap[e] = s;
            }, e.prototype.AddDepotItemByServer = function(e, t, a, i, r, o) {
                var s = new n.default(t, 1);
                s.index = e, s.lv = a, s.additionAttr = i, r && (s.holeNum = r), o && (s.gemIDs = o), 
                this.DepotItemDataMap[e] = s;
            }, e.prototype.AddEquipItemByServer = function(e, t, a, i, o, s) {
                var l = r.default.instance.equipmentData[t].type, c = new n.default(t, 1);
                c.index = e, c.lv = a, c.additionAttr = i, o && (c.holeNum = o), s && (c.gemIDs = s), 
                this.EquipItemDataMap[l] = c, this.addEquipAttrToPlayer(this.EquipItemDataMap[l]);
            }, e.prototype.DealAllEquipByServer = function(e, t, a, i, o, s, l) {
                var c = r.default.instance.equipmentData[t].type, u = new n.default(t, 1);
                u.index = e, u.lv = a, u.additionAttr = i, o && (u.holeNum = o), s && (u.gemIDs = s), 
                null == this.EquipItemAllDatas[l] && (this.EquipItemAllDatas[l] = []), this.EquipItemAllDatas[l][c] = u, 
                l == this.curUseEquipPlanIndex && (this.EquipItemDataMap[c] = u, this.addEquipAttrToPlayer(this.EquipItemDataMap[c]));
            }, e.prototype.AddBagItemFromDepot = function(e) {
                this.isBagFull() ? b.default.instance.LoadTipsByID("bag_count_limit") : this.DepotItemDataMap[e.index] && m.default.instance.AddItemFromDepotToBagRequest(e.index);
            }, e.prototype.AddBagItemFromDepotByServer = function(e) {
                this.BagItemDataMap[e] = this.DepotItemDataMap[e], delete this.DepotItemDataMap[e], 
                u.Emitter.fire(d.AlertType.BagAlert.toString()), _.default.instance.refreshBagUI();
            }, e.prototype.ChangeEquipPlanSuccess = function(t) {
                var a = f.default.instance.mainPlayer.hp, n = f.default.instance.mainPlayer.mp;
                for (var i in this.curUseEquipPlanIndex = t, null == this.EquipItemAllDatas[t] && (this.EquipItemAllDatas[t] = []), 
                this.EquipItemDataMap) this.removeEquipAttrToPlayer(this.EquipItemDataMap[i]);
                if (this.EquipItemDataMap = this.EquipItemAllDatas[t], null != this.EquipItemDataMap) for (var i in this.EquipItemDataMap) this.addEquipAttrToPlayer(this.EquipItemDataMap[i]);
                e.instance.getMainPlayer().fullfill(), a < f.default.instance.mainPlayer.maxhp && f.default.instance.mainPlayer.addHp(a - f.default.instance.mainPlayer.maxhp), 
                n < f.default.instance.mainPlayer.maxmp && f.default.instance.mainPlayer.addHp(n - f.default.instance.mainPlayer.maxmp), 
                b.default.instance.LoadRoleUI(), v.default.instance && v.default.instance.refreshAllEquipItem();
            }, e.prototype.GetItemBagTypeByIndex = function(e) {
                return this.BagItemDataMap[e] ? d.BagType.Common : this.DepotItemDataMap[e] ? d.BagType.Depot : d.BagType.Equip;
            }, e.prototype.AddDepotItemFromBag = function(e) {
                this.isDepotFull() ? b.default.instance.LoadTipsByID("depot_count_limit") : this.BagItemDataMap[e.index] && m.default.instance.AddItemFromBagToDepotRequest(e.index);
            }, e.prototype.AddDepotItemFromBagByServer = function(e) {
                this.DepotItemDataMap[e] = this.BagItemDataMap[e], delete this.BagItemDataMap[e], 
                h.default.instance.refreshBagUI();
            }, e.prototype.isDepotFull = function() {
                return s.default.len(this.DepotItemDataMap) >= this.playerDeportCount;
            }, Object.defineProperty(e.prototype, "bagGridCount", {
                get: function() {
                    return s.default.len(this.BagItemDataMap);
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.isBagFull = function() {
                return s.default.len(this.BagItemDataMap) >= this.playerBagCount;
            }, Object.defineProperty(e.prototype, "goldNum", {
                get: function() {
                    return this._goldNum;
                },
                set: function(e) {
                    this._goldNum = e, i.default.instance.updateGoldNum(this._goldNum);
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.changeGoldNum = function(e) {
                return e = Math.floor(e), this._goldNum + e >= 0 && (this._goldNum += e, i.default.instance.updateGoldNum(this._goldNum), 
                !0);
            }, e.prototype.changeMissleadingGold = function(e) {
                return this.missleadingGold += e, this.missleadingGold < 0 && (this.missleadingGold = 0), 
                s.default.GetLargeNumStr(this.missleadingGold);
            }, Object.defineProperty(e.prototype, "daimondNum", {
                get: function() {
                    return this._daimonNum;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "daimonNum", {
                set: function(e) {
                    this._daimonNum = e, i.default.instance.updateDaimondNum(this._daimonNum);
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.changeDaimonNum = function(e) {
                return e = Math.floor(e), this._daimonNum + e >= 0 && (this._daimonNum += e, i.default.instance.updateDaimondNum(this._daimonNum), 
                !0);
            }, e.prototype.changeMissleadingDaimon = function(e) {
                return this.missleadingDaimon += e, this.missleadingDaimon < 0 && (this.missleadingDaimon = 0), 
                s.default.GetLargeNumStr(this.missleadingDaimon);
            }, e.prototype.setMainPlayerEntity = function(e) {
                this._mainPlayerEntity = e;
            }, e.prototype.getMainPlayer = function() {
                return this._mainPlayerEntity;
            }, e.prototype.getMainPlayerLV = function() {
                return this.getMainPlayer() ? this.getMainPlayer().lv : 0;
            }, e.prototype.getMainPlayerLVParam = function() {
                return 50 * this.newLiftCount + this.getMainPlayerLV();
            }, e.prototype.EquipItem = function(e) {
                m.default.instance.AddItemFromBagToEquipRequest(e.index);
            }, e.prototype.EquipItemSuccess = function(e, t) {
                var a = this.BagItemDataMap[e], n = a.baseId, i = r.default.instance.equipmentData[n].type;
                delete this.BagItemDataMap[e], null == this.EquipItemAllDatas[t] && (this.EquipItemAllDatas[t] = []), 
                this.EquipItemAllDatas[t][i] = a, this.EquipItemDataMap[i] = this.EquipItemAllDatas[t][i], 
                this.addEquipAttrToPlayer(a), u.Emitter.fire(d.AlertType.BagAlert.toString()), y.default.instance.equipBodyServerCallback();
            }, e.prototype.getEquipItemByIndex = function(t) {
                for (var a in e.instance.EquipItemAllDatas) if (null != e.instance.EquipItemAllDatas[a]) for (var n in e.instance.EquipItemAllDatas[a]) if (t == e.instance.EquipItemAllDatas[a][n].index) return e.instance.EquipItemAllDatas[a][n];
                return null;
            }, e.prototype.getPlanIndexByEquipIndex = function(t) {
                for (var a in e.instance.EquipItemAllDatas) if (null != e.instance.EquipItemAllDatas[a]) for (var n in e.instance.EquipItemAllDatas[a]) if (t == e.instance.EquipItemAllDatas[a][n].index) return Number(a);
                return null;
            }, e.prototype.addAttrByType = function(e, t) {
                var a = this.getHeroIsVirtual();
                switch (e) {
                  case "伤害":
                    a.addDamage(t);
                    break;

                  case "最小伤害":
                    a.addMinDamage(t);
                    break;

                  case "伤害追加":
                    a.changeAddDamagePercent(t);
                    break;

                  case "最大伤害":
                    a.addMaxDamage(t);
                    break;

                  case "力量":
                    a.addBaseStrength(t);
                    break;

                  case "敏捷":
                    a.addBaseAgile(t);
                    break;

                  case "体力":
                    a.addBasePower(t);
                    break;

                  case "精神":
                    a.addBaseEnergy(t);
                    break;

                  case "生命":
                    a.changeMaxhp(t);
                    break;

                  case "生命追加":
                    a.changeAddHp(t);
                    break;

                  case "法力":
                    a.changeMaxmp(t);
                    break;

                  case "法力追加":
                    a.changeAddMp(t);
                    break;

                  case "行动力":
                    a.addSt(t);
                    break;

                  case "护甲":
                    a.addDf(t);
                    break;

                  case "护甲追加":
                    a.changeAddDf(t);
                    break;

                  case "攻击速度":
                    a.attInterval = 0.01;
                    break;

                  case "攻击加速":
                    a.AddAttIntervalReduce(t);
                    break;

                  case "暴击率":
                    a.changeCriticalRate(t);
                    break;

                  case "命中值":
                    a.changeHitValRate(t);
                    break;

                  case "命中追加":
                    a.changeAddHitVal(t);
                    break;

                  case "格挡值":
                    a.changeBlockValRate(t);
                    break;

                  case "杀怪回血":
                    a.changeKillAddHp(t);
                    break;

                  case "杀怪回法":
                    a.changeKillAddMp(t);
                    break;

                  case "攻击吸血":
                    a.changeAttAddHpPercent(t);
                    break;

                  case "攻击回法":
                    a.changeAttAddMpPercent(t);
                    break;

                  case "真实伤害":
                    a.changeRealDamage(t);
                    break;

                  case "最终减伤":
                    a.changeRealDefence(t);
                    break;

                  case "全元素增伤":
                    a.changeElementDamagePercent(t);
                    break;

                  case "全元素抗性":
                    a.changeElementDefence(t);
                    break;

                  case "冰冻伤害":
                    a.changeFrozenDamage(t);
                    break;

                  case "冰冻增伤":
                    a.changeFrozenDamagePercent(t);
                    break;

                  case "冰冻抗性":
                    a.changeFrozenDefence(t);
                    break;

                  case "闪电伤害":
                    a.changeLightDamage(t);
                    break;

                  case "闪电增伤":
                    a.changeLightDamagePercent(t);
                    break;

                  case "闪电抗性":
                    a.changeLightDefence(t);
                    break;

                  case "毒素伤害":
                    a.changePoisonDamage(t);
                    break;

                  case "毒素增伤":
                    a.changePoisonDamagePercent(t);
                    break;

                  case "毒素抗性":
                    a.changePoisonDefence(t);
                    break;

                  case "火焰伤害":
                    a.changeBlazeDamage(t);
                    break;

                  case "火焰增伤":
                    a.changeBlazeDamagePercent(t);
                    break;

                  case "火焰抗性":
                    a.changeBlazeDefence(t);
                    break;

                  case "金币获取增加":
                    a.changeAddGetCoin(t);
                    break;

                  case "经验获得增加":
                    a.changeAddExpRate(t);
                    break;

                  case "获得更高品质物品":
                    a.changeAddGetBetterEquip(t);
                    break;

                  case "遇怪速度":
                    a.createMonsterInterval = 0.1;
                    break;

                  case "更快遇到怪物":
                    a.changeCreateMonsterFaster(t);
                    break;

                  case "格挡追加":
                    a.changeAddBlockVal(t);
                }
            }, e.prototype.getHeroIsVirtual = function() {
                return 1 == this.isVirtual ? this.virtualHero : this.getMainPlayer();
            }, e.prototype.addEquipAttrToPlayer = function(e) {
                var t = e.getBaseAttr();
                for (var a in t) this.addAttrByType(a, t[a]);
                if (s.default.len(e.additionAttr) > 0) for (var n in e.additionAttr) {
                    var i = r.default.instance.equipPrefixData[n];
                    this.addAttrByType(i.attrtype, e.additionAttr[n]);
                }
                if (e.gemIDs.length > 0) for (var o in e.gemIDs) {
                    console.log("i:" + o);
                    a = g.default.instance.getAttrByGemIDAndEquipType(e.gemIDs[o], e.getEquipType());
                    for (var l in a) this.addAttrByType(l, a[l]);
                }
            }, e.prototype.removeEquipAttrToPlayer = function(e) {
                var t = e.getBaseAttr();
                for (var a in t) this.addAttrByType(a, -t[a]);
                if (s.default.len(e.additionAttr) > 0) for (var n in e.additionAttr) {
                    var i = r.default.instance.equipPrefixData[n];
                    this.addAttrByType(i.attrtype, -e.additionAttr[n]);
                }
                if (e.gemIDs.length > 0) for (var o in e.gemIDs) {
                    var l = g.default.instance.getAttrByGemIDAndEquipType(e.gemIDs[o], e.getEquipType());
                    for (var c in l) this.addAttrByType(c, -l[c]);
                }
            }, e.prototype.IsEquiping = function(t) {
                var a = r.default.instance.equipmentData[t.baseId].type;
                for (var n in this.EquipItemAllDatas) if (null != this.EquipItemAllDatas[n] && t == this.EquipItemAllDatas[n][a]) return Number(n) == e.instance.curUseEquipPlanIndex ? 1 : 2;
                return 0;
            }, e.prototype.IsBetterThanEquip = function(e) {
                var t = r.default.instance.equipmentData[e.baseId].type;
                return 1 == this.isVirtual ? !this.virtualEquip[t] || e.getEquipPoint() > this.virtualEquip[t].getEquipPoint() : !this.EquipItemDataMap[t] || e.getEquipPoint() > this.EquipItemDataMap[t].getEquipPoint();
            }, e.prototype.hasBetterEquip = function() {
                if (null != e.instance.BagItemDataMap) for (var t in this.BagItemDataMap) if (this.IsBetterThanEquip(this.BagItemDataMap[t])) return !0;
                return !1;
            }, e.prototype.TakeOffEquipItemNew = function(e) {
                m.default.instance.AddItemFromEquipToBagRequest(e.index);
            }, e.prototype.TakeOffEquipItemNewByServer = function(t, a) {
                var n = this.getEquipItemByIndex(t);
                if (n) {
                    var i = r.default.instance.equipmentData[n.baseId].type;
                    this.BagItemDataMap[n.index] = n, this.removeEquipAttrToPlayer(n), 1 == e.instance.isVirtual ? delete this.virtualEquip[i] : delete this.EquipItemDataMap[i], 
                    delete this.EquipItemAllDatas[a][i], y.default.instance && y.default.instance.takeOffEquipByServer();
                } else console.error("take off no this item:" + t);
            }, e.prototype.GetEquipByIndex = function(e) {
                return null != this.EquipItemDataMap[e] ? this.EquipItemDataMap[e] : null;
            }, e.prototype.GetVirtualEquipByIndex = function(e) {
                return null != this.virtualEquip[e] ? this.virtualEquip[e] : null;
            }, e.prototype.SellItem = function(e) {
                var t = e.index;
                m.default.instance.RemoveItemFromBagRequest(t);
            }, e.prototype.SellItemSuccess = function(e) {
                delete this.BagItemDataMap[e], h.default.instance.refreshBagUI(), u.Emitter.fire(d.AlertType.BagAlert.toString());
            }, e.prototype.SetItems = function(e) {
                for (var t = [], a = 0, n = e; a < n.length; a++) {
                    var i = n[a].index;
                    t.push(i);
                }
                t.length > 0 && (m.default.instance.FastRemoveItemFromBagRequest(t), u.Emitter.fire(d.AlertType.BagAlert.toString()));
            }, e.prototype.AddAltar = function(e) {
                if (console.error("AddAltar:" + e), s.default.IsContain(this.AltarBuffData, e)) console.log("已经存在这个BUFF了"); else {
                    var t = r.default.instance.atlarData[e].bufflv;
                    if (1 != t) {
                        var a = r.default.instance.getAltarDataByTypeAndLv(r.default.instance.atlarData[e].bufftype, t);
                        s.default.Remove(this.AltarBuffData, a.id);
                    }
                    if (this.AltarBuffData.push(e), p.default.instance.AddPlayerAltarBuff(e, 1), r.default.instance.atlarData[e].effect["BOSS区距离拉近"]) {
                        var n = r.default.instance.atlarData[e].effect["BOSS区距离拉近"];
                        n > .5 && (n = .5), f.default.instance.curBeatCount = Math.floor(f.default.instance.curBeatCount * (1 - n));
                    }
                    l.default.instance.updateBuff(r.default.instance.atlarData[e].effect);
                }
            }, e.prototype.AddAltarByServer = function(e) {
                s.default.IsContain(this.AltarBuffData, e) ? console.error("AddAltarByServer is contain " + e) : (this.AltarBuffData.push(e), 
                l.default.instance.updateBuff(r.default.instance.atlarData[e].effect));
            }, e.prototype.getCanLearnAltar = function() {
                var t = new Array(), a = r.default.instance.getAltarDataByMinLvType(e.instance.AltarBuffData);
                for (var n in a) t.push(a[n].id);
                if (t.length > 0) {
                    if (t.length <= 5) return t;
                    for (var i = 0; i < t.length; i++) {
                        var o = c.default.getRandomNum(0, t.length - 1), s = t[o];
                        t[o] = t[i], t[i] = s;
                    }
                    return t = t.slice(0, 5);
                }
                return null;
            }, Object.defineProperty(e.prototype, "playerBagCount", {
                get: function() {
                    return this._playerBagCount + l.default.instance.getBuffValue("背包格子数");
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.changePlayerBagCount = function(e) {
                this._playerBagCount = e;
            }, Object.defineProperty(e.prototype, "playerDeportCount", {
                get: function() {
                    return this._playerDepotCount + l.default.instance.getBuffValue("仓库格子数");
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.changePlayerDepotCount = function(e) {
                this._playerDepotCount = e;
            }, Object.defineProperty(e.prototype, "newLiftCount", {
                get: function() {
                    return this._newLiftCount;
                },
                set: function(e) {
                    this._newLiftCount = e;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.playerNewLift = function() {
                this._newLiftCount++;
            }, e.prototype.isGemNumberEnough = function(e) {
                var t = r.default.instance.monsterGemData[e];
                return this.GemItemDataMap[e] >= t.combine_num;
            }, Object.defineProperty(e.prototype, "curUseEquipPlanNum", {
                get: function() {
                    return this._curUseEquipPlanNum + l.default.instance.getBuffValue("装备方案");
                },
                set: function(e) {
                    this._curUseEquipPlanNum = e;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.ShowVirtualHeroData = function(t) {
                if (t == e.instance.curUseEquipPlanIndex) b.default.instance.LoadRoleUI(); else {
                    for (var a in this.virtualHero = new o.default(), this.virtualHero.clone(this.getMainPlayer()), 
                    null == this.EquipItemAllDatas[t] && (this.EquipItemAllDatas[t] = []), this.EquipItemDataMap) this.EquipItemDataMap[a] && this.removeEquipAttrToPlayer(this.EquipItemDataMap[a]);
                    if (this.virtualEquip = this.EquipItemAllDatas[t], null != this.virtualEquip) for (var a in this.virtualEquip) this.virtualEquip[a] && this.addEquipAttrToPlayer(this.virtualEquip[a]);
                    b.default.instance.LoadRoleUI(!0);
                }
                v.default.instance && v.default.instance.refreshAllEquipItem();
            }, e.prototype.saveChatMessage = function(e) {
                this.chatTemp.length > 50 && this.chatTemp.shift(), this.chatTemp.push(e), D.default.instance && D.default.instance.otherAsk(e), 
                I.default.instance.setCurChatText(e.PlayerName + ":" + e.Content);
            }, e._instance = null, e;
        }();
        a.default = P, cc._RF.pop();
    }, {
        "../battle/battle_manager": "battle_manager",
        "../common/allenum": "allenum",
        "../common/emmiter": "emmiter",
        "../data/bag_item_data": "bag_item_data",
        "../math/rand": "rand",
        "../network/bag_network": "bag_network",
        "../network/player_network": "player_network",
        "../role/hero": "hero",
        "../ui/bag_control_ui_manager": "bag_control_ui_manager",
        "../ui/bag_ui_manager": "bag_ui_manager",
        "../ui/battle_ui_manager": "battle_ui_manager",
        "../ui/chat_ui_manager": "chat_ui_manager",
        "../ui/depot_ui_manager": "depot_ui_manager",
        "../ui/menu_ui_manager": "menu_ui_manager",
        "../ui/role_ui_manager": "role_ui_manager",
        "../util": "util",
        "./data_manager": "data_manager",
        "./gem_manager": "gem_manager",
        "./playerbuff_manager": "playerbuff_manager",
        "./ui_manager": "ui_manager"
    } ],
    effect_control_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "58a163Ag2BEQJx3fdauoowc", "effect_control_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/effect_manager"), i = e("../../manager/resource_manager"), r = e("../../manager/wx_manager"), o = e("../../common/allenum"), s = e("../../common/emmiter"), l = cc._decorator, c = l.ccclass, u = l.property, d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.curSprite = null, t.curNode = null, t.keyName = "open_effect", t;
            }
            return __extends(t, e), t.prototype.start = function() {
                this.curNode.on("click", this.switch, this);
                s.Emitter.register(o.AlertType.GameStart.toString(), this.Init, this);
            }, t.prototype.Init = function() {
                var e = r.default.instance.getLocal(this.keyName);
                e && e == o.SettingStatus.Off && (this.curSprite.spriteFrame = i.default.instance.getCommonSprite("sit1"), 
                n.default.instance.isRemoveEffect = !0);
            }, t.prototype.switch = function() {
                n.default.instance.isRemoveEffect ? (this.curSprite.spriteFrame = i.default.instance.getCommonSprite("sit"), 
                n.default.instance.isRemoveEffect = !1, r.default.instance.setLocal(this.keyName, o.SettingStatus.On)) : (this.curSprite.spriteFrame = i.default.instance.getCommonSprite("sit1"), 
                n.default.instance.isRemoveEffect = !0, r.default.instance.setLocal(this.keyName, o.SettingStatus.Off));
            }, __decorate([ u(cc.Sprite) ], t.prototype, "curSprite", void 0), __decorate([ u(cc.Node) ], t.prototype, "curNode", void 0), 
            t = __decorate([ c ], t);
        }(cc.Component);
        a.default = d, cc._RF.pop();
    }, {
        "../../common/allenum": "allenum",
        "../../common/emmiter": "emmiter",
        "../../manager/effect_manager": "effect_manager",
        "../../manager/resource_manager": "resource_manager",
        "../../manager/wx_manager": "wx_manager"
    } ],
    effect_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "61406abjhxB+rvb+vxvnZSY", "effect_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./pool_manager"), i = e("./game_manager"), r = e("../audio_manager"), o = e("../controller/ui/add_hp_effect"), s = e("../controller/ui/add_mp_effect"), l = e("../controller/ui/add_exp_effect"), c = e("../controller/ui/damage_effect"), u = e("../ui/item/lvup_item"), d = e("../ui/combat_ui_manager"), p = e("./ui_manager"), m = function() {
            function e() {
                this.isRemoveEffect = !1;
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.PlayMissEffect = function(e) {
                if (!this.isRemoveEffect) {
                    var t = n.default.instance.CreateObjectByName("MissEffect", e);
                    t.getComponent(cc.Animation).play("miss_effect"), i.default.instance.scheduleOnce(function() {
                        n.default.instance.RemoveObjectByName("MissEffect", t);
                    }, 2), r.default.instance.PlaySo();
                }
            }, e.prototype.PlayBlockEffect = function(e) {
                if (!this.isRemoveEffect) {
                    var t = n.default.instance.CreateObjectByName("BlockEffect", e);
                    t.getComponent(cc.Animation).play("block_effect"), i.default.instance.scheduleOnce(function() {
                        n.default.instance.RemoveObjectByName("BlockEffect", t);
                    }, 2), r.default.instance.PlayBlock();
                }
            }, e.prototype.PlayDamageEffect = function(e, t, a, r, o, s, l) {
                if (!this.isRemoveEffect) {
                    var u = n.default.instance.CreateDamagerEffect(e);
                    u.getComponent(c.default).Init(t, a, r, o, s), u.getComponent(cc.Animation).play(l), 
                    i.default.instance.scheduleOnce(function() {
                        n.default.instance.RemoveDamagerEffect(u);
                    }, 2);
                }
            }, e.prototype.PlayAddHPEffect = function(e, t) {
                this.isRemoveEffect || n.default.instance.CreateObjectByName("AddHPEffect", e).getComponent(o.default).Init(t);
            }, e.prototype.PlayAddMPEffect = function(e, t) {
                this.isRemoveEffect || n.default.instance.CreateObjectByName("AddMPEffect", e).getComponent(s.default).Init(t);
            }, e.prototype.PlayAddExpEffect = function(e, t) {
                this.isRemoveEffect || n.default.instance.CreateObjectByName("AddEXPEffect", e).getComponent(l.default).Init(t);
            }, e.prototype.PlayBossWarmEffect = function() {
                this.isRemoveEffect || (p.default.instance.LoadBossComeUI(), r.default.instance.PlayWarning());
            }, e.prototype.PlayerLvUpEffect = function() {
                this.isRemoveEffect || u.default.instance.playerLvUpEffect();
            }, e.prototype.PlayerCombatEffectUp = function(e, t) {
                this.isRemoveEffect || d.default.instance.PlayCombatEffectAnim(e, t);
            }, e._instance = null, e;
        }();
        a.default = m, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../controller/ui/add_exp_effect": "add_exp_effect",
        "../controller/ui/add_hp_effect": "add_hp_effect",
        "../controller/ui/add_mp_effect": "add_mp_effect",
        "../controller/ui/damage_effect": "damage_effect",
        "../ui/combat_ui_manager": "combat_ui_manager",
        "../ui/item/lvup_item": "lvup_item",
        "./game_manager": "game_manager",
        "./pool_manager": "pool_manager",
        "./ui_manager": "ui_manager"
    } ],
    emmiter: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "18007OAkXxNPrkSYRHo8Hhx", "emmiter"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return e.register = function(t, a, n) {
                e.listeners[t] || (e.listeners[t] = []), e.listeners[t].push(new i(a, n));
            }, e.remove = function(t, a, n) {
                var i = e.listeners[t];
                if (i) {
                    for (var r = i.length, o = 0; o < r; o++) {
                        if (i[o].compar(n)) {
                            i.splice(o, 1);
                            break;
                        }
                    }
                    0 == i.length && delete e.listeners[t];
                }
            }, e.fire = function(t) {
                for (var a = [], n = 1; n < arguments.length; n++) a[n - 1] = arguments[n];
                var i = e.listeners[t];
                if (i) for (var r = i.length, o = 0; o < r; o++) {
                    var s = i[o];
                    s.notify.apply(s, [ t ].concat(a));
                }
            }, e.listeners = {}, e;
        }();
        a.Emitter = n;
        var i = function() {
            function e(e, t) {
                this.callback = null, this.context = null;
                this.callback = e, this.context = t;
            }
            return e.prototype.notify = function() {
                for (var e, t = [], a = 0; a < arguments.length; a++) t[a] = arguments[a];
                (e = this.callback).call.apply(e, [ this.context ].concat(t));
            }, e.prototype.compar = function(e) {
                return e == this.context;
            }, e;
        }();
        cc._RF.pop();
    }, {} ],
    entity: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "983055+PANClIFF8T0Zput2", "entity"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../data/buff_data"), i = cc._decorator, r = i.ccclass, o = (i.property, 
        function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.buffData = new n.default(), t._unSeperatePoint = 0, t._lv = 1, t._exp = 0, 
                t._lastAttTime = 0, t._attInterval = 1, t._attIntervalReduce = 0, t._strength = 0, 
                t._agile = 0, t._power = 0, t._energy = 0, t._hp = 0, t._maxhp = 0, t._addhp = 0, 
                t._mp = 0, t._maxmp = 0, t._addmp = 0, t._st = 0, t._addDamagePercent = 0, t._minDamage = 0, 
                t._maxDamage = 0, t._doubleAttack = 0, t._physicsDefenceRate = 0, t._df = 0, t._adddf = 0, 
                t._criticalRate = 0, t._hitVal = 1, t._addHitVal = 1, t._blockVal = 0, t._addBlockVal = 0, 
                t._killAddHp = 0, t._killAddMp = 0, t._attAddHpPercent = 0, t._attAddMpPercent = 0, 
                t._realDamage = 0, t._realDefence = 0, t._elementDamagePercent = 0, t._elementDefence = 0, 
                t._frozenDamage = 0, t._frozenDamagePercent = 0, t._frozenDefence = 0, t._lightDamage = 0, 
                t._lightDamagePercent = 0, t._lightDefence = 0, t._blazeDamage = 0, t._blazeDamagePercent = 0, 
                t._blazeDefence = 0, t._poisonDamage = 0, t._poisonDamagePercent = 0, t._poisonDefence = 0, 
                t._addGetCoin = 0, t._addExpRate = 0, t._addGetBetterEquip = 0, t._createMonsterInterval = 2, 
                t._createMonsterFaster = 0, t._lastCreateMonsterTime = 0, t;
            }
            return __extends(t, e), t.prototype.init = function(e, t, a, n, i, r, o, s) {
                this._strength = e, this._agile = t, this._power = a, this._energy = n, this._hp = i, 
                this._mp = r, this._st = o, this._df = s, this._maxhp = i, this._maxmp = r;
            }, t.prototype.init2 = function(e, t, a, n) {
                this._minDamage = e, this._maxDamage = t, this._doubleAttack = a, this._realDamage = n;
            }, t.prototype.initAllToDefault = function() {
                this._lv = 1, this._unSeperatePoint = 0, this._exp = 0, this._attInterval = 1, this._attIntervalReduce = 0, 
                this._strength = 0, this._agile = 0, this._power = 0, this._energy = 0, this._hp = 0, 
                this._maxhp = 0, this._addhp = 0, this._mp = 0, this._maxmp = 0, this._addmp = 0, 
                this._st = 0, this._addDamagePercent = 0, this._minDamage = 0, this._maxDamage = 0, 
                this._doubleAttack = 0, this._df = 0, this._adddf = 0, this._criticalRate = 0, this._hitVal = 0, 
                this._addHitVal = 0, this._blockVal = 0, this._killAddHp = 0, this._killAddMp = 0, 
                this._attAddHpPercent = 0, this._attAddMpPercent = 0, this._realDamage = 0, this._realDefence = 0, 
                this._elementDamagePercent = 0, this._elementDefence = 0, this._frozenDamage = 0, 
                this._frozenDamagePercent = 0, this._frozenDefence = 0, this._lightDamage = 0, this._lightDamagePercent = 0, 
                this._lightDefence = 0, this._blazeDamage = 0, this._blazeDamagePercent = 0, this._blazeDefence = 0, 
                this._poisonDamage = 0, this._poisonDamagePercent = 0, this._poisonDefence = 0, 
                this._addGetCoin = 0, this._addExpRate = 0, this._addGetBetterEquip = 0, this._createMonsterInterval = 2, 
                this._createMonsterFaster = 0, this._lastCreateMonsterTime = 0;
            }, t.prototype.fullfill = function() {
                this._hp = this.maxhp, this._mp = this.maxmp;
            }, Object.defineProperty(t.prototype, "unSeperatePoint", {
                get: function() {
                    return this._unSeperatePoint;
                },
                set: function(e) {
                    this._unSeperatePoint = e;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "lv", {
                get: function() {
                    return this._lv;
                },
                set: function(e) {
                    this._lv = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.addLV = function(e) {
                this._lv = this._lv + e, this._unSeperatePoint = this._unSeperatePoint + e, this._hp = this.maxhp, 
                this._mp = this.maxmp;
            }, Object.defineProperty(t.prototype, "exp", {
                get: function() {
                    return this._exp;
                },
                set: function(e) {
                    this._exp = e;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "lastAttTime", {
                get: function() {
                    return this._lastAttTime;
                },
                set: function(e) {
                    this._lastAttTime = e;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "attIntervalReduce", {
                get: function() {
                    var e = this._attIntervalReduce + this.buffData.getBuffValue("攻击加速");
                    return e < -.9 ? -.9 : e;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "attInterval", {
                get: function() {
                    return this._attInterval / (1 + this.attIntervalReduce) > .05 ? this._attInterval / (1 + this.attIntervalReduce) : .05;
                },
                set: function(e) {
                    this._attInterval = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.AddAttIntervalReduce = function(e) {
                this._attIntervalReduce += e;
            }, t.prototype.setAttIntervalReduce = function(e) {
                this._attIntervalReduce = e;
            }, t.prototype.canAttack = function() {
                return this.attInterval < this.lastAttTime;
            }, Object.defineProperty(t.prototype, "strength", {
                get: function() {
                    return this._strength;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.addBaseStrength = function(e) {
                return this._strength += e, this.changeMaxhp(100 * e), this._minDamage += 4 * e, 
                this._maxDamage += 4 * e, this._addDamagePercent += .01 * e, !0;
            }, t.prototype.addBaseStrengthByPoint = function(e) {
                return !(this._unSeperatePoint < 0) && (this._unSeperatePoint < e && (e = this._unSeperatePoint), 
                this._unSeperatePoint -= e, this._strength += e, this.changeMaxhp(100 * e), this._minDamage += 4 * e, 
                this._maxDamage += 4 * e, this._addDamagePercent += .01 * e, !0);
            }, Object.defineProperty(t.prototype, "agile", {
                get: function() {
                    return this._agile;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.addBaseAgile = function(e) {
                return this._agile += e, this._minDamage += 2 * e, this._maxDamage += 2 * e, this._hitVal += 15 * e, 
                this._addDamagePercent += .01 * e, !0;
            }, t.prototype.addBaseAgileByPoint = function(e) {
                return !(this._unSeperatePoint < 0) && (this._unSeperatePoint < e && (e = this._unSeperatePoint), 
                this._agile += e, this._minDamage += 2 * e, this._maxDamage += 2 * e, this._hitVal += 15 * e, 
                this._addDamagePercent += .01 * e, this._unSeperatePoint -= e, !0);
            }, Object.defineProperty(t.prototype, "power", {
                get: function() {
                    return this._power;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.addBasePower = function(e) {
                return this._power += e, this.changeMaxhp(200 * e), this._adddf += .01 * e, !0;
            }, t.prototype.addBasePowerByPoint = function(e) {
                return !(this._unSeperatePoint < 0) && (this._unSeperatePoint < e && (e = this._unSeperatePoint), 
                this._unSeperatePoint -= e, this._power += e, this.changeMaxhp(200 * e), this._adddf += .01 * e, 
                !0);
            }, Object.defineProperty(t.prototype, "energy", {
                get: function() {
                    return this._energy;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.addBaseEnergy = function(e) {
                return this._energy += e, this.changeMaxmp(10 * e), this._elementDamagePercent += .005 * e, 
                !0;
            }, t.prototype.addBaseEnergyByPoint = function(e) {
                return !(this._unSeperatePoint <= 0) && (this._unSeperatePoint < e && (e = this._unSeperatePoint), 
                this._unSeperatePoint -= e, this._energy += e, this.changeMaxmp(10 * e), this._elementDamagePercent += .005 * e, 
                !0);
            }, Object.defineProperty(t.prototype, "hp", {
                get: function() {
                    return this._hp;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.addHp = function(e) {
                this._hp += e, this._hp > this.maxhp && (this._hp = this.maxhp);
            }, Object.defineProperty(t.prototype, "maxhp", {
                get: function() {
                    return Math.floor(this._maxhp * (1 + this.addhp));
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeMaxhp = function(e) {
                this._maxhp += e, this._hp > this.maxhp && (this._hp = this.maxhp);
            }, Object.defineProperty(t.prototype, "addhp", {
                get: function() {
                    return this._addhp;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeAddHp = function(e) {
                this._addhp += e;
            }, Object.defineProperty(t.prototype, "mp", {
                get: function() {
                    return this._mp;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.costMp = function(e) {
                this._mp -= e, this._mp < 0 && (this._mp = 0);
            }, Object.defineProperty(t.prototype, "maxmp", {
                get: function() {
                    return Math.floor(this._maxmp * (1 + this.addmp));
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeMaxmp = function(e) {
                this._maxmp += e, this._mp > this._maxmp && (this._mp = this._maxmp);
            }, t.prototype.addMp = function(e) {
                this._mp += e, this._mp > this.maxmp && (this._mp = this.maxmp);
            }, Object.defineProperty(t.prototype, "addmp", {
                get: function() {
                    return this._addmp;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeAddMp = function(e) {
                this._addmp += e;
            }, Object.defineProperty(t.prototype, "st", {
                get: function() {
                    return this._st;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.addSt = function(e) {
                this._st += e;
            }, Object.defineProperty(t.prototype, "addDamagePercent", {
                get: function() {
                    return this._addDamagePercent;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeAddDamagePercent = function(e) {
                this._addDamagePercent += e;
            }, Object.defineProperty(t.prototype, "minDamage", {
                get: function() {
                    return Math.floor(this._minDamage * (1 + this.addDamagePercent));
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.addMinDamage = function(e) {
                this._minDamage += e;
            }, Object.defineProperty(t.prototype, "maxDamage", {
                get: function() {
                    return this._maxDamage < this._minDamage ? Math.floor((this._minDamage + 1) * (1 + this.addDamagePercent)) : Math.floor(this._maxDamage * (1 + this.addDamagePercent));
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.addMaxDamage = function(e) {
                this._maxDamage += e;
            }, t.prototype.addDamage = function(e) {
                this._minDamage += e, this._maxDamage += e;
            }, Object.defineProperty(t.prototype, "doubleAttack", {
                get: function() {
                    return this._doubleAttack;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "physicsDefenceRate", {
                get: function() {
                    return this._physicsDefenceRate < 0 ? 0 : this._physicsDefenceRate > 1 ? 1 : this._physicsDefenceRate;
                },
                set: function(e) {
                    this._physicsDefenceRate = e;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "df", {
                get: function() {
                    return Math.floor(this._df * (1 + this._adddf));
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.addDf = function(e) {
                this._df += e;
            }, Object.defineProperty(t.prototype, "adddf", {
                get: function() {
                    return this._adddf;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeAddDf = function(e) {
                this._adddf += e;
            }, t.prototype.beingHit = function(e) {
                this._hp = this._hp - e, this._hp < 0 && (this._hp = 0);
            }, t.prototype.isDead = function() {
                return this._hp <= 0;
            }, t.prototype.getCurPercentLife = function() {
                return this._hp / this._maxhp;
            }, Object.defineProperty(t.prototype, "criticalRate", {
                get: function() {
                    return this._criticalRate;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeCriticalRate = function(e) {
                this._criticalRate += e;
            }, Object.defineProperty(t.prototype, "hitVal", {
                get: function() {
                    return Math.floor(this._hitVal * (1 + this._addHitVal));
                },
                set: function(e) {
                    this._hitVal = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeHitValRate = function(e) {
                this._hitVal += e;
            }, Object.defineProperty(t.prototype, "addHitVal", {
                get: function() {
                    return this._addHitVal + this.buffData.getBuffValue("命中追加");
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeAddHitVal = function(e) {
                this._addHitVal += e;
            }, Object.defineProperty(t.prototype, "blockVal", {
                get: function() {
                    return Math.floor(this._blockVal * (1 + this.addBlockVal));
                },
                set: function(e) {
                    this._blockVal = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeBlockValRate = function(e) {
                this._blockVal += e;
            }, Object.defineProperty(t.prototype, "addBlockVal", {
                get: function() {
                    return this._addBlockVal;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeAddBlockVal = function(e) {
                this._addBlockVal += e;
            }, Object.defineProperty(t.prototype, "killAddHp", {
                get: function() {
                    return this._killAddHp;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeKillAddHp = function(e) {
                this._killAddHp += e;
            }, Object.defineProperty(t.prototype, "killAddMp", {
                get: function() {
                    return this._killAddMp;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeKillAddMp = function(e) {
                this._killAddMp += e;
            }, Object.defineProperty(t.prototype, "attAddHpPercent", {
                get: function() {
                    return this._attAddHpPercent + this.buffData.getBuffValue("攻击吸血");
                },
                set: function(e) {
                    this._attAddHpPercent = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeAttAddHpPercent = function(e) {
                this._attAddHpPercent += e;
            }, Object.defineProperty(t.prototype, "attAddMpPercent", {
                get: function() {
                    return this._attAddMpPercent;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeAttAddMpPercent = function(e) {
                this._attAddMpPercent += e;
            }, Object.defineProperty(t.prototype, "realDamage", {
                get: function() {
                    return this._realDamage;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeRealDamage = function(e) {
                this._realDamage += e;
            }, Object.defineProperty(t.prototype, "realDefence", {
                get: function() {
                    return this._realDefence;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeRealDefence = function(e) {
                this._realDefence += e;
            }, t.prototype.getDizzinessDefence = function() {
                return this.buffData.getBuffValue("眩晕抗性");
            }, Object.defineProperty(t.prototype, "elementDamagePercent", {
                get: function() {
                    return this._elementDamagePercent;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeElementDamagePercent = function(e) {
                this._elementDamagePercent += e;
            }, Object.defineProperty(t.prototype, "elementDefence", {
                get: function() {
                    return this._elementDefence >= 1 ? 1 : this._elementDefence;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeElementDefence = function(e) {
                this._elementDefence += e;
            }, Object.defineProperty(t.prototype, "frozenDamage", {
                get: function() {
                    return this._frozenDamage * (1 + this.frozenDamagePercent);
                },
                set: function(e) {
                    this._frozenDamage = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeFrozenDamage = function(e) {
                this._frozenDamage += e;
            }, Object.defineProperty(t.prototype, "frozenDamagePercent", {
                get: function() {
                    return this._frozenDamagePercent + this.elementDamagePercent + this.buffData.getBuffValue("冻冰增伤");
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeFrozenDamagePercent = function(e) {
                this._frozenDamagePercent += e;
            }, Object.defineProperty(t.prototype, "frozenDefence", {
                get: function() {
                    var e = this._frozenDefence + this.elementDefence + this.buffData.getBuffValue("冻冰抗性");
                    return e >= 1 ? 1 : e;
                },
                set: function(e) {
                    this._frozenDefence = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeFrozenDefence = function(e) {
                this._frozenDefence += e;
            }, Object.defineProperty(t.prototype, "lightDamage", {
                get: function() {
                    return this._lightDamage * (1 + this.lightDamagePercent);
                },
                set: function(e) {
                    this._lightDamage = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeLightDamage = function(e) {
                this._lightDamage += e;
            }, Object.defineProperty(t.prototype, "lightDamagePercent", {
                get: function() {
                    return this._lightDamagePercent + this.elementDamagePercent + this.buffData.getBuffValue("闪电增伤");
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeLightDamagePercent = function(e) {
                this._lightDamagePercent += e;
            }, Object.defineProperty(t.prototype, "lightDefence", {
                get: function() {
                    var e = this._lightDefence + this.elementDefence + this.buffData.getBuffValue("闪电抗性");
                    return e >= 1 ? 1 : e;
                },
                set: function(e) {
                    this._lightDefence = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeLightDefence = function(e) {
                this._lightDefence += e;
            }, Object.defineProperty(t.prototype, "blazeDamage", {
                get: function() {
                    return this._blazeDamage * (1 + this.blazeDamagePercent);
                },
                set: function(e) {
                    this._blazeDamage = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeBlazeDamage = function(e) {
                this._blazeDamage += e;
            }, Object.defineProperty(t.prototype, "blazeDamagePercent", {
                get: function() {
                    return this._blazeDamagePercent + this.elementDamagePercent + this.buffData.getBuffValue("火焰增伤");
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeBlazeDamagePercent = function(e) {
                this._blazeDamagePercent += e;
            }, Object.defineProperty(t.prototype, "blazeDefence", {
                get: function() {
                    var e = this._blazeDefence + this.elementDefence + this.buffData.getBuffValue("火焰抗性");
                    return e >= 1 ? 1 : e;
                },
                set: function(e) {
                    this._blazeDefence = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeBlazeDefence = function(e) {
                this._blazeDefence += e;
            }, Object.defineProperty(t.prototype, "poisonDamage", {
                get: function() {
                    return this._poisonDamage * (1 + this.poisonDamagePercent);
                },
                set: function(e) {
                    this._poisonDamage = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changePoisonDamage = function(e) {
                this._poisonDamage += e;
            }, Object.defineProperty(t.prototype, "poisonDamagePercent", {
                get: function() {
                    return this._poisonDamagePercent + this.elementDamagePercent + this.buffData.getBuffValue("毒素增伤");
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changePoisonDamagePercent = function(e) {
                this._poisonDamagePercent += e;
            }, Object.defineProperty(t.prototype, "poisonDefence", {
                get: function() {
                    var e = this._poisonDefence + this.elementDefence + this.buffData.getBuffValue("毒素抗性");
                    return e >= 1 ? 1 : e;
                },
                set: function(e) {
                    this._poisonDefence = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changePoisonDefence = function(e) {
                this._poisonDefence += e;
            }, Object.defineProperty(t.prototype, "addGetCoin", {
                get: function() {
                    return this._addGetCoin;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeAddGetCoin = function(e) {
                this._addGetCoin += e;
            }, Object.defineProperty(t.prototype, "getAddExpRate", {
                get: function() {
                    return this._addExpRate;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeAddExpRate = function(e) {
                this._addExpRate += e;
            }, Object.defineProperty(t.prototype, "addGetBetterEquip", {
                get: function() {
                    return this._addGetBetterEquip;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeAddGetBetterEquip = function(e) {
                this._addGetBetterEquip += e;
            }, Object.defineProperty(t.prototype, "createMonsterInterval", {
                get: function() {
                    return this._createMonsterInterval / (1 + this.createMonsterFaster);
                },
                set: function(e) {
                    this._createMonsterInterval = e;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "createMonsterFaster", {
                get: function() {
                    return this._createMonsterFaster;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.changeCreateMonsterFaster = function(e) {
                this._createMonsterFaster += e;
            }, Object.defineProperty(t.prototype, "lastCreateMonsterTime", {
                get: function() {
                    return this._lastCreateMonsterTime;
                },
                set: function(e) {
                    this._lastCreateMonsterTime = e;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.canAction = function() {
                return !(this.buffData.getBuffValue("眩晕") > .01);
            }, Object.defineProperty(t.prototype, "isBoss", {
                get: function() {
                    return !1;
                },
                enumerable: !0,
                configurable: !0
            }), t = __decorate([ r ], t);
        }(cc.Component));
        a.default = o, cc._RF.pop();
    }, {
        "../data/buff_data": "buff_data"
    } ],
    equip_hero_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "b51ffHROk9I96pxtKOpNFwe", "equip_hero_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/dynamic_data_manager"), i = e("../../manager/data_manager"), r = e("../../manager/resource_manager"), o = e("../bag_control_ui_manager"), s = e("../../manager/ui_manager"), l = cc._decorator, c = l.ccclass, u = l.property, d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.button = null, t.spriteIcon = null, t.spriteBg = null, t.nodeBg = null, 
                t.curItemData = null, t.heroEquipIndex = 1, t;
            }
            return __extends(t, e), t.prototype.onLoad = function() {
                this.button.node.on("click", this.showItemInfo, this);
            }, t.prototype.onEnable = function() {
                this.refreshItem();
            }, t.prototype.refreshItem = function() {
                var e;
                if (null != (e = 1 == n.default.instance.isVirtual ? n.default.instance.GetVirtualEquipByIndex(this.heroEquipIndex) : n.default.instance.GetEquipByIndex(this.heroEquipIndex))) {
                    this.curItemData = e, this.spriteIcon.node.active = !0;
                    var t = i.default.instance.equipmentData[e.baseId].icon_path;
                    this.spriteIcon.spriteFrame = r.default.instance.getEquipSprite(t), this.spriteBg.spriteFrame = r.default.instance.getEquipSprite(this.curItemData.getQualitySpriteName()), 
                    this.nodeBg.active = !1;
                } else this.spriteIcon.node.active = !1, this.spriteBg.spriteFrame = r.default.instance.getEquipSprite("equip1"), 
                this.nodeBg.active = !0;
            }, t.prototype.showItemInfo = function() {
                s.default.instance.LoadEquipInfoTips(this.curItemData), s.default.instance.LoadBagControlUI("equiping"), 
                o.default.instance && o.default.instance.setEquipHeroItem(this);
            }, __decorate([ u(cc.Button) ], t.prototype, "button", void 0), __decorate([ u(cc.Sprite) ], t.prototype, "spriteIcon", void 0), 
            __decorate([ u(cc.Sprite) ], t.prototype, "spriteBg", void 0), __decorate([ u(cc.Node) ], t.prototype, "nodeBg", void 0), 
            __decorate([ u ], t.prototype, "heroEquipIndex", void 0), t = __decorate([ c ], t);
        }(cc.Component);
        a.default = d, cc._RF.pop();
    }, {
        "../../manager/data_manager": "data_manager",
        "../../manager/dynamic_data_manager": "dynamic_data_manager",
        "../../manager/resource_manager": "resource_manager",
        "../../manager/ui_manager": "ui_manager",
        "../bag_control_ui_manager": "bag_control_ui_manager"
    } ],
    equipinfo_tip_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "956f6nKTDhCv7hyUmxRETOd", "equipinfo_tip_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/data_manager"), i = e("../manager/pool_manager"), r = e("../manager/dynamic_data_manager"), o = e("../util"), s = e("../manager/resource_manager"), l = e("../manager/help_manager"), c = e("../audio_manager"), u = e("./bag_tip_gem_show_ui"), d = e("./bag_control_ui_manager"), p = cc._decorator, m = p.ccclass, f = p.property, g = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.maskNode = null, t.nodeAttrs = null, t.labelName = null, 
                t.labelDesc = null, t.labelSellPrice = null, t.labelEquipPoint = null, t.labelEquipLv = null, 
                t.spriteIcon = null, t.spriteQualityGrid = null, t.curBagItemData = null, t.curGemShowUI = null, 
                t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideBagUI, this), this.uiNode.active && (this.uiNode.active = !1);
            }, t.prototype.hideBagUI = function() {
                this.uiNode.active = !1, d.default.instance.hideAll();
            }, t.prototype.refresh = function() {
                this.initItemTipContent();
            }, t.prototype.initItemTipContent = function() {
                var e = n.default.instance.equipmentData[this.curBagItemData.baseId];
                this.labelName.string = this.curBagItemData.getName(), this.labelName.node.color = this.curBagItemData.getNameColor(), 
                this.labelDesc.string = e.desc, this.spriteIcon.spriteFrame = s.default.instance.getEquipSprite(e.icon_path), 
                this.spriteQualityGrid.spriteFrame = s.default.instance.getEquipSprite(this.curBagItemData.getQualitySpriteName());
                for (var t = this.nodeAttrs.children, a = t.length - 1; a >= 0; a--) i.default.instance.RemoveLabel(t[a]);
                var c = this.curBagItemData.getBaseAttr();
                for (var u in c) {
                    var d = i.default.instance.CreateLabel(this.nodeAttrs);
                    d.getComponent(cc.Label).string = l.default.instance.getAttrShowStr(u, c[u]), d.color = cc.Color.WHITE;
                }
                if (o.default.len(this.curBagItemData.additionAttr) > 0) for (var p in this.curBagItemData.additionAttr) {
                    var m = n.default.instance.equipPrefixData[p], f = i.default.instance.CreateLabel(this.nodeAttrs);
                    f.getComponent(cc.Label).string = l.default.instance.getAttrShowStr(m.attrtype, this.curBagItemData.additionAttr[p]), 
                    f.color = cc.Color.GREEN;
                }
                this.curBagItemData.holeNum > 0 ? (this.curGemShowUI.node.active = !0, this.curGemShowUI.initByItemData(this.curBagItemData)) : this.curGemShowUI.node.active = !1, 
                this.uiNode.active = !0, this.labelEquipLv.string = "装备等级: " + e.lv, this.labelEquipPoint.string = "装备评分: " + this.curBagItemData.getEquipPoint().toString(), 
                this.labelSellPrice.string = "售价：" + o.default.GetLargeNumStr(Math.floor(this.curBagItemData.getSellPrice() * (1 + r.default.instance.getMainPlayer().altarAddGetCoin)));
            }, t.prototype.showEquipTip = function(e) {
                c.default.instance.PlayUISelect(), this.curBagItemData = e, this.initItemTipContent();
            }, t.instance = null, __decorate([ f(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ f(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ f(cc.Node) ], t.prototype, "nodeAttrs", void 0), 
            __decorate([ f(cc.Label) ], t.prototype, "labelName", void 0), __decorate([ f(cc.Label) ], t.prototype, "labelDesc", void 0), 
            __decorate([ f(cc.Label) ], t.prototype, "labelSellPrice", void 0), __decorate([ f(cc.Label) ], t.prototype, "labelEquipPoint", void 0), 
            __decorate([ f(cc.Label) ], t.prototype, "labelEquipLv", void 0), __decorate([ f(cc.Sprite) ], t.prototype, "spriteIcon", void 0), 
            __decorate([ f(cc.Sprite) ], t.prototype, "spriteQualityGrid", void 0), __decorate([ f(u.default) ], t.prototype, "curGemShowUI", void 0), 
            t = a = __decorate([ m ], t);
        }(cc.Component);
        a.default = g, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../manager/data_manager": "data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/help_manager": "help_manager",
        "../manager/pool_manager": "pool_manager",
        "../manager/resource_manager": "resource_manager",
        "../util": "util",
        "./bag_control_ui_manager": "bag_control_ui_manager",
        "./bag_tip_gem_show_ui": "bag_tip_gem_show_ui"
    } ],
    event_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "ace70PhhvRJpZu4aVp/Xcz8", "event_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/data_manager"), i = e("../../manager/random_event_manager"), r = e("../../util"), o = e("../../manager/dynamic_data_manager"), s = e("../../manager/sprite_manager"), l = e("../../manager/resource_manager"), c = e("../../manager/ui_manager"), u = cc._decorator, d = u.ccclass, p = u.property, m = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelDesc = null, t.labelTime = null, t.labelBonus = null, t.nodeLabelBg = null, 
                t.btnSelect = null, t.spriteBg = null, t.curIndex = 0, t.lastEventID = 0, t.isNeedRefresh = !0, 
                t;
            }
            return __extends(t, e), t.prototype.onLoad = function() {
                this.btnSelect.node.on("click", this.onClick, this);
            }, t.prototype.onInit = function() {
                var e = i.default.instance.getEventDataByIndex(this.curIndex);
                if (e) {
                    this.isNeedRefresh = !1, this.labelBonus.node.active = !1, this.labelTime.node.active = !1, 
                    this.nodeLabelBg.active = !1;
                    var t = i.default.instance.getEventByIndex(this.curIndex);
                    this.lastEventID = e.id, t.canTrigger() ? (this.spriteBg.spriteFrame = l.default.instance.getEventSprite(e.pic_path), 
                    this.labelDesc.string = e.desc, 2 == e.type ? (this.nodeLabelBg.active = !0, this.labelBonus.node.active = !0, 
                    "gold" == e.param ? this.labelBonus.string = t.bonusNum.toString() + " 金币" : "daimond" == e.param ? this.labelBonus.string = t.bonusNum.toString() + " 钻石" : "equipment" == e.param ? this.labelBonus.string = "稀有装备" + t.bonusNum.toString() + " 件" : "sprite" == e.param && (this.labelBonus.string = "稀有精灵" + t.bonusNum.toString() + " 个")) : 4 == e.type ? (this.nodeLabelBg.active = !0, 
                    this.labelBonus.node.active = !0, this.labelBonus.string = e.info) : 5 == e.type && (this.nodeLabelBg.active = !0, 
                    this.labelBonus.node.active = !0, this.labelBonus.string = e.info)) : (this.labelDesc.string = "等待刷新", 
                    this.spriteBg.spriteFrame = l.default.instance.getEventSprite("waiting"), this.labelTime.node.active = !0);
                }
            }, t.prototype.update = function() {
                var e = i.default.instance.getEventByIndex(this.curIndex);
                if (e) {
                    if (this.isNeedRefresh) return void this.onInit();
                    e.canTrigger() && this.labelTime.node.active ? this.onInit() : e.isWaitingRefresh() ? (this.labelTime.node.active || (this.labelTime.node.active = !0, 
                    this.onInit()), this.labelTime.string = r.default.getTimeFormat(e.nextFreshTime)) : this.isNeedRefresh = !0;
                }
            }, t.prototype.onClick = function() {
                i.default.instance.getEventByIndex(this.curIndex).canTrigger() ? this.trigger() : c.default.instance.LoadTipsByID("event_is_triggered");
            }, t.prototype.trigger = function() {
                this.checkCondition() && i.default.instance.triggerEvent(this.curIndex);
            }, t.prototype.checkCondition = function() {
                var e = n.default.instance.randomEventData[this.lastEventID];
                if (2 == e.type && "sprite" == e.param) {
                    if (s.default.instance.isFullSpriteBag()) return c.default.instance.LoadTipsByID("sprite_count_limit"), 
                    !1;
                } else if (2 == e.type && "equipment" == e.param) {
                    if (o.default.instance.isBagFull()) return c.default.instance.LoadTipsByID("bag_count_limit"), 
                    !1;
                } else if (4 == e.type && o.default.instance.getMainPlayer().isDead()) return c.default.instance.LoadTipsByStr("勇者，请先回复状态再来挑战！"), 
                !1;
                return !0;
            }, __decorate([ p(cc.Label) ], t.prototype, "labelDesc", void 0), __decorate([ p(cc.Label) ], t.prototype, "labelTime", void 0), 
            __decorate([ p(cc.Label) ], t.prototype, "labelBonus", void 0), __decorate([ p(cc.Node) ], t.prototype, "nodeLabelBg", void 0), 
            __decorate([ p(cc.Button) ], t.prototype, "btnSelect", void 0), __decorate([ p(cc.Sprite) ], t.prototype, "spriteBg", void 0), 
            __decorate([ p ], t.prototype, "curIndex", void 0), t = __decorate([ d ], t);
        }(cc.Component);
        a.default = m, cc._RF.pop();
    }, {
        "../../manager/data_manager": "data_manager",
        "../../manager/dynamic_data_manager": "dynamic_data_manager",
        "../../manager/random_event_manager": "random_event_manager",
        "../../manager/resource_manager": "resource_manager",
        "../../manager/sprite_manager": "sprite_manager",
        "../../manager/ui_manager": "ui_manager",
        "../../util": "util"
    } ],
    event_network: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "2c255lktmhFabFDOOU2BLz8", "event_network"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../common/emmiter"), i = e("../manager/network_manager"), r = e("../common/message"), o = e("../manager/random_event_manager"), s = e("../manager/game_manager"), l = e("../manager/ui_manager"), c = function() {
            function e() {}
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.init = function() {
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerNewEventResponse, r.MessageType.GamePlay), this.PlayerNewEventResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.GetEventCardDataResponse, r.MessageType.GamePlay), this.GetEventCardDataResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerTriggerEventResponse, r.MessageType.GamePlay), this.PlayerTriggerEventResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.ShareRefreshEventResponse, r.MessageType.GamePlay), this.ShareRefreshEventResponse, this);
            }, e.prototype.PlayerNewEventRequest = function(e, t, a) {
                var n = {
                    ID: Number(t),
                    Index: Number(e),
                    BonusNum: Number(a)
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerNewEventRequest, r.MessageType.GamePlay, n);
            }, e.prototype.PlayerNewEventResponse = function(e, t) {
                o.default.instance.addEventByNetwork(t.ID, t.NextTime, t.BonusNum, t.IsTrigger, t.Index, t.TriggerTime);
            }, e.prototype.GetEventCardDataRequest = function() {
                i.NetworkManager.SendMessage(r.MessageNo.GetEventCardDataRequest, r.MessageType.GamePlay, {});
            }, e.prototype.GetEventCardDataResponse = function(e, t) {
                console.log("----------\x3e GetEventCardDataResponse:" + JSON.stringify(t)), o.default.instance.initEventByNetwork(t), 
                s.default.instance.CheckedOneInit(), console.log("done");
            }, e.prototype.PlayerTriggerEventRequest = function(e) {
                var t = {
                    Index: Number(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerTriggerEventRequest, r.MessageType.GamePlay, t);
            }, e.prototype.PlayerTriggerEventResponse = function(e, t) {
                t.IsOk ? o.default.instance.triggerCallBack(t.EventData) : l.default.instance.LoadTipsByID("事件异常，请重新登录。");
            }, e.prototype.ShareRefreshEventRequest = function(e, t, a, n, o, s, l) {
                var c = {
                    ID1: Number(e),
                    BonusNum1: Number(t),
                    ID2: Number(a),
                    BonusNum2: Number(n),
                    ID3: Number(o),
                    BonusNum3: Number(s),
                    IsCard: l
                };
                i.NetworkManager.SendMessage(r.MessageNo.ShareRefreshEventRequest, r.MessageType.GamePlay, c);
            }, e.prototype.ShareRefreshEventResponse = function(e, t) {
                t.IsOk ? l.default.instance.LoadTipsByStr("事件刷新成功") : l.default.instance.LoadTipsByStr("今日分享次数已满");
            }, e._instance = null, e;
        }();
        a.default = c, cc._RF.pop();
    }, {
        "../common/emmiter": "emmiter",
        "../common/message": "message",
        "../manager/game_manager": "game_manager",
        "../manager/network_manager": "network_manager",
        "../manager/random_event_manager": "random_event_manager",
        "../manager/ui_manager": "ui_manager"
    } ],
    game_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "41b0bBXEkdCVqdco4lraHIN", "game_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../common/allenum"), i = e("./resource_manager"), r = e("../ui/skill_ui_manager"), o = e("../battle/battle_manager"), s = e("./data_manager"), l = e("./dynamic_data_manager"), c = e("../ui/menu_ui_manager"), u = e("../common/emmiter"), d = e("./network_manager"), p = e("../common/message"), m = e("../network/player_network"), f = e("./dungeon_data_manager"), g = e("../ui/battle_ui_manager"), h = e("./blackmarket_manager"), _ = e("../network/sprite_network"), y = e("../network/bag_network"), v = e("../network/event_network"), b = e("../common/config"), D = e("./wx_manager"), I = e("../network/achievement_network"), P = e("../ui/item/ad_item"), B = e("../ui/item/add_to_my_program_item"), S = e("../network/gem_network"), R = e("./ui_manager"), k = e("./guide_manager"), A = cc._decorator, M = A.ccclass, N = A.property, w = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.gameStatus = n.GameStatus.GameBegin, t.maskNode = null, t.mainCanvas = null, 
                t.token = "xuzhipingtest", t.btnLogin = null, t.editboxAccount = null, t.isConnecting = !1, 
                t.curConnectTime = 0, t.maxConnectTime = 5, t.pingDelayCount = 0, t.pingDelay = 0, 
                t.sendPingTime = 0, t.serverPongTime = 0, t.tipsBg = null, t.tipsLabel = null, t.NeedInitDataCount = 0, 
                t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.btnLogin.node.on("click", this.logintest, this);
                this.schedule(function(e) {
                    this.GamePlayPing();
                }, 2), D.default.instance.checkUpdate();
            }, t.prototype.start = function() {
                this.gameStatus = n.GameStatus.LoadResource, u.Emitter.register(d.NetworkManager.GetEventID(p.MessageNo.NewConnectResponse, p.MessageType.Login), this.NewConnectResponse, this), 
                u.Emitter.register(d.NetworkManager.GetEventID(p.MessageNo.PongResponse, p.MessageType.GamePlay), this.PongResponse, this);
            }, t.prototype.logintest = function() {
                var e = this.editboxAccount.string;
                "" != e ? (this.token = e, this.editboxAccount.node.parent.active = !1, a.instance.startLogin()) : R.default.instance.LoadTipsByStr("请输入账号");
            }, t.prototype.startLogin = function() {
                v.default.instance.init(), m.default.instance.init(), _.default.instance.init(), 
                y.default.instance.init(), I.default.instance.init(), S.default.instance.init(), 
                d.NetworkManager.initNetwork();
            }, t.prototype.ReInitNetwork = function() {
                a.instance.scheduleOnce(function() {
                    d.NetworkManager.initNetwork();
                }, 3);
            }, t.prototype.PlayerBeingKickOffline = function(e, t) {
                a.instance.gameStatus = n.GameStatus.BeingKickOffline, d.NetworkManager.DisconnectTest(), 
                "" != e ? R.default.instance.LoadMessageBox(e, t) : R.default.instance.LoadMessageBox("账号冲突", "您有别的客户端登录，此账号被下线。请重新登录");
            }, t.prototype.NewConnectResponse = function(e, t) {
                if (console.log("----------\x3e NewConnectResponse"), t.IsOk) {
                    this.isConnecting = !1;
                    var a = "";
                    0 != l.default.instance.adID ? (a = "wx_ad_" + l.default.instance.adID, 0 != l.default.instance.sceneID && (a += "_sceneid_" + l.default.instance.sceneID)) : 0 != l.default.instance.sceneID && (a = "wx_sceneid_" + l.default.instance.sceneID);
                    this.token = "oWT_j5MWsnnGjKqJ8X_1vHmL3gqc";
                    var n = {
                        Token: this.token,
                        ComeFrom: a,
                        ReferUserID: l.default.instance.fromUserID
                    };
                    d.NetworkManager.SetGameStart(), d.NetworkManager.SendMessage(p.MessageNo.GetUserInfoRequest, p.MessageType.GamePlay, n);
                } else console.log("error ,reconnect");
            }, t.prototype.RequireAllNetworkInitData = function() {
                a.instance.NeedInitDataCount = 7, d.NetworkManager.SendMessage(p.MessageNo.GetPlayerAltarBuffRequest, p.MessageType.GamePlay, {}), 
                d.NetworkManager.SendMessage(p.MessageNo.GetPlayerSkillRequest, p.MessageType.GamePlay, {}), 
                _.default.instance.GetPlayerSpriteRequest(), y.default.instance.GetBagRequest(), 
                y.default.instance.GetDepotRequest(), y.default.instance.GetEquipRequest(), v.default.instance.GetEventCardDataRequest();
            }, t.prototype.CheckedOneInit = function() {
                a.instance.NeedInitDataCount--, console.log("player network data init process :" + a.instance.NeedInitDataCount), 
                0 == a.instance.NeedInitDataCount && this.InitGame();
            }, t.prototype.InitGame = function() {
                l.default.instance.getMainPlayerLVParam() < 100 && k.default.instance.Init(), l.default.instance.getMainPlayerLV() > 5 && P.default.instance.setCloseShowTime(), 
                l.default.instance.getMainPlayerLV() > 30 && (R.default.instance.LoadNoticeUI(), 
                0 == l.default.instance.isGetCollectionBonus && (B.default.instance.showInfo(), 
                1104 == l.default.instance.sceneID && m.default.instance.GetCollectionBounsRequest())), 
                "" == l.default.instance.roleName && l.default.instance.getMainPlayerLV() > 30 && R.default.instance.LoadChangeNameUI(), 
                r.default.instance.resetSkillItem();
                var e = s.default.instance.globalValueData.base_bag_count.params;
                l.default.instance.changePlayerBagCount(e);
                var t = s.default.instance.globalValueData.base_depot_count.params;
                l.default.instance.changePlayerDepotCount(t);
                var a = s.default.instance.globalValueData.player_default_daimond.params;
                l.default.instance.changeDaimonNum(a);
                var i = s.default.instance.globalValueData.player_default_gold.params;
                l.default.instance.changeGoldNum(i);
                var u = f.default.instance.getBossBattleCount(l.default.instance.curLevel);
                g.default.instance.updateLevelInfo(l.default.instance.curLevel, 0, u), g.default.instance.updateLvExp(l.default.instance.getMainPlayerLV(), l.default.instance.getMainPlayer().exp), 
                g.default.instance.updatePlayerName();
                var d = l.default.instance.getMainPlayerLVParam();
                h.default.instance.updateBlackMarketGoods(d), o.default.instance.setNormalBattle(), 
                c.default.instance.initAlertStatus(), this.mainCanvas.getComponent(cc.Animation).play("start_game"), 
                this.maskNode.active = !1, this.gameStatus = n.GameStatus.GamePlaying;
            }, t.prototype.update = function(e) {
                this.gameStatus == n.GameStatus.LoadResource && i.default.instance.Inited && (this.gameStatus = n.GameStatus.Login, 
                this.startGameShow()), this.gameStatus == n.GameStatus.GamePlaying ? d.NetworkManager.IsDrop() && this.tryReconneting() : this.gameStatus == n.GameStatus.TryReconnect && d.NetworkManager.IsDrop() && (this.isConnecting ? (this.curConnectTime += e, 
                this.curConnectTime > this.maxConnectTime && (this.tryReconneting(!0), this.curConnectTime = 0)) : this.tryReconneting());
            }, t.prototype.startGameShow = function() {
                o.default.instance.InitGameShow(), this.maskNode.on("click", this.startGame, this), 
                u.Emitter.fire(n.AlertType.GameStart.toString());
            }, t.prototype.startGame = function() {
                this.maskNode.active = !1, "undefined" != typeof wx ? (D.default.instance.InitData(), 
                wx.onShow(function(e) {
                    console.log("onshow:", e);
                    var t = e.query, a = (t.gdt_vid, t.weixinadinfo), n = 0;
                    a && (n = a.split(".")[0]);
                    l.default.instance.sceneID = e.scene, 0 != n && (l.default.instance.adID = n), 1104 == l.default.instance.sceneID && 0 == l.default.instance.isGetCollectionBonus && m.default.instance.GetCollectionBounsRequest();
                }), wx.login({
                    success: function(e) {
                        e.code ? (a.instance.tipsBg.active = !0, a.instance.tipsLabel.string = "登录中，请稍后...", 
                        wx.request({
                            url: b.Config.WechatChatLoginUrl,
                            data: {
                                code: e.code,
                                version: b.Config.VersionCode
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            success: function(e) {
                                a.instance.tipsBg.active = !1, a.instance.token = e.data.Token, e.data.ServerIP && (b.Config.ServerIP = e.data.ServerIP), 
                                a.instance.startLogin();
                            },
                            fail: function(e) {
                                console.log("网络不通,登陆授权失败"), a.instance.startGame();
                            }
                        })) : (console.log("登录失败！" + e.errMsg), a.instance.startGame());
                    },
                    fail: function(e) {
                        console.log("请求失败"), a.instance.startGame();
                    }
                })) : (this.editboxAccount.node.parent.active = !0, this.maskNode.active = !1);
            }, t.prototype.tryReconneting = function(e) {
                void 0 === e && (e = !1), (e || this.gameStatus != n.GameStatus.TryReconnect) && (console.log("try reconnect"), 
                this.isConnecting = !0, this.gameStatus = n.GameStatus.TryReconnect, d.NetworkManager.DisconnectTest(), 
                d.NetworkManager.ReconnectToServer(), this.tipsBg.active = !0, this.tipsLabel.string = "正在重连...");
            }, t.prototype.GamePlayPing = function() {
                if (this.gameStatus == n.GameStatus.GamePlaying) {
                    var e = new Date();
                    this.sendPingTime = e.getTime(), this.sendPingTime - this.serverPongTime > 4e3 ? (this.pingDelayCount++, 
                    this.pingDelayCount >= 3 && (this.tryReconneting(), this.pingDelayCount = 0)) : (this.pingDelayCount = 0, 
                    1 == this.tipsBg.active && (this.tipsBg.active = !1));
                    d.NetworkManager.SendMessage(p.MessageNo.PingRequest, p.MessageType.GamePlay, {});
                }
            }, t.prototype.PongResponse = function(e, t) {
                var a = new Date();
                this.serverPongTime = a.getTime();
            }, t.prototype.PlayerReconnectSuccee = function() {
                this.gameStatus = n.GameStatus.GamePlaying, this.isConnecting = !1, this.tipsBg.active = !1;
            }, t.prototype.PlayerReconnectFailResponse = function(e, t) {
                console.log("PlayerReconnectFailResponse:" + JSON.stringify(t));
            }, t.instance = null, __decorate([ N(cc.Node) ], t.prototype, "maskNode", void 0), 
            __decorate([ N(cc.Node) ], t.prototype, "mainCanvas", void 0), __decorate([ N(cc.Button) ], t.prototype, "btnLogin", void 0), 
            __decorate([ N(cc.EditBox) ], t.prototype, "editboxAccount", void 0), __decorate([ N(cc.Node) ], t.prototype, "tipsBg", void 0), 
            __decorate([ N(cc.Label) ], t.prototype, "tipsLabel", void 0), t = a = __decorate([ M ], t);
        }(cc.Component);
        a.default = w, cc._RF.pop();
    }, {
        "../battle/battle_manager": "battle_manager",
        "../common/allenum": "allenum",
        "../common/config": "config",
        "../common/emmiter": "emmiter",
        "../common/message": "message",
        "../network/achievement_network": "achievement_network",
        "../network/bag_network": "bag_network",
        "../network/event_network": "event_network",
        "../network/gem_network": "gem_network",
        "../network/player_network": "player_network",
        "../network/sprite_network": "sprite_network",
        "../ui/battle_ui_manager": "battle_ui_manager",
        "../ui/item/ad_item": "ad_item",
        "../ui/item/add_to_my_program_item": "add_to_my_program_item",
        "../ui/menu_ui_manager": "menu_ui_manager",
        "../ui/skill_ui_manager": "skill_ui_manager",
        "./blackmarket_manager": "blackmarket_manager",
        "./data_manager": "data_manager",
        "./dungeon_data_manager": "dungeon_data_manager",
        "./dynamic_data_manager": "dynamic_data_manager",
        "./guide_manager": "guide_manager",
        "./network_manager": "network_manager",
        "./resource_manager": "resource_manager",
        "./ui_manager": "ui_manager",
        "./wx_manager": "wx_manager"
    } ],
    gem_equip_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "b180822o3VHOIdIrAoj1ShF", "gem_equip_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/dynamic_data_manager"), i = e("../manager/pool_manager"), r = e("./item/bag_item"), o = e("../common/allenum"), s = e("../audio_manager"), l = cc._decorator, c = l.ccclass, u = l.property, d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.bagUINode = null, t.maskNode = null, t.bagContentViewNode = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideBagUI, this), this.bagUINode.active && (this.bagUINode.active = !1);
            }, t.prototype.showUI = function() {
                s.default.instance.PlayUISelect(), this.bagUINode.active = !0, this.refreshBagUI();
            }, t.prototype.refreshBagUI = function() {
                for (var e = this.bagContentViewNode.children, t = e.length - 1; t >= 0; t--) i.default.instance.RemoveBagItem(e[t]);
                if (null != n.default.instance.EquipItemAllDatas) for (var a in n.default.instance.EquipItemAllDatas) if (null != a) for (var s in n.default.instance.EquipItemAllDatas[a]) if (n.default.instance.EquipItemAllDatas[a][s].canEquipGem()) {
                    var l = i.default.instance.CreateBagItem(this.bagContentViewNode).getComponent(r.default);
                    l.reinit(n.default.instance.EquipItemAllDatas[a][s], o.GridType.PreGemEquipItem), 
                    l.setEquipingTag(Number(a) + 1);
                }
                if (null != n.default.instance.BagItemDataMap) for (var c in n.default.instance.BagItemDataMap) {
                    if (n.default.instance.BagItemDataMap[c].canEquipGem()) i.default.instance.CreateBagItem(this.bagContentViewNode).getComponent(r.default).reinit(n.default.instance.BagItemDataMap[c], o.GridType.PreGemEquipItem);
                }
            }, t.prototype.hideBagUI = function() {
                this.bagUINode.active = !1;
            }, t.instance = null, __decorate([ u(cc.Node) ], t.prototype, "bagUINode", void 0), 
            __decorate([ u(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ u(cc.Node) ], t.prototype, "bagContentViewNode", void 0), 
            t = a = __decorate([ c ], t);
        }(cc.Component);
        a.default = d, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../common/allenum": "allenum",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/pool_manager": "pool_manager",
        "./item/bag_item": "bag_item"
    } ],
    gem_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "7fb94Rt309AJKkt3/J0bYnZ", "gem_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./data_manager"), i = cc._decorator, r = i.ccclass, o = (i.property, 
        function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this;
            }
            var a;
            return __extends(t, e), a = t, Object.defineProperty(t, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new a()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.getAttrByGemIDAndEquipType = function(e, t) {
                var a = n.default.instance.monsterGemData[e];
                return a ? 1 == t || 2 == t ? a.wepon_attr : 8 == t || 9 == t ? a.welt_attr : a.other_attr : {};
            }, t.prototype.getGemSpriteName = function(e) {
                var t = n.default.instance.monsterGemData[e];
                if (t) return t.icon_path;
            }, t._instance = null, t = a = __decorate([ r ], t);
        }(cc.Component));
        a.default = o, cc._RF.pop();
    }, {
        "./data_manager": "data_manager"
    } ],
    gem_network: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "92c40CfwcRN/Yomn+benQDd", "gem_network"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../common/emmiter"), i = e("../manager/network_manager"), r = e("../common/message"), o = e("../ui/equipinfo_tip_manager"), s = e("../common/allenum"), l = e("../manager/dynamic_data_manager"), c = e("../ui/bag_ui_manager"), u = e("../ui/role_ui_manager"), d = e("../manager/ui_manager"), p = function() {
            function e() {}
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.init = function() {
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.AddEquipHoleResponse, r.MessageType.GamePlay), this.AddEquipHoleResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.AddMonsterGemFromBagToEquipResponse, r.MessageType.GamePlay), this.AddMonsterGemFromBagToEquipResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.AddMonsterGemFromEquipToBagResponse, r.MessageType.GamePlay), this.AddMonsterGemFromEquipToBagResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.AddMonsterGemResponse, r.MessageType.GamePlay), this.AddMonsterGemResponse, this);
            }, e.prototype.AddEquipHoleRequest = function(e, t) {
                var a = {
                    BagType: Number(e),
                    Index: Number(t)
                };
                i.NetworkManager.SendMessage(r.MessageNo.AddEquipHoleRequest, r.MessageType.GamePlay, a);
            }, e.prototype.AddEquipHoleResponse = function(e, t) {
                if (t.IsOk) {
                    if (t.BagType == s.BagType.Common) (a = l.default.instance.BagItemDataMap[t.Index]) && a.holeNum++; else if (t.BagType == s.BagType.Equip) {
                        var a;
                        (a = l.default.instance.getEquipItemByIndex(t.Index)) && a.holeNum++;
                    }
                    o.default.instance.refresh();
                } else d.default.instance.LoadTipsByStr("打孔失败");
            }, e.prototype.AddMonsterGemFromBagToEquipRequest = function(e, t, a) {
                var n = {
                    BagType: Number(e),
                    Index: Number(t),
                    BaseID: Number(a)
                };
                i.NetworkManager.SendMessage(r.MessageNo.AddMonsterGemFromBagToEquipRequest, r.MessageType.GamePlay, n);
            }, e.prototype.AddMonsterGemFromEquipToBagRequest = function(e, t, a) {
                var n = {
                    BagType: Number(e),
                    Index: Number(t),
                    BaseID: Number(a)
                };
                i.NetworkManager.SendMessage(r.MessageNo.AddMonsterGemFromEquipToBagRequest, r.MessageType.GamePlay, n);
            }, e.prototype.AddMonsterGemFromBagToEquipResponse = function(e, t) {
                if (t.IsOk) {
                    var a = t.BaseID;
                    if (l.default.instance.GemItemDataMap[a]--, t.BagType == s.BagType.Common) (n = l.default.instance.BagItemDataMap[t.Index]) && n.addGem(a); else if (t.BagType == s.BagType.Equip) {
                        var n;
                        if (n = l.default.instance.getEquipItemByIndex(t.Index)) l.default.instance.getPlanIndexByEquipIndex(t.Index) == l.default.instance.curUseEquipPlanIndex ? (l.default.instance.removeEquipAttrToPlayer(n), 
                        n.addGem(a), l.default.instance.addEquipAttrToPlayer(n)) : n.addGem(a);
                    }
                    o.default.instance.refresh(), c.default.instance.refreshBagUI();
                } else d.default.instance.LoadTipsByID("gem_mosaic_fail");
            }, e.prototype.AddMonsterGemFromEquipToBagResponse = function(e, t) {
                console.log("----------\x3e AddMonsterGemFromEquipToBagResponse:" + JSON.stringify(t));
                var a = null;
                if (t.IsOk) {
                    var n = t.BaseID;
                    if (l.default.instance.GemItemDataMap[n]++, t.BagType == s.BagType.Common) (a = l.default.instance.BagItemDataMap[t.Index]) && a.removeGem(n); else if (t.BagType == s.BagType.Equip) {
                        if (a = l.default.instance.getEquipItemByIndex(t.Index)) l.default.instance.getPlanIndexByEquipIndex(t.Index) == l.default.instance.curUseEquipPlanIndex ? (l.default.instance.removeEquipAttrToPlayer(a), 
                        a.removeGem(n), l.default.instance.addEquipAttrToPlayer(a)) : 1 == l.default.instance.isVirtual ? (l.default.instance.removeEquipAttrToPlayer(a), 
                        a.removeGem(n), l.default.instance.addEquipAttrToPlayer(a)) : a.removeGem(n);
                        u.default.instance && u.default.instance.updateBaseAttr(l.default.instance.isVirtual);
                    }
                    c.default.instance && c.default.instance.refreshBagUI(), d.default.instance.LoadEquipInfoTips(a);
                } else d.default.instance.LoadTipsByStr("异常错误");
            }, e.prototype.AddMonsterGemResponse = function(e, t) {
                for (var a in t) l.default.instance.ChangeGemItem(Number(a), Number(t[a]));
            }, e._instance = null, e;
        }();
        a.default = p, cc._RF.pop();
    }, {
        "../common/allenum": "allenum",
        "../common/emmiter": "emmiter",
        "../common/message": "message",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/network_manager": "network_manager",
        "../manager/ui_manager": "ui_manager",
        "../ui/bag_ui_manager": "bag_ui_manager",
        "../ui/equipinfo_tip_manager": "equipinfo_tip_manager",
        "../ui/role_ui_manager": "role_ui_manager"
    } ],
    gem_tip_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "5ff2bkY/25J0ZUlIRGbw9xx", "gem_tip_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../audio_manager"), i = e("../manager/data_manager"), r = e("../manager/resource_manager"), o = e("../manager/help_manager"), s = e("../manager/dynamic_data_manager"), l = e("../manager/cost_manager"), c = e("../network/player_network"), u = e("../manager/ui_manager"), d = cc._decorator, p = d.ccclass, m = d.property, f = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.maskNode = null, t.spriteGem = null, t.spriteGemBg = null, 
                t.labelName = null, t.labelDesc = null, t.labelWeapon = null, t.labelRing = null, 
                t.labelDefence = null, t.labelNum = null, t.btnEquip = null, t.btnCombine = null, 
                t.curGemID = 0, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideBagUI, this);
            }, t.prototype.start = function() {
                this.btnCombine.node.on("click", this.OnClickBtnCombine, this), this.btnEquip.node.on("click", this.OnClickEquip, this);
            }, t.prototype.hideBagUI = function() {
                this.uiNode.active = !1;
            }, t.prototype.hideContentTip = function() {}, t.prototype.showGemItemTip = function(e, t) {
                this.uiNode.active = !0, n.default.instance.PlayUISelect();
                var a = i.default.instance.monsterGemData[e];
                this.spriteGemBg.spriteFrame = r.default.instance.getCommonSprite(a.quality_icon), 
                this.spriteGem.spriteFrame = r.default.instance.getEquipSprite(a.icon_path), this.labelName.string = a.name, 
                a.desc && (this.labelDesc.string = a.desc);
                var s = "";
                for (var l in a.wepon_attr) s += o.default.instance.getAttrShowStr(l, a.wepon_attr[l]) + "    ";
                this.labelWeapon.string = s;
                var c = "";
                for (var l in a.welt_attr) c += o.default.instance.getAttrShowStr(l, a.welt_attr[l]) + "    ";
                this.labelRing.string = c;
                var u = "";
                for (var l in a.other_attr) u += o.default.instance.getAttrShowStr(l, a.other_attr[l]) + "    ";
                this.labelDefence.string = u, this.labelNum.string = "拥有数量：" + t.toString(), 0 == a.next_id ? this.btnCombine.node.active = !1 : this.btnCombine.node.active = !0, 
                this.curGemID = e;
            }, t.prototype.OnClickEquip = function() {
                u.default.instance.LoadBagControlUIGemValue(this.curGemID), u.default.instance.LoadGemEquipUI(), 
                this.hideBagUI();
            }, t.prototype.OnClickBtnCombine = function() {
                if (0 != s.default.instance.isGemNumberEnough(this.curGemID)) {
                    var e = i.default.instance.monsterGemData[this.curGemID];
                    if (l.default.instance.cost(e.combine_cost)) {
                        var t = "是否确认花费以下资源来合成一个" + i.default.instance.monsterGemData[e.next_id].name;
                        u.default.instance.LoadMessageBox("魔晶合成", t, this.OnClickSureCombine, e.combine_cost);
                    }
                } else u.default.instance.LoadTipsByStr("魔晶数量不足");
            }, t.prototype.OnClickSureCombine = function(e) {
                1 == e && a.instance.SendMessageToServer();
            }, t.prototype.IsCurGemEnough = function() {
                this.showGemItemTip(this.curGemID, s.default.instance.GemItemDataMap[this.curGemID]), 
                0 == s.default.instance.GemItemDataMap[this.curGemID] && this.hideBagUI();
            }, t.prototype.SendMessageToServer = function() {
                c.default.instance.BlendMonsterGemRequest(this.curGemID);
            }, t.prototype.OnClickCancelCombine = function() {}, t.instance = null, __decorate([ m(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ m(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ m(cc.Sprite) ], t.prototype, "spriteGem", void 0), 
            __decorate([ m(cc.Sprite) ], t.prototype, "spriteGemBg", void 0), __decorate([ m(cc.Label) ], t.prototype, "labelName", void 0), 
            __decorate([ m(cc.Label) ], t.prototype, "labelDesc", void 0), __decorate([ m(cc.Label) ], t.prototype, "labelWeapon", void 0), 
            __decorate([ m(cc.Label) ], t.prototype, "labelRing", void 0), __decorate([ m(cc.Label) ], t.prototype, "labelDefence", void 0), 
            __decorate([ m(cc.Label) ], t.prototype, "labelNum", void 0), __decorate([ m(cc.Button) ], t.prototype, "btnEquip", void 0), 
            __decorate([ m(cc.Button) ], t.prototype, "btnCombine", void 0), t = a = __decorate([ p ], t);
        }(cc.Component);
        a.default = f, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../manager/cost_manager": "cost_manager",
        "../manager/data_manager": "data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/help_manager": "help_manager",
        "../manager/resource_manager": "resource_manager",
        "../manager/ui_manager": "ui_manager",
        "../network/player_network": "player_network"
    } ],
    guide_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "fe7fci6/DpEK6t+MKxsst1a", "guide_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./dynamic_data_manager"), i = e("../ui/guide_ui_manager"), r = e("../common/allenum"), o = e("../battle/battle_manager"), s = e("../ui/menu_ui_manager"), l = e("./ui_manager"), c = e("../ui/random_event_ui_manager"), u = e("../ui/battle_ui_manager"), d = e("../ui/today_reward_ui"), p = e("./reward_manager"), m = e("./random_event_manager"), f = e("./sprite_manager"), g = e("./achievenment_manager"), h = cc._decorator, _ = h.ccclass, y = h.property, v = function() {
            function e() {
                this.ID = 0, this.NextStep = 0, this.GuideDesc = "", this.VecPos = cc.Vec2.ZERO, 
                this.VecArrow = cc.Vec2.ZERO, this.RotaionArrow = 0, this.EventType = r.GuildEventType.TapMonster, 
                this.IsFirst = !1;
            }
            return e.prototype.initPos = function() {
                switch (this.EventType) {
                  case r.GuildEventType.TapMonster:
                    this.VecPos = new cc.Vec2(0, -402);
                    var e = o.default.instance.monsterNode.parent.convertToWorldSpaceAR(o.default.instance.monsterNode.position), t = i.default.instance.nodeContent.convertToNodeSpaceAR(e);
                    this.VecArrow = new cc.Vec2(t.x, t.y - 40), this.RotaionArrow = 0;
                    break;

                  case r.GuildEventType.Sign:
                    this.VecPos = new cc.Vec2(0, -402);
                    e = u.default.instance.btnSign.node.parent.convertToWorldSpaceAR(u.default.instance.btnSign.node.position), 
                    t = i.default.instance.nodeContent.convertToNodeSpaceAR(e);
                    this.VecArrow = new cc.Vec2(t.x, t.y - 70), this.RotaionArrow = 0;
                    break;

                  case r.GuildEventType.OpenAchievement:
                    this.VecPos = new cc.Vec2(0, -402);
                    e = u.default.instance.btnAchievement.node.parent.convertToWorldSpaceAR(u.default.instance.btnAchievement.node.position), 
                    t = i.default.instance.nodeContent.convertToNodeSpaceAR(e);
                    this.VecArrow = new cc.Vec2(t.x, t.y - 70), this.RotaionArrow = 0;
                    break;

                  case r.GuildEventType.ShowOfflineReward:
                    this.VecPos = new cc.Vec2(0, -402);
                    e = u.default.instance.labelLevelCoin.node.parent.convertToWorldSpaceAR(u.default.instance.labelLevelCoin.node.position), 
                    t = i.default.instance.nodeContent.convertToNodeSpaceAR(e);
                    this.VecArrow = new cc.Vec2(t.x + 30, t.y - 40), this.RotaionArrow = 0;
                    break;

                  case r.GuildEventType.OpenSprite:
                    this.VecPos = new cc.Vec2(0, -402);
                    var a = s.default.instance.buttonSprite.node.parent.convertToWorldSpaceAR(s.default.instance.buttonSprite.node.position), n = i.default.instance.nodeContent.convertToNodeSpaceAR(a);
                    this.VecArrow = new cc.Vec2(n.x, n.y + 60), this.RotaionArrow = 180;
                    break;

                  case r.GuildEventType.OpenBag:
                    this.VecPos = new cc.Vec2(0, -402);
                    a = s.default.instance.bagButton.node.parent.convertToWorldSpaceAR(s.default.instance.bagButton.node.position), 
                    n = i.default.instance.nodeContent.convertToNodeSpaceAR(a);
                    this.VecArrow = new cc.Vec2(n.x, n.y + 60), this.RotaionArrow = 180;
                    break;

                  case r.GuildEventType.OpenRole:
                    this.VecPos = new cc.Vec2(0, -402);
                    a = s.default.instance.roleButton.node.parent.convertToWorldSpaceAR(s.default.instance.roleButton.node.position), 
                    n = i.default.instance.nodeContent.convertToNodeSpaceAR(a);
                    this.VecArrow = new cc.Vec2(n.x, n.y + 60), this.RotaionArrow = 180;
                    break;

                  case r.GuildEventType.DailyReward:
                    this.VecPos = new cc.Vec2(0, -402);
                    a = d.default.instance.node.parent.convertToWorldSpaceAR(d.default.instance.node.position), 
                    n = i.default.instance.nodeContent.convertToNodeSpaceAR(a);
                    this.VecArrow = new cc.Vec2(n.x, n.y - 60), this.RotaionArrow = 0;
                    break;

                  case r.GuildEventType.EventCardBonus:
                    this.VecPos = new cc.Vec2(0, -402);
                    e = cc.Vec2.ZERO;
                    if (m.default.instance.isBonusTypeAndCanTrigger(0)) e = c.default.instance.getCardWordSpaceByIndex(0); else if (m.default.instance.isBonusTypeAndCanTrigger(1)) e = c.default.instance.getCardWordSpaceByIndex(1); else m.default.instance.isBonusTypeAndCanTrigger(2) && (e = c.default.instance.getCardWordSpaceByIndex(2));
                    n = i.default.instance.nodeContent.convertToNodeSpaceAR(e);
                    this.VecArrow = new cc.Vec2(n.x, n.y - 60), this.RotaionArrow = 0;
                    break;

                  case r.GuildEventType.OpenAltar:
                    this.VecPos = new cc.Vec2(0, -402);
                    e = cc.Vec2.ZERO;
                    if (m.default.instance.isAltarEventAndCanTrigger(0)) e = c.default.instance.getCardWordSpaceByIndex(0); else if (m.default.instance.isAltarEventAndCanTrigger(1)) e = c.default.instance.getCardWordSpaceByIndex(1); else m.default.instance.isAltarEventAndCanTrigger(2) && (e = c.default.instance.getCardWordSpaceByIndex(2));
                    n = i.default.instance.nodeContent.convertToNodeSpaceAR(e);
                    this.VecArrow = new cc.Vec2(n.x, n.y - 60), this.RotaionArrow = 0;
                    break;

                  case r.GuildEventType.OpenBlackmarket:
                    this.VecPos = new cc.Vec2(0, -402);
                    e = cc.Vec2.ZERO;
                    if (m.default.instance.isBlackmarketEventAndCanTrigger(0)) e = c.default.instance.getCardWordSpaceByIndex(0); else if (m.default.instance.isBlackmarketEventAndCanTrigger(1)) e = c.default.instance.getCardWordSpaceByIndex(1); else m.default.instance.isBlackmarketEventAndCanTrigger(2) && (e = c.default.instance.getCardWordSpaceByIndex(2));
                    n = i.default.instance.nodeContent.convertToNodeSpaceAR(e);
                    this.VecArrow = new cc.Vec2(n.x, n.y - 60), this.RotaionArrow = 0;
                    break;

                  case r.GuildEventType.EventSwich:
                  case r.GuildEventType.EventSwichOpen:
                    this.VecPos = new cc.Vec2(0, -402);
                    e = c.default.instance.getShowEventBtnWordSpace(), n = i.default.instance.nodeContent.convertToNodeSpaceAR(e);
                    this.VecArrow = new cc.Vec2(n.x, n.y - 60), this.RotaionArrow = 0;
                    break;

                  case r.GuildEventType.Relife:
                    this.VecPos = new cc.Vec2(0, -402);
                    e = cc.Vec2.ZERO;
                    if (m.default.instance.isRelifeEventAndCanTrigger(0)) e = c.default.instance.getCardWordSpaceByIndex(0); else if (m.default.instance.isRelifeEventAndCanTrigger(1)) e = c.default.instance.getCardWordSpaceByIndex(1); else m.default.instance.isRelifeEventAndCanTrigger(2) && (e = c.default.instance.getCardWordSpaceByIndex(2));
                    n = i.default.instance.nodeContent.convertToNodeSpaceAR(e);
                    this.VecArrow = new cc.Vec2(n.x, n.y - 60), this.RotaionArrow = 0;
                }
            }, e.prototype.canShow = function() {
                if (!this.IsFirst) return !1;
                switch (this.EventType) {
                  case r.GuildEventType.TapMonster:
                    return !0;

                  case r.GuildEventType.OpenBag:
                    if (n.default.instance.hasBetterEquip()) return !0;
                    break;

                  case r.GuildEventType.OpenSprite:
                    if (!f.default.instance.isFullBattle()) return !0;
                    break;

                  case r.GuildEventType.Sign:
                    if (n.default.instance.canSign && !c.default.instance.IsOnshowEvent()) return !0;
                    break;

                  case r.GuildEventType.ShowOfflineReward:
                    if (!c.default.instance.IsOnshowEvent()) return !0;
                    break;

                  case r.GuildEventType.OpenAchievement:
                    if (g.default.instance.hasCompeletedAchievement() && c.default.instance.IsOnshowEvent()) return !0;
                    break;

                  case r.GuildEventType.OpenRole:
                    if (o.default.instance.mainPlayer.unSeperatePoint > 0) return !0;
                    break;

                  case r.GuildEventType.DailyReward:
                    if (p.default.instance.canGetReward()) return !0;
                    break;

                  case r.GuildEventType.EventCardBonus:
                    if (!c.default.instance.IsOnshowEvent()) return !1;
                    if (m.default.instance.isBonusTypeAndCanTrigger(0)) return !0;
                    if (m.default.instance.isBonusTypeAndCanTrigger(1)) return !0;
                    if (m.default.instance.isBonusTypeAndCanTrigger(2)) return !0;
                    break;

                  case r.GuildEventType.Relife:
                    if (!c.default.instance.IsOnshowEvent()) return !1;
                    if (m.default.instance.isRelifeEventAndCanTrigger(0)) return !0;
                    if (m.default.instance.isRelifeEventAndCanTrigger(1)) return !0;
                    if (m.default.instance.isRelifeEventAndCanTrigger(2)) return !0;
                    break;

                  case r.GuildEventType.OpenAltar:
                    if (!c.default.instance.IsOnshowEvent()) return !1;
                    if (m.default.instance.isAltarEventAndCanTrigger(0)) return !0;
                    if (m.default.instance.isAltarEventAndCanTrigger(1)) return !0;
                    if (m.default.instance.isAltarEventAndCanTrigger(2)) return !0;
                    break;

                  case r.GuildEventType.OpenBlackmarket:
                    if (!c.default.instance.IsOnshowEvent()) return !1;
                    if (m.default.instance.isBlackmarketEventAndCanTrigger(0)) return !0;
                    if (m.default.instance.isBlackmarketEventAndCanTrigger(1)) return !0;
                    if (m.default.instance.isBlackmarketEventAndCanTrigger(2)) return !0;
                    break;

                  case r.GuildEventType.EventSwich:
                    if (c.default.instance.IsOnshowEvent()) return !0;
                    break;

                  case r.GuildEventType.EventSwichOpen:
                    if (!m.default.instance.hasCanTriggerEvent) return !1;
                    if (!c.default.instance.IsOnshowEvent()) return !0;
                }
                return !1;
            }, e;
        }();
        a.GuideStep = v;
        var b = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.label = null, t.GuideDataMap = {}, t.isShowingGuide = !1, t;
            }
            var a;
            return __extends(t, e), a = t, Object.defineProperty(t, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new a()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.Init = function() {
                var e = o.default.instance.monsterNode.parent.convertToWorldSpaceAR(o.default.instance.monsterNode.position), t = i.default.instance.nodeContent.convertToNodeSpaceAR(e);
                console.log("worldPos:" + e), console.log("targetPos:" + t), this.addGuideStep(1, 2, "尝试点击怪物，锤它！", r.GuildEventType.TapMonster, !0), 
                this.addGuideStep(2, 3, "多点几下试试，锤它！", r.GuildEventType.TapMonster, !1), this.addGuideStep(3, 0, "前期有效，后期攻速超高就无效了，锤它！", r.GuildEventType.TapMonster, !1), 
                this.addGuideStep(4, 0, "这是离线收益，下次上线即获丰厚奖励！", r.GuildEventType.ShowOfflineReward, !0), 
                this.addGuideStep(5, 0, "每日有丰富的签到奖励！点箭头这！", r.GuildEventType.Sign, !0), this.addGuideStep(6, 0, "更换更强力的装备", r.GuildEventType.OpenBag, !0), 
                this.addGuideStep(7, 0, "有可以提升的战斗属性", r.GuildEventType.OpenRole, !0), this.addGuideStep(8, 0, "可领取丰厚的在线奖励", r.GuildEventType.DailyReward, !0), 
                this.addGuideStep(9, 0, "可以领取事件奖励", r.GuildEventType.EventCardBonus, !0), this.addGuideStep(10, 0, "可以切换事件模式", r.GuildEventType.EventSwich, !0), 
                this.addGuideStep(11, 0, "这里拥有强大的精灵，出战给予强大力量！", r.GuildEventType.OpenSprite, !0), 
                this.addGuideStep(12, 0, "祭司为你添加神圣祝福", r.GuildEventType.OpenAltar, !0), this.addGuideStep(13, 0, "完成成就任务，获得称号的属性加成！", r.GuildEventType.OpenAchievement, !0), 
                this.addGuideStep(14, 0, "黑商来了，小心被骗，慎重购买！", r.GuildEventType.OpenBlackmarket, !0), 
                this.addGuideStep(15, 0, "神秘人带你时光倒流，重新做勇者!", r.GuildEventType.Relife, !0), this.addGuideStep(16, 0, "有可使用随机事件，切换看看", r.GuildEventType.EventSwichOpen, !0), 
                this.guidCheck();
                this.schedule(function(e) {
                    this.guidCheck();
                }, 10);
            }, t.prototype.guidCheck = function() {
                if (!(n.default.instance.getMainPlayerLVParam() >= 100 || this.isShowingGuide)) for (var e in this.GuideDataMap) if (this.GuideDataMap[e].canShow()) {
                    this.GuideDataMap[e].initPos(), this.triggerStep(this.GuideDataMap[e]);
                    break;
                }
            }, t.prototype.addGuideStep = function(e, t, a, n, i) {
                var r = new v();
                r.ID = e, r.NextStep = t, r.GuideDesc = a, r.EventType = n, r.IsFirst = i, this.GuideDataMap[e] = r;
            }, t.prototype.GuildFinishCallback = function(e) {
                if (this.isShowingGuide = !1, 0 != e) {
                    var t = this.GuideDataMap[e];
                    if (this.triggerEvent(t), 0 != t.NextStep) {
                        var a = this.GuideDataMap[t.NextStep];
                        a.initPos(), this.triggerStep(a);
                    }
                    this.GuideDataMap[e].EventType != r.GuildEventType.EventCardBonus && this.GuideDataMap[e].EventType != r.GuildEventType.DailyReward && delete this.GuideDataMap[e];
                }
            }, t.prototype.triggerEvent = function(e) {
                switch (e.EventType) {
                  case r.GuildEventType.TapMonster:
                    var t = o.default.instance.mainPlayer;
                    t.isDead() || t.attInterval > .1 && t.attack();
                    break;

                  case r.GuildEventType.ShowOfflineReward:
                    break;

                  case r.GuildEventType.Sign:
                    l.default.instance.LoadSignUI();
                    break;

                  case r.GuildEventType.Sign:
                    l.default.instance.LoadAchievementUI();
                    break;

                  case r.GuildEventType.OpenBag:
                    l.default.instance.LoadBagUI();
                    break;

                  case r.GuildEventType.OpenRole:
                    l.default.instance.LoadRoleUI();
                    break;

                  case r.GuildEventType.OpenSprite:
                    l.default.instance.LoadSpriteUI();
                    break;

                  case r.GuildEventType.OpenAltar:
                    if (m.default.instance.isAltarEventAndCanTrigger(0)) {
                        m.default.instance.triggerEvent(0);
                        break;
                    }
                    if (m.default.instance.isAltarEventAndCanTrigger(1)) {
                        m.default.instance.triggerEvent(1);
                        break;
                    }
                    if (m.default.instance.isAltarEventAndCanTrigger(2)) {
                        m.default.instance.triggerEvent(2);
                        break;
                    }
                    break;

                  case r.GuildEventType.DailyReward:
                    p.default.instance.getReward();
                    break;

                  case r.GuildEventType.Relife:
                    if (m.default.instance.isRelifeEventAndCanTrigger(0)) {
                        m.default.instance.triggerEvent(0);
                        break;
                    }
                    if (m.default.instance.isRelifeEventAndCanTrigger(1)) {
                        m.default.instance.triggerEvent(1);
                        break;
                    }
                    if (m.default.instance.isRelifeEventAndCanTrigger(2)) {
                        m.default.instance.triggerEvent(2);
                        break;
                    }
                    break;

                  case r.GuildEventType.OpenBlackmarket:
                    if (m.default.instance.isBlackmarketEventAndCanTrigger(0)) {
                        m.default.instance.triggerEvent(0);
                        break;
                    }
                    if (m.default.instance.isBlackmarketEventAndCanTrigger(1)) {
                        m.default.instance.triggerEvent(1);
                        break;
                    }
                    if (m.default.instance.isBlackmarketEventAndCanTrigger(2)) {
                        m.default.instance.triggerEvent(2);
                        break;
                    }
                    break;

                  case r.GuildEventType.EventCardBonus:
                    if (m.default.instance.isBonusTypeAndCanTrigger(0)) {
                        m.default.instance.triggerEvent(0);
                        break;
                    }
                    if (m.default.instance.isBonusTypeAndCanTrigger(1)) {
                        m.default.instance.triggerEvent(1);
                        break;
                    }
                    if (m.default.instance.isBonusTypeAndCanTrigger(2)) {
                        m.default.instance.triggerEvent(2);
                        break;
                    }
                    break;

                  case r.GuildEventType.EventSwich:
                    c.default.instance.hideEvents();
                    break;

                  case r.GuildEventType.EventSwichOpen:
                    c.default.instance.showEvents();
                }
            }, Object.defineProperty(t.prototype, "isNeedGuide", {
                get: function() {
                    return n.default.instance.getMainPlayerLVParam() <= 50;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.triggerStep = function(e) {
                this.isShowingGuide = !0, i.default.instance.showUI(e.ID, e.GuideDesc, e.VecPos, e.VecArrow, e.RotaionArrow);
            }, t._instance = null, __decorate([ y(cc.Label) ], t.prototype, "label", void 0), 
            t = a = __decorate([ _ ], t);
        }(cc.Component);
        a.default = b, cc._RF.pop();
    }, {
        "../battle/battle_manager": "battle_manager",
        "../common/allenum": "allenum",
        "../ui/battle_ui_manager": "battle_ui_manager",
        "../ui/guide_ui_manager": "guide_ui_manager",
        "../ui/menu_ui_manager": "menu_ui_manager",
        "../ui/random_event_ui_manager": "random_event_ui_manager",
        "../ui/today_reward_ui": "today_reward_ui",
        "./achievenment_manager": "achievenment_manager",
        "./dynamic_data_manager": "dynamic_data_manager",
        "./random_event_manager": "random_event_manager",
        "./reward_manager": "reward_manager",
        "./sprite_manager": "sprite_manager",
        "./ui_manager": "ui_manager"
    } ],
    guide_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "f1642XXhUtHzLXyoQ+S7L2k", "guide_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/guide_manager"), i = cc._decorator, r = i.ccclass, o = i.property, s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelGuideDesc = null, t.nodeArrow = null, t.nodeContent = null, t.maskNode = null, 
                t.guideID = 0, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on(cc.Node.EventType.TOUCH_START, this.hideUI, this);
            }, t.prototype.showUI = function(e, t, a, n, i) {
                this.nodeContent.active = !0, console.log("guideDesc:" + t + " guidePos :" + a + "  arrowPos:" + n), 
                this.guideID = e, this.labelGuideDesc.string = t, this.node.position = a, this.nodeArrow.rotation = i, 
                this.nodeArrow.position = n;
            }, t.prototype.hideUI = function() {
                this.nodeContent.active = !1, n.default.instance.GuildFinishCallback(this.guideID);
            }, t.instance = null, __decorate([ o(cc.Label) ], t.prototype, "labelGuideDesc", void 0), 
            __decorate([ o(cc.Node) ], t.prototype, "nodeArrow", void 0), __decorate([ o(cc.Node) ], t.prototype, "nodeContent", void 0), 
            __decorate([ o(cc.Node) ], t.prototype, "maskNode", void 0), t = a = __decorate([ r ], t);
        }(cc.Component);
        a.default = s, cc._RF.pop();
    }, {
        "../manager/guide_manager": "guide_manager"
    } ],
    help_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "a9495iJljRLi5jml5QJBB6/", "help_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/ui_manager"), i = cc._decorator, r = i.ccclass, o = i.property, s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.helpKey = "", t.btnHelp = null, t;
            }
            return __extends(t, e), t.prototype.start = function() {
                this.btnHelp.node.on("click", this.showHelp, this);
            }, t.prototype.showHelp = function() {
                n.default.instance.LoadHelpUI(this.helpKey);
            }, __decorate([ o ], t.prototype, "helpKey", void 0), __decorate([ o(cc.Button) ], t.prototype, "btnHelp", void 0), 
            t = __decorate([ r ], t);
        }(cc.Component);
        a.default = s, cc._RF.pop();
    }, {
        "../../manager/ui_manager": "ui_manager"
    } ],
    help_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "8c6e8k25DhKQLiVclfcnn7u", "help_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./dynamic_data_manager"), i = e("../battle/battle_manager"), r = e("../ui/battle_ui_manager"), o = e("./data_manager"), s = function() {
            function e() {}
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.playerNewLift = function() {
                if (n.default.instance.getMainPlayer().initNewPlayerBaseAttr(), null != n.default.instance.EquipItemDataMap) for (var e in n.default.instance.EquipItemDataMap) n.default.instance.addEquipAttrToPlayer(n.default.instance.EquipItemDataMap[e]);
                n.default.instance.playerNewLift(), i.default.instance.killCurMonster(), n.default.instance.playerMaxLV = 1, 
                n.default.instance.playerMaxHellLV = 1, n.default.instance.playerMaxDiffLV = 1, 
                i.default.instance.curLevel = 1, i.default.instance.curBeatCount = 0, i.default.instance.setNormalBattle(), 
                n.default.instance.getMainPlayer().fullfill(), r.default.instance.updateLvExp(1, 0), 
                r.default.instance.updatePlayerInfoUI();
            }, e.prototype.writeObj = function(e) {
                var t = "";
                for (var a in e) {
                    t += a + " = " + e[a] + "\n";
                }
                console.log(t);
            }, e.prototype.RefreshEquipAttr = function(e, t, a) {
                var n = 0;
                n = a || o.default.instance.getEquipPrefixValById(t), e.addAttr(t, n);
            }, e.prototype.sellAllEquipByQuality = function(e) {
                var t = [];
                for (var a in n.default.instance.BagItemDataMap) null != n.default.instance.BagItemDataMap[a] && n.default.instance.BagItemDataMap[a].getQuality() == e && t.push(n.default.instance.BagItemDataMap[a]);
                n.default.instance.SetItems(t);
            }, e.prototype.GetQualityEquipIsHaveGems = function(e) {
                for (var t in n.default.instance.BagItemDataMap) if (null != n.default.instance.BagItemDataMap[t] && n.default.instance.BagItemDataMap[t].getQuality() == e && n.default.instance.BagItemDataMap[t].hasGem()) return !0;
                return !1;
            }, e.prototype.getAttrShowStr = function(e, t) {
                return "攻击速度" != e ? ("全元素抗性" != e && "火焰抗性" != e && "闪电抗性" != e && "毒素抗性" != e && "冰冻抗性" != e || (t *= .1), 
                t > 0 ? e + " : +" + o.default.instance.getAttrValStr(e, t) : e + " : " + o.default.instance.getAttrValStr(e, t)) : e + " : " + o.default.instance.getAttrValStr(e, t);
            }, e.prototype.getAttrShowValueStr = function(e, t) {
                return "全元素抗性" != e && "火焰抗性" != e && "闪电抗性" != e && "毒素抗性" != e && "冰冻抗性" != e || (t *= .1), 
                o.default.instance.getAttrValStr(e, t);
            }, e._instance = null, e;
        }();
        a.default = s, cc._RF.pop();
    }, {
        "../battle/battle_manager": "battle_manager",
        "../ui/battle_ui_manager": "battle_ui_manager",
        "./data_manager": "data_manager",
        "./dynamic_data_manager": "dynamic_data_manager"
    } ],
    help_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "16157UocCFCU4qRDDPJF05s", "help_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/data_manager"), i = e("../audio_manager"), r = cc._decorator, o = r.ccclass, s = r.property, l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelTitle = null, t.labelDesc = null, t.uiNode = null, t.maskNode = null, 
                t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideUI, this), this.uiNode.active && (this.uiNode.active = !1);
            }, t.prototype.hideUI = function() {
                this.uiNode.active = !1;
            }, t.prototype.showHelp = function(e) {
                i.default.instance.PlayUISelect();
                var t = n.default.instance.helpData[e];
                null != t && (this.uiNode.active = !0, this.labelTitle.string = t.title, this.labelDesc.string = t.desc);
            }, t.instance = null, __decorate([ s(cc.Label) ], t.prototype, "labelTitle", void 0), 
            __decorate([ s(cc.Label) ], t.prototype, "labelDesc", void 0), __decorate([ s(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ s(cc.Node) ], t.prototype, "maskNode", void 0), t = a = __decorate([ o ], t);
        }(cc.Component);
        a.default = l, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../manager/data_manager": "data_manager"
    } ],
    hero: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "ab3456h7zFC26PdPyx0BFsq", "hero"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./entity"), i = e("../ui/battle_ui_manager"), r = e("../manager/data_manager"), o = e("../battle/battle_manager"), s = e("../manager/dynamic_data_manager"), l = e("../manager/playerbuff_manager"), c = e("../manager/sprite_manager"), u = e("../common/emmiter"), d = e("../common/allenum"), p = e("../manager/effect_manager"), m = e("../manager/achievenment_manager"), f = e("../manager/dungeon_data_manager"), g = cc._decorator, h = g.ccclass, _ = g.property, y = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelWord = null, t.AniRole = null, t.AniSay = null, t.missLeadingGold = null, 
                t.missLeadingdamaion = null, t.miss_GoldNum = null, t.miss_DamaionNum = null, t;
            }
            return __extends(t, e), t.prototype.start = function() {}, t.prototype.initNewPlayerBaseAttr = function() {
                this.initAllToDefault();
                var e = r.default.instance.globalValueData.player_base_attr;
                for (var t in e.params) s.default.instance.addAttrByType(t, e.params[t]);
                this.fullfill(), i.default.instance && i.default.instance.updatePlayerInfoUI();
            }, t.prototype.attack = function() {
                o.default.instance.PlayerAttack() && this.AniRole.play("attack");
            }, t.prototype.playDead = function() {
                this.AniRole.play("dead");
            }, t.prototype.heroCostMp = function(e) {
                this.costMp(e), i.default.instance.updatePlayerMP(this.mp, this.maxmp);
            }, t.prototype.BeingAttack = function(e) {
                this.beingHit(0), i.default.instance.updatePlayerHP(this.hp, this.maxhp);
            }, Object.defineProperty(t.prototype, "battleValue", {
                get: function() {
                    var e = r.default.instance.attrValueData, t = this.baseMinDamage * e["最小伤害"].value + this.baseMaxDamage * e["最小伤害"].value + this.addDamagePercent * e["伤害追加"].value + this.maxhp * e["生命"].value + this.maxmp * e["法力"].value + this.df * e["护甲"].value + this.hitVal * e["命中值"].value + this.blockVal * e["格挡值"].value + this.attAddHpPercent * e["攻击吸血"].value + this.attAddMpPercent * e["攻击回法"].value + this.doubleAttack * e["暴击率"].value + this.baseFrozenDamage * e["冰冻伤害"].value + this.frozenDamagePercent * e["冰冻增伤"].value + this.frozenDefence * e["冰冻抗性"].value + this.basePoisonDamage * e["毒素伤害"].value + this.poisonDamagePercent * e["毒素增伤"].value + this.poisonDefence * e["毒素抗性"].value + this.baseLightDamage * e["闪电伤害"].value + this.lightDamagePercent * e["闪电增伤"].value + this.lightDefence * e["闪电抗性"].value + this.baseBlazeDamage * e["火焰伤害"].value + this.blazeDamagePercent * e["火焰增伤"].value + this.blazeDefence * e["火焰抗性"].value + this.addGetBetterEquip * e["获得更高品质物品"].value + this.addGetCoin * e["金币获取增加"].value + this.getAddExpRate * e["经验获得增加"].value + this.createMonsterFaster * e["更快遇到怪物"].value + this.realDamage * e["真实伤害"].value;
                    return Math.floor(t);
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.getBattleLevelAttr = function(e) {
                return f.default.instance.getPlayerBattleLevelFixAttr(o.default.instance.getBattleLevel(), s.default.instance.curDiff, e);
            }, Object.defineProperty(t.prototype, "addhp", {
                get: function() {
                    return this._addhp + c.default.instance.getBuffValue("生命追加") + l.default.instance.getBuffValue("生命追加");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "maxhp", {
                get: function() {
                    return Math.floor((this._maxhp + c.default.instance.getBuffValue("生命")) * (1 + this.addhp));
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "addmp", {
                get: function() {
                    return this._addmp + l.default.instance.getBuffValue("法力追加");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "minDamage", {
                get: function() {
                    return Math.floor(this.baseMinDamage * (1 + this.addDamagePercent));
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "baseMinDamage", {
                get: function() {
                    return Math.floor(this._minDamage + c.default.instance.getBuffValue("伤害")) + m.default.instance.getTitleAttr("伤害");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "maxDamage", {
                get: function() {
                    return Math.floor(this.baseMaxDamage * (1 + this.addDamagePercent));
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "baseMaxDamage", {
                get: function() {
                    return this._maxDamage < this._minDamage ? this.baseMinDamage : Math.floor(this._maxDamage + c.default.instance.getBuffValue("伤害")) + m.default.instance.getTitleAttr("伤害");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "getAddExpRate", {
                get: function() {
                    var e = this._addExpRate + l.default.instance.getBuffValue("经验获得增加") + c.default.instance.getBuffValue("经验获得增加") + this.buffData.getBuffValue("经验获得增加") + m.default.instance.getTitleAttr("经验获得增加");
                    return e > 10 ? 10 : e;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "getAddExpRateNoBuff", {
                get: function() {
                    var e = this._addExpRate + l.default.instance.getBuffValue("经验获得增加") + c.default.instance.getBuffValue("经验获得增加") + m.default.instance.getTitleAttr("经验获得增加");
                    return e > 10 ? 10 : e;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "offlineAdd", {
                get: function() {
                    return l.default.instance.getBuffValue("离线收益");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "addDamagePercent", {
                get: function() {
                    return this._addDamagePercent + l.default.instance.getBuffValue("伤害追加") + c.default.instance.getBuffValue("伤害追加") + this.buffData.getBuffValue("伤害追加") + m.default.instance.getTitleAttr("伤害追加");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "attIntervalReduce", {
                get: function() {
                    return this._attIntervalReduce + l.default.instance.getBuffValue("攻击加速") + c.default.instance.getBuffValue("攻击加速") + this.buffData.getBuffValue("攻击加速") + m.default.instance.getTitleAttr("攻击加速");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "hitVal", {
                get: function() {
                    return Math.floor((this._hitVal + c.default.instance.getBuffValue("命中值")) * (1 + this.addHitVal));
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "addHitVal", {
                get: function() {
                    return this._addHitVal + this.buffData.getBuffValue("命中追加") + c.default.instance.getBuffValue("命中追加") + l.default.instance.getBuffValue("命中追加");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "blockVal", {
                get: function() {
                    return Math.floor((this._blockVal + c.default.instance.getBuffValue("格挡值")) * (1 + this.addBlockVal));
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "criticalRate", {
                get: function() {
                    return this._criticalRate + c.default.instance.getBuffValue("暴击率") + this.buffData.getBuffValue("暴击率");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "attAddHpPercent", {
                get: function() {
                    return this._attAddHpPercent + c.default.instance.getBuffValue("攻击吸血") + this.buffData.getBuffValue("攻击吸血") + m.default.instance.getTitleAttr("攻击吸血");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "attAddMpPercent", {
                get: function() {
                    return this._attAddMpPercent + l.default.instance.getBuffValue("攻击回法");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "attAddDaimond", {
                get: function() {
                    return this.buffData.getBuffValue("攻击获钻");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "attAddGlod", {
                get: function() {
                    return this.buffData.getBuffValue("攻击获金");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "monsterSlow", {
                get: function() {
                    return this.buffData.getBuffValue("怪物缓慢");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "createMonsterFaster", {
                get: function() {
                    return this._createMonsterFaster + l.default.instance.getBuffValue("更快遇到怪物") + this.buffData.getBuffValue("更快遇到怪物") + m.default.instance.getTitleAttr("更快遇到怪物");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "addGetCoin", {
                get: function() {
                    return this._addGetCoin + l.default.instance.getBuffValue("金币获取增加") + c.default.instance.getBuffValue("金币获取增加") + this.buffData.getBuffValue("金币获取增加") + m.default.instance.getTitleAttr("金币获取增加");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "addGetCoinNoBuff", {
                get: function() {
                    return this._addGetCoin + l.default.instance.getBuffValue("金币获取增加") + c.default.instance.getBuffValue("金币获取增加") + m.default.instance.getTitleAttr("金币获取增加");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "altarAddGetCoin", {
                get: function() {
                    return l.default.instance.getBuffValue("金币获取增加");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "addGetBetterEquip", {
                get: function() {
                    var e = this._addGetBetterEquip + l.default.instance.getBuffValue("获得更高品质物品") + c.default.instance.getBuffValue("获得更高品质物品") + m.default.instance.getTitleAttr("获得更高品质物品");
                    return e > 20 ? 20 : e;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "frozenDamage", {
                get: function() {
                    return this.baseFrozenDamage * (1 + this.frozenDamagePercent);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "baseFrozenDamage", {
                get: function() {
                    return this._frozenDamage + c.default.instance.getBuffValue("冰冻伤害") + m.default.instance.getTitleAttr("冰冻伤害");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "frozenDamagePercent", {
                get: function() {
                    return this._frozenDamagePercent + this.elementDamagePercent + this.buffData.getBuffValue("冰冻增伤") + c.default.instance.getBuffValue("冰冻增伤");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "frozenDefence", {
                get: function() {
                    var e = .1 * (this._frozenDefence + c.default.instance.getBuffValue("冰冻抗性") + this.getBattleLevelAttr("冰冻抗性") + this.buffData.getBuffValue("冰冻抗性")) + this.elementDefence;
                    return e >= 1 ? 1 : e;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "lightDamage", {
                get: function() {
                    return this.baseLightDamage * (1 + this.lightDamagePercent);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "baseLightDamage", {
                get: function() {
                    return this._lightDamage + c.default.instance.getBuffValue("闪电伤害") + m.default.instance.getTitleAttr("闪电伤害");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "lightDamagePercent", {
                get: function() {
                    return this._lightDamagePercent + this.elementDamagePercent + this.buffData.getBuffValue("闪电增伤") + c.default.instance.getBuffValue("闪电增伤");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "lightDefence", {
                get: function() {
                    var e = .1 * (this._lightDefence + c.default.instance.getBuffValue("闪电抗性") + this.getBattleLevelAttr("闪电抗性") + this.buffData.getBuffValue("闪电抗性")) + this.elementDefence;
                    return e >= 1 ? 1 : e;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "blazeDamage", {
                get: function() {
                    return this.baseBlazeDamage * (1 + this.blazeDamagePercent);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "baseBlazeDamage", {
                get: function() {
                    return this._blazeDamage + c.default.instance.getBuffValue("火焰伤害") + m.default.instance.getTitleAttr("火焰伤害");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "blazeDamagePercent", {
                get: function() {
                    return this._blazeDamagePercent + this.elementDamagePercent + this.buffData.getBuffValue("火焰增伤") + c.default.instance.getBuffValue("火焰增伤");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "blazeDefence", {
                get: function() {
                    var e = .1 * (this._blazeDefence + c.default.instance.getBuffValue("火焰抗性") + this.getBattleLevelAttr("火焰抗性") + this.buffData.getBuffValue("火焰抗性")) + this.elementDefence;
                    return e >= 1 ? 1 : e;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "poisonDamage", {
                get: function() {
                    return this.basePoisonDamage * (1 + this.poisonDamagePercent);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "basePoisonDamage", {
                get: function() {
                    return this._poisonDamage + c.default.instance.getBuffValue("毒素伤害") + m.default.instance.getTitleAttr("毒素伤害");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "poisonDamagePercent", {
                get: function() {
                    return this._poisonDamagePercent + this.elementDamagePercent + this.buffData.getBuffValue("毒素增伤") + c.default.instance.getBuffValue("毒素增伤");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "poisonDefence", {
                get: function() {
                    var e = .1 * (this._poisonDefence + c.default.instance.getBuffValue("毒素抗性") + this.getBattleLevelAttr("毒素抗性") + this.buffData.getBuffValue("毒素抗性")) + this.elementDefence;
                    return e >= 1 ? 1 : e;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "elementDamagePercent", {
                get: function() {
                    return this._elementDamagePercent + l.default.instance.getBuffValue("全元素增伤") + c.default.instance.getBuffValue("全元素增伤");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "elementDefence", {
                get: function() {
                    return .1 * (this._elementDefence + l.default.instance.getBuffValue("全元素抗性") + this.getBattleLevelAttr("全元素抗性") + c.default.instance.getBuffValue("全元素抗性"));
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "realDefence", {
                get: function() {
                    return this._realDefence + c.default.instance.getBuffValue("最终减伤");
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "realDamage", {
                get: function() {
                    return this._realDamage + c.default.instance.getBuffValue("真实伤害");
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.addBuffValue = function() {
                this.buffData.AddBuffEffectValue();
            }, t.prototype.addExpCrossLevel = function(e) {
                for (var t = e, a = !1; t > 0; ) {
                    var n = r.default.instance.expData[this.lv].exp;
                    if (n) {
                        if (this.lv >= 1e3) return;
                        t - n > 0 ? (t -= n, a = !0) : (t, t = 0);
                    } else t = 0;
                }
                a && (i.default.instance.updatePlayerHP(this.hp, this.maxhp), i.default.instance.updatePlayerMP(this.mp, this.maxmp), 
                u.Emitter.fire(d.AlertType.RoleAlert.toString())), i.default.instance.updateLvExp(this.lv, this.exp);
            }, t.prototype.addExp = function(e) {
                var t = r.default.instance.expData[this.lv].exp;
                if (this.exp + e >= t) {
                    if (this.lv >= 1e3) return;
                    this.exp = this.exp + e - t, this.addLV(1), p.default.instance.PlayerLvUpEffect(), 
                    i.default.instance.updatePlayerHP(this.hp, this.maxhp), i.default.instance.updatePlayerMP(this.mp, this.maxmp), 
                    u.Emitter.fire(d.AlertType.RoleAlert.toString());
                } else this.exp = this.exp + e;
                i.default.instance.updateLvExp(this.lv, this.exp), p.default.instance.PlayAddExpEffect(this.node, e);
            }, t.prototype.BeingAttMonster = function(e) {
                var t;
                this.attAddHpPercent > 0 && ((t = Math.floor(this.attAddHpPercent * e)) > 0 && (this.addHp(t), 
                i.default.instance.updatePlayerHP(this.hp, this.maxhp), p.default.instance.PlayAddHPEffect(this.node, t)));
                this.attAddMpPercent > 0 && ((t = Math.floor(this.attAddMpPercent * e)) > 0 && (this.addMp(t), 
                i.default.instance.updatePlayerMP(this.mp, this.maxmp), p.default.instance.PlayAddMPEffect(this.node, t)));
            }, t.prototype.BeingKilledMonster = function() {
                this.killAddHp > 0 && (this.addHp(this.killAddHp), i.default.instance.updatePlayerHP(this.hp, this.maxhp), 
                p.default.instance.PlayAddHPEffect(this.node, this.killAddHp)), this.killAddMp > 0 && (this.addMp(this.killAddMp), 
                i.default.instance.updatePlayerMP(this.mp, this.maxmp), p.default.instance.PlayAddMPEffect(this.node, this.killAddMp));
            }, t.prototype.say = function(e) {
                this.labelWord.string = e, this.AniSay.play("say");
            }, t.prototype.update = function(e) {
                if (!this.isDead()) {
                    if (!this.canAction()) return;
                    this.canAttack() ? (o.default.instance.hasMonster() && this.attack(), this.lastAttTime = 0) : this.lastAttTime = this.lastAttTime + e;
                }
                this.buffData.update(e);
            }, t.prototype.clone = function(e) {
                this.buffData = e.buffData, this._lv = e._lv, this._unSeperatePoint = e._unSeperatePoint, 
                this._attInterval = e._attInterval, this._attIntervalReduce = e._attIntervalReduce, 
                this._strength = e._strength, this._agile = e._agile, this._power = e._power, this._energy = e._energy, 
                this._hp = e._hp, this._maxhp = e._maxhp, this._addhp = e._addhp, this._mp = e._mp, 
                this._maxmp = e._maxmp, this._addmp = e._addmp, this._st = e._st, this._addDamagePercent = e._addDamagePercent, 
                this._minDamage = e._minDamage, this._maxDamage = e._maxDamage, this._doubleAttack = e._doubleAttack, 
                this._df = e._df, this._adddf = e._adddf, this._criticalRate = e._criticalRate, 
                this._hitVal = e._hitVal, this._addHitVal = e._addHitVal, this._blockVal = e._blockVal, 
                this._killAddHp = e._killAddHp, this._killAddMp = e._killAddMp, this._attAddHpPercent = e._attAddHpPercent, 
                this._attAddMpPercent = e._attAddMpPercent, this._realDamage = e._realDamage, this._realDefence = e._realDefence, 
                this._elementDamagePercent = e._elementDamagePercent, this._elementDefence = e._elementDefence, 
                this._frozenDamage = e._frozenDamage, this._frozenDamagePercent = e._frozenDamagePercent, 
                this._frozenDefence = e._frozenDefence, this._lightDamage = e._lightDamage, this._lightDamagePercent = e._lightDamagePercent, 
                this._lightDefence = e._lightDefence, this._blazeDamage = e._blazeDamage, this._blazeDamagePercent = e._blazeDamagePercent, 
                this._blazeDefence = e._blazeDefence, this._poisonDamage = e._poisonDamage, this._poisonDamagePercent = e._poisonDamagePercent, 
                this._poisonDefence = e._poisonDefence, this._addGetCoin = e._addGetCoin, this._addExpRate = e._addExpRate, 
                this._addGetBetterEquip = e._addGetBetterEquip, this._createMonsterInterval = e._createMonsterInterval, 
                this._createMonsterFaster = e._createMonsterFaster, this._lastCreateMonsterTime = e._lastCreateMonsterTime;
            }, __decorate([ _(cc.Label) ], t.prototype, "labelWord", void 0), __decorate([ _(cc.Animation) ], t.prototype, "AniRole", void 0), 
            __decorate([ _(cc.Animation) ], t.prototype, "AniSay", void 0), __decorate([ _(cc.Node) ], t.prototype, "missLeadingGold", void 0), 
            __decorate([ _(cc.Node) ], t.prototype, "missLeadingdamaion", void 0), __decorate([ _(cc.Label) ], t.prototype, "miss_GoldNum", void 0), 
            __decorate([ _(cc.Label) ], t.prototype, "miss_DamaionNum", void 0), t = __decorate([ h ], t);
        }(n.default);
        a.default = y, cc._RF.pop();
    }, {
        "../battle/battle_manager": "battle_manager",
        "../common/allenum": "allenum",
        "../common/emmiter": "emmiter",
        "../manager/achievenment_manager": "achievenment_manager",
        "../manager/data_manager": "data_manager",
        "../manager/dungeon_data_manager": "dungeon_data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/effect_manager": "effect_manager",
        "../manager/playerbuff_manager": "playerbuff_manager",
        "../manager/sprite_manager": "sprite_manager",
        "../ui/battle_ui_manager": "battle_ui_manager",
        "./entity": "entity"
    } ],
    hit_monster_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "46812cto1dKOLUGm076p0bC", "hit_monster_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../battle/battle_manager"), i = cc._decorator, r = i.ccclass, o = i.property, s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.btnHit = null, t.canHit = !0, t.hitInterval = .15, t.curTime = 0, t;
            }
            return __extends(t, e), t.prototype.start = function() {
                this.btnHit.node.on("click", this.hit, this);
            }, t.prototype.hit = function() {
                var e = n.default.instance.mainPlayer;
                e.isDead() || e.attInterval > .1 && this.canHit && (e.attack(), this.canHit = !1);
            }, t.prototype.update = function(e) {
                this.curTime += e, this.curTime > this.hitInterval && (this.canHit = !0, this.curTime = 0);
            }, __decorate([ o(cc.Button) ], t.prototype, "btnHit", void 0), t = __decorate([ r ], t);
        }(cc.Component);
        a.default = s, cc._RF.pop();
    }, {
        "../../battle/battle_manager": "battle_manager"
    } ],
    http_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "55339biAgpJ2qw71YzzKJ1V", "http_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.Request = function(e, t, a) {
                if (void 0 === a && (a = null), "undefined" != typeof wx) wx.request({
                    url: e,
                    data: {
                        keyValues: t
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        null != a && a(!0, e.data);
                    },
                    fail: function(e) {
                        console.log("res" + e), a(!1, e.data);
                    }
                }); else {
                    var n = new XMLHttpRequest();
                    n.onreadystatechange = function() {
                        if (4 == n.readyState && n.status >= 200 && n.status < 400) {
                            var e = n.responseText;
                            if (null != a) {
                                var t = JSON.parse(e);
                                a(!0, t);
                            }
                        }
                    }, n.open("POST", e, !0), n.send(JSON.stringify(t));
                }
            }, e._instance = null, e;
        }();
        a.default = n, cc._RF.pop();
    }, {} ],
    invite_friend_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "e64c42oizZGoq8I/7EFDvAm", "invite_friend_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./item/item_friend"), i = e("../manager/pool_manager"), r = e("../manager/wx_manager"), o = e("../manager/dynamic_data_manager"), s = cc._decorator, l = s.ccclass, c = s.property, u = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.content = null, t.parent_node = null, t.btn_share = null, t.btn_close = null, 
                t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.content.active = !1, this.btn_share.node.on("click", this.OnClickShareToFeiend, this), 
                this.btn_close.node.on("click", this.CloseInviteFriendUI, this), this.itemFriendCtrls = [];
            }, t.prototype.OnClickShareToFeiend = function() {
                console.log("=====好友分享"), r.default.instance.shareAppMessage("invit_friend", o.default.instance.id);
            }, t.prototype.ShowInviteFrinedUI = function() {
                this.content.active = !0;
                var e = o.default.instance.referUserData, t = 0;
                if (e) for (var a in e) {
                    t += 1;
                    var r = i.default.instance.CreateObjectByName("ItemFriend", this.parent_node).getComponent(n.default);
                    r.Init(t, a, e[a]), this.itemFriendCtrls.push(r);
                }
            }, t.prototype.CloseInviteFriendUI = function() {
                for (var e = 0, t = this.itemFriendCtrls; e < t.length; e++) {
                    var a = t[e];
                    i.default.instance.RemoveObjectByName("ItemFriend", a.node);
                }
                this.itemFriendCtrls = [], this.content.active = !1;
            }, t.instance = null, __decorate([ c(cc.Node) ], t.prototype, "content", void 0), 
            __decorate([ c(cc.Node) ], t.prototype, "parent_node", void 0), __decorate([ c(cc.Button) ], t.prototype, "btn_share", void 0), 
            __decorate([ c(cc.Button) ], t.prototype, "btn_close", void 0), t = a = __decorate([ l ], t);
        }(cc.Component);
        a.default = u, cc._RF.pop();
    }, {
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/pool_manager": "pool_manager",
        "../manager/wx_manager": "wx_manager",
        "./item/item_friend": "item_friend"
    } ],
    item_ask: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "a11a31W6sxEoaE8zi4rQeNR", "item_ask"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, r = n.property, o = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelTitle = null, t.labelName = null, t.labelAsk = null, t;
            }
            return __extends(t, e), t.prototype.Init = function(e, t, a, n) {
                return this.labelName.string = e + " " + t, this.labelAsk.string = a, n ? (this.labelName.node.color = new cc.Color(180, 247, 183), 
                this.labelAsk.node.color = cc.color(0, 255, 12), this.labelName.horizontalAlign = cc.Label.HorizontalAlign.RIGHT, 
                this.labelAsk.horizontalAlign = cc.Label.HorizontalAlign.RIGHT) : (this.labelName.horizontalAlign = cc.Label.HorizontalAlign.LEFT, 
                this.labelAsk.horizontalAlign = cc.Label.HorizontalAlign.LEFT, this.labelName.node.color = new cc.Color(209, 209, 209), 
                this.labelAsk.node.color = new cc.Color(148, 198, 211)), this.labelName.node.height + this.labelAsk.node.getContentSize().height + 40;
            }, t.prototype.getNodeHeight = function() {
                return this.labelName.node.height + this.labelAsk.node.getContentSize().height + 40;
            }, t.prototype.setTitle = function(e, t) {
                if ("" != e) {
                    this.labelTitle.string = " " + e;
                    var a = this.labelTitle.node.width / 2;
                    if (t) {
                        this.labelName.node.position = new cc.Vec2(249 - this.labelName.node.width / 2 - 5, 0);
                        var n = this.labelName.node.position.x - a - this.labelName.node.width / 2 - 20;
                        this.labelTitle.node.position = new cc.Vec2(n, 0);
                    } else {
                        this.labelTitle.node.position = new cc.Vec2(-(249 - a), 0);
                        n = this.labelTitle.node.position.x + (a + this.labelName.node.width / 2 + 20);
                        this.labelName.node.position = new cc.Vec2(n, 0);
                    }
                } else this.labelTitle.string = "", this.labelName.node.position = t ? new cc.Vec2(249 - this.labelName.node.width / 2 - 25, 0) : new cc.Vec2(-(249 - this.labelName.node.width / 2 - 25), 0);
            }, __decorate([ r(cc.Label) ], t.prototype, "labelTitle", void 0), __decorate([ r(cc.Label) ], t.prototype, "labelName", void 0), 
            __decorate([ r(cc.Label) ], t.prototype, "labelAsk", void 0), t = __decorate([ i ], t);
        }(cc.Component);
        a.default = o, cc._RF.pop();
    }, {} ],
    item_btn_chat_room: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "80d5300gzRDfJ+NAGlFMSeo", "item_btn_chat_room"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../network/player_network"), i = e("../../manager/ui_manager"), r = cc._decorator, o = r.ccclass, s = r.property, l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.label_Statue = null, t.label_Room_number = null, t.roomNum = 0, t.personNum = 0, 
                t;
            }
            return __extends(t, e), t.prototype.start = function() {}, t.prototype.Init = function(e, t) {
                var a = "";
                t < 30 ? (a = "· 空闲", this.label_Statue.node.color = cc.Color.GREEN) : t >= 30 && t <= 60 ? (a = "· 拥挤", 
                this.label_Statue.node.color = cc.Color.YELLOW) : (a = "· 爆满", this.label_Statue.node.color = cc.Color.RED), 
                this.label_Statue.string = a, this.label_Room_number.string = "勇者酒馆 " + e.toString(), 
                this.roomNum = e, this.personNum = t, this.node.on("click", this.enterNewRoom, this);
            }, t.prototype.enterNewRoom = function() {
                this.personNum >= 100 ? i.default.instance.LoadTipsByID("talk_station_tips") : n.default.instance.ApplyChatRoomRequest(this.roomNum);
            }, __decorate([ s(cc.Label) ], t.prototype, "label_Statue", void 0), __decorate([ s(cc.Label) ], t.prototype, "label_Room_number", void 0), 
            t = __decorate([ o ], t);
        }(cc.Component);
        a.default = l, cc._RF.pop();
    }, {
        "../../manager/ui_manager": "ui_manager",
        "../../network/player_network": "player_network"
    } ],
    item_friend: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "0d8d7UklyxKB45tmfKAvKh9", "item_friend"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../network/player_network"), i = cc._decorator, r = i.ccclass, o = i.property, s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.label_num = null, t.img_person_head = null, t.label_diamond_num = null, 
                t.label_isInvite = null, t.userID = "", t.btnGetBonus = null, t;
            }
            return __extends(t, e), t.prototype.start = function() {
                this.btnGetBonus.node.on("click", this.getBonus, this);
            }, t.prototype.Init = function(e, t, a) {
                this.label_num.string = e.toString(), this.userID = t, a ? (this.btnGetBonus.interactable = !0, 
                this.label_isInvite.string = "领取") : (this.btnGetBonus.interactable = !1, this.label_isInvite.string = "已领取");
            }, t.prototype.getBonus = function() {
                "" != this.userID && n.default.instance.GetReferUserRewardRequest(this.userID), 
                this.btnGetBonus.interactable = !1;
            }, __decorate([ o(cc.Label) ], t.prototype, "label_num", void 0), __decorate([ o(cc.Sprite) ], t.prototype, "img_person_head", void 0), 
            __decorate([ o(cc.Label) ], t.prototype, "label_diamond_num", void 0), __decorate([ o(cc.Label) ], t.prototype, "label_isInvite", void 0), 
            __decorate([ o(cc.Button) ], t.prototype, "btnGetBonus", void 0), t = __decorate([ r ], t);
        }(cc.Component);
        a.default = s, cc._RF.pop();
    }, {
        "../../network/player_network": "player_network"
    } ],
    learn_skill_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "7cb04Y+gBxAzrCzj1J67Ftc", "learn_skill_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/pool_manager"), i = e("../manager/data_manager"), r = e("./item/store_item"), o = e("../manager/cost_manager"), s = e("../manager/skill_manager"), l = e("../audio_manager"), c = e("../network/player_network"), u = cc._decorator, d = u.ccclass, p = u.property, m = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.maskNode = null, t.contentNode = null, t.curSkills = null, 
                t.newSkillID = 0, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideUI, this), this.uiNode.active && (this.uiNode.active = !1);
            }, t.prototype.showUI = function() {
                l.default.instance.PlayUISelect(), this.uiNode.active = !0, this.curSkills = s.default.instance.getCanLearnSkill(), 
                this.refreshUI();
            }, t.prototype.refreshUI = function() {
                for (var e = this.contentNode.children, t = e.length - 1; t >= 0; t--) n.default.instance.RemoveObjectByName("StoreItem", e[t]);
                for (var a in console.error("skillIDS :" + this.curSkills), this.curSkills) {
                    var o = i.default.instance.skillData[this.curSkills[a]];
                    if (o) n.default.instance.CreateObjectByName("StoreItem", this.contentNode).getComponent(r.default).initSkillLearnItem(o.id, this.itemCallBack);
                }
            }, t.prototype.hideUI = function() {
                this.uiNode.active = !1;
            }, t.prototype.itemCallBack = function(e) {
                if (this.newSkillID = e, s.default.instance.isLearnSkill(e)) {
                    var t = i.default.instance.skillData[e].lvup_cost;
                    o.default.instance.cost(t) && (s.default.instance.lvUp(e), c.default.instance.PlayerSkillLevelUp(e), 
                    a.instance.refreshUI());
                } else {
                    t = i.default.instance.skillData[e].learn_cost;
                    o.default.instance.cost(t) && (s.default.instance.addSkill(e), c.default.instance.PlayerAddSkill(e), 
                    a.instance.refreshUI());
                }
            }, t.prototype.learnSkillSuccess = function() {
                s.default.instance.isLearnSkill(this.newSkillID) ? (s.default.instance.lvUp(this.newSkillID), 
                c.default.instance.PlayerSkillLevelUp(this.newSkillID), a.instance.refreshUI()) : (s.default.instance.addSkill(this.newSkillID), 
                c.default.instance.PlayerAddSkill(this.newSkillID), a.instance.refreshUI());
            }, t.instance = null, __decorate([ p(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ p(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ p(cc.Node) ], t.prototype, "contentNode", void 0), 
            t = a = __decorate([ d ], t);
        }(cc.Component);
        a.default = m, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../manager/cost_manager": "cost_manager",
        "../manager/data_manager": "data_manager",
        "../manager/pool_manager": "pool_manager",
        "../manager/skill_manager": "skill_manager",
        "../network/player_network": "player_network",
        "./item/store_item": "store_item"
    } ],
    lost_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "79385s23mtPOpWXMf/Y0SnK", "lost_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./data_manager"), i = e("../math/rand"), r = e("../data/bag_item_data"), o = e("./dynamic_data_manager"), s = function() {
            function e() {}
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.getRamdomBaseBagItem = function(e) {
                var t = n.default.instance.lostLevelData[e], a = n.default.instance.getEquipIDbyMinMaxValue(t.min_equip_value, t.max_equip_value);
                return new r.default(a, 1);
            }, e.prototype.addAttrToWhiteEquip = function(e, t, a) {
                var r = n.default.instance.lostLevelData[t], s = n.default.instance.getEquipPrefixByLevel(r.blue_value), l = n.default.instance.getEquipPrefixValById(s);
                if (e.addAttr(s, l), i.default.getZeroToOne() < r.red_rate * a) {
                    var c = n.default.instance.getEquipPrefixByLevel(r.red_value), u = n.default.instance.getEquipPrefixValById(c);
                    if (e.addAttr(c, u), i.default.getZeroToOne() < r.gold_rate * a) {
                        var d = n.default.instance.getEquipPrefixByLevel(r.gold_value), p = n.default.instance.getEquipPrefixValById(d);
                        e.addAttr(d, p);
                    }
                }
                o.default.instance.AddBagItem(e);
            }, e.prototype.getLostByID = function(e, t, a) {
                void 0 === a && (a = 0);
                var o = n.default.instance.lostLevelData[e];
                if (i.default.getZeroToOne() < o.equip_rate + a) {
                    var s;
                    if (0 == o.type) 0 != (u = n.default.instance.getEquipIDbyMinMaxValue(o.min_equip_value, o.max_equip_value)) && (s = new r.default(u, 1)); else if (1 == o.type) {
                        var l = o.drop_param.length, c = i.default.getRandomNum(0, l - 1);
                        0 != (u = o.drop_param[c]) && (s = new r.default(u, 1));
                    } else if (2 == o.type) {
                        var u;
                        0 != (u = n.default.instance.getEquipIDbyMinMaxValueAndTypes(o.min_equip_value, o.max_equip_value, o.drop_param)) && (s = new r.default(u, 1));
                    }
                    if (i.default.getZeroToOne() < o.blue_rate * t) {
                        var d = [], p = n.default.instance.getEquipPrefixByLevel(o.blue_value), m = n.default.instance.getEquipPrefixValById(p);
                        if (d.push(p), s.addAttr(p, m), i.default.getZeroToOne() < o.red_rate * t) {
                            var f = n.default.instance.getEquipPrefixByLevel(o.red_value, d), g = n.default.instance.getEquipPrefixValById(f);
                            if (d.push(f), s.addAttr(f, g), i.default.getZeroToOne() < o.gold_rate * t) {
                                var h = n.default.instance.getEquipPrefixByLevel(o.gold_value, d), _ = n.default.instance.getEquipPrefixValById(h);
                                s.addAttr(h, _);
                            }
                        }
                    }
                    return s;
                }
                return null;
            }, e._instance = null, e;
        }();
        a.default = s, cc._RF.pop();
    }, {
        "../data/bag_item_data": "bag_item_data",
        "../math/rand": "rand",
        "./data_manager": "data_manager",
        "./dynamic_data_manager": "dynamic_data_manager"
    } ],
    lvup_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "8ac4f2TnmBNeYQKKadZitBc", "lvup_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, r = n.property, o = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.animation = null, t;
            }
            var a;
            return __extends(t, e), a = t, Object.defineProperty(t, "instance", {
                get: function() {
                    return this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.start = function() {
                a._instance = this;
            }, t.prototype.playerLvUpEffect = function() {
                this.animation.play();
            }, t._instance = null, __decorate([ r(cc.Animation) ], t.prototype, "animation", void 0), 
            t = a = __decorate([ i ], t);
        }(cc.Component);
        a.default = o, cc._RF.pop();
    }, {} ],
    map_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "9a249/KTh5O2pCoTiygEt4g", "map_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../map_ui_manager"), i = e("../../manager/dynamic_data_manager"), r = e("../../manager/resource_manager"), o = cc._decorator, s = o.ccclass, l = o.property, c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelLv = null, t.btnLVInfo = null, t.curLV = 0, t.curDiff = 1, t.nodeLock = null, 
                t.spriteBG = null, t;
            }
            return __extends(t, e), t.prototype.onLoad = function() {
                this.btnLVInfo.node.on("click", this.showLVInfo, this);
            }, t.prototype.onEnable = function() {
                this.updateStatus();
            }, t.prototype.initLV = function(e, t, a) {
                this.curLV = t, this.curDiff = e, this.labelLv.string = this.curLV.toString(), a == this.curLV ? this.spriteBG.spriteFrame = r.default.instance.getCommonSprite("btn3") : this.spriteBG.spriteFrame = r.default.instance.getCommonSprite("btn2"), 
                this.updateStatus();
            }, t.prototype.showLVInfo = function() {
                n.default.instance.showSelectLevelInfo(this.curLV);
            }, t.prototype.updateStatus = function() {
                1 == this.curDiff ? i.default.instance.playerMaxLV < this.curLV ? this.nodeLock.active = !0 : this.nodeLock.active = !1 : 2 == this.curDiff ? i.default.instance.playerMaxDiffLV < this.curLV ? this.nodeLock.active = !0 : this.nodeLock.active = !1 : 3 == this.curDiff && (i.default.instance.playerMaxHellLV < this.curLV ? this.nodeLock.active = !0 : this.nodeLock.active = !1);
            }, __decorate([ l(cc.Label) ], t.prototype, "labelLv", void 0), __decorate([ l(cc.Button) ], t.prototype, "btnLVInfo", void 0), 
            __decorate([ l(cc.Node) ], t.prototype, "nodeLock", void 0), __decorate([ l(cc.Sprite) ], t.prototype, "spriteBG", void 0), 
            t = __decorate([ s ], t);
        }(cc.Component);
        a.default = c, cc._RF.pop();
    }, {
        "../../manager/dynamic_data_manager": "dynamic_data_manager",
        "../../manager/resource_manager": "resource_manager",
        "../map_ui_manager": "map_ui_manager"
    } ],
    map_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "df5d1E7xrBIWrkRqECLEUlk", "map_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/data_manager"), i = e("../manager/pool_manager"), r = e("./item/map_item"), o = e("../battle/battle_manager"), s = e("../audio_manager"), l = e("../manager/resource_manager"), c = e("../manager/dynamic_data_manager"), u = e("../manager/ui_manager"), d = cc._decorator, p = d.ccclass, m = d.property, f = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.maskNode = null, t.contentNode = null, t.labelLVName = null, 
                t.labelLVDesc = null, t.labelLVDesc2 = null, t.btnGotoLV = null, t.btnLast = null, 
                t.btnNext = null, t.spriteSimple = null, t.spriteDiff = null, t.spriteHell = null, 
                t.curSelectDiff = 1, t.bInit = !1, t.curPage = 1, t.pageNum = 12, t.maxPage = 5, 
                t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideUI, this), this.btnGotoLV.node.on("click", this.gotoLevel, this), 
                this.btnLast.node.on("click", this.lastPage, this), this.btnNext.node.on("click", this.nextPage, this), 
                this.spriteSimple.node.on("click", this.selectSimple, this), this.spriteDiff.node.on("click", this.selectDiff, this), 
                this.spriteHell.node.on("click", this.selectHell, this), this.uiNode.active && (this.uiNode.active = !1);
            }, t.prototype.hideUI = function() {
                this.uiNode.active = !1;
            }, t.prototype.showUI = function() {
                s.default.instance.PlayUISelect(), this.uiNode.active = !0, this.curSelectDiff = c.default.instance.curDiff, 
                this.curPage = Math.floor((c.default.instance.curLevel - 1) / 12) + 1;
                var e = o.default.instance.curLevel;
                this.showSelectLevelInfo(e), 1 == this.curSelectDiff ? this.selectSimple() : 2 == this.curSelectDiff ? this.selectDiff() : 3 == this.curSelectDiff && this.selectHell();
            }, t.prototype.initContent = function() {
                for (var e = this.contentNode.children, t = e.length - 1; t >= 0; t--) i.default.instance.RemoveObjectByName("LevelItem", e[t]);
                var a = 1 + (this.curPage - 1) * this.pageNum, o = a + this.pageNum;
                if (null != c.default.instance.BagItemDataMap) for (var s = a; s < o; s++) {
                    if (n.default.instance.levelData[s]) if (1 == n.default.instance.levelData[s].type) i.default.instance.CreateObjectByName("LevelItem", this.contentNode).getComponent(r.default).initLV(this.curSelectDiff, a, this.curSelectLevel), 
                    a++;
                }
            }, t.prototype.showSelectLevelInfo = function(e) {
                var t = n.default.instance.levelData[e];
                this.labelLVName.string = t.name, this.labelLVDesc.string = t.desc, 1 == this.curSelectDiff ? this.labelLVDesc2.string = t.desc_normal : 2 == this.curSelectDiff ? this.labelLVDesc2.string = t.desc_diff : 3 == this.curSelectDiff && (this.labelLVDesc2.string = t.desc_hell), 
                this.curSelectLevel = e, this.initContent();
            }, t.prototype.lastPage = function() {
                this.curPage <= 1 ? u.default.instance.LoadTipsByStr("没有更多记录") : (this.curPage--, 
                this.initContent());
            }, t.prototype.nextPage = function() {
                this.curPage >= this.maxPage ? u.default.instance.LoadTipsByStr("没有更多记录") : (this.curPage++, 
                this.initContent());
            }, t.prototype.selectSimple = function() {
                this.curSelectDiff = 1, this.spriteSimple.spriteFrame = l.default.instance.getCommonSprite("jszb_13"), 
                this.spriteDiff.spriteFrame = l.default.instance.getCommonSprite("jszb_14"), this.spriteHell.spriteFrame = l.default.instance.getCommonSprite("jszb_14"), 
                this.initContent();
            }, t.prototype.selectDiff = function() {
                c.default.instance.newLiftCount < 20 ? u.default.instance.LoadTipsByID("new_life_num_diff_limit") : (this.curSelectDiff = 2, 
                this.spriteSimple.spriteFrame = l.default.instance.getCommonSprite("jszb_14"), this.spriteDiff.spriteFrame = l.default.instance.getCommonSprite("jszb_13"), 
                this.spriteHell.spriteFrame = l.default.instance.getCommonSprite("jszb_14"), this.initContent());
            }, t.prototype.selectHell = function() {
                (this.curSelectDiff = 3, 
                this.spriteSimple.spriteFrame = l.default.instance.getCommonSprite("jszb_14"), this.spriteDiff.spriteFrame = l.default.instance.getCommonSprite("jszb_14"), 
                this.spriteHell.spriteFrame = l.default.instance.getCommonSprite("jszb_13"), this.initContent());
            }, t.prototype.gotoLevel = function() {
                this.curSelectLevel == o.default.instance.curLevel && this.curSelectDiff == c.default.instance.curDiff ? this.hideUI() : o.default.instance.playerSelectLevel(this.curSelectDiff, this.curSelectLevel) && this.hideUI();
            }, t.instance = null, __decorate([ m(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ m(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ m(cc.Node) ], t.prototype, "contentNode", void 0), 
            __decorate([ m(cc.Label) ], t.prototype, "labelLVName", void 0), __decorate([ m(cc.Label) ], t.prototype, "labelLVDesc", void 0), 
            __decorate([ m(cc.Label) ], t.prototype, "labelLVDesc2", void 0), __decorate([ m(cc.Button) ], t.prototype, "btnGotoLV", void 0), 
            __decorate([ m(cc.Button) ], t.prototype, "btnLast", void 0), __decorate([ m(cc.Button) ], t.prototype, "btnNext", void 0), 
            __decorate([ m(cc.Sprite) ], t.prototype, "spriteSimple", void 0), __decorate([ m(cc.Sprite) ], t.prototype, "spriteDiff", void 0), 
            __decorate([ m(cc.Sprite) ], t.prototype, "spriteHell", void 0), t = a = __decorate([ p ], t);
        }(cc.Component);
        a.default = f, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../battle/battle_manager": "battle_manager",
        "../manager/data_manager": "data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/pool_manager": "pool_manager",
        "../manager/resource_manager": "resource_manager",
        "../manager/ui_manager": "ui_manager",
        "./item/map_item": "map_item"
    } ],
    menu_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "52883Sm8v5A87GomlDrNWA+", "menu_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../util"), i = e("../battle/battle_manager"), r = e("../manager/sprite_manager"), o = e("../manager/dynamic_data_manager"), s = e("../common/emmiter"), l = e("../common/allenum"), c = e("../manager/ui_manager"), u = cc._decorator, d = u.ccclass, p = u.property, m = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.bagButton = null, t.depotButton = null, t.roleButton = null, t.mapButton = null, 
                t.buttonSprite = null, t.labelGold = null, t.labelDaimond = null, t.nodeAlertRole = null, 
                t.nodeAlertSprite = null, t.nodeAlertBag = null, t.btn_invite = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.bagButton.node.on("click", this.showBagUI, this), this.depotButton.node.on("click", this.showDepotUI, this), 
                this.roleButton.node.on("click", this.showRoleUI, this), this.mapButton.node.on("click", this.showMapUI, this), 
                this.buttonSprite.node.on("click", this.showSpriteUI, this), this.btn_invite.node.on("click", this.inviteFriends, this);
                s.Emitter.register(l.AlertType.BagAlert.toString(), this.checkBagAlert, this), s.Emitter.register(l.AlertType.RoleAlert.toString(), this.checkRoleAlert, this), 
                s.Emitter.register(l.AlertType.SpriteAlert.toString(), this.checkSpriteAlert, this);
            }, t.prototype.showRoleUI = function() {
                c.default.instance.LoadRoleUI();
            }, t.prototype.showDepotUI = function() {
                c.default.instance.LoadDepotUI();
            }, t.prototype.showBagUI = function() {
                c.default.instance.LoadBagUI();
            }, t.prototype.showMapUI = function() {
                c.default.instance.LoadMapUI();
            }, t.prototype.showSpriteUI = function() {
                c.default.instance.LoadSpriteUI();
            }, t.prototype.updateGoldNum = function(e) {
                this.labelGold.string = n.default.GetLargeNumStr(e);
            }, t.prototype.updateDaimondNum = function(e) {
                this.labelDaimond.string = n.default.GetLargeNumStr(e);
            }, t.prototype.getBagIconWorldPos = function() {
                return this.bagButton.node.parent.convertToWorldSpaceAR(this.bagButton.node.position);
            }, t.prototype.getSpriteIconWorldPos = function() {
                return this.buttonSprite.node.parent.convertToWorldSpaceAR(this.buttonSprite.node.position);
            }, t.prototype.initAlertStatus = function() {
                this.checkBagAlert(), this.checkRoleAlert(), this.checkSpriteAlert();
            }, t.prototype.checkRoleAlert = function() {
                i.default.instance.mainPlayer.unSeperatePoint > 0 ? this.nodeAlertRole.active = !0 : this.nodeAlertRole.active = !1;
            }, t.prototype.checkSpriteAlert = function() {
                r.default.instance.isFullBattle() ? this.nodeAlertSprite.active = !1 : this.nodeAlertSprite.active = !0;
            }, t.prototype.checkBagAlert = function() {
                o.default.instance.hasBetterEquip() ? this.nodeAlertBag.active = !0 : this.nodeAlertBag.active = !1;
            }, t.prototype.inviteFriends = function() {
                c.default.instance.LoadInviteFriendUI();
            }, t.instance = null, __decorate([ p(cc.Button) ], t.prototype, "bagButton", void 0), 
            __decorate([ p(cc.Button) ], t.prototype, "depotButton", void 0), __decorate([ p(cc.Button) ], t.prototype, "roleButton", void 0), 
            __decorate([ p(cc.Button) ], t.prototype, "mapButton", void 0), __decorate([ p(cc.Button) ], t.prototype, "buttonSprite", void 0), 
            __decorate([ p(cc.Label) ], t.prototype, "labelGold", void 0), __decorate([ p(cc.Label) ], t.prototype, "labelDaimond", void 0), 
            __decorate([ p(cc.Node) ], t.prototype, "nodeAlertRole", void 0), __decorate([ p(cc.Node) ], t.prototype, "nodeAlertSprite", void 0), 
            __decorate([ p(cc.Node) ], t.prototype, "nodeAlertBag", void 0), __decorate([ p(cc.Button) ], t.prototype, "btn_invite", void 0), 
            t = a = __decorate([ d ], t);
        }(cc.Component);
        a.default = m, cc._RF.pop();
    }, {
        "../battle/battle_manager": "battle_manager",
        "../common/allenum": "allenum",
        "../common/emmiter": "emmiter",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/sprite_manager": "sprite_manager",
        "../manager/ui_manager": "ui_manager",
        "../util": "util"
    } ],
    messagebox_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "313a1OxSrxP1aARiEBtxb/H", "messagebox_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../controller/ui/cost_items"), i = cc._decorator, r = i.ccclass, o = i.property, s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.maskNode = null, t.labelTitle = null, t.labelDesc = null, 
                t.buttonCancel = null, t.buttonConfirm = null, t.costItems = null, t.curCallBack = null, 
                t.curParam = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.buttonCancel.node.on("click", this.cancel, this), this.buttonConfirm.node.on("click", this.confirm, this), 
                this.uiNode.active && (this.uiNode.active = !1);
            }, t.prototype.showUI = function(e, t, a, n, i) {
                void 0 === a && (a = null), void 0 === n && (n = null), void 0 === i && (i = null), 
                this.uiNode.active = !0, this.labelTitle.string = e, this.labelDesc.string = t, 
                null != n ? (this.costItems.node.active = !0, this.costItems.initByCostData(n)) : this.costItems.node.active = !1, 
                this.curCallBack = null != a ? a : null, this.curParam = i;
            }, t.prototype.cancel = function() {
                null != this.curCallBack && this.curCallBack(!1, this.curParam), this.hideUI();
            }, t.prototype.confirm = function() {
                null != this.curCallBack && this.curCallBack(!0, this.curParam), this.hideUI();
            }, t.prototype.hideUI = function() {
                this.uiNode.active = !1;
            }, t.instance = null, __decorate([ o(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ o(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ o(cc.Label) ], t.prototype, "labelTitle", void 0), 
            __decorate([ o(cc.Label) ], t.prototype, "labelDesc", void 0), __decorate([ o(cc.Button) ], t.prototype, "buttonCancel", void 0), 
            __decorate([ o(cc.Button) ], t.prototype, "buttonConfirm", void 0), __decorate([ o(n.default) ], t.prototype, "costItems", void 0), 
            t = a = __decorate([ r ], t);
        }(cc.Component);
        a.default = s, cc._RF.pop();
    }, {
        "../controller/ui/cost_items": "cost_items"
    } ],
    message: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "8aec0F8zrJOqpEf8YHGWbe1", "message"), Object.defineProperty(a, "__esModule", {
            value: !0
        }), function(e) {
            e[e.Error = 0] = "Error", e[e.PingRequest = 3] = "PingRequest", e[e.PongResponse = 4] = "PongResponse", 
            e[e.NewConnectRequest = 101] = "NewConnectRequest", e[e.NewConnectResponse = 102] = "NewConnectResponse", 
            e[e.GetUserInfoRequest = 103] = "GetUserInfoRequest", e[e.GetUserInfoResponse = 104] = "GetUserInfoResponse", 
            e[e.UpdatePlayerDataRequest = 105] = "UpdatePlayerDataRequest", e[e.UpdatePlayerDataResponse = 106] = "UpdatePlayerDataResponse", 
            e[e.AddPlayerAltarBuffRequest = 107] = "AddPlayerAltarBuffRequest", e[e.AddPlayerAltarBuffResponse = 108] = "AddPlayerAltarBuffResponse", 
            e[e.GetPlayerAltarBuffRequest = 109] = "GetPlayerAltarBuffRequest", e[e.GetPlayerAltarBuffResponse = 110] = "GetPlayerAltarBuffResponse", 
            e[e.PlayerAddPointRequest = 111] = "PlayerAddPointRequest", e[e.PlayerAddPointResponse = 112] = "PlayerAddPointResponse", 
            e[e.PlayerSkillAddRequest = 113] = "PlayerSkillAddRequest", e[e.PlayerSkillAddResponse = 114] = "PlayerSkillAddResponse", 
            e[e.PlayerSkillLevelUpRequest = 115] = "PlayerSkillLevelUpRequest", e[e.PlayerSkillLevelUpResponse = 116] = "PlayerSkillLevelUpResponse", 
            e[e.GetPlayerSkillRequest = 117] = "GetPlayerSkillRequest", e[e.GetPlayerSkillResponse = 118] = "GetPlayerSkillResponse", 
            e[e.PlayerUseSkillRequest = 119] = "PlayerUseSkillRequest", e[e.PlayerUseSkillResponse = 120] = "PlayerUseSkillResponse", 
            e[e.PlayerSpriteAddRequest = 121] = "PlayerSpriteAddRequest", e[e.PlayerSpriteAddResponse = 122] = "PlayerSpriteAddResponse", 
            e[e.PlayerSpriteLevelUpRequest = 123] = "PlayerSpriteLevelUpRequest", e[e.PlayerSpriteLevelUpResponse = 124] = "PlayerSpriteLevelUpResponse", 
            e[e.GetPlayerSpriteRequest = 125] = "GetPlayerSpriteRequest", e[e.GetPlayerSpriteResponse = 126] = "GetPlayerSpriteResponse", 
            e[e.PlayerUseSpriteRequest = 127] = "PlayerUseSpriteRequest", e[e.PlayerUseSpriteResponse = 128] = "PlayerUseSpriteResponse", 
            e[e.PlayerSpriteRemoveRequest = 129] = "PlayerSpriteRemoveRequest", e[e.PlayerSpriteRemoveResponse = 130] = "PlayerSpriteRemoveResponse", 
            e[e.AddItemToBagRequest = 131] = "AddItemToBagRequest", e[e.AddItemToBagResponse = 132] = "AddItemToBagResponse", 
            e[e.RemoveItemFromBagRequest = 133] = "RemoveItemFromBagRequest", e[e.RemoveItemFromBagResponse = 134] = "RemoveItemFromBagResponse", 
            e[e.AddItemFromBagToEquipRequest = 135] = "AddItemFromBagToEquipRequest", e[e.AddItemFromBagToEquipResponse = 136] = "AddItemFromBagToEquipResponse", 
            e[e.AddItemFromEquipToBagRequest = 137] = "AddItemFromEquipToBagRequest", e[e.AddItemFromEquipToBagResponse = 138] = "AddItemFromEquipToBagResponse", 
            e[e.AddItemFromBagToDepotRequest = 139] = "AddItemFromBagToDepotRequest", e[e.AddItemFromBagToDepotResponse = 140] = "AddItemFromBagToDepotResponse", 
            e[e.AddItemFromDepotToBagRequest = 141] = "AddItemFromDepotToBagRequest", e[e.AddItemFromDepotToBagResponse = 142] = "AddItemFromDepotToBagResponse", 
            e[e.GetBagRequest = 143] = "GetBagRequest", e[e.GetBagResponse = 144] = "GetBagResponse", 
            e[e.GetEquipRequest = 145] = "GetEquipRequest", e[e.GetEquipResponse = 146] = "GetEquipResponse", 
            e[e.GetDepotRequest = 147] = "GetDepotRequest", e[e.GetDepotResponse = 148] = "GetDepotResponse", 
            e[e.UpdatePlayerAchievementResponse = 149] = "UpdatePlayerAchievementResponse", 
            e[e.GetPlayerAchievementRewardRequest = 150] = "GetPlayerAchievementRewardRequest", 
            e[e.GetPlayerAchievementRewardResponse = 151] = "GetPlayerAchievementRewardResponse", 
            e[e.UpdatePlayerCanUseTitleResponse = 152] = "UpdatePlayerCanUseTitleResponse", 
            e[e.PlayerUseTitleRequest = 153] = "PlayerUseTitleRequest", e[e.PlayerUseTitleResponse = 154] = "PlayerUseTitleResponse", 
            e[e.FastRemoveItemFromBagRequest = 155] = "FastRemoveItemFromBagRequest", e[e.FastRemoveItemFromBagResponse = 156] = "FastRemoveItemFromBagResponse", 
            e[e.ActiveEquipRequest = 157] = "ActiveEquipRequest", e[e.ActiveEquipResponse = 158] = "ActiveEquipResponse", 
            e[e.StengthItemRequest = 200] = "StengthItemRequest", e[e.StengthItemResponse = 201] = "StengthItemResponse", 
            e[e.RefreshItemRequest = 300] = "RefreshItemRequest", e[e.RefreshItemResponse = 301] = "RefreshItemResponse", 
            e[e.PlayerNewLifeRequest = 400] = "PlayerNewLifeRequest", e[e.PlayerNewLifeResponse = 401] = "PlayerNewLifeResponse", 
            e[e.GetTodayRewardRequest = 500] = "GetTodayRewardRequest", e[e.GetTodayRewardResponse = 501] = "GetTodayRewardResponse", 
            e[e.PlayerNewEventRequest = 600] = "PlayerNewEventRequest", e[e.PlayerNewEventResponse = 601] = "PlayerNewEventResponse", 
            e[e.PlayerTriggerEventRequest = 602] = "PlayerTriggerEventRequest", e[e.PlayerTriggerEventResponse = 603] = "PlayerTriggerEventResponse", 
            e[e.GetEventCardDataRequest = 604] = "GetEventCardDataRequest", e[e.GetEventCardDataResponse = 605] = "GetEventCardDataResponse", 
            e[e.RefreshAllEventsRequest = 606] = "RefreshAllEventsRequest", e[e.RefreshAllEventsResponse = 607] = "RefreshAllEventsResponse", 
            e[e.ShareRefreshEventRequest = 608] = "ShareRefreshEventRequest", e[e.ShareRefreshEventResponse = 609] = "ShareRefreshEventResponse", 
            e[e.PlayerChangeNameRequest = 701] = "PlayerChangeNameRequest", e[e.PlayerChangeNameResponse = 702] = "PlayerChangeNameResponse", 
            e[e.PlayerReconnectRequest = 703] = "PlayerReconnectRequest", e[e.PlayerReconnectResponse = 704] = "PlayerReconnectResponse", 
            e[e.OfflineMessageResponse = 705] = "OfflineMessageResponse", e[e.PlayerBeingKickResponse = 706] = "PlayerBeingKickResponse", 
            e[e.PlayerShowAdRequest = 707] = "PlayerShowAdRequest", e[e.PlayerShowAdResponse = 708] = "PlayerShowAdResponse", 
            e[e.PlayerSignRequest = 709] = "PlayerSignRequest", e[e.PlayerSignResponse = 710] = "PlayerSignResponse", 
            e[e.ServerOverDayResponse = 711] = "ServerOverDayResponse", e[e.PlayerKillMonsterRequest = 712] = "PlayerKillMonsterRequest", 
            e[e.PlayerOverComeDungeonRequest = 713] = "PlayerOverComeDungeonRequest", e[e.GetCollectionBounsRequest = 714] = "GetCollectionBounsRequest", 
            e[e.GetCollectionBounsResponse = 715] = "GetCollectionBounsResponse", e[e.PlayerBuyBlackMarketRequest = 717] = "PlayerBuyBlackMarketRequest", 
            e[e.PlayerBuyBlackMarketResponse = 718] = "PlayerBuyBlackMarketResponse", e[e.PlayerAttackMonsterRequest = 719] = "PlayerAttackMonsterRequest", 
            e[e.PlayerAttackMonsterResponse = 720] = "PlayerAttackMonsterResponse", e[e.PlayerApplyChatRoomRequest = 801] = "PlayerApplyChatRoomRequest", 
            e[e.PlayerApplyChatRoomResponse = 802] = "PlayerApplyChatRoomResponse", e[e.PlayerChatRoomSendRequest = 803] = "PlayerChatRoomSendRequest", 
            e[e.PlayerChatRoomSendResponse = 804] = "PlayerChatRoomSendResponse", e[e.SyncChatRoomMsgResponse = 805] = "SyncChatRoomMsgResponse", 
            e[e.PlayerGetChatRoomListRequest = 806] = "PlayerGetChatRoomListRequest", e[e.PlayerGetChatRoomListResponse = 807] = "PlayerGetChatRoomListResponse", 
            e[e.BlendMonsterGemRequest = 901] = "BlendMonsterGemRequest", e[e.BlendMonsterGemResponse = 902] = "BlendMonsterGemResponse", 
            e[e.AddMonsterGemFromBagToEquipRequest = 903] = "AddMonsterGemFromBagToEquipRequest", 
            e[e.AddMonsterGemFromBagToEquipResponse = 904] = "AddMonsterGemFromBagToEquipResponse", 
            e[e.AddMonsterGemFromEquipToBagRequest = 905] = "AddMonsterGemFromEquipToBagRequest", 
            e[e.AddMonsterGemFromEquipToBagResponse = 906] = "AddMonsterGemFromEquipToBagResponse", 
            e[e.AddEquipHoleRequest = 907] = "AddEquipHoleRequest", e[e.AddEquipHoleResponse = 908] = "AddEquipHoleResponse", 
            e[e.AddMonsterGemResponse = 909] = "AddMonsterGemResponse", e[e.PlayerProduceMonsterGemResponse = 910] = "PlayerProduceMonsterGemResponse", 
            e[e.SyncReferUserResponse = 1001] = "SyncReferUserResponse", e[e.GetReferUserRewardRequest = 1002] = "GetReferUserRewardRequest", 
            e[e.GetReferUserRewardResponse = 1003] = "GetReferUserRewardResponse", e[e.PlayerSyncMoneyResponse = 1101] = "PlayerSyncMoneyResponse", 
            e[e.PlayerSyncLevelResponse = 1102] = "PlayerSyncLevelResponse", e[e.PlayerSyncSpriteResponse = 1103] = "PlayerSyncSpriteResponse", 
            e[e.PlayerSyncEquipResponse = 1104] = "PlayerSyncEquipResponse";
        }(a.MessageNo || (a.MessageNo = {})), function(e) {
            e[e.Error = 0] = "Error", e[e.Login = 1] = "Login", e[e.GamePlay = 2] = "GamePlay";
        }(a.MessageType || (a.MessageType = {})), cc._RF.pop();
    }, {} ],
    miss_effect: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "af35dviLTdM3IMhSEc3J3MK", "miss_effect"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, r = (n.property, function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this;
            }
            return __extends(t, e), t.prototype.Init = function() {
                this.node.opacity = 255;
            }, t = __decorate([ i ], t);
        }(cc.Component));
        a.default = r, cc._RF.pop();
    }, {} ],
    money_bar_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "b71fa4ZXoRKpLX+EJXpJwCP", "money_bar_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, r = n.property, o = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.daimondSprite = null, t.goldSprite = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this;
            }, t.prototype.start = function() {}, t.prototype.getDaimondWorldPos = function() {
                return this.daimondSprite.node.parent.convertToWorldSpaceAR(this.daimondSprite.node.position);
            }, t.prototype.getGoldWorldPos = function() {
                return this.goldSprite.node.parent.convertToWorldSpaceAR(this.goldSprite.node.position);
            }, t.instance = null, __decorate([ r(cc.Sprite) ], t.prototype, "daimondSprite", void 0), 
            __decorate([ r(cc.Sprite) ], t.prototype, "goldSprite", void 0), t = a = __decorate([ i ], t);
        }(cc.Component);
        a.default = o, cc._RF.pop();
    }, {} ],
    monster: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "03fd4nomIxN3Z1XaORK3cc9", "monster"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../audio_manager"), i = e("./entity"), r = e("../components/ShaderHelper"), o = e("../math/rand"), s = e("../manager/pool_manager"), l = e("../battle/battle_manager"), c = e("../manager/data_manager"), u = e("../manager/resource_manager"), d = e("../manager/effect_manager"), p = cc._decorator, m = p.ccclass, f = p.property, g = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.nodeAddHp = null, t.AniRole = null, t.SpriteCur = null, t.SpriteHpBar = null, 
                t.LabelName = null, t.LabelBossTag = null, t.shaderHelper = null, t.baseID = 0, 
                t._isBoss = !1, t;
            }
            return __extends(t, e), t.prototype.start = function() {
                this.initMonster();
            }, t.prototype.initMonster = function() {
                this.AniRole.play("being_idle"), this.SpriteHpBar.fillStart = 0, this.SpriteHpBar.node.parent.active = !0, 
                this.LabelName.node.active = !0, this.LabelBossTag.node.active = !1;
            }, t.prototype.initMonsterData = function(e, t, a) {
                void 0 === a && (a = 1), this.baseID = e, this._isBoss = t;
                var n = c.default.instance.monsterData[e];
                this.init(n.str, n.agi, n.pow, n.ene, n.hp, n.mp, 0, n.defence), this.init2(n.minDam, n.maxDam, n.doubleAtt, n.realDam), 
                this.attInterval = n.att_interval, this.setAttIntervalReduce(0), this.hitVal = n.hit, 
                this.blockVal = n.block, this.attAddHpPercent = n.att_add_hp, this.frozenDamage = n.frozen_damage, 
                this.blazeDamage = n.blaze_damage, this.poisonDamage = n.poison_damage, this.lightDamage = n.light_damage, 
                this.frozenDefence = n.frozen_defence, this.blazeDefence = n.blaze_defence, this.lightDefence = n.light_defence, 
                this.poisonDefence = n.poison_defence, this.lv = n.lv, this.physicsDefenceRate = n.phyDef, 
                this.LabelName.string = n.name + " Lv" + this.lv, this.SpriteCur.spriteFrame = u.default.instance.getMonsterSprite(n.icon_path), 
                this.SpriteCur.node.setContentSize(100 * n.icon_scale * a, 100 * n.icon_scale * a), 
                this.initMonster();
            }, t.prototype.initMonsterDataByEntity = function(e, t) {
                this.baseID = t;
                var a = c.default.instance.monsterData[t];
                this.init(e.strength, e.agile, e.power, e.energy, Math.floor(e.maxhp / 2), e.mp, 0, 0), 
                this.init2(.5 * e.minDamage, .5 * e.maxDamage, 0, 0), this.attInterval = a.att_interval, 
                this.hitVal = a.hit, this.blockVal = a.block, this.attAddHpPercent = a.att_add_hp, 
                this.frozenDamage = a.frozen_damage, this.blazeDamage = a.blaze_damage, this.poisonDamage = a.poison_damage, 
                this.lightDamage = a.light_damage, this.frozenDefence = a.frozen_defence, this.blazeDefence = a.blaze_defence, 
                this.lightDefence = a.light_defence, this.poisonDefence = a.poison_defence, this.lv = e.lv, 
                this.physicsDefenceRate = a.phyDef, this.LabelName.string = a.name + " Lv" + this.lv, 
                this.SpriteCur.spriteFrame = u.default.instance.getMonsterSprite(a.icon_path), this.SpriteCur.node.setContentSize(100 * a.icon_scale, 100 * a.icon_scale), 
                this.initMonster();
            }, t.prototype.setDiffChange = function(e) {
                this.changeMaxhp((e - 1) * this.maxhp), this.addMinDamage((e - 1) * this.minDamage), 
                this.addMaxDamage((e - 1) * this.maxDamage), this.changeRealDamage((e - 1) * this.realDamage), 
                this.changeFrozenDamage((e - 1) * this.frozenDamage), this.changeBlazeDamage((e - 1) * this.blazeDamage), 
                this.changePoisonDamage((e - 1) * this.poisonDamage), this.changeLightDamage((e - 1) * this.lightDamage);
            }, t.prototype.setDiffAttr = function(e) {
                var t = e;
                for (var a in t) this.addAttrByType(a, t[a]);
                this.fullfill();
            }, t.prototype.addAttrByType = function(e, t) {
                switch (e) {
                  case "物理免伤":
                    this.physicsDefenceRate += t;
                    break;

                  case "攻击速度":
                    this.attInterval = t;
                    break;

                  case "攻击加速":
                    this.AddAttIntervalReduce(t);
                    break;

                  case "攻击吸血":
                    this.changeAttAddHpPercent(t);
                    break;

                  case "命中值":
                    this.changeHitValRate(t);
                    break;

                  case "伤害":
                    this.addMinDamage(-100000000), this.addMaxDamage(-100000000);
                    break;

                  case "生命":
                    this.changeMaxhp(t);
                    break;

                  case "等级":
                    this.lv += t;
                    var a = c.default.instance.monsterData[this.baseID];
                    this.LabelName.string = a.name + " Lv" + this.lv;
                }
            }, t.prototype.KillThis = function() {
                this.beingHit(this.hp), s.default.instance.RemoveMonster(this.node);
            }, t.prototype.AttackOther = function(e) {
                if (this.attAddHpPercent > 0) {
                    var t = Math.floor(this.attAddHpPercent * e);
                    this.addHp(t), d.default.instance.PlayAddHPEffect(this.nodeAddHp, t);
                }
                if (this.attAddMpPercent > 0) {
                    var a = Math.floor(this.attAddMpPercent * e);
                    this.addMp(a);
                }
            }, t.prototype.BeingAttack = function(e) {
                this.beingHit(e), n.default.instance.PlayBeingAttack();
                var t = 1 - this.getCurPercentLife();
                if (this.isDead()) {
                    this.SpriteHpBar.fillStart = 0, this.SpriteHpBar.node.parent.active = !1, this.LabelName.node.active = !1, 
                    this.LabelBossTag.node.active = !1, o.default.getZeroToOne() > .3 ? this.AniRole.play("enemy_dead1") : o.default.getZeroToOne() > .6 ? this.AniRole.play("enemy_dead2") : this.AniRole.play("enemy_dead3");
                    var a = this;
                    this.scheduleOnce(function() {
                        s.default.instance.RemoveMonster(a.node);
                    }, 3);
                } else this.shaderHelper.play(), this.scheduleOnce(function() {
                    this.shaderHelper.stop();
                }, .2), this.AniRole.play("being_attack"), this.SpriteHpBar.fillStart = t;
            }, t.prototype.update = function(e) {
                if (this.buffData.update(e), !this.isDead()) {
                    if (!this.canAction()) return;
                    this.canAttack() ? (this.lastAttTime = 0, this.attack()) : this.lastAttTime = this.lastAttTime + e;
                }
            }, t.prototype.attack = function() {
                l.default.instance.MonsterAttack(), this.AniRole.play("attack");
            }, Object.defineProperty(t.prototype, "isBoss", {
                get: function() {
                    return this._isBoss;
                },
                enumerable: !0,
                configurable: !0
            }), __decorate([ f(cc.Node) ], t.prototype, "nodeAddHp", void 0), __decorate([ f(cc.Animation) ], t.prototype, "AniRole", void 0), 
            __decorate([ f(cc.Sprite) ], t.prototype, "SpriteCur", void 0), __decorate([ f(cc.Sprite) ], t.prototype, "SpriteHpBar", void 0), 
            __decorate([ f(cc.Label) ], t.prototype, "LabelName", void 0), __decorate([ f(cc.Label) ], t.prototype, "LabelBossTag", void 0), 
            __decorate([ f(r) ], t.prototype, "shaderHelper", void 0), t = __decorate([ m ], t);
        }(i.default);
        a.default = g, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../battle/battle_manager": "battle_manager",
        "../components/ShaderHelper": "ShaderHelper",
        "../manager/data_manager": "data_manager",
        "../manager/effect_manager": "effect_manager",
        "../manager/pool_manager": "pool_manager",
        "../manager/resource_manager": "resource_manager",
        "../math/rand": "rand",
        "./entity": "entity"
    } ],
    network_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "464cfQbGJhPg57CQUVK9QuD", "network_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../common/config"), i = e("../common/message"), r = e("../common/emmiter"), o = e("./game_manager"), s = e("../network/player_network"), l = function() {
            function e() {}
            return e.Init = function() {
                this.initNetwork();
            }, e.initNetwork = function() {
                "WebSocket" in window ? console.log("浏览器支持websocket") : console.log("浏览器不支持websocket"), 
                e.Clear();
                var t = n.Config.ServerIP, a = new WebSocket(t);
                console.log("开始连接：", t), a.onopen = function(t) {
                    console.log("Websocket连接成功");
                    var a = {
                        Token: o.default.instance.token
                    };
                    e.SendMessage(i.MessageNo.NewConnectRequest, i.MessageType.Login, a);
                }, a.onmessage = function(t) {
                    e.OnMessage(t);
                }, a.onerror = function(e) {
                    console.log("Send Text fired an error,", e), o.default.instance.ReInitNetwork();
                }, a.onclose = function(e) {
                    console.log("WebSocket instance closed.  error code :", e.code);
                }, e.webSocket = a;
            }, e.GetWebSocketState = function() {
                return e.webSocket.readyState;
            }, e.ReconnectToServer = function() {
                var t = n.Config.ServerIP, a = new WebSocket(t);
                console.log("开始重连：", t), a.onopen = function(t) {
                    console.log("ReconnectToServer Success!"), e.isDrop = !1, s.default.instance.PlayerReconnectRequest(o.default.instance.token);
                }, a.onmessage = function(t) {
                    e.OnMessage(t);
                }, a.onerror = function(e) {
                    console.log("Send Text fired an error,", e);
                }, a.onclose = function(t) {
                    e.isDrop = !0, console.log("WebSocket instance closed.  error code :", t.code);
                }, e.webSocket = a;
            }, e.DisconnectTest = function() {
                null != e.webSocket && e.webSocket.onopen && (console.log("当前链接已经存在，先关闭"), e.webSocket.close(), 
                e.webSocket = null), e.isDrop = !0;
            }, e.Clear = function() {
                null != e.webSocket && e.webSocket.onopen && (console.log("当前链接已经存在，先关闭"), e.webSocket.close(), 
                e.webSocket = null), e.isDrop = !1, e.isGameStart = !1;
            }, e.IsOpen = function() {
                return e.webSocket.readyState === WebSocket.OPEN;
            }, e.SetGameStart = function() {
                e.isGameStart = !0;
            }, e.IsDrop = function() {
                return !(!e.isGameStart || !e.isDrop);
            }, e.OnMessage = function(t) {
                var a;
                try {
                    e.isJSON(t.data) ? (a = JSON.parse(t.data)) && r.Emitter.fire(e.GetEventID(a.ID, a.Type), a.Data) : e.processStickyBag(t.data);
                } catch (e) {
                    console.log(t.data);
                }
            }, e.processStickyBag = function(t) {
                t.toString().split("\n").forEach(function(t) {
                    if (e.isJSON(t)) {
                        var a = JSON.parse(t);
                        a && r.Emitter.fire(e.GetEventID(a.ID, a.Type), a.Data);
                    } else console.log(" error str: " + t);
                });
            }, e.GetEventID = function(e, t) {
                return "message_" + e + "_" + t;
            }, e.SendMessage = function(t, a, n) {
                var i = {
                    ID: t,
                    Type: a,
                    Data: n
                }, r = JSON.stringify(i);
                null != e.webSocket && e.IsOpen() && e.webSocket.send(r);
            }, e.isJSON = function(e) {
                if ("string" == typeof e) try {
                    JSON.parse(e);
                    return e.indexOf("{") > -1;
                } catch (e) {
                    return !1;
                }
                return !1;
            }, e.webSocket = null, e.isDrop = !1, e.isGameStart = !1, e;
        }();
        a.NetworkManager = l, cc._RF.pop();
    }, {
        "../common/config": "config",
        "../common/emmiter": "emmiter",
        "../common/message": "message",
        "../network/player_network": "player_network",
        "./game_manager": "game_manager"
    } ],
    notice_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "691d4DhfQ5HM6RVnHQ3gy5B", "notice_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/http_manager"), i = e("../common/config"), r = cc._decorator, o = r.ccclass, s = r.property, l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.maskNode = null, t.labelDesc = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideUI, this), this.uiNode.active && (this.uiNode.active = !1);
            }, t.prototype.hideUI = function() {
                this.uiNode.active = !1;
            }, t.prototype.showUI = function() {
                n.default.instance.Request(i.Config.AnnouncementUrl, {}, this.callBack);
            }, t.prototype.callBack = function(e, t) {
                e && (a.instance.uiNode.active = !0, a.instance.labelDesc.string = t.Data);
            }, t.instance = null, __decorate([ s(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ s(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ s(cc.Label) ], t.prototype, "labelDesc", void 0), 
            t = a = __decorate([ o ], t);
        }(cc.Component);
        a.default = l, cc._RF.pop();
    }, {
        "../common/config": "config",
        "../manager/http_manager": "http_manager"
    } ],
    offline_show_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "12206nVz+dBtbu7UeKW0VvA", "offline_show_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../util"), i = e("../manager/dynamic_data_manager"), r = e("../manager/data_manager"), o = cc._decorator, s = o.ccclass, l = o.property, c = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.confrimBtn = null, t.labelOfflineTime = null, t.labelBeatCount = null, 
                t.labelOfflineGlod = null, t.labelOfflineExp = null, t.labelOfflineEquip1 = null, 
                t.labelOfflineEquip2 = null, t.labelOfflineEquip3 = null, t.labelOfflineEquip4 = null, 
                t.gemNode = null, t.conten = null, t.labelGem = [], t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.confrimBtn.node.on("click", this.hideUI, this);
            }, t.prototype.hideUI = function() {
                this.uiNode.active = !1;
            }, t.prototype.showUI = function(e, t, a, o, s, l, c, u, d, p, m, f, g, h, _) {
                this.labelOfflineTime.string = "离线战斗时间：" + n.default.getTimeFormat(e);
                var y = i.default.instance.curLevel, v = r.default.instance.levelData[y], b = "普通";
                2 == i.default.instance.curDiff ? b = "困难" : 3 == i.default.instance.curDiff && (b = "地狱"), 
                this.labelBeatCount.string = "您在" + b + "难度【" + v.name + "】击败了" + t + "只怪物", this.labelOfflineGlod.string = "获得金币：" + n.default.GetLargeNumStr(a), 
                this.labelOfflineExp.string = "获得经验：" + n.default.GetLargeNumStr(o) + " 等级：" + s + " -> " + l;
                var D = "普通装备 X " + c;
                u > 0 && (D += "[自动出售 X " + u + "]"), this.labelOfflineEquip1.string = D;
                var I = "稀有装备 X " + d;
                p > 0 && (I += "[自动出售 X " + p + "]"), this.labelOfflineEquip2.string = I;
                var P = "卓越装备 X " + m;
                f > 0 && (P += "[自动出售 X " + f + "]"), this.labelOfflineEquip3.string = P;
                var B = "史诗装备 X " + g;
                h > 0 && (B += "[自动出售 X " + h + "]"), this.labelOfflineEquip4.string = B;
                var S = this.getMapNumGem(_);
                if (this.conten.height = 400, S.length > 0) {
                    for (var R in this.labelGem) {
                        var k = Number(R) + 1;
                        S[k] ? this.labelGem[R].string = this.selectGemLevel(Number(k)) + "魔晶 X " + S[k] : (this.labelGem[R].node.active = !1, 
                        this.conten.height -= 35);
                    }
                    this.gemNode.active = !0;
                } else this.gemNode.active = !1;
                this.uiNode.active = !0;
            }, t.prototype.selectGemLevel = function(e) {
                switch (e) {
                  case 1:
                    return "一级";

                  case 2:
                    return "二级";

                  case 3:
                    return "三级";

                  case 4:
                    return "四级";

                  case 5:
                    return "五级";
                }
            }, t.prototype.getMapNumGem = function(e) {
                var t = [];
                for (var a in e) {
                    var n = r.default.instance.monsterGemData[e[a]];
                    t[n.lv] ? t[n.lv] += 1 : t[n.lv] = 1;
                }
                return t;
            }, t.instance = null, __decorate([ l(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ l(cc.Button) ], t.prototype, "confrimBtn", void 0), __decorate([ l(cc.Label) ], t.prototype, "labelOfflineTime", void 0), 
            __decorate([ l(cc.Label) ], t.prototype, "labelBeatCount", void 0), __decorate([ l(cc.Label) ], t.prototype, "labelOfflineGlod", void 0), 
            __decorate([ l(cc.Label) ], t.prototype, "labelOfflineExp", void 0), __decorate([ l(cc.Label) ], t.prototype, "labelOfflineEquip1", void 0), 
            __decorate([ l(cc.Label) ], t.prototype, "labelOfflineEquip2", void 0), __decorate([ l(cc.Label) ], t.prototype, "labelOfflineEquip3", void 0), 
            __decorate([ l(cc.Label) ], t.prototype, "labelOfflineEquip4", void 0), __decorate([ l(cc.Node) ], t.prototype, "gemNode", void 0), 
            __decorate([ l(cc.Node) ], t.prototype, "conten", void 0), __decorate([ l(cc.Label) ], t.prototype, "labelGem", void 0), 
            t = a = __decorate([ s ], t);
        }(cc.Component);
        a.default = c, cc._RF.pop();
    }, {
        "../manager/data_manager": "data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../util": "util"
    } ],
    player_network: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "17d820wKvRNnq5dj/rvvxsp", "player_network"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/dynamic_data_manager"), i = e("../manager/network_manager"), r = e("../common/message"), o = e("../common/emmiter"), s = e("../manager/game_manager"), l = e("../manager/skill_manager"), c = e("../manager/help_manager"), u = e("../manager/reward_manager"), d = e("../manager/sprite_manager"), p = e("../manager/random_event_manager"), m = e("../manager/blackmarket_manager"), f = e("../manager/data_manager"), g = e("../ui/battle_ui_manager"), h = e("../battle/battle_manager"), _ = e("../ui/item/ad_item"), y = e("../ui/changname_ui_manager"), v = e("../ui/sign_ui_manager"), b = e("../manager/achievenment_manager"), D = e("../ui/chat_ui_manager"), I = e("../common/allenum"), P = e("../ui/learn_skill_manager"), B = e("../ui/bag_ui_manager"), S = e("../ui/gem_tip_ui_manager"), R = e("../manager/effect_manager"), k = e("../manager/ui_manager"), A = function() {
            function e() {}
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.init = function() {
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.GetUserInfoResponse, r.MessageType.GamePlay), this.GetUserInfoResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.UpdatePlayerDataResponse, r.MessageType.GamePlay), this.UpdatePlayerDataResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.GetPlayerAltarBuffResponse, r.MessageType.GamePlay), this.GetPlayerAltarBuffResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerAddPointResponse, r.MessageType.GamePlay), this.PlayerAddPointResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.AddPlayerAltarBuffResponse, r.MessageType.GamePlay), this.AddPlayerAltarBuffResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.GetPlayerSkillResponse, r.MessageType.GamePlay), this.GetPlayerSkillResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerSkillAddResponse, r.MessageType.GamePlay), this.PlayerSkillAddResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerSkillLevelUpResponse, r.MessageType.GamePlay), this.PlayerSkillLevelUpResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerUseSkillResponse, r.MessageType.GamePlay), this.PlayerUseSkillResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerNewLifeResponse, r.MessageType.GamePlay), this.PlayerNewLifeResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.GetTodayRewardResponse, r.MessageType.GamePlay), this.GetTodayRewardResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerChangeNameResponse, r.MessageType.GamePlay), this.PlayerChangeNameResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerReconnectResponse, r.MessageType.GamePlay), this.PlayerReconnectResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.OfflineMessageResponse, r.MessageType.GamePlay), this.OfflineMessageResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerBeingKickResponse, r.MessageType.GamePlay), this.PlayerBeingKickResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerShowAdResponse, r.MessageType.GamePlay), this.PlayerShowAdResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerSignResponse, r.MessageType.GamePlay), this.PlayerSignResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.GetCollectionBounsResponse, r.MessageType.GamePlay), this.GetCollectionBounsResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerBuyBlackMarketResponse, r.MessageType.GamePlay), this.PlayerBuyBlackMarketResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerApplyChatRoomResponse, r.MessageType.GamePlay), this.PlayerApplyChatRoomResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.SyncChatRoomMsgResponse, r.MessageType.GamePlay), this.SyncChatRoomMsgResponseIDC, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerChatRoomSendResponse, r.MessageType.GamePlay), this.PlayerChatRoomSendResponseIDC, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerGetChatRoomListResponse, r.MessageType.GamePlay), this.PlayerGetChatRoomListResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerSyncMoneyResponse, r.MessageType.GamePlay), this.PlayerSyncMoneyResponseIDC, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerProduceMonsterGemResponse, r.MessageType.GamePlay), this.PlayerProduceMonsterGemResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.BlendMonsterGemResponse, r.MessageType.GamePlay), this.BlendMonsterGemResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.SyncReferUserResponse, r.MessageType.GamePlay), this.SyncReferUserResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.GetReferUserRewardResponse, r.MessageType.GamePlay), this.GetReferUserRewardResponse, this), 
                o.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerSyncLevelResponse, r.MessageType.GamePlay), this.PlayerSyncLevelResponse, this);
            }, e.prototype.UpdatePlayerBaseData = function(e) {
                void 0 === e && (e = !1);
                var t = h.default.instance.curBeatCount;
                e || (t -= 1);
                var a = n.default.instance.getMainPlayer(), o = {
                    Lv: a.lv,
                    Exp: a.exp,
                    DungeonFloor: t,
                    DungeonLevel: n.default.instance.curLevel,
                    DungeonMaxLevel: n.default.instance.playerMaxLV,
                    DungeonDiff: n.default.instance.curDiff,
                    DungeonMaxDiffLevel: n.default.instance.playerMaxDiffLV,
                    DungeonMaxHellLevel: n.default.instance.playerMaxHellLV,
                    MoneyNum: n.default.instance.goldNum,
                    DaimondNum: n.default.instance.daimondNum
                };
                i.NetworkManager.SendMessage(r.MessageNo.UpdatePlayerDataRequest, r.MessageType.GamePlay, o);
            }, e.prototype.UpdatePlayerDataResponse = function(e, t) {}, e.prototype.PlayerBeingKickResponse = function(e, t) {
                var a = "", n = "";
                t.Title && (a = t.Title), t.Message && (n = t.Message), s.default.instance.PlayerBeingKickOffline(a, n);
            }, e.prototype.GetUserInfoResponse = function(e, t) {
                var a = n.default.instance.getMainPlayer();
                a.initAllToDefault();
                var i = f.default.instance.globalValueData.player_base_attr;
                for (var r in i.params) n.default.instance.addAttrByType(r, i.params[r]);
                if (n.default.instance.EquipItemDataMap = {}, n.default.instance.BagItemDataMap = {}, 
                n.default.instance.DepotItemDataMap = {}, d.default.instance.spritesMap = {}, p.default.instance.events = {}, 
                u.default.instance.setDefault(), n.default.instance.AltarBuffData = [], m.default.instance.setDefault(), 
                l.default.instance.skills = [], l.default.instance.setUpIndexs = [], n.default.instance.EquipItemAllDatas = {}, 
                a.lv = t.Lv, a.exp = t.Exp, a.addBaseStrength(t.StrPoint), a.addBasePower(t.PowPoint), 
                a.addBaseAgile(t.AgiPoint), a.addBaseEnergy(t.EnePoint), a.unSeperatePoint = t.UnusePoint, 
                a.fullfill(), n.default.instance.daimonNum = t.DaimondNum, n.default.instance.goldNum = t.MoneyNum, 
                t.DungeonFloor && (h.default.instance.curBeatCount = t.DungeonFloor), t.DungeonLevel && (n.default.instance.curLevel = t.DungeonLevel), 
                n.default.instance.playerMaxLV = t.DungeonMaxLevel, n.default.instance.newLiftCount = t.NewLiftCount, 
                t.DungeonDiff && (n.default.instance.curDiff = t.DungeonDiff), t.DungeonMaxDiffLevel && (n.default.instance.playerMaxDiffLV = t.DungeonMaxDiffLevel), 
                t.DungeonMaxHellLevel && (n.default.instance.playerMaxHellLV = t.DungeonMaxHellLevel), 
                t.ServerUnix && n.default.instance.UpdateServerTime(t.ServerUnix), t.LeftAdCount && (n.default.instance.playerLeftADShow = t.LeftAdCount), 
                t.AchievementTitleType && (b.default.instance.curTitleType = t.AchievementTitleType), 
                t.SignCount && (n.default.instance.signTotalCount = t.SignCount), 1 == t.CanSign && (n.default.instance.canSign = !0), 
                o.Emitter.fire(I.AlertType.SignAlert.toString()), t.IsGetCollectionBonus && (n.default.instance.isGetCollectionBonus = t.IsGetCollectionBonus), 
                t.MonsterGemData) for (var c in t.MonsterGemData) t.MonsterGemData[c] && n.default.instance.AddGemItenByServer(Number(c), t.MonsterGemData[c]);
                t.RoleName && (n.default.instance.roleName = t.RoleName), t.ID && (n.default.instance.id = t.ID), 
                u.default.instance.initByNetwork(t.TotalGetRewardCount, t.TodayGetRewardCount, t.LastGetRewardTimestamp), 
                t.ReferUserData && (n.default.instance.referUserData = t.ReferUserData), t.ChatRoomID && (n.default.instance.chatRoomID = t.ChatRoomID), 
                t.EquipActiveIndex && (n.default.instance.curUseEquipPlanIndex = t.EquipActiveIndex), 
                s.default.instance.RequireAllNetworkInitData();
            }, e.prototype.GetPlayerAltarBuffResponse = function(e, t) {
                if (t.AltarDatas) for (var a in t.AltarDatas) n.default.instance.AddAltarByServer(t.AltarDatas[a]);
                s.default.instance.CheckedOneInit();
            }, e.prototype.AddPlayerAltarBuff = function(e, t) {
                var a = {
                    BuffID: Number(e),
                    Action: t
                };
                i.NetworkManager.SendMessage(r.MessageNo.AddPlayerAltarBuffRequest, r.MessageType.GamePlay, a);
            }, e.prototype.AddPlayerAltarBuffResponse = function(e, t) {}, e.prototype.PlayerAddPoint = function(e, t) {
                var a = {
                    PointType: e,
                    Num: t
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerAddPointRequest, r.MessageType.GamePlay, a);
            }, e.prototype.PlayerAddPointResponse = function(e, t) {}, e.prototype.GetPlayerSkillResponse = function(e, t) {
                for (var a in t) l.default.instance.addSkill(t[a].ID, t[a].Lv);
                for (var a in t) if (t[a].IsUp) {
                    var n = l.default.instance.getIndexBySkillID(t[a].ID);
                    l.default.instance.setUpSkill(n);
                }
                s.default.instance.CheckedOneInit();
            }, e.prototype.PlayerAddSkill = function(e) {
                var t = {
                    ID: Number(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerSkillAddRequest, r.MessageType.GamePlay, t);
            }, e.prototype.PlayerSkillAddResponse = function(e, t) {
                t.IsOk && P.default.instance.learnSkillSuccess();
            }, e.prototype.PlayerSkillLevelUp = function(e) {
                var t = {
                    ID: Number(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerSkillLevelUpRequest, r.MessageType.GamePlay, t);
            }, e.prototype.PlayerSkillLevelUpResponse = function(e, t) {
                t.IsOk && P.default.instance.learnSkillSuccess();
            }, e.prototype.PlayerUseSkill = function(e, t) {
                var a = {
                    ID: Number(e),
                    IsUp: t
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerUseSkillRequest, r.MessageType.GamePlay, a);
            }, e.prototype.PlayerUseSkillResponse = function(e, t) {}, e.prototype.PlayerNewLifeRequest = function(e) {
                var t = {
                    Lv: Number(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerNewLifeRequest, r.MessageType.GamePlay, t);
            }, e.prototype.PlayerNewLifeResponse = function(e, t) {
                t.IsOk && c.default.instance.playerNewLift();
            }, e.prototype.GetTodayRewardRequest = function(e) {
                var t = {
                    RewardID: Number(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.GetTodayRewardRequest, r.MessageType.GamePlay, t);
            }, e.prototype.GetTodayRewardResponse = function(e, t) {
                t.IsOk && u.default.instance.getRewardNetwork(t.LastGetRewardTimestamp);
            }, e.prototype.PlayerChangeName = function(e) {
                var t = {
                    Name: e
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerChangeNameRequest, r.MessageType.GamePlay, t);
            }, e.prototype.PlayerChangeNameResponse = function(e, t) {
                t.Name && (t.IsOK ? (n.default.instance.roleName = t.Name, g.default.instance.updatePlayerName(), 
                y.default.instance.hideUI()) : k.default.instance.LoadTipsByStr("包含敏感信息，请重新输入"));
            }, e.prototype.PlayerReconnectRequest = function(e) {
                var t = {
                    Token: e
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerReconnectRequest, r.MessageType.GamePlay, t);
            }, e.prototype.PlayerReconnectResponse = function(e, t) {
                t.IsOk && s.default.instance.PlayerReconnectSuccee();
            }, e.prototype.OfflineMessageResponse = function(e, t) {
                k.default.instance.LoadOfflineRewardInfoUI(t.OfflineTime, t.BeatCount, t.GoldNum, t.Exp, t.FromLv, t.ToLv, t.Equip1Num, t.Equip1SellNum, t.Equip2Num, t.Equip2SellNum, t.Equip3Num, t.Equip3SellNum, t.Equip4Num, t.Equip4SellNum, t.MonsterGem);
            }, e.prototype.PlayerShowAdRequest = function() {
                i.NetworkManager.SendMessage(r.MessageNo.PlayerShowAdRequest, r.MessageType.GamePlay, {});
            }, e.prototype.PlayerShowAdResponse = function(e, t) {
                t.LeftAdCount && (n.default.instance.playerLeftADShow = t.LeftAdCount, n.default.instance.playerLeftADShow <= 0 && _.default.instance.close());
            }, e.prototype.PlayerSignRequest = function() {
                i.NetworkManager.SendMessage(r.MessageNo.PlayerSignRequest, r.MessageType.GamePlay, {});
            }, e.prototype.PlayerSignResponse = function(e, t) {
                t.IsOk ? (console.log("签到成功" + t.SignCount), n.default.instance.canSign = !1, v.default.instance.getSignReward(n.default.instance.signTotalCount)) : console.log("请明天再签到");
            }, e.prototype.PlayerKillMonsterRequest = function(e, t, a, n) {
                var o = {
                    MonsterID: Number(e),
                    DungeonID: Number(t),
                    DungeonDiff: Number(a),
                    DungeonFloor: Number(n)
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerKillMonsterRequest, r.MessageType.GamePlay, o);
            }, e.prototype.PlayerOverComeDungeonRequest = function(e) {
                var t = {
                    DungeonID: Number(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerOverComeDungeonRequest, r.MessageType.GamePlay, t);
            }, e.prototype.GetCollectionBounsRequest = function() {
                i.NetworkManager.SendMessage(r.MessageNo.GetCollectionBounsRequest, r.MessageType.GamePlay, {});
            }, e.prototype.GetCollectionBounsResponse = function(e, t) {
                t.IsOk && (n.default.instance.isGetCollectionBonus = 1, k.default.instance.LoadTipsByStr("获得钻石: 200"));
            }, e.prototype.ApplyChatRoomRequest = function(e) {
                i.NetworkManager.SendMessage(r.MessageNo.PlayerApplyChatRoomRequest, r.MessageType.GamePlay, {
                    ChatRoomID: Number(e)
                });
            }, e.prototype.PlayerApplyChatRoomResponse = function(e, t) {
                if (t.IsOk) {
                    if (n.default.instance.chatRoomID != t.ChatRoomID && (n.default.instance.chatRoomID = t.ChatRoomID, 
                    n.default.instance.chatTemp = []), D.default.instance && (D.default.instance.removeChatMessage(), 
                    D.default.instance.closeSelectRoom()), t.Messages) for (var a = 0, i = t.Messages; a < i.length; a++) {
                        var r = i[a];
                        n.default.instance.saveChatMessage(r);
                    }
                } else k.default.instance.LoadTipsByID("talk_station_tips"), D.default.instance.closeSelectRoom();
            }, e.prototype.PlayerChatRoomSendRequest = function(e) {
                var t = {
                    Content: String(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerChatRoomSendRequest, r.MessageType.GamePlay, t);
            }, e.prototype.PlayerChatRoomSendResponseIDC = function(e, t) {
                if (0 == t.Active) {
                    var a = Math.ceil(t.DeativeTime / 60);
                    k.default.instance.LoadTipsByStr("您已被禁言" + a + "分钟");
                }
            }, e.prototype.SyncChatRoomMsgResponseIDC = function(e, t) {
                n.default.instance.saveChatMessage(t.Message);
            }, e.prototype.PlayerGetChatRoomListRequest = function() {
                i.NetworkManager.SendMessage(r.MessageNo.PlayerGetChatRoomListRequest, r.MessageType.GamePlay, {});
            }, e.prototype.PlayerGetChatRoomListResponse = function(e, t) {
                D.default.instance.refreshSelectRoom(t);
            }, e.prototype.PlayerAttackMonsterRequest = function(e, t) {
                i.NetworkManager.SendMessage(r.MessageNo.PlayerAttackMonsterRequest, r.MessageType.GamePlay, {
                    RewardType: Number(t),
                    Change: Number(e)
                });
            }, e.prototype.PlayerAttackMonsterResponse = function(e, t) {}, e.prototype.playerSyncMoneyRequest = function() {}, 
            e.prototype.PlayerBuyBlackMarketRequest = function(e, t, a) {
                i.NetworkManager.SendMessage(r.MessageNo.PlayerBuyBlackMarketRequest, r.MessageType.GamePlay, {
                    BlackMarketID: Number(e),
                    isSprite: Boolean(t),
                    BaseID: Number(a)
                });
            }, e.prototype.PlayerBuyBlackMarketResponse = function(e, t) {}, e.prototype.PlayerSyncMoneyResponseIDC = function(e, t) {
                switch (t.ActionType) {
                  case I.MoneyChangeType.KillMonster:
                    h.default.instance.getGoldByServer(t.MoneyType, t.Change);
                    break;

                  case I.MoneyChangeType.AttackMonster:
                    t.MoneyType == I.MoneyType.Coin ? n.default.instance.changeMissleadingGold(-t.Change) : t.MoneyType == I.MoneyType.Daimod ? n.default.instance.changeMissleadingDaimon(-t.Change) : console.log("无效的货币类型");
                    break;

                  case I.MoneyChangeType.SignReward:
                }
                t.MoneyType == I.MoneyType.Coin ? n.default.instance.goldNum = t.After : t.MoneyType == I.MoneyType.Daimod ? n.default.instance.daimonNum = t.After : console.log("无效的货币类型");
            }, e.prototype.PlayerProduceMonsterGemResponse = function(e, t) {
                t.MonsterGemID && h.default.instance.GetGemByServer(t.MonsterGemID);
            }, e.prototype.BlendMonsterGemRequest = function(e) {
                i.NetworkManager.SendMessage(r.MessageNo.BlendMonsterGemRequest, r.MessageType.GamePlay, {
                    BaseID: Number(e)
                });
            }, e.prototype.BlendMonsterGemResponse = function(e, t) {
                if (t.IsOk) {
                    var a = f.default.instance.monsterGemData[t.BaseID];
                    h.default.instance.GetGemByServer(a.next_id), n.default.instance.ChangeGemItem(t.BaseID, -a.combine_num);
                }
                B.default.instance.refreshBagUI(), S.default.instance.IsCurGemEnough();
            }, e.prototype.SyncReferUserResponse = function(e, t) {
                t.UserID && (n.default.instance.referUserData[t.UserID] = !0);
            }, e.prototype.GetReferUserRewardRequest = function(e) {
                i.NetworkManager.SendMessage(r.MessageNo.GetReferUserRewardRequest, r.MessageType.GamePlay, {
                    UserID: e.toString()
                });
            }, e.prototype.GetReferUserRewardResponse = function(e, t) {
                t.IsOk && t.UserID && (n.default.instance.referUserData[t.UserID] = !1);
            }, e.prototype.PlayerSyncLevelResponse = function(e, t) {
                t.ActionType, I.ExpActionType.Sign, t.ActionType == I.ExpActionType.KillMonster && t.LvChange >= 1 && R.default.instance.PlayerLvUpEffect(), 
                n.default.instance.getMainPlayer().exp = t.ExpAfter, t.LvChange >= 1 && (n.default.instance.getMainPlayer().addLV(t.LvChange), 
                g.default.instance.updatePlayerHP(n.default.instance.getMainPlayer().hp, n.default.instance.getMainPlayer().maxhp), 
                g.default.instance.updatePlayerMP(n.default.instance.getMainPlayer().mp, n.default.instance.getMainPlayer().maxmp), 
                o.Emitter.fire(I.AlertType.RoleAlert.toString())), g.default.instance.updateLvExp(n.default.instance.getMainPlayer().lv, n.default.instance.getMainPlayer().exp);
            }, e._instance = null, e;
        }();
        a.default = A, cc._RF.pop();
    }, {
        "../battle/battle_manager": "battle_manager",
        "../common/allenum": "allenum",
        "../common/emmiter": "emmiter",
        "../common/message": "message",
        "../manager/achievenment_manager": "achievenment_manager",
        "../manager/blackmarket_manager": "blackmarket_manager",
        "../manager/data_manager": "data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/effect_manager": "effect_manager",
        "../manager/game_manager": "game_manager",
        "../manager/help_manager": "help_manager",
        "../manager/network_manager": "network_manager",
        "../manager/random_event_manager": "random_event_manager",
        "../manager/reward_manager": "reward_manager",
        "../manager/skill_manager": "skill_manager",
        "../manager/sprite_manager": "sprite_manager",
        "../manager/ui_manager": "ui_manager",
        "../ui/bag_ui_manager": "bag_ui_manager",
        "../ui/battle_ui_manager": "battle_ui_manager",
        "../ui/changname_ui_manager": "changname_ui_manager",
        "../ui/chat_ui_manager": "chat_ui_manager",
        "../ui/gem_tip_ui_manager": "gem_tip_ui_manager",
        "../ui/item/ad_item": "ad_item",
        "../ui/learn_skill_manager": "learn_skill_manager",
        "../ui/sign_ui_manager": "sign_ui_manager"
    } ],
    playerbuff_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "8febaGVDWxPwL+q6b+doqUk", "playerbuff_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e(), this._instance.playerBuff = {}), 
                    this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.getBuffValue = function(e) {
                return null != this.playerBuff[e] ? this.playerBuff[e] : 0;
            }, e.prototype.updateBuff = function(e) {
                for (var t in e) this.playerBuff[t] = e[t];
            }, e._instance = null, e;
        }();
        a.default = n, cc._RF.pop();
    }, {} ],
    pool_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "e4b00H79bVLTIIyLC8O37TN", "pool_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, r = n.property, o = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.enemyDamagePool = null, t.enemyDamagePrefab = null, t.monsterPool = null, 
                t.monsterPrefab = null, t.addExpPool = null, t.addExpPrefab = null, t.bagItemPool = null, 
                t.bagItemPrefab = null, t.labelPool = null, t.labelPrefab = null, t.levelItemPool = null, 
                t.levelItemPrefab = null, t.missEffectPool = null, t.missEffectPrefab = null, t.blockEffectPool = null, 
                t.blockEffectPrefab = null, t.addHPEffectPool = null, t.addHPEffectPrefab = null, 
                t.addMPEffectPool = null, t.addMPEffectPrefab = null, t.storeItemPool = null, t.storeItemPrefab = null, 
                t.attrItemPool = null, t.attrItemPrefab = null, t.spriteItemPool = null, t.spriteItemPrefab = null, 
                t.moneyItemPool = null, t.moneyItemPrefab = null, t.buffItemPool = null, t.buffItemPrefab = null, 
                t.achievementItemPool = null, t.achievementItemPrefab = null, t.titleItemPool = null, 
                t.titleItemPrefab = null, t.chatItemPool = null, t.askItemPrefab = null, t.ShareFriendPool = null, 
                t.itemFriendPrefab = null, t.ChatRoomPool = null, t.itemChatRoomPrefab = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.enemyDamagePool = new cc.NodePool();
                for (var e = 0; e < 10; ++e) {
                    var t = cc.instantiate(this.enemyDamagePrefab);
                    this.enemyDamagePool.put(t);
                }
                this.monsterPool = new cc.NodePool();
                for (e = 0; e < 10; ++e) {
                    t = cc.instantiate(this.monsterPrefab);
                    this.monsterPool.put(t);
                }
                this.addExpPool = new cc.NodePool();
                for (e = 0; e < 5; ++e) {
                    t = cc.instantiate(this.addExpPrefab);
                    this.addExpPool.put(t);
                }
                this.bagItemPool = new cc.NodePool();
                for (e = 0; e < 10; ++e) {
                    t = cc.instantiate(this.bagItemPrefab);
                    this.bagItemPool.put(t);
                }
                this.labelPool = new cc.NodePool();
                for (e = 0; e < 10; ++e) {
                    t = cc.instantiate(this.labelPrefab);
                    this.labelPool.put(t);
                }
                this.levelItemPool = new cc.NodePool();
                for (e = 0; e < 10; ++e) {
                    t = cc.instantiate(this.levelItemPrefab);
                    this.levelItemPool.put(t);
                }
                this.missEffectPool = new cc.NodePool();
                for (e = 0; e < 5; ++e) {
                    t = cc.instantiate(this.missEffectPrefab);
                    this.missEffectPool.put(t);
                }
                this.blockEffectPool = new cc.NodePool();
                for (e = 0; e < 5; ++e) {
                    t = cc.instantiate(this.blockEffectPrefab);
                    this.blockEffectPool.put(t);
                }
                this.addHPEffectPool = new cc.NodePool();
                for (e = 0; e < 5; ++e) {
                    t = cc.instantiate(this.addHPEffectPrefab);
                    this.addHPEffectPool.put(t);
                }
                this.addMPEffectPool = new cc.NodePool();
                for (e = 0; e < 5; ++e) {
                    t = cc.instantiate(this.addMPEffectPrefab);
                    this.addMPEffectPool.put(t);
                }
                this.storeItemPool = new cc.NodePool();
                for (e = 0; e < 5; ++e) {
                    t = cc.instantiate(this.storeItemPrefab);
                    this.storeItemPool.put(t);
                }
                this.attrItemPool = new cc.NodePool();
                for (e = 0; e < 5; ++e) {
                    t = cc.instantiate(this.attrItemPrefab);
                    this.attrItemPool.put(t);
                }
                this.spriteItemPool = new cc.NodePool();
                for (e = 0; e < 5; ++e) {
                    t = cc.instantiate(this.spriteItemPrefab);
                    this.spriteItemPool.put(t);
                }
                this.moneyItemPool = new cc.NodePool();
                for (e = 0; e < 5; ++e) {
                    t = cc.instantiate(this.moneyItemPrefab);
                    this.moneyItemPool.put(t);
                }
                this.buffItemPool = new cc.NodePool();
                for (e = 0; e < 3; ++e) {
                    t = cc.instantiate(this.buffItemPrefab);
                    this.buffItemPool.put(t);
                }
                this.achievementItemPool = new cc.NodePool();
                for (e = 0; e < 5; ++e) {
                    t = cc.instantiate(this.achievementItemPrefab);
                    this.achievementItemPool.put(t);
                }
                this.titleItemPool = new cc.NodePool();
                for (e = 0; e < 2; ++e) {
                    t = cc.instantiate(this.titleItemPrefab);
                    this.titleItemPool.put(t);
                }
                this.chatItemPool = new cc.NodePool();
                for (e = 0; e < 5; ++e) {
                    t = cc.instantiate(this.askItemPrefab);
                    this.chatItemPool.put(t);
                }
                this.ShareFriendPool = new cc.NodePool();
                for (e = 0; e < 5; ++e) {
                    t = cc.instantiate(this.itemFriendPrefab);
                    this.ShareFriendPool.put(t);
                }
                this.ChatRoomPool = new cc.NodePool();
                for (e = 0; e < 3; e++) {
                    t = cc.instantiate(this.itemChatRoomPrefab);
                    this.ChatRoomPool.put(t);
                }
            }, t.prototype.CreateDamagerEffect = function(e) {
                var t = null;
                return (t = this.enemyDamagePool.size() > 0 ? this.enemyDamagePool.get() : cc.instantiate(this.enemyDamagePrefab)).parent = e, 
                t;
            }, t.prototype.RemoveDamagerEffect = function(e) {
                this.enemyDamagePool.put(e);
            }, t.prototype.CreateMonster = function(e) {
                var t = null;
                return (t = this.monsterPool.size() > 0 ? this.monsterPool.get() : cc.instantiate(this.monsterPrefab)).parent = e, 
                t;
            }, t.prototype.RemoveMonster = function(e) {
                this.monsterPool.put(e);
            }, t.prototype.CreateBagItem = function(e) {
                var t = null;
                return (t = this.bagItemPool.size() > 0 ? this.bagItemPool.get() : cc.instantiate(this.bagItemPrefab)).parent = e, 
                t;
            }, t.prototype.RemoveBagItem = function(e) {
                this.bagItemPool.put(e);
            }, t.prototype.CreateLabel = function(e) {
                var t = null;
                return (t = this.labelPool.size() > 0 ? this.labelPool.get() : cc.instantiate(this.labelPrefab)).parent = e, 
                t;
            }, t.prototype.RemoveLabel = function(e) {
                this.labelPool.put(e);
            }, t.prototype.CreateObjectByName = function(e, t) {
                var a, n = this.getPrefabByName(e), i = this.getPoolByName(e);
                return null != i && ((a = i.size() > 0 ? i.get() : cc.instantiate(n)).parent = t), 
                a;
            }, t.prototype.RemoveObjectByName = function(e, t) {
                var a = this.getPoolByName(e);
                null != a ? a.put(t) : console.error("no this pool:" + e);
            }, t.prototype.getPrefabByName = function(e) {
                switch (e) {
                  case "LevelItem":
                    return this.levelItemPrefab;

                  case "MissEffect":
                    return this.missEffectPrefab;

                  case "BlockEffect":
                    return this.blockEffectPrefab;

                  case "AddEXPEffect":
                    return this.addExpPrefab;

                  case "AddHPEffect":
                    return this.addHPEffectPrefab;

                  case "AddMPEffect":
                    return this.addMPEffectPrefab;

                  case "StoreItem":
                    return this.storeItemPrefab;

                  case "AttrItem":
                    return this.attrItemPrefab;

                  case "SpriteItem":
                    return this.spriteItemPrefab;

                  case "MoneyItem":
                    return this.moneyItemPrefab;

                  case "BuffItem":
                    return this.buffItemPrefab;

                  case "AchievementItem":
                    return this.achievementItemPrefab;

                  case "TitleItem":
                    return this.titleItemPrefab;

                  case "AskItem":
                    return this.askItemPrefab;

                  case "ItemFriend":
                    return this.itemFriendPrefab;

                  case "ItemChatRoom":
                    return this.itemChatRoomPrefab;
                }
                return null;
            }, t.prototype.getPoolByName = function(e) {
                switch (e) {
                  case "LevelItem":
                    return this.levelItemPool;

                  case "MissEffect":
                    return this.missEffectPool;

                  case "BlockEffect":
                    return this.blockEffectPool;

                  case "AddEXPEffect":
                    return this.addExpPool;

                  case "AddHPEffect":
                    return this.addHPEffectPool;

                  case "AddMPEffect":
                    return this.addMPEffectPool;

                  case "StoreItem":
                    return this.storeItemPool;

                  case "AttrItem":
                    return this.attrItemPool;

                  case "SpriteItem":
                    return this.spriteItemPool;

                  case "MoneyItem":
                    return this.moneyItemPool;

                  case "BuffItem":
                    return this.buffItemPool;

                  case "AchievementItem":
                    return this.achievementItemPool;

                  case "TitleItem":
                    return this.titleItemPool;

                  case "AskItem":
                    return this.chatItemPool;

                  case "ItemFriend":
                    return this.ShareFriendPool;

                  case "ItemChatRoom":
                    return this.ChatRoomPool;
                }
                return null;
            }, t.instance = null, __decorate([ r(cc.Prefab) ], t.prototype, "enemyDamagePrefab", void 0), 
            __decorate([ r(cc.Prefab) ], t.prototype, "monsterPrefab", void 0), __decorate([ r(cc.Prefab) ], t.prototype, "addExpPrefab", void 0), 
            __decorate([ r(cc.Prefab) ], t.prototype, "bagItemPrefab", void 0), __decorate([ r(cc.Prefab) ], t.prototype, "labelPrefab", void 0), 
            __decorate([ r(cc.Prefab) ], t.prototype, "levelItemPrefab", void 0), __decorate([ r(cc.Prefab) ], t.prototype, "missEffectPrefab", void 0), 
            __decorate([ r(cc.Prefab) ], t.prototype, "blockEffectPrefab", void 0), __decorate([ r(cc.Prefab) ], t.prototype, "addHPEffectPrefab", void 0), 
            __decorate([ r(cc.Prefab) ], t.prototype, "addMPEffectPrefab", void 0), __decorate([ r(cc.Prefab) ], t.prototype, "storeItemPrefab", void 0), 
            __decorate([ r(cc.Prefab) ], t.prototype, "attrItemPrefab", void 0), __decorate([ r(cc.Prefab) ], t.prototype, "spriteItemPrefab", void 0), 
            __decorate([ r(cc.Prefab) ], t.prototype, "moneyItemPrefab", void 0), __decorate([ r(cc.Prefab) ], t.prototype, "buffItemPrefab", void 0), 
            __decorate([ r(cc.Prefab) ], t.prototype, "achievementItemPrefab", void 0), __decorate([ r(cc.Prefab) ], t.prototype, "titleItemPrefab", void 0), 
            __decorate([ r(cc.Prefab) ], t.prototype, "askItemPrefab", void 0), __decorate([ r(cc.Prefab) ], t.prototype, "itemFriendPrefab", void 0), 
            __decorate([ r(cc.Prefab) ], t.prototype, "itemChatRoomPrefab", void 0), t = a = __decorate([ i ], t);
        }(cc.Component);
        a.default = o, cc._RF.pop();
    }, {} ],
    random_event_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "a0eca3I5b1PN4LV/axEaNeF", "random_event_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./data_manager"), i = e("./dynamic_data_manager"), r = e("./skill_manager"), o = e("../common/emmiter"), s = e("../common/allenum"), l = e("../network/event_network"), c = e("../battle/battle_manager"), u = e("../ui/battle_ui_manager"), d = e("./lost_manager"), p = e("./blackmarket_manager"), m = e("./sprite_manager"), f = e("../ui/random_event_ui_manager"), g = e("./ui_manager"), h = function() {
            function e() {
                this.bonusNum = 0;
            }
            return e.prototype.canTrigger = function() {
                return 0 == this.status;
            }, e.prototype.trigger = function() {
                this.status = 1, o.Emitter.fire(s.AlertType.EventAlert.toString());
            }, e.prototype.isWaitingRefresh = function() {
                return 1 == this.status;
            }, e.prototype.refresh = function(e, t, a, n, r) {
                if (this.curEventId = e.id, a) {
                    var o = n + t - i.default.instance.GetServerTime();
                    o > 0 ? (this.nextFreshTime = o, this.status = 1) : (this.nextFreshTime = 3, this.status = 1);
                } else this.nextFreshTime = t, this.status = 0, this.bonusNum = r;
            }, e;
        }(), _ = function() {
            function e() {
                this.maxEventCount = 3, this.refreshTime = 60, this.events = {};
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.updateEvent = function(e) {
                for (var t in this.events) this.events[t].isWaitingRefresh() && (this.events[t].nextFreshTime -= e, 
                this.events[t].nextFreshTime < 0 && (this.events[t].nextFreshTime = 0, this.events[t].status = 2, 
                this.refreshEvent(t)));
            }, e.prototype.refreshEvent = function(e) {
                l.default.instance.PlayerNewEventRequest(e, 0, 0);
            }, e.prototype.shareRefreshAllEvent = function(e) {
                void 0 === e && (e = !1), l.default.instance.ShareRefreshEventRequest(0, 0, 0, 0, 0, 0, e);
            }, e.prototype.getBonusByEvent = function(e) {
                var t = 0;
                return 2 == e.type && ("gold" == e.param || "daimond" == e.param ? (t = Math.floor(e.bonus_param["倍数"] * i.default.instance.getMainPlayerLVParam() + e.bonus_param["基数"]), 
                "daimond" == e.param && t > 300 && (t = 300)) : t = "equipment" == e.param || "sprite" == e.param ? 1 : 0), 
                t;
            }, e.prototype.initEventByIndex_Network = function(e) {}, e.prototype.initEventByNetwork = function(e) {
                console.log("initEventByNetwork");
                var t = 0;
                if (e) for (var a in e) e[a] && (this.addEventByNetwork(e[a].ID, e[a].NextTime, e[a].BonusNum, e[a].IsTrigger, e[a].Index, e[a].TriggerTime), 
                t++);
                console.log("initEventByNetwork done");
                for (var n = t; n < 3; n++) this.refreshEvent(n);
            }, e.prototype.addEventByNetwork = function(e, t, a, i, r, o) {
                var s = n.default.instance.randomEventData[e];
                if (s) {
                    var l = new h();
                    l.refresh(s, t, i, o, a), this.events[r] = l;
                } else console.error("================errrrr:" + e + "  nextime:" + t);
            }, e.prototype.getNewEvent = function() {
                return this.getRandomEventDataByLv(i.default.instance.getMainPlayerLVParam(), i.default.instance.getMainPlayerLV());
            }, e.prototype.isContain = function(e) {
                for (var t in this.events) if (this.events[t].curEventId == e) return !0;
                return !1;
            }, e.prototype.getNewRefreshTime = function() {
                return this.refreshTime;
            }, e.prototype.getEventByIndex = function(e) {
                return this.events[e] ? this.events[e] : null;
            }, e.prototype.getEventDataByIndex = function(e) {
                return this.events[e] ? n.default.instance.randomEventData[this.events[e].curEventId] : (console.error("no this event index:" + e.toString()), 
                null);
            }, e.prototype.getRandomEventDataByLv = function(e, t) {
                console.log("getRandomEventDataByLv : " + e.toString() + "  curLv:" + t);
                var a, o = new Array(), s = 0;
                for (a in n.default.instance.randomEventData) {
                    var l = n.default.instance.randomEventData[a].param;
                    if ("skill" == l) {
                        if (null == r.default.instance.getCanLearnSkill()) continue;
                    } else if ("altar" == l && null == i.default.instance.getCanLearnAltar()) continue;
                    this.isContain(a) || (n.default.instance.randomEventData[a].is_newlife ? n.default.instance.randomEventData[a].lvlimit <= e && (n.default.instance.randomEventData[a].lvmax > 0 ? n.default.instance.randomEventData[a].lvmax >= e && (o.push(a), 
                    s += n.default.instance.randomEventData[a].weight) : (o.push(a), s += n.default.instance.randomEventData[a].weight)) : n.default.instance.randomEventData[a].lvlimit <= t && (n.default.instance.randomEventData[a].lvmax > 0 ? n.default.instance.randomEventData[a].lvmax >= t && (o.push(a), 
                    s += n.default.instance.randomEventData[a].weight) : (o.push(a), s += n.default.instance.randomEventData[a].weight)));
                }
                if (o.length > 0) {
                    var c = s, u = Math.random();
                    u *= c;
                    for (var d = Math.floor(u), p = 0, m = 0; m < o.length; m++) if ((p += n.default.instance.randomEventData[o[m]].weight) >= d) return console.error(n.default.instance.randomEventData[o[m]].desc), 
                    n.default.instance.randomEventData[o[m]];
                }
                return null;
            }, e.prototype.hasCanTriggerEvent = function() {
                if (this.events) for (var e in this.events) if (this.events[e].canTrigger()) return !0;
                return !1;
            }, e.prototype.isBonusTypeAndCanTrigger = function(e) {
                if (this.events[e] && (2 == n.default.instance.randomEventData[this.events[e].curEventId].type && this.events[e].canTrigger())) return !0;
                return !1;
            }, e.prototype.isAltarEventAndCanTrigger = function(e) {
                return !(!this.events[e] || 2 != this.events[e].curEventId || !this.events[e].canTrigger());
            }, e.prototype.isBlackmarketEventAndCanTrigger = function(e) {
                return !(!this.events[e] || 3 != this.events[e].curEventId || !this.events[e].canTrigger());
            }, e.prototype.isRelifeEventAndCanTrigger = function(e) {
                return !(!this.events[e] || 6 != this.events[e].curEventId || !this.events[e].canTrigger());
            }, e.prototype.triggerEvent = function(e) {
                this.events[e] ? l.default.instance.PlayerTriggerEventRequest(e) : console.error("no this event index :" + e);
            }, e.prototype.triggerCallBack = function(e) {
                var t = e.Index;
                this.events[t].trigger(), this.events[t].nextFreshTime = e.NextTime;
                var a = n.default.instance.randomEventData[e.ID];
                switch (a.type) {
                  case 1:
                    this.openUI(a.param);
                    break;

                  case 2:
                    this.getBonus(a.param, e.BonusNum, t);
                    break;

                  case 3:
                    break;

                  case 4:
                    g.default.instance.LoadMessageBox("探索【" + a.desc + "】", a.message, this.goToLevel, null, e.ID);
                    break;

                  case 5:
                    this.useSkill(a.param);
                    break;

                  default:
                    console.error("no this type define :" + a.type.toString());
                }
            }, e.prototype.goToLevel = function(e, t) {
                if (e) {
                    var a = t, i = n.default.instance.randomEventData[a];
                    c.default.instance.changeToTargetLevel(i.param);
                }
            }, e.prototype.useSkill = function(e) {
                var t = +e;
                c.default.instance.PlayerUserSkill(t);
            }, e.prototype.openUI = function(e) {
                switch (e) {
                  case "skill":
                    g.default.instance.LoadLearnSkillUI();
                    break;

                  case "altar":
                    g.default.instance.LoadAltarUI();
                    break;

                  case "blackmarket":
                    g.default.instance.LoadBlackMarketUI();
                    break;

                  case "strengthen":
                    g.default.instance.LoadStrengthenUI();
                    break;

                  case "refresh":
                    g.default.instance.LoadRefreshUI();
                    break;

                  case "timetravel":
                    u.default.instance.newlift();
                    break;

                  case "reinit_event":
                    g.default.instance.LoadMessageBox("刷新所有事件", "刷新事件不计入总次数，点击确认则立即刷新，取消则丢弃这个事件。", this.refreshAllEventByCardCallback);
                    break;

                  case "add_hole":
                    g.default.instance.LoadAddHoleSelectUI();
                    break;

                  default:
                    console.error("no this param to open ui:" + e);
                }
            }, e.prototype.refreshAllEventByCardCallback = function(t) {
                t && e.instance.shareRefreshAllEvent(!0);
            }, e.prototype.getBonus = function(e, t, a) {
                switch (e) {
                  case "gold":
                    f.default.instance.playRandomEffect(a, "gold");
                    break;

                  case "daimond":
                    f.default.instance.playRandomEffect(a, "daimond");
                    break;

                  case "equipment":
                    if (i.default.instance.isBagFull()) return void g.default.instance.LoadTipsByID("bag_count_limit");
                    var r = p.default.instance.getBlackMarketByPlayerLV(i.default.instance.getMainPlayerLVParam()), o = d.default.instance.getRamdomBaseBagItem(r.droplv);
                    d.default.instance.addAttrToWhiteEquip(o, r.droplv, i.default.instance.getMainPlayer().addGetBetterEquip + 1), 
                    g.default.instance.LoadTipsByStr("获得:" + n.default.instance.equipmentData[o.baseId].name), 
                    f.default.instance.playRandomEffect(a, "equipment", n.default.instance.equipmentData[o.baseId].icon_path);
                    break;

                  case "sprite":
                    if (m.default.instance.isFullSpriteBag()) return void g.default.instance.LoadTipsByID("sprite_count_limit");
                    var s = m.default.instance.addNewRandomSprite();
                    g.default.instance.LoadTipsByStr("获得:" + n.default.instance.spriteData[s].name), 
                    f.default.instance.playRandomEffect(a, "sprite", n.default.instance.spriteData[s].icon_path);
                    break;

                  default:
                    console.error("no this bonusType to get:" + e);
                }
            }, e._instance = null, e;
        }();
        a.default = _, cc._RF.pop();
    }, {
        "../battle/battle_manager": "battle_manager",
        "../common/allenum": "allenum",
        "../common/emmiter": "emmiter",
        "../network/event_network": "event_network",
        "../ui/battle_ui_manager": "battle_ui_manager",
        "../ui/random_event_ui_manager": "random_event_ui_manager",
        "./blackmarket_manager": "blackmarket_manager",
        "./data_manager": "data_manager",
        "./dynamic_data_manager": "dynamic_data_manager",
        "./lost_manager": "lost_manager",
        "./skill_manager": "skill_manager",
        "./sprite_manager": "sprite_manager",
        "./ui_manager": "ui_manager"
    } ],
    random_event_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "f73f65I8+lLgpgc3ZCEJwzM", "random_event_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./item/event_item"), i = e("./battle_ui_manager"), r = e("../manager/random_event_manager"), o = e("../common/emmiter"), s = e("../common/allenum"), l = e("../manager/wx_manager"), c = e("../manager/reward_effect_manager"), u = e("../manager/ui_manager"), d = cc._decorator, p = d.ccclass, m = d.property, f = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.eventcard1 = null, t.eventcard2 = null, t.eventcard3 = null, t.btnClose = null, 
                t.btnShow = null, t.btnRefresh = null, t.nodeEventAlert = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.btnClose.node.on("click", this.hideEvents, this), this.btnShow.node.on("click", this.showEvents, this), 
                this.btnRefresh.node.on("click", this.refreshAllEvent, this), this.btnShow.node.active = !1;
                o.Emitter.register(s.AlertType.EventAlert.toString(), this.checkEventStatus, this);
            }, t.prototype.InitCards = function() {
                this.eventcard1.onInit(), this.eventcard2.onInit(), this.eventcard3.onInit(), this.checkEventStatus();
            }, t.prototype.getCardWordSpaceByIndex = function(e) {
                return 0 == e ? this.eventcard1.node.parent.convertToWorldSpaceAR(this.eventcard1.node.position) : 1 == e ? this.eventcard2.node.parent.convertToWorldSpaceAR(this.eventcard2.node.position) : 2 == e ? this.eventcard3.node.parent.convertToWorldSpaceAR(this.eventcard3.node.position) : void 0;
            }, t.prototype.hideEvents = function() {
                this.getComponent(cc.Animation).play("event_close"), this.btnClose.node.active = !1, 
                this.btnShow.node.active = !0, i.default.instance.battleInfoUp(), this.checkEventStatus();
            }, t.prototype.showEvents = function() {
                this.getComponent(cc.Animation).play("event_show"), this.btnClose.node.active = !0, 
                this.btnShow.node.active = !1, i.default.instance.battleInfoDown(), this.checkEventStatus();
            }, t.prototype.checkEventStatus = function() {
                this.btnShow.node.active ? r.default.instance.hasCanTriggerEvent() && (this.nodeEventAlert.active = !0) : this.nodeEventAlert.active = !1;
            }, t.prototype.getShowEventBtnWordSpace = function() {
                return this.btnShow.node.parent.convertToWorldSpaceAR(this.btnShow.node.position);
            }, t.prototype.IsOnshowEvent = function() {
                return !this.btnShow.node.active;
            }, t.prototype.refreshAllEvent = function() {
                u.default.instance.LoadMessageBox("刷新所有事件", "点击确认分享给好友可以刷新事件，刷新事件不计入总次数，一天最多分享5次。", this.shareCallBack);
            }, t.prototype.shareCallBack = function(e) {
                e && l.default.instance.shareAppMessage("refresh_randomevent", "");
            }, t.prototype.playRandomEffect = function(e, t, a) {
                var n = this.getEventNode(e);
                switch (t) {
                  case "gold":
                    c.default.instance.createDaimondEffect(10, "金币", n.parent.convertToWorldSpaceAR(n.position));
                    break;

                  case "daimond":
                    c.default.instance.createDaimondEffect(10, "钻石", n.parent.convertToWorldSpaceAR(n.position));
                    break;

                  case "equipment":
                    c.default.instance.createDaimondEffect(1, "装备", n.parent.convertToWorldSpaceAR(n.position), a);
                    break;

                  case "sprite":
                    c.default.instance.createDaimondEffect(1, "精灵", n.parent.convertToWorldSpaceAR(n.position), a);
                }
            }, t.prototype.getEventNode = function(e) {
                switch (e) {
                  case 0:
                    return this.eventcard1.node;

                  case 1:
                    return this.eventcard2.node;

                  case 2:
                    return this.eventcard3.node;
                }
            }, t.instance = null, __decorate([ m(n.default) ], t.prototype, "eventcard1", void 0), 
            __decorate([ m(n.default) ], t.prototype, "eventcard2", void 0), __decorate([ m(n.default) ], t.prototype, "eventcard3", void 0), 
            __decorate([ m(cc.Button) ], t.prototype, "btnClose", void 0), __decorate([ m(cc.Button) ], t.prototype, "btnShow", void 0), 
            __decorate([ m(cc.Button) ], t.prototype, "btnRefresh", void 0), __decorate([ m(cc.Node) ], t.prototype, "nodeEventAlert", void 0), 
            t = a = __decorate([ p ], t);
        }(cc.Component);
        a.default = f, cc._RF.pop();
    }, {
        "../common/allenum": "allenum",
        "../common/emmiter": "emmiter",
        "../manager/random_event_manager": "random_event_manager",
        "../manager/reward_effect_manager": "reward_effect_manager",
        "../manager/ui_manager": "ui_manager",
        "../manager/wx_manager": "wx_manager",
        "./battle_ui_manager": "battle_ui_manager",
        "./item/event_item": "event_item"
    } ],
    rand: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "1b289OV+Q5Cmo//f4XMVmG4", "rand"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return e.getZeroToOne = function() {
                return Math.random();
            }, e.getRandomNum = function(e, t) {
                var a = t - e, n = Math.random();
                return e + Math.round(n * a);
            }, e.getRandomIndex = function(e) {
                var t = Math.random();
                return t >= 1 && (t = .99), Math.floor(t * e);
            }, e;
        }();
        a.default = n, cc._RF.pop();
    }, {} ],
    refresh_tip: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "34ba7YTMG1O9oSgHyo1HnAu", "refresh_tip"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/data_manager"), i = e("../manager/pool_manager"), r = e("../util"), o = e("./item/attr_item"), s = e("../manager/cost_manager"), l = e("../manager/help_manager"), c = e("../manager/dynamic_data_manager"), u = e("../manager/resource_manager"), d = e("../audio_manager"), p = e("../network/bag_network"), m = e("../manager/ui_manager"), f = cc._decorator, g = f.ccclass, h = f.property, _ = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.maskNode = null, t.nodeAttrs = null, t.labelName = null, t.labelDesc = null, 
                t.spriteIcon = null, t.spriteQualityGrid = null, t.curBagItemData = null, t.curSelectRefreshAttr = 0, 
                t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideBagUI, this), this.node.active && (this.node.active = !1);
            }, t.prototype.hideBagUI = function() {
                this.node.active = !1;
            }, t.prototype.show = function(e) {
                d.default.instance.PlayUISelect(), this.node.active = !0, this.curBagItemData = e;
                var t = n.default.instance.equipmentData[this.curBagItemData.baseId];
                this.labelName.string = this.curBagItemData.getName(), this.labelName.node.color = this.curBagItemData.getNameColor(), 
                this.labelDesc.string = t.desc, console.error("baseEquipData.icon_path:" + t.icon_path), 
                this.spriteIcon.spriteFrame = u.default.instance.getEquipSprite(t.icon_path), this.spriteQualityGrid.spriteFrame = u.default.instance.getEquipSprite(this.curBagItemData.getQualitySpriteName());
                for (var s = this.nodeAttrs.children, c = s.length - 1; c >= 0; c--) s[c].getComponent(o.default) ? i.default.instance.RemoveObjectByName("AttrItem", s[c]) : i.default.instance.RemoveLabel(s[c]);
                var p = this.curBagItemData.getBaseAttr();
                for (var m in p) {
                    var f = i.default.instance.CreateLabel(this.nodeAttrs);
                    f.getComponent(cc.Label).string = l.default.instance.getAttrShowStr(m, p[m]), f.color = cc.Color.WHITE;
                }
                if (r.default.len(this.curBagItemData.additionAttr)) {
                    var g = void 0;
                    for (g in this.curBagItemData.additionAttr) {
                        var h = n.default.instance.equipPrefixData[g];
                        h.name;
                        var _ = i.default.instance.CreateObjectByName("AttrItem", this.nodeAttrs), y = n.default.instance.getEquipPrefixMinValById(g), v = n.default.instance.getEquipPrefixMaxValById(g), b = l.default.instance.getAttrShowStr(h.attrtype, this.curBagItemData.additionAttr[g]), D = " (" + l.default.instance.getAttrShowValueStr(h.attrtype, y) + " ~ " + l.default.instance.getAttrShowValueStr(h.attrtype, v) + " )";
                        _.getComponent(o.default).init(b, D, g, a.instance.attrItemCallBack);
                    }
                }
            }, t.prototype.attrItemCallBack = function(e) {
                var t = n.default.instance.equipPrefixData[e].refresh_cost;
                a.instance.curSelectRefreshAttr = e;
                var i = a.instance.refreshEquipCallBack;
                m.default.instance.LoadMessageBox("重铸装备", "需要消耗以下资源来重铸:", i, t);
            }, t.prototype.refreshEquipCallBack = function(e) {
                if (e) {
                    var t = n.default.instance.equipPrefixData[a.instance.curSelectRefreshAttr].refresh_cost;
                    if (s.default.instance.cost(t)) if (0 != c.default.instance.IsEquiping(a.instance.curBagItemData)) {
                        var i = a.instance.curBagItemData.index, r = a.instance.curSelectRefreshAttr, o = n.default.instance.getEquipPrefixValById(r);
                        p.default.instance.RefreshItemRequest(i, 2, r, o);
                    } else {
                        i = a.instance.curBagItemData.index, r = a.instance.curSelectRefreshAttr, o = n.default.instance.getEquipPrefixValById(r);
                        p.default.instance.RefreshItemRequest(i, 1, r, o);
                    }
                }
            }, t.prototype.refreshEquipSuccess = function(e, t, n) {
                var i, r = 0;
                for (var o in c.default.instance.EquipItemAllDatas) if (null != c.default.instance.EquipItemAllDatas[o]) for (var s in c.default.instance.EquipItemAllDatas[o]) if (e == c.default.instance.EquipItemAllDatas[o][s].index) {
                    i = c.default.instance.EquipItemAllDatas[o][s], r = Number(o) == c.default.instance.curUseEquipPlanIndex ? 1 : 2;
                    break;
                }
                1 == r ? (c.default.instance.removeEquipAttrToPlayer(i), l.default.instance.RefreshEquipAttr(i, t, n), 
                a.instance.show(i), c.default.instance.addEquipAttrToPlayer(i)) : 2 == r ? (l.default.instance.RefreshEquipAttr(i, t, n), 
                a.instance.show(i)) : (l.default.instance.RefreshEquipAttr(c.default.instance.BagItemDataMap[e], t, n), 
                a.instance.show(c.default.instance.BagItemDataMap[e]));
            }, t.instance = null, __decorate([ h(cc.Node) ], t.prototype, "maskNode", void 0), 
            __decorate([ h(cc.Node) ], t.prototype, "nodeAttrs", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelName", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelDesc", void 0), __decorate([ h(cc.Sprite) ], t.prototype, "spriteIcon", void 0), 
            __decorate([ h(cc.Sprite) ], t.prototype, "spriteQualityGrid", void 0), t = a = __decorate([ g ], t);
        }(cc.Component);
        a.default = _, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../manager/cost_manager": "cost_manager",
        "../manager/data_manager": "data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/help_manager": "help_manager",
        "../manager/pool_manager": "pool_manager",
        "../manager/resource_manager": "resource_manager",
        "../manager/ui_manager": "ui_manager",
        "../network/bag_network": "bag_network",
        "../util": "util",
        "./item/attr_item": "attr_item"
    } ],
    refresh_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "3cf56vMl75FkqyXOxH/6zWj", "refresh_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/dynamic_data_manager"), i = e("../manager/pool_manager"), r = e("./item/bag_item"), o = e("./refresh_tip"), s = e("../common/allenum"), l = e("../audio_manager"), c = e("../util"), u = cc._decorator, d = u.ccclass, p = u.property, m = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.bagUINode = null, t.maskNode = null, t.bagContentViewNode = null, t.refreshTip = null, 
                t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideBagUI, this), this.bagUINode.active && (this.bagUINode.active = !1);
            }, t.prototype.showUI = function() {
                l.default.instance.PlayUISelect(), this.bagUINode.active = !0, this.refreshBagUI();
            }, t.prototype.refreshBagUI = function() {
                for (var e = this.bagContentViewNode.children, t = e.length - 1; t >= 0; t--) i.default.instance.RemoveBagItem(e[t]);
                if (null != n.default.instance.EquipItemAllDatas) for (var a in n.default.instance.EquipItemAllDatas) if (null != a) for (var o in n.default.instance.EquipItemAllDatas[a]) {
                    var l = i.default.instance.CreateBagItem(this.bagContentViewNode).getComponent(r.default);
                    l.reinit(n.default.instance.EquipItemAllDatas[a][o], s.GridType.RefreshItem), l.setEquipingTag(Number(a) + 1);
                }
                if (null != n.default.instance.BagItemDataMap) for (var u in n.default.instance.BagItemDataMap) {
                    if (c.default.len(n.default.instance.BagItemDataMap[u].additionAttr)) i.default.instance.CreateBagItem(this.bagContentViewNode).getComponent(r.default).reinit(n.default.instance.BagItemDataMap[u], s.GridType.RefreshItem);
                }
            }, t.prototype.showRefreshTip = function(e) {
                this.refreshTip.show(e);
            }, t.prototype.hideBagUI = function() {
                this.bagUINode.active = !1;
            }, t.instance = null, __decorate([ p(cc.Node) ], t.prototype, "bagUINode", void 0), 
            __decorate([ p(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ p(cc.Node) ], t.prototype, "bagContentViewNode", void 0), 
            __decorate([ p(o.default) ], t.prototype, "refreshTip", void 0), t = a = __decorate([ d ], t);
        }(cc.Component);
        a.default = m, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../common/allenum": "allenum",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/pool_manager": "pool_manager",
        "../util": "util",
        "./item/bag_item": "bag_item",
        "./refresh_tip": "refresh_tip"
    } ],
    resource_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "fb4bfQll8lBELG7nECN2jIU", "resource_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = cc._decorator, i = n.ccclass, r = (n.property, function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t._commonAtlas = null, t._monsterAtlas = null, t._eventsAtlas = null, t._isInit = !1, 
                t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                console.log("ResourceManager loading ..."), a.instance = this;
                var e = this;
                cc.loader.loadRes("atlas/main", cc.SpriteAtlas, function(t, a) {
                    console.log("load main done"), e._commonAtlas = a, cc.loader.loadRes("atlas/monster", cc.SpriteAtlas, function(t, a) {
                        console.log("load monster done"), e._monsterAtlas = a, cc.loader.loadRes("atlas/card", cc.SpriteAtlas, function(t, a) {
                            console.log("load events done"), e._eventsAtlas = a, e._isInit = !0;
                        });
                    });
                });
            }, Object.defineProperty(t.prototype, "Inited", {
                get: function() {
                    return this._isInit;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.getCommonSprite = function(e) {
                return this._commonAtlas ? this._commonAtlas.getSpriteFrame(e) : null;
            }, t.prototype.getEquipSprite = function(e) {
                return this._commonAtlas ? this._commonAtlas.getSpriteFrame(e) : null;
            }, t.prototype.getAtlarSprite = function(e) {
                return this._commonAtlas ? this._commonAtlas.getSpriteFrame(e) : null;
            }, t.prototype.getSkillSprite = function(e) {
                return this._commonAtlas ? this._commonAtlas.getSpriteFrame(e) : null;
            }, t.prototype.getSpriteSprite = function(e) {
                return this._commonAtlas ? this._commonAtlas.getSpriteFrame(e) : null;
            }, t.prototype.getMonsterSprite = function(e) {
                return this._monsterAtlas ? this._monsterAtlas.getSpriteFrame(e) : null;
            }, t.prototype.getEventSprite = function(e) {
                return this._eventsAtlas ? this._eventsAtlas.getSpriteFrame(e) : null;
            }, t.instance = null, t = a = __decorate([ i ], t);
        }(cc.Component));
        a.default = r, cc._RF.pop();
    }, {} ],
    reward_effect_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "24863IajNtO0abFV3yLAzi2", "reward_effect_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./pool_manager"), i = e("../controller/ui/add_resource_effect"), r = e("./effect_manager"), o = cc._decorator, s = o.ccclass, l = (o.property, 
        function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this;
            }, t.prototype.createDaimondEffect = function(e, t, a, o) {
                if (!r.default.instance.isRemoveEffect && e > 0) for (var s = 0; s < e; s++) {
                    n.default.instance.CreateObjectByName("MoneyItem", this.node).getComponent(i.default).Init(t, a, o);
                }
            }, t.instance = null, t = a = __decorate([ s ], t);
        }(cc.Component));
        a.default = l, cc._RF.pop();
    }, {
        "../controller/ui/add_resource_effect": "add_resource_effect",
        "./effect_manager": "effect_manager",
        "./pool_manager": "pool_manager"
    } ],
    reward_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "244e5UYyY1NEoJSgufjnIYi", "reward_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./data_manager"), i = e("./dynamic_data_manager"), r = e("./sprite_manager"), o = e("../data/bag_item_data"), s = e("./blackmarket_manager"), l = e("./lost_manager"), c = e("../network/player_network"), u = e("../ui/today_reward_ui"), d = e("../util"), p = e("./ui_manager"), m = function() {
            function e() {
                this.curLeftTime = 0, this.curGetRewardCount = 0, this.curTodayRewardCount = 0, 
                this.curRewardID = 0, this.curRewardType = 0, this.curBonusNum = 0, this.defaultRewardCount = 0, 
                this.reward_max_count = 8, this.last_get_timestamp = 0, this.status = 0;
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.setDefault = function() {
                this.curLeftTime = 0, this.curGetRewardCount = 0, this.curTodayRewardCount = 0, 
                this.curRewardID = 0, this.curRewardType = 0, this.curBonusNum = 0, this.defaultRewardCount = 0, 
                this.reward_max_count = 8, this.last_get_timestamp = 0, this.status = 0;
            }, e.prototype.initByNetwork = function(e, t, a) {
                this.curGetRewardCount = e, this.curTodayRewardCount = t, this.last_get_timestamp = a, 
                this.curTodayRewardCount < this.reward_max_count && this.init();
            }, e.prototype.init = function() {
                for (var e in n.default.instance.onlineRewardData) n.default.instance.onlineRewardData[e].id > this.defaultRewardCount && (this.defaultRewardCount = n.default.instance.onlineRewardData[e].id);
                this.addNewReward();
            }, e.prototype.getLeftTime = function() {
                return this.curLeftTime < 0 ? 0 : Math.floor(this.curLeftTime);
            }, e.prototype.canGetReward = function() {
                return 1 == this.status;
            }, e.prototype.isWaitingToGet = function() {
                return this.curLeftTime > 0;
            }, e.prototype.isTodayRewardFinish = function() {
                return this.curTodayRewardCount >= this.reward_max_count;
            }, e.prototype.getCurSpriteName = function() {
                var e = "zxjl_02";
                return 2 == this.curRewardType ? e = "zxjl_01" : 3 == this.curRewardType ? e = "zxjl_06" : 4 == this.curRewardType && (e = "zxjl_07"), 
                e;
            }, e.prototype.getNewLeftTimeByTodayCount = function() {
                var e = n.default.instance.globalValueData.online_reward_time, t = i.default.instance.GetServerTime() - this.last_get_timestamp;
                if (e.params[this.curTodayRewardCount]) {
                    var a = e.params[this.curTodayRewardCount] - t;
                    return a > 3 ? a : 3;
                }
                return 0;
            }, e.prototype.addNewReward = function() {
                if (this.curTodayRewardCount >= this.reward_max_count) p.default.instance.LoadTipsByStr("今天次数已满"); else {
                    if (this.defaultRewardCount > this.curGetRewardCount) {
                        var e = this.curGetRewardCount + 1, t = n.default.instance.onlineRewardData[e];
                        this.curRewardID = t.id, this.curRewardType = t.type, this.curLeftTime = this.getNewLeftTimeByTodayCount(), 
                        this.status = 0;
                    } else switch (this.curRewardID = 0, this.curRewardType = Math.floor(this.last_get_timestamp) % 4 + 1, 
                    this.curLeftTime = this.getNewLeftTimeByTodayCount(), this.status = 0, this.curRewardType) {
                      case 1:
                        this.curBonusNum = Math.floor(500 * i.default.instance.getMainPlayerLVParam());
                        break;

                      case 2:
                        var a = .2 * i.default.instance.getMainPlayerLVParam();
                        300 < a && (a = 300), this.curBonusNum = Math.floor(a);
                    }
                    u.default.instance.refreshStatus();
                }
            }, e.prototype.getRewardNumDesc = function() {
                if (0 != this.curRewardID) {
                    var e = n.default.instance.onlineRewardData[this.curRewardID];
                    switch (e.type) {
                      case 1:
                        return d.default.GetLargeNumStr(e.param);

                      case 2:
                        return d.default.GetLargeNumStr(e.param);

                      case 3:
                        return "稀有精灵";

                      case 4:
                        return "稀有装备";
                    }
                } else switch (this.curRewardType) {
                  case 1:
                  case 2:
                    return this.curBonusNum.toString();

                  case 3:
                    return "稀有精灵";

                  case 4:
                    return "稀有装备";
                }
                return "";
            }, e.prototype.getRewardNetwork = function(e) {
                this.last_get_timestamp = e;
                var t = 0;
                if (0 != this.curRewardID) {
                    var a = n.default.instance.onlineRewardData[this.curRewardID];
                    switch (a.type) {
                      case 1:
                        t = a.param;
                        break;

                      case 2:
                        t = a.param;
                        break;

                      case 3:
                        var c = a.param;
                        r.default.instance.addSprite(c), t = c;
                        break;

                      case 4:
                        var d = a.param;
                        for (var p in d) {
                            var m = d[p], f = new o.default(m, 1);
                            i.default.instance.AddBagItem(f);
                        }
                        t = this.curRewardID;
                    }
                } else switch (this.curRewardType) {
                  case 1:
                  case 2:
                    t = this.curBonusNum;
                    break;

                  case 3:
                    t = r.default.instance.addNewRandomSprite();
                    break;

                  case 4:
                    var g = s.default.instance.getBlackMarketByPlayerLV(i.default.instance.getMainPlayerLVParam()), h = l.default.instance.getRamdomBaseBagItem(g.droplv);
                    l.default.instance.addAttrToWhiteEquip(h, g.droplv, i.default.instance.getMainPlayer().addGetBetterEquip + 1), 
                    t = h.baseId;
                }
                return this.status = 2, this.curTodayRewardCount++, this.curGetRewardCount++, u.default.instance.getRewardShow(t), 
                this.curTodayRewardCount < this.reward_max_count && this.addNewReward(), t;
            }, e.prototype.getReward = function() {
                if (this.canGetReward()) {
                    if (0 != this.curRewardID) switch (n.default.instance.onlineRewardData[this.curRewardID].type) {
                      case 3:
                        if (r.default.instance.isFullSpriteBag()) return void p.default.instance.LoadTipsByID("sprite_count_limit");
                        break;

                      case 4:
                        if (i.default.instance.isBagFull()) return void p.default.instance.LoadTipsByID("bag_count_limit");
                    } else switch (this.curRewardType) {
                      case 3:
                        if (r.default.instance.isFullSpriteBag()) return void p.default.instance.LoadTipsByID("sprite_count_limit");
                        break;

                      case 4:
                        if (i.default.instance.isBagFull()) return void p.default.instance.LoadTipsByID("bag_count_limit");
                    }
                    c.default.instance.GetTodayRewardRequest(this.curRewardID);
                } else p.default.instance.LoadTipsByID("reward_time_limit");
                return 0;
            }, e.prototype.update = function(e) {
                0 == this.status && (this.curLeftTime -= e, this.curLeftTime < 0 && (this.status = 1));
            }, e._instance = null, e;
        }();
        a.default = m, cc._RF.pop();
    }, {
        "../data/bag_item_data": "bag_item_data",
        "../network/player_network": "player_network",
        "../ui/today_reward_ui": "today_reward_ui",
        "../util": "util",
        "./blackmarket_manager": "blackmarket_manager",
        "./data_manager": "data_manager",
        "./dynamic_data_manager": "dynamic_data_manager",
        "./lost_manager": "lost_manager",
        "./sprite_manager": "sprite_manager",
        "./ui_manager": "ui_manager"
    } ],
    role_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "2a783PmV65Jt5kHuo2vi8eV", "role_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/dynamic_data_manager"), i = e("./battle_ui_manager"), r = e("../util"), o = e("../manager/data_manager"), s = e("../common/emmiter"), l = e("../common/allenum"), c = e("../audio_manager"), u = e("../network/player_network"), d = e("../network/bag_network"), p = e("./menu_ui_manager"), m = e("../manager/ui_manager"), f = cc._decorator, g = f.ccclass, h = f.property, _ = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.maskNode = null, t.labelNewLiftCount = null, t.labelCombatEffect = null, 
                t.labelStength = null, t.labelPower = null, t.labelAgile = null, t.labelEnergy = null, 
                t.labelUnSeperate = null, t.labelDamage = null, t.labelAddDamagePercent = null, 
                t.labelHP = null, t.labelMP = null, t.labelDefence = null, t.labelSt = null, t.buttonAddStr = null, 
                t.buttonAdd100Str = null, t.buttonAddPow = null, t.buttonAdd100Pow = null, t.buttonAddAgi = null, 
                t.buttonAdd100Agi = null, t.buttonAddEne = null, t.buttonAdd100Ene = null, t.btnRecommendAddPoint = null, 
                t.labelAttInterval = null, t.labelCritical = null, t.labelHit = null, t.labelBlock = null, 
                t.labelKillAddHP = null, t.labelKillAddMP = null, t.labelAttAddHP = null, t.labelAttAddMP = null, 
                t.labelRealDamage = null, t.labelRealDefence = null, t.labelAddExp = null, t.labelBetterEquip = null, 
                t.labelDizziDefence = null, t.labelfronzenDamage = null, t.labelfronzenDamageAdd = null, 
                t.labelblazeDamage = null, t.labelblazeDamageAdd = null, t.labellightDamage = null, 
                t.labellightDamageAdd = null, t.labelpoisonDamage = null, t.labelpoisonDamageAdd = null, 
                t.labelfronzenDefence = null, t.labelblazeDefence = null, t.labellightDefence = null, 
                t.labelpoisonDefence = null, t.labelelementDamagePercent = null, t.labelelementDefence = null, 
                t.labelGoldAdd = null, t.label_altar = null, t.btn_equips = [], t.equipItemNode = null, 
                t.btn_change_plan = null, t.node_cur_plan = [], t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideUI, this), this.buttonAddStr.node.on("click", this.add1Streangth, this), 
                this.buttonAdd100Str.node.on("click", this.add100Streangth, this), this.buttonAddPow.node.on("click", this.add1Power, this), 
                this.buttonAdd100Pow.node.on("click", this.add100Power, this), this.buttonAddAgi.node.on("click", this.add1Agile, this), 
                this.buttonAdd100Agi.node.on("click", this.add100Agile, this), this.buttonAddEne.node.on("click", this.add1Energy, this), 
                this.buttonAdd100Ene.node.on("click", this.add100Energy, this), this.btnRecommendAddPoint.node.on("click", this.recommendAddPoint, this), 
                this.btn_equips[0].node.on("click", function(e) {
                    this.onClickEquipBtn(0);
                }, this), this.btn_equips[1].node.on("click", function(e) {
                    this.onClickEquipBtn(1);
                }, this), this.btn_equips[2].node.on("click", function(e) {
                    this.onClickEquipBtn(2);
                }, this), this.btn_equips[3].node.on("click", function(e) {
                    this.onClickEquipBtn(3);
                }, this), this.btn_equips[4].node.on("click", function(e) {
                    this.onClickEquipBtn(4);
                }, this), this.btn_change_plan.node.on("click", this.onClickChangePlan, this), this.uiNode.active && (this.uiNode.active = !1);
            }, t.prototype.hideUI = function() {
                this.uiNode.active = !1, n.default.instance.isVirtual = !1, this.btn_equips[a.curChangeIndex].node.color = cc.Color.WHITE;
            }, t.prototype.showUI = function(e) {
                c.default.instance.PlayUISelect(), this.uiNode.active = !0, this.updateBaseAttr(e), 
                this.updateAltar(), this.updateEquipBtn(), 0 == e || null == e ? (a.curChangeIndex = n.default.instance.curUseEquipPlanIndex, 
                this.btn_equips[a.curChangeIndex].node.color = cc.Color.GREEN, this.btnRecommendAddPoint.node.active = !0, 
                this.btn_change_plan.node.active = !1) : (this.btnRecommendAddPoint.node.active = !1, 
                this.btn_change_plan.node.active = !0);
                for (var t = 0, i = this.node_cur_plan; t < i.length; t++) {
                    i[t].active = !1;
                }
                this.node_cur_plan[n.default.instance.curUseEquipPlanIndex].active = !0;
            }, t.prototype.updateBaseAttr = function(e) {
                var t;
                this.labelNewLiftCount.string = "重生次数：" + n.default.instance.newLiftCount.toString(), 
                t = 1 == e ? n.default.instance.virtualHero : n.default.instance.getMainPlayer(), 
                this.labelCombatEffect.string = t.battleValue.toString(), this.labelStength.string = t.strength.toString(), 
                this.labelPower.string = t.power.toString(), this.labelAgile.string = t.agile.toString(), 
                this.labelEnergy.string = t.energy.toString(), this.labelUnSeperate.string = t.unSeperatePoint.toString(), 
                this.labelDamage.string = r.default.GetFloorNumStr(t.baseMinDamage) + " ~ " + r.default.GetFloorNumStr(t.baseMaxDamage), 
                this.labelAddDamagePercent.string = this.getPercentStr(t.addDamagePercent), this.labelHP.string = r.default.GetFloorNumStr(t.maxhp), 
                this.labelMP.string = r.default.GetFloorNumStr(t.maxmp), this.labelDefence.string = r.default.GetFloorNumStr(t.df), 
                this.labelSt.string = this.getPercentStr(t.adddf), this.labelAttInterval.string = o.default.instance.getAttrValStr("攻击速度", t.attInterval), 
                this.labelCritical.string = this.getPercentStr(t.criticalRate), this.labelHit.string = r.default.GetFloorNumStr(t.hitVal), 
                this.labelBlock.string = r.default.GetFloorNumStr(t.blockVal), this.labelKillAddHP.string = r.default.GetFloorNumStr(t.killAddHp), 
                this.labelKillAddMP.string = r.default.GetFloorNumStr(t.killAddMp), this.labelAttAddHP.string = this.getPercentStr(t.attAddHpPercent), 
                this.labelAttAddMP.string = this.getPercentStr(t.attAddMpPercent), this.labelRealDamage.string = r.default.GetFloorNumStr(t.realDamage), 
                this.labelRealDefence.string = r.default.GetFloorNumStr(t.realDefence), this.labelAddExp.string = this.getPercentStr(t.getAddExpRate), 
                this.labelBetterEquip.string = this.getPercentStr(t.addGetBetterEquip), this.labelDizziDefence.string = this.getPercentStr(t.getDizzinessDefence()), 
                this.labelfronzenDamage.string = r.default.GetFloorNumStr(t.baseFrozenDamage), this.labelfronzenDamageAdd.string = this.getPercentStr(t.frozenDamagePercent), 
                this.labelblazeDamage.string = r.default.GetFloorNumStr(t.baseBlazeDamage), this.labelblazeDamageAdd.string = this.getPercentStr(t.blazeDamagePercent), 
                this.labellightDamage.string = r.default.GetFloorNumStr(t.baseLightDamage), this.labellightDamageAdd.string = this.getPercentStr(t.lightDamagePercent), 
                this.labelpoisonDamage.string = r.default.GetFloorNumStr(t.basePoisonDamage), this.labelpoisonDamageAdd.string = this.getPercentStr(t.poisonDamagePercent), 
                this.labelfronzenDefence.string = this.getPercentStr(t.frozenDefence), this.labelblazeDefence.string = this.getPercentStr(t.blazeDefence), 
                this.labellightDefence.string = this.getPercentStr(t.lightDefence), this.labelpoisonDefence.string = this.getPercentStr(t.poisonDefence), 
                this.labelelementDamagePercent.string = this.getPercentStr(t.elementDamagePercent), 
                this.labelelementDefence.string = this.getPercentStr(t.elementDefence), this.labelGoldAdd.string = this.getPercentStr(t.addGetCoin);
            }, t.prototype.updateEquipBtn = function() {
                for (var e = n.default.instance.curUseEquipPlanNum, t = 0; t < 5; t++) this.btn_equips[t].node.active = t < e;
            }, t.prototype.onClickEquipBtn = function(e) {
                a.curChangeIndex != e ? (e != n.default.instance.curUseEquipPlanIndex ? n.default.instance.isVirtual = !0 : n.default.instance.isVirtual = !1, 
                this.btn_equips[a.curChangeIndex].node.color = cc.Color.WHITE, a.curChangeIndex = e, 
                this.btn_equips[a.curChangeIndex].node.color = cc.Color.GREEN, n.default.instance.ShowVirtualHeroData(a.curChangeIndex), 
                p.default.instance.checkBagAlert()) : m.default.instance.LoadTipsByStr("当前方案已被选择");
            }, t.prototype.onClickChangePlan = function() {
                var e = "点击确认切换装备方案" + (a.curChangeIndex + 1);
                m.default.instance.LoadMessageBox("切换方案", e, this.OnClickSureChangePlan);
            }, t.prototype.OnClickSureChangePlan = function(e) {
                e && (n.default.instance.isVirtual = !1, a.curChangeIndex != n.default.instance.curUseEquipPlanIndex && d.default.instance.ActiveEquipRequest(a.curChangeIndex));
            }, t.prototype.recommendAddPoint = function() {
                m.default.instance.LoadMessageBox("推荐加点", "将按照新手方案，力量:敏捷=1:1进行配置加点。", this.recommendAddPointCallback);
            }, t.prototype.recommendAddPointCallback = function(e) {
                if (e) {
                    var t = n.default.instance.getMainPlayer(), i = t.strength, r = t.agile, o = t.unSeperatePoint, s = 0, l = 0;
                    if (i > r) if ((c = i - r) >= o) l = o; else l += c, (u = o - c) % 2 == 0 ? (s += Math.floor(u / 2), 
                    l += Math.floor(u / 2)) : (s += Math.floor(u / 2 + 1), l += Math.floor(u / 2)); else if (i <= r) {
                        var c, u;
                        if ((c = r - i) >= o) s = o; else s += c, (u = o - c) % 2 == 0 ? (s += Math.floor(u / 2), 
                        l += Math.floor(u / 2)) : (s += Math.floor(u / 2 + 1), l += Math.floor(u / 2));
                    }
                    s > 0 && a.instance.addStrength(s), l > 0 && a.instance.addAgile(l);
                }
            }, t.prototype.getPercentStr = function(e) {
                return r.default.GetPercentStr(e);
            }, t.prototype.add1Streangth = function() {
                1 != n.default.instance.isVirtual ? this.addStrength(1) : m.default.instance.LoadTipsByStr("查看方案时，无法加点");
            }, t.prototype.add100Streangth = function() {
                1 != n.default.instance.isVirtual ? this.addStrength(100) : m.default.instance.LoadTipsByStr("查看方案时，无法加点");
            }, t.prototype.add1Power = function() {
                1 != n.default.instance.isVirtual ? this.addPower(1) : m.default.instance.LoadTipsByStr("查看方案时，无法加点");
            }, t.prototype.add100Power = function() {
                1 != n.default.instance.isVirtual ? this.addPower(100) : m.default.instance.LoadTipsByStr("查看方案时，无法加点");
            }, t.prototype.add1Agile = function() {
                1 != n.default.instance.isVirtual ? this.addAgile(1) : m.default.instance.LoadTipsByStr("查看方案时，无法加点");
            }, t.prototype.add100Agile = function() {
                1 != n.default.instance.isVirtual ? this.addAgile(100) : m.default.instance.LoadTipsByStr("查看方案时，无法加点");
            }, t.prototype.add1Energy = function() {
                1 != n.default.instance.isVirtual ? this.addEnergy(1) : m.default.instance.LoadTipsByStr("查看方案时，无法加点");
            }, t.prototype.add100Energy = function() {
                1 != n.default.instance.isVirtual ? this.addEnergy(100) : m.default.instance.LoadTipsByStr("查看方案时，无法加点");
            }, t.prototype.addStrength = function(e) {
                n.default.instance.getMainPlayer().unSeperatePoint < 1 || (u.default.instance.PlayerAddPoint(1, e), 
                n.default.instance.getMainPlayer().addBaseStrengthByPoint(e), this.updateBaseAttr(), 
                i.default.instance.updatePlayerInfoUI(), s.Emitter.fire(l.AlertType.RoleAlert.toString()));
            }, t.prototype.addPower = function(e) {
                n.default.instance.getMainPlayer().unSeperatePoint < 1 || (u.default.instance.PlayerAddPoint(2, e), 
                n.default.instance.getMainPlayer().addBasePowerByPoint(e), this.updateBaseAttr(), 
                i.default.instance.updatePlayerInfoUI(), s.Emitter.fire(l.AlertType.RoleAlert.toString()));
            }, t.prototype.addAgile = function(e) {
                n.default.instance.getMainPlayer().unSeperatePoint < 1 || (u.default.instance.PlayerAddPoint(3, e), 
                n.default.instance.getMainPlayer().addBaseAgileByPoint(e), this.updateBaseAttr(), 
                s.Emitter.fire(l.AlertType.RoleAlert.toString()));
            }, t.prototype.addEnergy = function(e) {
                n.default.instance.getMainPlayer().unSeperatePoint < 1 || (u.default.instance.PlayerAddPoint(4, e), 
                n.default.instance.getMainPlayer().addBaseEnergyByPoint(e), this.updateBaseAttr(), 
                i.default.instance.updatePlayerInfoUI(), s.Emitter.fire(l.AlertType.RoleAlert.toString()));
            }, t.prototype.updateAltar = function() {
                var e = n.default.instance.AltarBuffData, t = o.default.instance.getAltarDatasByID(e), a = "";
                for (var i in t) {
                    var r = t[i];
                    a += cc.js.formatStr("<color=#FAE800E2>%s</color>", r.name + "  lv:" + r.bufflv + "\n"), 
                    a += cc.js.formatStr("<color=#ffffff>%s</color>", r.desc) + "\n";
                }
                this.label_altar.string = a;
            }, t.prototype.refreshAllEquipItem = function() {
                this.equipItemNode.active = !1, this.equipItemNode.active = !0;
            }, t.instance = null, t.curChangeIndex = 0, __decorate([ h(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ h(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelNewLiftCount", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelCombatEffect", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelStength", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelPower", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelAgile", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelEnergy", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelUnSeperate", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelDamage", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelAddDamagePercent", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelHP", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelMP", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelDefence", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelSt", void 0), 
            __decorate([ h(cc.Button) ], t.prototype, "buttonAddStr", void 0), __decorate([ h(cc.Button) ], t.prototype, "buttonAdd100Str", void 0), 
            __decorate([ h(cc.Button) ], t.prototype, "buttonAddPow", void 0), __decorate([ h(cc.Button) ], t.prototype, "buttonAdd100Pow", void 0), 
            __decorate([ h(cc.Button) ], t.prototype, "buttonAddAgi", void 0), __decorate([ h(cc.Button) ], t.prototype, "buttonAdd100Agi", void 0), 
            __decorate([ h(cc.Button) ], t.prototype, "buttonAddEne", void 0), __decorate([ h(cc.Button) ], t.prototype, "buttonAdd100Ene", void 0), 
            __decorate([ h(cc.Button) ], t.prototype, "btnRecommendAddPoint", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelAttInterval", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelCritical", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelHit", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelBlock", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelKillAddHP", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelKillAddMP", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelAttAddHP", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelAttAddMP", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelRealDamage", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelRealDefence", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelAddExp", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelBetterEquip", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelDizziDefence", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelfronzenDamage", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelfronzenDamageAdd", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelblazeDamage", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelblazeDamageAdd", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labellightDamage", void 0), __decorate([ h(cc.Label) ], t.prototype, "labellightDamageAdd", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelpoisonDamage", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelpoisonDamageAdd", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelfronzenDefence", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelblazeDefence", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labellightDefence", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelpoisonDefence", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelelementDamagePercent", void 0), __decorate([ h(cc.Label) ], t.prototype, "labelelementDefence", void 0), 
            __decorate([ h(cc.Label) ], t.prototype, "labelGoldAdd", void 0), __decorate([ h(cc.RichText) ], t.prototype, "label_altar", void 0), 
            __decorate([ h(cc.Button) ], t.prototype, "btn_equips", void 0), __decorate([ h(cc.Node) ], t.prototype, "equipItemNode", void 0), 
            __decorate([ h(cc.Button) ], t.prototype, "btn_change_plan", void 0), __decorate([ h(cc.Node) ], t.prototype, "node_cur_plan", void 0), 
            t = a = __decorate([ g ], t);
        }(cc.Component);
        a.default = _, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../common/allenum": "allenum",
        "../common/emmiter": "emmiter",
        "../manager/data_manager": "data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/ui_manager": "ui_manager",
        "../network/bag_network": "bag_network",
        "../network/player_network": "player_network",
        "../util": "util",
        "./battle_ui_manager": "battle_ui_manager",
        "./menu_ui_manager": "menu_ui_manager"
    } ],
    sign_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "86741xFVvZJirxupC1npZTU", "sign_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/dynamic_data_manager"), i = e("../../manager/data_manager"), r = e("../../manager/resource_manager"), o = e("../../util"), s = e("../../manager/ui_manager"), l = cc._decorator, c = l.ccclass, u = l.property, d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelDesc = null, t.labelBonusNum = null, t.spriteBg = null, t.nodeCheckTag = null, 
                t.curIndex = 0, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                this.node.on("click", this.showInfo, this);
            }, t.prototype.onEnable = function() {
                this.refreshItem();
            }, t.prototype.showInfo = function() {
                var e = this.getSignID(), t = i.default.instance.signData[e];
                t && s.default.instance.LoadTipsByStr(t.desc);
            }, t.prototype.getSignID = function() {
                return n.default.instance.canSign ? n.default.instance.signTotalCount >= a.SIGN_LOOP_START_INDEX ? a.SIGN_LOOP_START_INDEX + this.curIndex : this.curIndex + Math.floor(n.default.instance.signTotalCount / a.SIGN_LOOP_COUNT) * a.SIGN_LOOP_COUNT : n.default.instance.signTotalCount - 1 >= a.SIGN_LOOP_START_INDEX ? a.SIGN_LOOP_START_INDEX + this.curIndex : n.default.instance.signTotalCount >= 1 ? this.curIndex + Math.floor((n.default.instance.signTotalCount - 1) / a.SIGN_LOOP_COUNT) * a.SIGN_LOOP_COUNT : this.curIndex;
            }, t.prototype.refreshItem = function() {
                var e = n.default.instance.signTotalCount % a.SIGN_LOOP_COUNT;
                0 != e || n.default.instance.canSign || (e = 7), this.curIndex > e ? this.nodeCheckTag.active = !1 : this.nodeCheckTag.active = !0;
                var t = this.getSignID(), s = i.default.instance.signData[t];
                if (s) switch (this.spriteBg.spriteFrame = r.default.instance.getCommonSprite(s.icon), 
                s.type) {
                  case 1:
                  case 2:
                  case 3:
                    this.labelBonusNum.string = o.default.GetLargeNumStr(s.bonus_param);
                    break;

                  case 4:
                  case 5:
                    this.labelBonusNum.string = s.name;
                    break;

                  default:
                    console.log("no this type :" + s.type);
                }
            }, t.SIGN_LOOP_START_INDEX = 14, t.SIGN_LOOP_COUNT = 7, __decorate([ u(cc.Label) ], t.prototype, "labelDesc", void 0), 
            __decorate([ u(cc.Label) ], t.prototype, "labelBonusNum", void 0), __decorate([ u(cc.Sprite) ], t.prototype, "spriteBg", void 0), 
            __decorate([ u(cc.Node) ], t.prototype, "nodeCheckTag", void 0), __decorate([ u ], t.prototype, "curIndex", void 0), 
            t = a = __decorate([ c ], t);
        }(cc.Component);
        a.default = d, cc._RF.pop();
    }, {
        "../../manager/data_manager": "data_manager",
        "../../manager/dynamic_data_manager": "dynamic_data_manager",
        "../../manager/resource_manager": "resource_manager",
        "../../manager/ui_manager": "ui_manager",
        "../../util": "util"
    } ],
    sign_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "68b7eGCTYxFZY2rtG6awBTs", "sign_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/dynamic_data_manager"), i = e("./item/sign_item"), r = e("../network/player_network"), o = e("../common/emmiter"), s = e("../common/allenum"), l = e("../manager/data_manager"), c = e("../network/sprite_network"), u = e("../manager/sprite_manager"), d = e("../manager/lost_manager"), p = e("../manager/reward_effect_manager"), m = e("../manager/ui_manager"), f = cc._decorator, g = f.ccclass, h = f.property, _ = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.maskNode = null, t.btnSign = null, t.signItems = [], t.isSprite = !1, 
                t.isEquip = !1, t.nowCount = 0, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideUI, this), this.btnSign.node.on("click", this.sign, this), 
                this.uiNode.active && (this.uiNode.active = !1);
            }, t.prototype.hideUI = function() {
                this.uiNode.active = !1;
            }, t.prototype.showUI = function() {
                this.uiNode.active = !0, this.signInit();
            }, t.prototype.initData = function() {}, t.prototype.signInit = function() {
                n.default.instance.canSign ? this.btnSign.interactable = !0 : this.btnSign.interactable = !1;
                for (var e = 0, t = this.signItems; e < t.length; e++) {
                    t[e].refreshItem();
                }
                o.Emitter.fire(s.AlertType.SignAlert.toString());
            }, t.prototype.sign = function() {
                var e = 0;
                e = n.default.instance.signTotalCount > i.default.SIGN_LOOP_START_INDEX ? i.default.SIGN_LOOP_START_INDEX + n.default.instance.signTotalCount % i.default.SIGN_LOOP_COUNT + 1 : n.default.instance.signTotalCount + 1, 
                this.checkCodition(e) && (this.btnSign.interactable = !1, r.default.instance.PlayerSignRequest());
            }, t.prototype.getSignReward = function(e) {
                var t = 0;
                t = n.default.instance.signTotalCount > i.default.SIGN_LOOP_START_INDEX ? i.default.SIGN_LOOP_START_INDEX + n.default.instance.signTotalCount % i.default.SIGN_LOOP_COUNT + 1 : n.default.instance.signTotalCount + 1, 
                n.default.instance.signTotalCount++, this.signInit(), this.getBonusBySignID(t), 
                m.default.instance.LoadTipsByStr("领取成功！");
            }, t.prototype.checkCodition = function(e) {
                var t = l.default.instance.signData[e];
                if (!t) return !1;
                switch (t.type) {
                  case 4:
                    if (u.default.instance.isFullSpriteBag()) return m.default.instance.LoadTipsByID("sprite_count_limit"), 
                    !1;
                    break;

                  case 5:
                    if (n.default.instance.isBagFull()) return m.default.instance.LoadTipsByID("bag_count_limit"), 
                    !1;
                    break;

                  default:
                    console.log("no this type :" + t.type);
                }
                return !0;
            }, t.prototype.getBonusBySignID = function(e) {
                var t = l.default.instance.signData[e];
                if (this.nowCount = (e - 1) % i.default.SIGN_LOOP_COUNT, t) switch (t.type) {
                  case 1:
                    p.default.instance.createDaimondEffect(5, "金币", this.signItems[this.nowCount].node.parent.convertToWorldSpaceAR(this.signItems[this.nowCount].node.position));
                    break;

                  case 2:
                    p.default.instance.createDaimondEffect(5, "钻石", this.signItems[this.nowCount].node.parent.convertToWorldSpaceAR(this.signItems[this.nowCount].node.position));
                    break;

                  case 3:
                    r.default.instance.UpdatePlayerBaseData();
                    break;

                  case 4:
                    c.default.instance.PlayerAddSprite(t.bonus_param), this.isSprite = !0;
                    break;

                  case 5:
                    var a = d.default.instance.getLostByID(t.bonus_param, 1, 1);
                    a && n.default.instance.AddBagItem(a), this.isEquip = !0;
                    break;

                  default:
                    console.log("no this type :" + t.type);
                } else console.error("no this sign data :" + e);
                return !0;
            }, t.prototype.playGetBonusAnim = function(e) {
                1 == this.isEquip && (p.default.instance.createDaimondEffect(1, "装备", this.signItems[this.nowCount].node.parent.convertToWorldSpaceAR(this.signItems[this.nowCount].node.position), e), 
                this.isEquip = !1), 1 == this.isSprite && (p.default.instance.createDaimondEffect(1, "精灵", this.signItems[this.nowCount].node.parent.convertToWorldSpaceAR(this.signItems[this.nowCount].node.position), e), 
                this.isSprite = !1);
            }, t.instance = null, __decorate([ h(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ h(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ h(cc.Button) ], t.prototype, "btnSign", void 0), 
            __decorate([ h([ i.default ]) ], t.prototype, "signItems", void 0), t = a = __decorate([ g ], t);
        }(cc.Component);
        a.default = _, cc._RF.pop();
    }, {
        "../common/allenum": "allenum",
        "../common/emmiter": "emmiter",
        "../manager/data_manager": "data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/lost_manager": "lost_manager",
        "../manager/reward_effect_manager": "reward_effect_manager",
        "../manager/sprite_manager": "sprite_manager",
        "../manager/ui_manager": "ui_manager",
        "../network/player_network": "player_network",
        "../network/sprite_network": "sprite_network",
        "./item/sign_item": "sign_item"
    } ],
    skill_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "3c72bZCwltMTJt2uchsx/kZ", "skill_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/skill_manager"), i = e("../skill_ui_manager"), r = e("../../manager/resource_manager"), o = e("../../manager/dynamic_data_manager"), s = cc._decorator, l = s.ccclass, c = s.property, u = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelDesc = null, t.btnSelectSkill = null, t.spriteSkill = null, t.spriteMask = null, 
                t.curIndex = 0, t.skillData = null, t.lastSkillId = 0, t;
            }
            return __extends(t, e), t.prototype.onLoad = function() {
                this.btnSelectSkill.node.on("click", this.onClick, this);
            }, t.prototype.start = function() {
                this.resetSkill();
            }, t.prototype.updateStatus = function() {
                var e = n.default.instance.getSkillByUserIndex(this.curIndex);
                e ? (this.spriteMask.fillRange = e.getCDPercent(), o.default.instance.getMainPlayer().mp < e.getNeedMp() ? this.labelDesc.string = "MP不足" : this.labelDesc.string = Math.floor(e.cd).toString(), 
                this.spriteSkill.spriteFrame.name != e.getSpriteName() && (this.spriteSkill.spriteFrame = r.default.instance.getSkillSprite(e.getSpriteName()), 
                this.lastSkillId = e.baseID)) : 0 != this.lastSkillId && (this.resetSkill(), this.lastSkillId = 0);
            }, t.prototype.resetSkill = function() {
                this.spriteSkill.spriteFrame = r.default.instance.getSkillSprite("addskill"), this.spriteMask.fillRange = 0, 
                this.labelDesc.string = "";
            }, t.prototype.onClick = function() {
                i.default.instance.showUI();
            }, __decorate([ c(cc.Label) ], t.prototype, "labelDesc", void 0), __decorate([ c(cc.Button) ], t.prototype, "btnSelectSkill", void 0), 
            __decorate([ c(cc.Sprite) ], t.prototype, "spriteSkill", void 0), __decorate([ c(cc.Sprite) ], t.prototype, "spriteMask", void 0), 
            __decorate([ c ], t.prototype, "curIndex", void 0), t = __decorate([ l ], t);
        }(cc.Component);
        a.default = u, cc._RF.pop();
    }, {
        "../../manager/dynamic_data_manager": "dynamic_data_manager",
        "../../manager/resource_manager": "resource_manager",
        "../../manager/skill_manager": "skill_manager",
        "../skill_ui_manager": "skill_ui_manager"
    } ],
    skill_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "8a39b8FAc5If6CwGTC2hRYB", "skill_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./data_manager"), i = e("../util"), r = e("../battle/battle_manager"), o = e("../math/rand"), s = e("./dynamic_data_manager"), l = e("./help_manager"), c = e("./ui_manager"), u = function() {
            function e() {
                this.baseID = 0, this.lv = 1, this.cd = 0, this.status = 0;
            }
            return e.prototype.update = function(e) {
                this.cd -= e, this.cd <= 0 && (this.use() ? this.cd = this.getCDDelta() : this.cd = 0);
            }, e.prototype.getCDDelta = function() {
                var e = s.default.instance.getMainPlayer().buffData.getBuffValue("技能冷却");
                return n.default.instance.skillData[this.baseID].cd * (1 + e);
            }, e.prototype.getCDPercent = function() {
                return this.cd / this.getCDDelta();
            }, e.prototype.getSpriteName = function() {
                return n.default.instance.skillData[this.baseID].icon_path;
            }, e.prototype.getNeedMp = function() {
                var e = n.default.instance.skillData[this.baseID].cost_mp;
                return Math.floor(this.lv * e * (1.5 * (this.lv - 1) + 1));
            }, e.prototype.getAttr = function(e) {
                var t = {}, a = n.default.instance.skillData[this.baseID];
                for (var i in a.effect) null == t[i] ? t[i] = a.effect[i] : t[i] += a.effect[i];
                for (var i in a.effect_up) null == t[i] ? t[i] = a.effect_up[i] * (this.lv - 1) : t[i] += a.effect_up[i] * (this.lv - 1);
                return t[e] ? t[e] : 0;
            }, e.prototype.getDesc = function() {
                var e = "", t = n.default.instance.skillData[this.baseID];
                if (null != t) {
                    var a = {};
                    for (var i in t.effect) null == a[i] ? a[i] = t.effect[i] : a[i] += t.effect[i];
                    for (var i in t.effect_up) null == a[i] ? a[i] = t.effect_up[i] * (this.lv - 1) : a[i] += t.effect_up[i] * (this.lv - 1);
                    for (var i in a) e += l.default.instance.getAttrShowStr(i, a[i]) + "    ";
                }
                return e + "  MP:" + this.getNeedMp().toString();
            }, e.prototype.setUp = function() {
                this.cd = this.getCDDelta(), this.status = 1;
            }, e.prototype.drop = function() {
                this.status = 0;
            }, e.prototype.isUsing = function() {
                return 1 == this.status;
            }, e.prototype.use = function() {
                return r.default.instance.PlayerUserSkill(this.baseID);
            }, e.prototype.canLvUp = function() {
                return this.lv < n.default.instance.skillData[this.baseID].max_lv;
            }, e.prototype.lvUp = function() {
                this.lv++;
            }, e;
        }();
        a.SkillData = u;
        var d = function() {
            function e() {
                this.max_skill_count = 4;
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e(), this._instance.skills = [], 
                    this._instance.setUpIndexs = []), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.addSkill = function(e, t) {
                void 0 === t && (t = 1);
                var a = n.default.instance.skillData[e], i = new u();
                i.baseID = e, i.lv = t, i.cd = a.cd, this.skills.push(i);
            }, e.prototype.isLearnSkill = function(e) {
                for (var t in this.skills) if (this.skills[t].baseID == e) return !0;
                return !1;
            }, e.prototype.isSkillIndexFull = function() {
                return i.default.len(this.setUpIndexs) >= this.max_skill_count;
            }, e.prototype.canLvUpSkill = function(e) {
                for (var t in this.skills) {
                    var a = this.skills[t].baseID;
                    if (this.skills[t].lv >= n.default.instance.skillData[a].max_lv) return !0;
                }
                return !1;
            }, e.prototype.getSkillInfoByBaseID = function(e) {
                for (var t in this.skills) if (this.skills[t].baseID == e) return this.skills[t];
                return null;
            }, e.prototype.getIndexBySkillID = function(e) {
                for (var t in this.skills) if (this.skills[t].baseID == e) return Number(t);
                return null;
            }, e.prototype.getSkillByIndex = function(e) {
                return this.skills[e] ? this.skills[e] : null;
            }, e.prototype.getSkillByUserIndex = function(e) {
                return this.skills[this.setUpIndexs[e]] ? this.skills[this.setUpIndexs[e]] : null;
            }, e.prototype.checkIndexSkillIsUsing = function(e) {
                return !!this.skills[e] && this.skills[e].isUsing();
            }, e.prototype.setUpSkill = function(e) {
                this.isSkillIndexFull() ? c.default.instance.LoadTipsByID("skill_full_limit") : (this.skills[e] && this.skills[e].setUp(), 
                this.setUpIndexs.push(e));
            }, e.prototype.dropUpSkill = function(e) {
                this.skills[e] && this.skills[e].drop(), i.default.CutData(this.setUpIndexs, e);
            }, e.prototype.lvUp = function(e) {
                this.getSkillInfoByBaseID(e).lvUp();
            }, e.prototype.updateUsingSkill = function(e) {
                for (var t in this.setUpIndexs) this.skills[this.setUpIndexs[t]].isUsing() && this.skills[this.setUpIndexs[t]].update(e);
            }, e.prototype.getCanLearnSkill = function() {
                var e, t = new Array();
                for (e in n.default.instance.skillData) {
                    var a = n.default.instance.skillData[e];
                    if (0 != a.canLearn) {
                        var i = this.getSkillInfoByBaseID(a.id);
                        null == i ? t.push(a.id) : i && i.lv < a.max_lv && t.push(a.id);
                    }
                }
                if (t.length > 0) {
                    if (t.length <= 5) return t;
                    for (var r = 0; r < t.length; r++) {
                        var s = o.default.getRandomNum(0, t.length - 1), l = t[s];
                        t[s] = t[r], t[r] = l;
                    }
                    return t = t.slice(0, 5);
                }
                return null;
            }, e._instance = null, e;
        }();
        a.default = d, cc._RF.pop();
    }, {
        "../battle/battle_manager": "battle_manager",
        "../math/rand": "rand",
        "../util": "util",
        "./data_manager": "data_manager",
        "./dynamic_data_manager": "dynamic_data_manager",
        "./help_manager": "help_manager",
        "./ui_manager": "ui_manager"
    } ],
    skill_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "9a8f5zTBeJERJDw4MdElm/Z", "skill_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/pool_manager"), i = e("../manager/skill_manager"), r = e("./item/store_item"), o = e("./item/skill_item"), s = e("../audio_manager"), l = e("../network/player_network"), c = e("../manager/ui_manager"), u = cc._decorator, d = u.ccclass, p = u.property, m = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.maskNode = null, t.nodeSkillInfo = null, t.nodeStatusMark = null, 
                t.btnSwitchSkillInfoShow = null, t.contentNode = null, t.skill1 = null, t.skill2 = null, 
                t.skill3 = null, t.skill4 = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideUI, this), this.btnSwitchSkillInfoShow.node.on("click", this.switchSkillInfoStatus, this), 
                this.uiNode.active && (this.uiNode.active = !1);
            }, t.prototype.update = function() {
                this.skill1.updateStatus(), this.skill2.updateStatus(), this.skill3.updateStatus(), 
                this.skill4.updateStatus();
            }, t.prototype.showUI = function() {
                s.default.instance.PlayUISelect(), this.uiNode.active = !0, this.refreshUI();
            }, t.prototype.refreshUI = function() {
                for (var e = this.contentNode.children, t = e.length - 1; t >= 0; t--) n.default.instance.RemoveObjectByName("StoreItem", e[t]);
                var a, o = i.default.instance.skills;
                for (a in o) {
                    if (o[a]) n.default.instance.CreateObjectByName("StoreItem", this.contentNode).getComponent(r.default).initSkillSelectItem(a, this.itemCallBack);
                }
            }, t.prototype.hideUI = function() {
                this.uiNode.active = !1;
            }, t.prototype.switchSkillInfoStatus = function() {
                this.nodeSkillInfo.active ? (this.nodeSkillInfo.active = !1, this.nodeStatusMark.rotation = 90) : (this.nodeSkillInfo.active = !0, 
                this.nodeStatusMark.rotation = 270);
            }, t.prototype.itemCallBack = function(e) {
                if (i.default.instance.checkIndexSkillIsUsing(e)) {
                    i.default.instance.dropUpSkill(e);
                    var t = i.default.instance.getSkillByIndex(e).baseID;
                    l.default.instance.PlayerUseSkill(t, !1);
                } else if (i.default.instance.isSkillIndexFull()) c.default.instance.LoadTipsByID("skill_full_limit"); else {
                    i.default.instance.setUpSkill(e);
                    t = i.default.instance.getSkillByIndex(e).baseID;
                    l.default.instance.PlayerUseSkill(t, !0);
                }
                a.instance.refreshUI();
            }, t.prototype.resetSkillItem = function() {
                this.skill1.resetSkill(), this.skill2.resetSkill(), this.skill3.resetSkill(), this.skill4.resetSkill();
            }, t.instance = null, __decorate([ p(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ p(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ p(cc.Node) ], t.prototype, "nodeSkillInfo", void 0), 
            __decorate([ p(cc.Node) ], t.prototype, "nodeStatusMark", void 0), __decorate([ p(cc.Button) ], t.prototype, "btnSwitchSkillInfoShow", void 0), 
            __decorate([ p(cc.Node) ], t.prototype, "contentNode", void 0), __decorate([ p(o.default) ], t.prototype, "skill1", void 0), 
            __decorate([ p(o.default) ], t.prototype, "skill2", void 0), __decorate([ p(o.default) ], t.prototype, "skill3", void 0), 
            __decorate([ p(o.default) ], t.prototype, "skill4", void 0), t = a = __decorate([ d ], t);
        }(cc.Component);
        a.default = m, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../manager/pool_manager": "pool_manager",
        "../manager/skill_manager": "skill_manager",
        "../manager/ui_manager": "ui_manager",
        "../network/player_network": "player_network",
        "./item/skill_item": "skill_item",
        "./item/store_item": "store_item"
    } ],
    sound_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "9caf1dDKuxFNIZFXYMin3Kv", "sound_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/resource_manager"), i = e("../../audio_manager"), r = e("../../manager/wx_manager"), o = e("../../common/allenum"), s = e("../../common/emmiter"), l = cc._decorator, c = l.ccclass, u = l.property, d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.curSprite = null, t.curNode = null, t.keyName = "open_sound", t;
            }
            return __extends(t, e), t.prototype.start = function() {
                this.curNode.on("click", this.switchSound, this);
                s.Emitter.register(o.AlertType.GameStart.toString(), this.Init, this);
            }, t.prototype.Init = function() {
                var e = r.default.instance.getLocal(this.keyName);
                e && e == o.SettingStatus.Off ? (this.curSprite.spriteFrame = n.default.instance.getCommonSprite("sound2"), 
                i.default.instance.SwitchSound()) : i.default.instance.PlayBGM();
            }, t.prototype.switchSound = function() {
                i.default.instance.soundOpen ? (this.curSprite.spriteFrame = n.default.instance.getCommonSprite("sound2"), 
                i.default.instance.SwitchSound(), r.default.instance.setLocal(this.keyName, o.SettingStatus.Off)) : (this.curSprite.spriteFrame = n.default.instance.getCommonSprite("sound1"), 
                i.default.instance.SwitchSound(), r.default.instance.setLocal(this.keyName, o.SettingStatus.On));
            }, __decorate([ u(cc.Sprite) ], t.prototype, "curSprite", void 0), __decorate([ u(cc.Node) ], t.prototype, "curNode", void 0), 
            t = __decorate([ c ], t);
        }(cc.Component);
        a.default = d, cc._RF.pop();
    }, {
        "../../audio_manager": "audio_manager",
        "../../common/allenum": "allenum",
        "../../common/emmiter": "emmiter",
        "../../manager/resource_manager": "resource_manager",
        "../../manager/wx_manager": "wx_manager"
    } ],
    sprite_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "41e5cmS9K9PHpZ0UM6AG2J2", "sprite_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/data_manager"), i = e("../../controller/ui/cost_items"), r = e("../../manager/sprite_manager"), o = e("../sprite_ui_manager"), s = e("../../manager/resource_manager"), l = e("../../network/sprite_network"), c = e("../../manager/ui_manager"), u = cc._decorator, d = u.ccclass, p = u.property, m = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.btnBattle = null, t.btnRest = null, t.btnLvUp = null, t.btnDrop = null, 
                t.spriteIcon = null, t.labelTitle = null, t.labelDesc = null, t.labelDescAbility = null, 
                t.costItems = null, t.curCallBack = null, t.curID = 0, t;
            }
            return __extends(t, e), t.prototype.onLoad = function() {
                this.btnBattle.node.on("click", this.onBattle, this), this.btnRest.node.on("click", this.onRest, this), 
                this.btnLvUp.node.on("click", this.onLVUp, this), this.btnDrop.node.on("click", this.onDrop, this);
            }, t.prototype.initItem = function(e, t) {
                this.curID = e;
                var a = r.default.instance.spritesMap[e], i = n.default.instance.spriteData[a.baseID];
                null != i ? (this.labelTitle.string = i.name + " - LV" + r.default.instance.spritesMap[e].lv, 
                this.labelDesc.string = i.desc, this.labelDescAbility.string = a.getAbilityDesc(), 
                a.isBattling() ? (this.btnBattle.node.active = !1, this.btnRest.node.active = !0) : (this.btnBattle.node.active = !0, 
                this.btnRest.node.active = !1), this.spriteIcon.spriteFrame = s.default.instance.getSpriteSprite(i.icon_path), 
                null != this.costItems && this.costItems.initByCostData(a.getLvUpCost())) : console.log("no this index data:" + e.toString());
            }, t.prototype.onBattle = function() {
                r.default.instance.goBattle(this.curID), o.default.instance.refreshUI();
            }, t.prototype.onRest = function() {
                r.default.instance.goRest(this.curID), o.default.instance.refreshUI();
            }, t.prototype.onLVUp = function() {
                r.default.instance.spriteLevelUp(this.curID);
            }, t.prototype.onDrop = function() {
                c.default.instance.LoadMessageBox("放生这个精灵？", "是否确认放生？", this.dropSprite, null, this.curID);
            }, t.prototype.dropSprite = function(e, t) {
                e && (r.default.instance.removeSprite(t), l.default.instance.PlayerSpriteRemoveRequest(t), 
                o.default.instance.reOrderSprite(), o.default.instance.refreshUI());
            }, __decorate([ p(cc.Button) ], t.prototype, "btnBattle", void 0), __decorate([ p(cc.Button) ], t.prototype, "btnRest", void 0), 
            __decorate([ p(cc.Button) ], t.prototype, "btnLvUp", void 0), __decorate([ p(cc.Button) ], t.prototype, "btnDrop", void 0), 
            __decorate([ p(cc.Sprite) ], t.prototype, "spriteIcon", void 0), __decorate([ p(cc.Label) ], t.prototype, "labelTitle", void 0), 
            __decorate([ p(cc.Label) ], t.prototype, "labelDesc", void 0), __decorate([ p(cc.Label) ], t.prototype, "labelDescAbility", void 0), 
            __decorate([ p(i.default) ], t.prototype, "costItems", void 0), t = __decorate([ d ], t);
        }(cc.Component);
        a.default = m, cc._RF.pop();
    }, {
        "../../controller/ui/cost_items": "cost_items",
        "../../manager/data_manager": "data_manager",
        "../../manager/resource_manager": "resource_manager",
        "../../manager/sprite_manager": "sprite_manager",
        "../../manager/ui_manager": "ui_manager",
        "../../network/sprite_network": "sprite_network",
        "../sprite_ui_manager": "sprite_ui_manager"
    } ],
    sprite_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "7dacebHb/tH9qUGtzyFhF6u", "sprite_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./data_manager"), i = e("../math/rand"), r = e("./cost_manager"), o = e("../battle/battle_manager"), s = e("./playerbuff_manager"), l = e("../common/emmiter"), c = e("../common/allenum"), u = e("../network/sprite_network"), d = e("../ui/sprite_ui_manager"), p = e("./help_manager"), m = e("./ui_manager"), f = function() {
            function e() {
                this.index = 0, this.baseID = 0, this.lv = 1, this.lastLV = 0, this.status = 0;
            }
            return e.prototype.getAbilityDesc = function() {
                var e = "", t = n.default.instance.spriteData[this.baseID];
                if (null != t) {
                    var a = {};
                    for (var i in t.base_attr) null == a[i] ? a[i] = t.base_attr[i] : a[i] += t.base_attr[i];
                    for (var i in t.lv_add_attr) null == a[i] ? a[i] = t.lv_add_attr[i] * (this.lv - 1) : a[i] += t.lv_add_attr[i] * (this.lv - 1);
                    for (var i in a) e += p.default.instance.getAttrShowStr(i, a[i]) + "\n";
                }
                return e;
            }, e.prototype.goBattle = function() {
                this.status = 1;
            }, e.prototype.goRest = function() {
                this.status = 0;
            }, e.prototype.isBattling = function() {
                return 1 == this.status;
            }, e.prototype.getBuffValue = function(e) {
                if (0 == this.status) return 0;
                var t = n.default.instance.spriteData[this.baseID], a = 0;
                if (null != t) {
                    for (var i in t.base_attr) i == e && (a += t.base_attr[i]);
                    for (var i in t.lv_add_attr) i == e && (a += t.lv_add_attr[i] * (this.lv - 1));
                }
                return a;
            }, Object.defineProperty(e.prototype, "sortValue", {
                get: function() {
                    var e = 0;
                    return this.isBattling() && (e += 1e6), e += 100 * this.lv, -(e += this.baseID);
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.getLvUpCost = function() {
                var e = n.default.instance.spriteData[this.baseID].lv_up_cost, t = {};
                for (var a in e) t[a] = Math.floor(e[a] * (this.lv + 1) * (this.lv + 1) / 15);
                return t;
            }, e.prototype.lvUp = function() {
                this.lastLV = this.lv, this.lv++;
            }, e;
        }();
        a.SpriteData = f;
        var g = function() {
            function e() {
                this.maxCount = 50, this._maxBattleCount = 1, this.spritesMap = {};
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "maxBattleCount", {
                get: function() {
                    return this._maxBattleCount + s.default.instance.getBuffValue("精灵出战");
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.addSpriteByServer = function(e, t, a) {
                if (void 0 === a && (a = 1), !this.isFullSpriteBag()) {
                    var n = new f();
                    return n.index = e, n.baseID = t, n.lv = a, this.spritesMap[e] = n, l.Emitter.fire(c.AlertType.SpriteAlert.toString()), 
                    !0;
                }
                return !1;
            }, e.prototype.addSprite = function(e) {
                return !this.isFullSpriteBag() && (u.default.instance.PlayerAddSprite(e), !0);
            }, e.prototype.removeSprite = function(e) {
                delete this.spritesMap[e], o.default.instance.updateSpriteShow(), l.Emitter.fire(c.AlertType.SpriteAlert.toString());
            }, Object.defineProperty(e.prototype, "curCount", {
                get: function() {
                    var e = 0;
                    for (var t in this.spritesMap) e++;
                    return e;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.isFullSpriteBag = function() {
                return this.curCount >= this.maxCount;
            }, e.prototype.addNewRandomSprite = function() {
                var e = this.getRandomSpriteByQuality(1);
                return u.default.instance.PlayerAddSprite(e), e;
            }, e.prototype.getBagCount = function() {
                return this.curCount;
            }, e.prototype.getBattleCount = function() {
                var e = 0;
                for (var t in this.spritesMap) this.spritesMap[t].isBattling() && (e += 1);
                return e;
            }, e.prototype.isFullBattle = function() {
                var e = 0, t = 0;
                for (var a in this.spritesMap) this.spritesMap[a].isBattling() ? e++ : t++;
                return e >= this.maxBattleCount || 0 == t;
            }, e.prototype.goBattle = function(e) {
                var t = 0;
                for (var a in this.spritesMap) this.spritesMap[a].isBattling() && (t += 1);
                t >= this.maxBattleCount ? m.default.instance.LoadTipsByID("sprite_battle_full_limit") : (null != this.spritesMap[e] && this.spritesMap[e].goBattle(), 
                o.default.instance.updateSpriteShow(), u.default.instance.PlayerUseSpriteRequest(e, !0), 
                l.Emitter.fire(c.AlertType.SpriteAlert.toString()));
            }, e.prototype.goBattleByServer = function(e) {
                if (this.spritesMap[e]) {
                    var t = 0;
                    for (var a in this.spritesMap) this.spritesMap[a].isBattling() && (t += 1);
                    if (t >= this.maxBattleCount) return void m.default.instance.LoadTipsByID("sprite_battle_full_limit");
                    this.spritesMap[e].goBattle(), o.default.instance.updateSpriteShow(), l.Emitter.fire(c.AlertType.SpriteAlert.toString());
                }
            }, e.prototype.goRest = function(e) {
                null != this.spritesMap[e] && (this.spritesMap[e].goRest(), o.default.instance.updateSpriteShow(), 
                u.default.instance.PlayerUseSpriteRequest(e, !1), l.Emitter.fire(c.AlertType.SpriteAlert.toString()));
            }, e.prototype.spriteLevelUp = function(e) {
                if (null != this.spritesMap[e]) if (this.spritesMap[e].lv != this.spritesMap[e].lastLV) {
                    var t = n.default.instance.spriteData[this.spritesMap[e].baseID];
                    if (this.spritesMap[e].lv >= t.max_lv) return m.default.instance.LoadTipsByID("sprite_lv_limit"), 
                    !1;
                    var a = this.spritesMap[e].getLvUpCost();
                    r.default.instance.isEnough(a) && u.default.instance.PlayerSpriteLevelUpRequest(e);
                } else console.log("=============精灵上一级和本级相同");
            }, e.prototype.spriteLevelUpByServer = function(e, t) {
                null != this.spritesMap[e] && (this.spritesMap[e].lv = t, d.default.instance.refreshUI());
            }, e.prototype.getRandomSpriteByQuality = function(e) {
                var t, a = new Array();
                for (t in n.default.instance.spriteData) n.default.instance.spriteData[t].quality == e && a.push(t);
                return a.length > 0 ? a[i.default.getRandomNum(0, a.length - 1)] : 0;
            }, e.prototype.getBuffValue = function(e) {
                var t = 0;
                for (var a in this.spritesMap) this.spritesMap[a].isBattling() && (t += this.spritesMap[a].getBuffValue(e));
                return t;
            }, e._instance = null, e;
        }();
        a.default = g, cc._RF.pop();
    }, {
        "../battle/battle_manager": "battle_manager",
        "../common/allenum": "allenum",
        "../common/emmiter": "emmiter",
        "../math/rand": "rand",
        "../network/sprite_network": "sprite_network",
        "../ui/sprite_ui_manager": "sprite_ui_manager",
        "./cost_manager": "cost_manager",
        "./data_manager": "data_manager",
        "./help_manager": "help_manager",
        "./playerbuff_manager": "playerbuff_manager",
        "./ui_manager": "ui_manager"
    } ],
    sprite_network: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "67a04CiyS5FdKOGDqTz4jCX", "sprite_network"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../common/emmiter"), i = e("../manager/network_manager"), r = e("../common/message"), o = e("../manager/sprite_manager"), s = e("../manager/game_manager"), l = e("../ui/sign_ui_manager"), c = e("../manager/data_manager"), u = e("../common/allenum"), d = e("../ui/blackmarket_ui_manager"), p = function() {
            function e() {}
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.init = function() {
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerSpriteAddResponse, r.MessageType.GamePlay), this.PlayerSpriteAddResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.GetPlayerSpriteResponse, r.MessageType.GamePlay), this.GetPlayerSpriteResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerSpriteRemoveResponse, r.MessageType.GamePlay), this.PlayerSpriteRemoveResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerUseSpriteResponse, r.MessageType.GamePlay), this.PlayerUseSpriteResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerSpriteLevelUpResponse, r.MessageType.GamePlay), this.PlayerSpriteLevelUpResponse, this), 
                n.Emitter.register(i.NetworkManager.GetEventID(r.MessageNo.PlayerSyncSpriteResponse, r.MessageType.GamePlay), this.PlayerSyncSpriteResponse, this);
            }, e.prototype.PlayerAddSprite = function(e) {
                var t = {
                    ID: Number(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerSpriteAddRequest, r.MessageType.GamePlay, t);
            }, e.prototype.PlayerSpriteAddResponse = function(e, t) {
                o.default.instance.addSpriteByServer(t.Index, t.BaseID), l.default.instance.playGetBonusAnim(c.default.instance.spriteData[t.BaseID].icon_path);
            }, e.prototype.GetPlayerSpriteRequest = function() {
                i.NetworkManager.SendMessage(r.MessageNo.GetPlayerSpriteRequest, r.MessageType.GamePlay, {});
            }, e.prototype.GetPlayerSpriteResponse = function(e, t) {
                for (var a in t) o.default.instance.addSpriteByServer(Number(a), t[a].ID, t[a].Lv), 
                t[a].IsUp && o.default.instance.goBattleByServer(Number(a));
                s.default.instance.CheckedOneInit();
            }, e.prototype.PlayerSpriteRemoveRequest = function(e) {
                var t = {
                    Index: Number(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerSpriteRemoveRequest, r.MessageType.GamePlay, t);
            }, e.prototype.PlayerSpriteRemoveResponse = function(e, t) {
                console.log("----------\x3e PlayerSpriteRemoveResponse:" + JSON.stringify(t));
            }, e.prototype.PlayerUseSpriteRequest = function(e, t) {
                var a = {
                    Index: Number(e),
                    IsUp: t
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerUseSpriteRequest, r.MessageType.GamePlay, a);
            }, e.prototype.PlayerUseSpriteResponse = function(e, t) {
                console.log("----------\x3e PlayerUseSpriteResponse:" + JSON.stringify(t));
            }, e.prototype.PlayerSpriteLevelUpRequest = function(e) {
                var t = {
                    Index: Number(e)
                };
                i.NetworkManager.SendMessage(r.MessageNo.PlayerSpriteLevelUpRequest, r.MessageType.GamePlay, t);
            }, e.prototype.PlayerSpriteLevelUpResponse = function(e, t) {
                t.IsOk && o.default.instance.spriteLevelUpByServer(t.Index, t.Lv);
            }, e.prototype.PlayerSyncSpriteResponse = function(e, t) {
                t.ActionType == u.SpriteActionType.BuyBlackMarket && d.default.instance && d.default.instance.bugSpriteOrEquipSuccess(!0), 
                o.default.instance.addSpriteByServer(t.Index, t.BaseID);
            }, e._instance = null, e;
        }();
        a.default = p, cc._RF.pop();
    }, {
        "../common/allenum": "allenum",
        "../common/emmiter": "emmiter",
        "../common/message": "message",
        "../manager/data_manager": "data_manager",
        "../manager/game_manager": "game_manager",
        "../manager/network_manager": "network_manager",
        "../manager/sprite_manager": "sprite_manager",
        "../ui/blackmarket_ui_manager": "blackmarket_ui_manager",
        "../ui/sign_ui_manager": "sign_ui_manager"
    } ],
    sprite_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "7a755ayIHlLWpD4UfLp7nBG", "sprite_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../util"), i = e("../manager/pool_manager"), r = e("../manager/sprite_manager"), o = e("./item/sprite_item"), s = e("../audio_manager"), l = e("../manager/ui_manager"), c = cc._decorator, u = c.ccclass, d = c.property, p = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.maskNode = null, t.contentNode = null, t.labelBattleStatus = null, 
                t.labelBagStatus = null, t.curPage = 1, t.pageNum = 4, t.btnLast = null, t.btnNext = null, 
                t.orderArray = [], t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideUI, this), this.btnLast.node.on("click", this.lastPage, this), 
                this.btnNext.node.on("click", this.nextPage, this), this.uiNode.active && (this.uiNode.active = !1);
            }, t.prototype.showUI = function() {
                s.default.instance.PlayUISelect(), this.uiNode.active = !0, this.reOrderSprite(), 
                this.refreshUI();
            }, t.prototype.reOrderSprite = function() {
                var e = r.default.instance.spritesMap;
                for (var t in this.orderArray.splice(0, this.orderArray.length), e) null != e[t] && this.orderArray.push(e[t]);
                this.orderArray = n.default.orderby(this.orderArray, function(e) {
                    return e.sortValue;
                });
            }, t.prototype.refreshUI = function() {
                for (var e = this.contentNode.children, t = e.length - 1; t >= 0; t--) i.default.instance.RemoveObjectByName("SpriteItem", e[t]);
                for (var a = 1 + (this.curPage - 1) * this.pageNum, n = a + this.pageNum, s = 1, l = 0, c = this.orderArray; l < c.length; l++) {
                    var u = c[l];
                    if (s >= a && s < n) i.default.instance.CreateObjectByName("SpriteItem", this.contentNode).getComponent(o.default).initItem(u.index, this.itemCallBack);
                    if (s >= n) break;
                    s++;
                }
                this.labelBattleStatus.string = r.default.instance.getBattleCount().toString() + " / " + r.default.instance.maxBattleCount.toString(), 
                this.labelBagStatus.string = r.default.instance.getBagCount().toString() + " / " + r.default.instance.maxCount.toString();
            }, t.prototype.lastPage = function() {
                this.curPage <= 1 ? l.default.instance.LoadTipsByStr("没有更多记录") : (this.curPage--, 
                this.refreshUI());
            }, t.prototype.nextPage = function() {
                var e = Math.floor((r.default.instance.getBagCount() - 1) / 4) + 1;
                this.curPage >= e ? l.default.instance.LoadTipsByStr("没有更多记录") : (this.curPage++, 
                this.refreshUI());
            }, t.prototype.hideUI = function() {
                this.uiNode.active = !1;
            }, t.prototype.itemCallBack = function(e) {}, t.instance = null, __decorate([ d(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ d(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ d(cc.Node) ], t.prototype, "contentNode", void 0), 
            __decorate([ d(cc.Label) ], t.prototype, "labelBattleStatus", void 0), __decorate([ d(cc.Label) ], t.prototype, "labelBagStatus", void 0), 
            __decorate([ d(cc.Button) ], t.prototype, "btnLast", void 0), __decorate([ d(cc.Button) ], t.prototype, "btnNext", void 0), 
            t = a = __decorate([ u ], t);
        }(cc.Component);
        a.default = p, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../manager/pool_manager": "pool_manager",
        "../manager/sprite_manager": "sprite_manager",
        "../manager/ui_manager": "ui_manager",
        "../util": "util",
        "./item/sprite_item": "sprite_item"
    } ],
    store_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "e26dewEtpVDhpDp1U8bAQ9Z", "store_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../manager/data_manager"), i = e("../../controller/ui/cost_items"), r = e("../../manager/blackmarket_manager"), o = e("../../manager/skill_manager"), s = e("../../manager/resource_manager"), l = cc._decorator, c = l.ccclass, u = l.property, d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.button = null, t.spriteIcon = null, t.labelTitle = null, t.labelDesc = null, 
                t.labelBtnName = null, t.curCallBack = null, t.curID = 0, t.costItems = null, t;
            }
            return __extends(t, e), t.prototype.onLoad = function() {
                this.button.node.on("click", this.btnclick, this);
            }, t.prototype.initItem = function(e, t) {
                this.labelBtnName.string = "祈祷";
                var a = n.default.instance.atlarData[e];
                null != a ? (this.labelTitle.string = a.name + " - LV" + a.bufflv, this.labelDesc.string = a.desc, 
                this.curCallBack = t, this.curID = e, this.spriteIcon.spriteFrame = s.default.instance.getAtlarSprite(a.icon_path), 
                null != this.costItems && this.costItems.initByCostData(a.price)) : console.log("no this data:" + e.toString());
            }, t.prototype.initBlackMarketSpriteItem = function(e, t) {
                this.labelBtnName.string = "购买", this.curCallBack = t, this.curID = e;
                this.labelTitle.string = "未知的精灵蛋", this.labelDesc.string = "购买后将随机出现各色各样的精灵？", this.spriteIcon.spriteFrame = s.default.instance.getCommonSprite("egg"), 
                null != this.costItems && this.costItems.initByCostData(r.default.instance.sprite_cost);
            }, t.prototype.initBlackMarketItem = function(e, t) {
                this.labelBtnName.string = "购买";
                var a = r.default.instance.goods[e].baseId, i = n.default.instance.equipmentData[a];
                null != i ? (this.labelTitle.string = i.name + " - (未鉴定)", this.labelDesc.string = i.desc + " - 蓝色品质以上", 
                this.curCallBack = t, this.curID = e, this.spriteIcon.spriteFrame = s.default.instance.getEquipSprite(i.icon_path), 
                null != this.costItems && this.costItems.initByCostData(r.default.instance.curPrice)) : console.log("no this data:" + e.toString());
            }, t.prototype.initSkillSelectItem = function(e, t) {
                var a = o.default.instance.getSkillByIndex(e);
                if (a) {
                    var i = n.default.instance.skillData[a.baseID];
                    this.labelTitle.string = i.name, this.labelTitle.string = this.labelTitle.string + " Lv:" + (a.lv + 1).toString(), 
                    this.labelDesc.string = a.getDesc(), this.curCallBack = t, this.curID = e, this.spriteIcon.spriteFrame = s.default.instance.getSkillSprite(i.icon_path), 
                    this.costItems.node.active = !1, a.isUsing() ? this.labelBtnName.string = "使用中" : this.labelBtnName.string = "使用";
                } else console.log("no this  skillIndex data:" + e.toString());
            }, t.prototype.initSkillLearnItem = function(e, t) {
                this.labelBtnName.string = "学习", this.button.node.active = !0;
                var a = n.default.instance.skillData[e];
                if (a) {
                    this.labelTitle.string = a.name;
                    var i = o.default.instance.getSkillInfoByBaseID(e);
                    i ? (i.canLvUp() ? this.labelTitle.string = this.labelTitle.string + " Lv:" + (i.lv + 1).toString() : (this.labelTitle.string = this.labelTitle.string + " (已最高)", 
                    this.button.node.active = !1), this.labelDesc.string = i.getDesc()) : (this.labelTitle.string = this.labelTitle.string + " Lv:1 (未学习)", 
                    this.labelDesc.string = a.desc), this.curCallBack = t, this.curID = e, this.spriteIcon.spriteFrame = s.default.instance.getSkillSprite(a.icon_path), 
                    null != this.costItems && (i ? this.costItems.initByCostData(a.lvup_cost) : this.costItems.initByCostData(a.learn_cost));
                } else console.log("no this skill data:" + e.toString());
            }, t.prototype.btnclick = function() {
                this.curCallBack(this.curID);
            }, __decorate([ u(cc.Button) ], t.prototype, "button", void 0), __decorate([ u(cc.Sprite) ], t.prototype, "spriteIcon", void 0), 
            __decorate([ u(cc.Label) ], t.prototype, "labelTitle", void 0), __decorate([ u(cc.Label) ], t.prototype, "labelDesc", void 0), 
            __decorate([ u(cc.Label) ], t.prototype, "labelBtnName", void 0), __decorate([ u(i.default) ], t.prototype, "costItems", void 0), 
            t = __decorate([ c ], t);
        }(cc.Component);
        a.default = d, cc._RF.pop();
    }, {
        "../../controller/ui/cost_items": "cost_items",
        "../../manager/blackmarket_manager": "blackmarket_manager",
        "../../manager/data_manager": "data_manager",
        "../../manager/resource_manager": "resource_manager",
        "../../manager/skill_manager": "skill_manager"
    } ],
    store_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "c2a446vcZ5AW4iziRlcDeLW", "store_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/data_manager"), i = e("../util"), r = e("../manager/pool_manager"), o = e("./item/store_item"), s = e("../manager/cost_manager"), l = e("../manager/dynamic_data_manager"), c = e("../audio_manager"), u = e("../network/player_network"), d = cc._decorator, p = d.ccclass, m = d.property, f = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.maskNode = null, t.contentNode = null, t.curAltars = null, 
                t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideUI, this), this.uiNode.active && (this.uiNode.active = !1);
            }, t.prototype.showUI = function() {
                c.default.instance.PlayUISelect(), this.uiNode.active = !0, this.curAltars = l.default.instance.getCanLearnAltar(), 
                this.refreshUI();
            }, t.prototype.refreshUI = function() {
                for (var e = this.contentNode.children, t = e.length - 1; t >= 0; t--) r.default.instance.RemoveObjectByName("StoreItem", e[t]);
                for (var a in this.curAltars) if (null != this.curAltars[a]) {
                    var i = r.default.instance.CreateObjectByName("StoreItem", this.contentNode), s = n.default.instance.atlarData[this.curAltars[a]];
                    i.getComponent(o.default).initItem(s.id, this.itemCallBack);
                }
            }, t.prototype.hideUI = function() {
                this.uiNode.active = !1;
            }, t.prototype.removeAltarID = function(e) {
                i.default.Remove(this.curAltars, e);
            }, t.prototype.itemCallBack = function(e) {
                var t = n.default.instance.atlarData[e].price;
                s.default.instance.cost(t) && (l.default.instance.AddAltar(e), a.instance.removeAltarID(e), 
                a.instance.refreshUI(), u.default.instance.UpdatePlayerBaseData());
            }, t.instance = null, __decorate([ m(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ m(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ m(cc.Node) ], t.prototype, "contentNode", void 0), 
            t = a = __decorate([ p ], t);
        }(cc.Component);
        a.default = f, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../manager/cost_manager": "cost_manager",
        "../manager/data_manager": "data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/pool_manager": "pool_manager",
        "../network/player_network": "player_network",
        "../util": "util",
        "./item/store_item": "store_item"
    } ],
    strengthen_tip_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "86e7a5nedVO1ps2QRW1jBFA", "strengthen_tip_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/data_manager"), i = e("../manager/pool_manager"), r = e("../manager/dynamic_data_manager"), o = e("../util"), s = e("../controller/ui/cost_items"), l = e("../manager/cost_manager"), c = e("../manager/resource_manager"), u = e("../manager/help_manager"), d = e("../audio_manager"), p = e("../network/bag_network"), m = cc._decorator, f = m.ccclass, g = m.property, h = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.uiNode = null, t.maskNode = null, t.nodeAttrs = null, t.labelName = null, 
                t.labelDesc = null, t.spriteIcon = null, t.spriteQualityGrid = null, t.costItems = null, 
                t.btnStrengthen = null, t.curBagItemData = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideBagUI, this), this.btnStrengthen.node.on("click", this.strengthen, this), 
                this.uiNode.active && (this.uiNode.active = !1);
            }, t.prototype.hideBagUI = function() {
                this.uiNode.active = !1;
            }, t.prototype.initItemTipContent = function() {
                d.default.instance.PlayUISelect();
                var e = this.curBagItemData.canStrength(), t = n.default.instance.equipmentData[this.curBagItemData.baseId];
                this.labelName.string = this.curBagItemData.getName(), this.labelName.node.color = this.curBagItemData.getNameColor(), 
                this.labelDesc.string = t.desc, this.spriteIcon.spriteFrame = c.default.instance.getEquipSprite(t.icon_path), 
                this.spriteQualityGrid.spriteFrame = c.default.instance.getEquipSprite(this.curBagItemData.getQualitySpriteName());
                for (var a = this.nodeAttrs.children, r = a.length - 1; r >= 0; r--) i.default.instance.RemoveLabel(a[r]);
                var s = this.curBagItemData.getBaseAttr();
                for (var l in s) {
                    var p = i.default.instance.CreateLabel(this.nodeAttrs);
                    t.lv_attr[l] && e ? p.getComponent(cc.Label).string = u.default.instance.getAttrShowStr(l, s[l]) + "  下级:+" + u.default.instance.getAttrShowValueStr(l, t.lv_attr[l]) : p.getComponent(cc.Label).string = u.default.instance.getAttrShowStr(l, s[l]), 
                    p.color = cc.Color.WHITE;
                }
                if (o.default.len(this.curBagItemData.additionAttr) > 0) for (var m in this.curBagItemData.additionAttr) {
                    var f = n.default.instance.equipPrefixData[m];
                    (p = i.default.instance.CreateLabel(this.nodeAttrs)).getComponent(cc.Label).string = u.default.instance.getAttrShowStr(f.attrtype, this.curBagItemData.additionAttr[m]), 
                    p.color = cc.Color.GREEN;
                }
                if (e) {
                    this.costItems.node.active = !0;
                    var g = this.curBagItemData.getStrengthenCost();
                    this.costItems.initByCostData(g);
                } else this.costItems.node.active = !1;
                this.btnStrengthen.node.active = e;
            }, t.prototype.showItemTip = function(e) {
                this.curBagItemData = e, this.uiNode.active = !0, this.initItemTipContent();
            }, t.prototype.strengthen = function() {
                if (this.curBagItemData.canStrength()) {
                    var e = this.curBagItemData.getStrengthenCost();
                    l.default.instance.cost(e) && (0 != r.default.instance.IsEquiping(this.curBagItemData) ? p.default.instance.StengthItemRequest(this.curBagItemData.index, 2) : p.default.instance.StengthItemRequest(this.curBagItemData.index, 1));
                } else console.log("等级已经达到最高，不能强化了");
            }, t.prototype.strengthenSuccess = function() {
                0 == r.default.instance.IsEquiping(this.curBagItemData) ? (this.curBagItemData.strength(), 
                this.initItemTipContent()) : 1 == r.default.instance.IsEquiping(this.curBagItemData) ? (r.default.instance.removeEquipAttrToPlayer(this.curBagItemData), 
                this.curBagItemData.strength(), this.initItemTipContent(), r.default.instance.addEquipAttrToPlayer(this.curBagItemData)) : 2 == r.default.instance.IsEquiping(this.curBagItemData) && (this.curBagItemData.strength(), 
                this.initItemTipContent());
            }, t.instance = null, __decorate([ g(cc.Node) ], t.prototype, "uiNode", void 0), 
            __decorate([ g(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ g(cc.Node) ], t.prototype, "nodeAttrs", void 0), 
            __decorate([ g(cc.Label) ], t.prototype, "labelName", void 0), __decorate([ g(cc.Label) ], t.prototype, "labelDesc", void 0), 
            __decorate([ g(cc.Sprite) ], t.prototype, "spriteIcon", void 0), __decorate([ g(cc.Sprite) ], t.prototype, "spriteQualityGrid", void 0), 
            __decorate([ g(s.default) ], t.prototype, "costItems", void 0), __decorate([ g(cc.Button) ], t.prototype, "btnStrengthen", void 0), 
            t = a = __decorate([ f ], t);
        }(cc.Component);
        a.default = h, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../controller/ui/cost_items": "cost_items",
        "../manager/cost_manager": "cost_manager",
        "../manager/data_manager": "data_manager",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/help_manager": "help_manager",
        "../manager/pool_manager": "pool_manager",
        "../manager/resource_manager": "resource_manager",
        "../network/bag_network": "bag_network",
        "../util": "util"
    } ],
    strengthen_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "7c63b2FXulJyo8uAYiGx5e7", "strengthen_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/dynamic_data_manager"), i = e("../manager/pool_manager"), r = e("./item/bag_item"), o = e("../common/allenum"), s = e("../audio_manager"), l = cc._decorator, c = l.ccclass, u = l.property, d = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.bagUINode = null, t.maskNode = null, t.bagContentViewNode = null, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this, this.maskNode.on("click", this.hideBagUI, this), this.bagUINode.active && (this.bagUINode.active = !1);
            }, t.prototype.showUI = function() {
                s.default.instance.PlayUISelect(), this.bagUINode.active = !0, this.refreshBagUI();
            }, t.prototype.refreshBagUI = function() {
                for (var e = this.bagContentViewNode.children, t = e.length - 1; t >= 0; t--) i.default.instance.RemoveBagItem(e[t]);
                if (null != n.default.instance.EquipItemAllDatas) for (var a in n.default.instance.EquipItemAllDatas) if (null != a) for (var s in n.default.instance.EquipItemAllDatas[a]) {
                    var l = i.default.instance.CreateBagItem(this.bagContentViewNode).getComponent(r.default);
                    l.reinit(n.default.instance.EquipItemAllDatas[a][s], o.GridType.StrengthenItem), 
                    l.setEquipingTag(Number(a) + 1);
                }
                if (null != n.default.instance.BagItemDataMap) for (var c in n.default.instance.BagItemDataMap) {
                    i.default.instance.CreateBagItem(this.bagContentViewNode).getComponent(r.default).reinit(n.default.instance.BagItemDataMap[c], o.GridType.StrengthenItem);
                }
            }, t.prototype.showRefreshTip = function(e) {}, t.prototype.hideBagUI = function() {
                this.bagUINode.active = !1;
            }, t.instance = null, __decorate([ u(cc.Node) ], t.prototype, "bagUINode", void 0), 
            __decorate([ u(cc.Node) ], t.prototype, "maskNode", void 0), __decorate([ u(cc.Node) ], t.prototype, "bagContentViewNode", void 0), 
            t = a = __decorate([ c ], t);
        }(cc.Component);
        a.default = d, cc._RF.pop();
    }, {
        "../audio_manager": "audio_manager",
        "../common/allenum": "allenum",
        "../manager/dynamic_data_manager": "dynamic_data_manager",
        "../manager/pool_manager": "pool_manager",
        "./item/bag_item": "bag_item"
    } ],
    tips_ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "ae0f1g2U1pHKry57zTmhpcy", "tips_ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/data_manager"), i = cc._decorator, r = i.ccclass, o = i.property, s = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelDesc = null, t.contentNode = null, t.labelDesc2 = null, t.contentNode2 = null, 
                t.labelDesc3 = null, t.contentNode3 = null, t.curShowIndex = 1, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.onLoad = function() {
                a.instance = this;
            }, t.prototype.showtips = function(e) {
                console.log("showtips:" + e);
                var t = n.default.instance.tipsData[e];
                null != t && (console.log("showtips:" + t.desc), this.showTipByIndex(t.desc));
            }, t.prototype.showTipsByStr = function(e) {
                this.showTipByIndex(e);
            }, t.prototype.showTipByIndex = function(e) {
                1 == this.curShowIndex ? (this.labelDesc.string = e, this.contentNode.getComponent(cc.Animation).play("fade_out")) : 2 == this.curShowIndex ? (this.labelDesc2.string = e, 
                this.contentNode2.getComponent(cc.Animation).play("fade_out")) : 3 == this.curShowIndex && (this.labelDesc3.string = e, 
                this.contentNode3.getComponent(cc.Animation).play("fade_out")), this.curShowIndex++, 
                this.curShowIndex > 3 && (this.curShowIndex = 1);
            }, t.instance = null, __decorate([ o(cc.Label) ], t.prototype, "labelDesc", void 0), 
            __decorate([ o(cc.Node) ], t.prototype, "contentNode", void 0), __decorate([ o(cc.Label) ], t.prototype, "labelDesc2", void 0), 
            __decorate([ o(cc.Node) ], t.prototype, "contentNode2", void 0), __decorate([ o(cc.Label) ], t.prototype, "labelDesc3", void 0), 
            __decorate([ o(cc.Node) ], t.prototype, "contentNode3", void 0), t = a = __decorate([ r ], t);
        }(cc.Component);
        a.default = s, cc._RF.pop();
    }, {
        "../manager/data_manager": "data_manager"
    } ],
    title_item: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "4a115Jf2pRAhLWzNQ6/tckI", "title_item"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../../network/achievement_network"), i = e("../../manager/achievenment_manager"), r = cc._decorator, o = r.ccclass, s = r.property, l = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelDesc = null, t.labelAttrDesc = null, t.btnGetReward = null, t.curTypeID = 0, 
                t;
            }
            return __extends(t, e), t.prototype.onLoad = function() {
                this.btnGetReward.node.on("click", this.btnClick, this);
            }, t.prototype.Init = function(e, t, a, n) {
                this.curTypeID = e, this.labelDesc.string = t + "   LV " + n, this.labelAttrDesc.string = a, 
                this.curTypeID == i.default.instance.curTitleType ? this.btnGetReward.interactable = !1 : this.btnGetReward.interactable = !0;
            }, t.prototype.btnClick = function() {
                n.default.instance.PlayerUseTitleRequest(this.curTypeID);
            }, __decorate([ s(cc.Label) ], t.prototype, "labelDesc", void 0), __decorate([ s(cc.Label) ], t.prototype, "labelAttrDesc", void 0), 
            __decorate([ s(cc.Button) ], t.prototype, "btnGetReward", void 0), t = __decorate([ o ], t);
        }(cc.Component);
        a.default = l, cc._RF.pop();
    }, {
        "../../manager/achievenment_manager": "achievenment_manager",
        "../../network/achievement_network": "achievement_network"
    } ],
    today_reward_ui: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "be86cX/l9JDEZmO71QA2fPC", "today_reward_ui"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../manager/reward_manager"), i = e("../manager/resource_manager"), r = e("../manager/reward_effect_manager"), o = e("../manager/data_manager"), s = e("../util"), l = e("../manager/ui_manager"), c = cc._decorator, u = c.ccclass, d = c.property, p = function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.labelLeftTime = null, t.labelRewardNum = null, t.nodeCanGet = null, t.spriteBg = null, 
                t.btnGetReward = null, t.isStatusChange = !1, t.lastStatus = 2, t;
            }
            var a;
            return __extends(t, e), a = t, t.prototype.start = function() {
                a.instance = this, this.btnGetReward.node.on("click", this.getReward, this);
            }, t.prototype.getRewardShow = function(e) {
                var t = n.default.instance.curRewardType, a = n.default.instance.curRewardID;
                if (0 != e) if (1 == t) r.default.instance.createDaimondEffect(10, "金币", this.node.parent.convertToWorldSpaceAR(this.node.position)); else if (2 == t) r.default.instance.createDaimondEffect(10, "钻石", this.node.parent.convertToWorldSpaceAR(this.node.position)); else if (3 == t) {
                    var i = o.default.instance.spriteData[e].icon_path;
                    r.default.instance.createDaimondEffect(1, "精灵", this.node.parent.convertToWorldSpaceAR(this.node.position), i), 
                    l.default.instance.LoadTipsByStr("获得:" + o.default.instance.spriteData[e].name);
                } else if (4 == t) if (0 != a) {
                    var s = o.default.instance.onlineRewardData[a].param;
                    for (var c in s) {
                        var u = s[c];
                        i = o.default.instance.equipmentData[u].icon_path;
                        r.default.instance.createDaimondEffect(1, "装备", this.node.parent.convertToWorldSpaceAR(this.node.position), i), 
                        l.default.instance.LoadTipsByStr("获得:" + o.default.instance.equipmentData[u].name);
                    }
                } else {
                    i = o.default.instance.equipmentData[e].icon_path;
                    r.default.instance.createDaimondEffect(1, "装备", this.node.parent.convertToWorldSpaceAR(this.node.position), i), 
                    l.default.instance.LoadTipsByStr("获得:" + o.default.instance.equipmentData[e].name);
                }
            }, t.prototype.getReward = function() {
                n.default.instance.getReward();
            }, t.prototype.refreshStatus = function() {
                if (n.default.instance.isTodayRewardFinish()) this.node.active = !1; else {
                    var e = n.default.instance.getCurSpriteName();
                    this.spriteBg.spriteFrame = i.default.instance.getCommonSprite(e), this.labelRewardNum.string = n.default.instance.getRewardNumDesc();
                }
            }, t.prototype.update = function() {
                i.default.instance.Inited && (n.default.instance.isWaitingToGet() && (this.labelLeftTime.string = s.default.getTimeFormat(n.default.instance.getLeftTime())), 
                this.lastStatus != n.default.instance.status && (this.lastStatus = n.default.instance.status, 
                this.isStatusChange = !0), this.isStatusChange && (this.refreshStatus(), this.isStatusChange = !1));
            }, t.instance = null, __decorate([ d(cc.Label) ], t.prototype, "labelLeftTime", void 0), 
            __decorate([ d(cc.Label) ], t.prototype, "labelRewardNum", void 0), __decorate([ d(cc.Node) ], t.prototype, "nodeCanGet", void 0), 
            __decorate([ d(cc.Sprite) ], t.prototype, "spriteBg", void 0), __decorate([ d(cc.Button) ], t.prototype, "btnGetReward", void 0), 
            t = a = __decorate([ u ], t);
        }(cc.Component);
        a.default = p, cc._RF.pop();
    }, {
        "../manager/data_manager": "data_manager",
        "../manager/resource_manager": "resource_manager",
        "../manager/reward_effect_manager": "reward_effect_manager",
        "../manager/reward_manager": "reward_manager",
        "../manager/ui_manager": "ui_manager",
        "../util": "util"
    } ],
    ui_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "e9f38YbSClDxZq1NtR5En/0", "ui_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("../ui/map_ui_manager"), i = e("./canvas_manager"), r = e("../ui/bag_ui_manager"), o = e("../ui/messagebox_ui_manager"), s = e("../ui/achievement_ui_manager"), l = e("../ui/boss_come_effect_manager"), c = e("../ui/equipinfo_tip_manager"), u = e("../ui/bag_control_ui_manager"), d = e("../ui/gem_tip_ui_manager"), p = e("../ui/role_ui_manager"), m = e("../ui/depot_ui_manager"), f = e("../ui/offline_show_ui_manager"), g = e("../ui/invite_friend_ui_manager"), h = e("../ui/changname_ui_manager"), _ = e("../ui/sprite_ui_manager"), y = e("../ui/help_ui_manager"), v = e("../ui/notice_ui_manager"), b = e("../ui/sign_ui_manager"), D = e("../ui/strengthen_ui_manager"), I = e("../ui/strengthen_tip_manager"), P = e("../ui/blackmarket_ui_manager"), B = e("../ui/refresh_ui_manager"), S = e("../ui/learn_skill_manager"), R = e("../ui/store_ui_manager"), k = e("../ui/add_hole_select_ui_manager"), A = e("../ui/gem_equip_ui_manager"), M = e("../ui/tips_ui_manager"), N = e("../ui/chat_ui_manager"), w = cc._decorator, E = w.ccclass, T = (w.property, 
        function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this;
            }
            var a;
            return __extends(t, e), a = t, Object.defineProperty(t, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new a()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.LoadRoleUI = function(e) {
                p.default.instance ? p.default.instance.showUI(e) : cc.loader.loadRes("ui/role_ui", function(t, n) {
                    var r = cc.instantiate(n);
                    i.default.instance.node.addChild(r, a.Z_ORDER_2), p.default.instance.showUI(e);
                });
            }, t.prototype.LoadSpriteUI = function() {
                _.default.instance ? _.default.instance.showUI() : cc.loader.loadRes("ui/sprite_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_2), _.default.instance.showUI();
                });
            }, t.prototype.LoadSignUI = function() {
                b.default.instance ? b.default.instance.showUI() : cc.loader.loadRes("ui/sign", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_2), b.default.instance.showUI();
                });
            }, t.prototype.LoadStrengthenUI = function() {
                D.default.instance ? D.default.instance.showUI() : cc.loader.loadRes("ui/strengthen_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_2), D.default.instance.showUI();
                });
            }, t.prototype.LoadMapUI = function() {
                n.default.instance ? n.default.instance.showUI() : cc.loader.loadRes("ui/map_ui", function(e, t) {
                    var r = cc.instantiate(t);
                    i.default.instance.node.addChild(r, a.Z_ORDER_2), n.default.instance.showUI();
                });
            }, t.prototype.LoadBlackMarketUI = function() {
                P.default.instance ? P.default.instance.showUI() : cc.loader.loadRes("ui/blackmarket_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_2), P.default.instance.showUI();
                });
            }, t.prototype.LoadLearnSkillUI = function() {
                S.default.instance ? S.default.instance.showUI() : cc.loader.loadRes("ui/learn_skill_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_2), S.default.instance.showUI();
                });
            }, t.prototype.LoadAltarUI = function() {
                R.default.instance ? R.default.instance.showUI() : cc.loader.loadRes("ui/store_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_2), R.default.instance.showUI();
                });
            }, t.prototype.LoadAddHoleSelectUI = function() {
                k.default.instance ? k.default.instance.showUI() : cc.loader.loadRes("ui/add_hole_select_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_2), k.default.instance.showUI();
                });
            }, t.prototype.LoadGemEquipUI = function() {
                A.default.instance ? A.default.instance.showUI() : cc.loader.loadRes("ui/gem_equip_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_2), A.default.instance.showUI();
                });
            }, t.prototype.LoadRefreshUI = function() {
                B.default.instance ? B.default.instance.showUI() : cc.loader.loadRes("ui/refresh_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_2), B.default.instance.showUI();
                });
            }, t.prototype.LoadBagUI = function() {
                r.default.instance ? r.default.instance.showUI() : cc.loader.loadRes("ui/bag_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_2), r.default.instance.showUI();
                });
            }, t.prototype.LoadDepotUI = function() {
                m.default.instance ? m.default.instance.showUI() : cc.loader.loadRes("ui/depot_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_2), m.default.instance.showUI();
                });
            }, t.prototype.LoadInviteFriendUI = function() {
                g.default.instance ? g.default.instance.ShowInviteFrinedUI() : cc.loader.loadRes("ui/invite_friends_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_2), g.default.instance.ShowInviteFrinedUI();
                });
            }, t.prototype.LoadAchievementUI = function() {
                s.default.instance ? s.default.instance.showUI() : cc.loader.loadRes("ui/achievement_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_2), s.default.instance.showUI();
                });
            }, t.prototype.LoadNoticeUI = function() {
                v.default.instance ? v.default.instance.showUI() : cc.loader.loadRes("ui/notice", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_3), v.default.instance.showUI();
                });
            }, t.prototype.LoadHelpUI = function(e) {
                y.default.instance ? y.default.instance.showHelp(e) : cc.loader.loadRes("ui/help_ui", function(t, n) {
                    var r = cc.instantiate(n);
                    i.default.instance.node.addChild(r, a.Z_ORDER_3), y.default.instance.showHelp(e);
                });
            }, t.prototype.LoadStrengthenTip = function(e) {
                I.default.instance ? I.default.instance.showItemTip(e) : cc.loader.loadRes("ui/strengthen_tip", function(t, n) {
                    var r = cc.instantiate(n);
                    i.default.instance.node.addChild(r, a.Z_ORDER_3), I.default.instance.showItemTip(e);
                });
            }, t.prototype.LoadGemTipUI = function(e, t) {
                d.default.instance ? d.default.instance.showGemItemTip(e, t) : cc.loader.loadRes("ui/gem_tip", function(n, r) {
                    var o = cc.instantiate(r);
                    i.default.instance.node.addChild(o, a.Z_ORDER_3), d.default.instance.showGemItemTip(e, t);
                });
            }, t.prototype.LoadEquipInfoTips = function(e) {
                c.default.instance ? c.default.instance.showEquipTip(e) : cc.loader.loadRes("ui/equipinfo_tip", function(t, n) {
                    var r = cc.instantiate(n);
                    i.default.instance.node.addChild(r, a.Z_ORDER_3), c.default.instance.showEquipTip(e);
                });
            }, t.prototype.LoadBagControlUI = function(e) {
                u.default.instance ? u.default.instance.showUI(e) : cc.loader.loadRes("ui/bag_control_ui", function(t, n) {
                    var r = cc.instantiate(n);
                    i.default.instance.node.addChild(r, a.Z_ORDER_4), u.default.instance.showUI(e);
                });
            }, t.prototype.LoadChatUiManager = function() {
                N.default.instance ? N.default.instance.showChatNode() : cc.loader.loadRes("ui/chat_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_4), N.default.instance.showChatNode();
                });
            }, t.prototype.LoadBagControlUIGemValue = function(e) {
                u.default.instance ? u.default.instance.setContolGemID(e) : cc.loader.loadRes("ui/bag_control_ui", function(t, n) {
                    var r = cc.instantiate(n);
                    i.default.instance.node.addChild(r, a.Z_ORDER_5), u.default.instance.setContolGemID(e);
                });
            }, t.prototype.LoadOfflineRewardInfoUI = function(e, t, n, r, o, s, l, c, d, p, m, g, h, _, y) {
                u.default.instance ? f.default.instance.showUI(e, t, n, r, o, s, l, c, d, p, m, g, h, _, y) : cc.loader.loadRes("ui/offline_reward_ui", function(u, v) {
                    var b = cc.instantiate(v);
                    i.default.instance.node.addChild(b, a.Z_ORDER_5), f.default.instance.showUI(e, t, n, r, o, s, l, c, d, p, m, g, h, _, y);
                });
            }, t.prototype.LoadChangeNameUI = function() {
                h.default.instance ? h.default.instance.showUI() : cc.loader.loadRes("ui/change_name_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_5), h.default.instance.showUI();
                });
            }, t.prototype.LoadBossComeUI = function() {
                l.default.instance ? l.default.instance.play() : cc.loader.loadRes("ui/boss_come_ui", function(e, t) {
                    var n = cc.instantiate(t);
                    i.default.instance.node.addChild(n, a.Z_ORDER_5), l.default.instance.play();
                });
            }, t.prototype.LoadMessageBox = function(e, t, n, r, s) {
                void 0 === n && (n = null), void 0 === r && (r = null), void 0 === s && (s = null), 
                o.default.instance ? o.default.instance.showUI(e, t, n, r, s) : cc.loader.loadRes("ui/message_ui", function(l, c) {
                    var u = cc.instantiate(c);
                    i.default.instance.node.addChild(u, a.Z_ORDER_5), o.default.instance.showUI(e, t, n, r, s);
                });
            }, t.prototype.LoadTipsByID = function(e) {
                M.default.instance ? M.default.instance.showtips(e) : cc.loader.loadRes("ui/tips_ui", function(t, n) {
                    var r = cc.instantiate(n);
                    i.default.instance.node.addChild(r, a.Z_ORDER_5), M.default.instance.showtips(e);
                });
            }, t.prototype.LoadTipsByStr = function(e) {
                M.default.instance ? M.default.instance.showTipsByStr(e) : cc.loader.loadRes("ui/tips_ui", function(t, n) {
                    var r = cc.instantiate(n);
                    i.default.instance.node.addChild(r, a.Z_ORDER_5), M.default.instance.showTipsByStr(e);
                });
            }, t._instance = null, t.Z_ORDER_2 = 200, t.Z_ORDER_3 = 300, t.Z_ORDER_4 = 400, 
            t.Z_ORDER_5 = 500, t = a = __decorate([ E ], t);
        }(cc.Component));
        a.default = T, cc._RF.pop();
    }, {
        "../ui/achievement_ui_manager": "achievement_ui_manager",
        "../ui/add_hole_select_ui_manager": "add_hole_select_ui_manager",
        "../ui/bag_control_ui_manager": "bag_control_ui_manager",
        "../ui/bag_ui_manager": "bag_ui_manager",
        "../ui/blackmarket_ui_manager": "blackmarket_ui_manager",
        "../ui/boss_come_effect_manager": "boss_come_effect_manager",
        "../ui/changname_ui_manager": "changname_ui_manager",
        "../ui/chat_ui_manager": "chat_ui_manager",
        "../ui/depot_ui_manager": "depot_ui_manager",
        "../ui/equipinfo_tip_manager": "equipinfo_tip_manager",
        "../ui/gem_equip_ui_manager": "gem_equip_ui_manager",
        "../ui/gem_tip_ui_manager": "gem_tip_ui_manager",
        "../ui/help_ui_manager": "help_ui_manager",
        "../ui/invite_friend_ui_manager": "invite_friend_ui_manager",
        "../ui/learn_skill_manager": "learn_skill_manager",
        "../ui/map_ui_manager": "map_ui_manager",
        "../ui/messagebox_ui_manager": "messagebox_ui_manager",
        "../ui/notice_ui_manager": "notice_ui_manager",
        "../ui/offline_show_ui_manager": "offline_show_ui_manager",
        "../ui/refresh_ui_manager": "refresh_ui_manager",
        "../ui/role_ui_manager": "role_ui_manager",
        "../ui/sign_ui_manager": "sign_ui_manager",
        "../ui/sprite_ui_manager": "sprite_ui_manager",
        "../ui/store_ui_manager": "store_ui_manager",
        "../ui/strengthen_tip_manager": "strengthen_tip_manager",
        "../ui/strengthen_ui_manager": "strengthen_ui_manager",
        "../ui/tips_ui_manager": "tips_ui_manager",
        "./canvas_manager": "canvas_manager"
    } ],
    util: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "506edSfZkRFN5rOuLZ8Rrv0", "util"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = function() {
            function e() {}
            return e.GetJsonLength = function(e) {
                var t = 0;
                for (var a in e) t++;
                return t;
            }, e.PrintObj = function(e) {
                var t = "";
                for (var a in e) {
                    t += a + " = " + e[a] + "\n";
                }
                console.log(t);
            }, e.IsContain = function(e, t) {
                if (null != e && e.indexOf(t) > -1) return !0;
                return !1;
            }, e.CutData = function(t, a) {
                var n = e.IsIn(t, a);
                return !!n && (t.splice(n, 1), !0);
            }, e.IsIn = function(e, t) {
                if (null != e) for (var a in e) if (e[a] == t) return a;
                return !1;
            }, e.Remove = function(e, t) {
                if (null != e) {
                    var a = e.indexOf(t);
                    a > -1 && e.splice(a, 1);
                }
            }, e.GetFloorNumStr = function(e) {
                return Math.floor(e).toString();
            }, e.GetPercentStr = function(e) {
                var t = Number(100 * e).toFixed(2);
                return t += "%";
            }, e.GetTimeStr = function(e) {
                return Math.floor(e).toString();
            }, e.len = function(e) {
                var t = typeof e;
                if ("string" == t) return e.length;
                if ("object" == t) {
                    var a = 0;
                    for (var n in e) a++;
                    return a;
                }
                return !1;
            }, e.GetLargeNumStr = function(e) {
                return e >= 1e10 ? (e / 1e9).toFixed(1) + "B" : e >= 1e7 ? (e / 1e6).toFixed(1) + "M" : e >= 1e4 ? (e / 1e3).toFixed(1) + "K" : Math.floor(e).toString();
            }, e.getTimeFormat = function(e) {
                if (e < 0) return "00:00";
                var t = Math.floor(e / 60), a = Math.floor(e - 60 * t);
                return t < 10 && a < 10 ? "0" + t.toString() + ":0" + a.toString() : t < 10 && a >= 10 ? "0" + t.toString() + ":" + a.toString() : t >= 10 && a < 10 ? t.toString() + ":0" + a.toString() : t >= 10 && a >= 10 ? t.toString() + ":" + a.toString() : "00:00";
            }, e.strlen = function(e) {
                for (var t = 0, a = 0; a < e.length; a++) {
                    var n = e.charCodeAt(a);
                    n >= 1 && n <= 126 || 65376 <= n && n <= 65439 ? t++ : t += 2;
                }
                return t;
            }, e.orderby = function(t, a) {
                if (t.length <= 1) return t;
                for (var n = Math.floor(t.length / 2), i = t.splice(n, 1)[0], r = [], o = [], s = 0, l = t; s < l.length; s++) {
                    var c = l[s];
                    a(c) < a(i) ? r.push(c) : o.push(c);
                }
                return e.orderby(r, a).concat([ i ], e.orderby(o, a));
            }, e;
        }();
        a.default = n, cc._RF.pop();
    }, {} ],
    wx_manager: [ function(e, t, a) {
        "use strict";
        cc._RF.push(t, "5a3a0FkA+1Dka7n0nB0G4KB", "wx_manager"), Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var n = e("./random_event_manager"), i = e("./dynamic_data_manager"), r = e("../math/rand"), o = function() {
            function e() {
                this.lastAction = "", this.lastParam = "", this.shareStrings = [ "装备全靠爆，舔狗一无所有！", "此时一位没有感情的BOSS低调路过……", "刚砍死了BOSS，求表扬！", "别砍了，能不能给BOSS点面子！", "BOSS：我觉得我还可以抢救一下！", "砍怪艾特我，超强的！", "剽悍BOSS在线撒币！", "刺杀BOSS计划由我这个冷酷的勇者接下了！", "这游戏没有钞能力！盘他！！！！", "我这一刀下去BOSS都要飞！" ], 
                this._hasAd = !0;
            }
            return Object.defineProperty(e, "instance", {
                get: function() {
                    return null == this._instance && (this._instance = new e()), this._instance;
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.IsWechat = function() {
                return "undefined" != typeof wx;
            }, e.prototype.InitData = function() {
                if ("undefined" != typeof wx) {
                    var e = wx.getLaunchOptionsSync();
                    console.log("getLaunchOptionsSync:", e);
                    var t = e.query, a = (t.gdt_vid, t.weixinadinfo), n = t.action;
                    n && "invit_friend" == n && t.param && (i.default.instance.fromUserID = t.param);
                    var r = 0;
                    if (a) r = a.split(".")[0];
                    i.default.instance.sceneID = e.scene, 0 != r && (i.default.instance.adID = r);
                }
            }, e.prototype.isComeFromMyProgram = function(e) {
                return 1104 == e;
            }, e.prototype.checkUpdate = function() {
                if ("undefined" != typeof wx && "function" == typeof wx.getUpdateManager) {
                    var e = wx.getUpdateManager();
                    e.onCheckForUpdate(function(e) {
                        console.log(e.hasUpdate);
                    }), e.onUpdateReady(function() {
                        e.applyUpdate();
                    }), e.onUpdateFailed(function() {
                        console.error("新的版本下载失败");
                    });
                }
            }, e.prototype.shareAppMessage = function(e, t) {
                this.lastAction = e, this.lastParam = t;
                var a = this.shareStrings.length, i = r.default.getRandomIndex(a), o = this.shareStrings[i];
                "refresh_randomevent" == e && n.default.instance.shareRefreshAllEvent(), "undefined" != typeof wx && wx.shareAppMessage({
                    title: o,
                    imageUrl: "https://mini-app.img.shouyouqianxian.com/littlehero/share1.jpg",
                    query: "action=" + e + "&param=" + t
                });
            }, e.prototype.triggerEvent = function(e, t) {
                console.log("action:" + e + " param:" + t);
            }, e.prototype.setUserCloudStorage = function(e, t) {}, e.prototype.setLocal = function(e, t) {
                if ("undefined" != typeof wx) try {
                    wx.setStorageSync(e, t);
                } catch (e) {
                    console.error(e);
                }
            }, e.prototype.getLocal = function(e) {
                if ("undefined" == typeof wx) return null;
                try {
                    var t = wx.getStorageSync(e);
                    if (t) return t;
                } catch (e) {
                    return null;
                }
            }, e.prototype.hasAd = function() {
                return "undefined" != typeof wx && this._hasAd;
            }, e.prototype.initVideoAd = function(t) {
                if ("undefined" != typeof wx) {
                    var a = wx.createRewardedVideoAd({
                        adUnitId: "adunit-0dd5330026a5ac8e"
                    });
                    this.videoAd = a, a.onLoad(function() {
                        console.log(" videoAd.onLoad"), e.instance._hasAd = !0;
                    }), a.onError(function(t) {
                        console.log(" videoAd.onError"), console.log(t), e.instance._hasAd = !1;
                    }), a.onClose(function(e) {
                        console.log(e), e && e.isEnded || void 0 === e ? (console.log("正常播放结束，可以下发游戏奖励"), 
                        t(!0)) : (console.log("您的视频还没看完，无法获得奖励"), t(!1));
                    }), a.load();
                }
            }, e.prototype.showAd = function() {
                "undefined" != typeof wx && e.instance.videoAd.show().catch(function(t) {
                    e.instance.videoAd.load().then(function() {
                        return e.instance.videoAd.show();
                    });
                });
            }, e._instance = null, e;
        }();
        a.default = o, cc._RF.pop();
    }, {
        "../math/rand": "rand",
        "./dynamic_data_manager": "dynamic_data_manager",
        "./random_event_manager": "random_event_manager"
    } ]
}, {}, [ "audio_manager", "battle_manager", "allenum", "config", "emmiter", "message", "ShaderHelper", "add_exp_effect", "add_hp_effect", "add_mp_effect", "add_resource_effect", "block_effect", "cost_items", "damage_effect", "miss_effect", "bag_item_data", "buff_data", "CustomMaterial", "ShaderHook", "achievenment_manager", "blackmarket_manager", "canvas_manager", "cost_manager", "data_manager", "dungeon_data_manager", "dynamic_data_manager", "effect_manager", "game_manager", "gem_manager", "guide_manager", "help_manager", "http_manager", "lost_manager", "network_manager", "playerbuff_manager", "pool_manager", "random_event_manager", "resource_manager", "reward_effect_manager", "reward_manager", "skill_manager", "sprite_manager", "ui_manager", "wx_manager", "damage", "rand", "achievement_network", "bag_network", "event_network", "gem_network", "player_network", "sprite_network", "entity", "hero", "monster", "achievement_ui_manager", "add_hole_select_ui_manager", "bag_control_ui_manager", "bag_tip_gem_show_ui", "bag_tip_manager", "bag_ui_manager", "battle_ui_manager", "bg_ui_manager", "blackmarket_ui_manager", "boss_come_effect_manager", "buff_show_ui_manager", "changname_ui_manager", "chat_ui_manager", "combat_ui_manager", "depot_ui_manager", "equipinfo_tip_manager", "gem_equip_ui_manager", "gem_tip_ui_manager", "guide_ui_manager", "help_ui_manager", "invite_friend_ui_manager", "achievement_item", "ad_item", "add_to_my_program_item", "attr_item", "bag_item", "buff_item", "effect_control_item", "equip_hero_item", "event_item", "help_item", "hit_monster_item", "item_ask", "item_btn_chat_room", "item_friend", "lvup_item", "map_item", "sign_item", "skill_item", "sound_item", "sprite_item", "store_item", "title_item", "learn_skill_manager", "map_ui_manager", "menu_ui_manager", "messagebox_ui_manager", "money_bar_ui_manager", "notice_ui_manager", "offline_show_ui_manager", "random_event_ui_manager", "refresh_tip", "refresh_ui_manager", "role_ui_manager", "sign_ui_manager", "skill_ui_manager", "sprite_ui_manager", "store_ui_manager", "strengthen_tip_manager", "strengthen_ui_manager", "tips_ui_manager", "today_reward_ui", "util", "BeingHit", "FluxaySuper" ]);