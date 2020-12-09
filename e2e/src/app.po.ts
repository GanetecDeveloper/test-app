import { $$, browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  filter(key: string) {
    const input = element(by.css('input'))
    input.clear();
    input.sendKeys(key);
  }

  getResults() {
    return $$('.items');
  }

  getResultsTexts() {
    return $$('.item-text');
  }
}
