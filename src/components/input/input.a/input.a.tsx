import "./input.a.scss"
import React, { useState } from "react"
import { CgClose } from "react-icons/cg"

type InputAProps = {
    placeHolder: string
    value: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
    small?: boolean,
    type: string
}

export default function InputA(inputAProps: InputAProps): JSX.Element {

    const {placeHolder, value, setState, type, small} = inputAProps
    
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.slice(0, e.target.maxLength)
        setState(e.target.value);
    }

    return (
        <div className="input-container">
            <span className="placeholder" style={{ scale: isFocused || value ? ".8" : "1", top: isFocused || value ? small && small ? "1px" : "4px" : small && small ? "10px" : "15px", color: isFocused || value ? "var(--theme-color)" : "rgb(180, 180, 180)" }}>{placeHolder}</span>
            <input autoComplete="off" type={type} onChange={handle} value={value} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} maxLength={type === "number" ? 6 : 50}/>
            
            {
                type === "search" && value && (
                    <div className="clear-button" onClick={() => setState("")}>
                        <CgClose className="clear-icon"/>
                    </div>
                )
            }
        </div>
    )
}