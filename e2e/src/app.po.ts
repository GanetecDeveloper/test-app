import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  filter(key: string) {
    element(by.css('input')).sendKeys(key);
  }
}
