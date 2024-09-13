import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../firebase"

const UseAuth = () => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((auth, (user) => {
            if (user) {
                setCurrentUser(true)
            } else {
                setCurrentUser(false)
            }
        }))

        return unsubscribe
    }, [])

    return currentUser
}

export default UseAuth;