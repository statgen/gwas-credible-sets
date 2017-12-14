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
            0.0014491979044338908, 4.1258220951494166e-9, 1.361256699903888e-10, 1.5043962802188114e-10, 0.0933047369411837,
            1.3363054884204408e-10, 7.352087479345975e-8, 1.3526396308774654e-10, 1.6842832960678784e-10, 0.016210710259425054,
            3.5902673648315255e-10, 5.641449913982155e-10, 1.5043962802188114e-10, 0.0879710728853027, 1.4064332958518383e-10,
            4.720793659187109e-9, 5.015755124457493e-10, 1.6407952890050446e-10, 8.580038029708154e-8, 3.4493228093443625e-10,
            1.1789856506471428e-9, 5.015755124457493e-10, 0.05675041227711196, 1.8440466927117558e-10, 8.580038029708154e-8,
            1.3220729888575226e-9, 3.5902673648315255e-10, 3.7432533166076724e-10, 2.7960876467227405e-10, 1.1789856506471428e-9,
            3.31915868887229e-10, 0.0466139998355292, 1.3662529788960193e-10, 3.7432533166076724e-10, 4.42373388168153e-8,
            1.8757049110222056e-10, 3.5976084296200445e-8, 0.09057862975140592, 3.9097569519117703e-10, 8.580038029708154e-8,
            2.199311077586383e-10, 1.2584801500319076e-8, 0.055466230470185146, 7.352087479345975e-8, 3.5976084296200445e-8,
            3.2727810814424865e-8, 1.3305380092053527e-7, 2.711783496486904e-10, 5.641449913982155e-10, 2.558948090470717e-10,
            3.2727810814424865e-8, 3.0869234587787934e-10, 0.35210339565375315, 3.198677781058981e-10, 2.250732857075448e-10,
            1.5043962802188114e-10, 0.11646521891733588, 1.303326793240579e-7, 0.08308548929138902, 3.4493228093443625e-10,
            2.1787415894533812e-8, 2.3629972903154985e-10, 2.4895573942902156e-10, 2.250732857075448e-10
        ];

        const expectedSetMembers = [
            false, false, false, false, true,
            false, false, false, false, false,
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
        assert.sameOrderedMembers(
            actualPosterior,
            expectedPosteriorProbabilities,
            'Expected posterior probabilities do not match'
        );
        assert.sameOrderedMembers(actualMarkers, expectedSetMembers, 'Expected credible set members do not match');
    });
});
