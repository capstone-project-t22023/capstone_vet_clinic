import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image
} from "@react-pdf/renderer";
import PawsomeVetLogo from '../media/Logo.jpg';

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "white",
  },
  section: {
    margin: 40,
    color: "black"
  },
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  image: {
    width: 80,
    height: 80,
  },
  letterhead: {
    color: "black",
    fontSize: "10px",
    padding: 3,
  },
  letterheadClinic: {
    color: "black",
    fontSize: "15px",
    padding: 3,
  },
  headerData: {
    color: "black",
    fontSize: "10px",
  },
  headerDataCol: {
    width: "50%",
  },
  headerDataTable: {
    display: "table",
    width: "auto",
  },
  headerDataRow: {
    flexDirection: "row"
  },
  headerDataCell: {
    fontSize: 10
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  catCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  descCol: {
    width: "46%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  qtyCol: {
    width: "10%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  unitCol: {
    width: "12%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  totalCol: {
    width: "12%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  totalLabel: {
    width: "88%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    textAlign: "right"
  },
  tableCell: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 10,
    color: "black",
  }
});


export default function InvoicePdf() {

  const location = useLocation();
  const { bookingInfo, invoiceItemRows } = location.state;
  const [header, setHeader] = useState({});
  const [body, setBody] = useState([]);

  useEffect(() => {
    setHeader(bookingInfo);
    setBody(invoiceItemRows);

  }, [bookingInfo, invoiceItemRows]);

  return (
    <>
      <Helmet>
        <title>PawsomeVet | Export To PDF</title>
      </Helmet>
      <PDFViewer style={styles.viewer}>
        <Document title={"invoice-" + header.invoice_id}>
          <Page size="A4" style={styles.page} >
            <View style={styles.section}>
              <Image
                style={styles.image}
                src={PawsomeVetLogo}
              />
              <Text style={styles.letterheadClinic}>PawsomeVet Veterinary Clinic</Text>
              <Text style={styles.letterhead}>Address: 1 New Street, Sydney 2000 NSW, Australia</Text>
              <Text style={styles.letterhead}>Ph: + (02) 9519 4111 / +(02)95194112</Text>
              <Text style={styles.letterhead}>Fax: + (02) 9519 4111 / +(02)95194112</Text>
              <Text style={styles.letterhead}>Email: info@pawsomevet.com.au</Text>
              <Text style={styles.letterhead}>ABN: 865987656786</Text>
              <Text style={styles.headerData}> </Text>
              <Text style={styles.headerData}> </Text>
              <Text style={styles.headerData}> </Text>
              <Text style={styles.headerData}>Invoice ID: {header.invoice_id}</Text>
              <Text style={styles.headerData}> </Text>
              <Text style={styles.headerData}> </Text>
              <View style={styles.headerDataTable}>
                <View style={styles.headerDataRow}>
                  <View style={styles.headerDataCol}>
                    <Text style={styles.headerDataCell}>Booking ID: {header.booking_id}</Text>
                  </View>
                  <View style={styles.headerDataCol}>
                    <Text style={styles.headerDataCell}>Booking Status: {header.booking_status}</Text>
                  </View>
                </View>
                <View style={styles.headerDataRow}>
                  <View style={styles.headerDataCol}>
                    <Text style={styles.headerDataCell}>Booking Date: {header.booking_date}</Text>
                  </View>
                  <View style={styles.headerDataCol}>
                    <Text style={styles.headerDataCell}>Booking Type: {header.booking_type}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.headerData}> </Text>
              <Text style={styles.headerData}> </Text>
              <View style={styles.headerDataTable}>
                <View style={styles.headerDataRow}>
                  <View style={styles.headerDataCol}>
                    <Text style={styles.headerDataCell}>Pet Owner: {header.pet_owner}</Text>
                  </View>
                  <View style={styles.headerDataCol}>
                    <Text style={styles.headerDataCell}>Pet: {header.petname}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.headerData}> </Text>
              <Text style={styles.headerData}> </Text>
              <Text style={styles.headerData}>Veterinarian: {header.doctor}</Text>
              <Text style={styles.headerData}>Prepared By: {header.doctor}</Text>
              <Text style={styles.headerData}> </Text>
              <Text style={styles.headerData}> </Text>
              <Text style={styles.headerData}> </Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.catCol}>
                    <Text style={styles.tableCell}>Item Category</Text>
                  </View>
                  <View style={styles.descCol}>
                    <Text style={styles.tableCell}>Item Description</Text>
                  </View>
                  <View style={styles.qtyCol}>
                    <Text style={styles.tableCell}>Quantity</Text>
                  </View>
                  <View style={styles.unitCol}>
                    <Text style={styles.tableCell}>Unit Amount</Text>
                  </View>
                  <View style={styles.totalCol}>
                    <Text style={styles.tableCell}>Total Amount</Text>
                  </View>
                </View>
                {body.map(x => {
                  return (
                    <View key={x.item_id + "-" + x.quantity} style={styles.tableRow}>
                      <View style={styles.catCol}>
                        <Text style={styles.tableCell}>{x.item_category_label}</Text>
                      </View>
                      <View style={styles.descCol}>
                        <Text style={styles.tableCell}>{x.item_description_label}</Text>
                      </View>
                      <View style={styles.qtyCol}>
                        <Text style={styles.tableCell}>{x.quantity}</Text>
                      </View>
                      <View style={styles.unitCol}>
                        <Text style={styles.tableCell}>{x.unit_amount}</Text>
                      </View>
                      <View style={styles.totalCol}>
                        <Text style={styles.tableCell}>{x.total_amount}</Text>
                      </View>
                    </View>
                  )
                })}
                <View style={styles.tableRow}>
                  <View style={styles.totalLabel}>
                    <Text style={styles.tableCell}>Total in AUD</Text>
                  </View>
                  <View style={styles.totalCol}>
                    <Text style={styles.tableCell}>{bookingInfo.invoice_amount}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};
