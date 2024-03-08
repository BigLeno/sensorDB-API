import express from 'express';
import prisma from './prisma';

const app = express();
const port = 3000;

app.get('/last-temperature', async (req, res) => {
  const last_temperature = await prisma.info.findFirst({
    orderBy : { id: "desc"}
  })
  res.send({"last": last_temperature?.temperature})
})

app.get('/last-humidity', async (req, res) => {
  const last_humidity = await prisma.info.findFirst({
    orderBy : { id: "desc"}
  })
  res.send({"last": last_humidity?.humidity})
})

app.get('/last-luminosity', async (req, res) => {
  const last_luminosity = await prisma.info.findFirst({
    orderBy : { id: "desc"}
  })
  res.send({"last": last_luminosity?.luminosity})
})

app.get('/daily-temperature', async (req, res) => {
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

app.get('/daily-humidity', async (req, res) => {
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

app.get('/daily-luminosity', async (req, res) => {
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

app.get('/historic', async (req, res) => {
  const {page, total, createdAt, maxTemp, minTemp, maxHumidity, minHumidity, maxLuminosity, minLuminosity} = req.query
  const currentDay = new Date(`${createdAt}`)
  currentDay.setHours(0,0,0,0)
  const currentDayFinal = new Date(`${createdAt}`)
  currentDayFinal.setHours(23,59,59,999);
  const historic_data = await prisma.info.findMany({
    where : {
      createdAt : {
        gte:currentDay,
        lte:currentDayFinal
      },
      temperature : {
        gte : Number(minTemp),
        lte : Number(maxTemp)
      },
      humidity : {
        gte : Number(minHumidity),
        lte : Number(maxHumidity)
      },
      luminosity : {
        gte : Number(minLuminosity),
        lte : Number(maxLuminosity)
      }
    },
    orderBy : {createdAt: "desc"},
    skip : Number(page) * Number(total),
    take : Number(total)
  })
  res.send({"historic" : historic_data})
})


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
