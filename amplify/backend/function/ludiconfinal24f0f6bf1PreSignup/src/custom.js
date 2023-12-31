const {
  DynamoDBClient,
} = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
} = require("@aws-sdk/lib-dynamodb");

const dynamo = new DynamoDBClient({ region: "us-east-2" });  //OHIO

exports.handler = async (event, context) => {
  console.log("User Attributes:", event.request.userAttributes);
  console.log("Request: ", event.request)
  let statusCode = 200;
  let body = "";
  const currentTimestamp = Date.now();

  try {
    const ddbDocClient = DynamoDBDocumentClient.from(dynamo);
    
    // Create a user entry in DynamoDB
    const response = await ddbDocClient.send(
      new PutCommand({
        TableName: "LudiconUserTable",
        Item: {
          UserId: event.request.userAttributes.email,
          Email: event.request.userAttributes.email,
          Name:  event.request.userAttributes.name,
          Bio: "",
          Image: "",
          Events: [],
          Sports: [],
          DOB: "",
          JoinedDate: currentTimestamp.toString(),
          Gender: "",
          Pronouns: "",
          ChatLinks: [],
        },
      })
    );
    body = response
    console.log("Item added to DynamoDB successfully. response: ", response);
  } catch (err) {
    statusCode = 400;
    body = err.message;
    console.error("Error:", err);
  } finally {
    body = JSON.stringify(body);
  }
  console.log("Lambda function finished. StatusCode:", statusCode, "Response:", body);
  return {
    statusCode,
    body,
  };
};
