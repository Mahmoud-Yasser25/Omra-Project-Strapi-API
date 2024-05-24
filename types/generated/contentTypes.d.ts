import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    ecom_carts: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::ecom-cart.ecom-cart'
    >;
    restaurant_carts: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::restaurant-cart.restaurant-cart'
    >;
    supermarket_carts: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::supermarket-cart.supermarket-cart'
    >;
    ecom_orders: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::ecom-order.ecom-order'
    >;
    restaurant_orders: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::restaurant-order.restaurant-order'
    >;
    supermarket_orders: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::supermarket-order.supermarket-order'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEcomCartEcomCart extends Schema.CollectionType {
  collectionName: 'ecom_carts';
  info: {
    singularName: 'ecom-cart';
    pluralName: 'ecom-carts';
    displayName: 'ecomCart';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ecom_products: Attribute.Relation<
      'api::ecom-cart.ecom-cart',
      'manyToMany',
      'api::ecom-product.ecom-product'
    >;
    users_permissions_user: Attribute.Relation<
      'api::ecom-cart.ecom-cart',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ecom-cart.ecom-cart',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ecom-cart.ecom-cart',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEcomCategoryEcomCategory extends Schema.CollectionType {
  collectionName: 'ecom_categories';
  info: {
    singularName: 'ecom-category';
    pluralName: 'ecom-categories';
    displayName: 'ecomCategory';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    img: Attribute.Media;
    ecom_products: Attribute.Relation<
      'api::ecom-category.ecom-category',
      'manyToMany',
      'api::ecom-product.ecom-product'
    >;
    ecom_sub_categories: Attribute.Relation<
      'api::ecom-category.ecom-category',
      'manyToMany',
      'api::ecom-sub-category.ecom-sub-category'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ecom-category.ecom-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ecom-category.ecom-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEcomOrderEcomOrder extends Schema.CollectionType {
  collectionName: 'ecom_orders';
  info: {
    singularName: 'ecom-order';
    pluralName: 'ecom-orders';
    displayName: 'ecomOrder';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ecom_products: Attribute.Relation<
      'api::ecom-order.ecom-order',
      'manyToMany',
      'api::ecom-product.ecom-product'
    >;
    users_permissions_user: Attribute.Relation<
      'api::ecom-order.ecom-order',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    address: Attribute.Text & Attribute.Required;
    notes: Attribute.Text;
    totalMoney: Attribute.Decimal & Attribute.Required;
    status: Attribute.String & Attribute.DefaultTo<'pending'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ecom-order.ecom-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ecom-order.ecom-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEcomProductEcomProduct extends Schema.CollectionType {
  collectionName: 'ecom_products';
  info: {
    singularName: 'ecom-product';
    pluralName: 'ecom-products';
    displayName: 'ecomProduct';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    price: Attribute.Decimal & Attribute.Required;
    img: Attribute.Media & Attribute.Required;
    img2: Attribute.Media;
    isNew: Attribute.Boolean & Attribute.DefaultTo<false>;
    ecom_website: Attribute.Relation<
      'api::ecom-product.ecom-product',
      'manyToOne',
      'api::ecom-website.ecom-website'
    >;
    ecom_sub_categories: Attribute.Relation<
      'api::ecom-product.ecom-product',
      'manyToMany',
      'api::ecom-sub-category.ecom-sub-category'
    >;
    ecom_categories: Attribute.Relation<
      'api::ecom-product.ecom-product',
      'manyToMany',
      'api::ecom-category.ecom-category'
    >;
    ecom_carts: Attribute.Relation<
      'api::ecom-product.ecom-product',
      'manyToMany',
      'api::ecom-cart.ecom-cart'
    >;
    ecom_orders: Attribute.Relation<
      'api::ecom-product.ecom-product',
      'manyToMany',
      'api::ecom-order.ecom-order'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ecom-product.ecom-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ecom-product.ecom-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEcomSubCategoryEcomSubCategory
  extends Schema.CollectionType {
  collectionName: 'ecom_sub_categories';
  info: {
    singularName: 'ecom-sub-category';
    pluralName: 'ecom-sub-categories';
    displayName: 'ecomSubCategory';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    ecom_products: Attribute.Relation<
      'api::ecom-sub-category.ecom-sub-category',
      'manyToMany',
      'api::ecom-product.ecom-product'
    >;
    ecom_categories: Attribute.Relation<
      'api::ecom-sub-category.ecom-sub-category',
      'manyToMany',
      'api::ecom-category.ecom-category'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ecom-sub-category.ecom-sub-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ecom-sub-category.ecom-sub-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEcomWebsiteEcomWebsite extends Schema.CollectionType {
  collectionName: 'ecom_websites';
  info: {
    singularName: 'ecom-website';
    pluralName: 'ecom-websites';
    displayName: 'ecomWebsite';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    img: Attribute.Media & Attribute.Required;
    img2: Attribute.Media;
    ecom_products: Attribute.Relation<
      'api::ecom-website.ecom-website',
      'oneToMany',
      'api::ecom-product.ecom-product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ecom-website.ecom-website',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ecom-website.ecom-website',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHotelHotel extends Schema.CollectionType {
  collectionName: 'hotels';
  info: {
    singularName: 'hotel';
    pluralName: 'hotels';
    displayName: 'hotel';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    description: Attribute.Text & Attribute.Required;
    address: Attribute.Text & Attribute.Required & Attribute.Unique;
    img: Attribute.Media & Attribute.Required;
    img2: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::hotel.hotel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::hotel.hotel',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRestaurantCartRestaurantCart extends Schema.CollectionType {
  collectionName: 'restaurant_carts';
  info: {
    singularName: 'restaurant-cart';
    pluralName: 'restaurant-carts';
    displayName: 'restaurantCart';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    restaurant_items: Attribute.Relation<
      'api::restaurant-cart.restaurant-cart',
      'manyToMany',
      'api::restaurant-item.restaurant-item'
    >;
    users_permissions_user: Attribute.Relation<
      'api::restaurant-cart.restaurant-cart',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::restaurant-cart.restaurant-cart',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::restaurant-cart.restaurant-cart',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRestaurantItemRestaurantItem extends Schema.CollectionType {
  collectionName: 'restaurant_items';
  info: {
    singularName: 'restaurant-item';
    pluralName: 'restaurant-items';
    displayName: 'restaurantItem';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    price: Attribute.Decimal & Attribute.Required;
    img: Attribute.Media & Attribute.Required;
    img2: Attribute.Media;
    isNew: Attribute.Boolean & Attribute.DefaultTo<false>;
    restaurant_website: Attribute.Relation<
      'api::restaurant-item.restaurant-item',
      'manyToOne',
      'api::restaurant-website.restaurant-website'
    >;
    restaurant_items_categories: Attribute.Relation<
      'api::restaurant-item.restaurant-item',
      'manyToMany',
      'api::restaurant-items-category.restaurant-items-category'
    >;
    restaurant_carts: Attribute.Relation<
      'api::restaurant-item.restaurant-item',
      'manyToMany',
      'api::restaurant-cart.restaurant-cart'
    >;
    restaurant_orders: Attribute.Relation<
      'api::restaurant-item.restaurant-item',
      'manyToMany',
      'api::restaurant-order.restaurant-order'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::restaurant-item.restaurant-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::restaurant-item.restaurant-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRestaurantItemsCategoryRestaurantItemsCategory
  extends Schema.CollectionType {
  collectionName: 'restaurant_items_categories';
  info: {
    singularName: 'restaurant-items-category';
    pluralName: 'restaurant-items-categories';
    displayName: 'restaurantItemsCategory';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    img: Attribute.Media;
    restaurant_items: Attribute.Relation<
      'api::restaurant-items-category.restaurant-items-category',
      'manyToMany',
      'api::restaurant-item.restaurant-item'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::restaurant-items-category.restaurant-items-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::restaurant-items-category.restaurant-items-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRestaurantOrderRestaurantOrder
  extends Schema.CollectionType {
  collectionName: 'restaurant_orders';
  info: {
    singularName: 'restaurant-order';
    pluralName: 'restaurant-orders';
    displayName: 'restaurantOrder';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    restaurant_items: Attribute.Relation<
      'api::restaurant-order.restaurant-order',
      'manyToMany',
      'api::restaurant-item.restaurant-item'
    >;
    users_permissions_user: Attribute.Relation<
      'api::restaurant-order.restaurant-order',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    address: Attribute.Text & Attribute.Required;
    notes: Attribute.Text;
    totalMoney: Attribute.Decimal & Attribute.Required;
    status: Attribute.String & Attribute.DefaultTo<'pending'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::restaurant-order.restaurant-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::restaurant-order.restaurant-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRestaurantWebsiteRestaurantWebsite
  extends Schema.CollectionType {
  collectionName: 'restaurant_websites';
  info: {
    singularName: 'restaurant-website';
    pluralName: 'restaurant-websites';
    displayName: 'restaurantWebsite';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    img: Attribute.Media & Attribute.Required;
    img2: Attribute.Media;
    restaurant_items: Attribute.Relation<
      'api::restaurant-website.restaurant-website',
      'oneToMany',
      'api::restaurant-item.restaurant-item'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::restaurant-website.restaurant-website',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::restaurant-website.restaurant-website',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupItemsCategorySupItemsCategory
  extends Schema.CollectionType {
  collectionName: 'sup_items_categories';
  info: {
    singularName: 'sup-items-category';
    pluralName: 'sup-items-categories';
    displayName: 'supItemsCategory';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    img: Attribute.Media;
    supermarket_items: Attribute.Relation<
      'api::sup-items-category.sup-items-category',
      'manyToMany',
      'api::supermarket-item.supermarket-item'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sup-items-category.sup-items-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sup-items-category.sup-items-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupermarketCartSupermarketCart
  extends Schema.CollectionType {
  collectionName: 'supermarket_carts';
  info: {
    singularName: 'supermarket-cart';
    pluralName: 'supermarket-carts';
    displayName: 'supermarketCart';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    supermarket_items: Attribute.Relation<
      'api::supermarket-cart.supermarket-cart',
      'manyToMany',
      'api::supermarket-item.supermarket-item'
    >;
    users_permissions_user: Attribute.Relation<
      'api::supermarket-cart.supermarket-cart',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::supermarket-cart.supermarket-cart',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::supermarket-cart.supermarket-cart',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupermarketItemSupermarketItem
  extends Schema.CollectionType {
  collectionName: 'supermarket_items';
  info: {
    singularName: 'supermarket-item';
    pluralName: 'supermarket-items';
    displayName: 'supermarketItem';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    price: Attribute.Decimal & Attribute.Required;
    img: Attribute.Media & Attribute.Required;
    img2: Attribute.Media;
    isNew: Attribute.Boolean & Attribute.DefaultTo<false>;
    supermarket_website: Attribute.Relation<
      'api::supermarket-item.supermarket-item',
      'manyToOne',
      'api::supermarket-website.supermarket-website'
    >;
    sup_items_categories: Attribute.Relation<
      'api::supermarket-item.supermarket-item',
      'manyToMany',
      'api::sup-items-category.sup-items-category'
    >;
    supermarket_carts: Attribute.Relation<
      'api::supermarket-item.supermarket-item',
      'manyToMany',
      'api::supermarket-cart.supermarket-cart'
    >;
    supermarket_orders: Attribute.Relation<
      'api::supermarket-item.supermarket-item',
      'manyToMany',
      'api::supermarket-order.supermarket-order'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::supermarket-item.supermarket-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::supermarket-item.supermarket-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupermarketOrderSupermarketOrder
  extends Schema.CollectionType {
  collectionName: 'supermarket_orders';
  info: {
    singularName: 'supermarket-order';
    pluralName: 'supermarket-orders';
    displayName: 'supermarketOrder';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    supermarket_items: Attribute.Relation<
      'api::supermarket-order.supermarket-order',
      'manyToMany',
      'api::supermarket-item.supermarket-item'
    >;
    users_permissions_user: Attribute.Relation<
      'api::supermarket-order.supermarket-order',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    address: Attribute.Text & Attribute.Required;
    notes: Attribute.Text;
    totalMoney: Attribute.Decimal;
    status: Attribute.String & Attribute.DefaultTo<'pending'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::supermarket-order.supermarket-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::supermarket-order.supermarket-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupermarketWebsiteSupermarketWebsite
  extends Schema.CollectionType {
  collectionName: 'supermarket_websites';
  info: {
    singularName: 'supermarket-website';
    pluralName: 'supermarket-websites';
    displayName: 'supermarketWebsite';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    img: Attribute.Media & Attribute.Required;
    img2: Attribute.Media;
    supermarket_items: Attribute.Relation<
      'api::supermarket-website.supermarket-website',
      'oneToMany',
      'api::supermarket-item.supermarket-item'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::supermarket-website.supermarket-website',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::supermarket-website.supermarket-website',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::ecom-cart.ecom-cart': ApiEcomCartEcomCart;
      'api::ecom-category.ecom-category': ApiEcomCategoryEcomCategory;
      'api::ecom-order.ecom-order': ApiEcomOrderEcomOrder;
      'api::ecom-product.ecom-product': ApiEcomProductEcomProduct;
      'api::ecom-sub-category.ecom-sub-category': ApiEcomSubCategoryEcomSubCategory;
      'api::ecom-website.ecom-website': ApiEcomWebsiteEcomWebsite;
      'api::hotel.hotel': ApiHotelHotel;
      'api::restaurant-cart.restaurant-cart': ApiRestaurantCartRestaurantCart;
      'api::restaurant-item.restaurant-item': ApiRestaurantItemRestaurantItem;
      'api::restaurant-items-category.restaurant-items-category': ApiRestaurantItemsCategoryRestaurantItemsCategory;
      'api::restaurant-order.restaurant-order': ApiRestaurantOrderRestaurantOrder;
      'api::restaurant-website.restaurant-website': ApiRestaurantWebsiteRestaurantWebsite;
      'api::sup-items-category.sup-items-category': ApiSupItemsCategorySupItemsCategory;
      'api::supermarket-cart.supermarket-cart': ApiSupermarketCartSupermarketCart;
      'api::supermarket-item.supermarket-item': ApiSupermarketItemSupermarketItem;
      'api::supermarket-order.supermarket-order': ApiSupermarketOrderSupermarketOrder;
      'api::supermarket-website.supermarket-website': ApiSupermarketWebsiteSupermarketWebsite;
    }
  }
}
