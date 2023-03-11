export type ThemeType = "LIGHT" | "DARK"

export default interface ITheme {
    theme: ThemeType,
    changed_count: number,
    last_changed: {
        seconds: number | undefined,
        nanoseconds: number | undefined
    }
}
