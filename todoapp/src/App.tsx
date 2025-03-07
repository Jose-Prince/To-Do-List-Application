import { useState, useEffect } from 'react'
import Login from './views/login.tsx'
import { useAuth } from './hooks/AuthContext'
import { Fab, Modal, Typography, Box, Divider, TextField, Button, Snackbar, Alert } from '@mui/material/'
import  Add  from '@mui/icons-material/Add'
import controller from './controller/controller'
import TopRow from './components/topRow'
import PageManager from './components/pageManager'
import TextAtributte from './components/textAtributte'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { Task, Meta } from './types'
import './App.css'

function App() {

  const [metaData, setMetaData] = useState<Meta>({
      pages: 0,
      next: null,
      previous: null
  })
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

  const [creation, setCreation] = useState(false)
  const [update, setUpdate] = useState(false)
  const [elimination, setElimination] = useState(false)
  

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
            setMetaData(list.meta)
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
        const list = await controller.getTaskList(token, String(limit), order, String(page))
        setTaskList(list.data)
        setMetaData(list.meta)
        setCreation(true)
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

        const list = await controller.getTaskList(token, String(limit), order, String(page))
        setTaskList(list.data)    
        setMetaData(list.meta)
        setUpdate(true)

      }
  }

  const handleDelete = async () => {
    if (token) {
        await controller.deleteTask(token, obtainedID)
        const list = await controller.getTaskList(token, String(limit), order, String(page))
        setTaskList(list.data)    
        setMetaData(list.meta)
    }
    setDelTask(false)
    setElimination(true)
  }
   const handleOpenDelete = (id: string) => {
        setDelTask(true)
        setObtainedID(String(id))
   }

   const yesnoAnswer = (bool: boolean) => {
        if (bool) {
            return "Sí"
        } else {
            return "No"
        }
   }

    
  return (
    <div style={{ position: 'relative' }}>
      { !logged &&
        <Login setLogged={setLogged} />
      }
      <TopRow order={order} setOrder={setOrder} setLimit={setLimit}/>
      <Divider/>
      <PageManager metaData={metaData} setPage={setPage} setOrder={setOrder} setLimit={setLimit} page={page} token={token}/>
      <div>
        {taskList
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
                        {!item.is_completed &&
                            <Button variant="contained" onClick={() => handleUpdate(String(item.id))}>
                              <CheckIcon />
                            </Button>
                        }
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

      {/*Modal for create task*/}
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

      {/*Modal for Task details*/}
      <Modal 
        open={see}
        onClose={handleCloseTask}
      >
        <Box className="modal-create">
            <Typography sx={{color: '#000'}} variant="h4">{taskData.title}</Typography>
            <Divider sx={{marginBottom: '15px'}}/>
            <TextAtributte label="Descripción:" content={nullableDesc(taskData.description)}/>
            <TextAtributte label="Completado:" content={yesnoAnswer(taskData.is_completed)}/>
            <TextAtributte label="Fecha de creación:" content={convertToDate(taskData.created_at)}/>
            <TextAtributte label="Hora de creación:" content={convertToTime(taskData.created_at)}/>
        </Box>
      </Modal>

      {/*Modal for deleting task*/}
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

      <Snackbar open={creation} autoHideDuration={3000} onClose={() => setCreation(false)}>
        <Alert severity="success" onClose={() => setCreation(false)}>
            Task created!
        </Alert>
      </Snackbar>
      <Snackbar open={update} autoHideDuration={3000} onClose={() => setUpdate(false)}>
        <Alert severity="success" onClose={() => setUpdate(false)}>
            Task completed!
        </Alert>
      </Snackbar>
      <Snackbar open={elimination} autoHideDuration={3000} onClose={() => setElimination(false)}>
        <Alert severity="warning" onClose={() => setElimination(false)}>
            Task eliminated!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default App
