import { Module } from '@nestjs/common';

import { PepperController } from './pepper.controller';
import { PepperService } from './pepper.service';

@Module({
  controllers: [PepperController],
  providers: [PepperService],
})
export class PepperModule {}
