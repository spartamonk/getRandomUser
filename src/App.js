import React, { useEffect, useReducer } from 'react'
import reducer from './reducer'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

const initialState = {
  randomUser: null,
  isLoading: true,
  value: 'random person',
  title: 'name',
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getUser = async () => {
    dispatch({ type: 'LOADING' })
    const response = await fetch(url)
    const data = await response.json()
    const {
      name: { first, last },
      location: {
        street: { number, name },
      },
      email,
      login: { password },
      dob: { age },
      phone: telephone,
      picture: { large },
    } = data.results[0]
    const newPerson = {
      name: `${first} ${last}`,
      address: `${number} ${name}`,
      email,
      password,
      age,
      telephone,
      image: large,
    }
    dispatch({ type: 'FETCH_USER', payload: newPerson })
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleValue=(e)=> {
    dispatch({type: 'SET_VALUE', payload: e.target})
  }

  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            src={(state.randomUser && state.randomUser.image) || defaultImage}
            alt={state.randomUser ? state.randomUser.name : 'random person'}
          />
          <p className='user-title'>{`My ${state.title} is`}</p>
          <p className='user-value'>{state.value}</p>
          <div className='values-list'>
            <button
              className='icon'
              data-label='name'
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className='icon'
              data-label='email'
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className='icon' data-label='age' onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className='icon'
              data-label='address'
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className='icon'
              data-label='telephone'
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className='icon'
              data-label='password'
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className='btn' type='button' onClick={getUser}>
            {state.isLoading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App
