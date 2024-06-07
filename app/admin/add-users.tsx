'use client'

import { useFormState } from 'react-dom'
import { createSection, createUser } from './action'

const initialState = {
    message: '',
  }

export default function AddUser({sections}:{sections:{id:string,name:string,shortName:string}[]}){
    const [addUserState, formAddUserAction] = useFormState(createUser, initialState)
    const [addSectionState, formAddSectionAction] = useFormState(createSection, initialState)
    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-slate-300">
            <p className="text-2xl font-bold mb-6">เพิ่มผู้ใช้งาน</p>
            <form action={formAddUserAction} className="flex flex-col bg-white p-6 rounded-lg shadow-md mb-8">
                <label htmlFor="user" className="mb-2">รหัสพนักงาน : </label>
                <input type="text" name="user" required className="mb-4 p-2 border rounded-md shadow-sm"/>
                <label htmlFor="name" className="mb-2">ชื่อสกุล : </label>
                <input type="text" name="name" required className="mb-4 p-2 border rounded-md shadow-sm"/>
                <label htmlFor="tel" className="mb-2">หมายเลขโทรศัพท์ : </label>
                <input type="text" name="tel" required className="mb-4 p-2 border rounded-md shadow-sm"/>
                <label htmlFor="sectionId" className="mb-2">สังกัด : </label>
                <input type="text" name="sectionId" required className="mb-4 p-2 border rounded-md shadow-sm"/>
                <span className="text-red-500 mb-4">{addUserState.message}</span>
                <button type='submit' className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600">Sign up</button>
            </form>
            <p className="text-2xl font-bold mb-6">เพิ่มแผนก</p>
            <form action={formAddSectionAction} className="flex flex-col bg-white p-6 rounded-lg shadow-md mb-8">
                <label htmlFor="name" className="mb-2">ชื่อแผนก : </label>
                <input type="text" name="name" required className="mb-4 p-2 border rounded-md shadow-sm"/>
                <label htmlFor="shortName" className="mb-2">ตัวย่อแผนก : </label>
                <input type="text" name="shortName" required className="mb-4 p-2 border rounded-md shadow-sm"/>
                <span className="text-red-500 mb-4">{addSectionState.message}</span>
                <button type='submit' className="bg-green-500 text-white p-2 rounded-lg shadow-md hover:bg-green-600">เพิ่มแผนก</button>
            </form>
            <p className="text-2xl font-bold mb-6">รายการแผนกที่มี</p>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <pre>{JSON.stringify(sections, null, 2)}</pre>
            </div>
        </main>
    )
}