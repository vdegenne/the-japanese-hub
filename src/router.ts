import {Hash, Router} from '@vdegenne/router'
// import {Page} from './pages/index.js'
import {Logger} from '@vdegenne/debug'
import chalk from 'chalk'
import {store} from './store.js'

export const hash = new Hash<{input?: string}>()
const logger = new Logger({
	colors: {
		log: chalk.yellow,
	},
})

export const router = new Router(async ({location, parts}) => {
	logger.log('Location has changed')
	await store.updateComplete
	hash.reflectHashToParams()
	if (hash.has('input')) {
		store.input = hash.$('input')!
		// hash.$('input', undefined)
	}
	if (parts.length === 0) {
		store.page = 'main'
	} else {
		store.page = parts[0] as Page
	}
})
