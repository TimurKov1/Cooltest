const { Router } = require('express')
const { Op } = require('sequelize')
const router = Router()
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const Grade = require('../models/Grade')
const Subject = require('../models/Subject')
const Test = require('../models/Test')
const TestData = require('../models/TestData')
const Question = require('../models/Question')
const Answer = require('../models/Answer')
const QuestionData = require('../models/QuestionsData')
const auth = require('../middleware/auth.middleware')
const c = require('config')

let loop = true

async function getAnswers(id, type) {
    const answers = []
    let answer = null
    if (type === 'write') {
        answer = await Answer.findAll({
            where: {
                question_id: id,
                is_right: 1
            }
        })
    } else {
        answer = await Answer.findAll({
            where: {
                question_id: id
            }
        })
    }

    answer.forEach(item => {
        answers.push({
            id: item.id,
            text: item.text,
            isRight: item.is_right
        })
    })
    return answers
}

async function getGrade(id) {
    const gradeId = await Grade.findAll({
        where: {
            id: id
        }
    })

    return gradeId[0].name
}

router.get(
    '/get/:id',
    async (req, res) => {
        try {
            const id = req.params.id
            const questions = []

            const test = await Test.findAll({
                where: {
                    id: id
                }
            })

            if (test.length === 0) {
                return res.status(400).json({message: 'Теста с таким id не существует'})
            }

            let grades = []
            
            let gradeIds = await Test.findAll({
                where: {
                    id: id
                }
            })
            gradeIds = gradeIds[0].grade_id

            for (let i = 0; i < gradeIds.length; i++) {
                if (gradeIds[i] != ' ') {
                    let gradeId = await getGrade(parseInt(gradeIds[i]))
                    grades.push(gradeId)
                }
            }

            const subject = await Subject.findAll({
                where: {
                    id: test[0].subject_id
                }
            })

            const teacher = await Teacher.findAll({
                where: {
                    id: test[0].teacher_id
                }
            })

            const question = await Question.findAll({
                where: {
                    test_id: id
                }
            })
            for (const item of question) {
                const answers = await getAnswers(item.id, item.type)
                questions.push({
                    id: item.id,
                    text: item.text,
                    type: item.type,
                    answers: answers
                })
            }

            return res.status(200).json({
                id: test[0].id,
                name: test[0].name,
                subject: subject[0].name,
                teacher: teacher[0].name,
                grades: grades,
                time: test[0].time,
                count: test[0].questions,
                create_date: test[0].create_date,
                questions: questions
            })
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

router.post(
    '/check_test',
    async (req, res) => {
        try {
            const {userId, testId} = req.body

            const test = await TestData.findAll({
                where: {
                    student_id: userId,
                    test_id: testId
                }
            })

            if (test.length === 0) {
                return res.status(200).json({status: false, time: false})
            }

            if (test[0].is_done === 0) {
                return res.status(200).json({status: false, time: test[0].duration})
            }
            return res.status(200).json({status: true})

        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

router.post(
    '/get_mark',
    async (req, res) => {
        try {
            const {userId, testId} = req.body

            const test = await TestData.findAll({
                where: {
                    student_id: userId,
                    test_id: testId
                }
            })

            if (test.length === 0) {
                return res.status(200).json({is_done: false, message: 'Данный пользователь не проходил этот тест'})
            }

            if (test[0].is_done === 0) {
                return res.status(200).json({is_done: false, message: 'Данный пользователь не проходил этот тест'})
            }

            return res.status(200).json({
                is_done: true,
                mark: test[0].mark,
                questions: test[0].questions,
                duration: test[0].duration,
                date: test[0].date
            })
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

router.post(
    '/subjects',
    async (req, res) => {
        try {
            const {id} = req.body
            const result = []
            const subjects = {}

            const student = await Student.findAll({
                where: {
                    id: id
                }
            })

            const tests = await Test.findAll({
                where: {
                    grade_id: {
                        [Op.like]: `%${student[0].grade_id}%`
                    }
                }
            })

            const query = await Subject.findAll()
            query.forEach(item => {
                subjects[item.id] = item.name
            })

            if (tests.length === 0) {
                return res.status(400).json({message: 'Теста с таким id не существует'})
            }

            tests.forEach(item => {
                if (result.indexOf(subjects[item.subject_id]) == -1) {
                    result.push(subjects[item.subject_id])
                }
            })

            return res.status(200).json({
                subjects: result
            })
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

router.post(
    '/grades',
    async (req, res) => {
        try {
            const {id} = req.body
            const result = []
            const grades = {}

            const teacher = await Teacher.findAll({
                where: {
                    id: id
                }
            })

            const tests = await Test.findAll({
                where: {
                    teacher_id: teacher[0].id
                }
            })

            const query = await Grade.findAll()
            query.forEach(item => {
                grades[item.id] = item.name
            })

            if (tests.length === 0) {
                return res.status(400).json({message: 'Теста с таким id не существует'})
            }

            tests.forEach(item => {
                const gradesData = item.grade_id.split(' ')
                gradesData.forEach(grade => {
                    if (result.indexOf(grades[parseInt(grade)]) == -1) {
                        result.push(grades[parseInt(grade)])
                    }
                })
            })

            return res.status(200).json({
                grades: result
            })
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

async function updateTime(id, time) {
    await TestData.update(
        {
            duration: time
        }, 
        {
            where: {
                id: id
            }
        }
    )    
}

router.post(
    '/start',
    async (req, res) => {
        try {
            const {userId, testId, duration} = req.body

            let time = duration
            loop = true
            
            const start = await TestData.create({
                student_id: userId,
                test_id: testId,
                mark: 0,
                questions: 0,
                duration: duration,
                is_done: 0
            })

            const id = start.toJSON().id
            
            const timer = setInterval(() => {
                if (time === 0 || !loop) {
                    clearInterval(timer)
                    updateTime(id, duration - time)
                } else {
                    time -= 1
                    updateTime(id, time)
                }
            }, 1000)

        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

async function addAnswer(questionId, studentId, answerId) {
    const answer = await QuestionData.create({
        question_id: questionId,
        student_id: studentId,
        answer_id: answerId
    })
}

router.post(
    '/pass',
    async (req, res) => {
        try {
            const {userId, testId, answers, time, questions} = req.body
            let mark = 0
            let count = 0
            loop = false

            for (let answer in answers) {
                if (answers[answer].type === 'one') {
                    answers[answer].answers.forEach(item => {
                        if (item.isRight) {
                            count ++
                        }
                        addAnswer(answer, userId, item.id)
                    })
                } else if (answers[answer].type === 'write') {
                    const write = await Answer.findAll({
                        where: {
                            text: {
                                [Op.like]: answers[answer].answers[0].text
                            }
                        }
                    })

                    if (answers[answer].answers[0].isRight) {
                        count ++
                        const answerId = write[0].id
                        addAnswer(answer, userId, answerId)
                    } else {
                        let answerId = null
                        if (write.length === 0) {
                            answerId = await addAnswers([{isRight: 0, text: answers[answer].answers[0].text}], parseInt(answer))
                        } else {
                            const query = await Answer.findAll({
                                where: {
                                    text: answers[answer].answers[0].text
                                }
                            })
                            answerId = query[0].id
                        }
                        addAnswer(answer, userId, answerId)
                    }
                } else {
                    let localCount = 0
                    answers[answer].answers.forEach(item => {
                        if (item.isRight) {
                            localCount ++
                        }
                        addAnswer(answer, userId, item.id)
                    })
                    if (localCount === answers[answer].count) {
                        count ++
                    }
                }
            }

            if (count / questions * 100 >= 90) {
                mark = 5
            } else if (count / questions * 100 >= 70) {
                mark = 4
            } else if (count / questions * 100 >= 50) {
                mark = 3
            } else {
                mark = 2
            }

            await TestData.update(
                {
                    mark: mark,
                    questions: count,
                    is_done: 1
                }, 
                {
                    where: {
                        student_id: userId,
                        test_id: testId
                    }
                }
            )   
            
            const marksQuery = await TestData.findAll({
                where: {
                    student_id: userId
                }
            })

            let marks = 0
            marksQuery.forEach((item) => {
                marks += parseInt(item.mark)
            })

            await Student.update(
                {
                    point: (marks / marksQuery.length).toFixed(2)
                },
                {
                    where: {
                        id: userId
                    }
                }
            )

            return res.status(200).json({message: 'Тест успешно сохранен'})

        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

router.get(
    '/teacher/:id',
    async (req, res) => {
        try {
            let result = {}
            let grades = {}
            const id = req.params.id

            const tests = await Test.findAll({
                where: {
                    teacher_id: id
                }
            })

            if (tests.length === 0) {
                return res.status(400).json({message: 'Теста с таким id не существует'})
            }

            const query = await Grade.findAll()
            query.forEach(item => {
                grades[item.id] = item.name
            })

            tests.forEach(item => {
                let grade_ids = item.grade_id.split(' ')

                grade_ids.forEach(grade_id => {
                    let grade = grades[parseInt(grade_id)]

                    if (grade in result) {
                        result[grade].push({
                            id: item.id,
                            name: item.name,
                            time: item.time,
                            questions: item.questions,
                            created_date: item.create_date
                        })
                    } else {
                        result[grade] = [{
                            id: item.id,
                            name: item.name,
                            time: item.time,
                            questions: item.questions,
                            created_date: item.create_date
                        }]
                    }
                })
            })

            return res.status(200).json({
                tests: result
            })
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

router.get(
    '/student/:id',
    async (req, res) => {
        try {
            let result = {}
            let subjects = {}
            const id = req.params.id

            const student = await Student.findAll({
                where: {
                    id: id
                }
            })

            const tests = await Test.findAll({
                where: {
                    grade_id: {
                        [Op.like]: `%${student[0].grade_id}%`
                    }
                }
            })

            if (tests.length === 0) {
                return res.status(400).json({message: 'Теста с таким id не существует'})
            }

            const query = await Subject.findAll()
            query.forEach(item => {
                subjects[item.id] = item.name
            })

            tests.forEach(item => {
                let subject = subjects[item.subject_id]

                if (subject in result) {
                    result[subject].push({
                        id: item.id,
                        name: item.name,
                        time: item.time,
                        questions: item.questions,
                        created_date: item.create_date
                    })
                } else {
                    result[subject] = [{
                        id: item.id,
                        name: item.name,
                        time: item.time,
                        questions: item.questions,
                        created_date: item.create_date
                    }]
                }
            })

            return res.status(200).json({
                tests: result
            })
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

router.get(
    '/subject/:name',
    async (req, res) => {
        try {
            let result = []
            const name = req.params.name

            const subject = await Subject.findAll({
                where: {
                    name: name
                }
            })

            const tests = await Test.findAll({
                where: {
                    subject_id: subject[0].id
                }
            })

            tests.forEach(item => {
                result.push({
                    id: item.id,
                    name: item.name,
                    time: item.time,
                    questions: item.questions,
                    created_date: item.create_date
                })
            })

            return res.status(200).json({
                tests: result
            })
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

router.get(
    '/grade/:name',
    async (req, res) => {
        try {
            let result = []
            const name = req.params.name

            const grade = await Grade.findAll({
                where: {
                    name: name
                }
            })

            const tests = await Test.findAll({
                where: {
                    grade_id: {
                        [Op.like]: `%${grade[0].id}%`
                    }
                }
            })

            if (tests.length === 0) {
                return res.status(400).json({message: 'Теста с таким id не существует'})
            }

            tests.forEach(item => {
                result.push({
                    id: item.id,
                    name: item.name,
                    time: item.time,
                    questions: item.questions,
                    created_date: item.create_date
                })
            })

            return res.status(200).json({
                tests: result
            })
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

async function addAnswers(array, id) {
    let answerId = null
    for (const item of array) {
        const answer = await Answer.create({
            text: item.text,
            is_right: item.isRight,
            question_id: id
        })
        answerId = answer.toJSON().id
    }
    return answerId
}

async function addQuestions(array, id) {
    for (const item of array) {
        const question = await Question.create({
            text: item.text,
            type: item.type,
            test_id: id
        })

        const questionId = question.toJSON().id

        addAnswers(item.answers, questionId)
    }
}

router.post(
    '/add',
    auth,
    async (req, res) => {
        try {
            const {id, title, time, grades, questions} = req.body

            const teacher = await Teacher.findAll({
                where: {
                    id: id
                }
            })

            const test = await Test.create({
                name: title,
                subject_id: teacher[0].subject_id,
                teacher_id: id,
                time: time,
                questions: questions.length,
                grade_id: grades.join(' ')
            })

            const testId = test.toJSON().id

            addQuestions(questions, testId)

            return res.status(200).json({message: "Тест успешно создан"})
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

router.get(
    '/grades_all',
    async (req, res) => {
        try {
            let result = []
            const grades = await Grade.findAll()

            grades.forEach(item => {
                result.push({
                    id: item.id,
                    name: item.name
                })
            })

            return res.status(200).json({
                grades: result
            })
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

router.get(
    '/get_all',
    async (req, res) => {
        try {
            let result = []
            const tests = await Test.findAll()

            tests.forEach(item => {
                result.push({
                    id: item.id,
                    name: item.name,
                    time: item.time,
                    questions: item.questions,
                    created_date: item.create_date
                })
            })

            return res.status(200).json({
                tests: result
            })
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

async function getStudent(id) {
    const student = await Student.findAll({
        where: {
            id: id
        }
    })

    return student[0]
}

router.post(
    '/students_passed_test',
    async (req, res) => {
        try {
            const {dop, id} = req.body
            const result = []

            const grade = await Grade.findAll({
                where: {
                    name: dop
                }
            })

            const test = await Test.findAll({
                where: {
                    id: id
                }
            })

            const tests = await TestData.findAll({
                where: {
                    test_id: id
                }
            })

            for (const item of tests) {
                const student = await getStudent(item.student_id)
                if (student.grade_id == parseInt(grade[0].id)) {
                    let time = ''
                    time += `0${parseInt(item.duration / 3600)}:`
                    if (parseInt(item.duration / 60) >= 10) {
                        time += `${parseInt(item.duration / 60)}:`
                    } else {
                        time += `0${parseInt(item.duration / 60)}:`
                    }
        
                    if (item.duration % 60 >= 10) {
                        time += `${item.duration % 60}`
                    } else {
                        time += `0${item.duration % 60}`
                    }

                    result.push([
                        student.id,
                        student.name,
                        time,
                        `${item.questions}/${test[0].questions}`,
                        item.mark
                    ])
                }
            }

            return res.status(200).json({
                users: result
            })
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

router.post(
    '/percent',
    async (req, res) => {
        try {
            const {id} = req.body
            const result = []
            let mark = 0
            let questions = 0

            const test = await Test.findAll({
                where: {
                    id: id
                }
            })

            const tests = await TestData.findAll({
                where: {
                    test_id: id
                }
            })

            tests.forEach(item => {
                if (item.mark >= 4) {
                    mark++;
                }
                questions += item.questions
            })

            return res.status(200).json({
                questions: Number(questions * 100 / (test[0].questions * tests.length)),
                mark: Number(mark * 100 / tests.length)
            })
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

router.post(
    '/get_student_result',
    async (req, res) => {
        try {
            const {id, userId} = req.body
            const result = {}

            const questions = await Question.findAll({
                where: {
                    test_id: id
                }
            })

            for (const question of questions) {
                let rightAnswer = null
                let answer = null
                if (question.type == 'one') {
                    rightAnswer = await Answer.findAll({
                        where: {
                            question_id: question.id,
                            is_right: 1
                        }
                    })
                    rightAnswer = rightAnswer[0].id

                    answer = await QuestionData.findAll({
                        where: {
                            question_id: question.id,
                            student_id: userId
                        }
                    })
                    answer = parseInt(answer[0].answer_id)
                } else if (question.type == 'several') {
                    rightAnswer = []
                    const query = await Answer.findAll({
                        where: {
                            question_id: question.id,
                            is_right: 1
                        }
                    })
                    query.forEach((item) => {
                        rightAnswer.push(item.id)
                    })

                    answer = []
                    const answerQuery = await QuestionData.findAll({
                        where: {
                            question_id: question.id,
                            student_id: userId
                        }
                    })
                    answerQuery.forEach((item) => {
                        answer.push(parseInt(item.answer_id))
                    })
                } else {
                    rightAnswer = await Answer.findAll({
                        where: {
                            question_id: question.id,
                            is_right: 1
                        }
                    })
                    rightAnswer = rightAnswer[0].text

                    let answerQuery = await QuestionData.findAll({
                        where: {
                            question_id: question.id,
                            student_id: userId
                        }
                    })
                    answerQuery = answerQuery[0].answer_id

                    answer = await Answer.findAll({
                        where: {
                            id: answerQuery
                        }
                    })
                    answer = answer[0].text
                }

                result[question.id] = {
                    type: question.type,
                    answer: answer,
                    rightAnswer: rightAnswer
                }
            }

            return res.status(200).json({
                questions: result
            })
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

module.exports = router