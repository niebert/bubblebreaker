

# BubbleBreaker4JS 
### Version 1.0.23

Simple board game. 

### - [View Demo - Desktop/Browser Version](https://niebert.github.io/bubblebreaker/bubblebreaker4browser.html) 

### - [View Demo - Mobile Menu](https://niebert.github.io/bubblebreaker/bubblebreaker4menu.html) 

This is fork of [bobak7/bubblebreaker](https://github.com/bobak7/bubblebreaker). This fork 
* added a webview of the demo so that learners can view the webapp and then look into mathematical principles of rewards points and its encouraging drivers for the game.
* added score for selected bubbles, so that user could see the points earned for a selection
* [Hamburger Menu version of bubbilebreaker](https://niebert.github.io/bubblebreaker/bubblebreaker4menu.html) was added, that uses the same libraries of `bobak7`
  
**Wikiveristy AppLSAC:** See [Wikiverity AppLSAC](https://en.m.wikiversity.org/wiki/WebApps_with_LocalStorage_and_AppCache/Privacy#Implementation_Example) Example of storing the highscore of a game in the local storage of the browser.


## Game rules

You start with 144 bubbles on board. Break every single-coloured group of two or more adjacent bubbles until there are no more groups to break and reach highest score you can.

### Score computing

#### Breaking bubbles

Group as many bubbles of the same color as possible and break them at once to get more points.


| group size  | reward          |
|:-----------:| ---------------:|
| 2 bubbles   | 2 points        |
| 3 bubbles   | 6 points        |
| 4 bubbles   | 12 points       |
| ...         | ...             |
| *n* bubbles | *n(n-1)* points |

#### Cleaning the board

Try to break all bubbles. The less bubbles left in the end of game the more bonus points you get.

| bubbles left | bonus       |
|:------------:| -----------:|
| 10 or more   | none        |
| 9            | 2 points    |
| 8            | 4 points    |
| 7            | 8 points    |
| 6            | 16 points   |
| 5            | 32 points   |
| 4            | 64 points   |
| 3            | 128 points  |
| 2            | 256 points  |
| 1            | 512 points  |
| none         | 1024 points |



## System Requirements

Any internet browser supporting:

* HTML5
* SVG 1.1
* CSS3 (Grid layout)
* JavaScript
* Canvas API
* Web Storage API

Bubble Breaker doesn't require internet connection at all. It's a single player game and it's running and storing chart and all game settings completely and only on the client side.
