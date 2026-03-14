from fastapi import Request

class TenantContext:

    @staticmethod
    def get_tenant_id(request: Request):
        tenant_id = request.headers.get("X-Tenant-ID")
        if not tenant_id:
            raise Exception("Tenant header missing")
        return int(tenant_id)