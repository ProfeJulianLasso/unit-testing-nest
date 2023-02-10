// Libraries
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

// Modules
import { DatabasesModule } from './modules/databases/databases.module';

// Controllers
import { AppController } from './controllers/app/app.controller';

// Services
import { AppService } from './services/app/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trimEnd()}`
      ),
      isGlobal: true
    }),
    DatabasesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
