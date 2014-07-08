Porming
=======

is basically a "Gruntfile" - with acompanying package.json, of course - that automatically compiles JADE and LESS files. The intended audience being "HTML-People" who don't need a web app, cms or anything, just good ol' static pages. The big advantage is that with LESS you're able to better structure your CSS. The same goes for JADE in respect to HTML.


Another useful feature is the simple http server at port 3080 (changeable default) since sometimes file://-resources behave differently

Install
-------
  1. get node running on your dev machine. (It's not needed on the host)
  1. `git clone git@github.com:slaxor/porming.git /path/to/your/project ; cd $_`
  1. `npm install`
  1. `npm install -g grunt-cli`
  1. you're done :)

Usage
-----

The suggested Workflow is as follows:

  1. start file watch and server: `grunt`
  1. call `http://127.0.0.1:3080` in your favorite browser
  1. edit files in the `./pages` folder
  1. call `http://127.0.0.1:3080` again to see your changes.
  1. repeat from step 2 until you're happy
  1. push `./result/**` to your server

_
