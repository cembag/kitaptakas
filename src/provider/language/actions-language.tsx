import { PayloadAction } from "@reduxjs/toolkit"
import { LanguageType } from "../../context/language/supported.languages"

type ChangeLanguagePayload = LanguageType

export type ChangeLanguageAction = PayloadAction<ChangeLanguagePayload>