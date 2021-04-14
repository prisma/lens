module.exports = {
  stories: ["../src/**/*.stories.@(mdx|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "storybook-dark-mode",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
}
