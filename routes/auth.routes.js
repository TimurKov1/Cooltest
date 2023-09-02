const { Router } = require('express')
const router = Router()
const config = require('config')
const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const Grade = require('../models/Grade')
const Subject = require('../models/Subject')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')

router.post(
    '/registration',
    [
        check('name', 'Заполните все поля').notEmpty(),
        check('grade', 'Длина класса не должна быть больше 3').isLength({max: 3}),
        check('email', 'Введен неверный e-mail').normalizeEmail().isEmail(),
        check('password', 'Длина пароля должна быть не меньше 8').isLength({min: 8}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const {name, email, grade, subject, password, type} = req.body
            let amount = 0
            let user = null
            if (!type) {
                amount = await Student.count({
                    where: {
                        email: email
                    }
                })

                if (amount) {
                    return res.status(400).json({message: 'Такой пользователь уже существует'})
                }

                const hashedPassword = await bcrypt.hash(password, 12)

                const gradeCount = await Grade.findAll({where: {name: grade.toUpperCase()}})
                let gradeId = 0
                
                if (gradeCount.length !== 0) {
                    gradeId = gradeCount[0].id
                } else {
                    gradeId = await Grade.create({
                        name: grade.toUpperCase()
                    })
                    gradeId = gradeId.toJSON().id
                }

                user = await Student.create({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    point: 0,
                    grade_id: gradeId
                })
            } else {
                amount = await Teacher.count({
                    where: {
                        email: email
                    }
                })

                if (amount) {
                    return res.status(400).json({message: 'Такой пользователь уже существует'})
                }

                const hashedPassword = await bcrypt.hash(password, 12)

                const subjectCount = await Subject.findAll({where: {name: subject.toLowerCase()}})
                let subjectId = 0
                
                if (subjectCount.length !== 0) {
                    subjectId = subjectCount[0].id
                } else {
                    subjectId = await Subject.create({
                        name: subject.toLowerCase()
                    })
                    subjectId = subjectId.toJSON().id
                }

                user = await Teacher.create({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    subject_id: subjectId
                })
            }

            res.status(201).json({message: 'Вы успешно зарегистрировались!'})
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

router.post(
    '/login', 
    [
        check('email', 'Введен неверный e-mail').normalizeEmail().isEmail(),
        check('password', 'Длина пароля должна быть не меньше 8').isLength({min: 8}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
    
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }
    
            const {email, password} = req.body
            const student = await Student.findAll({
                where: {
                    email: email
                }
            })
            const teacher = await Teacher.findAll({
                where: {
                    email: email
                }
            })

            if (student.length === 0 && teacher.length === 0) {
                return res.status(400).json({message: "Такого пользователя не существует"})
            }

            if (student.length !== 0) {
                const isPasswordStudent = await bcrypt.compare(password, student[0].password)
                if (!isPasswordStudent) {
                    return res.status(400).json({message: 'Неверный пароль'})
                }

                const token = jwt.sign(
                    {id: student[0].id, type: "student"},
                    config.get('secretKey'),
                    {expiresIn: '1h'}
                )
                res.json({token, id: student[0].id, type: "student"})
            } 

            if (teacher.length !== 0) {
                const isPasswordTeacher = await bcrypt.compare(password, teacher[0].password)
                if (!isPasswordTeacher) {
                    return res.status(400).json({message: 'Неверный пароль'})
                }

                const token = jwt.sign(
                    {id: teacher[0].id, type: "teacher"},
                    config.get('secretKey'),
                    {expiresIn: '1h'}
                )
                res.json({token, id: teacher[0].id, type: "teacher"})
            }
        } catch(e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте еще раз!", error: e.message})
        }
    }
)

module.exports = router