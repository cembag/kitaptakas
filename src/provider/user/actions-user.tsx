import { PayloadAction } from "@reduxjs/toolkit"
import IUser from "../../models/user"

type GetUserPayload = IUser | null
type GetUserFavourites = string[]
type GetUserTrades = string[]
type Favourite = string

export type SetUserAction = PayloadAction<GetUserPayload>
export type SetUserFavourites = PayloadAction<GetUserFavourites>
export type AddToFavourite = PayloadAction<Favourite>
export type DeleteFromFavourite = PayloadAction<Favourite>
export type SetUserTrades = PayloadAction<GetUserTrades>