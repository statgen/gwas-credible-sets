import { ninv } from '../../src/stats';

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

describe('stats module', () => {
    describe('ninv method', () => {
        it ('should fail on unrealistic values', () => {
            const scenarios = [
                [
                    // Outside domain the method should be able to handle
                    -.01, 0, 1.0, 1.01,
                    // Small numbers that trigger JS floating point limits
                    1e-324, 867e-5309
                ]
            ];
            scenarios.forEach(item => {
                assert.throws(
                    () => ninv(item),
                    'Not implemented',
                    null,
                    `Expected error for calculation using ${item}`
                );
            });
        });
        it('should return correct results for various cases', () => {
            // TODO: Test fails in safari browser test runner due to very slight floating point differences
            // "Actual" values are taken from qnorm function in R as an independent reference implementation
            const scenarios = [
                [0.5, 0],
                [0.96, 1.7506860712521695],
                [.99, 2.32634787404084],
                [1e-8, -5.61200124417479],
                [1e-300, -37.0470962993612]
            ];
            _runScenarios(scenarios, ninv);
        });
    });
});
