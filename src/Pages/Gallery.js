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
                Kandy to Ella
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Journey through lush tea plantations and scenic landscapes on one of the most picturesque train routes in the world.
              </Typography>
              <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Typography component="legend">Ratings</Typography>
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
              Colombo to Jaffna
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Experience a cultural journey as you travel to the northern city of Jaffna, exploring diverse landscapes and traditions along the way.
              </Typography>
              <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Typography component="legend">Ratings</Typography>
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
              Badulla to Nanu Oya
              </Typography>
              <Typography variant="body2" color="text.secondary">
              This route takes you to the heart of Sri Lanka's hill country, offering breathtaking vistas of misty mountains and cascading waterfalls.
              </Typography>
              <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Typography component="legend">Ratings</Typography>
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
              image="https://srilankatravelpages.com/media/2022/01/train-line-colombo.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              Colombo to Galle
              </Typography>
              <Typography variant="body2" color="text.secondary">
              Enjoy coastal views and historic charm as you travel from the bustling capital to the serene city of Galle.
              </Typography>
              <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Typography component="legend">Ratings</Typography>
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

