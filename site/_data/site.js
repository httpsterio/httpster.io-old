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
      background: "white",
      text: "#212121",
      highlight: "#fd205a",
    },
    secondary: {
      background: "#fbffec",
      text: "#fd205a",
      highlight: "ocean",
    },
    mute: {
      background: "white",
      text: "slate",
      highlight: "black",
    },
  },

  // Critical CSS results in much slower build times and uses a lot of system resources
  // turn on in production :)
  // See `site/transforms/critical-css-transform.js` for more details
  criticalCSS: process.env.NODE_ENV === "production",
};
