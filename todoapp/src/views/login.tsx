import {TextField, Button, Typography} from "@mui/material/"
import { useState } from "react"
import controller from "../controller/controller"
import { useAuth } from "../hooks/AuthContext"
import "./login.css"

type Props = {
    setLogged: (value : boolean) => void
}

export default function Login({ setLogged }: Props) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    const { login } = useAuth()
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setEmail(value)
        setEmailError(!emailRegex.test(value))
    }

    const handleClick = async () => {
        if (!emailError && emailRegex.test(email)) {
            const res = await controller.login(email)
            login(res.data.token)
            setLogged(true)
        }
    }

    return(
        <div className="blur-effect">
            <div className="container-elements">
                <Typography variant="h3" gutterBottom
                    sx = {{
                        color: "black"
                    }}    
                >
                    To Do List
                </Typography>
                <TextField 
                    id="user_login" 
                    label="Email" 
                    variant="outlined"
                    value={email}
                    onChange={handleChange}
                    error={emailError}
                    helperText={emailError ? "Use a valid email" : ""}
                    sx={{
                        backgroundColor: "white"
                    }}/>
                <Button 
                    variant="contained"
                    onClick={handleClick}
                    disabled={emailError || email === ""}
                >
                    Start
                </Button>
            </div>
        </div>
    )
}
