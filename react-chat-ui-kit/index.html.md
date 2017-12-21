<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <title>
        React Chat UI Kit
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,700" rel="stylesheet">
    <style>
        body {
            font-size: 14px;
        }

        main {
            position: relative!important;
            padding-left: 0!important;
        }

        .react-codemirror2::before {
            content: 'edit';
            position: absolute;
            display: block;
            z-index: 9;
            background: rgba(97, 218, 251, 0.5);
            color: #fff;
            text-transform: uppercase;
            font-weight: bold;
            padding: 5px;
            border-radius: 3px 3px 0 0;
            font-size: 10px;
            line-height: 12px;
            margin-top: -22px;
            margin-left: 10px;
        }

        #app [class*="sidebar"] ul {
            padding: 0;
            margin: 0;
        }

        #app [class*="sidebar"] li {
            padding: 0;
            margin: 0;
        }

        #app [class*="sidebar"] a {
            color: #fff!important;
            display: block;
            padding: 0.3em 15px;
            line-height: 28px;
        }

        #app a#console-link {
            color: #61dafb!important;
            display: inline-block;
        }

        #app [class*="sidebar"] li li a {
            padding-left: 25px!important;
        }

        #app [class*="sidebar"] li li li {
            display: none!important;
        }

        #app [class*="sidebar"] li a:hover {
            background: rgba(97, 218, 251, 0.3)!important;
        }

        #app p {
            padding: 0 40px;
        }

        main>section::before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 50%;
            background: #1d243b;
            z-index: 1;
            height: 100%;
        }

        main a:hover {
            color: #5ca8f5!important;
        }

        main h1,
        main h2,
        main h3,
        main h4,
        main h5,
        main h6,
        main p,
        main table,
        main aside,
        main dl,
        main header {
            margin-right: 50%!important;
            padding: 0 40px!important;
        }

        main ul,
        main ol {
            margin-right: 48%!important;
            padding: 0 0 0 65px!important;
        }

        main p+pre {
            margin-right: 50%!important;
            padding: 20px 40px!important;
        }

        main header+div+div {
            padding: 0 40px!important;
        }

        main article pre.CodeMirror-line {
            width: 100%!important;
            max-width: none!important;
        }

        main h1,
        main h2,
        main h3,
        main h4 {
            margin-top: 3em!important;
        }

        h1#introduction {
            margin-top: 0!important;
        }

        main h1,
        h1 a {
            font-size: 32px!important;
            padding-top: 0.5em!important;
            padding-bottom: 0.5em!important;
            border-bottom: 1px solid #e3eaed!important;
            margin-bottom: 21px!important;
            letter-spacing: -0.3px!important;
            font-weight: bold!important;
        }

        main h2,
        header h3,
        header h3 a {
            font-size: 24px!important;
            margin-top: 3em!important;
            margin-bottom: 0.7em!important;
            border-bottom: 1px solid #e3eaed!important;
            padding-bottom: 0.7em!important;
            padding-top: 1em!important;
        }

        main header h2,
        main header h3 {
            padding: 0!important;
        }

        main h3 {
            font-size: 16px!important;
            margin-top: 2.5em!important;
            padding-top: 0.5em!important;
            margin-bottom: 0.8em!important;
        }

        main h1 a,
        main h2 a,
        main h3 a,
        header h2,
        header h3 {
            border-bottom: 0!important;
        }

        main h1 a:hover,
        main h1 a:active,
        main h2 a:hover,
        main h2 a:active,
        main h3 a:hover,
        main h3 a:active {
            text-decoration: none!important;
            color: inherit!important;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            font-weight: bold!important;
            width: 100%!important;
        }

        main aside {
            padding: 20px 40px!important;
            margin-top: 1.5em;
            margin-bottom: 1.5em;
            background: #c0e0ff;
            line-height: 1.6;
            position: relative;
        }

        main table {
            display: block;
            margin-top: 1.5em!important;
            margin-bottom: 1em!important;
            overflow: auto!important;
            background: #f3f7f9!important;
            padding-top: 1em!important;
            padding-bottom: 1em!important;
            padding-left: 40px!important;
        }

        main table th {
            padding: 5px 10px!important;
            border-bottom: 1px solid #e3eaed!important;
            vertical-align: bottom!important;
        }

        main table td {
            padding: 10px!important;
            text-align: left!important;
            vertical-align: top!important;
            line-height: 1.6!important;
        }

        main table p {
            padding: 0!important;
            width: 100%!important;
        }

        main code {
            font-size: 12px!important;
        }

        img {
            max-width: 100%;
        }
    </style>
</head>

<body>
    <div id="app"></div>
<script type="text/javascript" src="build/bundle.cd91eedb.js"></script></body>

</html>
