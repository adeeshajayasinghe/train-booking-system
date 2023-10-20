import * as React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from 'react';
import image1 from '../images/Gallery-img-1.jpg';
import image2 from '../images/Gallery-img-2.jpg';
import image3 from '../images/Gallery-img-3.jpg';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function Gallery() {
  const [value, setValue] = useState(2);
  useEffect(() => {
    AOS.init({
      duration: 1000,
   });
  },[]);
  return (
    <section className='hero2'>
      <div className='gallery-content-center'>
          <Card sx={{ maxWidth: 345 }} data-aos="fade-right" data-aos-offset="200" style={{marginTop: '5rem'}}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={image1}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
              <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Typography component="legend">Controlled</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>

          <Card sx={{ maxWidth: 345 }} data-aos="fade-right" data-aos-offset="200" style={{marginTop: '5rem'}}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={image2}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
              <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Typography component="legend">Controlled</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>

          <Card sx={{ maxWidth: 345 }} data-aos="fade-left" data-aos-offset="200" style={{marginTop: '5rem'}}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={image3}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
              <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Typography component="legend">Controlled</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345 }} data-aos="fade-left" data-aos-offset="200" style={{marginTop: '5rem'}}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={image3}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
              <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Typography component="legend">Controlled</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
      </div> 
      <br />
    </section>
    
  );
}

