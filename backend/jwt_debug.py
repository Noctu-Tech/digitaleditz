import asyncio
from services.auth.auth_utils import verify_token
from jose import jwt
def main():
	result = verify_token("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWExZjEyMDQ5MGI2ZWIwNDhlZmI1NyIsImV4cCI6MTc0MzQ1ODc3OH0.H27yq5GkJL2_aAUWvwsgiAmcfBIAc9ZpjaPzK72zgzE")
	print(result)

main()