# RAWeb

A simple web interface for your RemoteApps hosted on Win 7, 8, 10 and Server.

To setup RemoteApps, try [RemoteApp Tool](https://github.com/kimmknight/remoteapptool).

## Features

* A web interface for your RemoteApps (and full-desktop RDP sessions)
* Webfeed to put RemoteApps in client start menu
* File type associations on webfeed clients

## To Install and Run

1. Download the [Latest Release](https://github.com/NepuShiro/raweb/releases/latest)
2. Extract all files and follow the [Guide](https://github.com/kimmknight/raweb/wiki/Setup-RAWeb-Web-Interface), just the parts for the RDP files and Image files of which these go to `/public/rdp` or `/public/icon`.
3. Run the EXE!

## To Build

1. Clone this repo into a new folder `git clone https://github.com/NepuShiro/raweb.git`
2. Open a new terminal and run `npm init -y` to Initialize the Node Project.
3. Install express `npm install express`
4. Install pkg `npm install -g pkg`
5. Then run `npm run package` to build the EXE.

## Guides

* [Setup RAWeb Web Interface](https://github.com/kimmknight/raweb/wiki/Setup-RAWeb-Web-Interface)
* [File type associations for RAWeb webfeed clients](https://github.com/kimmknight/raweb/wiki/File-type-associations-for-RAWeb-webfeed-clients)

## Screenshots

![](https://github.com/NepuShiro/raweb/blob/master/docs/images/screenshots/raweb0020.png?raw=true)

A web interface for your RemoteApps

![](https://github.com/kimmknight/raweb/wiki/images/screenshots/rawebfeed.png)

Webfeed puts RemoteApps in client Start Menu

![](https://github.com/kimmknight/raweb/wiki/images/screenshots/win8webfeedcrop.jpg)
