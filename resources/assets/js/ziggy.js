    var Ziggy = {
        namedRoutes: {"landing":{"uri":"{locale?}","methods":["GET","HEAD"],"domain":null},"home":{"uri":"{locale?}\/home","methods":["GET","HEAD"],"domain":null},"auth.show":{"uri":"{locale?}\/login","methods":["GET","HEAD"],"domain":null},"auth.login":{"uri":"{locale?}\/login","methods":["POST"],"domain":null},"auth.logout":{"uri":"{locale?}\/logout","methods":["GET","HEAD"],"domain":null},"user.register.show":{"uri":"{locale?}\/user\/register","methods":["GET","HEAD"],"domain":null},"user.register":{"uri":"{locale?}\/user","methods":["POST"],"domain":null},"user.show":{"uri":"{locale?}\/user\/{user}","methods":["GET","HEAD"],"domain":null},"user.edit":{"uri":"{locale?}\/user\/{user}\/edit","methods":["GET","HEAD"],"domain":null},"user.update":{"uri":"{locale?}\/user\/{user}","methods":["PUT"],"domain":null},"logos.show":{"uri":"{locale?}\/logos","methods":["GET","HEAD"],"domain":null},"locale":{"uri":"locale","methods":["PUT"],"domain":null},"users.sources.index":{"uri":"xhr\/users\/{user}\/sources","methods":["GET","HEAD"],"domain":null},"users.sources.store":{"uri":"xhr\/users\/{user}\/sources","methods":["POST"],"domain":null},"users.sources.show":{"uri":"xhr\/users\/{user}\/sources\/{source}","methods":["GET","HEAD"],"domain":null},"users.sources.update":{"uri":"xhr\/users\/{user}\/sources\/{source}","methods":["PUT","PATCH"],"domain":null},"users.sources.destroy":{"uri":"xhr\/users\/{user}\/sources\/{source}","methods":["DELETE"],"domain":null},"test.user.sources":{"uri":"test\/user\/{user}\/sources","methods":["GET","HEAD"],"domain":null}},
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
