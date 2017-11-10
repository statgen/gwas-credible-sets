import { markCredibleSet } from '../../src/marking';

describe('marking module', () => {
    describe('markCredibleSet', function () {
        it('should validate argument values', function() {
            // These calls should be accepted with no errors
            markCredibleSet([1.0], 1.0);
            markCredibleSet([1.0], 0.01);
            markCredibleSet([1.0], 0.99);

            // Check the first argument
            const badStatisticsValues = [
                [[], 1.0],
                ['not an array', 1.0]
            ];
            const badStatisticsMessage = /Statistics must be a non-empty array/;
            badStatisticsValues.forEach((args) => {
                assert.throws(
                    () => markCredibleSet(...args),
                    badStatisticsMessage,
                    null,
                    `Stats validation expected error for arguments ${args.toString()}`
                );
            });
            assert.throws(
                () => markCredibleSet([0, 0, 0]),
                /Sum of provided statistics must be > 0/,
                null,
                'Should avoid division by zero'
            );

            // Check the second argument
            const badCutoffMessage = /Cutoff must be a number between 0 and 1/;
            const badCutoffValues = [
                [[1.0], NaN],
                [[1.0], -0.01],
                [[1.0], -0.01],
                [[1.0], 1.01]

            ];
            badCutoffValues.forEach((args) => {
                assert.throws(
                    () => markCredibleSet(...args),
                    badCutoffMessage,
                    null,
                    `Cutoff validation expected error for arguments ${args.toString()}`
                );
            });
        });
        it('should return an array of booleans', () => {
            const statistics = [1, 7, 5, 3];
            const result = markCredibleSet(statistics);

            assert.isArray(result);
            assert.equal(result.length, statistics.length);
            assert.isTrue(result.every(item => typeof item === 'boolean'));
        });
        it('should flag at least one item as in the set, even if that item alone exceeds the entire cutoff', () => {
            // When one item accounts for the entire variation
            let statistics = [0, 2, 0];
            let result = markCredibleSet(statistics);
            let numberTrue = result
                .filter(item => (item===true))
                .length;
            assert.equal(numberTrue, 1, 'Only one result should be marked as in credible set');
            assert.isTrue(result[1]);

            // When one item accounts for more than the cutoff, though not 100% of it
            statistics = [0, 99, 1];
            result = markCredibleSet(statistics);
            numberTrue = result
                .filter(item => (item === true))
                .length;
            assert.equal(numberTrue, 1, 'Only one result should be marked as in credible set');
            assert.isTrue(result[1]);
        });
        it.skip('should correctly identify the credible set', () => {

        });
        it.skip('should respect varying cutoff values', () => {

        });
    });
});
