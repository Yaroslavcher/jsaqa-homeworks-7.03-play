const { test, expect } = require("@playwright/test");
var validEmail = require("../user");
var validPassword = require("../user");

test("valid login", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");

  // Input user email at Вход в личный кабинет

  await page.getByPlaceholder("Email").fill(validEmail);

  // Input user password at Вход в личный кабинет
  await page.getByPlaceholder("Пароль").fill(validPassword);

  // Click Войти
  await page.getByTestId("login-submit-btn").click();

  // Assert The profile page should opened
  await expect(page).toHaveURL("https://netology.ru/profile");
  await expect(
    page.getByRole("heading", { name: "Мои курсы и профессии" })
  ).toBeVisible();

  await page.close();
});

test("invalid login", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");

  // Input user email at Вход в личный кабинет
  await page.getByPlaceholder("Email").fill(validEmail);

  // Input user password at Вход в личный кабинет
  await page.getByPlaceholder("Пароль").fill("invalidP1!");

  // Click Войти
  await page.getByTestId("login-submit-btn").click();

  // Assert The profile page should not opened
  await expect(page.getByTestId("login-error-hint")).toBeVisible();

  await page.close();
});
