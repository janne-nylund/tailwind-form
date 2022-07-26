import { useState, createElement } from 'react'
import { useForm } from "react-hook-form"

import ListBox from './components/ListBox'
import InputText from './components/InputText'
import InputNumber from './components/InputNumber'

import './App.css'

import { ReactComponent as HouseIcon } from './img/home.svg'
import { ReactComponent as FoodIcon } from './img/restaurant.svg'
import { ReactComponent as HobbyIcon } from './img/bike.svg'
import { ReactComponent as MiscIcon } from './img/dice-six.svg'

const elementStyling = {className: "w-7 h-7 mr-2", fill: "currentColor"}

function App() {
  const [add, setAdd] = useState(false)
  // this controls the ListBox selected value
  const [selected, setSelected] = useState()

  /* const handleSubmit = (e) => {
    e.preventDefault()
    setAdd(false)
  } */

  const budgets = [
    //createElement to dynamically display svg components
    { id: 1, name: 'Living', limit: 1200, icon: createElement(HouseIcon, elementStyling)},
    { id: 1, name: 'Food', limit: 700, icon: createElement(FoodIcon, elementStyling)},
    { id: 1, name: 'Hobbies', limit: 350, icon: createElement(HobbyIcon, elementStyling)},
    { id: 1, name: 'Mics', limit: 100, icon: createElement(MiscIcon, elementStyling)}
  ]

  const expenses = [
    { id: 1, name: 'Rent', amount: 750, category: 'Living' },
    { id: 2, name: 'Groceries', amount: 250, category: 'Food' },
    { id: 3, name: 'Golf card', amount: 200, category: 'Hobbies' },
    { id: 4, name: 'Movie night', amount: 30, category: 'Mics' },
    { id: 5, name: 'Electric bill', amount: 100, category: 'Living' },
    { id: 6, name: 'Grill party', amount: 100, category: 'Food' },
    { id: 7, name: 'Bike tyre', amount: 50, category: 'Hobbies' },
    { id: 8, name: 'Screen protector', amount: 20, category: 'Mics' },
    { id: 9, name: 'Cleaning products', amount: 20, category: 'Living' },
    { id: 10, name: 'Organic apples', amount: 20, category: 'Food' },
    { id: 11, name: 'Running shoes', amount: 70, category: 'Hobbies' },
    { id: 12, name: 'Screwdriver', amount: 12, category: 'Mics' },
    { id: 13, name: 'Ninja shoes', amount: 25, category: 'Mics' }
  ]

  const { reset, register, handleSubmit, formState: { errors }, control } = useForm();

  const onSubmit = data => {
    const submitInfo= {
      "name": data.firstName,
      "desc": data.desc,
      "amount": Number(data.amount),
      "category": data.category.name
    }

    console.log(JSON.stringify(submitInfo))
    setAdd(false)
    reset({ firstName: '', desc: '', amount: '', category: '' })
    setSelected() 
  };

  const handleReset = () => {
    reset({ firstName: '', desc: '', amount: '', category: '' })
    setSelected() 
  }

  const calculateTotal = (budget) => {
    return expenses.filter(expense => expense.category === budget).reduce((acc, curr) => acc + curr.amount, 0)
  }

  const moneyToSpend = budgets.reduce((acc, curr) => acc + curr.limit, 0)
  const moneySpent = budgets.reduce((acc, curr) => acc + calculateTotal(curr.name), 0)

  const expenseAlarm = () => { 
    return moneySpent / moneyToSpend > 0.8 ? true : false
  }

  const month = new Date().toLocaleString('default', { month: 'long' });
  
  return (
    <div className="z-0 bg-gray-100 min-w-full min-h-screen mx-auto">
      <div className="z-20 w-full bg-gradient-to-r from-sky-400 to-blue-800 h-24 flex">
        <div className="w-full md:mx-auto md:w-10/12 lg:w-6/12 flex justify-between items-center pr-3">
          <div className="text-white font-extrabold text-5xl pl-4">Tracker<sup className="super">®</sup></div>
          <div>
            <button className="bg-sky-500 hover:bg-sky-400 text-gray-100 shadow font-normal mr-4 py-2 px-2 md:px-4 rounded-full inline-flex items-center overflow-hidden" onClick={() => setAdd(prevAdd => !prevAdd)}>
            {!add && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>}
            {add && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>}
          <span className="ml-1 hidden md:inline">Add expense</span>
          </button>
          
            </div>
        </div>
      </div>
      {add && 
        <div className="z-10 bg-white min-h-full shadow mb-3 p-10 lg:px-24 sm:w-full sm:mx-auto md:w-10/12 lg:w-6/12 bg-hero-wave2 bg-no-repeat">
          <div className="text-sky-600 mt-4 mb-8 font-bold text-5xl text-center tracking-tight">Add expense</div>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-12">
            <InputText
              fieldName='firstName' 
              labelName='Name'  
              errors={errors}  
              register={register}  
              requirements={{ required: true, minLength: 2}}  
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>} 
            />            
          </div>
          <div className="relative mb-12">
          <InputText
              fieldName='desc' 
              labelName='Description'  
              errors={errors}  
              register={register}  
              requirements={{ required: true, minLength: 2}}  
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>} 
            />
          </div>
          <div className="relative mb-12">
          <InputNumber
              fieldName='amount' 
              labelName='Amount'  
              errors={errors}  
              register={register}  
              requirements={{ required: true, min: 1}}  
              icon1={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>}
              icon2={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z" clipRule="evenodd" />
              </svg>} 
            />
          </div>
          <div className="flex">
          <ListBox selected={selected} setSelected={setSelected} control={control} errors={errors} />
          </div>         
          <button type='submit' className="bg-sky-500 hover:bg-sky-400 text-gray-100 font-bold px-6 py-4 rounded-full inline-flex items-center">  
            Add expense
          </button>
          <button type='reset' className="bg-gray-400 hover:bg-gray-300 text-gray-100 font-bold ml-4 px-6 py-4 rounded-full inline-flex items-center"
          onClick={handleReset}> 
            Reset
          </button>
          
        </form>
        </div>
      }
      <div className="z-10 bg-white min-h-full shadow rounded sm:w-full sm:mx-auto md:w-10/12 lg:w-6/12">
        <div className="bg-hero-wave bg-no-repeat">
          <div className="relative bg-hero-pillars bg-no-repeat bg-auto bg-top min-w-max h-64 md:h-96">
            <div className="absolute top-4 right-6">
            <span className="mx-auto hover:text-sky-500 font-bold text-xs text-center pl-4"><a href="localhost" className="text-sky-600 hover:text-sky-400">LOGOUT</a></span>
            <div className="relative">
              <img alt='avatar' className="w-20 h-20 rounded-full border-[5px] border-white shadow-xl" src={require("./img/avatar.jpg")} />  
              <span className={`absolute bottom-1 right-1 w-5 h-5 border-white border-2 ${expenseAlarm() ? 'bg-red-500' : 'bg-green-500'} rounded-full`}></span>
            </div>
            </div>
          </div>
        {/* <div className="relative flex w-full">
        <div className="mx-auto text-3xl justify-center items-center text-center">{pieLogo}</div>
        </div> */}
          <div className="text-sky-600 font-extrabold text-5xl px-8 lg:px-4 text-center mb-4 pt-2 tracking-tight">Your monthly expenses</div>
          <div className="mx-auto text-center py-6 bg-gray-100 w-6/12 rounded-full text-gray-700 mb-10"><span className="hidden md:inline font-bold">Total expenses for {month}: </span><span className="font-extrabold text-sky-600">{moneySpent} € / {moneyToSpend} €</span></div>
        </div>
        {budgets.map(budget => (
            <div key={`${budget.id}${budget.name}`} className="w-8/12 mx-auto px-12 text-center -mt-4 pb-6 rounded-xl shadow-8xl border border-gray-100 bg-white">
            <div className="relative flex justify-center items-center pt-6 pb-1">

            
            <span className="text-sky-500 pb-4 mr-1">{budget.icon}</span>
            <span className="text-2xl text-sky-500 font-bold pb-4 mt-1">{budget.name}</span>
            </div>
            <table className="table-fixed text-left min-w-full text-gray-700">
              <thead>
              <tr className="rounded">
                <th className="w-2/3 px-4 py-2 text-sm text-sky-600 tracking-wider">TITLE</th>
                <th className="w-1/3 px-4 py-2 text-sm text-sky-600 tracking-wider">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-6 border-t"><td colSpan={2}></td></tr>
              {expenses.filter(expense => expense.category === budget.name).map((expense, index) => (
                <tr key ={expense.id} className={`${index % 2 === 0 ? 'bg-gray-100 hover:bg-sky-100' : 'hover:bg-sky-100'}`}>
                    <td className="py-3 px-4 rounded-l-full">{expense.name}</td>
                    <td className="py-3 px-4 rounded-r-full">{expense.amount} €</td>
                </tr>
              ))}
                <tr className="h-6 border-b"><td colSpan={2}></td></tr>
                <tr>
                  <td className="p-4 font-bold text-sm">
                    TOTAL: 
                  </td>
                  <td className="p-4 font-bold">
                  <span className={`${(calculateTotal(budget.name)/budget.limit) < 0.8 ? 'text-teal-500 ' : 'text-rose-400'}`}>{calculateTotal(budget.name)}</span> / {budget.limit}
                  </td>
                </tr>
            </tbody>
            </table>
            </div>
        ))}
      </div>
    </div>
  )
}

export default App
