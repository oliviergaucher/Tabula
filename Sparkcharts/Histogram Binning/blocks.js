// @id OUCPogZhnWrW7A4eA0PmPi
wasm.getHistogramBinning(0, 0.628)
// @assert deepEqual "[26, 0.025, 0]"

// @id m0mMiqe7mBpgOigMiR0pQH
wasm.getHistogramBinning(0, 6.28)
// @assert deepEqual "[26, 0.25, 0]"

// @id ynTLUAlRkcNrAgNHOlJMjt
wasm.getHistogramBinning(0, 62.8)
// @assert deepEqual "[26, 2.5, 0]"

// @id vJG88NTxyF5FVDmZkusooq
wasm.getHistogramBinning(0, 628)
// @assert deepEqual "[26, 25, 0]"

// @id Uu0GdKzaOQ7MSSv5dWzKPh
wasm.getHistogramBinning(0, 20)
// @assert deepEqual "[20, 1, 0]"

// @id Qy6r2BEV8ux5ovKzMKIttl
wasm.getHistogramBinning(0, 30)
// @assert deepEqual "[30, 1, 0]"

// @id yyEZxJswq36Z9SxRbuewTO
wasm.getHistogramBinning(0, 40)
// @assert deepEqual "[40, 1, 0]"

// @id DN0BVPoolCuhl1O57pFqZ5
wasm.getHistogramBinning(0, 100)
// @assert deepEqual "[40, 2.5, 0]"

// @id Effe2pA3BstlBIXhvvdhsj
wasm.getHistogramBinning(100, 628)
// @assert deepEqual "[26, 25, 0]"

// @id vRqCH8kl5BTYLZ48WMPlhs
wasm.getHistogramBinning(-628, 0)
// @assert deepEqual "[26, 25, -650]"

// @id cxpdMVn8bykW8uFV9cl3bV
wasm.getHistogramBinning(-628, -100)
// @assert deepEqual "[26, 25, -650]"

// @id kfawhWyEfLLP6HrbC3PBJ7
wasm.getHistogramBinning(-314, 314)
// @assert deepEqual "[26, 25, -325]"

// @id irRLnX1BIKk9yGB4j3C5hD
wasm.getHistogramBinning(-10.1, 9.9)
// @assert deepEqual "[21, 1, -11]"