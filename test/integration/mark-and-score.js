import { bayesFactors } from '../../src/scoring';
import { markCredibleSetBoolean } from '../../src/marking';

describe('Workflow for scoring a credible set from the LocusZoom API', () => {
    const nlogpvals = [];

    it.skip('should correctly mark the credible set for the default cutoff', () => {
        const scores = bayesFactors(nlogpvals);
        const markersForSet = markCredibleSetBoolean(scores);

        assert.sameOrderedMembers(markersForSet, []);
    });
});
