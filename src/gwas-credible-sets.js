/** 
 * Functions for calculating credible sets and Bayes factors from
 * genome-wide association study (GWAS) results. 
 * @module gwas-credible-sets 
 * @license MIT
 */

import stats from './stats';
import scoring from './scoring';
import marking from './marking';

// HACK: Because a primary audience is targets that do not have any module system, we will expose submodules from the
//  top-level module. (by representing each sub-module as a "rollup object" that exposes its internal methods)
// Then, submodules may be accessed as `window.gwasCredibleSets.stats`, etc

// If you are using a real module system, please import from sub-modules directly- these global helpers are a bit of
//  a hack and may go away in the future
export { scoring, stats, marking };
