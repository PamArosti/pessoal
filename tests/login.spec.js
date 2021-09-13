const { test, expect } = require('@playwright/test');
const { table } = require('console');

test.describe('Tests in Workshop Portal',() => {
    test('Login test, choose a company and verify the elements on the screen', async ({ page }) => {
        await page.goto("https://wsportal-uat-oficinas.apps.de1.bosch-iot-cloud.com/oficinas/");
        await page.click('.container-fluid');
        await page.fill('input[name="uEmail"]', 'workshop@wsportal.com');
        await page.fill('input[name="uPassword"]', 'Teste@1234');
        await page.click('button[type="submit"]');
        const name = await page.isVisible('.BoschPrivacySettingsV2__container');
        expect(name).toBeTruthy;
        await page.click('button[data-marketing-cookie-button]');
        const selectPage = await page.isVisible('.row');
        expect(selectPage).toBeTruthy;
        await page.isVisible('text=BODIESEL AUTO PECAS LTDA');
        await page.click('*css=td >> text=BODIESEL AUTO PECAS LTDA', e => e.textContent);
        await page.click(':is(button:has-text("Salvar"))');
        const content = await page.textContent('.text-center');
        expect(content).toBe('Portal de Oficinas Bosch');
        await page.click('*css=a >> text= Relatórios', e => e.textContent);
        await page.click(':is(a:has-text("Extrato Bônus Diesel"))');
        expect('Bosch Diesel Center').toContain('Bosch Diesel Center');
        expect('Jan/21 - Dez/21').toContain('Jan/21 - Dez/21');
        await page.isVisible('h3[data-test="header-title-layout-B"]');
        expect('Empresa: BODIESEL AUTO PECAS LTDA').toContain('Empresa: BODIESEL AUTO PECAS LTDA');
        expect('CNPJ: 00.055.609/0001-68').toContain('CNPJ: 00.055.609/0001-68');
        expect('Oficina').toContain('Oficina');
        expect('Categoria: BDC').toContain('Categoria: BDC');
    //const content1 = await page.getAttribute('li','.list-group-item');
    //    expect(content1).textContent('Chefe Regional: RUBENS');
        expect('Data de Nomeação: 5/2005').toContain('Data de Nomeação: 5/2005');
        expect('Resultado Trimestral').toContain('Resultado Trimestral');
    });

});
