import { BsExclamationTriangle } from "react-icons/bs"
import { FcRight } from "react-icons/fc"

interface FormControlSuccess{
    message?:string
}

export const FormSuccess = ({message}:FormControlSuccess) => {
    if(!message) return null
    return(
        <div className="bg-green-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm">
            <FcRight/>
            <p>{message}</p>
        </div>
    )
}