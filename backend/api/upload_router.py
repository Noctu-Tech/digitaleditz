from fastapi import APIRouter, UploadFile, File, HTTPException
from utils.s3 import S3Client
from typing import List

router = APIRouter()
s3_client = S3Client()

@router.post("/image")
async def upload_image(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    url = await s3_client.upload_file(file, "images")
    return {"url": url}

@router.post("/bulk-images")
async def upload_multiple_images(files: List[UploadFile] = File(...)):
    urls = []
    for file in files:
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail=f"File {file.filename} must be an image")
        url = await s3_client.upload_file(file, "images")
        urls.append(url)
    return {"urls": urls}

@router.delete("/{file_key}")
async def delete_image(file_key: str):
    success = await s3_client.delete_file(file_key)
    return {"success": success}
