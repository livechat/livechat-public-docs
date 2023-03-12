const withBearerAuth = (handler) => async (req, res) => {
  const unauthorized = () => res.status(401).send({ error: "Unauthorized" });

  if (!req.headers.authorization) {
    return unauthorized();
  }

  const [strategy, token] = req.headers.authorization.split(" ");
  if (strategy !== "Bearer" || !token) {
    return unauthorized();
  }

  const tokenInfoResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/v2/info?code=${token}`
  );

  if (tokenInfoResponse.status !== 200) {
    return unauthorized();
  }

  const tokenInfo = await tokenInfoResponse.json();
  if (tokenInfo.client_id !== process.env.NEXT_PUBLIC_CLIENT_ID) {
    return unauthorized();
  }

  return await handler(req, res);
};

export default withBearerAuth;
