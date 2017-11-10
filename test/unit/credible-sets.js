import { marking, scoring, stats } from '../../src/credible-sets';

describe('credibleSets top-level module', () => {
    it('should expose the rollup default export of child modules where appropriate', () => {
        assert.typeOf(marking, 'object');
        assert.typeOf(scoring, 'object');
        assert.typeOf(stats, 'object');
    });
});
