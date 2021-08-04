import { Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { Controller, Get, Logger, Post } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Controller('api/v1/categorias')
export class AppController {

  private logger = new Logger(AppController.name)

  private clientAdminBackend : ClientProxy

  constructor() {
    console.log('construtor')
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options:{
        urls: ['amqp://user:bitnami@localhost:5672/smartranking'],
        queue:'admin-backend',
        queueOptions: {
          durable: false
        },
      }
    })

  }

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(@Body() criarCategoriaDto : CriarCategoriaDto){


    /* return await this.clientAdminBackend.emit('criar-Categoria',criarCategoriaDto) */

    console.log('Chegou aqui')
    this.clientAdminBackend.emit('criar-categoria',criarCategoriaDto)
  }
  
}
