import React, {useState, useEffect} from 'react'
import { useAuth } from '../context/AuthProvider'
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
import { Alert, Box, CircularProgress, Dialog, DialogTitle } from '@mui/material'

import { IEmpresa } from 'src/interfaces'
import { finalidades } from 'src/moks/finalidades'
import { instrumentos } from 'src/moks/instrumentos'
import { administraciones } from 'src/moks/administraciones'
import { organos } from 'src/moks/organos'
import { API_URL } from 'src/configs/constans'
import { AuthResponse, AuthResponseError, IResponseError } from 'src/configs/types'
import { AlertColor } from '@mui/material'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IMessage  {
  show: boolean;
  text: string;
  type: AlertColor
}

const Home = () => {

  const auth = useAuth();
  const [empresa, setempresa] = useState<IEmpresa>({
    id: '',
    nombre: '',
    descripcion: '',
    finalidad: '',
    tipo: '',
    empleados: '',
    instrumento: '',
    tags: [],
    id_user: '',
    administracion: '',
    organo: ''

  })
  const [tag, setTag] = useState<string>('')
  const [oportunidades, setOportunidades] = useState([])
  const [errorResponse, setErrorResponse] = useState("")
  const [message, setMessage] = useState<IMessage>({
    show: false,
    text: '',
    type: 'success'
  })
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCompanyData();
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setMessage({
      ...message,
      show: false
    })
    setempresa({
      ...empresa,
      [name]: value
    })
  }


  const handleChangeSelect = (e: SelectChangeEvent) => {
    const {name, value} = e.target;
    setMessage({
      ...message,
      show: false
    })
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

  async function handleSubmit() {
    //e.preventDefault();
    // auth.setIsAuthenticated(true);
    if(empresa.nombre == '' || empresa.descripcion == ''){
      setMessage({
        show: true,
        text: 'debe llenar todos los campo',
        type: 'error'
      })
      return
    } else {
      try {
        if(empresa.id != '' && empresa.id != null) { //update empresa
          const bodySend = {
            ...empresa,
            empleados: parseInt(empresa?.empleados, 10),
            tags: JSON.stringify(empresa.tags),
          }
          const response = await fetch(`${API_URL}/empresas/save/${empresa.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodySend)
          });
          if (response.ok) {
            const json = (await response.json()) as AuthResponse;
            console.log(json);
            setTimeout(() => {
              setMessage({
                show: true,
                text: 'Datos actualizados correctamente',
                type: 'success'
              })
            }, 2000);
          } else {
            const json = (await response.json()) as IResponseError;
            setErrorResponse(json.error);
          }
        } else { //create empresa
          const bodySend = {
            ...empresa,
            empleados: parseInt(empresa?.empleados, 10),
            tags: JSON.stringify(empresa.tags),
            id_user: auth.getUser()?.id
          }
          const response = await fetch(`${API_URL}/empresas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodySend)
          });
          if (response.ok) {
            const json = (await response.json()) as AuthResponse;
            console.log(json);
            setTimeout(() => {
              setMessage({
                show: true,
                text: 'Datos actualizados correctamente',
                type: 'success'
              })
            }, 2000);
          } else {
            const json = (await response.json()) as IResponseError;
            setTimeout(() => {
              setMessage({
                show: true,
                text: json.error,
                type: 'error'
              })
            }, 2000);
            setErrorResponse(json.error);
          }
        }
      } catch (error) {
        console.log(error);
        setMessage({
          show: true,
          text: 'Error al Intentar guardar los datos',
          type: 'error'
        })
      }
    }
  }

  const getCompanyData = async () =>{
    try {
      const response = await fetch(`${API_URL}/empresas?user=${auth.getUser()?.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const json = (await response.json()) as any;
        console.log(json);
        if(json && json.length > 0){
          const dataResponse = json[0];
          console.log('dataResponse', dataResponse)
          setempresa({
            id: dataResponse._id,
            nombre: dataResponse.nombre,
            tipo: dataResponse.tipo,
            descripcion: dataResponse.descripcion,
            tags: JSON.parse(dataResponse.tags),
            empleados: dataResponse.empleados,
            id_user: dataResponse.id_user,
            finalidad: dataResponse.finalidad,
            instrumento: dataResponse. instrumento,
            administracion: dataResponse.administracion,
            organo: dataResponse.organo
          })
        }
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const searchOpornunities = async () =>{
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/empresas/consultarLicitaciones/${auth.getUser()?.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = (await response.json()) as any;
      console.log(json)
      if (json.success) {
        setOportunidades(json.resultados)
        setLoading(false);
      } else {
        setLoading(false);
        setErrorResponse("No se encontraron convocatorias")
      }
    } catch (error) {
      setErrorResponse("Ocurrio un error intente nuevamente")
      console.log(error);
      setLoading(false);
    }
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
                  <InputLabel id='form-layouts-separator-select-label'>Tipo de empresa</InputLabel>
                  <Select
                    label='Tipo de empresa'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    value={empresa.tipo}
                    name='tipo'
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
                    {finalidades.map((f: any, index: number) => (
                      <MenuItem value={f.keyword} key={f.keyword + '-'+ index}>{f.descripcion}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Instrumento</InputLabel>
                  <Select
                    label='Instrumento'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    value={empresa.instrumento}
                    name='instrumento'
                    onChange={handleChangeSelect}
                  >
                    {instrumentos.map((i: any, index: number) =>(
                      <MenuItem value={i.keyword} key={i.keyword}>{i.descripcion}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Administración</InputLabel>
                  <Select
                    label='Administración'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    value={empresa.administracion}
                    name='administracion'
                    onChange={handleChangeSelect}
                  >
                    {administraciones.map((f: any, index: number) => (
                      <MenuItem value={f.keyword} key={f.keyword + '-'+ index}>{f.descripcion}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='form-layouts-separator-select-label'>Órgano</InputLabel>
                  <Select
                    label='Órgano'
                    defaultValue=''
                    id='form-layouts-separator-select'
                    labelId='form-layouts-separator-select-label'
                    value={empresa.organo}
                    name='organo'
                    onChange={handleChangeSelect}
                  >
                    {organos.map((f: any, index: number) => (
                      <MenuItem value={f.keyword} key={f.keyword + '-'+ index}>{f.descripcion}</MenuItem>
                    ))}
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
                            <Chip label={t} variant="outlined" sx={{ mr: 5 }} onDelete={() => handleDelete(index)}  key={t+ '-'+ index}/>
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
                  <Button size='large' type='button' variant='contained' onClick={() => handleSubmit()} >
                    Guardar
                  </Button>
                </Box>
              </Grid>
            </Grid>

            {message.show &&
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12} sx={{ mt: 6 }} >
                <Alert
                  variant="filled" severity={message.type}
                  onClose={() => {
                    setMessage({
                      ...message,
                      show: false
                    })
                  }}
                >
                  { message.text }
                </Alert>
              </Grid>
            </Grid>
            }

          </CardContent>
        </Card>

        <Card
          sx={{
            mt: 10
          }}
        >
          <CardHeader title='Oportunidades de negocio' titleTypographyProps={{ variant: 'h1' }} />
            <CardContent>

              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <Box
                    style={{
                      marginTop: 20,
                      display: 'flex'
                    }}
                  >
                    <Button size='large' type='button' variant='contained' onClick={() => searchOpornunities()} >
                      Buscar Oportunidades
                    </Button>

                  </Box>
                </Grid>
              </Grid>

              {errorResponse != '' &&
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={12} sx={{ mt: 6 }} >
                    <Alert
                      variant="filled" severity={'error'}
                      onClose={() => {
                        setErrorResponse('')
                      }}
                    >
                      { errorResponse }
                    </Alert>
                  </Grid>
                </Grid>
              }


            {oportunidades.length > 0 &&
              <div style={{ marginTop: 20 }}>
                {oportunidades.map((o:any, index: number) => (
                  <>
                    <Accordion key={o.index}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index+1}a-content`}
                        id= {`panel${index+1}a-header`}
                      >
                        <Typography>{o.id}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div style={{ widows: '100%', display: 'flex', flexDirection: 'column' }}>
                          <Typography>BDNS {o['codigo-BDNS']}</Typography>
                          <Typography>Descripción: {o.descripcionBR}</Typography>
                          <Typography>Registrada {o['fecha-registro']}</Typography>
                          <Typography>Modificado {o['fecha-mod']}</Typography>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </>
                ))}
              </div>
            }



            </CardContent>
        </Card>

        <Dialog onClose={() => { setLoading(false) }} open={loading}>
          <DialogTitle>Buscando...</DialogTitle>
          <Box sx={{ marginBottom: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 200 }}>
            <CircularProgress />
          </Box>
        </Dialog>

      </Grid>
    </Grid>
  )
}

export default Home
