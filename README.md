## LinkedIn browser extension to color job search pages

Job descriptions on the LinkedIn will be colored by analysing languages and tech stack keywords.


## Installation

### Signed extension

Install the extension from the file `./linkedin-browser-plugin-*.xpi` like a regular extension https://extensionworkshop.com/documentation/publish/distribute-sideloading/#install-addon-from-file

Addon page: https://addons.mozilla.org/en-US/developers/addon/238561bf55494929b640

### Unsigned extension

Unsigned extension can be added to the Firefox, but it will be reset on browser restart.
You can add it on the `about:debugging` page, on the 'This Firefox' tab.
Click 'Load temporary extension' and select `./extension/manifest.json`


## Build and signing

Source: https://stackoverflow.com/questions/34608873/how-to-sign-a-firefox-extension/59172713#59172713

1. Get developers credentials from https://addons.mozilla.org/en-US/developers/addon/api/key/
2. `npm install`
3. `cd ./extension`
4. `npx web-ext sign --api-key=<JWT_ISSUER> --api-secret=<JWT_SECRET>`, 
   where `<JWT_ISSUER>` and `<JWT_SECRET>` is the step 1 credentials
5. Signed extension will be
   - generated in `extension/web-ext-artifacts`
   - or become available to download on the [addon page](https://addons.mozilla.org/en-US/developers/addon/238561bf55494929b640)

