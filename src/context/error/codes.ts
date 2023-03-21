export const errorCodes = [
    "410",
    "405",
    "407",
    "409",
] as const

export type ErrorCode = typeof errorCodes[number]