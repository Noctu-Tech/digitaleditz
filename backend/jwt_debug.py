# jwt_debug.py
import sys
print("Python paths:")
for path in sys.path:
    print(f"  {path}")

try:
    import jwt
    print("\nJWT module location:", getattr(jwt, "__file__", "unknown"))
    print("JWT module contents:", dir(jwt))
except Exception as e:
    print("\nError importing JWT:", e)

# Try alternate import
try:
    import PyJWT
    print("\nPyJWT module location:", getattr(PyJWT, "__file__", "unknown"))
    print("PyJWT module contents:", dir(PyJWT))
except Exception as e:
    print("\nError importing PyJWT:", e)