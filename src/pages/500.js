// Custom 500 page
module.exports = {
  render(err) {
    return `
      <link rel="stylesheet" href="/main.css" />
      <div class="container">
        <h1>500 Server Error</h1>
        <p>An error occurred: ${err ? err.message : 'Unknown error'}</p>
        <footer>© 2025 Cottage.js Enterprise Framework</footer>
      </div>
    `;
  }
};
