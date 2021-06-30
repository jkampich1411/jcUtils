/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
const commands = require("probot-commands");

module.exports = (app) => {
  // Your code here
  app.log.info("App got loaded POG");

  commands(app, "addlabel", (context, command) => {
    const labels = command.arguments.split(/, */);
    const text = context.issue({body: `Added labels: '${labels}'`});
    returnStuff(text, labels);

    function returnStuff(textToSend, labels) {
      let createCom = context.octokit.issues.createComment(textToSend);
      let addLabs = context.octokit.issues.addLabels(context.issue({ labels }));
      return createCom && addLabs;
    }
  });

  commands(app, "remlabel", (context, command) => {
    const labels = command.arguments.split(/, */);
    const text = context.issue({body: `Removed labels: '${labels}'`});
    returnStuff(text, labels);

    function returnStuff(textToSend, labels) {
      let createCom = context.octokit.issues.createComment(textToSend);
      let log = console.log(labels);
      let remLabs = context.octokit.issues.removeLabel(context.issue({ labels }));
      return createCom &&log && remLabs;
    }
  })

  app.on("issues.opened", async (context) => {
    const { body } = context.payload.issue;
    
    const comment = context.issue({
      body: body.includes("[jcutil:thanks]") ? "You are welcome!" : "Thanks!"
    });
    return context.octokit.issues.createComment(comment);
  });
}