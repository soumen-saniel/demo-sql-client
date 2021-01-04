module.exports = {
  siteMetadata: {
    title: 'Demo sql client',
  },
  plugins: [
    // Emotion styling plugin
    'gatsby-plugin-emotion',
    // Offline support pluggin
    'gatsby-plugin-offline',
    // Plugin for using Google fonts
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Montserrat:400,500,600,700',
        ],
        display: 'swap',
      },
    },
    // Plugin fot using material UI
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {},
    },
  ],
};
