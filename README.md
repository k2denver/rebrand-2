# K2 Re-architecture project 

This is a template to start your own project that uses Grunt and libsass!

## Requirements

You'll need to have the following items installed before continuing.

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Grunt](http://gruntjs.com/): Run `[sudo] npm install -g grunt-cli`
  * [Bower](http://bower.io): Run `[sudo] npm install -g bower`

## Quickstart

```bash
git clone https://github.com/k2denver/rebrand-2.git
npm install && bower install
```

While you're working on your project, run:

`grunt` to create the server  
`grunt watch` to watch for changes on files 

And you're set!

## More Information

Sass folder /scss/ imports Bootstrap mixins (installed through bower), and outputs to /app/css/app.css

The templating  grunt plugin used on the project is Assemble (combined with Handlebars) http://assemble.io/ & http://handlebarsjs.com/. Template folder is /template/ and outputs to app/*.html. Please create pages through templates. Do not manually modify html files inside /app/.

