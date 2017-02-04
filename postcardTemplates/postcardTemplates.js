var postcardTemplates = {
	back: function(candidate, name, message) {
		return '<html>  '  + '   <head>  '  + '   <meta charset="UTF-8">  '  + 
                 '   <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">  '  + 
                 '   <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">  '  + 
                 '   <title>RUN-DNC | Send A Postcard!</title>  '  + 
                 '     '  + 
                 '   <style>  '  + 
                 '     '  + 
                 '     *, *:before, *:after {  '  + 
                 '       -webkit-box-sizing: border-box;  '  + 
                 '       -moz-box-sizing: border-box;  '  + 
                 '       box-sizing: border-box;  '  + 
                 '     }  '  + 
                 '     '  + 
                 '     body {  '  + 
                 '       width: 6.25in;  '  + 
                 '       height: 4.25in;  '  + 
                 '       margin: 0;  '  + 
                 '       padding: 0;  '  + 
                 '       background-color: white;  '  + 
                 '       font-family: "Montserrat", "Open Sans", sans-serif;  '  + 
                 '     }  '  + 
                 '     '  + 
                 '     /* do not put text outside of the safe area */  '  + 
                 '     #safe-area {  '  + 
                 '       position: absolute;  '  + 
                 '       width: 5.875in;  '  + 
                 '       height: 3.875in;  '  + 
                 '       left: 0.1875in;  '  + 
                 '       top: 0.1875in;  '  + 
                 '     }  '  + 
                 '     '  + 
                 '     #message {  '  + 
                 '       position: absolute;  '  + 
                 '       width: 2.2in;  '  + 
                 '       height: 2in;  '  + 
                 '       top: 1.3in;  '  + 
                 '       left: .25in;  '  + 
                 '       font-family: "Montserrat", "Open Sans", sans-serif;  '  + 
                 '       font-weight: 400;  '  + 
                 '       font-size: .10in;  '  + 
                 '       line-height: .15in;  '  + 
                 '     }  '  + 
                 '     '  + 
                 '     #header {  '  + 
                 '       font-family: "Montserrat", "Open Sans", sans-serif;  '  + 
                 '       font-size: .125in;  '  + 
                 '       text-align: center;  '  + 
                 '       color: #E53333;  '  + 
                 '       background-color: #D0D9E2;  '  + 
                 '       height: 1.2in;  '  + 
                 '     }  '  + 
                 '     #header p {  '  + 
                 '       line-height: .05in;  '  + 
                 '       font-size: .18in;  '  + 
                 '     }  '  + 
                 '     .your-name {  '  + 
                 '       font-weight: bold;  '  + 
                 '       font-size: .25in !important;  '  + 
                 '       padding-top: .30in;  '  + 
                 '       color: #2F4F84;  '  + 
                 '     }  '  + 
                 '     .candidate-name {  '  + 
                 '       font-weight: bold;  '  + 
                 '       font-size: .25in !important;  '  + 
                 '       color: #2F4F84;  '  + 
                 '     }  '  + 
                 '     '  + 
                 '   </style>  '  + 
                 '   </head>  '  + 
                 '     '  + 
                 '   <body>  '  + 
                 '     <div id="header">  '  + 
                 '       <p class="your-name">'+ name +'</p>  '  + 
                 '       <p>endorses</p>  '  + 
                 '       <p class="candidate-name">'+ candidate +'</p>  '  + 
                 '     </div>  '  + 
                 '     '  + 
                 '     <!-- do not put text outside of the safe area -->  '  + 
                 '     <div id="safe-area">  '  + 
                 '       <div id="message">  '  + 
                 '         <span class="accent">Dear Delegates, <br><br>' + message + '<br><br> Sincerely,<br>' + name +'</span>'  
                 '       </div>  '  + 
                 '     </div>  '  + 
                 '   </body>  '  + 
                 '     '  + 
                 '   </html>  '  + 
                 '    '
		},
	front: function() {
		return  '   <html>  '  + 
		 '   <head>  '  + 
		 '   <meta charset="UTF-8">  '  + 
		 '   <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">  '  + 
		 '   <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">  '  + 
		 '   <title>RUN-DNC | Send A Postcard!</title>  '  + 
		 '     '  + 
		 '   <style>  '  + 
		 '     '  + 
		 '     *, *:before, *:after {  '  + 
		 '       -webkit-box-sizing: border-box;  '  + 
		 '       -moz-box-sizing: border-box;  '  + 
		 '       box-sizing: border-box;  '  + 
		 '     }  '  + 
		 '     '  + 
		 '     body {  '  + 
		 '       width: 6.25in;  '  + 
		 '       height: 4.25in;  '  + 
		 '       margin: 0;  '  + 
		 '       padding: 0;  '  + 
		 '       font-family: "Montserrat", "Open Sans", sans-serif;  '  + 
		 '     }  '  + 
		 '     '  + 
		 '     #outer {  '  + 
		 '       width: 6.25in;  '  + 
		 '       height: 4.25in;  '  + 
		 '       background-color: #2F4F84;  '  + 
		 '     }  '  + 
		 '     '  + 
		 '     #inner {  '  + 
		 '       width: 5.5in;  '  + 
		 '       height: 3.5in;  '  + 
		 '       position: absolute;  '  + 
		 '       left: .375in;  '  + 
		 '       top: .375in;  '  + 
		 '     }  '  + 
		 '     '  + 
		 '     /* do not put text outside of the safe area */  '  + 
		 '     #safe-area {  '  + 
		 '       position: absolute;  '  + 
		 '       width: 5.875in;  '  + 
		 '       height: 3.875in;  '  + 
		 '       left: 0.1875in;  '  + 
		 '       top: 0.1875in;  '  + 
		 '       text-align: center;  '  + 
		 '       font-family: "Montserrat", "Open Sans", sans-serif;  '  + 
		 '       font-weight: bold;  '  + 
		 '       font-size: 1in;  '  + 
		 '       color: white;  '  + 
		 '       padding-top: .6in;  '  + 
		 '     }  '  + 
		 '     .logo {  '  + 
		 '       border-top: .20in solid #E53333;  '  + 
		 '       border-bottom: .20in solid #E53333;  '  + 
		 '       font-size: 1in;  '  + 
		 '       margin: 0 auto;  '  + 
		 '       width: 85%;  '  + 
		 '     }  '  + 
		 '     .byline {  '  + 
		 '       font-size: .4in;  '  + 
		 '       margin: .5in auto;  '  + 
		 '       width: 85%;  '  + 
		 '       letter-spacing: .05in;  '  + 
		 '       text-transform: uppercase;  '  + 
		 '     }  '  + 
		 '     '  + 
		 '   </style>  '  + 
		 '   </head>  '  + 
		 '     '  + 
		 '   <body>  '  + 
		 '     <div id="outer">  '  + 
		 '       <div id="inner">  '  + 
		 '       </div>  '  + 
		 '     </div>  '  + 
		 '     '  + 
		 '     <!-- do not put text outside of the safe area -->  '  + 
		 '     <div id="safe-area">  '  + 
		 '       <div class="logo">RUN DNC</div>  '  + 
		 '       <div class="byline">rundnc.io</div>  '  + 
		 '     </div>  '  + 
		 '     '  + 
		 '   </body>  '  + 
		 '     '  + 
		 '   </html>  '  + 
		 '    ' ; 
	}
}



module.exports = postcardTemplates;