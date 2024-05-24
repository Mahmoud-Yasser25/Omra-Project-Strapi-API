'use strict';

/**
 * restaurant-website service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::restaurant-website.restaurant-website');
