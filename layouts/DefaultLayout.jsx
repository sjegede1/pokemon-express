// import React from 'react'
require('react')

function DefaultLayout() {
  return (
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <h1>Default Layout</h1>
        {props.children}
    </body>
    </html>
  )
}

export default DefaultLayout