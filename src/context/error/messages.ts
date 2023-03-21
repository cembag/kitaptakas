const errorMessages = [
    "Authentication required, you must sign in or register.",
    "Reached maximum favourite amount, you have 100 favourite book",
    "Db error",
    "Unknown error",
] as const 

export type ErrorMessage = typeof errorMessages[number]