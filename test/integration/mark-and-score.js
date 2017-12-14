import { bayesFactors, posteriorProbabilities } from '../../src/scoring';
import { markCredibleSetBoolean } from '../../src/marking';

describe('Workflow for scoring a credible set from the LocusZoom API', () => {
    it('should correctly mark the credible set for the default cutoff', () => {
        // Confirm that we get the expected:
        // - Posterior probabilities (indiv bayes factor / sum of all factors in the range)
        // - Set members (boolean markers of in / out)


        // A section of some data from ~20kb region of RBMS1 ("2:161207765_A/C" - "2:161227027_A/C", build 37)
        const nlogpvals = [
            4.24413, 1.19382, 0.05061, 0.136677, 5.19382,
            0.00877392, 1.92082, 0.0409586, 0.200659, 4.79588,
            0.49485, 0.638272, 0.136677, 5.18046, 0.0861861,
            1.22915, 0.60206, 0.187087, 1.95861, 0.481486,
            0.853872, 0.60206, 5.08092, 0.244125, 1.95861,
            0.886057, 0.49485, 0.508638, 0.408935, 0.853872,
            0.468521, 5.03621, 0.0555173, 0.508638, 1.79588,
            0.251812, 1.74473, 5.18709, 0.522879, 1.95861,
            0.318759, 1.48149, 5.07572, 1.92082, 1.74473,
            1.72125, 2.0655, 0.39794, 0.638272, 0.376751,
            1.72125, 0.443698, 5.49485, 0.455932, 0.327902,
            0.136677, 5.24413, 2.06048, 5.16749, 0.481486,
            1.61979, 0.346787, 0.366532, 0.327902
        ];

        const expectedPosteriorProbabilities = [
            0.01275279853142161, 0.0000215177520464831, 0.000003908513939917798, 0.000004108873544494392, 0.10232776686546649,
            0.000003872527639485511, 0.00009083369540291329, 0.000003896123402473609, 0.0000043475964038197, 0.04265232127614625,
            0.000006347534145709762, 0.000007956773920858207, 0.000004108873544494392, 0.09936000264268048, 0.0000039728413252683606,
            0.000023017023399668318, 0.0000075025657969511544, 0.00000429110212259494, 0.00009812648822330631, 0.000006221692892841704,
            0.000011502597144437211, 0.0000075025657969511544, 0.0798042757409496, 0.0000045491222387521515, 0.00009812648822330631,
            0.0000121806192019704, 0.000006347534145709762, 0.000006481361709880276, 0.000005601663808105951, 0.000011502597144437211,
            0.000006103172687037059, 0.07232689733679412, 0.000003915680163694672, 0.000006481361709880276, 0.00007045894672210592,
            0.000004588005267313319, 0.0000635402027324492, 0.10082181777813123, 0.000006623942141622674, 0.00009812648822330631,
            0.0000049680388222240336, 0.00003758069738060259, 0.0788961799991916, 0.00009083369540291329, 0.0000635402027324492,
            0.00006060383792728234, 0.00012219552252059913, 0.000005516570297538568, 0.000007956773920858207, 0.000005358859714488034,
            0.00006060383792728234, 0.000005885787531712431, 0.19878186311171384, 0.000005991380435004075, 0.000005025781757071165,
            0.000004108873544494392, 0.11432462190583034, 0.00012093953982287832, 0.09656155279101145, 0.000006221692892841704,
            0.000049447519669415135, 0.000005149597222620156, 0.000005285702571383635, 0.000005025781757071165
        ];

        const expectedSetMembers = [
            false, false, false, false, true,
            false, false, false, false, true,
            false, false, false, true, false,
            false, false, false, false, false,
            false, false, true, false, false,
            false, false, false, false, false,
            false, true, false, false, false,
            false, false, true, false, false,
            false, false, true, false, false,
            false, false, false, false, false,
            false, false, true, false, false,
            false, true, false, true, false,
            false, false, false, false
        ];

        const scores = bayesFactors(nlogpvals);
        const actualPosterior = posteriorProbabilities(scores);
        const actualMarkers = markCredibleSetBoolean(scores);
        assert.sameOrderedMembers(actualPosterior, expectedPosteriorProbabilities, 'Expected posterior probabilities do not match');
        assert.sameOrderedMembers(actualMarkers, expectedSetMembers, 'Expected credible set members do not match');
    });
});
