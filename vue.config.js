module.exports = {
  outputDir: "docs",
  publicPath:
  process.env.NODE_ENV === "production"
    // ? "/sg-masjid-project"
    // ? "/docs"
    ? "/"    
    : "/",
  transpileDependencies: [
    'vuetify',
  ],
};