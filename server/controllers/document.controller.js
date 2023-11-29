const config = require("../config/auth.config");
const db = require("../models");

const Document = db.document;

exports.findAll = async (req, res) => {
  const output = await Document.findAll({
    include: [
      db.companyCode,
      { model: db.vendor, include: db.orderItem },
      { model: db.lineItem, include: db.orderItem },
    ],
  });

  return res.send(output);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  const output = await Document.findByPk(id, {
    include: [
      db.companyCode,
      { model: db.vendor, include: db.orderItem },
      { model: db.lineItem, include: db.orderItem },
    ],
  });

  return res.send(output);
};

exports.create = async (req, res) => {
  try {
    const {
      companyCode,
      customerName,
      customerVat,
      vendorName,
      vendorNo,
      vendorVAT,
      type,
      documentNo,
      documentDate,
      dueDate,
      netAmount,
      taxAmount,
      shippingCost,
      discount,
      totalAmount,
      purchaseOrder,
      deliveryNote,
      pdfFile,
      lineItems,
      sapOrderItems,
    } = req.body;

    // Create company code if not found
    var companyCodeObj = await db.companyCode.findOne({
      where: { code: companyCode },
    });

    if (!companyCodeObj) {
      companyCodeObj = await db.companyCode.create({
        code: companyCode,
        name: customerName,
        vat: customerVat,
      });
    }

    // Create Vendor if not found
    var vendorObj = await db.vendor.findOne({
      where: { companyCodeId: companyCodeObj.id, number: vendorNo },
    });

    if (!vendorObj) {
      vendorObj = await db.vendor.create({
        number: vendorNo,
        name: vendorName,
        vat: vendorVAT,
        companyCodeId: companyCodeObj.id,
      });
    }

    // Document Creation
    const documentObj = await db.document.create({
      type,
      documentNo,
      documentDate,
      dueDate,
      netAmount,
      taxAmount,
      shippingCost,
      discount,
      totalAmount,
      purchaseOrder,
      deliveryNote,
      pdfFile,
      companyCodeId: companyCodeObj.id,
      vendorId: vendorObj.id,
    });

    var orderItemObj = null;
    // Create sap order items
    for (let i = 0; i < sapOrderItems.length; i++) {
      var orderItem = sapOrderItems[i];
      var orderItemObj = await db.orderItem.findOne({
        where: {
          purchasingDocument: orderItem.purchasingDocument,
          item: orderItem.item,
          vendorId: vendorObj.id,
        },
      });
      if (!orderItemObj) {
        orderItem.vendorId = vendorObj.id;
        orderItemObj = await db.orderItem.create(orderItem);
      } else {
        await db.orderItem.update(
          {
            shortText: orderItem.shortText,
            orderQuantity: orderItem.orderQuantity,
            orderUnit: orderItem.orderUnit,
            netPrice: orderItem.netPrice,
            netOrderValue: orderItem.netOrderValue,
            currency: orderItem.currency,
            stillToBeDelivered: orderItem.stillToBeDelivered,
            stillToBeInvoiced: orderItem.stillToBeInvoiced,
          },
          {
            where: { id: orderItemObj.id },
          }
        );
      }
    }

    // Create line items
    for (let i = 0; i < lineItems.length; i++) {
      var lineItem = lineItems[i];
      var orderItemId = null;
      if (
        lineItem.matched &&
        lineItem.purchaseOrder &&
        lineItem.matchedItemNo
      ) {
        var orderItemObj = await db.orderItem.findOne({
          where: {
            purchasingDocument: lineItem.purchaseOrder,
            item: lineItem.matchedItemNo,
          },
        });

        if (orderItemObj) {
          orderItemId = orderItemObj.id;
        }
      }
      await db.lineItem.create({
        orderItemId: orderItemId,
        documentId: documentObj.id,
        itemNo: lineItem.itemNo,
        description: lineItem.description,
        purchaseOrder: lineItem.purchaseOrder,
        deliveryNote: lineItem.deliveryNote,
        quantity: lineItem.quantity,
        unitPrice: lineItem.unitPrice,
        lineNetAmount: lineItem.lineNetAmount,
        matched: lineItem.matched,
        matchedItemNo: lineItem.matchedItemNo,
        correctPrice: lineItem.correctPrice,
        goodsAreReceived: lineItem.goodsAreReceived,
        priceIsCorrect: lineItem.priceIsCorrect,
      });
    }
    return res.send(await db.lineItem.findAll());
    return res.send("OK!");
  } catch (err) {
    console.log(err);
  }
};
