## this repository is hosted on server

## In this codebase we learn how to deploy/host our code on server

-- create vercel.json file
{
"version": 2,
"builds": [{ "src": "index.js", "use": "@vercel/node" }],
"rewrites": [{ "source": "/(.*)", "destination": "index.js" }]
}
in src and destination put the correct file name you want to deloy

-- CORS

const cors = require("cors");
const corsOptions = {
origin: "\*",
credentials: true,
optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
