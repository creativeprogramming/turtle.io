/**
 * Starts instance
 * 
 * @method start
 * @param  {Object}   args Parameters to set
 * @param  {Function} fn   [Optional] Error handler
 * @return {Object}        Instance
 */
factory.prototype.start = function ( args, fn ) {
	var self    = this,
	    params  = {},
	    headers = {},
	    i       = -1,
	    bootstrap, error, msg, sig;

	// Merging config
	if ( args !== undefined ) {
		$.merge( this.config, args );
	}

	// Setting `Server` HTTP header
	if ( this.config.headers.Server === undefined ) {
		this.config.headers.Server = ( function () { return ( "turtle.io/{{VERSION}} (abaaso/" + $.version + " node.js/" + process.versions.node.replace( /^v/, "" ) + process.platform.capitalize() + " V8/" + process.versions.v8.toString().trim() + ")" ); } )();
	}

	if ( cluster.isMaster ) {
		// Message passing
		msg = function ( msg ) {
			pass.call( self, msg );
		};

		// Signal handler
		sig = function ( code, signal ) {
			var worker;

			if ( signal !== "SIGHUP" ) {
				// Queue worker was killed, re-route!
				if ( cluster.workers[self.config.queueWorker] === undefined ) {
					self.config.queueWorker = ( parseInt( $.array.keys( cluster.workers ).sort( $.array.sort ).last(), 10 ) + 1 ).toString();
				}

				// Forking new queue process
				worker = cluster.fork();
				worker.on( "message", msg );
				worker.on( "exit",    sig );

				// Announcing new queue worker
				msg( {ack: false, cmd: MSG_ALL, altCmd: MSG_QUE_NEW, id: $.uuid( true ), arg: self.config.queueWorker, worker: MSG_MASTER} );
			}
		};

		// Minimum process count is 3 [master, queue, (www - n)]
		if ( this.config.ps < 2 ) {
			this.config.ps = 2;
		}

		// Setting queueWorker to worker 1
		this.config.queueWorker = "1";

		// Setting errorHandler for workers
		this.config.errorHandler = fn;

		// Announcing state
		console.log( "Starting turtle.io on port " + this.config.port );

		// Spawning child processes
		while ( ++i < this.config.ps ) {
			cluster.fork();
		}

		// Setting up worker events
		$.array.cast( cluster.workers ).each( function ( i, idx ) {
			i.on( "message", msg );
			i.on( "exit",    sig );
		});
	}
	else {
		// This is only meant to capture Errors emitted from node.js,
		// such as a Stream Error in stream.js, which allows toobusy to do it's job
		process.on("uncaughtException", function ( e ) {
			self.log( e );
		});

		// Setting message listener
		process.on( "message", function ( arg ) {
			self.receiveMessage.call( self, arg );
		});

		// Notifying master
		this.sendMessage( MSG_READY, null );
	}

	return this;
};
