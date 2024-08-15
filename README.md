# React Supabase Template

Welcome to the React Supabase Template! This template provides a solid foundation for getting started with React and Supabase. It includes all the basic configurations and settings you need to quickly set up your project.

## 🛠️ Features

- **React**: A modern JavaScript library for building user interfaces.
- **Supabase**: An open-source backend platform offering real-time databases, authentication, and more.
- **Redux**: A state management tool for React applications.
- **i18n**: Support for multiple languages.
- **Navigation**: A robust navigation system for your app.
- **Modular Code**: Well-structured and maintainable codebase.

## 🚀 Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nilsmcz/standardSupabaseReactWebApp.git
   cd standardSupabaseReactWebApp
   ```

2. **Install dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed, then run:

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env.local` file in the **`app/`** directory of the project and add your own Supabase credentials:

   ```env
   REACT_APP_SUPABASE_URL=YOUR_SUPABASE_URL
   REACT_APP_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   ```

   Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual Supabase project values.

4. **Start the development server:**

   Run the following command to start the development server:

   ```bash
   npm start
   ```

   Your application should now be available at [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

- **`i18n/`**: Configuration and resources for internationalization.
- **`navigation/`**: Files and components related to app navigation.
- **`redux/`**: Redux state management, including store and reducers.
- **`screens/`**: Various screens and views of the application.
- **`sideEffects/`**: Side effects and asynchronous operations.
- **`supabase/`**: Functions and configurations for integrating with Supabase.

## 📝 Additional Information

- **Supabase Documentation**: [Supabase Docs](https://supabase.com/docs)
- **React Documentation**: [React Docs](https://reactjs.org/docs/getting-started.html)
- **Redux Documentation**: [Redux Docs](https://redux.js.org/)
- **i18n Documentation**: [i18next Docs](https://www.i18next.com/)

If you have any questions or need support, feel free to [open an issue here](https://github.com/nilsmcz/standardSupabaseReactWebApp/issues).

Happy coding! 🚀

---

*This template is released under the MIT License. See [LICENSE](LICENSE) for more details.*