import UserService from "../services/UserService";

const Unauthenticated = ({ children }) => (!UserService.isLoggedIn()) ? children : null;

export default Unauthenticated