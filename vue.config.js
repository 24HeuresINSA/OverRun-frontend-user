process.env.VUE_APP_API_BASE_URL = "https://overrun.24heures.org/api/v1";

module.exports = {
  devServer: {
    disableHostCheck: true,
    public: "https://overrun.24heures.org",
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "OverRun";
      return args;
    });
  },
};
