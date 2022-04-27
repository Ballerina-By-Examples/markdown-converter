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

// finds the Title of the BBE
const findBBETitle = (bbeName, jsonContent) => {
  let title = "";
  jsonContent.forEach((category) => {
    let bbeSamples = category.samples;

    bbeSamples.forEach((bbeSample) => {
      let name = bbeSample["name"];
      let url = bbeSample["url"];

      if (url === bbeName) {
        title = name;
        return title;
      }
    });
  });
  return title;
};

// update the md file content
const generateMarkdown = (
  bbeName,
  jsonContent,
  description,
  inputOutputMapping
) => {
  // title
  const title = findBBETitle(bbeName, jsonContent);

  // Ballerina code
  let code = "";
  inputOutputMapping.forEach((inOutMap) => {
    if (inOutMap.in) {
      code += `::: code ${inOutMap.in.relPath} :::\n\n`;
    }

    if (inOutMap.out) {
      code += `::: out ${inOutMap.out.relPath} :::\n\n`;
    }
  });

  code = code.trim();

  if (code !== "") {
    // outputFormat
    output = `
# ${title}

${description}

${code}`.trim();
    outputFileName = bbeName.split("-").join("_");
    fs.writeFileSync(
      `${inputFilePath}/${bbeName}/${outputFileName}.md`,
      output
    );
  }
};

// generate markdown files for the bbes
const generate = () => {
  // bbes folders
  const bbes = fs.readdirSync(inputFilePath);

  // index.json file
  const indexContent = fs.readFileSync(`${inputFilePath}/index.json`, "utf-8");
  const jsonContent = JSON.parse(indexContent);

  bbes.forEach((bbe) => {
    let relPath = `${inputFilePath}/${bbe}`;
    if (fs.statSync(relPath).isDirectory()) {
      const files = fs.readdirSync(relPath);

      let description = "";
      let metatags = "";
      const inputOutputMapping = [];

      files.forEach((file) => {
        const fileRelPath = `${inputFilePath}/${bbe}/${file}`;

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
              in: {
                relPath: fileRelPath,
              },
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
                  inOutFile.in = {
                    relPath: fileRelPath,
                  };
                } else {
                  inOutFile.out = {
                    relPath: fileRelPath,
                  };
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
                  in: {
                    relPath: fileRelPath,
                  },
                  out: "",
                };
              } else {
                tagFile = {
                  tag: tag,
                  in: "",
                  out: {
                    relPath: fileRelPath,
                  },
                };
              }
              inputOutputMapping.push(tagFile);
            }
          }
        }
      });
      const sortedMapping = sortMapping(inputOutputMapping);
      const htmlContent = generateMarkdown(
        bbe,
        jsonContent,
        description,
        sortedMapping
      );
    }
  });
};

const cmdArguments = process.argv;
const inputFilePath = cmdArguments[2] ? cmdArguments[2] : "./examples";

generate(inputFilePath);
