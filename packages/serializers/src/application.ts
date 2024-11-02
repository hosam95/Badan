import EventEmitter from 'events';
import http from 'http';

//this is a trimmed copy of the Application type in Express
export abstract class Application extends EventEmitter {
    

    /**
     * Initialize the server.
     *
     *   - setup default configuration
     *   - setup default middleware
     *   - setup route reflection methods
     */
    init?(): void;

    /**
     * Initialize application configuration.
     */
    defaultConfiguration?(): void;

    /**
     * Register the given template engine callback `fn`
     * as `ext`.
     *
     * By default will `require()` the engine based on the
     * file extension. For example if you try to render
     * a "foo.jade" file Express will invoke the following internally:
     *
     *     app.engine('jade', require('jade').__express);
     *
     * For engines that do not provide `.__express` out of the box,
     * or if you wish to "map" a different extension to the template engine
     * you may use this method. For example mapping the EJS template engine to
     * ".html" files:
     *
     *     app.engine('html', require('ejs').renderFile);
     *
     * In this case EJS provides a `.renderFile()` method with
     * the same signature that Express expects: `(path, options, callback)`,
     * though note that it aliases this method as `ejs.__express` internally
     * so if you're using ".ejs" extensions you dont need to do anything.
     *
     * Some template engines do not follow this convention, the
     * [Consolidate.js](https://github.com/visionmedia/consolidate.js)
     * library was created to map all of node's popular template
     * engines to follow this convention, thus allowing them to
     * work seamlessly within Express.
     */
    engine?(
        ext: string,
        fn: (path: string, options: object, callback: (e: any, rendered?: string) => void) => void,
    ): this;


    /**
     * Return the app's absolute pathname
     * based on the parent(s) that have
     * mounted it.
     *
     * For example if the application was
     * mounted as "/admin", which itself
     * was mounted as "/blog" then the
     * return value would be "/blog/admin".
     */
    path?(): string;

    /**
     * Check if `setting` is enabled (truthy).
     *
     *    app.enabled('foo')
     *    // => false
     *
     *    app.enable('foo')
     *    app.enabled('foo')
     *    // => true
     */
    enabled?(setting: string): boolean;

    /**
     * Check if `setting` is disabled.
     *
     *    app.disabled('foo')
     *    // => true
     *
     *    app.enable('foo')
     *    app.disabled('foo')
     *    // => false
     */
    disabled?(setting: string): boolean;

    /** Enable `setting`. */
    enable?(setting: string): this;

    /** Disable `setting`. */
    disable?(setting: string): this;

    /**
     * Render the given view `name` name with `options`
     * and a callback accepting an error and the
     * rendered template string.
     *
     * Example:
     *
     *    app.render('email', { name: 'Tobi' }, function(err, html){
     *      // ...
     *    })
     */
    render?(name: string, options?: object, callback?: (err: Error, html: string) => void): void;
    render?(name: string, callback: (err: Error, html: string) => void): void;

    /**
     * Listen for connections.
     *
     * A node `http.Server` is returned, with this
     * application (which is a `Function`) as its
     * callback. If you wish to create both an HTTP
     * and HTTPS server you may do so with the "http"
     * and "https" modules as shown here:
     *
     *    var http = require('http')
     *      , https = require('https')
     *      , express = require('express')
     *      , app = express();
     *
     *    http.createServer(app).listen(80);
     *    https.createServer({ ... }, app).listen(443);
     */
    abstract listen(port: number, hostname: string, backlog: number, callback?: () => void): http.Server;
    abstract listen(port: number, hostname: string, callback?: () => void): http.Server;
    abstract listen(port: number, callback?: () => void): http.Server;
    abstract listen(callback?: () => void): http.Server;
    abstract listen(path: string, callback?: () => void): http.Server;
    abstract listen(handle: any, listeningListener?: () => void): http.Server;

    router?: string;

    settings?: any;

    resource?: any;

    map?: any;


    /**
     * The app.routes object houses all of the routes defined mapped by the
     * associated HTTP verb. This object may be used for introspection
     * capabilities, for example Express uses this internally not only for
     * routing but to provide default OPTIONS behaviour unless app.options()
     * is used. Your application or framework may also remove routes by
     * simply by removing them from this object.
     */
    routes?: any;

    /**
     * Used to get all registered routes in Express Application
     */
    _router?: any;

    use?: any;

    all?: any;
    get?: any;
    post?: any;
    put?: any;
    delete?: any;
    patch?: any;

    /**
     * The mount event is fired on a sub-app, when it is mounted on a parent app.
     * The parent app is passed to the callback function.
     *
     * NOTE:
     * Sub-apps will:
     *  - Not inherit the value of settings that have a default value. You must set the value in the sub-app.
     *  - Inherit the value of settings with no default value.
     */
    abstract on: (event: string, callback: (parent: Application) => void) => this;

    /**
     * The app.mountpath property contains one or more path patterns on which a sub-app was mounted.
     */
    mountpath?: string | string[];
}