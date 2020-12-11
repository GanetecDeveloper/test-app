import { AppPage } from './app.po';
import { browser, logging, protractor } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should filter elements by text', async () => {
    await page.navigateTo();
    let EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(page.getResultsIds().get(0)), 3000);

    let resultsIdsAtStart = await page.getResultsIds().get(0).getText();
    let resultsTextAtStart = await page.getResultsTexts().get(0).getText();
    console.log(` # Select first element text and search it. ID: ${resultsIdsAtStart} TEXT: "${resultsTextAtStart}"`);

    await page.filter(resultsTextAtStart);

    await expect(await page.getResultsIds().count()).toEqual(1);
    await expect(await page.getResultsIds().get(0).getText()).toEqual((resultsIdsAtStart));
    await browser.sleep(3000);
  });

  it('should filter elements by ID', async () => {
    await page.navigateTo();
    let EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(page.getResultsIds().get(0)), 3000);

    let resultsIdsAtStart = await page.getResultsIds().get(0).getText();
    console.log(` # Select first element ID and search it. ID: ${resultsIdsAtStart}`);

    await page.filter(resultsIdsAtStart);

    await expect(await page.getResultsIds().count()).not.toEqual(0);
    await browser.sleep(3000);
  });

  it('Should show nothing when no results found', async () => {
    await page.navigateTo();
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(page.getResultsIds().get(0)), 3000);

    await page.filter("Este texto no aparece en los resultados aleatorios posibles.");

    await expect(await page.getResultsIds().count()).toEqual(0);
    await browser.sleep(3000);
  });

  it('Should load more items on scroll', async () => {
    await page.navigateTo();
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(page.getResultsIds().get(0)), 3000);

    let visibleItemsOnLoad = await page.getResultsIds().count();
    console.log(` # Initial visible items: ${visibleItemsOnLoad}.`);

    await browser.executeScript('window.scrollTo(0,document.body.scrollHeight);');
    await browser.sleep(3000);
    
    await expect(await page.getResultsIds().count()).toBeGreaterThan(visibleItemsOnLoad);
    await browser.sleep(3000);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    
    // Ommit this validation due to some images IDs not exist at API and return 404.
    
    // const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    // expect(logs).not.toContain(jasmine.objectContaining({
    //   level: logging.Level.SEVERE,
    // } as logging.Entry));
  });
});
