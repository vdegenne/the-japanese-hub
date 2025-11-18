import {PropertyValues, ReactiveController, state} from '@snar/lit'
import {FormBuilder} from '@vdegenne/forms/FormBuilder.js'
import {saveToLocalStorage} from 'snar-save-to-local-storage'
import {availablePages} from './constants.js'

@saveToLocalStorage('the-japanese-hub:store')
export class AppStore extends ReactiveController {
	F = new FormBuilder(this)

	@state() page: Page = 'main'
	@state() input = ''

	protected async updated(changed: PropertyValues<this>) {
		const {hash, router} = await import('./router.js')
		if (changed.has('page')) {
			// import('./router.js').then(({router}) => {
			// 	router.hash.$('page', this.page)
			// })
			const page = availablePages.includes(this.page) ? this.page : '404'
			import(`./pages/page-${page}.ts`)
				.then(() => {
					console.log(`Page ${page} loaded.`)
				})
				.catch(() => {})
		}

		if (changed.has('input')) {
			hash.$('input', this.input)
		}
	}
}

export const store = new AppStore()
