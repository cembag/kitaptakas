import { ThemeType } from "../../models/theme"
import IThemeModel from "../../models/theme.model"
import darkTheme from "./themes/dark-theme"
import lightTheme from "./themes/light-theme"


const useTheme = (themeType: ThemeType): IThemeModel => {
    switch(themeType) {
        case "DARK":
            return darkTheme
        case "LIGHT":
        default: 
            return lightTheme
    }
}

export default useTheme