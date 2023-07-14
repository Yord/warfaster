# Warfaster

[Warfaster][warfaster] is a list builder for the [Warcaster][warcaster] tabletop game.

![Warfaster user interface](./Warfaster.png)

## Features

- Fully automated content updates based on the [Privateer Press Warcaster wiki][warcaster-wiki].
- Full card details to properly plan your next session.
- Completely unrestricted list design to support all formats.

## Design Decisions

Warfaster makes some design decisions that may appear strange at first.
These decisions are made on purpose:

<dl>
<dt>Taking contents from the <a href="https://privateerpress.wiki/index.php?title=Warcaster">Privateer Press Warcaster wiki</a></dt>
<dd>
<p>In contrast to coming with its own card data, Warfaster takes all its contents from the Warcaster wiki. This includes the available factions and their models, as well as all model rules, store links and lore. All contributions to the wiki will also benefit Warfaster. On the flipside, should the wiki be discontinued or outdated, so will the app.</p>
</dd>
<dt>Not enforcing any limitations on list composition</dt>
<dd>
<p>Other list builders may enforce rules on lists, such as having three hero solos in primary mission lists. Warfaster does not. This is, because such rules cannot be automatically taken and kept up-to-date from the Warcaster wiki. Also, community formats like <a href="https://www.arcane-synthesis.com/2022/12/31/mid-size-games-an-alternative-to-primary-missions/">Arcane Synthesis' Sortie Missions</a> are not in the Warcaster wiki. Instead, Warfaster gives its users full freedom to build their lists. Rules will have to be checked manually.</p>
</dd>
<dt>Keeping card data in the browser cache</dt>
<dd>
<p>Instead of having a central repository of data in the app, every user keeps their own data in their browsers, individually loaded from the Warcaster wiki. Warfaster does not save lists or other user data. Instead, users will have to save their lists using bookmarks or similar means.</p>
</dd>
</dl>

## FAQ

<dl>
<dt>How can I save my lists?</dt>
<dd>
<p>Warfaster has no ability to save lists. List URLs need to be stored independently of the app. We suggest to bookmark them in the browser. Most browsers even have the ability to share bookmarks between devices, which makes lists available on all your devices, too!</p>
</dd>
<dt>How can I clear all cached data without clearing my browser cache?</dt>
<dd>
<p>Opening <a href="http://warfaster.com?reset">http://warfaster.com?reset</a> clears all data from the browser cache.</p>
</dd>
<dt>Why doesn't Warcaster have link previews?</dt>
<dd>
<p>Cards are stored in the URL using IDs. Their names are only loaded once the page is opened. Thus, previews based just on the URL are impossible.</p>
</dd>
<dt>Why can't I reorder cards with drag-and-drop?</dt>
<dd>
<p>We tested drag-and-drop while developing the app. Our conclusion was, that the user experience for scrolling, opening cards, and drag-and-drop was very bad, because too many things wanted to "click" on cards at the same time. So we decided not to support drag-and-drop.</p>
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

Obtaining a new version number:

```javascript
new Date().toJSON();
```

Install [redux-devtools][redux-devtools] and [React developer tools][react-devtools] for the best development experience. This app was set up with [create-react-app][create-react-app].

[create-react-app]: https://create-react-app.dev/
[react-devtools]: https://react.dev/learn/react-developer-tools
[redux-devtools]: https://github.com/reduxjs/redux-devtools
[sortie-missions]: https://www.arcane-synthesis.com/2022/12/31/mid-size-games-an-alternative-to-primary-missions/
[warcaster]: http://warcaster.com
[warcaster-wiki]: https://privateerpress.wiki/index.php?title=Warcaster
[warfaster]: http://warfaster.com
