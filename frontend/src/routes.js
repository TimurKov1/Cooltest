import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'
import { CreateTestPage } from './pages/CreateTestPage/CreateTestPage'
import { TestPage } from './pages/TestPage/TestPage'
import { ResultPage } from './pages/ResultPage/ResultPage'
import { ResultTestPage } from './pages/ResultTestPage/ResultTestPage'

export function useRoutes() {
    return (
        <Routes>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/create" element={<CreateTestPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/registration" element={<RegisterPage/>}/>
            <Route path="/result/:id" element={<ResultPage/>}/>
            <Route path="/result/:id/:userId" element={<ResultTestPage/>}/>
            <Route path="/test/:id" element={<TestPage/>}/>
        </Routes>
    )
}