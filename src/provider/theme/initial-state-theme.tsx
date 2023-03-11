import ITheme from "../../models/theme"

const initialStateTheme: ITheme = {
    theme: "LIGHT",
    changed_count: 0,
    last_changed: {
        seconds: undefined,
        nanoseconds: undefined
    }
}

export default initialStateTheme