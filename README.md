# Project Brigada <!-- omit from toc -->

#### As a store-manager... <!-- omit from toc -->

You can let your part-time employees know that you need some help on your store. Either if it's because of some sudden rush in shopping mall, so you need someone just for 2-3 hours, or it's unexpected sick-leave... You can notificate all part-time employees, even from other stores, that there's a chance to earn some extra money.

#### As a part-time employee... <!-- omit from toc -->

You get notification when store needs some extra help on the field. You get notifications also from other stores, so it might be good oportunity to get some extra shifts if you are interested. Also you can notificate store-managers that you have some extra time and you are free to come to work if someone needs your help.

## Frontend <!-- omit from toc -->

**React, Typescript, Material UI**

- [Available Scripts](#available-scripts)
  - [`yarn start`](#yarn-start)
  - [`yarn test`](#yarn-test)
  - [`yarn build`](#yarn-build)
  - [`yarn eject`](#yarn-eject)
- [Commits](#commits)
  - [Commit #33: Update logic on 'Picked day' page for all users](#commit-33-update-logic-on-picked-day-page-for-all-users)
  - [Commit #32: Requests separated for users and for stores - finished design](#commit-32-requests-separated-for-users-and-for-stores---finished-design)
  - [Commit #31: Fix for login redirection when token is expired](#commit-31-fix-for-login-redirection-when-token-is-expired)
  - [Commit #30: Requests separated for users and for stores](#commit-30-requests-separated-for-users-and-for-stores)
  - [Commit #29: RequestByUser update - sorted and grouped by date](#commit-29-requestbyuser-update---sorted-and-grouped-by-date)
  - [Commit #28: Branch: 16-request-by-user: Request by user on store dashboard](#commit-28-branch-16-request-by-user-request-by-user-on-store-dashboard)
  - [Commit #27: Branch: 14-send-request-by-user-to-database: Request remove, change](#commit-27-branch-14-send-request-by-user-to-database-request-remove-change)
  - [Commit #26: Branch: 14-send-request-by-user-to-database: Redux refactor](#commit-26-branch-14-send-request-by-user-to-database-redux-refactor)
  - [Commit #25: Branch: 14-send-request-by-user-to-database: Requests added](#commit-25-branch-14-send-request-by-user-to-database-requests-added)
  - [Commit #24: Branch: 12-add-redux-instead-of-localStore: Redux - PickedDays](#commit-24-branch-12-add-redux-instead-of-localstore-redux---pickeddays)
  - [Commit #23: Branch: 12-add-redux-instead-of-localStore: Redux - Registration](#commit-23-branch-12-add-redux-instead-of-localstore-redux---registration)
  - [Commit #22: Branch: 12-add-redux-instead-of-localStore: Types, constants, links, refactoring](#commit-22-branch-12-add-redux-instead-of-localstore-types-constants-links-refactoring)
  - [Commit #21: Branch: 12-add-redux-instead-of-localStore: Redux - Login and GetUser](#commit-21-branch-12-add-redux-instead-of-localstore-redux---login-and-getuser)
  - [Commit #20: Branch: 10-create-store-profile-on-dashboard: Dashboard - Store](#commit-20-branch-10-create-store-profile-on-dashboard-dashboard---store)
  - [Commit #19: Branch: 7-calendar-page: Dashboard - Profile update](#commit-19-branch-7-calendar-page-dashboard---profile-update)
  - [Commit #18: Branch: 7-calendar-page: Confirm PickedDay to RequestUser - success page](#commit-18-branch-7-calendar-page-confirm-pickedday-to-requestuser---success-page)
  - [Commit #17: Branch: 7-calendar-page: Confirm PickedDay to RequestUser](#commit-17-branch-7-calendar-page-confirm-pickedday-to-requestuser)
  - [Commit #16: Branch: 7-calendar-page: Small refactoring](#commit-16-branch-7-calendar-page-small-refactoring)
  - [Commit #15: Branch: 7-calendar-page: PickedDays update - list](#commit-15-branch-7-calendar-page-pickeddays-update---list)
  - [Commit #14: Branch: 7-calendar-page: Added: Calendar + PickTime - List of selected days](#commit-14-branch-7-calendar-page-added-calendar--picktime---list-of-selected-days)
  - [Commit #13: Branch: 7-calendar-page: Comments \& console clenup](#commit-13-branch-7-calendar-page-comments--console-clenup)
  - [Commit #12: Registration form update - select - stores](#commit-12-registration-form-update---select---stores)
  - [Commit #12: Registration form update - datePicker, radio](#commit-12-registration-form-update---datepicker-radio)
  - [Commit #12: EmployeeLevel component](#commit-12-employeelevel-component)
  - [Commit #11: Registration form update](#commit-11-registration-form-update)
  - [Commit #10: Main navigation update - roles](#commit-10-main-navigation-update---roles)
  - [Commit #9: Security redirections and SuccessPage](#commit-9-security-redirections-and-successpage)
  - [Commit #8: Simple authentication system](#commit-8-simple-authentication-system)
  - [Commit #7: Registration form + all texts to JSON](#commit-7-registration-form--all-texts-to-json)
  - [Commit #6: Added react-hook-form and simple registration form](#commit-6-added-react-hook-form-and-simple-registration-form)
  - [Commit #5: Login and Registration pages added](#commit-5-login-and-registration-pages-added)
  - [Commit #4: Added Material UI - AppBar and Menu drawer components](#commit-4-added-material-ui---appbar-and-menu-drawer-components)
  - [Commit #3: Router with PageWrapper added](#commit-3-router-with-pagewrapper-added)
  - [Commit #2: Axios added and simple API call](#commit-2-axios-added-and-simple-api-call)
  - [Commit #1: Create React app](#commit-1-create-react-app)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Commits

https://github.com/JoseOnGit/brigadaProjectFrontend/commits/master/

### Commit #33: Update logic on 'Picked day' page for all users

### Commit #32: Requests separated for users and for stores - finished design

### Commit #31: Fix for login redirection when token is expired

### Commit #30: Requests separated for users and for stores

### Commit #29: RequestByUser update - sorted and grouped by date

### Commit #28: Branch: 16-request-by-user: Request by user on store dashboard

### Commit #27: Branch: 14-send-request-by-user-to-database: Request remove, change

### Commit #26: Branch: 14-send-request-by-user-to-database: Redux refactor

### Commit #25: Branch: 14-send-request-by-user-to-database: Requests added

- requests added to Redux
- new API point for fetching and adding requests
- show only requests created by user

### Commit #24: Branch: 12-add-redux-instead-of-localStore: Redux - PickedDays

### Commit #23: Branch: 12-add-redux-instead-of-localStore: Redux - Registration

- Registration added to Redux
- update of login logic to catch errors

### Commit #22: Branch: 12-add-redux-instead-of-localStore: Types, constants, links, refactoring

### Commit #21: Branch: 12-add-redux-instead-of-localStore: Redux - Login and GetUser

- Login added to Redux
- GetUser added to Redux - since we keep email and accessToken in localStore, we know that user was logged in, so we can fetch his data again in case he refresh page and reset redux

### Commit #20: Branch: 10-create-store-profile-on-dashboard: Dashboard - Store

### Commit #19: Branch: 7-calendar-page: Dashboard - Profile update

- show base shop and skill rating

### Commit #18: Branch: 7-calendar-page: Confirm PickedDay to RequestUser - success page

### Commit #17: Branch: 7-calendar-page: Confirm PickedDay to RequestUser

### Commit #16: Branch: 7-calendar-page: Small refactoring

### Commit #15: Branch: 7-calendar-page: PickedDays update - list

- updated visual
- edit button leads to PickTime page which now modify instead of create new
- delete button remove pickedDay

- list is added also to Calndar page and Dashboard

### Commit #14: Branch: 7-calendar-page: Added: Calendar + PickTime - List of selected days

- calendar page with DateCalendar element from MUI - selected date leads to new page...
- pickTime page with two MobileTimePicker elements from MUI for start and end of brigada
  - on submit write pickedDay to localStorage and lead to new page...
  - it also modify existing pickedDay
- list of pickedDays - here should be all pickedDays with possibility to edit them and finally confirm them.

### Commit #13: Branch: 7-calendar-page: Comments & console clenup

### Commit #12: Registration form update - select - stores

- added connection to backend Stores, so SelectElement is enabled.

### Commit #12: Registration form update - datePicker, radio

- added fields for onboardDate, level.
- new fieldcomponents **DatePickerElement** and **RadioButtonGroup**.
-

### Commit #12: EmployeeLevel component

Is basically just usefull wrapper around Icon with Text.
Component has a lot of options to set size, position and align text according to icon, set width, padding, gap, etc...

### Commit #11: Registration form update

- added fields for name, surname, phone to registration
- login update - based on email address now

- small refactors

### Commit #10: Main navigation update - roles

Added permissions to menu items based on user's role - user/moderator/admin

### Commit #9: Security redirections and SuccessPage

PageWrapper update:

- added security redirections for user loged in/out
  - so when user is not logged in, he can se eno pages but 'login' or 'registration' pages
  - vice versa, when user is already logged in, he should be able to see 'login' or 'registration' pages

Success page

- page to show success message after registration or login
- handle redirection to final page afterwards

Routes refactoring

### Commit #8: Simple authentication system

Authentication system

- Simple auth system by https://www.bezkoder.com/react-express-authentication-jwt/
- To register new userwhere we use only
  - username
  - email
  - password
- The back-end server uses Node.js Express with jsonwebtoken for JWT authentication and Sequelize for interacting with MySQL database.

FormErrorHandler

- component which use FormErrorProvider form react-hook-form-mui to change default error messages in forms.
- also displays authentication messages comming from server
- all server auth messages identified in one list/enum - authMessage

### Commit #7: Registration form + all texts to JSON

Texts to JSON:

- All texts are added to **texts.json** to keep them in one place. Make it easier to handle, manage and create translations in the future.
- Texts are used in application as TXT object - `import TXT from "../contexts/texts.json";`

Login:

- added simple AuthProvider - no functionality yet

Updated registration form:

- form divided into sections (we use styled components)
- added **SelectElement** component
- we use **getAllStoresApiCall** to fetch stores for SelectElement component when RegistrationPage render.
- we use getAddEmployeeApiCall to post and create new employee.

Updated API calls:

- added **setLoading** and **setError** to props in every call.

Update of main navigation:

- we use **sx** proprty of MaterialUI components to redefine its width, colors, paddings.
- use of MaterialUI Icons.
- menu items defined in simple array of objects.

Update of 'Back' button:

- we use **Button** component and icon form MaterialUI

### Commit #6: Added react-hook-form and simple registration form

New dependencies:

- **react-hook-form**
- **react-hook-form-mui**
- **@mui/x-date-pickers**
- **@mui/icons-material**
- **dayjs**

Updated registration form - we use components from new dependncies, like **FormContainer**,**TextFieldElement**, etc.

### Commit #5: Login and Registration pages added

### Commit #4: Added Material UI - AppBar and Menu drawer components

https://mui.com/material-ui/getting-started/

### Commit #3: Router with PageWrapper added

https://reactrouter.com/en/main/start/overview

### Commit #2: Axios added and simple API call

https://github.com/axios/axios

### Commit #1: Create React app
