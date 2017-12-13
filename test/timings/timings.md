# Timing information

Performing computationally intensive calculations in the front end has both advantages and drawbacks.

Below are estimates of approximate best and worst case runtime for the credible set methods used in this code,
based on a profiling script available in this repo. All calculations were performed on a 2015 MacBook Pro.


| Description                                   | Total time (ms) | Time per run (avg, ms) |
| --------------------------------------------- | ----------------| ---------------------- |
| SMALL- All calcs use slow exact method        | 591.881         | 0.592                  |
| MEDIUM- All calcs use slow exact method       | 3125.162        | 3.125                  |
| LARGE- All calcs use slow exact method        | 23701.764       | 23.702                 |
| SMALL- All calcs use slow exact method + cap  | 553.445         | 0.553                  |
| MEDIUM- All calcs use slow exact method + cap | 3188.145        | 3.188                  |
| LARGE- All calcs use slow exact method + cap  | 23539.543       | 23.540                 |
| SMALL- All calcs use fast approx              | 325.722         | 0.326                  |
| MEDIUM- All calcs use fast approx             | 1990.112        | 1.990                  |
| LARGE- All calcs use fast approx              | 15543.108       | 15.543                 |
| SMALL- Mix of fast and slow                   | 348.681         | 0.349                  |
| MEDIUM- Mix of fast and slow                  | 1975.571        | 1.976                  |
| LARGE- Mix of fast and slow                   | 13816.441       | 13.816                 |
