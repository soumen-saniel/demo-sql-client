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
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [{
          family: 'Montserrat',
          variants: ['400', '500', '600', '700'],
        }],
      },
    },
  ],
};
