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

Webpack is configured to properly insert scoped styles for '\*.m.scss' [Sass](https://sass-lang.com/) files. Consume them as you would any other [CSS Module](https://github.com/css-modules/css-modules). The TypeScript plugin [css-module-types](https://github.com/timothykang/css-module-types#readme) is provided to assist the in-editor development experience (mileage will vary). Combined with the [classnames](https://jedwatson.github.io/classnames/) package, building styles is quite easy.

Consider the following example:

_myModule.m.scss_

```css
.listItem {
  display: block;

  &.first {
    background-color: #000;
  }
}
```

_myModule.tsx_

```javascript
import * as styles from './myModule.m.scss';
import classnames from 'classnames';

...

return (<div className={classnames(
              styles.listItem,                    // static styles from local module
              'menu-list-item',                   // static classes from global styles (i.e., bootstrap)
              {
                active: this.isActive(i),         // dynamically assigned fixed classname based on properties
                [styles.first]: this.isFirst(i)   // dynamically assigned classname from local module
              }
            )}>...</div>)
```

#### Notes

- Using CSS Modules isn't entirely straight-forward. Consider what the package is doing: transforming all class names into random, unique names instead; a classname of `listItem` will be become `_1fkNTkM0LgU7mgfwAhERRD`; you **cannot** access the styles by the `listeItem` in any capacity. Likewise, any other classnames nested beneath `listItem` will also be transformed.

- Unfortunately, [BEM](http://getbem.com/) with its dashes is utterly incompatible with javascript identifiers (there are workarounds, but still). Please stick to camelCase class names for ease of use. Relevant [css-loader option](https://github.com/webpack-contrib/css-loader#localsconvention)

### Emotion

Since Emotion is simply css applied programatically, no additional Webpack configuration is necessary. Simply use [Emotion](https://emotion.sh/docs/introduction) as described in their [documentation](https://emotion.sh/docs/introduction).
