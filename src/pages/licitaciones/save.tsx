import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs'
import { ILicitacion } from 'src/interfaces'



const Save = () => {

  const [licitacion, setLicitacion] = useState<ILicitacion>({
    nombre: '',
    descripcion: '',
    inicio: null,
    fin: null,
    presupuesto: '',
    id_user: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setLicitacion({
      ...licitacion,
      [name]: value
    })
  }

  const saveData = () => {

  }

  return ( 
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader title='Guardar Licitación' titleTypographyProps={{ variant: 'h1' }} />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    type='text'
                    label='Nombre'
                    placeholder='nombre de la licitaión'
                    value={licitacion.nombre}
                    name='nombre'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    type='text'
                    label='Descripción'
                    placeholder='descripción de la licitación'
                    value={licitacion.descripcion}
                    name='descripcion'
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                      sx={{
                        width: '100%'
                      }}
                      label={'Fecha de inicio'}
                      value={licitacion.inicio} onChange={(newValue) => {
                        setLicitacion({
                          ...licitacion,
                          inicio: newValue
                        })
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{
                        width: '100%'
                      }} 
                      label={'Fecha de culminación'}
                      value={licitacion.fin} onChange={(newValue) => {
                        setLicitacion({
                          ...licitacion,
                          fin: newValue
                        })
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type='Presupuesto'
                    label='presupuesto'
                    value={licitacion.presupuesto}
                    name='nombre'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Box>
                    <Button size='large' type='button' variant='contained' onClick={() => saveData()} >
                      Guardar
                    </Button>
                  </Box> 
                </Grid>
              </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid> 
  );
}
 
export default Save;