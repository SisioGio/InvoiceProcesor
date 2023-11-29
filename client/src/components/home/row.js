import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Row({ row }) {
  const [enabled, setEnabled] = useState(false);
  const [number, setNumber] = useState(row.netAmount);

  const matched = row.lineItems.every((item) => item.orderId != null);

  return (
    <tr>
      <th scope="row">{row.id}</th>
      <td>{row.companyCode.code}</td>
      <td>{row.companyCode.name}</td>
      <td>{row.companyCode.vat}</td>
      <td>{row.vendor.number}</td>
      <td>{row.vendor.name}</td>
      <td>{row.vendor.vat}</td>
      <td>{row.type}</td>
      <td>{row.documentNo}</td>
      <td>{row.documentDate}</td>
      <td>{row.dueDate}</td>
      <td>{row.netAmount}</td>
      <td>{row.shippingCost}</td>
      <td>{row.discount}</td>
      <td>{row.taxAmount}</td>
      <td>{row.totalAmount}</td>
      <td>{row.purchaseOrder}</td>
      <td>{row.deliveryNote}</td>
      <td>
        {matched ? "True" : <Link to={`/invoice/${row.id}`}>Resolve</Link>}
      </td>
      <td>
        {matched
          ? row.lineItems
              .some((item) => item.quantity > item.orderItem?.stillToBeInvoiced)
              .toString()
          : "Unkown"}
      </td>
      <td>
        {matched
          ? row.lineItems
              .some((item) => item.correctPrice != item.orderItem?.netPrice)
              .toString()
          : "Unkown"}
      </td>
    </tr>
  );
}

export default Row;
