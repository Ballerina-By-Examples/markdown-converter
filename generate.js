// imports
const fs = require("fs");

// sort inputOutputMapping
const sortMapping = (inOutMap) => {
  const balFiles = inOutMap.filter(
    (io) => io.tag !== "client" && io.tag !== "server" && io.tag !== "proto"
  );
  const protoFiles = inOutMap.filter((io) => io.tag === "proto");
  const clientFiles = inOutMap.filter((io) => io.tag === "client");
  const serveFiles = inOutMap.filter((io) => io.tag === "server");

  const output = [...protoFiles, ...balFiles, ...clientFiles, ...serveFiles];
  return output;
};

// generate nav template
const generateNavContent = (bbeName, jsonContent) => {
  let navContent = "";
  let chapters = `<li class="chapter-item bal-nav-item affix"></li>`;
  let categories = "";
  let prevChapter = "";
  let expanded = false;

  let prevBBE = {};
  let nextBBE = {};
  let bbeTitle = "";
  let bbeFound = false;

  jsonContent.forEach((category) => {
    let catName = category.category;
    if (prevChapter.toLowerCase() !== catName.toLowerCase()) {
      if (categories !== "") {
        chapters += `
                <ol>
                    ${categories}
                </ol>`;
        categories = "";
      }

      chapters += `
            <li class="part-title expanded">
                <div>${catName}</div>
                <a class="toggle-category"><div>❱</div></a>
            </li>`;

      prevChapter = catName;
    }
    let title = category.title;
    let bbeSamples = category.samples;
    let bbeNav = "";

    bbeSamples.forEach((bbeSample) => {
      let name = bbeSample["name"];
      let url = bbeSample["url"];

      if (url === bbeName) {
        bbeNav += `
                <li class="chapter-item bal-nav-item expanded">
                    <a
                        href="{{ '/learn/by-example/${url}.html' | relative_url }}"
                        class="active bal-active"
                    >${name}</a
                    >
                </li>`;
        expanded = true;
        bbeFound = true;
        bbeTitle = name;
      } else {
        if (!bbeFound) prevBBE = { url, name };
        if (bbeFound && Object.keys(nextBBE).length == 0)
          nextBBE = { url, name };
        bbeNav += `
                <li class="chapter-item bal-nav-item">
                    <a
                        href="{{ '/learn/by-example/${url}.html' | relative_url }}"
                    >${name}</a
                    >
                </li>`;
      }
    });

    if (expanded) {
      categories += `
            <li class="chapter-item bal-nav-item expanded">
                <div>${title}</div>
                <a class="toggle"><div>❱</div></a>
            </li>
            <li>
                <ol class="section">
                    ${bbeNav}
                </ol>
            </li>`;
      expanded = false;
    } else {
      categories += `
            <li class="chapter-item bal-nav-item">
                <div>${title}</div>
                <a class="toggle"><div>❱</div></a>
            </li>
            <li>
                <ol class="section">
                    ${bbeNav}
                </ol>
            </li>`;
    }
  });

  chapters += `
        <ol>
      ${categories}
        </ol>`;

  navContent = `
  <nav id="sidebar" class="sidebar" aria-label="Table of contents">
    <div class="sidebar-scrollbox">
      <ol class="chapter">
        ${chapters}
      </ol>
    </div>
    <div id="sidebar-resize-handle" class="sidebar-resize-handle"></div>
  </nav>      
  `;

  return { bbeTitle, navContent, prevBBE, nextBBE };
};

