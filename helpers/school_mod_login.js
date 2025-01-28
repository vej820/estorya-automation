async function login(page) {
    await page.goto('https://estorya-portal-staging-pazl6.ondigitalocean.app/login', { timeout: 60000 }); // Increase timeout to 60 seconds
    await page.getByRole('textbox', { name: 'email' }).fill('marygrace+schoolmod@skunkworks.ai');
    await page.getByRole('textbox', { name: 'password' }).fill('@apusLPT2023');
    await page.locator('//*[@id="login"]/div/div/div/div/div/form/button').click();
}

module.exports = { login };
