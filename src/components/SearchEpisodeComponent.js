import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Container,
    Grid,
    Typography,
    Paper,
    InputBase,
    IconButton,
    Box,
    Pagination,
} from '@mui/material'
import {
    DataGrid,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
  } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';

import { getEpisodesList } from '../store/actions/episodes/episodesAction'
import { getEpisodesRowStruct } from '../utils/episodes'
import {
    title,
    searchInput,
    tableSection,
    tableContent,
    colors,
} from './themeConst/themeSearchEpisode.js'


const CustomPagination = () => {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    
    // Paginación para la tabla
    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        variant="outlined"
        showFirstButton
        showLastButton
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
}

const SearchEpisodeComponent = () => {
    const [searchValues, setSearchValues] = useState('')
    const [filteredData, setFilteredData] = useState([])

    const dispatch = useDispatch()

    // Recuperar datos de episodios desde el store
    const episodes = useSelector(
		({ episodesStore }) => episodesStore.episodes || [],
	)

    // Llmar a la API para traer datos de episodios
    const getEpisodesData = async () => {
		await dispatch(getEpisodesList())
	}

    useEffect(() => {
        getEpisodesData()
    }, [])

    const handleSearchValues = (e) => {
        const value = e.target.value

        setSearchValues(value.toLowerCase())

        // Cuando el valor ingresado al search input es mayor a dos caracteres
        // empieza el proceso de busqueda
        // Se puede buscar por nombre o por identificador de episodio
        if (value.length > 2) {
            const filteredData = episodes.filter((data) => (
                data.name.toLowerCase().indexOf(searchValues) !== -1 || 
                data.episode.toLowerCase().indexOf(searchValues) !== -1
            ))
            setFilteredData(filteredData)
        }
    }

    // Para limpiar los valores ingresados en el search input
    const handleCleanSearchValues = () => {
        setSearchValues('')
    }

    // La información de la tabla va a depender de:
    //   1. Si el search input no tiene valores serán mostrados todos los episodios
    //   2. El contenido de la tabla va a depender del valor ingresado en el search input
    //   3. Cuando hacemos click sobre el botón para limpiar datos ingresados en el search input
    //      vamos a mostrar todos los episodios
    const rowsList = episodes && getEpisodesRowStruct(episodes)
    const rows = filteredData.length > 0 && searchValues.length > 2 ? getEpisodesRowStruct(filteredData): rowsList
    
    const columns = [
        { field: "id", hide: true },
        { field: "col1", headerName: "Episode", sortable: false, width: 150 },
        { field: "col2", headerName: "Name", sortable: false, width: 300 },
        { field: "col3", headerName: "Air date", sortable: false, width: 300 },
    ]

    return (
        <Container>
            <Grid
                container
                direction='column'
                justifyContent='center'
                alignItems='center'
            >
                <Grid sx={{mt: '10px'}}>
                    <Typography
                        sx={title}
                    >
                        Rick and Morty
                    </Typography>
                </Grid>
               <Paper sx={searchInput}>
                    <InputBase
                        sx={{
                            ml: 2,
                            flex: 1
                        }}
                        placeholder='Search eposode ...'
                        value={searchValues}
                        onChange={handleSearchValues}
                    />
                    { searchValues && <>
                        <IconButton sx={{ p: '10px' }}>
                            <CloseIcon
                                sx={{color: colors.closeIcon}}
                                onClick={handleCleanSearchValues}
                            />
                        </IconButton>
                    </>}
               </Paper>
                <Paper
                    sx={tableSection}
                >
                    <Box sx={tableContent}>
                        <DataGrid
                            sx={{border: '0'}}
                            rows={rows}
                            columns={columns}
                            pagination
                            pageSize={10}
                            rowsPerPageOptions={[5]}
                            hideFooterSelectedRowCount={true}
                            hideFooterRowCount={true}
                            disableColumnMenu={true}
                            components={{
                                Pagination: CustomPagination,
                            }}
                        />
                    </Box>
               </Paper>
            </Grid>
        </Container>
    )
}

export default SearchEpisodeComponent
