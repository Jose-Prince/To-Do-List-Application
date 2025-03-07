import { useState, useEffect } from 'react'
import Login from './views/login.tsx'
import { useAuth } from './hooks/AuthContext'
import { Fab, Modal, Typography, Box, Divider, TextField, Button } from '@mui/material/'
import  Add  from '@mui/icons-material/Add'
import controller from './controller/controller'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { Task } from './types'
import './App.css'

function App() {

  const numberList = [5,10,15,20]

  const [title, setTitle] = useState("")
  const [open, setOpen] = useState(false)
  const [see, setSee] = useState(false)
  const [delTask, setDelTask] = useState(false)
  const [logged, setLogged] = useState(false)
  const [order, setOrder] = useState("descending")
  const [obtainedID, setObtainedID] = useState("")
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [taskData, setTaskData] = useState<Task>({
    id: 2,
    title: "example",
    description: "N/A",
    is_completed: false,
    created_at: "0/0/0T00:00"
  })
  const [taskList, setTaskList] = useState<Task[]>([{
      id: 2,
      title: "example",
      description: "N/A",
      is_completed: false,
      created_at: "0/0/0T00:00"
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
  const handleCloseTask = () => setSee(false)
  const handleCloseDelete = () => setDelTask(false)

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
      if (token) {
        await controller.createTask(title, token)
        handleClose()
      }
  }

  const handleClickTask = async (task: Task) => {
      setSee(true)
      if (token) {
        const todo = await controller.getTask(token, String(task.id))
        setTaskData(todo.data.task)
      }
  }

  const convertToDate = (dateTime: string) => {
    const [year, month, day] = dateTime.split("T")[0].split("-")

    return `${day}/${month}/${year}`
  }

  const convertToTime = (dateTime: string) => {
        const [hour, minute] = dateTime.split("T")[1].split(":")
        return `${hour}:${minute}`
  }

  const nullableDesc = (desc: string | null) => {
    if (!desc) {
        return "Sin descripción"
    } 

    return desc
  }

  const handleUpdate = async (id: string) => {
      if (token) {
        await controller.updateTask(token, id)
      }
  }

  const handleDelete = async () => {
    if (token) {
        await controller.deleteTask(token, obtainedID)
    }
    setDelTask(false)
  }
   const handleOpenDelete = (id: string) => {
        setDelTask(true)
        setObtainedID(String(id))
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
        {taskList
            .filter((item: Task) => !item.is_completed)
            .map((item : Task) => (
            <div className="task-style">
                <Button 
                    key={item.id} 
                    sx={{ width: "100%", justifyContent: 'space-between', display: 'flex', alignItems: 'center' }} 
                    onClick={() => handleClickTask(item)}
                >
                    <Typography sx={{ color: '#000' }} variant="h6">{item.title}</Typography>
                </Button>
                 <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Button variant="contained" color="error" onClick={() => handleOpenDelete(String(item.id))}>
                          <DeleteIcon />
                        </Button>
                        <Button variant="contained" onClick={() => handleUpdate(String(item.id))}>
                          <CheckIcon />
                        </Button>
                    </Box>
            </div>
        ))}
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
      <Modal 
        open={see}
        onClose={handleCloseTask}
      >
        <Box className="modal-create">
            <Typography sx={{color: '#000'}} variant="h4">{taskData.title}</Typography>
            <Divider sx={{marginBottom: '15px'}}/>
            <div style={{display:'flex', gap: '15px'}}>
                <Typography sx={{color: '#000'}} variant="h6">Descripción:</Typography>
                <Typography sx={{color: '#000'}} variant="h6">{nullableDesc(taskData.description)}</Typography>
            </div>
            <div style={{display:'flex', gap: '15px'}}>
                <Typography sx={{color: '#000'}} variant="h6">Fecha creada:</Typography>
                <Typography sx={{color: '#000'}} variant="h6">{convertToDate(taskData.created_at)}</Typography>
            </div>
            <div style={{display:'flex', gap: '15px'}}>
                <Typography sx={{color: '#000'}} variant="h6">Hora creada:</Typography>
                <Typography sx={{color: '#000'}} variant="h6">{convertToTime(taskData.created_at)}</Typography>
            </div>
        </Box>
      </Modal>
      <Modal
        open={delTask}
        onClose={handleCloseDelete}
      >
        <Box className="modal-create" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography variant="h5">Do you want to delete the task?</Typography>
            <div className="split-buttons">
                <Button variant="contained" onClick={handleCloseDelete}>
                    <Typography>Cancelar</Typography>
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete}>
                    <Typography>Eliminar</Typography>
                </Button>
            </div>
        </Box>
      </Modal>
    </div>
  )
}

export default App
