
/**
 * This class handles the creation of a customer. It has a constructor for creating a customer and a static method for parsing a JSON object into a customer.
 */
class Customer {
  /**
   * This function handles the creation of a customer. It has a constructor for creating a customer and a static method for parsing a JSON object into a customer.
   * @param {number} customer_id - The id of the customer.
   * @param {string} name - The name of the customer.
   * @param {string} payment_method - The payment method of the customer.
   * @param {number} payment_number - The payment number of the customer.
   */
  constructor(customer_id, name, payment_method, payment_number) {
    this.customer_id = customer_id;
    this.name = name;
    this.payment_method = payment_method;
    this.payment_number = payment_number;
  }

  /**
   * This function handles the parsing of a JSON object into a customer.
   * @param {Object} json - The JSON object to be parsed.
   * @returns {Customer} - The customer parsed from the JSON object.
   */
  static parseJSON(json) {
    return new Customer(parseInt(json.customer_id), json.name, json.payment_method, parseInt(json.payment_number));
  }

  /**
   * This function handles the parsing of a database entry into a customer.
   * @param {Object} row - The database entry to be parsed.
   * @returns {Customer} - The customer parsed from the database entry.
   */
  static parseDatabaseEntry(row) {
    return Customer.parseJSON({
        customer_id: row.customer_id,
        name: row.name,
        payment_method: row.payment_method,
        payment_number: row.payment_number
    });
  }
}

export default Customer;