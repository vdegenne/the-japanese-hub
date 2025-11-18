import {cquerySelector} from 'html-vision'
import {DEV} from './constants.js'
import {store} from './store.js'

const inputNames = ['INPUT', 'TEXTAREA', 'MD-FILLED-TEXT-FIELD']
export function evenIsFromInput(event: Event) {
	return (event.composedPath() as HTMLElement[]).some((el) => {
		return (
			inputNames.includes(el.tagName) || el.hasAttribute?.('contenteditable')
		)
	})
}

window.addEventListener('keydown', async (event: KeyboardEvent) => {
	if (DEV) {
		console.log(event)
	}
	if (event.altKey || event.ctrlKey) {
		return
	}

	if (evenIsFromInput(event)) {
		return
	}

	const button = cquerySelector(`[key="${event.key}"]`)
	if (button) {
		button?.click()
		return
	}

	switch (event.key) {
		case 'd':
			// ;(await getThemeStore()).toggleMode()
			break
	}
})

window.addEventListener('voice-recorder-submit', (e: Event) => {
	const {input} = (e as CustomEvent).detail
	if (input) {
		store.input = input
	}
})

export {}
