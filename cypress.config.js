const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
     
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    baseUrl: "http://lojaebac.ebaconline.art.br/",
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'reports',   
      overwrite: false,
      html: true,             
      json: true             
    }
  },
});
