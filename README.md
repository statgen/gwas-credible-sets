
**gwas-credible-sets**: A package for calculating Bayes factors and credible sets from genome-wide association study (GWAS) results. 

[![Travis build status](http://img.shields.io/travis/statgen/credible-sets.svg?style=flat)](https://travis-ci.org/statgen/credible-sets)
[![Code Climate](https://codeclimate.com/github/statgen/credible-sets/badges/gpa.svg)](https://codeclimate.com/github/statgen/credible-sets)
[![Test Coverage](https://codeclimate.com/github/statgen/credible-sets/badges/coverage.svg)](https://codeclimate.com/github/statgen/credible-sets)
[![Dependency Status](https://david-dm.org/statgen/credible-sets.svg)](https://david-dm.org/statgen/credible-sets)
[![devDependency Status](https://david-dm.org/statgen/credible-sets/dev-status.svg)](https://david-dm.org/statgen/credible-sets#info=devDependencies)

## Synopsis

This package provides functions for calculating Bayes factors and credible sets using p-values from GWAS results. These functions are currently used in [locuszoom.js] and are used for credible set visualization. 

[locuszoom.js] uses these functions currently to implement the following procedure: 

1. For each variant, calculate a Bayes factor from the p-value (or -log10 p-value). 
2. Normalize each Bayes factor to the sum of all Bayes factors in a region to calculate the posterior probability that a variant is causal. 
3. Identify which variants belong to a X% credible set given their posterior probabilities. 

## Requirements

This package has been developed and tested using node 8 LTS (Carbon).

## Installation

Install package requirements as follows:

`npm install`

## Commands

- `npm test`
- `npm run lint`
- `npm run watch`
- `npm run test-browser`
- `npm run build`
- `npm run coverage`

[locuszoom.js]: https://github.com/statgen/locuszoom
