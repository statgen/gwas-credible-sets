/**
 * Given a set of raw statistics, determine which of them lie above a specified cutoff and are therefore members of the
 *  credible set.
 * @param {Number[]} statistics Calculated statistics used to rank the credible set; these positions
 *  should map to the same array indices as `data`
 * @param {Number} [cutoff=0.95] Only mark values above this cutoff to be in the credible set
 * @return {boolean[]} An array of booleans tagging whether each provided statistic is a member of the credible set
 *  This array should be the same length as the provided statistic array
 */
function markCredibleSet(statistics, cutoff=0.95) {
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
    const result = new Array(sortedStatsMap.length).fill(false);
    for (let i = 0; i < sortedStatsMap.length; i++) {
        let [value, index] = sortedStatsMap[i];

        if (runningTotal < cutoff) {
            result[index] = true;
            runningTotal += value / statsTotal;
        } else {
            break;
        }
    }
    return result;
}

const rollup = { markCredibleSet };
export default rollup;
export { markCredibleSet };
