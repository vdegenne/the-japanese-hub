import {googleImagesUrl, jishoUrl, weblioUrl} from '@vdegenne/links'
import '@material/web/iconbutton/icon-button.js'
import '@material/web/textfield/filled-text-field.js'
import '@material/web/textfield/outlined-text-field.js'
import {withController} from '@snar/lit'
import {css, html} from 'lit'
import {withStyles} from 'lit-with-styles'
import {customElement} from 'lit/decorators.js'
import {store} from '../store.js'
import {PageElement} from './PageElement.js'
import {ICO_JISHO, ICO_WEBLIO, SVG_GOOGLE_IMAGES} from '../assets/assets.js'

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
				<div>
					${store.F.TEXTAREA('Input', 'input', {
						variant: 'filled',
						rows: 4,
						style: {width: '100%'},
					})}
				</div>
				<div id="actions" class="flex flex-wrap gap-3">
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
						href="${jishoUrl(store.input)}"
						target="_blank"
					>
						<md-icon slot="icon"><img src=${ICO_JISHO} /></md-icon>
						Jisho
					</md-elevated-button>

					<md-elevated-button
						?disabled=${disabled}
						href="${googleImagesUrl(store.input)}"
						target="_blank"
					>
						<md-icon slot="icon">${SVG_GOOGLE_IMAGES}</md-icon>
						Google Images
					</md-elevated-button>
				</div>
			</div>
		`
	}
}

// export const pageMain = new PageMain();
