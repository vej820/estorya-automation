// @ts-check
import { test, expect } from '@playwright/test';
import { login } from '../helpers/school_mod_login.js';
// import exp from 'constants';


test('has Login button', async ({ page }) => {
    await page.goto('https://estorya-portal-staging-pazl6.ondigitalocean.app/login', { timeout: 80000 }); // Increase timeout to 60 seconds
    await expect(page.getByText('Login')).toBeVisible();
});

test('is not able to login with invalid credential', async ({ page }) => {
    await page.goto('https://estorya-portal-staging-pazl6.ondigitalocean.app/login', { timeout: 60000 }); // Increase timeout to 60 seconds
    await page.getByRole('textbox', { name: 'email' }).fill('marygrace+schooldiv@skunkworks.ais');
    await page.getByRole('textbox', { name: 'password' }).fill('@apusLPT2023');
    await page.locator('//*[@id="login"]/div/div/div/div/div/form/button').click();
    await expect(page.locator('//*[@id="login"]/div/div/div/div/div/div/span')).toContainText('Invalid username or password.');
});


test('is able to login with valid credential', async ({ page }) => {
    await login(page);
    await expect(page.getByText('Your School’s performance and')).toBeVisible();

});


test('add teacher without assigning to classroom', async ({ page }) => {
    await login(page);
    await expect(page.getByText('Your School’s performance and')).toBeVisible();
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
    await page.locator('.css-19bb58m').click();
    await page.getByText('Grade I - ClassRoom 1x', { exact: true }).click();
    await page.getByRole('button', { name: 'Save User' }).click();
});

test('bulk upload teacher and assign classroom', async ({ page }) => {
    await login(page);
    await expect(page.locator('//*[@id="dashboard"]/div[1]/div/div/div/img')).toBeVisible();
    await page.click('a.btn.btn-estoryalight.w-100');
    await expect(page.getByText('User Management')).toBeVisible();
    await page.locator('//*[@id="users"]/div/div/div[1]/div[2]/div/button').click();
    await page.getByText('Bulk Add User and Assign').click();
    await expect(page.getByRole('heading', { name: 'Add Multiple Users' })).toBeVisible();
    await page.getByRole('link', { name: 'Download' }).click();
    await page.getByText('browse').click();
    const fileInput = page.locator('input[type="file"]'); // Adjust the locator to target the file input
    await fileInput.setInputFiles('files/Bulk_teacher_upload.csv');
});

test('is able to update user', async ({ page }) => {
    await login(page);
    await expect(page.locator('//*[@id="dashboard"]/div[1]/div/div/div/img')).toBeVisible();
    await page.click('a.btn.btn-estoryalight.w-100');
    await expect(page.getByText('User Management')).toBeVisible();
    await page.getByRole('row', { name: 'AA A114622 A114622 A1146@' }).getByRole('button').click();
    await page.getByRole('menuitem', { name: 'Edit User' }).click();
    await page.getByRole('textbox', { name: 'First Name *' }).fill('Vegie');
    await page.getByRole('textbox', { name: 'Last Name *' }).fill('Sison');
    await page.locator('#middlename').fill('Mango');
    await page.getByRole('button', { name: 'Save User' }).click();
});

test('is able to search a valid and invalid user', async ({ page }) => {
    await login(page);
    await expect(page.locator('//*[@id="dashboard"]/div[1]/div/div/div/img')).toBeVisible();
    await page.click('a.btn.btn-estoryalight.w-100');
    await expect(page.getByText('User Management')).toBeVisible();
    await page.getByPlaceholder('Search for user name').fill('Joshua User18');
    await expect(page.getByText('Joshua User18')).toBeVisible();
    await page.getByPlaceholder('Search for user name').clear();
    await expect(page.locator('div').filter({ hasText: /^Users 99 result\/s$/ }).nth(1)).toBeVisible();
});

test('Quick task to function correctly', async ({ page }) => {
    await login(page);
    await expect(page.locator('//*[@id="dashboard"]/div[1]/div/div/div/img')).toBeVisible();
    await page.getByRole('link', { name: 'Manage Classrooms' }).click();
    await expect(page.getByPlaceholder('Search for Classroom')).toBeVisible();
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await page.getByRole('link', { name: 'Manage Teachers' }).click();
    await expect(page.getByPlaceholder('Search for Teacher')).toBeVisible();
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await page.getByRole('link', { name: 'Manage Students' }).click();
    await expect(page.getByRole('textbox', { name: 'Search for Student' })).toBeVisible();
});
test('Able to add a new classroom', async ({ page }) => {
    await login(page);
    await expect(page.locator('//*[@id="dashboard"]/div[1]/div/div/div/img')).toBeVisible();
    await page.getByRole('link', { name: 'Add Classroom' }).click();
});