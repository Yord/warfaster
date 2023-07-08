# Warfaster

[Warfaster][warfaster] is a list builder for the [Warcaster][warcaster] tabletop game.

![Warfaster user interface](./Warfaster.png)

## Features

- Fully automated content updates based on the [Privateer Press wiki][warcaster-wiki].
- Full card details to properly plan your next session.
- Completely unrestricted list design to support all formats.

## Design Decisions

Warfaster makes some design decisions that may appear strange first.
These decisions are made on purpose and are not likely to be changed:

<dl>
<dt>Taking contents from PP's wiki</dt>
<dd>
<p>Warfaster takes all its contents from PP's wiki. This includes the available factions and their models, as well as all model rules, store links and lore. This puts the curation of its contents completely into community hands. However, should the wiki be discontinued or outdated, so will the app.</p>
<p>This is done, so the contents do not depend on a single person,
but on a group of contributors. It may lead to issues, however, should the wiki structure change. In this case, the program logic taking the contents from the wiki would need to be changed, which can only be done by a single person. The hope is, that this will happen only seldomly.</p>
<p>For the Warfaster team, giving the community the ability to curate the contents is important enough to take the risk of breaking the app in the process.</p>
</dd>
<dt>Not enforcing any limitations on list composition</dt>
<dd>
<p>Other list builders may enforce rules on lists, such as having three hero solos in primary missing lists. Warfaster does not. The reason is, because those rules cannot be automatically taken and updated from the wiki. Also, support for community formats such as ... would not be guaranteed this way.</p>
<p>Instead, Warfaster gives full freedom to the users in how they build their lists. Rules like having three heroes in primary missions will have to be checked manually.</p>
</dd>
</dl>

## FAQ

<dl>
<dt>How can I clear all cached data without clearing my browser cache?</dt>
<dd>
<p>Open <a href="http://warfaster.com?reset">http://warfaster.com?reset</a> to clear all cached data.</p>
</dd>
<dt>Why can't I reorder cards with drag-and-drop?</dt>
<dd>
<p>We tested drag-and-drop while developing the app. Our conclusion was, that the user experience for scrolling, opening cards, and drag-and-drop was very bad, because too many things wanted to "click" on cards at the same time. So we decided to don't support drag-and-drop.</p>
</dd>
</dl>

## Development

Installing dependencies:

```bash
npm install
```

Starting the development server:

```bash
npm start
```

Deploying the page to github:

```bash
npm run deploy
```

Install [redux-devtools][redux-devtools] and [React developer tools][react-devtools] for the best development experience. This app was set up with [create-react-app][create-react-app].

[create-react-app]: https://create-react-app.dev/
[react-devtools]: https://react.dev/learn/react-developer-tools
[redux-devtools]: https://github.com/reduxjs/redux-devtools
[warcaster]: http://warcaster.com
[warcaster-wiki]: https://privateerpress.wiki/index.php?title=Warcaster
[warfaster]: http://warfaster.com
