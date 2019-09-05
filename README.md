# biwascheme-repl-demo
A simple demo that shows intaractive development with biwascheme using REPL.

## Quick Start

1. Clone this repository.
```
$ git clone https://github.com/ihuku/biwascheme-repl-demo.git
```

2. Start web server.
```
$ node server.js
```

3. Access to http://localhost:8901 in your browser. You can see *Hello, World!* page, and in the developer console, same messsage is also printed.

4. ***Hot reloading feature:*** Edit src/index.html or app.scm as you like. Web browser detects the changes, then reloads automatically.

5. ***REPL feature:*** Open another terminal and start repl. You can input lisp form that is evaluated in the browser.
```
$ node repl.js
biwas> (+ 1 2)
// => 3
biwas> (set-content! "p" "Modified Hello, World!!!")
// => web page is changed 
```
