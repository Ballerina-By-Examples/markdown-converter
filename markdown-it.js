// imports
const md = require("markdown-it")();
const container = require("markdown-it-container");
const fs = require("fs");

// markdown-it containers
md.use(container, "code", {
  validate: function (params) {
    return params.trim().match(/code\s+(.*\w)/);
  },
  render: function (tokens, idx) {
    const m = tokens[idx].info.trim().match(/code\s+(.*\w)/);

    if (tokens[idx].nesting === 1) {
      let codeContent = fs.readFileSync(m[1], "utf-8").trim();
      return `
<br />      
<pre><code id="code" class="code-container">${codeContent}</code>
  <button>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#EEE" class="bi bi-github" viewBox="0 0 16 16">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  </button>
  <button>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#EEE" class="bi bi-clipboard" viewBox="0 0 16 16">
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
    </svg>
  </button>
  <button>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#45FF00" class="bi bi-check" viewBox="0 0 16 16">
      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
    </svg>
  </button>
</pre>`.trim();
    } else {
      return "";
    }
  },
});

md.use(container, "out", {
  validate: function (params) {
    return params.trim().match(/out\s+(.*\w)/);
  },
  render: function (tokens, idx) {
    const m = tokens[idx].info.trim().match(/out\s+(.*\w)/);

    if (tokens[idx].nesting === 1) {
      let outputRead = fs.readFileSync(m[1], "utf-8").trim();
      let outputSplitted = outputRead.split("\n");
      let output = `
<br />
<pre class="output-container"><code class="language-bash">`.trim();
      outputSplitted.forEach((line) => {
        output += `<span class="bal-output bal-execute">${line}</span>\n`;
      });
      output += `</code></pre>`;

      return output;
    } else {
      return "";
    }
  },
});

// generate nav template
const generateNavContent = (bbeName, jsonContent) => {
  let navContent = "";
  let catContent = "";
  let chapters = `<li class="chapter-item bal-nav-item affix"></li>`;
  let categories = "";
  let prevChapter = "";
  let expanded = false;
  let bbeFound = false;
  let difCatFound = false;
  let firstCat = true;

  let prevBBE = {};
  let nextBBE = {};
  let bbeTitle = "";

  jsonContent.forEach((category) => {
    let catName = category.category;
    if (prevChapter.toLowerCase() !== catName.toLowerCase()) {
      difCatFound = true;
    } else if (
      difCatFound &&
      prevChapter.toLowerCase() === catName.toLowerCase()
    ) {
      difCatFound = false;
    }

    let title = category.title;
    let bbeSamples = category.samples;
    let bbeNav = "";

    bbeSamples.forEach((bbeSample) => {
      let name = bbeSample["name"];
      let url = bbeSample["url"];

      if (url === bbeName) {
        bbeNav +=
          "\n" +
          `
<li class="chapter-item bal-nav-item expanded">
  <a
    href="/learn/by-example/${url}.html"
    class="active bal-active"
  >${name}</a>
</li>`.trim();
        expanded = true;
        bbeFound = true;
        bbeTitle = name;

        catContent = `
<li class="part-title expanded">
  <div>${catName}</div>
  <a class="toggle-category"><div>❱</div></a>
</li>`.trim();
      } else {
        if (!bbeFound) prevBBE = { url, name };
        if (bbeFound && Object.keys(nextBBE).length == 0)
          nextBBE = { url, name };
        bbeNav +=
          "\n" +
          `
<li class="chapter-item bal-nav-item">
  <a
    href="/learn/by-example/${url}.html"
  >${name}</a>
</li>`.trim();
      }
    });

    if (expanded) {
      categories +=
        "\n" +
        `
<li class="chapter-item bal-nav-item expanded">
  <div>${title}</div>
  <a class="toggle"><div>❱</div></a>
</li>
<li>
  <ol class="section">
    ${bbeNav}
  </ol>
</li>`.trim();

      expanded = false;
    } else {
      categories +=
        "\n" +
        `
<li class="chapter-item bal-nav-item">
  <div>${title}</div>
  <a class="toggle"><div>❱</div></a>
</li>
<li>
  <ol class="section">
    ${bbeNav}
  </ol>
</li>`.trim();
    }

    if (!firstCat && difCatFound) {
      if (catContent !== "") {
        chapters += "\n" + catContent;
        catContent = "";
      } else {
        chapters +=
          "\n" +
          `
<li class="part-title">
  <div>${prevChapter}</div>
  <a class="toggle-category"><div>❱</div></a>
</li>`.trim();
      }
      chapters +=
        "\n" +
        `
<ol>
  ${categories}
</ol>`.trim();
      prevChapter = catName;
    } else if (firstCat) {
      firstCat = false;
    }
  });

  if (catContent !== "") {
    chapters += "\n" + catContent;
    catContent = "";
  } else {
    chapters +=
      "\n" +
      `
<li class="part-title">
  <div>${prevChapter}</div>
  <a class="toggle-category"><div>❱</div></a>
</li>`.trim();
  }
  chapters +=
    "\n" +
    `
<ol>
  ${categories}
</ol>`.trim();

  navContent = `
<nav id="sidebar" class="sidebar" aria-label="Table of contents">
  <div class="sidebar-scrollbox">
    <ol class="chapter">
      ${chapters}
    </ol>
  </div>
  <div id="sidebar-resize-handle" class="sidebar-resize-handle"></div>
</nav>`.trim();

  return { bbeTitle, navContent, prevBBE, nextBBE };
};

