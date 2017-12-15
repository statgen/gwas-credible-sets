import { findCredibleSet, markBoolean, rescaleCredibleSet } from '../../src/marking';

describe('marking module', () => {
    describe('findCredibleSet', function() {
        it('should validate argument values', function() {
            // These calls should be accepted with no errors
            findCredibleSet([1.0], 1.0);
            findCredibleSet([1.0], 0.01);
            findCredibleSet([1.0], 0.99);

            // Check the first argument
            const badStatisticsValues = [
                [[], 1.0],
                ['not an array', 1.0]
            ];
            const badStatisticsMessage = /Probs must be a non-empty array/;
            badStatisticsValues.forEach(args => {
                assert.throws(
                    () => findCredibleSet(...args),
                    badStatisticsMessage,
                    null,
                    `Stats validation expected error for arguments ${args.toString()}`
                );
            });
            assert.throws(
                () => findCredibleSet([0, 0, 0]),
                /Sum of provided probabilities must be > 0/,
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
            badCutoffValues.forEach(args => {
                assert.throws(
                    () => findCredibleSet(...args),
                    badCutoffMessage,
                    null,
                    `Cutoff validation expected error for arguments ${args.toString()}`
                );
            });
        });
        it('should correctly identify the credible set', () => {
            const scores = [.02, .05, 15, .01, 12, .03, 7, 6.9];
            const result = findCredibleSet(scores);
            assert.sameOrderedMembers(
                result,
                [
                    0,
                    0,
                    0.365764447695684,
                    0,
                    0.2926115581565472,
                    0,
                    0.1706900755913192,
                    0.16825164594001465,
                ]
            );
        });
    });
    it('should flag at least one item as in the set, even if that item alone exceeds the entire cutoff', () => {
        // When one item accounts for the entire variation
        let statistics = [0, .99, 0];
        let credibleSet = findCredibleSet(statistics, 0.95);
        let setCount = credibleSet
            .filter(item => (item !== 0))
            .length;
        assert.equal(setCount, 1, 'Only one result should be marked as in credible set');
        assert.isTrue(credibleSet[1] !== 0);

        // When one item accounts for more than the cutoff, though not 100% of it
        statistics = [0, .99, .01];
        credibleSet = findCredibleSet(statistics, 0.95);
        setCount = credibleSet
            .filter(item => item)
            .length;
        assert.equal(setCount, 1, 'Only one result should be marked as in credible set');
        assert.isTrue(credibleSet[1] !== 0);
    });
    describe('markBoolean', function () {
        it('should return an array of booleans', () => {
            const credibleSet = [.1, .6, 0, .3];
            const result = markBoolean(credibleSet);

            assert.isArray(result);
            assert.equal(result.length, credibleSet.length);
            assert.isTrue(result.every(item => typeof item === 'boolean'));
        });
        it('should correctly identify the credible set', () => {
            const statistics = [.02, .05, 15, .01, 12, .03, 7, 6.9];
            const credibleSet = findCredibleSet(statistics);
            assert.sameOrderedMembers(
                markBoolean(credibleSet),
                [false, false, true, false, true, false, true, true]
            );
        });
        it('should give a smaller credible set when cutoff is lower', () => {
            const statistics = [.02, .05, 15, .01, 12, .03, 7, 6.9];
            const credibleSet = findCredibleSet(statistics, 0.80);
            assert.sameOrderedMembers(
                markBoolean(credibleSet),
                [false, false, true, false, true, false, true, false]
            );
        });
    });
    describe('rescaleCredibleSet', function() {
        it('should correctly identify the credible set and scale results', () => {
            const scores = [.02, .05, 15, .01, 12, .03, 7, 6.9];
            const credibleSet = findCredibleSet(scores);
            const result = rescaleCredibleSet(credibleSet);
            assert.sameOrderedMembers(
                result,
                [
                    0,
                    0,
                    0.36674816625916873,
                    0,
                    0.293398533007335,
                    0,
                    0.17114914425427874,
                    0.1687041564792176
                ]
            );
            // This method should scale the scores that are returned so the total sum = 1
            const sumScores = result.reduce((a, b) => a + b, 0);
            assert.equal(sumScores, 1.0);
        })
    });
});
