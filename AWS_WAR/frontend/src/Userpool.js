import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-south-1_neFav4Mcx",
  ClientId: "vk5fbh62prjpd1d47576ld4k4",
};
export default new CognitoUserPool(poolData);
