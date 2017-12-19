# Credible sets in LocusZoom

## Method

This method is a quick and simple approach that only requires the variant p-values. It is fast enough to recalculate on the fly as the viewable region changes.

1. Calculate a Bayes factor given $-log_{10} \text{ p-value}$ for each variant:

    $$
    \begin{aligned}
      p &= 10^{-log_{10}\text{ p-value}} &\text{(convert back to p-value)} \\
      z &= F^{-1}(\frac{p}{2}) &\text{(inverse CDF for standard normal)} \\
      BF_{i} &= e^{Z^{2}/2} &\text{(Bayes factor)}
    \end{aligned}
    $$

    The Bayes factor arises from the likelihood ratio:

    $$
    \begin{aligned}
    BF &= \frac{P(x|H_1)}{P(x|H_0)} \\ &=
    \frac{P(x|\mu=x,\sigma)}{P(x|\mu=0,\sigma)} \\ &=
    \frac{e^{-(\frac{x-x}{\sigma})^2/2}}{e^{-(\frac{x-0}{\sigma})^2/2}} \\ &=
    \frac{1}{e^{-(\frac{x}{\sigma})^2/2}} \\ &=
    e^{(\frac{x}{\sigma})^2/2} \\ &=
    e^{Z^2/2}
    \end{aligned}
    $$

    Unfortunately, it is possible to see very small p-values (as extreme as $10^{-500}$ or even smaller.) JS does not natively support > 64-bit float (unless using an arbitrary precision library.)

    There is a simple approximation that works here:  $Z^2$ is a linear function of $-log_{10}\text{ p-value}$ in the domain $[\approx10,\inf]$. For very small p-values, then, we use this approximation in place of calculating $F^{-1}$ directly.

    It is also difficult to calculate $e^{Z^2/2}$ for large values of $Z^2/2$ (JS cannot calculate `Math.exp` for values > 709.) To avoid this issue, we shift the values down by $max(Z^2/2) - 709$ (and only if any are > 709.)

2. Calculate posterior probability of being causal for each variant:

    $$
    PP_i = P(M_i | X,M) = \frac{BF_i}{\sum_{i=1}^{k}{BF_i}}
    $$

    where $i=1..k$ indexes all the variants in the region.

3. Assign variants to the $(X*100)$% credible set:

    * Sort by $PP_i$ in descending order
    * Add the variant with the largest $PP_i$ to the set and continue until $\sum_{i \in set}{PP_i} >= X$

## References

Bayesian refinement of association signals for 14 loci in 3 common diseases. Nature Genetics 44, 1294-1301, 2012. Supplementary Note S1, 6.2-6.3.3. [doi:10.1038/ng.2435](1).

[1]: https://www.nature.com/articles/ng.2435
