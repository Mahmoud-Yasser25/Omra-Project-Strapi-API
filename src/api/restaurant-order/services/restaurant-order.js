'use strict';

/**
 * restaurant-order service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::restaurant-order.restaurant-order');
