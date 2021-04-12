import { useCallback} from "react"

export const useMessage = (error) => {
   return useCallback( () => {

        if(error !== null) {
            return console.log(error)
        }
    }, [error])  
}  