const { Router } = require('express')
const router = Router()
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const Grade = require('../models/Grade')
const Subject = require('../models/Subject')

router.post(
    '/get',
    async (req, res) => {
        try {
            const {id, type} = req.body
            if (type === 'student') {
                const user = await Student.findAll({
                    where: {
                        id: id
                    }
                })

                if (user.length === 0) {
                    return res.status(400).json({message: 'Пользователя с таким id не существует'})
                }

                const grade = await Grade.findAll({
                    where: {
                        id: user[0].grade_id
                    }
                })

                return res.status(200).json({
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                    point: user[0].point,
                    grade: grade[0].name
                })
            } else {
                const user = await Teacher.findAll({
                    where: {
                        id: id
                    }
                })

                if (user.length === 0) {
                    return res.status(400).json({message: 'Пользователя с таким id не существует'})
                }

                const subject = await Subject.findAll({
                    where: {
                        id: user[0].subject_id
                    }
                })

                return res.status(200).json({
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                    subject: subject[0].name
                })
            }
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

router.post(
    '/get_all',
    async (req, res) => {
        try {
            const {dop, type} = req.body
            let result = []
            if (type === 'student') {
                const grade = await Grade.findAll({
                    where: {
                        name: dop
                    }
                })

                if (grade.length === 0) {
                    return res.status(400).json({message: 'Пользователей с указанными параметрами не найдено'})
                }

                const users = await Student.findAll({
                    where: {
                        grade_id: grade[0].id
                    }
                })

                if (users.length === 0) {
                    return res.status(400).json({message: 'Пользователей с указанными параметрами не найдено'})
                }

                users.forEach(item => {
                    result.push([
                        item.id,
                        item.name,
                        item.point
                    ])
                })

                result.sort((a, b) => a.name < b.name ? 1 : -1)

                return res.status(200).json({
                    users: result
                })
            } else {
                const subject = await Subject.findAll({
                    where: {
                        name: dop
                    }
                })

                if (subject.length === 0) {
                    return res.status(400).json({message: 'Пользователей с указанными параметрами не найдено'})
                }

                const users = await Teacher.findAll({
                    where: {
                        subject_id: subject[0].id
                    }
                })

                if (users.length === 0) {
                    return res.status(400).json({message: 'Пользователей с указанными параметрами не найдено'})
                }

                users.forEach(item => {
                    result.push({
                        id: item.id,
                        name: item.name,
                        email: item.email,
                        subject: dop
                    })
                })

                return res.status(200).json({
                    users: result
                })
            }
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

module.exports = router