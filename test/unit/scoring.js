import { bayesFactors, _nlogp_to_z2 } from '../../src/app/scoring';

function _runScenarios (scenarios, method) {
    // Helper method for running tests
    scenarios.forEach(([input, expectedResult]) => {
        assert.equal(
            method(input),
            expectedResult,
            `Calculation on ${input} did not produce the expected result`
        );
    });
}

describe('scoring module', () => {
    describe('_nlogp_to_z2 helper method', () => {
        it('should apply an approximation for very small p-values (large -log p)', () => {
            // TODO: We are currently testing the approx method against its own output. Compare to, eg, Ryan's
            //  reference implementation or some other better test case
            const scenarios = [
                // Approximation kicks in for nlogp > 300 (eg 10^-300), as hard-coded in the method
                [301, 1378.3703817437945],
                [500, 2293.539806469403],
                [1000, 4592.9604716091235]
            ];
            _runScenarios(scenarios, _nlogp_to_z2)
        });
        it('should calculate using a direct method for moderate or large p-values (small -log p)', () => {
            // For exact method, the actual values are based on comparison to same calculation in R
            const scenarios = [
                [ -Math.log10(.99), 0.00015708785790970235],
                [ -Math.log10(.05), 3.8414588206941263],
                [ -Math.log10(1e-8), 32.841253361236781],
                [ -Math.log10(1e-299), 1369.27081130834995] // Just below the approximation cutoff
            ];
            scenarios.forEach(([pval, expectedZ]) => {
                assert.approximately(
                    _nlogp_to_z2(pval),
                    expectedZ,
                    1e-6,
                    `p-value ${pval} did not produce the expected result`
                );
            });
        })
    });
    describe('bayesFactors scoring function', () => {
        it('should validate arguments', () => {
            assert.throws(
                () => bayesFactors('not array'),
                'Must provide a non-empty array of pvalues'
            )
        });
        it('should return valid results as-is for moderate z2 values', () => {
            // These values can all be calculated directly without triggering a cap on exp(Z^2)
            // The actual values are from the same calc in R

            // TODO: Fails in safari browser test runner due to floating point differences. This is difficult to
            //  coerce with a single closeTo tolerance due to the range of exponents involved
            const nlogpvals = [.004, 8, 100, 308];
            assert.sameOrderedMembers(
                bayesFactors(nlogpvals),
                [1.0000660203407197, 13532796.675777487, 3.736696775229979e+98, 1.993909075987322e+306]
            );
        });
        it('should return valid results (and apply a cap if z2 would otherwise be too large)', () => {
            // exp(x) blows up when x > 709, which corresponds to Z**2 ~ 1418, or -logP ~= 309. If the set contains
            //   one or more pvalues above this cutoff, expect the result of this method to reduce each term to below
            //   a cap (Even terms that did not exceed the cap are reduced in a consistent fashion, so they are
            //   calculated differently than if the cap is not present)

            // These "Actual" values are drawn directly from the output of this method
            const nlogpvals = [.004, 8, 100, 308, 310];
            assert.sameOrderedMembers(
                bayesFactors(nlogpvals),
                [0.15260371129827402, 2065018.6637328179, 5.701961513521979e+97, 3.0425783778086066e+305, 3.023383144276055e+307]
            );

            // For a truly ginormous range, the cap causes some z2/2 terms to become negative, so the calc
            //   becomes exp(-value) and those bayes factors go to zero.
            // Is this the desired behavior?
            //   Note that our use case is credible set calculations, so when scores were ranked, the part that
            //  survived the cap really would probably dominate anyway
            const reallybigvals = [2525, 3535, 4545, 5555, 6565, 7510, 8510, 9595];
            assert.sameOrderedMembers(
                bayesFactors(reallybigvals),
                [0, 0, 0, 0, 0, 0, 0, 3.023383144276055e+307]
            );
        });
        it('should be able to return raw values, like infinity, if the cap is not applied', function() {
            const nlogpvals = [-Math.log10(.05), -Math.log10(1e-8), 310];
            const withCap = bayesFactors(nlogpvals, true);
            const noCap = bayesFactors(nlogpvals, false);

            assert.notInclude(withCap, Infinity, 'Capped calculations should not be able to return infinity');
            assert.include(noCap, Infinity, 'Uncapped calculations should be able to return infinity');
        });
    });
});
