# Site live at "https://scavenger-hunt-aggieworks.vercel.app/"
Please allow a few minutes for the backend to spin up. If you get a "Failed to fetch" error when you try to login, that just means the backend hasn't fully booted up yet.

## UC Davis AggieWorks Take-Home Fall 2024
- We were told to make a project in around 5 hours, mine ended up totaling a little over 6 hours.
- The hardest part was maintaining the small scope.

### What did you learn?
- I learned how to store static photos in the backend and then call them from the frontend when I needed them.

## Running the app
- You can create your own username and password to test the app but I already made a test account if you want to use that instead
    - Credentails are 
        - Username: Admin 
        - Password: Password


## Backend
- To run the backend locally please run 'uvicorn backend.main:app --reload' inside of the scavenger-hunt-aggieworks directory
- The backend packages needed to run this app are all available for referance inside of the requirements.txt

if uvicorn backend.main:app --reload doesnt work, make sure you have all of these packages installed.

## Frontend
Just run "npm install" inside of the frontend directory to install all the packages to use the nextjs app locally

## Developer Notes
When deciding whether or not I was going to store the items clicked on the frontend or backend I chose to go with the frontend to keep the project scoped to around 5 hours of work. This was not a oversight, it was a deliberate omission.

- Pros
    - Quick implementation
- Cons:
    - When page refreshes user loses data of images clicked

- I chose to use env variables to model best practices but for this project they need to be exposed so you can test the code so I have commited the .env file instead of adding it to a gitignore.