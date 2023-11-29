import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LineMatch from "./lineMatch";

function Invoice() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [vendorOrders, setVendorOrders] = useState([]);

  const [header, setHeader] = useState({
    netAmount: 0,
    matched: 0,
    difference: 0,
    shippingCost: 0,
    discount: 0,
    taxAmount: 0,
    totalAmount: 0,
    totalBalance: 0,
  });
  const getData = async () => {
    try {
      const res = await axios.get(`/api/document/${id}`);
      const invoiceData = res.data;

      var initialMatchedAmount = 0;
      invoiceData.vendor.orderItems.map((orderItem) => {
        if (
          invoiceData.lineItems.some(
            (lineItem) => lineItem.orderItemId === orderItem.id
          )
        ) {
          orderItem.matched = true;
          orderItem.quantityMatched = orderItem.stillToBeInvoiced;
          orderItem.unitPriceMatched = orderItem.netPrice;
          orderItem.netAmountMatched =
            orderItem.stillToBeInvoiced * orderItem.netPrice;
          orderItem.isPriceMismatch = false;
          orderItem.isMissingGR =
            orderItem.quantityMatched > orderItem.stillToBeInvoiced;
          initialMatchedAmount += parseFloat(
            orderItem.stillToBeInvoiced * orderItem.netPrice
          );
        } else {
          orderItem.matched = false;
          orderItem.isPriceMismatch = true;
          orderItem.isMissingGR = true;
        }
      });
      setHeader({
        netAmount: invoiceData.netAmount,
        shippingCost: invoiceData.shippingCost,
        discount: invoiceData.discount,
        taxAmount: invoiceData.taxAmount,
        totalAmount: invoiceData.totalAmount,
        matched: initialMatchedAmount,
        difference: invoiceData.netAmount - initialMatchedAmount,
        totalBalance:
          invoiceData.totalAmount -
          initialMatchedAmount -
          invoiceData.shippingCost -
          invoiceData.taxAmount +
          invoiceData.discount,
      });
      setData(invoiceData);
      setVendorOrders(invoiceData.vendor.orderItems);
    } catch (err) {
      console.log(err);
    }
  };

  const matchOrderItem = (orderItem) => {
    const updatedItems = vendorOrders.map((item) =>
      item.id === orderItem.id
        ? {
            ...item,
            matched: true,
            quantityMatched: item.quantityMatched
              ? item.quantityMatched
              : item.orderQuantity,
            unitPriceMatched: item.unitPriceMatched
              ? item.unitPriceMatched
              : item.netPrice,

            netAmountMatched: item.quantityMatched
              ? item.unitPriceMatched
                ? item.quantityMatched * item.unitPriceMatched
                : item.netPrice * item.quantityMatched
              : item.unitPriceMatched
              ? item.orderQuantity * item.unitPriceMatched
              : item.orderQuantity * item.netPrice,

            isMissingGR: item.orderQuantity > item.stillToBeInvoiced,
            isPriceMismatch:
              Math.abs(
                parseFloat(item.unitPriceMatched) - parseFloat(item.netPrice)
              ) > 0,
          }
        : item
    );

    setVendorOrders(updatedItems);
  };

  const unmatchOrderItem = (orderItem) => {
    const updatedItems = vendorOrders.map((item) =>
      item.id === orderItem.id
        ? {
            ...item,
            matched: false,
            quantityMatched: 0,
            unitPriceMatched: 0,
            netAmountMatched: 0,
          }
        : item
    );

    setVendorOrders(updatedItems);
  };
  const updateInput = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    var value = event.target.value;
    if (!value) {
      value = 0;
    }
    setHeader({
      ...header,
      [event.target.name]: value,
    });
  };
  const updateHeadersData = () => {
    var initialMatchedValue = 0;
    vendorOrders.forEach((order) => {
      if (order.matched) {
        initialMatchedValue += parseFloat(order.netAmountMatched);
      }
    });

    setHeader({
      ...header,
      matched: initialMatchedValue,
      difference: header.netAmount - initialMatchedValue,
      totalBalance:
        parseFloat(header.totalAmount) -
        parseFloat(initialMatchedValue) -
        parseFloat(header.shippingCost) -
        parseFloat(header.taxAmount) +
        parseFloat(header.discount),
    });
  };
  const updateMatchedLine = (event, orderItem) => {
    const updatedItems = vendorOrders.map((item) =>
      item.id === orderItem.id
        ? {
            ...item,
            [event.target.name]: event.target.value,
          }
        : item
    );

    updatedItems.forEach((item) => {
      item.netAmountMatched = item.quantityMatched * item.unitPriceMatched;
      item.isPriceMismatch =
        parseFloat(item.unitPriceMatched) != parseFloat(item.netPrice);
      item.isMissingGR =
        parseFloat(item.quantityMatched) > parseFloat(item.stillToBeInvoiced);
    });

    setVendorOrders(updatedItems);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateHeadersData();
  }, [header]);

  useEffect(() => {
    console.log("Orders changed!");
    updateHeadersData();
  }, [vendorOrders]);
  useEffect(() => {}, [data]);
  return (
    <div>
      <div className="row p-2">
        <div className="col-6">
          <div className="actions d-flex justify-content-between">
            <a href="#" className="btn btn-danger">
              Reject
            </a>
            <a href="#" className="btn btn-success disabled">
              Submit
            </a>
          </div>

          {data && (
            <div className="invoice-header p-3 border rounded">
              <div class="row">
                <div class="col  text-start">
                  <label htmlFor="" className="col-form-label">
                    Net Amount
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Net Amount"
                    value={header.netAmount}
                    onChange={(event) => updateInput(event)}
                    name="netAmount"
                  ></input>
                </div>

                <div class="col text-start">
                  <label htmlFor="" className="col-form-label">
                    Matched
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Total Amount"
                    value={header.matched}
                    disabled
                  ></input>
                </div>

                <div class="col text-start">
                  <label htmlFor="" className="col-form-label">
                    Balance
                  </label>
                  <input
                    type="number"
                    disabled
                    class={`form-control ${
                      header.difference === 0
                        ? "border-success"
                        : "border-danger"
                    }`}
                    placeholder="Total Amount"
                    value={header.difference}
                  ></input>
                </div>

                <div class="col  text-start">
                  <label htmlFor="" className="col-form-label">
                    Shipping
                  </label>
                  <input
                    type="number"
                    name="shippingCost"
                    class="form-control"
                    placeholder="Shipping Amount"
                    value={header.shippingCost}
                    onChange={(event) => updateInput(event)}
                  ></input>
                </div>
                <div class="col  text-start">
                  <label htmlFor="" className="col-form-label">
                    Discount
                  </label>
                  <input
                    name="discount"
                    type="number"
                    class="form-control"
                    placeholder="Discount"
                    value={header.discount}
                    onChange={(event) => updateInput(event)}
                  ></input>
                </div>
                <div class="col  text-start">
                  <label htmlFor="" className="col-form-label">
                    Tax Amount
                  </label>
                  <input
                    name="taxAmount"
                    type="number"
                    class="form-control"
                    placeholder="Tax Amount"
                    value={header.taxAmount}
                    onChange={(event) => updateInput(event)}
                  ></input>
                </div>
                <div class="col text-start">
                  <label htmlFor="" className="col-form-label">
                    Total
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Total Amount"
                    value={header.totalAmount}
                    disabled
                  ></input>
                </div>

                <div class="col text-start">
                  <label htmlFor="" className="col-form-label">
                    Balance
                  </label>
                  <input
                    type="number"
                    class={`form-control ${
                      parseFloat(header.totalBalance) === 0
                        ? "border-success"
                        : "border-danger"
                    }`}
                    placeholder="Total Amount"
                    value={header.totalBalance}
                    disabled
                  ></input>
                </div>
              </div>
            </div>
          )}
          <div className="p-3 my-2 border rounded">
            <table class="table  ">
              <thead>
                <tr>
                  <th scope="col">PO</th>
                  <th scope="col">Item</th>
                  <th scope="col">Net Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">To Be Del</th>
                  <th scope="col">To be Inv</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Net Amount</th>
                  <th scope="col">Matched</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  vendorOrders.map((lineItem) => {
                    return (
                      <LineMatch
                        lineItem={lineItem}
                        matchOrderItem={matchOrderItem}
                        updateMatchedLine={updateMatchedLine}
                        unmatchOrderItem={unmatchOrderItem}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-6 bg-info"></div>
      </div>
    </div>
  );
}

export default Invoice;
