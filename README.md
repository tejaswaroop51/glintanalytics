# zeus

###Getting Started###

Checkout this UI repo, install depdencies, then start the process with the following commands:

```
    Before checking out this UI repo Please checkout the zeusserverapi and run the server first
    
    > git clone https://github.com/tejaswaroop51/zeusserverapi.git
    	> cd zeusserverapi
    	> npm install
    	> npm start
    	
    	After server is started in your local, you can check check the API from postman/restclient using following
    	
    	Method: POST ( I made it post call for security purposes!!!!! :))
    	
    	API URL: http://localhost:3000/zeusserver/datafetch
    	
    Steps for UI Repo checkout and Testing (Node Version 4.4.3 and npm version 2.15.1)
    
    > git clone https://github.com/tejaswaroop51/zeus.git
	> cd zeus
	> npm install
	(   **Please ignore if you get any npm errors and warnings**. all the node_modules will get installed and please proceed to npm start)
	> npm start
	
	After server is started in your local, you can check check the UI using below URL
	
	http://localhost:8000
	
	> I have choosen Boostrap.css for making my app as responsive web design to render on different port sizes
    > I used React as my front end framework in building all components of UI.
        > React is all about building reusable components. In fact, with React the only thing you do is build components. Since they're so encapsulated, components make code reuse, testing, and separation of concerns easy.
        > It helps in building large applications with data that changes over time.
        > For more plese go through below link
            > https://facebook.github.io/react/docs/why-react.html
    > There some parts of the code still can be optimized like in components directory and index.js file
    > I didn't write unit test cases yet owing to my time constraint. But we can add lot of test cases to this.
    > Thought of writing unit test cases using Mocha and Engyme.
    > There is a scope of writing functional test cases as well, using selenium and python.
    > I tested the functionality by keeping most of ideal scenarios as per mockup. 
    > Please don't test the appplication with negitive scenarios, it may brake as I didn't write the unit test cases !!!!!!!
```
    
      