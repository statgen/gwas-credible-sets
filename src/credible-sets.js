import stats from './stats';
import scoring from './scoring';
import marking from './marking';


// HACK: Because a primary audience is targets that do not have any module system, we will expose submodules from the
//  top-level module. (by representing each sub-module as a "rollup object" that exposes its internal methods)
// Then, submodules may be accessed as `window.credibleSets.stats`, etc

// If you are using a real module system, please import from sub-modules directly- these global helpers are a bit of
//  a hack any may go away in the future
// TODO: Revisit, because exporting an aggregate this way might lose some of the benefits of real modules down the line
export { scoring, stats, marking };
