export const errorTypes = [
    "auth",
    "db",
    "favourite",
    "unknown",
] as const

export type ErrorType = typeof errorTypes[number]
