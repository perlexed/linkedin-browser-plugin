
function onDocumentReady(callback) {
    // in case the document is already rendered
    if (document.readyState !== 'loading') {
        callback();
    }
    // modern browsers
    else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', callback);
    }
    // IE <= 8
    else {
        document.attachEvent('onreadystatechange', function(){
            if (document.readyState === 'complete') callback();
        });
    }
}

function colorJobDescription(jobContainerElement) {
    const jobDescription = document.getElementById('job-details');
    const jobDescriptionElements = Array
        .from(jobDescription.getElementsByTagName('*'))
        .filter(element => element.childNodes[0]?.nodeValue);

    const techStackKeywords = ['php', 'nodejs', 'javascript', 'typescript', 'node.js', 'react'];
    const languageKeywords = ['deutsch', 'englisch', 'german', 'english'];

    jobDescriptionElements
        .filter(element => languageKeywords.some(lang => element.childNodes[0].nodeValue.toLowerCase().includes(lang)))
        .forEach(element => {
            element.style.backgroundColor = 'red';
        });

    const techStackElements = jobDescriptionElements
        .filter(element => techStackKeywords.some(lang => element.childNodes[0].nodeValue.toLowerCase().includes(lang)));

    techStackElements.forEach(element => {
        element.style.backgroundColor = 'orange';
    });

    jobContainerElement.style.backgroundColor = techStackElements.length ? '#eeffee' : 'lightgray';
}

function listenOnJobChanges(jobContainerElement) {
    const mutationObserver = new MutationObserver(() => {
        const jobHeader = jobContainerElement.getAttribute('aria-label');
        if (!jobHeader) {
            return;
        }

        colorJobDescription(jobContainerElement);
    });

    mutationObserver.observe(jobContainerElement, { childList: true, subtree: true, attributes: true });
}

function getJobContainer() {
    return new Promise((resolve) => {
        const mutationObserver = new MutationObserver(() => {
            const jobContainerElement = document.querySelector('.jobs-search__job-details--container');
            if (!jobContainerElement) {
                return;
            }

            mutationObserver.disconnect();
            resolve(jobContainerElement);
        });

        const bodyElement = document.querySelector('body');
        mutationObserver.observe(bodyElement, { childList: true, subtree: true });
    });
}

onDocumentReady(() => {
    getJobContainer()
        .then(jobContainerElement => listenOnJobChanges(jobContainerElement))
});

