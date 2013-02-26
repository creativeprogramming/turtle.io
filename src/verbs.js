/**
 * Sets a route for all verbs
 * 
 * @method all
 * @param  {RegExp}   route Route
 * @param  {Function} fn    Handler
 * @param  {String}   host  [Optional] Hostname this route is for (default is all)
 * @return {Object}         Instance
 */
factory.prototype.all = function (route, fn, host) {
	var self = this;

	// Firing probe
	dtp.fire("route-set", function (p) {
		return [host || "*", route, "ALL"];
	});

	$.route.set(route, function (res, req) {
		handler.call(self, res, req, fn);
	}, "all", host);

	return this;
};

/**
 * Sets a DELETE route
 * 
 * @method delete
 * @param  {RegExp}   route Route
 * @param  {Function} fn    Handler
 * @param  {String}   host  [Optional] Hostname this route is for (default is all)
 * @return {Object}         Instance
 */
factory.prototype.delete = function (route, fn, host) {
	var self = this;

	// Firing probe
	dtp.fire("route-set", function (p) {
		return [host || "*", route, "DELETE"];
	});

	$.route.set(route, function (res, req) {
		handler.call(self, res, req, fn);
	}, "delete", host);

	return this;
};

/**
 * Sets a GET route
 * 
 * @method get
 * @param  {RegExp}   route Route
 * @param  {Function} fn    Handler
 * @param  {String}   host  [Optional] Hostname this route is for (default is all)
 * @return {Object}         Instance
 */
factory.prototype.get = function (route, fn, host) {
	var self = this;

	// Firing probe
	dtp.fire("route-set", function (p) {
		return [host || "*", route, "GET"];
	});

	$.route.set(route, function (res, req) {
		handler.call(self, res, req, fn);
	}, "get", host);

	return this;
};

/**
 * Sets a POST route
 * 
 * @method post
 * @param  {RegExp}   route Route
 * @param  {Function} fn    Handler
 * @param  {String}   host  [Optional] Hostname this route is for (default is all)
 * @return {Object}         Instance
 */
factory.prototype.post = function (route, fn, host) {
	var self = this;

	// Firing probe
	dtp.fire("route-set", function (p) {
		return [host || "*", route, "POST"];
	});

	$.route.set(route, function (res, req) {
		handler.call(self, res, req, fn);
	}, "post", host);

	return this;
};

/**
 * Sets a DELETE route
 * 
 * @method put
 * @param  {RegExp}   route Route
 * @param  {Function} fn    Handler
 * @param  {String}   host  [Optional] Hostname this route is for (default is all)
 * @return {Object}         Instance
 */
factory.prototype.put = function (route, fn, host) {
	var self = this;

	// Firing probe
	dtp.fire("route-set", function (p) {
		return [host || "*", route, "PUT"];
	});

	$.route.set(route, function (res, req) {
		handler.call(self, res, req, fn);
	}, "put", host);

	return this;
};
