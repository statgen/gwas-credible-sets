import { minKodos } from '../../src/scoring';
import { markCredibleSet } from '../../src/marking';

describe('Workflow for scoring a credible set from the LocusZoom API', () => {
    const nlogpvals = [];

    it.skip('should correctly mark the credible set for the default cutoff', () => {
        const scores = minKodos(nlogpvals);
        const markersForSet = markCredibleSet(scores);

        assert.sameOrderedMembers(markersForSet, []);
    });
});
