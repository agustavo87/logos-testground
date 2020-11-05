    var Ziggy = {
        namedRoutes: {"landing":{"uri":"\/","methods":["GET","HEAD"],"domain":null},"auth.login.show":{"uri":"login","methods":["GET","HEAD"],"domain":null},"auth.login":{"uri":"login","methods":["POST"],"domain":null},"auth.logout":{"uri":"logout","methods":["GET","HEAD"],"domain":null},"auth.register.show":{"uri":"register","methods":["GET","HEAD"],"domain":null},"auth.register":{"uri":"register","methods":["POST"],"domain":null},"home":{"uri":"home","methods":["GET","HEAD"],"domain":null},"logos.show":{"uri":"logos","methods":["GET","HEAD"],"domain":null}},
        baseUrl: 'http://localhost:8000/',
        baseProtocol: 'http',
        baseDomain: 'localhost',
        basePort: 8000,
        defaultParameters: []
    };

    if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
        for (var name in window.Ziggy.namedRoutes) {
            Ziggy.namedRoutes[name] = window.Ziggy.namedRoutes[name];
        }
    }

    export {
        Ziggy
    }
