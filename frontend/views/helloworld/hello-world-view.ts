import '@vaadin/button';
import '@vaadin/notification';
import '@vaadin/text-field';
import * as HelloWorldEndpoint from 'Frontend/generated/HelloWorldEndpoint';
import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {View} from '../../views/view';

@customElement('hello-world-view')
export class HelloWorldView extends View {

    @state()
    greeting = '';

    name = '';

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('flex', 'p-m', 'gap-m', 'items-end');
    }

    render() {
        return html`
            <vaadin-vertical-layout>
                <vaadin-text-field label="Your name" @value-changed=${this.nameChanged}></vaadin-text-field>
                <vaadin-button @click=${this.sayHello}>Say hello</vaadin-button>
                <p class="text-3xl text-primary">${this.greeting}</p>
            </vaadin-vertical-layout>
        `;
    }

    nameChanged(e: CustomEvent) {
        this.name = e.detail.value;
    }

    async sayHello() {
        this.greeting = await HelloWorldEndpoint.sayHello(this.name);
    }
}
