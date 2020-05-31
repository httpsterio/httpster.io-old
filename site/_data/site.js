module.exports = {
  name: "httpster.io",
  shortDesc: "Sami is a digital native indieweb jargon generator",
  url: "https://httpster.io",
  font: "/fonts/Inter-roman.var-subset.woff2?v=3.13",
  authorEmail: "sami@httpster.io",
  authorHandle: "@httpsterio",
  authorName: "Sami",
  postsPerPage: 4,
  socialImage: "/img/social.jpg",
  theme: {
    primary: {
      background: "white",
      text: "black",
      highlight: "#666",
    },
    secondary: {
      background: "black",
      text: "white",
      highlight: "#666",
    },
  },
  //toggling service worker
  sw: false,

  // Critical CSS results in much slower build times and uses a lot of system resources
  // turn on in production :)
  // See `site/transforms/critical-css-transform.js` for more details
  criticalCSS: false,
};