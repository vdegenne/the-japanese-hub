import {ReactiveController, state} from '@snar/lit'
import {FormBuilder} from '@vdegenne/forms/FormBuilder.js'
import {customElement} from 'custom-element-decorator'
import {html, LitElement, TemplateResult} from 'lit'
import {withStyles} from 'lit-with-styles'
import {hash} from './router.js'
import {copyToClipboard} from './utils.js'

interface DialogOptions {
	/**
	 * @default false
	 */
	quick: boolean
	/**
	 * Controller used to refresh the content when a value changes.
	 */
	ctrl: ReactiveController | undefined
}

@customElement({name: 'content-dialog', inject: true})
@withStyles()
export class Dialog extends LitElement {
	open = true
	#options: DialogOptions

	constructor(
		public headline?: string | TemplateResult,
		public content?: () => string | TemplateResult,
		options?: Partial<DialogOptions>,
	) {
		super()
		this.#options = {
			quick: false,
			ctrl: undefined,
			...options,
		}

		if (this.#options.ctrl) {
			this.#options.ctrl.bind(this)
		}
	}

	render() {
		return html`<!-- -->
			<md-dialog
				?quick=${this.#options.quick}
				?open=${this.open}
				@closed=${this.#onClosed}
			>
				<div slot="headline">${this.headline}</div>

				<div slot="content" class="overflow-hidden">${this.content?.()}</div>

				<!-- <div slot="actions"> -->
				<!-- 	<md-text-button>Close</md-text-button> -->
				<!-- </div> -->
			</md-dialog>
			<!-- -->`
	}

	#onClosed = () => {
		this.remove()
		this.open = false
	}

	show() {
		this.open = true
	}
	close() {
		this.open = false
	}
}

export function createLinkDialog(input?: string) {
	class Ctrl extends ReactiveController {
		@state() input = input ?? hash.$('input') ?? ''
		fb = new FormBuilder(this)
	}
	const c = new Ctrl()

	const {protocol: p, host} = window.location
	const protocol = p.replace(/:$/, '')

	new Dialog(
		'Create link',
		() => {
			const url = `${protocol}://${host}#input=${c.input}`
			return html`<!-- -->
				<div class="flex flex-col gap-5 content-stretch">
					${c.fb.TEXTFIELD('Input', 'input', {variant: 'filled'})}
					<md-filled-tonal-button @click=${() => copyToClipboard(url)}>
						<md-icon slot="icon">content_copy</md-icon>
						<span>${url}</span>
					</md-filled-tonal-button>
				</div>
				<!-- -->`
		},
		{ctrl: c},
	)
}
