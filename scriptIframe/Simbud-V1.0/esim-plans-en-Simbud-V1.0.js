document.addEventListener("DOMContentLoaded", () => {
    let reactAppHeight;
    let widgetHeight;
    let newIframe = document.createElement('iframe');

    let simbudLink = document.querySelector("a[href*='https://www.simbud.com']");
    let elWidgets = document.querySelectorAll(".simbud-esim-plans-widget");


    elWidgets.forEach(elWidget => {
        const country = elWidget.dataset.country || 'Canada';
        const referal = elWidget.dataset.referal || '';
        const currency = elWidget.dataset.currency || 'CAD';
        const offersDisplayed = elWidget.dataset.offersdisplayed || 6;
        const language = elWidget.dataset.language || 'en';

        let url = "https://simbud.com/widgetSimbud-V1.0/?country=" + country + "&referal=" + referal + "&currency=" + currency + "&nberOffer=" + offersDisplayed + "&language=" + language;

        newIframe.src = url;
        // newIframe.src = "http://localhost:3000/?country=" + country + "&referal=" + referal + "&currency=" + currency + "&nberOffer=" + offersDisplayed + "&language=" + language;
        newIframe.id = "eda";
        newIframe.className = "widgetIframeElement";
        //Setting basic style for initial loading
        newIframe.style = `width: 100%; border: 0; margin: 0 auto; display: block; height: ${widgetHeight}px`;

        if (linkIsUpAndFollows(simbudLink)) {
            let dataWidget = elWidget.getAttribute("data-widget");

            newIframe.setAttribute("data-widget", dataWidget);
            elWidget.prepend(newIframe);
            elWidget.removeChild(elWidget.lastElementChild);

        } else {
            let errorMessage = document.createElement('H3');
            errorMessage.innerHTML = 'Error: Element missing';
            elWidget.prepend(errorMessage);
        }
    });

    //Receiving message from the react website with the number of offers
    window.addEventListener("message", (event) => {
        reactAppHeight = event.data;
        if (Number.isInteger(reactAppHeight)) {
            widgetHeight = calculateWidgetHeight(reactAppHeight);
            newIframe.style = `border: 0; margin: 0 auto;top:0px; width:100%; height:${widgetHeight}px;`;
            elWidget.prepend(newIframe);
            elWidget.removeChild(elWidget.lastElementChild);
        }
    });
});

const linkIsUpAndFollows = (link) => {
    return link && !link.getAttribute('rel')?.match(/nofollow/i);
}

const calculateWidgetHeight = (data) => {
    widgetHeight = data + 50;
    return widgetHeight;
}
