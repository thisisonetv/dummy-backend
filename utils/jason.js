const makeJSONResponse = (results) => {
  const jsonResponse = {};
  if (!results.data || !results.data.length) {
    jsonResponse.data = [];
    jsonResponse.meta = {
      'record-count': 0,
      'page-count': 1,
    };
    return jsonResponse;
  }
  const responseDataType = results.type || '';
  jsonResponse.data = results.data.map((result) => {
    const jsonResult = { ...result };
    if (!jsonResult.relationships) jsonResult.relationships = {};
    if (!jsonResult.type) jsonResult.type = responseDataType;
    return jsonResult;
  });
  jsonResponse.meta = {
    'record-count': results.data.length,
    'page-count': 1,
  };
  return jsonResponse;
};

const jason = {
  makeJSONResponse,
};

module.exports = jason;