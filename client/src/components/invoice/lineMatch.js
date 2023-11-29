import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
function LineMatch({
  lineItem,
  matchOrderItem,
  updateMatchedLine,
  unmatchOrderItem,
}) {
  useEffect(() => {
    console.log("Line Updated!");
    if (lineItem.matched) {
      // matchOrderItem(lineItem);
    }
  }, [lineItem]);

  return (
    <tr>
      <th scope="row">{lineItem.purchasingDocument}</th>
      <td>{lineItem.item}</td>
      <td>{lineItem.netPrice}</td>
      <td>{lineItem.orderQuantity}</td>
      <td>{lineItem.netOrderValue}</td>

      <td>{lineItem.stillToBeDelivered}</td>

      <td>{lineItem.stillToBeInvoiced}</td>

      <td>
        <input
          type="number"
          name="quantityMatched"
          className={`form-control ${
            lineItem.isMissingGR & lineItem.matched ? " border-danger" : ""
          }`}
          value={lineItem.quantityMatched}
          onChange={(event) => updateMatchedLine(event, lineItem)}
        />
      </td>
      <td>
        <input
          name="unitPriceMatched"
          type="number"
          className={`form-control ${
            lineItem.isPriceMismatch && lineItem.matched ? " border-danger" : ""
          }`}
          value={lineItem.unitPriceMatched}
          onChange={(event) => updateMatchedLine(event, lineItem)}
        />
      </td>
      <td>
        <input
          name="netAmountMatched"
          type="number"
          className="form-control"
          value={lineItem.netAmountMatched}
          disabled
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={lineItem.matched}
          onClick={() =>
            lineItem.matched
              ? unmatchOrderItem(lineItem)
              : matchOrderItem(lineItem)
          }
        />
      </td>
    </tr>
  );
}

export default LineMatch;
