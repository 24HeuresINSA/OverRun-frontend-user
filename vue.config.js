module.exports = {
  devServer: {
    disableHostCheck: true,
    public: "https://overrun.traefik.me",
  },
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = "OverRun";
            return args;
        })
}
};
