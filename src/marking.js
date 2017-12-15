/** 
 * @module marking 
 * @license MIT
 */

/**
 * Given an array of probabilities, determine which elements of the array fall within the X% credible set, 
 * where X is the cutoff value. 
 * 
 * Return a mask of `probs`, where values for elements that do not belong to the credible set are set to 0. 
 * 
 * @param {Number[]} probs Calculated probabilities used to rank the credible set.
 * @param {Number} [cutoff=0.95] Keep taking items until we have accounted for >= this fraction of the total probability.
 *  For example, 0.95 would represent the 95% credible set. 
 * @return {Number[]} A mask of the `probs` array, showing the originally provided value for items in the credible
 *  set, and zero for items not in the set.
 *  This array is the same length as the provided probabilities array.
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
 * Given an array of probabilities, determine which elements of the array fall within the X% credible set, 
 * where X is the cutoff value. 
 *
 * Returns a boolean array, where true denotes membership in the credible set, false otherwise. 
 * 
 * This is a helper method used when visualizing the members of the credible set by raw membership.
 *
 * @param {Number[]} probs Calculated probabilities used to rank the credible set.
 * @param {Number} [cutoff=0.95] Keep taking items until we have accounted for >= this fraction of the total probability
 * @return {Boolean[]} An array of booleans identifying whether or not each item is in the credible set.
 *  This array is the same length as the provided probabilities array.
 */
function markCredibleSetBoolean(probs, cutoff=0.95) {
    const setMembers = findCredibleSet(probs, cutoff);
    return setMembers.map(item => !!item);
}

/**
 * Given an array of probabilities, determine which elements fall in the X% credible set, then rescale
 * the probabilities within only the credible set to their total sum. 
 * 
 * Example for 95% credible set: [0.92, 0.06, 0.02] -> [0.938, 0.061, 0]. The first two elements here
 * belong to the credible set, the last element does not. 
 *
 * This is a helper method for visualizing the relative significance of contributions to the credible set.
 *
 * @param {Number[]} probs Calculated probabilities used to rank the credible set.
 * @param {Number} [cutoff=0.95] Keep taking items until we have accounted for >= this fraction of the total probability
 * @return {Number[]} An array of numbers representing the fraction of credible set probabilities this item accounts for.
 *  This array is same length as the provided probabilities array.
 */
function markCredibleSetScaled(probs, cutoff=0.95) {
    const setMemberScores = findCredibleSet(probs, cutoff);
    const sumMarkers = setMemberScores.reduce((a, b) => a + b, 0);
    return setMemberScores.map(item => item / sumMarkers);
}

const rollup = { findCredibleSet, markCredibleSetBoolean, markCredibleSetScaled };
export default rollup;
export { findCredibleSet, markCredibleSetBoolean, markCredibleSetScaled };
