'use strict';

function run(context, [functionName, ...args]) {
  const func = CONDITIONALS[functionName];
  if (!func) {
    return null;
  } else {
    return func(context, ...args);
  }
};

const CONDITIONALS = module.exports = {
  run,

  always: function(req) {
    return true;
  },

  allOf: function(req, ...subItems) {
    return subItems.every(subItem => run(req, subItem));
  },

  oneOf: function(req, ...subItems) {
    return someItems.some(subItem => run(req, subItem));
  },

  not: function(req, subItem) {
    return !run(req, subItem);
  },

  pathMatch: function(req, pattern) {
    return req.originalUrl.match(new RegExp(pattern)) != null;
  },

  pathExact: function(req, path) {
    return req.originalUrl === path;
  },

  method: function(req, method) {
    if (typeof method === 'Array') {
      return method.includes(req.method);
    } else {
      return req.method === method;
    }
  },

  authScope: function(req, scope) {
    return false;
  }
};