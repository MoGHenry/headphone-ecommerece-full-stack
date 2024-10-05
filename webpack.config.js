const path = require('path');

module.exports = {
  entry: './src/index.js', // Your entry point
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Bundled output file
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // For JS and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Allow importing JS/JSX without specifying extension
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 8000, // Local dev server port
  },
  mode: 'development', // Change to 'production' for production builds
};

