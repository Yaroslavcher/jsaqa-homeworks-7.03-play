const { test, expect } = require("@playwright/test");
const user = require("../user");

test.beforeEach(async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(user.validEmail);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe("Netology.ru login", () => {
  test("valid login", async ({ page }) => {
    // Input valid password at Вход в личный кабинет
    await page.getByPlaceholder("Пароль").fill(user.validPassword);

    // Click Войти
    await page.getByTestId("login-submit-btn").click();

    // Assert The profile page should opened
    await expect(page).toHaveURL("https://netology.ru/profile");
    await expect(
      page.getByRole("heading", { name: "Мои курсы и профессии" })
    ).toBeVisible();
  });

  test("invalid login", async ({ page }) => {
    // Input invalid password at Вход в личный кабинет
    await page.getByPlaceholder("Пароль").fill(user.invalidPassword);

    // Click Войти
    await page.getByTestId("login-submit-btn").click();

    // Assert The profile page should not opened
    await expect(page.getByTestId("login-error-hint")).toBeVisible();
  });
});
