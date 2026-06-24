import { createContext, useContext, useState } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [plate, setPlate] = useState('')
  const [vehicleData, setVehicleData] = useState(null)
  const [searchBrand, setSearchBrand] = useState('')
  const [searchRange, setSearchRange] = useState('')

  return (
    <StoreContext.Provider value={{ plate, setPlate, vehicleData, setVehicleData, searchBrand, setSearchBrand, searchRange, setSearchRange }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
