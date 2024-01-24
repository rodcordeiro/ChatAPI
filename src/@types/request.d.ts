import { FastifyRequest } from 'fastify';
import { UsersEntity } from '@/modules/users/entities/users.entity';

declare global {
  export type ChatRequest = {
    user: UsersEntity;
  } & FastifyRequest;
}
