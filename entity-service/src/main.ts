/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { urlencoded } from 'express';
import { Logger } from '@nestjs/common';
import { CustomStrategy } from '@nestjs/microservices';
import { Listener } from '@nestjs-plugins/nestjs-nats-streaming-transport';

async function bootstrap() {
  // const hostDomain = AppModule.isDev ? `${AppModule.host}:${AppModule.port}` : `${AppModule.host}`;
  const logger = new Logger('bootstrap');
  const options: CustomStrategy = {
    strategy: new Listener(
      'my-cluster' /* clusterID */,
      'entity-service-listener' /* clientID */,
      'entity-service-group', /* queueGroupName */
      {
        url: 'http://127.0.0.1:4222'
      } /* TransportConnectOptions */,
      {
        durableName: 'entity-queue-group',
        manualAckMode: true,
        deliverAllAvailable: true,
      } /* TransportSubscriptionOptions */ ,
    ),
  };
  const app = await NestFactory.create(AppModule);
  app.use(urlencoded({ extended: true }));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.enableShutdownHooks();

  const swaggerOptions = new DocumentBuilder()
                              .setTitle('Core')
                              .setDescription('API Documentation')
                              .setVersion('1.0.0')
                              .addBearerAuth()
                              .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);

  app.use('/api/docs/swagger.json' , (req , res)=> {
    res.send(swaggerDocument);
  });

  SwaggerModule.setup('/', app, null , {
    swaggerUrl: `http://localhost:3000/api/docs/swagger.json`,
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    }
  });

  app.enableShutdownHooks();
  const port = 3000;
  let nodeAppInstance = 0;
  if (process.env.NODE_APP_INSTANCE) {
    nodeAppInstance = Number(process.env.NODE_APP_INSTANCE);
  }
  const microService = app.connectMicroservice(options)
  microService.listen(() => app.listen(port))
  // const server = await app.listen(port + nodeAppInstance);
  logger.log(`Application listening on port ${port + nodeAppInstance}`);
  logger.log(`Environment: ${process.env.NODE_ENV}`);

  // server.setTimeout(180000);
}
bootstrap();
