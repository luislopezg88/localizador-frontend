import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'


import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import { Box } from '@mui/material'


import { finalidades } from 'src/moks/finalidades'
import { IEmpresa } from 'src/interfaces'

const Home = () => {

  const [empresa, setempresa] = useState<IEmpresa>({
    nombre: '',
    descripcion: '',
    finalidad: '',
    sector: '',
    empleados: '',
    intereses: '',
    tags: ['primera','segunda'],
    id_user: ''
  })
  const [tag, setTag] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setempresa({
      ...empresa,
      [name]: value
    })
  }

  const [oportunidades, setOportunidades] = useState([])

  const handleChangeSelect = (e: SelectChangeEvent) => {
    const {name, value} = e.target;
    setempresa({
      ...empresa,
      [name]: value
    })
  }

  const addTag = () => {
    if(tag == ''){
      return
    }
    let currentTags: Array<string> = [];
    currentTags = empresa.tags ? empresa.tags : []
    currentTags.push(tag)
    setempresa({
      ...empresa,
      tags: currentTags
    })
    setTag('')
  }

  const handleDelete = (index: number) => {
    let currentTags: Array<string> = [];
    if(empresa.tags){
      currentTags = empresa.tags
    }
    currentTags.splice(index, 1);
    setempresa({
      ...empresa,
      tags: currentTags
    })
  }

  const saveData = () => {

  }

  const searchOpornunities = () => {

  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>

        <Card>
          <CardHeader title='Datos de la empresa' titleTypographyProps={{ variant: 'h1' }} />
            <CardContent>

            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type='text'
                  label='Nombre'
                  placeholder='nombre de la empresa'
                  value={empresa.nombre}
                  name='nombre'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Sector de empresa</InputLabel>
                  <Select
                    label='Sector de empresa'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    value={empresa.sector}
                    name='sector'
                    onChange={handleChangeSelect}
                  >
                    <MenuItem value='microempresa'>Microempresas</MenuItem>
                    <MenuItem value='pyme'>Pequeñas y medianas empresas (PYME)</MenuItem>
                    <MenuItem value='grande'>Grandes empresas</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  label='Descripción'
                  placeholder='describe tu empresa'
                  multiline
                  rows={2}
                  value={empresa.descripcion}
                  name='descripcion'
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Finalidad</InputLabel>
                  <Select
                    label='Finalidad'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    value={empresa.finalidad}
                    name='finalidad'
                    onChange={handleChangeSelect}
                  >
                    {finalidades.map(f => (
                      <MenuItem value={f.keyword} key={f.keyword} >{f.descripcion}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type='number'
                  label='N° de empleados'
                  value={empresa.empleados}
                  name='empleados'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Intereses</InputLabel>
                  <Select
                    label='Intereses'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    value={empresa.sector}
                    name='sector'
                    onChange={handleChangeSelect}
                  >
                    <MenuItem value='microempresa'>Microempresas</MenuItem>
                    <MenuItem value='pyme'>Pequeñas y medianas empresas (PYME)</MenuItem>
                    <MenuItem value='grande'>Grandes empresas</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Divider sx={{ mt: 5, mb: 5 }} />

            <Grid container spacing={6}>
              <Grid item xs={12} md={8}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Typography variant='h6' sx={{ mb: 5 }}>
                    Tags
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row'
                    }}
                  >
                    <Grid container spacing={6}>
                      <Grid item xs={12} md={8}>
                        <TextField
                          fullWidth
                          type='text'
                          label='Nombre'
                          placeholder='Escribe algún interes'
                          value={tag}
                          onChange={(e) => setTag(e.target.value)}
                        />
                      </Grid> 
                      <Grid item xs={12} md={4}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '100%',
                            alignItems: 'center'
                          }}
                        >
                          <Button size='large' type='button' variant='contained' onClick={() => addTag()} >
                            Añadir Tag
                          </Button>
                        </Box>
                      </Grid>                
                      <Grid item xs={12} md={12}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                          }}
                        >
                          {empresa.tags.map((t: string, index: number) => (
                            <Chip label={t} variant="outlined" sx={{ mr: 5 }} onDelete={() => handleDelete(index)} />
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>                                
                </Box>
              </Grid> 
            </Grid> 
            
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12}>
                <Box
                  style={{
                    marginTop: 20
                  }}
                >
                  <Button size='large' type='button' variant='contained' onClick={() => saveData()} >
                    Guardar
                  </Button>
                </Box> 
              </Grid>
            </Grid>
            
          </CardContent>
        </Card>

        <Card
          sx={{
            mt: 10
          }}
        >
          <CardHeader title='Oportunudades de negocio' titleTypographyProps={{ variant: 'h1' }} />
            <CardContent>

              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <Box
                    style={{
                      marginTop: 20
                    }}
                  >
                    <Button size='large' type='button' variant='contained' onClick={() => searchOpornunities()} >
                      Buscar Oportunides
                    </Button>
                  </Box> 
                </Grid>
              </Grid>
            </CardContent>
          </Card>

      </Grid>
    </Grid>
  )
}

export default Home
