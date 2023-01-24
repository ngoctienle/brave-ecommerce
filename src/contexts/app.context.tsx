import { createContext, useState } from 'react'

import { getAccessTokenFromLS, getUserProfileFromLS } from 'src/utils/auth'
import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  userProfile: User | null
  setUserProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchase: ExtendedPurchase[]
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  userProfile: getUserProfileFromLS(),
  setUserProfile: () => null,
  extendedPurchase: [],
  setExtendedPurchase: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [userProfile, setUserProfile] = useState<User | null>(initialAppContext.userProfile)
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(
    initialAppContext.extendedPurchase
  )

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userProfile,
        setUserProfile,
        extendedPurchase,
        setExtendedPurchase
      }}>
      {children}
    </AppContext.Provider>
  )
}
