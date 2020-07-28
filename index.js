'use strict';

const helpers = require('./helpers');

exports.handler = function(event, ctx, callback) {
  if (event.create) {
    helpers.create({ key: e.key, data: e.data })
      .then((r) => console.log)
      .catch((e) => console.log);
  }

  if (event.get) {
    helpers.findOne(event.key)
      .then((r) => console.log)
      .catch((e) => console.log);
  }

  if (event.update) {
    helpers.update(event.key, e.data)
      .then((r) => console.log)
      .catch((e) => console.log);
  }

  if (event.remove) {
    helpers.remove(event.key)
      .then((r) => console.log)
      .catch((e) => console.log);
  }

  return callback(null, { ok: true });
};
