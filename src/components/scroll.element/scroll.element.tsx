import "./scroll.element.scss"
import { MdKeyboardArrowUp } from "react-icons/md"
import useWindowPosition from "../../hooks/use.window.position"
import { isMobile } from 'react-device-detect';

export default function ScrollElement(): JSX.Element {

    const scrollPosition = useWindowPosition()

    return (
        <>{
            !isMobile && (
                <div id="scroll-element" onClick={() => window.scrollTo(0, 0)} style={{bottom: scrollPosition > 500 ? "30px" : "10px", right: "calc((100% - 1400px) / 2)", opacity: scrollPosition > 500 ? "1" : "0"}}>
                    <MdKeyboardArrowUp className="scroll-icon"/>
                </div>    
            )  
        }</>  
    )
}