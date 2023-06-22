REMINDER: Before production, switch currency rate source back to API call

React widget to be integrated via iFrame on another domain.
Window.postMessage to communicate the wdiget height

useContext Hook integrated with Reducer to allow Redux integration if decided

Providers for the offers and the currency

REST API to get country

Currency fetched via API

MaterialUI used for Autocomplete

i18next for translation (French-English available, based on browser preferences)

Test website for integration: https://github.com/louisql/helloWidget

## Code to add in your page to load the widget
<div

class="simbud-esim-plans-widget"
data-country="usa"
data-currency="CAD"
data-offersdisplayed="6"
data-referal="francoischarron"
data-language="fr"
> 

 

<a href="https://www.simbud.com/" title="Simbud" style="display: block; text-align: center; padding: 5px 15px">Powered by <strong>SimBud</strong></a>
<noscript>Sorry, your browser does not support JavaScript! Please visit <a href="https://simbud.com/esim/" title="Simbud">Simbud.com</a></noscript>
</div>
<script src="https://simbud.com/scriptIframe/esim-plans-en-Simbud-V1.0.js"></script>

## Customize the widget
    Country, currency, offersDisplayed and language can be customized bu updating the data element in the <div>. Use english country names


## Language change automatically based on browser preferences


