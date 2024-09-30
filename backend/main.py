from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from backend import crud, models, schemas
from .database import SessionLocal, engine
from .auth.router import router as auth_router
from .auth.dependencies import get_current_user

from contextlib import asynccontextmanager
from .seeding import seed_data
from fastapi.staticfiles import StaticFiles

#Creates the db tables
models.Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Run the seed function to populate items if necessary 
    seed_data()
    yield #yield added here to act as empty shutdown logic


app = FastAPI(lifespan=lifespan)

app.include_router(auth_router)
app.mount("/static", StaticFiles(directory="backend/photos"), name="static")


# creates a new SQLAlchemy SessionLocal that will be used in a single request, then closes after request finished
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users/", response_model=schemas.UserInDB, tags=["users"])
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Explicitly enforce min_length validation
    if not user.username or len(user.username) < 4:
        raise HTTPException(status_code=422, detail="Username must be at least 4 characters long")
    if not user.password or len(user.password) < 4:
        raise HTTPException(status_code=422, detail="Password must be at least 4 characters long")

    db_user = crud.get_user_by_username(db, username = user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=list[schemas.UserInDB], tags=["users"])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip = skip, limit = limit)
    return users

@app.get("/users/me/", response_model=schemas.UserInDB, tags=["users"])
async def read_user(current_user: Annotated[schemas.UserInDB, Depends(get_current_user)]):
    return current_user


@app.delete("/users/{user_id}", response_model=dict, tags=["users"])
def delete_user(user_id: int, db: Session = Depends(get_db), current_user: schemas.UserInDB = Depends(get_current_user)):
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this user")
    return crud.delete_user(db = db, user_id = user_id)

# ----- Path Operation for Items below -----

@app.get("/items/", response_model=list[schemas.ItemInDB], tags=["items"])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: schemas.UserInDB = Depends(get_current_user)):
    return crud.get_items(db, skip = skip, limit = limit)

# ----- Path Operation intended for frontend to know it is getting the correct data -----

@app.get("/", tags=["test"])
async def hello():
    return {"message": "Hello Frontend"}