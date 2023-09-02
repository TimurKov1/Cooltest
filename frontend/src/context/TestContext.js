import { createContext } from "react"

function pass() {}

export const TestContext = createContext({
    answers: null,
    setAnswers: pass
})