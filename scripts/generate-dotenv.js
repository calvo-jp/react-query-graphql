const fs = require("fs");
const path = require("path");

const location = path.join(process.cwd(), ".env.local");
const contents =
  "" +
  `
  NEXT_TELEMETRY_DISABLED=1
  NEXT_PUBLIC_COUNTRIES_API="https://countries.trevorblades.com"
  `;

fs.writeFileSync(location, contents.replace(/[^\S\r\n]/g, ""), { encoding: "utf-8" });
