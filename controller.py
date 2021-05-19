import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities 

class controller:
    def __init__(self):
        PATH = "/Users/soham/Downloads/chromedriver"
        os.environ["webdriver.chrome.driver"] = PATH
        chrome_options = Options()
        chrome_options.add_extension('/Users/soham/Downloads/wcag-2.2-plugin-code.crx')

        self.driver = webdriver.Chrome(executable_path="/Users/soham/Downloads/chromedriver", options=chrome_options)


    def openpage(self,website):
        driver = self.driver
        driver.get(website)

    def closebrowser(self):
        self.browser.close()

webpage = controller()
webpage.openpage("http://codewithharry.com")
webpage.closebrowser()