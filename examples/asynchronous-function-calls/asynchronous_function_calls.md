# Asynchronous function calls

`start` calls a function asynchronously and the function runs on a separate logical thread (`strand`).
It is cooperatively multitasked by default.
The result will be of type `future<T>` and `future` is a separate basic type.
Waiting for the same `future` more than once gives an `error`.
Use `f.cancel()` to terminate a `future`.

::: code ./examples/asynchronous-function-calls/asynchronous_function_calls.bal :::

::: out ./examples/asynchronous-function-calls/asynchronous_function_calls.out :::