'use strict';

/**
 * supermarket-website service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::supermarket-website.supermarket-website');
