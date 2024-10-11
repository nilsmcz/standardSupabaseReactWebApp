# React Supabase Template

Welcome to the React Supabase Template! This template provides a solid foundation for getting started with React and Supabase. It includes all the basic configurations and settings you need to quickly set up your project.

## 🛠️ Features

- **React**: A modern JavaScript library for building user interfaces.
- **Supabase**: An open-source backend platform offering real-time databases, authentication, and more.
- **Redux**: A state management tool for React applications.
- **i18n**: Support for multiple languages.
- **Navigation**: A robust navigation system for your app.
- **Modular Code**: Well-structured and maintainable codebase.
- **Supabase Edge Functions**: Custom server-side functions using Supabase Edge Functions.

## 📂 Project Structure

- **`i18n/`**: Configuration and resources for internationalization.
- **`navigation/`**: Files and components related to app navigation.
- **`redux/`**: Redux state management, including store and reducers.
- **`screens/`**: Various screens and views of the application.
- **`sideEffects/`**: Side effects and asynchronous operations.
- **`supabase/`**: Functions and configurations for integrating with Supabase.
- **`supabase/functions/`**: Edge Functions that handle custom server-side logic.

## 🧩 Supabase Edge Functions

In the `supabase/functions/` directory, you will find several custom edge functions that extend the functionality of your app:

- **deleteProfilePicture**: Deletes a user's profile picture from storage and removes the corresponding entries from the `user_profiles` table.
- **getProfile**: Retrieves all entries for a user based on the user's ID from the `user_profiles` table.
- **setUpProfile**: Inserts a user entry into the user_profiles table based on the authenticated user's ID, ensuring the user is added if they don't already exist, and handles any potential database insertion conflicts.
- **setProfilePicture**: Uploads a picture to the storage and stores the image ID and path in the `user_profiles` table for the user.

Additional functions available:

- **changeEmail**: Allows a user to update their email address.
- **changePassword**: Allows a user to update their password.
- **changePhoneNumber**: Allows a user to update their phone number.
- **changeProfilePicture**: Allows a user to update their profile picture.

These functions interact with Supabase's storage, authentication, and database services to provide secure, server-side logic.

## 🔄 State Management

All authentication and profile information is stored and managed in Redux, ensuring that the app can efficiently manage user data and state throughout its lifecycle.

## 🚀 Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nilsmcz/standardSupabaseReactWebApp.git
   cd standardSupabaseReactWebApp
   ```

2. **Install dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed, then run npm install in **`app/`**:

   ```bash
   npm install
   ```

3. **Install additional dependencies:**

   Additionally, install `cross-env` globally to handle environment variables:

   ```bash
   npm install -g cross-env
   ```

4. **Configure environment variables:**

   Create a `.env.local` file in the **`app/`** directory of the project and add your own Supabase credentials:

   ```env
   REACT_APP_SUPABASE_URL=YOUR_SUPABASE_URL
   REACT_APP_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   ```

   Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual Supabase project values.

5. **Set up Supabase:**

   - If you're running Supabase locally, you'll need to [set up the Supabase CLI](https://supabase.com/docs/guides/cli) and run Supabase as an emulator:

     ```bash
     supabase start
     ```

     This starts Supabase locally, allowing you to work in a local development environment.

   - Create the necessary tables and storage buckets in Supabase:

     **SQL for user_profiles table**:

     ```sql
     create table
       public.user_profiles (
         id uuid not null default auth.uid(),
         profile_picture_url text null,
         profile_picture_path text null,
         constraint user_profiles_pkey primary key (id)
       ) tablespace pg_default;
     ```

     **Storage bucket**:

     Create a bucket named `profile_pictures` with public access for storing profile pictures.

6. **Install VS Code Tasks Extension (optional but recommended):**

   Install the [VS Code Tasks Extension](https://marketplace.visualstudio.com/items?itemName=actboy168.tasks) (`actboy168.tasks`) to enable quick access to start the app both locally and online using buttons in VS Code.

7. **Start the development server:**

   Run the following command to start the development server:

   ```bash
   npm start
   ```

   Your application should now be available at [http://localhost:3000](http://localhost:3000).

## 📝 Additional Information

- **Supabase Documentation**: [Supabase Docs](https://supabase.com/docs)
- **React Documentation**: [React Docs](https://reactjs.org/docs/getting-started.html)
- **Redux Documentation**: [Redux Docs](https://redux.js.org/)
- **i18n Documentation**: [i18next Docs](https://www.i18next.com/)
- **VS Code Tasks Extension**: [VS Code Tasks](https://marketplace.visualstudio.com/items?itemName=actboy168.tasks)

If you have any questions or need support, feel free to [open an issue here](https://github.com/nilsmcz/standardSupabaseReactWebApp/issues).

Happy coding! 🚀

---

*This template is released under the MIT License. See [LICENSE](LICENSE) for more details.*
