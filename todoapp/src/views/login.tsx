import {TextField, Button, Typography} from "@mui/material/"
import "./login.css"

export default function Login() {
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
                    sx={{
                        backgroundColor: "white"
                    }}/>
                <Button variant="contained">Start</Button>
            </div>
        </div>
    )
}
