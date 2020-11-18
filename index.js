(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.fx = {}));
}(this, function (exports) { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var classCallCheck = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	/**
	 * 绑定方法
	 * @param {Element} obj 绑定的元素
	 * @param {String} type 方法名称
	 * @param {function} fn  绑定的方法
	 */
	var addEvent = function addEvent(obj, type, fn) {
	    if (obj.addEventListener) {
	        obj.addEventListener(type, fn, false);
	    } else {
	        obj['e' + type + fn] = fn;
	        obj[type + fn] = function () {
	            obj['e' + type + fn](window.event);
	        };
	        obj.attachEvent('on' + type, obj[type + fn]);
	    }
	};

	/**
	 * 解除方法绑定
	 * @param {Element} obj 解除方法绑定的元素
	 * @param {String} type 方法名称
	 * @param {function} fn  解除方法绑定的方法
	 */
	var removeEvent = function removeEvent(obj, type, fn) {
	    if (obj.detachEvent) {
	        obj.detachEvent('on' + type, obj[type + fn]);
	        obj[type + fn] = null;
	    } else obj.removeEventListener(type, fn, false);
	};

	/**
	 * 获取cookie里面的值
	 * @param {String} name cookie名称
	 * @param {String} 对应cookie名称的值  不存在返回null
	 */
	var getCookie = function getCookie(name) {
	    try {
	        var arr,
	            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	        if (arr = document.cookie.match(reg)) {
	            //  return unescape(arr[2]);
	            return decodeURIComponent(arr[2]);
	        } else {
	            return null;
	        }
	    } catch (e) {
	        return null;
	    }
	};

	/**
	 * 写入cookie
	 * @param {String} name  cookie名
	 * @param {String} value cookie值
	 * @param {String} time  存储时间 收一个字符是代表的时间名词
	                        s20是代表20秒
	                        h是指小时，如12小时则是：h12
	                        d是天数，30天则：d30
	 */
	var setCookie = function setCookie(name, value, time) {
	    var strsec = getsec(time);
	    var exp = new Date();
	    exp.setTime(exp.getTime() + strsec * 1);
	    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
	};
	function getsec(str) {
	    var str1 = parseFloat(str.substring(1, str.length));
	    var str2 = str.substring(0, 1);
	    switch (str2) {
	        case "s":
	            return str1 * 1000;
	        case "m":
	            return str1 * 60 * 1000;
	        case "h":
	            return str1 * 60 * 60 * 1000;
	        default:
	            return str1 * 24 * 60 * 60 * 1000;
	    }
	}

	/**
	 * 获取链接的参数
	 * @param {String} name 参数名
	 * @return {String} 对应参数名的值  不存在返回null
	 */
	var GetQueryString = function GetQueryString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return r[2];
	    return null;
	};

	/**
	 * 获取链接hash后面的参数
	 * @param {String} name hash名称
	 * @param {String} 对应的hash名称的值
	 */
	var GethashString = function GethashString(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var h = window.location.hash;
	    var r = h.substr(h.lastIndexOf('?') + 1).match(reg);
	    if (r != null) return r[2];
	    return null;
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _library = true;

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var _redefine = _hide;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: _library ? 'pure' : 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	var TO_STRING_TAG = _wks('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	}

	var f$1 = _wks;

	var _wksExt = {
		f: f$1
	};

	var iterator = _wksExt.f('iterator');

	var iterator$1 = createCommonjsModule(function (module) {
	module.exports = { "default": iterator, __esModule: true };
	});

	unwrapExports(iterator$1);

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var defineProperty = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
	};

	var f$2 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$2
	};

	var f$3 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$3
	};

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$5
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$6
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;



















	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	_wksDefine('asyncIterator');

	_wksDefine('observable');

	var E__work_gitlab______toolTs_node_modules_coreJs_library_fn_symbol = _core.Symbol;

	var symbol = createCommonjsModule(function (module) {
	module.exports = { "default": E__work_gitlab______toolTs_node_modules_coreJs_library_fn_symbol, __esModule: true };
	});

	unwrapExports(symbol);

	var _typeof_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _iterator2 = _interopRequireDefault(iterator$1);



	var _symbol2 = _interopRequireDefault(symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};
	});

	var _typeof = unwrapExports(_typeof_1);

	/**
	 * 是否是object类型
	 */
	function isObject(value) {
	  return !!value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object";
	}

	/**
	 * 判断是否是数组对象类型
	 * @param value 值
	 */
	function isPlain(value) {
	  return isObject(value) && Object.prototype.toString.call(value) === '[object Object]' && value.constructor === Object;
	}

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var keys = _core.Object.keys;

	var keys$1 = createCommonjsModule(function (module) {
	module.exports = { "default": keys, __esModule: true };
	});

	var _Object$keys = unwrapExports(keys$1);

	var keys$2 = function keys(object) {
	    return isObject(object) ? _Object$keys(object) : [];
	};
	/**
	 * 对象的循环
	 * @param {Object} object 对象
	 * @param {Function} fn(value,key) 回调的函数
	 */
	function each(object, fn) {
	    keys$2(object).forEach(function (key) {
	        return fn(object[key], key);
	    });
	}

	/**
	 * 合并对象
	 * @param { Array<any> } args 所有的参数   后面的参数替换前面的参数
	 * @param sources 需要合并的对象
	 */
	function mergeOptions() {
	    var result = {};

	    for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
	        sources[_key] = arguments[_key];
	    }

	    sources.forEach(function (source) {
	        if (!source) {
	            return;
	        }
	        each(source, function (value, key) {
	            if (!isPlain(value)) {
	                result[key] = value;
	                return;
	            }
	            if (!isPlain(result[key])) {
	                result[key] = {};
	            }
	            result[key] = mergeOptions(result[key], value);
	        });
	    });
	    return result;
	}

	/**
	 * 递归替换
	 * @param { Array<any> } args 所有的参数   后面的参数替换前面的参数
	 * @return { object }
	 * @example
	 *  extend({a:1,b:2},{a:2,c:3}) =>  {a:2,b:2,c:3}
	 */
	function extend() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	    }

	    if (args.length < 1) {
	        return {};
	    } else if (args.length == 1) {
	        return RecursionSubstitution({}, args[0]);
	    } else {
	        var argObj = args[0];
	        for (var ii = 1; ii < args.length; ii++) {
	            argObj = RecursionSubstitution(argObj, args[ii]);
	        }
	        return argObj;
	    }
	    function RecursionSubstitution(c, f) {
	        if (!c) c = {};
	        for (var i in f) {
	            if (f[i] && _typeof(f[i]) == "object") {
	                c[i] = RecursionSubstitution(c[i], f[i]);
	            } else {
	                c[i] = f[i];
	            }
	        }
	        return c;
	    }
	}

	/**
	 * 异步加载js文件
	 * @param {Array<string>} fileAry js文件的数组
	 */
	function addScriptLoad(fileAry) {
	    recursion(fileAry, 0);
	    function recursion(fileAry, i) {
	        if (fileAry.length > 0) {
	            ScriptModel(fileAry[i]).onload = function () {
	                if (fileAry.length - 1 != i) {
	                    recursion.call(this, fileAry, ++i);
	                }
	            };
	        }
	        function ScriptModel(src) {
	            var js = document.createElement('script');
	            js.src = src;
	            document.getElementsByTagName('head')[0].appendChild(js);
	            return js;
	        }
	        return false;
	    }
	}

	/**
	 * 异步加载css文件
	 * @param {Array<string>} fileAry css文件的数组
	 */
	function addLinkLoad(fileAry) {
	    recursion(fileAry, 0);
	    function recursion(fileAry, i) {
	        if (fileAry.length > 0) {
	            ScriptModel(fileAry[i]).onload = function () {
	                if (fileAry.length - 1 != i) {
	                    recursion.call(this, fileAry, ++i);
	                }
	            };
	        }
	        function ScriptModel(src) {
	            var link = document.createElement('link');
	            link.href = src;
	            link.rel = "stylesheet";
	            document.getElementsByTagName('head')[0].appendChild(link);
	            return link;
	        }
	        return false;
	    }
	}

	/**
	 * 请求回传的状态
	 * @param {string} subCode 状态码
	 * @return {boolean} true 成功 false 失败
	 */
	function dataState(subCode) {
	    var state = subCode.slice(-2);
	    if (state === "00") return true;
	    return false;
	}

	/**
	 * 把中英文的长度都转成字符串行的长度    中文：2个字符    英文：1个字符
	 * @param {string} str
	 */
	function strlen(str) {
	    var len = 0;
	    for (var i = 0; i < str.length; i++) {
	        var c = str.charCodeAt(i);
	        //单字节加1   
	        if (c >= 0x0001 && c <= 0x007e || 0xff60 <= c && c <= 0xff9f) {
	            len++;
	        } else {
	            len += 2;
	        }
	    }
	    return len;
	}

	/**
	 * 获取元素的下标
	 * @param {Element} Ele 当前元素
	 * @return {number} 元素的下标
	 */
	function index(Ele) {
	    if (Ele.nodeName === "HTML" || Ele.nodeName === "BODY") return 0;
	    var parent = Ele.parentElement;
	    var chidren = parent.children;
	    for (var i = 0; i < parent.childElementCount; i++) {
	        if (chidren[i] === Ele) return i;
	    }
	    return 0;
	}

	/**
	 * 去掉字符串的前后空格
	 * @param {string} value 字符串
	 * @return {string} 去掉前后空格的字符串
	 */
	function trim(value) {
	    if (Object.prototype.toString.call(value) !== "[object String]") return value;
	    return value.replace(/^\s*|\s*$/, "");
	}

	/**
	 * 四舍五入保留几位小数点 toFixeds的兼容处理
	 * @param {number|string} value  需要取余的数字
	 * @param  {number|string} N  保留小数点后几位数
	 * @return {string|null}  为null则val不是数字
	 */
	function toFixeds(value, N) {
	    if (isNaN(parseInt(value + ""))) return null;
	    var val = value.toString();
	    //有小数点
	    var isSpot = function isSpot() {
	        var n = parseFloat(N + ""),
	            v = val.toString(),
	            last = v.slice(v.indexOf('.') + 1 + n, v.indexOf('.') + 2 + n);
	        if (parseInt(last) == 5) {
	            v = v.substr(0, v.indexOf('.') + 1 + n) + 6;
	        } else {
	            v = v.substr(0, v.indexOf('.') + 2 + n);
	        }
	        return parseFloat(v).toFixed(n);
	    };
	    // 补足小数点后天的位数
	    var InsufficientFigures = function InsufficientFigures(v) {
	        var i = parseFloat(N + "") - v.slice(v.indexOf('.') + 1).length;
	        while (i > 0) {
	            v += '0';
	            i--;
	        }
	        return v;
	    };
	    if (val.indexOf('.') >= 0) {
	        if (val.slice(val.indexOf('.') + 1).length > N) {
	            return isSpot();
	        } else {
	            return InsufficientFigures(val);
	        }
	    } else {
	        return InsufficientFigures(val + '.0');
	    }
	}

	/**
	 * IE下的children兼容处理
	 * @param {Element} element
	 * @return {Array<Element>}
	 */
	function getChildElementNodes(element) {
	    //第一步是条件语句来判断浏览器是否支持element.children属性
	    //如果支持呢，element.children的值是一个集合而不是undefined
	    if (element.children == "undefined" || element.children == undefined) {
	        // 既然没有，自己为element元素创建一个children属性，并把函数returnEle的返回值给这个属性
	        element.children = returnEle();
	    }
	    return element.children;
	    //element.children等号右边要进行的逻辑操作
	    function returnEle() {
	        var childNodes,
	            EleNodes = [],
	            i = 0,

	        // 等号右边获取的所有节点类型全部赋值给EleNodes这个变量
	        childNodes = element.childNodes;
	        //现在要为childNodes里面的节点做循环判断了，我们只要元素节点
	        for (var i = 0; i < childNodes.length; i++) {
	            // 判断节点是不是元素节点想到了两种方法
	            // childNodes[i].nodeType === 1
	            if (/\[object HTML.*Element\]/.test(Object.prototype.toString.call(childNodes[i])) || childNodes[i].nodeName === "#text" && childNodes[i].length > 0) {
	                EleNodes.push(childNodes[i]);
	            }
	        }
	        return EleNodes;
	    }
	}

	var cn = {
	    index: {
	        error: "已经存在改方法名称"
	    },
	    httprequest: {
	        timeOut: "请求超时",
	        noAuthority: "没有权限",
	        parameterError: '参数有误'
	    },
	    dom: {
	        throwWhitespace: "类具有非法空格字符",
	        notElement: "不是元素"
	    },
	    select: {
	        prompt: "请选择"
	    },
	    proportion: {
	        noImg: "imageUrl参数不正确",
	        noParentEle: "容器元素不正确"
	    }
	};

	var fxClass = function fxClass() {
	    _classCallCheck(this, fxClass);

	    [addEvent, removeEvent, getCookie, setCookie, GetQueryString, GethashString, mergeOptions, extend, addScriptLoad, addLinkLoad, dataState, strlen, index, trim, toFixeds, getChildElementNodes].forEach(function (k) {
	        for (var i in k) {
	            if (fxClass.prototype[i]) ;
	            fxClass.prototype[i] = k[i];
	        }
	    });
	};

	var compatible = /*#__PURE__*/Object.freeze({
		default: fxClass,
		addEvent: addEvent,
		removeEvent: removeEvent,
		getCookie: getCookie,
		setCookie: setCookie,
		GetQueryString: GetQueryString,
		GethashString: GethashString,
		mergeOptions: mergeOptions,
		extend: extend,
		addScriptLoad: addScriptLoad,
		addLinkLoad: addLinkLoad,
		dataState: dataState,
		strlen: strlen,
		index: index,
		trim: trim,
		toFixeds: toFixeds,
		getChildElementNodes: getChildElementNodes
	});

	var IS_PC = function () {
	    var userAgentInfo = navigator.userAgent;
	    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
	    var flag = true;
	    for (var v = 0; v < Agents.length; v++) {
	        if (userAgentInfo.indexOf(Agents[v]) > 0) {
	            flag = false;
	            break;
	        }
	    }
	    return flag;
	}();

	var USER_AGENT = window.navigator && window.navigator.userAgent || '';

	/**
	 * 是否是ipad
	 *
	 * @static
	 * @const
	 * @type {Boolean}
	 */
	var IS_IPAD = /iPad/i.test(USER_AGENT);

	/**
	 * 是否是iPhone
	 *

	 * @return {Boolean}
	 */
	var IS_IPHONE = /iPhone/i.test(USER_AGENT) && !IS_IPAD;

	/**
	 * 是否是iPod
	 *
	 * @static
	 * @const
	 * @return {Boolean}
	 */
	var IS_IPOD = /iPod/i.test(USER_AGENT);

	/**
	 * 是否是ios
	 *
	 * @return {Boolean}
	 */
	var IS_IOS = IS_IPHONE || IS_IPAD || IS_IPOD;

	/**
	 * ios的版本号 没有则返回null
	 *
	 * @return {string|null}
	 */
	var IOS_VERSION = function () {
	    var match = USER_AGENT.match(/OS (\d+)_/i);
	    if (match && match[1]) {
	        return match[1];
	    }
	    return null;
	}();

	/**
	 * 是否是android
	 *
	 * @return {Boolean}
	 */
	var IS_ANDROID = /Android/i.test(USER_AGENT);

	/**
	 * android的版本号 没有则返回null
	 *
	 * @return {number|string|null}
	 */
	var ANDROID_VERSION = function () {
	    var match = USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);
	    if (!match) {
	        return null;
	    }
	    var major = match[1] && parseFloat(match[1]);
	    var minor = match[2] && parseFloat(match[2]);
	    if (major && minor) {
	        return parseFloat(match[1] + '.' + match[2]);
	    } else if (major) {
	        return major;
	    }
	    return null;
	}();

	var webkitVersionMap = /AppleWebKit\/([\d.]+)/i.exec(USER_AGENT);
	var appleWebkitVersion = webkitVersionMap ? parseFloat(webkitVersionMap.pop()) : null;
	/**
	 * 这是否是本机Android浏览器
	 *
	 * @return {Boolean}
	 */
	var IS_NATIVE_ANDROID = IS_ANDROID && ANDROID_VERSION < 5 && appleWebkitVersion < 537;

	/**
	 * 是否是火狐浏览器
	 *
	 * @return {Boolean}
	 */
	var IS_FIREFOX = /Firefox/i.test(USER_AGENT);

	/**
	 * IE的版本号 没有则返回-1
	 *
	 * @return {Number|String|null}
	        -1 不是ie浏览器 Number
	         6/7/8/9/10/11 浏览器的版本 Number
	         'edge'  ie的edge浏览器 String
	 */
	var IE_VERSION = function () {
	    var isIE = USER_AGENT.indexOf("compatible") > -1 && USER_AGENT.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
	    var isEdge = USER_AGENT.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
	    var isIE11 = USER_AGENT.indexOf('Trident') > -1 && USER_AGENT.indexOf("rv:11.0") > -1;
	    if (isIE) {
	        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
	        reIE.test(USER_AGENT);
	        var fIEVersion = parseFloat(RegExp["$1"]);
	        if (fIEVersion == 7) {
	            return 7;
	        } else if (fIEVersion == 8) {
	            return 8;
	        } else if (fIEVersion == 9) {
	            return 9;
	        } else if (fIEVersion == 10) {
	            return 10;
	        } else {
	            return 6; //IE版本<=7
	        }
	    } else if (isEdge) {
	        return 'edge'; //edge
	    } else if (isIE11) {
	        return 11; //IE11  
	    } else {
	        return -1; //不是ie浏览器
	    }
	}();

	/**
	 * 是否是Edge
	 *
	 * @return {Boolean}
	 */
	var IS_EDGE = /Edge/i.test(USER_AGENT);

	/**
	* 是否是Chrome
	*
	* @return {Boolean}
	*/
	var IS_CHROME = !IS_EDGE && (/Chrome/i.test(USER_AGENT) || /CriOS/i.test(USER_AGENT));

	/**
	 * Chrome的版本号 没有则返回null
	 *
	 * @return {number|string|null}
	 */
	var CHROME_VERSION = function () {
	    var match = USER_AGENT.match(/(Chrome|CriOS)\/(\d+)/);
	    if (match && match[2]) {
	        return parseFloat(match[2]);
	    }
	    return null;
	}();

	/**
	 * 是否是ios下的Safari
	 *
	 * @return {Boolean}
	 */
	var IS_IOS_SAFARI = /Safari/i.test(USER_AGENT) && !IS_CHROME && !IS_ANDROID && !IS_EDGE;

	/**
	 * 是否是Safari
	 *
	 * @return {Boolean}
	 */
	var IS_SAFARI = (IS_IOS_SAFARI || IS_IOS) && !IS_CHROME;

	var fxClass$1 = function fxClass() {
	    _classCallCheck(this, fxClass);

	    [IS_PC, IS_IPHONE, IS_IPAD, IS_IPOD, IS_IOS, IOS_VERSION, IS_ANDROID, ANDROID_VERSION, IS_NATIVE_ANDROID, IS_FIREFOX, IE_VERSION, IS_EDGE, IS_CHROME, CHROME_VERSION, IS_IOS_SAFARI, IS_SAFARI].forEach(function (k) {
	        for (var i in k) {
	            if (fxClass.prototype[i]) ;
	            fxClass.prototype[i] = k[i];
	        }
	    });
	};

	var browser = /*#__PURE__*/Object.freeze({
		default: fxClass$1,
		IS_PC: IS_PC,
		IS_IPHONE: IS_IPHONE,
		IS_IPAD: IS_IPAD,
		IS_IPOD: IS_IPOD,
		IS_IOS: IS_IOS,
		IOS_VERSION: IOS_VERSION,
		IS_ANDROID: IS_ANDROID,
		ANDROID_VERSION: ANDROID_VERSION,
		IS_NATIVE_ANDROID: IS_NATIVE_ANDROID,
		IS_FIREFOX: IS_FIREFOX,
		IE_VERSION: IE_VERSION,
		IS_EDGE: IS_EDGE,
		IS_CHROME: IS_CHROME,
		CHROME_VERSION: CHROME_VERSION,
		IS_IOS_SAFARI: IS_IOS_SAFARI,
		IS_SAFARI: IS_SAFARI
	});

	var win;
	if (typeof window !== "undefined") {
	    win = window;
	} else if (typeof global !== "undefined") {
	    win = global;
	} else if (typeof self !== "undefined") {
	    win = self;
	} else {
	    win = {};
	}
	var window$1 = win;

	/**
	 * 获取元素样式表里面的样式
	 * @param {Element} el 获取样式的元素
	 * @param {string} prop 样式的名称
	 * @return {String | Number}
	 * @example
	 *  computedStyle(document.getElementById('id'),"fontSize") ==> "12px"
	 */
	function computedStyle(el, prop) {
	    if (!el || !prop) {
	        return '';
	    }
	    var cs = void 0;
	    if (typeof window$1.getComputedStyle === 'function') {
	        cs = window$1.getComputedStyle(el);
	        return cs ? cs[prop] : '';
	    } else {
	        //ie6-8下不兼容
	        if (prop === "opacity") {
	            //有些属性在浏览器上是不兼容的例如opacity
	            cs = el.currentStyle["filter"];
	            var _reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
	            cs = _reg.test(cs) ? _reg.exec(cs)[1] / 100 : 1;
	        }
	        var reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)?$/i; //去掉单位的正则
	        cs = el.currentStyle[prop];
	        return cs ? reg.test(cs) ? parseFloat(cs) : cs : "";
	    }
	}

	var computedStyle$1 = /*#__PURE__*/Object.freeze({
		computedStyle: computedStyle
	});

	/**
	 * 是否是元素
	 * @param {any} value 元素
	 */
	function isEl(value) {
	  return value && isObject(value) && value.nodeType === 1;
	}

	/**
	   * 判断是否是文本
	   * @param {any} value 内容
	   */
	function isTextNode(value) {
	   return isObject(value) && value.nodeType === 3;
	}

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	_objectSap('getOwnPropertyNames', function () {
	  return _objectGopnExt.f;
	});

	var $Object = _core.Object;
	var getOwnPropertyNames = function getOwnPropertyNames(it) {
	  return $Object.getOwnPropertyNames(it);
	};

	var getOwnPropertyNames$1 = createCommonjsModule(function (module) {
	module.exports = { "default": getOwnPropertyNames, __esModule: true };
	});

	var _Object$getOwnPropertyNames = unwrapExports(getOwnPropertyNames$1);

	/**
	 * 添加文本内容的兼容处理
	 * @param {Element} el 需要添加文本的元素
	 * @param {String} text 添加的文本
	 * @return {Element} 元素
	 */
	function textContent(el, text) {
	    if (typeof el.textContent === 'undefined') {
	        el.innerText = text;
	    } else {
	        el.textContent = text;
	    }
	    return el;
	}

	/**
	 * 这是一个混合值，描述要注入到DOM中的内容
	 * 通过某种方法。它可以是以下类型:
	 * 输入     | 描述
	 * string   | 值将被规范化为一个文本节点。
	 * Element  | 值将按原样接受。
	 * TextNode | 值将按原样接受。
	 * Array    | 一维数组，包含字符串、元素、文本节点或函数。这些函数应该返回字符串、元素或文本节点(任何其他返回值，如数组，都将被忽略)。
	 * Function |一个函数，它期望返回一个字符串、元素、文本节点或数组——上面描述的任何其他可能的值。这意味着内容描述符可以是返回函数数组的函数，但是这些二级函数必须返回字符串、元素或文本节点
	 *
	 * 规范化最终插入到DOM中的内容
	 * 这允许广泛的内容定义方法，但有助于保护
	 * 避免陷入简单编写“innerHTML”的陷阱，这是可能的成为XSS关注的对象。
	 *
	 * 元素的内容可以以多种类型传递
	 * 组合，其行为如下:
	 * @param {module:dom~ContentDescriptor} content
	 * @return {Array}
	 */
	function normalizeContent(content) {
	    if (typeof content === 'function') {
	        content = content();
	    }
	    return (Array.isArray(content) ? content : [content]).map(function (value) {
	        if (typeof value === 'function') {
	            value = value();
	        }
	        if (isEl(value) || isTextNode(value)) {
	            return value;
	        }
	        if (typeof value === 'string' && /\S/.test(value)) {
	            return document.createTextNode(value);
	        }
	    }).filter(function (value) {
	        return value;
	    });
	}

	/**
	 * 添加元素
	 * @param {Element} el 父元素
	 * @param {Array<Element> | Element} content 添加的元素
	 * @return {Element} 父元素
	 */
	function appendContent(el, content) {
	  normalizeContent(content).forEach(function (node) {
	    return el.appendChild(node);
	  });
	  return el;
	}

	/**
	 * 传一个元素
	 * @param {String} tagName 标签
	 * @param properties 标签里面的文本内容
	        {
	            className: 'vjs-seek-to-live-text',
	            innerHTML: this.localize('LIVE')
	        }
	 * @param {Object} attributes  添加属性
	 * @param {Array<Element> | Element} content 标签里面添加元素
	 * @return {Element} 返回添加的元素
	 *
	 * @or
	 * 只传入一个参数
	 * @param {String} tagName html代码
	 * @return {Element} 返回需要创建的html代码的元素
	 * @example
	        createEl("<div>adsffadf</div>")
	 */
	function createEl() {
	    var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';

	    if ((arguments.length <= 1 ? 0 : arguments.length - 1) === 0) {
	        var ele = document.createElement("div");
	        ele.innerHTML = tagName;
	        return ele.firstElementChild;
	    } else {
	        var properties = (arguments.length <= 1 ? undefined : arguments[1]) || {};
	        var attributes = (arguments.length <= 2 ? undefined : arguments[2]) || {};
	        var content = arguments.length <= 3 ? undefined : arguments[3];
	        var el = document.createElement(tagName);
	        _Object$getOwnPropertyNames(properties).forEach(function (propName) {
	            var val = properties[propName];
	            if (propName === 'textContent') {
	                textContent(el, val);
	            } else {
	                el[propName] = val;
	            }
	        });
	        _Object$getOwnPropertyNames(attributes).forEach(function (attrName) {
	            el.setAttribute(attrName, attributes[attrName]);
	        });
	        if (content) {
	            appendContent(el, content);
	        }
	        return el;
	    }
	}

	/**
	 * 类具有非法空格字符
	 * @param {string} str 字符串
	 * @return {boolean}
	 */
	function throwIfWhitespace(str) {
	    if (/\s/.test(str)) {
	        throw new Error("" + cn.dom.throwWhitespace);
	    }
	}

	/**
	 * 正则表达式化
	 * @param {string} className 正则的匹配内容
	 * @return {RegExp} 正则表达式对象
	 */
	function classRegExp(className) {
	  return new RegExp('(^|\\s)' + className + '($|\\s)');
	}

	/**
	 * 检索元素的类中是否包含该类
	 * @param {Element} element  查找的元素
	 * @param {String} classToCheck 需要匹配的类
	 * @return {boolean} true包含  false包含
	 */
	function hasClass(element, classToCheck) {
	    if (!element) return false;
	    throwIfWhitespace(classToCheck);
	    if (element.classList) {
	        return element.classList.contains(classToCheck);
	    }
	    return classRegExp(classToCheck).test(element.className);
	}

	/**
	 * 兼容table的innerHTML
	 * @param {HTMLElement} table 需要赋值表格元素
	 * @param {String} html 添加的内容
	 * @return {HTMLElement} 返回table
	 * @example setTableInnerHTML(document.createElement('table'),html) => table
	 */
	function setTableInnerHTML(table, html) {
	    if (navigator && navigator.userAgent.match(/msie/i)) {
	        var temp = table.ownerDocument.createElement('div');
	        temp.innerHTML = '<table><tbody>' + html + '</tbody></table>';
	        if (table.tBodies.length == 0) {
	            var tbody = document.createElement("tbody");
	            table.appendChild(tbody);
	        }
	        table.replaceChild(temp.firstChild.firstChild, table.tBodies[0]);
	    } else {
	        table.innerHTML = html;
	    }
	    return table;
	}

	/**
	 * 获取或判断任意数据类类型的通用方法
	 * @param {any} any 任意数据
	 * @example
	 * var aa=null;
	 * getDataType(aa);
	 * var abc;
	 * getDataType(abc); //[object Undefined] 说明此变量已经声明，但尚未被初始化
	 * var fn=function(){}
	 * getDataType(fn); //[object Function]
	 * getDataType(new Object()); //[object Object]
	 * getDataType("Hello");//[object String]
	 * getDataType(234);//[object Number]
	 * getDataType(true));//[object Boolean]
	 * getDataType(new Date()); //[object Date]
	 * getDataType(new Date().getTime()); //[object Number]
	 * getDataType(document.getElementById("demopic")); //[object HTMLDivElement]
	 * getDataType(document.querySelector('div'));//[object HTMLDivElement]
	 * var nodelist=NodeListToArray(document.getElementsByTagName("*"));
	 * getDataType(nodelist); //[object Array]
	 * getDataType(document.getElementsByTagName("*")); //[object NodeList)]
	 * getDataType(document.querySelectorAll('div')); //[object NodeList)]
	 * //nodelist[10].tagName);
	 * getDataType(/[a-z]/); //[object RegExp]
	 */
	function getDataType(any) {
	    /* (1) Object.prototype.toString.call 方法判断类型：
	    优点：通用，返回"[object String]" 具体object的类型
	    缺点：不能返回继承的类型
	    
	    (2)typeof x
	    缺点：对object类型不能细分；
	    优点：对空null的判断 'undefined'的应用;
	    返回类型有：'undefined' “string” 'number' 'boolean' 'function' 'object'
	    
	    (3) instanceof 能返回具体的类型，只适用于用new关键字创建的对象进行判断
	    */
	    // var baseType=["string","number","boolean"];//基本类型
	    // var refType=["object", "Function","Array","Date"];//引用类型
	    try {
	        var dtype = Object.prototype.toString.call(any);
	        if (dtype == "[object Object]") //IE，某个dom元素对象
	            {
	                try {
	                    if (any.constructor) {
	                        var constructorStr = any.constructor.toString(); //obj.constructor可以返回继承的类型
	                        if (constructorStr.indexOf("Array") != -1) {
	                            dtype = "[object Array]";
	                        } else if (constructorStr.indexOf("HTMLCollection") != -1) {
	                            /* IE */
	                            dtype = "[object NodeList]";
	                        } else if (constructorStr.indexOf("function") != -1 && constructorStr.indexOf("Object()") != -1) {
	                            dtype = "[object Object]";
	                        } else dtype = constructorStr;
	                    }
	                } catch (e) {
	                    return "[object Null]";
	                }
	            } else {
	            if (dtype == "[object HTMLCollection]") {
	                /* FF */
	                dtype = "[object NodeList]";
	            }
	        }
	        return dtype;
	    } catch (e) {
	        return "variable is not defined.";
	    }
	}

	/**
	 * 显示当前元素
	 * @param {Element|NodeList | Array<Element>} ele 需要显示的元素
	 * @return {Element|NodeList | Array<Element>} 返回当前元素
	 */
	function show(ele) {
	    var e = ele;
	    var type = getDataType(ele);
	    switch (type) {
	        case "[object String]":
	        case "[object NodeList]":
	        case "[object Array]":
	            for (var i = 0; i < e.length; i++) {
	                if (computedStyle(e[i], "display") === "none") e[i].style.display = "block";
	            }
	            break;
	        default:
	            if (/\[object HTML.*Element\]/.test(type)) {
	                if (computedStyle(ele, "display") === "none") ele.style.display = "block";
	            } else {
	                throw new Error("" + cn.dom.notElement);
	            }
	    }
	    return ele;
	}

	/**
	 * 隐藏当前元素
	 * @param {Element|NodeList | Array<Element>} ele 需要隐藏的元素
	 * @return {Element|NodeList | Array<Element>} 返回当前元素
	 */
	function hide(ele) {
	    var e = ele;
	    var type = getDataType(ele);
	    switch (type) {
	        case "[object String]":
	        case "[object NodeList]":
	        case "[object Array]":
	            for (var i = 0; i < e.length; i++) {
	                if (computedStyle(e[i], "display") !== "none") e[i].style.display = "none";
	            }
	            break;
	        default:
	            if (/\[object HTML.*Element\]/.test(type)) {
	                if (computedStyle(ele, "display") !== "none") ele.style.display = "none";
	            } else {
	                throw new Error("" + cn.dom.notElement);
	            }
	    }
	    return ele;
	}

	/**
	 * 显示/隐藏元素
	 * @param {Element} ele 需要隐藏的元素
	 * @return {Element} 返回当前元素
	 */
	function toggle(ele) {
	    if (!isEl(ele)) throw new Error("" + cn.dom.notElement);
	    ele.style.display = computedStyle(ele, "display") !== "none" ? "none" : "block";
	}

	/**
	 * 当前元素的同辈元素
	 * @param {string | Element} ele 当前元素
	 * @param {Function} callback 每个元素的回调方法
	 * @return {Array<Element>} 返回对象数组
	 * @example
	 *    fx.siblings("sss" | document.querySelector("div") | document.querySelectorAll("div"))
	 */
	function siblings(ele, callback) {
	    var e = ele;
	    var r = [];
	    var type = getDataType(ele);
	    switch (type) {
	        case "[object String]":
	            e = document.querySelector(ele);
	            break;
	        case "[object NodeList]":
	            e = ele[0];
	            break;
	        default:
	            if (/\[object HTML.*Element\]/.test(type)) {
	                e = ele;
	            } else {
	                throw new Error("" + cn.dom.notElement);
	            }
	    }
	    var n = e.parentNode.firstChild;
	    for (; n; n = n.nextSibling) {
	        if (n.nodeType === 1 && n !== e) {
	            callback && callback(n);
	            r.push(n);
	        }
	    }
	    return r;
	}

	/**
	 * 删除元素的类
	 * @param {Element} ele 元素
	 * @param {string} className 类名
	 * @return {Element}
	 */
	function removeClass(ele, className) {
	    var type = getDataType(ele);
	    if (!/\[object HTML.*Element\]/.test(type)) {
	        throw new Error("" + cn.dom.notElement);
	    }
	    var classAry = ele.className.split(" ");
	    if (classAry.indexOf(className) >= 0) classAry.splice(classAry.indexOf(className), 1);
	    ele.className = classAry.join(" ");
	    return ele;
	}

	/**
	 * 添加元素的类
	 * @param {Element} ele 元素
	 * @param {string} className 类名
	 * @return {Element}
	 */
	function addClass(ele, className) {
	    var type = getDataType(ele);
	    if (!/\[object HTML.*Element\]/.test(type)) {
	        throw new Error("" + cn.dom.notElement);
	    }
	    var classAry = ele.className.split(" ");
	    if (classAry.indexOf(className) === -1) classAry.push(className);
	    ele.className = classAry.join(" ");
	    return ele;
	}

	/**
	 * 向当前元素的之后插入一个元素节点
	 * @param {Node} newEl 插入的节点
	 * @param {Node} targetEl 当前的节点
	 * @return {Node} 返回插入的节点
	 */
	function insertAfter(newEl, targetEl) {
	    var parentEl = targetEl.parentNode;
	    if (parentEl.lastChild == targetEl) {
	        parentEl.appendChild(newEl);
	    } else {
	        parentEl.insertBefore(newEl, targetEl.nextSibling);
	    }
	    // targetEl.insertAdjacentElement("afterEnd", newEl);
	    return newEl;
	}

	/**
	 * 向当前元素的之前插入一个元素节点
	 * @param {Node} newEl 插入的节点
	 * @param {Node} targetEl 当前的节点
	 * @return {Node} 返回插入的节点
	 */
	function insertBefore(newEl, targetEl) {
	  // let parentEl = targetEl.parentNode;
	  targetEl.insertAdjacentElement("beforeBegin", newEl);
	  //parentEl.insertBefore(newEl, targetEl);
	  return newEl;
	}

	/**
	 * 元素是否是str所值的元素
	 * @param {Element} ele 比对的元素
	 * @param {String} str  元素的字符串  #id   .class  aa[data-id=aa] [data-id]
	 */
	function eleEqualStr(ele, str) {
	    var eleString = str;
	    //判断属性是否相同
	    //判断 [data-id] [data-id=aa] 是否正确
	    if (str.indexOf("[") >= 0 && str.indexOf("]") > 0) {
	        var isb = onlyAttrbuite();
	        if (!isb) return false;
	        //[data-id] [data-id=aa]
	        if (str.indexOf("[") == 0 && str.indexOf("]") === str.length - 1 && isb) return true;
	        eleString = str.slice(0, str.indexOf("["));
	    }
	    //id的情况
	    if (eleString.charAt(0) === "#" && ele.id === eleString.slice(1)) {
	        return true;
	        //class的情况
	    } else if (eleString.charAt(0) === "." && hasClass(ele, eleString.slice(1))) {
	        return true;
	        //标签的情况
	    } else if (ele.nodeName && ele.nodeName.toUpperCase() === str.toUpperCase()) {
	        return true;
	    }
	    //判断 [data-id] [data-id=aa] 是否正确
	    function onlyAttrbuite() {
	        var ary = getTagName(str.slice(str.indexOf("[")));
	        //[data-id]
	        if (ele.getAttribute(ary[0]) && ary[1] === null) return true;
	        // [data-id=aa]
	        if (ary[1] && ele.getAttribute(ary[0]) && ele.getAttribute(ary[0]) === ary[1]) return true;
	        return false;
	    }
	    return false;
	}
	/**
	 * 解析出属性名称和值
	 * @param {string} str [data-id=11]  [data-id] [data-id='a']
	 * @return {Array<string>} [0]属性名称 [1]属性值 之不存在为null
	 */
	function getTagName(str) {
	    if (str.charAt(0) === "[" && str.indexOf(']') === str.length - 1) {
	        str = str.slice(1, -1);
	    }
	    var strAry = str.split("=");
	    if (strAry.length === 2) {
	        if (strAry[1].charAt(0) === "'" || strAry[1].charAt(0) === '"') {
	            strAry[1] = strAry[1].slice(1, -1);
	        }
	        return strAry;
	    }
	    strAry.push(null);
	    return strAry;
	}

	/**
	 * 返回指定的父级元素
	 * @param {Element} ele 当前元素
	 * @param {string} tag 返回元素的名
	 * @return {Element | null} 返回指定的元素，没有则返回null
	 */
	function parent(ele, tag) {
	    if (!tag || tag.length <= 0) return null;
	    var d = ele.parentElement;
	    do {
	        if (eleEqualStr(d, tag)) {
	            return d;
	        }
	        if (d.nodeName === "HTML") return null;
	        d = d.parentElement;
	    } while (d);
	    return null;
	}

	/**
	 * 返回指定的父级元素集合
	 * @param {Element} ele 当前元素
	 * @param {string} tag 返回元素的名
	 * @return {Element<Element|undefined>} 返回指定的元素集合，没有则返回[]
	 */
	function parents(ele, tag) {
	    var d = ele.parentElement,
	        eleAry = [];
	    if (!tag || tag.length <= 0) return eleAry;
	    do {
	        if (eleEqualStr(d, tag)) {
	            eleAry.push(d);
	        }
	        if (d.nodeName === "HTML") return eleAry;
	        d = d.parentElement;
	    } while (d);
	    return eleAry;
	}

	/**
	 * 获取元素的偏移量 相对计算 相对于上一个定位元素的计算
	 * @param {Node} Node 当前元素节点
	 * @param {Element} ele 终止的节点
	 * @return {object} {top:top,left:left}
	      * @param {number} top 元素节点离顶部的距离
	      * @param {number} left 元素节点离左部的距离
	 */
	function getOffset(Node, ele) {
	    var offset = { top: 0, left: 0 };
	    offsets(Node, offset);
	    function offsets(Node, offset) {
	        if (ele && Node === ele || Node == document.body || !Node) {
	            //当该节点为body节点时，结束递归        
	            return offset;
	        }
	        offset.top += Node.offsetTop;
	        offset.left += Node.offsetLeft;
	        return offsets(Node.offsetParent, offset); //向上累加offset里的值
	    }
	    return offset;
	}

	/**
	 * 获取元素偏移的滚动条距离 相对计算 相对于上一个定位元素的计算
	 * @param {Element} ele 当前元素
	 * @return {object} {top:top,left:left}
	      * @param {number} top 元素节点离顶部的滚动条距离
	      * @param {number} left 元素节点离左部的滚动条距离
	 */
	function getOffsetScroll(ele) {
	    var scroll = { left: 0, top: 0 };
	    var offsetParent = ele.offsetParent;
	    while (ele !== offsetParent) {
	        scroll.top += ele.scrollTop;
	        scroll.left += ele.scrollLeft;
	        ele = ele.parentElement;
	    }
	    return scroll;
	}

	/**
	 * 获取元素偏移的滚动条距离 相对计算 相对于html的滚动条的距离
	 * @param {Element} ele 当前元素
	 * @return {object} {top:top,left:left}
	      * @param {number} top 元素节点离顶部的滚动条距离
	      * @param {number} left 元素节点离左部的滚动条距离
	 */
	function AllScroll(ele) {
	    var scroll = { left: 0, top: 0 };
	    while (ele) {
	        scroll.top += ele.scrollTop;
	        scroll.left += ele.scrollLeft;
	        ele = ele.parentElement;
	    }
	    return scroll;
	}

	/**
	 * 获取元素偏移的滚动条距离 绝对计算 相对于body的计算
	 * @param {Element} ele 当前元素
	 * @return {object} {top:top,left:left}
	      * @param {number} top 元素节点离顶部的滚动条距离
	      * @param {number} left 元素节点离左部的滚动条距离
	 */
	function getoffsetAndScroll(ele) {
	    var scroll = { left: 0, top: 0 };
	    while (ele) {
	        if (ele !== document.body) {
	            scroll.top += ele.offsetTop - ele.scrollTop;
	            scroll.left += ele.offsetLeft - ele.scrollLeft;
	        }
	        ele = ele.offsetParent;
	    }
	    // scroll.top += document.querySelector("html").scrollTop + document.querySelector("body").scrollTop;
	    // scroll.left += document.querySelector("html").scrollLeft + document.querySelector("body").scrollLeft;
	    return scroll;
	}

	/**
	* 数组元素交换位置
	* @param {array} arr 数组
	* @param {number} index1 添加项目的位置
	* @param {number} index2 删除项目的位置
	* @return {array} 返回交换后的数组
	* index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
	*/
	function swapArray(arr, index1, index2) {
	    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
	    return arr;
	}

	/**
	 * 删除元素 兼容IE
	 * @param {Element} ele 需要删除的元素
	 */
	function remove(ele) {
	    if (ele.removeNode) {
	        ele.removeNode(true);
	    } else {
	        ele.remove();
	    }
	}

	/**
	 * 返回指定的子级元素集合
	 * @param {Element} ele 当前元素
	 * @param {string} tag 返回元素的名
	 * @return {Element<Element|undefined>} 返回指定的元素集合，没有则返回[]
	 */
	function find(ele, tag) {
	    var eleAry = [];
	    function recursion(ele, tag) {
	        var childrenAll = ele.children;
	        if (childrenAll.length > 0) {
	            for (var i = 0; i < childrenAll.length; i++) {
	                if (eleEqualStr(childrenAll[i], tag)) {
	                    eleAry.push(childrenAll[i]);
	                }
	                recursion(childrenAll[i], tag);
	            }
	        }
	    }
	    recursion(ele, tag);
	    return eleAry;
	}

	var fxClass$2 = function fxClass() {
	    _classCallCheck(this, fxClass);

	    [isEl, isTextNode, createEl, textContent, appendContent, normalizeContent, throwIfWhitespace, classRegExp, hasClass, setTableInnerHTML, show, hide, toggle, siblings, removeClass, addClass, insertAfter, insertBefore, parent, parents, getOffset, getOffsetScroll, AllScroll, getoffsetAndScroll, swapArray, remove, find].forEach(function (k) {
	        for (var i in k) {
	            if (fxClass.prototype[i]) ;
	            fxClass.prototype[i] = k[i];
	        }
	    });
	};

	var dom = /*#__PURE__*/Object.freeze({
		default: fxClass$2,
		isEl: isEl,
		isTextNode: isTextNode,
		createEl: createEl,
		textContent: textContent,
		appendContent: appendContent,
		normalizeContent: normalizeContent,
		throwIfWhitespace: throwIfWhitespace,
		classRegExp: classRegExp,
		hasClass: hasClass,
		setTableInnerHTML: setTableInnerHTML,
		show: show,
		hide: hide,
		toggle: toggle,
		siblings: siblings,
		removeClass: removeClass,
		addClass: addClass,
		insertAfter: insertAfter,
		insertBefore: insertBefore,
		parent: parent,
		parents: parents,
		getOffset: getOffset,
		getOffsetScroll: getOffsetScroll,
		AllScroll: AllScroll,
		getoffsetAndScroll: getoffsetAndScroll,
		swapArray: swapArray,
		remove: remove,
		find: find
	});

	/**
	 * 判断是否是字符串
	 * @param value 值
	 */
	function isString(value) {
	  return Object.prototype.toString.call(value) === "[object String]";
	}

	///<reference path="../../indexModel.d.ts" />
	/**
	 * NodeList转为数组
	 * @param {NodeList} nodes 对象数组类型
	 * @return {Array} 转化后的数组
	 */
	function NodeListToArray(nodes) {
	    var array = null;
	    try {
	        array = Array.prototype.slice.call(nodes, 0);
	    } catch (ex) {
	        array = new Array();
	        for (var i = 0, len = nodes.length; i < len; i++) {
	            array.push(nodes[i]);
	        }
	    }
	    return array;
	}

	var $JSON$1 = _core.JSON || (_core.JSON = { stringify: JSON.stringify });
	var stringify = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON$1.stringify.apply($JSON$1, arguments);
	};

	var stringify$1 = createCommonjsModule(function (module) {
	module.exports = { "default": stringify, __esModule: true };
	});

	var _JSON$stringify = unwrapExports(stringify$1);

	function pySegSort(arr, arr1) {
	    if (!String.prototype.localeCompare) return null;
	    var letters = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	    var zh = "阿八嚓哒额发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
	    var en = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	    var reg = new RegExp("^[a-zA-Z]");
	    var segs = [];
	    var objs = {};
	    var curr = void 0;
	    var index = 0;
	    each(letters, function (value, i) {
	        curr = { letter: value, data: [], id: [] };
	        if (value !== "I" && value !== "U" && value !== "V") {
	            each(arr, function (val, item) {
	                if (i <= 0 && arr1 && arr1[item]) {
	                    objs[val] = arr1[item];
	                }
	                if ((!zh[index - 1] || zh[index - 1].localeCompare(val) <= 0) && val.localeCompare(zh[index]) == -1) {
	                    curr.data.push(val);
	                }
	                if (reg.test(val) && en[i - 1] && val[0].toUpperCase() === en[i - 1]) {
	                    curr.data.push(val);
	                }
	            });
	            index++;
	        } else {
	            each(arr, function (val, item) {
	                if (reg.test(val) && en[i - 1] && val[0].toUpperCase() === en[i - 1]) {
	                    curr.data.push(val);
	                }
	            });
	        }
	        if (curr.data.length) {
	            segs.push(curr);
	            curr.data.sort(function (a, b) {
	                return a.localeCompare(b);
	            });
	            if (_JSON$stringify(objs) !== "{}") {
	                each(curr.data, function (vals) {
	                    var dataId = objs[vals] ? objs[vals] : 0;
	                    curr.id.push(dataId);
	                });
	            }
	        }
	    });
	    return segs;
	}

	var fxClass$3 = function fxClass() {
	    _classCallCheck(this, fxClass);

	    [isObject, getDataType, each, isPlain, isString, NodeListToArray, pySegSort].forEach(function (k) {
	        for (var i in k) {
	            if (fxClass.prototype[i]) ;
	            fxClass.prototype[i] = k[i];
	        }
	    });
	};

	var obj = /*#__PURE__*/Object.freeze({
		default: fxClass$3,
		isObject: isObject,
		getDataType: getDataType,
		each: each,
		isPlain: isPlain,
		isString: isString,
		NodeListToArray: NodeListToArray,
		pySegSort: pySegSort
	});

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	var $Object$1 = _core.Object;
	var defineProperty$1 = function defineProperty(it, key, desc) {
	  return $Object$1.defineProperty(it, key, desc);
	};

	var defineProperty$2 = createCommonjsModule(function (module) {
	module.exports = { "default": defineProperty$1, __esModule: true };
	});

	unwrapExports(defineProperty$2);

	var createClass = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _defineProperty2 = _interopRequireDefault(defineProperty$2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();
	});

	var _createClass = unwrapExports(createClass);

	/**
	 * 发布订阅模式
	 */
	var events = function () {
	    function events() {
	        _classCallCheck(this, events);

	        this.clientList = {};
	    }
	    /**
	    * 添加订阅者
	    * @param {string} key 订阅名称
	    * @param {Function} fn 订阅的函数
	    */


	    _createClass(events, [{
	        key: "listen",
	        value: function listen(key, fn) {
	            if (!this.clientList[key]) {
	                this.clientList[key] = new Array();
	            }
	            this.clientList[key].push(fn);
	        }
	        /**
	         * 发送消息
	         * @param {string} key 订阅名称
	         * @param {any} arg 函数的参数
	         */

	    }, {
	        key: "trigger",
	        value: function trigger(key) {
	            var _this = this;

	            for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                arg[_key - 1] = arguments[_key];
	            }

	            if (!this.clientList[key] || this.clientList[key].length === 0) {
	                return;
	            }
	            this.clientList[key].forEach(function (fn) {
	                fn.apply(_this, arg);
	            });
	        }
	        /**
	         * 取消订阅事件
	         * @param {string} key 订阅名称
	         * @param {function} fn 取消的函数 不传等于清空里面的所有的方法
	         */

	    }, {
	        key: "remove",
	        value: function remove(key, fn) {
	            if (!this.clientList[key]) {
	                return;
	            }
	            if (!fn) {
	                this.clientList[key].length = 0;
	                return;
	            }
	            for (var i = this.clientList[key].length - 1; i >= 0; i--) {
	                if (this.clientList[key][i] == fn) {
	                    this.clientList[key].splice(i, 1);
	                }
	            }
	        }
	    }]);

	    return events;
	}();
	/**
	 * 动态安装 发布-订阅功能
	 */


	var installEvents = function installEvents() {
	    var obj = new events();
	    return obj;
	};

	var subscrible = /*#__PURE__*/Object.freeze({
		installEvents: installEvents
	});

	var log = function log(value) {
	    console.log(value);
	};

	var popup = function popup(value) {
	    alert(value);
	};

	var fxClass$4 = function fxClass() {
	    _classCallCheck(this, fxClass);

	    [log, popup].forEach(function (k) {
	        for (var i in k) {
	            if (fxClass.prototype[i]) ;
	            fxClass.prototype[i] = k[i];
	        }
	    });
	};

	var log$1 = /*#__PURE__*/Object.freeze({
		default: fxClass$4,
		log: log,
		popup: popup
	});

	/**
	 * 解析出属性名称和值
	 * @param {string} str [data-id=11]  [data-id] [data-id='a']
	 * @return {Array<string>} [0]属性名称 [1]属性值 之不存在为null
	 */
	function getTagName$1(str) {
	    if (str.charAt(0) === "[" && str.indexOf(']') === str.length - 1) {
	        str = str.slice(1, -1);
	    }
	    var strAry = str.split("=");
	    if (strAry.length === 2) {
	        if (strAry[1].charAt(0) === "'" || strAry[1].charAt(0) === '"') {
	            strAry[1] = strAry[1].slice(1, -1);
	        }
	        return strAry;
	    }
	    strAry.push(null);
	    return strAry;
	}

	/**
	 * 获取指定的所有对象
	 * @param {String} str 元素的字符串名称
	 * @return {Array<Element>} 返回对象的数组
	 */
	function dom$1(str) {
	    if (!str || str.length <= 0) return "";
	    if (/\[object HTML.*Element\]/.test(Object.prototype.toString.call(str))) return str;
	    if (isString(str)) {
	        if (str === "window") return window;
	        if (str === "document") return document;
	        if (str.indexOf('[') >= 0 && str.indexOf(']') > 0) {
	            var strAry = getTagName$1(str.slice(str.indexOf('[')));
	            if (strAry[1] !== null) {
	                var strValue = "'" + strAry[1] + "'";
	                str = str.slice(0, str.indexOf('[')) + "[" + strAry[0] + "=" + strValue + "]";
	            }
	        }
	        return document.querySelectorAll(str);
	    } else {
	        return str;
	    }
	}

	var event = installEvents(); //没有代理对象的缓存
	/**
	 * 兼容 e.path方法
	 * @param {Event} e 需要获取的指针
	 */
	function eventsPath(e) {
	    var ev = e || event;
	    if (ev.path || ev.composedPath) return ev.path || ev.composedPath && ev.composedPath();
	    var Ary = [];
	    var ele = ev.target || ev.srcElement;
	    while (ele) {
	        Ary.push(ele);
	        ele = ele.parentElement;
	    }
	    return Ary;
	}

	///<reference path="../../indexModel.d.ts" />
	function LoopBinding(ele, cb) {
	    if (/\[object HTML.*Element\]/.test(ele)) ele = [ele];
	    for (var i = 0; i < ele.length; i++) {
	        (function (i) {
	            cb(i);
	        })(i);
	    }
	}
	/**
	 * 解除绑定
	 * @param {listenDataModel} data
	    * @param {String | Element} agent 代理对象
	    * @param {Stirng} events 触发的方法
	    * @param {Stirng} ele 事件对象
	    * @param {Function} fn 事件方法
	 * @return {Element} 事件对象
	 * @example
	 *      fx.off({
	    *          agent:document,
	    *          events:"click",
	    *          ele:".aa",
	    *          fn:function(){fx.log(1)}
	    *          })
	    */
	function off(data) {
	    var agentDom = Object.prototype.toString.call(data.agent) === "[object String]" ? dom$1(data.agent)[0] : data.agent;
	    var events = dom$1(data.ele);
	    //有代理元素
	    if (data.agent) {
	        removeEvent(agentDom, data.events, data.fn);
	    } else {
	        //没有代理元素的情况
	        LoopBinding(events, function (i) {
	            removeEvent(events[i], data.events, data.fn);
	        });
	    }
	}

	///<reference path="../../indexModel.d.ts" />
	var event$1 = installEvents(); //没有代理对象的缓存
	function LoopBinding$1(ele, cb) {
	    if (/\[object HTML.*Element\]/.test(ele)) ele = [ele];
	    for (var i = 0; i < ele.length; i++) {
	        (function (i) {
	            cb(i);
	        })(i);
	    }
	}
	/**
	 * 绑定方法
	 * @param {listenDataModel} data
	    * @param {String | Element} agent 代理对象
	    * @param {Stirng} events 触发的方法
	    * @param {Stirng} ele 事件对象
	    * @param {Function} fn 事件方法
	 * @return {Element} 事件对象
	 * @example
	 *      fx.on({
	 *          agent:document,
	 *          events:"click",
	 *          ele:".aa",
	 *          fn:function(){fx.log(1)}
	 *          })
	 */
	function on(data) {
	    if (!data.fn) return;
	    var agentDom = dom$1(data.agent);
	    var events = dom$1(data.ele);
	    //有代理元素
	    if (data.agent) {
	        if (agentDom) if (/\[object HTML.*Element\]/.test(agentDom)) agentDom = [agentDom];
	        (function (data) {
	            LoopBinding$1(agentDom, function (i) {
	                addEvent(agentDom[i], data.events, function (e) {
	                    var ev = e || event$1;
	                    var path = eventsPath(ev);
	                    for (var _i = 0; _i < path.length; _i++) {
	                        if (path[_i] === this) return;
	                        if (path[_i].nodeName === "#document") return;
	                        if (NodeListToArray(this.querySelectorAll(data.ele)).indexOf(path[_i]) >= 0) {
	                            data.fn(path[_i], ev);
	                        }
	                    }
	                });
	            });
	        })(data);
	    } else {
	        //没有代理元素的情况
	        if (/\[object HTML.*Element\]/.test(events)) events = [events];
	        (function (data) {
	            LoopBinding$1(events, function (i) {
	                addEvent(events[i], data.events, function (e) {
	                    var ev = e || event$1;
	                    var path = eventsPath(ev);
	                    data.fn(path, ev);
	                });
	            });
	        })(data);
	    }
	}

	/**
	 * 只执行一次的放
	 * @param {Element} dom  元素
	 * @param {String} event  方法名称
	 * @param {Function} callback 执行的方法
	 */
	function once(dom, event, callback) {
	    var handle = function handle() {
	        callback();
	        dom.removeEventListener(event, handle);
	    };
	    dom.addEventListener(event, handle);
	}

	var fxClass$5 = function fxClass() {
	    _classCallCheck(this, fxClass);

	    [dom$1, eleEqualStr, eventsPath, getTagName$1, off, on, once].forEach(function (k) {
	        for (var i in k) {
	            if (fxClass.prototype[i]) ;
	            fxClass.prototype[i] = k[i];
	        }
	    });
	};

	var event$2 = /*#__PURE__*/Object.freeze({
		default: fxClass$5,
		dom: dom$1,
		eleEqualStr: eleEqualStr,
		eventsPath: eventsPath,
		getTagName: getTagName$1,
		off: off,
		on: on,
		once: once
	});

	var requestNextAnimationFrames = function () {
	    var originalWebkitRequestAnimationFrame = undefined,
	        wrapper = undefined,
	        geckoVersion = 0,
	        userAgent = navigator.userAgent,
	        index = 0,
	        self = this;
	    // Workaround for Chrome 10 bug where Chrome
	    // does not pass the time to the animation function
	    if (window$1.webkitRequestAnimationFrame) {
	        // Define the wrapper
	        wrapper = function wrapper(time) {
	            if (time === undefined) {
	                time = +new Date();
	            }
	            self.callback(time);
	        };
	        // Make the switch
	        originalWebkitRequestAnimationFrame = window$1.webkitRequestAnimationFrame;
	        window$1.webkitRequestAnimationFrame = function (callback, element) {
	            self.callback = callback;
	            // Browser calls the wrapper and wrapper calls the callback
	            originalWebkitRequestAnimationFrame(wrapper, element);
	        };
	    }
	    // Workaround for Gecko 2.0, which has a bug in
	    // mozRequestAnimationFrame() that restricts animations
	    // to 30-40 fps.
	    if (window$1.mozRequestAnimationFrame) {
	        // Check the Gecko version. Gecko is used by browsers
	        // other than Firefox. Gecko 2.0 corresponds to
	        // Firefox 4.0.
	        index = userAgent.indexOf('rv:');
	        if (userAgent.indexOf('Gecko') != -1) {
	            geckoVersion = userAgent.substr(index + 3, 3);
	            if (geckoVersion === '2.0') {
	                // Forces the return statement to fall through
	                // to the setTimeout() function.
	                window$1.mozRequestAnimationFrame = undefined;
	            }
	        }
	    }
	    return window$1.requestAnimationFrame || window$1.webkitRequestAnimationFrame || window$1.mozRequestAnimationFrame || window$1.oRequestAnimationFrame || window$1.msRequestAnimationFrame || function (callback, element) {
	        var start, finish;
	        window$1.setTimeout(function () {
	            start = +new Date();
	            callback(start);
	            finish = +new Date();
	            self.timeout = 1000 / 60 - (finish - start);
	        }, self.timeout);
	    };
	}();
	// requestAnimationFrame 的上下文必须是window才能执行
	var requestNextAnimationFrame = requestNextAnimationFrames.bind(window$1);

	var requestNextAnimationFrame$1 = /*#__PURE__*/Object.freeze({
		requestNextAnimationFrame: requestNextAnimationFrame
	});

	var promise = function () {
	    if (!window$1.Promise) {
	        var _Promise = function () {
	            function _Promise() {
	                for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
	                    arg[_key] = arguments[_key];
	                }

	                _classCallCheck(this, _Promise);

	                var that = this;
	                var process = arg[0];
	                that.cache = []; //缓存有的then catch方法
	                that.msg = "";
	                that.enum = {
	                    padding: "padding",
	                    resolve: "resolve",
	                    reject: "reject"
	                };
	                that.status = that.enum.padding;
	                process(function () {
	                    that.status = "resolve";
	                    that.msg = arguments[0];
	                    that.method();
	                }, function () {
	                    that.status = that.enum.reject;
	                    that.msg = arguments[0];
	                    that.method();
	                });
	                return that;
	            }

	            _createClass(_Promise, [{
	                key: "method",
	                value: function method() {
	                    var that = this;
	                    for (var i = that.cache.length; i > 0; i--) {
	                        var obj = that.cache.shift();
	                        if (obj.type === that.status) {
	                            try {
	                                var msg = obj.fn(that.msg);
	                                that.status = that.enum.resolve;
	                                //在then 或者 catch 的返回值 是否是new Promise;
	                                if (!!msg && msg.constructor === _Promise) {
	                                    msg.msg = that.msg;
	                                    msg.cache = that.cache;
	                                    msg.status = that.status;
	                                    return;
	                                } else {
	                                    that.msg = msg;
	                                }
	                            } catch (e) {
	                                that.msg = e;
	                                that.status = "reject";
	                            }
	                        }
	                    }
	                    return that;
	                }
	            }, {
	                key: "then",
	                value: function then() {
	                    for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                        arg[_key2] = arguments[_key2];
	                    }

	                    if (this.status == this.enum.padding) {
	                        this.cache.push({ type: this.enum.resolve, fn: arg[0] });
	                    } else if (this.status == this.enum.resolve) {
	                        this.msg = arg[0](this.msg);
	                    } else if (this.status == this.enum.reject && arg[1]) {
	                        this.msg = arg[1](this.msg);
	                    }
	                    return this;
	                }
	            }, {
	                key: "catch",
	                value: function _catch(callback) {
	                    if (this.status == this.enum.padding) {
	                        this.cache.push({ type: this.enum.reject, fn: callback });
	                    } else if (this.status == this.enum.reject) {
	                        callback(this.msg);
	                    }
	                    return this;
	                }
	            }]);

	            return _Promise;
	        }();

	        _Promise.resolve = function () {
	            for (var _len3 = arguments.length, arg = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	                arg[_key3] = arguments[_key3];
	            }

	            if (arg.length <= 0) {
	                return new _Promise(function (resolve, reject) {
	                    resolve();
	                });
	            } else {
	                if (arg[0].constructor === _Promise) {
	                    return arg[0];
	                } else {
	                    return new _Promise(function (resolve, reject) {
	                        resolve(arg[0]);
	                    });
	                }
	            }
	        };
	        _Promise.reject = function (data) {
	            return new _Promise(function (resolve, reject) {
	                reject(arguments);
	            });
	        };
	        _Promise.all = function (data) {
	            return new _Promise(function (resolve, reject) {
	                var promises = Object.prototype.toString.call(data) !== "[object Array]" ? [data] : data;
	                var promiseNum = promises.length;
	                var resolvedCounter = 0;
	                var resolvedValues = [];

	                var _loop = function _loop() {
	                    var index = i;
	                    _Promise.resolve(promises[index]).then(function (value) {
	                        resolvedCounter++;
	                        resolvedValues[index] = value;
	                        if (resolvedCounter == promiseNum) {
	                            return resolve(resolvedValues);
	                        }
	                    }, function (e) {
	                        return reject(e);
	                    });
	                };

	                for (var i = 0; i < promiseNum; i++) {
	                    _loop();
	                }
	            });
	        };
	        return _Promise;
	    }
	    return window$1.Promise;
	}();

	var promise$1 = /*#__PURE__*/Object.freeze({
		promise: promise
	});

	exports.compatible = compatible;
	exports.browser = browser;
	exports.computedStyle = computedStyle$1;
	exports.dom = dom;
	exports.obj = obj;
	exports.subscrible = subscrible;
	exports.log = log$1;
	exports.requestNextAnimationFrame = requestNextAnimationFrame$1;
	exports.event = event$2;
	exports.promise = promise$1;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
