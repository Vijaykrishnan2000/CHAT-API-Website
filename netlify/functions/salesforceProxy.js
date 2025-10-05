const fetch = require("node-fetch");

exports.handler = async (event) => {
  //const { userMessage } = JSON.parse(event.body);
  const { message: userMessage } = JSON.parse(event.body);

  /*const client_id = "###Replace_this_with_your_ClientID";
  const client_secret = "###Replace_this_with_your_CleintSecret";
  const username = "###Replace_this_with_your_USER_NAME";
  const password = "###Replace_this_with_your_PASSWORD";*/

  const client_id = "3MVG9dAEux2v1sLtg4lmb4zhS6Pm1WapDQ2j_fVl4AGyt1o6Xr8hU_Z7bnZLUP.FKwjGRMl4FnymNFcKdpxnE";
  const client_secret = "85D3C163EBCE3EDA1A43B34FBDAD11082CE76414DB656B1FF177C0BF17FE7CD1";
  const username = "vijaykrishnan@agentforce.com";
  const password = "NarutoTest@13749008OGXsxBFVt9z1NrHqjExwTJr3f";

  try {
    const tokenRes = await fetch("https://login.salesforce.com/services/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "password",
        client_id,
        client_secret,
        username,
        password,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Token fetch failed", details: tokenData }),
      };
    }

    const accessToken = tokenData.access_token;
    const instanceUrl = tokenData.instance_url;
    console.log('Netlify User message:'+userMessage);
    const response = await fetch(`${instanceUrl}/services/apexrest/AgentAction/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    const result = await response.text();

    return {
      statusCode: 200,
      body: result,
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
