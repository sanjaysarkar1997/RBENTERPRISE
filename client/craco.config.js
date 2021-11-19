const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#3f51b5",
              "@font-size-base": "12px",
              "@text-color": "#000000",
              "@border-radius-base": "10px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
