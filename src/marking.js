/** @module marking */

/**
 * Given a set of raw per-element score statistics, determine which contribute most to total posterior probability,
 * and are thus members of the credible set.
 * @param {Number[]} statistics Calculated statistics used to rank the credible set (eg raw bayes factors)
 * @param {Number} [cutoff=0.95] Keep taking items until we have accounted for >= this fraction of the total probability
 * @return {Number[]} An array with posterior probabilities (for the items in the credible set), and zero for all
 *   other elements
 *  This array should be the same length as the provided statistic array
 */
function findCredibleSet(statistics, cutoff=0.95) {
    // Type checking
    if (!Array.isArray(statistics) || !statistics.length) {
        throw 'Statistics must be a non-empty array';
    }
    if (!(typeof cutoff === 'number' ) || cutoff < 0 || cutoff > 1.0 || Number.isNaN(cutoff)) {
        throw 'Cutoff must be a number between 0 and 1';
    }

    const statsTotal = statistics.reduce((a, b) => a + b, 0);
    if (statsTotal <= 0) {
        throw 'Sum of provided statistics must be > 0';
    }

    // Sort the statistics by largest first, while preserving a map to original item order
    const sortedStatsMap = statistics
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
 * Analyze a set of probabilities and return booleans indicating which items contribute to the credible set.
 *
 * This is a helper method for, eg, visualizing the members of the credible set by raw membership.
 *
 * @param {Number[]} statistics Calculated statistics used to rank the credible set (eg raw bayes factors)
 * @param {Number} [cutoff=0.95] Keep taking items until we have accounted for >= this fraction of the total probability
 * @return {Boolean[]} An array of booleans identifying whether or not each item is in the credible set
 *  This array should be the same length as the provided statistics array
 */
function markCredibleSetBoolean(statistics, cutoff=0.95) {
    const setMembers = findCredibleSet(statistics, cutoff);
    return setMembers.map(item => !!item);
}

/**
 * Analyze a set of probabilities and return a fraction saying how much each item contributes to the credible set.
 *   For example, if a single item accounts for 96% of total probabilities, then for the 95% credible set,
 *   that item would be scaled to "1.0" (because it alone represents the entire credible set and then some).
 *
 * This is a helper method for, eg, visualizing the relative significance of contributions to the credible set.
 *   For example, when a gradient must be specified in advance and is not auto-determined by the range of the data.
 *
 * @param {Number[]} statistics Calculated statistics used to rank the credible set (eg raw bayes factors)
 * @param {Number} [cutoff=0.95] Keep taking items until we have accounted for >= this fraction of the total probability
 * @return {Number[]} An array of numbers representing the fraction of credible set probabilities this item accounts for.
 *  This array should be the same length as the provided statistics array
 */
function markCredibleSetScaled(statistics, cutoff=0.95) {
    const setMemberScores = findCredibleSet(statistics, cutoff);
    const sumMarkers = setMemberScores.reduce((a, b) => a + b, 0);
    return setMemberScores.map(item => item / sumMarkers);
}

const rollup = { findCredibleSet, markCredibleSetBoolean, markCredibleSetScaled };
export default rollup;
export { findCredibleSet, markCredibleSetBoolean, markCredibleSetScaled };
