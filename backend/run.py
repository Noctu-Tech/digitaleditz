from api import create_app
import debugpy # type: ignore
from fastapi.routing import APIRoute


app = create_app()

if __name__ == '__main__':
    debugpy.listen(("0.0.0.0",5678))
    print("Waiting for debugger to attach...")
    debugpy.wait_for_client()
    app.run()