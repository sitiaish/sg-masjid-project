module.exports = {
  publicPath:
  process.env.NODE_ENV === "production"
    ? "/sg-masjid-project"
    : "/",
  transpileDependencies: [
    'vuetify',
  ],
};