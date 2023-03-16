import { useState, useLayoutEffect } from "react"

type Dimensions = {
    width: number,
    height: number
}

export default function useWindowDimensions(): Dimensions {

    const [dimensions, setDimensions] = useState<Dimensions>({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useLayoutEffect(() => {
        function handleResize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return dimensions
}