const http = require("node:http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {});

server.on("request", (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const urlPath = url.pathname;
    getHtmlFile(urlPath).then((data) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
    });
});

const getHtmlFile = async (urlPath) => {
    if (urlPath === "/") {
        return getHtmlFile("/index");
    }

    // Create file path
    const fsPath = urlPath.includes(".html")
        ? path.join(__dirname, urlPath)
        : path.join(__dirname, `${urlPath}.html`);

    // Return html file if exists, otherwise return 404 html file
    const fileAccess = await fileExists(fsPath);
    if (fileAccess) {
        try {
            const data = await fs.promises.readFile(fsPath, {
                encoding: "utf8",
            });
            return data;
        } catch (err) {
            console.error(err);
        }
    } else {
        return getHtmlFile("/404");
    }
};

const fileExists = async (fsPath) => {
    try {
        await fs.promises.access(fsPath, fs.constants.F_OK);
        return true;
    } catch (err) {
        return false;
    }
};

server.listen(8000);
