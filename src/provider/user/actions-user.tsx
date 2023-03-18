import { PayloadAction } from "@reduxjs/toolkit"
import IUser from "../../models/user"

type GetUserPayload = IUser | null

export type SetUserAction = PayloadAction<GetUserPayload>