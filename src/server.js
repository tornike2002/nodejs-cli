import fs from "fs/promises";
import http from "http";
import open from "open";

const interpolate = (html, data) => {
  return html.replace(/\{\{(\w+)\}\}/g, (match, placeholder) => {
    return data[placeholder] || "";
  });
};

const formatHopes = (hopes) => {
  return hopes
    .map((hope) => {
      return `
    <div class="hope>
    <p>${hope.content}</p>
    <div class="tags"> 
    ${hope.tags.map((tag) => `<span>${tag}</span>`).join("")}
    </div> 
    </div>
    `;
    })
    .join("\n");
};

const createServer = (hopes) => {
  return http.createServer(async (req, res) => {
    const HTML_PATH = new URL("./template.html", import.meta.url);
    const template = await fs.readFile(HTML_PATH, "utf-8");
    const html = interpolate(template, {
      hopes: formatHopes(hopes),
    });
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
};

export const start = (hopes, port) => {
  const server = createServer(hopes);
  server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
    open(`http://localhost:${port}`);
  });
};
