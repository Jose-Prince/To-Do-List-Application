import {TextField, Button, Typography} from "@mui/material/"
import controller from "../../controller/controller"
import "./login.css"

export default function Login() {

    const handleClick = async () => {
        const res = await controller.login("joseprince148@gmail.com")
        console.log(res)
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
