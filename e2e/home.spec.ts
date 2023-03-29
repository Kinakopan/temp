import { test, expect } from '@playwright/test';

let urlHome = "http://localhost:3000";

test.describe('Header area', () => {
  test('The title tag', async({ page }) => {
      await page.goto(urlHome)
      await expect(page).toHaveTitle('Miood Diary');
  })

  test('The meta tag', async ({ page }) => {
      await page.goto(urlHome)

      const metaDescriptionOne = page.locator('meta[name="description"]')
      await expect(metaDescriptionOne).toHaveAttribute("content", "A diary app that you can write everyday event")

      const metaDescriptionTwo = page.locator('meta[name="viewport"]');
      await expect(metaDescriptionTwo).toHaveAttribute('content', 'width=device-width, initial-scale=1')
  })

  test('The link tag', async ({ page }) => {
      await page.goto(urlHome)

      const linkTag = page.locator('link[rel="icon"]');
      await expect(linkTag).toHaveAttribute('href', '/favicon.png')
  })
})

test.describe('Top bar', () => {
  test('Logo image', async({ page }) => {
    await page.goto(urlHome)
    await page.screenshot({ path: 'logo_full_ver.png'})
  })

  test('Top bar area stylizing', async({ page }) => {
    await page.goto(urlHome)

    const carousel = page.locator('#topbar_container');

    const grabbedWidth = await carousel.evaluate((ele) => {
        return window.getComputedStyle(ele).getPropertyValue("width")
    })
    console.log(grabbedWidth);
    expect(grabbedWidth).toBe("1280px");

    const grabbedHeight = await carousel.evaluate((ele) => {
      return window.getComputedStyle(ele).getPropertyValue("height")
    })
    console.log(grabbedHeight);
    expect(grabbedHeight).toBe("70px");

    const grabbedBackgroundColor = await carousel.evaluate((ele) => {
        return window.getComputedStyle(ele).getPropertyValue("background-color")
    })
    console.log(grabbedBackgroundColor);
    expect(grabbedBackgroundColor).toBe("rgb(222, 44, 40)");
  })
})

test.describe('Side bar', () => {
  test ('Side menu link - New Diary', async({ page }) => {
    await page.goto(urlHome)
    await page.getByRole('link', { name: 'New Diary' }).click();
  })

  test ('Side menu link - Diary List', async({ page }) => {
    await page.goto(urlHome)
    await page.getByRole('link', { name: 'Diary List' }).click();
  })

  test ('Side menu link - Back To Cover', async({ page }) => {
    await page.goto(urlHome)
    await page.getByRole('link', { name: 'Back To Cover' }).click();
  })
})

test.describe('Save button', () => {
  test ('The button', async({ page }) => {
    await page.goto(urlHome)
    await page.getByRole('button', { name: 'Save' }).click();
  })

  test('Save button hovering effect', async({ page }) => {
    await page.goto(urlHome)
  await expect(page.locator('button > span')).toHaveCount(4);
  })

  test('Save button stylizing', async({ page }) => {
    await page.goto(urlHome)

    const saveBtn = page.locator('#btn');

    const grabbtnBorder = await saveBtn.evaluate((ele) => {
        return window.getComputedStyle(ele).getPropertyValue("border")
    })
    console.log(grabbtnBorder);
    expect(grabbtnBorder).toBe("1px solid rgb(222, 44, 40)");

    const grabbtnFont = await saveBtn.evaluate((ele) => {
      return window.getComputedStyle(ele).getPropertyValue("color")
    })
    console.log(grabbtnFont);
    expect(grabbtnFont).toBe("rgb(222, 44, 40)");

    const grabbtnBackground = await saveBtn.evaluate((ele) => {
      return window.getComputedStyle(ele).getPropertyValue("background-color")
    })
    console.log(grabbtnBackground);
    expect(grabbtnBackground).toBe("rgb(255, 255, 255)");
  })
})
