# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Before start project

Before start running project, you must to run this first from terminal

### `npx sb init -f`

This will build force storybook into this project that already have storybook setting installed

### `git checkout package.json`

Force build from storybook will update storybook dependency, need to checkout to make sure\n
we always using the same version of storybook

### `npm install`

Build module for all dependency on package.json


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\n
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\n
You will also see any lint errors in the console.

### `npm run storybook`

Runs the storybook app in the development mode.\n
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Source : [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction)

### `npm test`

Launches the test runner in the interactive watch mode.\n
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\n
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\n
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**WARNING: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
