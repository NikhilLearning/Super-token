import EmailPassword from 'supertokens-node/recipe/emailpassword/index.js';
import Session from "supertokens-node/recipe/session/index.js";
import Dashboard from "supertokens-node/recipe/dashboard/index.js";


const superTokenConfig = {
    supertokens: {
        connectionURI: "http://localhost:3567",
    },
    appInfo: {
        apiDomain: "http://localhost:3000",
        appName: "Supertoken Learning",
        websiteDomain: "http://localhost:4200"
    },
    recipeList: [
        EmailPassword.init(),
        Session.init(),
        Dashboard.init(),
    ]
};

export {
    superTokenConfig
};