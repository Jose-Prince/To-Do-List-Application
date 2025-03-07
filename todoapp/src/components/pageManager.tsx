import { Button } from '@mui/material/'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Meta } from '../types'
import controller from '../controller/controller'

type Props = {
    metaData: Meta,
    setLimit: (value: number) => void,
    setOrder: (value: string) => void,
    setPage: (value: number) => void,
    page: number,
    token: string | null
}

export default function PageManager({metaData, setLimit, setOrder, setPage, page, token}: Props) {

    const handleNextPage = () => {
        if (metaData.next) {
            const urlParams = new URLSearchParams(metaData.next.split('?')[1])
            
            const limit = urlParams.get('limit');
            const order = urlParams.get('order');

            if (limit && order && page && token) {
                setLimit(Number(limit))
                setOrder(order)
                setPage(page+1)

                controller.getTaskList(token, limit, order, String(page))
            }
        }
    }

    const handlePreviousPage = () => {
        if (metaData.previous) {
            const urlParams = new URLSearchParams(metaData.previous.split('?')[1])
            
            const limit = urlParams.get('limit');
            const order = urlParams.get('order');

            if (limit && order && page && token) {
                setLimit(Number(limit))
                setOrder(order)
                setPage(page-1)

                controller.getTaskList(token, limit, order, String(page))
            }
        }
    }


    return (
        <div className="split-buttons" style={{marginBottom: '30px'}}>
          { metaData.previous &&

           <Button variant="contained" onClick={handlePreviousPage}>
                <ArrowBackIosNewIcon/>
           </Button>
          }
          { metaData.next !== null &&
            <Button variant="contained" onClick={handleNextPage}>
                <ArrowForwardIosIcon/>
            </Button>
          }
      </div>
    )
}
