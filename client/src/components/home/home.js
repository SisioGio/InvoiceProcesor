import { useState, useEffect } from "react";
import axios from "axios";
import Row from "./row";
function Home() {
  const [data, setData] = useState([]);
  const [enabled, setEnabled] = useState(null);
  const getData = async () => {
    const res = await axios.get("api/document");

    setData(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="col-12  bg-dark m-auto">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Company Code</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Customer VAT</th>
            <th scope="col">Vendor No</th>
            <th scope="col">Vendor Name</th>
            <th scope="col">Vendor VAT</th>
            <th scope="col">Type</th>
            <th scope="col">Doc. No</th>
            <th scope="col">Date</th>
            <th scope="col">Due Date</th>

            <th scope="col">Net Amount</th>
            <th scope="col">Shipping</th>
            <th scope="col">Discount</th>

            <th scope="col">Tax</th>
            <th scope="col">Total</th>

            <th scope="col">PO</th>
            <th scope="col">Delivery</th>
            <th scope="col">Matched</th>
            <th scope="col">Missing GR</th>
            <th scope="col">Price Mismatch</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return <Row row={row} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
