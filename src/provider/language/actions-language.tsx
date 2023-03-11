import { PayloadAction } from "@reduxjs/toolkit"
import ILanguage from "../../models/language"

type ChangeLanguagePayload = ILanguage

export type ChangeLanguageAction = PayloadAction<ChangeLanguagePayload>