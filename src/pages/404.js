// Custom 404 page
module.exports = {
  render() {
    return `
      <link rel="stylesheet" href="/main.css" />
      <div class="container">
        <h1>404 Page Not Found</h1>
        <p>The page you requested does not exist.</p>
        <footer>© 2025 Cottage.js Enterprise Framework</footer>
      </div>
    `;
  }
};
