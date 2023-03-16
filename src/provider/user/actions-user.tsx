import { PayloadAction } from "@reduxjs/toolkit"
import IUser from "../../models/user"

type GetUserPayload = IUser

export type SetUserAction = PayloadAction<GetUserPayload>