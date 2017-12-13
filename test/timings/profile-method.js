/**
 * A script to estimate the total runtime of credible set marking method. Run from this directory as:
 *  `node profile-method.js`
 */

/* eslint-disable no-console */

// Load the code
const credibleSets = require('../../dist/credible-sets');
const Table = require('cli-table');

const NS_PER_SEC = 1e9;

function genFakeNLOGPvals(n, min=0, max=299) {
    min += 0.00000000001; // -Log P can't be zero. This corresponds to a pvalue that someone could get fired for using, so is a safe minimum.
    const res = [];
    for (let i=0; i < n; i++) {
        res.push(Math.random() * (max - min) + min);
    }
    return res;
}

// Generic performance profiling boilerplate. Run repeatedly to avoid warmup effects etc.
function timeTask(func, args, nruns=1000) {
    const timeStart = process.hrtime();
    for (let i=0; i < nruns; i++) {
        func(...args);
    }
    const timeDiff = process.hrtime(timeStart);
    const totalTime = timeDiff[0] * NS_PER_SEC + timeDiff[1];
    return [totalTime, totalTime / nruns];
}

// A set of functions that get called to define a single test. Throws away result when done.
function runWorkflow(nlogpvals) {
    const scores = credibleSets.scoring.minKodos(nlogpvals);
    return credibleSets.marking.findCredibleSet(scores);
}

// Generate sample data and call profiling when ready
function profileScenario(nvariants, minp, maxp) {
    const inputData = genFakeNLOGPvals(nvariants, minp, maxp);
    return timeTask(runWorkflow, [inputData]);
}

// We will test several regimes where algorithm performance is expected to differ. Each scenario will feature
//      SMALL, MEDIUM, and LARGE sample sizes: 1k, 5k, and 30k sample sizes
// 1. All Z scores are calculated using ninv exact method (slower performance)- when -Log P < 300
//      a. Full range 0-300
//      b. Partial range 160-300 (when -Log P >~ 155, the scoring piece applies a cap to prevent large exp(Z^2)
// 2. All Z scores are calculated using ninv approximation (faster performance)- when -Log P >= 300 (use range 300-600)
// 3. Mix of fast and slow regimes: some pvals large, some small ( 0 < -Log P < 600)

const SMALL_RUN = 1e3;
const MEDIUM_RUN = 5e3;
const LARGE_RUN = 30e3;

const CAP_BIGEXP_THRESHOLD = 160;
const CAP_EXACT_NINV = 299;
const CAP_REALLYBIG_RANGE = 600;

const scenarios = [
    // Each scenario is a tuple of (description, n, minp, maxp).
    // 1a
    ['SMALL- All calcs use slow exact method', SMALL_RUN, 0, CAP_EXACT_NINV],
    ['MEDIUM- All calcs use slow exact method', MEDIUM_RUN, 0, CAP_EXACT_NINV],
    ['LARGE- All calcs use slow exact method', LARGE_RUN, 0, CAP_EXACT_NINV],
    // 1b
    ['SMALL- All calcs use slow exact method + cap', SMALL_RUN, CAP_BIGEXP_THRESHOLD, CAP_EXACT_NINV],
    ['MEDIUM- All calcs use slow exact method + cap', MEDIUM_RUN, CAP_BIGEXP_THRESHOLD, CAP_EXACT_NINV],
    ['LARGE- All calcs use slow exact method + cap', LARGE_RUN, CAP_BIGEXP_THRESHOLD, CAP_EXACT_NINV],
    // 2
    ['SMALL- All calcs use fast approx', SMALL_RUN, CAP_EXACT_NINV + 1, CAP_REALLYBIG_RANGE],
    ['MEDIUM- All calcs use fast approx', MEDIUM_RUN, CAP_EXACT_NINV + 1, CAP_REALLYBIG_RANGE],
    ['LARGE- All calcs use fast approx', LARGE_RUN, CAP_EXACT_NINV + 1, CAP_REALLYBIG_RANGE],
    // 3
    ['SMALL- Mix of fast and slow', SMALL_RUN, 0, CAP_REALLYBIG_RANGE],
    ['MEDIUM- Mix of fast and slow', MEDIUM_RUN, 0, CAP_REALLYBIG_RANGE],
    ['LARGE- Mix of fast and slow', LARGE_RUN, 0, CAP_REALLYBIG_RANGE],
];

// Final summary: Run each scenario and output a table report to the console
const table = new Table({
    head: ['Description', 'Total time (ms)', 'Time per run (avg, ms)']
});

// Hack: do a full profiling run before any individual sample, in order to avoid any sort of warmup effects
profileScenario(50e3, 0, CAP_REALLYBIG_RANGE);

console.time('profile_run');
scenarios.forEach(([desc, nsamples, minp, maxp]) => {
    const timings = profileScenario(nsamples, minp, maxp);
    let total, per;
    [total, per] = timings;
    total = (total / NS_PER_SEC * 1000).toFixed(3);
    per = (per / NS_PER_SEC * 1000).toFixed(3);
    table.push([desc, total, per]);
});

// eslint-disable-next-line no-console
console.log(table.toString());

console.timeEnd('profile_run');
