# Putter

## Scripts

### Install dependencies

```
npm install
```

### Build for local development

```
npm run build
```

### Run application

```
npm run start
```

### Run linter (tslint)

```
npm run lint
```

### Unit Tests

Tests reside in the `test` folder and are organized/executed using [Jest](https://jestjs.io). Assertions are achieved using [Chai's Assert API](https://www.chaijs.com/api/assert/).

```
npm t
```

## Styling

Two complimentary methods of styling are available depending on the need. For static styling, use CSS Modules; for dynamic styling, use Emotion.

### CSS Modules

Webpack is configured to properly insert scoped styles for '\*.m.scss' [Sass](https://sass-lang.com/) files. Consume them as you would any other [CSS Module](https://github.com/css-modules/css-modules). The TypeScript plugin [css-module-types](https://github.com/timothykang/css-module-types#readme) is provided to assist the in-editor development experience (mileage will vary).

Consider the following example:

_myModule.m.scss_

```css
.myClass {
  display: block;
}
```

_myModule.tsx_

```javascript
import * as styles from './myModule.m.scss';

...

return (<div className={styles.myClass}>...</div>)
```

### Emotion

Since Emotion is simply css applied programatically, no additional Webpack configuration is necessary. Simply use [Emotion](https://emotion.sh/docs/introduction) as described in their [documentation](https://emotion.sh/docs/introduction).
