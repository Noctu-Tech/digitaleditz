import enum
from fastapi_contrib.permissions import BasePermission
from fastapi import Request
class UserRole(str, enum.Enum):
    ADMIN = "admin"
    CLIENT = "client"
    CUSTOMER = "customer"

class TeapotUserAgentPermission(BasePermission):

    def has_required_permissions(self, request: Request,permision:UserRole) -> bool:
        return request.cookies.get('authority') == permision