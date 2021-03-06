'use strict';

const Promise = require('bluebird');
const Redis   = require('ioredis');

const redis = new Redis({
  port: process.env.PORT_REDIS,   // Redis port
  host: process.env.HOST_REDIS,   // Redis host
  db: 0
});

exports.create = function(data) {
  const key  = data.key;
  const name = data.name;

  if(!key) {
    console.log("Key not exists");
    throw "Key not exists";
  }
  if(!name) {
    console.log("Name not exists");
    throw "Name not exists";
  }

  console.log('Init create Key');
  return new Promise((resolve, reject) => {
    redis.set(key, JSON.stringify({ name }))
      .then((result) => {
        console.log("Result from create ", result);
        resolve(result);
      })
      .catch((err) => {
        console.log("Error from create ", err);
        reject(err);
      });
  });
};

exports.findOne = function(key) {
  if(!key) {
    console.log("Key not exists");
    throw "Key not exists";
  }

  console.log('Init find Key');
  return new Promise((resolve, reject) => {
    redis.get(key)
      .then((result) => {
        result = JSON.parse(result);
        console.log("Read ", result);
        resolve(result);
      })
      .catch((err) => {
        console.log("Error from read ", err);
        reject(err);
      });
  });
};

exports.update = function(key, data) {
  if(!key) {
    console.log("Key not exists");
    throw "Key not exists";
  }

  if (data.key) {
    delete data.key;
  }

  return this.findOne(key)
    .then((r) => {
      let dataSet = Object.assign(data, r);

      return redis.set(key, JSON.stringify(dataSet))
        .tap((result) => {
          console.log("Result from update ", result);
        })
        .catchThrow((err) => {
          console.log("Error from update ", err);
        });
    });
};

exports.remove = function(key) {
  if(!key) {
    console.log("Key not exists");
    throw "Key not exists";
  }

  return new Promise((resolve, reject) => {
    redis.del(key)
      .then((result) => {
        console.log("Remove item: ", result);
        resolve(result);
      })
      .catch((err) => {
        console.log("Error from remove item ", err);
        reject(err)
      });
  })
};
