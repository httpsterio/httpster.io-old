const jsdom = require("@tbranyen/jsdom");
const { JSDOM } = jsdom;
const slugify = require("slugify");

// This transform is almost entirely the work of Andy Bell
// I loved the idea so much I "borrowed" it.

module.exports = function (value, outputPath) {
  if (outputPath.endsWith(".html")) {
    const DOM = new JSDOM(value, {
      resources: "usable",
    });

    const document = DOM.window.document;

    const articleImages = [...document.querySelectorAll("main article img")];
    if (articleImages.length) {
      articleImages.forEach((image) => {
        // If an image has a title it means that the user added a caption
        // so replace the image with a figure containing that image and a caption
        if (image.hasAttribute("title")) {
          const figure = document.createElement("figure");
          const figCaption = document.createElement("figcaption");

          figCaption.innerHTML = image.getAttribute("title");

          image.removeAttribute("title");

          figure.appendChild(image.cloneNode(true));
          figure.appendChild(figCaption);

          image.replaceWith(figure);
        }

        image.setAttribute("loading", "lazy");
        image.setAttribute("data-src", image.src);
        image.removeAttribute("src");
      });
    }

    const articleHeadings = [
      ...document.querySelectorAll("main article h2, main article h3"),
    ];

    return "<!DOCTYPE html>\r\n" + document.documentElement.outerHTML;
  }
  return value;
};
