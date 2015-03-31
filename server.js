var http = require('http'),
    browserify = require('browserify'),
    literalify = require('literalify'),
    React = require('react'),
    DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script,
    // This is our React component, shared by server and browser thanks to browserify
    App = React.createFactory(require('./App'))


// Just create a plain old HTTP server that responds to two endpoints ('/' and
// '/bundle.js') This would obviously work similarly with any higher level
// library (Express, etc)
http.createServer(function(req, res) {

  // If we hit the homepage, then we want to serve up some HTML - including the
  // server-side rendered React component(s), as well as the script tags
  // pointing to the client-side code
  if (req.url == '/') {

    res.setHeader('Content-Type', 'text/html')

    // `props` represents the data to be passed in to the React component for
    // rendering - just as you would pass data, or expose variables in
    // templates such as Jade or Handlebars.  We just use some dummy data
    // here (with some potentially dangerous values for testing), but you could
    // imagine this would be objects typically fetched async from a DB,
    // filesystem or API, depending on the logged-in user, etc.
    var props = {
      items: [
        {"event date":"2015-04-13","event time":"05:15","stream date":"2015-04-13","stream time":"07:15","channel":"maintenance","stream":"equipment","priority":"med","event":"3514 out of service","link":"m.ax/df87"},
        {"event date":"2015-04-13","event time":"07:15","stream date":"2015-04-13","stream time":"07:45","channel":"operations","stream":"forecast","priority":"high","event":"30's shortage forecast today","link":"m.ax/z74y"},
        {"event date":"2015-04-13","event time":"07:15","stream date":"2015-04-13","stream time":"07:50","channel":"maintenance","stream":"equipment","priority":"medium","event":"3512 out of service","link":"m.ax/s74t"},
        {"event date":"2015-04-13","event time":"07:20","stream date":"2015-04-13","stream time":"07:50","channel":"maintenance","stream":"equipment","priority":"medium","event":"3510 out of service","link":"m.ax/bd4y"},
        {"event date":"2015-04-13","event time":"08:00","stream date":"2015-04-13","stream time":"08:00","channel":"operations","stream":"forecast","priority":"high","event":"RS shortage forecast today","link":"m.ax/kj8l"},
        {"event date":"2015-04-13","event time":"09:10","stream date":"2015-04-13","stream time":"09:12","channel":"operations","stream":"equipment","priority":"high","event":"RS10 returned to service","link":"m.ax/d9ij"},
        {"event date":"2015-04-13","event time":"08:00","stream date":"2015-04-13","stream time":"09:15","channel":"maintenance","stream":"equipment","priority":"high","event":"RS11 out of service","link":"m.ax/4ftf"},
        {"event date":"2015-04-13","event time":"09:20","stream date":"2015-04-13","stream time":"09:35","channel":"operations","stream":"vessel","priority":"low","event":"MV Swift delayed 11/9/14","link":"m.ax/s7fd"},
        {"event date":"2015-04-13","event time":"10:35","stream date":"2015-04-13","stream time":"10:45","channel":"operations","stream":"vessel","priority":"medium","event":"MV Taylor early 11/5/14","link":"m.ax/d90t"},
        {"event date":"2015-04-13","event time":"11:15","stream date":"2015-04-13","stream time":"11:15","channel":"operations","stream":"equipment","priority":"medium","event":"3514 back in service","link":"m.ax/bd4y"},
        {"event date":"2015-04-13","event time":"14:10","stream date":"2015-04-13","stream time":"14:10","channel":"operations","stream":"equipment","priority":"high","event":"RS11 back in service","link":"m.ax/4ftf"},
        {"event date":"2015-04-13","event time":"14:20","stream date":"2015-04-13","stream time":"14:20","channel":"operations","stream":"equipment","priority":"medium","event":"3512 back in service","link":"m.ax/bd4y"},
        {"event date":"2015-04-13","event time":"14:25","stream date":"2015-04-13","stream time":"14:25","channel":"operations","stream":"equipment","priority":"medium","event":"3510 back in service","link":"m.ax/bd4y"},
        {"event date":"2015-04-14","event time":"06:18","stream date":"2015-04-14","stream time":"07:30","channel":"maintenance","stream":"equipment","priority":"high","event":"RS10 out of service, 1 day of uptime","link":"m.ax/b74y"},
        {"event date":"2015-04-14","event time":"08:00","stream date":"2015-04-14","stream time":"08:00","channel":"maintenance","stream":"work","priority":"medium","event":"PM compliance below target","link":"m.ax/d87w"},
        {"event date":"2015-04-14","event time":"10:45","stream date":"2015-04-14","stream time":"11:30","channel":"maintenance","stream":"equipment","priority":"high","event":"RS04 out of service","link":"m.ax/b74y"},
        {"event date":"2015-04-14","event time":"12:00","stream date":"2015-04-14","stream time":"12:00","channel":"operations","stream":"equipment","priority":"high","event":"RS shortage forecast tomorrow","link":"m.ax/kj8l"},
        {"event date":"2015-04-14","event time":"12:34","stream date":"2015-04-14","stream time":"12:50","channel":"maintenance","stream":"equipment","priority":"medium","event":"3517 out of service","link":"m.ax/4ftf"},
        {"event date":"2015-04-14","event time":"14:12","stream date":"2015-04-14","stream time":"14:12","channel":"operations","stream":"vessel","priority":"medium","event":"MV Susanne early 11/4/14","link":"m.ax/39aq"},
        {"event date":"2015-04-14","event time":"14:15","stream date":"2015-04-14","stream time":"14:15","channel":"operations","stream":"equipment","priority":"high","event":"RS04 return to service","link":"m.ax/d9ij"},
        {"event date":"2015-04-14","event time":"14:50","stream date":"2015-04-14","stream time":"14:50","channel":"operations","stream":"vessel","priority":"low","event":"MV Sky Dream delayed 11/7/14","link":"m.ax/s7fd"},
        {"event date":"2015-04-14","event time":"15:05","stream date":"2015-04-14","stream time":"15:10","channel":"operations","stream":"vessel","priority":"medium","event":"MV Ocean Sky early 11/5/14","link":"m.ax/d90t"},
        {"event date":"2015-04-14","event time":"16:10","stream date":"2015-04-14","stream time":"16:10","channel":"maintenance","stream":"work","priority":"low","event":"wo budget exceeded","link":"m.ax/v0kj"},
        {"event date":"2015-04-15","event time":"09:12","stream date":"2015-04-15","stream time":"09:12","channel":"operations","stream":"vessel","priority":"medium","event":"MV Graul early 11/4/14","link":"m.ax/45rf"},
        {"event date":"2015-04-15","event time":"10:10","stream date":"2015-04-15","stream time":"10:10","channel":"operations","stream":"vessel","priority":"low","event":"MV Dancer delayed 11/12/14","link":"m.ax/87dsa"},
        {"event date":"2015-04-15","event time":"10:45","stream date":"2015-04-15","stream time":"10:45","channel":"operations","stream":"equipment","priority":"high","event":"RS08 return to service","link":"m.ax/34de"},
        {"event date":"2015-04-15","event time":"10:15","stream date":"2015-04-15","stream time":"10:52","channel":"maintenance","stream":"equipment","priority":"high","event":"RS08 out of service","link":"m.ax/d87sa"}
      ]
    }

    // Here we're using React to render the outer body, so we just use the
    // simpler renderToStaticMarkup function, but you could use any templating
    // language (or just a string) for the outer page template
    var html = React.renderToStaticMarkup(body(null,

      // The actual server-side rendering of our component occurs here, and we
      // pass our data in as `props`. This div is the same one that the client
      // will "render" into on the browser from browser.js
      div({id: 'content', dangerouslySetInnerHTML: {__html:
        React.renderToString(App(props))
      }}),

      // The props should match on the client and server, so we stringify them
      // on the page to be available for access by the code run in browser.js
      // You could use any var name here as long as it's unique
      script({dangerouslySetInnerHTML: {__html:
        'var APP_PROPS = ' + safeStringify(props) + ';'
      }}),

      // We'll load React from a CDN - you don't have to do this,
      // you can bundle it up or serve it locally if you like
      script({src: '//fb.me/react-0.13.1.min.js'}),

      // Then the browser will fetch and run the browserified bundle consisting
      // of browser.js and all its dependencies.
      // We serve this from the endpoint a few lines down.
      script({src: '/bundle.js'})
    ))

    // Return the page to the browser
    res.end(html)

  // This endpoint is hit when the browser is requesting bundle.js from the page above
  } else if (req.url == '/bundle.js') {

    res.setHeader('Content-Type', 'text/javascript')

    // Here we invoke browserify to package up browser.js and everything it requires.
    // DON'T do it on the fly like this in production - it's very costly -
    // either compile the bundle ahead of time, or use some smarter middleware
    // (eg browserify-middleware).
    // We also use literalify to transform our `require` statements for React
    // so that it uses the global variable (from the CDN JS file) instead of
    // bundling it up with everything else
    browserify()
      .add('./browser.js')
      .transform(literalify.configure({react: 'window.React'}))
      .bundle()
      .pipe(res)

  // Return 404 for all other requests
  } else {
    res.statusCode = 404
    res.end()
  }

// The http server listens on port 3000
}).listen(3000, function(err) {
  if (err) throw err
  console.log('Listening on 3000...')
})


// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}