## gwas-credible-sets
A package for calculating Bayes factors and credible sets from genome-wide association study (GWAS) results.

![Build Status](https://github.com/statgen/gwas-credible-sets/workflows/Unit%20tests/badge.svg?branch=develop)

## Synopsis

This package provides functions for calculating Bayes factors and credible sets using p-values from GWAS results. These functions can be used separately, or combined with [locuszoom.js] for interactive credible set visualization.

LocusZoom implements [a simple procedure](https://statgen.github.io/gwas-credible-sets/method/locuszoom-credible-sets.pdf) based on this package. See the usage instructions, below, for an example. In the future, additional methods for identifying and annotating credible sets may be provided.

## Usage
### How to include in your project
This package may be directly incorporated into other javascript projects as a module, or by including `dist/gwas-credible-sets.min.js` directly into your page (as a standalone file, or via a CDN option such as unpkg).

`gwas-credible-sets` also supports several packaging environments and may be used in both client and server side applications, including Node.js, ES6 modules, and Webpack. It may be installed from NPM:

`npm install --save gwas-credible-sets`

For information about performance impacts of client-side computation, see [timing and performance estimates](https://github.com/statgen/gwas-credible-sets/src/docs/timings.md).

### Sample credible set calculation
The instructions below assume that the module is being sourced directly into a page:

`<script src="https://cdn.example/gwas-credible-sets.min.js" type="application/javascript"></script>`

The example below assumes that you are given an array of p-values, each representing a different data point. It returns a set of booleans saying whether each data point is a member of the 95% credible set.

```javascript
    /// Calculate Bayes factors and process into a form that can be used for the credible set
    var scores = gwasCredibleSets.scoring.bayesFactors(nlogpvals);
    var posteriorProbabilities = gwasCredibleSets.scoring.normalizeProbabilities(scores);
    // Identify the credible set and apply filters for visualization
    var credibleSet = gwasCredibleSets.marking.findCredibleSet(posteriorProbabilities, 0.95);
    var credibleSetBoolean = gwasCredibleSets.marking.markBoolean(credibleSet);
```

The `marking` module contains several helper functions to control how the credible set is returned. Helper methods are provided to process the set member  (posterior probabilities) in ways that support visualization needs. See full documentation for details.

## Development
### Requirements
This package has been developed and tested using Node.js 8 LTS (Carbon).

If you would like to make changes to the core functionality within this module for development, install package requirements as follows:

`npm install`

Some portions of the documentation (such as methods) require `pandoc` and a working `LaTeX` installation on your system; you must install these separately.

### Useful Commands

The following commands are particularly useful during development
- `npm test`: run unit tests and exit
- `npm run watch`: auto-run tests whenever code changes
- `npm run build`: build `dist/` files and update documentation

[locuszoom.js]: https://github.com/statgen/locuszoom
