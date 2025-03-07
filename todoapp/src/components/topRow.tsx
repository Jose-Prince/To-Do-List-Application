import { Typography, TextField, Button } from '@mui/material/'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

type Props = {
    order: string,
    setOrder: (value: string) => void,
    setLimit: (value: number) => void
}

export default function TopRow({order, setOrder, setLimit}: Props) {

    const numberList = [5, 10, 15, 20]

    const handleChangeOrder = () => {
          if (order === "ascending") {
            setOrder("descending")
          } else {
            setOrder("ascending")
          }
     }

    return (
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
    )
}
