export class RuleUpdater {
	constructor(oneOfRule, env) {
		this.oneOfRule = oneOfRule
		this.env = env
	}

	_printMessage = (key) => {
		console.log(
			`Can't find the webpack rule to match "${key}" files in the ${this.env} webpack config!`
		)
	}

	_addScopedCssLoader = (targetRule) => {
		const rules = targetRule.use || targetRule.loader

		let cssLoaderIndex = -1
		for (let i = 0; i < rules.length; i++) {
			const rule = rules[i]
			if (rule.loader && rule.loader.includes('css-loader')) {
				cssLoaderIndex = i
				break
			}
		}

		if (cssLoaderIndex !== -1) {
			const scopedCssRule = { loader: require.resolve('scoped-css-loader') }
			rules.splice(cssLoaderIndex + 1, 0, scopedCssRule)
		} else {
			return console.log('no css-loader found')
		}
	}

	_addLoader = (key) => {
		const rule = this.oneOfRule.oneOf.find(
			rule =>
				rule.test &&
				rule.test.toString().includes(key) &&
				rule.test.toString().indexOf('.module') === -1,
		)

		if(!rule) {
			this._printMessage(key)
		} else {
			this._addScopedCssLoader(rule)
		}
	}

	update(key) {
		this._addLoader(key)
		return this
	}
}
