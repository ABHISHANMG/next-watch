import React from 'react'

const MoreContext = React.createContext({
  activeDash: 'INITIAL',
  darkModeChange: () => {},
  addToSave: () => {},
  dashBtn: () => {},
})

export default MoreContext
