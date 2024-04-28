/**
 * This class handles the creation of user credentials. It has a constructor for creating user credentials and a static method for parsing a JSON object into user credentials.
 */
const UserCredentials = Object.freeze({
  Customer: "Customer",
  Cashier: "Cashier",
  Manager: "Manager",
  Admin: "Admin",
  NoCred: "N/A"
});
export default UserCredentials;
