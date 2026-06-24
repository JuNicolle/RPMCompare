import { createContext, useContext, useState } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [plate, setPlate] = useState('')
  const [searchBrand, setSearchBrand] = useState('')
  const [searchRange, setSearchRange] = useState('')
  const [searchModel, setSearchModel] = useState('')

  return (
    <StoreContext.Provider value={{
      plate, setPlate,
      searchBrand, setSearchBrand,
      searchRange, setSearchRange,
      searchModel, setSearchModel
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
