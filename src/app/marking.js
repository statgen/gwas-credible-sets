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
function findCredibleSet(probs, cutoff=0.95) {
    // Type checking
    if (!Array.isArray(probs) || !probs.length) {
        throw 'Probs must be a non-empty array';
    }
    if (!(typeof cutoff === 'number' ) || cutoff < 0 || cutoff > 1.0 || Number.isNaN(cutoff)) {
        throw 'Cutoff must be a number between 0 and 1';
    }

    const statsTotal = probs.reduce((a, b) => a + b, 0);
    if (statsTotal <= 0) {
        throw 'Sum of provided probabilities must be > 0';
    }

    // Sort the probabilities by largest first, while preserving a map to original item order
    const sortedStatsMap = probs
        .map((item, index) => [item, index])
        .sort((a, b) => (b[0] - a[0]));

    let runningTotal = 0;
    const result = new Array(sortedStatsMap.length).fill(0);
    for (let i = 0; i < sortedStatsMap.length; i++) {
        let [value, index] = sortedStatsMap[i];
        if (runningTotal < cutoff) {
            // Convert from a raw score to posterior probability by dividing the item under consideration
            //  by sum of all probabilities.
            const score = value / statsTotal;
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
    return credibleSetMembers.map(item => !!item);
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
    const sumMarkers = credibleSetMembers.reduce((a, b) => a + b, 0);
    return credibleSetMembers.map(item => item / sumMarkers);
}

const rollup = { findCredibleSet, markBoolean, rescaleCredibleSet };
export default rollup;
export { findCredibleSet, markBoolean, rescaleCredibleSet };
