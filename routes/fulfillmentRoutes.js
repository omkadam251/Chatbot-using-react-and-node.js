const {WebhookClient} = require('dialogflow-fulfillment');



module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        function luffy(agent) {
            agent.add(`Welcome to my Luffy fulfillment!`);
        }

        function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }
        let intentMap = new Map();
        intentMap.set('Luffy', luffy);

        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    });

}
