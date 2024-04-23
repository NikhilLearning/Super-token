import EmailPassword from 'supertokens-node/recipe/emailpassword/index.js';
import Session from "supertokens-node/recipe/session/index.js";
import Dashboard from "supertokens-node/recipe/dashboard/index.js";


const superTokenConfig = {
    supertokens: {
        connectionURI: "http://localhost:3567",
        // apiKey: "someKey" // OR can be undefined
    },
    appInfo: {
        apiDomain: "http://localhost:3000",
        appName: "Supertoken Learning",
        websiteDomain: "http://localhost:4200"
    },
    recipeList: [
        EmailPassword.init({
        override: {
            functions: (originalImplementation) => {
                return {
                    ...originalImplementation,
                    signUp: async function (input) {
                        // First we call the original implementation of signUp.
                        let response = await originalImplementation.signUp(input);
                        console.log(response);
                        // Post sign up response, we check if it was successful
                        if (response.status === "OK" && response.user.loginMethods.length === 1 && input.session === undefined) {
                            /**
                            * 
                            * response.user contains the following info:
                            * - emails
                            * - id
                            * - timeJoined
                            * - tenantIds
                            * - phone numbers
                            * - third party login info
                            * - all the login methods associated with this user.
                            * - information about if the user's email is verified or not.
                            * 
                            */
                            // TODO: post sign up logic
                        }
                        return response;
                    }
                }
            }
        }
    }),
    Session.init(),
    Dashboard.init(),
    ]
};

export {
    superTokenConfig
};