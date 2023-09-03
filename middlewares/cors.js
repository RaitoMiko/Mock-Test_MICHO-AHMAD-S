const handleCors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://mock-test-micho-ahmad-s-client-side.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, token, authorization"
    ); // intercept OPTIONS method
    if ("OPTIONS" == req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  };
  
module.exports = handleCors;
