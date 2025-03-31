import boto3
from botocore.exceptions import ClientError
from config import Settings
from fastapi import HTTPException
import logging

settings = Settings()

class S3Client:
    def __init__(self):
        self.s3 = boto3.client(
            's3',
            aws_access_key_id=settings.aws_access_key_id,
            aws_secret_access_key=settings.aws_secret_access_key,
            region_name=settings.aws_region
        )
        self.bucket = settings.s3_bucket

    async def upload_file(self, file, folder: str = "uploads"):
        try:
            file_key = f"{folder}/{file.filename}"
            self.s3.upload_fileobj(file.file, self.bucket, file_key)
            url = f"https://{self.bucket}.s3.{settings.aws_region}.amazonaws.com/{file_key}"
            return url
        except ClientError as e:
            logging.error(e)
            raise HTTPException(status_code=500, detail="Failed to upload file")

    async def delete_file(self, file_key: str):
        try:
            self.s3.delete_object(Bucket=self.bucket, Key=file_key)
            return True
        except ClientError as e:
            logging.error(e)
            raise HTTPException(status_code=500, detail="Failed to delete file")
