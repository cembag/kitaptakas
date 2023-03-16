import { PayloadAction } from "@reduxjs/toolkit"
import ITheme from "../../models/theme"

type ChangeThemePayload = ITheme

export type ChangeThemeAction = PayloadAction<ChangeThemePayload>