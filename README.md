# Features

# 2 Many Tabz

![Team Photo](./selfie.png)
[*how?*](https://help.github.com/articles/about-readmes/#relative-links-and-image-paths-in-readme-files)

TODO: short project description, some sample screenshots or mockups

## Architecture

### Front-end: 
 * Welcome...
 * A button for history
     * Could open new tab altogether
 * A button for project folders
     * Button for view change / straightforward UI
     * List (grid view?) of Tabs in this project
         * Icon
         * URL
         * Title
         * Tags/description
         * Importance?
     * delete button
     * search button (specific tab or tags)
 * Div of options for this particular tab...
     * Add to database (specify options)
     
### Back-end: 
 * Tab Model
     * Opened At
     * URL
     * Name
     * Tags 
     * Custom Notes
 * Project/Folder Model
     * Name
     * List of tabs
     * Custom Notes
 * User model?
     * Definitely don't want on front-end, should be able to derive info from computer/browser..

TODO:  descriptions of code organization and tools and libraries used

## Setup
Because this is an extension, prior to publication on the Chrome webstore, users need to do a teeny bit of work to view the extension for themselves (as opposed to having an already-hosted web application).
* First, make sure to clone this repo with `git clone https://github.com/dartmouth-cs52-20S/project-2-many-tabz.git` in a directory of your choice. 
* Next, simply fire up Chrome and navigate to [chrome://extensions/](chrome://extensions/). 
* Ensure Developer Mode is activated (click the radio button at the top right of this page).
* Click the Load Unpacked button, and select the /src folder of this github repository.
* Turn on the extension by clicking the blue radio button at the bottom right corner of the extension box.
* Click the refresh icon on the extension box anytime you pull a new update from this repository.

## Deployment
Once you've finished the above, just click the new 2ManyTabs icon in your chrome window to pull up our beauiful UI and interact with the app!


## Authors
* Yaorui Zhang
* Jialing Wu
* Katherine Taylor
* Jackson Harris
* Nathan Albrinck
* Yunjin Tong

## Acknowledgments