# Demo of Rails with server-side rendered React

Use React components as rails views with [react-rails](https://github.com/reactjs/react-rails) and webpacker.

## Supports

_Currently work in progress. See [Issues](https://github.com/railslove/rails-ssr-react-demo/issues) for current progress._

- React components inside `app/views/`
- Locals are passed into views as props
- Automatic code splitting for each view
- Client hydration of server rendered components
- css-in-js with styled-components
- Slightly better error stacks of SSR errors
- ...

## Setup

- ruby `2.6.4`
- node `>= 13.0.0`

```console
$ git clone
$ bundle install
$ yarn install
$ ./bin/webpack-dev-server
$ rails s
```

---

<p align="center">with 💚 from <a href="https://railslove.com">Railslove</a></p>
