import { createContext, useContext, useState } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [plate, setPlate] = useState('')
  const [searchBrand, setSearchBrand] = useState('')
  const [searchRange, setSearchRange] = useState('')
  const [searchModel, setSearchModel] = useState('')

  // Duel Mode state
  const [duelMode, setDuelMode] = useState(false)
  const [primaryCar, setPrimaryCar] = useState(null)

  return (
    <StoreContext.Provider value={{
      plate, setPlate,
      searchBrand, setSearchBrand,
      searchRange, setSearchRange,
      searchModel, setSearchModel,
      duelMode, setDuelMode,
      primaryCar, setPrimaryCar
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
