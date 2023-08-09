import envConfig from '@config/env';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { routes } from './routes/index.routes';


const server = express();

server.use(express.json({ limit: "1024mb" }));
server.use(
  express.urlencoded({ limit: "1024mb", extended: true, parameterLimit: 50000 })
);
server.use(compression())
server.use(express.urlencoded({ extended: true }))
if (envConfig.ENV_MODE === "DEV") server.use(morgan("dev"))
server.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
server.use(routes)
/*
server.post('/products', async (_, res) => {
  try {
    const cost = 1.50;
    const price = 3.50;
    const profitMargin = ((price - cost) / cost) * 100;

    const product = await prismaClient.products.create({
      data: {
        name: 'Product 1',
        shortName: 'P 1',
        cost,
        price,
        profitMargin,
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar o produto.' });
  }
});

server.get('/products', async (_, res) => {
  try {
    const products: Products[] = await prismaClient.products.findMany();

    if (products.length < 1) {
      return res.status(304).json({ message: 'Product not found' })
    }

    return res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
});*/

const port = envConfig.API_PORT

server.listen(port, () => {
  console.log(`listening on ${port}`);
});