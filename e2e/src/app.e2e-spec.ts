import { AppPage } from './app.po';
import { browser, logging, protractor } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should filter elements', () => {
    page.navigateTo();
    let resultsNumberAtStart;
    page.getResults().then((items) => {
      resultsNumberAtStart = items.length
    });

    page.filter("Lorem");
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    page.getResults().then((items) => 
      expect(items.length).toBeLessThanOrEqual(resultsNumberAtStart)
    );

    page.filter("");
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    page.getResults().then((items) => 
      expect(items.length).toEqual(resultsNumberAtStart)
    );

    browser.actions().sendKeys(protractor.Key.ARROW_DOWN).perform();

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
