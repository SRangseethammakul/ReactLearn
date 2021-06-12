import React from "react";
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({ family: 'Roboto', src: "./fonts/Sarabun-Medium.ttf" });

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    alignSelf: "center",
    marginBottom: 10,
  },
});

function PdfReport() {
  return (
    <PDFViewer>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2 สวัสดี ชาวโลddddก</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default PdfReport;
