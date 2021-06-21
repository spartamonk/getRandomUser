const reducer = (state, action) => {
 if(action.type === 'LOADING') {
  return {
   ...state,
   isLoading: true
  }
 }
 if (action.type === 'FETCH_USER') {
   return {
    ...state,
    randomUser: action.payload,
    isLoading: false,
    value: action.payload.name,
    title: 'name'
   }
 }
 if (action.type === 'SET_VALUE') {
  if(action.payload.classList.contains('icon')) {
   const newValue = action.payload.dataset.label
   return {
    ...state,
    value: state.randomUser[newValue],
    title: newValue
   }
  }
  return {...state}
 }
 
 throw new Error('no matching action type')
}

export default reducer
