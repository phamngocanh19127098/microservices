run source
--> install docker 



    - run container natsStreaming: docker run -p 4222:4222 -p 8222:8222 nats-streaming -m 8222 -cid 'my-cluster' -SD


    - run container redis: docker run -d --name redis-test -p 6379:6379  -v /path/to/redisconf/redis.conf:/redis.conf redis redis-server /redis.conf