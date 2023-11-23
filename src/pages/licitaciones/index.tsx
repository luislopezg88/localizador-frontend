// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthProvider'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { Dayjs } from 'dayjs'
import dayjs from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { Button, CardContent } from '@mui/material'
import { API_URL } from 'src/configs/constans'
import { AuthResponseError } from 'src/configs/types'
import { ILicitacion } from 'src/interfaces'


const Licitaciones = () => {

  const router = useRouter()
  const auth = useAuth()

  const [errorResponse, setErrorResponse] = useState("")
  const [licitaciones, setLicitaciones] = useState<ILicitacion[]>([]);

  useEffect(() => {
    getLicitacionData()
  }, [])

  const getLicitacionData = async () =>{
    try {
      const response = await fetch(`${API_URL}/licitaciones?user=${auth.getUser()?.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = (await response.json()) as any;
        console.log(json);
        if(json && json.length > 0){
          const dataResponse = json as ILicitacion[];
          setLicitaciones(dataResponse);
        }
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  } 


  return ( 

    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader title='Mis licitaciones' titleTypographyProps={{ variant: 'h1' }} />
          <CardContent>
            <Box 
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >

              <Button size='large' type='button' variant='contained' 
                onClick={() => {
                  router.push('/licitaciones/save')
                }} 
              >
                Crear Licitación
              </Button>

            </Box>
          
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Inicio</TableCell>
                    <TableCell>Fin</TableCell>
                    <TableCell align='right'>Presupuesto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {licitaciones.map((row: ILicitacion, i: number) => (
                    <TableRow
                      key={row._id}
                      sx={{
                        '&:last-of-type td, &:last-of-type th': {
                          border: 0
                        }
                      }}
                    >
                      <TableCell component='th' scope='row'>
                        {row.nombre}
                      </TableCell>
                      <TableCell>{row.descripcion}</TableCell>
                      <TableCell>{row.inicio}</TableCell>
                      <TableCell>{row.fin}</TableCell>
                      <TableCell align='right'>{row.presupuesto}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>


          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
 
export default Licitaciones;