import { DataSource } from 'typeorm';
import { MessagesEntity } from '../entities/Message.entity';

export const messagesProviders = [
  {
    provide: 'MESSAGES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MessagesEntity),
    inject: ['DATA_SOURCE'],
  },
];
