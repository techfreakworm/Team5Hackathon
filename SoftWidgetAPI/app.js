// dot-env
require("dot-env");

// deps
const bodyParser = require("body-parser");

const PORT = process.env.PORT,
  LOGGER = process.env.LOGGER;

const fastify = require("fastify")({
  logger: LOGGER
});

fastify.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  
  next();
})

fastify.use(bodyParser.urlencoded({
  extended: false
}));

fastify.use(bodyParser.json());

fastify.get("/", (req, res) => res.send("Hello World!"));

// routes
const { apiRoutes } = require("./routes/routes");
for (let apiRoute of apiRoutes) {
  for (let route of apiRoute) {
    fastify.route(route);
  }
}

fastify.listen(PORT, err => {
  if (err) throw err;

  console.log(`SoftWidgetApi Server running on port: ${PORT}`);
});
