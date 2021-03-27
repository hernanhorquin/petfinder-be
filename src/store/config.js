export const config = {
  passport: {
    secret: 'SldsakldsaLÑASD#"!/2123123#$$%&&/',
    expiresIn: 10000,
  },
  env: {
    port: 8080,
    mongoDBUri: 'mongodb://localhost/test',
    mongoHostName: process.env.ENV === 'prod' ? 'mongodbAtlas' : 'localhost',
  },
};
export const underscoreId = '_id';