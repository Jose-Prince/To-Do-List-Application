import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './views/login.tsx'
import { useAuth } from './hooks/AuthContext'
import { Fab, Modal, Typography, Box, Divider, TextField, Button } from '@mui/material/'
import  Add  from '@mui/icons-material/Add'
import controller from './controller/controller'
import './App.css'

function App() {

  const [title, setTitle] = useState("")
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)
  const [logged, setLogged] = useState(false)
  
  const handleOpen = () => {
      setOpen(true)
      setTitle("")
  }
  const handleClose = () => setOpen(false)
  const { token } = useAuth()

  useEffect(() => {
    if ( token ) {
        setLogged(true)
    }
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleClick = async () => {
      if (token != null) {
        await controller.createTask(title, token)
        handleClose()
      }
  }

  return (
    <div style={{ position: 'relative' }}>
      { !logged &&
        <Login setLogged={setLogged} />
      }
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div style={{position: 'fixed', bottom: '3%', right: '3%'}}> 
        <Fab 
            color="primary" 
            aria-label="add"
            onClick={handleOpen}
        >
            <Add />
          </Fab>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="modal-create">
            <Typography variant="h5">Create Task:</Typography>
            <Divider sx={{marginBottom: '15px'}}/>
            <TextField 
                id="task-title" 
                label="Task's Title" 
                variant="standard" 
                sx={{marginBottom: '15px'}}
                value={title}
                onChange={handleChange}
            />
            <Button 
                variant="contained"
                onClick={handleClick}
            > 
                create
            </Button>
        </Box>
      </Modal>
    </div>
  )
}

export default App
