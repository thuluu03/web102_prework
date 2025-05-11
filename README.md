# WEB102 Prework - *Monster Funder*

Submitted by: **Thu Luu**

**Monster Funder** is a website for the company Sea Monster Crowdfunding that displays information about the games they have funded.

Time spent: **11** hours spent in total

## Required Features

The following **required** functionality is completed:

* [x] The introduction section explains the background of the company and how many games remain unfunded.
* [x] The Stats section includes information about the total contributions and dollars raised as well as the top two most funded games.
* [x] The Our Games section initially displays all games funded by Sea Monster Crowdfunding
* [x] The Our Games section has three buttons that allow the user to display only unfunded games, only funded games, or all games.

The following **optional** features are implemented:

* [x] The Fund Here section includes a button that opens a submission form for funding a game and the amount.

## Video Walkthrough

Here's a walkthrough of implemented features:

<img src='walkthrough.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with [Kap](https://getkap.co/) 
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

I encountered many challenges when attempting to implement the popup when clicking on the fund button. Currently, I keep two popups hidden upon loading the screen, based on the buttons clicked (either close or submit) it will close the popup or trigger the other to appear. When trying to implement this feature, the popups would not behave like how I wanted. 
- First, they were not centered. I figured out that I should assign two classes to the popup divs, one indicating that it is a popup and another class to claim whether it is an active popup or not. Then within the CSS, I wanted to use flexbox to center the popup. To keep the popups hidden, I kept the default display as none, but justify-content as center. Then when the popup has an active class, its display will be overriden to be flex, allowing the popup to stay centered. 
- Another issue I encountered was that clicking submit would not trigger the second popup to show. By looking through console error messages when inspecting element on the page, I figured out that this was due to the fact that I had never given an id to one of my components, yet I was calling `document.getElementbyID` which would stop the remainder of the script from running, including adding an event listener to my submit button.

## License

    Copyright 2025 Thu Luu

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
