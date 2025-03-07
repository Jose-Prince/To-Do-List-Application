import { useState, useEffect } from 'react'
import Login from './views/login.tsx'
import { useAuth } from './hooks/AuthContext'
import { Fab, Modal, Typography, Box, Divider, TextField, Button } from '@mui/material/'
import  Add  from '@mui/icons-material/Add'
import controller from './controller/controller'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Task } from './types'
import './App.css'

function App() {

  const numberList = [5,10,15,20]

  const [title, setTitle] = useState("")
  const [open, setOpen] = useState(false)
  const [logged, setLogged] = useState(false)
  const [order, setOrder] = useState("descending")
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [taskList, setTaskList] = useState<Task[]>([{
      id: 2,
      title: "example",
      description: "N/A",
      is_completed: false,
      created_at: "0/0/0"

  }])

  const handleChangeOrder = () => {
      if (order === "ascending") {
        setOrder("descending")
      } else {
        setOrder("ascending")
      }
  }

  const handleOpen = () => {
      setOpen(true)
      setTitle("")
  }
  const handleClose = () => setOpen(false)
  const { token } = useAuth()

  useEffect(() => {

    const fetchData = async () => {

        if ( token ) {
            setLogged(true)
            const list = await controller.getTaskList(token, String(limit), order, String(page))
            setTaskList(list.data)
        }
    
    }

    fetchData()
  }, [order, limit, page])

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
      <div className="top-display">
        <Typography 
          style={{color: 'black'}}
          variant="h4"
        >
          List of tasks
        </Typography>

        <div className="top-display">
            <Typography 
              style={{color: 'black'}}
              variant="h6"
              sx={{marginRight: '5px'}}
            >
              Max tasks:
            </Typography>
            <TextField
                id="select-max-task-display"
                select
                defaultValue="5"
                slotProps={{
                    select: {
                        native: true,
                    },
                }}
                variant='standard'
                sx={{marginRight: '10px'}}
            >
                {numberList.map((option) => (
                    <option key={option} value={option} onClick={() => setLimit(option)}>
                        {option}
                    </option>
                ))
                } 
            </TextField>
            <Button onClick={handleChangeOrder}>
                { order === "descending" 
                    ? <ArrowDownwardIcon/>
                    : <ArrowUpwardIcon/>

                }
                
            </Button>
        </div>
        
      </div>
      <Divider/>
      <div>
        5
      </div>
      <div>
        {taskList.map((item : Task) => (
            <div className="task-style">
                <Button key={item.id} sx={{width: '100%'}}>
                    {item.title}
                </Button>
            </div>
        ))

        }
      </div>
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
