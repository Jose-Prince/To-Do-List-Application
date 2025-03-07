import { Typography } from '@mui/material/'

type Props = {
    label: string,
    content: string
}

export default function TextAtributte({label, content}: Props) {
    return (
        <div style={{display:'flex', gap: '15px'}}>
            <Typography sx={{color: '#000'}} variant="h6">{label}</Typography>
            <Typography sx={{color: '#000'}} variant="h6">{content}</Typography>
        </div>
    )
}
