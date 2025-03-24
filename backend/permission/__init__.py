from fastapi_contrib.permissions import BasePermission
from fastapi import Request

class TeapotUserAgentPermission(BasePermission):

    def has_required_permissions(self, request: Request) -> bool:
        return request.headers.get('User-Agent') == "admin"