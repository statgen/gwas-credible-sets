import { marking, scoring, stats } from '../../src/gwas-credible-sets';

describe('gwasCredibleSets top-level module', () => {
    it('should expose the rollup default export of child modules where appropriate', () => {
        assert.typeOf(marking, 'object');
        assert.typeOf(scoring, 'object');
        assert.typeOf(stats, 'object');
    });
});
