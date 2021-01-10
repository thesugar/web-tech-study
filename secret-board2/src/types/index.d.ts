declare module 'http' {
    interface IncomingMessage {
        user?: string
    }
}