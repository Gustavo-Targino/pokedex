import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function PokemonCard({name, src, types}) {
  
    const changeColor = (principal) => {
      let color = ''
        if(principal === "water") {
            return color = "rgb(25, 167, 206, 0.7)"
        }
        if(principal === "grass" || principal === "bug") {
            return color = "rgb(95, 141, 78, 0.8)"
        }
        if(principal === "fire") {
            return color = "rgb(255, 3, 3, 0.7)"
        }
        if(principal ===  "electric") {
            return color = "rgb(247, 192, 74, 0.8)"
        }
        if(principal === "ground") {
            return color = "rgb(60, 42, 33,0.7)"
        }
        if(principal === "poison") {
            return color = "rgb(113, 73, 198, 0.7)"
        }
        if(principal==="normal") {
            return color = "rgb(216, 216, 216, 0.7)"
        }
    }

    const typeHandler = () => {
        if(types[1]) {
            let type0 = types[0].type.name
            let type0F = type0.charAt(0).toUpperCase() + type0.slice(1)

            let type1 = types[1].type.name
            let type1F = type1.charAt(0).toUpperCase() + type1.slice(1)

            return type0F + " | " + type1F
        }
        return types[0].type.name.charAt(0).toUpperCase() + types[0].type.name.slice(1)
    }

  return (
    <Card sx={{ maxWidth: 500, minWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={src}
          alt={name}
          sx={{backgroundColor: changeColor(types[0].type.name)}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
                {typeHandler(types)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
