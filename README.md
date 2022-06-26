# Craco plugin scoped css

---

based on: [craco-plugin-scoped-css](https://github.com/gaoxiaoliangz/react-scoped-css/tree/master/packages/craco-plugin-scoped-css)

---

## Installation

1. Install [craco](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation)

2. Install plugin:

   ```sh
   npm i -D @costaline/craco-plugin-scoped-css
   ```

3. For work with stylus:
	```sh
	npm i -D @costaline/craco-plugin-stylus
	```

	add plugin **before** `@costaline/craco-plugin-scoped-styles` in craco config plugins section


5. Edit `craco.config.js`:

   ```js
   module.exports = {
     plugins: [
       {
         plugin: require("@costaline/craco-plugin-scoped-css"),
         options: {
           inlclude: '' // scoped regexp, default: /\.scoped\.(css|scss|sass|styl|stylus)$/
         }
       }
     ]
   };
   ```
