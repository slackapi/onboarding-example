# Slack Onboarding Example
This project demonstrates how to build an Onboarding App using Slack's Events API. It's meant to serve only as an example through code.

![onboarding](https://cloud.githubusercontent.com/assets/35968/17162650/5703766c-537d-11e6-9c36-3e780d06f77c.gif)

## Setup
### [Create an App](https://api.slack.com/apps/new)

![](https://cloud.githubusercontent.com/assets/35968/17163271/355323a4-5383-11e6-93fc-e1f74641e553.png)


### Enable the Events
![](https://cloud.githubusercontent.com/assets/35968/17162944/27e8f6ec-5380-11e6-8d83-6e6ada06e536.png)


## Updating the Script
The onboarding script is driven by [onboarding.json](src/onboarding.json). The app looks for events that match the `event` property in this JSON and [marks it complete](src/index.js#L25).

```json
{
  "welcome": {
    "text": "Welcome to Slack! Get started by completing the steps below.",
    "attachments": [
      {
        "event": "star_added",
        "title": "Star a Message",
        "title_link": "https://get.slack.help/hc/en-us/articles/201331016-Using-stars",
        "text": "Stars are a way to mark an item in Slack as important. You can star channels or direct messages to move them to the top of your left sidebar, or star messages so you can easily come back to them later."
      },
      {
        "event": "reaction_added",
        "title": "Respond With a Reaction Emoji",
        "title_link": "https://get.slack.help/hc/en-us/articles/206870317-Emoji-reactions",
        "text": "You can quickly respond to any message on Slack with an emoji reaction. Reactions can be used for any purpose: voting, checking off to-do items, showing excitement."      
      },
      {
        "event": "pin_added",
        "title": "Pin a Message",
        "title_link": "https://get.slack.help/hc/en-us/articles/205239997-Pinning-messages-and-files",
        "text": "Important messages and files can be pinned to the details pane in any channel or direct message, including group messages, for easy reference."
      }
    ]
  }
}
```

## Running Locally

### Environment
This app requires two environment variables.

* `TOKEN` - The Slack token used to post messages
* `PORT` - The port to host the webserver on



### WebServer
```bash
npm install
npm start
```
### Tunneling
Using [ngrok](https://ngrok.com/) you can port a public url to your local server. After installing ngrok, you can get a url by running:

```bash
ngrok http 3000
```

You should get a response like this:

```bash
Tunnel Status                 online
Version                       2.1.3
Region                        United States (us)

Web Interface                 http://127.0.0.1:4040
Forwarding                    http://d8ab065c.ngrok.io -> localhost:3000
Forwarding                    https://d8ab065c.ngrok.io -> localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00  
```

Use the `Forwarding` url as the *base url* of your `Request URL` on Slack's Event Subscription page.
