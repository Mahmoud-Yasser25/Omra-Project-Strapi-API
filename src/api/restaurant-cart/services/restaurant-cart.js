'use strict';

/**
 * restaurant-cart service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::restaurant-cart.restaurant-cart');
