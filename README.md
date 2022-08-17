# Animal Welfare Tracker

This is an application where Smithsonian ZooKeepers can document and track the animals' welfare progress.  Imagine an Electronic Health Record -- but in CRUD-app form:
The Users sign in to view the homepage, which displays the list of animals at the zoo.  The User then selects an animal to access its list of past assessments.  The User has the option to choose a past assessment to alter it or create a new one.  The assessment results are then published onto the webpage.

## Requirements

The Animal Welfare Tracker is built with a Next.js Frontend and a Headless Drupal 9 Backend.

* For Drupal (Required Modules): 
Simple O-Auth 
JSON API:Web Services

* For Next.js: 
must have yarn installed onto your system!
See Documentation: https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable

cd into Animal-tracker-project/drupal-site/nextjs-app and run the following code in the cmd line:
```js
yarn install
```

# How to Set Up Project

## Overview
Note: You only need to follow these steps if you don't have the following setup on your machine: WSL2, Docker, DDEV, and Drush. I highly recommended setting up a WSL2 Environment to run the application!! We are going to set up WSL2, clone this project, run docker desktop, download DDEV, then download Drush after running DDEV.

## Step 1)
Set up WSL2 onto your machine if you haven't done so.
See Documentation: https://docs.microsoft.com/en-us/windows/wsl/install

Create a project folder in WSL 2's Linux directory.  See documentation on how to find WSL 2's Linux directory: https://www.howtogeek.com/426749/how-to-access-your-linux-wsl-files-in-windows-10/

## Step 2)
Clone this project onto your local. Then, in your command line, cd into the drupal-site folder.

## Step 3)
Install Docker Desktop.
https://docs.docker.com/desktop/install/windows-install/

*Note: Keep this application open for the next steps!!

## Step 4)
Install Composer.  This will automatically install DDEV, which will be used to manage Drupal 9.  Note: Assure that you are using the Ubuntu Command Line before proceeding!!! In the command line, write the following
```js
composer install
```
Then, follow the prompts.

## Step 5)
Run ddev using this command.  Make sure that you have docker desktop running at this time:
```js
ddev start
```
Your project should now be running in Docker Desktop. Visit Docker Desktop to varify that the project is running by checking for the green icons.

## Step 6)
Install Drush. Note: It usually already comes with DDEV, but if for some reason its not there, here's the documentation.
See documentation: https://www.drush.org/latest/install/



# How to Run Project

** To run the next.js Front End: 
cd into animal-tracker-new/drupal-site/nextjs-app, the type in the command line:
```js
yarn run dev
```
This will run your next.js Front End on localhost:3000

** To run the Drupal 9 Backend (and access Drupal's admin panel):
cd into animal-tracker-new/drupal-site
Run the following commands in your command line:
```js
ddev start
ddev ssh
drush uli
```
Click on the URL generated in the command line. It should look something like this:
```js
natashashanae94@drupal-site-web:/var/www/html$ drush uli
http://drupal-site.ddev.site:8080/user/reset/1/1660659631/-P--j-OOVa1R3KMdEg4S2pKL-SpbuUwxfz5Zgnh8gQw/login
natashashanae94@drupal-site-web:/var/www/html$ 
```

# Conclusion
You may now run this app locally!

## Recommended Reading
For more information, please read the internal READ.ME files located in the drupal-site folder and nextjs-app folder. These files will also include links to helpful documentation to configuring next-drupal.