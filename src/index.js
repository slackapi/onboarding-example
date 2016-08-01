const ts = require('tinyspeck'),
      onboarding = require('./onboarding.json'),
      {PORT, TOKEN} = process.env,
      users = {};


// setting defaults for all Slack API calls
let slack = ts.instance({ token: TOKEN });


// build the user's current onboarding message
function getStatusMessage(user) {
  return Object.assign({ channel: user }, onboarding.welcome, users[user]);
}


// watch for onboarding slash commands
slack.on('/onboarding', payload => {
  let {user_id, response_url} = payload;
  let message = getStatusMessage(user_id);

  // send current onboarding status privately
  slack.send(response_url, message);
});


// event handler
slack.on('star_added', 'pin_added', 'reaction_added', payload => {
  let {type, user, item} = payload.event;
  
  // get the user's current onboarding message
  let message = getStatusMessage(user);


  // modify completed step
  message.attachments.forEach(step => {
    if (step.event === type && !step.completed) {
      step.title += " :white_check_mark:";
      step.color = "#2ab27b";
      step.completed = true;
    }
  });


  // save the message and update the timestamp
  slack.send(message).then(res => {
    let {ts, channel} = res.data;
    users[user] = Object.assign({}, message, { ts: ts, channel: channel });
  });
});


// incoming http requests
slack.listen(PORT);
