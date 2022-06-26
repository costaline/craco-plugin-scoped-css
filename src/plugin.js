import { getLoader, loaderByName } from '@craco/craco'

import { RuleUpdater } from './helper'

export const overrideWebpackConfig = ({
																				webpackConfig,
																				cracoConfig,
																				pluginOptions = {},
																				context: { env, paths },
																			}) => {
	let { include: includeRegExp } = pluginOptions

	if (!includeRegExp) {
		includeRegExp = /\.scoped\.(css|scss|sass|styl|stylus)$/
	}

	// add babel-plugin-react-scoped-css
	const {
		isFound,
		match,
	} = getLoader(webpackConfig, loaderByName('babel-loader'))

	if (isFound) {
		match.loader.options.plugins.push([
			require.resolve('babel-plugin-react-scoped-css'),
			{
				include: includeRegExp,
			},
		])
	} else {
		return console.log('no babel loader found')
	}

	// add scoped-css-loader
	const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf)

	if (!oneOfRule) {
		return console.log(
			'Can\'t find a \'oneOf\' rule under module.rules in the ' + `${env} webpack config!`,
			'webpack+rules+oneOf',
		)
	}

	new RuleUpdater(oneOfRule, env)
		.update('.css$')
		.update('scss|sass')
		.update('styl|stylus')

	return webpackConfig
}

