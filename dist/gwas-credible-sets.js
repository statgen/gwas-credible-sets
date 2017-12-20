(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gwasCredibleSets"] = factory();
	else
		root["gwasCredibleSets"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/** 
 * @module stats 
 * @license MIT
 * */

/**
 * The inverse of the standard normal CDF. May be used to determine the Z-score for the desired quantile.
 *
 * This is an implementation of algorithm AS241:
 *     https://www.jstor.org/stable/2347330
 * 
 * @param {number} p The desired quantile of the standard normal distribution.
 * @returns {number}
 */
function ninv(p) {
    var SPLIT1 = 0.425;
    var SPLIT2 = 5.0;
    var CONST1 = 0.180625;
    var CONST2 = 1.6;
    var a = [3.3871328727963666080E0, 1.3314166789178437745E2, 1.9715909503065514427E3, 1.3731693765509461125E4, 4.5921953931549871457E4, 6.7265770927008700853E4, 3.3430575583588128105E4, 2.5090809287301226727E3];

    var b = [4.2313330701600911252E1, 6.8718700749205790830E2, 5.3941960214247511077E3, 2.1213794301586595867E4, 3.9307895800092710610E4, 2.8729085735721942674E4, 5.2264952788528545610E3];

    var c = [1.42343711074968357734E0, 4.63033784615654529590E0, 5.76949722146069140550E0, 3.64784832476320460504E0, 1.27045825245236838258E0, 2.41780725177450611770E-1, 2.27238449892691845833E-2, 7.74545014278341407640E-4];

    var d = [2.05319162663775882187E0, 1.67638483018380384940E0, 6.89767334985100004550E-1, 1.48103976427480074590E-1, 1.51986665636164571966E-2, 5.47593808499534494600E-4, 1.05075007164441684324E-9];

    var e = [6.65790464350110377720E0, 5.46378491116411436990E0, 1.78482653991729133580E0, 2.96560571828504891230E-1, 2.65321895265761230930E-2, 1.24266094738807843860E-3, 2.71155556874348757815E-5, 2.01033439929228813265E-7];

    var f = [5.99832206555887937690E-1, 1.36929880922735805310E-1, 1.48753612908506148525E-2, 7.86869131145613259100E-4, 1.84631831751005468180E-5, 1.42151175831644588870E-7, 2.04426310338993978564E-15];

    var q = p - 0.5;
    var r = void 0,
        x = void 0;

    if (Math.abs(q) < SPLIT1) {
        r = CONST1 - q * q;
        return q * (((((((a[7] * r + a[6]) * r + a[5]) * r + a[4]) * r + a[3]) * r + a[2]) * r + a[1]) * r + a[0]) / (((((((b[6] * r + b[5]) * r + b[4]) * r + b[3]) * r + b[2]) * r + b[1]) * r + b[0]) * r + 1.0);
    } else {
        if (q < 0) {
            r = p;
        } else {
            r = 1.0 - p;
        }

        if (r > 0) {
            r = Math.sqrt(-Math.log(r));
            if (r <= SPLIT2) {
                r -= CONST2;
                x = (((((((c[7] * r + c[6]) * r + c[5]) * r + c[4]) * r + c[3]) * r + c[2]) * r + c[1]) * r + c[0]) / (((((((d[6] * r + d[5]) * r + d[4]) * r + d[3]) * r + d[2]) * r + d[1]) * r + d[0]) * r + 1.0);
            } else {
                r -= SPLIT2;
                x = (((((((e[7] * r + e[6]) * r + e[5]) * r + e[4]) * r + e[3]) * r + e[2]) * r + e[1]) * r + e[0]) / (((((((f[6] * r + f[5]) * r + f[4]) * r + f[3]) * r + f[2]) * r + f[1]) * r + f[0]) * r + 1.0);
            }
        } else {
            throw 'Not implemented';
        }

        if (q < 0) {
            x = -x;
        }

        return x;
    }
}

// Hack: A single global object representing the contents of the module
var rollup = { ninv: ninv };

exports.ninv = ninv;
exports.default = rollup;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.marking = exports.stats = exports.scoring = undefined;

var _stats = __webpack_require__(0);

var _stats2 = _interopRequireDefault(_stats);

var _scoring = __webpack_require__(2);

var _scoring2 = _interopRequireDefault(_scoring);

var _marking = __webpack_require__(3);

var _marking2 = _interopRequireDefault(_marking);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// HACK: Because a primary audience is targets that do not have any module system, we will expose submodules from the
//  top-level module. (by representing each sub-module as a "rollup object" that exposes its internal methods)
// Then, submodules may be accessed as `window.gwasCredibleSets.stats`, etc

// If you are using a real module system, please import from sub-modules directly- these global helpers are a bit of
//  a hack and may go away in the future
exports.scoring = _scoring2.default;
exports.stats = _stats2.default;
exports.marking = _marking2.default; /** 
                                      * Functions for calculating credible sets and Bayes factors from
                                      * genome-wide association study (GWAS) results. 
                                      * @module gwas-credible-sets 
                                      * @license MIT
                                      */

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._nlogp_to_z2 = exports.normalizeProbabilities = exports.bayesFactors = undefined;

var _stats = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /** 
                                                                                                                                                                                                     * @module scoring 
                                                                                                                                                                                                     * @license MIT
                                                                                                                                                                                                     */

/**
 * Convert a -log10 p-value to Z^2.
 *
 * Very large -log10 p-values (very small p-values) cannot be converted to a Z-statistic directly in the browser due to
 *  limitations in javascript (64-bit floats.) These values are handled using an approximation:
 *  for small p-values, Z_i^2 has a linear relationship with -log10 p-value.
 *
 *  The approximation begins for -log10 p-values >= 300.
 *
 * @param nlogp
 * @return {number}
 * @private
 */
function _nlogp_to_z2(nlogp) {
    var p = Math.pow(10, -nlogp);
    if (nlogp < 300) {
        // Use exact method when within the range of 64-bit floats (approx 10^-323)
        return Math.pow((0, _stats.ninv)(p / 2), 2);
    } else {
        // For very small p-values, -log10(pval) and Z^2 have a linear relationship
        // This avoids issues with needing higher precision floats when doing the calculation
        // with ninv
        return 4.59884133027944 * nlogp - 5.88085867031722;
    }
}

/**
 * Calculate a Bayes factor exp(Z^2 / 2) based on p-values. If the Z-score is very large, the Bayes factors
 *  are calculated in an inexact (capped) manner that makes the calculation tractable but preserves comparisons.
 * @param {Number[]} nlogpvals An array of -log10(p-value) entries
 * @param {Boolean} [cap=true] Whether to apply an inexact method. If false, some values in the return array may
 *  be represented as "Infinity", but the Bayes factors will be directly calculated wherever possible.
 * @return {Number[]} An array of exp(Z^2 / 2) statistics
 */
function bayesFactors(nlogpvals) {
    var cap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (!Array.isArray(nlogpvals) || !nlogpvals.length) {
        throw 'Must provide a non-empty array of pvalues';
    }

    // 1. Convert the pvalues to Z^2 / 2 values. Divide by 2 before applying the cap, because it means fewer values will
    //   need to be truncated. This does affect some of the raw bayes factors that are returned (when a cap is needed),
    //   but the resulting credible set contents / posterior probabilities are unchanged.
    var z2_2 = nlogpvals.map(function (item) {
        return _nlogp_to_z2(item) / 2;
    });

    // 2. Calculate bayes factor, using a truncation approach that prevents overrunning the max float64 value
    //   (when Z^2 / 2 > 709 or so). As safeguard, we could (but currently don't) check that exp(Z^2 / 2) is not larger
    //   than infinity.
    if (cap) {
        var capValue = Math.max.apply(Math, _toConsumableArray(z2_2)) - 708; // The real cap is ~709; this should prevent any value from exceeding it
        if (capValue > 0) {
            z2_2 = z2_2.map(function (item) {
                return item - capValue;
            });
        }
    }
    return z2_2.map(function (item) {
        return Math.exp(item);
    });
}

/**
 * Normalize so that sum of all elements = 1.0. This method must be applied to bayes factors before calculating any
 *  credible set.
 *
 * @param {Number[]} scores An array of probability scores for all elements in the range
 * @returns {Number[]} Posterior probabilities
 */
function normalizeProbabilities(scores) {
    var sumValues = scores.reduce(function (a, b) {
        return a + b;
    }, 0);
    return scores.map(function (item) {
        return item / sumValues;
    });
}

var rollup = { bayesFactors: bayesFactors, normalizeProbabilities: normalizeProbabilities };
exports.default = rollup;
exports.bayesFactors = bayesFactors;
exports.normalizeProbabilities = normalizeProbabilities;

// Export additional symbols for unit testing only (not part of public interface for the module)

exports._nlogp_to_z2 = _nlogp_to_z2;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * @module marking
 * @license MIT
 */

/**
 * Given an array of probabilities, determine which elements of the array fall within the X% credible set,
 *   where X is the cutoff value.
 *
 * @param {Number[]} probs Calculated probabilities used to rank the credible set. This method will normalize the
 *   provided input to ensure that the values sum to 1.0.
 * @param {Number} [cutoff=0.95] Keep taking items until we have accounted for >= this fraction of the total probability.
 *  For example, 0.95 would represent the 95% credible set.
 * @return {Number[]} An array with posterior probabilities (for the items in the credible set), and zero for all
 *   other elements. This array is the same length as the provided probabilities array.
 */
function findCredibleSet(probs) {
    var cutoff = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.95;

    // Type checking
    if (!Array.isArray(probs) || !probs.length) {
        throw 'Probs must be a non-empty array';
    }
    if (!(typeof cutoff === 'number') || cutoff < 0 || cutoff > 1.0 || Number.isNaN(cutoff)) {
        throw 'Cutoff must be a number between 0 and 1';
    }

    var statsTotal = probs.reduce(function (a, b) {
        return a + b;
    }, 0);
    if (statsTotal <= 0) {
        throw 'Sum of provided probabilities must be > 0';
    }

    // Sort the probabilities by largest first, while preserving a map to original item order
    var sortedStatsMap = probs.map(function (item, index) {
        return [item, index];
    }).sort(function (a, b) {
        return b[0] - a[0];
    });

    var runningTotal = 0;
    var result = new Array(sortedStatsMap.length).fill(0);
    for (var i = 0; i < sortedStatsMap.length; i++) {
        var _sortedStatsMap$i = _slicedToArray(sortedStatsMap[i], 2),
            value = _sortedStatsMap$i[0],
            index = _sortedStatsMap$i[1];

        if (runningTotal < cutoff) {
            // Convert from a raw score to posterior probability by dividing the item under consideration
            //  by sum of all probabilities.
            var score = value / statsTotal;
            result[index] = score;
            runningTotal += score;
        } else {
            break;
        }
    }
    return result;
}

/**
 * Given a numeric [pre-calculated credible set]{@link #findCredibleSet}, return an array of booleans where true
 *   denotes membership in the credible set.
 *
 * This is a helper method used when visualizing the members of the credible set by raw membership.
 *
 * @param {Number[]} credibleSetMembers An array indicating contributions to the credible set, where non-members are
 *  represented by some falsy value.
 * @return {Boolean[]} An array of booleans identifying whether or not each item is in the credible set.
 *  This array is the same length as the provided credible set array.
 */
function markBoolean(credibleSetMembers) {
    return credibleSetMembers.map(function (item) {
        return !!item;
    });
}

/**
 * Visualization helper method for rescaling data to a predictable output range, eg when range for a color gradient
 *   must be specified in advance.
 *
 * Given an array of probabilities for items in a credible set, rescale the probabilities within only the credible
 *   set to their total sum.
 *
 * Example for 95% credible set: [0.92, 0.06, 0.02] -> [0.938, 0.061, 0]. The first two elements here
 * belong to the credible set, the last element does not.
 *
 * @param {Number[]} credibleSetMembers Calculated probabilities used to rank the credible set.
 * @return {Number[]} The fraction of credible set probabilities each item accounts for.
 *  This array is the same length as the provided credible set.
 */
function rescaleCredibleSet(credibleSetMembers) {
    var sumMarkers = credibleSetMembers.reduce(function (a, b) {
        return a + b;
    }, 0);
    return credibleSetMembers.map(function (item) {
        return item / sumMarkers;
    });
}

var rollup = { findCredibleSet: findCredibleSet, markBoolean: markBoolean, rescaleCredibleSet: rescaleCredibleSet };
exports.default = rollup;
exports.findCredibleSet = findCredibleSet;
exports.markBoolean = markBoolean;
exports.rescaleCredibleSet = rescaleCredibleSet;

/***/ })
/******/ ]);
});
//# sourceMappingURL=gwas-credible-sets.js.map