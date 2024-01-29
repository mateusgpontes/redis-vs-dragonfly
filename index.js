const DB = require('ioredis');
const Benchmark = require('benchmark');

const clientDF = new DB(6380)
const clientRedis = new DB(6379)

let idRequest = 0;

function addValues(client) {
  client.dbsize((err, result) => {
    if (err) {
      return console.error('Error getting the number of keys:', err);
    };

    const values = 15000
    if(result < values){
      for (let i = 0; i < 15000; i++) {
        client.set(i, `value ${i}`);
      }
    }
  });
};

function getValue(client) {
  idRequest++;
  client.get(idRequest, (_, result) => {
    return result
  });
}

function runBenchmark() {
  const suite = new Benchmark.Suite();

  suite
    .add('getValue Dragonfly', () => {
      getValue(clientDF);
    })
    .add('getValue Redis', () => {
      getValue(clientRedis);
    })
    .on('cycle', (event) => {
      console.log(String(event.target));
    })
    .on('complete', () => {
      console.log('Benchmark complete.');
      process.exit();
    })
    .run({ async: true });
}

addValues(clientDF);
addValues(clientRedis);
runBenchmark();
