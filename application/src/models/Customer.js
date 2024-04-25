class Customer {
  constructor(customer_id, name, payment_method, payment_number) {
    this.customer_id = customer_id;
    this.name = name;
    this.payment_method = payment_method;
    this.payment_number = payment_number;
  }
  static parseJSON(json) {
    return new Customer(parseInt(json.customer_id), json.name, json.payment_method, parseInt(json.payment_number));
  }
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