module.exports = {
  name: "httpster.io",
  shortDesc: "Sami is a digital native indieweb jargon generator",
  url: "https://httpster.io",
  font: "/fonts/inter3.19.var-subset.woff2",
  authorEmail: "sami@httpster.io",
  authorHandle: "@httpsterio",
  authorName: "Sami",
  postsPerPage: 4,
  socialImage: "/img/social.jpg",
  theme: {
    primary: {
      background: "white",
      text: "#0f0f0f",
      highlight: "#666",
    },
    secondary: {
      background: "#0f0f0f",
      text: "white",
      highlight: "#666",
    },
  },
  //toggling service worker
  sw: false,

  // Critical CSS results in much slower build times and uses a lot of system resources
  // turn on in production :)
  // See `site/transforms/critical-css-transform.js` for more details
  criticalCSS: process.env.NODE_ENV === "production",
};