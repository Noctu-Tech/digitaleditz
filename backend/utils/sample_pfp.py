
from config import Settings
import boto3
from PIL import Image, ImageDraw, ImageFont
import hashlib
import io
import base64
from botocore.exceptions import ClientError
import os

s3_client = boto3.client(
            's3',
            aws_access_key_id=Settings().aws_access_key_id,
            aws_secret_access_key=Settings().aws_secret_access_key,
            region_name=Settings().aws_region
        )
BUCKET_NAME = Settings().s3_bucket
PROFILE_PIC_PREFIX = 'images/'

def get_color_from_id(user_id: str) -> tuple:
    # Generate consistent color from user_id
    hash_object = hashlib.md5(user_id.encode())
    hex_color = hash_object.hexdigest()[:6]
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def save_to_local_storage(image_bytes: bytes, user_id: str) -> str:
    local_storage_path = os.path.join(os.path.dirname(__file__), '..', 'storage', 'user','profile-pictures')
    os.makedirs(local_storage_path, exist_ok=True)
    
    filename = f"{user_id if user_id else 'anonymous'}.png"
    file_path = os.path.join(local_storage_path, filename)
    
    with open(file_path, 'wb') as f:
        f.write(image_bytes)
    
    return f"file://{file_path}"

def get_sample_pfp(user: str = None, size: int = 200) -> str:
    if not user:
        # Default color for anonymous users
        bg_color = (200, 200, 200)
        initials = "?"
    else:
        bg_color = get_color_from_id(user)
        initials = user[:2].upper()

    # Create image with solid background
    image = Image.new('RGB', (size, size), bg_color)
    draw = ImageDraw.Draw(image)
    
    # Draw circle
    draw.ellipse([0, 0, size, size], fill=bg_color)
    
    # Add text
    try:
        font = ImageFont.truetype("arial.ttf", size=size//2)
    except:
        font = ImageFont.load_default()
        
    # Center the text
    text_bbox = draw.textbbox((0, 0), initials, font=font)
    text_position = ((size - (text_bbox[2] - text_bbox[0])) // 2,
                    (size - (text_bbox[3] - text_bbox[1])) // 2)
    
    # Draw text in contrasting color
    text_color = (255, 255, 255) if sum(bg_color) < 382 else (0, 0, 0)
    draw.text(text_position, initials, fill=text_color, font=font)
    
    # Save image to bytes
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    image_bytes = buffered.getvalue()
    
    # Try S3 upload first
    try:
        key = f"{PROFILE_PIC_PREFIX}{user if user else 'anonymous'}.png"
        # Check if S3 client is available
        s3_client.head_bucket(Bucket=BUCKET_NAME)
        
        s3_client.put_object(
            Bucket=BUCKET_NAME,
            Key=key,
            Body=image_bytes,
            ContentType='image/png'
        )
        
        # Generate URL that expires in 1 week
        url = s3_client.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': BUCKET_NAME,
                'Key': key
            },
            ExpiresIn=604800  # 7 days
        )
        return url
        
    except (ClientError, AttributeError) as e:
        print(f"S3 storage unavailable, falling back to local storage: {e}")
        try:
            return save_to_local_storage(image_bytes, user_id)
        except Exception as e:
            print(f"Local storage failed: {e}")
            # Final fallback to base64
            img_str = base64.b64encode(image_bytes).decode()
            return f"data:image/png;base64,{img_str}"
