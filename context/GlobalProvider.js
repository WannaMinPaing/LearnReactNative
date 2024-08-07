import { getCurrentUser } from "@/lib/appwrite";
import {
  createContext,
  useEffect,
  useState,
} from "react";

const GlobalContext =  createContext();

export const useGlobalContext = () => createContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
      getCurrentUser().then((response) => {
        if(response){
          isLoggedIn(true);
          setUser(response);
        }else{
          sLoggedIn(false);
          setUser(null);
        }
      }).catch((error)=>{
        console.log(error)
      }).finally(()=> {
        setIsLoading(false);
      })
    },[])

    return (
        <GlobalContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            user, 
            setUser,
            isLoading
          }}
        >
          {children}
        </GlobalContext.Provider>
      );
}

export default GlobalProvider;