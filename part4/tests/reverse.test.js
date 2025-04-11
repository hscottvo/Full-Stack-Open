import { test, describe } from "node:test"
import assert from "node:assert"

import { reverse } from "../utils/for_testing.js"

describe("reverse", () => {
    test("of a", () => {
        const result = reverse("a")

        assert.strictEqual(result, "a")
    })

    test("of react", () => {
        const result = reverse("react")

        assert.strictEqual(result, "tcaer")
    })

    test("of saippuakauppias", () => {
        const result = reverse("saippuakauppias")

        assert.strictEqual(result, "saippuakauppias")
    })
})
