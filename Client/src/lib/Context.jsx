import { createContext } from "react"

export const FileContext = createContext({
    fileInfo: []
})

export const UidContext = createContext({
    uid:"",
    setUid: () => { },
    loading: null,
    setLoading: () => {}
})
