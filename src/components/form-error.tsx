import { BsExclamationTriangle } from "react-icons/bs"


interface FormControlErorr{
    message?:string
}

export const FormError = ({message}:FormControlErorr) => {
    if(!message) return null
    return(
        <div className="bg-red-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm">
            <BsExclamationTriangle/>
            <p>{message}</p>
        </div>
    )
}