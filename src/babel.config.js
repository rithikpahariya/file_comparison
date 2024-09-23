module.exports = {
    presets: [
      '@babel/preset-react', // Enable JSX and React transformation
      ['@babel/preset-env', { targets: { node: 'current' } }] // Transpile based on Node.js version
    ],
    
  };
  