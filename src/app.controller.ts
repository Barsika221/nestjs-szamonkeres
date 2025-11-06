import { Controller, Get, Post, Render, Body, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CreateReservationDto } from './dto/create-reservation.dto';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  showForm() {
    return { errors: [], data: {}, success: null };
  }

  @Post()
  async create(@Body() body: CreateReservationDto, @Res() res: Response) {
    const errors: string[] = [];

    if (!body.name) errors.push('A név megadása kötelező.');
    if (!body.email?.includes('@')) errors.push('Az e-mail formátuma hibás.');
    if (new Date(body.date) < new Date()) errors.push('A dátum nem lehet múltbeli.');
    if (!body.guests || body.guests < 1 || body.guests > 10)
      errors.push('A vendégek száma 1 és 10 között lehet.');

    if (errors.length > 0) {
      return res.render('index', {
        errors,
        data: body,
        success: null,
      });
    }

    const csvPath = path.join(process.cwd(), 'reservations.csv');
    const line = `${body.name};${body.email};${body.date};${body.guests}\n`;
    fs.appendFileSync(csvPath, line);

    return res.render('index', {
      errors: [],
      data: {},
      success: 'A foglalás sikeresen mentve!',
    });
  }
}