// update the HTML file content
const generateHTML = (
  bbeName,
  jsonContent,
  description,
  metatags,
  inputOutputMapping
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
    `;

  // description
  const descContainer = `
<div class="desc-container">
    <h1 id="${bbeName}">
        <a class="bal-header" href="#${bbeName}">${bbeTitle}</a>
    </h1>
    <p class="bal-description">
        ${description}
    </p>
</div>
  `;

  // button container
  const buttonContainer = `
<div class="cTopButtonContainer bal-nav-btns">
    ${
      Object.keys(prevBBE).length != 0
        ? `<div class="cButtonInfoContainer">
        <a
            class="prev"
            href="{{ '/learn/by-example/${prevBBE.url}' | relative_url }}"
            ><span>&lt; PREVIOUS</span>
            <p>${prevBBE.name}</p></a
        >
    </div>`
        : ""
    }
    ${
      Object.keys(nextBBE).length != 0
        ? `<div class="cButtonInfoContainer">
        <a
            class="next"
            href="{{ '/learn/by-example/${nextBBE.url}' | relative_url }}"
        ><span>NEXT &gt;</span>
        <p>${nextBBE.name}</p></a
        >
    </div>`
        : ""
    }
</div>
  `;

  // Ballerina code
  let code = "";

  inputOutputMapping.forEach((inOutMap) => {
    if (inOutMap.in) {
      code += `
<br />     
<pre><code id="code" class="code">${inOutMap.in.trim()}
</code><button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#EEE" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg></button><button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#EEE" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg></button><button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#45FF00" class="bi bi-check" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/></svg></button></pre>
              `;
    }

    if (inOutMap.out) {
      let outputLines = inOutMap.out.trim().split("\n");
      let formattedOutput = "";

      outputLines.forEach((line) => {
        formattedOutput += `
<span class="bal-output bal-execute">${line}</span>`;
      });
      code += `
<br />
<pre
    class="output-container"
><code class="language-bash">${formattedOutput.trim()}
</code></pre>
            `;
    }
  });

  if (code.trim() !== "") {
    // outputFormat
    output = `
${liquid}
<div class="mdbook-container">
    ${navContent}

    <main class="bal-container">
        <div>
            ${descContainer}
            ${buttonContainer}
        </div>
        ${code}      
    </main>    
</div>
      `;
    output = output.substring(2);
    fs.writeFileSync(`./learn/by-example/${bbeName}.html`, output);
  }
};

// generate HTML files for the bbes
const generate = (inputFilePath) => {
  // bbes folders
  const bbes = fs.readdirSync(inputFilePath);

  // index.json file
  const indexContent = fs.readFileSync(`${inputFilePath}/index.json`, "utf-8");
  const jsonContent = JSON.parse(indexContent);

  bbes.forEach((bbe) => {
    let relPath = `./examples/${bbe}`;
    if (fs.statSync(relPath).isDirectory()) {
      const files = fs.readdirSync(relPath);

      let description = "";
      let metatags = "";
      const inputOutputMapping = [];

      files.forEach((file) => {
        const fileRelPath = `./examples/${bbe}/${file}`;

        if (fs.statSync(fileRelPath).isFile()) {
          if (file.includes("description")) {
            description = fs
              .readFileSync(fileRelPath, "utf-8")
              .split("// ")
              .join("");
          } else if (file.includes("metatags")) {
            metatags = fs.readFileSync(fileRelPath, "utf-8").trim();
          } else if (file.includes(".proto")) {
            let tagFile = {
              tag: "proto",
              in: fs.readFileSync(fileRelPath, "utf-8"),
              out: "",
            };
            inputOutputMapping.push(tagFile);
          } else if (file.includes(".bal") || file.includes(".out")) {
            let fileNameSplitted = file.split(".");
            let tag = fileNameSplitted[fileNameSplitted.length - 2];
            let tagFound = false;
            for (let i = 0; i < inputOutputMapping.length; i++) {
              let inOutFile = inputOutputMapping[i];
              if (inOutFile.tag === tag) {
                if (file.includes(".bal")) {
                  inOutFile.in = fs.readFileSync(fileRelPath, "utf-8");
                } else {
                  inOutFile.out = fs.readFileSync(fileRelPath, "utf-8");
                }
                tagFound = true;
                break;
              }
            }
            if (!tagFound) {
              let tagFile = {};
              if (file.includes(".bal")) {
                tagFile = {
                  tag: tag,
                  in: fs.readFileSync(fileRelPath, "utf-8"),
                  out: "",
                };
              } else {
                tagFile = {
                  tag: tag,
                  in: "",
                  out: fs.readFileSync(fileRelPath, "utf-8"),
                };
              }
              inputOutputMapping.push(tagFile);
            }
          }
        }
      });
      const sortedMapping = sortMapping(inputOutputMapping);
      const htmlContent = generateHTML(
        bbe,
        jsonContent,
        description,
        metatags,
        sortedMapping
      );
    }
  });
};

const cmdArguments = process.argv;
const inputFilePath = cmdArguments[2] ? cmdArguments[2] : "./examples";

generate(inputFilePath);
