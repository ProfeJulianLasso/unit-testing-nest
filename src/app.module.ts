// Libraries
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

// Modules
import { DatabasesModule } from './modules/databases';

// Controllers
import { AppController, TransactionalController } from './controllers';

// Services
import { AppService, TransactionalService } from './services';

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
  controllers: [AppController, TransactionalController],
  providers: [AppService, TransactionalService]
})
export class AppModule {}
