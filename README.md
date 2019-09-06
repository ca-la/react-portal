# React Portal

This library provides the ability to render children into a node that can exist outside the direct hierarchy of the parent component. [React's Portal](https://reactjs.org/docs/portals.html) is specifically tied to the DOM, meaning that React applications that need to portal children to a non-DOM based location are out of luck. These cases range from applications built with [React Native](https://facebook.github.io/react-native/) to interfacing with [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API).

## Status

| Branch   | URL                                              | Build Status                                                                                                                                |
| -------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `master` | https://www.npmjs.com/package/@cala/react-portal | [![CircleCI](https://circleci.com/gh/ca-la/react-portal/tree/master.svg?style=svg)](https://circleci.com/gh/ca-la/react-portal/tree/master) |

## Installation

`npm install @cala/react-portal --save`

## Usage

Import components individually.

```js
import { EntrancePortal, ExitPortal, PortalProvider } from '@cala/react-portal';
```

Or wrap it into a single statement.

```js
import * as ReactPortal from '@cala/react-portal';
```

In order to use the `EntrancePortal` and `ExitPortal`, a single `PortalProvider` will need to enclose the part of the component tree that uses either Portal component. Here's a very simple example of how to use these three components.

```jsx
<PortalProvider>
  <div>
    <h1>Hello, World.</h1>
    <EntrancePortal name='one'>I'm in a portal!</EntrancePortal>
    <p>Sample body content.</p>
    <ExitPortal name='one' />
  </div>
</PortalProvider>
```

The rendered output of the above JSX statement will place the textual content of `<EntrancePortal />` at the place of `<ExitPortal />`. In effect, the rendered output will look something like

```html
<div>
  <h1>Hello, World.</h1>
  <p>Sample body content.</p>
  I'm in a portal!
</div>
```

For more examples, see the tests written in `src/spec.tsx`.
