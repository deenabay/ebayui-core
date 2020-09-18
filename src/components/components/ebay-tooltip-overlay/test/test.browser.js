const { expect, use } = require('chai');
const { render, fireEvent, cleanup } = require('@marko/testing-library');
const template = require('..');

use(require('chai-dom'));
afterEach(cleanup);


/** @type import("@marko/testing-library").RenderResult */
let component;

describe('given tooltip button is enabled', () => {
    const input = {
        type: 'infotip',
        overlayId: 'fakeID-1',
        a11yCloseText: 'Close',
        heading: {},
        content: {}
    };

    beforeEach(async() => {
        component = await render(template, input);
    });

    describe('when the close button is clicked', () => {
        beforeEach(async() => {
            await fireEvent.click(component.getByLabelText(input.a11yCloseText));
        });

        it('then it emits the marko event from button click', () => {
            expect(component.emitted('overlay-close')).has.length(1);
        });
    });
});
