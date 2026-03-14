from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings

from app.modules.tenant.router import router as tenant_router
from app.modules.users.router import router as users_router
from app.modules.clienti.router import router as clients_router
from app.modules.agenda.router import router as agenda_router
from app.modules.servizi.router import router as services_router
from app.modules.team.router import router as team_router
from app.modules.cassa.router import router as payments_router
from app.modules.magazzino.router import router as products_router
from app.modules.analytics.router import router as analytics_router
from app.modules.ai.router import router as ai_router
from app.modules.marketing.router import router as marketing_router
from app.modules.auth.router import router as auth_router

app = FastAPI(title=settings.APP_NAME)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(tenant_router)
app.include_router(users_router)
app.include_router(clients_router)
app.include_router(agenda_router)
app.include_router(services_router)
app.include_router(team_router)
app.include_router(payments_router)
app.include_router(products_router)
app.include_router(analytics_router)
app.include_router(ai_router)
app.include_router(marketing_router)
app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "SalonOS API running"}