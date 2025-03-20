I would like you to create this project in a step by step fashion.

Tech stack:
* Next.JS using App Router, source in /src directory, using TypeScript.
* React for the components.
* Styling should be done using Tailwind CSS.
* It should be a clean modern look.
* Sqlite for the Database, using Prisma to manage migrations and schema
* Testing of the app should be done via Vitest.  Testing out the react components would be very valuable.

Website structure:
* Welcome page that describes the app, Enter in your name and email to continue.
* It records you name and email in the database.  The email should be the user identifier, not the same.
* Tic tac toe game board, asks you to make a move.  This should be its own react component and it should show X and O when the user and the AI moves.
* It should randomly pick the user or the AI to go first.  Moves alternate until there is a winner.  It should use a competent algorithm to find the best move.
* Once you or the computer wins, it records the game results under your name.  It shows you your current scores.
* You can play again or see the leaderboard.
* The leaderboard lists all names (but not their emails as that would be insecure) and how many games they have won or lost.
* If a user comes back and enters in the same email but a different user name, update the username for the user, but still add their states to the user identified by the email.

Strategy Guidelines:

Be sure to test each feature to ensure it works.  Ensure that you are making progress at each increment.  Update the readme.md.

You should start by creating a simple Next.JS app with a single page that does nothing.  Then create a new Github repository and push your code to the repository.  Then create github issues for each step.

As you complete a task, ensure the project builds and test the website works by running the dev server and visiting the website and clicking through the various pages that should exist.  Then push it as a new Github PR and merge it into main.  Then start the next task off of the main branch that is pulled from the repo.  Maybe even add this requirement to each issue to ensure when you delegate, these steps are done.

A good strategy is to have sub-agents do each github issue (tell them the github number and a good bit of context) all the way to PR and you use the sleep tool to wait for the sub-agent to complete, waiting one minute at a time between check-ins.  You can have the same sub-agent do the github actions as well.
