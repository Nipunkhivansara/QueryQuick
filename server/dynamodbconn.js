const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region
const REGION = "us-west-2"; // For example, "us-west-2"

// Create a DynamoDB client
const dbclient = new DynamoDBClient({ region: REGION });

// Now you can use dbclient to perform operations on DynamoDB
const { GetItemCommand } = require("@aws-sdk/client-dynamodb");

const params = {
    TableName: 'Music',
    Key: {
      'PartitionKey': { S: 'Artist' }, // Replace 'PartitionKey' with your partition key attribute name
      'SortKey': { S: 'SongTitle' }     // Replace 'SortKey' with your sort key attribute name
    }
  };

const run = async () => {
    try {
        const data = await dbclient.send(new GetItemCommand(params));
        console.log("Success", data.Item);
    } catch (err) {
        console.error("Error", err);
    }
};

run();
