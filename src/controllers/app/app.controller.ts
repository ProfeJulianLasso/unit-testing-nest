import { Controller, Get } from '@nestjs/common';
import { AppService } from '../../services/app/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const response = [
      'uno',
      'dos',
      'tres',
      'cuatro',
      'cinco',
      'seis',
      'siete',
      'ocho',
    ];
    return this.appService.getHello();
  }
}
