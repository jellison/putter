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

Three complimentary methods of styling are available depending on the need. For global styling and mixins, Standard SASS; for module styling, use CSS Modules; for dynamic styling, use Emotion.

### Standard SASS

The src/styles directory houses all global styles as well as reusable mixins. To have your global styles available, simply import them into `src/styles/main.scss`. For reusable mixins, place them anywhere simply import them as normal.

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
