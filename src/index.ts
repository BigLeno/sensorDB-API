import express from 'express';
import prisma from './prisma';

const app = express();

app.get('/temperature-now', async (req, res) => {
    const currentDay = new Date();
    currentDay.setHours(0,0,0,0);
    const currentDayFinal = new Date();
    currentDayFinal.setHours(23,59,59,999);
    const temperature = await prisma.info.aggregate({
        where: {createdAt: {
            gte: currentDay,
            lte: currentDayFinal
        }},
        _avg: {temperature: true},
    }) 
  res.send({"media": temperature._avg.temperature});
});

app.get('/humidity-now', async (req, res) => {
    const currentDay = new Date();
    currentDay.setHours(0,0,0,0);
    const currentDayFinal = new Date();
    currentDayFinal.setHours(23,59,59,999);
    const humidity = await prisma.info.aggregate({
        where: {createdAt: {
            gte: currentDay,
            lte: currentDayFinal
        }},
        _avg: {humidity: true},
    }) 
  res.send({"media": humidity._avg.humidity});
});

app.get('/luminosity-now', async (req, res) => {
    const currentDay = new Date();
    currentDay.setHours(0,0,0,0);
    const currentDayFinal = new Date();
    currentDayFinal.setHours(23,59,59,999);
    const luminosity = await prisma.info.aggregate({
        where: {createdAt: {
            gte: currentDay,
            lte: currentDayFinal
        }},
        _avg: {luminosity: true},
    }) 
  res.send({"media": luminosity._avg.luminosity});
});


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
