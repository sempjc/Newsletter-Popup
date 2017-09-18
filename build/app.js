(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _popup = require('./popup');

var _popup2 = _interopRequireDefault(_popup);

var _popupNewsletter = require('./popup-newsletter');

var _popupNewsletter2 = _interopRequireDefault(_popupNewsletter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('testing');
var test = new _popupNewsletter2.default();

var LS = window.localStorage;

// Configuration Option for the application
var configuration = {
    delay: 180000,
    elem: 'entrepids-newsletter',
    lastTimeShow: '',
    waitInterval: 6,
    isSubscribed: false,
    initTime: new Date().getTime()
};

// Store data on localStorage
var populateStorage = function populateStorage(config) {
    LS.setItem('delay', config.delay);
    LS.setItem('elem', config.elem);
    LS.setItem('lastTimeShow', config.lastTimeShow);
    LS.setItem('waitInterval', config.waitInterval);
    LS.setItem('isSubscribed', config.isSubscribed);
    LS.setItem('initTime', config.initTime);
};

// Return an object with data rerieved from localStorage
var getConfig = function getConfig() {
    return {
        waitInterval: JSON.parse(LS.getItem('waitInterval')),
        isSubscribed: JSON.parse(LS.getItem('isSubscribed')),
        lastTimeShow: LS.getItem('lastTimeShow'),
        initTime: JSON.parse(LS.getItem('initTime'))
    };
};

var getPopupConfig = function getPopupConfig() {
    return {
        elem: LS.getItem('elem'),
        delay: JSON.parse(LS.getItem('delay'))
    };
};

// Return an estimated time in hours between the last time the popup was showed and current time
var getInterval = function getInterval(current, last) {
    if (last == 0) {
        return Math.abs((current - new Date()) / 36e5);
    } else {
        return Math.abs((current - new Date(last)) / 36e5);
    }
};

// Update lastTimeShow date
var resetNewsletterPopup = function resetNewsletterPopup() {
    console.log('lastShow ' + LS.getItem('lastTimeShow'));
    LS.setItem('lastTimeShow', new Date());
    LS.setItem('initTime', 0);
    LS.setItem('delay', configuration.delay);
};

// Calculate  and return in milisecond the time remaining for the delay when user navigate between pages
var setDelay = function setDelay(initTime, currentTime, delay) {
    var interval = currentTime - initTime;
    var remain = delay - interval;
    if (remain <= 0) {
        remain = 0;
    }
    return remain;
};

// Main Newsletter Popup function
var initNewsletterPopup = function initNewsletterPopup(conf) {
    if (LS.length === 0) {
        populateStorage(conf);
    }

    var d = getConfig();

    // If not Subscribed run Newsletter Popup app
    if (!d.isSubscribed) {
        var initTime = d.initTime == 0 ? new Date().getTime() : d.initTime;
        LS.setItem('initTime', initTime);

        var currentTime = new Date().getTime();
        var popupConfig = getPopupConfig();
        var delay = setDelay(initTime, currentTime, popupConfig.delay);
        var NewsletterPopup = new _popup2.default({
            elem: popupConfig.elem,
            delay: delay
        });

        // If popup never show before show popup
        // If already showed and time lapse is greater than 6 hr show popup
        var interval = getInterval(new Date(), d.lastTimeShow);

        console.log('interval ' + interval);

        if (interval === 0 || d.waitInterval <= interval) {
            setTimeout(function () {
                NewsletterPopup.showPopup(false);
                resetNewsletterPopup();
            }, delay);
        }
    } else {
        // If Subscribed delete storaged data
        LS.clear();
    }
};

initNewsletterPopup(configuration);

},{"./popup":4,"./popup-newsletter":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class helper for the Popup Class */
var PopupHelper = function () {
    function PopupHelper() {
        _classCallCheck(this, PopupHelper);
    }

    _createClass(PopupHelper, null, [{
        key: 'valinput',


        /**
         * @description Evaluate if value provided are the same type as specified by the type param.
         *
         * @param  { * } val - The value to be evaluate.
         * @param { string } type - Name of the data type expected.
         *
         * @return {boolean} True if validation pass and false when fail.
         */
        value: function valinput(val, type) {
            if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {

                switch (true) {

                    case Array.isArray(val):
                        return type === 'array';

                    case val === null:
                        return type === 'null';

                    default:
                        return type === 'object';
                }
            } else {
                return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === type;
            }
        }

        /**
         * @description Log error message with details of the failure.
         *
         * @param  { * } val - The value found..
         * @param { string } type - Name of the data type expected.
         */

    }, {
        key: 'logError',
        value: function logError(val, type) {
            var typeVal = typeof val === 'undefined' ? 'undefined' : _typeof(val);

            if (typeVal === 'object') {
                switch (true) {

                    case Array.isArray(val):
                        typeVal = 'array';
                        break;

                    case val === null:
                        typeVal = 'null';
                        break;

                    default:
                        typeVal = 'object';
                }
            }

            var msg = 'Value of "' + type + '" was expected. ' + 'But found "' + typeVal + '".\n';
            this.errormsg(msg);
        }

        /**
         * @description A combo method that combine valinput(val, type) and logError(val, type) into one function.
         * If the validation pass return the value, but when fail throw an error message.
         *
         * @param {*} val  - The value to be evaluate
         * @param {string} - Name of the data type expected.
         *
         * @return {*} When evaluation pass return the value of val, on fail error will be throw and nothing be returned.
         *
         */

    }, {
        key: 'valinCombo',
        value: function valinCombo(val, type) {
            if (this.valinput(val, type)) {
                return val;
            } else {
                this.logError(val, type);
            }
        }

        /**
         * @description Throw error message.
         *
         * @param { string } msg - The message to be throw.
         *
         */

    }, {
        key: 'errormsg',
        value: function errormsg(msg) {
            throw new Error(msg);
        }
    }]);

    return PopupHelper;
}();

exports.default = PopupHelper;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _popup = require('./popup');

var _popup2 = _interopRequireDefault(_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _private = new WeakMap();

var _NewsletterPopup = {
    delay: 180000,
    elem: 'entrepids-newsletter',
    lasTimeViewed: '',
    waitInterval: 6,
    isSubscribed: false,
    initCount: new Date().getTime()
};

var NewsletterPopup = function (_Popup) {
    _inherits(NewsletterPopup, _Popup);

    function NewsletterPopup(conf, storage) {
        _classCallCheck(this, NewsletterPopup);

        // Set Weak Map for private properties
        var _this2 = _possibleConstructorReturn(this, (NewsletterPopup.__proto__ || Object.getPrototypeOf(NewsletterPopup)).call(this));

        // Call to the parent class


        _private.set(_this2, _NewsletterPopup);
        var _this = _private.get(_this2);

        testConsole();
        _this.delay = 500;
        testConsole();

        return _this2;
    }

    return NewsletterPopup;
}(_popup2.default);

var _populateStorage = function _populateStorage(conf, storage) {
    storage.setItem('delay', conf.delay);
    storage.setItme('elem', conf.elem);
    storage.setItem('lastTimeShow', conf.lastTimeShow);
    storage.setItem('waitInterval', conf.waitInterval);
    storage.setItem('isSubscribed', conf.isSubscribed);
    storage.setItem('initCount', conf.initCount);
};

exports.default = NewsletterPopup;

},{"./popup":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _popupHelper = require('./popup-helper');

var _popupHelper2 = _interopRequireDefault(_popupHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** Class representing a Popup window */
var Popup = function () {

    /**
     * @param { object } [popup = {}] - Object with options.
     * @param { string } popup.elem - Name of the HTML Id ( without '#' ) of the Popup Window main tag.
     * @param { number } popup.delay - Amount of time to delay Popup window from appear or disappear.
     * @description Create a new Popup window.
     */
    function Popup() {
        var popup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Popup);

        if (_popupHelper2.default.valinput(popup, 'object') || _popupHelper2.default.valinput(popup, 'undefined')) {
            this.elem = popup.elem === undefined ? 'entrepids-popup' : _popupHelper2.default.valinCombo(popup.elem, 'string');
            this.delay = popup.delay === undefined ? 0 : _popupHelper2.default.valinCombo(popup.delay, 'number');
        } else {
            _popupHelper2.default.logError(popup, "object");
        }
    }

    /**
     * Display Popup Window on browser
     * @param {boolean} [isDelay = true] - Set true if you want to use the delay feature or false to disable.
     * By default is set true.
     */


    _createClass(Popup, [{
        key: 'showPopup',
        value: function showPopup() {
            var _this = this;

            var isDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            switch (isDelay) {
                case true:
                    window.setTimeout(function () {
                        document.getElementById(_this.elem).style.display = 'initial';
                    }, this.delay);
                    break;

                default:
                    document.getElementById(this.elem).style.display = 'initial';
            }
        }

        /**
         * Hide Popup Window on browser
         * @param {boolean} [isDelay = false] - Set true if you want to use the delay feature or false to disable.
         * By default is set false.
         */

    }, {
        key: 'hidePopup',
        value: function hidePopup() {
            var _this2 = this;

            var isDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            switch (isDelay) {
                case true:
                    window.setTimeout(function () {
                        document.getElementById(_this2.elem).style.display = 'none';
                    }, this.delay);
                    break;

                default:
                    document.getElementById(this.elem).style.display = 'none';
            }
        }
    }]);

    return Popup;
}();

exports.default = Popup;

},{"./popup-helper":2}]},{},[1]);
