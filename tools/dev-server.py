"""Servidor local per provar la web: serveix public/ sense memòria cau.

Ús:  python tools/dev-server.py [port]   (per defecte 5510)
"""
import functools
import http.server
import sys
from pathlib import Path


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map, ".js": "text/javascript"}

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


port = int(sys.argv[1]) if len(sys.argv) > 1 else 5510
root = Path(__file__).resolve().parent.parent / "public"
handler = functools.partial(NoCacheHandler, directory=str(root))
print(f"Servint {root} a http://localhost:{port}")
http.server.ThreadingHTTPServer(("", port), handler).serve_forever()
