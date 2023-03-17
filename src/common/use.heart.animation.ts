import { useEffect } from "react"

export default function useHeartAnimation(elementId: string, isFavourite: boolean) {


    const newspaperSpinning = [
        { transform: " scale(.2)" },
        { transform: " scale(1.1)" },
        { transform: " scale(.95)" },
        { transform: " scale(1)" },
    ];

    const newspaperTiming = {
        duration: 400,
        iterations: 1,
    };

    useEffect(() => {
        const element = document.getElementById(elementId)

        if (element) {

            const heartIcon = element.querySelector(".heart-icon")
     
            if (heartIcon) {
                if (isFavourite) {
                    heartIcon.setAttribute("fill", "var(--theme-color)")
                    heartIcon.animate(newspaperSpinning, newspaperTiming)
                } else {
                    heartIcon.setAttribute("fill", "white")
                }
            }
        }
    }, [isFavourite])

}