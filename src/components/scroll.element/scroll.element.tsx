import "./scroll.element.scss"
import { MdKeyboardArrowUp } from "react-icons/md"
import useWindowPosition from "../../hooks/use.window.position"
import { isMobile } from 'react-device-detect';
import useWindowDimensions from "../../hooks/use.window.dimensions";

export default function ScrollElement(): JSX.Element {

    const scrollPosition = useWindowPosition()
    const { width } = useWindowDimensions();

    return (
        <>{
            !isMobile && (
                <div id="scroll-element" onClick={() => window.scrollTo(0, 0)} style={{bottom: scrollPosition > 500 ? "30px" : "20px", right: width > 500 ? "30px" : "20px", opacity: scrollPosition > 500 ? "1" : "0"}}>
                    <MdKeyboardArrowUp className="scroll-icon"/>
                </div>    
            )  
        }</>  
    )
}