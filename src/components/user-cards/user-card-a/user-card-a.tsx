import './user-card-a.scss'
import React from 'react'
import IUser from "../../../models/user"

type UserCardAProps = {
    user: IUser
}

export default function UserCardA(userCardAProps: UserCardAProps): JSX.Element {

    const user = userCardAProps.user

    return (
        <div className="user_card_a">
            
        </div>
    )
}