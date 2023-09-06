import UserService from "../services/UserService";

const WelcomeUser = () => (
  <div className="my-5 p-5 bg-body-secondary rounded-3">
    <h1 className="text-body-emphasis">Hello {UserService.getUsername()} !</h1>
        <p>
      <button className="btn btn-lg btn-success" onClick={() => UserService.doLogout()}>Logout</button>
    </p>
  </div>
)

export default WelcomeUser