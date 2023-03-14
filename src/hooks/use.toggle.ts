import { useState } from "react"

export default function useToggle() {
    
    const [value, setValue] = useState<boolean>(false)
    
    const toggle = () => setValue(prev => !prev)

    return {
        value,
        toggle
    }
}