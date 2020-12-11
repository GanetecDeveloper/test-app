import { $$, browser, by, element, protractor } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  async filter(key: string) {
    const input = element(by.css('input'))
    await input.clear();
    await input.sendKeys(key);
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    console.log(` # Filter by: "${key}"`);
  }

  getResults() {
    return $$('.e2e-items');
  }

  getResultsIds() {
    return $$('.e2e-item-id');
  }

  getResultsTexts() {
    return $$('.e2e-item-text');
  }
}
