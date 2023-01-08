process.env.VUE_APP_API_BASE_URL = `https://overrun.${
  process.env.NODE_ENV === "production" ? "24heures.org" : "traefik.me"
}/api/v1`;

module.exports = {
  devServer: {
    disableHostCheck: true,
    public: `https://overrun.${
      process.env.NODE_ENV === "production" ? "24heures.org" : "traefik.me"
    }`,
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "OverRun";
      return args;
    });
  },
};
