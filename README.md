# scavenger-hunt-aggieworks


## Backend:
- I made a venv for my backend to store the dependencies I installed.

- To run the backend locally please run 'uvicorn backend.main:app --reload' inside of the scavenger-hunt-aggieworks directory

- You can create your own username and password to test the app but I already made a test account if you want to use that instead
    - Credentails are 
        - Username: Admin 
        - Password: Password

- I chose to use env variables to model best practices but for this project they need to be exposed so you can test the code so I have commited the .env file instead of adding it to a gitignore.

### Backend packages used:
Results from pip freeze:
- annotated-types==0.7.0
- anyio==4.6.0
- bcrypt==4.2.0
- fastapi==0.115.0
- greenlet==3.1.1
- idna==3.10
- passlib==1.7.4
- pydantic==2.9.2
- pydantic_core==2.23.4
- PyJWT==2.9.0
- python-dotenv==1.0.1
- python-multipart==0.0.12
- sniffio==1.3.1
- SQLAlchemy==2.0.35
- starlette==0.38.6
- typing_extensions==4.12.2

if uvicorn backend.main:app --reload doesnt work, make sure you have all of these packages installed.

## Frontend
Just run "npm install" inside of the frontend directory to install all the packages to use the nextjs app locally

### Currently the CORS are only set for local developmnent. Need to be updated if site is deployed

### Note
When deciding whether or not I was going to store the items clicked on the frontend or backend I chose to go with the frontend to keep the project scoped to around 5 hours of work. This was not a oversight, it was a deliberate omission.

- Pros
    - Quick implementation
- Cons:
    - When page refreshes user loses data of images clicked