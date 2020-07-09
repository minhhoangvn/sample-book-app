# api-doc [![Build Status](https://travis-ci.org/e-conomic/api-doc.svg?branch=master)](https://travis-ci.org/e-conomic/api-doc)
[![npm package](https://nodei.co/npm/api-doc.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/api-doc/)

Create documentation for the API of an express app. As an endpoint in an express app.

	npm install api-doc

# Usage

```javascript
var apiDoc = require('api-doc');

app.get('/apidoc/', apiDoc(app)); //you need to pass the express app

```

# Options

```javascript
var apiDoc = require('api-doc');
var options = {
	showNonPublic: true
	cache: false
}

app.get('/apidoc/', apiDoc(app, options));

```

# Getting api docs from express app without the middleware
```javascript
var apiDoc = require('api-doc');
var options = {
	showNonPublic: true
	cache: false
}

var docs = apiDoc.getApiDocs(app, options);

```

- `showNonPublic`, boolean, default `false`. If set to `true` even endpoints that do not have the `public:true` will be documented. 
This can be used in development mode for example to see all endpoints in your docs.
- `cache`, boolean, default `true`. If set to `false` the api documentation will be extracted for the express app on every call.


# Documenting your API
All endpoints are documented automatically. But you have to augment the documentation inline in your code
to make it useful.

The documentation of the resources is generated directly from the Node.js code. We've implemented
a way to annotate endpoints (middleware) with various extra documentation.

# Documenting a resource.

When you create a resource you document it by adding a `.doc` to the endpoint function. The `.doc` property can contain information about.
* A **description**.
* What the resource **consumes**, `application/json` for example.
* What the resource **produces**, `application/json` for example.
* The **HTTP status codes** the resource can return and a short **description** of what that code means, `404 = Id not found` for example.
* Is this endpoint **public**? Set to the `public` property to `true` if you want this endpoint documented.
Here is an example of adding `.doc` to an endpoint function.
 
```js
module.exports = function (http) {
    http.get('/customers/schema', returnSchema);
	
	returnSchema.doc = {
		produces:'application/json',
		description: 'The JSON schema of customers',
		public: true,
		httpStatus:{
			'200':'JSON with json schema'
		}
	};
	function returnSchema(req, res) {
		res.json(customerSchema);
	}
}
```

When you add this, this information will automatically be added to the documentation, both in the HTML and in the JSON.

# The `.doc` format
 
```js
{
    produces:'application/json',
    consumes:'application/json',
    httpStatus:{
        '200':'JSON blah blah',
        '412':'Invalid id format'
    }
}
```


# Special status codes you should not use

## 500 - Internal server error

There is no need to document that a resource can return http status code 500, this should be documented one place, 
and is general for all the endpoints.

## 403 - Unauthorized

Usually you will want a general solution for automatically adding authorization to an endpoint, so you do not have
to manually document an endpoint with 403's

# Documenting express middleware

When a resource makes use of middleware that can cause an error and return a HTTP status code (validation for example),
that middleware should be documented itself. Example:

## Customer validator middleware
 
```js
function getSchemaValidateFunction(schema) {

    val.doc = {
        consumes: 'application/json',
		httpStatus:{
			'400': 'validation error(s)'
		}
    };

    return val;

    function val(req, res, next) {
        //validate according to jsv schemas
        var report = schema.validate(req.body, schema);
        if (!report.valid) {
       	    //we only return something when there is an error
            return next(errors.jsonValidationError(report.errors)); 
        }
        next();
    };
}
```

Above we know that the errors.jsonValidationError returns HTTP status code 400, so we document this.

## Customer returnBody middleware
 
```js
module.exports = function returnBody(){

	success.doc = {
		produces: 'application/json',
		httpStatus:{
			'200': 'JSON with the entity as it would be stored, no id though'
		}
	};

	return success;

	function success(req, res) {
		res.json(req.body);
	}
};
```

This middleware returns the JSON with the entity as it would be stored, no id though with HTTP status
code 200 (`res.json`), so we document this.

# A resource with middleware will get documentation from middleware added

When both the above middelwares are used in a resource like this:
```js
module.exports = function (http) {
	http.post('/customers/validate',
		getSchemaValidateFunction(customerSchema),
		returnBody()
	);
}
```
The API documentation will extract information from both middelwares and document that this resource can return 
both HTTP status code 400 and 200, and both produces and consumes application/json.

**NOTE:** If more than one middleware function returns the same HTTP status code, for example using two validate 
middelwares that bot return HTTP status code 400. The description of the first one will currently be overwritten
by the description of the second one.

# Documentation must be at the root level of the middelware

Notice that if your middleware calls other JavaScript functions in its' body, adding `.doc` to those functions 
will not work. Example:

## **THIS DOES NOT WORK**##
 
```js
module.exports = function (app) {
    app.get('/myendpoint/something', returnX);
	
	function returnX(req, res) {
	    req.mongo.getCollection('appUsers', gotUserCollection);
		
		//This below DOES NOT WORK, you need to add .doc to top level of middleware
		gotUserCollection.doc = {
			produces:'application/json',
			httpStatus:{
				'200':'JSON'
			}
		};
	    function gotUserCollection(err, collection){
	        if(err) return next(errors.mongoError('Could not get collection'));
			//some code...
	    }	
	}
}
```

# `mergeDocs`

Merge two documentations of two middleware functions.

When writing middleware it is recommended that you accept a `doc` property in the options. And use the `mergeDocs` function to merge 
the `doc` property of your middleware function with the `doc` passed in options. Like this:

```js
var apiDoc = require('api-doc');

module.exports = function myMiddlewareFactory(options) {
	myMiddleware.doc = {
		produces:'application/json',
		httpStatus:{
			'200':'JSON blah blah'
		}
	};
	if (options && options.doc) {
		myMiddleware.doc = apiDoc.mergeDocs(myMiddleware.doc, options.doc);
	}
	return myMiddleware;

	function myMiddleware(req, res, next) {
		//implementation
	}
};
```


# Example of JSON returned by `api-doc`

The documentation returned has this kind of format.
```js
{
    //Root level properties are the routes in your express app
    //Required
    '/customers':{
        //One of HTTP methods (express): get, put, del or post
        //Required
        get:{
            //Description of this endpoint
            //Optional
            description:'list all customers',
            //data format produced
            //Optional
            produces:'application/json',
            //TODO: Add description for: httpStatus
            //Optional
            httpStatus:{
                //Description of data returned when http status code is 200
                //Optional
                200:'A list of customers',
                //Description why 412 can be returned
                //Optional
                412:'value'
            },
            //string representing an example of the (pretty-printed) JSON this endpoint produces
            //Optional
            example:'value'
        },
        //One of HTTP methods (express): get, put, del or post
        //Required
        post:{
            //Description of this endpoint
            //Optional
            description:'creates a new customer',
            //data format produced
            //Optional
            produces:'application/json',
            //type of accepted by endpoint
            //Optional
            consumes:'application/json',
            //TODO: Add description for: httpStatus
            //Optional
            httpStatus:{
                //Description of data returned when http status code is 200
                //Optional
                200:'A list of customers',
                //Description why 400 can be returned
                //Optional
                400:'value',
                //Description why 412 can be returned
                //Optional
                412:'value'
            },
            //string representing an example of the (pretty-printed) JSON this endpoint produces
            //Optional
            example:'value'
        }
    }
}
```


# License

[MIT](http://opensource.org/licenses/MIT)
