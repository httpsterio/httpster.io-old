module.exports = {
  name: "httpster.io",
  shortDesc:
    "Sami is a digital native indieweb jargon generator",
  url: "",
  authorEmail: "sami@httpster.io",
  authorHandle: "@httpsterio",
  authorName: "Sami",
  postsPerPage: 4,
  socialImage: "/img/social.jpg",
  theme: {
    primary: {
      background: "#c9f3e0",
      text: "#333",
      highlight: "#555",
    },
    secondary: {
      background: "white",
      text: "#244e3b",
      highlight: "#244e3b",
    },
    mute: {
      background: "#fbfbfb",
      text: "#555",
      highlight: "#244e3b",
    },
  },

  // Critical CSS results in much slower build times and uses a lot of system resources
  // turn on in production :)
  // See `site/transforms/critical-css-transform.js` for more details
  criticalCSS: process.env.NODE_ENV === "production",
};
