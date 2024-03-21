/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
const { configDatabase } = require('./dist/src/database/config');

module.exports = {
  ...configDatabase,
  seeds: ['src/**/*.seed{.ts,.js}'],
  factories: ['src/**/*.factory{.ts,.js}'],
};
