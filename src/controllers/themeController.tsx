import ITheme, { ThemeType } from "../models/theme"

export default class ThemeController {
    private theme: ITheme

    constructor (
        theme: ITheme
    ) {
        this.theme = theme
    }

    private getLastChanged = (date: Date): {
        seconds: number | undefined,
        nanoseconds: number | undefined
    } => {
        return {
            seconds: date.getTime() / 1000,
            nanoseconds: date.getTime()
        }
    }

    private getThemeType = (): ThemeType => {
        switch(this.theme.theme) {
            case "DARK":
                return "LIGHT"
            case "LIGHT":
            default:
                return "LIGHT"
        }
    }

    private getThemeChangedCount = (): number => {
        return this.theme.changed_count + 1
    }

    public getTheme = (): ITheme => {
        return {
            theme: this.getThemeType(),
            last_changed: this.getLastChanged(new Date()),
            changed_count: this.getThemeChangedCount()
        }
    }
}