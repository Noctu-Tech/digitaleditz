from api import create_app
import debugpy  # type: ignore
import uvicorn

app = create_app()

if __name__ == '__main__':
    # debugpy.listen(("0.0.0.0", 5678))
    # print("Waiting for debugger to attach...")
    # debugpy.wait_for_client()

    uvicorn.run("run:app", host="0.0.0.0", port=8000, reload=True)
