# Timing information

Performing computationally intensive calculations in the front end has both advantages and drawbacks.

Below are estimates of approximate best and worst case runtime for the credible set methods used in this code,
based on a profiling script available in this repo. All calculations were performed on a 2015 MacBook Pro.


| Description                                   | Total time (ms) | Time per run (avg, ms) |
| --------------------------------------------- | ----------------| ---------------------- |
| SMALL- All calcs use slow exact method        | 673.677         | 0.674                  |
| MEDIUM- All calcs use slow exact method       | 3708.360        | 3.708                  |
| LARGE- All calcs use slow exact method        | 26276.295       | 26.276                 |
| SMALL- All calcs use slow exact method + cap  | 663.508         | 0.664                  |
| MEDIUM- All calcs use slow exact method + cap | 3770.359        | 3.770                  |
| LARGE- All calcs use slow exact method + cap  | 26833.548       | 26.834                 |
| SMALL- All calcs use fast approx              | 380.717         | 0.381                  |
| MEDIUM- All calcs use fast approx             | 2161.285        | 2.161                  |
| LARGE- All calcs use fast approx              | 17001.494       | 17.001                 |
| SMALL- Mix of fast and slow                   | 384.202         | 0.384                  |
| MEDIUM- Mix of fast and slow                  | 2124.657        | 2.125                  |
| LARGE- Mix of fast and slow                   | 15182.065       | 15.182                 |
