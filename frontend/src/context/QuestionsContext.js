import { createContext } from "react"

function pass() {}

export const QuestionsContext = createContext({
    questions: null,
    setQuestions: pass
})