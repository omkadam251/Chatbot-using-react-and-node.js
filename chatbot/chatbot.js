'use strict'

const dialogflow = require('dialogflow');
const structjson = require('./structjson');
const config = require('../config/keys');
const googleAuth = require('google-oauth-jwt');


const projectID = config.googleProjectID;
const credentials = {
	client_email: config.googleClientEmail,
	private_key: config.googlePrivateKey
};


const sessionClient = new dialogflow.SessionsClient({projectID, credentials});
const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);



module.exports = {

    getToken: async function() {
        return new Promise((resolve) => {
            googleAuth.authenticate(
                {
                    email: config.googleClientEmail,
                    key: config.googlePrivateKey,
                    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
                },
                (err, token) => {
                    resolve(token);
                },
            );
        });
    },
	textQuery: async function(text, parameters = {}) {
		let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
		let self = module.exports;
				const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
            	payload: {
            		data: parameters
            	}
            }
        };
			let responses = await sessionClient.detectIntent(request);
			responses = await self.handleAction(responses);
            return responses;
	},

	eventQuery: async function(event, parameters = {}) {
		let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
		let self = module.exports;
				const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            }
        };
			let responses = await sessionClient.detectIntent(request);
			responses = await self.handleAction(responses);
            return responses;
	},
	handleAction: function(responses){
		return responses;
	}
}
