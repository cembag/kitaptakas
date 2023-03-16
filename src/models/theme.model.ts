import { CSSProperties } from "react";

export default interface IThemeModel {
    "--primary-color": CSSProperties["color"]
    "--secondary-color": CSSProperties["color"]
    "--background-color": CSSProperties["color"]
    "--primary-text-color": CSSProperties["color"]
    "--secondary-text-color": CSSProperties["color"]
    "--theme-color": CSSProperties["color"]
    "--theme-gradient-color": CSSProperties["background"]
    "--shadow-color": CSSProperties["color"]
}
