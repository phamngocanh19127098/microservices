import { Publisher } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Injectable } from '@nestjs/common';
import { UserCreatedEvent } from 'src/common/event/user';
import { UserPatterns } from 'src/common/pattern';
import { RedisCacheService } from 'src/redis-cache/redis-cache.service';

@Injectable()
export class CustomerService {
    constructor(
        private publisher: Publisher,
        private redisCacheService: RedisCacheService,
    ) { }

    async getHello(): Promise<string> {
        const event: UserCreatedEvent = { id: Math.floor(Math.random() * Math.floor(1000)), username: 'bernt' }
        this.publisher.emit<string, UserCreatedEvent>(UserPatterns.UserCreated, event).subscribe(guid => {
            console.log('published message with guid:', guid)
        });
        await this.redisCacheService.set("id", event.id);
        return `published message: ${JSON.stringify(event)}`
    }
}
