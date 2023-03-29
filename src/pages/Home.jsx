import { Grid } from "@mui/material"
import {Container} from "@mui/system"

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Loading from "../components/Loading/Loading"

import Navbar from "../components/Navbar"
import PokemonCard from "../components/PokemonCard"

import axios from 'axios';

import { useEffect, useState } from "react";

import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import MenuItem from '@mui/material/MenuItem';


import { Link } from 'react-router-dom';
import styles from "./Home.module.css"

function Home() {

    const [pokemons, setPokemons] = useState([])
    
    const options = [25, 50, 75, 100, 150]

    const [current, setCurrent] = useState(25)

    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        setCurrent(event.target.value)
        
        getPokemons(event.target.value)
  };

    useEffect(() => {

        getPokemons(25)

    }, [])

    const getPokemons = (option) => {
        
        let endpoints = []

        for(let i = 1; i<=option; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }

        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res)=> setPokemons(res))
        // axios.get("https://pokeapi.co/api/v2/pokemon?limit=50")
        // .then((response) => setPokemons(response.data.results))
        // .catch((err)=> console.log(err)) 
        
    }


    const pokemonFilter = (string) => {

        let filteredPokemons = []
        
        let name = string.toLowerCase()

        for(let i in pokemons) {
            if(pokemons[i].data.name.includes(name)) {
                filteredPokemons.push(pokemons[i])
            }
        }
        if(name.length===0) {
            getPokemons(current)
        } else {
                if(filteredPokemons.length !== 0) {
                    setPokemons(filteredPokemons)
                    setMessage('')
                } else {
                   setMessage("Não existem Pokemons com esse nome para essa seleção")
                }
        }
    }

    return (
        
        <div>

        <Navbar pokemonFilter={pokemonFilter}/>

        <FormControl variant="outlined" sx={{ mb: 4, p:2 , minWidth: 150 }}>
        <InputLabel id="demo-simple-select-standard-label" sx={{fontWeight: 900}}>Número de Pokemons</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={current}
          onChange={handleChange}
          label="Pokemon"
        >
          {
            options.map((option, index) => (
                <MenuItem value={option} key={index}>{option}</MenuItem>
            ))
          
          }
        </Select>
        </FormControl>


        <Container maxWidth="true">

            <Grid 
                spacing={5} 
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
            >
               
                {
                pokemons.length === 0 ? 
                
                <Loading/> 
                
                : 
                
                   message!=='' ? 
                    <>
                   <Alert severity="error">
                    <AlertTitle> <h2>Ops!</h2></AlertTitle>
                        {message}
                    </Alert>
                    </>
                    : (
                        
                        (pokemons.map( (pokemon, index) => (
                        <Grid sx={{margin:0}} item>
                            <Link className={styles.link} to={`pokemon/${pokemon.data.name}`} key={index}>
                        <PokemonCard  name={pokemon.data.name}
                            src={pokemon.data.sprites.front_default} 
                            types={pokemon.data.types}
                        />
    
                        </Link>
                        </Grid>
                    ) ) )
                   )

                    
                    
                }               

            </Grid>

        

        </Container>

        </div>
    )

}


export default Home