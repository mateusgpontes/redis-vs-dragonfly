# REDIS-VS-DRAGONFLY

## Description

Performance test comparing Redis with Dragonfly

## Prerequisites

Before you begin, make sure you have installed:

- [Node.js](https://nodejs.org/)
- [Redis](https://redis.io/download)
- [Dragonfly](https://www.dragonflydb.io/install)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mateusgpontes/redis-vs-dragonfly.git
   ```
2. **Install dependencies:**
    ```bash
    cd redis-vs-dragonfly
    npm install
    ```
## Execution

1. **Start the Redis DB on the default port(6379):**
    ```bash
    sudo service redis-server start
    redis-cli
    ```
2. **Start the Dragonfly DB on port 6380:**
    - Binary
        ```bash
        ./dragonlfy --logtostderr --bind localhost --port 6380 --maxmemory=4gb
        ```
        - Another terminal
        ```bash
        redis-cli -p 6380
        ```
    - Dockers
        ```
        docker run --network=6380 --ulimit memlock=-1 docker.dragonflydb.io/dragonflydb/dragonfly
        ```
        - Inside the container
        ```bash
        redis-cli -p 6380
        ```

3. **Performance Test**
    ```bash
    node index
    ```