// update the HTML file content
const generateHTML = (
  bbeName,
  jsonContent,
  metatags,
  codeSection,
  outputDir
) => {
  // navigation
  const { bbeTitle, navContent, prevBBE, nextBBE } = generateNavContent(
    bbeName,
    jsonContent
  );

  // liquid
  const liquid = `
---
layout: ballerina-example-page-old
title: ${bbeTitle}
${metatags}
permalink: /learn/by-example/${bbeName}
active: ${bbeName}
redirect_from:
    - /swan-lake/learn/by-example/${bbeName}
    - /swan-lake/learn/by-example/${bbeName}.html
---
    `.trim();

  // buttons
  const prevButton =
    Object.keys(prevBBE).length != 0
      ? `<a
  title="${prevBBE.name}"
  href="/learn/by-example/${prevBBE.url}.html"
  class="prev-button"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#545cec"
    class="bi bi-arrow-left"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
    />
  </svg>
  <div class="button-title">
    <span>Previous</span>
    <div>${prevBBE.name}</div>
  </div>
</a>`
      : "";

  const nextButton =
    Object.keys(nextBBE).length != 0
      ? `<a
  title="${nextBBE.name}"
  href="/learn/by-example/${nextBBE.url}.html"
  class="next-button"
>
  <div class="button-title">
    <span>Next</span>
    <div>${nextBBE.name}</div>
  </div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="#545cec"
    class="bi bi-arrow-right"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
    />
  </svg>
</a>`
      : "";

  // outputFormat
  output = `
${liquid}
<div class="bbe-container">
  ${navContent}
  <main class="bal-container">
    ${codeSection}
    <br />
    <div class="button-container">
      ${prevButton}
      ${nextButton}
    </div>
  </main>  
</div>`.trim();
  fs.writeFileSync(`${outputDir}/${bbeName}.html`, output);
};

// generate HTML files for the bbes
const generate = (examplesDir, outputDir) => {
  try {
    const startTime = Date.now();
    // bbes folders
    const bbes = fs.readdirSync(examplesDir);

    // index.json file
    const indexContent = fs.readFileSync(`${examplesDir}/index.json`, "utf-8");
    const jsonContent = JSON.parse(indexContent);

    bbes.forEach((bbe) => {
      let relPath = `${examplesDir}/${bbe}`;
      if (fs.statSync(relPath).isDirectory()) {
        const files = fs.readdirSync(relPath);
        let metatags = "";
        let codeSection = "";

        files.forEach((file) => {
          const fileRelPath = `${examplesDir}/${bbe}/${file}`;

          if (fs.statSync(fileRelPath).isFile()) {
            if (file.includes("metatags")) {
              metatags = fs.readFileSync(fileRelPath, "utf-8").trim();
            } else if (file.includes(".md")) {
              let content = fs.readFileSync(fileRelPath, "utf-8").trim();
              let contentArray = content.split("\n");

              let updatedArray = [];
              contentArray.forEach((line) => {
                let convertedLine = md.render(line);
                if (convertedLine === null) {
                  updatedArray.push("");
                } else {
                  updatedArray.push(convertedLine);
                }
              });

              codeSection = updatedArray.join("\n");
            }
          }
        });

        generateHTML(bbe, jsonContent, metatags, codeSection, outputDir);
      }
    });
    const executionTime = Date.now() - startTime;
    console.log(`Executed in ${executionTime / 1000}s`);
    console.log("HTML generation successful");
  } catch ({ message }) {
    console.log(message);
  }
};

const cmdArguments = process.argv;
const examplesDir = cmdArguments[2] ? cmdArguments[2] : "./examples";
const outputDir = cmdArguments[3] ? cmdArguments[3] : "./learn/by-example";

generate(examplesDir, outputDir);
