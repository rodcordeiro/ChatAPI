import { Module } from '@nestjs/common';

import { messagesProviders } from './providers/message.provider';
import { ChatServices } from './services/chat.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [...messagesProviders, ChatServices],
  exports: [ChatServices],
})
export class ChatModule {}
