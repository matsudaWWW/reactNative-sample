---
id: version-0.62-monorepo
title: Monorepo details for react-native-windows
original_id: monorepo
---

react-native-windows is a monorepo with several [packages](https://github.com/microsoft/react-native-windows/tree/master/packages) and uses monorepo management tools to install, build, and publish.  This page is all about what tools we use to manage this monorepo and some technical details, aimed at folks who are contributing to react-native-windows.

# Installation of npm dependencies
react-native-windows uses [yarn workspaces](https://legacy.yarnpkg.com/en/docs/workspaces/) to install all react-native-windows npm dependencies.  See "workspaces" prop inside [package.json](https://github.com/microsoft/react-native-windows/blob/master/package.json).

# Lerna Build
react-native-windows uses [lerna](https://github.com/lerna/lerna) to build all the "non-native" parts of react-native-windows.  See "scripts" prop inside  [package.json](https://github.com/microsoft/react-native-windows/blob/master/package.json).  Also see [lerna.json](https://github.com/microsoft/react-native-windows/blob/master/lerna.json).

# Beachball publishing
TODO - add details
