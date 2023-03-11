/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
       //types of envs
        REACT_APP_KEY: string

    }
}

interface Window {
    Stripe: any
}