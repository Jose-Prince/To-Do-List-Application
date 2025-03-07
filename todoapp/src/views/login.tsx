import {TextField, Button, Typography} from "@mui/material/"
import { useState } from "react"
import controller from "../controller/controller"
import { useAuth } from "../hooks/AuthContext"
import "./login.css"

type Props = {
    setLogged: (value : boolean) => void
}

export default function Login({ setLogged }: Props) {

    const { login } = useAuth()
    const [email, setEmail] = useState("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handleClick = async () => {
        const res = await controller.login(email)
        login(res.data.token)
        setLogged(true)
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
                    sx={{
                        backgroundColor: "white"
                    }}/>
                <Button 
                    variant="contained"
                    onClick={handleClick}
                >
                    Start
                </Button>
            </div>
        </div>
    )
}
