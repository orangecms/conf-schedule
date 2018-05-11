# About
This is mainly a redesign of the DebConf15 schedule for mobile devices using a
static version of the XML export from the
[official website](https://debconf15.debconf.org).

## Functionality
All events from the export are listed in tables by day, room, and time.
For quick access there is a clickable list of days in the top region.
Each row of the tables shows the title and the time when the event begins.
If you click/tap on a row, it will expand and display the description, speakers,
and a link to the official website. Click/tap again to hide it.

## Resources used
The colors and the logo originate from the official website's dark theme.
The app is built with the AngularJS framework and the X2JS library.

# Development and installation

## Requirements
You will need a global installation of Node.js, npm, Bower, and Grunt.

## Preparation
To work with the app, please run `bower install` and `npm install` first.

## Building and deploying the app
Simply run `grunt` and you will get a release in the `release/` subfolder.
You can then upload its contents to your webserver, e.g. through tar + SFTP.
One installation is [hosted on DigitalOcean](http://bit.do/debconf15schedule).

## Development
For development you can use the `grunt http-server` task. You will need the XML
file from the official website. You can obtain a copy by running `grunt wget`
and copying it from the `release/` folder into the project root directory.
Then open the local URL in your web browser: `http://localhost:8000/index.html`

## Contribution
Please feel free to participate in whatever way you like. :) Feedback is always
welcome, especially when it's about usability. Pull requests as well of course.
;)

## Updating the XML file
Be aware that Summit does not send CORS headers so you cannot load the XML file
directly from [there](https://summit.debconf.org/debconf15.xml).
You can keep the file up to date through a
[cron job](https://www.freebsd.org/doc/handbook/configtuning-cron.html).
