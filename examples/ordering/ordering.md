# Ordering

Ordering works consistently with `<`, `<=`, `>`, `>=` operators. Some comparisons involving
`()` and `float NaN` are considered `unordered`. `order by` clause allows `expressions` not just
`field access`. A library module can enable Unicode-aware sorting by providing a
`unicode:sortKey(str, locale)` function.

::: code ./examples/ordering/ordering.bal :::

::: out ./examples/ordering/ordering.out :::