# Lock statement

The `lock` statement allows mutable state to be safely accessed from multiple strands that are running on
separate threads. Semantics are like an atomic section. The execution of the outermost `lock` block is not
interleaved. Naive implementation uses single, global, recursive lock. Efficient implementation can do
compile-time lock inference.

::: code ./examples/lock-statement/lock_statement.bal :::

::: out ./examples/lock-statement/lock_statement.out :::