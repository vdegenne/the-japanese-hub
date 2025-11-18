import {ReactiveController} from '@snar/lit'
import {MGamepad, MiniGamepad, Mode} from '@vdegenne/mini-gamepad'
import {state} from 'lit/decorators.js'
import {store} from './store.js'
import {
	googleImagesOpen,
	googleTranslateOpen,
	lensHistoryOpen,
} from '@vdegenne/links'

class GamepadController extends ReactiveController {
	@state() gamepad: MGamepad | undefined

	constructor() {
		super()
		const minigp = new MiniGamepad({
			// pollSleepMs: 900,
			focusDeadTimeMs: 200,
		})
		minigp.onConnect((gamepad) => {
			this.gamepad = gamepad
			const map = gamepad.mapping

			gamepad.for(map.LEFT_STICK_LEFT).before(({mode}) => {
				switch (mode) {
					case Mode.NORMAL:
						break
					case Mode.PRIMARY:
						break
					case Mode.SECONDARY:
						break
					case Mode.TERTIARY:
						break
				}
			})
			gamepad.for(map.LEFT_STICK_RIGHT).before(({mode}) => {
				switch (mode) {
					case Mode.NORMAL:
						break
					case Mode.TERTIARY:
						break
				}
			})
			gamepad.for(map.RIGHT_BUTTONS_LEFT).before(({mode}) => {
				switch (mode) {
					case Mode.NORMAL:
						break
				}
			})

			gamepad.for(map.RIGHT_STICK_LEFT).before(({mode}) => {
				switch (mode) {
					case Mode.NORMAL:
						break
				}
			})
			gamepad.for(map.RIGHT_STICK_RIGHT).before(({mode}) => {
				switch (mode) {
					case Mode.NORMAL:
						break
				}
			})

			gamepad.for(map.RIGHT_BUTTONS_BOTTOM).before(async ({mode}) => {
				switch (mode) {
					case Mode.NORMAL:
						break
					case Mode.TERTIARY:
						break
				}
			})
			gamepad.for(map.RIGHT_BUTTONS_RIGHT).before(({mode}) => {
				if (mode === Mode.NORMAL) {
				}
			})

			gamepad.for(map.L1).before(({mode}) => {
				if (mode === Mode.NORMAL) {
				}
			})
			gamepad.for(map.R1).before(({mode}) => {
				if (mode === Mode.NORMAL) {
				}
			})

			gamepad.for(map.LEFT_BUTTONS_RIGHT).before(({mode}) => {
				switch (mode) {
					case Mode.NORMAL:
						break
				}
			})

			gamepad.for(map.LEFT_BUTTONS_TOP).before(({mode}) => {
				switch (mode) {
					case Mode.NORMAL:
						if (store.input) {
							googleTranslateOpen(store.input)
						}
						break
					case Mode.PRIMARY:
						if (store.input) {
							window.open(
								`http://192.168.1.168:5180/?q=${encodeURIComponent(store.input)}`,
							)
						}
						break
				}
			})

			gamepad.for(map.LEFT_BUTTONS_BOTTOM).before(({mode}) => {
				switch (mode) {
					case Mode.NORMAL:
						if (store.input) {
							googleImagesOpen(store.input)
						}
						break
					case Mode.PRIMARY:
						if (store.input) {
							lensHistoryOpen(store.input, true)
						}
						break
				}
			})

			gamepad.for(map.LEFT_BUTTONS_LEFT).before(({mode}) => {
				switch (mode) {
					case Mode.NORMAL:
						break
					case Mode.PRIMARY:
						break
					case Mode.TERTIARY:
						break
				}
			})

			gamepad.for(map.RIGHT_BUTTONS_TOP).before(({mode}) => {
				switch (mode) {
					case Mode.NORMAL:
						break
					case Mode.PRIMARY:
						break
					case Mode.SECONDARY:
					case Mode.TERTIARY:
				}
			})

			gamepad.for(map.MIDDLE_LEFT).before(({mode}) => {
				switch (mode) {
					case Mode.NORMAL:
						break
				}
			})
		})
	}
}

export const gamepadCtrl = new GamepadController()
