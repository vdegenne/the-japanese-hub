import {speakJapanese} from '@vdegenne/speech'
import {googleImagesUrl, jishoUrl, mdbgUrl, weblioUrl} from '@vdegenne/links'
import '@material/web/iconbutton/icon-button.js'
import '@material/web/textfield/filled-text-field.js'
import '@material/web/textfield/outlined-text-field.js'
import {withController} from '@snar/lit'
import {css, html} from 'lit'
import {withStyles} from 'lit-with-styles'
import {customElement} from 'lit/decorators.js'
import {store} from '../store.js'
import {PageElement} from './PageElement.js'
import {
	ICO_JISHO,
	ICO_MDBG,
	ICO_WEBLIO,
	SVG_GITHUB,
	SVG_GOOGLE_IMAGES,
} from '../assets/assets.js'
import {createLinkDialog} from '../dialogs.js'

declare global {
	interface HTMLElementTagNameMap {
		'page-main': PageMain
	}
}

@customElement('page-main')
@withController(store)
@withStyles(css`
	:host {
	}
`)
export class PageMain extends PageElement {
	render() {
		const disabled = !store.input
		return html`
			<div class="m-5 flex flex-col gap-5">
				<header class="flex items-center justify-between">
					<div class="text-(--md-sys-color-tertiary) opacity-50">
						the-japanese-hub
					</div>
					<md-filled-tonal-button @click=${() => createLinkDialog()}>
						<md-icon slot="icon">link</md-icon>
						<span>Create link</span>
					</md-filled-tonal-button>
				</header>
				<div>
					${store.F.TEXTAREA('Input', 'input', {
						variant: 'filled',
						rows: 3,
						style: {width: '100%'},
					})}
				</div>
				<div id="actions" class="flex flex-wrap gap-3">
					<md-elevated-button
						?disabled=${disabled}
						@click=${() => {
							speakJapanese(store.input)
						}}
					>
						<md-icon slot="icon">volume_up</md-icon>
						Listen
					</md-elevated-button>

					<md-elevated-button
						?disabled=${disabled}
						href="${jishoUrl(store.input)}"
						target="_blank"
					>
						<md-icon slot="icon"><img src=${ICO_JISHO} /></md-icon>
						Jisho
					</md-elevated-button>

					<md-elevated-button
						?disabled=${disabled}
						href="${weblioUrl(store.input)}"
						target="_blank"
					>
						<md-icon slot="icon"><img src=${ICO_WEBLIO} /></md-icon>
						Weblio
					</md-elevated-button>

					<md-elevated-button
						?disabled=${disabled}
						href="${mdbgUrl(store.input)}"
						target="_blank"
					>
						<md-icon slot="icon"><img src=${ICO_MDBG} /></md-icon>
						MDBG
					</md-elevated-button>

					<md-elevated-button
						?disabled=${disabled}
						href="${googleImagesUrl(store.input)}"
						target="_blank"
					>
						<md-icon slot="icon">${SVG_GOOGLE_IMAGES}</md-icon>
						Google Images
					</md-elevated-button>

					<div class="flex items-center gap-3 mx-5">
						A link is not here and you think it should?
						<md-text-button
							href="https://github.com/vdegenne/the-japanese-hub/issues"
							target="_blank"
						>
							<md-icon slot="icon">${SVG_GITHUB}</md-icon>
							Request on github</md-text-button
						>
					</div>
				</div>
			</div>
		`
	}
}

// export const pageMain = new PageMain();
