import { Inject, Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';

import { MessagesEntity } from '../entities/Message.entity';
import { UsersService } from '@/modules/users/services/users.service';

@Injectable()
export class ChatServices {
  constructor(
    @Inject('MESSAGES_REPOSITORY')
    private _messagesRepository: Repository<MessagesEntity>,
    private readonly _usersService: UsersService,
  ) {}

  async create(data: ChatJS.Message, delivered?: boolean) {
    const author = await this._usersService.findBy({
      id: data.metadata.author,
    });
    const destiny = await this._usersService.findBy({ id: data.metadata.to });
    const message = this._messagesRepository.create({
      content: data.data.content,
      from: author,
      to: destiny,
      delivered: delivered ?? false,
    });
    return this._messagesRepository.save(message);
  }

  async unread(to: string) {
    const messages = await this._messagesRepository.find({
      order: {
        createdAt: 'DESC',
      },
      where: {
        to: { id: to },
      },
    });
    this._messagesRepository.update(
      {
        id: In(messages.map(message => message.id)),
      },
      { delivered: true },
    );
    return messages.map(message => ({
      data: { content: message.content },
      metadata: {
        author: message.from,
        createdAt: message.createdAt,
        to: message.to,
        id: message.id,
      },
    }));
  }
}
