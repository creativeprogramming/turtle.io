/**
 * Sets response headers
 *
 * @param  {Object}  req             HTTP(S) request Object
 * @param  {Object}  res             HTTP(S) response Object
 * @param  {Number}  status          [Optional] Response status code
 * @param  {Object}  responseHeaders [Optional] HTTP headers to decorate the response with
 * @return {Objet}                   Instance
 */
factory.prototype.headers = function ( req, res, status, responseHeaders ) {
	status      = status || codes.SUCCESS;
	var get     = REGEX_GET.test( req.method ),
	    headers = $.clone( this.config.headers );

	if ( !( responseHeaders instanceof Object ) ) {
		responseHeaders = {};
	}

	// Decorating response headers
	$.merge( headers, responseHeaders );

	// If passing an empty Object, make sure to set `Allow`
	if ( headers.Allow.isEmpty() && status !== 404 && status !== 405 ) {
		headers.Allow = "GET";
	}

	// Fixing `Allow` header
	if ( !REGEX_HEAD2.test( headers.Allow ) ) {
		headers.Allow = headers.Allow.toUpperCase().split( /,|\s+/ ).filter( function ( i ) {
			return ( !i.isEmpty() && !REGEX_HEAD.test( i ) );
		}).join( ", " ).replace( "GET", "GET, HEAD, OPTIONS" );
	}

	headers.Date = new Date().toUTCString();

	if ( headers["Access-Control-Allow-Methods"].isEmpty() ) {
		headers["Access-Control-Allow-Methods"] = headers.Allow;
	}

	// Decorating "Last-Modified" header
	if ( headers["Last-Modified"].isEmpty() ) {
		headers["Last-Modified"] = headers.Date;
	}

	// Setting the response status code
	res.statusCode = status;

	// Removing headers not wanted in the response
	if ( !get || status >= codes.INVALID_ARGUMENTS ) {
		delete headers["Cache-Control"];
	}

	if ( ( status >= codes.FORBIDDEN && status <= codes.NOT_FOUND ) || ( status >= codes.ERROR_APPLICATION ) ) {
		delete headers.Allow;
		delete headers["Access-Control-Allow-Methods"];
		delete headers["Last-Modified"];
	}

	// Decorating response with headers
	$.iterate( headers, function ( v, k ) {
		res.setHeader( k, v );
	});

	return this;
};
