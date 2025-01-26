// @ts-check
import { test, expect } from '@playwright/test';
import { login } from '../helpers/school_mod_login.js';


test('has Login button', async ({ page }) => {
    await page.goto('https://estorya-portal-staging-pazl6.ondigitalocean.app/login');
    await expect(page.getByText('Login')).toBeVisible();
});

test('is not able to login with invalid credential', async ({ page }) => {
    await page.goto('https://estorya-portal-staging-pazl6.ondigitalocean.app/login');
    await page.getByRole('textbox', { name: 'email' }).fill('marygrace+schooldiv@skunkworks.ais');
    await page.getByRole('textbox', { name: 'password' }).fill('@apusLPT2023');
    await page.locator('//*[@id="login"]/div/div/div/div/div/form/button').click();
    await expect(page.locator('//*[@id="login"]/div/div/div/div/div/div/span')).toContainText('Invalid username or password.');
});


test('is able to login with valid credential', async ({ page }) => {
    await login(page);
    await expect(page.locator('//*[@id="dashboard"]/div[1]/div/div/div/img')).toBeVisible();

});


test('add teacher without assigning to classroom', async ({ page }) => {
    await login(page);
    await expect(page.locator('//*[@id="dashboard"]/div[1]/div/div/div/img')).toBeVisible();
    await page.click('a.btn.btn-estoryalight.w-100');
    await expect(page.getByText('User Management')).toBeVisible();
    await page.click('//*[@id="users"]/div/div/div[1]/div[2]/div/button');
    await page.click('//*[@id="users"]/div/div/div[1]/div[2]/div/div/p[1]');
    await expect(page.getByText('Add New User')).toBeVisible();
    await page.fill('#firstName', 'vegieauto');
    await page.fill('#lastName', 'automation');
    await page.fill('#middlename', 'man');
    await page.fill('#email', 'vegie+auto1@skunkworks.ai');
    await page.selectOption('#role', 'Teacher');
    await page.click('[type="submit"]');
});

test('add teacher and assign to classroom', async ({ page }) => {
    await login(page);
    await expect(page.locator('//*[@id="dashboard"]/div[1]/div/div/div/img')).toBeVisible();
    await page.click('a.btn.btn-estoryalight.w-100');
    await expect(page.getByText('User Management')).toBeVisible();
    await page.click('//*[@id="users"]/div/div/div[1]/div[2]/div/button');
    await page.click('//*[@id="users"]/div/div/div[1]/div[2]/div/div/p[1]');
    await expect(page.getByText('Add New User')).toBeVisible();
    await page.fill('#firstName', 'vegieauto');
    await page.fill('#lastName', 'automation');
    await page.fill('#middlename', 'man');
    await page.fill('#email', 'vegie+auto1@skunkworks.ai');
    await page.selectOption('#role', 'Teacher');
    await page.click('#isAssignClassroom');
    await page.click('label[for="classroom"]');
    // await page.waitForSelector('#react-select-6-listbox');
    console.log(await page.isVisible('.css-14h4o58-menu'));
    // await page.locator('#react-select-6-listbox div').nth(1).click();


});