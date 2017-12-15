/** @module scoring */

import { ninv } from './stats';


/**
 * Convert a -logp value to Z^2.
 *
 * Very large -logp (very small p values) cannot be converted to z by a direct method. These values
 *  are handled using an approximation: for small p-values, Z_i^2 has a linear relationship with -log10 p-value.
 *
 *  The cutoff on pvalues is ~ 10^-325
 *
 * @param nlogp
 * @return {number}
 * @private
 */
function _nlogp_to_z2(nlogp) {
    const p = Math.pow(10, -nlogp);
    if (nlogp < 300) {
        // Use exact method when within the range of 64-bit floats (approx 10^-323)
        return Math.pow(ninv(p / 2), 2);
    }
    else {
        // For very small p-values, -log10(pval) and z^2 have a linear relationship
        // This avoids issues with needing higher precision floats when doing the calculation
        // with ninv
        return (4.59884133027944 * nlogp) - 5.88085867031722
    }
}

/**
 * Calculate a probability statistic exp(Z^2 / 2) based on pvalues. If the Z-score is very large, the bayes factors
 *  can be calculated in an inexact (capped) manner that makes the calculation tractable but preserves comparisons
 * @param {Number[]} nlogpvals An array of -log(pvalue) entries
 * @param {Boolean} [cap=true] Whether to apply an inexact method. If false, some values in the return array may
 *  be represented as "Infinity", but the bayes factors will be directly calculated wherever possible.
 * @return {Number[]} An array of exp(Z^2 / 2) statistics
 */
function bayesFactors(nlogpvals, cap=true) {
    if (!Array.isArray(nlogpvals) || ! nlogpvals.length) {
        throw 'Must provide a non-empty array of pvalues';
    }

    // 1. Convert the pvalues to Z^2 / 2 values. Divide by 2 before applying the cap, because it means fewer values will
    //   need to be truncated. This does affect some of the raw bayes factors that are returned (when a cap is needed),
    //   but the resulting credible set contents / posterior probabilities are unchanged.
    let z2_2 = nlogpvals.map(item => _nlogp_to_z2(item) / 2);

    // 2. Calculate bayes factor, using a truncation approach that prevents overrunning the max float64 value for e**x
    //   (when x > 709 or so). As safeguard, we could (but currently don't) check that exp(x) is not larger
    //   than infinity.
    if (cap) {
        const capValue = Math.max(...z2_2) - 708; // The real cap is ~709; this should prevent any value from exceeding it
        if (capValue > 0) {
            z2_2 = z2_2.map(item => (item - capValue));
        }
    }
    return z2_2.map(item => Math.exp(item));
}

/**
 * Convert an array of raw per-element probability scores into posterior probabilities, dividing by the sum of all
 *   elements in the range.
 *
 * This is a helper function for visualization and analysis; most of the methods in this library will convert raw
 * scores to posterior probabilities internally.
 * @param {Number[]} scores An array of probability scores for all elements in the range
 * @returns {Number[]} Posterior probabilities
 */
function posteriorProbabilities(scores) {
    const sumValues = scores.reduce((a, b) => a + b, 0);
    return scores.map(item => item / sumValues);
}

const rollup = { bayesFactors, posteriorProbabilities };
export default rollup;
export { bayesFactors, posteriorProbabilities };

// Export additional symbols for unit testing only (not part of public interface for the module)
export { _nlogp_to_z2 };
