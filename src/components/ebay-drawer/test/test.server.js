const { expect, use } = require('chai');
const { render } = require('@marko/testing-library');
const assign = require('core-js-pure/features/object/assign');
const { testPassThroughAttributes } = require('../../../common/test-utils/server');
const template = require('..');
const mock = require('./mock');

use(require('chai-dom'));

describe('drawer', () => {
    it('renders basic version', async() => {
        const input = mock.Drawer;
        const { getByRole, getByLabelText, getByText } = await render(template, input);

        expect(getByRole('dialog')).has.attr('hidden');
        expect(getByRole('dialog')).has.class('drawer');
        expect(getByRole('dialog')).has.class('drawer--mask-fade-slow');
        expect(getByLabelText(input.a11yCloseText)).has.class('drawer__close');
        expect(getByLabelText(input.a11yMaximizeText)).has.class('drawer__handle');
        expect(getByText(input.renderBody.text)).has.class('drawer__main');
        expect(getByText(input.header.renderBody.text).parentElement).has.class('drawer__header');
        expect(getByText(input.footer.renderBody.text)).has.class('drawer__footer');
    });

    it('renders without handle ', async() => {
        const input = mock.Drawer;
        const { queryByLabelText } = await render(template, assign({}, input, { noHandle: true }));
        expect(queryByLabelText(input.a11yMaximizeText)).to.equal(null);
    });

    it('renders in open state', async() => {
        const input = mock.Drawer_Open;
        const { getByRole } = await render(template, input);
        expect(getByRole('dialog')).does.not.have.attr('hidden');
    });

    it('renders in expanded state', async() => {
        const { getByRole } = await render(template, mock.Drawer_Expanded);
        const $drawer = getByRole('dialog');
        const $window = $drawer.children[0];

        expect($window).has.class('drawer__window--expanded');
        expect($window).has.class('drawer__window--slide');
    });

    testPassThroughAttributes(template);
});
